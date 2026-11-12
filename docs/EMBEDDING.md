# Einbettung (z. B. auf Toki)

Der Build ist eine normale Webseite mit `index.html` als Einstieg und nur relativen
Pfaden. Er funktioniert auf jedem Host und in iframes.

## Empfohlen: iframe auf den Render-Dienst

```html
<iframe
  src="https://<dein-dienst>.onrender.com/"
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
- Der Server sendet absichtlich **keinen** `X-Frame-Options`-Header.

## Wichtig zu Spielständen

Browser trennen den Speicher von iframes nach einbettender Seite («Storage Partitioning»).
Spielstände auf Toki sind daher getrennt von Spielständen, die direkt auf der Render-URL
entstehen. Mit **Exportieren/Importieren** in der Weltauswahl lassen sie sich übertragen.

## Alternativ: statische Dateien

`pnpm build` → Inhalt von `apps/client/dist/` kann 1:1 auf einem statischen Host abgelegt
werden. Der Singleplayer funktioniert dann ohne Server. Für den Multiplayer (Phase 3)
muss `VITE_SERVER_URL` beim Build auf die Render-URL zeigen.
