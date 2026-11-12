/**
 * Kleiner, abhängigkeitsfreier Env-Validator, der in Client und Server genutzt wird.
 * Jede Variable hat einen Typ, einen Standardwert und optional Grenzen.
 */

export type EnvSource = Record<string, string | undefined>;

interface BaseSpec<T> {
  /** Standardwert, wenn die Variable fehlt oder leer ist. */
  default: T;
  description?: string;
}

export interface IntSpec extends BaseSpec<number> {
  type: 'int';
  min?: number;
  max?: number;
}
export interface BoolSpec extends BaseSpec<boolean> {
  type: 'bool';
}
export interface StringSpec extends BaseSpec<string> {
  type: 'string';
  /** Erlaubte Werte (Enum). */
  oneOf?: readonly string[];
}
export interface ListSpec extends BaseSpec<string[]> {
  type: 'list';
}

export type EnvSpec = IntSpec | BoolSpec | StringSpec | ListSpec;
export type EnvSchema = Record<string, EnvSpec>;

type ValueOf<S extends EnvSpec> = S extends IntSpec
  ? number
  : S extends BoolSpec
    ? boolean
    : S extends ListSpec
      ? string[]
      : string;

export type EnvResult<S extends EnvSchema> = { [K in keyof S]: ValueOf<S[K]> };

export class EnvError extends Error {
  constructor(public readonly problems: string[]) {
    super(`Ungültige Konfiguration:\n  - ${problems.join('\n  - ')}`);
    this.name = 'EnvError';
  }
}

/**
 * Liest und validiert Variablen gemäss Schema.
 * Wirft {@link EnvError} mit allen Problemen auf einmal.
 */
export function parseEnv<S extends EnvSchema>(schema: S, source: EnvSource): EnvResult<S> {
  const out: Record<string, unknown> = {};
  const problems: string[] = [];

  for (const [key, spec] of Object.entries(schema)) {
    const raw = source[key];
    const trimmed = raw === undefined ? '' : String(raw).trim();
    if (trimmed === '') {
      out[key] = spec.default;
      continue;
    }
    switch (spec.type) {
      case 'int': {
        if (!/^-?\d+$/.test(trimmed)) {
          problems.push(`${key}: "${trimmed}" ist keine ganze Zahl`);
          break;
        }
        const n = Number.parseInt(trimmed, 10);
        if (spec.min !== undefined && n < spec.min) problems.push(`${key}: ${n} < Minimum ${spec.min}`);
        else if (spec.max !== undefined && n > spec.max) problems.push(`${key}: ${n} > Maximum ${spec.max}`);
        else out[key] = n;
        break;
      }
      case 'bool': {
        const v = trimmed.toLowerCase();
        if (['1', 'true', 'yes', 'on'].includes(v)) out[key] = true;
        else if (['0', 'false', 'no', 'off'].includes(v)) out[key] = false;
        else problems.push(`${key}: "${trimmed}" ist kein Wahrheitswert (true/false)`);
        break;
      }
      case 'string': {
        if (spec.oneOf && !spec.oneOf.includes(trimmed)) {
          problems.push(`${key}: "${trimmed}" ist nicht erlaubt (${spec.oneOf.join(', ')})`);
        } else out[key] = trimmed;
        break;
      }
      case 'list': {
        out[key] = trimmed
          .split(',')
          .map((s) => s.trim())
          .filter((s) => s.length > 0);
        break;
      }
    }
  }

  if (problems.length > 0) throw new EnvError(problems);
  return out as EnvResult<S>;
}
