/**
 * Lokaler Spieler: Eingaben → Physik (20 TPS), Kamera (interpoliert),
 * Abbauen mit Fortschritt, Platzieren, Benutzen, Essen per Raycast.
 */
import * as THREE from 'three';
import {
  AABB,
  breakTicks,
  FURNACE,
  FURNACE_LIT,
  getBlock,
  getItem,
  PLAYER_HALF_WIDTH,
  PlayerBody,
  raycast,
  REACH_CREATIVE,
  REACH_SURVIVAL,
  type ClientMessage,
  type MoveInput,
  type PhysicsEvents,
  type PlayerSnapshot,
  type RayHit,
  type World,
} from '@blockcraft/shared';
import type { Input } from '../input/Input';

const CREATIVE_BREAK_DELAY = 0.25;
const BREAK_COOLDOWN = 0.25;
const PLACE_DELAY = 0.2;
const EAT_SECONDS = 1.6;
const DOUBLE_TAP = 0.3;

export class PlayerController {
  readonly body = new PlayerBody();
  yaw = 0;
  pitch = 0;
  creative = true;
  target: RayHit | null = null;
  /** Abbau-Fortschritt 0–1 (für das Riss-Overlay). */
  breakProgress = 0;
  /** Ess-Fortschritt 0–1. */
  eatProgress = 0;
  /** Letzter Snapshot aus der Simulation (Inventar, Leben …). */
  state: PlayerSnapshot | null = null;
  selected = 0;
  private eye = 1.62;
  private breakCooldown = 0;
  private placeCooldown = 0;
  private breaking: { x: number; y: number; z: number } | null = null;
  private lastJumpTap = -10;
  private lastForwardTap = -10;
  private sprintToggle = false;
  private clock = 0;
  private seq = 0;
  private bobPhase = 0;
  private lastEvents: PhysicsEvents = { landedFrom: 0, jumped: false };

  constructor(
    private readonly world: World,
    private readonly input: Input,
    private readonly send: (msg: ClientMessage) => void,
  ) {}

  /** Ein Simulationstick (50 ms). Gibt den Zustand für die Simulation zurück. */
  tick(dead: boolean): void {
    const inp = this.input;
    const active = !dead;
    const forward = active ? (inp.isDown('forward') ? 1 : 0) - (inp.isDown('back') ? 1 : 0) : 0;
    const strafe = active ? (inp.isDown('right') ? 1 : 0) - (inp.isDown('left') ? 1 : 0) : 0;
    if (forward <= 0) this.sprintToggle = false;
    const move: MoveInput = {
      forward,
      strafe,
      jump: active && inp.isDown('jump'),
      sneak: active && inp.isDown('sneak'),
      sprint: active && (inp.isDown('sprint') || this.sprintToggle),
      yaw: this.yaw,
    };
    this.body.canFly = this.creative;
    if (!this.creative) this.body.flying = false;
    this.lastEvents = this.body.tick(this.world, move);
    const speed = Math.hypot(this.body.vx, this.body.vz);
    if (this.body.onGround && speed > 0.01) this.bobPhase += speed * 2.2;
    const b = this.body;
    this.send({
      t: 'playerState',
      x: b.x,
      y: b.y,
      z: b.z,
      yaw: this.yaw,
      pitch: this.pitch,
      inWater: b.inWater,
      eyesInWater: b.eyesInWater,
      sprinting: b.sprinting,
      jumped: this.lastEvents.jumped,
      landedFrom: this.creative ? 0 : this.lastEvents.landedFrom,
    });
  }

  get lastPhysics(): PhysicsEvents {
    return this.lastEvents;
  }

  held(): { id: number; count: number } | null {
    return this.state?.main[this.selected] ?? null;
  }

  /** Pro Frame: Maus, Doppeltipp-Gesten, Interaktion. */
  frame(dt: number, camera: THREE.PerspectiveCamera, alpha: number, sensitivity: number, invertY: boolean, canInteract: boolean): void {
    this.clock += dt;
    const inp = this.input;
    if (inp.locked) {
      const k = 0.0022 * (sensitivity / 100);
      this.yaw -= inp.mouseDX * k;
      this.pitch -= inp.mouseDY * k * (invertY ? -1 : 1);
      const lim = Math.PI / 2 - 0.001;
      this.pitch = Math.max(-lim, Math.min(lim, this.pitch));
      this.yaw = ((this.yaw % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);

      if (inp.wasPressed('jump')) {
        if (this.creative && this.clock - this.lastJumpTap < DOUBLE_TAP) {
          this.body.flying = !this.body.flying;
          this.lastJumpTap = -10;
        } else this.lastJumpTap = this.clock;
      }
      if (inp.wasPressed('forward')) {
        if (this.clock - this.lastForwardTap < DOUBLE_TAP) this.sprintToggle = true;
        this.lastForwardTap = this.clock;
      }
    }

    // Kamera (interpoliert zwischen Ticks)
    const b = this.body;
    const x = b.prevX + (b.x - b.prevX) * alpha;
    const y = b.prevY + (b.y - b.prevY) * alpha;
    const z = b.prevZ + (b.z - b.prevZ) * alpha;
    this.eye += (b.eyeHeight - this.eye) * Math.min(1, dt * 14);
    const bob = b.flying ? 0 : Math.sin(this.bobPhase) * 0.035;
    camera.position.set(x, y + this.eye + Math.abs(bob), z);
    camera.rotation.set(this.pitch, this.yaw, 0);

    const dir = this.lookDir();
    const reach = this.creative ? REACH_CREATIVE : REACH_SURVIVAL;
    this.target = raycast(this.world, camera.position.x, camera.position.y, camera.position.z, dir.x, dir.y, dir.z, reach);

    this.breakCooldown = Math.max(0, this.breakCooldown - dt);
    this.placeCooldown = Math.max(0, this.placeCooldown - dt);
    if (!inp.locked || !canInteract) {
      this.resetBreak();
      this.eatProgress = 0;
      return;
    }

    // Abbauen
    const t = this.target;
    if (inp.buttons.has(0) && t) this.updateBreaking(t, dt, inp.clicked.has(0));
    else this.resetBreak();

    // Rechtsklick: Benutzen, Essen oder Platzieren
    const held = this.held();
    const food = held ? getItem(held.id)?.food : undefined;
    const sneaking = inp.isDown('sneak');
    if (inp.buttons.has(2)) {
      if (t && getBlock(t.id).interactive && !sneaking) {
        if (inp.clicked.has(2)) this.send({ t: 'useBlock', x: t.x, y: t.y, z: t.z });
        this.eatProgress = 0;
      } else if (food && (this.creative || (this.state?.hunger ?? 20) < 20)) {
        this.eatProgress += dt / EAT_SECONDS;
        if (this.eatProgress >= 1) {
          this.send({ t: 'eat' });
          this.eatProgress = 0;
        }
      } else if (t && (inp.clicked.has(2) || this.placeCooldown <= 0)) {
        if (this.placeBlock(t)) this.placeCooldown = PLACE_DELAY;
        else if (inp.clicked.has(2)) this.placeCooldown = PLACE_DELAY;
      }
    } else this.eatProgress = 0;

    // Mittelklick: Block wählen
    if (inp.clicked.has(1) && t) this.send({ t: 'pickBlock', id: t.id === FURNACE_LIT ? FURNACE : t.id });
    // Item fallen lassen
    if (inp.wasPressed('drop')) this.send({ t: 'drop', all: inp.isDown('sprint') });
  }

  private resetBreak(): void {
    this.breaking = null;
    this.breakProgress = 0;
  }

  private updateBreaking(t: RayHit, dt: number, fresh: boolean): void {
    if (this.creative) {
      if (fresh || this.breakCooldown <= 0) {
        this.send({ t: 'breakBlock', seq: ++this.seq, x: t.x, y: t.y, z: t.z });
        this.breakCooldown = CREATIVE_BREAK_DELAY;
      }
      return;
    }
    const b = this.breaking;
    if (!b || b.x !== t.x || b.y !== t.y || b.z !== t.z) {
      if (this.breakCooldown > 0 && !fresh) return;
      this.breaking = { x: t.x, y: t.y, z: t.z };
      this.breakProgress = 0;
      this.send({ t: 'startBreak', x: t.x, y: t.y, z: t.z });
    }
    const ticks = breakTicks(t.id, this.held()?.id ?? null);
    if (!Number.isFinite(ticks)) return;
    this.breakProgress += ticks <= 0 ? 1 : (dt * 20) / ticks;
    if (this.breakProgress >= 1) {
      this.send({ t: 'breakBlock', seq: ++this.seq, x: t.x, y: t.y, z: t.z });
      this.resetBreak();
      this.breakCooldown = BREAK_COOLDOWN;
    }
  }

  private placeBlock(hit: RayHit): boolean {
    const held = this.held();
    const id = held ? getItem(held.id)?.block : undefined;
    if (id === undefined) return false;
    let x = hit.x;
    let y = hit.y;
    let z = hit.z;
    if (!getBlock(hit.id).replaceable) {
      x += hit.nx;
      y += hit.ny;
      z += hit.nz;
    }
    if (!getBlock(this.world.getBlock(x, y, z)).replaceable) return false;
    if (getBlock(id).solid) {
      const box = new AABB(x, y, z, x + 1, y + 1, z + 1);
      if (box.intersects(this.body.box())) return false;
    }
    this.send({ t: 'placeBlock', seq: ++this.seq, x, y, z, id });
    return true;
  }

  lookDir(): THREE.Vector3 {
    const cp = Math.cos(this.pitch);
    return new THREE.Vector3(-Math.sin(this.yaw) * cp, Math.sin(this.pitch), -Math.cos(this.yaw) * cp);
  }

  facingName(): string {
    const d = this.lookDir();
    if (Math.abs(d.x) > Math.abs(d.z)) return d.x > 0 ? 'Osten (+X)' : 'Westen (−X)';
    return d.z > 0 ? 'Süden (+Z)' : 'Norden (−Z)';
  }

  /** Sucht eine freie Position ab (x, z) nach oben. */
  findFreeSpot(x: number, y: number, z: number): number {
    for (let yy = Math.max(1, Math.floor(y)); yy < 255; yy++) {
      const box = AABB.fromFeet(x, yy, z, PLAYER_HALF_WIDTH, 1.8);
      let free = true;
      for (let by = Math.floor(box.minY); by <= Math.floor(box.maxY) && free; by++)
        for (let bz = Math.floor(box.minZ); bz <= Math.floor(box.maxZ) && free; bz++)
          for (let bx = Math.floor(box.minX); bx <= Math.floor(box.maxX); bx++) {
            if (getBlock(this.world.getBlock(bx, by, bz)).solid) {
              free = false;
              break;
            }
          }
      const below = getBlock(this.world.getBlock(Math.floor(x), yy - 1, Math.floor(z)));
      if (free && (below.solid || below.liquid)) return yy;
    }
    return Math.floor(y);
  }
}
