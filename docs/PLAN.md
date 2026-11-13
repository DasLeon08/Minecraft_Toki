# Umsetzungsplan: Voxel-Sandbox «Blockcraft» (Browser + Multiplayer, alles auf Render)

## Context

Ziel ist ein eigenständiges Voxel-Sandbox-Spiel, das sich spielerisch wie die Java Edition des bekannten Vorbilds anfühlt, aber in Namen, Grafik, Sound und Code komplett eigenständig ist. Es läuft im Browser (die Einbettung in Toki übernimmst du selbst).

Deine Entscheidungen:
- Name **«Blockcraft»**. Der Name ist zentral in einer Config-Datei hinterlegt, Namespace `bc:`. ⚠️ Hinweis siehe §14.
- **Alles auf Render**: ein Render Web Service liefert den statischen Client **und** den WebSocket-Spielserver unter einer URL aus.
- **Render Free** zum Start.
- **Multiplayer in Phase 3**: Raumcodes, autoritativer Server.

Ausgangslage: Das Repo `DasLeon08/Minecraft_Toki` ist leer, es gibt keinen bestehenden Code. Die Toki-Seite war aus der Sandbox nicht erreichbar. Deshalb plane ich einen **generischen, einbettbaren Build** (Details in §10), den du in Toki per iframe auf die Render-URL einhängst.

**Wichtigste Architekturentscheidung:** Von Phase 1 an ist die Spiellogik als «Server» gebaut, der lokal im Browser läuft (wie ein integrierter Server). Im Singleplayer redet der Client über einen `LocalTransport` mit dieser Logik, im Multiplayer über einen `WsTransport` mit dem Render-Server. **Derselbe Code** (`packages/shared`) läuft an beiden Orten. Dadurch ist der Multiplayer später kein Umbau, sondern im Wesentlichen eine neue Transportschicht.

---

## 1. Stack

| Bereich | Wahl | Begründung |
|---|---|---|
| Sprache | TypeScript (strict) | Typen sind zwischen Client, Server und Protokoll geteilt |
| Build | Vite 6 | schnell, `base: './'` für beliebige Unterpfade bzw. iframes, Worker-Support eingebaut |
| 3D | **Three.js** (eigene `BufferGeometry` + `ShaderMaterial`) | klein, flexibel, grosse Community. Szenengraph und Kamera kommen aus Three.js, Shader und Chunk-Meshes bauen wir selbst. Babylon.js wäre schwerer und bringt für Voxel keinen Vorteil |
| Texturen | `DataArrayTexture` (WebGL2 `sampler2DArray`) | nötig für Greedy Meshing: verschmolzene Flächen können die Textur kacheln, ohne dass die Ränder ineinanderlaufen |
| UI | Preact + Signals (DOM-Overlay über dem Canvas) | Menüs und Inventar als HTML/CSS sind einfacher und zugänglicher als Canvas-UI, ca. 4 KB |
| Worker | native Web Workers + Transferables, eigener kleiner RPC-Wrapper | kein Kopieren grosser Buffer, keine Abhängigkeit |
| Speicher | IndexedDB über `idb` | asynchron, grosse Binärdaten, mehrere Welten |
| Kompression | `fflate` | Chunk-Kompression für Speicherung und Netzwerk |
| Noise | eigene Simplex- und OpenSimplex-Implementierung mit seedbarem PRNG | deterministisch auf Client und Server |
| Server | Node 22 + `ws`, TypeScript, `worker_threads` für die Generierung | läuft auf einem Render Web Service, WebSockets werden unterstützt |
| Tests | Vitest (Unit und Benchmark), Playwright (E2E, Performance-Smoke) | |
| Monorepo | pnpm Workspaces | `apps/client`, `apps/server`, `packages/shared`, `tools/*` |

## 2. Ordnerstruktur

```
/
├─ apps/
│  ├─ client/                 Vite-App (statischer Build → dist/)
│  │  ├─ index.html
│  │  └─ src/
│  │     ├─ main.ts           Bootstrapping, Game Loop
│  │     ├─ config/env.ts     liest und validiert VITE_*-Variablen
│  │     ├─ render/           Renderer, ChunkMeshStore, Shader, Himmel, Wolken, Partikel, Block-Umriss, Abbau-Overlay
│  │     ├─ world/            ClientWorld (Chunk-Replika), ChunkStreamer (Lade-Reihenfolge)
│  │     ├─ workers/          mesh.worker.ts, gen.worker.ts, WorkerPool.ts
│  │     ├─ player/           lokaler Spieler, Vorhersage (Prediction), Raycast, Interaktion
│  │     ├─ input/            Tastatur/Maus/Pointer Lock, Keybinding-Map (später Touch)
│  │     ├─ ui/               Hauptmenü, Weltauswahl, Einstellungen, Pause, HUD, Inventar-Screens
│  │     ├─ audio/            WebAudio-Mixer, 3D-Sound, Musik
│  │     ├─ storage/          IndexedDB-Schema, WorldStore, Migrationen, Export/Import
│  │     ├─ net/              Transport-Interface, LocalTransport, WsTransport
│  │     └─ debug/            F3-Overlay (FPS, Chunks, Draw Calls), Test-Hooks für E2E
│  └─ server/                 Render-Spielserver
│     └─ src/
│        ├─ index.ts          HTTP (/health) + WebSocket-Upgrade
│        ├─ config.ts         Env-Validierung
│        ├─ rooms/            RoomManager, Room (eine Sim-Instanz pro Raum), Raumcodes
│        ├─ net/              Session, Rate Limits, Validierung
│        └─ gen/              worker_threads-Pool für die Generierung
├─ packages/
│  └─ shared/                 reines TS, kein DOM, kein Node
│     ├─ registry/            Blöcke, Items, Rezepte, Werkzeuge, Biome (datengetrieben)
│     ├─ world/               ChunkSection, ChunkColumn, World-Zugriff, Koordinaten
│     ├─ gen/                 Terrain, Biome, Höhlen, Erze, Features (Bäume …)
│     ├─ light/               Sonnen- und Blocklicht-BFS
│     ├─ mesh/                Greedy Mesher (läuft im Worker)
│     ├─ physics/             AABB-Kollision, Bewegungsmodell
│     ├─ sim/                 Simulation: Tick-Loop, Spieler, Entities, Inventar, Crafting, Öfen
│     ├─ entity/              Mobs, KI, Pathfinding
│     └─ protocol/            Nachrichten-Typen + binärer Encoder/Decoder
├─ tools/
│  ├─ texturegen/             erzeugt Pixel-Art-Texturen + Atlas aus Definitionen
│  └─ soundgen/               erzeugt Soundeffekte prozedural (sfxr-artige Synthese)
├─ assets-src/                Paletten, Texturdefinitionen, optional handgezeichnete PNGs
├─ docs/                      PLAN.md, NAMING.md, LEGAL.md, checklists/phase-N.md
├─ .github/workflows/ci.yml
├─ render.yaml                Render Blueprint (ein Web Service: Client + Server)
└─ .env.example               alle Variablen dokumentiert, ohne Werte für Geheimnisse
```

## 3. Module & Datenfluss

```
             Main Thread (Client)                                     Worker-Pool (N = cores-1, max 4)
┌──────────────────────────────────────────────┐            ┌──────────────────────────────┐
│ Input → PlayerController (Prediction, Physik) │──gen req──▶│ gen.worker: Terrain + Licht  │
│   │                                           │◀─Buffer────│ (transferable ArrayBuffer)   │
│   ▼                                           │            ├──────────────────────────────┤
│ ClientSession ──Transport──▶ Sim (shared/sim) │──mesh req─▶│ mesh.worker: Greedy + AO     │
│   ▲            ◀─Events/Snapshots──           │◀─Vertices──│ (zustandslos, gepaddete      │
│   │                                           │            │  18³-Section-Kopie rein)     │
│ ClientWorld (Chunk-Replika) ─dirty─▶ MeshQueue │            └──────────────────────────────┘
│ Renderer (Three.js) ◀── ChunkMeshStore        │
│ UI (Preact) ◀── Signals (Inventar, HP, Hunger)│
│ Storage (IndexedDB) ◀── Sim speichert Chunks  │
└──────────────────────────────────────────────┘
Singleplayer: Transport = LocalTransport (Sim läuft im Main Thread, später optional in einem eigenen Worker)
Multiplayer:  Transport = WsTransport → Render-Server (dieselbe Sim, autoritativ)
```

- **Sim** (`shared/sim`): autoritativer Spielzustand mit fester Tickrate von 20 TPS (Mobs, Öfen, Wachstum, Wasser, Hunger). Sie kennt kein Rendering.
- **Client**: rendert mit 60+ FPS und interpoliert zwischen den Ticks. Die eigene Bewegung läuft lokal (Prediction) und wird vom Server bestätigt oder korrigiert.
- **Worker** halten keinen Weltzustand. Sie bekommen Eingabe-Buffer und geben Ergebnis-Buffer zurück (Transferables, keine Kopie). Gen-Worker liefern fertige Spalten inkl. vorläufigem Sonnenlicht. Mesh-Worker bekommen eine Section samt 1-Block-Rand der Nachbarn (für Culling, AO und Licht an Chunkgrenzen).
- **Prioritäten-Queue**: Laden und Meshen in Spiralreihenfolge um den Spieler, Chunks im Blickfeld zuerst, Upload-Budget max. ca. 4 ms pro Frame.

## 4. Welt

### Chunk-System
- **Spalte 16×16, Höhe 256 (y 0–255), aufgeteilt in 16 Sections à 16³.** Leere Sections sind `null` (kein Speicher, kein Mesh).
- Section: `Uint16Array(4096)` mit Block-IDs plus `Uint8Array(4096)` für Licht (4 Bit Sonne, 4 Bit Block). Optional später Palette-Kompression.
- Blöcke sind datengetrieben (`registry/blocks.ts`): String-ID (`bc:stein`), numerische Laufzeit-ID, Härte, bevorzugtes Werkzeug, Transparenz (opak, ausgeschnitten, durchscheinend), Lichtemission, Drops und Texturen pro Seite.

### Meshing & Rendering
- **Face Culling**: Eine Fläche entsteht nur, wenn der Nachbar nicht opak ist (auch über Chunkgrenzen, dank Padding).
- **Greedy Meshing** pro Section und Richtung: Verschmolzen werden nur Flächen mit gleicher Textur, gleichem AO und gleichem Licht. Dadurch bleiben Smooth Lighting und AO korrekt.
- **Ambient Occlusion** pro Vertex (klassische 3-Nachbarn-Regel), Smooth Lighting (Mittelwert der 4 Nachbarn).
- **Gepacktes Vertex-Format**: Position (3×Uint8 bzw. Int16), Normale+AO+Licht in einem `Uint32`, Texturlayer `Uint16`. Das sind ca. 12 Bytes pro Vertex statt ca. 32.
- **Drei Render-Passes pro Section**: opak, ausgeschnitten (Blätter, alpha-tested) und durchscheinend (Wasser, Glas; nach Entfernung sortiert, Back-to-Front).
- **Frustum Culling** pro Section. Später zusätzlich Cave Culling (Sichtbarkeitsgraph durch Sections), um unterirdische Höhlen auszublenden.
- **Render-Distanz** 2–16 (Standard 8). Nebel kaschiert die Kante, entladen wird mit Hysterese (RD+2), damit Chunks nicht flackern.
- Budget bei RD 8: ≤ 800 Draw Calls und ≤ 2,5 Mio. Dreiecke sichtbar. Wird das verfehlt, folgt als Fallback das Zusammenlegen mehrerer Sections zu Regionen bzw. `WEBGL_multi_draw`/`BatchedMesh`.

### Prozedurale Generierung (deterministisch über den Seed)
1. **Klima-Noise** (Temperatur, Feuchte, «Kontinentalität», Erosion) → Biom-Auswahl. Phase 1: Ebene, Wald, Wüste, Ozean, Strand. Später: Taiga, Gebirge, Sumpf, Savanne, Schneefelder.
2. **Höhe**: mehroktaviges Noise, über eine Spline-Kurve auf die Kontinentalität abgebildet (flache Ebenen, steile Berge). Ab Phase 2 wird 3D-Dichte-Noise für Überhänge beigemischt.
3. **Oberfläche** je nach Biom (Gras/Erde, Sand/Sandstein, Schnee), Meeresspiegel y=62, Wasser füllt alles darunter.
4. **Höhlen**: «Käse»-Höhlen (3D-Noise-Schwelle) plus «Spaghetti»-Tunnel (zwei sich schneidende Noise-Felder). Ab Phase 2 kommen Höhlenseen und Lavaseen in der Tiefe dazu.
5. **Erze**: Pro Chunk werden mit einem PRNG aus `hash(seed, cx, cz, erz)` Adern mit Höhenverteilung je Erz platziert.
6. **Features (Bäume, Kakteen, Blumen, später Dörfer)**: Jede Spalte berechnet die Feature-Ursprünge ihrer eigenen und der 8 Nachbarspalten (deterministisch) und schreibt nur die Blöcke, die in ihr selbst liegen. So kommt es nie zu Abhängigkeiten oder abgeschnittenen Bäumen an Chunkgrenzen.
7. **Golden-Hash-Test**: gleicher Seed → gleicher Hash pro Chunk, auf Client wie Server.

### Licht
- **Sonnenlicht**: In der Spalte fällt es senkrecht auf Stufe 15, dann breitet es sich per BFS seitlich aus und verliert 1 pro Block. Über Chunkgrenzen hinweg wird nachpropagiert, sobald Nachbarn geladen sind.
- **Blocklicht** (Fackeln, Lava, Leuchtsteine): ebenfalls BFS mit Stufen 0–15.
- **Inkrementelle Updates** beim Abbauen/Platzieren laufen mit zwei Queues (Licht entfernen, Licht hinzufügen). Danach werden nur die betroffenen Sections neu gemesht.
- **Tag-Nacht-Zyklus**: Der Shader multipliziert das Sonnenlicht mit einem Uniform `uDaylight`, deshalb ist beim Tageswechsel **kein Remesh** nötig. Standarddauer 20 Minuten (per Env bzw. Spielregel änderbar). Eigener Himmel: Gradient-Shader, eigene Sonne und eigener Mond (eigenes Design), Sterne, prozedurale Wolken.

## 5. Gameplay (nach Phasen)

**Bewegungsmodell**: festes 20-TPS-Physikmodell mit Interpolation auf die Framerate. Werte sind auf ein vertrautes Gefühl abgestimmt: Gravitation, Luftwiderstand, Sprunghöhe ca. 1,25 Blöcke, Hitbox 0,6×1,8, Augenhöhe 1,62. Laufen, Sprinten (Doppel-W oder Taste), Schleichen (schützt vor dem Runterfallen an Kanten), Springen, Schwimmen (Auftrieb, langsamer). Kollision über AABB-Sweep pro Achse, automatisches Hochsteigen von Stufen nur beim Laufen auf Halbblöcken. Fallschaden ab mehr als 3 Blöcken (1 HP pro weiterem Block), Wasser dämpft den Fall.

**Abbauen/Platzieren**: DDA-Raycast mit 4,5 Blöcken Reichweite (Creative 5). Abbauzeit = Härte × Faktor, abhängig von Werkzeugtyp und Material. Abbau-Risse als Overlay-Textur. Platzieren prüft die Kollision mit Entities. Hotbar mit 9 Slots, Mausrad, Tasten 1–9.

**Inventar & Crafting**: 36 Slots plus Rüstung plus Offhand. Stapel bis 64, Werkzeuge mit Haltbarkeit. Bedienung wie gewohnt: Linksklick aufnehmen, Rechtsklick halbieren, Shift-Klick verschieben, Ziehen zum Verteilen. 2×2-Crafting im Inventar, 3×3 an der Werkbank (eigener Name). Rezepte sind datengetrieben (geformt und formlos). Ofen mit Brennstoff- und Schmelzzeit, Truhen (einzeln/doppelt). Container sind Block-Entities in der Sim und werden mit dem Chunk gespeichert.

**Überleben**: 20 HP, 20 Hunger plus versteckte Sättigung. Regeneration bei vollem Hunger, Schaden bei leerem. Rüstungswert reduziert Schaden. Tod → Items fallen, Respawn am Spawn oder Bett. Spielmodi Survival und Creative (Creative: Fliegen, sofortiges Abbauen, Item-Katalog), umschaltbar per Befehl oder Welteinstellung.

**Mobs**: Entity-System in der Sim (Position, Velocity, AABB, HP, KI-Zustand). Friedliche Tiere spawnen bei der Generierung und auf Gras, feindliche Kreaturen bei Lichtstufe ≤ 7 bzw. nachts. Pathfinding mit **A* auf dem Block-Gitter** (begehbar: fester Block darunter, 2 Blöcke Luft; Sprung um 1, Fall bis 3), Pfad-Cache, max. 1 Pfadsuche pro Mob und Sekunde, Suchgrenze 32 Blöcke. Drops über Loot-Tabellen. Modelle sind eigene Low-Poly-Box-Modelle mit eigenen Texturen.

**Spätere Phasen**: Logiksystem («Glimmwerk», siehe Namensliste) mit Signalstärke 0–15, Ausbreitung per Tick, Schaltern, Tastern, Druckplatten, Lampen, Verzögerern, Invertern und Kolben-Äquivalent. Verzauberungen («Runen»). Dörfer mit Bewohnern und Handel. Zwei weitere Dimensionen. Bosse.

### Namensvorschlag (wird in `docs/NAMING.md` gepflegt)

Generische Begriffe (Stein, Erde, Sand, Holz, Eisen, Gold, Kohle, Wasser) sind nicht geschützt. Alles mit typischem Wiedererkennungswert bekommt einen eigenen Namen:

| Funktion (Vorbild-Rolle) | Eigener Name (Vorschlag) |
|---|---|
| Spielfigur | Wanderer |
| Diamant-Äquivalent | Lumit |
| Obsidian-Äquivalent | Glutglas |
| Werkbank / Ofen | Werktisch / Schmelze |
| Logiksystem + Staub | Glimmwerk / Glimmstaub |
| Kolben | Stösser |
| Explodierender Mob | Zischling |
| Untoter Nahkämpfer | Moderling |
| Bogenschütze | Knöchler |
| Spinnen-Mob | Krabbler |
| Teleportierender Mob | Flimmerer |
| Schaf / Schwein / Kuh / Huhn | Wollbock / Grunzel / Hornrind / Pickhuhn |
| Feuer-Dimension | Aschelande |
| Leere-Dimension | Sternenrand |
| Endboss | Leerwyrm |
| Verzauberung | Runenkunde |
| Dorfbewohner | Siedler |

## 6. Speicherung (IndexedDB)
- **DB `bc-worlds`**, Stores: `worlds` (Meta: Name, Seed, Modus, Spielzeit, Spawn, Version, zuletzt gespielt, Vorschaubild), `chunks` (Key `[worldId, cx, cz]`, Wert: komprimierte Sections plus Block-Entities), `players`, `entities`.
- **Nur veränderte Chunks speichern**: Unveränderte Chunks werden aus dem Seed neu generiert. Ein Chunk wird «dirty», sobald die Sim einen Block oder eine Block-Entity ändert.
- Autosave alle 30 s plus bei `visibilitychange`/`pagehide`. Schreiben in einer Transaktion pro Batch.
- `navigator.storage.persist()` anfragen, Speicherverbrauch pro Welt in der Weltauswahl anzeigen (`storage.estimate()`).
- **Export/Import einer Welt als Datei**: wichtig, weil der Browser-Speicher in einem iframe pro einbettender Seite getrennt sein kann (Storage Partitioning), Safari kann ihn ausserdem löschen.
- Versioniertes Format mit Migrationsfunktionen (`version` in `worlds`).

## 7. UI
- **Hauptmenü** (eigenes Logo, eigener Pixel-Font, selbst erstellt als Bitmap-Font), Weltauswahl (erstellen, umbenennen, löschen, Seed, Modus, exportieren, importieren), Multiplayer (Raum erstellen / Code eingeben).
- **Einstellungen**: Render-Distanz, FOV (60–110), Maus-Sensitivität, Y-Achse invertieren, Tastenbelegung (frei belegbar, Konflikterkennung), Lautstärken, GUI-Grösse, Grafik (Smooth Lighting, Wolken, Partikel), Framerate-Limit. Gespeichert in `localStorage`.
- **Pausemenü** (Esc, gibt den Pointer Lock frei): Weiterspielen, Einstellungen, Raumcode anzeigen (MP), Speichern & Beenden.
- **HUD**: Fadenkreuz, Hotbar, Herzen, Hunger, Rüstung, Luftblasen, XP-Leiste (später), Chat (MP), Debug-Overlay (F3). Eigenes visuelles Design (Farben, Rahmen, Layout), keine Nachbildung der Vorbild-Optik.

## 8. Performance-Ziele & Techniken

Ziele (Referenzgerät: ein typischer Laptop mit integrierter GPU, z. B. Intel Iris Xe, i5 der 11. Generation, Chrome, 1080p):
- **≥ 60 FPS im Durchschnitt, 1%-Low ≥ 45 FPS** bei RD 8 im festgelegten Benchmark (Seed `BENCH`, 60 s Flug-Route)
- **< 5 s** vom Klick auf «Welt starten» bis zur Steuerung (Spawn-Bereich RD 3 fertig gemesht)
- **< 3 s** bis zum Hauptmenü bei 50 Mbit/s und wachem Render-Dienst (bzw. aus dem Service-Worker-Cache), JS-Bundle ≤ 1 MB gzip, Texturen ≤ 300 KB. Ausgenommen ist der Render-Free-Kaltstart beim allerersten Aufruf nach einer Ruhephase (§9).
- Speicher ≤ 600 MB JS-Heap plus GPU bei RD 8

Techniken: Worker-Pool für Generierung und Meshing (Main Thread bleibt frei), Greedy Meshing, gepacktes Vertex-Format, Texture Array statt Atlas-Bleeding-Tricks, Frustum Culling (später Cave Culling), leere Sections überspringen, Spawn zuerst mit RD 3 laden und Rest nachstreamen, Upload-Budget pro Frame, Objekt-Pools und Typed Arrays (keine GC-Spitzen im Game Loop), Geometrie-`dispose()` beim Entladen, ein einziges Shader-Programm pro Pass, dynamische Auflösung als Notbremse (renderScale 0,75), optional WASM für Mesher/Generierung, falls Benchmarks es verlangen.

## 9. Multiplayer (Render)

- **Ein einziger Render Web Service (Node)** übernimmt alles:
  - `GET /` und alle Assets: liefert das statische `apps/client/dist` aus (mit Kompression, lange Cache-Header für gehashte Dateien, `index.html` ohne Cache)
  - `GET /health`: Health Check
  - `GET /ws`: WebSocket-Upgrade für den Multiplayer
  
  Gleiche Origin, deshalb kein CORS-Aufwand. `VITE_SERVER_URL` ist standardmässig leer und bedeutet «gleicher Host». Für lokale Entwicklung oder einen späteren separaten Server bleibt die Variable überschreibbar.
- **Autoritativer Server**: Jeder Raum ist eine eigene Sim-Instanz (gleicher Code wie im Singleplayer). Die Generierung läuft in `worker_threads`, auf Free mit nur 1 Thread.
- **Räume nur per Code**: 6 Zeichen aus einem Alphabet ohne verwechselbare Zeichen (`ABCDEFGHJKMNPQRSTUVWXYZ23456789`, ca. 1 Mrd. Kombinationen). Es gibt keine öffentliche Raumliste. Rate Limit für Beitrittsversuche pro IP gegen Durchprobieren. Max. Spieler pro Raum per Env (Standard 8).
- **Welt-Herkunft**: Der Host wählt eine lokale Welt, der Client lädt Seed plus veränderte Chunks hoch. Der Server ist während der Sitzung autoritativ und schickt regelmässig (und beim Schliessen) die Änderungen an den Host zurück, der sie in IndexedDB speichert. **Der Server braucht so keine persistente Disk** (auf Render kostenpflichtig).
- **Protokoll**: WebSocket, binär (eigener Encoder in `shared/protocol`, Versionsnummer im Handshake). Nachrichten u. a. `join`, `chunkData` (komprimiert), `blockUpdate`, `playerInput` (mit Sequenznummer), `snapshot` (Entities, Delta-kodiert), `inventory`, `chat`.
- **Chunk-Sync**: Der Server schickt Chunks in Spiralreihenfolge um jeden Spieler (Interest Management nach Render-Distanz, Server-Max per Env), danach nur noch Block-Deltas.
- **Latenz**:
  - eigene Bewegung: Client-Prediction plus Server-Reconciliation (Inputs mit Sequenznummer werden nach einer Korrektur erneut angewendet)
  - andere Spieler und Mobs: Interpolation mit ca. 100 ms Puffer
  - Blöcke: optimistisch sofort anzeigen, bei Ablehnung zurücksetzen
  - Server prüft Reichweite, Abbauzeit, Geschwindigkeit und Inventar (einfacher Anti-Cheat)
- **Render-Besonderheiten (Free)**: `PORT` kommt von Render. Der Free-Plan schläft nach ca. 15 min ohne Anfragen ein, und weil der Client jetzt auch auf Render liegt, betrifft der **Kaltstart (bis ca. 1 min) auch den Singleplayer beim ersten Seitenaufruf**. Gegenmassnahmen:
  - Service Worker cacht den Client nach dem ersten Besuch. Wiederkehrende Spieler starten den Singleplayer dann sofort, auch wenn der Server schläft.
  - Der Server wird beim Öffnen des Multiplayer-Menüs per Ping «geweckt», dazu die Anzeige «Server startet…».
  - Optional: Dieselbe `dist/` zusätzlich statisch in Toki ablegen. Der Build bleibt dafür kompatibel, eine Entscheidung ist jetzt nicht nötig.
  
  Free hat wenig CPU (0,1 vCPU) und 512 MB RAM. Deshalb gilt ein konservatives Server-Limit, z. B. max. 3 Räume à 4 Spieler mit Server-RD 6, alles per Env einstellbar. Sobald Mobs im Multiplayer laufen (Phase 4), wird ein Upgrade auf Starter vermutlich nötig, das messe ich dann. Deploy über `render.yaml` (Blueprint) aus `main`: Build-Befehl `pnpm i && pnpm build`, Start-Befehl `node apps/server/dist/index.js`.
- **Leere Räume** werden nach X Minuten geschlossen (Env), vorher letzter Sync an den Host.

## 10. Build, Deploy, Konfiguration, Git

**Client-Build (einbettbar):** `vite build` mit `base: './'` erzeugt einen statischen Ordner `dist/` mit `index.html` als Einstieg und nur relativen Pfaden. Der Render-Server liefert ihn aus, er funktioniert aber auch ohne Änderung auf jedem statischen Host. In Toki bettest du `https://<dein-dienst>.onrender.com` per iframe ein. Der Canvas füllt seinen Container, das Spiel funktioniert im iframe. Pointer Lock und Fullscreen nur nach einem Klick des Nutzers. Hinweis für dich bei der Einbettung: Im iframe braucht es `allow="fullscreen; pointer-lock"` bzw. bei `sandbox` zusätzlich `allow-pointer-lock allow-scripts allow-same-origin`. Optional ein `postMessage`-Hook (Spiel geladen/pausiert), falls Toki so etwas nutzt. Ein Vorschaubild (z. B. 512×512 und 16:9) liefere ich mit.

**Env-Variablen** (`.env.example` wird committet, `.env*` ist in `.gitignore`, beim Start mit `zod` validiert):
- Client (öffentlich, landet im Build, darum keine Geheimnisse!): `VITE_SERVER_URL`, `VITE_DEFAULT_SEED`, `VITE_DEBUG`, `VITE_MAX_RENDER_DISTANCE`, `VITE_DEFAULT_RENDER_DISTANCE`, `VITE_DAY_LENGTH_SECONDS`
- Server: `PORT`, `ALLOWED_ORIGINS`, `MAX_ROOMS`, `MAX_PLAYERS_PER_ROOM`, `ROOM_CODE_LENGTH`, `TICK_RATE`, `MAX_VIEW_DISTANCE`, `ROOM_IDLE_TIMEOUT_MIN`, `JOIN_RATE_LIMIT_PER_MIN`, `LOG_LEVEL`

**Branches:**
- `main`: Produktion. Der Render-Dienst (Client + Server) deployt automatisch von hier.
- `backup`: Sicherung von `main`. Eine GitHub Action spiegelt `main` vor jedem Release-Tag und zusätzlich wöchentlich, alternativ manuell.
- `legacy`: alte Version, unverändert eingefroren (Inhalt siehe offene Fragen)
- Entwickelt wird auf Feature-Branches (aktuell `claude/busy-hawking-0zrmi8`) → Pull Request → `main`.

**CI** (GitHub Actions): Lint, Typecheck, Vitest, Build, Playwright-Smoke (headless Chromium) bei jedem PR.

## 11. Asset-Pipeline (100 % eigen)

- **Texturen**: `tools/texturegen` (Node-Skript) erzeugt aus Definitionen in `assets-src/textures/*.ts` 16×16-Pixel-Art. Bausteine dafür sind eigene Palette, Noise, Muster-Generatoren (Maserung, Körnung, Risse, Kristalle, Ziegel), Randschattierung und ein Seed pro Textur. Optional überschreiben handgezeichnete PNGs (Piskel/Aseprite) eine generierte Textur. Ausgabe: Layer-Liste für das `DataArrayTexture` plus `textures.json`-Manifest, eingebunden über ein Vite-Plugin beim Build. Die Abbau-Risse, Item-Icons (Blöcke als isometrische Mini-Renders, automatisch erzeugt) und Mob-Skins kommen aus derselben Pipeline.
- **Eigene visuelle Identität**: eigene Farbpalette (z. B. wärmer und gesättigter), andere Grasseite, andere Erz-Formen, eigene UI-Rahmen. Abnahmekriterium: Eine Texturgalerie (`/debug/textures`) ist durchgesehen und enthält keine Nachbildung bekannter Vorbilder.
- **Sounds**: `tools/soundgen` mit sfxr-artiger Synthese (Rauschen, Hüllkurven, Filter) für Schritte pro Material, Abbauen, Platzieren, Schaden, Essen und Mob-Laute. Ausgabe als kleine OGG/Opus-Dateien, alternativ zur Laufzeit per WebAudio erzeugt. **Musik**: generative Ambient-Musik per WebAudio (eigene Skalen und Akkorde) oder später selbst komponiert.
- **Font**: eigener Bitmap-Pixel-Font (aus der Pipeline erzeugt).
- `docs/LEGAL.md`: Herkunft jedes Assets, Lizenzen aller npm-Pakete (nur MIT, BSD, Apache, ISC), keine geschützten Namen.

## 12. Testen

| Ebene | Was | Werkzeug |
|---|---|---|
| Unit | Chunk-Speicher, Koordinaten, Greedy Mesher (Flächenzahl, keine Lücken), Licht-BFS (Add/Remove), Worldgen-Determinismus (Golden Hashes), Physik (Kollision, Stufen, Fallschaden), Inventar-Operationen, Rezepte, Protokoll-Roundtrip | Vitest |
| Benchmark | Generierungszeit pro Spalte, Meshzeit pro Section, Lichtupdate | `vitest bench`, Grenzwerte in CI |
| E2E | Seite laden → Welt erstellen → Spawn in < 5 s → Block setzen und abbauen (über Debug-Test-Hooks) → neu laden → Block noch da | Playwright |
| Perf-Smoke | Benchmark-Route, liest FPS, Draw Calls und Dreiecke aus dem Debug-Overlay | Playwright + manuelle Messung auf dem Referenzgerät |
| Server | 2 WS-Clients treten einem Raum bei, Block-Sync, Spielerpositionen, falscher Code wird abgelehnt, Rate Limit greift | Vitest + `ws` |
| Manuell | Checkliste pro Phase in `docs/checklists/phase-N.md` (Gefühl, Bugs, Browser Chrome/Firefox/Safari/Edge, iframe-Test) | du + ich |

---

## 13. Phasen mit SMART-Zielen

> Termine setzen einen Start am **Mo 16.11.2026** und regelmässige Arbeitssessions mit deinem Review voraus. Nach deiner Antwort zum Zeitbudget passe ich sie an.

### Phase 0 – Fundament (bis Fr 20.11.2026)
Monorepo, Vite, Three.js-Szene, CI, Env-Validierung, Branches `main`/`backup`/`legacy`, Render-Dienst (liefert Client aus + `/health` + `/ws`-Echo), `render.yaml`, Texturgenerator-Grundgerüst, `NAMING.md`/`LEGAL.md`.
**SMART**: Bis 20.11. zeigt die Render-URL eine drehende, selbst texturierte Testwürfel-Szene, die Seite funktioniert in einem Test-iframe, `/health` antwortet, ein WebSocket-Echo-Test klappt, CI ist grün.
**Abnahme**: ☐ `pnpm build` ergibt `dist/` mit relativen Pfaden ☐ iframe-Testseite funktioniert ☐ Render-URL zeigt das Spiel, `/health` = 200, `/ws`-Echo ok ☐ alle Env-Variablen in `.env.example` dokumentiert ☐ 3 Branches existieren
**Voraussetzung von dir**: Render-Account mit dem verbundenen GitHub-Repo. Den Blueprint aus `render.yaml` legst du einmal in Render an, ich kann das nicht für dich tun.

### Phase 1 – Spielbarer Prototyp (bis Fr 11.12.2026) → auf Toki hochladbar
Chunks plus Worker-Generierung (5 Biome, Bäume, Wasser, einfache Höhlen, Kohle- und Eisenerz), Greedy Meshing, Culling, AO, Sonnenlicht, Tag-Nacht-Zyklus, Bewegung (Laufen, Sprinten, Schleichen, Springen, Schwimmen) mit Kollision, Abbauen und Platzieren (Creative-artig, Hotbar mit ca. 20 Blocktypen), IndexedDB-Speicherung (nur geänderte Chunks, mehrere Welten), Hauptmenü, Weltauswahl, Pausemenü, Einstellungen (RD, FOV, Sensitivität), HUD und Debug-Overlay.
**SMART**: Bis 11.12. kann ein Spieler in einer per Seed generierten Welt mit RD 8 im Benchmark **≥ 60 FPS (Durchschnitt) / ≥ 45 FPS (1%-Low)** auf dem Referenzgerät laufen, sprinten, schleichen, springen und schwimmen, Blöcke abbauen und platzieren. Die Welt wird gespeichert und nach einem Neuladen identisch geladen. Der Spawn ist in **< 5 s** erreicht.
**Abnahme**: ☐ gleicher Seed → gleiche Welt (Golden-Hash-Test) ☐ keine sichtbaren Lücken oder Risse an Chunkgrenzen ☐ 3 Welten parallel anlegbar, löschbar, exportierbar ☐ 100 geänderte Blöcke → Neuladen → alle korrekt ☐ E2E-Test grün ☐ läuft in Chrome, Firefox, Edge und Safari im iframe ☐ Bundle ≤ 1 MB gzip

### Phase 2 – Survival-Kern (bis Fr 15.01.2027)
Abbauzeiten nach Werkzeug, Item-Drops als Entities, Inventar, Crafting 2×2/3×3, ca. 40 Rezepte, Werkzeug-Stufen (Holz, Stein, Eisen, Lumit), Schmelze, Truhen, Leben, Hunger, Rüstung, Fallschaden, Tod/Respawn, Survival- und Creative-Modus, Blocklicht (Fackeln), fliessendes Wasser, weitere Erze und Biome, Tastenbelegung, Sounds.
**SMART**: Bis 15.01. kann ein Tester in einer neuen Survival-Welt ohne Creative in **≤ 20 Minuten** von Holz bis zu einer Eisen-Spitzhacke kommen (Holz → Werktisch → Stein → Schmelze → Eisen). Dabei gilt: kein Inventar-Item geht verloren, Truhen- und Ofeninhalte überleben ein Neuladen, FPS-Ziel aus Phase 1 bleibt erfüllt.
**Abnahme**: ☐ Abbauzeiten-Tabelle per Unit-Test geprüft ☐ alle Rezepte getestet ☐ Tod → Drops → Respawn ☐ Fackel-Licht korrekt bei Setzen und Entfernen ☐ Checkliste Phase 2

### Phase 3 – Multiplayer auf Render (bis Fr 12.02.2027)
WsTransport, binäres Protokoll, RoomManager mit Raumcodes, Welt-Upload durch den Host und Rück-Sync, Chunk- und Spieler-Sync, Prediction/Reconciliation, Interpolation, Chat, einfacher Anti-Cheat, Kaltstart-Handling.
**SMART**: Bis 12.02. können **4 Spieler** auf verschiedenen Geräten über einen 6-stelligen Raumcode derselben Welt beitreten und gemeinsam bauen und craften. Ein Block-Update ist bei < 100 ms Ping in **≤ 150 ms** bei allen sichtbar, die eigene Bewegung fühlt sich bei 150 ms simuliertem Ping ruckelfrei an, und nach dem Schliessen des Raums hat der Host alle Änderungen lokal.
**Abnahme**: ☐ Server-Integrationstests grün ☐ falscher Code → klare Meldung ☐ 30 Fehlversuche/min → Sperre ☐ Raum leer → nach Timeout geschlossen + Sync ☐ Test auf dem echten Render-Deploy ☐ Speicher pro Raum < 150 MB

### Phase 4 – Mobs & Kampf (bis Fr 12.03.2027)
Entity-System, 4 friedliche Tiere, 4 feindliche Kreaturen (Moderling, Knöchler, Zischling, Krabbler), Spawn-Regeln nach Licht und Zeit, A*-Pathfinding, Nahkampf, Bogen und Pfeile, Rückstoss, Loot, Essen von Fleisch, Bett zum Überspringen der Nacht. Läuft serverseitig, also auch im MP.
**SMART**: Bis 12.03. spawnen nachts feindliche Kreaturen, die den Spieler über Hindernisse (Stufen, Löcher) bis 32 Blöcke verfolgen. Mit 40 aktiven Mobs bleibt der Benchmark bei ≥ 60 FPS und der Server-Tick unter 25 ms.
**Abnahme**: ☐ Pathfinding-Unit-Tests (Labyrinth-Testfälle) ☐ Zischling-Explosion zerstört Blöcke korrekt und mit Lichtupdate ☐ Mobs im MP synchron ☐ Checkliste Phase 4

### Phase 5 – Glimmwerk (Logiksystem) (bis Fr 16.04.2027)
Glimmstaub-Leitungen (Stärke 0–15), Hebel, Taster, Druckplatten, Lampen, Türen, Verzögerer, Inverter, Stösser (Kolben-Äquivalent), Tick-genaue Auswertung.
**SMART**: Bis 16.04. funktionieren 10 Referenzschaltungen (u. a. Taktgeber, Tür mit Druckplatte, 2-Bit-Addierer, Stösser-Tor) deterministisch identisch im SP und MP. 500 aktive Leitungsblöcke kosten < 5 ms pro Tick.

### Phase 6 – Dörfer, Handel & Runenkunde (bis Fr 21.05.2027)
Dorf-Generierung (Strukturbausteine), Siedler mit Tagesablauf und Handel, XP-System, Runentisch (Verzauberungen), Amboss-Äquivalent.
**SMART**: Bis 21.05. erzeugt jeder Seed in ≤ 1000 Blöcken Umkreis um den Spawn mindestens ein Dorf. Handel mit 3 Berufen und 10 Runen-Effekte sind spielbar und getestet.

### Phase 7 – Dimensionen & Bosse (bis Fr 02.07.2027)
Portal-System, Aschelande (eigene Generierung, Mobs, Materialien), Sternenrand mit Endboss Leerwyrm, Abspann.
**SMART**: Bis 02.07. kann ein Survival-Durchlauf von Spawn bis zum besiegten Leerwyrm komplett ohne Cheats abgeschlossen werden, mit gleichbleibenden FPS-Zielen in allen Dimensionen.

### Phase 8 (optional) – Mobile & Feinschliff
Touch-Steuerung (virtueller Stick, Tippen zum Platzieren, Halten zum Abbauen), automatische Grafikstufen, Controller-Support.

---

## 14. Risiken & Gegenmassnahmen

| Risiko | Gegenmassnahme |
|---|---|
| Performance auf schwachen GPUs | Benchmark ab Phase 1 in CI und manuell, Grafikstufen, dynamische Auflösung, Fallback Region-Meshes bzw. Multi-Draw, optional WASM |
| Zu viele Draw Calls | Budget ≤ 800, Messung im Debug-Overlay, Sections zu Regionen zusammenlegen |
| IndexedDB-Quota bzw. Löschung (vor allem Safari, iframe mit getrenntem Speicher) | nur Diffs speichern, Kompression, `persist()`, Export/Import, Speicheranzeige |
| iframe-Einschränkungen (Pointer Lock, Fullscreen, Storage) | früher iframe-Test in Phase 0, Einbettungshinweise für dich (§10) |
| Render Free Tier: Kaltstart (betrifft auch das Laden der Seite), wenig CPU | Service-Worker-Cache, Wecken beim Menü-Öffnen, Ladeanzeige, Limits für Räume und Server-RD per Env, Upgrade auf Starter ab Phase 4 prüfen |
| **Name «Blockcraft»**: Es gibt bereits mehrere Spiele bzw. Apps mit diesem oder sehr ähnlichem Namen, und die Kombination «Block» + «-craft» liegt sehr nah an der Marke des Vorbilds. Damit riskierst du genau den Konflikt, den du vermeiden willst. | Ich empfehle einen eigenständigeren Namen (z. B. Kubora). Weil der Name zentral in einer Config liegt, kostet ein späterer Wechsel wenig. Vor einem öffentlichen Launch solltest du ihn auf jeden Fall in einer Markenrecherche (z. B. EUIPO/Swissreg) prüfen. |
| Kein persistenter Speicher auf Render | Welt gehört dem Host, Server synct zurück |
| Rechtliches (Namen, Optik, «Trade Dress») | `NAMING.md`/`LEGAL.md`, eigene Palette, eigenes UI-Layout, eigener Font, Review der Texturgalerie. **Repo-Name «Minecraft_Toki» enthält die Marke → Umbenennen empfohlen** |
| Feature-Umfang («Scope Creep») | strikte Phasen, jede Phase spielbar und deploybar, Extras auf eine Backlog-Liste |
| GPU-Speicherlecks, WebGL Context Loss | konsequentes `dispose()`, Context-Restore-Handler, Langzeit-Test (30 min) pro Phase |
| Desync SP vs. MP | eine gemeinsame Sim in `shared`, deterministische Tests, Protokoll-Versionierung |

## 15. Offene Fragen an dich

Bereits geklärt: Name Blockcraft (siehe Hinweis §14), Multiplayer in Phase 3, alles auf Render, Render Free.

Noch offen (kann ich mit den Standardwerten in Klammern beantworten, wenn du nichts angibst):
1. **Name**: Bleibt es trotz des Markenhinweises bei «Blockcraft»? (Standard: ja, als Arbeitstitel)
2. **Branch `legacy`**: Soll die alte Version aus deinem Repo `DasLeon08/Minecraft` dort hinein, oder bleibt er vorerst leer bzw. ein Abzweig des ersten Prototyps?
   (Standard: Ich lege `legacy` als leeren Startpunkt an. Den Import aus `DasLeon08/Minecraft` mache ich nur, wenn du es bestätigst und den Zugriff auf das Repo freigibst.)
3. **Referenzgerät**: Welcher Laptop bzw. welche GPU soll für die 60 FPS gelten? (Standard: integrierte Intel-Iris-Xe-Klasse, Chrome)
4. **Zeitbudget**: Wie oft arbeiten wir pro Woche? (Standard: Termine wie in §13)
5. **Namensliste & Sprache**: Passen dir die Vorschläge in §5? Soll das Spiel auf Deutsch, Englisch oder zweisprachig sein? (Standard: Vorschläge übernehmen, UI auf Deutsch, Texte über eine i18n-Datei, damit Englisch später leicht dazukommt)
6. **Welthöhe**: Reicht y 0–255, oder willst du eine tiefere Welt (z. B. −64 bis 319)? (Standard: 0–255)

## 16. Verifikation des Plans (bei der Umsetzung)
Jede Phase endet mit: CI grün (Lint, Typecheck, Unit, E2E), Benchmark-Werte im PR dokumentiert, manuelle Checkliste `docs/checklists/phase-N.md` abgehakt, Deploy auf der Vorschau-URL bzw. Render getestet, danach PR → `main` und Spiegelung auf `backup`.

---

## Entscheidungen während der Umsetzung

- **Hosting** (13.11.2026): Das Spiel läuft auf **Toki** (statischer Build im Branch `toki`, automatisch per Action `Toki-Build`). **Render nur für den Multiplayer-Server.** Damit betrifft der Render-Free-Kaltstart den Singleplayer nicht mehr; der Client verbindet sich über `VITE_SERVER_URL` (GitHub-Variable) mit Render, der Server erlaubt die Toki-Origin über `ALLOWED_ORIGINS`.
- **Texturstil** (12.11.2026): wählbar im Einstellungsmenü – *Fein* (16×16), *Pixelig* (2×2-Pixel, **Standard**), *Sehr pixelig* (4×4-Pixel). Live umschaltbar; `?pixel=1|2|4` überschreibt den Stil für Vergleiche.
- **Env-Validierung**: eigener, abhängigkeitsfreier Validator in `packages/shared/src/config/env.ts` statt `zod` (kleineres Client-Bundle, gleiche Funktion).
- **Benchmarks**: Vitest 5 hat keine `bench`-API mehr → Performance-Budgets als normale Tests (`packages/shared/test/perf.test.ts`).
