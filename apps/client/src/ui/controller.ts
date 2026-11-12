/** Verbindet die Menüs mit Speicher und Spielsitzung. */
import { signal } from '@preact/signals';
import { seedFromInput, type GameMode } from '@blockcraft/shared';
import { benchMode, testMode } from '../config/env';
import { Game } from '../game/Game';
import { WorldStore, type WorldMeta } from '../storage/WorldStore';
import { errorText, screen, showNotice } from './state';

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
  if (!gameContainer) throw new Error('Kein Spielcontainer');
  if (game) await quitGame(false);
  meta.lastPlayed = Date.now();
  await store?.putWorld(meta);
  game = new Game(gameContainer, store, meta);
  exposeTestHooks();
  try {
    await game.start();
  } catch (err) {
    console.error(err);
    errorText.value = `Die Welt konnte nicht gestartet werden: ${String(err)}`;
    screen.value = 'error';
  }
}

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
    screen.value = 'worlds';
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
      game?.transport.send({ t: 'setBlock', seq: 0, x, y, z, id });
      return game?.world.getBlock(x, y, z) ?? -1;
    },
    save() {
      return game?.save();
    },
    teleport(x: number, y: number, z: number, flying = true) {
      const b = game?.player.body;
      if (!b) return;
      b.setPosition(x, y, z);
      b.flying = flying;
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
      return { locked: game.input.locked, target: t ? { x: t.x, y: t.y, z: t.z, id: t.id } : null, held: game.player.heldBlock };
    },
    stats() {
      return game ? { ...game.renderer.stats, meshes: game.renderer.chunks.count, loaded: game.world.columns.size } : null;
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
    create(name: string, seed: string) {
      return createWorld(name, seed, 'creative');
    },
  };
}
