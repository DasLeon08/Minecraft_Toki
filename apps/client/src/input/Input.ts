import { keybindings, type Action } from './keybindings';

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
      if (e.repeat) return;
      this.down.add(e.code);
      this.pressedOnce.add(e.code);
      if (this.locked && (e.code === 'Space' || e.code.startsWith('Arrow') || e.code === 'F3' || e.ctrlKey)) e.preventDefault();
    });
    on(document, 'keyup', (e) => {
      this.down.delete(e.code);
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
