/** Zentrale Spielkonstanten. Der Spielname ist nur hier hinterlegt. */
export const GAME_NAME = 'Blockcraft';
/** Namespace-Präfix für String-IDs (z. B. `bc:stein`). */
export const NAMESPACE = 'bc';
export const GAME_VERSION = '0.1.0';

/** Kantenlänge einer Chunk-Spalte und einer Section in Blöcken. */
export const CHUNK_SIZE = 16;
export const CHUNK_SHIFT = 4;
export const CHUNK_MASK = 15;
/** Welthöhe in Blöcken (y = 0 … 255). */
export const WORLD_HEIGHT = 256;
/** Anzahl Sections (16³) pro Spalte. */
export const SECTION_COUNT = WORLD_HEIGHT / CHUNK_SIZE;
/** Blöcke pro Section. */
export const SECTION_VOLUME = CHUNK_SIZE * CHUNK_SIZE * CHUNK_SIZE;
/** Blöcke pro Spalte. */
export const COLUMN_VOLUME = SECTION_VOLUME * SECTION_COUNT;

/** Meeresspiegel: Wasser füllt alles darunter. */
export const SEA_LEVEL = 62;

/** Feste Simulationsrate (Ticks pro Sekunde). */
export const TICKS_PER_SECOND = 20;
export const TICK_SECONDS = 1 / TICKS_PER_SECOND;

/** Maximale Lichtstufe. */
export const MAX_LIGHT = 15;

/** Reichweite für Abbauen/Platzieren in Blöcken. */
export const REACH_SURVIVAL = 4.5;
export const REACH_CREATIVE = 5;

/** Version des Speicherformats (für Migrationen). */
export const SAVE_FORMAT_VERSION = 1;
