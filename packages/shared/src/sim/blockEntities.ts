/** Block-Entities: Blöcke mit eigenem Inhalt (Truhe, Schmelze). */
import { CHEST, FURNACE, FURNACE_LIT } from '../registry/blocks';
import { Container, type Slot } from './inventory';

export interface ChestEntity {
  type: 'chest';
  container: Container;
}

export interface FurnaceEntity {
  type: 'furnace';
  /** 0 = Eingabe, 1 = Brennstoff, 2 = Ausgabe */
  container: Container;
  /** Verbleibende Brenndauer (Ticks). */
  burn: number;
  /** Brenndauer des aktuellen Brennstoffs. */
  burnMax: number;
  /** Fortschritt des aktuellen Schmelzvorgangs (Ticks). */
  cook: number;
}

export type BlockEntity = ChestEntity | FurnaceEntity;

export interface BlockEntityData {
  /** Index innerhalb der Spalte (y << 8 | z << 4 | x). */
  i: number;
  type: BlockEntity['type'];
  items: Slot[];
  burn?: number;
  burnMax?: number;
  cook?: number;
}

export function blockEntityTypeFor(blockId: number): BlockEntity['type'] | null {
  if (blockId === CHEST) return 'chest';
  if (blockId === FURNACE || blockId === FURNACE_LIT) return 'furnace';
  return null;
}

export function createBlockEntity(type: BlockEntity['type']): BlockEntity {
  return type === 'chest'
    ? { type: 'chest', container: new Container(27) }
    : { type: 'furnace', container: new Container(3), burn: 0, burnMax: 0, cook: 0 };
}

export function serializeBlockEntity(i: number, be: BlockEntity): BlockEntityData {
  const d: BlockEntityData = { i, type: be.type, items: be.container.toJSON() };
  if (be.type === 'furnace') {
    d.burn = be.burn;
    d.burnMax = be.burnMax;
    d.cook = be.cook;
  }
  return d;
}

export function deserializeBlockEntity(d: BlockEntityData): BlockEntity {
  const be = createBlockEntity(d.type);
  be.container.load(d.items);
  if (be.type === 'furnace') {
    be.burn = d.burn ?? 0;
    be.burnMax = d.burnMax ?? 0;
    be.cook = d.cook ?? 0;
  }
  return be;
}
