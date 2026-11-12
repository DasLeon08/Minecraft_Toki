import { expect, test, type Page } from '@playwright/test';

/* eslint-disable @typescript-eslint/no-explicit-any */
type BC = any;
declare global {
  interface Window {
    __bc: BC;
  }
}

const OAK_LOG = 8;
const OAK_PLANKS = 10;
const STONE = 1;
const COBBLESTONE = 18;
const CRAFTING_TABLE = 29;
const FURNACE = 30;
const CHEST = 32;
const IRON_ORE = 15;
const APPLE_KEY = 'apfel';

async function newSurvivalWorld(page: Page, name: string): Promise<{ x: number; y: number; z: number }> {
  await page.goto('/?test=1&nosw=1');
  await page.waitForFunction(() => window.__bc?.screen === 'menu', null, { timeout: 30_000 });
  await page.evaluate((n) => window.__bc.create(n, 'Survival-Test', 'survival'), name);
  await page.waitForFunction(() => window.__bc.ready, null, { timeout: 120_000 });
  await page.evaluate(() => window.__bc.simulateLock());
  return page.evaluate(() => {
    const p = window.__bc.player();
    return { x: Math.floor(p.x), y: Math.floor(p.y), z: Math.floor(p.z) };
  });
}

/** Baut einen Block mit der Simulation ab (Mindestzeit wird eingehalten) und sammelt die Drops ein. */
async function mine(page: Page, x: number, y: number, z: number, ticks: number): Promise<void> {
  await page.evaluate(
    ({ x, y, z, ticks }) => {
      window.__bc.send({ t: 'startBreak', x, y, z });
      window.__bc.tick(ticks);
      window.__bc.send({ t: 'breakBlock', seq: 1, x, y, z });
      window.__bc.tick(40);
    },
    { x, y, z, ticks },
  );
}

/** Läuft zu liegengebliebenen Items und sammelt sie ein (wie ein Spieler, der hingeht). */
async function collect(page: Page, home: { x: number; y: number; z: number }): Promise<void> {
  await page.evaluate((home) => {
    for (const e of window.__bc.items()) {
      window.__bc.teleport(e.x, Math.floor(e.y), e.z, false);
      window.__bc.tick(5);
    }
    window.__bc.teleport(home.x + 0.5, home.y, home.z + 0.5, false);
  }, home);
}

async function count(page: Page, id: number): Promise<number> {
  return page.evaluate((id) => window.__bc.state().main.reduce((n: number, s: any) => n + (s && s.id === id ? s.count : 0), 0), id);
}

async function select(page: Page, id: number): Promise<void> {
  await page.evaluate((id) => {
    const i = window.__bc.state().main.findIndex((s: any, k: number) => k < 9 && s && s.id === id);
    if (i < 0) throw new Error(`Item ${id} nicht in der Hotbar`);
    window.__bc.send({ t: 'selectSlot', slot: i });
  }, id);
}

/** Fensterplatz (im offenen Fenster) mit diesem Item, ausserhalb des Rasters. */
async function slotOf(page: Page, id: number, from: number): Promise<number> {
  const i = await page.evaluate(({ id, from }) => window.__bc.window().findIndex((s: any, k: number) => k >= from && s && s.id === id), { id, from });
  expect(i, `Item ${id} im Fenster`).toBeGreaterThanOrEqual(0);
  return i;
}

const click = (page: Page, slot: number, opts: { right?: boolean; shift?: boolean } = {}) =>
  page.click(`[data-slot="${slot}"]`, { button: opts.right ? 'right' : 'left', modifiers: opts.shift ? ['Shift'] : [] });

/** Legt Items aus `src` einzeln (Rechtsklick) in die Rasterplätze und legt den Rest zurück. */
async function distribute(page: Page, id: number, playerFrom: number, cells: number[], perCell = 1): Promise<void> {
  const src = await slotOf(page, id, playerFrom);
  await click(page, src);
  for (const c of cells) for (let i = 0; i < perCell; i++) await click(page, c, { right: true });
  await click(page, src);
}

test('Überleben: von Holz bis zur Eisen-Spitzhacke (echte Fenster-Klicks)', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  const p = await newSurvivalWorld(page, 'Holz-zu-Eisen');
  const ids = await page.evaluate(() => ({
    stick: window.__bc.itemId('stock'),
    woodPick: window.__bc.itemId('holz_spitzhacke'),
    stonePick: window.__bc.itemId('stein_spitzhacke'),
    ironPick: window.__bc.itemId('eisen_spitzhacke'),
    ingot: window.__bc.itemId('eisenbarren'),
  }));
  const wx = p.x + 1;

  // 1) Vier Stämme mit der Hand fällen (je 60 Ticks)
  for (let i = 0; i < 4; i++) {
    await page.evaluate(({ x, y, z }) => window.__bc.setBlock(x, y, z, 8), { x: wx, y: p.y, z: p.z });
    await mine(page, wx, p.y, p.z, 62);
  }
  await collect(page, p);
  expect(await count(page, OAK_LOG)).toBe(4);

  // 2) Inventar öffnen (E) und Bretter herstellen – per Mausklick im Fenster
  await page.keyboard.press('KeyE');
  await page.waitForFunction(() => window.__bc.screen === 'inventory');
  const logSlot = await slotOf(page, OAK_LOG, 9);
  await click(page, logSlot);
  await click(page, 1);
  await expect(page.locator('[data-slot="0"] img')).toBeVisible();
  await click(page, 0, { shift: true });
  expect(await count(page, OAK_PLANKS)).toBe(16);

  // 3) Stöcke (2 Bretter übereinander, je 2) und Werktisch (4 Bretter)
  await distribute(page, OAK_PLANKS, 9, [1, 3], 2);
  await click(page, 0, { shift: true });
  expect(await count(page, ids.stick)).toBe(8);
  await distribute(page, OAK_PLANKS, 9, [1, 2, 3, 4]);
  await click(page, 0, { shift: true });
  expect(await count(page, CRAFTING_TABLE)).toBe(1);
  await page.keyboard.press('KeyE');
  await page.waitForFunction(() => window.__bc.screen === 'playing');
  await page.evaluate(() => window.__bc.simulateLock());

  // 4) Werktisch platzieren und Holz-Spitzhacke herstellen
  await select(page, CRAFTING_TABLE);
  await page.evaluate(({ x, y, z }) => window.__bc.send({ t: 'placeBlock', seq: 2, x, y, z, id: 29 }), { x: p.x - 1, y: p.y, z: p.z });
  expect(await page.evaluate(({ x, y, z }) => window.__bc.getBlock(x, y, z), { x: p.x - 1, y: p.y, z: p.z })).toBe(CRAFTING_TABLE);
  const openTable = async () => {
    await page.evaluate(({ x, y, z }) => window.__bc.send({ t: 'useBlock', x, y, z }), { x: p.x - 1, y: p.y, z: p.z });
    await page.waitForFunction(() => window.__bc.screen === 'inventory');
  };
  const closeWindow = async () => {
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => window.__bc.screen === 'playing');
    await page.evaluate(() => window.__bc.simulateLock());
  };
  const craftPick = async (material: number) => {
    await openTable();
    await distribute(page, material, 10, [1, 2, 3]);
    await distribute(page, ids.stick, 10, [5, 8]);
    await click(page, 0, { shift: true });
    await closeWindow();
  };
  await craftPick(OAK_PLANKS);
  expect(await count(page, ids.woodPick)).toBe(1);

  // 5) Mit der Holz-Spitzhacke 11 Bruchstein abbauen (Stein: 23 Ticks)
  await select(page, ids.woodPick);
  for (let i = 0; i < 11; i++) {
    await page.evaluate(({ x, y, z }) => window.__bc.setBlock(x, y, z, 1), { x: wx, y: p.y, z: p.z });
    await mine(page, wx, p.y, p.z, 24);
  }
  await collect(page, p);
  expect(await count(page, COBBLESTONE)).toBe(11);
  expect(await count(page, STONE)).toBe(0);

  // 6) Stein-Spitzhacke und Schmelze
  await craftPick(COBBLESTONE);
  expect(await count(page, ids.stonePick)).toBe(1);
  await openTable();
  await distribute(page, COBBLESTONE, 10, [1, 2, 3, 4, 6, 7, 8, 9]);
  await click(page, 0, { shift: true });
  await closeWindow();
  expect(await count(page, FURNACE)).toBe(1);

  // 7) Eisenerz mit der Stein-Spitzhacke abbauen
  await select(page, ids.stonePick);
  for (let i = 0; i < 3; i++) {
    await page.evaluate(({ x, y, z }) => window.__bc.setBlock(x, y, z, 15), { x: wx, y: p.y, z: p.z });
    await mine(page, wx, p.y, p.z, 24);
  }
  await collect(page, p);
  expect(await count(page, IRON_ORE)).toBe(3);

  // 8) Schmelze platzieren, befüllen (Erz + Bretter als Brennstoff), schmelzen
  await select(page, FURNACE);
  await page.evaluate(({ x, y, z }) => window.__bc.send({ t: 'placeBlock', seq: 3, x, y, z, id: 30 }), { x: p.x, y: p.y, z: p.z + 1 });
  await page.evaluate(({ x, y, z }) => window.__bc.send({ t: 'useBlock', x, y, z }), { x: p.x, y: p.y, z: p.z + 1 });
  await page.waitForFunction(() => window.__bc.screen === 'inventory');
  await expect(page.locator('.win-furnace')).toBeVisible();
  await click(page, await slotOf(page, IRON_ORE, 3), { shift: true });
  const planksSlot = await slotOf(page, OAK_PLANKS, 3);
  await click(page, planksSlot);
  await click(page, 1, { right: true });
  await click(page, 1, { right: true });
  await click(page, planksSlot);
  await page.evaluate(() => window.__bc.tick(650));
  await click(page, 2, { shift: true });
  await closeWindow();
  expect(await count(page, ids.ingot)).toBe(3);

  // 9) Eisen-Spitzhacke
  await craftPick(ids.ingot);
  expect(await count(page, ids.ironPick)).toBe(1);
  await page.screenshot({ path: 'test-results/e2e-survival.png' });
  expect(errors).toEqual([]);
});

test('Truhe und Inventar überstehen ein Neuladen', async ({ page }) => {
  const p = await newSurvivalWorld(page, 'Truhen-Welt');
  const apple = await page.evaluate((k) => window.__bc.itemId(k), APPLE_KEY);
  await page.evaluate(({ apple }) => {
    window.__bc.give(32, 1);
    window.__bc.give(apple, 7);
    window.__bc.give(10, 20);
  }, { apple });
  await select(page, CHEST);
  const pos = { x: p.x + 1, y: p.y, z: p.z };
  await page.evaluate((q) => window.__bc.send({ t: 'placeBlock', seq: 1, x: q.x, y: q.y, z: q.z, id: 32 }), pos);
  await page.evaluate((q) => window.__bc.send({ t: 'useBlock', x: q.x, y: q.y, z: q.z }), pos);
  await page.waitForFunction(() => window.__bc.screen === 'inventory');
  await click(page, await slotOf(page, apple, 27), { shift: true });
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => window.__bc.screen === 'playing');
  await page.evaluate(() => window.__bc.save());

  await page.goto('/?test=1&nosw=1');
  await page.waitForFunction(() => window.__bc?.screen === 'menu');
  const id = await page.evaluate(() => window.__bc.worlds().find((w: any) => w.name === 'Truhen-Welt').id);
  await page.evaluate((id) => window.__bc.play(id), id);
  await page.waitForFunction(() => window.__bc.ready, null, { timeout: 120_000 });
  expect(await count(page, OAK_PLANKS)).toBe(20);
  expect(await count(page, apple)).toBe(0);
  await page.evaluate(() => window.__bc.simulateLock());
  await page.evaluate((q) => window.__bc.send({ t: 'useBlock', x: q.x, y: q.y, z: q.z }), pos);
  await page.waitForFunction(() => window.__bc.screen === 'inventory');
  const chest = await page.evaluate(() => window.__bc.window().slice(0, 27).filter(Boolean));
  expect(chest).toEqual([{ id: apple, count: 7 }]);
});

test('Tod durch Fallschaden: Items fallen heraus, Wiederbeleben', async ({ page }) => {
  await newSurvivalWorld(page, 'Tod-Welt');
  await page.evaluate(() => window.__bc.give(10, 5));
  await page.evaluate(() => {
    const p = window.__bc.player();
    window.__bc.send({ t: 'playerState', x: p.x, y: p.y, z: p.z, yaw: 0, pitch: 0, inWater: false, eyesInWater: false, sprinting: false, jumped: false, landedFrom: 40 });
  });
  await page.waitForFunction(() => window.__bc.screen === 'dead');
  await expect(page.locator('.death')).toContainText('zu tief gefallen');
  expect(await page.evaluate(() => window.__bc.items().some((e: any) => e.item.id === 10))).toBe(true);
  expect(await count(page, OAK_PLANKS)).toBe(0);
  await page.click('text=Wiederbeleben');
  await page.waitForFunction(() => window.__bc.state().health === 20 && !window.__bc.state().dead);
});
