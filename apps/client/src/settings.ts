import { signal } from '@preact/signals';
import type { PixelStyle } from '@blockcraft/shared';
import { env } from './config/env';

export interface Settings {
  renderDistance: number;
  fov: number;
  /** Maus-Sensitivität in Prozent (100 = Standard). */
  sensitivity: number;
  invertY: boolean;
  showFps: boolean;
  /** Auflösungsfaktor (0.5–1). */
  renderScale: number;
  /** Texturstil: 1 = fein, 2 = pixelig, 4 = sehr pixelig. */
  textureStyle: PixelStyle;
}

const KEY = 'bc.settings.v1';

export const DEFAULT_SETTINGS: Settings = {
  renderDistance: Math.min(env.VITE_DEFAULT_RENDER_DISTANCE, env.VITE_MAX_RENDER_DISTANCE),
  fov: 75,
  sensitivity: 100,
  invertY: false,
  showFps: false,
  renderScale: 1,
  textureStyle: 2,
};

function load(): Settings {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const s = { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<Settings>) };
      s.renderDistance = Math.max(2, Math.min(env.VITE_MAX_RENDER_DISTANCE, Math.round(s.renderDistance)));
      s.fov = Math.max(50, Math.min(110, s.fov));
      s.sensitivity = Math.max(10, Math.min(300, s.sensitivity));
      s.renderScale = Math.max(0.5, Math.min(1, s.renderScale));
      if (![1, 2, 4].includes(s.textureStyle)) s.textureStyle = 2;
      return s;
    }
  } catch {
    // Speicher nicht verfügbar (privater Modus, iframe-Sandbox): Standardwerte nutzen
  }
  return { ...DEFAULT_SETTINGS };
}

export const settings = signal<Settings>(load());

export function updateSettings(patch: Partial<Settings>): void {
  settings.value = { ...settings.value, ...patch };
  try {
    localStorage.setItem(KEY, JSON.stringify(settings.value));
  } catch {
    // ignorieren
  }
}
