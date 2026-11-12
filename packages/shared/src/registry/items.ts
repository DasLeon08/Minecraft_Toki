/**
 * Item-Registry. IDs 0–255 sind Block-Items (gleiche ID wie der Block),
 * IDs ab 256 sind eigenständige Items (Werkzeuge, Rüstung, Nahrung, Material).
 */
import { NAMESPACE } from '../constants';
import { BIRCH_LOG, BIRCH_PLANKS, BLOCKS, CHEST, CRAFTING_TABLE, OAK_LOG, OAK_PLANKS, Shape, SPRUCE_LOG, SPRUCE_PLANKS, type ToolType } from './blocks';

/** Holzblöcke brennen in der Schmelze (Ticks). */
const BLOCK_FUEL = new Map<number, number>([
  [OAK_PLANKS, 300],
  [BIRCH_PLANKS, 300],
  [SPRUCE_PLANKS, 300],
  [OAK_LOG, 300],
  [BIRCH_LOG, 300],
  [SPRUCE_LOG, 300],
  [CRAFTING_TABLE, 300],
  [CHEST, 300],
]);
import { textureLayer, type TextureName } from './textures';

export type ItemKind = 'block' | 'material' | 'tool' | 'armor' | 'food';

export interface ToolInfo {
  type: Exclude<ToolType, 'none'> | 'schwert';
  /** 0 = Holz, 1 = Stein, 2 = Eisen, 3 = Lumit */
  tier: number;
  speed: number;
  durability: number;
  attack: number;
}

/** 0 = Helm, 1 = Brustpanzer, 2 = Beinschutz, 3 = Stiefel */
export type ArmorSlot = 0 | 1 | 2 | 3;

export interface ArmorInfo {
  slot: ArmorSlot;
  points: number;
  durability: number;
}

export interface FoodInfo {
  hunger: number;
  saturation: number;
}

export interface ItemDef {
  id: number;
  key: string;
  name: string;
  kind: ItemKind;
  maxStack: number;
  /** Block, der beim Platzieren entsteht. */
  block?: number;
  tool?: ToolInfo;
  armor?: ArmorInfo;
  food?: FoodInfo;
  /** Brenndauer in Ticks als Brennstoff (0 = kein Brennstoff). */
  fuel: number;
  /** Textur-Layer für flache Icons/Sprites (bei Blöcken die Seitenfläche). */
  icon: number;
  /** Im Kreativ-Katalog sichtbar. */
  inCatalog: boolean;
}

const items: ItemDef[] = [];
const byKey = new Map<string, ItemDef>();

// Block-Items
for (const b of BLOCKS) {
  if (b.id === 0) continue;
  const def: ItemDef = {
    id: b.id,
    key: b.key,
    name: b.name,
    kind: 'block',
    maxStack: 64,
    block: b.id,
    fuel: BLOCK_FUEL.get(b.id) ?? 0,
    icon: b.shape === Shape.Cross || b.shape === Shape.Torch ? b.faces[0] : b.faces[4],
    inCatalog: b.inCatalog,
  };
  items[b.id] = def;
  byKey.set(def.key, def);
}

let nextId = 256;
function item(key: string, name: string, kind: ItemKind, tex: TextureName, extra: Partial<ItemDef> = {}): number {
  const id = nextId++;
  const def: ItemDef = {
    id,
    key: `${NAMESPACE}:${key}`,
    name,
    kind,
    maxStack: kind === 'tool' || kind === 'armor' ? 1 : 64,
    fuel: 0,
    icon: textureLayer(tex),
    inCatalog: true,
    ...extra,
  };
  items[id] = def;
  byKey.set(def.key, def);
  return id;
}

export const STICK = item('stock', 'Stock', 'material', 'stock', { fuel: 100 });
export const COAL = item('kohle', 'Kohle', 'material', 'kohle', { fuel: 1600 });
export const IRON_INGOT = item('eisenbarren', 'Eisenbarren', 'material', 'eisenbarren');
export const LUMIT = item('lumit', 'Lumit', 'material', 'lumit');
export const APPLE = item('apfel', 'Apfel', 'food', 'apfel', { food: { hunger: 4, saturation: 2.4 } });
export const BERRIES = item('waldbeeren', 'Waldbeeren', 'food', 'waldbeeren', { food: { hunger: 2, saturation: 0.4 } });

export const TIER_NAMES = ['Holz', 'Stein', 'Eisen', 'Lumit'] as const;
const TIER_KEYS = ['holz', 'stein', 'eisen', 'lumit'] as const;
const TIER_SPEED = [2, 4, 6, 8];
const TIER_DURABILITY = [59, 131, 250, 1561];

export type ToolKey = 'spitzhacke' | 'schaufel' | 'axt' | 'schwert';
const TOOL_TYPES: ToolKey[] = ['spitzhacke', 'schaufel', 'axt', 'schwert'];
const TOOL_ATTACK: Record<ToolKey, number> = { spitzhacke: 2, schaufel: 2.5, axt: 3, schwert: 4 };

/** Werkzeug-IDs: TOOLS[typ][stufe] */
export const TOOLS = {} as Record<ToolKey, number[]>;
for (const type of TOOL_TYPES) {
  TOOLS[type] = TIER_KEYS.map((tierKey, tier) => {
    // z. B. «Holzspitzhacke», «Lumitschwert»
    return item(`${tierKey}_${type}`, capitalize(`${TIER_NAMES[tier]}${type}`), 'tool', `${tierKey}_${type}` as TextureName, {
      tool: { type, tier, speed: TIER_SPEED[tier], durability: TIER_DURABILITY[tier], attack: TOOL_ATTACK[type] + tier },
      fuel: tier === 0 ? 200 : 0,
    });
  });
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

const ARMOR_KEYS = ['helm', 'brustpanzer', 'beinschutz', 'stiefel'] as const;
const ARMOR_LABEL = ['helm', 'brustpanzer', 'beinschutz', 'stiefel'];
const ARMOR_POINTS: Record<'eisen' | 'lumit', number[]> = { eisen: [2, 6, 5, 2], lumit: [3, 8, 6, 3] };
const ARMOR_DURABILITY: Record<'eisen' | 'lumit', number[]> = { eisen: [165, 240, 225, 195], lumit: [363, 528, 495, 429] };

/** Rüstungs-IDs: ARMOR[material][slot] */
export const ARMOR = {} as Record<'eisen' | 'lumit', number[]>;
for (const mat of ['eisen', 'lumit'] as const) {
  ARMOR[mat] = ARMOR_KEYS.map((k, slot) =>
    item(`${mat}_${k}`, `${mat === 'eisen' ? 'Eisen' : 'Lumit'}${ARMOR_LABEL[slot]}`, 'armor', `${mat}_${k}` as TextureName, {
      armor: { slot: slot as ArmorSlot, points: ARMOR_POINTS[mat][slot], durability: ARMOR_DURABILITY[mat][slot] },
    }),
  );
}

export const ITEM_COUNT = nextId;
export const ITEMS: readonly (ItemDef | undefined)[] = items;

export function getItem(id: number): ItemDef | undefined {
  return items[id];
}

export function getItemByKey(key: string): ItemDef | undefined {
  return byKey.get(key.includes(':') ? key : `${NAMESPACE}:${key}`);
}

export function isValidItem(id: number): boolean {
  return Number.isInteger(id) && items[id] !== undefined;
}

export function maxStack(id: number): number {
  return items[id]?.maxStack ?? 64;
}

export function maxDurability(id: number): number {
  const d = items[id];
  return d?.tool?.durability ?? d?.armor?.durability ?? 0;
}

/** Alle Items für den Kreativ-Katalog (Blöcke zuerst). */
export const CATALOG_ITEMS: number[] = items.filter((d): d is ItemDef => !!d && d.inCatalog).map((d) => d.id);
