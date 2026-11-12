# Namensliste

Eigene Namen für alles mit Wiedererkennungswert. Generische Begriffe (Stein, Erde, Sand,
Holz, Eisen, Gold, Kohle, Wasser, Glas, Ziegel) sind nicht geschützt und bleiben.
String-IDs haben den Namespace `bc:` (z. B. `bc:leuchtkristall`).

## Im Spiel (Phase 1)

| ID | Name | Rolle |
|---|---|---|
| `bc:grasboden` | Grasboden | Oberflächenblock |
| `bc:urgestein` | Urgestein | unzerstörbarer Weltboden |
| `bc:eichenstamm` / `bc:birkenstamm` | Eichen-/Birkenstamm | Holz |
| `bc:eichenlaub` / `bc:birkenlaub` | Eichen-/Birkenlaub | Blätter |
| `bc:bruchstein` | Bruchstein | Baustein |
| `bc:grasbueschel` | Grasbüschel | Pflanze |
| `bc:sonnenkelch` | Sonnenkelch | gelbe Blume |
| `bc:glutmohn` | Glutmohn | rote Blume |
| `bc:duerrstrauch` | Dürrstrauch | Wüstenpflanze |
| `bc:leuchtkristall` | Leuchtkristall | Lichtquelle (15) |
| `bc:schneeboden` | Verschneiter Boden | Oberflächenblock |
| `bc:lehm` | Lehm | Unterwasserboden |

## Im Spiel (Phase 2)

| ID | Name | Rolle |
|---|---|---|
| `bc:werktisch` | Werktisch | 3×3-Crafting |
| `bc:schmelze` | Schmelze | Ofen (brennt mit Licht 13) |
| `bc:truhe` | Truhe | 27 Plätze |
| `bc:fackel` | Fackel | Lichtquelle (14) |
| `bc:lumiterz` / `bc:lumit` | Lumiterz / Lumit | seltenstes Erz (violett), Stufe 4 |
| `bc:fichtenstamm` … | Fichte | Taiga-Baum |
| `bc:sumpflaub` | Sumpflaub | Sumpf-Bäume |
| `bc:beerenstrauch` / `bc:waldbeeren` | Beerenstrauch / Waldbeeren | Nahrung |
| `bc:apfel` | Apfel | Nahrung (aus Eichenlaub) |
| `bc:stock`, `bc:kohle`, `bc:eisenbarren` | Stock, Kohle, Eisenbarren | Material |
| `bc:<stufe>_<werkzeug>` | z. B. Holzspitzhacke, Lumitschwert | Werkzeuge (holz/stein/eisen/lumit × spitzhacke/schaufel/axt/schwert) |
| `bc:<material>_<teil>` | z. B. Eisenhelm, Lumitbrustpanzer | Rüstung (eisen/lumit × helm/brustpanzer/beinschutz/stiefel) |

Werkzeuge sind bewusst senkrecht gezeichnet (eigene Form), Lumit ist violett.

## Geplant

| Rolle | Name |
|---|---|
| Spielfigur | Wanderer |
| vulkanisches Glas | Glutglas |
| Logiksystem / Leitstaub | Glimmwerk / Glimmstaub |
| Kolben | Stösser |
| explodierender Mob | Zischling |
| untoter Nahkämpfer | Moderling |
| Bogenschütze | Knöchler |
| Spinnen-Mob | Krabbler |
| teleportierender Mob | Flimmerer |
| Schaf / Schwein / Kuh / Huhn | Wollbock / Grunzel / Hornrind / Pickhuhn |
| Feuer-Dimension | Aschelande |
| Leere-Dimension | Sternenrand |
| Endboss | Leerwyrm |
| Verzauberungen | Runenkunde |
| Dorfbewohner | Siedler |

## Hinweis zum Spielnamen

«Blockcraft» ist ein **Arbeitstitel**: Es existieren bereits Spiele mit ähnlichem Namen,
und «Block» + «-craft» liegt nah an einer bekannten Marke. Der Name steht zentral in
`packages/shared/src/constants.ts` (`GAME_NAME`) und lässt sich einfach ändern. Vor einem
öffentlichen Launch: Markenrecherche (z. B. Swissreg, EUIPO).
