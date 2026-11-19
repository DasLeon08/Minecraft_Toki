/**
 * Ein Multiplayer-Raum: eigene Welt + Simulation (gleicher Code wie im Singleplayer),
 * Chunk-Streaming pro Spieler und Rück-Sync veränderter Chunks an den Host.
 */
import {
  applyBlockEntities,
  ChunkColumn,
  columnKey,
  columnKeyX,
  columnKeyZ,
  decodeColumnFull,
  DEFAULT_HOTBAR,
  encodeColumn,
  encodeFrame,
  Frame,
  LightEngine,
  maxStack,
  PLAYER_COLORS,
  Sim,
  TICKS_PER_SECOND,
  World,
  type AnyServerEvent,
  type ClientMessage,
  type GameMode,
  type PlayerPersist,
  type RemotePlayer,
  stripControlChars,
} from '@blockcraft/shared';
import type { GenPool } from '../gen/GenPool';
import type { Logger } from '../log';

export interface Conn {
  send(ev: AnyServerEvent): void;
  sendBinary(data: Uint8Array): void;
  close(code?: number, reason?: string): void;
  /** Ausstehende Bytes im Sendepuffer (Gegendruck beim Chunk-Versand). */
  readonly buffered: number;
}

interface Member {
  id: number;
  name: string;
  color: number;
  conn: Conn;
  /** Bereits gesendete Spalten. */
  sent: Set<number>;
  host: boolean;
}

export interface RoomOptions {
  code: string;
  hostToken: string;
  seed: number;
  time: number;
  mode: GameMode;
  worldName: string;
  spawn: { x: number; y: number; z: number };
  viewDistance: number;
  maxPlayers: number;
  dayLengthTicks: number;
  gen: GenPool;
  log: Logger;
}

const CHUNKS_PER_TICK = 4;
const MAX_BUFFER = 1.5 * 1024 * 1024;
const SYNC_EVERY_TICKS = 30 * TICKS_PER_SECOND;
const MAX_SPEED_PER_TICK = 6;
const GUEST_OFFSETS: [number, number][] = [
  [2, 1],
  [-2, 1],
  [1, -2],
  [-1, -2],
  [3, -1],
  [-3, -1],
  [2, 3],
  [-2, 3],
];

export class Room {
  readonly code: string;
  readonly hostToken: string;
  readonly world = new World();
  readonly light = new LightEngine(this.world);
  readonly sim: Sim;
  readonly members = new Map<number, Member>();
  /** Gespeicherte bzw. entladene veränderte Spalten (kodiert). */
  private readonly overrides = new Map<number, Uint8Array>();
  /** Spalten, die der Host noch zurückbekommen muss. */
  private readonly pendingSync = new Set<number>();
  private readonly loading = new Set<number>();
  private nextId = 1;
  private ticks = 0;
  emptySince: number | null = null;
  closed = false;
  private hostState: { player: PlayerPersist; position: { x: number; y: number; z: number } } | null = null;
  readonly createdAt = Date.now();

  constructor(readonly opts: RoomOptions) {
    this.code = opts.code;
    this.hostToken = opts.hostToken;
    this.sim = new Sim({
      world: this.world,
      light: this.light,
      time: opts.time,
      dayLengthTicks: opts.dayLengthTicks,
      mode: opts.mode,
      seed: opts.seed,
    });
    this.sim.spawn = { ...opts.spawn };
    this.sim.onEvent((ev, to) => {
      if (to === null) this.broadcast(ev);
      else this.members.get(to)?.conn.send(ev);
    });
  }

  get playerCount(): number {
    return this.members.size;
  }

  hasHost(): boolean {
    return [...this.members.values()].some((m) => m.host);
  }

  /** Vom Host hochgeladene, gespeicherte Spalte. */
  addUpload(cx: number, cz: number, data: Uint8Array): void {
    if (this.overrides.size > 20000) return;
    this.overrides.set(columnKey(cx, cz), data.slice());
  }

  setHostState(player: PlayerPersist | undefined, position: { x: number; y: number; z: number } | undefined): void {
    if (player) this.hostState = { player, position: position ?? this.opts.spawn };
  }

  join(conn: Conn, name: string, host: boolean): number | null {
    if (this.members.size >= this.opts.maxPlayers) return null;
    const id = this.nextId++;
    const color = PLAYER_COLORS[(id - 1) % PLAYER_COLORS.length];
    const m: Member = { id, name: name.slice(0, 20) || `Spieler ${id}`, color, conn, sent: new Set(), host };
    this.members.set(id, m);
    this.emptySince = null;
    const p = this.sim.addPlayer(id, this.opts.mode);
    let pos = { ...this.opts.spawn };
    if (host && this.hostState) {
      p.restore(this.hostState.player);
      pos = { ...this.hostState.position };
    } else if (this.opts.mode === 'creative') {
      DEFAULT_HOTBAR.forEach((bid, i) => (p.inventory.main.slots[i] = { id: bid, count: maxStack(bid) }));
    }
    if (!host) {
      // Gäste nicht ineinander erscheinen lassen: kleiner Versatz um den Spawn
      const o = GUEST_OFFSETS[(id - 1) % GUEST_OFFSETS.length];
      pos = { x: pos.x + o[0], y: pos.y, z: pos.z + o[1] };
    }
    p.x = pos.x;
    p.y = pos.y;
    p.z = pos.z;
    p.dirty = true;
    conn.send({
      t: 'joined',
      code: this.code,
      playerId: id,
      host,
      seed: this.opts.seed,
      time: this.sim.time,
      dayLengthTicks: this.opts.dayLengthTicks,
      mode: p.mode,
      spawn: this.opts.spawn,
      position: pos,
      viewDistance: this.opts.viewDistance,
      worldName: this.opts.worldName,
    });
    this.broadcast({ t: 'chat', from: '', text: `${m.name} ist beigetreten.`, system: true });
    this.opts.log.info(`Raum ${this.code}: ${m.name} beigetreten (${this.members.size} Spieler)`);
    return id;
  }

  leave(id: number, graceful: boolean): void {
    const m = this.members.get(id);
    if (!m) return;
    if (m.host) this.syncToHost(m);
    this.sim.removePlayer(id);
    this.members.delete(id);
    this.broadcast({ t: 'chat', from: '', text: `${m.name} hat den Raum verlassen.`, system: true });
    if (m.host && graceful) {
      // Der Host schliesst den Raum: die Welt gehört ihm
      for (const other of this.members.values()) {
        other.conn.send({ t: 'roomClosed', reason: 'Der Gastgeber hat den Raum geschlossen.' });
        other.conn.close(1000, 'Raum geschlossen');
      }
      this.members.clear();
      this.closed = true;
    }
    if (this.members.size === 0) this.emptySince = Date.now();
  }

  handle(id: number, msg: ClientMessage): void {
    const m = this.members.get(id);
    if (!m) return;
    if (msg.t === 'setMode' && !m.host) return; // nur der Host darf den Spielmodus ändern
    if (msg.t === 'playerState') {
      const p = this.sim.getPlayer(id);
      if (p && !p.dead && Math.hypot(msg.x - p.x, msg.y - p.y, msg.z - p.z) > MAX_SPEED_PER_TICK * 3) {
        // Unplausibler Sprung: Client auf die Server-Position zurücksetzen
        m.conn.send({ t: 'teleport', x: p.x, y: p.y, z: p.z });
        return;
      }
    }
    this.sim.handle(msg, id);
  }

  chat(id: number, text: string): void {
    const m = this.members.get(id);
    const clean = stripControlChars(String(text ?? ''))
      .trim()
      .slice(0, 200);
    if (!m || !clean) return;
    this.broadcast({ t: 'chat', from: m.name, text: clean });
  }

  broadcast(ev: AnyServerEvent): void {
    for (const m of this.members.values()) m.conn.send(ev);
  }

  tick(): void {
    if (this.closed) return;
    this.ticks++;
    this.sim.tick();
    this.streamChunks();
    if (this.ticks % 2 === 0) this.broadcastPlayers();
    if (this.ticks % SYNC_EVERY_TICKS === 0) {
      for (const m of this.members.values()) if (m.host) this.syncToHost(m);
    }
  }

  private broadcastPlayers(): void {
    if (this.members.size < 2) return;
    const list: RemotePlayer[] = [];
    for (const m of this.members.values()) {
      const p = this.sim.getPlayer(m.id);
      if (!p || p.dead) continue;
      list.push({ id: m.id, name: m.name, color: m.color, x: p.x, y: p.y, z: p.z, yaw: p.yaw, pitch: p.pitch });
    }
    this.broadcast({ t: 'players', list });
  }

  private wantedAround(x: number, z: number, r: number): number[] {
    const cx = Math.floor(x) >> 4;
    const cz = Math.floor(z) >> 4;
    const out: { k: number; d: number }[] = [];
    const rr = (r + 0.5) * (r + 0.5);
    for (let dz = -r - 1; dz <= r + 1; dz++)
      for (let dx = -r - 1; dx <= r + 1; dx++) {
        const d = dx * dx + dz * dz;
        if (d <= (r + 1.5) * (r + 1.5)) out.push({ k: columnKey(cx + dx, cz + dz), d: d <= rr ? d : d + 1000 });
      }
    return out.sort((a, b) => a.d - b.d).map((e) => e.k);
  }

  private streamChunks(): void {
    const r = this.opts.viewDistance;
    const needed = new Set<number>();
    for (const m of this.members.values()) {
      const p = this.sim.getPlayer(m.id);
      if (!p) continue;
      const wanted = this.wantedAround(p.x, p.z, r);
      for (const k of wanted) needed.add(k);
      // Senden (nächste zuerst, mit Gegendruck)
      let budget = CHUNKS_PER_TICK;
      for (const k of wanted) {
        if (budget <= 0 || m.conn.buffered > MAX_BUFFER) break;
        if (m.sent.has(k)) continue;
        const col = this.world.columns.get(k);
        if (!col) continue;
        m.conn.sendBinary(encodeFrame(Frame.Chunk, col.cx, col.cz, encodeColumn(col)));
        m.sent.add(k);
        budget--;
      }
      // Weit entfernte Spalten als «nicht gesendet» markieren (Client entlädt sie)
      const cx = Math.floor(p.x) >> 4;
      const cz = Math.floor(p.z) >> 4;
      const far = (r + 2.5) * (r + 2.5);
      for (const k of m.sent) {
        const dx = columnKeyX(k) - cx;
        const dz = columnKeyZ(k) - cz;
        if (dx * dx + dz * dz > far) m.sent.delete(k);
      }
    }
    // Laden
    for (const k of needed) {
      if (this.world.columns.has(k) || this.loading.has(k)) continue;
      if (this.opts.gen.busy > this.opts.gen.size * 3) break;
      this.loadColumn(k);
    }
    // Entladen, was niemand mehr braucht
    if (this.ticks % 20 === 0) {
      for (const [k, col] of this.world.columns) {
        let keep = false;
        for (const m of this.members.values()) {
          const p = this.sim.getPlayer(m.id);
          if (!p) continue;
          const dx = col.cx - (Math.floor(p.x) >> 4);
          const dz = col.cz - (Math.floor(p.z) >> 4);
          if (dx * dx + dz * dz <= (r + 3) * (r + 3)) keep = true;
        }
        if (keep) continue;
        if (col.modified) {
          this.overrides.set(k, encodeColumn(col));
          this.pendingSync.add(k);
        }
        this.world.removeColumn(col.cx, col.cz);
        this.light.invalidateCache();
      }
    }
  }

  private loadColumn(k: number): void {
    const cx = columnKeyX(k);
    const cz = columnKeyZ(k);
    this.loading.add(k);
    const saved = this.overrides.get(k);
    const decoded = saved ? decodeColumnFull(saved) : null;
    const task = decoded ? this.opts.gen.run({ op: 'light', blocks: decoded.blocks }) : this.opts.gen.run({ op: 'gen', seed: this.opts.seed, cx, cz });
    task
      .then((res) => {
        this.loading.delete(k);
        if (this.closed || this.world.columns.has(k)) return;
        const col = ChunkColumn.fromFlat(cx, cz, res.blocks, res.light);
        if (decoded) applyBlockEntities(col, decoded.blockEntities);
        this.world.addColumn(col);
        this.light.invalidateCache();
        this.light.stitchColumn(cx, cz);
        // Licht-Abgleich kann Nachbarn verändern: deren Daten beim Client sind trotzdem korrekt,
        // da der Client das Licht selbst aus den Blöcken berechnet.
      })
      .catch((err: unknown) => {
        this.loading.delete(k);
        this.opts.log.error('Chunk-Generierung fehlgeschlagen', cx, cz, err);
      });
  }

  /** Schickt alle veränderten Spalten und den Spielerzustand an den Host. */
  syncToHost(host: Member): number {
    let n = 0;
    for (const col of this.world.columns.values()) {
      if (!col.modified) continue;
      const data = encodeColumn(col);
      this.overrides.set(columnKey(col.cx, col.cz), data);
      col.modified = false;
      this.pendingSync.add(columnKey(col.cx, col.cz));
    }
    for (const k of this.pendingSync) {
      const data = this.overrides.get(k);
      if (!data) continue;
      host.conn.sendBinary(encodeFrame(Frame.Sync, columnKeyX(k), columnKeyZ(k), data));
      n++;
    }
    this.pendingSync.clear();
    const p = this.sim.getPlayer(host.id);
    if (p) host.conn.send({ t: 'hostState', player: p.persist(), position: { x: p.x, y: p.y, z: p.z }, time: this.sim.time });
    host.conn.send({ t: 'syncDone', count: n });
    return n;
  }

  close(reason: string): void {
    for (const m of this.members.values()) {
      if (m.host) this.syncToHost(m);
      m.conn.send({ t: 'roomClosed', reason });
      m.conn.close(1000, 'Raum geschlossen');
    }
    this.members.clear();
    this.closed = true;
  }
}
