# Abnahme Phase 2 – Survival-Kern

## Automatisch geprüft

- [x] Inventar-Klicks: nehmen, ablegen, stapeln, tauschen, halbieren, einzeln, Shift-Klick, Zahlentasten, Rüstungsplätze
- [x] Rezepte: Bretter, Stöcke, Werktisch, Schmelze, Truhe, Fackel, Werkzeuge aller Stufen (auch gespiegelt), alle Ergebnisse existieren
- [x] Abbauzeiten je Werkzeug, Ernte-Regeln (Stein/Erze nur mit passender Spitzhacke), Drops
- [x] Simulation: Abbau-Mindestzeit, Haltbarkeit, Drops als Items, Aufsammeln, Platzieren verbraucht Blöcke
- [x] Schmelze: Brennstoff, Schmelzzeit, Ausgabe, Licht an/aus
- [x] Überleben: Fallschaden, Rüstung, Regeneration, Verhungern (nicht tödlich), Ertrinken, Tod mit Drops, Wiederbeleben, Essen
- [x] Wasser: 7 Blöcke Reichweite, Fallen, Unendlichquelle, Austrocknen
- [x] Speicherformat v2 mit Block-Entities (v1 bleibt lesbar)
- [x] E2E: **Holz → Werktisch → Holz-Spitzhacke → Bruchstein → Schmelze → Eisen → Eisen-Spitzhacke** mit echten Klicks im Inventar
- [x] E2E: Truhe und Inventar überstehen ein Neuladen
- [x] E2E: Tod durch Fallschaden → Todesbildschirm → Items liegen in der Welt → Wiederbeleben
- [x] Performance: Benchmark unverändert (≈ 300–385 Draw Calls bei Sichtweite 8)

## Manuell (echter Browser)

- [ ] Neue Survival-Welt: in ≤ 20 Minuten bis zur Eisen-Spitzhacke (Zeit notieren: ____ min)
- [ ] Abbau-Risse sichtbar, Abbauzeit fühlt sich richtig an (Hand vs. Werkzeug)
- [ ] Inventar: Ziehen mit Rechtsklick verteilt einzelne Items, Tooltips, Haltbarkeitsbalken
- [ ] Schmelze: Flamme und Fortschrittspfeil laufen, Schmelze leuchtet beim Brennen
- [ ] Essen (Rechtsklick halten) füllt die Hungerleiste
- [ ] Unter Wasser erscheinen Luftblasen, bei Luftmangel gibt es Schaden
- [ ] Fackeln erhellen Höhlen, Wasser spült sie weg
- [ ] Taiga, Sumpf, Beerensträucher und Lumiterz (sehr tief) werden gefunden
- [ ] Sounds: Schritte je Untergrund, Abbauen, Platzieren, Aufsammeln, Schaden; Lautstärke-Regler wirken
- [ ] Tastenbelegung ändern (Konflikte rot), bleibt nach Neuladen erhalten
- [ ] Spielmodus im Pausemenü umschalten
