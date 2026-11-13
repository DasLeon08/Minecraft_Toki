/**
 * Kopiert den fertigen Client-Build (apps/client/dist) in den Hauptordner des Repos,
 * damit `index.html` direkt sichtbar ist (z. B. für den Ordner-Upload auf Toki).
 * Aufruf: `pnpm export:web`
 */
import { cpSync, existsSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'apps', 'client', 'dist');
/** Nur diese Einträge gehören zum Web-Export im Hauptordner. */
export const EXPORT_ENTRIES = ['index.html', 'assets', 'sw.js', 'favicon.svg'];

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('Kein Build gefunden – zuerst `pnpm --filter @blockcraft/client build` ausführen.');
  process.exit(1);
}
for (const e of EXPORT_ENTRIES) rmSync(join(ROOT, e), { recursive: true, force: true });
for (const e of readdirSync(DIST)) {
  if (e === '.git' || e === '.nojekyll' || e === 'README.md') continue;
  if (!EXPORT_ENTRIES.includes(e)) {
    console.error(`Unerwartete Datei im Build: ${e} – bitte EXPORT_ENTRIES ergänzen.`);
    process.exit(1);
  }
  cpSync(join(DIST, e), join(ROOT, e), { recursive: true });
}
console.log('Web-Export im Hauptordner aktualisiert:', EXPORT_ENTRIES.join(', '));
