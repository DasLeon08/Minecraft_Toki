/** Worker-Thread: Weltgenerierung und Spaltenlicht (entlastet den Haupt-Thread des Servers). */
import { parentPort } from 'node:worker_threads';
import { computeColumnLight, TerrainGenerator } from '@blockcraft/shared';

export type GenRequest =
  | { id: number; op: 'gen'; seed: number; cx: number; cz: number }
  | { id: number; op: 'light'; blocks: Uint16Array };
export interface GenResponse {
  id: number;
  blocks: Uint16Array;
  light: Uint8Array;
}

const gens = new Map<number, TerrainGenerator>();

export function handleGen(req: GenRequest): GenResponse {
  if (req.op === 'gen') {
    let gen = gens.get(req.seed);
    if (!gen) {
      gen = new TerrainGenerator(req.seed);
      gens.set(req.seed, gen);
      if (gens.size > 8) gens.delete(gens.keys().next().value!);
    }
    const blocks = gen.generateColumn(req.cx, req.cz);
    return { id: req.id, blocks, light: computeColumnLight(blocks) };
  }
  return { id: req.id, blocks: req.blocks, light: computeColumnLight(req.blocks) };
}

if (parentPort) {
  const port = parentPort;
  port.on('message', (req: GenRequest) => {
    const res = handleGen(req);
    port.postMessage(res, [res.blocks.buffer as ArrayBuffer, res.light.buffer as ArrayBuffer]);
  });
}
