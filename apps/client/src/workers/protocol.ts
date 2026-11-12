import type { SectionMeshData } from '@blockcraft/shared';

/** Nachrichten an den Welt-Worker. */
export type WorkerRequest =
  | { op: 'init'; seed: number }
  | { op: 'gen'; cx: number; cz: number }
  | { op: 'light'; cx: number; cz: number; blocks: Uint16Array }
  | { op: 'mesh'; key: number; blocks: Uint16Array; light: Uint8Array };

export type WorkerResponse =
  | { op: 'init' }
  | { op: 'column'; cx: number; cz: number; blocks: Uint16Array; light: Uint8Array; ms: number }
  | { op: 'mesh'; key: number; data: SectionMeshData; blocks: Uint16Array; light: Uint8Array; ms: number };
