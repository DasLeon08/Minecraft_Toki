/**
 * Abbauzeiten und Drops. Abbauzeit in Ticks nach dem bewährten Schema:
 * Fortschritt pro Tick = Tempo / Härte / (abbaubar ? 30 : 100).
 */
import { AIR, BIRCH_LEAVES, BERRY_BUSH, COAL_ORE, DIRT, getBlock, GLASS, GRASS, LUMIT_ORE, OAK_LEAVES, SNOWY_GRASS, SPRUCE_LEAVES, STONE, COBBLESTONE, TALL_GRASS, FURNACE_LIT, FURNACE, SWAMP_LEAVES, DRY_SHRUB, isWater } from './blocks';
import { APPLE, BERRIES, COAL, getItem, LUMIT, STICK } from './items';
import type { ItemStack } from '../sim/inventory';

/** Kann der Block mit diesem Item (oder der Hand) geerntet werden? */
export function canHarvest(blockId: number, toolItem: number | null): boolean {
  const b = getBlock(blockId);
  if (b.harvestTier < 0) return true;
  const tool = toolItem !== null ? getItem(toolItem)?.tool : undefined;
  return !!tool && tool.type === b.tool && tool.tier >= b.harvestTier;
}

/** Tempo-Faktor des gehaltenen Items für diesen Block. */
export function miningSpeed(blockId: number, toolItem: number | null): number {
  const b = getBlock(blockId);
  const tool = toolItem !== null ? getItem(toolItem)?.tool : undefined;
  if (tool && tool.type === b.tool) return tool.speed;
  // Schwerter schneiden Laub und Pflanzen schneller
  if (tool && tool.type === 'schwert' && (b.id === OAK_LEAVES || b.id === BIRCH_LEAVES || b.id === SPRUCE_LEAVES || b.id === SWAMP_LEAVES)) return 1.5;
  return 1;
}

/** Abbauzeit in Ticks (0 = sofort, Infinity = unzerstörbar). */
export function breakTicks(blockId: number, toolItem: number | null): number {
  const b = getBlock(blockId);
  if (b.hardness < 0) return Infinity;
  if (b.hardness === 0) return 0;
  const perTick = miningSpeed(blockId, toolItem) / b.hardness / (canHarvest(blockId, toolItem) ? 30 : 100);
  return Math.ceil(1 / perTick);
}

/** Drops eines abgebauten Blocks. `rand` liefert Zahlen in [0, 1). */
export function blockDrops(blockId: number, toolItem: number | null, rand: () => number): ItemStack[] {
  if (blockId === AIR || isWater(blockId)) return [];
  if (!canHarvest(blockId, toolItem)) return [];
  switch (blockId) {
    case GRASS:
    case SNOWY_GRASS:
      return [{ id: DIRT, count: 1 }];
    case STONE:
      return [{ id: COBBLESTONE, count: 1 }];
    case COAL_ORE:
      return [{ id: COAL, count: 1 }];
    case LUMIT_ORE:
      return [{ id: LUMIT, count: 1 }];
    case FURNACE_LIT:
      return [{ id: FURNACE, count: 1 }];
    case GLASS:
    case TALL_GRASS:
      return [];
    case DRY_SHRUB:
      return rand() < 0.5 ? [{ id: STICK, count: 1 + Math.floor(rand() * 2) }] : [];
    case BERRY_BUSH:
      return [{ id: BERRIES, count: 1 + Math.floor(rand() * 3) }];
    case OAK_LEAVES:
      return rand() < 0.05 ? [{ id: APPLE, count: 1 }] : rand() < 0.04 ? [{ id: STICK, count: 1 }] : [];
    case BIRCH_LEAVES:
    case SPRUCE_LEAVES:
    case SWAMP_LEAVES:
      return rand() < 0.04 ? [{ id: STICK, count: 1 }] : [];
    default:
      return [{ id: blockId, count: 1 }];
  }
}
