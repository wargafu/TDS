import { test, expect } from '@playwright/test';

test('le lien d’évitement amène au contenu principal', async ({ page }) => {
  await page.goto('/components/button/');
  await page.keyboard.press('Tab');
  const skip = page.locator('.skip-link');
  await expect(skip).toBeFocused();
  await skip.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
});

test('la bascule de thème persiste après rechargement', async ({ page }) => {
  await page.goto('/');
  const root = page.locator('html');
  await page.locator('[data-theme-toggle]').click();
  const theme = await root.getAttribute('data-tds-theme');
  expect(['light', 'dark']).toContain(theme);
  await page.reload();
  await expect(root).toHaveAttribute('data-tds-theme', theme!);
});

test('le menu mobile s’ouvre et se ferme', async ({ page }) => {
  await page.setViewportSize({ width: 480, height: 900 });
  await page.goto('/');
  const dialog = page.locator('#mobile-nav');
  await expect(dialog).toBeHidden();
  await page.locator('[data-nav-open]').click();
  await expect(dialog).toBeVisible();
  await page.locator('[data-nav-close]').click();
  await expect(dialog).toBeHidden();
});

test('la recherche s’ouvre au raccourci clavier', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Control+k');
  await expect(page.locator('#search-dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#search-dialog')).toBeHidden();
});

test('le sommaire suit la lecture', async ({ page }) => {
  await page.goto('/fondamentaux/colors/');
  const toc = page.locator('.toc');
  await expect(toc).toBeVisible();
  await expect(toc.locator('a')).not.toHaveCount(0);
});
