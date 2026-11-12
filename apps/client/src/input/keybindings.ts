/** Tastenbelegung (KeyboardEvent.code). Ab Phase 2 im Menü frei belegbar. */
export const KEYBINDINGS = {
  forward: ['KeyW', 'ArrowUp'],
  back: ['KeyS', 'ArrowDown'],
  left: ['KeyA', 'ArrowLeft'],
  right: ['KeyD', 'ArrowRight'],
  jump: ['Space'],
  sneak: ['ShiftLeft', 'ShiftRight'],
  sprint: ['ControlLeft', 'ControlRight'],
  inventory: ['KeyE'],
  debug: ['F3'],
} as const;

export type Action = keyof typeof KEYBINDINGS;
