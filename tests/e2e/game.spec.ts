import { expect, test, type Page } from '@playwright/test';

declare global {
  interface Window {
    __bc: {
      screen: string;
      ready: boolean;
      spawnMs: number;
      create(name: string, seed: string): Promise<void>;
      worlds(): { id: string; name: string }[];
      play(id: string): Promise<void>;
      setBlock(x: number, y: number, z: number, id: number): number;
      getBlock(x: number, y: number, z: number): number;
      player(): { x: number; y: number; z: number; onGround: boolean } | null;
      save(): Promise<void>;
      quit(): Promise<void>;
    };
  }
}

async function openMenu(page: Page): Promise<void> {
  await page.goto('/?test=1&nosw=1');
  await page.waitForFunction(() => window.__bc?.screen === 'menu', null, { timeout: 30_000 });
}

test('Welt erstellen, Spawn, 100 Blöcke setzen, speichern und nach Neuladen identisch laden', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });

  await openMenu(page);
  await page.evaluate(() => window.__bc.create('E2E-Welt', 'E2E-Seed'));
  await page.waitForFunction(() => window.__bc.ready, null, { timeout: 120_000 });
  const spawnMs = await page.evaluate(() => window.__bc.spawnMs);
  console.log(`Spawn nach ${Math.round(spawnMs)} ms (Software-Rendering)`);
  expect(spawnMs).toBeLessThan(30_000);

  const player = await page.evaluate(() => window.__bc.player());
  expect(player).not.toBeNull();

  // 100 Blöcke (Ziegel = 19) in der Luft über dem Spawn setzen, einen Stein abbauen
  const placed = await page.evaluate(() => {
    const p = window.__bc.player()!;
    const bx = Math.floor(p.x);
    const bz = Math.floor(p.z);
    let ok = 0;
    for (let i = 0; i < 100; i++) {
      const x = bx - 5 + (i % 10);
      const z = bz - 5 + Math.floor(i / 10);
      if (window.__bc.setBlock(x, 150, z, 19) === 19) ok++;
    }
    return { ok, bx, bz };
  });
  expect(placed.ok).toBe(100);

  await page.evaluate(() => window.__bc.save());
  await page.screenshot({ path: 'test-results/e2e-spiel.png' });

  // Neu laden und Welt wieder öffnen
  await openMenu(page);
  const worlds = await page.evaluate(() => window.__bc.worlds());
  const world = worlds.find((w) => w.name === 'E2E-Welt');
  expect(world).toBeTruthy();
  await page.evaluate((id) => window.__bc.play(id), world!.id);
  await page.waitForFunction(() => window.__bc.ready, null, { timeout: 120_000 });

  const restored = await page.evaluate(({ bx, bz }) => {
    let ok = 0;
    for (let i = 0; i < 100; i++) {
      const x = bx - 5 + (i % 10);
      const z = bz - 5 + Math.floor(i / 10);
      if (window.__bc.getBlock(x, 150, z) === 19) ok++;
    }
    return ok;
  }, placed);
  expect(restored).toBe(100);

  // Spielerposition wurde gespeichert
  const p2 = await page.evaluate(() => window.__bc.player());
  expect(Math.abs(p2!.x - player!.x)).toBeLessThan(1);
  expect(Math.abs(p2!.z - player!.z)).toBeLessThan(1);

  expect(errors.filter((e) => !e.includes('WebGL'))).toEqual([]);
});

test('läuft eingebettet in einem iframe (fremde Herkunft wie bei Toki)', async ({ page, baseURL }) => {
  // Simulierte Spieleseite auf einer anderen Herkunft (127.0.0.1 ≠ localhost)
  const host = baseURL!.replace('localhost', '127.0.0.1') + '/__spieleseite.html';
  await page.route(host, (route) =>
    route.fulfill({
      contentType: 'text/html',
      body: `<!doctype html><html><body style="margin:0;background:#000">
        <iframe id="g" src="${baseURL}/?test=1&nosw=1" style="width:960px;height:540px;border:0"
          allow="fullscreen; pointer-lock"></iframe></body></html>`,
    }),
  );
  await page.goto(host);
  const frame = page.frameLocator('#g');
  await expect(frame.locator('.logo').first()).toBeVisible({ timeout: 30_000 });
  await frame.locator('button', { hasText: 'Einzelspieler' }).click();
  await frame.locator('button', { hasText: 'Neue Welt' }).click();
  await frame.locator('button', { hasText: 'Welt erstellen' }).click();
  const inner = page.frames().find((f) => f.url().includes('test=1'))!;
  await inner.waitForFunction(() => window.__bc.ready, null, { timeout: 120_000 });
  await expect(frame.locator('canvas.game-canvas')).toBeVisible();
  await expect(frame.locator('.hotbar')).toBeVisible();
  await page.screenshot({ path: 'test-results/e2e-iframe.png' });
});
