import { expect, test } from '@playwright/test';

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    __bc: any;
  }
}

test('Welt exportieren und wieder importieren ergibt dieselbe Welt', async ({ page }) => {
  await page.goto('/?test=1&nosw=1');
  await page.waitForFunction(() => window.__bc?.screen === 'menu');
  await page.evaluate(() => window.__bc.create('Export-Welt', 'Export-Seed', 'survival'));
  await page.waitForFunction(() => window.__bc.ready, null, { timeout: 120_000 });
  const marks = await page.evaluate(() => {
    const p = window.__bc.player();
    const out: [number, number, number][] = [];
    for (let i = 0; i < 20; i++) {
      const x = Math.floor(p.x) - 10 + i;
      const z = Math.floor(p.z) + 3;
      window.__bc.setBlock(x, 140, z, 19);
      out.push([x, 140, z]);
    }
    window.__bc.give(10, 33);
    return out;
  });
  await page.evaluate(() => window.__bc.quit());
  await page.waitForFunction(() => window.__bc.screen === 'worlds');

  // Exportieren über den Button
  await page.locator('.world', { hasText: 'Export-Welt' }).click();
  const [download] = await Promise.all([page.waitForEvent('download'), page.locator('button', { hasText: 'Exportieren' }).click()]);
  expect(download.suggestedFilename()).toMatch(/\.bcworld$/);
  const file = await download.path();

  // Importieren über das Datei-Feld
  await page.locator('input[type=file]').setInputFiles(file!);
  await page.waitForFunction(() => window.__bc.worlds().some((w: any) => w.name.includes('(Import)')));
  const id = await page.evaluate(() => window.__bc.worlds().find((w: any) => w.name.includes('(Import)')).id);
  await page.evaluate((id) => window.__bc.play(id), id);
  await page.waitForFunction(() => window.__bc.ready, null, { timeout: 120_000 });
  const ok = await page.evaluate((marks) => marks.filter(([x, y, z]: number[]) => window.__bc.getBlock(x, y, z) === 19).length, marks);
  expect(ok).toBe(20);
  const planks = await page.evaluate(() => window.__bc.state().main.reduce((n: number, s: any) => n + (s?.id === 10 ? s.count : 0), 0));
  expect(planks).toBe(33);
});
