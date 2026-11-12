/**
 * Autoritative Simulation. Läuft im Singleplayer im Browser und ab Phase 3
 * identisch auf dem Render-Server.
 */
import { TICKS_PER_SECOND, WORLD_HEIGHT } from '../constants';
import { AIR, BEDROCK, DIRT, getBlock, GRASS, SAND, Shape, SNOWY_GRASS, BLOCK_COUNT } from '../registry/blocks';
import type { LightEngine } from '../light/light';
import type { World } from '../world/World';
import type { ClientMessage, ServerEvent } from './protocol';

export type GameMode = 'creative' | 'survival';

export interface SimOptions {
  world: World;
  light: LightEngine;
  /** Startzeit in Ticks. */
  time: number;
  dayLengthTicks: number;
  mode: GameMode;
}

/** Setzt einen Block inkl. Licht-Update und Dirty-Markierung. */
export function applyBlockChange(world: World, light: LightEngine, x: number, y: number, z: number, id: number): boolean {
  if (world.getBlock(x, y, z) === id) return false;
  if (!world.setBlockRaw(x, y, z, id)) return false;
  light.onBlockChanged(x, y, z, id);
  world.markBlockDirty(x, y, z);
  const col = world.getColumn(x >> 4, z >> 4);
  if (col) col.modified = true;
  return true;
}

export class Sim {
  readonly world: World;
  private readonly light: LightEngine;
  time: number;
  readonly dayLengthTicks: number;
  mode: GameMode;
  private readonly listeners: ((ev: ServerEvent) => void)[] = [];
  private tickCount = 0;

  constructor(opts: SimOptions) {
    this.world = opts.world;
    this.light = opts.light;
    this.time = opts.time;
    this.dayLengthTicks = opts.dayLengthTicks;
    this.mode = opts.mode;
  }

  onEvent(listener: (ev: ServerEvent) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const i = this.listeners.indexOf(listener);
      if (i >= 0) this.listeners.splice(i, 1);
    };
  }

  private emit(ev: ServerEvent): void {
    for (const l of this.listeners) l(ev);
  }

  handle(msg: ClientMessage): void {
    switch (msg.t) {
      case 'setBlock': {
        const reason = this.validateSetBlock(msg.x, msg.y, msg.z, msg.id);
        if (reason) {
          this.emit({ t: 'rejected', seq: msg.seq, reason });
          // Client-Vorhersage zurücksetzen
          this.emit({ t: 'blockChanged', x: msg.x, y: msg.y, z: msg.z, id: this.world.getBlock(msg.x, msg.y, msg.z) });
          return;
        }
        this.setBlock(msg.x, msg.y, msg.z, msg.id);
        break;
      }
      case 'playerState':
        // Phase 3: Positionsabgleich/Anti-Cheat
        break;
    }
  }

  private validateSetBlock(x: number, y: number, z: number, id: number): string | null {
    if (!Number.isInteger(x) || !Number.isInteger(y) || !Number.isInteger(z)) return 'Ungültige Position';
    if (y < 0 || y >= WORLD_HEIGHT) return 'Ausserhalb der Welt';
    if (!Number.isInteger(id) || id < 0 || id >= BLOCK_COUNT) return 'Unbekannter Block';
    if (!this.world.hasColumn(x >> 4, z >> 4)) return 'Chunk nicht geladen';
    const current = this.world.getBlock(x, y, z);
    if (current === BEDROCK && this.mode !== 'creative') return 'Unzerstörbar';
    if (id !== AIR) {
      if (!getBlock(current).replaceable) return 'Platz belegt';
      const def = getBlock(id);
      if (def.shape === Shape.Cross) {
        const below = this.world.getBlock(x, y - 1, z);
        if (below !== GRASS && below !== DIRT && below !== SNOWY_GRASS && below !== SAND) return 'Braucht Boden';
      }
    }
    return null;
  }

  /** Setzt einen Block autoritativ und benachrichtigt alle Clients. */
  setBlock(x: number, y: number, z: number, id: number): void {
    if (!applyBlockChange(this.world, this.light, x, y, z, id)) return;
    this.emit({ t: 'blockChanged', x, y, z, id });
    // Pflanzen ohne Boden fallen weg
    if (y + 1 < WORLD_HEIGHT) {
      const above = this.world.getBlock(x, y + 1, z);
      if (above !== AIR && getBlock(above).shape === Shape.Cross && !getBlock(id).solid) {
        this.setBlock(x, y + 1, z, AIR);
      }
    }
  }

  tick(): void {
    this.time++;
    this.tickCount++;
    if (this.tickCount % TICKS_PER_SECOND === 0) this.emit({ t: 'time', ticks: this.time });
  }

  /** Spalten mit ungespeicherten Änderungen. */
  modifiedColumns(): { cx: number; cz: number }[] {
    const out: { cx: number; cz: number }[] = [];
    for (const col of this.world.columns.values()) if (col.modified) out.push({ cx: col.cx, cz: col.cz });
    return out;
  }
}
