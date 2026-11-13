/**
 * HTTP + WebSocket. Phase 0/1: Health-Check, statischer Client, WebSocket-Echo
 * (Verbindungstest). Phase 3: Räume mit Raumcode und autoritativer Simulation.
 */
import { createServer, type Server } from 'node:http';
import { resolve } from 'node:path';
import { WebSocketServer, type WebSocket } from 'ws';
import { GAME_NAME, GAME_VERSION } from '@blockcraft/shared';
import type { ServerConfig } from './config';
import type { Logger } from './log';
import { createStaticHandler } from './static';

export interface RunningServer {
  http: Server;
  wss: WebSocketServer;
  port: number;
  close(): Promise<void>;
}

export function originAllowed(origin: string | undefined, host: string | undefined, allowed: string[]): boolean {
  if (allowed.includes('*')) return true;
  if (!origin) return true; // Nicht-Browser-Clients (z. B. Tests)
  try {
    const o = new URL(origin);
    if (host && o.host === host) return true;
    return allowed.some((a) => a === origin || a === o.host);
  } catch {
    return false;
  }
}

export function startServer(config: ServerConfig, log: Logger, rootDir = process.cwd()): Promise<RunningServer> {
  const serveStatic = createStaticHandler(resolve(rootDir, config.CLIENT_DIST_DIR));
  const startedAt = Date.now();

  const http = createServer((req, res) => {
    const url = new URL(req.url ?? '/', 'http://x');
    if (url.pathname === '/health' || url.pathname.endsWith('/health')) {
      res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'Access-Control-Allow-Origin': '*' });
      res.end(
        JSON.stringify({
          ok: true,
          name: GAME_NAME,
          version: GAME_VERSION,
          uptime: Math.round((Date.now() - startedAt) / 1000),
          connections: wss.clients.size,
        }),
      );
      return;
    }
    if (req.method === 'GET' || req.method === 'HEAD') {
      if (serveStatic(req, res)) return;
      if (url.pathname === '/') {
        // Ohne mitgelieferten Client (Normalfall auf Render): kurzer Hinweis statt 404
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' });
        res.end(`${GAME_NAME}-Spielserver ${GAME_VERSION} läuft. Das Spiel selbst gibt es auf der Spieleseite (Toki).`);
        return;
      }
    }
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Nicht gefunden');
  });

  const wss = new WebSocketServer({ noServer: true, maxPayload: 1024 * 1024 });
  http.on('upgrade', (req, socket, head) => {
    const url = new URL(req.url ?? '/', 'http://x');
    if (!url.pathname.endsWith('/ws')) {
      socket.destroy();
      return;
    }
    if (!originAllowed(req.headers.origin, req.headers.host, config.ALLOWED_ORIGINS)) {
      log.warn('WebSocket abgelehnt (Origin)', req.headers.origin);
      socket.write('HTTP/1.1 403 Forbidden\r\n\r\n');
      socket.destroy();
      return;
    }
    wss.handleUpgrade(req, socket, head, (ws) => wss.emit('connection', ws, req));
  });

  wss.on('connection', (ws: WebSocket) => {
    log.debug('WebSocket verbunden');
    ws.send(JSON.stringify({ t: 'hello', name: GAME_NAME, version: GAME_VERSION }));
    ws.on('message', (data, isBinary) => {
      // Phase 0: Echo als Verbindungstest. Phase 3 ersetzt dies durch das Raumprotokoll.
      ws.send(data, { binary: isBinary });
    });
  });

  return new Promise((resolvePromise) => {
    http.listen(config.PORT, () => {
      const addr = http.address();
      const port = typeof addr === 'object' && addr ? addr.port : config.PORT;
      log.info(`${GAME_NAME} ${GAME_VERSION} läuft auf Port ${port}`);
      resolvePromise({
        http,
        wss,
        port,
        close: () =>
          new Promise<void>((r) => {
            for (const c of wss.clients) c.terminate();
            wss.close();
            http.close(() => r());
          }),
      });
    });
  });
}
