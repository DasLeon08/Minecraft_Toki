/**
 * Speicherung im Browser (IndexedDB). Gespeichert werden nur veränderte Chunks;
 * unveränderte entstehen beim Laden neu aus dem Seed.
 */
import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import { columnKey, GENERATOR_VERSION, SAVE_FORMAT_VERSION, type GameMode, type ItemStack, type PlayerPersist } from '@blockcraft/shared';

export interface WorldMeta {
  id: string;
  name: string;
  seed: number;
  /** Ursprüngliche Seed-Eingabe (zur Anzeige). */
  seedText: string;
  mode: GameMode;
  createdAt: number;
  lastPlayed: number;
  /** Spielzeit in Ticks (Tag-Nacht-Zyklus). */
  time: number;
  version: number;
  /** Version der Weltgenerierung bei Erstellung. */
  genVersion?: number;
}

export interface PlayerSave {
  worldId: string;
  x: number;
  y: number;
  z: number;
  yaw: number;
  pitch: number;
  flying: boolean;
  /** Phase 1: nur Block-IDs der Hotbar (wird beim Laden migriert). */
  hotbar?: number[];
  selected: number;
  /** Ab Phase 2: Inventar, Leben, Hunger … */
  state?: PlayerPersist;
}

export interface SavedItem {
  item: ItemStack;
  x: number;
  y: number;
  z: number;
  age: number;
}

interface EntitiesRecord {
  worldId: string;
  items: SavedItem[];
}

interface ChunkRecord {
  worldId: string;
  cx: number;
  cz: number;
  data: Uint8Array;
}

interface BcDB extends DBSchema {
  worlds: { key: string; value: WorldMeta };
  chunks: { key: [string, number, number]; value: ChunkRecord };
  players: { key: string; value: PlayerSave };
  entities: { key: string; value: EntitiesRecord };
}

const DB_NAME = 'bc-worlds';
const DB_VERSION = 2;

function chunkRange(worldId: string): IDBKeyRange {
  return IDBKeyRange.bound([worldId, -Infinity, -Infinity], [worldId, Infinity, Infinity]);
}

export class WorldStore {
  private constructor(private readonly db: IDBPDatabase<BcDB>) {}

  static async open(): Promise<WorldStore> {
    const db = await openDB<BcDB>(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          db.createObjectStore('worlds', { keyPath: 'id' });
          db.createObjectStore('chunks', { keyPath: ['worldId', 'cx', 'cz'] });
          db.createObjectStore('players', { keyPath: 'worldId' });
        }
        if (oldVersion < 2) db.createObjectStore('entities', { keyPath: 'worldId' });
      },
      blocked() {
        console.warn('IndexedDB-Upgrade blockiert (andere Tabs offen?)');
      },
    });
    // Persistenten Speicher anfragen (schützt vor automatischem Löschen)
    try {
      void navigator.storage?.persist?.();
    } catch {
      // nicht unterstützt
    }
    return new WorldStore(db);
  }

  async listWorlds(): Promise<WorldMeta[]> {
    const all = await this.db.getAll('worlds');
    return all.sort((a, b) => b.lastPlayed - a.lastPlayed);
  }

  getWorld(id: string): Promise<WorldMeta | undefined> {
    return this.db.get('worlds', id);
  }

  async putWorld(meta: WorldMeta): Promise<void> {
    await this.db.put('worlds', meta);
  }

  async createWorld(name: string, seed: number, seedText: string, mode: GameMode): Promise<WorldMeta> {
    const meta: WorldMeta = {
      id: `w_${Date.now().toString(36)}_${Math.floor(Math.random() * 1e9).toString(36)}`,
      name: name.trim() || 'Neue Welt',
      seed,
      seedText,
      mode,
      createdAt: Date.now(),
      lastPlayed: Date.now(),
      time: 1000,
      version: SAVE_FORMAT_VERSION,
      genVersion: GENERATOR_VERSION,
    };
    await this.putWorld(meta);
    return meta;
  }

  async deleteWorld(id: string): Promise<void> {
    const tx = this.db.transaction(['worlds', 'chunks', 'players', 'entities'], 'readwrite');
    await Promise.all([
      tx.objectStore('worlds').delete(id),
      tx.objectStore('chunks').delete(chunkRange(id)),
      tx.objectStore('players').delete(id),
      tx.objectStore('entities').delete(id),
      tx.done,
    ]);
  }

  /** Schlüssel aller gespeicherten Spalten einer Welt (als columnKey). */
  async listChunkKeys(worldId: string): Promise<Set<number>> {
    const keys = await this.db.getAllKeys('chunks', chunkRange(worldId));
    return new Set(keys.map(([, cx, cz]) => columnKey(cx, cz)));
  }

  async loadChunk(worldId: string, cx: number, cz: number): Promise<Uint8Array | undefined> {
    const rec = await this.db.get('chunks', [worldId, cx, cz]);
    return rec?.data;
  }

  async saveChunks(worldId: string, chunks: { cx: number; cz: number; data: Uint8Array }[]): Promise<void> {
    if (chunks.length === 0) return;
    const tx = this.db.transaction('chunks', 'readwrite');
    for (const c of chunks) void tx.store.put({ worldId, cx: c.cx, cz: c.cz, data: c.data });
    await tx.done;
  }

  loadPlayer(worldId: string): Promise<PlayerSave | undefined> {
    return this.db.get('players', worldId);
  }

  async savePlayer(p: PlayerSave): Promise<void> {
    await this.db.put('players', p);
  }

  async loadItems(worldId: string): Promise<SavedItem[]> {
    return (await this.db.get('entities', worldId))?.items ?? [];
  }

  async saveItems(worldId: string, items: SavedItem[]): Promise<void> {
    await this.db.put('entities', { worldId, items });
  }

  /** Gespeicherte Datenmenge einer Welt in Bytes. */
  async worldSize(worldId: string): Promise<number> {
    let size = 0;
    let cursor = await this.db.transaction('chunks').store.openCursor(chunkRange(worldId));
    while (cursor) {
      size += cursor.value.data.byteLength;
      cursor = await cursor.continue();
    }
    return size;
  }

  // -------------------------------------------------------------------------
  // Export / Import als Datei (.bcworld)
  // Aufbau: "BCW1" | u32 JSON-Länge | JSON (Meta + Spieler) | Chunks: i32 cx, i32 cz, u32 Länge, Daten
  // -------------------------------------------------------------------------

  async exportWorld(worldId: string): Promise<Blob> {
    const meta = await this.getWorld(worldId);
    if (!meta) throw new Error('Welt nicht gefunden');
    const player = await this.loadPlayer(worldId);
    const items = await this.loadItems(worldId);
    const chunks = await this.db.getAll('chunks', chunkRange(worldId));
    const json = new TextEncoder().encode(JSON.stringify({ meta, player, items }));
    const parts: BlobPart[] = [];
    const header = new Uint8Array(8);
    header.set([0x42, 0x43, 0x57, 0x31]); // BCW1
    new DataView(header.buffer).setUint32(4, json.byteLength, true);
    parts.push(header, json);
    for (const c of chunks) {
      const h = new Uint8Array(12);
      const v = new DataView(h.buffer);
      v.setInt32(0, c.cx, true);
      v.setInt32(4, c.cz, true);
      v.setUint32(8, c.data.byteLength, true);
      parts.push(h, c.data as Uint8Array<ArrayBuffer>);
    }
    return new Blob(parts, { type: 'application/octet-stream' });
  }

  async importWorld(file: Blob): Promise<WorldMeta> {
    const buf = new Uint8Array(await file.arrayBuffer());
    const view = new DataView(buf.buffer);
    if (buf.length < 8 || buf[0] !== 0x42 || buf[1] !== 0x43 || buf[2] !== 0x57 || buf[3] !== 0x31) {
      throw new Error('Keine gültige Welt-Datei');
    }
    const jsonLen = view.getUint32(4, true);
    const parsed = JSON.parse(new TextDecoder().decode(buf.subarray(8, 8 + jsonLen))) as {
      meta: WorldMeta;
      player?: PlayerSave;
      items?: SavedItem[];
    };
    const fresh = await this.createWorld(`${parsed.meta.name} (Import)`, parsed.meta.seed, parsed.meta.seedText, parsed.meta.mode);
    fresh.time = parsed.meta.time;
    fresh.genVersion = parsed.meta.genVersion;
    await this.putWorld(fresh);
    if (parsed.items?.length) await this.saveItems(fresh.id, parsed.items);
    const chunks: { cx: number; cz: number; data: Uint8Array }[] = [];
    let o = 8 + jsonLen;
    while (o + 12 <= buf.length) {
      const cx = view.getInt32(o, true);
      const cz = view.getInt32(o + 4, true);
      const len = view.getUint32(o + 8, true);
      o += 12;
      chunks.push({ cx, cz, data: buf.slice(o, o + len) });
      o += len;
    }
    await this.saveChunks(fresh.id, chunks);
    if (parsed.player) await this.savePlayer({ ...parsed.player, worldId: fresh.id });
    return fresh;
  }

  close(): void {
    this.db.close();
  }
}
