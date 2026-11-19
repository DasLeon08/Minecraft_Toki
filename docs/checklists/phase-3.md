# Abnahme Phase 3 – Multiplayer und Pixel-Look

## Automatisch geprüft

- [x] Server: Raum erstellen, mit Code beitreten, falscher Code und voller Raum werden abgelehnt
- [x] Server: Raum-Limit (`MAX_ROOMS`), Beitritts-Rate-Limit pro IP, Protokollversion im Handshake
- [x] Server: zwei Clients sehen gegenseitig Blockänderungen, Positionen und Chat
- [x] Server: nur der Host darf den Spielmodus ändern, zu grosse Positionssprünge werden zurückgesetzt
- [x] Server: Host lädt seine Welt hoch und bekommt veränderte Chunks beim Verlassen zurück
- [x] E2E (zwei Browser): Raum per Code über das Menü, Upload der Host-Welt, Figuren sichtbar, Bauen in beide Richtungen, Chat mit T, Host schliesst → Gast zurück ins Menü, Host-Welt gespeichert
- [x] E2E: falscher Raumcode zeigt eine verständliche Meldung
- [x] E2E Chaos-Test: Bot spielt zufällig (laufen, bauen, Fenster, Pause, Einstellungen, Tag/Nacht), danach Speichern und Neuladen
- [x] E2E: Welt-Export → Import → identisch
- [x] Bugfixes mit Tests: Items im Crafting-Raster gehen beim Autosave nicht verloren, Tod mit offenem Fenster, Tod durch beliebigen Schaden
- [x] Pixel-Look: keine runden Ecken, Pixel-Schrift für Logo, Überschriften und Buttons (Text bleibt für Screenreader im DOM)

## Manuell (echter Render-Deploy)

- [ ] Render-Blueprint angelegt, `/health` antwortet
- [ ] GitHub-Variable `VITE_SERVER_URL` gesetzt, Toki-Build neu gestartet
- [ ] Zwei Geräte (z. B. PC und Handy/Laptop): Raum erstellen, mit Code beitreten
- [ ] Kaltstart: «Server startet …» erscheint, Beitritt klappt nach höchstens ca. 1 min
- [ ] Gemeinsam bauen und abbauen, Chat, Spielerliste (Tab)
- [ ] Host verlässt den Raum → Gast landet im Mehrspieler-Menü, Änderungen sind in der Host-Welt gespeichert
- [ ] Verbindungsabbruch (WLAN aus) → verständliche Meldung, kein Absturz
