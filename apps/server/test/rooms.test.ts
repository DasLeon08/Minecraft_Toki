import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import WebSocket from 'ws';
import { ChunkColumn, decodeColumnFull, decodeFrame, encodeColumn, encodeFrame, Frame, STONE, BRICKS, AIR, type AnyServerEvent } from '@blockcraft/shared';
import { loadConfig } from '../src/config';
import { createLogger } from '../src/log';
import { RateLimiter } from '../src/rooms/RoomManager';
import { startServer, type RunningServer } from '../src/server';

let server: RunningServer;

beforeAll(async () => {
  const config = loadConfig({
    PORT: '0',
    CLIENT_DIST_DIR: '/nicht/vorhanden',
    LOG_LEVEL: 'error',
    MAX_ROOMS: '2',
    MAX_PLAYERS_PER_ROOM: '2',
    MAX_VIEW_DISTANCE: '2',
    JOIN_RATE_LIMIT_PER_MIN: '1000',
  });
  server = await startServer(config, createLogger('error'), '/');
});

afterAll(async () => {
  await server.close();
});

// Räume eines Tests schliessen (abrupt getrennte Räume blieben sonst bis zum Inaktivitäts-Timeout offen)
afterEach(async () => {
  for (const r of [...server.rooms.rooms.values()]) r.close('Test-Ende');
  await new Promise((r) => setTimeout(r, 120));
});

vi.setConfig({ testTimeout: 30_000 });

/** Kleiner Test-Client mit Ereignis-Puffer. */
class Client {
  readonly ws: WebSocket;
  readonly events: AnyServerEvent[] = [];
  readonly chunks = new Map<string, Uint8Array>();
  readonly syncs = new Map<string, Uint8Array>();
  private waiters: { pred: (e: AnyServerEvent) => boolean; resolve: (e: AnyServerEvent) => void }[] = [];

  constructor(name: string) {
    this.ws = new WebSocket(`ws://127.0.0.1:${server.port}/ws`);
    this.ws.on('message', (data, isBinary) => {
      if (isBinary) {
        const buf = data as Buffer;
        const f = decodeFrame(new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength))!;
        (f.type === Frame.Sync ? this.syncs : this.chunks).set(`${f.cx},${f.cz}`, f.data.slice());
        return;
      }
      const ev = JSON.parse(String(data)) as AnyServerEvent;
      this.events.push(ev);
      this.waiters = this.waiters.filter((w) => {
        if (w.pred(ev)) {
          w.resolve(ev);
          return false;
        }
        return true;
      });
    });
    this.ready = new Promise<void>((resolve) => this.ws.on('open', () => resolve())).then(() => this.send({ t: 'hello', version: 1, name }));
  }
  ready: Promise<void>;

  send(msg: object): void {
    this.ws.send(JSON.stringify(msg));
  }

  wait<T extends AnyServerEvent['t']>(t: T, pred: (e: Extract<AnyServerEvent, { t: T }>) => boolean = () => true, ms = 8000): Promise<Extract<AnyServerEvent, { t: T }>> {
    const hit = this.events.find((e) => e.t === t && pred(e as Extract<AnyServerEvent, { t: T }>));
    if (hit) return Promise.resolve(hit as Extract<AnyServerEvent, { t: T }>);
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`Timeout: ${t}`)), ms);
      this.waiters.push({
        pred: (e) => e.t === t && pred(e as Extract<AnyServerEvent, { t: T }>),
        resolve: (e) => {
          clearTimeout(timer);
          resolve(e as Extract<AnyServerEvent, { t: T }>);
        },
      });
    });
  }

  async waitFor(cond: () => boolean, ms = 8000): Promise<void> {
    const t0 = Date.now();
    while (!cond()) {
      if (Date.now() - t0 > ms) throw new Error('Timeout (Bedingung)');
      await new Promise((r) => setTimeout(r, 25));
    }
  }

  close(): void {
    this.ws.close();
  }
}

async function hostRoom(name = 'Host', uploads: [number, number, Uint8Array][] = []): Promise<{ host: Client; code: string }> {
  const host = new Client(name);
  await host.ready;
  host.send({ t: 'createRoom', seed: 4242, time: 1000, mode: 'creative', worldName: 'Testwelt', spawn: { x: 0.5, y: 80, z: 0.5 } });
  const created = await host.wait('roomCreated');
  for (const [cx, cz, data] of uploads) host.ws.send(encodeFrame(Frame.Upload, cx, cz, data));
  host.send({ t: 'uploadDone' });
  await host.wait('joined');
  return { host, code: created.code };
}

describe('Multiplayer-Räume', () => {
  it('Raum erstellen und per Code beitreten, beide bekommen Chunks', async () => {
    const { host, code } = await hostRoom();
    expect(code).toMatch(/^[A-Z2-9]{6}$/);
    const guest = new Client('Gast');
    await guest.ready;
    guest.send({ t: 'joinRoom', code: code.toLowerCase() });
    const joined = await guest.wait('joined');
    expect(joined.seed).toBe(4242);
    expect(joined.host).toBe(false);
    await guest.waitFor(() => guest.chunks.has('0,0'));
    await host.waitFor(() => host.chunks.has('0,0'));
    const col = decodeColumnFull(guest.chunks.get('0,0')!);
    expect(col.blocks.some((b) => b !== 0)).toBe(true);
    await host.wait('chat', (e) => !!e.system && e.text.includes('Gast'));
    host.close();
    guest.close();
  });

  it('falscher Code wird abgelehnt, voller Raum ebenso', async () => {
    const { host, code } = await hostRoom();
    const bad = new Client('X');
    await bad.ready;
    bad.send({ t: 'joinRoom', code: 'ZZZZZZ' });
    expect((await bad.wait('error')).code).toBe('not_found');
    const g1 = new Client('G1');
    await g1.ready;
    g1.send({ t: 'joinRoom', code });
    await g1.wait('joined');
    const g2 = new Client('G2');
    await g2.ready;
    g2.send({ t: 'joinRoom', code });
    expect((await g2.wait('error')).code).toBe('full');
    for (const c of [host, bad, g1, g2]) c.close();
  });

  it('Blockänderungen und Positionen werden synchronisiert, Chat kommt an', async () => {
    const { host, code } = await hostRoom();
    const guest = new Client('Gast');
    await guest.ready;
    guest.send({ t: 'joinRoom', code });
    await guest.wait('joined');
    await guest.waitFor(() => guest.chunks.has('0,0'));
    await host.waitFor(() => host.chunks.has('0,0'));
    await new Promise((r) => setTimeout(r, 300));
    host.send({ t: 'playerState', x: 0.5, y: 80, z: 0.5, yaw: 0, pitch: 0, inWater: false, eyesInWater: false, sprinting: false, jumped: false, landedFrom: 0 });
    host.send({ t: 'setBlock', seq: 1, x: 1, y: 82, z: 1, id: BRICKS });
    await guest.wait('blockChanged', (e) => e.x === 1 && e.y === 82 && e.z === 1 && e.id === BRICKS);
    guest.send({ t: 'playerState', x: 3.5, y: 80, z: 2.5, yaw: 1, pitch: 0, inWater: false, eyesInWater: false, sprinting: false, jumped: false, landedFrom: 0 });
    const players = await host.wait('players', (e) => e.list.some((p) => p.name === 'Gast' && Math.abs(p.x - 3.5) < 0.01));
    expect(players.list).toHaveLength(2);
    guest.send({ t: 'chat', text: 'Hallo zusammen!' });
    expect((await host.wait('chat', (e) => e.from === 'Gast')).text).toBe('Hallo zusammen!');
    host.close();
    guest.close();
  });

  it('nur der Host darf den Spielmodus ändern; unplausible Sprünge werden zurückgesetzt', async () => {
    const { host, code } = await hostRoom();
    const guest = new Client('Gast');
    await guest.ready;
    guest.send({ t: 'joinRoom', code });
    await guest.wait('joined');
    guest.send({ t: 'setMode', mode: 'survival' });
    await new Promise((r) => setTimeout(r, 200));
    const room = server.rooms.get(code)!;
    expect(room.sim.getPlayer(2)!.mode).toBe('creative');
    guest.send({ t: 'playerState', x: 5000, y: 80, z: 0, yaw: 0, pitch: 0, inWater: false, eyesInWater: false, sprinting: false, jumped: false, landedFrom: 0 });
    await guest.wait('teleport');
    expect(room.sim.getPlayer(2)!.x).toBeLessThan(100);
    host.close();
    guest.close();
  });

  it('Host-Welt: hochgeladene Chunks werden genutzt, Änderungen kommen beim Verlassen zurück', async () => {
    const col = new ChunkColumn(0, 0);
    for (let x = 0; x < 16; x++) for (let z = 0; z < 16; z++) col.setBlock(x, 50, z, STONE);
    const { host, code } = await hostRoom('Host', [[0, 0, encodeColumn(col)]]);
    await host.waitFor(() => host.chunks.has('0,0'));
    const got = decodeColumnFull(host.chunks.get('0,0')!);
    expect(got.blocks[(50 << 8) | 0]).toBe(STONE);
    expect(got.blocks[(51 << 8) | 0]).toBe(AIR); // keine generierte Landschaft, sondern die hochgeladene Spalte
    host.send({ t: 'playerState', x: 0.5, y: 51, z: 0.5, yaw: 0, pitch: 0, inWater: false, eyesInWater: false, sprinting: false, jumped: false, landedFrom: 0 });
    host.send({ t: 'setBlock', seq: 1, x: 2, y: 51, z: 2, id: BRICKS });
    await host.wait('blockChanged', (e) => e.id === BRICKS);
    host.send({ t: 'leave' });
    const done = await host.wait('syncDone');
    expect(done.count).toBeGreaterThanOrEqual(1);
    const synced = decodeColumnFull(host.syncs.get('0,0')!);
    expect(synced.blocks[(51 << 8) | (2 << 4) | 2]).toBe(BRICKS);
    await host.wait('hostState');
    expect(server.rooms.get(code)?.closed ?? true).toBe(true);
    host.close();
  });

  it('maximale Anzahl Räume wird eingehalten', async () => {
    const a = await hostRoom('A');
    const b = await hostRoom('B');
    const c = new Client('C');
    await c.ready;
    c.send({ t: 'createRoom', seed: 1, time: 0, mode: 'creative', worldName: 'W', spawn: { x: 0, y: 80, z: 0 } });
    expect((await c.wait('error')).code).toBe('too_many_rooms');
    for (const x of [a.host, b.host, c]) x.close();
  });
});

describe('Rate-Limit', () => {
  it('sperrt nach zu vielen Versuchen pro Minute', () => {
    const rl = new RateLimiter(3, 60_000);
    expect([1, 2, 3].map(() => rl.allow('1.2.3.4', 1000))).toEqual([true, true, true]);
    expect(rl.allow('1.2.3.4', 2000)).toBe(false);
    expect(rl.allow('5.6.7.8', 2000)).toBe(true);
    expect(rl.allow('1.2.3.4', 62_000)).toBe(true);
  });
});
