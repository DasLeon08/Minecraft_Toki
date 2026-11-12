/**
 * Kompaktes Speicherformat für eine Chunk-Spalte (nur Blöcke; Licht wird
 * beim Laden neu berechnet).
 *
 * Aufbau (vor Kompression):
 *   u8  Formatversion
 *   u16 Bitmaske vorhandener Sections (LE)
 *   je vorhandener Section: 4096 × u16 (LE)
 * Danach DEFLATE (fflate).
 */
import { deflateSync, inflateSync } from 'fflate';
import { COLUMN_VOLUME, SECTION_COUNT, SECTION_VOLUME } from '../constants';
import type { ChunkColumn } from '../world/ChunkColumn';

const CODEC_VERSION = 1;

export function encodeColumn(col: ChunkColumn): Uint8Array {
  let mask = 0;
  let count = 0;
  for (let sy = 0; sy < SECTION_COUNT; sy++) {
    if (col.blocks[sy] !== null) {
      mask |= 1 << sy;
      count++;
    }
  }
  const raw = new Uint8Array(3 + count * SECTION_VOLUME * 2);
  const view = new DataView(raw.buffer);
  view.setUint8(0, CODEC_VERSION);
  view.setUint16(1, mask, true);
  let o = 3;
  for (let sy = 0; sy < SECTION_COUNT; sy++) {
    const s = col.blocks[sy];
    if (!s) continue;
    for (let i = 0; i < SECTION_VOLUME; i++, o += 2) view.setUint16(o, s[i], true);
  }
  return deflateSync(raw, { level: 6 });
}

export function decodeColumn(data: Uint8Array): Uint16Array {
  const raw = inflateSync(data);
  const view = new DataView(raw.buffer, raw.byteOffset, raw.byteLength);
  const version = view.getUint8(0);
  if (version !== CODEC_VERSION) throw new Error(`Unbekannte Chunk-Formatversion ${version}`);
  const mask = view.getUint16(1, true);
  const out = new Uint16Array(COLUMN_VOLUME);
  let o = 3;
  for (let sy = 0; sy < SECTION_COUNT; sy++) {
    if (!(mask & (1 << sy))) continue;
    const base = sy * SECTION_VOLUME;
    for (let i = 0; i < SECTION_VOLUME; i++, o += 2) out[base + i] = view.getUint16(o, true);
  }
  return out;
}
