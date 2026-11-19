# Bilder und Texte für die Spieleseite (Toki)

Erzeugt mit `pnpm build && pnpm promo`: Titelbild und Banner sind flache Pixel-Art
(`tools/texturegen/src/pixelart.ts`, einzeln mit `pnpm promo:pixel`), die Screenshots stammen aus dem
echten Spiel (`tools/promo/capture.mjs`).

| Toki-Feld | Datei | Masse |
|---|---|---|
| Titelbild («Bild hochladen») | `titelbild.png` (4:3) bzw. `titelbild-quadrat.png` | 1200×900 / 1024×1024 |
| Banner für die Startseite | `banner.png` | 1600×800 (2:1) |
| Screenshot 1 | `screenshot-1-landschaft.jpg` | 1600×900 |
| Screenshot 2 | `screenshot-2-basis.jpg` | 1600×900 |
| Screenshot 3 | `screenshot-3-werktisch.jpg` | 1600×900 |
| Screenshot 4 | `screenshot-4-mehrspieler.jpg` (zwei Spieler mit Chat) | 1600×900 |

Alle Dateien sind kleiner als 2 MB.

## Textvorschlag

**Kurzbeschreibung:**
Baue, grabe und überlebe in einer unendlichen Blockwelt – direkt im Browser.

**Beschreibung:**
Erkunde Wälder, Gebirge, Wüsten, Taiga und Sümpfe in einer Welt, die bei jedem Seed neu entsteht.
Fälle Bäume, baue einen Werktisch, stelle Werkzeuge her und grabe dich bis zu seltenem Lumit vor.
Schmelze Erz, richte dir eine Basis mit Truhen und Fackeln ein und überstehe die Nacht.
Im Kreativmodus baust du ohne Grenzen. Deine Welten werden automatisch im Browser gespeichert.
Mit Freunden spielen: Öffne deine Welt als Raum und teile den Code – gemeinsam bauen und chatten.

**Steuerung:**
WASD bewegen · Leertaste springen · Shift schleichen · Strg sprinten · Linksklick abbauen ·
Rechtsklick platzieren/benutzen · E Inventar · 1–9 Hotbar · T Chat · Tab Spielerliste · Esc Pause
