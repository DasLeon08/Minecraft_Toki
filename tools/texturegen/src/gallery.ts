/**
 * Erzeugt PNG-Galerien aller Block-Texturen pro Pixel-Stil sowie ein
 * Vergleichsbild (Zeile 1 = fein, 2 = pixelig, 4 = sehr pixelig).
 * Aufruf: pnpm textures:gallery  → tools/texturegen/out/*.png
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { paintTexture, PIXEL_STYLES, setPixelStyle, TEXTURE_NAMES, TEXTURE_SIZE, type TextureName } from '@blockcraft/shared';
import { encodePng } from './png';

const OUT = join(dirname(fileURLToPath(import.meta.url)));
mkdirSync(OUT, { recursive: true });

const BG = [24, 32, 46];

function sheet(names: readonly TextureName[], cols: number, scale: number, rows: PixelStyleRow[]): { w: number; h: number; data: Uint8Array } {
  const tile = TEXTURE_SIZE * scale;
  const gap = 6;
  const perRow = Math.ceil(names.length / cols);
  const w = cols * (tile + gap) + gap;
  const h = rows.length * perRow * (tile + gap) + gap + (rows.length - 1) * 18;
  const data = new Uint8Array(w * h * 4);
  for (let i = 0; i < w * h; i++) data.set([...BG, 255], i * 4);
  rows.forEach((row, ri) => {
    setPixelStyle(row.style);
    names.forEach((name, i) => {
      const px = paintTexture(name);
      const col = i % cols;
      const r = Math.floor(i / cols) + ri * perRow;
      const ox = gap + col * (tile + gap);
      const oy = gap + r * (tile + gap) + ri * 18;
      for (let y = 0; y < tile; y++)
        for (let x = 0; x < tile; x++) {
          const s = ((Math.floor(y / scale) * TEXTURE_SIZE) + Math.floor(x / scale)) * 4;
          const a = px[s + 3] / 255;
          // Transparenz auf Schachbrett zeigen
          const checker = ((x >> 3) + (y >> 3)) % 2 ? 70 : 50;
          const d = ((oy + y) * w + ox + x) * 4;
          data[d] = px[s] * a + checker * (1 - a);
          data[d + 1] = px[s + 1] * a + checker * (1 - a);
          data[d + 2] = px[s + 2] * a + checker * (1 - a);
          data[d + 3] = 255;
        }
    });
  });
  return { w, h, data };
}

interface PixelStyleRow {
  style: (typeof PIXEL_STYLES)[number];
}

const blockTextures = TEXTURE_NAMES.filter((n) => !n.startsWith('risse'));
for (const style of PIXEL_STYLES) {
  const { w, h, data } = sheet(blockTextures, 11, 6, [{ style }]);
  const file = join(OUT, `texturen-pixel-${style}.png`);
  writeFileSync(file, encodePng(w, h, data));
  console.log('geschrieben:', file);
}

const compare: TextureName[] = ['gras_oben', 'gras_seite', 'erde', 'stein', 'kohleerz', 'eisenerz', 'sand', 'eiche_rinde', 'eiche_laub', 'eiche_bretter', 'bruchstein', 'wasser'];
const cmp = sheet(compare, compare.length, 6, PIXEL_STYLES.map((style) => ({ style })));
const cmpFile = join(OUT, 'vergleich-pixelstile.png');
writeFileSync(cmpFile, encodePng(cmp.w, cmp.h, cmp.data));
console.log('geschrieben:', cmpFile);
