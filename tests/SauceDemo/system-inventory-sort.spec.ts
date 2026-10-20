import { test, expect } from '@playwright/test';

test.describe('Inventory and Product Discovery', () => {
  test('Sort all inventory products by name and price', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    const sort = page.locator('[data-test="product-sort-container"]');
    const productNames = page.locator('[data-test="inventory-item-name"]');

    // 1. Verify the default inventory and alphabetical sort order.
    await expect(productNames).toHaveCount(6);
    await expect(sort).toHaveValue('az');
    await expect(productNames.first()).toHaveText('Sauce Labs Backpack');
    await expect(productNames.last()).toHaveText('Test.allTheThings() T-Shirt (Red)');

    // 2. Select Name (Z to A).
    await sort.selectOption('za');
    await expect(sort).toHaveValue('za');
    await expect(productNames.first()).toHaveText('Test.allTheThings() T-Shirt (Red)');
    await expect(productNames.last()).toHaveText('Sauce Labs Backpack');

    // 3. Select Price (low to high).
    await sort.selectOption('lohi');
    await expect(productNames.first()).toHaveText('Sauce Labs Onesie');
    await expect(productNames.last()).toHaveText('Sauce Labs Fleece Jacket');

    // 4. Select Price (high to low).
    await sort.selectOption('hilo');
    await expect(productNames.first()).toHaveText('Sauce Labs Fleece Jacket');
    await expect(productNames.last()).toHaveText('Sauce Labs Onesie');

    // 5. Restore Name (A to Z) and confirm cart remains unchanged.
    await sort.selectOption('az');
    await expect(sort).toHaveValue('az');
    await expect(productNames.first()).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
  });
});