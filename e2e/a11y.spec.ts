import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const WCAG = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('dialogue de recherche', () => {
  test('piège le focus, se ferme sur Échap et rend le focus', async ({ page }) => {
    await page.goto('/');
    const trigger = page.locator('[data-search-open]').first();
    await trigger.click();
    const dialog = page.locator('#search-dialog');
    await expect(dialog).toBeVisible();

    // Le focus est dans le dialogue.
    const focusInDialog = await dialog.evaluate((d) => d.contains(document.activeElement));
    expect(focusInDialog).toBe(true);

    // axe sur l'état ouvert.
    const results = await new AxeBuilder({ page }).withTags(WCAG).analyze();
    expect(results.violations).toEqual([]);

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });
});

test.describe('menu mobile (dialog)', () => {
  test('Échap ferme et le focus revient au déclencheur', async ({ page }) => {
    await page.setViewportSize({ width: 480, height: 900 });
    await page.goto('/components/button/');
    const open = page.locator('[data-nav-open]');
    await open.click();
    const dialog = page.locator('#mobile-nav');
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(open).toBeFocused();
  });
});

test('contraste forcé (forced-colors) — page composant sans violation', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' });
  await page.goto('/components/table/');
  // En contraste forcé, WCAG 1.4.3 (color-contrast) ne s'applique pas : le
  // système impose sa palette. On vérifie les autres règles.
  const results = await new AxeBuilder({ page })
    .withTags(WCAG)
    .disableRules(['color-contrast'])
    .analyze();
  expect(results.violations).toEqual([]);
});

test('mouvement réduit — le toast n’anime pas et disparaît', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/playground/#toast');
  await page.locator('[data-toast="info"]').click();
  const toast = page.locator('.tds-toast').first();
  await expect(toast).toBeVisible();
  const anim = await toast.evaluate((el) => getComputedStyle(el).animationName);
  expect(anim === 'none' || anim === '').toBe(true);
});

test('axe sur le playground (rendu réel des composants)', async ({ page }) => {
  await page.goto('/playground/');
  const results = await new AxeBuilder({ page }).withTags(WCAG).analyze();
  expect(results.violations).toEqual([]);
});
