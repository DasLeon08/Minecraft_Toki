/// <reference lib="webworker" />
/**
 * Welt-Worker: Generierung, Spaltenlicht und Meshing. Hält keinen Weltzustand,
 * bekommt Eingaben als Transferables und gibt Ergebnisse als Transferables zurück.
 */
import { computeColumnLight, meshSection, TerrainGenerator } from '@blockcraft/shared';
import type { WorkerRequest, WorkerResponse } from './protocol';

declare const self: DedicatedWorkerGlobalScope;

let gen: TerrainGenerator | null = null;

function post(msg: WorkerResponse, transfer: Transferable[]): void {
  self.postMessage(msg, transfer);
}

self.onmessage = (e: MessageEvent<WorkerRequest>) => {
  const msg = e.data;
  const t0 = performance.now();
  switch (msg.op) {
    case 'init':
      gen = new TerrainGenerator(msg.seed);
      post({ op: 'init' }, []);
      break;
    case 'gen': {
      if (!gen) throw new Error('Worker nicht initialisiert');
      const blocks = gen.generateColumn(msg.cx, msg.cz);
      const light = computeColumnLight(blocks);
      post({ op: 'column', cx: msg.cx, cz: msg.cz, blocks, light, ms: performance.now() - t0 }, [blocks.buffer, light.buffer]);
      break;
    }
    case 'light': {
      const light = computeColumnLight(msg.blocks);
      post(
        { op: 'column', cx: msg.cx, cz: msg.cz, blocks: msg.blocks, light, ms: performance.now() - t0 },
        [msg.blocks.buffer, light.buffer],
      );
      break;
    }
    case 'mesh': {
      const data = meshSection(msg.blocks, msg.light);
      const transfer: Transferable[] = [msg.blocks.buffer, msg.light.buffer];
      for (const l of [data.opaque, data.cutout, data.translucent]) {
        if (l) transfer.push(l.pos.buffer, l.uvl.buffer, l.light.buffer, l.index.buffer);
      }
      post({ op: 'mesh', key: msg.key, data, blocks: msg.blocks, light: msg.light, ms: performance.now() - t0 }, transfer);
      break;
    }
  }
};
