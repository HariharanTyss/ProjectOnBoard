import { test, expect } from '@playwright/test';

test.describe('Cart', () => {
  test('Add, retain, and remove products from the cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // 1. Start with a fresh authenticated session and empty cart on Products.
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);

    // 2. Add Sauce Labs Backpack and Sauce Labs Bike Light from the inventory.
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();

    // 3. Open the cart.
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
    await expect(page.locator('[data-test="item-0-title-link"]')).toBeVisible();
    await expect(page.locator('[data-test="item-quantity"]')).toHaveCount(2);
    await expect(page.locator('[data-test="inventory-item-price"]')).toHaveCount(2);

    // 4. Remove Sauce Labs Backpack from the cart.
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="item-4-title-link"]')).toHaveCount(0);
    await expect(page.locator('[data-test="item-0-title-link"]')).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    // 5. Remove the remaining product.
    await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
    await expect(page.locator('[data-test="item-4-title-link"]')).toHaveCount(0);
    await expect(page.locator('[data-test="item-0-title-link"]')).toHaveCount(0);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
  });
});