/**
 * Flache Pixel-Art für Titelbild und Banner (Stil der Toki-Beispielbilder):
 * gedithterter Abendhimmel, Sonne, Berge, Wiese mit Baum, Grasblock, Spitzhacke
 * und der Schriftzug in der eigenen Pixel-Schrift. Gezeichnet in niedriger
 * Auflösung und verlustfrei (Nearest-Neighbor) hochskaliert.
 * Aufruf: pnpm promo:pixel → docs/toki/
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { layoutPixelText } from '../../../apps/client/src/ui/pixelFont';
import { encodePng } from './png';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', 'docs', 'toki');
mkdirSync(OUT, { recursive: true });

type RGB = [number, number, number];
const hex = (h: number): RGB => [(h >> 16) & 255, (h >> 8) & 255, h & 255];

class Img {
  readonly px: Uint8Array;
  constructor(
    readonly w: number,
    readonly h: number,
  ) {
    this.px = new Uint8Array(w * h * 4);
  }
  set(x: number, y: number, c: RGB): void {
    x = Math.floor(x);
    y = Math.floor(y);
    if (x < 0 || y < 0 || x >= this.w || y >= this.h) return;
    const o = (y * this.w + x) * 4;
    this.px[o] = c[0];
    this.px[o + 1] = c[1];
    this.px[o + 2] = c[2];
    this.px[o + 3] = 255;
  }
  rect(x: number, y: number, w: number, h: number, c: RGB): void {
    for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < w; xx++) this.set(x + xx, y + yy, c);
  }
  /** Konvexes Polygon füllen. */
  poly(pts: [number, number][], color: (x: number, y: number) => RGB): void {
    const xs = pts.map((p) => p[0]);
    const ys = pts.map((p) => p[1]);
    for (let y = Math.floor(Math.min(...ys)); y <= Math.max(...ys); y++)
      for (let x = Math.floor(Math.min(...xs)); x <= Math.max(...xs); x++) {
        const cx = x + 0.5;
        const cy = y + 0.5;
        let inside = true;
        let sign = 0;
        for (let i = 0; i < pts.length; i++) {
          const [ax, ay] = pts[i];
          const [bx, by] = pts[(i + 1) % pts.length];
          const cross = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
          if (cross === 0) continue;
          const s = Math.sign(cross);
          if (sign === 0) sign = s;
          else if (s !== sign) {
            inside = false;
            break;
          }
        }
        if (inside) this.set(x, y, color(x, y));
      }
  }
  /** Hochskalieren ohne Weichzeichnen. */
  scaled(k: number): { w: number; h: number; data: Uint8Array } {
    const W = this.w * k;
    const H = this.h * k;
    const data = new Uint8Array(W * H * 4);
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++) {
        const s = ((Math.floor(y / k) * this.w + Math.floor(x / k)) * 4);
        const d = (y * W + x) * 4;
        data[d] = this.px[s];
        data[d + 1] = this.px[s + 1];
        data[d + 2] = this.px[s + 2];
        data[d + 3] = 255;
      }
    return { w: W, h: H, data };
  }
}

function rnd(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const SKY: RGB[] = [0x1d2550, 0x2c3a74, 0x3f5498, 0x5f72b8, 0x9a86b8, 0xe39a78, 0xf6c27c].map(hex);

/** Himmel mit harten Bändern und Schachbrett-Dithering an den Übergängen. */
function sky(img: Img, horizon: number, r: () => number): void {
  const band = horizon / SKY.length;
  for (let y = 0; y < horizon; y++) {
    const f = y / band;
    const i = Math.min(SKY.length - 1, Math.floor(f));
    const frac = f - i;
    for (let x = 0; x < img.w; x++) {
      let c = SKY[i];
      if (frac > 0.7 && i < SKY.length - 1 && (x + y) % 2 === 0) c = SKY[i + 1];
      img.set(x, y, c);
    }
  }
  // Sterne im oberen Drittel
  for (let n = 0; n < img.w * 0.25; n++) {
    const x = Math.floor(r() * img.w);
    const y = Math.floor(r() * horizon * 0.4);
    img.set(x, y, r() < 0.3 ? hex(0xfff6cf) : hex(0xb9c4ff));
  }
}

function sun(img: Img, cx: number, cy: number, rad: number): void {
  for (let y = -rad - 3; y <= rad + 3; y++)
    for (let x = -rad - 3; x <= rad + 3; x++) {
      const d = Math.hypot(x, y);
      if (d <= rad) img.set(cx + x, cy + y, d < rad * 0.6 ? hex(0xfff1b8) : hex(0xffd36a));
      else if (d <= rad + 2 && (x + y) % 2 === 0) img.set(cx + x, cy + y, hex(0xf7b066));
    }
}

/** Gestufte Bergkette (Treppen statt Diagonalen). */
function mountains(img: Img, base: number, peaks: [number, number][], body: RGB, light: RGB, snow: RGB | null): void {
  for (let x = 0; x < img.w; x++) {
    let top = base;
    for (const [px, ph] of peaks) {
      const d = Math.abs(x - px);
      const h = ph - Math.floor(d / 2) * 2;
      top = Math.min(top, base - h);
    }
    for (let y = top; y < base; y++) {
      const isSnow = snow && y < top + 4 && base - top > 24;
      const lit = x % 7 < 3 && y - top < 10;
      img.set(x, y, isSnow ? snow : lit ? light : body);
    }
  }
}

function ground(img: Img, top: number, r: () => number): void {
  for (let x = 0; x < img.w; x++) {
    const bump = (x >> 3) % 3 === 0 ? 1 : 0;
    for (let y = top - bump; y < img.h; y++) {
      const d = y - (top - bump);
      let c: RGB;
      if (d < 3) c = d === 0 ? hex(0x7ccf55) : hex(0x5cad45);
      else if (d < 4) c = hex(0x3f8a2e);
      else c = (x + y) % 5 === 0 || r() < 0.06 ? hex(0x6a4129) : hex(0x855436);
      img.set(x, y, c);
    }
  }
}

function tree(img: Img, x: number, groundY: number): void {
  img.rect(x - 1, groundY - 16, 3, 16, hex(0x6b4a2b));
  img.rect(x, groundY - 16, 1, 16, hex(0x4f351f));
  const blob = (cx: number, cy: number, rr: number): void => {
    for (let y = -rr; y <= rr; y++)
      for (let xx = -rr; xx <= rr; xx++) {
        const d = Math.hypot(xx, y);
        if (d > rr) continue;
        const c = y < -rr / 3 && (xx + y) % 2 === 0 ? hex(0x5cad45) : d > rr - 1.2 ? hex(0x2c6b22) : hex(0x3f8a2e);
        img.set(cx + xx, cy + y, c);
      }
  };
  blob(x, groundY - 20, 7);
  blob(x - 5, groundY - 16, 5);
  blob(x + 5, groundY - 16, 5);
}

/** Isometrischer Grasblock (Kantenlänge w). */
function grassBlock(img: Img, cx: number, cy: number, w: number, seed: number): void {
  const r = rnd(seed);
  const noise = new Map<string, number>();
  const n = (x: number, y: number): number => {
    const k = `${x >> 1},${y >> 1}`;
    if (!noise.has(k)) noise.set(k, r());
    return noise.get(k)!;
  };
  const h = w;
  const T: [number, number] = [cx, cy];
  const R: [number, number] = [cx + w, cy + w / 2];
  const B: [number, number] = [cx, cy + w];
  const L: [number, number] = [cx - w, cy + w / 2];
  img.poly([T, R, B, L], (x, y) => (n(x, y) < 0.3 ? hex(0x7ccf55) : n(x, y) > 0.85 ? hex(0x479337) : hex(0x5cad45)));
  img.poly([L, B, [B[0], B[1] + h], [L[0], L[1] + h]], (x, y) => {
    const depth = y - (L[1] + ((x - L[0]) * (B[1] - L[1])) / (B[0] - L[0]));
    if (depth < 4) return depth < 1 ? hex(0x5cad45) : hex(0x479337);
    return n(x, y) < 0.25 ? hex(0x6a4129) : hex(0x855436);
  });
  img.poly([B, R, [R[0], R[1] + h], [B[0], B[1] + h]], (x, y) => {
    const depth = y - (B[1] + ((x - B[0]) * (R[1] - B[1])) / (R[0] - B[0]));
    if (depth < 4) return depth < 1 ? hex(0x479337) : hex(0x3d8530);
    return n(x, y) < 0.25 ? hex(0x55331f) : hex(0x6a4129);
  });
}

// Spitzhacke aus dem Spiel (gleiche Maske wie die Item-Textur), Eisen-Palette
const PICK = [
  '....dmmmmmmd....',
  '...dmllllllmd...',
  '..dmm..hH..mmd..',
  '..dm...Hh...md..',
  '..d....hH....d..',
  '.......Hh.......',
  '.......hH.......',
  '.......Hh.......',
  '.......hH.......',
  '.......Hh.......',
  '.......hH.......',
  '.......Hh.......',
  '.......HH.......',
];
const PICK_PAL: Record<string, RGB> = { d: hex(0x7f838d), m: hex(0xc3c7cf), l: hex(0xf2f4f7), h: hex(0x8a6038), H: hex(0x4f351f) };

function sprite(img: Img, rows: string[], pal: Record<string, RGB>, x0: number, y0: number, k: number): void {
  rows.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      if (ch === '.') return;
      img.rect(x0 + x * k, y0 + y * k, k, k, pal[ch]);
    }),
  );
}

/** Text in der eigenen Pixel-Schrift mit gestuftem Pixel-Schatten nach unten. */
function text(img: Img, s: string, x0: number, y0: number, k: number, color: RGB, shadow: RGB[], gloss = true): number {
  const { runs, width } = layoutPixelText(s);
  const step = Math.max(1, Math.round(k / 2));
  for (let i = shadow.length - 1; i >= 0; i--)
    for (const r of runs) img.rect(x0 + r.x * k, y0 + r.y * k + (i + 1) * step, r.w * k, k, shadow[i]);
  for (const r of runs) img.rect(x0 + r.x * k, y0 + r.y * k, r.w * k, k, color);
  if (gloss && k > 1) for (const r of runs) if (r.y === 0) img.rect(x0 + r.x * k, y0, r.w * k, Math.max(1, Math.floor(k / 3)), hex(0xffe6a8));
  return width * k;
}

const textWidth = (s: string, k: number): number => layoutPixelText(s).width * k;

function scene(img: Img, horizon: number, seed: number, sunX: number, ms = 1): void {
  const r = rnd(seed);
  sky(img, horizon, r);
  sun(img, sunX, horizon - 14, 12);
  mountains(img, horizon, [
    [Math.floor(img.w * 0.18), Math.round(44 * ms)],
    [Math.floor(img.w * 0.5), Math.round(34 * ms)],
    [Math.floor(img.w * 0.86), Math.round(40 * ms)],
  ], hex(0x4b4f86), hex(0x5a5f9a), hex(0xd8dcf0));
  mountains(img, horizon, [
    [Math.floor(img.w * 0.32), Math.round(22 * ms)],
    [Math.floor(img.w * 0.7), Math.round(26 * ms)],
  ], hex(0x2f5e4a), hex(0x3b7258), null);
  ground(img, horizon, r);
}

function save(img: Img, k: number, name: string): void {
  const { w, h, data } = img.scaled(k);
  writeFileSync(join(OUT, name), encodePng(w, h, data));
  console.log(`  ✓ ${name} (${w}×${h})`);
}

const GOLD = hex(0xf2b544);
const SHADOW = [hex(0xa8731a), hex(0x4f3510)];
const WHITE = hex(0xeef2f7);

// Titelbild 4:3 – 200×150 → ×6 = 1200×900
{
  const img = new Img(200, 150);
  const horizon = 112;
  scene(img, horizon, 7, 152);
  tree(img, 22, horizon);
  tree(img, 178, horizon);
  grassBlock(img, 92, 76, 18, 3);
  sprite(img, PICK, PICK_PAL, 118, 80, 2);
  const title = 'BLOCKCRAFT';
  const tw = textWidth(title, 3);
  text(img, title, Math.floor((200 - tw) / 2), 14, 3, GOLD, SHADOW);
  const tag = 'BAUEN · GRABEN · ÜBERLEBEN';
  const gw = textWidth(tag, 1);
  text(img, tag, Math.floor((200 - gw) / 2), 44, 1, WHITE, [hex(0x1d2550)], false);
  save(img, 6, 'titelbild.png');
}

// Quadratisch – 128×128 → ×8 = 1024×1024
{
  const img = new Img(128, 128);
  const horizon = 96;
  scene(img, horizon, 11, 100);
  tree(img, 16, horizon);
  grassBlock(img, 58, 58, 16, 5);
  sprite(img, PICK, PICK_PAL, 82, 62, 2);
  const title = 'BLOCKCRAFT';
  const tw = textWidth(title, 2);
  text(img, title, Math.floor((128 - tw) / 2), 12, 2, GOLD, SHADOW);
  const tag = 'BAUEN · GRABEN';
  text(img, tag, Math.floor((128 - textWidth(tag, 1)) / 2), 34, 1, WHITE, [hex(0x1d2550)], false);
  save(img, 8, 'titelbild-quadrat.png');
}

// Banner 2:1 – 320×160 → ×5 = 1600×800
{
  const img = new Img(320, 160);
  const horizon = 122;
  scene(img, horizon, 23, 286, 0.9);
  tree(img, 222, horizon);
  tree(img, 314, horizon);
  grassBlock(img, 262, 70, 20, 9);
  sprite(img, PICK, PICK_PAL, 280, 78, 2);
  const outline = [hex(0x1d2550)];
  text(img, 'BLOCKCRAFT', 14, 18, 3, GOLD, SHADOW);
  text(img, 'BAUEN · GRABEN · ÜBERLEBEN', 16, 50, 1, WHITE, outline, false);
  // Pixel-Button «Jetzt im Browser spielen»
  const label = 'JETZT IM BROWSER SPIELEN';
  const bw = textWidth(label, 1) + 12;
  const bx = 14;
  const by = 66;
  img.rect(bx - 1, by - 1, bw + 2, 15, hex(0x0b1220));
  img.rect(bx, by, bw, 13, GOLD);
  img.rect(bx, by, bw, 1, hex(0xffd884));
  img.rect(bx, by + 11, bw, 2, hex(0xa8731a));
  text(img, label, bx + 6, by + 3, 1, hex(0x2a1c05), [], false);
  save(img, 5, 'banner.png');
}
