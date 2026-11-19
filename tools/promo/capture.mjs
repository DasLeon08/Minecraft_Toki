/* global fetch, setTimeout, localStorage */
/**
 * Erzeugt die Screenshots für die Spieleseite (Toki) aus dem echten Spiel.
 * Titelbild und Banner sind flache Pixel-Art (tools/texturegen/src/pixelart.ts, `pnpm promo:pixel`).
 * Voraussetzung: `pnpm build`. Aufruf: `pnpm promo` → docs/toki/
 *
 * Optional: `pnpm promo -- landschaft mehrspieler` rendert nur ausgewählte Szenen
 * (zusätzlich verfügbar: `nacht`).
 */
import { spawn } from 'node:child_process';
import { mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = join(ROOT, 'docs', 'toki');
const PORT = Number(process.env.PROMO_PORT ?? 8095);
const BASE = `http://localhost:${PORT}`;
mkdirSync(OUT, { recursive: true });

const only = process.argv.slice(2);
const DEFAULT_SCENES = ['landschaft', 'basis', 'werktisch', 'mehrspieler'];
const want = (name) => (only.length === 0 ? DEFAULT_SCENES.includes(name) : only.includes(name));

const HIDE_ALL = `.hud, .notice, .click-to-play, .debug { display: none !important; }`;
const HIDE_UI_NOISE = `.notice, .click-to-play, .debug, .held-name { display: none !important; }`;

async function startServer() {
  try {
    if ((await fetch(`${BASE}/health`)).ok) return null;
  } catch {
    // kein Server aktiv
  }
  const proc = spawn('node', [join(ROOT, 'apps/server/dist/index.js')], { env: { ...process.env, PORT: String(PORT), LOG_LEVEL: 'warn' }, stdio: 'inherit' });
  for (let i = 0; i < 50; i++) {
    await new Promise((r) => setTimeout(r, 200));
    try {
      if ((await fetch(`${BASE}/health`)).ok) return proc;
    } catch {
      // wartet
    }
  }
  throw new Error('Server startet nicht – vorher `pnpm build` ausführen?');
}

/** Öffnet eine neue Welt und wartet, bis der Spawn fertig ist. */
async function openWorld(page, { seed, mode = 'creative', name = 'Promo' }) {
  // Grössere Sichtweite für weite Ausblicke
  await page.addInitScript(() => localStorage.setItem('bc.settings.v1', JSON.stringify({ renderDistance: 12 })));
  await page.goto(`${BASE}/?test=1&nosw=1&pixel=2`);
  await page.waitForFunction(() => window.__bc?.screen === 'menu', null, { timeout: 30_000 });
  await page.evaluate(({ name, seed, mode }) => window.__bc.create(name, seed, mode), { name, seed, mode });
  await page.waitForFunction(() => window.__bc.ready, null, { timeout: 120_000 });
  await page.evaluate(() => window.__bc.simulateLock());
}

/** Wartet, bis alle Chunks in Sichtweite geladen und gemesht sind. */
async function settle(page, minMs = 2500) {
  await page.waitForTimeout(minMs);
  const t0 = Date.now();
  let calm = 0;
  while (Date.now() - t0 < 90_000) {
    const s = await page.evaluate(() => window.__bc.stats());
    calm = s && s.pending === 0 ? calm + 1 : 0;
    if (calm >= 3) break;
    await page.waitForTimeout(500);
  }
  await page.waitForTimeout(800);
}

async function shot(page, file, css, type = 'jpeg') {
  const tag = await page.addStyleTag({ content: css });
  await page.waitForTimeout(150);
  const path = join(OUT, file);
  await page.screenshot({ path, type, ...(type === 'jpeg' ? { quality: 90 } : {}) });
  await tag.evaluate((el) => el.remove());
  console.log(`  ✓ ${file} (${Math.round(statSync(path).size / 1024)} KB)`);
  return path;
}

// ---------------------------------------------------------------------------
// Szenen
// ---------------------------------------------------------------------------

const SCENES = {
  /** Panorama über Wald und Gebirge im warmen Morgenlicht. */
  async landschaft(browser) {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    await openWorld(page, { seed: '1111838275' });
    await page.evaluate(() => {
      // Wald im Vordergrund, verschneiter Gipfel in der Bildmitte, Sonne ausserhalb des Bildes
      window.__bc.teleport(300.5, 112, 0.5, true);
      window.__bc.look(-Math.PI / 2 - 0.6, -0.22);
      window.__bc.setTime(2600);
    });
    await settle(page);
    const file = await shot(page, 'screenshot-1-landschaft.jpg', HIDE_ALL);
    await page.close();
    return file;
  },

  /** Survival-Basis mit Werktisch, brennender Schmelze, Truhe und Fackeln. */
  async basis(browser) {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    await openWorld(page, { seed: 'Abenteuer', mode: 'survival' });
    await page.evaluate(() => {
      const bc = window.__bc;
      const p = bc.player();
      const x0 = Math.floor(p.x) - 3;
      const z0 = Math.floor(p.z) - 9;
      let g = 120;
      while (g > 0 && [0, 20, 21, 22, 35].includes(bc.getBlock(x0 + 3, g, z0 + 3))) g--;
      // Fundament und kleine Hütte aus Brettern und Bruchstein
      // Freie, ebene Wiese vor der Hütte (für den Blick der Kamera)
      for (let x = -4; x < 11; x++)
        for (let z = 6; z < 16; z++) {
          bc.setBlock(x0 + x, g, z0 + z, 3);
          for (let y = 1; y < 8; y++) bc.setBlock(x0 + x, g + y, z0 + z, 0);
          for (let y = 1; y < 4; y++) bc.setBlock(x0 + x, g - y, z0 + z, 2);
        }
      for (let x = 0; x < 7; x++)
        for (let z = 0; z < 6; z++) {
          bc.setBlock(x0 + x, g, z0 + z, 18);
          for (let y = 1; y < 6; y++) bc.setBlock(x0 + x, g + y, z0 + z, 0);
        }
      for (let x = 0; x < 7; x++)
        for (let y = 1; y <= 3; y++) {
          bc.setBlock(x0 + x, g + y, z0, y === 3 ? 8 : 10);
        }
      for (let z = 0; z < 6; z++) for (let y = 1; y <= 3; y++) bc.setBlock(x0, g + y, z0 + z, y === 3 ? 8 : 18);
      for (let x = 0; x < 7; x++) for (let z = 0; z < 4; z++) bc.setBlock(x0 + x, g + 4, z0 + z, 10);
      bc.setBlock(x0 + 2, g + 2, z0, 17);
      bc.setBlock(x0 + 4, g + 2, z0, 17);
      bc.setBlock(x0 + 1, g + 1, z0 + 1, 29);
      bc.setBlock(x0 + 3, g + 1, z0 + 1, 30);
      bc.setBlock(x0 + 5, g + 1, z0 + 1, 32);
      bc.setBlock(x0 + 2, g + 1, z0 + 2, 33);
      bc.setBlock(x0 + 6, g + 1, z0 + 4, 33);
      bc.teleport(x0 + 3.5, g + 1, z0 + 1.5, false);
      window.__promo = { x0, z0, g };
    });
    // Schmelze anfeuern
    await page.evaluate(() => {
      const bc = window.__bc;
      const { x0, z0, g } = window.__promo;
      bc.give(15, 12);
      bc.give(bc.itemId('kohle'), 6);
      bc.send({ t: 'useBlock', x: x0 + 3, y: g + 1, z: z0 + 1 });
      const w = bc.window();
      bc.send({ t: 'windowClick', slot: w.findIndex((s, k) => k >= 3 && s && s.id === 15), button: 0, shift: true });
      const w2 = bc.window();
      bc.send({ t: 'windowClick', slot: w2.findIndex((s, k) => k >= 3 && s && s.id === bc.itemId('kohle')), button: 0, shift: true });
      bc.send({ t: 'closeWindow' });
      bc.tick(40);
    });
    await page.waitForTimeout(500);
    await page.evaluate(() => {
      const bc = window.__bc;
      const { x0, z0, g } = window.__promo;
      // Inventar für die Hotbar
      for (const [k, n] of [['eisen_spitzhacke', 1], ['stein_axt', 1], ['fackel', 24], ['apfel', 5], ['eisenbarren', 7], ['lumit', 2]]) bc.give(bc.itemId(k), n);
      bc.give(18, 48);
      bc.give(10, 32);
      bc.send({ t: 'selectSlot', slot: 0 });
      bc.setBlock(x0 + 8, g + 1, z0 + 7, 33);
      bc.setBlock(x0 - 2, g + 1, z0 + 8, 35);
      bc.teleport(x0 + 4.2, g + 1, z0 + 8.6, false);
      bc.look(0.18, -0.16);
      bc.setTime(24000 * 0.2);
      bc.simulateLock();
    });
    await settle(page);
    const file = await shot(page, 'screenshot-2-basis.jpg', HIDE_UI_NOISE);
    await page.close();
    return file;
  },

  /** Werktisch-Fenster mit Rezept für die Eisen-Spitzhacke. */
  async werktisch(browser) {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    await openWorld(page, { seed: 'Abenteuer', mode: 'survival' });
    const p = await page.evaluate(() => {
      const bc = window.__bc;
      const p = bc.player();
      const q = { x: Math.floor(p.x), y: Math.floor(p.y), z: Math.floor(p.z) };
      bc.setBlock(q.x + 1, q.y, q.z, 29);
      for (const [k, n] of [['eisenbarren', 9], ['stock', 16], ['holz_spitzhacke', 1], ['stein_schwert', 1], ['fackel', 20], ['apfel', 4], ['kohle', 11]]) bc.give(bc.itemId(k), n);
      bc.give(18, 40);
      bc.give(10, 24);
      bc.give(8, 12);
      bc.send({ t: 'useBlock', x: q.x + 1, y: q.y, z: q.z });
      return q;
    });
    await page.waitForFunction(() => window.__bc.screen === 'inventory');
    const slotOf = (key) => page.evaluate((key) => window.__bc.window().findIndex((s, k) => k >= 10 && s && s.id === window.__bc.itemId(key)), key);
    const ingot = await slotOf('eisenbarren');
    await page.click(`[data-slot="${ingot}"]`);
    for (const c of [1, 2, 3]) await page.click(`[data-slot="${c}"]`, { button: 'right' });
    await page.click(`[data-slot="${ingot}"]`);
    const stick = await slotOf('stock');
    await page.click(`[data-slot="${stick}"]`);
    for (const c of [5, 8]) await page.click(`[data-slot="${c}"]`, { button: 'right' });
    await page.click(`[data-slot="${stick}"]`);
    await page.hover('[data-slot="0"]');
    await page.waitForTimeout(300);
    void p;
    const file = await shot(page, 'screenshot-3-werktisch.jpg', HIDE_UI_NOISE);
    await page.close();
    return file;
  },

  /** Nachtszene: Sternenhimmel, Fackeln und Leuchtkristalle. */
  async nacht(browser) {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    await openWorld(page, { seed: 'Abenteuer' });
    await page.evaluate(() => {
      const bc = window.__bc;
      const p = bc.player();
      const cx = Math.floor(p.x) + 2;
      const cz = Math.floor(p.z) - 10;
      let g = 120;
      while (g > 0 && [0, 20, 21, 22, 35].includes(bc.getBlock(cx, g, cz))) g--;
      // Kleiner Platz mit Ziegelturm, Leuchtkristallen und Fackeln
      for (let dx = -5; dx <= 5; dx++)
        for (let dz = -5; dz <= 5; dz++) {
          if (dx * dx + dz * dz > 30) continue;
          bc.setBlock(cx + dx, g, cz + dz, Math.abs(dx) + Math.abs(dz) < 3 ? 19 : 18);
          for (let y = 1; y < 8; y++) bc.setBlock(cx + dx, g + y, cz + dz, 0);
        }
      for (let y = 1; y <= 5; y++)
        for (const [dx, dz] of [
          [-1, -1],
          [1, -1],
          [-1, 1],
          [1, 1],
        ])
          bc.setBlock(cx + dx, g + y, cz + dz, y === 5 ? 24 : 19);
      bc.setBlock(cx, g + 6, cz, 24);
      for (const [dx, dz] of [
        [-4, 0],
        [4, 0],
        [0, -4],
        [0, 4],
        [-3, -3],
        [3, 3],
        [3, -3],
        [-3, 3],
      ])
        bc.setBlock(cx + dx, g + 1, cz + dz, 33);
      bc.teleport(cx + 0.5, g + 3.2, cz + 10.5, true);
      bc.look(0, -0.12);
      bc.setTime(24000 * 0.82);
    });
    await settle(page);
    const file = await shot(page, 'extra-nacht.jpg', HIDE_ALL);
    await page.close();
    return file;
  },
  /** Mehrspieler: zwei Browser im selben Raum, der Gast baut, beide chatten. */
  async mehrspieler(browser) {
    const open = async () => {
      const ctx = await browser.newContext({ viewport: { width: 1600, height: 900 } });
      const page = await ctx.newPage();
      await page.addInitScript(() => localStorage.setItem('bc.settings.v1', JSON.stringify({ renderDistance: 8 })));
      await page.goto(`${BASE}/?test=1&nosw=1&pixel=2`);
      await page.waitForFunction(() => window.__bc?.screen === 'menu', null, { timeout: 30_000 });
      return { ctx, page };
    };
    const ready = (page) => page.waitForFunction(() => window.__bc.ready, null, { timeout: 120_000 });
    const host = await open();
    await host.page.evaluate(() => window.__bc.create('Gemeinsame Welt', 'Abenteuer', 'creative'));
    await ready(host.page);
    // Ebener Platz mit halbfertigem Turm und Fackeln, Host steht in der Mitte
    const base = await host.page.evaluate(() => {
      const bc = window.__bc;
      const p = bc.player();
      const hx = Math.floor(p.x);
      const hz = Math.floor(p.z);
      let g = 120;
      while (g > 0 && [0, 20, 21, 22, 35].includes(bc.getBlock(hx, g, hz))) g--;
      for (let dx = -9; dx <= 9; dx++)
        for (let dz = -12; dz <= 6; dz++) {
          bc.setBlock(hx + dx, g, hz + dz, Math.abs(dx) <= 1 && dz < 0 ? 18 : 3);
          for (let y = 1; y < 10; y++) bc.setBlock(hx + dx, g + y, hz + dz, 0);
          for (let y = 1; y < 3; y++) bc.setBlock(hx + dx, g - y, hz + dz, 2);
        }
      const tx = hx - 4;
      const tz = hz - 8;
      for (let y = 1; y <= 4; y++)
        for (let dx = 0; dx < 3; dx++)
          for (let dz = 0; dz < 3; dz++) {
            const edge = dx !== 1 || dz !== 1;
            if (edge && (y < 4 || dx === 0)) bc.setBlock(tx + dx, g + y, tz + dz, y === 4 ? 10 : 19);
          }
      for (const [dx, dz] of [
        [2, -3],
        [-2, -3],
        [2, -9],
        [3, 2],
      ])
        bc.setBlock(hx + dx, g + 1, hz + dz, 33);
      bc.setBlock(hx + 4, g + 1, hz - 6, 29);
      bc.teleport(hx + 0.5, g + 1, hz + 0.5, false);
      return { hx, hz, g, tx, tz };
    });
    await host.page.evaluate(() => window.__bc.save());
    await host.page.evaluate(() => window.__bc.quit());
    await host.page.waitForFunction(() => window.__bc.screen === 'worlds');
    const id = await host.page.evaluate(() => window.__bc.worlds().find((w) => w.name === 'Gemeinsame Welt').id);
    await host.page.evaluate((id) => window.__bc.host(id, 'Anna'), id);
    await ready(host.page);
    const code = (await host.page.evaluate(() => window.__bc.room())).code;

    const guest = await open();
    await guest.page.evaluate((code) => window.__bc.join(code, 'Ben'), code);
    await ready(guest.page);
    for (const p of [host.page, guest.page]) await p.waitForFunction(() => window.__bc.remotePlayers() === 1, null, { timeout: 30_000 });

    // Gast geht in kleinen Schritten zum Turm (grosse Sprünge setzt der Server zurück)
    const target = { x: base.tx + 3.5, z: base.tz + 3.2 };
    for (let i = 0; i < 60; i++) {
      const done = await guest.page.evaluate(
        ({ target, g }) => {
          const bc = window.__bc;
          const p = bc.player();
          const dx = target.x - p.x;
          const dz = target.z - p.z;
          const d = Math.hypot(dx, dz);
          if (d < 0.2) return true;
          const s = Math.min(0.3, d) / d;
          bc.teleport(p.x + dx * s, g + 1, p.z + dz * s, false);
          return false;
        },
        { target, g: base.g },
      );
      if (done) break;
      await guest.page.waitForTimeout(70);
    }
    await guest.page.evaluate(
      ({ base }) => {
        const bc = window.__bc;
        bc.look(Math.atan2(1.5, 1.7), -0.35);
        bc.send({ t: 'selectSlot', slot: 1 });
        bc.setBlock(base.tx + 1, base.g + 4, base.tz + 2, 19);
        bc.sendChat('Hallo Anna! Der Turm ist fast fertig.');
      },
      { base },
    );
    await host.page.waitForTimeout(600);
    await host.page.evaluate(() => window.__bc.sendChat('Super! Ich hole noch Fackeln.'));
    await host.page.evaluate(
      ({ base, target }) => {
        const bc = window.__bc;
        const p = bc.player();
        const dx = target.x - 1.2 - p.x;
        const dz = target.z - 1.5 - p.z;
        bc.look(Math.atan2(-dx, -dz), -0.12);
        bc.simulateLock();
        void base;
      },
      { base, target },
    );
    await host.page.waitForFunction(() => window.__bc.chat().length >= 2, null, { timeout: 20_000 });
    await settle(host.page, 2000);
    const file = await shot(host.page, 'screenshot-4-mehrspieler.jpg', HIDE_UI_NOISE);
    await host.page.evaluate(() => window.__bc.quit());
    await host.page.waitForTimeout(1500);
    await guest.ctx.close();
    await host.ctx.close();
    return file;
  },
};

// ---------------------------------------------------------------------------

const server = await startServer();
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
try {
  for (const [name, fn] of Object.entries(SCENES)) {
    if (!want(name)) continue;
    console.log(`Szene «${name}» …`);
    await fn(browser);
  }
} finally {
  await browser.close();
  server?.kill();
}
