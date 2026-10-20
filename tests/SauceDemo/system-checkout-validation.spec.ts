import { test, expect } from '@playwright/test';

test.describe('Checkout', () => {
  test('Validate required checkout information', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // 1. Add a product and open checkout.
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await expect(page.locator('[data-test="firstName"]')).toBeVisible();
    await expect(page.locator('[data-test="lastName"]')).toBeVisible();
    await expect(page.locator('[data-test="postalCode"]')).toBeVisible();

    // 2. Submit with all fields blank.
    await page.locator('[data-test="continue"]').click();
    const error = page.locator('[data-test="error"]');
    await expect(error).toContainText('First Name is required');
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');

    // 3. Enter only a first name and submit.
    await page.locator('[data-test="firstName"]').fill('Jane');
    await page.locator('[data-test="continue"]').click();
    await expect(error).toContainText('Last Name is required');

    // 4. Enter a last name, leaving the postal code blank, and submit.
    await page.locator('[data-test="lastName"]').fill('Tester');
    await page.locator('[data-test="continue"]').click();
    await expect(error).toContainText('Postal Code is required');

    // 5. Enter valid information and continue.
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
  });
});