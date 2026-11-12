/** Erzeugt isometrische Block-Icons (Data-URLs) aus der prozeduralen Pixel-Art. */
import { BLOCKS, paintTexture, Shape, TEXTURE_NAMES, TEXTURE_SIZE, type TextureName } from '@blockcraft/shared';

const cache = new Map<number, string>();
const texCache = new Map<string, HTMLCanvasElement>();

function texCanvas(layer: number, brightness: number): HTMLCanvasElement {
  const key = `${layer}:${brightness}`;
  const hit = texCache.get(key);
  if (hit) return hit;
  const px = paintTexture(TEXTURE_NAMES[layer] as TextureName);
  const c = document.createElement('canvas');
  c.width = c.height = TEXTURE_SIZE;
  const ctx = c.getContext('2d')!;
  const img = ctx.createImageData(TEXTURE_SIZE, TEXTURE_SIZE);
  for (let i = 0; i < px.length; i += 4) {
    img.data[i] = px[i] * brightness;
    img.data[i + 1] = px[i + 1] * brightness;
    img.data[i + 2] = px[i + 2] * brightness;
    img.data[i + 3] = px[i + 3];
  }
  ctx.putImageData(img, 0, 0);
  texCache.set(key, c);
  return c;
}

/** Leert den Icon-Cache (nach Wechsel des Texturstils). */
export function clearIconCache(): void {
  cache.clear();
  texCache.clear();
}

export function blockIcon(id: number): string {
  const hit = cache.get(id);
  if (hit) return hit;
  const def = BLOCKS[id];
  const size = 48;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;
  const k = 1 / TEXTURE_SIZE;
  if (def.shape === Shape.Cross) {
    ctx.drawImage(texCanvas(def.faces[0], 1), 4, 4, 40, 40);
  } else {
    const [side, , top] = [def.faces[0], def.faces[1], def.faces[2]];
    ctx.setTransform(20 * k, -10 * k, 20 * k, 10 * k, 4, 14);
    ctx.drawImage(texCanvas(top, 1), 0, 0);
    ctx.setTransform(20 * k, 10 * k, 0, 22 * k, 4, 14);
    ctx.drawImage(texCanvas(side, 0.78), 0, 0);
    ctx.setTransform(20 * k, -10 * k, 0, 22 * k, 24, 24);
    ctx.drawImage(texCanvas(def.faces[4], 0.62), 0, 0);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  const url = c.toDataURL();
  cache.set(id, url);
  return url;
}
