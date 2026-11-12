import { ChunkColumn } from '../src/world/ChunkColumn';
import { World } from '../src/world/World';
import { LightEngine, computeColumnLight } from '../src/light/light';
import { COLUMN_VOLUME } from '../src/constants';

/** Baut eine kleine Testwelt aus Spalten mit einer Füllfunktion. */
export function makeWorld(
  radius: number,
  fill: (x: number, y: number, z: number) => number,
): { world: World; light: LightEngine } {
  const world = new World();
  const light = new LightEngine(world);
  for (let cz = -radius; cz <= radius; cz++) {
    for (let cx = -radius; cx <= radius; cx++) {
      const flat = new Uint16Array(COLUMN_VOLUME);
      for (let y = 0; y < 256; y++)
        for (let z = 0; z < 16; z++) for (let x = 0; x < 16; x++) flat[(y << 8) | (z << 4) | x] = fill(cx * 16 + x, y, cz * 16 + z);
      const col = ChunkColumn.fromFlat(cx, cz, flat, computeColumnLight(flat));
      world.addColumn(col);
      light.stitchColumn(cx, cz);
    }
  }
  return { world, light };
}
