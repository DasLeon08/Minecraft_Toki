/**
 * Rezepte: geformt (auf das kleinste Rechteck zugeschnitten, gespiegelt erlaubt)
 * und formlos. Dazu Schmelz-Rezepte und Brennstoffe.
 */
import {
  BIRCH_LOG,
  BIRCH_PLANKS,
  BRICKS,
  CHEST,
  CLAY,
  COBBLESTONE,
  CRAFTING_TABLE,
  FURNACE,
  GLASS,
  IRON_ORE,
  LIGHT_CRYSTAL,
  OAK_LOG,
  OAK_PLANKS,
  SAND,
  SANDSTONE,
  SPRUCE_LOG,
  SPRUCE_PLANKS,
  STONE,
  TORCH,
  SNOW,
  LUMIT_ORE,
} from '../registry/blocks';
import { ARMOR, COAL, getItem, IRON_INGOT, LUMIT, STICK, TOOLS } from '../registry/items';
import type { ItemStack, Slot } from './inventory';

export interface ShapedRecipe {
  type: 'shaped';
  /** Zeilen; jedes Zeichen ist ein Schlüssel aus `keys`, Leerzeichen = leer. */
  pattern: string[];
  keys: Record<string, number[]>;
  result: ItemStack;
}

export interface ShapelessRecipe {
  type: 'shapeless';
  ingredients: number[][];
  result: ItemStack;
}

export type Recipe = ShapedRecipe | ShapelessRecipe;

const PLANKS = [OAK_PLANKS, BIRCH_PLANKS, SPRUCE_PLANKS];
const LOGS = [OAK_LOG, BIRCH_LOG, SPRUCE_LOG];

export const RECIPES: Recipe[] = [];

function shaped(pattern: string[], keys: Record<string, number | number[]>, id: number, count = 1): void {
  const k: Record<string, number[]> = {};
  for (const [ch, v] of Object.entries(keys)) k[ch] = Array.isArray(v) ? v : [v];
  RECIPES.push({ type: 'shaped', pattern, keys: k, result: { id, count } });
}

function shapeless(ingredients: (number | number[])[], id: number, count = 1): void {
  RECIPES.push({ type: 'shapeless', ingredients: ingredients.map((v) => (Array.isArray(v) ? v : [v])), result: { id, count } });
}

// Holz
shapeless([OAK_LOG], OAK_PLANKS, 4);
shapeless([BIRCH_LOG], BIRCH_PLANKS, 4);
shapeless([SPRUCE_LOG], SPRUCE_PLANKS, 4);
shaped(['#', '#'], { '#': PLANKS }, STICK, 4);
shaped(['##', '##'], { '#': PLANKS }, CRAFTING_TABLE);
shaped(['###', '# #', '###'], { '#': PLANKS }, CHEST);
// Stein
shaped(['###', '# #', '###'], { '#': COBBLESTONE }, FURNACE);
shaped(['##', '##'], { '#': SAND }, SANDSTONE);
shaped(['##', '##'], { '#': CLAY }, BRICKS, 2);
// Licht
shaped(['c', '|'], { c: COAL, '|': STICK }, TORCH, 4);
shaped([' g ', 'gcg', ' g '], { g: GLASS, c: COAL }, LIGHT_CRYSTAL, 2);
// Schnee
shaped(['##', '##'], { '#': SNOW }, SNOW);

// Werkzeuge
const TOOL_MATERIALS: number[][] = [PLANKS, [COBBLESTONE], [IRON_INGOT], [LUMIT]];
TOOL_MATERIALS.forEach((mat, tier) => {
  shaped(['MMM', ' | ', ' | '], { M: mat, '|': STICK }, TOOLS.spitzhacke[tier]);
  shaped(['M', '|', '|'], { M: mat, '|': STICK }, TOOLS.schaufel[tier]);
  shaped(['MM', 'M|', ' |'], { M: mat, '|': STICK }, TOOLS.axt[tier]);
  shaped(['M', 'M', '|'], { M: mat, '|': STICK }, TOOLS.schwert[tier]);
});

// Rüstung
for (const [mat, id] of [
  ['eisen', IRON_INGOT],
  ['lumit', LUMIT],
] as const) {
  shaped(['MMM', 'M M'], { M: id }, ARMOR[mat][0]);
  shaped(['M M', 'MMM', 'MMM'], { M: id }, ARMOR[mat][1]);
  shaped(['MMM', 'M M', 'M M'], { M: id }, ARMOR[mat][2]);
  shaped(['M M', 'M M'], { M: id }, ARMOR[mat][3]);
}

/** Sucht ein passendes Rezept für ein w×h-Raster (Zeilen nacheinander). */
export function matchRecipe(grid: Slot[], w: number, h: number): ItemStack | null {
  // Auf das kleinste Rechteck mit Inhalt zuschneiden
  let minX = w;
  let minY = h;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++)
      if (grid[y * w + x]) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
  if (maxX < 0) return null;
  const tw = maxX - minX + 1;
  const th = maxY - minY + 1;
  const cell = (x: number, y: number): number | null => grid[(minY + y) * w + minX + x]?.id ?? null;
  const items: number[] = [];
  for (const s of grid) if (s) items.push(s.id);

  for (const r of RECIPES) {
    if (r.type === 'shaped') {
      const ph = r.pattern.length;
      const pw = Math.max(...r.pattern.map((row) => row.length));
      if (pw !== tw || ph !== th) continue;
      for (const mirror of [false, true]) {
        let ok = true;
        for (let y = 0; y < th && ok; y++)
          for (let x = 0; x < tw && ok; x++) {
            const ch = r.pattern[y][mirror ? tw - 1 - x : x] ?? ' ';
            const id = cell(x, y);
            if (ch === ' ') ok = id === null;
            else ok = id !== null && r.keys[ch].includes(id);
          }
        if (ok) return { ...r.result };
      }
    } else {
      if (items.length !== r.ingredients.length) continue;
      const used = new Array(items.length).fill(false);
      const ok = r.ingredients.every((opts) => {
        const i = items.findIndex((id, k) => !used[k] && opts.includes(id));
        if (i < 0) return false;
        used[i] = true;
        return true;
      });
      if (ok) return { ...r.result };
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Schmelze
// ---------------------------------------------------------------------------

export const SMELT_TICKS = 200;

const SMELTING = new Map<number, ItemStack>([
  [IRON_ORE, { id: IRON_INGOT, count: 1 }],
  [LUMIT_ORE, { id: LUMIT, count: 1 }],
  [SAND, { id: GLASS, count: 1 }],
  [COBBLESTONE, { id: STONE, count: 1 }],
  [CLAY, { id: BRICKS, count: 1 }],
  ...LOGS.map((l) => [l, { id: COAL, count: 1 }] as [number, ItemStack]),
]);

export function smeltResult(id: number): ItemStack | null {
  const r = SMELTING.get(id);
  return r ? { ...r } : null;
}

/** Brenndauer in Ticks (0 = kein Brennstoff). */
export function fuelTicks(id: number): number {
  return getItem(id)?.fuel ?? 0;
}
