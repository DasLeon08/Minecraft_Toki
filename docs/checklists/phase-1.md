# Abnahme Phase 1 – Spielbarer Prototyp

## Automatisch geprüft

- [x] Gleicher Seed → gleiche Welt (Golden-Hash-Test)
- [x] Greedy Mesher: Culling (auch an Chunkgrenzen), Verschmelzen, Wasser, Pflanzen
- [x] Licht: Sonnenlicht, Ausbreitung über Chunkgrenzen, Blocklicht, Updates beim Bauen
- [x] Physik: Fallen/Landen, Sprunghöhe ≈ 1,25, Gehen ≈ 4,3 m/s, Sprinten ≈ 5,6 m/s, Wände, Schleich-Kantenschutz, Wasser
- [x] Speicherformat-Roundtrip, Env-Validierung, Simulation (Validierung, Pflanzen)
- [x] Performance-Budgets: Spalte + Licht < 40 ms, Section meshen < 8 ms
- [x] E2E: Welt erstellen → Spawn → 100 Blöcke → Speichern → Neuladen → alle korrekt, Spielerposition erhalten
- [x] E2E: läuft im iframe einer fremden Seite
- [x] Bundle ≤ 1 MB gzip (aktuell ca. 180 KB)

## Manuell (auf dem Referenz-Laptop)

- [ ] `…/?bench=60` → Ø ≥ 60 FPS, 1%-Low ≥ 45 FPS (Ergebnis oben eingeblendet)
- [ ] Spawn < 5 s nach «Welt erstellen» (F3 bzw. Konsole: «Spawn bereit nach … ms»)
- [ ] Keine sichtbaren Lücken/Risse an Chunkgrenzen beim Herumfliegen
- [ ] Laufen, Sprinten (Strg / 2× W), Schleichen an Kanten, Springen, Schwimmen, Fliegen fühlen sich richtig an
- [ ] Abbauen/Platzieren, Mittelklick, Hotbar (1–9, Mausrad), Blockauswahl (E)
- [ ] Tag-Nacht-Zyklus, Leuchtkristall leuchtet nachts
- [ ] 3 Welten anlegen, umbenennen, exportieren, importieren, löschen
- [ ] Einstellungen (Sichtweite, FOV, Maus, Auflösung, Texturstil) wirken sofort
- [ ] Chrome, Firefox, Edge, Safari – direkt und im Toki-iframe
