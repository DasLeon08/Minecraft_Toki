/**
 * Lokaler Spieler: Eingaben → Physik (20 TPS), Kamera (interpoliert),
 * Abbauen/Platzieren per Raycast.
 */
import * as THREE from 'three';
import {
  AABB,
  AIR,
  getBlock,
  PLAYER_HALF_WIDTH,
  PlayerBody,
  raycast,
  REACH_CREATIVE,
  REACH_SURVIVAL,
  type ClientMessage,
  type MoveInput,
  type RayHit,
  type World,
} from '@blockcraft/shared';
import type { Input } from '../input/Input';

const BREAK_DELAY = 0.25;
const PLACE_DELAY = 0.2;
const DOUBLE_TAP = 0.3;

export class PlayerController {
  readonly body = new PlayerBody();
  yaw = 0;
  pitch = 0;
  creative = true;
  target: RayHit | null = null;
  private eye = 1.62;
  private breakCooldown = 0;
  private placeCooldown = 0;
  private lastJumpTap = -10;
  private lastForwardTap = -10;
  private sprintToggle = false;
  private clock = 0;
  private seq = 0;
  private bobPhase = 0;

  constructor(
    private readonly world: World,
    private readonly input: Input,
    private readonly send: (msg: ClientMessage) => void,
  ) {}

  /** Ein Simulationstick (50 ms). */
  tick(): void {
    const inp = this.input;
    const forward = (inp.isDown('forward') ? 1 : 0) - (inp.isDown('back') ? 1 : 0);
    const strafe = (inp.isDown('right') ? 1 : 0) - (inp.isDown('left') ? 1 : 0);
    if (forward <= 0) this.sprintToggle = false;
    const move: MoveInput = {
      forward,
      strafe,
      jump: inp.isDown('jump'),
      sneak: inp.isDown('sneak'),
      sprint: inp.isDown('sprint') || this.sprintToggle,
      yaw: this.yaw,
    };
    this.body.canFly = this.creative;
    if (!this.creative) this.body.flying = false;
    this.body.tick(this.world, move);
    const speed = Math.hypot(this.body.vx, this.body.vz);
    if (this.body.onGround && speed > 0.01) this.bobPhase += speed * 2.2;
  }

  /** Pro Frame: Maus, Doppeltipp-Gesten, Interaktion. */
  frame(dt: number, camera: THREE.PerspectiveCamera, alpha: number, sensitivity: number, invertY: boolean): void {
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
    const targetEye = b.eyeHeight;
    this.eye += (targetEye - this.eye) * Math.min(1, dt * 14);
    const bob = b.flying ? 0 : Math.sin(this.bobPhase) * 0.035;
    camera.position.set(x, y + this.eye + Math.abs(bob), z);
    camera.rotation.set(this.pitch, this.yaw, 0);

    // Ziel bestimmen
    const dir = this.lookDir();
    const reach = this.creative ? REACH_CREATIVE : REACH_SURVIVAL;
    this.target = raycast(this.world, camera.position.x, camera.position.y, camera.position.z, dir.x, dir.y, dir.z, reach);

    this.breakCooldown = Math.max(0, this.breakCooldown - dt);
    this.placeCooldown = Math.max(0, this.placeCooldown - dt);
    if (!inp.locked) return;

    if (this.target) {
      if (inp.clicked.has(0) || (inp.buttons.has(0) && this.breakCooldown <= 0)) {
        this.breakBlock(this.target);
        this.breakCooldown = BREAK_DELAY;
      }
      if (inp.clicked.has(2) || (inp.buttons.has(2) && this.placeCooldown <= 0)) {
        if (this.placeBlock(this.target)) this.placeCooldown = PLACE_DELAY;
      }
    }
  }

  /** Gewählter Block in der Hotbar (wird vom Spiel gesetzt). */
  heldBlock = AIR;

  pickTarget(): number | null {
    return this.target ? this.target.id : null;
  }

  private breakBlock(hit: RayHit): void {
    this.send({ t: 'setBlock', seq: ++this.seq, x: hit.x, y: hit.y, z: hit.z, id: AIR });
  }

  private placeBlock(hit: RayHit): boolean {
    const id = this.heldBlock;
    if (id === AIR) return false;
    // Ersetzbare Blöcke (Gras) direkt ersetzen, sonst an der Fläche anbauen
    let x = hit.x;
    let y = hit.y;
    let z = hit.z;
    if (!getBlock(hit.id).replaceable) {
      x += hit.nx;
      y += hit.ny;
      z += hit.nz;
    }
    const current = getBlock(this.world.getBlock(x, y, z));
    if (!current.replaceable) return false;
    if (getBlock(id).solid) {
      const box = new AABB(x, y, z, x + 1, y + 1, z + 1);
      if (box.intersects(this.body.box())) return false;
    }
    this.send({ t: 'setBlock', seq: ++this.seq, x, y, z, id });
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
