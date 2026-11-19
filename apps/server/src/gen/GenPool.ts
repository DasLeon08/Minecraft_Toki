/**
 * Pool aus Generierungs-Workern (worker_threads). Ohne gebaute Worker-Datei
 * (z. B. in Tests mit TS-Quellen) wird direkt im Haupt-Thread generiert.
 */
import { existsSync } from 'node:fs';
import { cpus } from 'node:os';
import { fileURLToPath } from 'node:url';
import { Worker } from 'node:worker_threads';
import { handleGen, type GenRequest, type GenResponse } from './genWorker';

type Job = { req: GenRequest; resolve: (r: GenResponse) => void; reject: (e: unknown) => void };
type Payload = { op: 'gen'; seed: number; cx: number; cz: number } | { op: 'light'; blocks: Uint16Array };

export class GenPool {
  private readonly workers: { w: Worker; job: Job | null }[] = [];
  private readonly queue: Job[] = [];
  private nextId = 1;
  readonly inline: boolean;

  constructor(size: number) {
    const url = new URL('./gen/genWorker.js', import.meta.url);
    const file = url.protocol === 'file:' ? fileURLToPath(url) : '';
    const n = size > 0 ? size : Math.max(1, Math.min(4, cpus().length - 1));
    this.inline = !file || !existsSync(file);
    if (this.inline) return;
    for (let i = 0; i < n; i++) {
      const slot = { w: new Worker(url), job: null as Job | null };
      slot.w.on('message', (res: GenResponse) => {
        const job = slot.job;
        slot.job = null;
        job?.resolve(res);
        this.pump();
      });
      slot.w.on('error', (err) => {
        const job = slot.job;
        slot.job = null;
        job?.reject(err);
        this.pump();
      });
      this.workers.push(slot);
    }
  }

  get size(): number {
    return this.inline ? 1 : this.workers.length;
  }

  get busy(): number {
    return this.queue.length + this.workers.filter((w) => w.job).length;
  }

  run(payload: Payload): Promise<GenResponse> {
    const req = { id: this.nextId++, ...payload } as GenRequest;
    if (this.inline) {
      return new Promise((resolve, reject) =>
        setImmediate(() => {
          try {
            resolve(handleGen(req));
          } catch (e) {
            reject(e);
          }
        }),
      );
    }
    return new Promise((resolve, reject) => {
      this.queue.push({ req, resolve, reject });
      this.pump();
    });
  }

  private pump(): void {
    for (const slot of this.workers) {
      if (slot.job || this.queue.length === 0) continue;
      const job = this.queue.shift()!;
      slot.job = job;
      const transfer = job.req.op === 'light' ? [job.req.blocks.buffer as ArrayBuffer] : [];
      slot.w.postMessage(job.req, transfer);
    }
  }

  async close(): Promise<void> {
    await Promise.all(this.workers.map((w) => w.w.terminate()));
    this.workers.length = 0;
  }
}
