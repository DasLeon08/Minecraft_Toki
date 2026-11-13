# Einbettung (z. B. auf Toki)

## Upload auf Toki

Toki will einen Ordner, in dem `index.html` direkt liegt. Zwei Möglichkeiten:

1. **Hauptordner des Repos:** Dort liegt der fertige Web-Export (`index.html`, `assets/`,
   `sw.js`, `favicon.svg`) direkt neben dem Quellcode. ZIP von `main` laden
   (https://github.com/DasLeon08/Minecraft_Toki/archive/refs/heads/main.zip), entpacken und den Ordner
   `Minecraft_Toki-main` auswählen – oder einfach deinen geklonten Repo-Ordner.
2. **Nur das Spiel ohne Quellcode:** Branch `toki`
   (https://github.com/DasLeon08/Minecraft_Toki/archive/refs/heads/toki.zip), entpackt `Minecraft_Toki-toki`.

Der Branch `toki` enthält nur das fertige Spiel (`index.html` im Root, `assets/`, `sw.js`,
`favicon.svg`). Die GitHub Action `.github/workflows/toki.yml` baut ihn bei jedem Push auf
`main` automatisch neu (oder manuell über «Actions → Toki-Build → Run workflow»).
Bitte nichts von Hand in `toki` ändern – der Branch wird jedes Mal überschrieben.

Falls Toki keinen Branch auswählen lässt: In GitHub unter *Settings → Branches* den
Standard-Branch auf `toki` stellen. Render bleibt davon unberührt (`render.yaml` nutzt `main`).

Der Build ist eine normale Webseite mit `index.html` als Einstieg und nur relativen
Pfaden. Er funktioniert auf jedem Host und in iframes.

## Falls du das Spiel selbst per iframe einbettest

Toki liefert die Dateien aus dem Branch `toki` aus. Bettest du das Spiel anderswo ein, zeigt das
iframe auf die Adresse, unter der diese Dateien liegen (nicht auf Render – Render ist nur der
Multiplayer-Server):

```html
<iframe
  src="https://<adresse-des-spiels>/"
  width="1280" height="720"
  style="border:0; width:100%; aspect-ratio:16/9"
  allow="fullscreen; pointer-lock; gamepad"
  allowfullscreen>
</iframe>
```

- **`pointer-lock`** ist nötig, damit die Maus zur Kamerasteuerung eingefangen werden kann.
- Falls das iframe ein `sandbox`-Attribut hat, braucht es zusätzlich:
  `sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-downloads"`
  (`allow-same-origin` für IndexedDB/Spielstände, `allow-downloads` für den Welt-Export).
- Der Spiel-Host darf keinen `X-Frame-Options: DENY`-Header senden.

## Wichtig zu Spielständen

Browser trennen den Speicher von iframes nach einbettender Seite («Storage Partitioning»).
Spielstände auf Toki sind daher getrennt von Spielständen, die unter einer anderen Adresse
entstehen. Mit **Exportieren/Importieren** in der Weltauswahl lassen sie sich übertragen.

## Statische Dateien von Hand

`pnpm build` → Inhalt von `apps/client/dist/` kann 1:1 auf einem statischen Host abgelegt
werden (genau das steht im Branch `toki`). Der Singleplayer funktioniert ohne Server. Für den
Multiplayer (Phase 3) muss `VITE_SERVER_URL` beim Build auf die Render-URL zeigen.
