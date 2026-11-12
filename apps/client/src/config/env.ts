import { parseEnv, type EnvSchema } from '@blockcraft/shared';

const schema = {
  VITE_SERVER_URL: { type: 'string', default: '' },
  VITE_DEFAULT_SEED: { type: 'string', default: '' },
  VITE_DEBUG: { type: 'bool', default: false },
  VITE_DEFAULT_RENDER_DISTANCE: { type: 'int', default: 8, min: 2, max: 32 },
  VITE_MAX_RENDER_DISTANCE: { type: 'int', default: 16, min: 2, max: 32 },
  VITE_DAY_LENGTH_SECONDS: { type: 'int', default: 1200, min: 60, max: 86400 },
  VITE_WORKER_COUNT: { type: 'int', default: 0, min: 0, max: 16 },
} satisfies EnvSchema;

/** Validierte Client-Konfiguration (aus VITE_*-Variablen, beim Build eingebacken). */
export const env = parseEnv(schema, import.meta.env as Record<string, string | undefined>);

const params = new URLSearchParams(location.search);

/** Debug-/Test-Modus: per Env oder `?debug=1` bzw. `?test=1`. */
export const debugEnabled = env.VITE_DEBUG || params.has('debug') || params.has('test');
export const testMode = params.has('test');
export const benchMode = params.has('bench');

/** Basis-URL des Spielservers (leer = gleicher Host). */
export function serverUrl(path: string): string {
  const base = env.VITE_SERVER_URL.replace(/\/$/, '');
  if (base) return base + path;
  return new URL(path.replace(/^\//, ''), location.href.replace(/[^/]*$/, '')).toString();
}

export function workerCount(): number {
  if (env.VITE_WORKER_COUNT > 0) return env.VITE_WORKER_COUNT;
  const cores = navigator.hardwareConcurrency || 4;
  return Math.max(1, Math.min(4, cores - 1));
}
