/**
 * Datengetriebene Block-Registry. Numerische IDs sind Laufzeit-IDs
 * (werden so auch gespeichert), String-IDs haben den Namespace `bc:`.
 */
import { NAMESPACE } from '../constants';
import { textureLayer, type TextureName } from './textures';

export enum RenderLayer {
  None = 0,
  Opaque = 1,
  Cutout = 2,
  Translucent = 3,
}

export enum Shape {
  None = 0,
  Cube = 1,
  /** Zwei gekreuzte Flächen (Pflanzen). */
  Cross = 2,
}

/** Flächenreihenfolge: +X, -X, +Y, -Y, +Z, -Z. */
export const FACE_PX = 0;
export const FACE_NX = 1;
export const FACE_PY = 2;
export const FACE_NY = 3;
export const FACE_PZ = 4;
export const FACE_NZ = 5;

export type ToolType = 'none' | 'spitzhacke' | 'schaufel' | 'axt';

export interface BlockDef {
  id: number;
  key: string;
  /** Anzeigename (Deutsch). */
  name: string;
  shape: Shape;
  layer: RenderLayer;
  /** Hat eine Kollisionsbox. */
  solid: boolean;
  /** Voller, lichtundurchlässiger Würfel (verdeckt Nachbarflächen, blockiert Licht). */
  opaque: boolean;
  /** Zusätzliche Lichtabschwächung beim Durchgang (0 = keine). */
  lightFilter: number;
  /** Eigenes Licht (0–15). */
  lightEmission: number;
  /** Flächen zwischen zwei gleichen Blöcken weglassen (Laub, Glas, Wasser). */
  cullSame: boolean;
  /** Kann ohne Abbauen überschrieben werden (Luft, Wasser, Gras). */
  replaceable: boolean;
  /** Mit Fadenkreuz anvisierbar. */
  selectable: boolean;
  liquid: boolean;
  /** Härte (Abbauzeit-Basis, ab Phase 2 genutzt). */
  hardness: number;
  tool: ToolType;
  /** Textur-Layer pro Fläche (+X, -X, +Y, -Y, +Z, -Z). */
  faces: [number, number, number, number, number, number];
  /** Im Creative-Katalog sichtbar. */
  inCatalog: boolean;
  /** Farbe für Partikel/Karten (RGB). */
  mapColor: number;
}

interface BlockInput {
  key: string;
  name: string;
  shape?: Shape;
  layer?: RenderLayer;
  solid?: boolean;
  opaque?: boolean;
  lightFilter?: number;
  lightEmission?: number;
  cullSame?: boolean;
  replaceable?: boolean;
  selectable?: boolean;
  liquid?: boolean;
  hardness?: number;
  tool?: ToolType;
  /** Eine Textur für alle Flächen … */
  all?: TextureName;
  /** … oder getrennt für oben / unten / Seiten. */
  top?: TextureName;
  bottom?: TextureName;
  side?: TextureName;
  inCatalog?: boolean;
  mapColor?: number;
}

const defs: BlockDef[] = [];

function define(id: number, input: BlockInput): number {
  if (defs[id]) throw new Error(`Block-ID ${id} doppelt vergeben`);
  const shape = input.shape ?? Shape.Cube;
  const all = input.all;
  const top = textureLayer((input.top ?? all ?? 'stein') as TextureName);
  const bottom = textureLayer((input.bottom ?? all ?? input.top ?? 'stein') as TextureName);
  const side = textureLayer((input.side ?? all ?? 'stein') as TextureName);
  const layer = input.layer ?? (shape === Shape.None ? RenderLayer.None : RenderLayer.Opaque);
  defs[id] = {
    id,
    key: `${NAMESPACE}:${input.key}`,
    name: input.name,
    shape,
    layer,
    solid: input.solid ?? shape === Shape.Cube,
    opaque: input.opaque ?? (shape === Shape.Cube && layer === RenderLayer.Opaque),
    lightFilter: input.lightFilter ?? 0,
    lightEmission: input.lightEmission ?? 0,
    cullSame: input.cullSame ?? false,
    replaceable: input.replaceable ?? false,
    selectable: input.selectable ?? shape !== Shape.None,
    liquid: input.liquid ?? false,
    hardness: input.hardness ?? 1,
    tool: input.tool ?? 'none',
    faces: [side, side, top, bottom, side, side],
    inCatalog: input.inCatalog ?? shape !== Shape.None,
    mapColor: input.mapColor ?? 0x888888,
  };
  return id;
}

export const AIR = define(0, {
  key: 'luft',
  name: 'Luft',
  shape: Shape.None,
  solid: false,
  opaque: false,
  replaceable: true,
  selectable: false,
  inCatalog: false,
});
export const STONE = define(1, { key: 'stein', name: 'Stein', all: 'stein', hardness: 1.5, tool: 'spitzhacke', mapColor: 0x7d7a86 });
export const DIRT = define(2, { key: 'erde', name: 'Erde', all: 'erde', hardness: 0.5, tool: 'schaufel', mapColor: 0x8a5a3b });
export const GRASS = define(3, {
  key: 'grasboden',
  name: 'Grasboden',
  top: 'gras_oben',
  bottom: 'erde',
  side: 'gras_seite',
  hardness: 0.6,
  tool: 'schaufel',
  mapColor: 0x5fae3f,
});
export const SAND = define(4, { key: 'sand', name: 'Sand', all: 'sand', hardness: 0.5, tool: 'schaufel', mapColor: 0xe6cf8a });
export const GRAVEL = define(5, { key: 'kies', name: 'Kies', all: 'kies', hardness: 0.6, tool: 'schaufel', mapColor: 0x8f8580 });
export const SANDSTONE = define(6, {
  key: 'sandstein',
  name: 'Sandstein',
  top: 'sandstein_oben',
  side: 'sandstein_seite',
  hardness: 0.8,
  tool: 'spitzhacke',
  mapColor: 0xd9bd7a,
});
export const BEDROCK = define(7, { key: 'urgestein', name: 'Urgestein', all: 'urgestein', hardness: -1, mapColor: 0x3b3640 });
export const OAK_LOG = define(8, {
  key: 'eichenstamm',
  name: 'Eichenstamm',
  top: 'eiche_kern',
  side: 'eiche_rinde',
  hardness: 2,
  tool: 'axt',
  mapColor: 0x6b4a2b,
});
export const OAK_LEAVES = define(9, {
  key: 'eichenlaub',
  name: 'Eichenlaub',
  all: 'eiche_laub',
  layer: RenderLayer.Cutout,
  opaque: false,
  lightFilter: 1,
  cullSame: true,
  hardness: 0.2,
  mapColor: 0x3f8a2e,
});
export const OAK_PLANKS = define(10, { key: 'eichenbretter', name: 'Eichenbretter', all: 'eiche_bretter', hardness: 2, tool: 'axt', mapColor: 0xb0814d });
export const BIRCH_LOG = define(11, {
  key: 'birkenstamm',
  name: 'Birkenstamm',
  top: 'birke_kern',
  side: 'birke_rinde',
  hardness: 2,
  tool: 'axt',
  mapColor: 0xe0dccb,
});
export const BIRCH_LEAVES = define(12, {
  key: 'birkenlaub',
  name: 'Birkenlaub',
  all: 'birke_laub',
  layer: RenderLayer.Cutout,
  opaque: false,
  lightFilter: 1,
  cullSame: true,
  hardness: 0.2,
  mapColor: 0x7fb04a,
});
export const WATER = define(13, {
  key: 'wasser',
  name: 'Wasser',
  all: 'wasser',
  layer: RenderLayer.Translucent,
  solid: false,
  opaque: false,
  lightFilter: 2,
  cullSame: true,
  replaceable: true,
  selectable: false,
  liquid: true,
  hardness: -1,
  mapColor: 0x2f6fd0,
});
export const COAL_ORE = define(14, { key: 'kohleerz', name: 'Kohleerz', all: 'kohleerz', hardness: 3, tool: 'spitzhacke', mapColor: 0x55525a });
export const IRON_ORE = define(15, { key: 'eisenerz', name: 'Eisenerz', all: 'eisenerz', hardness: 3, tool: 'spitzhacke', mapColor: 0xa08a7a });
export const CACTUS = define(16, {
  key: 'kaktus',
  name: 'Kaktus',
  top: 'kaktus_oben',
  side: 'kaktus_seite',
  hardness: 0.4,
  mapColor: 0x3d8f3a,
});
export const GLASS = define(17, {
  key: 'glas',
  name: 'Glas',
  all: 'glas',
  layer: RenderLayer.Cutout,
  opaque: false,
  cullSame: true,
  hardness: 0.3,
  mapColor: 0xcfeaf0,
});
export const COBBLESTONE = define(18, { key: 'bruchstein', name: 'Bruchstein', all: 'bruchstein', hardness: 2, tool: 'spitzhacke', mapColor: 0x76727d });
export const BRICKS = define(19, { key: 'ziegel', name: 'Ziegel', all: 'ziegel', hardness: 2, tool: 'spitzhacke', mapColor: 0xa4523f });
export const TALL_GRASS = define(20, {
  key: 'grasbueschel',
  name: 'Grasbüschel',
  all: 'grasbueschel',
  shape: Shape.Cross,
  layer: RenderLayer.Cutout,
  solid: false,
  opaque: false,
  replaceable: true,
  hardness: 0,
  mapColor: 0x5fae3f,
});
export const SUNCUP = define(21, {
  key: 'sonnenkelch',
  name: 'Sonnenkelch',
  all: 'sonnenkelch',
  shape: Shape.Cross,
  layer: RenderLayer.Cutout,
  solid: false,
  opaque: false,
  hardness: 0,
  mapColor: 0xf2c53d,
});
export const EMBER_POPPY = define(22, {
  key: 'glutmohn',
  name: 'Glutmohn',
  all: 'glutmohn',
  shape: Shape.Cross,
  layer: RenderLayer.Cutout,
  solid: false,
  opaque: false,
  hardness: 0,
  mapColor: 0xd8432f,
});
export const DRY_SHRUB = define(23, {
  key: 'duerrstrauch',
  name: 'Dürrstrauch',
  all: 'duerrstrauch',
  shape: Shape.Cross,
  layer: RenderLayer.Cutout,
  solid: false,
  opaque: false,
  replaceable: true,
  hardness: 0,
  mapColor: 0x9a7a4a,
});
export const LIGHT_CRYSTAL = define(24, {
  key: 'leuchtkristall',
  name: 'Leuchtkristall',
  all: 'leuchtkristall',
  lightEmission: 15,
  hardness: 0.3,
  mapColor: 0xffe7a0,
});
export const SNOW = define(25, { key: 'schnee', name: 'Schnee', all: 'schnee', hardness: 0.2, tool: 'schaufel', mapColor: 0xf4f8ff });
export const SNOWY_GRASS = define(26, {
  key: 'schneeboden',
  name: 'Verschneiter Boden',
  top: 'schnee',
  bottom: 'erde',
  side: 'schnee_seite',
  hardness: 0.6,
  tool: 'schaufel',
  mapColor: 0xe8eef5,
});
export const CLAY = define(27, { key: 'lehm', name: 'Lehm', all: 'lehm', hardness: 0.6, tool: 'schaufel', mapColor: 0xa7a9b8 });
export const BIRCH_PLANKS = define(28, { key: 'birkenbretter', name: 'Birkenbretter', all: 'birke_bretter', hardness: 2, tool: 'axt', mapColor: 0xd8c690 });

export const BLOCK_COUNT = defs.length;

/** Alle Blockdefinitionen nach ID. */
export const BLOCKS: readonly BlockDef[] = defs;

export function getBlock(id: number): BlockDef {
  return defs[id] ?? defs[AIR];
}

const BY_KEY = new Map(defs.map((d) => [d.key, d]));
export function getBlockByKey(key: string): BlockDef | undefined {
  return BY_KEY.get(key.includes(':') ? key : `${NAMESPACE}:${key}`);
}

// Schnelle Lookup-Tabellen (für Mesher, Licht und Physik in heissen Schleifen).
export const IS_OPAQUE = new Uint8Array(256);
export const IS_SOLID = new Uint8Array(256);
export const LIGHT_FILTER = new Uint8Array(256);
export const LIGHT_EMISSION = new Uint8Array(256);
export const SHAPE = new Uint8Array(256);
export const LAYER = new Uint8Array(256);
export const CULL_SAME = new Uint8Array(256);
for (const d of defs) {
  IS_OPAQUE[d.id] = d.opaque ? 1 : 0;
  IS_SOLID[d.id] = d.solid ? 1 : 0;
  LIGHT_FILTER[d.id] = d.opaque ? 15 : d.lightFilter;
  LIGHT_EMISSION[d.id] = d.lightEmission;
  SHAPE[d.id] = d.shape;
  LAYER[d.id] = d.layer;
  CULL_SAME[d.id] = d.cullSame ? 1 : 0;
}

/** Blöcke, die im Creative-Katalog und in der Standard-Hotbar auftauchen. */
export const CATALOG_BLOCKS: number[] = defs.filter((d) => d.inCatalog).map((d) => d.id);

export const DEFAULT_HOTBAR: number[] = [GRASS, DIRT, STONE, COBBLESTONE, OAK_LOG, OAK_PLANKS, GLASS, BRICKS, LIGHT_CRYSTAL];
