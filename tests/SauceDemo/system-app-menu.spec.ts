import { test, expect } from '@playwright/test';

test.describe('Navigation and Dynamic Catalog', () => {
  test('Use menu navigation and reset application state', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // 1. Add an item and open the navigation menu.
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await expect(page.locator('[data-test="inventory-sidebar-link"]')).toBeVisible();
    await expect(page.locator('[data-test="dynamic-catalog-sidebar-link"]')).toBeVisible();
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(page.locator('[data-test="logout-sidebar-link"]')).toBeVisible();
    await expect(page.locator('[data-test="reset-sidebar-link"]')).toBeVisible();

    // 2. Reset application state.
    await page.locator('[data-test="reset-sidebar-link"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();

    // 3. Select All Items.
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="inventory-sidebar-link"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });
});