import { CHUNK_SHIFT, CHUNK_MASK } from '../constants';

/** Schlüssel für eine Chunk-Spalte (cx, cz) als Zahl, ohne String-Allokation. */
export function columnKey(cx: number, cz: number): number {
  // 2^21 Spalten je Richtung reichen für ±33 Mio. Blöcke.
  return (cx + 0x100000) * 0x200000 + (cz + 0x100000);
}

export function columnKeyX(key: number): number {
  return Math.floor(key / 0x200000) - 0x100000;
}

export function columnKeyZ(key: number): number {
  return (key % 0x200000) - 0x100000;
}

/** Schlüssel für eine Section (cx, sy, cz). */
export function sectionKey(cx: number, sy: number, cz: number): number {
  return columnKey(cx, cz) * 16 + sy;
}

export function sectionKeyColumn(key: number): number {
  return Math.floor(key / 16);
}

export function sectionKeyY(key: number): number {
  return key % 16;
}

export const toChunk = (v: number): number => v >> CHUNK_SHIFT;
export const toLocal = (v: number): number => v & CHUNK_MASK;

/** Index innerhalb einer Section (x, y, z jeweils 0–15). */
export const sectionIndex = (x: number, y: number, z: number): number => (y << 8) | (z << 4) | x;
/** Index innerhalb einer kompletten Spalte (x, z 0–15, y 0–255). */
export const columnIndex = (x: number, y: number, z: number): number => (y << 8) | (z << 4) | x;
