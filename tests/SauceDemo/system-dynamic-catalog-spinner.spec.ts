import { test, expect } from '@playwright/test';

test.describe('Navigation and Dynamic Catalog', () => {
  test('Load catalog items after the spinner state', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // 1. Open Dynamic Catalog and select Spinner.
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="dynamic-catalog-sidebar-link"]').click();
    await page.locator('[data-test="dynamic-catalog-spinner-link"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Dynamic Catalog - Spinner');

    // 2. Wait for the spinner to resolve and verify catalog products are visible.
    await expect(page.getByRole('status', { name: 'Loading' })).toBeHidden();
    await expect(page.locator('[data-test="spinner-item-0-name"]')).toBeVisible();
    await expect(page.locator('[data-test="spinner-item-1-name"]')).toBeVisible();
    await expect(page.locator('[data-test="spinner-item-2-name"]')).toBeVisible();
    await expect(page.locator('[data-test="spinner-item-3-name"]')).toBeVisible();
    await expect(page.locator('[data-test="spinner-item-4-name"]')).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('[data-test="spinner-item-4-price"]')).toHaveText('$29.99');
    await expect(page.locator('[data-test="spinner-item-5-name"]')).toHaveText('Sauce Labs Fleece Jacket');
    await expect(page.locator('[data-test="spinner-item-5-price"]')).toHaveText('$49.99');
  });
});