/**
 * Inventare, Container und Fenster-Klicklogik (autoritativ in der Simulation).
 */
import { getItem, maxStack, type ArmorSlot } from '../registry/items';

export interface ItemStack {
  id: number;
  count: number;
  /** Abnutzung (nur Werkzeuge/Rüstung). */
  damage?: number;
}

export type Slot = ItemStack | null;

export function cloneStack(s: Slot): Slot {
  return s ? { ...s } : null;
}

export function sameItem(a: Slot, b: Slot): boolean {
  return !!a && !!b && a.id === b.id && (a.damage ?? 0) === (b.damage ?? 0);
}

export function stackLimit(s: ItemStack): number {
  return maxStack(s.id);
}

export class Container {
  readonly slots: Slot[];
  constructor(size: number) {
    this.slots = new Array<Slot>(size).fill(null);
  }

  get size(): number {
    return this.slots.length;
  }

  toJSON(): Slot[] {
    return this.slots.map(cloneStack);
  }

  load(data: Slot[] | undefined): void {
    for (let i = 0; i < this.slots.length; i++) {
      const s = data?.[i];
      this.slots[i] = s && getItem(s.id) && s.count > 0 ? { id: s.id, count: Math.min(s.count, maxStack(s.id)), damage: s.damage } : null;
    }
  }

  isEmpty(): boolean {
    return this.slots.every((s) => s === null);
  }
}

/** Spielerinventar: 36 Plätze (0–8 = Hotbar) + 4 Rüstungsplätze. */
export class PlayerInventory {
  readonly main = new Container(36);
  readonly armor = new Container(4);

  /** Legt Items ab (erst passende Stapel, dann leere Plätze; Hotbar zuerst). Gibt den Rest zurück. */
  add(stack: ItemStack): ItemStack | null {
    return addToSlots(this.main.slots, stack, HOTBAR_FIRST);
  }

  count(id: number): number {
    let n = 0;
    for (const s of this.main.slots) if (s && s.id === id) n += s.count;
    return n;
  }

  armorPoints(): number {
    let p = 0;
    for (const s of this.armor.slots) if (s) p += getItem(s.id)?.armor?.points ?? 0;
    return p;
  }
}

const HOTBAR_FIRST: number[] = [...Array(36).keys()];

/** Fügt `stack` in `slots` ein (Reihenfolge `order`), gibt den Rest zurück (oder null). */
export function addToSlots(slots: Slot[], stack: ItemStack, order: number[] = [...slots.keys()]): ItemStack | null {
  let rest = stack.count;
  const limit = stackLimit(stack);
  for (const i of order) {
    const s = slots[i];
    if (s && sameItem(s, stack) && s.count < limit) {
      const n = Math.min(rest, limit - s.count);
      s.count += n;
      rest -= n;
      if (rest === 0) return null;
    }
  }
  for (const i of order) {
    if (slots[i] === null) {
      const n = Math.min(rest, limit);
      slots[i] = { id: stack.id, count: n, damage: stack.damage };
      rest -= n;
      if (rest === 0) return null;
    }
  }
  return { ...stack, count: rest };
}

// ---------------------------------------------------------------------------
// Fenster
// ---------------------------------------------------------------------------

export type SlotKind = 'normal' | 'output' | 'armor' | 'fuel' | 'input';

export interface SlotRef {
  container: Container;
  index: number;
  kind: SlotKind;
  /** Nur für Rüstungsplätze. */
  armorSlot?: ArmorSlot;
  /** Gruppe für Shift-Klick-Ziele. */
  group: 'player' | 'hotbar' | 'other';
}

export type WindowKind = 'inventory' | 'crafting' | 'furnace' | 'chest';

/** Ein geöffnetes Fenster: geordnete Liste von Slot-Verweisen. */
export class Window {
  readonly refs: SlotRef[] = [];
  /** Wird nach jeder Änderung aufgerufen (z. B. Crafting-Ergebnis neu berechnen). */
  onChange: (() => void) | null = null;
  /** Wird beim Entnehmen aus einem Ausgabeplatz aufgerufen (Zutaten verbrauchen). Gibt false zurück, wenn nichts entnommen werden kann. */
  onTakeOutput: ((ref: SlotRef) => void) | null = null;

  constructor(
    readonly kind: WindowKind,
    readonly id: number,
  ) {}

  add(container: Container, index: number, kind: SlotKind, group: SlotRef['group'], armorSlot?: ArmorSlot): void {
    this.refs.push({ container, index, kind, group, armorSlot });
  }

  /** Spielerinventar anhängen: zuerst Hauptinventar (9–35), dann Hotbar (0–8). */
  addPlayer(inv: PlayerInventory): void {
    for (let i = 9; i < 36; i++) this.add(inv.main, i, 'normal', 'player');
    for (let i = 0; i < 9; i++) this.add(inv.main, i, 'normal', 'hotbar');
  }

  get(i: number): Slot {
    const r = this.refs[i];
    return r ? r.container.slots[r.index] : null;
  }

  set(i: number, s: Slot): void {
    const r = this.refs[i];
    if (r) r.container.slots[r.index] = s && s.count > 0 ? s : null;
  }

  snapshot(): Slot[] {
    return this.refs.map((r) => cloneStack(r.container.slots[r.index]));
  }
}

export function accepts(ref: SlotRef, stack: ItemStack): boolean {
  switch (ref.kind) {
    case 'output':
      return false;
    case 'armor':
      return getItem(stack.id)?.armor?.slot === ref.armorSlot;
    case 'fuel':
      return (getItem(stack.id)?.fuel ?? 0) > 0;
    default:
      return true;
  }
}

function slotLimit(ref: SlotRef, stack: ItemStack): number {
  return ref.kind === 'armor' ? 1 : stackLimit(stack);
}

/** Cursor-Halter (das Item «an der Maus»). */
export interface CursorHolder {
  cursor: Slot;
}

/**
 * Klick auf einen Fensterplatz.
 * button 0 = links, 1 = rechts; shift = Schnellverschieben.
 */
export function clickWindow(win: Window, holder: CursorHolder, index: number, button: 0 | 1, shift: boolean): void {
  const ref = win.refs[index];
  if (!ref) return;
  if (ref.kind === 'output') {
    takeOutput(win, holder, ref, index, shift);
    win.onChange?.();
    return;
  }
  if (shift) {
    quickMove(win, index);
    win.onChange?.();
    return;
  }
  const slot = win.get(index);
  const cur = holder.cursor;
  if (button === 0) {
    if (!cur) {
      holder.cursor = slot;
      win.set(index, null);
    } else if (!slot) {
      if (accepts(ref, cur)) {
        const n = Math.min(cur.count, slotLimit(ref, cur));
        win.set(index, { ...cur, count: n });
        cur.count -= n;
        holder.cursor = cur.count > 0 ? cur : null;
      }
    } else if (sameItem(slot, cur)) {
      const n = Math.min(cur.count, slotLimit(ref, slot) - slot.count);
      slot.count += n;
      cur.count -= n;
      holder.cursor = cur.count > 0 ? cur : null;
    } else if (accepts(ref, cur) && cur.count <= slotLimit(ref, cur)) {
      win.set(index, cur);
      holder.cursor = slot;
    }
  } else {
    if (!cur) {
      if (slot) {
        const take = Math.ceil(slot.count / 2);
        holder.cursor = { ...slot, count: take };
        slot.count -= take;
        win.set(index, slot.count > 0 ? slot : null);
      }
    } else if (!slot) {
      if (accepts(ref, cur)) {
        win.set(index, { ...cur, count: 1 });
        cur.count -= 1;
        holder.cursor = cur.count > 0 ? cur : null;
      }
    } else if (sameItem(slot, cur)) {
      if (slot.count < slotLimit(ref, slot)) {
        slot.count += 1;
        cur.count -= 1;
        holder.cursor = cur.count > 0 ? cur : null;
      }
    } else if (accepts(ref, cur) && cur.count <= slotLimit(ref, cur)) {
      win.set(index, cur);
      holder.cursor = slot;
    }
  }
  win.onChange?.();
}

function takeOutput(win: Window, holder: CursorHolder, ref: SlotRef, index: number, shift: boolean): void {
  const out = win.get(index);
  if (!out) return;
  if (shift) {
    // So oft wie möglich herstellen und ins Spielerinventar legen
    for (let guard = 0; guard < 64; guard++) {
      const o = win.get(index);
      if (!o) break;
      const targets = playerTargets(win);
      if (!canFit(win, targets, o)) break;
      insertInto(win, targets, { ...o });
      if (win.onTakeOutput) win.onTakeOutput(ref);
      else win.set(index, null);
      win.onChange?.();
      if (!win.onTakeOutput) break;
    }
    return;
  }
  const cur = holder.cursor;
  if (cur && (!sameItem(cur, out) || cur.count + out.count > stackLimit(cur))) return;
  holder.cursor = cur ? { ...cur, count: cur.count + out.count } : { ...out };
  if (win.onTakeOutput) win.onTakeOutput(ref);
  else win.set(index, null);
}

function canFit(win: Window, targets: number[], stack: ItemStack): boolean {
  let rest = stack.count;
  for (const i of targets) {
    const s = win.get(i);
    const ref = win.refs[i];
    if (!accepts(ref, stack)) continue;
    if (!s) rest -= slotLimit(ref, stack);
    else if (sameItem(s, stack)) rest -= slotLimit(ref, s) - s.count;
    if (rest <= 0) return true;
  }
  return false;
}

/** Verteilt `stack` auf die Zielplätze, gibt die Restmenge zurück. */
function insertInto(win: Window, targets: number[], stack: ItemStack): number {
  let rest = stack.count;
  for (const i of targets) {
    const s = win.get(i);
    const ref = win.refs[i];
    if (s && sameItem(s, stack) && accepts(ref, stack)) {
      const n = Math.min(rest, slotLimit(ref, s) - s.count);
      if (n > 0) {
        s.count += n;
        rest -= n;
      }
      if (rest === 0) return 0;
    }
  }
  for (const i of targets) {
    const ref = win.refs[i];
    if (!win.get(i) && accepts(ref, stack)) {
      const n = Math.min(rest, slotLimit(ref, stack));
      win.set(i, { ...stack, count: n });
      rest -= n;
      if (rest === 0) return 0;
    }
  }
  return rest;
}

/** Zielplätze im Spielerinventar: Hotbar zuerst, dann Hauptinventar. */
function playerTargets(win: Window): number[] {
  const all = win.refs.map((_r, i) => i);
  return [...all.filter((i) => win.refs[i].group === 'hotbar'), ...all.filter((i) => win.refs[i].group === 'player')];
}

/** Shift-Klick: Platz in den «anderen» Bereich verschieben. */
function quickMove(win: Window, index: number): void {
  const ref = win.refs[index];
  const stack = win.get(index);
  if (!stack) return;
  const all = win.refs.map((_r, i) => i);
  let targets: number[];
  if (ref.group === 'other' || ref.kind === 'armor') {
    // Aus Container/Rüstung/Raster → Spielerinventar (Hotbar zuerst)
    targets = playerTargets(win);
  } else {
    const def = getItem(stack.id);
    const otherSlots = all.filter((i) => win.refs[i].group === 'other' && win.refs[i].kind !== 'output');
    const armorSlots = all.filter((i) => win.refs[i].kind === 'armor' && def?.armor?.slot === win.refs[i].armorSlot);
    if (armorSlots.length > 0 && !win.get(armorSlots[0])) targets = armorSlots;
    else if (win.kind === 'furnace' || win.kind === 'chest') {
      // Brennstoff zuerst in den Brennstoffplatz, sonst in den Eingabeplatz
      const fuel = otherSlots.filter((i) => win.refs[i].kind === 'fuel' && accepts(win.refs[i], stack));
      targets = win.kind === 'furnace' && fuel.length && (def?.fuel ?? 0) > 0 ? fuel : otherSlots.filter((i) => win.refs[i].kind !== 'fuel');
    } else {
      // Inventar/Werktisch: zwischen Hotbar und Hauptinventar wechseln
      const toGroup = ref.group === 'hotbar' ? 'player' : 'hotbar';
      targets = all.filter((i) => win.refs[i].group === toGroup);
    }
  }
  const rest = insertInto(win, targets, stack);
  win.set(index, rest > 0 ? { ...stack, count: rest } : null);
}

/** Zahlentaste über einem Platz: mit Hotbar-Platz `hotbar` (0–8) tauschen. */
export function swapWithHotbar(win: Window, index: number, hotbar: number): void {
  const ref = win.refs[index];
  const hbIndex = win.refs.findIndex((r) => r.group === 'hotbar' && r.index === hotbar);
  if (!ref || hbIndex < 0 || hbIndex === index) return;
  if (ref.kind === 'output') return;
  const a = win.get(index);
  const b = win.get(hbIndex);
  if (b && !accepts(ref, b)) return;
  win.set(index, b);
  win.set(hbIndex, a);
  win.onChange?.();
}
