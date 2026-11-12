import { COLUMN_VOLUME, SECTION_COUNT, SECTION_VOLUME, WORLD_HEIGHT } from '../constants';
import { AIR } from '../registry/blocks';

/** Lichtbyte: oberes Nibble = Sonnenlicht, unteres Nibble = Blocklicht. */
export const FULL_SKY = 0xf0;

/**
 * Eine Chunk-Spalte (16 × 256 × 16), aufgeteilt in 16 Sections à 16³.
 * Leere Sections (nur Luft) sind `null`; Licht-Sections, die komplett
 * Sonnenlicht 15 / Blocklicht 0 enthalten, ebenfalls `null`.
 */
export class ChunkColumn {
  readonly blocks: (Uint16Array | null)[] = new Array(SECTION_COUNT).fill(null);
  readonly light: (Uint8Array | null)[] = new Array(SECTION_COUNT).fill(null);
  /** Wurde seit dem letzten Speichern verändert (durch Spieleraktionen). */
  modified = false;

  constructor(
    readonly cx: number,
    readonly cz: number,
  ) {}

  getBlock(x: number, y: number, z: number): number {
    if (y < 0 || y >= WORLD_HEIGHT) return AIR;
    const s = this.blocks[y >> 4];
    return s === null ? AIR : s[((y & 15) << 8) | (z << 4) | x];
  }

  setBlock(x: number, y: number, z: number, id: number): void {
    if (y < 0 || y >= WORLD_HEIGHT) return;
    const sy = y >> 4;
    let s = this.blocks[sy];
    if (s === null) {
      if (id === AIR) return;
      s = this.blocks[sy] = new Uint16Array(SECTION_VOLUME);
    }
    s[((y & 15) << 8) | (z << 4) | x] = id;
  }

  getLight(x: number, y: number, z: number): number {
    if (y >= WORLD_HEIGHT) return FULL_SKY;
    if (y < 0) return 0;
    const s = this.light[y >> 4];
    return s === null ? FULL_SKY : s[((y & 15) << 8) | (z << 4) | x];
  }

  setLight(x: number, y: number, z: number, value: number): void {
    if (y < 0 || y >= WORLD_HEIGHT) return;
    const sy = y >> 4;
    let s = this.light[sy];
    if (s === null) {
      if (value === FULL_SKY) return;
      s = this.light[sy] = new Uint8Array(SECTION_VOLUME).fill(FULL_SKY);
    }
    s[((y & 15) << 8) | (z << 4) | x] = value;
  }

  /** Höchste Section mit Blöcken (−1 = komplett leer). */
  topSection(): number {
    for (let i = SECTION_COUNT - 1; i >= 0; i--) if (this.blocks[i] !== null) return i;
    return -1;
  }

  /** Füllt die Spalte aus zusammenhängenden Arrays (Ergebnis eines Workers). */
  static fromFlat(cx: number, cz: number, blocks: Uint16Array, light: Uint8Array | null): ChunkColumn {
    const col = new ChunkColumn(cx, cz);
    col.loadFlat(blocks, light);
    return col;
  }

  loadFlat(blocks: Uint16Array, light: Uint8Array | null): void {
    for (let sy = 0; sy < SECTION_COUNT; sy++) {
      const start = sy * SECTION_VOLUME;
      const b = blocks.subarray(start, start + SECTION_VOLUME);
      let empty = true;
      for (let i = 0; i < SECTION_VOLUME; i++) {
        if (b[i] !== AIR) {
          empty = false;
          break;
        }
      }
      this.blocks[sy] = empty ? null : b.slice();
      if (light) {
        const l = light.subarray(start, start + SECTION_VOLUME);
        let full = true;
        for (let i = 0; i < SECTION_VOLUME; i++) {
          if (l[i] !== FULL_SKY) {
            full = false;
            break;
          }
        }
        this.light[sy] = full ? null : l.slice();
      } else {
        this.light[sy] = null;
      }
    }
  }

  /** Exportiert die Blöcke als zusammenhängendes Array (für Worker/Speicher). */
  toFlatBlocks(): Uint16Array {
    const out = new Uint16Array(COLUMN_VOLUME);
    for (let sy = 0; sy < SECTION_COUNT; sy++) {
      const s = this.blocks[sy];
      if (s) out.set(s, sy * SECTION_VOLUME);
    }
    return out;
  }
}
