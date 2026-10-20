import { test, expect } from '@playwright/test';

test.describe('Cart', () => {
  test('Continue shopping and cancel checkout without losing cart contents', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // 1. Add a product and open the cart.
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();

    // 2. Continue shopping and verify the cart is retained.
    await page.locator('[data-test="continue-shopping"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    // 3. Reopen the cart and proceed to checkout.
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');

    // 4. Cancel checkout and confirm cart contents remain.
    await page.locator('[data-test="cancel"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
  });
});