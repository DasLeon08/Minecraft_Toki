# Rechtliches & Herkunft der Assets

## Grundsätze

- Keine Assets, Texturen, Sounds, Musik, Logos, Schriftarten oder Code von Mojang/Microsoft.
- Keine geschützten Namen (siehe `NAMING.md`).
- Mechaniken dürfen sich vertraut anfühlen, das Aussehen ist eigenständig.

## Herkunft

| Asset | Herkunft |
|---|---|
| Block-Texturen | prozedural erzeugt in `packages/shared/src/textures/paint.ts` (eigene Paletten und Motive), drei Stile (fein / pixelig / sehr pixelig) |
| Block-Icons | zur Laufzeit aus denselben Texturen gerendert |
| Himmel, Sonne, Mond, Sterne, Wolken | eigene Shader und prozedurales Rauschen (`apps/client/src/render/Sky.ts`) |
| Logo | CSS-Schriftzug, keine Bilddatei |
| Favicon | eigenes SVG (`apps/client/public/favicon.svg`) |
| Schrift | Systemschriften des Geräts (kein eingebetteter Font); eigener Pixel-Font geplant |
| Sounds | zur Laufzeit synthetisiert (WebAudio: Rauschen, Filter, Hüllkurven) in `apps/client/src/audio/Sound.ts` – keine Audiodateien |
| Musik | generativ zur Laufzeit (eigene pentatonische Motive und Akkordfolgen) |
| Item-/Werkzeug-/Rüstungs-Sprites, HUD-Symbole | eigene ASCII-Pixelmasken in `textures/paint.ts` bzw. `apps/client/src/ui/icons.ts` |
| Noise | eigene Simplex-Implementierung nach öffentlich beschriebenem Verfahren |

## Abhängigkeiten (Lizenzen)

| Paket | Lizenz |
|---|---|
| three | MIT |
| preact, @preact/signals | MIT |
| idb | ISC |
| fflate | MIT |
| ws | MIT |
| vite, vitest, esbuild, typescript, eslint, playwright | MIT / Apache-2.0 / BSD |

## Review

Vor jedem Release: Texturgalerie (`pnpm textures:gallery`) durchsehen und prüfen,
dass keine Textur einer bekannten Vorlage nachgebildet ist.
