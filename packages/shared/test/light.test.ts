import { describe, expect, it } from 'vitest';
import { AIR, LIGHT_CRYSTAL, STONE } from '../src/registry/blocks';
import { applyBlockChange } from '../src/sim/Sim';
import { makeWorld } from './helpers';

const sky = (l: number): number => l >> 4;
const blk = (l: number): number => l & 15;

describe('Licht', () => {
  it('Sonnenlicht fällt bis zum Boden', () => {
    const { world } = makeWorld(0, (_x, y) => (y < 60 ? STONE : AIR));
    expect(sky(world.getLight(5, 60, 5))).toBe(15);
    expect(sky(world.getLight(5, 59, 5))).toBe(0);
  });

  it('unter einem Dach breitet sich Licht seitlich aus und nimmt ab', () => {
    // Dach bei y=70 über x 0..7 (in Spalte 0), Boden y<60
    const { world } = makeWorld(1, (x, y, z) => {
      if (y < 60) return STONE;
      if (y === 70 && x >= 0 && x <= 7 && z >= 0 && z <= 15) return STONE;
      return AIR;
    });
    // Direkt neben dem Dachrand (x=8) volles Licht, darunter nach innen abnehmend
    expect(sky(world.getLight(8, 65, 5))).toBe(15);
    expect(sky(world.getLight(7, 65, 5))).toBe(14);
    expect(sky(world.getLight(4, 65, 5))).toBe(11);
  });

  it('Block platzieren verdunkelt darunter, Entfernen hellt wieder auf', () => {
    const { world, light } = makeWorld(1, (_x, y) => (y < 60 ? STONE : AIR));
    applyBlockChange(world, light, 3, 64, 3, STONE);
    // Direkt darunter: kein senkrechtes Licht mehr, aber seitlich 14
    expect(sky(world.getLight(3, 63, 3))).toBe(14);
    applyBlockChange(world, light, 3, 64, 3, AIR);
    expect(sky(world.getLight(3, 63, 3))).toBe(15);
  });

  it('Licht über Spaltengrenzen hinweg (Höhle mit Öffnung im Nachbarchunk)', () => {
    // Geschlossene Decke y=80 überall ausser Loch bei x=20 (Spalte 1)
    const { world } = makeWorld(1, (x, y, z) => {
      if (y < 60) return STONE;
      if (y === 80 && !(x === 20 && z === 5)) return STONE;
      return AIR;
    });
    expect(sky(world.getLight(20, 79, 5))).toBe(15);
    expect(sky(world.getLight(20, 61, 5))).toBe(15);
    // Spalte 0, 5 Blöcke entfernt: 15 - 5 = 10
    expect(sky(world.getLight(15, 61, 5))).toBe(10);
  });

  it('Leuchtkristall erzeugt Blocklicht, das beim Abbauen verschwindet', () => {
    const { world, light } = makeWorld(1, (_x, y) => (y < 60 ? STONE : AIR));
    applyBlockChange(world, light, 0, 60, 0, LIGHT_CRYSTAL);
    expect(blk(world.getLight(1, 60, 0))).toBe(14);
    expect(blk(world.getLight(-3, 60, 0))).toBe(12);
    applyBlockChange(world, light, 0, 60, 0, AIR);
    expect(blk(world.getLight(1, 60, 0))).toBe(0);
    expect(blk(world.getLight(-3, 60, 0))).toBe(0);
  });
});
