/**
 * Eine laufende Spielsitzung: verbindet Welt, Simulation (lokal) bzw. Server (Multiplayer),
 * Worker, Renderer, Spieler, Sound und Speicherung.
 */
import {
  AIR,
  applyBlockChange,
  BIOME_NAMES,
  Frame,
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
  type AnyServerEvent,
  type ClientMessage,
  type LobbyServerEvent,
  type PlayerState,
  type ServerEvent,
  type Transport,
} from '@blockcraft/shared';
import type { BinaryFrame, WsTransport } from '../net/WsTransport';
import { PlayerRenderer } from '../render/PlayerRenderer';
import { Sound } from '../audio/Sound';
import { env, workerCount } from '../config/env';
import { Input } from '../input/Input';
import { PlayerController } from '../player/PlayerController';
import { Renderer } from '../render/Renderer';
import { settings } from '../settings';
import type { WorldMeta, WorldStore } from '../storage/WorldStore';
import {
  chatLog,
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
  roomInfo,
  tabHeld,
  underwater,
  windowState,
} from '../ui/state';
import { ChunkStreamer } from '../world/ChunkStreamer';
import { WorkerPool } from '../workers/WorkerPool';

const AUTOSAVE_SECONDS = 30;
const SPAWN_RADIUS = 3;

export type JoinedInfo = Extract<LobbyServerEvent, { t: 'joined' }>;

export interface RemoteSession {
  transport: WsTransport;
  joined: JoinedInfo;
}

export interface GameOptions {
  /** Benchmark: nichts speichern, automatischer Kameraflug. */
  bench?: { seconds: number };
  /** Multiplayer: Verbindung zum Server (sonst Singleplayer mit lokaler Simulation). */
  remote?: RemoteSession;
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
  /** Multiplayer-Sitzung (null im Singleplayer). */
  readonly remote: RemoteSession | null;
  readonly players: PlayerRenderer;
  private remoteTime = 0;
  private readonly pendingHostWrites = new Set<Promise<void>>();
  private syncWaiter: (() => void) | null = null;
  /** Chunks, die vor dem Start des Streamers ankommen (dürfen nicht verloren gehen). */
  private earlyFrames: BinaryFrame[] = [];
  private leaving = false;
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
    this.remote = options.remote ?? null;
    this.transport = this.remote ? this.remote.transport : new LocalTransport(this.sim, 1);
    this.renderer = new Renderer(container, meta.seed);
    this.input = new Input(this.renderer.canvas);
    this.player = new PlayerController(this.world, this.input, (m) => this.sendFromPlayer(m));
    this.player.creative = meta.mode === 'creative';
    this.players = new PlayerRenderer(() => this.remote?.joined.playerId ?? null);
    this.renderer.scene.add(this.players.group);
    if (this.remote) {
      const t = this.remote.transport;
      this.remoteTime = this.remote.joined.time;
      this.cleanups.push(t.onAny((ev) => this.onServerEvent(ev)));
      this.cleanups.push(t.onBinary((f) => this.onFrame(f)));
      this.cleanups.push(t.onClose((reason) => this.onDisconnect(reason)));
    } else {
      this.cleanups.push(this.transport.onEvent((ev) => this.onServerEvent(ev)));
    }
  }

  /** Nachrichten des Spielers; im Multiplayer werden Blockänderungen sofort vorhergesagt. */
  private sendFromPlayer(m: ClientMessage): void {
    if (this.remote) {
      if (m.t === 'breakBlock') applyBlockChange(this.world, this.light, m.x, m.y, m.z, AIR);
      else if (m.t === 'placeBlock') applyBlockChange(this.world, this.light, m.x, m.y, m.z, m.id);
    }
    this.transport.send(m);
  }

  private onFrame(f: BinaryFrame): void {
    if (f.type === Frame.Chunk) {
      if (this.streamer) this.streamer.inject(f.cx, f.cz, f.data);
      else this.earlyFrames.push(f);
    }
    else if (f.type === Frame.Sync && this.store && this.remote?.joined.host) {
      // Rück-Sync des Servers: veränderte Chunks in der eigenen Welt speichern
      const w = this.store.saveChunks(this.meta.id, [{ cx: f.cx, cz: f.cz, data: f.data.slice() }]);
      this.pendingHostWrites.add(w);
      void w.finally(() => this.pendingHostWrites.delete(w));
    }
  }

  private onDisconnect(reason: string): void {
    if (this.leaving || !this.running) return;
    showNotice(reason || 'Verbindung zum Server getrennt.', 8000);
    this.leaving = true;
    // Zurück ins Menü (asynchron, damit Listener sauber enden)
    setTimeout(() => window.dispatchEvent(new CustomEvent('bc:disconnected')), 0);
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

    const store = this.options.bench || this.remote ? null : this.store;
    const p = this.simPlayer;
    if (this.remote) {
      const j = this.remote.joined;
      this.hasSave = true;
      this.spawn = { ...j.position };
      this.player.creative = j.mode === 'creative';
      roomInfo.value = { code: j.code, host: j.host, worldName: j.worldName, players: [] };
      chatLog.value = [];
    }
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
    if (!this.hasSave && !this.remote) {
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
        if (col.modified && !this.remote) this.saveUnloaded(col);
      },
      remote: !!this.remote,
    });
    this.applySettings();
    // Zentrum setzen und vorab angekommene Chunks übernehmen
    this.streamer.update(this.spawn.x, this.spawn.y, this.spawn.z, 0);
    for (const f of this.earlyFrames) this.streamer.inject(f.cx, f.cz, f.data);
    this.earlyFrames = [];

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

  /** Diagnose für Tests. */
  debugStream(): Record<string, unknown> {
    return {
      phase: this.phase,
      spawn: this.spawn,
      loaded: this.world.columns.size,
      pending: this.streamer?.pendingMeshes,
      loading: this.streamer?.loadingCount,
      meshes: this.renderer.chunks.count,
      progress: this.streamer?.areaProgress(this.spawn.x, this.spawn.z, 3),
      rd: this.streamer?.renderDistance,
      poolBusy: this.pool?.busy,
    };
  }

  /** Noch zu ladende bzw. zu meshende Arbeit (für Tests/Aufnahmen). */
  get pendingWork(): number {
    return (this.streamer?.pendingMeshes ?? 0) + (this.streamer?.loadingCount ?? 0);
  }

  get mode(): 'creative' | 'survival' {
    if (this.remote) return playerState.value?.mode ?? this.remote.joined.mode;
    return this.simPlayer.mode;
  }

  get isDead(): boolean {
    return this.remote ? !!playerState.value?.dead : this.simPlayer.dead;
  }

  /** Aktuelle Spielzeit in Ticks. */
  get time(): number {
    return this.remote ? this.remoteTime : this.sim.time;
  }

  get dayLengthTicks(): number {
    return this.remote ? this.remote.joined.dayLengthTicks : this.sim.dayLengthTicks;
  }

  sendChat(text: string): void {
    const t = text.trim();
    if (t && this.remote) this.remote.transport.sendAny({ t: 'chat', text: t });
  }

  private onServerEvent(ev: ServerEvent | AnyServerEvent): void {
    switch (ev.t) {
      case 'blockChanged':
        if (this.remote) applyBlockChange(this.world, this.light, ev.x, ev.y, ev.z, ev.id);
        break;
      case 'time':
        if (this.remote) this.remoteTime = ev.ticks;
        break;
      case 'players':
        this.players.sync(ev.list);
        if (roomInfo.value) roomInfo.value = { ...roomInfo.value, players: ev.list.map((p) => p.name) };
        break;
      case 'chat':
        chatLog.value = [...chatLog.value.slice(-49), { from: ev.from, text: ev.text, system: !!ev.system, at: Date.now() }];
        break;
      case 'hostState':
        if (this.store && this.remote?.joined.host) {
          this.meta.time = ev.time;
          this.meta.lastPlayed = Date.now();
          const w = Promise.all([
            this.store.savePlayer({
              worldId: this.meta.id,
              x: ev.position.x,
              y: ev.position.y,
              z: ev.position.z,
              yaw: this.player.yaw,
              pitch: this.player.pitch,
              flying: false,
              selected: selectedSlot.value,
              state: ev.player,
            }),
            this.store.putWorld({ ...this.meta }),
          ]).then(() => undefined);
          this.pendingHostWrites.add(w);
          void w.finally(() => this.pendingHostWrites.delete(w));
        }
        break;
      case 'syncDone':
        this.syncWaiter?.();
        break;
      case 'roomClosed':
        this.leaving = true;
        showNotice(ev.reason, 8000);
        setTimeout(() => window.dispatchEvent(new CustomEvent('bc:disconnected')), 0);
        break;
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
          void this.lock(true);
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
    // Im Multiplayer bestimmt der Server die Sichtweite (sonst entstünden Lücken)
    const rd = this.options.bench ? Math.min(env.VITE_MAX_RENDER_DISTANCE, 8) : this.remote ? this.remote.joined.viewDistance : s.renderDistance;
    if (this.streamer) this.streamer.renderDistance = rd;
    this.renderer.renderDistance = rd;
    this.renderer.setFov(s.fov);
    if (this.renderer.renderScale !== s.renderScale) {
      this.renderer.renderScale = s.renderScale;
      this.renderer.resize();
    }
    showDebug.value = s.showFps || showDebug.value;
  }

  /** `quiet`: kein Hinweis bei Misserfolg (z. B. automatischer Versuch ohne Nutzerklick). */
  async lock(quiet = false): Promise<void> {
    const ok = await this.input.lock();
    if (!ok && !quiet) showNotice('Maus konnte nicht eingefangen werden. Klicke ins Spielfeld (im iframe wird «allow=pointer-lock» benötigt).');
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

  openChat(): void {
    if (screen.value !== 'playing' || !this.remote) return;
    this.suppressPause = true;
    screen.value = 'chat';
    this.input.unlock();
  }

  closeChat(): void {
    if (screen.value !== 'chat') return;
    screen.value = 'playing';
    void this.lock(true);
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
    const dead = this.isDead;
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
        if (this.remote) this.remoteTime++;
        else this.sim.tick();
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
    this.players.update(this.world, this.renderer.sky.state.daylight);
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
    if (this.remote && !this.remote.joined.host) {
      // Gäste: freie Stelle am (versetzten) Spawn suchen
      const y = this.player.findFreeSpot(this.spawn.x, this.spawn.y, this.spawn.z);
      body.setPosition(this.spawn.x, y, this.spawn.z);
    }
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
    if (this.isDead) {
      this.showDeath();
      return;
    }
    screen.value = 'playing';
    if (this.options.bench) {
      this.benchStart = this.seconds;
      showNotice(`Benchmark läuft (${this.options.bench.seconds} s) …`, 4000);
    } else void this.lock(true);
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
    if (this.remote) {
      tabHeld.value = inp.isCodeDown('Tab');
      if (inp.wasCodePressed('KeyT') || inp.wasCodePressed('Enter')) {
        this.openChat();
        return;
      }
    }
    for (let i = 0; i < 9; i++) if (inp.wasCodePressed(`Digit${i + 1}`)) this.selectSlot(i);
    if (inp.wheel !== 0) this.selectSlot((((selectedSlot.value + inp.wheel) % 9) + 9) % 9);
  }

  private dayFraction(alpha: number): number {
    const len = this.dayLengthTicks;
    return ((((this.time + alpha) % len) + len) % len) / len;
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
    const dayTicks = ((this.time % this.dayLengthTicks) + this.dayLengthTicks) % this.dayLengthTicks;
    const hours = (6 + (dayTicks / this.dayLengthTicks) * 24) % 24;
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
    // Im Multiplayer speichert der Server (Rück-Sync an den Host)
    if (!this.store || this.options.bench || this.remote || this.phase !== 'playing') return Promise.resolve();
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
    if (this.remote) {
      const t = this.remote.transport;
      if (t.open && !this.leaving) {
        this.leaving = true;
        if (this.remote.joined.host) {
          // Host: auf den letzten Rück-Sync warten und alles speichern
          const done = new Promise<void>((resolve) => {
            this.syncWaiter = resolve;
            setTimeout(resolve, 8000);
          });
          t.sendAny({ t: 'leave' });
          await done;
          await Promise.allSettled([...this.pendingHostWrites]);
        } else t.sendAny({ t: 'leave' });
      }
      await Promise.allSettled([...this.pendingHostWrites]);
    } else await this.save();
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
    this.players.dispose();
    roomInfo.value = null;
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
