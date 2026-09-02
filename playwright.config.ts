import { defineConfig, devices } from '@playwright/test';

/**
 * Tests E2E de comportement (clavier, focus, thème, RTL) contre le build
 * statique de la documentation. Volontairement pas de capture pixel : les
 * baselines dépendent de l'OS et du rendu des polices — les assertions ici
 * sont déterministes et portables.
 */
const PORT = 4331;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `pnpm --filter tds-docs exec astro preview --host 127.0.0.1 --port ${PORT}`,
    url: `http://127.0.0.1:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
