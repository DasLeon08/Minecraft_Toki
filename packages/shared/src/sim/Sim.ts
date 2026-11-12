/**
 * Autoritative Simulation. Läuft im Singleplayer im Browser und ab Phase 3
 * identisch auf dem Render-Server. Alle Spielregeln liegen hier.
 */
import { REACH_CREATIVE, REACH_SURVIVAL, TICKS_PER_SECOND, WORLD_HEIGHT } from '../constants';
import { ItemEntity, ITEM_DESPAWN_TICKS, type ItemEntitySnapshot } from '../entity/ItemEntity';
import type { LightEngine } from '../light/light';
import {
  AIR,
  BLOCK_COUNT,
  CHEST,
  CRAFTING_TABLE,
  DIRT,
  FURNACE,
  FURNACE_LIT,
  getBlock,
  GRASS,
  IS_SOLID,
  isWater,
  SAND,
  Shape,
  SNOWY_GRASS,
} from '../registry/blocks';
import { getItem, isValidItem, maxStack } from '../registry/items';
import { blockDrops, breakTicks } from '../registry/mining';
import { Rng } from '../util/hash';
import { columnIndex } from '../world/coords';
import type { World } from '../world/World';
import { blockEntityTypeFor, createBlockEntity, type BlockEntity, type FurnaceEntity } from './blockEntities';
import { clickWindow, Container, swapWithHotbar, Window, addToSlots, type ItemStack, type Slot } from './inventory';
import { PlayerState, type DamageCause, type GameMode } from './PlayerState';
import type { ClientMessage, ServerEvent, SoundName, WindowSnapshot } from './protocol';
import { fuelTicks, matchRecipe, smeltResult, SMELT_TICKS } from './recipes';
import { WaterSim } from './water';

export interface SimOptions {
  world: World;
  light: LightEngine;
  /** Startzeit in Ticks. */
  time: number;
  dayLengthTicks: number;
  mode: GameMode;
  seed?: number;
}

/** Setzt einen Block inkl. Licht-Update und Dirty-Markierung. */
export function applyBlockChange(world: World, light: LightEngine, x: number, y: number, z: number, id: number): boolean {
  if (world.getBlock(x, y, z) === id) return false;
  if (!world.setBlockRaw(x, y, z, id)) return false;
  light.onBlockChanged(x, y, z, id);
  world.markBlockDirty(x, y, z);
  const col = world.getColumn(x >> 4, z >> 4);
  if (col) col.modified = true;
  return true;
}

const DEATH_MESSAGES: Record<DamageCause, string> = {
  fall: 'Du bist zu tief gefallen.',
  drown: 'Du bist ertrunken.',
  starve: 'Du bist verhungert.',
  void: 'Du bist ins Leere gestürzt.',
  generic: 'Du bist gestorben.',
};

type Listener = (ev: ServerEvent, playerId: number | null) => void;

export class Sim {
  readonly world: World;
  private readonly light: LightEngine;
  time: number;
  readonly dayLengthTicks: number;
  /** Standard-Spielmodus der Welt (für neue Spieler). */
  mode: GameMode;
  readonly players = new Map<number, PlayerState>();
  readonly items = new Map<number, ItemEntity>();
  readonly water: WaterSim;
  /** Weltspawn (wird vom Spiel gesetzt). */
  spawn = { x: 0.5, y: 80, z: 0.5 };
  private readonly listeners: Listener[] = [];
  private readonly rng: Rng;
  private nextEntityId = 1;
  private nextWindowId = 1;
  private itemsDirty = false;
  private tickCount = 0;

  constructor(opts: SimOptions) {
    this.world = opts.world;
    this.light = opts.light;
    this.time = opts.time;
    this.dayLengthTicks = opts.dayLengthTicks;
    this.mode = opts.mode;
    this.rng = new Rng((opts.seed ?? 1) ^ 0x51ed);
    this.water = new WaterSim(this.world, (x, y, z, id) => this.setBlock(x, y, z, id));
  }

  // -------------------------------------------------------------------------
  // Ereignisse
  // -------------------------------------------------------------------------

  onEvent(listener: Listener): () => void {
    this.listeners.push(listener);
    return () => {
      const i = this.listeners.indexOf(listener);
      if (i >= 0) this.listeners.splice(i, 1);
    };
  }

  /** `to` = Spieler-ID oder null für alle. */
  private emit(ev: ServerEvent, to: number | null = null): void {
    for (const l of this.listeners) l(ev, to);
  }

  private sound(name: SoundName, x: number, y: number, z: number, block?: number): void {
    this.emit({ t: 'sound', name, x, y, z, block });
  }

  // -------------------------------------------------------------------------
  // Spieler
  // -------------------------------------------------------------------------

  addPlayer(id: number, mode: GameMode = this.mode): PlayerState {
    const p = new PlayerState(id, mode);
    this.players.set(id, p);
    return p;
  }

  removePlayer(id: number): void {
    const p = this.players.get(id);
    if (p) this.closeWindow(p);
    this.players.delete(id);
  }

  getPlayer(id: number): PlayerState | undefined {
    return this.players.get(id);
  }

  handle(msg: ClientMessage, playerId = 1): void {
    const p = this.players.get(playerId);
    if (!p) return;
    if (p.dead && msg.t !== 'respawn' && msg.t !== 'playerState') return;
    switch (msg.t) {
      case 'setBlock': {
        const reason = p.mode === 'creative' ? this.validateSetBlock(msg.x, msg.y, msg.z, msg.id) : 'Nur im Kreativmodus';
        if (reason) return this.reject(p, msg.seq, reason, msg.x, msg.y, msg.z);
        this.setBlock(msg.x, msg.y, msg.z, msg.id);
        break;
      }
      case 'startBreak':
        p.breakStart = { x: msg.x, y: msg.y, z: msg.z, tick: this.time };
        break;
      case 'breakBlock':
        this.breakBlock(p, msg.seq, msg.x, msg.y, msg.z);
        break;
      case 'placeBlock':
        this.placeBlock(p, msg.seq, msg.x, msg.y, msg.z, msg.id);
        break;
      case 'useBlock':
        this.useBlock(p, msg.x, msg.y, msg.z);
        break;
      case 'openInventory':
        this.openInventory(p);
        break;
      case 'closeWindow':
        this.closeWindow(p);
        break;
      case 'windowClick':
        if (p.window && Number.isInteger(msg.slot)) {
          clickWindow(p.window.win, p, msg.slot, msg.button === 1 ? 1 : 0, !!msg.shift);
          this.afterWindowChange(p);
        }
        break;
      case 'windowSwap':
        if (p.window && Number.isInteger(msg.slot) && msg.hotbar >= 0 && msg.hotbar < 9) {
          swapWithHotbar(p.window.win, msg.slot, msg.hotbar);
          this.afterWindowChange(p);
        }
        break;
      case 'creativePick':
        if (p.mode !== 'creative') break;
        p.cursor = msg.id > 0 && isValidItem(msg.id) ? { id: msg.id, count: Math.max(1, Math.min(maxStack(msg.id), msg.count | 0)) } : null;
        p.dirty = true;
        break;
      case 'pickBlock':
        this.pickBlock(p, msg.id);
        break;
      case 'selectSlot':
        if (Number.isInteger(msg.slot) && msg.slot >= 0 && msg.slot < 9) {
          p.selected = msg.slot;
          p.dirty = true;
        }
        break;
      case 'eat':
        if (p.eat()) this.sound('eat', p.x, p.y, p.z);
        break;
      case 'drop':
        this.dropHeld(p, msg.all);
        break;
      case 'respawn':
        if (p.dead) {
          p.respawn();
          const s = p.spawn ?? this.spawn;
          p.x = s.x;
          p.y = s.y;
          p.z = s.z;
          this.emit({ t: 'teleport', x: s.x, y: s.y, z: s.z }, p.id);
        }
        break;
      case 'setMode':
        if (msg.mode === 'creative' || msg.mode === 'survival') {
          p.mode = msg.mode;
          this.mode = msg.mode;
          if (p.mode === 'creative') p.respawn();
          p.dirty = true;
        }
        break;
      case 'playerState':
        this.onPlayerState(p, msg);
        break;
    }
  }

  private reject(p: PlayerState, seq: number, reason: string, x: number, y: number, z: number): void {
    this.emit({ t: 'rejected', seq, reason }, p.id);
    // Vorhersage des Clients zurücksetzen
    this.emit({ t: 'blockChanged', x, y, z, id: this.world.getBlock(x, y, z) }, p.id);
  }

  private onPlayerState(p: PlayerState, m: Extract<ClientMessage, { t: 'playerState' }>): void {
    if (![m.x, m.y, m.z].every(Number.isFinite)) return;
    const dist = Math.hypot(m.x - p.x, m.z - p.z);
    p.x = m.x;
    p.y = m.y;
    p.z = m.z;
    p.yaw = m.yaw;
    p.pitch = m.pitch;
    p.inWater = m.inWater;
    p.eyesInWater = m.eyesInWater;
    if (p.dead) return;
    if (m.sprinting && dist < 2) p.addExhaustion(0.1 * dist);
    if (m.jumped) p.addExhaustion(m.sprinting ? 0.2 : 0.05);
    if (m.landedFrom > 3 && !m.inWater) {
      const dmg = Math.ceil(m.landedFrom - 3);
      if (p.damage(dmg, 'fall')) this.onDeath(p);
      else this.sound('hurt', p.x, p.y, p.z);
    }
  }

  private inReach(p: PlayerState, x: number, y: number, z: number): boolean {
    const reach = (p.mode === 'creative' ? REACH_CREATIVE : REACH_SURVIVAL) + 1.5;
    return Math.hypot(x + 0.5 - p.x, y + 0.5 - (p.y + 1.6), z + 0.5 - p.z) <= reach + 1;
  }

  private validateSetBlock(x: number, y: number, z: number, id: number): string | null {
    if (!Number.isInteger(x) || !Number.isInteger(y) || !Number.isInteger(z)) return 'Ungültige Position';
    if (y < 0 || y >= WORLD_HEIGHT) return 'Ausserhalb der Welt';
    if (!Number.isInteger(id) || id < 0 || id >= BLOCK_COUNT) return 'Unbekannter Block';
    if (!this.world.hasColumn(x >> 4, z >> 4)) return 'Chunk nicht geladen';
    if (id !== AIR) {
      const current = this.world.getBlock(x, y, z);
      if (!getBlock(current).replaceable) return 'Platz belegt';
      const def = getBlock(id);
      if (def.shape === Shape.Cross) {
        const below = this.world.getBlock(x, y - 1, z);
        if (below !== GRASS && below !== DIRT && below !== SNOWY_GRASS && below !== SAND) return 'Braucht Boden';
      }
      if (def.shape === Shape.Torch && !IS_SOLID[this.world.getBlock(x, y - 1, z)]) return 'Braucht festen Boden';
    }
    return null;
  }

  private breakBlock(p: PlayerState, seq: number, x: number, y: number, z: number): void {
    if (!this.world.hasColumn(x >> 4, z >> 4) || y < 0 || y >= WORLD_HEIGHT) return this.reject(p, seq, 'Ungültig', x, y, z);
    const id = this.world.getBlock(x, y, z);
    if (id === AIR || isWater(id)) return;
    if (!this.inReach(p, x, y, z)) return this.reject(p, seq, 'Zu weit entfernt', x, y, z);
    const creative = p.mode === 'creative';
    if (!creative) {
      const need = breakTicks(id, p.heldId());
      if (!Number.isFinite(need)) return this.reject(p, seq, 'Unzerstörbar', x, y, z);
      const bs = p.breakStart;
      const elapsed = bs && bs.x === x && bs.y === y && bs.z === z ? this.time - bs.tick : 0;
      if (need > 1 && elapsed < need * 0.7 - 2) return this.reject(p, seq, 'Zu schnell abgebaut', x, y, z);
    }
    p.breakStart = null;
    const tool = p.heldId();
    const def = getBlock(id);
    // Inhalt von Truhe/Schmelze fällt heraus
    const be = this.getBlockEntity(x, y, z);
    if (be) for (const s of be.container.slots) if (s) this.spawnItem(s, x + 0.5, y + 0.5, z + 0.5);
    this.setBlock(x, y, z, AIR);
    this.sound('break', x + 0.5, y + 0.5, z + 0.5, id);
    if (!creative) {
      for (const drop of blockDrops(id, tool, () => this.rng.next())) this.spawnItem(drop, x + 0.5, y + 0.3, z + 0.5);
      p.addExhaustion(0.005);
      if (def.hardness > 0 && p.damageHeldTool()) this.sound('toolBreak', p.x, p.y, p.z);
    }
  }

  private placeBlock(p: PlayerState, seq: number, x: number, y: number, z: number, id: number): void {
    const held = p.held();
    const blockId = held ? getItem(held.id)?.block : undefined;
    if (p.mode !== 'creative' && (blockId === undefined || blockId !== id)) return this.reject(p, seq, 'Block nicht in der Hand', x, y, z);
    if (p.mode === 'creative' && !(id > 0 && id < BLOCK_COUNT)) return this.reject(p, seq, 'Unbekannter Block', x, y, z);
    if (!this.inReach(p, x, y, z)) return this.reject(p, seq, 'Zu weit entfernt', x, y, z);
    const reason = this.validateSetBlock(x, y, z, id);
    if (reason) return this.reject(p, seq, reason, x, y, z);
    this.setBlock(x, y, z, id);
    p.consumeHeld();
    this.sound('place', x + 0.5, y + 0.5, z + 0.5, id);
  }

  private pickBlock(p: PlayerState, id: number): void {
    if (p.mode !== 'creative' || !isValidItem(id) || !getItem(id)?.inCatalog) {
      // Survival: nur auswählen, falls in der Hotbar vorhanden
      const idx = p.inventory.main.slots.findIndex((s, i) => i < 9 && s?.id === id);
      if (idx >= 0) {
        p.selected = idx;
        p.dirty = true;
      }
      return;
    }
    const slots = p.inventory.main.slots;
    const idx = slots.findIndex((s, i) => i < 9 && s?.id === id);
    if (idx >= 0) p.selected = idx;
    else {
      const empty = slots.findIndex((s, i) => i < 9 && !s);
      if (empty >= 0) p.selected = empty;
      slots[p.selected] = { id, count: maxStack(id) };
    }
    p.dirty = true;
  }

  private dropHeld(p: PlayerState, all: boolean): void {
    const s = p.held();
    if (!s) return;
    const n = all ? s.count : 1;
    const stack: ItemStack = { ...s, count: n };
    s.count -= n;
    if (s.count <= 0) p.inventory.main.slots[p.selected] = null;
    p.dirty = true;
    this.throwItem(p, stack);
  }

  private throwItem(p: PlayerState, stack: ItemStack): void {
    const e = this.spawnItem(stack, p.x, p.y + 1.3, p.z, false);
    const cp = Math.cos(p.pitch);
    e.vx = -Math.sin(p.yaw) * cp * 0.3;
    e.vy = Math.sin(p.pitch) * 0.3 + 0.1;
    e.vz = -Math.cos(p.yaw) * cp * 0.3;
    e.pickupDelay = 40;
  }

  // -------------------------------------------------------------------------
  // Fenster
  // -------------------------------------------------------------------------

  private openInventory(p: PlayerState): void {
    this.closeWindow(p);
    const win = new Window('inventory', this.nextWindowId++);
    const grid = new Container(4);
    const output = new Container(1);
    win.add(output, 0, 'output', 'other');
    for (let i = 0; i < 4; i++) win.add(grid, i, 'normal', 'other');
    for (let i = 0; i < 4; i++) win.add(p.inventory.armor, i, 'armor', 'other', i as 0 | 1 | 2 | 3);
    win.addPlayer(p.inventory);
    this.setupCrafting(win, grid, output, 2);
    p.window = { win, grid, output };
    this.sendWindow(p);
  }

  private setupCrafting(win: Window, grid: Container, output: Container, size: number): void {
    const recompute = (): void => {
      output.slots[0] = matchRecipe(grid.slots, size, size);
    };
    win.onChange = recompute;
    win.onTakeOutput = () => {
      for (let i = 0; i < grid.size; i++) {
        const s = grid.slots[i];
        if (s) {
          s.count--;
          if (s.count <= 0) grid.slots[i] = null;
        }
      }
      recompute();
    };
    recompute();
  }

  private useBlock(p: PlayerState, x: number, y: number, z: number): void {
    if (!this.inReach(p, x, y, z)) return;
    const id = this.world.getBlock(x, y, z);
    this.closeWindow(p);
    if (id === CRAFTING_TABLE) {
      const win = new Window('crafting', this.nextWindowId++);
      const grid = new Container(9);
      const output = new Container(1);
      win.add(output, 0, 'output', 'other');
      for (let i = 0; i < 9; i++) win.add(grid, i, 'normal', 'other');
      win.addPlayer(p.inventory);
      this.setupCrafting(win, grid, output, 3);
      p.window = { win, grid, output, pos: { x, y, z } };
    } else if (id === FURNACE || id === FURNACE_LIT || id === CHEST) {
      const be = this.getBlockEntity(x, y, z) ?? this.ensureBlockEntity(x, y, z, id);
      if (!be) return;
      const win = new Window(be.type === 'chest' ? 'chest' : 'furnace', this.nextWindowId++);
      if (be.type === 'chest') for (let i = 0; i < 27; i++) win.add(be.container, i, 'normal', 'other');
      else {
        win.add(be.container, 0, 'input', 'other');
        win.add(be.container, 1, 'fuel', 'other');
        win.add(be.container, 2, 'output', 'other');
      }
      win.addPlayer(p.inventory);
      p.window = { win, pos: { x, y, z } };
      this.sound('open', x + 0.5, y + 0.5, z + 0.5, id);
    } else return;
    this.sendWindow(p);
  }

  private closeWindow(p: PlayerState): void {
    const w = p.window;
    if (!w && !p.cursor) return;
    const giveBack = (s: Slot): void => {
      if (!s) return;
      const rest = p.inventory.add(s);
      if (rest) this.throwItem(p, rest);
    };
    if (w?.grid) for (let i = 0; i < w.grid.size; i++) {
      giveBack(w.grid.slots[i]);
      w.grid.slots[i] = null;
    }
    giveBack(p.cursor);
    p.cursor = null;
    p.window = null;
    p.dirty = true;
    if (w) this.emit({ t: 'window', window: null }, p.id);
  }

  private afterWindowChange(p: PlayerState): void {
    const w = p.window;
    if (w?.pos) {
      const col = this.world.getColumn(w.pos.x >> 4, w.pos.z >> 4);
      if (col) col.modified = true;
    }
    p.dirty = true;
    this.sendWindow(p);
  }

  private sendWindow(p: PlayerState): void {
    const w = p.window;
    if (!w) return;
    const snap: WindowSnapshot = { id: w.win.id, kind: w.win.kind, slots: w.win.snapshot() };
    if (w.win.kind === 'furnace' && w.pos) {
      const be = this.getBlockEntity(w.pos.x, w.pos.y, w.pos.z);
      if (be?.type === 'furnace') {
        snap.burn = be.burn;
        snap.burnMax = be.burnMax;
        snap.cook = be.cook;
      }
    }
    this.emit({ t: 'window', window: snap }, p.id);
  }

  // -------------------------------------------------------------------------
  // Blöcke und Block-Entities
  // -------------------------------------------------------------------------

  getBlockEntity(x: number, y: number, z: number): BlockEntity | undefined {
    const col = this.world.getColumn(x >> 4, z >> 4);
    return col?.blockEntities.get(columnIndex(x & 15, y, z & 15));
  }

  private ensureBlockEntity(x: number, y: number, z: number, blockId: number): BlockEntity | undefined {
    const type = blockEntityTypeFor(blockId);
    const col = this.world.getColumn(x >> 4, z >> 4);
    if (!type || !col) return undefined;
    const key = columnIndex(x & 15, y, z & 15);
    let be = col.blockEntities.get(key);
    if (!be || be.type !== type) {
      be = createBlockEntity(type);
      col.blockEntities.set(key, be);
      col.modified = true;
    }
    return be;
  }

  /** Setzt einen Block autoritativ und benachrichtigt alle Clients. */
  setBlock(x: number, y: number, z: number, id: number): void {
    const old = this.world.getBlock(x, y, z);
    if (!applyBlockChange(this.world, this.light, x, y, z, id)) return;
    // Block-Entities pflegen (Schmelze an/aus behält ihren Inhalt)
    const col = this.world.getColumn(x >> 4, z >> 4);
    if (col) {
      const key = columnIndex(x & 15, y, z & 15);
      const type = blockEntityTypeFor(id);
      if (!type) col.blockEntities.delete(key);
      else if (blockEntityTypeFor(old) !== type) this.ensureBlockEntity(x, y, z, id);
    }
    this.emit({ t: 'blockChanged', x, y, z, id });
    this.water.onBlockChanged(x, y, z, this.time);
    // Fenster schliessen, wenn ihr Block verschwindet
    for (const p of this.players.values()) {
      const pos = p.window?.pos;
      if (pos && pos.x === x && pos.y === y && pos.z === z && blockEntityTypeFor(id) !== blockEntityTypeFor(old)) this.closeWindow(p);
      else if (pos && pos.x === x && pos.y === y && pos.z === z && id === AIR) this.closeWindow(p);
    }
    // Pflanzen und Fackeln ohne Boden fallen weg
    if (y + 1 < WORLD_HEIGHT && !getBlock(id).solid) {
      const above = this.world.getBlock(x, y + 1, z);
      const shape = getBlock(above).shape;
      if (above !== AIR && (shape === Shape.Cross || shape === Shape.Torch)) {
        for (const d of blockDrops(above, null, () => this.rng.next())) this.spawnItem(d, x + 0.5, y + 1.3, z + 0.5);
        this.setBlock(x, y + 1, z, AIR);
      }
    }
  }

  // -------------------------------------------------------------------------
  // Items
  // -------------------------------------------------------------------------

  spawnItem(stack: ItemStack, x: number, y: number, z: number, scatter = true): ItemEntity {
    const e = new ItemEntity(this.nextEntityId++, { ...stack }, x, y, z);
    if (scatter) {
      e.vx = (this.rng.next() - 0.5) * 0.15;
      e.vy = 0.15 + this.rng.next() * 0.05;
      e.vz = (this.rng.next() - 0.5) * 0.15;
    }
    this.items.set(e.id, e);
    this.itemsDirty = true;
    return e;
  }

  private tickItems(): void {
    const list = [...this.items.values()];
    for (const e of list) {
      if (!this.world.hasColumn(Math.floor(e.x) >> 4, Math.floor(e.z) >> 4)) continue; // ruht
      if (e.tick(this.world)) this.itemsDirty = true;
      if (e.age > ITEM_DESPAWN_TICKS || e.y < -64) {
        this.items.delete(e.id);
        this.itemsDirty = true;
        continue;
      }
      if (e.pickupDelay > 0) continue;
      for (const p of this.players.values()) {
        if (p.dead) continue;
        // Aufsammel-Box: Spieler-Hitbox, seitlich um 1 Block und vertikal um 0,5 erweitert
        if (Math.abs(e.x - p.x) > 1.425 || Math.abs(e.z - p.z) > 1.425 || e.y < p.y - 0.75 || e.y > p.y + 2.3) continue;
        const rest = p.inventory.add(e.item);
        if (!rest || rest.count !== e.item.count) {
          p.dirty = true;
          this.sound('pickup', e.x, e.y, e.z);
          if (!rest) {
            this.items.delete(e.id);
            this.itemsDirty = true;
            break;
          }
          e.item = rest;
          this.itemsDirty = true;
        }
      }
    }
    // Gleiche Items in der Nähe zusammenführen
    if (this.tickCount % 20 === 0) {
      const arr = [...this.items.values()];
      for (let i = 0; i < arr.length; i++) {
        const a = arr[i];
        if (!this.items.has(a.id)) continue;
        for (let j = i + 1; j < arr.length; j++) {
          const b = arr[j];
          if (!this.items.has(b.id) || a.item.id !== b.item.id || (a.item.damage ?? 0) !== (b.item.damage ?? 0)) continue;
          if (Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z) > 0.8) continue;
          if (a.item.count + b.item.count > maxStack(a.item.id)) continue;
          a.item.count += b.item.count;
          a.age = Math.min(a.age, b.age);
          this.items.delete(b.id);
          this.itemsDirty = true;
        }
      }
    }
  }

  itemSnapshots(): ItemEntitySnapshot[] {
    return [...this.items.values()].map((e) => e.snapshot());
  }

  /** Für die Speicherung: alle Items (auch ruhende). */
  serializeItems(): { item: ItemStack; x: number; y: number; z: number; age: number }[] {
    return [...this.items.values()].map((e) => ({ item: { ...e.item }, x: e.x, y: e.y, z: e.z, age: e.age }));
  }

  loadItems(list: { item: ItemStack; x: number; y: number; z: number; age: number }[] | undefined): void {
    for (const d of list ?? []) {
      if (!d?.item || !isValidItem(d.item.id) || !(d.item.count > 0)) continue;
      const e = this.spawnItem(d.item, d.x, d.y, d.z, false);
      e.age = d.age ?? 0;
      e.pickupDelay = 0;
    }
  }

  // -------------------------------------------------------------------------
  // Tick
  // -------------------------------------------------------------------------

  tick(): void {
    this.time++;
    this.tickCount++;
    if (this.tickCount % TICKS_PER_SECOND === 0) this.emit({ t: 'time', ticks: this.time });
    this.water.tick(this.time);
    this.tickFurnaces();
    this.tickItems();
    for (const p of this.players.values()) {
      const cause = p.tickSurvival();
      if (cause) this.onDeath(p);
      if (p.window?.win.kind === 'furnace') this.sendWindow(p);
      if (p.dirty) {
        p.dirty = false;
        this.emit({ t: 'player', state: p.snapshot() }, p.id);
      }
    }
    if (this.itemsDirty) {
      this.itemsDirty = false;
      this.emit({ t: 'items', list: this.itemSnapshots() });
    }
  }

  private onDeath(p: PlayerState): void {
    this.closeWindow(p);
    // Inventar fällt heraus
    for (const c of [p.inventory.main, p.inventory.armor]) {
      for (let i = 0; i < c.size; i++) {
        const s = c.slots[i];
        if (s) this.spawnItem(s, p.x, p.y + 1, p.z);
        c.slots[i] = null;
      }
    }
    p.dirty = true;
    this.sound('death', p.x, p.y, p.z);
    this.emit({ t: 'death', message: DEATH_MESSAGES[p.lastDeath ?? 'generic'] }, p.id);
  }

  private tickFurnaces(): void {
    for (const col of this.world.columns.values()) {
      if (col.blockEntities.size === 0) continue;
      for (const [key, be] of col.blockEntities) {
        if (be.type !== 'furnace') continue;
        const changed = this.tickFurnace(be);
        if (!changed) continue;
        col.modified = true;
        const x = col.cx * 16 + (key & 15);
        const z = col.cz * 16 + ((key >> 4) & 15);
        const y = key >> 8;
        const lit = be.burn > 0;
        const cur = this.world.getBlock(x, y, z);
        if (lit && cur === FURNACE) this.setBlock(x, y, z, FURNACE_LIT);
        else if (!lit && cur === FURNACE_LIT) this.setBlock(x, y, z, FURNACE);
      }
    }
  }

  /** Ein Schmelze-Tick. Gibt true zurück, wenn sich der Zustand geändert hat. */
  private tickFurnace(f: FurnaceEntity): boolean {
    const [input, fuel, output] = f.container.slots;
    const wasBurning = f.burn > 0;
    let changed = false;
    if (f.burn > 0) {
      f.burn--;
      changed = true;
    }
    const result = input ? smeltResult(input.id) : null;
    const fits = !!result && (!output || (output.id === result.id && output.count + result.count <= maxStack(output.id)));
    if (result && fits) {
      if (f.burn === 0 && fuel) {
        const t = fuelTicks(fuel.id);
        if (t > 0) {
          f.burn = f.burnMax = t;
          fuel.count--;
          if (fuel.count <= 0) f.container.slots[1] = null;
          changed = true;
        }
      }
      if (f.burn > 0) {
        f.cook++;
        changed = true;
        if (f.cook >= SMELT_TICKS) {
          f.cook = 0;
          input!.count--;
          if (input!.count <= 0) f.container.slots[0] = null;
          if (output) output.count += result.count;
          else f.container.slots[2] = { ...result };
        }
      } else if (f.cook > 0) {
        f.cook = Math.max(0, f.cook - 2);
        changed = true;
      }
    } else if (f.cook > 0) {
      f.cook = 0;
      changed = true;
    }
    return changed || wasBurning !== f.burn > 0;
  }

  /** Spalten mit ungespeicherten Änderungen. */
  modifiedColumns(): { cx: number; cz: number }[] {
    const out: { cx: number; cz: number }[] = [];
    for (const col of this.world.columns.values()) if (col.modified) out.push({ cx: col.cx, cz: col.cz });
    return out;
  }

  /** Hilfsfunktion für Tests/Spiel: Items direkt ins Inventar legen. */
  give(playerId: number, stack: ItemStack): ItemStack | null {
    const p = this.players.get(playerId);
    if (!p) return stack;
    p.dirty = true;
    return addToSlots(p.inventory.main.slots, stack);
  }
}
