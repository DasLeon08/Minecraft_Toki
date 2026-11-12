import { describe, expect, it } from 'vitest';
import { encodeColumn, decodeColumn } from '../src/storage/columnCodec';
import { TerrainGenerator } from '../src/gen/terrain';
import { ChunkColumn } from '../src/world/ChunkColumn';
import { parseEnv, EnvError } from '../src/config/env';
import { Sim } from '../src/sim/Sim';
import { AIR, BEDROCK, GLASS, STONE, TALL_GRASS, GRASS } from '../src/registry/blocks';
import { makeWorld } from './helpers';

describe('Speicherformat', () => {
  it('Roundtrip einer generierten Spalte ist verlustfrei und kompakt', () => {
    const flat = new TerrainGenerator(7).generateColumn(2, 3);
    const col = ChunkColumn.fromFlat(2, 3, flat, null);
    const enc = encodeColumn(col);
    expect(enc.byteLength).toBeLessThan(20000);
    expect(decodeColumn(enc)).toEqual(flat);
  });
});

describe('Env-Validierung', () => {
  const schema = {
    PORT: { type: 'int', default: 8080, min: 1, max: 65535 },
    DEBUG: { type: 'bool', default: false },
    ORIGINS: { type: 'list', default: [] as string[] },
    LOG: { type: 'string', default: 'info', oneOf: ['debug', 'info'] },
  } as const;

  it('nutzt Standardwerte und parst Werte', () => {
    expect(parseEnv(schema, {})).toEqual({ PORT: 8080, DEBUG: false, ORIGINS: [], LOG: 'info' });
    expect(parseEnv(schema, { PORT: '3000', DEBUG: 'true', ORIGINS: 'a.com, b.com', LOG: 'debug' })).toEqual({
      PORT: 3000,
      DEBUG: true,
      ORIGINS: ['a.com', 'b.com'],
      LOG: 'debug',
    });
  });

  it('meldet alle Fehler gesammelt', () => {
    try {
      parseEnv(schema, { PORT: 'abc', DEBUG: 'vielleicht', LOG: 'laut' });
      expect.unreachable();
    } catch (e) {
      expect(e).toBeInstanceOf(EnvError);
      expect((e as EnvError).problems).toHaveLength(3);
    }
  });
});

describe('Simulation', () => {
  it('validiert Blockänderungen und markiert Spalten als verändert', () => {
    const { world, light } = makeWorld(1, (_x, y) => (y === 0 ? BEDROCK : y < 60 ? STONE : y === 60 ? GRASS : AIR));
    const sim = new Sim({ world, light, time: 0, dayLengthTicks: 24000, mode: 'survival' });
    const events: string[] = [];
    sim.onEvent((e) => events.push(e.t));
    sim.handle({ t: 'setBlock', seq: 1, x: 1, y: 61, z: 1, id: GLASS });
    expect(world.getBlock(1, 61, 1)).toBe(GLASS);
    expect(world.getColumn(0, 0)!.modified).toBe(true);
    // Urgestein im Survival unzerstörbar
    sim.handle({ t: 'setBlock', seq: 2, x: 1, y: 0, z: 1, id: AIR });
    expect(world.getBlock(1, 0, 1)).toBe(BEDROCK);
    expect(events).toContain('rejected');
    // Belegter Platz kann nicht überschrieben werden
    sim.handle({ t: 'setBlock', seq: 3, x: 1, y: 61, z: 1, id: STONE });
    expect(world.getBlock(1, 61, 1)).toBe(GLASS);
  });

  it('Pflanzen brauchen Boden und fallen weg, wenn er abgebaut wird', () => {
    const { world, light } = makeWorld(1, (_x, y) => (y < 60 ? STONE : y === 60 ? GRASS : AIR));
    const sim = new Sim({ world, light, time: 0, dayLengthTicks: 24000, mode: 'creative' });
    sim.handle({ t: 'setBlock', seq: 1, x: 2, y: 61, z: 2, id: TALL_GRASS });
    expect(world.getBlock(2, 61, 2)).toBe(TALL_GRASS);
    sim.handle({ t: 'setBlock', seq: 2, x: 2, y: 60, z: 2, id: AIR });
    expect(world.getBlock(2, 61, 2)).toBe(AIR);
    // In der Luft nicht platzierbar
    sim.handle({ t: 'setBlock', seq: 3, x: 5, y: 70, z: 5, id: TALL_GRASS });
    expect(world.getBlock(5, 70, 5)).toBe(AIR);
  });
});
