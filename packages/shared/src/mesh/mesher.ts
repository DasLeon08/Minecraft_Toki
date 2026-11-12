/**
 * Greedy Mesher mit Face Culling, Ambient Occlusion und weichem Licht.
 *
 * Vertex-Format (pro Vertex):
 *  - pos   Uint16×4: x, y, z in 1/16-Block (lokal zur Section), w = Normalen-Index (0–5, 6 = Pflanze)
 *  - uvl   Uint16×4: u, v (in 1/16-Block, kachelt), Textur-Layer, frei
 *  - light Uint8×4 : AO (0–3), Sonnenlicht (0–15), Blocklicht (0–15), frei
 */
import {
  CULL_SAME,
  IS_OPAQUE,
  LAYER,
  LIGHT_EMISSION,
  RenderLayer,
  SHAPE,
  Shape,
  WATER_LEVEL,
  BLOCKS,
} from '../registry/blocks';

/** Höhe der Wasseroberfläche (1/16) je Stufe 0–8, wenn darüber kein Wasser ist. */
const WATER_HEIGHT = [14, 13, 11, 10, 8, 7, 5, 4, 14];
const isW = (id: number): boolean => WATER_LEVEL[id] !== 255;
import { PAD, padIndex } from './padded';

export interface MeshLayerData {
  pos: Uint16Array;
  uvl: Uint16Array;
  light: Uint8Array;
  index: Uint32Array;
  vertexCount: number;
}

export interface SectionMeshData {
  opaque: MeshLayerData | null;
  cutout: MeshLayerData | null;
  translucent: MeshLayerData | null;
}

class LayerBuilder {
  pos = new Uint16Array(4 * 1024);
  uvl = new Uint16Array(4 * 1024);
  light = new Uint8Array(4 * 1024);
  index = new Uint32Array(6 * 256);
  verts = 0;
  indices = 0;

  reset(): void {
    this.verts = 0;
    this.indices = 0;
  }

  private grow(): void {
    const g16 = (a: Uint16Array<ArrayBuffer>): Uint16Array<ArrayBuffer> => {
      const n = new Uint16Array(a.length * 2);
      n.set(a);
      return n;
    };
    this.pos = g16(this.pos);
    this.uvl = g16(this.uvl);
    const l = new Uint8Array(this.light.length * 2);
    l.set(this.light);
    this.light = l;
  }

  vertex(x: number, y: number, z: number, n: number, u: number, v: number, layer: number, ao: number, sky: number, blk: number): void {
    if ((this.verts + 1) * 4 > this.pos.length) this.grow();
    const o = this.verts * 4;
    this.pos[o] = x;
    this.pos[o + 1] = y;
    this.pos[o + 2] = z;
    this.pos[o + 3] = n;
    // UVs in 1/16-Block (erlaubt Ausschnitte wie bei der Fackel)
    this.uvl[o] = Math.round(u * 16);
    this.uvl[o + 1] = Math.round(v * 16);
    this.uvl[o + 2] = layer;
    this.light[o] = ao;
    this.light[o + 1] = sky;
    this.light[o + 2] = blk;
    this.verts++;
  }

  quadIndices(flip: boolean): void {
    if (this.indices + 6 > this.index.length) {
      const n = new Uint32Array(this.index.length * 2);
      n.set(this.index);
      this.index = n;
    }
    const b = this.verts - 4;
    const o = this.indices;
    if (flip) {
      this.index[o] = b + 1;
      this.index[o + 1] = b + 2;
      this.index[o + 2] = b + 3;
      this.index[o + 3] = b + 1;
      this.index[o + 4] = b + 3;
      this.index[o + 5] = b;
    } else {
      this.index[o] = b;
      this.index[o + 1] = b + 1;
      this.index[o + 2] = b + 2;
      this.index[o + 3] = b;
      this.index[o + 4] = b + 2;
      this.index[o + 5] = b + 3;
    }
    this.indices += 6;
  }

  result(): MeshLayerData | null {
    if (this.verts === 0) return null;
    return {
      pos: this.pos.slice(0, this.verts * 4),
      uvl: this.uvl.slice(0, this.verts * 4),
      light: this.light.slice(0, this.verts * 4),
      index: this.index.slice(0, this.indices),
      vertexCount: this.verts,
    };
  }
}

const builders = [new LayerBuilder(), new LayerBuilder(), new LayerBuilder()];
const maskA = new Uint32Array(256);
const maskB = new Uint32Array(256);

// Achsen-Vektoren
const AXES: [number, number, number][] = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

// Masken-Layout A: Textur+1 (10 Bit) | AO×4 (8 Bit) | Block-ID (10 Bit) | Absenkung der Oberkante in 1/16 (4 Bit)

/** Erzeugt die Mesh-Daten einer Section aus gepaddeten Daten (18³). */
export function meshSection(blocks: Uint16Array, light: Uint8Array): SectionMeshData {
  for (const b of builders) b.reset();

  const corner = [0, 0, 0];
  const ao = [0, 0, 0, 0];
  const sk = [0, 0, 0, 0];
  const bl = [0, 0, 0, 0];

  for (let d = 0; d < 6; d++) {
    const axis = d >> 1;
    const positive = (d & 1) === 0;
    const uAxis = (axis + 1) % 3;
    const vAxis = (axis + 2) % 3;
    const N = AXES[axis];
    const U = AXES[uAxis];
    const V = AXES[vAxis];
    const sign = positive ? 1 : -1;
    const nOff = sign * (N[0] + N[2] * PAD + N[1] * PAD * PAD);
    const uOff = U[0] + U[2] * PAD + U[1] * PAD * PAD;
    const vOff = V[0] + V[2] * PAD + V[1] * PAD * PAD;

    for (let s = 0; s < 16; s++) {
      // Maske aufbauen
      let any = false;
      for (let j = 0; j < 16; j++) {
        for (let i = 0; i < 16; i++) {
          corner[axis] = s;
          corner[uAxis] = i;
          corner[vAxis] = j;
          const p = padIndex(corner[0], corner[1], corner[2]);
          const b = blocks[p];
          const k = j * 16 + i;
          if (SHAPE[b] !== Shape.Cube) {
            maskA[k] = 0;
            continue;
          }
          const f = p + nOff; // Zelle vor der Fläche
          const nb = blocks[f];
          let drop = 0;
          if (isW(b)) {
            // Wasser: Höhe abhängig von der Stufe; Flächen zu gleich hohem/höherem Wasser entfallen
            const myH = isW(blocks[p + PAD * PAD]) ? 16 : WATER_HEIGHT[WATER_LEVEL[b]];
            drop = 16 - myH;
            if (isW(nb)) {
              const nh = axis === 1 ? 99 : isW(blocks[f + PAD * PAD]) ? 16 : WATER_HEIGHT[WATER_LEVEL[nb]];
              if (nh >= myH || axis === 1) {
                maskA[k] = 0;
                continue;
              }
            }
          }
          if (IS_OPAQUE[nb] || (CULL_SAME[b] && nb === b)) {
            maskA[k] = 0;
            continue;
          }
          // Wasser zeichnet keine Fläche gegen andere Flüssigkeit/undurchsichtige Blöcke (oben abgedeckt).
          any = true;
          // 4 Ecken: (−u,−v), (+u,−v), (+u,+v), (−u,+v)
          for (let c = 0; c < 4; c++) {
            const du = c === 1 || c === 2 ? uOff : -uOff;
            const dv = c >= 2 ? vOff : -vOff;
            const s1 = f + du;
            const s2 = f + dv;
            const cc = f + du + dv;
            const o1 = IS_OPAQUE[blocks[s1]];
            const o2 = IS_OPAQUE[blocks[s2]];
            const oc = IS_OPAQUE[blocks[cc]];
            ao[c] = o1 && o2 ? 0 : 3 - (o1 + o2 + oc);
            // Weiches Licht: Mittel der nicht-opaken Zellen
            let ss = light[f] >> 4;
            let sb = light[f] & 15;
            let cnt = 1;
            if (!o1) {
              ss += light[s1] >> 4;
              sb += light[s1] & 15;
              cnt++;
            }
            if (!o2) {
              ss += light[s2] >> 4;
              sb += light[s2] & 15;
              cnt++;
            }
            if (!oc && !(o1 && o2)) {
              ss += light[cc] >> 4;
              sb += light[cc] & 15;
              cnt++;
            }
            sk[c] = Math.round(ss / cnt);
            bl[c] = Math.round(sb / cnt);
          }
          // Leuchtende Blöcke erscheinen selbst immer voll hell
          if (LIGHT_EMISSION[b] > 0) {
            ao[0] = ao[1] = ao[2] = ao[3] = 3;
            bl[0] = bl[1] = bl[2] = bl[3] = 15;
          }
          const tex = BLOCKS[b].faces[d];
          maskA[k] = ((tex + 1) | (ao[0] << 10) | (ao[1] << 12) | (ao[2] << 14) | (ao[3] << 16) | (b << 18) | (drop << 28)) >>> 0;
          maskB[k] =
            (sk[0] | (sk[1] << 4) | (sk[2] << 8) | (sk[3] << 12) | (bl[0] << 16) | (bl[1] << 20) | (bl[2] << 24) | (bl[3] << 28)) >>> 0;
        }
      }
      if (!any) continue;

      // Greedy zusammenfassen
      for (let j = 0; j < 16; j++) {
        for (let i = 0; i < 16; ) {
          const k = j * 16 + i;
          const a = maskA[k];
          if (a === 0) {
            i++;
            continue;
          }
          const bm = maskB[k];
          let w = 1;
          while (i + w < 16 && maskA[k + w] === a && maskB[k + w] === bm) w++;
          let h = 1;
          outer: while (j + h < 16) {
            const row = (j + h) * 16 + i;
            for (let t = 0; t < w; t++) {
              if (maskA[row + t] !== a || maskB[row + t] !== bm) break outer;
            }
            h++;
          }
          // Quad ausgeben
          const blockId = (a >>> 18) & 0x3ff;
          const tex = (a & 0x3ff) - 1;
          const drop = (a >>> 28) & 15;
          const layerKind = LAYER[blockId];
          const builder =
            layerKind === RenderLayer.Translucent ? builders[2] : layerKind === RenderLayer.Cutout ? builders[1] : builders[0];
          const plane = (positive ? s + 1 : s) * 16 - (positive && axis === 1 ? drop : 0);
          const a0 = (a >>> 10) & 3;
          const a1 = (a >>> 12) & 3;
          const a2 = (a >>> 14) & 3;
          const a3 = (a >>> 16) & 3;
          // Oberste Y-Koordinate dieses Quads (für abgesenkte Wasser-Seitenflächen)
          const topY = axis === 0 ? (i + w) * 16 : axis === 2 ? (j + h) * 16 : -1;
          const corners: [number, number][] = positive
            ? [
                [0, 0],
                [w, 0],
                [w, h],
                [0, h],
              ]
            : [
                [0, 0],
                [0, h],
                [w, h],
                [w, 0],
              ];
          const cornerIdx = positive ? [0, 1, 2, 3] : [0, 3, 2, 1];
          const aoArr = [a0, a1, a2, a3];
          for (let c = 0; c < 4; c++) {
            const [cu, cv] = corners[c];
            const ci = cornerIdx[c];
            const p3 = [0, 0, 0];
            p3[axis] = plane;
            p3[uAxis] = (i + cu) * 16;
            p3[vAxis] = (j + cv) * 16;
            // Texturkoordinaten: Seitenflächen mit v entlang Welt-Y (oben = 0)
            let tu: number;
            let tv: number;
            if (axis === 0) {
              tu = j + cv;
              tv = 16 - (i + cu);
            } else if (axis === 1) {
              tu = j + cv;
              tv = i + cu;
            } else {
              tu = i + cu;
              tv = 16 - (j + cv);
            }
            if (drop && axis !== 1 && p3[1] === topY) p3[1] -= drop;
            builder.vertex(
              p3[0],
              p3[1],
              p3[2],
              d,
              tu,
              tv,
              tex,
              aoArr[ci],
              (bm >>> (ci * 4)) & 15,
              (bm >>> (16 + ci * 4)) & 15,
            );
          }
          // Diagonale so wählen, dass AO nicht verzerrt
          const flip = aoArr[cornerIdx[0]] + aoArr[cornerIdx[2]] < aoArr[cornerIdx[1]] + aoArr[cornerIdx[3]];
          builder.quadIndices(flip);
          // Maske leeren
          for (let hh = 0; hh < h; hh++) for (let ww = 0; ww < w; ww++) maskA[(j + hh) * 16 + i + ww] = 0;
          i += w;
        }
      }
    }
  }

  // Pflanzen (gekreuzte Flächen, beidseitig)
  for (let y = 0; y < 16; y++) {
    for (let z = 0; z < 16; z++) {
      for (let x = 0; x < 16; x++) {
        const p = padIndex(x, y, z);
        const b = blocks[p];
        if (SHAPE[b] !== Shape.Cross) continue;
        const l = light[p];
        const s = l >> 4;
        const bk = l & 15;
        const tex = BLOCKS[b].faces[0];
        const builder = builders[1];
        const x0 = x * 16 + 2;
        const x1 = x * 16 + 14;
        const z0 = z * 16 + 2;
        const z1 = z * 16 + 14;
        const y0 = y * 16;
        const y1 = y * 16 + 16;
        const quads: [number, number, number, number][] = [
          [x0, z0, x1, z1],
          [x1, z0, x0, z1],
        ];
        for (const [ax, az, bx, bz] of quads) {
          for (const back of [false, true]) {
            const pts: [number, number, number, number, number][] = [
              [ax, y0, az, 0, 1],
              [bx, y0, bz, 1, 1],
              [bx, y1, bz, 1, 0],
              [ax, y1, az, 0, 0],
            ];
            if (back) pts.reverse();
            for (const [px, py, pz, u, v] of pts) builder.vertex(px, py, pz, 6, u, v, tex, 3, s, bk);
            builder.quadIndices(false);
          }
        }
      }
    }
  }

  // Fackeln: dünner Stab (2×10 Pixel) mit Ausschnitt aus der Textur
  for (let y = 0; y < 16; y++) {
    for (let z = 0; z < 16; z++) {
      for (let x = 0; x < 16; x++) {
        const p = padIndex(x, y, z);
        const b = blocks[p];
        if (SHAPE[b] !== Shape.Torch) continue;
        const l = light[p];
        const tex = BLOCKS[b].faces[0];
        const builder = builders[1];
        const sky = l >> 4;
        const bx = x * 16;
        const by = y * 16;
        const bz = z * 16;
        const x0 = bx + 7;
        const x1 = bx + 9;
        const z0 = bz + 7;
        const z1 = bz + 9;
        const y0 = by;
        const y1 = by + 10;
        // [Normalen-Index, 4 Ecken (x, y, z, u, v)] mit u/v in Texeln
        const quads: [number, number[][]][] = [
          [4, [[x0, y0, z1, 7, 16], [x1, y0, z1, 9, 16], [x1, y1, z1, 9, 6], [x0, y1, z1, 7, 6]]],
          [5, [[x1, y0, z0, 7, 16], [x0, y0, z0, 9, 16], [x0, y1, z0, 9, 6], [x1, y1, z0, 7, 6]]],
          [0, [[x1, y0, z1, 7, 16], [x1, y0, z0, 9, 16], [x1, y1, z0, 9, 6], [x1, y1, z1, 7, 6]]],
          [1, [[x0, y0, z0, 7, 16], [x0, y0, z1, 9, 16], [x0, y1, z1, 9, 6], [x0, y1, z0, 7, 6]]],
          [2, [[x0, y1, z1, 7, 8], [x1, y1, z1, 9, 8], [x1, y1, z0, 9, 6], [x0, y1, z0, 7, 6]]],
        ];
        for (const [n, pts] of quads) {
          for (const [px, py, pz, u, v] of pts) builder.vertex(px, py, pz, n, u / 16, v / 16, tex, 3, sky, 15);
          builder.quadIndices(false);
        }
      }
    }
  }

  return {
    opaque: builders[0].result(),
    cutout: builders[1].result(),
    translucent: builders[2].result(),
  };
}

/** Anzahl Quads (für Tests/Statistik). */
export function quadCount(data: SectionMeshData): number {
  let n = 0;
  for (const l of [data.opaque, data.cutout, data.translucent]) if (l) n += l.vertexCount / 4;
  return n;
}

