/**
 * Licht: Sonnenlicht (oberes Nibble) und Blocklicht (unteres Nibble), 0–15.
 *
 * - `computeColumnLight` berechnet das Licht einer einzelnen Spalte (im Worker).
 * - `LightEngine` gleicht Licht über Spaltengrenzen ab und aktualisiert es
 *   inkrementell bei Blockänderungen (Entfernen- + Hinzufügen-BFS).
 */
import { COLUMN_VOLUME, WORLD_HEIGHT } from '../constants';
import { IS_OPAQUE, LIGHT_EMISSION, LIGHT_FILTER } from '../registry/blocks';
import type { ChunkColumn } from '../world/ChunkColumn';
import { columnKey } from '../world/coords';
import type { World } from '../world/World';

/** Neues Licht, wenn Licht `level` in einen Block mit `filter` fliesst (`down` = nach unten). */
function spread(level: number, filter: number, down: boolean): number {
  if (down && level === 15 && filter === 0) return 15;
  const v = level - 1 - filter;
  return v > 0 ? v : 0;
}

// Nachbarrichtungen: +X, -X, +Y, -Y, +Z, -Z
const DX = [1, -1, 0, 0, 0, 0];
const DY = [0, 0, 1, -1, 0, 0];
const DZ = [0, 0, 0, 0, 1, -1];

/** Berechnet Sonnen- und Blocklicht einer isolierten Spalte (ohne Nachbarn). */
export function computeColumnLight(blocks: Uint16Array): Uint8Array {
  const sky = new Uint8Array(COLUMN_VOLUME);
  const blk = new Uint8Array(COLUMN_VOLUME);

  // Senkrechtes Sonnenlicht
  for (let z = 0; z < 16; z++) {
    for (let x = 0; x < 16; x++) {
      let level = 15;
      for (let y = WORLD_HEIGHT - 1; y >= 0; y--) {
        const i = (y << 8) | (z << 4) | x;
        const id = blocks[i];
        level = IS_OPAQUE[id] ? 0 : spread(level, LIGHT_FILTER[id], true);
        sky[i] = level;
      }
    }
  }

  // Seitliche Ausbreitung innerhalb der Spalte
  const queue: number[] = [];
  for (let i = 0; i < COLUMN_VOLUME; i++) {
    const L = sky[i];
    if (L < 2) continue;
    const x = i & 15;
    const z = (i >> 4) & 15;
    const y = i >> 8;
    for (let d = 0; d < 6; d++) {
      if (d === 2) continue; // nach oben nie heller
      const nx = x + DX[d];
      const ny = y + DY[d];
      const nz = z + DZ[d];
      if (nx < 0 || nx > 15 || nz < 0 || nz > 15 || ny < 0 || ny >= WORLD_HEIGHT) continue;
      const n = (ny << 8) | (nz << 4) | nx;
      const id = blocks[n];
      if (IS_OPAQUE[id]) continue;
      if (spread(L, LIGHT_FILTER[id], d === 3) > sky[n]) {
        queue.push(i);
        break;
      }
    }
  }
  bfsLocal(queue, sky, blocks, true);

  // Blocklicht
  const bq: number[] = [];
  for (let i = 0; i < COLUMN_VOLUME; i++) {
    const e = LIGHT_EMISSION[blocks[i]];
    if (e > 0) {
      blk[i] = e;
      bq.push(i);
    }
  }
  bfsLocal(bq, blk, blocks, false);

  const out = new Uint8Array(COLUMN_VOLUME);
  for (let i = 0; i < COLUMN_VOLUME; i++) out[i] = (sky[i] << 4) | blk[i];
  return out;
}

function bfsLocal(queue: number[], light: Uint8Array, blocks: Uint16Array, isSky: boolean): void {
  let head = 0;
  while (head < queue.length) {
    const i = queue[head++];
    const L = light[i];
    if (L <= 1) continue;
    const x = i & 15;
    const z = (i >> 4) & 15;
    const y = i >> 8;
    for (let d = 0; d < 6; d++) {
      const nx = x + DX[d];
      const ny = y + DY[d];
      const nz = z + DZ[d];
      if (nx < 0 || nx > 15 || nz < 0 || nz > 15 || ny < 0 || ny >= WORLD_HEIGHT) continue;
      const n = (ny << 8) | (nz << 4) | nx;
      const id = blocks[n];
      if (IS_OPAQUE[id]) continue;
      const v = spread(L, LIGHT_FILTER[id], isSky && d === 3);
      if (v > light[n]) {
        light[n] = v;
        queue.push(n);
      }
    }
    if (head > 65536 && head > queue.length / 2) {
      queue.splice(0, head);
      head = 0;
    }
  }
}

/**
 * Lichtberechnung über die geladene Welt. Arbeitet mit Weltkoordinaten
 * und überschreitet Spaltengrenzen (nur in geladene Spalten).
 */
export class LightEngine {
  private lastKey = Number.NaN;
  private lastCol: ChunkColumn | undefined;
  // Warteschlangen als flache Zahlenlisten: x, y, z (, level)
  private addQ: number[] = [];
  private remQ: number[] = [];

  constructor(private readonly world: World) {}

  private col(x: number, z: number): ChunkColumn | undefined {
    const key = columnKey(x >> 4, z >> 4);
    if (key !== this.lastKey) {
      this.lastKey = key;
      this.lastCol = this.world.columns.get(key);
    }
    return this.lastCol;
  }

  /** Muss aufgerufen werden, wenn Spalten entladen/ersetzt wurden. */
  invalidateCache(): void {
    this.lastKey = Number.NaN;
    this.lastCol = undefined;
  }

  private get(x: number, y: number, z: number, sky: boolean): number {
    if (y >= WORLD_HEIGHT) return sky ? 15 : 0;
    if (y < 0) return 0;
    const c = this.col(x, z);
    if (!c) return -1;
    const l = c.getLight(x & 15, y, z & 15);
    return sky ? l >> 4 : l & 15;
  }

  private set(x: number, y: number, z: number, sky: boolean, v: number): void {
    const c = this.col(x, z);
    if (!c || y < 0 || y >= WORLD_HEIGHT) return;
    const lx = x & 15;
    const lz = z & 15;
    const l = c.getLight(lx, y, lz);
    const nl = sky ? (v << 4) | (l & 15) : (l & 0xf0) | v;
    if (nl !== l) {
      c.setLight(lx, y, lz, nl);
      this.world.markBlockDirty(x, y, z);
    }
  }

  private blockAt(x: number, y: number, z: number): number {
    const c = this.col(x, z);
    if (!c) return -1;
    return c.getBlock(x & 15, y, z & 15);
  }

  /** Gleicht eine neu geladene Spalte mit ihren geladenen Nachbarn ab. */
  stitchColumn(cx: number, cz: number): void {
    const x0 = cx * 16;
    const z0 = cz * 16;
    // [Nachbar-dx, Nachbar-dz]
    const sides: [number, number][] = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    for (const sky of [true, false]) {
      for (const [ndx, ndz] of sides) {
        if (!this.world.hasColumn(cx + ndx, cz + ndz)) continue;
        for (let t = 0; t < 16; t++) {
          // Eigene Randzelle (a) und direkt angrenzende Nachbarzelle (b)
          const ax = ndx < 0 ? x0 : ndx > 0 ? x0 + 15 : x0 + t;
          const az = ndz < 0 ? z0 : ndz > 0 ? z0 + 15 : z0 + t;
          const bx = ax + ndx;
          const bz = az + ndz;
          for (let y = 0; y < WORLD_HEIGHT; y++) {
            const la = this.get(ax, y, az, sky);
            const lb = this.get(bx, y, bz, sky);
            if (la <= 1 && lb <= 1) continue;
            const ida = this.blockAt(ax, y, az);
            const idb = this.blockAt(bx, y, bz);
            if (la > 1 && idb >= 0 && !IS_OPAQUE[idb] && spread(la, LIGHT_FILTER[idb], false) > lb) {
              this.addQ.push(ax, y, az);
            }
            if (lb > 1 && ida >= 0 && !IS_OPAQUE[ida] && spread(lb, LIGHT_FILTER[ida], false) > la) {
              this.addQ.push(bx, y, bz);
            }
          }
        }
      }
      this.runAdd(sky);
    }
  }

  /** Aktualisiert das Licht nach einer Blockänderung an (x, y, z). */
  onBlockChanged(x: number, y: number, z: number, newId: number): void {
    for (const sky of [true, false]) {
      const old = this.get(x, y, z, sky);
      if (old > 0) {
        this.set(x, y, z, sky, 0);
        this.remQ.push(x, y, z, old);
        this.runRemove(sky);
      }
      for (let d = 0; d < 6; d++) {
        const nx = x + DX[d];
        const ny = y + DY[d];
        const nz = z + DZ[d];
        if (ny < 0) continue;
        if (ny >= WORLD_HEIGHT) {
          if (sky) {
            // Über der Welt ist immer volles Sonnenlicht.
            const id = newId;
            if (!IS_OPAQUE[id]) {
              const v = spread(15, LIGHT_FILTER[id], true);
              if (v > this.get(x, y, z, true)) {
                this.set(x, y, z, true, v);
                this.addQ.push(x, y, z);
              }
            }
          }
          continue;
        }
        if (this.get(nx, ny, nz, sky) > 0) this.addQ.push(nx, ny, nz);
      }
      if (!sky) {
        const e = LIGHT_EMISSION[newId];
        if (e > 0) {
          this.set(x, y, z, false, e);
          this.addQ.push(x, y, z);
        }
      }
      this.runAdd(sky);
    }
  }

  private runRemove(sky: boolean): void {
    const q = this.remQ;
    let head = 0;
    while (head < q.length) {
      const x = q[head++];
      const y = q[head++];
      const z = q[head++];
      const lvl = q[head++];
      for (let d = 0; d < 6; d++) {
        const nx = x + DX[d];
        const ny = y + DY[d];
        const nz = z + DZ[d];
        if (ny < 0 || ny >= WORLD_HEIGHT) continue;
        const nl = this.get(nx, ny, nz, sky);
        if (nl <= 0) continue;
        const down = sky && d === 3;
        if (nl < lvl || (down && lvl === 15 && nl === 15)) {
          // Emittierende Blöcke behalten ihr Eigenlicht.
          if (!sky) {
            const e = LIGHT_EMISSION[this.blockAt(nx, ny, nz)] ?? 0;
            if (e > 0) {
              this.addQ.push(nx, ny, nz);
              continue;
            }
          }
          this.set(nx, ny, nz, sky, 0);
          q.push(nx, ny, nz, nl);
        } else {
          this.addQ.push(nx, ny, nz);
        }
      }
    }
    q.length = 0;
  }

  private runAdd(sky: boolean): void {
    const q = this.addQ;
    let head = 0;
    while (head < q.length) {
      const x = q[head++];
      const y = q[head++];
      const z = q[head++];
      const L = this.get(x, y, z, sky);
      if (L <= 1) continue;
      for (let d = 0; d < 6; d++) {
        const nx = x + DX[d];
        const ny = y + DY[d];
        const nz = z + DZ[d];
        if (ny < 0 || ny >= WORLD_HEIGHT) continue;
        const id = this.blockAt(nx, ny, nz);
        if (id < 0 || IS_OPAQUE[id]) continue;
        const v = spread(L, LIGHT_FILTER[id], sky && d === 3);
        if (v > this.get(nx, ny, nz, sky)) {
          this.set(nx, ny, nz, sky, v);
          q.push(nx, ny, nz);
        }
      }
      if (head > 300000 && head > q.length / 2) {
        q.splice(0, head);
        head = 0;
      }
    }
    q.length = 0;
  }
}
