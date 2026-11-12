import type { ClientMessage, ServerEvent, Transport } from './protocol';
import type { Sim } from './Sim';

/** Singleplayer: Client und Simulation im selben Prozess, gleiche Welt. */
export class LocalTransport implements Transport {
  readonly sharesWorld = true;
  private readonly unsub: (() => void)[] = [];

  constructor(
    private readonly sim: Sim,
    readonly playerId = 1,
  ) {}

  send(msg: ClientMessage): void {
    this.sim.handle(msg, this.playerId);
  }

  onEvent(listener: (ev: ServerEvent) => void): () => void {
    const off = this.sim.onEvent((ev, to) => {
      if (to === null || to === this.playerId) listener(ev);
    });
    this.unsub.push(off);
    return off;
  }

  close(): void {
    for (const u of this.unsub) u();
    this.unsub.length = 0;
  }
}
