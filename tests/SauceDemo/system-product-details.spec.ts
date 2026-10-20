import { test, expect } from '@playwright/test';

test.describe('Inventory and Product Discovery', () => {
  test('Open a product detail page and return to inventory', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // 1. Open Sauce Labs Backpack product details.
    await page.locator('[data-test="item-4-title-link"]').click();
    await expect(page.locator('.inventory_details_name')).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('.inventory_details_price')).toHaveText('$29.99');
    await expect(page.getByRole('img', { name: 'Sauce Labs Backpack' })).toBeVisible();

    // 2. Return to the Products inventory.
    await page.locator('[data-test="back-to-products"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);

    // 3. Open the cart without adding the product, then return to Products.
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
    await expect(page.locator('[data-test="cart-list"] [data-test$="-title-link"]')).toHaveCount(0);
    await page.locator('[data-test="continue-shopping"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
  });
});