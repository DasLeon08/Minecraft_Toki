/** Verwaltet Räume: Codes, Limits, Rate-Limit für Beitritte, Aufräumen leerer Räume. */
import { randomBytes, randomInt } from 'node:crypto';
import { ROOM_CODE_ALPHABET, TICKS_PER_SECOND } from '@blockcraft/shared';
import type { ServerConfig } from '../config';
import type { GenPool } from '../gen/GenPool';
import type { Logger } from '../log';
import { Room, type RoomOptions } from './Room';

export class RateLimiter {
  private readonly hits = new Map<string, number[]>();
  constructor(
    private readonly limit: number,
    private readonly windowMs = 60_000,
  ) {}

  /** Gibt false zurück, wenn das Limit überschritten ist. */
  allow(key: string, now = Date.now()): boolean {
    const list = (this.hits.get(key) ?? []).filter((t) => now - t < this.windowMs);
    if (list.length >= this.limit) {
      this.hits.set(key, list);
      return false;
    }
    list.push(now);
    this.hits.set(key, list);
    return true;
  }

  prune(now = Date.now()): void {
    for (const [k, list] of this.hits) if (list.every((t) => now - t >= this.windowMs)) this.hits.delete(k);
  }
}

export class RoomManager {
  readonly rooms = new Map<string, Room>();
  readonly joinLimiter: RateLimiter;
  private readonly timer: ReturnType<typeof setInterval>;

  constructor(
    private readonly config: ServerConfig,
    private readonly gen: GenPool,
    private readonly log: Logger,
  ) {
    this.joinLimiter = new RateLimiter(config.JOIN_RATE_LIMIT_PER_MIN);
    this.timer = setInterval(() => this.tick(), 1000 / config.TICK_RATE);
    this.timer.unref?.();
  }

  private tick(): void {
    const now = Date.now();
    for (const room of this.rooms.values()) {
      try {
        room.tick();
      } catch (err) {
        this.log.error(`Raum ${room.code}: Fehler im Tick`, err);
      }
      const idleMs = this.config.ROOM_IDLE_TIMEOUT_MIN * 60_000;
      if (room.closed || (room.emptySince !== null && now - room.emptySince > idleMs)) {
        if (!room.closed) room.close('Raum wegen Inaktivität geschlossen.');
        this.rooms.delete(room.code);
        this.log.info(`Raum ${room.code} geschlossen (${this.rooms.size} aktiv)`);
      }
    }
    if (Math.random() < 0.01) this.joinLimiter.prune(now);
  }

  newCode(): string {
    for (let attempt = 0; attempt < 1000; attempt++) {
      let code = '';
      for (let i = 0; i < this.config.ROOM_CODE_LENGTH; i++) code += ROOM_CODE_ALPHABET[randomInt(ROOM_CODE_ALPHABET.length)];
      if (!this.rooms.has(code)) return code;
    }
    throw new Error('Kein freier Raumcode');
  }

  canCreate(): boolean {
    return this.rooms.size < this.config.MAX_ROOMS;
  }

  create(opts: Omit<RoomOptions, 'code' | 'hostToken' | 'viewDistance' | 'maxPlayers' | 'gen' | 'log' | 'dayLengthTicks'> & { dayLengthTicks?: number }): Room {
    const room = new Room({
      ...opts,
      code: this.newCode(),
      hostToken: randomBytes(16).toString('hex'),
      viewDistance: this.config.MAX_VIEW_DISTANCE,
      maxPlayers: this.config.MAX_PLAYERS_PER_ROOM,
      dayLengthTicks: opts.dayLengthTicks ?? 1200 * TICKS_PER_SECOND,
      gen: this.gen,
      log: this.log,
    });
    this.rooms.set(room.code, room);
    this.log.info(`Raum ${room.code} erstellt («${opts.worldName}», ${this.rooms.size} aktiv)`);
    return room;
  }

  get(code: string): Room | undefined {
    return this.rooms.get(code);
  }

  stats(): { rooms: number; players: number } {
    let players = 0;
    for (const r of this.rooms.values()) players += r.playerCount;
    return { rooms: this.rooms.size, players };
  }

  close(): void {
    clearInterval(this.timer);
    for (const r of this.rooms.values()) r.close('Server wird neu gestartet.');
    this.rooms.clear();
  }
}
