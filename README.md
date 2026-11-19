# Blockcraft

Eigenständiges Voxel-Sandbox-Spiel für den Browser (TypeScript, Vite, Three.js).
Bauen, graben, entdecken – in einer prozedural generierten, unendlichen Blockwelt.

> Arbeitstitel. Alle Namen, Texturen, Sounds und der Code sind eigenständig
> (siehe [docs/LEGAL.md](docs/LEGAL.md) und [docs/NAMING.md](docs/NAMING.md)).

## Stand: Phase 3 (Multiplayer)

**Neu in Phase 3**
- Mehrspieler über Raumcodes: eigene Welt als Raum öffnen, Freunde treten mit dem 6-stelligen Code bei
- Gemeinsame Welt auf dem Render-Server (gleiche Simulation wie im Singleplayer), andere Spieler als Figuren mit Namensschild
- Chat (T), Spielerliste (Tab), Raumcode mit Kopier-Knopf im Pausemenü
- Die Welt bleibt beim Host: Änderungen werden laufend und beim Verlassen in seinen Browser zurückgespeichert
- Komplett kantiger Pixel-Look mit eigener Pixel-Schrift für Logo, Überschriften und Buttons

**Aus Phase 2**
- Überlebensmodus: Leben, Hunger, Sättigung, Luft, Fallschaden, Ertrinken, Verhungern, Tod und Wiederbeleben
- Abbauen mit Fortschritt und Rissen, Werkzeuge in vier Stufen (Holz, Stein, Eisen, Lumit) mit Haltbarkeit, Drops als Items in der Welt
- Inventar mit 2×2-Crafting und Rüstung, Werktisch (3×3), Schmelze, Truhe, rund 40 Rezepte, Kreativ-Katalog mit Suche
- Fackeln, Lumiterz, Beerensträucher, Taiga mit Fichten, Sumpf, fliessendes Wasser
- Prozedurale Klänge und generative Musik, Lautstärke-Regler, frei belegbare Tasten

**Aus Phase 1**
- Unendliche Welt per Seed: Ebene, Wald, Wüste, Ozean, Strand, Gebirge, Schneefelder, Taiga, Sumpf; Höhlen, Erze, Bäume, Pflanzen, Wasser
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
| Linksklick (halten) | abbauen |
| Rechtsklick | platzieren · Werktisch/Schmelze/Truhe öffnen · essen (halten) |
| Mittelklick | anvisierten Block wählen |
| 1–9, Mausrad | Hotbar-Platz wählen |
| E | Inventar (im Kreativmodus mit Katalog) |
| Q (Strg+Q) | Item (Stapel) fallen lassen |
| T | Chat (im Mehrspieler) · Enter senden |
| Tab (halten) | Spielerliste (im Mehrspieler) |
| F3 | Debug-Anzeige |
| Esc | Pause |

Alle Tasten lassen sich unter Einstellungen → Tastenbelegung ändern.

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
| `pnpm export:web` | fertigen Web-Export in den Hauptordner kopieren (`index.html` usw.) |

URL-Parameter: `?debug=1` (Debug), `?bench=60` (60-s-Benchmark mit Sichtweite 8), `?pixel=1|2|4` (Texturstil überschreiben).

## Aufbau

```
apps/client      Browser-Spiel (Vite, Three.js, Preact-UI)
apps/server      Render-Dienst: Multiplayer-Spielserver (Räume, WebSocket, Health-Check)
packages/shared  Gemeinsame Logik: Blöcke, Welt, Generierung, Licht, Mesher, Physik, Simulation
tools/texturegen Export der prozeduralen Texturen
docs/            Plan, Namen, Rechtliches, Abnahme-Checklisten
```

Die Spiellogik (`packages/shared/src/sim`) läuft im Singleplayer im Browser und im
Multiplayer identisch auf dem Server (autoritativ, Räume mit Code).

## Hosting

- **Spiel (Client):** auf Toki, aus dem Branch `toki` (statische Dateien, siehe unten).
- **Render:** nur der Multiplayer-Spielserver. Der Singleplayer braucht Render nicht.

### Multiplayer einrichten (Render)

1. Auf [render.com](https://render.com) mit GitHub anmelden.
2. «New» → «Blueprint» → dieses Repository wählen. `render.yaml` wird erkannt und legt den
   Dienst `blockcraft-server` (Free-Plan, Branch `main`) an.
3. Nach dem Deploy `https://<dienst>.onrender.com/health` öffnen – Antwort `{"ok":true,…}`.
4. In GitHub unter *Settings → Secrets and variables → Actions → Variables* die Variable
   **`VITE_SERVER_URL`** = `https://<dienst>.onrender.com` anlegen (öffentlich, kein Geheimnis).
5. Die Action `Toki-Build` einmal manuell starten (*Actions → Toki-Build → Run workflow*) – danach
   verbindet sich das Spiel auf Toki mit diesem Server.
6. `ALLOWED_ORIGINS` (in `render.yaml` bzw. im Render-Dashboard) muss die Domain enthalten, unter
   der Toki das Spiel ausliefert (Standard: `https://toki-ashy.vercel.app`, mehrere kommagetrennt).

**Spielen:** Hauptmenü → «Mehrspieler» → Namen eingeben → eigene Welt wählen → «Raum erstellen».
Den Code (Pausemenü, «Code kopieren») an Freunde schicken; sie geben ihn unter «Beitreten» ein.
Verlässt der Host den Raum, wird er geschlossen und die Welt ist beim Host gespeichert.

Weitere Server-Einstellungen (Limits, Tick-Rate, Sichtweite, Tageslänge) stehen in `.env.example`.

Hinweis Free-Plan: Der Server schläft nach ca. 15 min ohne Verbindungen ein; der erste
Multiplayer-Beitritt danach dauert bis ca. 1 min («Server startet …»). Mit 0,1 CPU dauert auch das
erste Laden neuer Chunks etwas. Der Singleplayer ist davon nicht betroffen.

Lokal testen: `pnpm build && pnpm start` startet Server und Client zusammen unter
`http://localhost:8080` – zwei Browserfenster öffnen, eines erstellt den Raum, das andere tritt bei.

Einbettung (z. B. Toki): siehe [docs/EMBEDDING.md](docs/EMBEDDING.md).

**Upload auf Toki:** Im Hauptordner des Repos liegt der fertige Web-Export (`index.html`,
`assets/`, `sw.js`, `favicon.svg`) – diesen Ordner (bzw. das entpackte ZIP von `main`) bei Toki
auswählen. Er wird von der Action `Toki-Build` automatisch aktuell gehalten (lokal: `pnpm export:web`).
Alternativ enthält der Branch **`toki`** nur den Web-Export ohne Quellcode. Der Branch enthält nur
den fertigen Build und wird von der Action `Toki-Build` bei jedem Push auf `main` erneuert.
Bilder und Texte für die Spieleseite: [docs/toki/](docs/toki/README.md).

## Branches

| Branch | Zweck |
|---|---|
| `main` | Produktion (Render deployt den Multiplayer-Server automatisch) |
| `backup` | Spiegel von `main` (GitHub Action: Tags, wöchentlich, manuell) |
| `legacy` | alte Version (eingefroren) |
| `toki` | fertiger Build für Toki (automatisch aus `main`, nicht von Hand ändern) |
| Feature-Branches | Entwicklung → Pull Request → `main` |
