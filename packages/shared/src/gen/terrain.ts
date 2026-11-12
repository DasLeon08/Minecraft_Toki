/**
 * Prozedurale Weltgenerierung. Alle Funktionen sind rein und deterministisch:
 * gleicher Seed + gleiche Koordinaten → gleiche Blöcke (Client wie Server).
 */
import { CHUNK_SIZE, COLUMN_VOLUME, SEA_LEVEL, WORLD_HEIGHT } from '../constants';
import {
  AIR,
  BEDROCK,
  BIRCH_LEAVES,
  BIRCH_LOG,
  BERRY_BUSH,
  CACTUS,
  CLAY,
  COAL_ORE,
  DIRT,
  DRY_SHRUB,
  EMBER_POPPY,
  GRASS,
  GRAVEL,
  IRON_ORE,
  LUMIT_ORE,
  OAK_LEAVES,
  OAK_LOG,
  SAND,
  SANDSTONE,
  SNOW,
  SNOWY_GRASS,
  SPRUCE_LEAVES,
  SPRUCE_LOG,
  STONE,
  SUNCUP,
  SWAMP_LEAVES,
  TALL_GRASS,
  WATER,
} from '../registry/blocks';
import { hashInts, Rng } from '../util/hash';
import { Biome } from './biomes';
import { SimplexNoise } from './noise';

export interface ColumnSample {
  height: number;
  biome: Biome;
  continentalness: number;
}

const idx = (x: number, y: number, z: number): number => (y << 8) | (z << 4) | x;

/** Pflanzen, die von Bäumen überschrieben werden dürfen. */
const SOFT = new Set([TALL_GRASS, SUNCUP, EMBER_POPPY, DRY_SHRUB, BERRY_BUSH]);

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
function clamp01(t: number): number {
  return t < 0 ? 0 : t > 1 ? 1 : t;
}
function smoothstep(e0: number, e1: number, x: number): number {
  const t = clamp01((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
}

/** Stützpunkte: Kontinentalität → Grundhöhe. */
const HEIGHT_SPLINE: [number, number][] = [
  [-1.0, 30],
  [-0.45, 40],
  [-0.28, 54],
  [-0.18, 61],
  [-0.12, 64],
  [0.05, 68],
  [0.3, 76],
  [0.6, 86],
  [1.0, 96],
];

function spline(points: [number, number][], x: number): number {
  if (x <= points[0][0]) return points[0][1];
  for (let i = 1; i < points.length; i++) {
    const [x1, y1] = points[i];
    if (x <= x1) {
      const [x0, y0] = points[i - 1];
      return lerp(y0, y1, (x - x0) / (x1 - x0));
    }
  }
  return points[points.length - 1][1];
}

export class TerrainGenerator {
  private readonly continental: SimplexNoise;
  private readonly erosion: SimplexNoise;
  private readonly detail: SimplexNoise;
  private readonly ridge: SimplexNoise;
  private readonly temperature: SimplexNoise;
  private readonly humidity: SimplexNoise;
  private readonly cheese: SimplexNoise;
  private readonly spaghettiA: SimplexNoise;
  private readonly spaghettiB: SimplexNoise;

  constructor(readonly seed: number) {
    this.continental = new SimplexNoise(hashInts(seed, 1));
    this.erosion = new SimplexNoise(hashInts(seed, 2));
    this.detail = new SimplexNoise(hashInts(seed, 3));
    this.ridge = new SimplexNoise(hashInts(seed, 4));
    this.temperature = new SimplexNoise(hashInts(seed, 5));
    this.humidity = new SimplexNoise(hashInts(seed, 6));
    this.cheese = new SimplexNoise(hashInts(seed, 7));
    this.spaghettiA = new SimplexNoise(hashInts(seed, 8));
    this.spaghettiB = new SimplexNoise(hashInts(seed, 9));
  }

  /** Höhe und Biom an einer Weltposition (rein, ohne Höhlen). */
  sample(x: number, z: number): ColumnSample {
    const c = this.continental.fbm2(x / 720, z / 720, 4);
    const e = this.erosion.fbm2(x / 380, z / 380, 3);
    const d = this.detail.fbm2(x / 96, z / 96, 4);
    const base = spline(HEIGHT_SPLINE, c * 1.6);
    const r = 1 - Math.abs(this.ridge.fbm2(x / 260, z / 260, 3));
    const mountain = smoothstep(0.05, 0.4, c) * smoothstep(0.15, -0.35, e) * r * r * 78;
    const hills = d * (3 + 9 * smoothstep(-0.1, 0.5, c));
    let raw = base + hills + mountain;

    const t = this.temperature.fbm2(x / 900, z / 900, 3);
    const h = this.humidity.fbm2(x / 700, z / 700, 3);

    // Sumpf: feucht, gemässigt und tief gelegen → Gelände wird flach um den Meeresspiegel gezogen
    const swampness = smoothstep(0.3, 0.42, h) * smoothstep(-0.2, -0.08, t) * smoothstep(0.32, 0.2, t) * smoothstep(SEA_LEVEL + 16, SEA_LEVEL + 6, raw);
    if (swampness > 0) raw = lerp(raw, SEA_LEVEL - 0.4 + d * 2.2, swampness);
    const height = Math.max(4, Math.min(WORLD_HEIGHT - 20, Math.floor(raw)));

    let biome: Biome;
    if (swampness > 0.5 && height >= SEA_LEVEL - 3) biome = Biome.Swamp;
    else if (height < SEA_LEVEL - 1) biome = Biome.Ocean;
    else if (height <= SEA_LEVEL + 2 && c * 1.6 < -0.1) biome = Biome.Beach;
    else if (height > 104) biome = Biome.Mountains;
    else if (t > 0.22 && h < 0.08) biome = Biome.Desert;
    else if (t < -0.38) biome = Biome.Snowfields;
    else if (t < -0.16 && h > -0.15) biome = Biome.Taiga;
    else if (h > 0.08) biome = Biome.Forest;
    else biome = Biome.Plains;

    return { height, biome, continentalness: c };
  }

  /** Erzeugt die Blöcke einer kompletten Spalte als zusammenhängendes Array. */
  generateColumn(cx: number, cz: number): Uint16Array {
    const out = new Uint16Array(COLUMN_VOLUME);
    const heights = new Int16Array(256);
    const biomes = new Uint8Array(256);
    const x0 = cx * CHUNK_SIZE;
    const z0 = cz * CHUNK_SIZE;
    let maxHeight = 0;

    // 1) Grundgelände + Oberfläche
    for (let z = 0; z < 16; z++) {
      for (let x = 0; x < 16; x++) {
        const s = this.sample(x0 + x, z0 + z);
        const i2 = (z << 4) | x;
        heights[i2] = s.height;
        biomes[i2] = s.biome;
        if (s.height > maxHeight) maxHeight = s.height;
        this.fillColumn(out, x, z, s.height, s.biome, x0 + x, z0 + z);
      }
    }

    // 2) Höhlen
    this.carveCaves(out, cx, cz, heights, biomes, maxHeight);

    // 3) Erze und Taschen
    this.placeOres(out, cx, cz);

    // 4) Wasser bis zum Meeresspiegel
    for (let z = 0; z < 16; z++) {
      for (let x = 0; x < 16; x++) {
        const hgt = heights[(z << 4) | x];
        for (let y = hgt + 1; y <= SEA_LEVEL; y++) {
          const i = idx(x, y, z);
          if (out[i] === AIR) out[i] = WATER;
        }
      }
    }

    // 5) Pflanzen
    this.placePlants(out, cx, cz, heights, biomes);

    // 6) Bäume/Kakteen (auch aus Nachbarspalten, nur eigene Blöcke werden geschrieben)
    for (let nz = cz - 1; nz <= cz + 1; nz++) {
      for (let nx = cx - 1; nx <= cx + 1; nx++) {
        this.placeTrees(out, cx, cz, nx, nz);
      }
    }

    return out;
  }

  private fillColumn(out: Uint16Array, x: number, z: number, height: number, biome: Biome, wx: number, wz: number): void {
    const local = hashInts(this.seed, wx, wz, 101);
    // Urgestein am Boden
    out[idx(x, 0, z)] = BEDROCK;
    for (let y = 1; y <= 3; y++) {
      if (((local >>> (y * 3)) & 7) < 4 - y) out[idx(x, y, z)] = BEDROCK;
      else out[idx(x, y, z)] = STONE;
    }
    const underwater = height < SEA_LEVEL;
    let top: number;
    let filler: number;
    let fillerDepth = 3 + (local & 1);
    let deep = STONE;
    let deepDepth = 0;
    switch (biome) {
      case Biome.Ocean:
        top = height > 48 ? SAND : (local & 3) === 0 ? CLAY : GRAVEL;
        filler = top === CLAY ? CLAY : top;
        fillerDepth = 2;
        break;
      case Biome.Beach:
        top = SAND;
        filler = SAND;
        deep = SANDSTONE;
        deepDepth = 2;
        break;
      case Biome.Desert:
        top = SAND;
        filler = SAND;
        fillerDepth = 4;
        deep = SANDSTONE;
        deepDepth = 4;
        break;
      case Biome.Mountains:
        top = height > 120 ? SNOW : STONE;
        filler = STONE;
        fillerDepth = 1;
        break;
      case Biome.Snowfields:
        top = underwater ? GRAVEL : SNOWY_GRASS;
        filler = DIRT;
        break;
      case Biome.Swamp:
        top = underwater ? ((local & 3) === 0 ? CLAY : DIRT) : GRASS;
        filler = DIRT;
        break;
      default:
        top = underwater ? (height < SEA_LEVEL - 3 ? GRAVEL : SAND) : GRASS;
        filler = underwater ? top : DIRT;
        break;
    }
    for (let y = 4; y <= height; y++) {
      const depth = height - y;
      let id: number;
      if (depth === 0) id = top;
      else if (depth <= fillerDepth) id = filler;
      else if (depth <= fillerDepth + deepDepth) id = deep;
      else id = STONE;
      out[idx(x, y, z)] = id;
    }
  }

  private carveCaves(
    out: Uint16Array,
    cx: number,
    cz: number,
    heights: Int16Array,
    biomes: Uint8Array,
    maxHeight: number,
  ): void {
    const STEP = 4;
    const NX = 16 / STEP + 1;
    const NY = Math.min(WORLD_HEIGHT, maxHeight + 8) / STEP + 1;
    const ny = Math.ceil(NY);
    const grid = new Float32Array(NX * NX * ny * 2);
    const x0 = cx * 16;
    const z0 = cz * 16;
    for (let gy = 0; gy < ny; gy++) {
      for (let gz = 0; gz < NX; gz++) {
        for (let gx = 0; gx < NX; gx++) {
          const wx = x0 + gx * STEP;
          const wy = gy * STEP;
          const wz = z0 + gz * STEP;
          const g = ((gy * NX + gz) * NX + gx) * 2;
          grid[g] = this.cheese.noise3(wx / 52, wy / 30, wz / 52);
          const a = this.spaghettiA.noise3(wx / 70, wy / 44, wz / 70);
          const b = this.spaghettiB.noise3(wx / 70, wy / 44, wz / 70);
          grid[g + 1] = a * a + b * b;
        }
      }
    }
    const sampleGrid = (x: number, y: number, z: number, ch: number): number => {
      const fx = x / STEP;
      const fy = y / STEP;
      const fz = z / STEP;
      const ix = Math.min(NX - 2, Math.floor(fx));
      const iy = Math.min(ny - 2, Math.floor(fy));
      const iz = Math.min(NX - 2, Math.floor(fz));
      const tx = fx - ix;
      const ty = fy - iy;
      const tz = fz - iz;
      const at = (gx: number, gy: number, gz: number): number => grid[((gy * NX + gz) * NX + gx) * 2 + ch];
      const c00 = lerp(at(ix, iy, iz), at(ix + 1, iy, iz), tx);
      const c10 = lerp(at(ix, iy + 1, iz), at(ix + 1, iy + 1, iz), tx);
      const c01 = lerp(at(ix, iy, iz + 1), at(ix + 1, iy, iz + 1), tx);
      const c11 = lerp(at(ix, iy + 1, iz + 1), at(ix + 1, iy + 1, iz + 1), tx);
      return lerp(lerp(c00, c10, ty), lerp(c01, c11, ty), tz);
    };

    for (let z = 0; z < 16; z++) {
      for (let x = 0; x < 16; x++) {
        const i2 = (z << 4) | x;
        const h = heights[i2];
        const biome = biomes[i2] as Biome;
        const nearWater = biome === Biome.Ocean || biome === Biome.Beach || h < SEA_LEVEL + 4;
        const spaghettiTop = nearWater ? h - 6 : h;
        const cheeseTop = h - 10;
        for (let y = 5; y <= spaghettiTop; y++) {
          const i = idx(x, y, z);
          const id = out[i];
          if (id === AIR || id === BEDROCK || id === WATER) continue;
          let carve = false;
          if (y <= cheeseTop) {
            // Käsehöhlen werden in der Tiefe grösser.
            const threshold = 0.6 - smoothstep(50, 10, y) * 0.12;
            if (sampleGrid(x, y, z, 0) > threshold) carve = true;
          }
          if (!carve && sampleGrid(x, y, z, 1) < 0.0035) carve = true;
          if (carve) {
            out[i] = AIR;
            // Gras unter neuer Öffnung bleibt Gras; Erde über Höhle bleibt.
          }
        }
        // Freigelegte Erde direkt unter Oberfläche, deren Gras weggefressen wurde, bleibt Erde.
      }
    }
  }

  private placeOres(out: Uint16Array, cx: number, cz: number): void {
    const veins: [id: number, count: number, minY: number, maxY: number, minSize: number, maxSize: number, salt: number][] = [
      [COAL_ORE, 18, 5, 128, 5, 12, 201],
      [IRON_ORE, 11, 5, 64, 4, 8, 202],
      [LUMIT_ORE, 2, 5, 16, 2, 5, 205],
      [GRAVEL, 6, 5, 100, 10, 22, 203],
      [DIRT, 6, 5, 100, 10, 22, 204],
    ];
    for (const [id, count, minY, maxY, minSize, maxSize, salt] of veins) {
      const rng = new Rng(hashInts(this.seed, cx, cz, salt));
      for (let v = 0; v < count; v++) {
        let x = rng.next() * 16;
        let y = minY + rng.next() * (maxY - minY);
        let z = rng.next() * 16;
        const size = rng.int(minSize, maxSize);
        for (let s = 0; s < size; s++) {
          const bx = Math.floor(x);
          const by = Math.floor(y);
          const bz = Math.floor(z);
          if (bx >= 0 && bx < 16 && bz >= 0 && bz < 16 && by > 0 && by < WORLD_HEIGHT) {
            const i = idx(bx, by, bz);
            if (out[i] === STONE) out[i] = id;
          }
          x += rng.next() * 2 - 1;
          y += rng.next() * 1.4 - 0.7;
          z += rng.next() * 2 - 1;
        }
      }
    }
  }

  private placePlants(out: Uint16Array, cx: number, cz: number, heights: Int16Array, biomes: Uint8Array): void {
    for (let z = 0; z < 16; z++) {
      for (let x = 0; x < 16; x++) {
        const i2 = (z << 4) | x;
        const h = heights[i2];
        if (h + 1 >= WORLD_HEIGHT) continue;
        const ground = out[idx(x, h, z)];
        const above = idx(x, h + 1, z);
        if (out[above] !== AIR) continue;
        const r = hashInts(this.seed, cx * 16 + x, cz * 16 + z, 301) / 4294967296;
        const biome = biomes[i2] as Biome;
        if (ground === GRASS) {
          const grassChance = biome === Biome.Plains ? 0.14 : biome === Biome.Swamp ? 0.1 : 0.07;
          if ((biome === Biome.Forest || biome === Biome.Taiga) && r > 0.994) out[above] = BERRY_BUSH;
          else if (r < grassChance) out[above] = TALL_GRASS;
          else if (r < grassChance + 0.012) out[above] = SUNCUP;
          else if (r < grassChance + 0.022) out[above] = EMBER_POPPY;
        } else if (ground === SAND && biome === Biome.Desert) {
          if (r < 0.008) out[above] = DRY_SHRUB;
        }
      }
    }
  }

  private placeTrees(out: Uint16Array, cx: number, cz: number, ox: number, oz: number): void {
    const rng = new Rng(hashInts(this.seed, ox, oz, 401));
    const attempts = 14;
    for (let a = 0; a < attempts; a++) {
      const wx = ox * 16 + rng.int(0, 15);
      const wz = oz * 16 + rng.int(0, 15);
      const roll = rng.next();
      const shapeRoll = rng.next();
      const heightRoll = rng.next();
      const s = this.sample(wx, wz);
      if (s.height < SEA_LEVEL || s.height > WORLD_HEIGHT - 12) continue;
      let kind: 'oak' | 'birch' | 'cactus' | 'spruce' | 'swamp' | null = null;
      switch (s.biome) {
        case Biome.Forest:
          if (roll < 0.5) kind = shapeRoll < 0.3 ? 'birch' : 'oak';
          break;
        case Biome.Plains:
          if (roll < 0.035) kind = 'oak';
          break;
        case Biome.Snowfields:
          if (roll < 0.06) kind = shapeRoll < 0.5 ? 'spruce' : 'birch';
          break;
        case Biome.Taiga:
          if (roll < 0.45) kind = shapeRoll < 0.85 ? 'spruce' : 'birch';
          break;
        case Biome.Swamp:
          if (roll < 0.12 && s.height >= SEA_LEVEL) kind = 'swamp';
          break;
        case Biome.Desert:
          if (roll < 0.07) kind = 'cactus';
          break;
        case Biome.Mountains:
          if (roll < 0.02 && s.height < 112) kind = 'oak';
          break;
        default:
          break;
      }
      if (!kind) continue;
      const lx = wx - cx * 16;
      const lz = wz - cz * 16;
      const base = s.height + 1;
      if (kind === 'cactus') {
        const hgt = 1 + Math.floor(heightRoll * 3);
        for (let y = 0; y < hgt; y++) this.put(out, lx, base + y, lz, CACTUS, true);
        continue;
      }
      if (kind === 'spruce') {
        this.placeSpruce(out, lx, base, lz, 6 + Math.floor(heightRoll * 4), wx, wz);
        continue;
      }
      const log = kind === 'birch' ? BIRCH_LOG : OAK_LOG;
      const leaves = kind === 'birch' ? BIRCH_LEAVES : kind === 'swamp' ? SWAMP_LEAVES : OAK_LEAVES;
      const trunk = kind === 'oak' ? 4 + Math.floor(heightRoll * 3) : 5 + Math.floor(heightRoll * 3);
      const top = base + trunk - 1;
      // Laubkrone
      const leafRng = new Rng(hashInts(this.seed, wx, wz, 402));
      for (let dy = -2; dy <= 1; dy++) {
        const radius = dy >= 0 ? 1 : 2;
        for (let dz = -radius; dz <= radius; dz++) {
          for (let dx = -radius; dx <= radius; dx++) {
            const corner = Math.abs(dx) === radius && Math.abs(dz) === radius;
            const keep = !corner || (dy < 0 && leafRng.next() < 0.45);
            if (dy === 1 && corner) continue;
            if (!keep) continue;
            this.put(out, lx + dx, top + dy, lz + dz, leaves, false);
          }
        }
      }
      if (kind === 'birch') this.put(out, lx, top + 2, lz, leaves, false);
      // Stamm (überschreibt Laub)
      for (let y = base; y <= top; y++) this.put(out, lx, y, lz, log, true);
      // Boden unter dem Stamm wird Erde
      if (lx >= 0 && lx < 16 && lz >= 0 && lz < 16) {
        const g = idx(lx, base - 1, lz);
        if (out[g] === GRASS || out[g] === SNOWY_GRASS) out[g] = DIRT;
      }
    }
  }

  /** Fichte: kegelförmige Krone aus Nadeln. */
  private placeSpruce(out: Uint16Array, lx: number, base: number, lz: number, trunk: number, wx: number, wz: number): void {
    const top = base + trunk - 1;
    const rng = new Rng(hashInts(this.seed, wx, wz, 403));
    this.put(out, lx, top + 1, lz, SPRUCE_LEAVES, false);
    for (let i = 0; i <= trunk - 3; i++) {
      const y = top - i;
      const radius = i === 0 ? 1 : i % 2 === 1 ? Math.min(3, 1 + (i >> 1)) : Math.max(1, Math.min(3, (i >> 1)));
      for (let dz = -radius; dz <= radius; dz++)
        for (let dx = -radius; dx <= radius; dx++) {
          if (Math.abs(dx) + Math.abs(dz) > radius + (radius >= 2 ? 1 : 0)) continue;
          if (radius >= 2 && Math.abs(dx) === radius && Math.abs(dz) === radius) continue;
          if (Math.abs(dx) + Math.abs(dz) === radius + 1 && rng.next() < 0.4) continue;
          this.put(out, lx + dx, y, lz + dz, SPRUCE_LEAVES, false);
        }
    }
    for (let y = base; y <= top; y++) this.put(out, lx, y, lz, SPRUCE_LOG, true);
    if (lx >= 0 && lx < 16 && lz >= 0 && lz < 16) {
      const g = idx(lx, base - 1, lz);
      if (out[g] === GRASS || out[g] === SNOWY_GRASS) out[g] = DIRT;
    }
  }

  /** Schreibt einen Block, sofern er in der aktuellen Spalte liegt. */
  private put(out: Uint16Array, x: number, y: number, z: number, id: number, force: boolean): void {
    if (x < 0 || x > 15 || z < 0 || z > 15 || y <= 0 || y >= WORLD_HEIGHT) return;
    const i = idx(x, y, z);
    const cur = out[i];
    if (cur === BEDROCK) return;
    if (force) {
      if (cur === AIR || SOFT.has(cur) || cur === OAK_LEAVES || cur === BIRCH_LEAVES || cur === SPRUCE_LEAVES || cur === SWAMP_LEAVES || cur === WATER) out[i] = id;
      return;
    }
    if (cur === AIR || SOFT.has(cur)) out[i] = id;
  }

  /** Sucht eine trockene Startposition in der Nähe des Ursprungs. */
  findSpawn(): { x: number; y: number; z: number } {
    for (let r = 0; r < 64; r++) {
      const steps = r === 0 ? 1 : r * 8;
      for (let i = 0; i < steps; i++) {
        const angle = (i / steps) * Math.PI * 2;
        const x = Math.round(Math.cos(angle) * r * 24);
        const z = Math.round(Math.sin(angle) * r * 24);
        const s = this.sample(x, z);
        if ((s.biome === Biome.Plains || s.biome === Biome.Forest) && s.height > SEA_LEVEL) {
          return { x: x + 0.5, y: s.height + 1, z: z + 0.5 };
        }
      }
    }
    const s = this.sample(0, 0);
    return { x: 0.5, y: Math.max(s.height, SEA_LEVEL) + 1, z: 0.5 };
  }
}
