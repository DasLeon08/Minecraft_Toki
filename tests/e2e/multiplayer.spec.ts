/**
 * Multiplayer mit zwei getrennten Browsern (eigener Speicher je Browser):
 * Host öffnet seine Welt als Raum, Gast tritt per Code bei, beide bauen und chatten.
 */
import { expect, test, type Browser, type Page } from '@playwright/test';

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    __bc: any;
  }
}

async function openPage(browser: Browser, baseURL: string): Promise<Page> {
  const ctx = await browser.newContext({ viewport: { width: 960, height: 540 } });
  const page = await ctx.newPage();
  await page.goto(`${baseURL}/?test=1&nosw=1`);
  await page.waitForFunction(() => window.__bc?.screen === 'menu', null, { timeout: 30_000 });
  return page;
}

const ready = (page: Page) => page.waitForFunction(() => window.__bc.ready, null, { timeout: 120_000 });

test('Zwei Spieler: Raum per Code, gemeinsam bauen, Chat, Host speichert', async ({ browser, baseURL }) => {
  test.setTimeout(300_000);
  const errors: string[] = [];
  const host = await openPage(browser, baseURL!);
  const guest = await openPage(browser, baseURL!);
  for (const [n, p] of [
    ['Host', host],
    ['Gast', guest],
  ] as const)
    p.on('pageerror', (e) => errors.push(`${n}: ${e.message}`));

  // Host: Welt anlegen, kurz spielen, dann als Raum öffnen
  await host.evaluate(() => window.__bc.create('Gemeinsame Welt', 'MP-Seed', 'creative'));
  await ready(host);
  const base = await host.evaluate(() => {
    const p = window.__bc.player();
    const b = { x: Math.floor(p.x), z: Math.floor(p.z) };
    window.__bc.setBlock(b.x + 2, 130, b.z, 19); // vor dem Raum gesetzt → muss hochgeladen werden
    return b;
  });
  await host.evaluate(() => window.__bc.save());
  await host.evaluate(() => window.__bc.quit());
  await host.waitForFunction(() => window.__bc.screen === 'worlds');
  const worldId = await host.evaluate(() => window.__bc.worlds().find((w: any) => w.name === 'Gemeinsame Welt').id);
  await host.evaluate(({ id }) => window.__bc.host(id, 'Anna'), { id: worldId });
  await ready(host);
  const room = await host.evaluate(() => window.__bc.room());
  expect(room.code).toMatch(/^[A-Z2-9]{6}$/);
  expect(room.host).toBe(true);

  // Gast tritt über das Mehrspieler-Menü bei (echte Eingaben)
  await guest.locator('button', { hasText: 'Mehrspieler' }).click();
  await guest.locator('input[placeholder="z. B. Wanderer"]').fill('Ben');
  await guest.locator('input.code-input').fill(room.code.toLowerCase());
  await guest.locator('button', { hasText: 'Beitreten' }).click();
  await ready(guest);
  expect(await guest.evaluate(() => window.__bc.room().host)).toBe(false);

  // Der vor dem Raum gesetzte Block des Hosts ist beim Gast da (Upload der Host-Welt)
  await guest.waitForFunction(({ x, z }) => window.__bc.getBlock(x + 2, 130, z) === 19, base, { timeout: 60_000 });

  // Beide sehen die Figur des anderen
  await host.waitForFunction(() => window.__bc.remotePlayers() === 1, null, { timeout: 30_000 });
  await guest.waitForFunction(() => window.__bc.remotePlayers() === 1, null, { timeout: 30_000 });

  // Host baut → beim Gast sichtbar; Gast baut ab → beim Host weg
  await host.evaluate(({ x, z }) => window.__bc.setBlock(x + 3, 131, z, 24), base);
  await guest.waitForFunction(({ x, z }) => window.__bc.getBlock(x + 3, 131, z) === 24, base, { timeout: 20_000 });
  await guest.evaluate(({ x, z }) => window.__bc.setBlock(x + 2, 130, z, 0), base);
  await host.waitForFunction(({ x, z }) => window.__bc.getBlock(x + 2, 130, z) === 0, base, { timeout: 20_000 });

  // Chat (Gast tippt mit T eine Nachricht)
  await guest.evaluate(() => window.__bc.simulateLock());
  await guest.keyboard.press('KeyT');
  await guest.waitForFunction(() => window.__bc.screen === 'chat');
  await expect(guest.locator('input.chat-input')).toBeFocused();
  await guest.keyboard.type('Hallo Anna!');
  await guest.keyboard.press('Enter');
  await host.waitForFunction(() => window.__bc.chat().some((l: any) => l.from === 'Ben' && l.text === 'Hallo Anna!'), null, { timeout: 20_000 });
  await host.screenshot({ path: 'test-results/mp-host.png' });
  await guest.screenshot({ path: 'test-results/mp-gast.png' });

  // Host schliesst den Raum → Gast wird zurück ins Menü geschickt, Host hat alles gespeichert
  await host.evaluate(() => window.__bc.quit());
  await guest.waitForFunction(() => window.__bc.screen === 'multiplayer', null, { timeout: 30_000 });
  await host.waitForFunction(() => window.__bc.screen === 'multiplayer', null, { timeout: 30_000 });
  await host.evaluate(({ id }) => window.__bc.play(id), { id: worldId });
  await ready(host);
  expect(await host.evaluate(({ x, z }) => window.__bc.getBlock(x + 3, 131, z), base)).toBe(24);
  expect(await host.evaluate(({ x, z }) => window.__bc.getBlock(x + 2, 130, z), base)).toBe(0);
  expect(errors).toEqual([]);
});

test('Falscher Raumcode zeigt eine verständliche Meldung', async ({ browser, baseURL }) => {
  const page = await openPage(browser, baseURL!);
  await page.locator('button', { hasText: 'Mehrspieler' }).click();
  await page.locator('input[placeholder="z. B. Wanderer"]').fill('Cleo');
  await page.locator('input.code-input').fill('ZZZZZZ');
  await page.locator('button', { hasText: 'Beitreten' }).click();
  await expect(page.locator('.mp-status')).toContainText('gibt es nicht', { timeout: 20_000 });
});
