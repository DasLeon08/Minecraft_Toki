/** Deterministische Hash- und Zufallsfunktionen (identisch auf Client und Server). */

/** Wandelt einen beliebigen Seed-Text in eine 32-Bit-Zahl (FNV-1a mit Avalanche). */
export function hashString(text: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return mix32(h);
}

/** Mischt eine 32-Bit-Zahl gut durch (murmur3-Finalizer). */
export function mix32(x: number): number {
  x ^= x >>> 16;
  x = Math.imul(x, 0x85ebca6b);
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35);
  x ^= x >>> 16;
  return x >>> 0;
}

/** Kombiniert mehrere Ganzzahlen zu einem Hash (z. B. Seed, cx, cz, Salt). */
export function hashInts(...values: number[]): number {
  let h = 0x9e3779b9;
  for (const v of values) {
    h = mix32(h ^ Math.imul(v | 0, 0x27d4eb2d));
  }
  return h >>> 0;
}

/** Schneller, seedbarer PRNG (mulberry32). Liefert Zahlen in [0, 1). */
export class Rng {
  private state: number;

  constructor(seed: number) {
    this.state = seed >>> 0;
  }

  next(): number {
    let t = (this.state = (this.state + 0x6d2b79f5) >>> 0);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /** Ganzzahl in [min, max] (inklusive). */
  int(min: number, max: number): number {
    return min + Math.floor(this.next() * (max - min + 1));
  }

  chance(p: number): boolean {
    return this.next() < p;
  }
}

/** Normalisiert einen vom Nutzer eingegebenen Seed: Zahl bleibt Zahl, Text wird gehasht. */
export function seedFromInput(input: string): number {
  const trimmed = input.trim();
  if (trimmed === '') return (Math.random() * 0xffffffff) >>> 0;
  if (/^-?\d+$/.test(trimmed)) return Number(BigInt.asUintN(32, BigInt(trimmed)));
  return hashString(trimmed);
}
