/** Ein fallengelassenes Item in der Welt (Schwerkraft, Kollision, Aufsammeln). */
import { IS_SOLID, isWater } from '../registry/blocks';
import { AABB } from '../physics/aabb';
import type { World } from '../world/World';
import type { ItemStack } from '../sim/inventory';

export const ITEM_HALF = 0.125;
export const ITEM_DESPAWN_TICKS = 6000;

export interface ItemEntitySnapshot {
  id: number;
  item: ItemStack;
  x: number;
  y: number;
  z: number;
  age: number;
}

export class ItemEntity {
  vx = 0;
  vy = 0;
  vz = 0;
  age = 0;
  /** Ticks, bevor das Item aufgesammelt werden kann. */
  pickupDelay = 10;
  onGround = false;

  constructor(
    readonly id: number,
    public item: ItemStack,
    public x: number,
    public y: number,
    public z: number,
  ) {}

  /** Ein Physik-Tick. Gibt zurück, ob sich die Position geändert hat. */
  tick(world: World): boolean {
    this.age++;
    if (this.pickupDelay > 0) this.pickupDelay--;
    const ox = this.x;
    const oy = this.y;
    const oz = this.z;
    const inWater = isWater(world.getBlock(Math.floor(this.x), Math.floor(this.y + 0.1), Math.floor(this.z)));
    if (inWater) {
      this.vy = this.vy * 0.8 + 0.01;
      this.vx *= 0.9;
      this.vz *= 0.9;
    } else this.vy -= 0.04;
    this.move(world);
    const slip = this.onGround ? 0.6 * 0.98 : 0.98;
    this.vx *= slip;
    this.vz *= slip;
    this.vy *= 0.98;
    return this.x !== ox || this.y !== oy || this.z !== oz;
  }

  private move(world: World): void {
    let box = new AABB(this.x - ITEM_HALF, this.y, this.z - ITEM_HALF, this.x + ITEM_HALF, this.y + ITEM_HALF * 2, this.z + ITEM_HALF);
    let dx = this.vx;
    let dy = this.vy;
    let dz = this.vz;
    const area = box.expandTowards(dx, dy, dz);
    const boxes: AABB[] = [];
    for (let y = Math.floor(area.minY); y <= Math.floor(area.maxY); y++)
      for (let z = Math.floor(area.minZ); z <= Math.floor(area.maxZ); z++)
        for (let x = Math.floor(area.minX); x <= Math.floor(area.maxX); x++) {
          const id = world.getBlockOrUnloaded(x, y, z);
          if (id < 0 || IS_SOLID[id]) boxes.push(new AABB(x, y, z, x + 1, y + 1, z + 1));
        }
    // Steckt das Item in einem Block, nach oben schieben
    if (boxes.some((b) => b.intersects(box))) {
      this.y = Math.floor(this.y) + 1;
      this.vy = 0;
      return;
    }
    const oy = dy;
    for (const b of boxes) dy = box.clipY(b, dy);
    box = box.offset(0, dy, 0);
    for (const b of boxes) dx = box.clipX(b, dx);
    box = box.offset(dx, 0, 0);
    for (const b of boxes) dz = box.clipZ(b, dz);
    box = box.offset(0, 0, dz);
    this.onGround = oy < 0 && dy !== oy;
    if (dy !== oy) this.vy = 0;
    if (dx !== this.vx) this.vx = 0;
    if (dz !== this.vz) this.vz = 0;
    this.x = (box.minX + box.maxX) / 2;
    this.y = box.minY;
    this.z = (box.minZ + box.maxZ) / 2;
  }

  snapshot(): ItemEntitySnapshot {
    return { id: this.id, item: { ...this.item }, x: this.x, y: this.y, z: this.z, age: this.age };
  }
}
