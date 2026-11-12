/**
 * Bewegungsmodell des Spielers mit fester Tickrate (20 TPS).
 * Die Werte sind auf ein vertrautes, präzises Sandbox-Gefühl abgestimmt:
 * Gehen ≈ 4,3 m/s, Sprinten ≈ 5,6 m/s, Sprunghöhe ≈ 1,25 Blöcke.
 */
import { IS_SOLID, getBlock } from '../registry/blocks';
import type { World } from '../world/World';
import { AABB } from './aabb';

export const PLAYER_HALF_WIDTH = 0.3;
export const PLAYER_HEIGHT = 1.8;
export const PLAYER_SNEAK_HEIGHT = 1.5;
export const PLAYER_EYE = 1.62;
export const PLAYER_SNEAK_EYE = 1.32;

const GRAVITY = 0.08;
const AIR_DRAG = 0.98;
const GROUND_SLIP = 0.6 * 0.91;
const AIR_SLIP = 0.91;
const WALK = 0.1;
const SPRINT = 0.13;
const JUMP = 0.42;
const SNEAK_FACTOR = 0.3;
const STEP_CHECK = 0.6;

export interface MoveInput {
  /** −1 … 1 (vorwärts positiv) */
  forward: number;
  /** −1 … 1 (rechts positiv) */
  strafe: number;
  jump: boolean;
  sneak: boolean;
  sprint: boolean;
  /** Blickrichtung in Radiant (0 = −Z). */
  yaw: number;
}

export interface PhysicsEvents {
  /** Fallhöhe in Blöcken beim Aufkommen (0 = kein Landen in diesem Tick). */
  landedFrom: number;
  /** In diesem Tick abgesprungen. */
  jumped: boolean;
}

export class PlayerBody {
  x = 0;
  y = 0;
  z = 0;
  vx = 0;
  vy = 0;
  vz = 0;
  prevX = 0;
  prevY = 0;
  prevZ = 0;
  onGround = false;
  inWater = false;
  eyesInWater = false;
  flying = false;
  sneaking = false;
  sprinting = false;
  horizontalCollision = false;
  fallDistance = 0;
  /** Darf fliegen (Creative). */
  canFly = true;

  setPosition(x: number, y: number, z: number): void {
    this.x = this.prevX = x;
    this.y = this.prevY = y;
    this.z = this.prevZ = z;
    this.vx = this.vy = this.vz = 0;
    this.fallDistance = 0;
  }

  get height(): number {
    return this.sneaking && !this.flying ? PLAYER_SNEAK_HEIGHT : PLAYER_HEIGHT;
  }

  get eyeHeight(): number {
    return this.sneaking && !this.flying ? PLAYER_SNEAK_EYE : PLAYER_EYE;
  }

  box(): AABB {
    return AABB.fromFeet(this.x, this.y, this.z, PLAYER_HALF_WIDTH, this.height);
  }

  /** Simuliert einen Tick. */
  tick(world: World, input: MoveInput): PhysicsEvents {
    this.prevX = this.x;
    this.prevY = this.y;
    this.prevZ = this.z;
    const events: PhysicsEvents = { landedFrom: 0, jumped: false };

    // Schleichen: Höhe nur reduzieren, wenn kein Hindernis (beim Aufstehen prüfen)
    const wantSneak = input.sneak && !this.flying;
    if (!wantSneak && this.sneaking) {
      const standing = AABB.fromFeet(this.x, this.y, this.z, PLAYER_HALF_WIDTH, PLAYER_HEIGHT);
      if (!this.collides(world, standing)) this.sneaking = false;
    } else {
      this.sneaking = wantSneak;
    }

    // Sprinten
    if (input.sprint && input.forward > 0 && !this.sneaking) this.sprinting = true;
    if (input.forward <= 0 || this.sneaking || (this.horizontalCollision && !this.flying)) this.sprinting = false;

    // Eingaben werden leicht gedämpft (ergibt die gewohnten 4,3 bzw. 5,6 m/s)
    let forward = input.forward * 0.98;
    let strafe = input.strafe * 0.98;
    if (this.sneaking) {
      forward *= SNEAK_FACTOR;
      strafe *= SNEAK_FACTOR;
    }

    this.updateWater(world);

    if (this.flying) {
      const accel = this.sprinting ? 0.1 : 0.05;
      this.moveRelative(forward, strafe, accel, input.yaw);
      if (input.jump) this.vy += 0.15;
      if (input.sneak) this.vy -= 0.15;
      this.move(world, this.vx, this.vy, this.vz, false);
      this.vx *= AIR_SLIP;
      this.vz *= AIR_SLIP;
      this.vy *= 0.6;
      if (this.onGround) this.flying = false;
      this.fallDistance = 0;
    } else if (this.inWater) {
      this.moveRelative(forward, strafe, 0.02, input.yaw);
      if (input.jump) this.vy += 0.04;
      const startY = this.y;
      this.move(world, this.vx, this.vy, this.vz, false);
      this.vx *= 0.8;
      this.vy *= 0.8;
      this.vz *= 0.8;
      this.vy -= 0.02;
      // Aus dem Wasser an Kanten hochklettern
      if (this.horizontalCollision && input.jump) {
        const test = this.box().offset(this.vx, this.vy + 0.6 - this.y + startY, this.vz);
        if (!this.collides(world, test)) this.vy = 0.3;
      }
      this.fallDistance = 0;
    } else {
      const slip = this.onGround ? GROUND_SLIP : AIR_SLIP;
      const speed = this.sprinting ? SPRINT : WALK;
      const accel = this.onGround ? speed * (0.16277136 / (slip * slip * slip)) : this.sprinting ? 0.026 : 0.02;
      if (input.jump && this.onGround) {
        this.vy = JUMP;
        events.jumped = true;
        if (this.sprinting) {
          this.vx += -Math.sin(input.yaw) * 0.2;
          this.vz += -Math.cos(input.yaw) * 0.2;
        }
      }
      this.moveRelative(forward, strafe, accel, input.yaw);
      const wasGround = this.onGround;
      this.move(world, this.vx, this.vy, this.vz, this.sneaking && wasGround);
      this.vy = (this.vy - GRAVITY) * AIR_DRAG;
      this.vx *= slip;
      this.vz *= slip;
    }

    if (this.onGround) {
      if (this.fallDistance > 0) events.landedFrom = this.fallDistance;
      this.fallDistance = 0;
    }
    if (this.y < -64) {
      // Ins Leere gefallen: wird vom Spiel behandelt
    }
    return events;
  }

  private moveRelative(forward: number, strafe: number, accel: number, yaw: number): void {
    let f = forward * forward + strafe * strafe;
    if (f < 1e-4) return;
    f = Math.sqrt(f);
    if (f < 1) f = 1;
    f = accel / f;
    const fw = forward * f;
    const st = strafe * f;
    const sin = Math.sin(yaw);
    const cos = Math.cos(yaw);
    // vorwärts = (−sin, −cos), rechts = (cos, −sin)
    this.vx += -sin * fw + cos * st;
    this.vz += -cos * fw - sin * st;
  }

  private updateWater(world: World): void {
    const b = this.box();
    this.inWater = false;
    const minX = Math.floor(b.minX + 0.001);
    const maxX = Math.floor(b.maxX - 0.001);
    const minY = Math.floor(b.minY + 0.4);
    const maxY = Math.floor(b.maxY - 0.001);
    const minZ = Math.floor(b.minZ + 0.001);
    const maxZ = Math.floor(b.maxZ - 0.001);
    for (let y = minY; y <= maxY && !this.inWater; y++)
      for (let z = minZ; z <= maxZ && !this.inWater; z++)
        for (let x = minX; x <= maxX; x++) {
          if (getBlock(world.getBlock(x, y, z)).liquid) {
            this.inWater = true;
            break;
          }
        }
    const eyeY = this.y + this.eyeHeight;
    const eyeBlock = world.getBlock(Math.floor(this.x), Math.floor(eyeY), Math.floor(this.z));
    // Wasseroberfläche liegt 2/16 unter der Blockoberkante
    this.eyesInWater = getBlock(eyeBlock).liquid && eyeY - Math.floor(eyeY) < 0.875;
  }

  private solidBoxes(world: World, area: AABB): AABB[] {
    const out: AABB[] = [];
    const minX = Math.floor(area.minX);
    const maxX = Math.floor(area.maxX);
    const minY = Math.floor(area.minY);
    const maxY = Math.floor(area.maxY);
    const minZ = Math.floor(area.minZ);
    const maxZ = Math.floor(area.maxZ);
    for (let y = minY; y <= maxY; y++)
      for (let z = minZ; z <= maxZ; z++)
        for (let x = minX; x <= maxX; x++) {
          const id = world.getBlockOrUnloaded(x, y, z);
          if (id < 0 || IS_SOLID[id]) out.push(new AABB(x, y, z, x + 1, y + 1, z + 1));
        }
    return out;
  }

  private collides(world: World, box: AABB): boolean {
    for (const b of this.solidBoxes(world, box)) if (b.intersects(box)) return true;
    return false;
  }

  /** Bewegt mit Kollision (Y, dann X, dann Z). */
  private move(world: World, dx: number, dy: number, dz: number, edgeGuard: boolean): void {
    let box = this.box();

    if (edgeGuard) {
      // Beim Schleichen nicht über Kanten fallen
      const step = 0.05;
      const unsupported = (ox: number, oz: number): boolean => !this.collides(world, box.offset(ox, -STEP_CHECK, oz));
      while (dx !== 0 && unsupported(dx, 0)) {
        if (Math.abs(dx) < step) dx = 0;
        else dx -= Math.sign(dx) * step;
      }
      while (dz !== 0 && unsupported(0, dz)) {
        if (Math.abs(dz) < step) dz = 0;
        else dz -= Math.sign(dz) * step;
      }
      while (dx !== 0 && dz !== 0 && unsupported(dx, dz)) {
        if (Math.abs(dx) < step) dx = 0;
        else dx -= Math.sign(dx) * step;
        if (Math.abs(dz) < step) dz = 0;
        else dz -= Math.sign(dz) * step;
      }
    }

    const ox = dx;
    const oy = dy;
    const oz = dz;
    const boxes = this.solidBoxes(world, box.expandTowards(dx, dy, dz));

    for (const b of boxes) dy = box.clipY(b, dy);
    box = box.offset(0, dy, 0);
    for (const b of boxes) dx = box.clipX(b, dx);
    box = box.offset(dx, 0, 0);
    for (const b of boxes) dz = box.clipZ(b, dz);
    box = box.offset(0, 0, dz);

    this.x = (box.minX + box.maxX) / 2;
    this.y = box.minY;
    this.z = (box.minZ + box.maxZ) / 2;

    this.horizontalCollision = ox !== dx || oz !== dz;
    const verticalCollision = oy !== dy;
    this.onGround = verticalCollision && oy < 0;
    if (ox !== dx) this.vx = 0;
    if (oz !== dz) this.vz = 0;
    if (verticalCollision) this.vy = 0;
    if (!this.onGround && dy < 0) this.fallDistance -= dy;
  }
}
