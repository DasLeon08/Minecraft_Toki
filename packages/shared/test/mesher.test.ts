import { describe, expect, it } from 'vitest';
import { meshSection, quadCount } from '../src/mesh/mesher';
import { PAD_VOLUME, padIndex, fillPadded } from '../src/mesh/padded';
import { AIR, GLASS, OAK_LEAVES, STONE, TALL_GRASS, WATER } from '../src/registry/blocks';
import { makeWorld } from './helpers';

function padded(fill: (x: number, y: number, z: number) => number): { b: Uint16Array; l: Uint8Array } {
  const b = new Uint16Array(PAD_VOLUME);
  const l = new Uint8Array(PAD_VOLUME).fill(0xf0);
  for (let y = -1; y <= 16; y++) for (let z = -1; z <= 16; z++) for (let x = -1; x <= 16; x++) b[padIndex(x, y, z)] = fill(x, y, z);
  return { b, l };
}

describe('Greedy Mesher', () => {
  it('einzelner Block → 6 Flächen', () => {
    const { b, l } = padded((x, y, z) => (x === 5 && y === 5 && z === 5 ? STONE : AIR));
    const m = meshSection(b, l);
    expect(quadCount(m)).toBe(6);
    expect(m.opaque?.index.length).toBe(36);
  });

  it('zwei Nachbarblöcke → innere Flächen entfallen, gleiche Flächen werden verschmolzen', () => {
    const { b, l } = padded((x, y, z) => ((x === 5 || x === 6) && y === 5 && z === 5 ? STONE : AIR));
    expect(quadCount(meshSection(b, l))).toBe(6);
  });

  it('volle Section unter Luft → nur Deckel sichtbar, als 1 Quad', () => {
    // Alles Stein, aber Rand (Nachbarn) auch Stein, oben Luft.
    const { b, l } = padded((_x, y) => (y <= 15 ? STONE : AIR));
    const m = meshSection(b, l);
    expect(quadCount(m)).toBe(1);
  });

  it('ebene 16×16-Platte in Luft → 6 Quads', () => {
    const { b, l } = padded((x, y, z) => (y === 3 && x >= 0 && x < 16 && z >= 0 && z < 16 ? STONE : AIR));
    expect(quadCount(meshSection(b, l))).toBe(6);
  });

  it('Glas neben Glas zeichnet keine innere Fläche, Laub kommt in den Cutout-Layer', () => {
    const glass = padded((x, y, z) => ((x === 1 || x === 2) && y === 1 && z === 1 ? GLASS : AIR));
    const mg = meshSection(glass.b, glass.l);
    expect(mg.opaque).toBeNull();
    expect(quadCount(mg)).toBe(6);
    const leaf = padded((x, y, z) => (x === 1 && y === 1 && z === 1 ? OAK_LEAVES : AIR));
    expect(meshSection(leaf.b, leaf.l).cutout?.vertexCount).toBe(24);
  });

  it('Wasser ist durchscheinend und seine Oberfläche liegt tiefer', () => {
    const { b, l } = padded((x, y, z) => (x === 0 && y === 0 && z === 0 ? WATER : AIR));
    const m = meshSection(b, l);
    expect(m.translucent).not.toBeNull();
    let maxY = 0;
    const pos = m.translucent!.pos;
    for (let i = 0; i < pos.length; i += 4) maxY = Math.max(maxY, pos[i + 1]);
    expect(maxY).toBe(14);
  });

  it('Pflanzen erzeugen 4 Quads (2 Flächen, beidseitig)', () => {
    const { b, l } = padded((x, y, z) => (x === 3 && y === 3 && z === 3 ? TALL_GRASS : AIR));
    expect(meshSection(b, l).cutout?.vertexCount).toBe(16);
  });

  it('Flächen an Chunkgrenzen werden gegen Nachbarspalten gecullt', () => {
    // Zwei Spalten komplett bis y=10 gefüllt: an der Grenze x=15|16 darf keine Fläche entstehen.
    const { world } = makeWorld(1, (_x, y) => (y <= 10 ? STONE : AIR));
    const b = new Uint16Array(PAD_VOLUME);
    const l = new Uint8Array(PAD_VOLUME);
    expect(fillPadded(world, 0, 0, 0, b, l)).toBe(true);
    const m = meshSection(b, l);
    // Nur die Oberseite y=10 ist sichtbar → 1 Quad.
    expect(quadCount(m)).toBe(1);
  });
});
