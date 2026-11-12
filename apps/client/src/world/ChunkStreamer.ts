/**
 * Lädt/entlädt Chunk-Spalten um den Spieler (Spiralreihenfolge) und plant das
 * Meshing geänderter Sections im Worker-Pool – nächste Sections zuerst.
 */
import {
  ChunkColumn,
  columnKey,
  columnKeyX,
  columnKeyZ,
  decodeColumn,
  fillPadded,
  PAD_VOLUME,
  sectionKey,
  sectionKeyColumn,
  sectionKeyY,
  type LightEngine,
  type World,
} from '@blockcraft/shared';
import type { ChunkMeshStore } from '../render/ChunkMeshStore';
import type { WorkerPool } from '../workers/WorkerPool';
import type { WorkerResponse } from '../workers/protocol';

export interface StreamerOptions {
  /** Gespeicherte (veränderte) Spalten dieser Welt. */
  savedKeys: Set<number>;
  loadSaved(cx: number, cz: number): Promise<Uint8Array | undefined>;
  /** Wird vor dem Entladen einer veränderten Spalte aufgerufen (zum Speichern). */
  onUnloadModified(col: ChunkColumn): void;
}

type MeshResult = Extract<WorkerResponse, { op: 'mesh' }>;

export class ChunkStreamer {
  renderDistance = 8;
  private centerX = Number.NaN;
  private centerZ = Number.NaN;
  private centerSY = 4;
  private appliedRD = -1;
  private wanted: number[] = [];
  private readonly loading = new Set<number>();
  private readonly meshable = new Set<number>();
  private readonly dirty = new Set<number>();
  private readonly meshing = new Set<number>();
  private readonly results: MeshResult[] = [];
  private readonly padPool: { blocks: Uint16Array; light: Uint8Array }[] = [];
  private readonly offDirty: () => void;
  private disposed = false;
  /** Statistik */
  generated = 0;
  meshedTotal = 0;

  constructor(
    private readonly world: World,
    private readonly light: LightEngine,
    private readonly pool: WorkerPool,
    private readonly meshes: ChunkMeshStore,
    private readonly opts: StreamerOptions,
  ) {
    this.offDirty = world.onSectionDirty((cx, sy, cz) => {
      if (world.hasColumn(cx, cz)) this.dirty.add(sectionKey(cx, sy, cz));
    });
  }

  get loadedCount(): number {
    return this.world.columns.size;
  }
  get pendingMeshes(): number {
    return this.dirty.size + this.meshing.size + this.results.length;
  }
  get loadingCount(): number {
    return this.loading.size;
  }

  private inLoadRadius(dx: number, dz: number): boolean {
    const r = this.renderDistance + 1.5;
    return dx * dx + dz * dz <= r * r;
  }
  private inMeshRadius(dx: number, dz: number): boolean {
    const r = this.renderDistance + 0.5;
    return dx * dx + dz * dz <= r * r;
  }

  update(px: number, py: number, pz: number, budgetMs = 4): void {
    if (this.disposed) return;
    const cx = Math.floor(px) >> 4;
    const cz = Math.floor(pz) >> 4;
    this.centerSY = Math.max(0, Math.min(15, Math.floor(py) >> 4));
    if (cx !== this.centerX || cz !== this.centerZ || this.appliedRD !== this.renderDistance) {
      this.recenter(cx, cz);
    }
    this.scheduleLoads();
    this.scheduleMeshes();
    this.applyResults(budgetMs);
  }

  private recenter(cx: number, cz: number): void {
    this.centerX = cx;
    this.centerZ = cz;
    const rdChanged = this.appliedRD !== this.renderDistance;
    this.appliedRD = this.renderDistance;
    const r = Math.ceil(this.renderDistance + 1.5);
    const list: { key: number; d: number }[] = [];
    for (let dz = -r; dz <= r; dz++)
      for (let dx = -r; dx <= r; dx++) {
        if (!this.inLoadRadius(dx, dz)) continue;
        list.push({ key: columnKey(cx + dx, cz + dz), d: dx * dx + dz * dz });
      }
    list.sort((a, b) => a.d - b.d);
    this.wanted = list.map((e) => e.key);

    // Entladen (mit Hysterese) bzw. Meshes ausserhalb der Sichtweite entfernen
    const ur = this.renderDistance + 2.5;
    for (const [key, col] of this.world.columns) {
      const dx = col.cx - cx;
      const dz = col.cz - cz;
      if (dx * dx + dz * dz > ur * ur) this.unload(key, col);
      else if (rdChanged && !this.inMeshRadius(dx, dz)) this.meshes.removeColumn(key);
    }
    if (rdChanged) {
      // Neu sichtbar gewordene Spalten meshen
      for (const key of this.meshable) {
        const dx = columnKeyX(key) - cx;
        const dz = columnKeyZ(key) - cz;
        if (this.inMeshRadius(dx, dz)) this.markColumnDirty(key);
      }
    }
  }

  private unload(key: number, col: ChunkColumn): void {
    if (col.modified) this.opts.onUnloadModified(col);
    this.meshes.removeColumn(key);
    this.world.removeColumn(col.cx, col.cz);
    this.light.invalidateCache();
    this.meshable.delete(key);
    for (let dz = -1; dz <= 1; dz++)
      for (let dx = -1; dx <= 1; dx++) this.meshable.delete(columnKey(col.cx + dx, col.cz + dz));
    for (let sy = 0; sy < 16; sy++) this.dirty.delete(key * 16 + sy);
  }

  private scheduleLoads(): void {
    const max = this.pool.size + 1;
    for (const key of this.wanted) {
      if (this.loading.size >= max) break;
      if (this.loading.has(key) || this.world.columns.has(key)) continue;
      const cx = columnKeyX(key);
      const cz = columnKeyZ(key);
      this.loading.add(key);
      const task = this.opts.savedKeys.has(key)
        ? this.opts.loadSaved(cx, cz).then((data) => {
            if (!data) return this.pool.run({ op: 'gen', cx, cz });
            const blocks = decodeColumn(data);
            return this.pool.run({ op: 'light', cx, cz, blocks }, [blocks.buffer]);
          })
        : this.pool.run({ op: 'gen', cx, cz });
      task
        .then((res) => {
          this.loading.delete(key);
          if (this.disposed || res.op !== 'column') return;
          this.onColumnLoaded(res.cx, res.cz, res.blocks, res.light);
        })
        .catch((err: unknown) => {
          this.loading.delete(key);
          console.error('Chunk konnte nicht geladen werden', cx, cz, err);
        });
    }
  }

  private onColumnLoaded(cx: number, cz: number, blocks: Uint16Array, light: Uint8Array): void {
    if (!this.inLoadRadius(cx - this.centerX, cz - this.centerZ)) return;
    if (this.world.hasColumn(cx, cz)) return;
    const col = ChunkColumn.fromFlat(cx, cz, blocks, light);
    this.world.addColumn(col);
    this.light.invalidateCache();
    this.light.stitchColumn(cx, cz);
    this.generated++;
    for (let dz = -1; dz <= 1; dz++)
      for (let dx = -1; dx <= 1; dx++) {
        const key = columnKey(cx + dx, cz + dz);
        if (this.meshable.has(key) || !this.world.columns.has(key)) continue;
        if (this.isMeshable(cx + dx, cz + dz)) {
          this.meshable.add(key);
          this.markColumnDirty(key);
        }
      }
  }

  private isMeshable(cx: number, cz: number): boolean {
    for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) if (!this.world.hasColumn(cx + dx, cz + dz)) return false;
    return true;
  }

  private markColumnDirty(key: number): void {
    const col = this.world.columns.get(key);
    if (!col) return;
    for (let sy = 0; sy < 16; sy++) if (col.blocks[sy]) this.dirty.add(key * 16 + sy);
  }

  private takePad(): { blocks: Uint16Array; light: Uint8Array } {
    return this.padPool.pop() ?? { blocks: new Uint16Array(PAD_VOLUME), light: new Uint8Array(PAD_VOLUME) };
  }

  private scheduleMeshes(): void {
    const free = this.pool.size * 2 - this.pool.busy;
    if (free <= 0 || this.dirty.size === 0) return;
    const cands: { key: number; d: number }[] = [];
    for (const key of this.dirty) {
      const ck = sectionKeyColumn(key);
      if (!this.meshable.has(ck)) {
        this.dirty.delete(key);
        continue;
      }
      const dx = columnKeyX(ck) - this.centerX;
      const dz = columnKeyZ(ck) - this.centerZ;
      if (!this.inMeshRadius(dx, dz)) {
        this.dirty.delete(key);
        this.meshes.remove(key);
        continue;
      }
      if (this.meshing.has(key)) continue;
      const dy = sectionKeyY(key) - this.centerSY;
      cands.push({ key, d: dx * dx + dz * dz + dy * dy * 0.5 });
    }
    if (cands.length === 0) return;
    if (cands.length > free) cands.sort((a, b) => a.d - b.d);
    const n = Math.min(free, cands.length);
    for (let i = 0; i < n; i++) {
      const { key, d } = cands[i];
      this.dirty.delete(key);
      const ck = sectionKeyColumn(key);
      const pad = this.takePad();
      const nonEmpty = fillPadded(this.world, columnKeyX(ck), sectionKeyY(key), columnKeyZ(ck), pad.blocks, pad.light);
      if (!nonEmpty) {
        this.meshes.remove(key);
        this.padPool.push(pad);
        continue;
      }
      this.meshing.add(key);
      this.pool
        .run({ op: 'mesh', key, blocks: pad.blocks, light: pad.light }, [pad.blocks.buffer, pad.light.buffer], d <= 2)
        .then((res) => {
          this.meshing.delete(key);
          if (res.op !== 'mesh') return;
          if (this.padPool.length < 32) this.padPool.push({ blocks: res.blocks, light: res.light });
          if (!this.disposed) this.results.push(res);
        })
        .catch(() => this.meshing.delete(key));
    }
  }

  private applyResults(budgetMs: number): void {
    const t0 = performance.now();
    while (this.results.length > 0) {
      const res = this.results.shift()!;
      const ck = sectionKeyColumn(res.key);
      if (this.meshable.has(ck) && this.inMeshRadius(columnKeyX(ck) - this.centerX, columnKeyZ(ck) - this.centerZ)) {
        this.meshes.upload(res.key, res.data);
        this.meshedTotal++;
      }
      if (performance.now() - t0 > budgetMs) break;
    }
  }

  /** Sind alle Spalten im Radius `r` geladen und fertig gemesht? */
  isAreaReady(px: number, pz: number, r: number): boolean {
    const cx = Math.floor(px) >> 4;
    const cz = Math.floor(pz) >> 4;
    for (let dz = -r; dz <= r; dz++)
      for (let dx = -r; dx <= r; dx++) {
        const key = columnKey(cx + dx, cz + dz);
        if (!this.meshable.has(key)) return false;
        for (let sy = 0; sy < 16; sy++) {
          const sk = key * 16 + sy;
          if (this.dirty.has(sk) || this.meshing.has(sk)) return false;
        }
      }
    for (const r2 of this.results) {
      const ck = sectionKeyColumn(r2.key);
      if (Math.abs(columnKeyX(ck) - cx) <= r && Math.abs(columnKeyZ(ck) - cz) <= r) return false;
    }
    return true;
  }

  /** Fortschritt für den Ladebildschirm (0–1) im Radius `r`. */
  areaProgress(px: number, pz: number, r: number): number {
    const cx = Math.floor(px) >> 4;
    const cz = Math.floor(pz) >> 4;
    let total = 0;
    let done = 0;
    for (let dz = -r; dz <= r; dz++)
      for (let dx = -r; dx <= r; dx++) {
        total += 2;
        const key = columnKey(cx + dx, cz + dz);
        if (this.world.columns.has(key)) done++;
        if (this.meshable.has(key)) {
          let pending = false;
          for (let sy = 0; sy < 16 && !pending; sy++) {
            const sk = key * 16 + sy;
            pending = this.dirty.has(sk) || this.meshing.has(sk);
          }
          if (!pending) done++;
        }
      }
    return done / total;
  }

  dispose(): void {
    this.disposed = true;
    this.offDirty();
  }
}
