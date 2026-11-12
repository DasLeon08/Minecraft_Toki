/** Biome der Oberwelt (Phase 1). */
export enum Biome {
  Ocean = 0,
  Beach = 1,
  Plains = 2,
  Forest = 3,
  Desert = 4,
  Mountains = 5,
  Snowfields = 6,
}

export const BIOME_NAMES: Record<Biome, string> = {
  [Biome.Ocean]: 'Ozean',
  [Biome.Beach]: 'Strand',
  [Biome.Plains]: 'Ebene',
  [Biome.Forest]: 'Wald',
  [Biome.Desert]: 'Wüste',
  [Biome.Mountains]: 'Gebirge',
  [Biome.Snowfields]: 'Schneefelder',
};
