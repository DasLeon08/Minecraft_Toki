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
  // Phase 2: Blöcke
  'werktisch_oben',
  'werktisch_seite',
  'schmelze_seite',
  'schmelze_front',
  'schmelze_front_an',
  'schmelze_oben',
  'truhe_oben',
  'truhe_seite',
  'fackel',
  'lumiterz',
  'beerenstrauch',
  'fichte_rinde',
  'fichte_kern',
  'fichte_nadeln',
  'fichte_bretter',
  'sumpf_laub',
  // Phase 2: Items
  'stock',
  'kohle',
  'eisenbarren',
  'lumit',
  'apfel',
  'waldbeeren',
  'holz_spitzhacke',
  'holz_schaufel',
  'holz_axt',
  'holz_schwert',
  'stein_spitzhacke',
  'stein_schaufel',
  'stein_axt',
  'stein_schwert',
  'eisen_spitzhacke',
  'eisen_schaufel',
  'eisen_axt',
  'eisen_schwert',
  'lumit_spitzhacke',
  'lumit_schaufel',
  'lumit_axt',
  'lumit_schwert',
  'eisen_helm',
  'eisen_brustpanzer',
  'eisen_beinschutz',
  'eisen_stiefel',
  'lumit_helm',
  'lumit_brustpanzer',
  'lumit_beinschutz',
  'lumit_stiefel',
] as const;

export type TextureName = (typeof TEXTURE_NAMES)[number];

const INDEX = new Map<string, number>(TEXTURE_NAMES.map((n, i) => [n, i]));

export function textureLayer(name: TextureName): number {
  const i = INDEX.get(name);
  if (i === undefined) throw new Error(`Unbekannte Textur: ${name}`);
  return i;
}

export const TEXTURE_SIZE = 16;
