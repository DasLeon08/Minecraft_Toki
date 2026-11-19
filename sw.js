/* Blockcraft Service Worker: gehashte Assets cache-first, Seite network-first. */
const CACHE = 'bc-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  if (url.pathname.endsWith('/health') || url.pathname.endsWith('/ws')) return;

  if (url.pathname.includes('/assets/')) {
    // Dateinamen enthalten einen Hash → unveränderlich
    event.respondWith(
      caches.open(CACHE).then(async (cache) => {
        const hit = await cache.match(req);
        if (hit) return hit;
        const res = await fetch(req);
        if (res.ok) cache.put(req, res.clone());
        return res;
      }),
    );
    return;
  }

  // Seite & sonstige Dateien: zuerst Netz (mit kurzem Timeout), sonst Cache
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 4000);
        const res = await fetch(req, { signal: controller.signal });
        clearTimeout(timer);
        if (res.ok) cache.put(req, res.clone());
        return res;
      } catch (err) {
        const hit = await cache.match(req, { ignoreSearch: true });
        if (hit) return hit;
        throw err;
      }
    })(),
  );
});
