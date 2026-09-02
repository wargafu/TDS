import { test, expect } from '@playwright/test';

test('onglets MDX : navigation aux flèches (roving tabindex)', async ({ page }) => {
  await page.goto('/components/button/');
  const tabs = page.locator('.mdx-tabs').first().locator('[role="tab"]');
  const first = tabs.nth(0);
  const second = tabs.nth(1);
  await first.click();
  await expect(first).toHaveAttribute('aria-selected', 'true');
  await first.press('ArrowRight');
  await expect(second).toBeFocused();
  await expect(second).toHaveAttribute('aria-selected', 'true');
});

test('toast : apparaît puis se ferme', async ({ page }) => {
  await page.goto('/playground/#toast');
  await page.locator('[data-toast="success"]').click();
  const toast = page.locator('.tds-toast--success');
  await expect(toast).toBeVisible();
  await expect(toast).toHaveAttribute('role', 'status');
  await toast.locator('.tds-toast__close').click();
  await expect(toast).toBeHidden();
});

test('bandeau de consentement : le choix masque le bandeau et le mémorise', async ({ page }) => {
  await page.goto('/playground/');
  await page.evaluate(() => localStorage.removeItem('tds-consent'));
  await page.reload();
  const consent = page.locator('tds-consent');
  await expect(consent).toBeVisible();
  await expect(consent).toHaveAttribute('role', 'dialog');
  await consent.locator('[data-consent="essential"]').click();
  await expect(consent).toBeHidden();
  const stored = await page.evaluate(() => localStorage.getItem('tds-consent'));
  expect(stored).toContain('essential');
});

test('tableau triable : le tri réordonne et annonce aria-sort', async ({ page }) => {
  await page.goto('/playground/#sortable');
  const table = page.locator('#sortable tds-sortable-table');
  const firstHeaderButton = table.locator('th').first().locator('button');
  await expect(firstHeaderButton).toBeVisible();
  await firstHeaderButton.click();
  await expect(table.locator('tbody tr td').first()).toHaveText('REF-0017');
  await expect(table.locator('th').first()).toHaveAttribute('aria-sort', 'ascending');
  await firstHeaderButton.click();
  await expect(table.locator('th').first()).toHaveAttribute('aria-sort', 'descending');
});

test('RTL : une page en arabe applique dir=rtl et le miroir d’icône', async ({ page }) => {
  await page.goto('/fondamentaux/rtl/');
  // La page de doc reste LTR ; on vérifie le mécanisme sur un fragment forcé.
  await page.evaluate(() => {
    const probe = document.createElement('div');
    probe.dir = 'rtl';
    probe.innerHTML = '<svg class="tds-icon tds-icon--mirror"><path d="M0 0"/></svg>';
    document.body.appendChild(probe);
  });
  const transform = await page
    .locator('[dir="rtl"] .tds-icon--mirror')
    .evaluate((el) => getComputedStyle(el).transform);
  expect(transform).toMatch(/matrix\(-1|scaleX/);
});
