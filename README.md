# Blockcraft

Eigenständiges Voxel-Sandbox-Spiel für den Browser (TypeScript, Vite, Three.js).
Bauen, graben, entdecken – in einer prozedural generierten, unendlichen Blockwelt.

> Arbeitstitel. Alle Namen, Texturen, Sounds und der Code sind eigenständig
> (siehe [docs/LEGAL.md](docs/LEGAL.md) und [docs/NAMING.md](docs/NAMING.md)).

## Stand: Phase 1 (spielbarer Prototyp)

- Unendliche Welt per Seed: Ebene, Wald, Wüste, Ozean, Strand, Gebirge, Schneefelder; Höhlen, Erze, Bäume, Pflanzen, Wasser
- Chunk-Streaming mit Web Workern, Greedy Meshing, Face Culling, Ambient Occlusion, weiches Licht
- Sonnen- und Blocklicht (Leuchtkristall), Tag-Nacht-Zyklus mit Sonne, Mond, Sternen und Wolken
- Laufen, Sprinten, Schleichen (Kantenschutz), Springen, Schwimmen, Fliegen (Kreativ)
- Abbauen und Platzieren, Hotbar, Blockauswahl (E), Block aufnehmen (Mittelklick)
- Mehrere Welten im Browser (IndexedDB, nur veränderte Chunks), Export/Import als Datei
- Menüs: Hauptmenü, Weltauswahl, Einstellungen (Sichtweite, FOV, Maus, Auflösung, Texturstil), Pause, Debug-Anzeige (F3)

## Steuerung

| Taste | Aktion |
|---|---|
| W A S D | bewegen |
| Leertaste | springen · 2× = fliegen (Kreativ) |
| Shift | schleichen · im Flug: sinken |
| Strg oder 2× W | sprinten |
| Linksklick / Rechtsklick | abbauen / platzieren |
| Mittelklick | anvisierten Block in die Hotbar |
| 1–9, Mausrad | Hotbar-Platz wählen |
| E | Blockauswahl |
| F3 | Debug-Anzeige |
| Esc | Pause |

## Entwicklung

Voraussetzungen: Node 22, pnpm 10 (`corepack enable`).

```bash
pnpm install
cp .env.example .env      # optional, Standardwerte funktionieren
pnpm dev                  # Client unter http://localhost:5173
pnpm dev:server           # Server (WebSocket/Health) unter :8080
```

| Befehl | Zweck |
|---|---|
| `pnpm build` | Client (`apps/client/dist`) + Server (`apps/server/dist`) bauen |
| `pnpm start` | gebauten Server starten (liefert auch den Client aus) |
| `pnpm test` | Unit-Tests inkl. Performance-Budgets (Vitest) |
| `pnpm e2e` | Browser-Tests (Playwright; vorher `pnpm build`) |
| `pnpm lint` / `pnpm typecheck` | Codequalität |
| `pnpm textures:gallery` | Texturen als PNG nach `tools/texturegen/out/` |

URL-Parameter: `?debug=1` (Debug), `?bench=60` (60-s-Benchmark mit Sichtweite 8), `?pixel=1|2|4` (Texturstil überschreiben).

## Aufbau

```
apps/client      Browser-Spiel (Vite, Three.js, Preact-UI)
apps/server      Render-Dienst: liefert den Client aus + WebSocket-Spielserver
packages/shared  Gemeinsame Logik: Blöcke, Welt, Generierung, Licht, Mesher, Physik, Simulation
tools/texturegen Export der prozeduralen Texturen
docs/            Plan, Namen, Rechtliches, Abnahme-Checklisten
```

Die Spiellogik (`packages/shared/src/sim`) läuft im Singleplayer im Browser und ab
Phase 3 identisch auf dem Server (autoritativer Multiplayer mit Raumcodes).

## Deploy (Render)

1. Auf [render.com](https://render.com) mit GitHub verbinden.
2. «New» → «Blueprint» → dieses Repository → `render.yaml` wird erkannt.
3. Nach dem Deploy: `https://<dienst>.onrender.com` spielen, `…/health` prüfen.

Hinweis Free-Plan: Der Dienst schläft nach ca. 15 min ohne Aufrufe ein; der erste
Aufruf danach dauert bis ca. 1 min. Wiederkehrende Spieler starten dank Service
Worker trotzdem sofort in den Singleplayer.

Einbettung (z. B. Toki): siehe [docs/EMBEDDING.md](docs/EMBEDDING.md).

## Branches

| Branch | Zweck |
|---|---|
| `main` | Produktion (Render deployt automatisch) |
| `backup` | Spiegel von `main` (GitHub Action: Tags, wöchentlich, manuell) |
| `legacy` | alte Version (eingefroren) |
| Feature-Branches | Entwicklung → Pull Request → `main` |
