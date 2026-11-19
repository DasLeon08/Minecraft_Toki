/**
 * Chaos-Test: ein Bot spielt mehrere Minuten mit zufälligen Aktionen und prüft,
 * dass keine Fehler auftreten und der Zustand gültig bleibt.
 * Dauer per CHAOS_SECONDS (Standard 120).
 */
import { expect, test, type Page } from '@playwright/test';

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    __bc: any;
  }
}

const SECONDS = Number(process.env.CHAOS_SECONDS ?? 120);

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

async function assertSane(page: Page, label: string) {
  const st = await page.evaluate(() => {
    const p = window.__bc.player();
    const s = window.__bc.state();
    const scrolled = [document.documentElement, document.body, document.getElementById('app'), document.querySelector('.app')].some(
      (el) => el && (el.scrollTop !== 0 || el.scrollLeft !== 0),
    );
    return { p, screen: window.__bc.screen, health: s?.health, hunger: s?.hunger, main: s?.main, scrolled };
  });
  expect(st.scrolled, `${label}: Oberfläche verschoben`).toBe(false);
  expect(st.p, label).not.toBeNull();
  for (const k of ['x', 'y', 'z'] as const) expect(Number.isFinite(st.p[k]), `${label}: ${k}=${st.p[k]}`).toBe(true);
  expect(Number.isFinite(st.health), `${label}: Leben`).toBe(true);
  expect(st.health).toBeGreaterThanOrEqual(0);
  expect(st.health).toBeLessThanOrEqual(20);
  for (const s of st.main ?? []) if (s) expect(s.count, `${label}: Stapel`).toBeGreaterThan(0);
}

test.setTimeout((SECONDS + 240) * 1000);

test(`Chaos: ${SECONDS} s zufälliges Spielen ohne Fehler`, async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error' && !m.text().includes('WebGL')) errors.push(`console: ${m.text()}`);
  });
  await page.goto('/?test=1&nosw=1');
  await page.waitForFunction(() => window.__bc?.screen === 'menu', null, { timeout: 30_000 });
  await page.evaluate(() => window.__bc.create('Chaos', 'Chaos-Seed', 'survival'));
  await page.waitForFunction(() => window.__bc.ready, null, { timeout: 120_000 });
  await page.evaluate(() => {
    window.__bc.simulateLock();
    for (const k of ['holz_spitzhacke', 'stein_axt', 'apfel', 'fackel', 'kohle', 'stock']) window.__bc.give(window.__bc.itemId(k), 8);
    for (const id of [10, 18, 29, 30, 32, 4, 13]) window.__bc.give(id, 16);
  });

  const r = rng(Number(process.env.CHAOS_SEED ?? 12345));
  const pick = <T,>(a: T[]): T => a[Math.floor(r() * a.length)];
  const keys = ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space', 'ShiftLeft', 'ControlLeft'];
  const end = Date.now() + SECONDS * 1000;
  let steps = 0;
  while (Date.now() < end) {
    steps++;
    const screen = await page.evaluate(() => window.__bc.screen);
    if (screen === 'dead') {
      const btn = page.locator('button', { hasText: 'Wiederbeleben' });
      const clicked = await btn
        .click({ timeout: 5000 })
        .then(() => true)
        .catch(() => false);
      if (!clicked) {
        const dbg = await page.evaluate(() => {
          const b = [...document.querySelectorAll('button')].find((x) => x.textContent?.includes('Wiederbeleben'))!;
          const r = b.getBoundingClientRect();
          const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
          const panel = b.closest('.panel') as HTMLElement;
          const pr = panel.getBoundingClientRect();
          return {
            btn: [r.x, r.y, r.width, r.height].map(Math.round),
            panel: [pr.x, pr.y, pr.width, pr.height].map(Math.round),
            panelScroll: [panel.scrollTop, panel.scrollHeight, panel.clientHeight],
            hit: hit ? `${hit.tagName}.${(hit as HTMLElement).className}` : null,
            vw: [innerWidth, innerHeight],
            focus: document.activeElement?.tagName,
          };
        });
        await page.screenshot({ path: 'test-results/chaos-death.png' });
        throw new Error('Wiederbeleben nicht klickbar: ' + JSON.stringify(dbg));
      }
      await page.waitForFunction(() => window.__bc.screen === 'playing');
      await page.evaluate(() => window.__bc.simulateLock());
      continue;
    }
    if (screen === 'paused') {
      if (r() < 0.3) {
        await page.locator('button', { hasText: 'Einstellungen' }).click();
        const sliders = page.locator('input[type=range]');
        const n = await sliders.count();
        const sl = sliders.nth(Math.floor(r() * n));
        await sl.focus();
        for (let i = 0; i < 1 + Math.floor(r() * 4); i++) await page.keyboard.press(r() < 0.5 ? 'ArrowLeft' : 'ArrowRight');
        if (r() < 0.3) await page.locator('label.radio').nth(Math.floor(r() * 3)).click();
        await page.locator('button', { hasText: 'Fertig' }).click();
      }
      await page.locator('button', { hasText: 'Weiterspielen' }).click();
      await page.evaluate(() => window.__bc.simulateLock());
      continue;
    }
    if (screen === 'inventory') {
      const slots = await page.locator('[data-slot]').count();
      for (let i = 0; i < 1 + Math.floor(r() * 6); i++) {
        if (slots === 0) break;
        const s = Math.floor(r() * slots);
        const sel = `[data-slot="${s}"]`;
        if ((await page.locator(sel).count()) === 0) break;
        const roll = r();
        if (roll < 0.15) await page.keyboard.press(`Digit${1 + Math.floor(r() * 9)}`);
        else {
          // Das Fenster kann sich jederzeit schliessen (z. B. Tod) – dann abbrechen
          const ok = await page
            .click(sel, { button: roll < 0.5 ? 'right' : 'left', modifiers: roll > 0.85 ? ['Shift'] : [], timeout: 2000 })
            .then(() => true)
            .catch(() => false);
          if (!ok) break;
        }
      }
      if ((await page.evaluate(() => window.__bc.screen)) !== 'inventory') continue;
      await page.keyboard.press('Escape');
      await page.waitForTimeout(100);
      await page.evaluate(() => window.__bc.simulateLock());
      continue;
    }
    if (screen !== 'playing') {
      await page.waitForTimeout(200);
      continue;
    }
    const roll = r();
    if (roll < 0.3) {
      const k = pick(keys);
      await page.keyboard.down(k);
      await page.waitForTimeout(100 + r() * 900);
      await page.keyboard.up(k);
    } else if (roll < 0.45) {
      await page.evaluate(({ yaw, pitch }) => window.__bc.look(yaw, pitch), { yaw: r() * Math.PI * 2, pitch: (r() - 0.6) * 2.5 });
    } else if (roll < 0.58) {
      await page.mouse.down({ button: 'left' });
      await page.waitForTimeout(150 + r() * 1500);
      await page.mouse.up({ button: 'left' });
    } else if (roll < 0.68) {
      await page.mouse.down({ button: 'right' });
      await page.waitForTimeout(80 + r() * 1800);
      await page.mouse.up({ button: 'right' });
    } else if (roll < 0.72) {
      await page.mouse.click(640, 360, { button: 'middle' });
    } else if (roll < 0.78) {
      await page.keyboard.press(`Digit${1 + Math.floor(r() * 9)}`);
    } else if (roll < 0.81) {
      await page.mouse.wheel(0, r() < 0.5 ? 100 : -100);
    } else if (roll < 0.85) {
      await page.keyboard.press('KeyE');
    } else if (roll < 0.87) {
      await page.keyboard.press('KeyQ');
    } else if (roll < 0.89) {
      await page.keyboard.press('Escape');
    } else if (roll < 0.91) {
      await page.keyboard.press('F3');
    } else if (roll < 0.94) {
      await page.evaluate((t) => window.__bc.setTime(t), Math.floor(r() * 24000));
    } else if (roll < 0.97) {
      await page.evaluate(({ dx, dz }) => {
        const p = window.__bc.player();
        window.__bc.teleport(p.x + dx, Math.max(p.y, 90), p.z + dz, false);
      }, { dx: (r() - 0.5) * 120, dz: (r() - 0.5) * 120 });
    } else {
      await page.evaluate((m) => window.__bc.send({ t: 'setMode', mode: m }), r() < 0.5 ? 'creative' : 'survival');
    }
    if (steps % 10 === 0) await assertSane(page, `Schritt ${steps}`);
  }
  console.log(`Chaos: ${steps} Aktionen`);
  await page.keyboard.press('Escape');
  await assertSane(page, 'Ende');
  await page.evaluate(() => window.__bc.save());

  // Neu laden und Welt öffnen
  await page.goto('/?test=1&nosw=1');
  await page.waitForFunction(() => window.__bc?.screen === 'menu');
  const id = await page.evaluate(() => window.__bc.worlds().find((w: any) => w.name === 'Chaos').id);
  await page.evaluate((id) => window.__bc.play(id), id);
  await page.waitForFunction(() => window.__bc.ready || window.__bc.screen === 'dead', null, { timeout: 120_000 });
  await assertSane(page, 'nach Neuladen');
  expect(errors).toEqual([]);
});
