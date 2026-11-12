/**
 * Performance-Budgets (grobe Obergrenzen, damit Regressionen in CI auffallen).
 * Die gemessenen Werte werden zusätzlich ausgegeben.
 */
import { describe, expect, it } from 'vitest';
import { TerrainGenerator } from '../src/gen/terrain';
import { computeColumnLight, LightEngine } from '../src/light/light';
import { meshSection } from '../src/mesh/mesher';
import { fillPadded, PAD_VOLUME } from '../src/mesh/padded';
import { ChunkColumn } from '../src/world/ChunkColumn';
import { World } from '../src/world/World';

function timeIt(runs: number, fn: (i: number) => void): number {
  fn(-1); // Aufwärmen
  const t0 = performance.now();
  for (let i = 0; i < runs; i++) fn(i);
  return (performance.now() - t0) / runs;
}

describe('Performance-Budgets', () => {
  const gen = new TerrainGenerator(12345);

  it('Spalte generieren + Licht < 40 ms', () => {
    const ms = timeIt(20, (i) => computeColumnLight(gen.generateColumn(i, 7)));
    console.log(`Generierung + Licht pro Spalte: ${ms.toFixed(2)} ms`);
    expect(ms).toBeLessThan(40);
  });

  it('Section meshen (inkl. Padding) < 8 ms, Spalten-Abgleich < 15 ms', () => {
    const world = new World();
    const light = new LightEngine(world);
    let stitch = 0;
    for (let cz = -1; cz <= 1; cz++)
      for (let cx = -1; cx <= 1; cx++) {
        const f = gen.generateColumn(cx, cz);
        world.addColumn(ChunkColumn.fromFlat(cx, cz, f, computeColumnLight(f)));
        const t0 = performance.now();
        light.stitchColumn(cx, cz);
        stitch += performance.now() - t0;
      }
    const b = new Uint16Array(PAD_VOLUME);
    const l = new Uint8Array(PAD_VOLUME);
    let sy = 3;
    const ms = timeIt(40, () => {
      sy = 3 + ((sy - 2) % 3);
      fillPadded(world, 0, sy, 0, b, l);
      meshSection(b, l);
    });
    console.log(`Meshen pro Section: ${ms.toFixed(2)} ms, Abgleich pro Spalte: ${(stitch / 9).toFixed(2)} ms`);
    expect(ms).toBeLessThan(8);
    expect(stitch / 9).toBeLessThan(15);
  });
});
