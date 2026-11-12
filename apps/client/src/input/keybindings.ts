import { signal } from '@preact/signals';

/** Standard-Tastenbelegung (KeyboardEvent.code). Pro Aktion bis zu zwei Tasten. */
export const DEFAULT_KEYBINDINGS = {
  forward: ['KeyW', 'ArrowUp'],
  back: ['KeyS', 'ArrowDown'],
  left: ['KeyA', 'ArrowLeft'],
  right: ['KeyD', 'ArrowRight'],
  jump: ['Space'],
  sneak: ['ShiftLeft', 'ShiftRight'],
  sprint: ['ControlLeft', 'ControlRight'],
  inventory: ['KeyE'],
  drop: ['KeyQ'],
  debug: ['F3'],
} satisfies Record<string, string[]>;

export type Action = keyof typeof DEFAULT_KEYBINDINGS;
export type Keybindings = Record<Action, string[]>;

export const ACTION_LABELS: Record<Action, string> = {
  forward: 'Vorwärts',
  back: 'Rückwärts',
  left: 'Links',
  right: 'Rechts',
  jump: 'Springen / Hochfliegen',
  sneak: 'Schleichen / Sinken',
  sprint: 'Sprinten',
  inventory: 'Inventar',
  drop: 'Item fallen lassen',
  debug: 'Debug-Anzeige',
};

const KEY = 'bc.keys.v1';

function load(): Keybindings {
  const base = structuredClone(DEFAULT_KEYBINDINGS) as Keybindings;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Keybindings>;
      for (const a of Object.keys(base) as Action[]) if (Array.isArray(parsed[a])) base[a] = parsed[a]!.filter((c) => typeof c === 'string').slice(0, 2);
    }
  } catch {
    // ignorieren
  }
  return base;
}

/** Aktuelle Tastenbelegung (reaktiv). */
export const keybindings = signal<Keybindings>(load());

export function setBinding(action: Action, slot: 0 | 1, code: string | null): void {
  const kb = structuredClone(keybindings.value);
  const list = [...kb[action]];
  if (code === null) list.splice(slot, 1);
  else list[slot] = code;
  kb[action] = list.filter(Boolean);
  keybindings.value = kb;
  try {
    localStorage.setItem(KEY, JSON.stringify(kb));
  } catch {
    // ignorieren
  }
}

export function resetBindings(): void {
  keybindings.value = structuredClone(DEFAULT_KEYBINDINGS) as Keybindings;
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignorieren
  }
}

/** Aktionen, die eine Taste mehrfach belegen (Konflikte). */
export function conflicts(kb: Keybindings): Set<string> {
  const seen = new Map<string, Action>();
  const out = new Set<string>();
  for (const a of Object.keys(kb) as Action[])
    for (const c of kb[a]) {
      if (seen.has(c) && seen.get(c) !== a) out.add(c);
      seen.set(c, a);
    }
  return out;
}

/** Lesbarer Tastenname. */
export function keyLabel(code: string): string {
  if (code.startsWith('Key')) return code.slice(3);
  if (code.startsWith('Digit')) return code.slice(5);
  const map: Record<string, string> = {
    Space: 'Leertaste',
    ShiftLeft: 'Shift links',
    ShiftRight: 'Shift rechts',
    ControlLeft: 'Strg links',
    ControlRight: 'Strg rechts',
    AltLeft: 'Alt',
    ArrowUp: '↑',
    ArrowDown: '↓',
    ArrowLeft: '←',
    ArrowRight: '→',
    Tab: 'Tab',
  };
  return map[code] ?? code;
}
