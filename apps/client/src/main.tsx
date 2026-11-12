import { render } from 'preact';
import { getPixelStyle, PIXEL_STYLES, setPixelStyle, type PixelStyle } from '@blockcraft/shared';
import { settings } from './settings';
import { currentGame } from './ui/controller';
import { clearIconCache } from './ui/icons';
import { textureVersion } from './ui/state';
import { App } from './ui/App';
import { boot } from './ui/controller';
import './ui/styles.css';

// Texturstil aus den Einstellungen; `?pixel=1|2|4` überschreibt ihn (für Vergleiche/Tests).
const px = Number(new URLSearchParams(location.search).get('pixel'));
const override = (PIXEL_STYLES as readonly number[]).includes(px) ? (px as PixelStyle) : null;
setPixelStyle(override ?? settings.value.textureStyle);
settings.subscribe((s) => {
  const style = override ?? s.textureStyle;
  if (style === getPixelStyle()) return;
  setPixelStyle(style);
  clearIconCache();
  currentGame()?.renderer.reloadTextures();
  textureVersion.value++;
});

render(<App />, document.getElementById('app')!);
// App muss gemountet sein (Spielcontainer), bevor gebootet wird.
requestAnimationFrame(() => void boot());

// Service Worker: cacht den Client für schnelle Starts (auch wenn der Render-Server schläft).
if (import.meta.env.PROD && 'serviceWorker' in navigator && !new URLSearchParams(location.search).has('nosw')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {
      // z. B. im Sandbox-iframe nicht erlaubt – kein Problem
    });
  });
}
