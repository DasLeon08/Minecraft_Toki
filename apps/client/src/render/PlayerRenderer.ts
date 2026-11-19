import * as THREE from 'three';
import type { RemotePlayer, World } from '@blockcraft/shared';
import { layoutPixelText, GLYPH_HEIGHT } from '../ui/pixelFont';

interface Sample {
  t: number;
  p: RemotePlayer;
}

interface Figure {
  group: THREE.Group;
  head: THREE.Mesh;
  legL: THREE.Mesh;
  legR: THREE.Mesh;
  armL: THREE.Mesh;
  armR: THREE.Mesh;
  mats: THREE.MeshBasicMaterial[];
  tag: THREE.Sprite;
  samples: Sample[];
  walk: number;
}

const INTERP_DELAY = 110; // ms Puffer für flüssige Bewegung

function shade(color: number, f: number): THREE.Color {
  return new THREE.Color(color).multiplyScalar(f);
}

/** Namensschild in der eigenen Pixel-Schrift. */
function nameTag(name: string): THREE.Sprite {
  const { runs, width } = layoutPixelText(name);
  const px = 4;
  const pad = 3;
  const c = document.createElement('canvas');
  c.width = (width + pad * 2) * px;
  c.height = (GLYPH_HEIGHT + pad * 2) * px;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = 'rgba(10,15,24,0.72)';
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = '#ffffff';
  for (const r of runs) ctx.fillRect((r.x + pad) * px, (r.y + pad) * px, r.w * px, px);
  const tex = new THREE.CanvasTexture(c);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.colorSpace = THREE.NoColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: true, fog: false }));
  sprite.scale.set((c.width / c.height) * 0.32, 0.32, 1);
  sprite.position.y = 2.15;
  return sprite;
}

/** Andere Spieler als eigene, blockige Figuren mit Namensschild. */
export class PlayerRenderer {
  readonly group = new THREE.Group();
  private readonly figures = new Map<number, Figure>();
  private readonly geo = new THREE.BoxGeometry(1, 1, 1);

  constructor(private readonly ownId: () => number | null) {}

  private create(p: RemotePlayer): Figure {
    const body = new THREE.MeshBasicMaterial({ color: shade(p.color, 1) });
    const dark = new THREE.MeshBasicMaterial({ color: shade(p.color, 0.62) });
    const skin = new THREE.MeshBasicMaterial({ color: new THREE.Color(0xe7c09a) });
    const legs = new THREE.MeshBasicMaterial({ color: new THREE.Color(0x2d3550) });
    const g = new THREE.Group();
    const box = (mat: THREE.Material, w: number, h: number, d: number, y: number, pivot = false): THREE.Mesh => {
      const m = new THREE.Mesh(this.geo, mat);
      m.scale.set(w, h, d);
      if (pivot) {
        // Drehpunkt an der Oberkante (für Arme/Beine)
        m.geometry = this.geo.clone().translate(0, -0.5, 0);
      }
      m.position.y = y;
      return m;
    };
    const head = box(skin, 0.5, 0.5, 0.5, 1.55);
    const visor = box(dark, 0.52, 0.12, 0.3, 1.6);
    visor.position.z = -0.12;
    const torso = box(body, 0.5, 0.7, 0.28, 0.95);
    const armL = box(dark, 0.2, 0.7, 0.24, 1.3, true);
    armL.position.x = -0.36;
    const armR = box(dark, 0.2, 0.7, 0.24, 1.3, true);
    armR.position.x = 0.36;
    const legL = box(legs, 0.23, 0.62, 0.26, 0.62, true);
    legL.position.x = -0.125;
    const legR = box(legs, 0.23, 0.62, 0.26, 0.62, true);
    legR.position.x = 0.125;
    const tag = nameTag(p.name);
    g.add(head, visor, torso, armL, armR, legL, legR, tag);
    this.group.add(g);
    return { group: g, head, legL, legR, armL, armR, mats: [body, dark, skin, legs], tag, samples: [], walk: 0 };
  }

  sync(list: RemotePlayer[]): void {
    const now = performance.now();
    const own = this.ownId();
    const seen = new Set<number>();
    for (const p of list) {
      if (p.id === own) continue;
      seen.add(p.id);
      let f = this.figures.get(p.id);
      if (!f) {
        f = this.create(p);
        this.figures.set(p.id, f);
      }
      f.samples.push({ t: now, p });
      if (f.samples.length > 20) f.samples.shift();
    }
    for (const [id, f] of this.figures) if (!seen.has(id)) this.remove(id, f);
  }

  private remove(id: number, f: Figure): void {
    this.group.remove(f.group);
    for (const m of f.mats) m.dispose();
    (f.tag.material as THREE.SpriteMaterial).map?.dispose();
    f.tag.material.dispose();
    this.figures.delete(id);
  }

  update(world: World, daylight: number): void {
    const t = performance.now() - INTERP_DELAY;
    for (const f of this.figures.values()) {
      const s = f.samples;
      if (s.length === 0) continue;
      let a = s[0];
      let b = s[s.length - 1];
      for (let i = 0; i < s.length - 1; i++) {
        if (s[i].t <= t && s[i + 1].t >= t) {
          a = s[i];
          b = s[i + 1];
          break;
        }
      }
      const k = b.t === a.t ? 1 : Math.max(0, Math.min(1, (t - a.t) / (b.t - a.t)));
      const x = a.p.x + (b.p.x - a.p.x) * k;
      const y = a.p.y + (b.p.y - a.p.y) * k;
      const z = a.p.z + (b.p.z - a.p.z) * k;
      const speed = Math.hypot(b.p.x - a.p.x, b.p.z - a.p.z) / Math.max(1, (b.t - a.t) / 1000);
      const prev = f.group.position.clone();
      f.group.position.set(x, y, z);
      // Blickrichtung: Körper folgt dem Yaw, Kopf zusätzlich dem Pitch
      let dy = b.p.yaw - a.p.yaw;
      if (dy > Math.PI) dy -= Math.PI * 2;
      if (dy < -Math.PI) dy += Math.PI * 2;
      f.group.rotation.y = a.p.yaw + dy * k;
      f.head.rotation.x = b.p.pitch;
      const moved = prev.distanceTo(f.group.position);
      f.walk += moved * 4;
      const swing = Math.min(1, speed / 4) * Math.sin(f.walk) * 0.7;
      f.legL.rotation.x = swing;
      f.legR.rotation.x = -swing;
      f.armL.rotation.x = -swing;
      f.armR.rotation.x = swing;
      // Helligkeit nach Licht an der Position
      const l = world.getLight(Math.floor(x), Math.floor(y + 1.2), Math.floor(z));
      const lv = Math.max(((l >> 4) / 15) * daylight, (l & 15) / 15);
      const bright = 0.18 + 0.82 * Math.pow(lv, 1.2);
      f.group.children.forEach((c) => {
        if (c instanceof THREE.Mesh) {
          const m = c.material as THREE.MeshBasicMaterial;
          if (!m.userData.base) m.userData.base = m.color.clone();
          m.color.copy(m.userData.base as THREE.Color).multiplyScalar(bright);
        }
      });
    }
  }

  get count(): number {
    return this.figures.size;
  }

  dispose(): void {
    for (const [id, f] of [...this.figures]) this.remove(id, f);
    this.geo.dispose();
  }
}
