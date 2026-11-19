import { keybindings, type Action } from './keybindings';

function isTextField(t: EventTarget | null): boolean {
  if (!(t instanceof HTMLElement)) return false;
  return t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable;
}

/**
 * Sammelt Tastatur- und Mauseingaben. Mausbewegung wird nur bei aktivem
 * Pointer Lock ausgewertet.
 */
export class Input {
  private readonly down = new Set<string>();
  private readonly pressedOnce = new Set<string>();
  mouseDX = 0;
  mouseDY = 0;
  wheel = 0;
  readonly buttons = new Set<number>();
  readonly clicked = new Set<number>();
  locked = false;
  private readonly cleanup: (() => void)[] = [];

  constructor(private readonly element: HTMLElement) {
    const on = <K extends keyof DocumentEventMap>(target: Document | Window, type: K, fn: (e: DocumentEventMap[K]) => void, opts?: AddEventListenerOptions) => {
      target.addEventListener(type, fn as EventListener, opts);
      this.cleanup.push(() => target.removeEventListener(type, fn as EventListener, opts));
    };
    on(document, 'keydown', (e) => {
      // Tippen in Textfeldern (Chat, Namen, Suche) steuert nicht das Spiel
      if (isTextField(e.target)) return;
      if (e.repeat) return;
      this.down.add(e.code);
      this.pressedOnce.add(e.code);
      if (this.locked && (e.code === 'Space' || e.code === 'Tab' || e.code.startsWith('Arrow') || e.code === 'F3' || e.ctrlKey)) e.preventDefault();
    });
    on(document, 'keyup', (e) => {
      this.down.delete(e.code);
    });
    // Beim Fokus auf ein Textfeld alle gehaltenen Tasten loslassen (sonst läuft die Figur weiter)
    on(document, 'focusin', (e) => {
      if (isTextField(e.target)) this.down.clear();
    });
    on(window, 'blur', () => {
      this.down.clear();
      this.buttons.clear();
    });
    on(document, 'mousemove', (e) => {
      if (!this.locked) return;
      this.mouseDX += e.movementX;
      this.mouseDY += e.movementY;
    });
    on(document, 'mousedown', (e) => {
      if (!this.locked) return;
      this.buttons.add(e.button);
      this.clicked.add(e.button);
      e.preventDefault();
    });
    on(document, 'mouseup', (e) => {
      this.buttons.delete(e.button);
    });
    on(
      document,
      'wheel',
      (e) => {
        if (!this.locked) return;
        this.wheel += Math.sign(e.deltaY);
        e.preventDefault();
      },
      { passive: false },
    );
    on(document, 'contextmenu', (e) => {
      if (this.locked) e.preventDefault();
    });
    on(document, 'pointerlockchange', () => {
      this.locked = document.pointerLockElement === this.element;
      if (!this.locked) {
        this.buttons.clear();
        this.down.clear();
      }
    });
  }

  isDown(action: Action): boolean {
    return keybindings.value[action].some((c) => this.down.has(c));
  }

  /** Wurde die Taste seit dem letzten `endFrame` gedrückt? */
  wasPressed(action: Action): boolean {
    return keybindings.value[action].some((c) => this.pressedOnce.has(c));
  }

  isCodeDown(code: string): boolean {
    return this.down.has(code);
  }

  wasCodePressed(code: string): boolean {
    return this.pressedOnce.has(code);
  }

  endFrame(): void {
    this.pressedOnce.clear();
    this.clicked.clear();
    this.mouseDX = 0;
    this.mouseDY = 0;
    this.wheel = 0;
  }

  async lock(): Promise<boolean> {
    try {
      const r = this.element.requestPointerLock() as unknown;
      if (r instanceof Promise) await r;
      return true;
    } catch {
      return false;
    }
  }

  unlock(): void {
    if (document.pointerLockElement) document.exitPointerLock();
  }

  dispose(): void {
    for (const c of this.cleanup) c();
    this.unlock();
  }
}
