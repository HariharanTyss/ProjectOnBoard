import { test, expect } from '@playwright/test';

test.describe('Navigation and Dynamic Catalog', () => {
  test('Load all items in the Lazy Load catalog', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // 1. Open the menu, expand Dynamic Catalog, and select Lazy Load.
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="dynamic-catalog-sidebar-link"]').click();
    await page.locator('[data-test="dynamic-catalog-lazy-load-link"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Dynamic Catalog - Lazy Load');
    await expect(page.getByText('Loading…').first()).toBeVisible();

    // 2. Verify that loaded catalog items are visible while lazy loading continues.
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(page.getByText('Sauce Labs Fleece Jacket (M)', { exact: true })).toBeVisible();
  });
});