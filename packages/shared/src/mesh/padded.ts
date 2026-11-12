/**
 * Gepaddete Kopie einer Section (18³) inkl. 1 Block Rand der Nachbarn.
 * Der Mesher (im Worker) braucht so keinen Zugriff auf die Welt.
 */
import { WORLD_HEIGHT } from '../constants';
import { AIR, BEDROCK } from '../registry/blocks';
import { FULL_SKY } from '../world/ChunkColumn';
import type { ChunkColumn } from '../world/ChunkColumn';
import type { World } from '../world/World';

export const PAD = 18;
export const PAD_VOLUME = PAD * PAD * PAD;

export const padIndex = (x: number, y: number, z: number): number => ((y + 1) * PAD + (z + 1)) * PAD + (x + 1);

/**
 * Füllt `blocks`/`light` (Länge PAD_VOLUME) für die Section (cx, sy, cz).
 * Gibt `false` zurück, wenn die Section samt Nachbarn leer ist (kein Mesh nötig).
 */
export function fillPadded(world: World, cx: number, sy: number, cz: number, blocks: Uint16Array, light: Uint8Array): boolean {
  const cols: (ChunkColumn | undefined)[] = [];
  for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) cols.push(world.getColumn(cx + dx, cz + dz));
  const center = cols[4];
  if (!center) return false;
  if (center.blocks[sy] === null) {
    // Leere Section: nur meshen, falls Nachbarn darüber/darunter Flächen hineinragen lassen – nie nötig,
    // da Flächen immer zum Block gehören, der sie besitzt.
    return false;
  }
  const y0 = sy * 16;
  for (let py = -1; py <= 16; py++) {
    const wy = y0 + py;
    for (let pz = -1; pz <= 16; pz++) {
      const cdz = pz < 0 ? 0 : pz > 15 ? 2 : 1;
      const lz = (pz + 16) & 15;
      for (let px = -1; px <= 16; px++) {
        const cdx = px < 0 ? 0 : px > 15 ? 2 : 1;
        const lx = (px + 16) & 15;
        const col = cols[cdz * 3 + cdx];
        const i = ((py + 1) * PAD + (pz + 1)) * PAD + (px + 1);
        if (wy < 0) {
          // Unter der Welt: wie fester Block behandeln (keine Unterseiten zeichnen)
          blocks[i] = BEDROCK;
          light[i] = 0;
        } else if (wy >= WORLD_HEIGHT || !col) {
          blocks[i] = AIR;
          light[i] = FULL_SKY;
        } else {
          blocks[i] = col.getBlock(lx, wy, lz);
          light[i] = col.getLight(lx, wy, lz);
        }
      }
    }
  }
  return true;
}
