import * as THREE from 'three';
import type { ItemEntitySnapshot, World } from '@blockcraft/shared';
import { itemIconCanvas } from '../ui/icons';

/** Stellt herumliegende Items als schwebende, leicht wippende Sprites dar. */
export class ItemRenderer {
  readonly group = new THREE.Group();
  private readonly sprites = new Map<number, { sprite: THREE.Sprite; itemId: number; snap: ItemEntitySnapshot }>();
  private readonly textures = new Map<number, THREE.CanvasTexture>();

  private texture(id: number): THREE.CanvasTexture {
    let t = this.textures.get(id);
    if (!t) {
      t = new THREE.CanvasTexture(itemIconCanvas(id));
      t.magFilter = THREE.NearestFilter;
      t.minFilter = THREE.NearestFilter;
      t.colorSpace = THREE.NoColorSpace;
      this.textures.set(id, t);
    }
    return t;
  }

  /** Neue Liste aus der Simulation übernehmen. */
  sync(list: ItemEntitySnapshot[]): void {
    const seen = new Set<number>();
    for (const snap of list) {
      seen.add(snap.id);
      let e = this.sprites.get(snap.id);
      if (!e || e.itemId !== snap.item.id) {
        if (e) this.removeSprite(snap.id);
        const mat = new THREE.SpriteMaterial({ map: this.texture(snap.item.id), alphaTest: 0.5, fog: false });
        const sprite = new THREE.Sprite(mat);
        sprite.scale.setScalar(0.38);
        this.group.add(sprite);
        e = { sprite, itemId: snap.item.id, snap };
        this.sprites.set(snap.id, e);
      }
      e.snap = snap;
    }
    for (const id of [...this.sprites.keys()]) if (!seen.has(id)) this.removeSprite(id);
  }

  private removeSprite(id: number): void {
    const e = this.sprites.get(id);
    if (!e) return;
    this.group.remove(e.sprite);
    e.sprite.material.dispose();
    this.sprites.delete(id);
  }

  /** Pro Frame: Wippen und Helligkeit nach Licht. */
  update(seconds: number, world: World, daylight: number): void {
    for (const { sprite, snap } of this.sprites.values()) {
      const bob = Math.sin(seconds * 2.5 + snap.id) * 0.06;
      sprite.position.set(snap.x, snap.y + 0.22 + bob, snap.z);
      const l = world.getLight(Math.floor(snap.x), Math.floor(snap.y + 0.2), Math.floor(snap.z));
      const lv = Math.max(((l >> 4) / 15) * daylight, (l & 15) / 15);
      sprite.material.color.setScalar(0.12 + 0.88 * Math.pow(lv, 1.3));
    }
  }

  get count(): number {
    return this.sprites.size;
  }

  clearTextures(): void {
    for (const t of this.textures.values()) t.dispose();
    this.textures.clear();
    for (const e of this.sprites.values()) {
      e.sprite.material.map = this.texture(e.itemId);
      e.sprite.material.needsUpdate = true;
    }
  }

  dispose(): void {
    for (const id of [...this.sprites.keys()]) this.removeSprite(id);
    for (const t of this.textures.values()) t.dispose();
  }
}
