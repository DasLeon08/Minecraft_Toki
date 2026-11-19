/** Verbindet die Menüs mit Speicher und Spielsitzung. */
import { signal } from '@preact/signals';
import {
  encodeFrame,
  Frame,
  getItemByKey,
  isValidItem,
  maxStack,
  normalizeRoomCode,
  seedFromInput,
  TerrainGenerator,
  type GameMode,
} from '@blockcraft/shared';
import { wakeServer, WsTransport } from '../net/WsTransport';
import { benchMode, testMode } from '../config/env';
import { Game, type GameOptions, type JoinedInfo } from '../game/Game';
import { WorldStore, type WorldMeta } from '../storage/WorldStore';
import { chatLog, errorText, mpStatus, playerState, roomInfo, screen, showNotice, windowState } from './state';

export const worlds = signal<WorldMeta[]>([]);
export const worldSizes = signal<Record<string, number>>({});
export const storageInfo = signal<string>('');

let store: WorldStore | null = null;
let game: Game | null = null;
let gameContainer: HTMLElement | null = null;

export function currentGame(): Game | null {
  return game;
}

export function setGameContainer(el: HTMLElement): void {
  gameContainer = el;
}

export function hasWebGL2(): boolean {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
}

export async function boot(): Promise<void> {
  if (!hasWebGL2()) {
    errorText.value = 'Dein Browser unterstützt kein WebGL 2. Bitte nutze einen aktuellen Chrome, Edge, Firefox oder Safari.';
    screen.value = 'error';
    return;
  }
  try {
    store = await WorldStore.open();
  } catch (err) {
    console.warn('IndexedDB nicht verfügbar', err);
    store = null;
    showNotice('Browser-Speicher nicht verfügbar: Welten können nicht gespeichert werden.', 8000);
  }
  if (benchMode) {
    const secs = Number(new URLSearchParams(location.search).get('bench')) || 60;
    await startBench(secs);
    return;
  }
  exposeTestHooks();
  await refreshWorlds();
  screen.value = 'menu';
}

export async function refreshWorlds(): Promise<void> {
  if (!store) {
    worlds.value = [];
    return;
  }
  worlds.value = await store.listWorlds();
  const sizes: Record<string, number> = {};
  for (const w of worlds.value) sizes[w.id] = await store.worldSize(w.id);
  worldSizes.value = sizes;
  try {
    const est = await navigator.storage?.estimate?.();
    if (est?.quota) storageInfo.value = `Speicher: ${formatBytes(est.usage ?? 0)} von ${formatBytes(est.quota)} belegt`;
  } catch {
    storageInfo.value = '';
  }
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 * 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`;
  return `${(n / 1024 / 1024 / 1024).toFixed(1)} GB`;
}

function memoryMeta(name: string, seed: number, mode: GameMode): WorldMeta {
  return {
    id: `mem_${Date.now()}`,
    name,
    seed,
    seedText: String(seed),
    mode,
    createdAt: Date.now(),
    lastPlayed: Date.now(),
    time: 1000,
    version: 1,
  };
}

export async function createWorld(name: string, seedText: string, mode: GameMode): Promise<void> {
  const seed = seedFromInput(seedText);
  const meta = store ? await store.createWorld(name, seed, seedText.trim() || String(seed), mode) : memoryMeta(name, seed, mode);
  await playWorld(meta);
}

export async function playWorld(meta: WorldMeta): Promise<void> {
  meta.lastPlayed = Date.now();
  await store?.putWorld(meta);
  await startGame(meta, {});
}

async function startGame(meta: WorldMeta, options: GameOptions): Promise<void> {
  if (!gameContainer) throw new Error('Kein Spielcontainer');
  if (game) await quitGame(false);
  game = new Game(gameContainer, store, meta, options);
  exposeTestHooks();
  try {
    await game.start();
  } catch (err) {
    console.error(err);
    errorText.value = `Die Welt konnte nicht gestartet werden: ${String(err)}`;
    screen.value = 'error';
  }
}

// ---------------------------------------------------------------------------
// Multiplayer
// ---------------------------------------------------------------------------

const NAME_KEY = 'bc.mpName';

export function savedPlayerName(): string {
  try {
    return localStorage.getItem(NAME_KEY) ?? '';
  } catch {
    return '';
  }
}

function rememberName(name: string): void {
  try {
    localStorage.setItem(NAME_KEY, name);
  } catch {
    // ignorieren
  }
}

let mpBusy = false;

async function connect(name: string): Promise<WsTransport> {
  mpStatus.value = 'Verbinde mit dem Server …';
  await wakeServer((t) => (mpStatus.value = t));
  return WsTransport.connect(name);
}

/** Eigene Welt als Raum für andere öffnen. */
export async function hostWorld(meta: WorldMeta, name: string): Promise<void> {
  if (mpBusy) return;
  mpBusy = true;
  let t: WsTransport | null = null;
  try {
    rememberName(name);
    t = await connect(name);
    const save = await store?.loadPlayer(meta.id);
    const spawn = new TerrainGenerator(meta.seed).findSpawn();
    t.sendAny({
      t: 'createRoom',
      seed: meta.seed,
      time: meta.time,
      mode: meta.mode,
      worldName: meta.name,
      spawn,
      player: save?.state,
      position: save ? { x: save.x, y: save.y, z: save.z } : spawn,
    });
    await t.waitFor('roomCreated');
    // Veränderte Chunks der eigenen Welt hochladen (mit Gegendruck)
    const keys = store ? [...(await store.listChunkKeys(meta.id))] : [];
    let n = 0;
    for (const key of keys) {
      const cx = Math.floor(key / 0x200000) - 0x100000;
      const cz = (key % 0x200000) - 0x100000;
      const data = await store!.loadChunk(meta.id, cx, cz);
      if (!data) continue;
      while (t.buffered > 1024 * 1024) await new Promise((r) => setTimeout(r, 30));
      t.sendBinary(encodeFrame(Frame.Upload, cx, cz, data));
      n++;
      if (n % 50 === 0) mpStatus.value = `Welt wird hochgeladen … ${n}/${keys.length}`;
    }
    t.sendAny({ t: 'uploadDone' });
    const joined = (await t.waitFor('joined')) as JoinedInfo;
    mpStatus.value = '';
    await startGame(meta, { remote: { transport: t, joined } });
  } catch (err) {
    t?.close();
    mpStatus.value = String(err instanceof Error ? err.message : err);
  } finally {
    mpBusy = false;
  }
}

/** Einem Raum per Code beitreten. */
export async function joinRoom(codeInput: string, name: string): Promise<void> {
  if (mpBusy) return;
  const code = normalizeRoomCode(codeInput);
  // Länge legt der Server fest (ROOM_CODE_LENGTH, 4–12)
  if (code.length < 4 || code.length > 12) {
    mpStatus.value = 'Bitte den ganzen Raumcode eingeben.';
    return;
  }
  mpBusy = true;
  let t: WsTransport | null = null;
  try {
    rememberName(name);
    t = await connect(name);
    t.sendAny({ t: 'joinRoom', code });
    const joined = (await t.waitFor('joined')) as JoinedInfo;
    mpStatus.value = '';
    const meta: WorldMeta = {
      id: `mp_${joined.code}`,
      name: joined.worldName,
      seed: joined.seed,
      seedText: String(joined.seed),
      mode: joined.mode,
      createdAt: Date.now(),
      lastPlayed: Date.now(),
      time: joined.time,
      version: 1,
    };
    await startGame(meta, { remote: { transport: t, joined } });
  } catch (err) {
    t?.close();
    mpStatus.value = String(err instanceof Error ? err.message : err);
  } finally {
    mpBusy = false;
  }
}

// Verbindung verloren / Raum geschlossen → zurück ins Mehrspieler-Menü
window.addEventListener('bc:disconnected', () => {
  void quitGame(false).then(async () => {
    await refreshWorlds();
    screen.value = 'multiplayer';
  });
});

async function startBench(seconds: number): Promise<void> {
  if (!gameContainer) return;
  game = new Game(gameContainer, null, memoryMeta('Benchmark', 0x42454e43, 'creative'), { bench: { seconds } });
  exposeTestHooks();
  await game.start();
}

export async function quitGame(toMenu = true): Promise<void> {
  const g = game;
  game = null;
  if (g) {
    screen.value = 'loading';
    await g.quit();
  }
  if (toMenu) {
    await refreshWorlds();
    screen.value = g?.remote ? 'multiplayer' : 'worlds';
  }
}

export async function deleteWorld(id: string): Promise<void> {
  await store?.deleteWorld(id);
  await refreshWorlds();
}

export async function renameWorld(meta: WorldMeta, name: string): Promise<void> {
  if (!store || !name.trim()) return;
  await store.putWorld({ ...meta, name: name.trim() });
  await refreshWorlds();
}

export async function exportWorld(meta: WorldMeta): Promise<void> {
  if (!store) return;
  const blob = await store.exportWorld(meta.id);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${meta.name.replace(/[^\w\-äöüÄÖÜ ]+/g, '_')}.bcworld`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 10000);
}

export async function importWorld(file: File): Promise<void> {
  if (!store) return;
  try {
    const meta = await store.importWorld(file);
    showNotice(`Welt «${meta.name}» importiert.`);
  } catch (err) {
    showNotice(`Import fehlgeschlagen: ${String(err)}`);
  }
  await refreshWorlds();
}

/** Test-/Debug-Schnittstelle unter window.__bc (nur mit ?test=1 oder VITE_DEBUG). */
function exposeTestHooks(): void {
  if (!testMode && !benchMode && !import.meta.env.DEV) return;
  const w = window as unknown as { __bc: unknown };
  w.__bc = {
    get screen() {
      return screen.value;
    },
    get ready() {
      return screen.value === 'playing' && (game?.spawnMs ?? 0) > 0;
    },
    get spawnMs() {
      return game?.spawnMs ?? 0;
    },
    get bench() {
      return game?.benchResult ?? null;
    },
    player() {
      const b = game?.player.body;
      return b ? { x: b.x, y: b.y, z: b.z, onGround: b.onGround, flying: b.flying } : null;
    },
    getBlock(x: number, y: number, z: number) {
      return game?.world.getBlock(x, y, z) ?? -1;
    },
    setBlock(x: number, y: number, z: number, id: number) {
      // Test-Hook: lokal direkt über die Simulation; im Multiplayer als Kreativ-Aktion an den Server
      if (game?.remote) game.transport.send({ t: 'setBlock', seq: 0, x, y, z, id });
      else game?.sim.setBlock(x, y, z, id);
      return game?.world.getBlock(x, y, z) ?? -1;
    },
    /** Inventar/Status des Spielers (Snapshot). */
    state() {
      if (game?.remote) return playerState.value;
      return game?.simPlayer.snapshot() ?? null;
    },
    room() {
      return roomInfo.value;
    },
    chat() {
      return chatLog.value;
    },
    debugStream() {
      return game ? game.debugStream() : null;
    },
    remotePlayers() {
      return game?.players.count ?? 0;
    },
    host(worldId: string, name: string) {
      const meta = worlds.value.find((w2) => w2.id === worldId);
      return meta ? hostWorld(meta, name) : Promise.reject(new Error('unbekannte Welt'));
    },
    join(code: string, name: string) {
      return joinRoom(code, name);
    },
    sendChat(text: string) {
      game?.sendChat(text);
    },
    get mpStatus() {
      return mpStatus.value;
    },
    give(id: number, count: number) {
      if (!isValidItem(id)) throw new Error(`Unbekanntes Item ${id}`);
      return game?.sim.give(1, { id, count: Math.max(1, Math.min(maxStack(id), count)) }) ?? null;
    },
    /** Item-ID über den Schlüssel (z. B. 'holz_spitzhacke'). */
    itemId(key: string) {
      return getItemByKey(key)?.id ?? -1;
    },
    send(msg: unknown) {
      game?.transport.send(msg as Parameters<Game['transport']['send']>[0]);
    },
    window() {
      if (game?.remote) return windowState.value?.slots ?? null;
      return game?.simPlayer.window ? game.simPlayer.window.win.snapshot() : null;
    },
    items() {
      return game?.sim.itemSnapshots() ?? [];
    },
    tick(n = 1) {
      for (let i = 0; i < n; i++) game?.sim.tick();
    },
    save() {
      return game?.save();
    },
    teleport(x: number, y: number, z: number, flying = true) {
      const b = game?.player.body;
      if (!b || !game) return;
      b.setPosition(x, y, z);
      b.flying = flying;
      const sp = game.simPlayer;
      sp.x = x;
      sp.y = y;
      sp.z = z;
    },
    look(yaw: number, pitch: number) {
      if (!game) return;
      game.player.yaw = yaw;
      game.player.pitch = pitch;
    },
    setTime(ticks: number) {
      if (game) game.sim.time = ticks;
    },
    /** Nur Tests: Pointer Lock simulieren (Headless-Browser verlieren ihn ohne Fensterfokus). */
    simulateLock() {
      if (!game) return;
      game.input.locked = true;
      screen.value = 'playing';
    },
    light(x: number, y: number, z: number) {
      const l = game?.world.getLight(x, y, z) ?? 0;
      return { sky: l >> 4, block: l & 15 };
    },
    input() {
      if (!game) return null;
      const t = game.player.target;
      return { locked: game.input.locked, target: t ? { x: t.x, y: t.y, z: t.z, id: t.id } : null, held: game.player.held()?.id ?? null };
    },
    stats() {
      return game
        ? { ...game.renderer.stats, meshes: game.renderer.chunks.count, loaded: game.world.columns.size, pending: game.pendingWork }
        : null;
    },
    findBlock(id: number, radius = 48) {
      const b = game?.player.body;
      if (!b) return null;
      for (let y = 5; y < 120; y++)
        for (let dz = -radius; dz <= radius; dz++)
          for (let dx = -radius; dx <= radius; dx++) {
            const x = Math.floor(b.x) + dx;
            const z = Math.floor(b.z) + dz;
            if (game!.world.getBlock(x, y, z) === id) return { x, y, z };
          }
      return null;
    },
    quit() {
      return quitGame(true);
    },
    worlds() {
      return worlds.value.map((w2) => ({ id: w2.id, name: w2.name }));
    },
    play(id: string) {
      const meta = worlds.value.find((w2) => w2.id === id);
      return meta ? playWorld(meta) : Promise.reject(new Error('unbekannte Welt'));
    },
    create(name: string, seed: string, mode: GameMode = 'creative') {
      return createWorld(name, seed, mode);
    },
  };
}
