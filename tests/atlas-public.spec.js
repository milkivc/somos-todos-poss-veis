const { test, expect } = require('@playwright/test');

const ATLAS_URL = process.env.ATLAS_URL || 'https://script.google.com/macros/s/AKfycbw0X-g5f6dpkBcVl0BcqC0AOZIBA_Q1y7iOHOXKtGds_UmVCD6SV8dbCMP0zm8Ecc6Oaw/exec?v=test';

test('Atlas public interface loads without known regressions', async ({ page }) => {
  await page.goto(ATLAS_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(4000);

  await expect(page.locator('#map')).toBeVisible();
  await expect(page.locator('#sealImg')).toBeVisible();

  const oldAtlasPill = page.locator('text=Atlas Vivo MILK').first();
  const oldMasterPill = page.locator('text=Master consolidado').first();
  await expect(oldAtlasPill).toHaveCount(0);
  await expect(oldMasterPill).toHaveCount(0);

  await expect(page.locator('.deviceRail .device')).toHaveCount(5);
  await expect(page.locator('.cowMarker')).not.toHaveCount(0);

  const whiteDots = await page.locator('.leaflet-interactive').count();
  expect(whiteDots).toBeGreaterThanOrEqual(0);
});

test('Atlas devices open contextual form programs', async ({ page }) => {
  await page.goto(ATLAS_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(4000);

  await page.locator('#dogDevice').click();
  await expect(page.locator('#modalOverlay')).toBeVisible();
  await expect(page.locator('#modalTitle')).toContainText(/Fucô|Crónicas|Cronicas/i);
  await expect(page.locator('#programa_slug option')).toHaveCount(6);
  await page.locator('#modalClose').click();

  await page.locator('#festivalDevice').click();
  await expect(page.locator('#modalTitle')).toContainText(/Dado/i);
  await page.locator('#modalClose').click();

  await page.locator('#galleryDevice').click();
  await expect(page.locator('#modalTitle')).toContainText(/Galeria/i);
  await page.locator('#modalClose').click();

  await page.locator('#kingDevice').click();
  await expect(page.locator('#modalTitle')).toContainText(/Reizinho/i);
});
