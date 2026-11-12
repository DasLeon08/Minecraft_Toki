import { defineConfig } from '@playwright/test';

const PORT = Number(process.env.E2E_PORT ?? 8091);

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 180_000,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'off',
    viewport: { width: 1280, height: 720 },
    launchOptions: {
      // Headless ohne GPU: WebGL über SwiftShader
      // LocalNetworkAccessChecks: erlaubt im Test das Einbetten von localhost aus einer «fremden» Seite
      args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--disable-features=LocalNetworkAccessChecks'],
    },
  },
  webServer: {
    command: `node apps/server/dist/index.js`,
    url: `http://localhost:${PORT}/health`,
    reuseExistingServer: !process.env.CI,
    env: { PORT: String(PORT), LOG_LEVEL: 'warn' },
  },
});
