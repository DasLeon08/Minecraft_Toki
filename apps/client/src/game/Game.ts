/**
 * Eine laufende Spielsitzung (Singleplayer, Phase 1): verbindet Welt, Simulation,
 * Worker, Renderer, Spieler und Speicherung.
 */
import {
  BIOME_NAMES,
  CATALOG_BLOCKS,
  ChunkColumn,
  columnKey,
  encodeColumn,
  getBlock,
  LightEngine,
  LocalTransport,
  Sim,
  TerrainGenerator,
  TICK_SECONDS,
  TICKS_PER_SECOND,
  World,
  type Transport,
} from '@blockcraft/shared';
import { env, workerCount } from '../config/env';
import { Input } from '../input/Input';
import { PlayerController } from '../player/PlayerController';
import { Renderer } from '../render/Renderer';
import { settings } from '../settings';
import type { WorldMeta, WorldStore } from '../storage/WorldStore';
import {
  debugInfo,
  hotbar,
  loadingProgress,
  loadingText,
  pointerLocked,
  screen,
  selectedSlot,
  showDebug,
  showNotice,
  underwater,
} from '../ui/state';
import { ChunkStreamer } from '../world/ChunkStreamer';
import { WorkerPool } from '../workers/WorkerPool';

const AUTOSAVE_SECONDS = 30;
const SPAWN_RADIUS = 3;

export interface GameOptions {
  /** Benchmark: nichts speichern, automatischer Kameraflug. */
  bench?: { seconds: number };
}

export interface BenchResult {
  avgFps: number;
  low1Fps: number;
  frames: number;
  seconds: number;
  renderDistance: number;
  calls: number;
  triangles: number;
}

export class Game {
  readonly world = new World();
  readonly light = new LightEngine(this.world);
  readonly sim: Sim;
  readonly transport: Transport;
  readonly renderer: Renderer;
  readonly input: Input;
  readonly player: PlayerController;
  private pool: WorkerPool | null = null;
  private streamer: ChunkStreamer | null = null;
  private readonly gen: TerrainGenerator;
  private savedKeys = new Set<number>();
  private readonly pendingSaves = new Map<number, Uint8Array>();
  private running = false;
  private raf = 0;
  private last = 0;
  private acc = 0;
  private seconds = 0;
  private sinceSave = 0;
  private saving: Promise<void> | null = null;
  private suppressPause = false;
  private phase: 'loading' | 'playing' = 'loading';
  private spawn = { x: 0.5, y: 80, z: 0.5 };
  private hasSave = false;
  private startedAt = 0;
  /** Zeit bis zum Spawn in ms (für Tests/Statistik). */
  spawnMs = 0;
  private fpsFrames = 0;
  private fpsTime = 0;
  private fps = 0;
  private frameMs = 0;
  private benchFrames: number[] = [];
  private benchStart = 0;
  benchResult: BenchResult | null = null;
  private readonly cleanups: (() => void)[] = [];

  constructor(
    private readonly container: HTMLElement,
    private readonly store: WorldStore | null,
    readonly meta: WorldMeta,
    private readonly options: GameOptions = {},
  ) {
    this.gen = new TerrainGenerator(meta.seed);
    this.sim = new Sim({
      world: this.world,
      light: this.light,
      time: meta.time,
      dayLengthTicks: env.VITE_DAY_LENGTH_SECONDS * TICKS_PER_SECOND,
      mode: meta.mode,
    });
    this.transport = new LocalTransport(this.sim);
    this.renderer = new Renderer(container, meta.seed);
    this.input = new Input(this.renderer.canvas);
    this.player = new PlayerController(this.world, this.input, (m) => this.transport.send(m));
    this.player.creative = meta.mode === 'creative';
  }

  async start(): Promise<void> {
    this.startedAt = performance.now();
    screen.value = 'loading';
    loadingText.value = 'Welt wird vorbereitet …';
    loadingProgress.value = 0;

    this.pool = new WorkerPool(workerCount());
    await this.pool.broadcast({ op: 'init', seed: this.meta.seed });

    const store = this.options.bench ? null : this.store;
    if (store) {
      this.savedKeys = await store.listChunkKeys(this.meta.id);
      const save = await store.loadPlayer(this.meta.id);
      if (save) {
        this.hasSave = true;
        this.spawn = { x: save.x, y: save.y, z: save.z };
        this.player.yaw = save.yaw;
        this.player.pitch = save.pitch;
        this.player.body.flying = save.flying;
        if (save.hotbar?.length === 9) hotbar.value = save.hotbar.map((id) => (CATALOG_BLOCKS.includes(id) ? id : hotbar.value[0]));
        selectedSlot.value = Math.max(0, Math.min(8, save.selected ?? 0));
      }
    }
    if (!this.hasSave) {
      const s = this.gen.findSpawn();
      this.spawn = this.options.bench ? { x: 0.5, y: 110, z: 0.5 } : s;
      if (this.options.bench) this.player.body.flying = true;
    }
    this.player.body.setPosition(this.spawn.x, this.spawn.y, this.spawn.z);

    this.streamer = new ChunkStreamer(this.world, this.light, this.pool, this.renderer.chunks, {
      savedKeys: this.savedKeys,
      loadSaved: async (cx, cz) => {
        const pending = this.pendingSaves.get(columnKey(cx, cz));
        if (pending) return pending;
        return this.store?.loadChunk(this.meta.id, cx, cz);
      },
      onUnloadModified: (col) => this.saveUnloaded(col),
    });
    this.applySettings();

    // Pointer-Lock-Wechsel → Pause
    const onLock = (): void => {
      const locked = document.pointerLockElement === this.renderer.canvas;
      pointerLocked.value = locked;
      if (locked) {
        if (screen.value === 'paused' || screen.value === 'inventory') screen.value = 'playing';
      } else if (screen.value === 'playing' && !this.suppressPause && this.phase === 'playing') {
        screen.value = 'paused';
      }
      this.suppressPause = false;
    };
    document.addEventListener('pointerlockchange', onLock);
    this.cleanups.push(() => document.removeEventListener('pointerlockchange', onLock));
    const onHide = (): void => {
      if (document.visibilityState === 'hidden') void this.save();
    };
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('pagehide', onHide);
    this.cleanups.push(() => {
      document.removeEventListener('visibilitychange', onHide);
      window.removeEventListener('pagehide', onHide);
    });
    this.cleanups.push(settings.subscribe(() => this.applySettings()));
    this.renderer.canvas.addEventListener('click', this.onCanvasClick);
    this.cleanups.push(() => this.renderer.canvas.removeEventListener('click', this.onCanvasClick));

    this.running = true;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  private readonly onCanvasClick = (): void => {
    if (this.phase === 'playing' && !this.input.locked && screen.value === 'playing') void this.lock();
  };

  applySettings(): void {
    const s = settings.value;
    const rd = this.options.bench ? Math.min(env.VITE_MAX_RENDER_DISTANCE, 8) : s.renderDistance;
    if (this.streamer) this.streamer.renderDistance = rd;
    this.renderer.renderDistance = rd;
    this.renderer.setFov(s.fov);
    if (this.renderer.renderScale !== s.renderScale) {
      this.renderer.renderScale = s.renderScale;
      this.renderer.resize();
    }
    showDebug.value = s.showFps || showDebug.value;
  }

  async lock(): Promise<void> {
    const ok = await this.input.lock();
    if (!ok) showNotice('Maus konnte nicht eingefangen werden. Klicke ins Spielfeld (im iframe wird «allow=pointer-lock» benötigt).');
  }

  resume(): void {
    screen.value = 'playing';
    void this.lock();
  }

  openInventory(): void {
    if (screen.value !== 'playing') return;
    this.suppressPause = true;
    screen.value = 'inventory';
    this.input.unlock();
  }

  closeInventory(): void {
    if (screen.value !== 'inventory') return;
    screen.value = 'playing';
    void this.lock();
  }

  private readonly frame = (now: number): void => {
    if (!this.running) return;
    this.raf = requestAnimationFrame(this.frame);
    const dt = Math.min(0.25, (now - this.last) / 1000);
    this.last = now;
    this.seconds += dt;
    this.updateFps(dt);
    const streamer = this.streamer!;
    const body = this.player.body;

    if (this.phase === 'loading') {
      streamer.update(this.spawn.x, this.spawn.y, this.spawn.z, 12);
      const r = Math.min(SPAWN_RADIUS, streamer.renderDistance);
      loadingProgress.value = streamer.areaProgress(this.spawn.x, this.spawn.z, r);
      loadingText.value = `Welt wird erzeugt … ${streamer.loadedCount} Chunks`;
      if (streamer.isAreaReady(this.spawn.x, this.spawn.z, r)) this.enterWorld();
      this.player.frame(dt, this.renderer.camera, 1, settings.value.sensitivity, settings.value.invertY);
      this.renderer.render(this.dayFraction(0), this.seconds);
      this.input.endFrame();
      return;
    }

    const paused = screen.value === 'paused';
    if (!paused) {
      this.acc += dt;
      let steps = 0;
      while (this.acc >= TICK_SECONDS && steps < 10) {
        if (this.options.bench) this.benchTick();
        else this.player.tick();
        this.sim.tick();
        this.acc -= TICK_SECONDS;
        steps++;
      }
      if (steps === 10) this.acc = 0;
    }
    const alpha = paused ? 1 : this.acc / TICK_SECONDS;

    this.handleHotkeys();
    this.player.heldBlock = hotbar.value[selectedSlot.value];
    this.player.frame(dt, this.renderer.camera, alpha, settings.value.sensitivity, settings.value.invertY);
    const t = this.player.target;
    this.renderer.setHighlight(t && screen.value === 'playing' ? t : null);

    if (body.y < -40) {
      // Ins Leere gefallen: zurück zum Spawn
      const y = this.player.findFreeSpot(this.spawn.x, 60, this.spawn.z);
      body.setPosition(this.spawn.x, y, this.spawn.z);
    }

    streamer.update(body.x, body.y, body.z, 4);
    this.renderer.underwater = body.eyesInWater;
    underwater.value = body.eyesInWater;
    this.renderer.render(this.dayFraction(alpha), this.seconds);

    if (this.options.bench) this.benchFrame(dt);
    else {
      this.sinceSave += dt;
      if (this.sinceSave >= AUTOSAVE_SECONDS) {
        this.sinceSave = 0;
        void this.save();
      }
    }
    this.input.endFrame();
  };

  private enterWorld(): void {
    const body = this.player.body;
    if (!this.hasSave) {
      const y = this.player.findFreeSpot(this.spawn.x, this.spawn.y, this.spawn.z);
      if (!this.options.bench) {
        this.spawn.y = y;
        body.setPosition(this.spawn.x, y, this.spawn.z);
      }
    }
    this.phase = 'playing';
    this.spawnMs = performance.now() - this.startedAt;
    console.info(`[Blockcraft] Spawn bereit nach ${Math.round(this.spawnMs)} ms`);
    screen.value = 'playing';
    if (this.options.bench) {
      this.benchStart = this.seconds;
      showNotice(`Benchmark läuft (${this.options.bench.seconds} s) …`, 4000);
    } else void this.lock();
  }

  private handleHotkeys(): void {
    const inp = this.input;
    if (inp.wasPressed('debug')) showDebug.value = !showDebug.value;
    if (inp.wasPressed('inventory')) {
      if (screen.value === 'playing') this.openInventory();
      else if (screen.value === 'inventory') this.closeInventory();
    }
    if (screen.value !== 'playing') return;
    if (inp.wasCodePressed('Escape')) {
      // Browser geben den Pointer Lock bei Esc meist selbst frei; hier zusätzlich absichern.
      if (this.input.locked) this.input.unlock();
      else screen.value = 'paused';
      return;
    }
    for (let i = 0; i < 9; i++) if (inp.wasCodePressed(`Digit${i + 1}`)) selectedSlot.value = i;
    if (inp.wheel !== 0) selectedSlot.value = (((selectedSlot.value + inp.wheel) % 9) + 9) % 9;
    if (inp.clicked.has(1)) {
      const id = this.player.pickTarget();
      if (id !== null && CATALOG_BLOCKS.includes(id)) {
        const idx = hotbar.value.indexOf(id);
        if (idx >= 0) selectedSlot.value = idx;
        else {
          const hb = [...hotbar.value];
          hb[selectedSlot.value] = id;
          hotbar.value = hb;
        }
      }
    }
  }

  private dayFraction(alpha: number): number {
    const len = this.sim.dayLengthTicks;
    return (((this.sim.time + alpha) % len) + len) % len / len;
  }

  private updateFps(dt: number): void {
    this.fpsFrames++;
    this.fpsTime += dt;
    this.frameMs = this.frameMs * 0.9 + dt * 1000 * 0.1;
    if (this.fpsTime >= 0.5) {
      this.fps = this.fpsFrames / this.fpsTime;
      this.fpsFrames = 0;
      this.fpsTime = 0;
      if (showDebug.value) this.publishDebug();
    }
  }

  private publishDebug(): void {
    const b = this.player.body;
    const st = this.renderer.stats;
    const fx = Math.floor(b.x);
    const fz = Math.floor(b.z);
    const l = this.world.getLight(fx, Math.floor(b.y + 0.5), fz);
    const t = this.player.target;
    const dayTicks = ((this.sim.time % this.sim.dayLengthTicks) + this.sim.dayLengthTicks) % this.sim.dayLengthTicks;
    const hours = (6 + (dayTicks / this.sim.dayLengthTicks) * 24) % 24;
    debugInfo.value = {
      fps: Math.round(this.fps),
      frameMs: Math.round(this.frameMs * 10) / 10,
      x: b.x,
      y: b.y,
      z: b.z,
      chunkX: fx >> 4,
      chunkZ: fz >> 4,
      facing: this.player.facingName(),
      biome: BIOME_NAMES[this.gen.sample(fx, fz).biome],
      light: `Sonne ${l >> 4}, Block ${l & 15}`,
      loaded: this.streamer?.loadedCount ?? 0,
      meshes: this.renderer.chunks.count,
      pending: this.streamer?.pendingMeshes ?? 0,
      calls: st.calls,
      triangles: st.triangles,
      genMs: Math.round((this.pool?.lastGenMs ?? 0) * 10) / 10,
      meshMs: Math.round((this.pool?.lastMeshMs ?? 0) * 10) / 10,
      workers: this.pool?.size ?? 0,
      time: `${String(Math.floor(hours)).padStart(2, '0')}:${String(Math.floor((hours % 1) * 60)).padStart(2, '0')}`,
      target: t ? `${getBlock(t.id).name} @ ${t.x} ${t.y} ${t.z}` : '–',
      flying: b.flying,
    };
  }

  // -------------------------------------------------------------------------
  // Speichern
  // -------------------------------------------------------------------------

  private saveUnloaded(col: ChunkColumn): void {
    if (!this.store || this.options.bench) return;
    const key = columnKey(col.cx, col.cz);
    const data = encodeColumn(col);
    col.modified = false;
    this.pendingSaves.set(key, data);
    this.savedKeys.add(key);
    void this.store
      .saveChunks(this.meta.id, [{ cx: col.cx, cz: col.cz, data }])
      .finally(() => {
        if (this.pendingSaves.get(key) === data) this.pendingSaves.delete(key);
      });
  }

  /** Speichert veränderte Chunks, Spieler und Weltdaten. */
  save(): Promise<void> {
    if (!this.store || this.options.bench || this.phase !== 'playing') return Promise.resolve();
    if (this.saving) return this.saving.then(() => this.save());
    const store = this.store;
    const run = async (): Promise<void> => {
      const chunks: { cx: number; cz: number; data: Uint8Array }[] = [];
      for (const { cx, cz } of this.sim.modifiedColumns()) {
        const col = this.world.getColumn(cx, cz)!;
        chunks.push({ cx, cz, data: encodeColumn(col) });
        col.modified = false;
        this.savedKeys.add(columnKey(cx, cz));
      }
      const b = this.player.body;
      this.meta.time = this.sim.time;
      this.meta.lastPlayed = Date.now();
      await Promise.all([
        store.saveChunks(this.meta.id, chunks),
        store.savePlayer({
          worldId: this.meta.id,
          x: b.x,
          y: b.y,
          z: b.z,
          yaw: this.player.yaw,
          pitch: this.player.pitch,
          flying: b.flying,
          hotbar: [...hotbar.value],
          selected: selectedSlot.value,
        }),
        store.putWorld({ ...this.meta }),
      ]);
    };
    this.saving = run()
      .catch((err: unknown) => {
        console.error('Speichern fehlgeschlagen', err);
        showNotice('Speichern fehlgeschlagen – ist der Browser-Speicher voll oder blockiert?');
      })
      .finally(() => {
        this.saving = null;
      });
    return this.saving;
  }

  async quit(): Promise<void> {
    await this.save();
    this.dispose();
  }

  dispose(): void {
    this.running = false;
    cancelAnimationFrame(this.raf);
    for (const c of this.cleanups) c();
    this.streamer?.dispose();
    this.pool?.dispose();
    this.transport.close();
    this.input.dispose();
    this.renderer.dispose();
    this.world.clear();
  }

  // -------------------------------------------------------------------------
  // Benchmark
  // -------------------------------------------------------------------------

  private benchTick(): void {
    const b = this.player.body;
    b.prevX = b.x;
    b.prevY = b.y;
    b.prevZ = b.z;
    // Gerader Flug (12 Blöcke/s) mit langsamem Umsehen
    const t = this.seconds - this.benchStart;
    b.x += 12 * TICK_SECONDS;
    b.y = 100;
    this.player.yaw = -Math.PI / 2 + Math.sin(t * 0.25) * 0.9;
    this.player.pitch = -0.25 + Math.sin(t * 0.17) * 0.15;
  }

  private benchFrame(dt: number): void {
    if (this.benchResult) return;
    this.benchFrames.push(dt);
    const elapsed = this.seconds - this.benchStart;
    if (elapsed < (this.options.bench?.seconds ?? 60)) return;
    const frames = this.benchFrames.slice(5);
    const total = frames.reduce((a, b) => a + b, 0);
    const sorted = [...frames].sort((a, b) => b - a);
    const worst = sorted.slice(0, Math.max(1, Math.floor(sorted.length / 100)));
    const st = this.renderer.stats;
    this.benchResult = {
      avgFps: Math.round((frames.length / total) * 10) / 10,
      low1Fps: Math.round((worst.length / worst.reduce((a, b) => a + b, 0)) * 10) / 10,
      frames: frames.length,
      seconds: Math.round(total),
      renderDistance: this.renderer.renderDistance,
      calls: st.calls,
      triangles: st.triangles,
    };
    console.info('[Blockcraft] Benchmark', this.benchResult);
    showNotice(`Benchmark: Ø ${this.benchResult.avgFps} FPS, 1%-Low ${this.benchResult.low1Fps} FPS`, 600000);
  }
}
