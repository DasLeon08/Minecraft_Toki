# Abnahme Phase 0 – Fundament

- [x] Monorepo (pnpm) mit `apps/client`, `apps/server`, `packages/shared`, `tools/texturegen`
- [x] `pnpm build` ergibt `apps/client/dist` mit relativen Pfaden (`base: './'`)
- [x] iframe-Test (fremde Herkunft) läuft – automatisch in `tests/e2e/game.spec.ts`
- [x] Server: `/health` = 200, statischer Client, WebSocket-Echo (`apps/server/test`)
- [x] Alle Env-Variablen in `.env.example` dokumentiert und validiert
- [x] CI (Lint, Typecheck, Unit, Build, Bundle-Grösse, E2E)
- [x] Branches `main`, `backup`, `legacy` angelegt
- [ ] Render-Blueprint in Render angelegt und Render-URL geprüft (**durch dich**)
