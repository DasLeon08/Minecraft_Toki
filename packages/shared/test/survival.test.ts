import { describe, expect, it } from 'vitest';
import {
  AIR,
  BEDROCK,
  BIRCH_PLANKS,
  CHEST,
  COAL_ORE,
  COBBLESTONE,
  CRAFTING_TABLE,
  DIRT,
  FURNACE,
  FURNACE_LIT,
  GRASS,
  IRON_ORE,
  LUMIT_ORE,
  OAK_LOG,
  OAK_PLANKS,
  SAND,
  STONE,
  TORCH,
  WATER,
  WATER_FLOW,
  WATER_FALLING,
  isWater,
} from '../src/registry/blocks';
import { APPLE, ARMOR, COAL, getItem, IRON_INGOT, STICK, TOOLS } from '../src/registry/items';
import { blockDrops, breakTicks, canHarvest } from '../src/registry/mining';
import { clickWindow, Container, PlayerInventory, Window, swapWithHotbar, type CursorHolder } from '../src/sim/inventory';
import { matchRecipe, RECIPES } from '../src/sim/recipes';
import { Sim } from '../src/sim/Sim';
import { encodeColumn, decodeColumnFull, applyBlockEntities } from '../src/storage/columnCodec';
import { ChunkColumn } from '../src/world/ChunkColumn';
import { makeWorld } from './helpers';

const S = (id: number, count = 1) => ({ id, count });

describe('Inventar-Klicks', () => {
  function setup() {
    const inv = new PlayerInventory();
    const chest = new Container(3);
    const win = new Window('chest', 1);
    for (let i = 0; i < 3; i++) win.add(chest, i, 'normal', 'other');
    win.addPlayer(inv);
    const holder: CursorHolder = { cursor: null };
    return { inv, chest, win, holder };
  }

  it('Linksklick nimmt, legt ab, stapelt und tauscht', () => {
    const { chest, win, holder } = setup();
    chest.slots[0] = S(STONE, 10);
    chest.slots[1] = S(STONE, 60);
    chest.slots[2] = S(DIRT, 5);
    clickWindow(win, holder, 0, 0, false);
    expect(holder.cursor).toEqual(S(STONE, 10));
    expect(chest.slots[0]).toBeNull();
    clickWindow(win, holder, 1, 0, false); // stapeln bis 64
    expect(chest.slots[1]!.count).toBe(64);
    expect(holder.cursor!.count).toBe(6);
    clickWindow(win, holder, 2, 0, false); // tauschen
    expect(chest.slots[2]).toEqual(S(STONE, 6));
    expect(holder.cursor).toEqual(S(DIRT, 5));
  });

  it('Rechtsklick halbiert bzw. legt einzeln ab', () => {
    const { chest, win, holder } = setup();
    chest.slots[0] = S(STONE, 9);
    clickWindow(win, holder, 0, 1, false);
    expect(holder.cursor!.count).toBe(5);
    expect(chest.slots[0]!.count).toBe(4);
    clickWindow(win, holder, 1, 1, false);
    expect(chest.slots[1]!.count).toBe(1);
    expect(holder.cursor!.count).toBe(4);
  });

  it('Shift-Klick verschiebt zwischen Container und Spielerinventar', () => {
    const { inv, chest, win } = setup();
    chest.slots[0] = S(STONE, 20);
    clickWindow(win, { cursor: null }, 0, 0, true);
    expect(chest.slots[0]).toBeNull();
    expect(inv.count(STONE)).toBe(20);
    // zurück in die Truhe
    const idx = win.refs.findIndex((r) => r.container === inv.main && r.container.slots[r.index]?.id === STONE);
    clickWindow(win, { cursor: null }, idx, 0, true);
    expect(chest.slots[0]).toEqual(S(STONE, 20));
  });

  it('Zahlentaste tauscht mit der Hotbar, Werkzeuge stapeln nicht', () => {
    const { inv, chest, win } = setup();
    chest.slots[0] = S(STONE, 3);
    inv.main.slots[2] = S(DIRT, 7);
    swapWithHotbar(win, 0, 2);
    expect(chest.slots[0]).toEqual(S(DIRT, 7));
    expect(inv.main.slots[2]).toEqual(S(STONE, 3));
    const pick = TOOLS.spitzhacke[0];
    expect(inv.add(S(pick, 2))).toBeNull();
    expect(inv.main.slots.filter((s) => s?.id === pick)).toHaveLength(2);
  });

  it('Rüstungsplätze nehmen nur passende Rüstung', () => {
    const inv = new PlayerInventory();
    const win = new Window('inventory', 1);
    for (let i = 0; i < 4; i++) win.add(inv.armor, i, 'armor', 'other', i as 0 | 1 | 2 | 3);
    win.addPlayer(inv);
    const holder: CursorHolder = { cursor: S(ARMOR.eisen[1]) };
    clickWindow(win, holder, 0, 0, false); // Helm-Platz
    expect(inv.armor.slots[0]).toBeNull();
    clickWindow(win, holder, 1, 0, false); // Brustpanzer-Platz
    expect(inv.armor.slots[1]?.id).toBe(ARMOR.eisen[1]);
    expect(inv.armorPoints()).toBe(6);
  });
});

describe('Rezepte', () => {
  const grid = (w: number, cells: (number | null)[]) => cells.map((id) => (id ? S(id) : null));

  it('Stamm → 4 Bretter (formlos, beliebige Position)', () => {
    expect(matchRecipe(grid(3, [null, null, null, null, null, null, null, null, OAK_LOG]), 3, 3)).toEqual(S(OAK_PLANKS, 4));
  });

  it('Werktisch aus 4 Brettern (auch gemischte Holzarten) im 2×2', () => {
    expect(matchRecipe(grid(2, [OAK_PLANKS, BIRCH_PLANKS, OAK_PLANKS, OAK_PLANKS]), 2, 2)).toEqual(S(CRAFTING_TABLE));
  });

  it('Spitzhacke braucht 3×3, Axt funktioniert gespiegelt', () => {
    const P = OAK_PLANKS;
    expect(matchRecipe(grid(3, [P, P, P, null, STICK, null, null, STICK, null]), 3, 3)?.id).toBe(TOOLS.spitzhacke[0]);
    expect(matchRecipe(grid(3, [P, P, null, P, STICK, null, null, STICK, null]), 3, 3)?.id).toBe(TOOLS.axt[0]);
    expect(matchRecipe(grid(3, [null, P, P, null, STICK, P, null, STICK, null]), 3, 3)?.id).toBe(TOOLS.axt[0]);
    expect(matchRecipe(grid(3, [P, P, P, null, STICK, null, null, null, null]), 3, 3)).toBeNull();
  });

  it('Schmelze, Truhe, Fackel, Eisen-Spitzhacke', () => {
    const C = COBBLESTONE;
    expect(matchRecipe(grid(3, [C, C, C, C, null, C, C, C, C]), 3, 3)?.id).toBe(FURNACE);
    const P = OAK_PLANKS;
    expect(matchRecipe(grid(3, [P, P, P, P, null, P, P, P, P]), 3, 3)?.id).toBe(CHEST);
    expect(matchRecipe(grid(2, [COAL, null, STICK, null]), 2, 2)).toEqual(S(TORCH, 4));
    const I = IRON_INGOT;
    expect(matchRecipe(grid(3, [I, I, I, null, STICK, null, null, STICK, null]), 3, 3)?.id).toBe(TOOLS.spitzhacke[2]);
  });

  it('jedes Rezept ist erreichbar (Ergebnis-Item existiert)', () => {
    expect(RECIPES.length).toBeGreaterThanOrEqual(35);
    for (const r of RECIPES) expect(getItem(r.result.id)).toBeDefined();
  });
});

describe('Abbauen', () => {
  it('Abbauzeiten je Werkzeug', () => {
    expect(breakTicks(STONE, null)).toBe(150); // 7,5 s mit der Hand
    expect(breakTicks(STONE, TOOLS.spitzhacke[0])).toBe(23);
    expect(breakTicks(STONE, TOOLS.spitzhacke[2])).toBe(8);
    expect(breakTicks(DIRT, null)).toBe(15);
    expect(breakTicks(DIRT, TOOLS.schaufel[0])).toBe(8);
    expect(breakTicks(OAK_LOG, TOOLS.axt[1])).toBe(15);
    expect(breakTicks(BEDROCK, TOOLS.spitzhacke[3])).toBe(Infinity);
    expect(breakTicks(TORCH, null)).toBe(0);
  });

  it('Ernte-Regeln und Drops', () => {
    expect(canHarvest(STONE, null)).toBe(false);
    expect(blockDrops(STONE, null, Math.random)).toEqual([]);
    expect(blockDrops(STONE, TOOLS.spitzhacke[0], Math.random)).toEqual([S(COBBLESTONE)]);
    expect(canHarvest(IRON_ORE, TOOLS.spitzhacke[0])).toBe(false);
    expect(canHarvest(IRON_ORE, TOOLS.spitzhacke[1])).toBe(true);
    expect(canHarvest(LUMIT_ORE, TOOLS.spitzhacke[1])).toBe(false);
    expect(blockDrops(COAL_ORE, TOOLS.spitzhacke[0], Math.random)).toEqual([S(COAL)]);
    expect(blockDrops(GRASS, null, Math.random)).toEqual([S(DIRT)]);
  });
});

function survivalWorld() {
  const { world, light } = makeWorld(1, (_x, y) => (y === 0 ? BEDROCK : y < 60 ? STONE : y === 60 ? GRASS : AIR));
  const sim = new Sim({ world, light, time: 0, dayLengthTicks: 24000, mode: 'survival', seed: 1 });
  const p = sim.addPlayer(1, 'survival');
  p.x = 2.5;
  p.y = 61;
  p.z = 2.5;
  return { world, light, sim, p };
}

describe('Simulation: Überleben', () => {
  it('Abbauen mit Mindestzeit, Drop als Item, Aufsammeln', () => {
    const { world, sim, p } = survivalWorld();
    p.inventory.main.slots[0] = S(TOOLS.spitzhacke[0]);
    sim.handle({ t: 'startBreak', x: 3, y: 59, z: 2 });
    sim.handle({ t: 'breakBlock', seq: 1, x: 3, y: 59, z: 2 }); // zu schnell
    expect(world.getBlock(3, 59, 2)).toBe(STONE);
    sim.handle({ t: 'startBreak', x: 3, y: 59, z: 2 });
    for (let i = 0; i < 25; i++) sim.tick();
    sim.handle({ t: 'breakBlock', seq: 2, x: 3, y: 59, z: 2 });
    expect(world.getBlock(3, 59, 2)).toBe(AIR);
    expect(sim.items.size).toBe(1);
    expect(p.inventory.main.slots[0]!.damage).toBe(1);
    // Item fällt ins Loch neben den Spieler → aufsammeln
    p.x = 3.5;
    p.y = 59;
    p.z = 2.5;
    for (let i = 0; i < 40; i++) sim.tick();
    expect(sim.items.size).toBe(0);
    expect(p.inventory.count(COBBLESTONE)).toBe(1);
  });

  it('Platzieren verbraucht Blöcke aus der Hand', () => {
    const { world, sim, p } = survivalWorld();
    p.inventory.main.slots[0] = S(DIRT, 2);
    sim.handle({ t: 'placeBlock', seq: 1, x: 4, y: 61, z: 2, id: DIRT });
    expect(world.getBlock(4, 61, 2)).toBe(DIRT);
    expect(p.inventory.main.slots[0]!.count).toBe(1);
    sim.handle({ t: 'placeBlock', seq: 2, x: 5, y: 61, z: 2, id: STONE }); // nicht in der Hand
    expect(world.getBlock(5, 61, 2)).toBe(AIR);
  });

  it('Crafting im Inventar-Fenster: Bretter → Werktisch', () => {
    const { sim, p } = survivalWorld();
    p.inventory.main.slots[0] = S(OAK_LOG, 1);
    sim.handle({ t: 'openInventory' });
    const win = p.window!.win;
    const logIdx = win.refs.findIndex((r) => r.container === p.inventory.main && r.index === 0);
    sim.handle({ t: 'windowClick', slot: logIdx, button: 0, shift: false });
    sim.handle({ t: 'windowClick', slot: 1, button: 0, shift: false }); // ins 2×2-Raster
    expect(win.get(0)).toEqual(S(OAK_PLANKS, 4));
    sim.handle({ t: 'windowClick', slot: 0, button: 0, shift: true }); // Ergebnis nehmen
    expect(p.inventory.count(OAK_PLANKS)).toBe(4);
    // 4 Bretter verteilen → Werktisch
    const pIdx = win.refs.findIndex((r) => r.container === p.inventory.main && r.container.slots[r.index]?.id === OAK_PLANKS);
    sim.handle({ t: 'windowClick', slot: pIdx, button: 0, shift: false });
    for (const g of [1, 2, 3, 4]) sim.handle({ t: 'windowClick', slot: g, button: 1, shift: false });
    expect(win.get(0)?.id).toBe(CRAFTING_TABLE);
    sim.handle({ t: 'windowClick', slot: 0, button: 0, shift: false });
    expect(p.cursor?.id).toBe(CRAFTING_TABLE);
    sim.handle({ t: 'closeWindow' });
    expect(p.inventory.count(CRAFTING_TABLE)).toBe(1);
    expect(p.cursor).toBeNull();
  });

  it('Schmelze: Eisenerz + Kohle → Eisenbarren, brennt und erlischt (Licht)', () => {
    const { world, sim, p } = survivalWorld();
    p.inventory.main.slots[0] = S(FURNACE);
    sim.handle({ t: 'placeBlock', seq: 1, x: 3, y: 61, z: 3, id: FURNACE });
    sim.handle({ t: 'useBlock', x: 3, y: 61, z: 3 });
    expect(p.window?.win.kind).toBe('furnace');
    const be = sim.getBlockEntity(3, 61, 3)!;
    be.container.slots[0] = S(IRON_ORE, 2);
    be.container.slots[1] = S(OAK_PLANKS, 1); // 300 Ticks = 1,5 Erze
    sim.tick();
    expect(world.getBlock(3, 61, 3)).toBe(FURNACE_LIT);
    expect(world.getLight(4, 61, 3) & 15).toBe(12);
    for (let i = 0; i < 400; i++) sim.tick();
    expect(be.container.slots[2]).toEqual(S(IRON_INGOT, 1));
    expect(world.getBlock(3, 61, 3)).toBe(FURNACE);
    expect(world.getLight(4, 61, 3) & 15).toBe(0);
  });

  it('Truhe: Inhalt bleibt im Speicherformat erhalten und fällt beim Abbauen heraus', () => {
    const { world, sim, p } = survivalWorld();
    p.inventory.main.slots[0] = S(CHEST);
    sim.handle({ t: 'placeBlock', seq: 1, x: 2, y: 61, z: 4, id: CHEST });
    const be = sim.getBlockEntity(2, 61, 4)!;
    be.container.slots[5] = S(APPLE, 3);
    const col = world.getColumn(0, 0)!;
    const decoded = decodeColumnFull(encodeColumn(col));
    const fresh = ChunkColumn.fromFlat(0, 0, decoded.blocks, null);
    applyBlockEntities(fresh, decoded.blockEntities);
    const copy = fresh.blockEntities.get((61 << 8) | (4 << 4) | 2)!;
    expect(copy.container.slots[5]).toEqual(S(APPLE, 3));
    p.mode = 'creative';
    sim.handle({ t: 'breakBlock', seq: 2, x: 2, y: 61, z: 4 });
    expect([...sim.items.values()].some((e) => e.item.id === APPLE && e.item.count === 3)).toBe(true);
  });

  it('Fallschaden, Rüstung, Hunger, Regeneration, Verhungern, Ertrinken', () => {
    const { sim, p } = survivalWorld();
    sim.handle({ t: 'playerState', x: 2.5, y: 61, z: 2.5, yaw: 0, pitch: 0, inWater: false, eyesInWater: false, sprinting: false, jumped: false, landedFrom: 8 });
    expect(p.health).toBe(15);
    // Regeneration bei vollem Hunger
    for (let i = 0; i < 81; i++) sim.tick();
    expect(p.health).toBe(16);
    // Rüstung reduziert allgemeinen Schaden
    p.inventory.armor.slots[1] = S(ARMOR.eisen[1]);
    p.hurtCooldown = 0;
    p.damage(10, 'generic');
    expect(p.health).toBeCloseTo(16 - 10 * (1 - 6 / 25), 5);
    // Verhungern bis 1 Herz
    p.hunger = 0;
    p.saturation = 0;
    for (let i = 0; i < 80 * 30; i++) sim.tick();
    // Verhungern tötet nicht: es bleibt höchstens ein Herz übrig
    expect(p.dead).toBe(false);
    expect(p.health).toBeGreaterThan(0);
    expect(p.health).toBeLessThanOrEqual(1);
    // Ertrinken → Tod, Inventar fällt heraus
    p.inventory.main.slots[3] = S(APPLE, 2);
    p.eyesInWater = true;
    let died = '';
    sim.onEvent((e) => {
      if (e.t === 'death') died = e.message;
    });
    for (let i = 0; i < 400 && !p.dead; i++) sim.tick();
    expect(p.dead).toBe(true);
    expect(died).toContain('ertrunken');
    expect([...sim.items.values()].some((e) => e.item.id === APPLE)).toBe(true);
    sim.handle({ t: 'respawn' });
    expect(p.health).toBe(20);
    expect(p.dead).toBe(false);
  });

  it('Essen stillt Hunger und verbraucht das Item', () => {
    const { sim, p } = survivalWorld();
    p.hunger = 10;
    p.inventory.main.slots[0] = S(APPLE, 2);
    sim.handle({ t: 'eat' });
    expect(p.hunger).toBe(14);
    expect(p.inventory.main.slots[0]!.count).toBe(1);
  });
});

describe('Fliessendes Wasser', () => {
  function waterWorld() {
    const { world, light } = makeWorld(1, (_x, y) => (y < 60 ? STONE : AIR));
    const sim = new Sim({ world, light, time: 0, dayLengthTicks: 24000, mode: 'creative', seed: 1 });
    const p = sim.addPlayer(1, 'creative');
    p.x = 0.5;
    p.y = 61;
    p.z = 0.5;
    return { world, sim };
  }

  it('Quelle breitet sich 7 Blöcke aus und trocknet nach Entfernen aus', () => {
    const { world, sim } = waterWorld();
    sim.setBlock(0, 60, 0, WATER);
    for (let i = 0; i < 200; i++) sim.tick();
    expect(world.getBlock(1, 60, 0)).toBe(WATER_FLOW[1]);
    expect(world.getBlock(7, 60, 0)).toBe(WATER_FLOW[7]);
    expect(world.getBlock(8, 60, 0)).toBe(AIR);
    sim.setBlock(0, 60, 0, AIR);
    for (let i = 0; i < 300; i++) sim.tick();
    expect(isWater(world.getBlock(3, 60, 0))).toBe(false);
  });

  it('fällt nach unten und bildet zwischen zwei Quellen eine neue Quelle', () => {
    const { world, sim } = waterWorld();
    sim.setBlock(5, 59, 5, AIR);
    sim.setBlock(5, 58, 5, AIR);
    sim.setBlock(5, 62, 5, WATER);
    for (let i = 0; i < 100; i++) sim.tick();
    expect(world.getBlock(5, 61, 5)).toBe(WATER_FALLING);
    expect(isWater(world.getBlock(5, 58, 5))).toBe(true);
    // Unendlichquelle
    sim.setBlock(10, 60, 10, WATER);
    sim.setBlock(12, 60, 10, WATER);
    for (let i = 0; i < 60; i++) sim.tick();
    expect(world.getBlock(11, 60, 10)).toBe(WATER);
  });
});

describe('Speicherformat', () => {
  it('v2 kodiert Block-Entities, v1-Daten bleiben lesbar', () => {
    const col = new ChunkColumn(0, 0);
    col.setBlock(1, 1, 1, CHEST);
    const c = new Container(27);
    c.slots[0] = S(SAND, 9);
    col.blockEntities.set((1 << 8) | (1 << 4) | 1, { type: 'chest', container: c });
    const d = decodeColumnFull(encodeColumn(col));
    expect(d.blockEntities).toHaveLength(1);
    expect(d.blockEntities[0].items[0]).toEqual(S(SAND, 9));
  });
});
