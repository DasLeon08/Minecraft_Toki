import { describe, expect, it } from 'vitest';
import { TerrainGenerator } from '../src/gen/terrain';
import { hashString, mix32, seedFromInput } from '../src/util/hash';
import { AIR, BEDROCK, WATER } from '../src/registry/blocks';
import { SEA_LEVEL } from '../src/constants';

function hashColumn(data: Uint16Array): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < data.length; i++) {
    h ^= data[i];
    h = Math.imul(h, 0x01000193);
  }
  return mix32(h);
}

describe('Weltgenerierung', () => {
  it('ist deterministisch (gleicher Seed → gleiche Spalte)', () => {
    const a = new TerrainGenerator(hashString('BENCH'));
    const b = new TerrainGenerator(hashString('BENCH'));
    for (const [cx, cz] of [
      [0, 0],
      [3, -7],
      [-12, 40],
    ]) {
      expect(hashColumn(a.generateColumn(cx, cz))).toBe(hashColumn(b.generateColumn(cx, cz)));
    }
  });

  it('liefert für verschiedene Seeds verschiedene Welten', () => {
    const a = new TerrainGenerator(1).generateColumn(0, 0);
    const b = new TerrainGenerator(2).generateColumn(0, 0);
    expect(hashColumn(a)).not.toBe(hashColumn(b));
  });

  it('Golden Hash bleibt stabil (Änderung = bewusste Formatänderung)', () => {
    const gen = new TerrainGenerator(hashString('BENCH'));
    const hashes = [
      [0, 0],
      [1, 0],
      [-5, 9],
    ].map(([cx, cz]) => hashColumn(gen.generateColumn(cx, cz)));
    expect(hashes).toMatchSnapshot();
  });

  it('hat Urgestein am Boden und kein Wasser über dem Meeresspiegel', () => {
    const gen = new TerrainGenerator(42);
    for (let cx = -3; cx <= 3; cx++) {
      const col = gen.generateColumn(cx, 2);
      for (let z = 0; z < 16; z++)
        for (let x = 0; x < 16; x++) {
          expect(col[(z << 4) | x]).toBe(BEDROCK);
          for (let y = SEA_LEVEL + 1; y < 256; y++) expect(col[(y << 8) | (z << 4) | x]).not.toBe(WATER);
        }
    }
  });

  it('findet einen Spawn über dem Meeresspiegel', () => {
    const gen = new TerrainGenerator(hashString('Spawn-Test'));
    const s = gen.findSpawn();
    expect(s.y).toBeGreaterThan(SEA_LEVEL);
    const col = gen.generateColumn(Math.floor(s.x) >> 4, Math.floor(s.z) >> 4);
    const lx = Math.floor(s.x) & 15;
    const lz = Math.floor(s.z) & 15;
    expect(col[((s.y - 1) << 8) | (lz << 4) | lx]).not.toBe(AIR);
  });

  it('Seed-Eingabe: Zahlen bleiben Zahlen, Text wird gehasht', () => {
    expect(seedFromInput('12345')).toBe(12345);
    expect(seedFromInput('Hallo')).toBe(hashString('Hallo'));
    expect(seedFromInput('Hallo')).toBe(seedFromInput(' Hallo '));
  });
});
