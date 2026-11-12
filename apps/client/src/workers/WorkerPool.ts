import type { WorkerRequest, WorkerResponse } from './protocol';

interface Job {
  msg: WorkerRequest;
  transfer: Transferable[];
  resolve: (r: WorkerResponse) => void;
  reject: (e: unknown) => void;
}

interface Slot {
  worker: Worker;
  job: Job | null;
}

/** Einfacher Pool gleichartiger Welt-Worker (FIFO, Priorisierung macht der Aufrufer). */
export class WorkerPool {
  private readonly slots: Slot[] = [];
  private readonly queue: Job[] = [];
  /** Statistik: letzte Laufzeiten. */
  lastGenMs = 0;
  lastMeshMs = 0;

  constructor(readonly size: number) {
    for (let i = 0; i < size; i++) {
      const worker = new Worker(new URL('./world.worker.ts', import.meta.url), { type: 'module', name: `welt-${i}` });
      const slot: Slot = { worker, job: null };
      worker.onmessage = (e: MessageEvent<WorkerResponse>) => {
        const job = slot.job;
        slot.job = null;
        const r = e.data;
        if (r.op === 'column') this.lastGenMs = r.ms;
        else if (r.op === 'mesh') this.lastMeshMs = r.ms;
        job?.resolve(r);
        this.pump();
      };
      worker.onerror = (e) => {
        const job = slot.job;
        slot.job = null;
        job?.reject(e);
        this.pump();
      };
      this.slots.push(slot);
    }
  }

  /** Initialisiert alle Worker (z. B. mit dem Seed). */
  async broadcast(msg: WorkerRequest): Promise<void> {
    await Promise.all(
      this.slots.map(
        (slot) =>
          new Promise<void>((resolve, reject) => {
            const job: Job = { msg, transfer: [], resolve: () => resolve(), reject };
            if (slot.job) this.queue.unshift(job);
            else {
              slot.job = job;
              slot.worker.postMessage(msg);
            }
          }),
      ),
    );
  }

  /** Führt einen Auftrag aus. `urgent` stellt ihn an den Anfang der Warteschlange. */
  run(msg: WorkerRequest, transfer: Transferable[] = [], urgent = false): Promise<WorkerResponse> {
    return new Promise((resolve, reject) => {
      const job = { msg, transfer, resolve, reject };
      if (urgent) this.queue.unshift(job);
      else this.queue.push(job);
      this.pump();
    });
  }

  get busy(): number {
    return this.slots.filter((s) => s.job).length + this.queue.length;
  }

  private pump(): void {
    for (const slot of this.slots) {
      if (slot.job || this.queue.length === 0) continue;
      const job = this.queue.shift()!;
      slot.job = job;
      slot.worker.postMessage(job.msg, job.transfer);
    }
  }

  dispose(): void {
    for (const s of this.slots) s.worker.terminate();
    this.slots.length = 0;
    for (const j of this.queue) j.reject(new Error('Pool beendet'));
    this.queue.length = 0;
  }
}
