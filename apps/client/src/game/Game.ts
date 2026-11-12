/**
 * Eine laufende Spielsitzung (Singleplayer): verbindet Welt, Simulation,
 * Worker, Renderer, Spieler, Sound und Speicherung.
 */
import {
  BIOME_NAMES,
  ChunkColumn,
  columnKey,
  DEFAULT_HOTBAR,
  encodeColumn,
  getBlock,
  isValidItem,
  LightEngine,
  LocalTransport,
  maxStack,
  Sim,
  TerrainGenerator,
  TICK_SECONDS,
  TICKS_PER_SECOND,
  World,
  type PlayerState,
  type ServerEvent,
  type Transport,
} from '@blockcraft/shared';
import { Sound } from '../audio/Sound';
import { env, workerCount } from '../config/env';
import { Input } from '../input/Input';
import { PlayerController } from '../player/PlayerController';
import { Renderer } from '../render/Renderer';
import { settings } from '../settings';
import type { WorldMeta, WorldStore } from '../storage/WorldStore';
import {
  deathMessage,
  debugInfo,
  eatProgress,
  loadingProgress,
  loadingText,
  playerState,
  pointerLocked,
  screen,
  selectedSlot,
  showDebug,
  showNotice,
  underwater,
  windowState,
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
  readonly sound = new Sound();
  /** Spielerzustand in der Simulation (nur Singleplayer direkt zugreifbar). */
  readonly simPlayer: PlayerState;
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
  private stepDistance = 0;
  /** Bildschirm im vorherigen Frame (verhindert doppelte Tastenverarbeitung durch UI und Spiel). */
  private prevScreen = screen.value;
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
      seed: meta.seed,
    });
    this.simPlayer = this.sim.addPlayer(1, meta.mode);
    this.transport = new LocalTransport(this.sim, 1);
    this.renderer = new Renderer(container, meta.seed);
    this.input = new Input(this.renderer.canvas);
    this.player = new PlayerController(this.world, this.input, (m) => this.transport.send(m));
    this.player.creative = meta.mode === 'creative';
    this.cleanups.push(this.transport.onEvent((ev) => this.onServerEvent(ev)));
  }

  async start(): Promise<void> {
    this.startedAt = performance.now();
    screen.value = 'loading';
    loadingText.value = 'Welt wird vorbereitet …';
    loadingProgress.value = 0;
    playerState.value = null;
    windowState.value = null;

    this.pool = new WorkerPool(workerCount());
    await this.pool.broadcast({ op: 'init', seed: this.meta.seed });

    const store = this.options.bench ? null : this.store;
    const p = this.simPlayer;
    if (store) {
      this.savedKeys = await store.listChunkKeys(this.meta.id);
      const save = await store.loadPlayer(this.meta.id);
      if (save) {
        this.hasSave = true;
        this.spawn = { x: save.x, y: save.y, z: save.z };
        this.player.yaw = save.yaw;
        this.player.pitch = save.pitch;
        this.player.body.flying = save.flying;
        if (save.state) p.restore(save.state);
        else if (save.hotbar) {
          // Migration aus Phase 1: Hotbar-Blöcke als volle Stapel
          save.hotbar.forEach((id, i) => {
            if (isValidItem(id)) p.inventory.main.slots[i] = { id, count: maxStack(id) };
          });
          p.selected = save.selected ?? 0;
        }
      }
      this.sim.loadItems(await store.loadItems(this.meta.id));
    }
    if (!this.hasSave) {
      const s = this.gen.findSpawn();
      this.spawn = this.options.bench ? { x: 0.5, y: 110, z: 0.5 } : s;
      if (this.options.bench) this.player.body.flying = true;
      if (this.meta.mode === 'creative') DEFAULT_HOTBAR.forEach((id, i) => (p.inventory.main.slots[i] = { id, count: maxStack(id) }));
    }
    selectedSlot.value = p.selected;
    this.player.selected = p.selected;
    this.player.body.setPosition(this.spawn.x, this.spawn.y, this.spawn.z);
    p.x = this.spawn.x;
    p.y = this.spawn.y;
    p.z = this.spawn.z;
    this.sim.spawn = { ...this.spawn };
    p.dirty = true;

    this.streamer = new ChunkStreamer(this.world, this.light, this.pool, this.renderer.chunks, {
      savedKeys: this.savedKeys,
      loadSaved: async (cx, cz) => {
        const pending = this.pendingSaves.get(columnKey(cx, cz));
        if (pending) return pending;
        return this.store?.loadChunk(this.meta.id, cx, cz);
      },
      onUnload: (col) => {
        if (col.modified) this.saveUnloaded(col);
      },
    });
    this.applySettings();

    // Pointer-Lock-Wechsel → Pause
    const onLock = (): void => {
      const locked = document.pointerLockElement === this.renderer.canvas;
      pointerLocked.value = locked;
      if (locked) {
        this.sound.resume();
        if (screen.value === 'paused') screen.value = 'playing';
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

  get mode(): 'creative' | 'survival' {
    return this.simPlayer.mode;
  }

  private onServerEvent(ev: ServerEvent): void {
    switch (ev.t) {
      case 'player': {
        playerState.value = ev.state;
        this.player.state = ev.state;
        this.player.creative = ev.state.mode === 'creative';
        if (ev.state.dead && screen.value !== 'dead' && this.phase === 'playing') this.showDeath();
        break;
      }
      case 'window':
        windowState.value = ev.window;
        if (ev.window && screen.value === 'playing') {
          this.suppressPause = true;
          screen.value = 'inventory';
          this.input.unlock();
        } else if (!ev.window && screen.value === 'inventory') {
          screen.value = 'playing';
          void this.lock();
        }
        break;
      case 'items':
        this.renderer.items.sync(ev.list);
        break;
      case 'sound':
        this.sound.play(ev.name, ev.x, ev.y, ev.z, ev.block);
        break;
      case 'teleport':
        this.player.body.setPosition(ev.x, ev.y, ev.z);
        break;
      case 'death':
        deathMessage.value = ev.message;
        this.showDeath();
        break;
      case 'rejected':
        if (import.meta.env.DEV) console.debug('Abgelehnt:', ev.reason);
        break;
      default:
        break;
    }
  }

  private showDeath(): void {
    if (screen.value === 'dead') return;
    this.suppressPause = true;
    windowState.value = null;
    screen.value = 'dead';
    this.input.unlock();
  }

  respawn(): void {
    this.transport.send({ t: 'respawn' });
    screen.value = 'playing';
    void this.lock();
  }

  setMode(mode: 'creative' | 'survival'): void {
    this.transport.send({ t: 'setMode', mode });
    this.meta.mode = mode;
    this.player.creative = mode === 'creative';
    showNotice(mode === 'creative' ? 'Spielmodus: Kreativ' : 'Spielmodus: Überleben');
  }

  private readonly onCanvasClick = (): void => {
    this.sound.resume();
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

  /** UI-Aktionen für Fenster */
  windowClick(slot: number, button: 0 | 1, shift: boolean): void {
    this.transport.send({ t: 'windowClick', slot, button, shift });
  }
  windowSwap(slot: number, hotbar: number): void {
    this.transport.send({ t: 'windowSwap', slot, hotbar });
  }
  creativePick(id: number, count: number): void {
    this.transport.send({ t: 'creativePick', id, count });
  }

  openInventory(): void {
    if (screen.value !== 'playing') return;
    this.transport.send({ t: 'openInventory' });
  }

  closeInventory(): void {
    if (screen.value !== 'inventory') return;
    this.transport.send({ t: 'closeWindow' });
  }

  selectSlot(i: number): void {
    selectedSlot.value = i;
    this.player.selected = i;
    this.transport.send({ t: 'selectSlot', slot: i });
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
      this.player.frame(dt, this.renderer.camera, 1, settings.value.sensitivity, settings.value.invertY, false);
      this.renderer.render(this.dayFraction(0), this.seconds);
      this.input.endFrame();
      return;
    }

    const paused = screen.value === 'paused' || screen.value === 'settings' || screen.value === 'keys';
    const dead = this.simPlayer.dead;
    if (!paused) {
      this.acc += dt;
      let steps = 0;
      while (this.acc >= TICK_SECONDS && steps < 10) {
        if (this.options.bench) this.benchTick();
        else {
          const wasGround = body.onGround;
          this.player.tick(dead);
          this.footsteps(wasGround);
        }
        this.sim.tick();
        this.acc -= TICK_SECONDS;
        steps++;
      }
      if (steps === 10) this.acc = 0;
    }
    const alpha = paused ? 1 : this.acc / TICK_SECONDS;

    this.handleHotkeys();
    this.player.frame(dt, this.renderer.camera, alpha, settings.value.sensitivity, settings.value.invertY, screen.value === 'playing' && !dead);
    eatProgress.value = this.player.eatProgress;
    const t = this.player.target;
    this.renderer.setHighlight(t && screen.value === 'playing' ? t : null);
    this.renderer.breakOverlay.update(t, this.player.breakProgress);

    if (body.y < -40 && this.mode === 'creative') {
      const y = this.player.findFreeSpot(this.spawn.x, 60, this.spawn.z);
      body.setPosition(this.spawn.x, y, this.spawn.z);
    }

    streamer.update(body.x, body.y, body.z, 4);
    this.renderer.underwater = body.eyesInWater;
    underwater.value = body.eyesInWater;
    this.renderer.items.update(this.seconds, this.world, this.renderer.sky.state.daylight);
    const cam = this.renderer.camera.position;
    this.sound.setListener(cam.x, cam.y, cam.z, this.player.yaw);
    this.sound.update(dt, this.renderer.sky.state.daylight);
    this.renderer.render(this.dayFraction(alpha), this.seconds);

    if (this.options.bench) this.benchFrame(dt);
    else {
      this.sinceSave += dt;
      if (this.sinceSave >= AUTOSAVE_SECONDS) {
        this.sinceSave = 0;
        void this.save();
      }
    }
    this.prevScreen = screen.value;
    this.input.endFrame();
  };

  private footsteps(wasGround: boolean): void {
    const b = this.player.body;
    if (b.inWater && !wasGround && b.onGround === false && Math.abs(b.vy) > 0.3) this.sound.play('splash');
    if (!b.onGround || b.flying) return;
    this.stepDistance += Math.hypot(b.x - b.prevX, b.z - b.prevZ);
    if (this.stepDistance > 1.7 || (!wasGround && b.onGround)) {
      this.stepDistance = 0;
      const below = this.world.getBlock(Math.floor(b.x), Math.floor(b.y - 0.1), Math.floor(b.z));
      this.sound.step(below, b.sprinting);
    }
  }

  private enterWorld(): void {
    const body = this.player.body;
    if (!this.hasSave) {
      const y = this.player.findFreeSpot(this.spawn.x, this.spawn.y, this.spawn.z);
      if (!this.options.bench) {
        this.spawn.y = y;
        body.setPosition(this.spawn.x, y, this.spawn.z);
        this.sim.spawn = { ...this.spawn };
      }
    }
    this.phase = 'playing';
    this.spawnMs = performance.now() - this.startedAt;
    console.info(`[Blockcraft] Spawn bereit nach ${Math.round(this.spawnMs)} ms`);
    if (this.simPlayer.dead) {
      this.showDeath();
      return;
    }
    screen.value = 'playing';
    if (this.options.bench) {
      this.benchStart = this.seconds;
      showNotice(`Benchmark läuft (${this.options.bench.seconds} s) …`, 4000);
    } else void this.lock();
  }

  private handleHotkeys(): void {
    const inp = this.input;
    if (inp.wasPressed('debug')) showDebug.value = !showDebug.value;
    const was = this.prevScreen;
    if (inp.wasPressed('inventory')) {
      if (screen.value === 'playing' && was === 'playing') this.openInventory();
      else if (screen.value === 'inventory' && was === 'inventory') this.closeInventory();
    }
    // Tasten, die im selben Frame ein Fenster geschlossen haben, nicht nochmals auswerten
    if (screen.value !== 'playing' || was !== 'playing') return;
    if (inp.wasCodePressed('Escape')) {
      if (this.input.locked) this.input.unlock();
      else screen.value = 'paused';
      return;
    }
    for (let i = 0; i < 9; i++) if (inp.wasCodePressed(`Digit${i + 1}`)) this.selectSlot(i);
    if (inp.wheel !== 0) this.selectSlot((((selectedSlot.value + inp.wheel) % 9) + 9) % 9);
  }

  private dayFraction(alpha: number): number {
    const len = this.sim.dayLengthTicks;
    return ((((this.sim.time + alpha) % len) + len) % len) / len;
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
    void this.store.saveChunks(this.meta.id, [{ cx: col.cx, cz: col.cz, data }]).finally(() => {
      if (this.pendingSaves.get(key) === data) this.pendingSaves.delete(key);
    });
  }

  /** Speichert veränderte Chunks, Spieler, Items und Weltdaten. */
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
      this.meta.mode = this.simPlayer.mode;
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
          selected: selectedSlot.value,
          state: this.simPlayer.persist(),
        }),
        store.saveItems(this.meta.id, this.sim.serializeItems()),
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
    // Offenes Fenster schliessen, damit Items im Crafting-Raster zurück ins Inventar gehen
    this.transport.send({ t: 'closeWindow' });
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
    this.sound.dispose();
    this.renderer.dispose();
    this.world.clear();
    playerState.value = null;
    windowState.value = null;
  }

  // -------------------------------------------------------------------------
  // Benchmark
  // -------------------------------------------------------------------------

  private benchTick(): void {
    const b = this.player.body;
    b.prevX = b.x;
    b.prevY = b.y;
    b.prevZ = b.z;
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
