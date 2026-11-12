/** Spielerzustand in der Simulation: Inventar, Leben, Hunger, Luft. */
import { getItem, maxDurability } from '../registry/items';
import { PlayerInventory, type Slot, type Window, Container } from './inventory';

export type GameMode = 'creative' | 'survival';
export type DamageCause = 'fall' | 'drown' | 'starve' | 'void' | 'generic';

export const MAX_HEALTH = 20;
export const MAX_HUNGER = 20;
export const MAX_AIR = 300;

export interface PlayerSnapshot {
  main: Slot[];
  armor: Slot[];
  cursor: Slot;
  selected: number;
  health: number;
  hunger: number;
  saturation: number;
  air: number;
  armorPoints: number;
  mode: GameMode;
  dead: boolean;
}

export interface PlayerPersist {
  main: Slot[];
  armor: Slot[];
  selected: number;
  health: number;
  hunger: number;
  saturation: number;
  air: number;
  spawn?: { x: number; y: number; z: number };
}

export interface OpenWindow {
  win: Window;
  /** Temporäres Crafting-Raster (wird beim Schliessen geleert). */
  grid?: Container;
  output?: Container;
  /** Position des Blocks (Werktisch, Schmelze, Truhe). */
  pos?: { x: number; y: number; z: number };
}

export class PlayerState {
  readonly inventory = new PlayerInventory();
  cursor: Slot = null;
  selected = 0;
  health = MAX_HEALTH;
  hunger = MAX_HUNGER;
  saturation = 5;
  exhaustion = 0;
  air = MAX_AIR;
  dead = false;
  hurtCooldown = 0;
  foodTimer = 0;
  voidTimer = 0;
  // Zuletzt gemeldete Position (vom Client)
  x = 0;
  y = 0;
  z = 0;
  yaw = 0;
  pitch = 0;
  eyesInWater = false;
  inWater = false;
  spawn: { x: number; y: number; z: number } | null = null;
  window: OpenWindow | null = null;
  breakStart: { x: number; y: number; z: number; tick: number } | null = null;
  /** Zustand hat sich geändert → Snapshot senden. */
  dirty = true;
  lastDeath: DamageCause | null = null;

  constructor(
    readonly id: number,
    public mode: GameMode,
  ) {}

  held(): Slot {
    return this.inventory.main.slots[this.selected];
  }

  heldId(): number | null {
    return this.held()?.id ?? null;
  }

  /** Verbraucht ein Item aus der Hand (nicht im Kreativmodus). */
  consumeHeld(n = 1): void {
    if (this.mode === 'creative') return;
    const s = this.held();
    if (!s) return;
    s.count -= n;
    if (s.count <= 0) this.inventory.main.slots[this.selected] = null;
    this.dirty = true;
  }

  /** Nutzt das gehaltene Werkzeug ab. Gibt true zurück, wenn es zerbricht. */
  damageHeldTool(): boolean {
    if (this.mode === 'creative') return false;
    const s = this.held();
    if (!s || !getItem(s.id)?.tool) return false;
    s.damage = (s.damage ?? 0) + 1;
    this.dirty = true;
    if (s.damage >= maxDurability(s.id)) {
      this.inventory.main.slots[this.selected] = null;
      return true;
    }
    return false;
  }

  addExhaustion(v: number): void {
    if (this.mode === 'creative') return;
    this.exhaustion = Math.min(40, this.exhaustion + v);
  }

  /** Fügt Schaden zu. Gibt true zurück, wenn der Spieler dadurch stirbt. */
  damage(amount: number, cause: DamageCause): boolean {
    if (this.mode === 'creative' || this.dead || amount <= 0) return false;
    if (this.hurtCooldown > 0 && cause !== 'void' && cause !== 'starve' && cause !== 'drown') return false;
    let dmg = amount;
    if (cause === 'generic') {
      const armor = this.inventory.armorPoints();
      dmg = amount * (1 - Math.min(20, armor) / 25);
      for (let i = 0; i < 4; i++) {
        const a = this.inventory.armor.slots[i];
        if (!a) continue;
        a.damage = (a.damage ?? 0) + 1;
        if (a.damage >= maxDurability(a.id)) this.inventory.armor.slots[i] = null;
      }
    }
    this.health = Math.max(0, this.health - dmg);
    this.hurtCooldown = 10;
    this.addExhaustion(0.1);
    this.dirty = true;
    if (this.health <= 0) {
      this.dead = true;
      this.lastDeath = cause;
      return true;
    }
    return false;
  }

  heal(amount: number): void {
    if (this.dead) return;
    const h = Math.min(MAX_HEALTH, this.health + amount);
    if (h !== this.health) {
      this.health = h;
      this.dirty = true;
    }
  }

  /** Hunger, Regeneration und Verhungern (ein Tick). Gibt eine Todesursache zurück, falls tödlich. */
  tickSurvival(): DamageCause | null {
    if (this.hurtCooldown > 0) this.hurtCooldown--;
    if (this.mode === 'creative' || this.dead) return null;
    if (this.exhaustion >= 4) {
      this.exhaustion -= 4;
      if (this.saturation > 0) this.saturation = Math.max(0, this.saturation - 1);
      else this.hunger = Math.max(0, this.hunger - 1);
      this.dirty = true;
    }
    this.foodTimer++;
    if (this.hunger >= 18 && this.health < MAX_HEALTH) {
      if (this.foodTimer >= 80) {
        this.heal(1);
        this.addExhaustion(3);
        this.foodTimer = 0;
      }
    } else if (this.hunger <= 0) {
      if (this.foodTimer >= 80) {
        this.foodTimer = 0;
        if (this.health > 1 && this.damage(1, 'starve')) return 'starve';
      }
    } else this.foodTimer = 0;

    // Luft
    if (this.eyesInWater) {
      this.air--;
      if (this.air <= -20) {
        this.air = 0;
        if (this.damage(2, 'drown')) return 'drown';
      }
      this.dirty = true;
    } else if (this.air < MAX_AIR) {
      this.air = Math.min(MAX_AIR, this.air + 5);
      this.dirty = true;
    }

    // Leere
    if (this.y < -10) {
      if (++this.voidTimer >= 10) {
        this.voidTimer = 0;
        if (this.damage(4, 'void')) return 'void';
      }
    }
    return null;
  }

  eat(): boolean {
    const s = this.held();
    const food = s ? getItem(s.id)?.food : undefined;
    if (!food || (this.hunger >= 20 && this.mode !== 'creative')) return false;
    this.hunger = Math.min(MAX_HUNGER, this.hunger + food.hunger);
    this.saturation = Math.min(this.hunger, this.saturation + food.saturation);
    this.consumeHeld();
    this.dirty = true;
    return true;
  }

  respawn(): void {
    this.health = MAX_HEALTH;
    this.hunger = MAX_HUNGER;
    this.saturation = 5;
    this.exhaustion = 0;
    this.air = MAX_AIR;
    this.dead = false;
    this.lastDeath = null;
    this.hurtCooldown = 20;
    this.dirty = true;
  }

  snapshot(): PlayerSnapshot {
    return {
      main: this.inventory.main.toJSON(),
      armor: this.inventory.armor.toJSON(),
      cursor: this.cursor ? { ...this.cursor } : null,
      selected: this.selected,
      health: this.health,
      hunger: this.hunger,
      saturation: this.saturation,
      air: this.air,
      armorPoints: this.inventory.armorPoints(),
      mode: this.mode,
      dead: this.dead,
    };
  }

  persist(): PlayerPersist {
    return {
      main: this.inventory.main.toJSON(),
      armor: this.inventory.armor.toJSON(),
      selected: this.selected,
      health: this.health,
      hunger: this.hunger,
      saturation: this.saturation,
      air: this.air,
      spawn: this.spawn ?? undefined,
    };
  }

  restore(p: Partial<PlayerPersist>): void {
    this.inventory.main.load(p.main);
    this.inventory.armor.load(p.armor);
    this.selected = Math.max(0, Math.min(8, p.selected ?? 0));
    this.health = p.health ?? MAX_HEALTH;
    this.hunger = p.hunger ?? MAX_HUNGER;
    this.saturation = p.saturation ?? 5;
    this.air = p.air ?? MAX_AIR;
    this.spawn = p.spawn ?? null;
    this.dead = this.health <= 0;
    this.dirty = true;
  }
}
