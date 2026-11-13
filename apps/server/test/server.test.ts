import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import WebSocket from 'ws';
import { loadConfig } from '../src/config';
import { createLogger } from '../src/log';
import { originAllowed, startServer, type RunningServer } from '../src/server';

let server: RunningServer;
let base: string;

beforeAll(async () => {
  const dir = mkdtempSync(join(tmpdir(), 'bc-dist-'));
  mkdirSync(join(dir, 'assets'));
  writeFileSync(join(dir, 'index.html'), '<!doctype html><title>Blockcraft</title>');
  writeFileSync(join(dir, 'assets', 'app-abc.js'), 'console.log(1)');
  const config = loadConfig({ PORT: '0', CLIENT_DIST_DIR: dir, LOG_LEVEL: 'error' });
  server = await startServer(config, createLogger('error'), '/');
  base = `http://127.0.0.1:${server.port}`;
});

afterAll(async () => {
  await server.close();
});

describe('Server', () => {
  it('/health antwortet mit 200 und JSON', async () => {
    const res = await fetch(`${base}/health`);
    expect(res.status).toBe(200);
    const body = (await res.json()) as { ok: boolean; name: string };
    expect(body.ok).toBe(true);
    expect(body.name).toBe('Blockcraft');
  });

  it('liefert den Client aus (index.html no-cache, Assets immutable)', async () => {
    const page = await fetch(`${base}/`);
    expect(page.status).toBe(200);
    expect(await page.text()).toContain('Blockcraft');
    expect(page.headers.get('cache-control')).toBe('no-cache');
    const asset = await fetch(`${base}/assets/app-abc.js`);
    expect(asset.headers.get('cache-control')).toContain('immutable');
    expect((await fetch(`${base}/fehlt.js`)).status).toBe(404);
    expect((await fetch(`${base}/../../etc/passwd`)).status).not.toBe(500);
  });

  it('ohne Client-Build zeigt / einen Hinweis statt 404', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'bc-empty-'));
    const config = loadConfig({ PORT: '0', CLIENT_DIST_DIR: dir, LOG_LEVEL: 'error' });
    const s2 = await startServer(config, createLogger('error'), '/');
    const res = await fetch(`http://127.0.0.1:${s2.port}/`);
    expect(res.status).toBe(200);
    expect(await res.text()).toContain('Spielserver');
    await s2.close();
  });

  it('WebSocket-Echo funktioniert', async () => {
    const ws = new WebSocket(`ws://127.0.0.1:${server.port}/ws`);
    const messages: string[] = [];
    await new Promise<void>((resolve, reject) => {
      ws.on('message', (d) => {
        messages.push(d.toString());
        if (messages.length === 1) ws.send('ping-123');
        if (messages.length === 2) resolve();
      });
      ws.on('error', reject);
    });
    ws.close();
    expect(JSON.parse(messages[0]).t).toBe('hello');
    expect(messages[1]).toBe('ping-123');
  });

  it('Origin-Prüfung', () => {
    expect(originAllowed('https://spiel.onrender.com', 'spiel.onrender.com', [])).toBe(true);
    expect(originAllowed('https://boese.example', 'spiel.onrender.com', [])).toBe(false);
    expect(originAllowed('https://toki-ashy.vercel.app', 'spiel.onrender.com', ['https://toki-ashy.vercel.app'])).toBe(true);
    expect(originAllowed('https://irgendwas.example', 'x', ['*'])).toBe(true);
  });
});
