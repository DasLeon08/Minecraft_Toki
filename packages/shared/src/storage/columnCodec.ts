/**
 * Kompaktes Speicherformat für eine Chunk-Spalte (Licht wird beim Laden neu berechnet).
 *
 * Aufbau (vor Kompression):
 *   u8  Formatversion (1 oder 2)
 *   u16 Bitmaske vorhandener Sections (LE)
 *   je vorhandener Section: 4096 × u16 (LE)
 *   ab v2: u32 Länge + JSON der Block-Entities (Truhe, Schmelze)
 * Danach DEFLATE (fflate).
 */
import { deflateSync, inflateSync, strFromU8, strToU8 } from 'fflate';
import { COLUMN_VOLUME, SECTION_COUNT, SECTION_VOLUME } from '../constants';
import type { ChunkColumn } from '../world/ChunkColumn';
import { deserializeBlockEntity, serializeBlockEntity, type BlockEntityData } from '../sim/blockEntities';

const CODEC_VERSION = 2;

export interface DecodedColumn {
  blocks: Uint16Array;
  blockEntities: BlockEntityData[];
}

export function encodeColumn(col: ChunkColumn): Uint8Array {
  let mask = 0;
  let count = 0;
  for (let sy = 0; sy < SECTION_COUNT; sy++) {
    if (col.blocks[sy] !== null) {
      mask |= 1 << sy;
      count++;
    }
  }
  const entities = [...col.blockEntities].map(([i, be]) => serializeBlockEntity(i, be));
  const json = strToU8(JSON.stringify(entities));
  const raw = new Uint8Array(3 + count * SECTION_VOLUME * 2 + 4 + json.byteLength);
  const view = new DataView(raw.buffer);
  view.setUint8(0, CODEC_VERSION);
  view.setUint16(1, mask, true);
  let o = 3;
  for (let sy = 0; sy < SECTION_COUNT; sy++) {
    const s = col.blocks[sy];
    if (!s) continue;
    for (let i = 0; i < SECTION_VOLUME; i++, o += 2) view.setUint16(o, s[i], true);
  }
  view.setUint32(o, json.byteLength, true);
  raw.set(json, o + 4);
  return deflateSync(raw, { level: 6 });
}

export function decodeColumnFull(data: Uint8Array): DecodedColumn {
  const raw = inflateSync(data);
  const view = new DataView(raw.buffer, raw.byteOffset, raw.byteLength);
  const version = view.getUint8(0);
  if (version !== 1 && version !== 2) throw new Error(`Unbekannte Chunk-Formatversion ${version}`);
  const mask = view.getUint16(1, true);
  const blocks = new Uint16Array(COLUMN_VOLUME);
  let o = 3;
  for (let sy = 0; sy < SECTION_COUNT; sy++) {
    if (!(mask & (1 << sy))) continue;
    const base = sy * SECTION_VOLUME;
    for (let i = 0; i < SECTION_VOLUME; i++, o += 2) blocks[base + i] = view.getUint16(o, true);
  }
  let blockEntities: BlockEntityData[] = [];
  if (version >= 2 && o + 4 <= raw.byteLength) {
    const len = view.getUint32(o, true);
    try {
      blockEntities = JSON.parse(strFromU8(raw.subarray(o + 4, o + 4 + len))) as BlockEntityData[];
    } catch {
      blockEntities = [];
    }
  }
  return { blocks, blockEntities };
}

/** Nur die Blöcke (für Worker/Tests). */
export function decodeColumn(data: Uint8Array): Uint16Array {
  return decodeColumnFull(data).blocks;
}

/** Überträgt gespeicherte Block-Entities in eine Spalte. */
export function applyBlockEntities(col: ChunkColumn, list: BlockEntityData[]): void {
  for (const d of list) {
    if (!d || typeof d.i !== 'number') continue;
    col.blockEntities.set(d.i, deserializeBlockEntity(d));
  }
}
