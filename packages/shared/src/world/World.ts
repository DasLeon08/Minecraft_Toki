import { WORLD_HEIGHT } from '../constants';
import { AIR } from '../registry/blocks';
import { ChunkColumn, FULL_SKY } from './ChunkColumn';
import { columnKey } from './coords';

export type SectionDirtyListener = (cx: number, sy: number, cz: number) => void;

/**
 * Sammlung geladener Chunk-Spalten mit Zugriff über Weltkoordinaten.
 * Wird von Client (Replika) und Simulation genutzt.
 */
export class World {
  readonly columns = new Map<number, ChunkColumn>();
  private readonly dirtyListeners: SectionDirtyListener[] = [];

  getColumn(cx: number, cz: number): ChunkColumn | undefined {
    return this.columns.get(columnKey(cx, cz));
  }

  hasColumn(cx: number, cz: number): boolean {
    return this.columns.has(columnKey(cx, cz));
  }

  addColumn(col: ChunkColumn): void {
    this.columns.set(columnKey(col.cx, col.cz), col);
  }

  removeColumn(cx: number, cz: number): ChunkColumn | undefined {
    const key = columnKey(cx, cz);
    const col = this.columns.get(key);
    this.columns.delete(key);
    return col;
  }

  getBlock(x: number, y: number, z: number): number {
    if (y < 0 || y >= WORLD_HEIGHT) return AIR;
    const col = this.columns.get(columnKey(x >> 4, z >> 4));
    return col ? col.getBlock(x & 15, y, z & 15) : AIR;
  }

  /** Liefert −1, wenn die Spalte nicht geladen ist (für Kollision: wie fester Block behandeln). */
  getBlockOrUnloaded(x: number, y: number, z: number): number {
    if (y < 0 || y >= WORLD_HEIGHT) return AIR;
    const col = this.columns.get(columnKey(x >> 4, z >> 4));
    return col ? col.getBlock(x & 15, y, z & 15) : -1;
  }

  /** Setzt einen Block ohne Licht-Update (siehe `applyBlockChange`). */
  setBlockRaw(x: number, y: number, z: number, id: number): boolean {
    if (y < 0 || y >= WORLD_HEIGHT) return false;
    const col = this.columns.get(columnKey(x >> 4, z >> 4));
    if (!col) return false;
    col.setBlock(x & 15, y, z & 15, id);
    return true;
  }

  getLight(x: number, y: number, z: number): number {
    if (y >= WORLD_HEIGHT) return FULL_SKY;
    if (y < 0) return 0;
    const col = this.columns.get(columnKey(x >> 4, z >> 4));
    return col ? col.getLight(x & 15, y, z & 15) : FULL_SKY;
  }

  onSectionDirty(listener: SectionDirtyListener): () => void {
    this.dirtyListeners.push(listener);
    return () => {
      const i = this.dirtyListeners.indexOf(listener);
      if (i >= 0) this.dirtyListeners.splice(i, 1);
    };
  }

  markSectionDirty(cx: number, sy: number, cz: number): void {
    if (sy < 0 || sy >= 16) return;
    for (const l of this.dirtyListeners) l(cx, sy, cz);
  }

  /**
   * Markiert die Section eines Blocks und – an Rändern – alle angrenzenden
   * Sections (auch diagonal, weil AO und weiches Licht Diagonalen lesen).
   */
  markBlockDirty(x: number, y: number, z: number): void {
    const cx = x >> 4;
    const cz = z >> 4;
    const sy = y >> 4;
    const lx = x & 15;
    const ly = y & 15;
    const lz = z & 15;
    const x0 = lx === 0 ? -1 : 0;
    const x1 = lx === 15 ? 1 : 0;
    const y0 = ly === 0 ? -1 : 0;
    const y1 = ly === 15 ? 1 : 0;
    const z0 = lz === 0 ? -1 : 0;
    const z1 = lz === 15 ? 1 : 0;
    for (let dx = x0; dx <= x1; dx++)
      for (let dy = y0; dy <= y1; dy++)
        for (let dz = z0; dz <= z1; dz++) this.markSectionDirty(cx + dx, sy + dy, cz + dz);
  }

  clear(): void {
    this.columns.clear();
  }
}
