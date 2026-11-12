/**
 * Liste aller Block-Texturen. Die Reihenfolge bestimmt den Layer-Index im
 * Texture Array (Client) und wird vom Mesher (Worker) genutzt.
 * Die Pixel-Art entsteht prozedural in `textures/paint.ts`.
 */
export const TEXTURE_NAMES = [
  'stein',
  'erde',
  'gras_oben',
  'gras_seite',
  'sand',
  'kies',
  'sandstein_seite',
  'sandstein_oben',
  'urgestein',
  'eiche_rinde',
  'eiche_kern',
  'eiche_laub',
  'eiche_bretter',
  'birke_rinde',
  'birke_kern',
  'birke_laub',
  'birke_bretter',
  'wasser',
  'kohleerz',
  'eisenerz',
  'kaktus_seite',
  'kaktus_oben',
  'glas',
  'bruchstein',
  'ziegel',
  'grasbueschel',
  'sonnenkelch',
  'glutmohn',
  'duerrstrauch',
  'leuchtkristall',
  'schnee',
  'schnee_seite',
  'lehm',
  'risse_0',
  'risse_1',
  'risse_2',
  'risse_3',
] as const;

export type TextureName = (typeof TEXTURE_NAMES)[number];

const INDEX = new Map<string, number>(TEXTURE_NAMES.map((n, i) => [n, i]));

export function textureLayer(name: TextureName): number {
  const i = INDEX.get(name);
  if (i === undefined) throw new Error(`Unbekannte Textur: ${name}`);
  return i;
}

export const TEXTURE_SIZE = 16;
