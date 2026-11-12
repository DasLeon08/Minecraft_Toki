/** Minimaler statischer Dateiserver für den Client-Build (mit gzip und Cache-Headern). */
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { createGzip } from 'node:zlib';
import type { IncomingMessage, ServerResponse } from 'node:http';

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.ogg': 'audio/ogg',
  '.wasm': 'application/wasm',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};
const COMPRESSIBLE = new Set(['.html', '.js', '.mjs', '.css', '.json', '.svg', '.txt', '.webmanifest']);

export function createStaticHandler(dir: string) {
  const root = resolve(dir);
  const available = existsSync(join(root, 'index.html'));

  return function serve(req: IncomingMessage, res: ServerResponse): boolean {
    if (!available) return false;
    const url = new URL(req.url ?? '/', 'http://x');
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.endsWith('/')) pathname += 'index.html';
    const file = normalize(join(root, pathname));
    if (!file.startsWith(root + sep) && file !== root) return false;
    let target = file;
    if (!existsSync(target) || !statSync(target).isFile()) {
      // Unbekannte Pfade ohne Dateiendung → index.html (Single-Page-App)
      if (extname(pathname)) return false;
      target = join(root, 'index.html');
    }
    const ext = extname(target);
    const headers: Record<string, string> = {
      'Content-Type': MIME[ext] ?? 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
      // Bewusst kein X-Frame-Options/frame-ancestors: Einbettung in iframes (z. B. Toki) ist erlaubt.
      'Cache-Control': target.includes(`${sep}assets${sep}`) ? 'public, max-age=31536000, immutable' : 'no-cache',
    };
    const gzip = COMPRESSIBLE.has(ext) && /\bgzip\b/.test(String(req.headers['accept-encoding'] ?? ''));
    if (gzip) {
      headers['Content-Encoding'] = 'gzip';
      headers.Vary = 'Accept-Encoding';
    } else headers['Content-Length'] = String(statSync(target).size);
    res.writeHead(200, headers);
    if (req.method === 'HEAD') {
      res.end();
      return true;
    }
    const stream = createReadStream(target);
    if (gzip) stream.pipe(createGzip({ level: 6 })).pipe(res);
    else stream.pipe(res);
    return true;
  };
}
