import { signal } from '@preact/signals';
import type { PlayerSnapshot, WindowSnapshot } from '@blockcraft/shared';

export type Screen =
  | 'boot'
  | 'menu'
  | 'worlds'
  | 'create'
  | 'settings'
  | 'keys'
  | 'loading'
  | 'playing'
  | 'paused'
  | 'inventory'
  | 'dead'
  | 'error';

export const screen = signal<Screen>('boot');
/** Bildschirm, zu dem «Zurück» aus den Einstellungen führt. */
export const settingsReturn = signal<Screen>('menu');
export const loadingText = signal('');
export const loadingProgress = signal(0);
export const errorText = signal('');
export const notice = signal<string | null>(null);

/** Spielerzustand aus der Simulation (Inventar, Leben, Hunger …). */
export const playerState = signal<PlayerSnapshot | null>(null);
/** Geöffnetes Fenster (Inventar, Werktisch, Schmelze, Truhe). */
export const windowState = signal<WindowSnapshot | null>(null);
export const deathMessage = signal('');
export const selectedSlot = signal(0);
/** Ess-Fortschritt 0–1 (für die Anzeige). */
export const eatProgress = signal(0);
export const pointerLocked = signal(false);
export const underwater = signal(false);
export const showDebug = signal(false);

export interface DebugInfo {
  fps: number;
  frameMs: number;
  x: number;
  y: number;
  z: number;
  chunkX: number;
  chunkZ: number;
  facing: string;
  biome: string;
  light: string;
  loaded: number;
  meshes: number;
  pending: number;
  calls: number;
  triangles: number;
  genMs: number;
  meshMs: number;
  workers: number;
  time: string;
  target: string;
  flying: boolean;
}
export const debugInfo = signal<DebugInfo | null>(null);
/** Wird erhöht, wenn die Texturen neu erzeugt wurden (Icons neu zeichnen). */
export const textureVersion = signal(0);

let noticeTimer: ReturnType<typeof setTimeout> | undefined;
export function showNotice(text: string, ms = 3500): void {
  notice.value = text;
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => (notice.value = null), ms);
}
