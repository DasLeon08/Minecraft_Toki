/**
 * Prozedurale Pixel-Art für alle Block-Texturen (16×16 RGBA).
 * Vollständig eigene Motive und Farbpaletten – keine fremden Assets.
 * Wird im Client zur Laufzeit erzeugt und vom Galerie-Tool als PNG exportiert.
 */
import { TEXTURE_NAMES, TEXTURE_SIZE, type TextureName } from '../registry/textures';
import { hashString, Rng } from '../util/hash';

const S = TEXTURE_SIZE;

export type Pixels = Uint8ClampedArray;

type Painter = (c: Canvas, rng: Rng) => void;

class Canvas {
  readonly data: Pixels = new Uint8ClampedArray(S * S * 4);

  set(x: number, y: number, rgb: number, a = 255): void {
    x = ((x % S) + S) % S;
    y = ((y % S) + S) % S;
    const o = (y * S + x) * 4;
    this.data[o] = (rgb >> 16) & 255;
    this.data[o + 1] = (rgb >> 8) & 255;
    this.data[o + 2] = rgb & 255;
    this.data[o + 3] = a;
  }

  get(x: number, y: number): number {
    x = ((x % S) + S) % S;
    y = ((y % S) + S) % S;
    const o = (y * S + x) * 4;
    return (this.data[o] << 16) | (this.data[o + 1] << 8) | this.data[o + 2];
  }

  alpha(x: number, y: number): number {
    x = ((x % S) + S) % S;
    y = ((y % S) + S) % S;
    return this.data[(y * S + x) * 4 + 3];
  }

  fill(fn: (x: number, y: number) => number | null): void {
    for (let y = 0; y < S; y++)
      for (let x = 0; x < S; x++) {
        const c = fn(x, y);
        if (c !== null) this.set(x, y, c);
      }
  }
}

/** Grösse eines «Pixels» in Texeln (1 = fein, 2 = pixelig, 4 = sehr pixelig). */
let pixelSize = 2;

export const PIXEL_STYLES = [1, 2, 4] as const;
export type PixelStyle = (typeof PIXEL_STYLES)[number];

/** Stellt den Pixel-Stil ein (vor dem Erzeugen der Texturen aufrufen). */
export function setPixelStyle(size: PixelStyle): void {
  pixelSize = size;
}

export function getPixelStyle(): PixelStyle {
  return pixelSize as PixelStyle;
}

/**
 * Grobere Pixel: fasst je 2×2 Pixel zu einem zusammen (übernimmt Farbe und Alpha
 * des oberen linken Pixels). Ergibt den gewünschten, deutlich pixeligen Look.
 */
function chunky(c: Canvas, size = pixelSize): void {
  if (size <= 1) return;
  const d = c.data;
  for (let y = 0; y < S; y += size)
    for (let x = 0; x < S; x += size) {
      const o = (y * S + x) * 4;
      for (let dy = 0; dy < size; dy++)
        for (let dx = 0; dx < size; dx++) {
          const t = ((y + dy) * S + (x + dx)) * 4;
          d[t] = d[o];
          d[t + 1] = d[o + 1];
          d[t + 2] = d[o + 2];
          d[t + 3] = d[o + 3];
        }
    }
}

/** Hängt `chunky` an einen Maler an. */
const px2 = (p: Painter): Painter => (c, rng) => {
  p(c, rng);
  chunky(c);
};

/** Kachelbares Wertrauschen (Periode 16) mit Zellgrösse `cell`. */
function tileNoise(rng: Rng, cell: number): (x: number, y: number) => number {
  const n = S / cell;
  const grid = new Float32Array(n * n);
  for (let i = 0; i < grid.length; i++) grid[i] = rng.next();
  const g = (ix: number, iy: number): number => grid[(((iy % n) + n) % n) * n + (((ix % n) + n) % n)];
  return (x, y) => {
    const fx = x / cell;
    const fy = y / cell;
    const ix = Math.floor(fx);
    const iy = Math.floor(fy);
    const tx = fx - ix;
    const ty = fy - iy;
    const sx = tx * tx * (3 - 2 * tx);
    const sy = ty * ty * (3 - 2 * ty);
    const a = g(ix, iy) + (g(ix + 1, iy) - g(ix, iy)) * sx;
    const b = g(ix, iy + 1) + (g(ix + 1, iy + 1) - g(ix, iy + 1)) * sx;
    return a + (b - a) * sy;
  };
}

function ramp(colors: number[], t: number): number {
  const i = Math.max(0, Math.min(colors.length - 1, Math.floor(t * colors.length)));
  return colors[i];
}

function shade(rgb: number, f: number): number {
  const r = Math.max(0, Math.min(255, Math.round(((rgb >> 16) & 255) * f)));
  const g = Math.max(0, Math.min(255, Math.round(((rgb >> 8) & 255) * f)));
  const b = Math.max(0, Math.min(255, Math.round((rgb & 255) * f)));
  return (r << 16) | (g << 8) | b;
}

// ---------------------------------------------------------------------------
// Paletten (eigene, warme und leicht gesättigte Farbwelt)
// ---------------------------------------------------------------------------
const P = {
  stone: [0x5e5a68, 0x6b6776, 0x787482, 0x85818f, 0x938f9c],
  dirt: [0x6a4129, 0x784b2f, 0x855436, 0x925f3e, 0xa06b47],
  grass: [0x3d8530, 0x479337, 0x51a03e, 0x5cad45, 0x69ba4f],
  sand: [0xd6b971, 0xddc27e, 0xe3ca88, 0xe9d395, 0xefdca3],
  sandstone: [0xc9a865, 0xd2b170, 0xd9ba7b, 0xe1c387],
  bedrock: [0x26222b, 0x332e39, 0x403a47, 0x4e4856, 0x5f5867],
  oakBark: [0x4a3220, 0x573b26, 0x65462e, 0x735136],
  oakWood: [0x9b6e3f, 0xa77a48, 0xb38652, 0xbf935d],
  oakLeaf: [0x2c6b22, 0x357a29, 0x3f8a2e, 0x4b9935],
  birchBark: [0xdcd6c3, 0xe6e1d0, 0xefebdc, 0xf7f4e9],
  birchWood: [0xc7b47c, 0xd1bf89, 0xdbca96, 0xe4d4a2],
  birchLeaf: [0x5f9437, 0x6ca340, 0x7ab24a, 0x88bf55],
  water: [0x1f55b8, 0x2560c6, 0x2c6cd2, 0x3a7cdc],
  cactus: [0x2a6d2b, 0x317d32, 0x3a8d3a, 0x47a046],
  brick: [0x8f3f2f, 0x9c4734, 0xa8513b, 0xb35c44],
  snow: [0xdfe8f3, 0xe8eff8, 0xf0f5fc, 0xf8fbff],
  clay: [0x8f93a6, 0x9a9eb0, 0xa5a9ba, 0xb0b4c4],
};


function noiseFill(c: Canvas, rng: Rng, colors: number[], cell = 4, jitter = 0.35): void {
  const n = tileNoise(rng, cell);
  c.fill((x, y) => ramp(colors, Math.min(0.999, Math.max(0, n(x, y) * (1 - jitter) + rng.next() * jitter))));
}

const stone: Painter = (c, rng) => {
  stoneBase(c, rng);
  chunky(c);
};

function stoneBase(c: Canvas, rng: Rng): void {
  noiseFill(c, rng, P.stone, 8, 0.45);
  // Schichtlinien (leicht wellig)
  for (const base of [4, 11]) {
    const off = rng.int(0, 15);
    for (let x = 0; x < S; x++) {
      const y = base + Math.round(Math.sin((x + off) / 2.6) * 0.8);
      if (rng.next() < 0.8) c.set(x, y, shade(c.get(x, y), 0.82));
    }
  }
  // helle Einsprengsel
  for (let i = 0; i < 6; i++) c.set(rng.int(0, 15), rng.int(0, 15), P.stone[4]);
}

const dirt: Painter = (c, rng) => {
  noiseFill(c, rng, P.dirt, 4, 0.5);
  for (let i = 0; i < 7; i++) {
    const x = rng.int(0, 15);
    const y = rng.int(0, 15);
    c.set(x, y, 0xb08560);
    c.set(x + 1, y, shade(0xb08560, 0.85));
  }
  for (let i = 0; i < 5; i++) c.set(rng.int(0, 15), rng.int(0, 15), 0x55331f);
};

const grassTop: Painter = (c, rng) => {
  noiseFill(c, rng, P.grass, 4, 0.4);
  // kleine Halmstriche
  for (let i = 0; i < 22; i++) {
    const x = rng.int(0, 15);
    const y = rng.int(0, 15);
    c.set(x, y, P.grass[4]);
    c.set(x, y + 1, P.grass[3]);
  }
  for (let i = 0; i < 6; i++) c.set(rng.int(0, 15), rng.int(0, 15), 0x2f6b25);
};

const grassSide: Painter = (c, rng) => {
  dirt(c, rng);
  const n = tileNoise(rng, 4);
  for (let x = 0; x < S; x++) {
    const depth = 3 + Math.round(n(x, 0) * 2) + (rng.next() < 0.2 ? 1 : 0);
    for (let y = 0; y < depth; y++) c.set(x, y, ramp(P.grass, 0.25 + rng.next() * 0.7));
    c.set(x, depth, shade(P.grass[0], 0.8));
  }
};

const sand: Painter = (c, rng) => {
  noiseFill(c, rng, P.sand, 4, 0.55);
  // Wellenlinien
  for (let k = 0; k < 3; k++) {
    const y0 = rng.int(0, 15);
    for (let x = 0; x < S; x++) {
      const y = y0 + Math.round(Math.sin(x / 2.5 + k) * 1);
      if (rng.next() < 0.6) c.set(x, y, shade(c.get(x, y), 0.92));
    }
  }
};

const gravel: Painter = (c, rng) => {
  const cols = [0x6f6863, 0x7f7873, 0x8f8780, 0x9e968d, 0x5d5753, 0x8a7c6e];
  c.fill(() => cols[4]);
  for (let i = 0; i < 26; i++) {
    const cx = rng.int(0, 15);
    const cy = rng.int(0, 15);
    const col = cols[rng.int(0, cols.length - 1)];
    const r = rng.int(1, 2);
    for (let dy = -r; dy <= r; dy++)
      for (let dx = -r; dx <= r; dx++) {
        if (dx * dx + dy * dy > r * r + 0.5) continue;
        c.set(cx + dx, cy + dy, dy < 0 ? shade(col, 1.12) : col);
      }
  }
};

const sandstoneSide: Painter = (c, rng) => {
  noiseFill(c, rng, P.sandstone, 4, 0.3);
  for (let x = 0; x < S; x++) {
    c.set(x, 0, P.sandstone[3]);
    c.set(x, 5, shade(P.sandstone[0], 0.9));
    c.set(x, 6, P.sandstone[3]);
    c.set(x, 11, shade(P.sandstone[0], 0.9));
    c.set(x, 12, P.sandstone[3]);
    c.set(x, 15, shade(P.sandstone[0], 0.85));
  }
};

const sandstoneTop: Painter = (c, rng) => {
  noiseFill(c, rng, P.sandstone, 8, 0.2);
  for (let i = 0; i < S; i++) {
    c.set(i, 0, P.sandstone[0]);
    c.set(0, i, P.sandstone[0]);
    c.set(i, 15, P.sandstone[3]);
    c.set(15, i, P.sandstone[3]);
  }
};

const bedrock: Painter = (c, rng) => {
  noiseFill(c, rng, P.bedrock, 2, 0.6);
  for (let i = 0; i < 4; i++) {
    let x = rng.int(0, 15);
    let y = rng.int(0, 15);
    for (let s = 0; s < 6; s++) {
      c.set(x, y, 0x18151b);
      x += rng.int(-1, 1);
      y += 1;
    }
  }
};

const bark = (colors: number[], dark: number): Painter => (c, rng) => {
  for (let x = 0; x < S; x++) {
    const groove = x % 4 === 0 || (x % 4 === 2 && rng.next() < 0.3);
    for (let y = 0; y < S; y++) {
      const t = (groove ? 0.05 : 0.35 + rng.next() * 0.6) * 0.999;
      c.set(x, y, ramp(colors, t));
    }
  }
  for (let i = 0; i < 8; i++) {
    const x = rng.int(0, 15);
    const y = rng.int(0, 15);
    c.set(x, y, dark);
    c.set(x, y + 1, dark);
  }
};

const birchBark: Painter = (c, rng) => {
  noiseFill(c, rng, P.birchBark, 4, 0.3);
  for (let i = 0; i < 9; i++) {
    const x = rng.int(0, 15);
    const y = rng.int(0, 15);
    const len = rng.int(2, 5);
    for (let k = 0; k < len; k++) c.set(x + k, y, k === 0 || k === len - 1 ? 0x5a5348 : 0x2e2a25);
  }
};

const rings = (wood: number[], barkCol: number): Painter => (c) => {
  c.fill((x, y) => {
    const d = Math.max(Math.abs(x - 7.5), Math.abs(y - 7.5));
    if (d > 7) return barkCol;
    const band = Math.floor(d) % 3;
    return wood[band === 0 ? 3 : band === 1 ? 2 : 1];
  });
  c.set(7, 7, wood[0]);
  c.set(8, 8, wood[0]);
};

const leaves = (colors: number[]): Painter => (c, rng) => {
  const n = tileNoise(rng, 4);
  for (let y = 0; y < S; y++)
    for (let x = 0; x < S; x++) {
      const v = n(x, y) * 0.6 + rng.next() * 0.4;
      if (v < 0.18) {
        c.set(x, y, 0, 0);
        continue;
      }
      c.set(x, y, ramp(colors, Math.min(0.999, v)));
    }
  // Blattformen: helle Mitte, dunkler Rand unten
  for (let i = 0; i < 10; i++) {
    const x = rng.int(0, 15);
    const y = rng.int(0, 15);
    c.set(x, y, shade(colors[3], 1.12));
    c.set(x, y + 1, shade(colors[0], 0.85));
  }
};

const planks = (wood: number[]): Painter => (c, rng) => {
  for (let row = 0; row < 4; row++) {
    const seam = rng.int(3, 12);
    const tone = rng.next() * 0.25;
    for (let y = row * 4; y < row * 4 + 4; y++)
      for (let x = 0; x < S; x++) {
        let t = 0.35 + tone + (rng.next() < 0.15 ? 0.3 : 0);
        if (y === row * 4 + 3) t = 0;
        c.set(x, y, ramp(wood, Math.min(0.999, t)));
      }
    for (let y = row * 4; y < row * 4 + 3; y++) c.set(seam, y, shade(wood[0], 0.8));
    // Nägel
    c.set((seam + 2) % 16, row * 4 + 1, shade(wood[0], 0.6));
  }
};

const water: Painter = (c, rng) => {
  const n = tileNoise(rng, 8);
  for (let y = 0; y < S; y++)
    for (let x = 0; x < S; x++) {
      c.set(x, y, ramp(P.water, Math.min(0.999, n(x, y) * 0.8 + rng.next() * 0.2)), 175);
    }
  for (let k = 0; k < 5; k++) {
    const x0 = rng.int(0, 15);
    const y0 = rng.int(0, 15);
    for (let i = 0; i < 4; i++) c.set(x0 + i, y0 + (i === 1 || i === 2 ? -1 : 0), 0x78a8ee, 200);
  }
};

const ore = (gem: number[], kind: 'facet' | 'nugget'): Painter => (c, rng) => {
  stone(c, rng);
  if (pixelSize <= 1) {
    oreGems(c, rng, gem, kind, 2, 13, kind === 'facet' ? 4 : 5);
    return;
  }
  const g = new Canvas();
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) g.set(x, y, 0, 0);
  oreGems(g, rng, gem, kind, 5, 9, 3);
  // Erzbrocken in doppelter Pixelgrösse über den Stein legen
  for (let y = 0; y < S; y++)
    for (let x = 0; x < S; x++) {
      const sx = Math.floor(x / 2) + 4;
      const sy = Math.floor(y / 2) + 4;
      if (g.alpha(sx, sy) > 0) c.set(x, y, g.get(sx, sy));
    }
};

function oreGems(c: Canvas, rng: Rng, gem: number[], kind: 'facet' | 'nugget', lo: number, hi: number, clusters: number): void {
  for (let i = 0; i < clusters; i++) {
    const cx = rng.int(lo, hi);
    const cy = rng.int(lo, hi);
    if (kind === 'facet') {
      // kleine Rauten mit Glanzpunkt
      const pts: [number, number, number][] = [
        [0, -1, 2],
        [-1, 0, 1],
        [0, 0, 1],
        [1, 0, 0],
        [0, 1, 0],
      ];
      for (const [dx, dy, t] of pts) c.set(cx + dx, cy + dy, gem[t]);
      c.set(cx, cy - 1, gem[3]);
    } else {
      const pts: [number, number][] = [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
        [2, 1],
      ];
      for (const [dx, dy] of pts) c.set(cx + dx, cy + dy, gem[rng.int(0, 2)]);
      c.set(cx, cy, gem[3]);
      c.set(cx + 2, cy + 2, shade(gem[0], 0.7));
    }
  }
}

const cactusSide: Painter = (c, rng) => {
  for (let x = 0; x < S; x++) {
    const rib = x % 5 === 1;
    for (let y = 0; y < S; y++) c.set(x, y, ramp(P.cactus, rib ? 0.9 : 0.2 + rng.next() * 0.5));
  }
  for (let i = 0; i < 8; i++) {
    const x = rng.int(0, 3) * 5 + 1;
    c.set(x, rng.int(0, 15), 0xe9e2b0);
  }
  for (let y = 0; y < S; y++) {
    c.set(0, y, shade(P.cactus[0], 0.8));
    c.set(15, y, shade(P.cactus[0], 0.8));
  }
};

const cactusTop: Painter = (c, rng) => {
  c.fill((x, y) => {
    const d = Math.max(Math.abs(x - 7.5), Math.abs(y - 7.5));
    if (d > 6.5) return shade(P.cactus[0], 0.8);
    return ramp(P.cactus, d > 4 ? 0.8 : 0.3 + rng.next() * 0.3);
  });
  c.set(7, 7, 0xe9e2b0);
  c.set(8, 8, 0xe9e2b0);
};

const glass: Painter = (c) => {
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) c.set(x, y, 0xffffff, 0);
  for (let i = 0; i < S; i++) {
    c.set(i, 0, 0xd8eef5);
    c.set(i, 15, 0xa9cbd6);
    c.set(0, i, 0xd8eef5);
    c.set(15, i, 0xa9cbd6);
  }
  // Ecknieten und Glanz
  for (const [x, y] of [
    [1, 1],
    [14, 1],
    [1, 14],
    [14, 14],
  ])
    c.set(x, y, 0xf4fbff);
  for (let i = 3; i < 8; i++) c.set(i, 11 - i, 0xeaf6fa, 140);
  for (let i = 9; i < 12; i++) c.set(i, 20 - i, 0xeaf6fa, 110);
};

const cobble: Painter = (c, rng) => {
  const pts: [number, number, number][] = [];
  for (let i = 0; i < 9; i++) pts.push([rng.next() * 16, rng.next() * 16, rng.next()]);
  for (let y = 0; y < S; y++)
    for (let x = 0; x < S; x++) {
      let d1 = 1e9;
      let d2 = 1e9;
      let tone = 0;
      for (const [px, py, t] of pts)
        for (let oy = -16; oy <= 16; oy += 16)
          for (let ox = -16; ox <= 16; ox += 16) {
            const d = Math.hypot(x + 0.5 - (px + ox), y + 0.5 - (py + oy));
            if (d < d1) {
              d2 = d1;
              d1 = d;
              tone = t;
            } else if (d < d2) d2 = d;
          }
      if (d2 - d1 < 1.1) c.set(x, y, 0x44404b);
      else c.set(x, y, ramp(P.stone, Math.min(0.999, 0.2 + tone * 0.6 + (d1 < 2 ? 0.15 : 0) + rng.next() * 0.1)));
    }
};

const bricks: Painter = (c, rng) => {
  const mortar = 0xb9b2a8;
  for (let y = 0; y < S; y++) {
    const row = Math.floor(y / 4);
    const off = row % 2 === 0 ? 0 : 4;
    for (let x = 0; x < S; x++) {
      if (y % 4 === 3 || (x + off) % 8 === 7) {
        c.set(x, y, mortar);
        continue;
      }
      const brickId = Math.floor((x + off) / 8) + row * 3;
      const base = P.brick[(brickId * 7) % P.brick.length];
      c.set(x, y, shade(base, 0.92 + rng.next() * 0.14));
    }
  }
};

const cross = (draw: (c: Canvas, rng: Rng) => void): Painter => (c, rng) => {
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) c.set(x, y, 0, 0);
  draw(c, rng);
};

const tallGrass = cross((c, rng) => {
  for (let b = 0; b < 7; b++) {
    let x = 2 + b * 2 + rng.int(-1, 0);
    const h = rng.int(6, 13);
    for (let i = 0; i < h; i++) {
      c.set(x, 15 - i, ramp(P.grass, Math.min(0.999, 0.2 + (i / h) * 0.75)));
      if (i > h / 2 && rng.next() < 0.3) x += rng.next() < 0.5 ? -1 : 1;
    }
  }
});

const flower = (petal: number, center: number, cup: boolean): Painter =>
  cross((c) => {
    for (let y = 8; y < 16; y++) c.set(7, y, 0x3e8a30);
    c.set(6, 12, 0x4c9a38);
    c.set(5, 11, 0x4c9a38);
    c.set(8, 13, 0x4c9a38);
    c.set(9, 12, 0x4c9a38);
    if (cup) {
      for (const [x, y] of [
        [5, 4], [9, 4], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [6, 6], [7, 6], [8, 6], [6, 7], [7, 7], [8, 7],
      ])
        c.set(x, y, petal);
      c.set(7, 4, center);
      c.set(6, 4, shade(petal, 1.1));
      c.set(8, 4, shade(petal, 1.1));
    } else {
      for (const [x, y] of [
        [6, 3], [7, 3], [8, 3], [5, 4], [6, 4], [8, 4], [9, 4], [5, 5], [9, 5], [5, 6], [6, 6], [8, 6], [9, 6], [6, 7], [7, 7], [8, 7],
      ])
        c.set(x, y, petal);
      c.set(7, 4, shade(petal, 0.8));
      c.set(6, 5, center);
      c.set(7, 5, center);
      c.set(8, 5, center);
      c.set(7, 6, center);
    }
  });

const dryShrub = cross((c, rng) => {
  const col = 0x8a6a3e;
  const stems: [number, number][] = [
    [7, 15], [7, 14], [7, 13], [6, 12], [5, 11], [4, 10], [3, 8], [8, 12], [9, 11], [10, 10], [11, 9], [12, 7], [7, 11], [7, 10], [8, 9], [8, 8], [7, 7], [6, 6], [9, 7], [10, 6],
  ];
  for (const [x, y] of stems) c.set(x, y, rng.next() < 0.3 ? shade(col, 0.8) : col);
});

const lightCrystal: Painter = (c, rng) => {
  c.fill((x, y) => {
    const d = Math.abs(x - 7.5) + Math.abs(y - 7.5);
    if (d < 3) return 0xfffbe6;
    if (d < 6) return 0xffe9a3;
    if (d < 9) return 0xf5cf6b;
    return 0xd9a94a;
  });
  for (let i = 0; i < 10; i++) c.set(rng.int(0, 15), rng.int(0, 15), 0xfff6cf);
  for (let i = 0; i < S; i++) {
    c.set(i, 0, 0xb3843a);
    c.set(0, i, 0xb3843a);
    c.set(i, 15, 0x8f6930);
    c.set(15, i, 0x8f6930);
  }
};

const snow: Painter = (c, rng) => {
  noiseFill(c, rng, P.snow, 4, 0.3);
  for (let i = 0; i < 6; i++) c.set(rng.int(0, 15), rng.int(0, 15), 0xcfdbea);
};

const snowSide: Painter = (c, rng) => {
  dirt(c, rng);
  const n = tileNoise(rng, 4);
  for (let x = 0; x < S; x++) {
    const depth = 3 + Math.round(n(x, 0) * 2);
    for (let y = 0; y < depth; y++) c.set(x, y, ramp(P.snow, 0.3 + rng.next() * 0.69));
    c.set(x, depth, 0xc3cfdf);
  }
};

const clay: Painter = (c, rng) => {
  noiseFill(c, rng, P.clay, 8, 0.25);
  for (let x = 0; x < S; x++) if (rng.next() < 0.7) c.set(x, 7 + Math.round(Math.sin(x / 3)), shade(P.clay[0], 0.95));
};

const cracks = (stage: number): Painter => (c, rng) => {
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) c.set(x, y, 0, 0);
  const lines = 2 + stage * 2;
  for (let i = 0; i < lines; i++) {
    let x = 8 + rng.int(-2, 2);
    let y = 8 + rng.int(-2, 2);
    const len = 3 + stage * 2;
    for (let k = 0; k < len; k++) {
      c.set(x, y, 0x1a1a1a, 200);
      x += rng.int(-1, 1);
      y += rng.int(-1, 1);
    }
  }
};


// ---------------------------------------------------------------------------
// Phase 2: Sprites aus ASCII-Masken ('.' = transparent)
// ---------------------------------------------------------------------------

function sprite(rows: string[], palette: Record<string, number>, background?: Painter): Painter {
  return (c, rng) => {
    if (background) background(c, rng);
    else for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) c.set(x, y, 0, 0);
    for (let y = 0; y < S; y++) {
      const row = rows[y] ?? '';
      for (let x = 0; x < S; x++) {
        const ch = row[x] ?? '.';
        if (ch === '.') continue;
        const col = palette[ch];
        if (col !== undefined) c.set(x, y, col);
      }
    }
  };
}

const HANDLE = { h: 0x8a6038, H: 0x4f351f };
const TIER_PAL: Record<string, { d: number; m: number; l: number }> = {
  holz: { d: 0x5e4024, m: 0x9b6e3f, l: 0xc99c66 },
  stein: { d: 0x4b4852, m: 0x7a7685, l: 0xa6a2b0 },
  eisen: { d: 0x7f838d, m: 0xc3c7cf, l: 0xf2f4f7 },
  lumit: { d: 0x4e2780, m: 0x9558d4, l: 0xdcb8ff },
};

const TOOL_MASKS: Record<string, string[]> = {
  spitzhacke: [
    '................',
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
    '.......hH.......',
    '.......HH.......',
  ],
  schaufel: [
    '................',
    '......dmmd......',
    '.....dmllmd.....',
    '.....dmllmd.....',
    '.....dmmmmd.....',
    '......dmmd......',
    '.......hH.......',
    '.......Hh.......',
    '.......hH.......',
    '.......Hh.......',
    '.......hH.......',
    '.......Hh.......',
    '.......hH.......',
    '......dHHd......',
    '.......dd.......',
  ],
  axt: [
    '................',
    '........dmmd....',
    '.......hdmlmd...',
    '.......Hdmllmd..',
    '.......hdmllmd..',
    '.......Hdmlmd...',
    '.......hHdmd....',
    '.......Hh.......',
    '.......hH.......',
    '.......Hh.......',
    '.......hH.......',
    '.......Hh.......',
    '.......hH.......',
    '.......Hh.......',
    '.......HH.......',
  ],
  schwert: [
    '................',
    '.......dd.......',
    '......dlmd......',
    '......dlmd......',
    '......dlmd......',
    '......dlmd......',
    '......dlmd......',
    '......dlmd......',
    '......dlmd......',
    '....dddmmddd....',
    '....dmmmmmmd....',
    '.......Hh.......',
    '.......hH.......',
    '.......Hh.......',
    '......dmmd......',
  ],
};

const ARMOR_MASKS: Record<string, string[]> = {
  helm: ['', '', '', '....dddddddd....', '...dmmllllmmd...', '...dmlmmmmlmd...', '...dmd....dmd...', '...dmd....dmd...', '...ddd....ddd...'],
  brustpanzer: [
    '',
    '...ddd....ddd...',
    '..dmmd....dmmd..',
    '..dmlmddddmlmd..',
    '..dmllmmmmllmd..',
    '...dmlmmmmlmd...',
    '...dmmmmmmmmd...',
    '...dmmlmmlmmd...',
    '...dmmmmmmmmd...',
    '...dmmmmmmmmd...',
    '...dmmmmmmmmd...',
    '...dddddddddd...',
  ],
  beinschutz: [
    '',
    '...dddddddddd...',
    '...dmmllllmmd...',
    '...dmmmmmmmmd...',
    '...dmmmddmmmd...',
    '...dmmd..dmmd...',
    '...dmld..dlmd...',
    '...dmmd..dmmd...',
    '...dmmd..dmmd...',
    '...dmld..dlmd...',
    '...dmmd..dmmd...',
    '...dddd..dddd...',
  ],
  stiefel: ['', '', '', '', '', '', '...ddd....ddd...', '...dmd....dmd...', '...dld....dld...', '..dmmd....dmmd..', '.dmmmd....dmmmd.', '.ddddd....ddddd.'],
};

const tool = (tier: string, type: string): Painter => sprite(TOOL_MASKS[type], { ...TIER_PAL[tier], ...HANDLE });
const armor = (tier: string, part: string): Painter => sprite(ARMOR_MASKS[part], TIER_PAL[tier]);

const stick = sprite(
  [
    '',
    '.............Hh.',
    '............hH..',
    '...........Hh...',
    '..........hH....',
    '.........Hh.....',
    '........hH......',
    '.......Hh.......',
    '......hH........',
    '.....Hh.........',
    '....hH..........',
    '...Hh...........',
    '..hH............',
  ],
  HANDLE,
);

const coal = sprite(
  ['', '', '', '.....dddd.......', '...ddmmmmdd.....', '..dmmlmmmmmd....', '..dmllmmmdmmd...', '.dmmlmmmmmmmd...', '.dmmmmmdmmmmd...', '.dmmmmmmmmmd....', '..ddmmmmmdd.....', '....ddddd.......'],
  { d: 0x121014, m: 0x2b2830, l: 0x57525f },
);

const ingot = sprite(
  ['', '', '', '', '', '.....dddddddd...', '....dllllllmd...', '...dlmmmmmmmd...', '..dlmmmmmmmd....', '..dmmmmmmmdd....', '..dddddddd......'],
  TIER_PAL.eisen,
);

const lumitGem = sprite(
  ['', '', '.......dd.......', '......dlld......', '.....dllmmd.....', '....dllmmmmd....', '...dllmmmmmmd...', '...dlmmmmmmdd...', '....dmmmmmdd....', '.....dmmmdd.....', '......dmdd......', '.......dd.......'],
  TIER_PAL.lumit,
);

const apple = sprite(
  [
    '',
    '',
    '.......H........',
    '.......Hgg......',
    '....rrrHrrr.....',
    '...rlrrrrrrr....',
    '..rllrrrrrrrr...',
    '..rlrrrrrrrrr...',
    '..rrrrrrrrrrr...',
    '..rrrrrrrrrrd...',
    '...rrrrrrrrd....',
    '....rrdrrdd.....',
  ],
  { r: 0xc8342c, l: 0xf08a6a, d: 0x86211c, H: 0x4f351f, g: 0x4c9a38 },
);

const berries = sprite(
  ['', '', '', '......gg........', '.....g..g.......', '....bb...bb.....', '...blbb.blbb....', '...bbbb.bbbb....', '....bb...bb.....', '.......bb.......', '......blbb......', '......bbbb......', '.......bb.......'],
  { b: 0x2a3f9a, l: 0x8aa0f0, g: 0x3e8a30 },
);

const torch = sprite(
  ['', '', '', '', '', '', '.......fy.......', '.......yY.......', '.......YO.......', '.......hH.......', '.......Hh.......', '.......hH.......', '.......Hh.......', '.......hH.......', '.......Hh.......', '.......hH.......'],
  { f: 0xfff6c8, y: 0xffd450, Y: 0xffb22e, O: 0xe0701e, ...HANDLE },
);

const berryBush = (c: Canvas, rng: Rng): void => {
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) c.set(x, y, 0, 0);
  for (let y = 3; y < 16; y++)
    for (let x = 1; x < 15; x++) {
      const d = Math.hypot((x - 7.5) / 7, (y - 10) / 7);
      if (d < 1 && rng.next() > 0.12) c.set(x, y, ramp([0x24552a, 0x2f6b30, 0x3b7f38, 0x4a9142], Math.min(0.999, rng.next() * (1.1 - d))));
    }
  for (let i = 0; i < 9; i++) {
    const x = rng.int(3, 12);
    const y = rng.int(5, 13);
    c.set(x, y, 0x2a3f9a);
    c.set(x, y - 1, 0x8aa0f0);
  }
};

const craftingTop: Painter = (c, rng) => {
  planks(P.oakWood)(c, rng);
  for (let i = 0; i < S; i++) {
    c.set(i, 0, 0x4f351f);
    c.set(0, i, 0x4f351f);
    c.set(i, 15, 0x4f351f);
    c.set(15, i, 0x4f351f);
  }
  for (const k of [5, 10]) for (let i = 2; i < 14; i++) {
    c.set(k, i, shade(P.oakWood[0], 0.7));
    c.set(i, k, shade(P.oakWood[0], 0.7));
  }
};

const craftingSide: Painter = (c, rng) => {
  planks(P.oakWood)(c, rng);
  for (let x = 0; x < S; x++) for (let y = 0; y < 3; y++) c.set(x, y, y === 2 ? 0x4f351f : 0x7a5530);
  // Werkzeugbrett: kleiner Hammer und Säge
  const hammer = ['.ddd.', '.ddd.', '..h..', '..h..', '..h..'];
  hammer.forEach((row, y) => [...row].forEach((ch, x) => ch !== '.' && c.set(3 + x, 6 + y, ch === 'd' ? 0x8f939c : 0x5e4024)));
  for (let x = 9; x < 14; x++) c.set(x, 7, 0xc3c7cf);
  for (let x = 9; x < 14; x += 2) c.set(x, 8, 0xc3c7cf);
  c.set(13, 6, 0x5e4024);
  c.set(13, 7, 0x5e4024);
};

const furnaceSide: Painter = (c, rng) => {
  for (let y = 0; y < S; y++) {
    const row = Math.floor(y / 4);
    const off = row % 2 ? 4 : 0;
    for (let x = 0; x < S; x++) {
      if (y % 4 === 3 || (x + off) % 8 === 7) c.set(x, y, 0x45414c);
      else c.set(x, y, ramp(P.stone, 0.3 + rng.next() * 0.5));
    }
  }
};

const furnaceFront = (lit: boolean): Painter => (c, rng) => {
  furnaceSide(c, rng);
  for (let y = 7; y < 14; y++)
    for (let x = 4; x < 12; x++) {
      const arch = y === 7 && (x === 4 || x === 11);
      if (arch) continue;
      if (!lit) c.set(x, y, y > 11 ? 0x2a2630 : 0x17151a);
      else {
        const t = (y - 7) / 7 + rng.next() * 0.25;
        c.set(x, y, t > 0.8 ? 0xffe08a : t > 0.55 ? 0xffa83c : t > 0.3 ? 0xd8581e : 0x5a1e10);
      }
    }
  for (let x = 3; x < 13; x++) c.set(x, 14, 0x2e2b33);
};

const furnaceTop: Painter = (c, rng) => {
  noiseFill(c, rng, P.stone, 8, 0.25);
  for (let i = 0; i < S; i++) {
    c.set(i, 0, 0x45414c);
    c.set(0, i, 0x45414c);
    c.set(i, 15, 0x45414c);
    c.set(15, i, 0x45414c);
  }
  for (let y = 6; y < 10; y++) for (let x = 6; x < 10; x++) c.set(x, y, 0x1c1a20);
};

const chestTop: Painter = (c, rng) => {
  planks(P.oakWood)(c, rng);
  for (let i = 0; i < S; i++) {
    c.set(i, 0, 0x4f351f);
    c.set(0, i, 0x4f351f);
    c.set(i, 15, 0x4f351f);
    c.set(15, i, 0x4f351f);
    c.set(i, 7, 0x8f939c);
    c.set(i, 8, 0x6c707a);
  }
};

const chestSide: Painter = (c, rng) => {
  chestTop(c, rng);
  for (let y = 5; y < 10; y++) for (let x = 6; x < 10; x++) c.set(x, y, y === 5 || y === 9 || x === 6 || x === 9 ? 0x6c707a : 0xc3c7cf);
  c.set(7, 7, 0x2b2830);
  c.set(8, 7, 0x2b2830);
};

const P2 = {
  spruceBark: [0x3a281a, 0x46301f, 0x523925, 0x5e422b],
  spruceWood: [0x5d4128, 0x684a2e, 0x735335, 0x7f5d3c],
  spruceLeaf: [0x1f4429, 0x26502f, 0x2d5c36, 0x356a3e],
  swampLeaf: [0x3c5622, 0x466428, 0x50712e, 0x5c7f36],
};

const PAINTERS: Record<TextureName, Painter> = {
  stein: stone,
  erde: px2(dirt),
  gras_oben: px2(grassTop),
  gras_seite: px2(grassSide),
  sand: px2(sand),
  kies: px2(gravel),
  sandstein_seite: sandstoneSide,
  sandstein_oben: px2(sandstoneTop),
  urgestein: px2(bedrock),
  eiche_rinde: px2(bark(P.oakBark, 0x33231a)),
  eiche_kern: rings(P.oakWood, P.oakBark[1]),
  eiche_laub: px2(leaves(P.oakLeaf)),
  eiche_bretter: planks(P.oakWood),
  birke_rinde: px2(birchBark),
  birke_kern: rings(P.birchWood, P.birchBark[1]),
  birke_laub: px2(leaves(P.birchLeaf)),
  birke_bretter: planks(P.birchWood),
  wasser: px2(water),
  kohleerz: ore([0x1c1a20, 0x2b2830, 0x3a3640, 0x6d6878], 'facet'),
  eisenerz: ore([0xb36f45, 0xc98756, 0xd9a06f, 0xf0c89a], 'nugget'),
  kaktus_seite: cactusSide,
  kaktus_oben: cactusTop,
  glas: glass,
  bruchstein: px2(cobble),
  ziegel: bricks,
  grasbueschel: tallGrass,
  sonnenkelch: flower(0xf2c53d, 0xb8701e, true),
  glutmohn: flower(0xd8432f, 0x2a1b16, false),
  duerrstrauch: dryShrub,
  leuchtkristall: px2(lightCrystal),
  schnee: px2(snow),
  schnee_seite: px2(snowSide),
  lehm: px2(clay),
  risse_0: cracks(0),
  risse_1: cracks(1),
  risse_2: cracks(2),
  risse_3: cracks(3),
  werktisch_oben: craftingTop,
  werktisch_seite: craftingSide,
  schmelze_seite: furnaceSide,
  schmelze_front: furnaceFront(false),
  schmelze_front_an: furnaceFront(true),
  schmelze_oben: px2(furnaceTop),
  truhe_oben: chestTop,
  truhe_seite: chestSide,
  fackel: torch,
  lumiterz: ore([0x4e2780, 0x7a44b8, 0xa572e6, 0xe6ccff], 'facet'),
  beerenstrauch: px2(berryBush),
  fichte_rinde: px2(bark(P2.spruceBark, 0x24180f)),
  fichte_kern: rings(P2.spruceWood, P2.spruceBark[1]),
  fichte_nadeln: px2(leaves(P2.spruceLeaf)),
  fichte_bretter: planks(P2.spruceWood),
  sumpf_laub: px2(leaves(P2.swampLeaf)),
  stock: stick,
  kohle: coal,
  eisenbarren: ingot,
  lumit: lumitGem,
  apfel: apple,
  waldbeeren: berries,
  holz_spitzhacke: tool('holz', 'spitzhacke'),
  holz_schaufel: tool('holz', 'schaufel'),
  holz_axt: tool('holz', 'axt'),
  holz_schwert: tool('holz', 'schwert'),
  stein_spitzhacke: tool('stein', 'spitzhacke'),
  stein_schaufel: tool('stein', 'schaufel'),
  stein_axt: tool('stein', 'axt'),
  stein_schwert: tool('stein', 'schwert'),
  eisen_spitzhacke: tool('eisen', 'spitzhacke'),
  eisen_schaufel: tool('eisen', 'schaufel'),
  eisen_axt: tool('eisen', 'axt'),
  eisen_schwert: tool('eisen', 'schwert'),
  lumit_spitzhacke: tool('lumit', 'spitzhacke'),
  lumit_schaufel: tool('lumit', 'schaufel'),
  lumit_axt: tool('lumit', 'axt'),
  lumit_schwert: tool('lumit', 'schwert'),
  eisen_helm: armor('eisen', 'helm'),
  eisen_brustpanzer: armor('eisen', 'brustpanzer'),
  eisen_beinschutz: armor('eisen', 'beinschutz'),
  eisen_stiefel: armor('eisen', 'stiefel'),
  lumit_helm: armor('lumit', 'helm'),
  lumit_brustpanzer: armor('lumit', 'brustpanzer'),
  lumit_beinschutz: armor('lumit', 'beinschutz'),
  lumit_stiefel: armor('lumit', 'stiefel'),
};

/** Erzeugt die Pixel einer Textur (deterministisch). */
export function paintTexture(name: TextureName): Pixels {
  const c = new Canvas();
  PAINTERS[name](c, new Rng(hashString(`tex:${name}`)));
  return c.data;
}

/** Erzeugt alle Texturen als ein Array (Layer hintereinander) für das Texture Array. */
export function paintAllTextures(): Uint8Array {
  const out = new Uint8Array(S * S * 4 * TEXTURE_NAMES.length);
  TEXTURE_NAMES.forEach((name, i) => out.set(paintTexture(name), i * S * S * 4));
  return out;
}
