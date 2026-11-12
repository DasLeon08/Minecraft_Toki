/**
 * Icons aus der prozeduralen Pixel-Art: Blöcke isometrisch, Items flach,
 * dazu HUD-Symbole (Herz, Hunger, Rüstung, Luft) als eigene Mini-Sprites.
 */
import { BLOCKS, getItem, paintTexture, Shape, TEXTURE_NAMES, TEXTURE_SIZE, type TextureName } from '@blockcraft/shared';

const urlCache = new Map<number, string>();
const canvasCache = new Map<number, HTMLCanvasElement>();
const texCache = new Map<string, HTMLCanvasElement>();

/** Leert alle Caches (nach Wechsel des Texturstils). */
export function clearIconCache(): void {
  urlCache.clear();
  canvasCache.clear();
  texCache.clear();
}

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

/** Icon als Canvas (48×48). */
export function itemIconCanvas(id: number): HTMLCanvasElement {
  const hit = canvasCache.get(id);
  if (hit) return hit;
  const size = 48;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;
  const k = 1 / TEXTURE_SIZE;
  const def = getItem(id);
  const block = def?.block !== undefined ? BLOCKS[def.block] : undefined;
  if (!def) {
    // unbekannt: leer
  } else if (!block || block.shape === Shape.Cross || block.shape === Shape.Torch) {
    ctx.drawImage(texCanvas(def.icon, 1), 4, 4, 40, 40);
  } else {
    ctx.setTransform(20 * k, -10 * k, 20 * k, 10 * k, 4, 14);
    ctx.drawImage(texCanvas(block.faces[2], 1), 0, 0);
    ctx.setTransform(20 * k, 10 * k, 0, 22 * k, 4, 14);
    ctx.drawImage(texCanvas(block.faces[4], 0.78), 0, 0);
    ctx.setTransform(20 * k, -10 * k, 0, 22 * k, 24, 24);
    ctx.drawImage(texCanvas(block.faces[0], 0.62), 0, 0);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  canvasCache.set(id, c);
  return c;
}

export function itemIcon(id: number): string {
  const hit = urlCache.get(id);
  if (hit) return hit;
  const url = itemIconCanvas(id).toDataURL();
  urlCache.set(id, url);
  return url;
}

/** @deprecated Phase 1 – Blöcke sind jetzt Items mit gleicher ID. */
export const blockIcon = itemIcon;

// ---------------------------------------------------------------------------
// HUD-Symbole (9×9 Pixel, eigene Motive)
// ---------------------------------------------------------------------------

const HUD_MASKS: Record<string, { rows: string[]; pal: Record<string, string> }> = {
  heart: {
    rows: ['.dd...dd.', 'drrd.drrd', 'drlrrrrrd', 'drrrrrrrd', '.drrrrrd.', '..drrrd..', '...drd...', '....d....'],
    pal: { d: '#3a0c10', r: '#e0403a', l: '#ff9a8a' },
  },
  heartHalf: {
    rows: ['.dd...dd.', 'drrd.dggd', 'drlrrgggd', 'drrrrgggd', '.drrrggd.', '..drrgd..', '...drd...', '....d....'],
    pal: { d: '#3a0c10', r: '#e0403a', l: '#ff9a8a', g: '#3b3540' },
  },
  heartEmpty: {
    rows: ['.dd...dd.', 'dggd.dggd', 'dgggggggd', 'dgggggggd', '.dgggggd.', '..dgggd..', '...dgd...', '....d....'],
    pal: { d: '#1a1418', g: '#3b3540' },
  },
  food: {
    rows: ['......dd.', '.....dbbd', '..ddddbd.', '.dmmmmd..', 'dmllmmmd.', 'dmlmmmmd.', 'dmmmmmd..', '.dmmmd...', '..ddd....'],
    pal: { d: '#3a210c', m: '#c07a35', l: '#f0b46a', b: '#efe4cf' },
  },
  foodEmpty: {
    rows: ['......dd.', '.....dggd', '..ddddgd.', '.dggggd..', 'dgggggd..', 'dgggggggd', 'dggggggd.', '.dgggd...', '..ddd....'],
    pal: { d: '#1a1418', g: '#3b3540' },
  },
  armor: {
    rows: ['ddddddddd', 'dllmmmmmd', 'dlmmmmmmd', 'dmmmmmmmd', 'dmmmmmmmd', '.dmmmmmd.', '..dmmmd..', '...ddd...'],
    pal: { d: '#2f3340', m: '#aab0bd', l: '#eef1f5' },
  },
  armorEmpty: {
    rows: ['ddddddddd', 'dgggggggd', 'dgggggggd', 'dgggggggd', 'dgggggggd', '.dgggggd.', '..dgggd..', '...ddd...'],
    pal: { d: '#1a1418', g: '#3b3540' },
  },
  bubble: {
    rows: ['..ddddd..', '.dbbbbbd.', 'dbllbbbbd', 'dblbbbbbd', 'dbbbbbbbd', 'dbbbbbbbd', '.dbbbbbd.', '..ddddd..'],
    pal: { d: '#1d3f78', b: '#5a9de8', l: '#d8ecff' },
  },
};

const hudCache = new Map<string, string>();
export function hudIcon(name: keyof typeof HUD_MASKS): string {
  const hit = hudCache.get(name);
  if (hit) return hit;
  const { rows, pal } = HUD_MASKS[name];
  const c = document.createElement('canvas');
  c.width = c.height = 9;
  const ctx = c.getContext('2d')!;
  rows.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      if (ch === '.') return;
      ctx.fillStyle = pal[ch];
      ctx.fillRect(x, y, 1, 1);
    }),
  );
  const url = c.toDataURL();
  hudCache.set(name, url);
  return url;
}
