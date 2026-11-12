/**
 * Fliessendes Wasser mit geplanten Updates. Wasser-Stufen sind eigene Block-IDs:
 * Quelle (0), fliessend (1–7), fallend (8).
 */
import { WORLD_HEIGHT } from '../constants';
import { AIR, getBlock, IS_SOLID, isWater, Shape, WATER, WATER_FALLING, WATER_FLOW, WATER_LEVEL } from '../registry/blocks';
import type { World } from '../world/World';

export const WATER_DELAY = 5;
const MAX_UPDATES_PER_TICK = 1500;

const DX = [1, -1, 0, 0];
const DZ = [0, 0, 1, -1];

export function posKey(x: number, y: number, z: number): number {
  return ((x + 0x100000) * 0x200000 + (z + 0x100000)) * 256 + y;
}

function keyPos(k: number): [number, number, number] {
  const y = k % 256;
  const rest = (k - y) / 256;
  const z = (rest % 0x200000) - 0x100000;
  const x = Math.floor(rest / 0x200000) - 0x100000;
  return [x, y, z];
}

/** Kann Wasser in diesen Block fliessen (Luft oder weiche Pflanzen)? */
function canFlowInto(id: number): boolean {
  if (id === AIR) return true;
  if (id < 0 || isWater(id) || IS_SOLID[id]) return false;
  const d = getBlock(id);
  return d.shape === Shape.Cross || d.shape === Shape.Torch;
}

export class WaterSim {
  private readonly scheduled = new Map<number, number>();

  constructor(
    private readonly world: World,
    private readonly setBlock: (x: number, y: number, z: number, id: number) => void,
  ) {}

  get pending(): number {
    return this.scheduled.size;
  }

  schedule(x: number, y: number, z: number, now: number, delay = WATER_DELAY): void {
    if (y < 0 || y >= WORLD_HEIGHT) return;
    const k = posKey(x, y, z);
    const due = now + delay;
    const cur = this.scheduled.get(k);
    if (cur === undefined || cur > due) this.scheduled.set(k, due);
  }

  /** Plant Updates für eine geänderte Position und angrenzendes Wasser. */
  onBlockChanged(x: number, y: number, z: number, now: number): void {
    const get = (a: number, b: number, c: number): number => this.world.getBlock(a, b, c);
    if (isWater(get(x, y, z))) this.schedule(x, y, z, now);
    const n: [number, number, number][] = [
      [x + 1, y, z],
      [x - 1, y, z],
      [x, y + 1, z],
      [x, y - 1, z],
      [x, y, z + 1],
      [x, y, z - 1],
    ];
    for (const [a, b, c] of n) if (isWater(get(a, b, c))) this.schedule(a, b, c, now);
  }

  tick(now: number): void {
    if (this.scheduled.size === 0) return;
    const due: number[] = [];
    for (const [k, t] of this.scheduled) {
      if (t <= now) {
        due.push(k);
        if (due.length >= MAX_UPDATES_PER_TICK) break;
      }
    }
    for (const k of due) {
      this.scheduled.delete(k);
      const [x, y, z] = keyPos(k);
      this.update(x, y, z);
    }
  }

  private get(x: number, y: number, z: number): number {
    if (y < 0) return -1;
    if (y >= WORLD_HEIGHT) return AIR;
    return this.world.getBlockOrUnloaded(x, y, z);
  }

  private update(x: number, y: number, z: number): void {
    const id = this.get(x, y, z);
    if (id < 0 || !isWater(id)) return;
    const level = WATER_LEVEL[id];

    if (level !== 0) {
      // Fliessendes/fallendes Wasser: Zustand aus Umgebung bestimmen
      let target: number;
      const above = this.get(x, y + 1, z);
      if (above >= 0 && isWater(above)) target = WATER_FALLING;
      else {
        let best = 99;
        let sources = 0;
        for (let d = 0; d < 4; d++) {
          const n = this.get(x + DX[d], y, z + DZ[d]);
          if (n < 0 || !isWater(n)) continue;
          const nl = WATER_LEVEL[n];
          if (nl === 0) sources++;
          best = Math.min(best, nl === 8 ? 0 : nl);
        }
        const below = this.get(x, y - 1, z);
        const belowFirm = below >= 0 && (IS_SOLID[below] === 1 || (isWater(below) && WATER_LEVEL[below] === 0));
        if (sources >= 2 && belowFirm) target = WATER;
        else if (best + 1 <= 7) target = WATER_FLOW[best + 1];
        else target = AIR;
      }
      if (target !== id) {
        this.setBlock(x, y, z, target);
        return;
      }
    }

    // Ausbreiten: zuerst nach unten
    const below = this.get(x, y - 1, z);
    let canDown = false;
    if (y > 0 && below >= 0) {
      if (canFlowInto(below)) {
        this.setBlock(x, y - 1, z, WATER_FALLING);
        canDown = true;
      } else if (isWater(below) && WATER_LEVEL[below] !== 0 && WATER_LEVEL[below] !== 8) {
        this.setBlock(x, y - 1, z, WATER_FALLING);
        canDown = true;
      } else if (isWater(below)) canDown = true;
    }
    const belowIsWater = below >= 0 && isWater(below);
    if (belowIsWater || (canDown && level !== 0)) return;
    const next = level === 0 || level === 8 ? 1 : level + 1;
    if (next > 7) return;
    for (let d = 0; d < 4; d++) {
      const nx = x + DX[d];
      const nz = z + DZ[d];
      const n = this.get(nx, y, nz);
      if (n < 0) continue;
      if (canFlowInto(n) || (isWater(n) && WATER_LEVEL[n] !== 0 && WATER_LEVEL[n] !== 8 && WATER_LEVEL[n] > next)) {
        this.setBlock(nx, y, nz, WATER_FLOW[next]);
      }
    }
  }
}
