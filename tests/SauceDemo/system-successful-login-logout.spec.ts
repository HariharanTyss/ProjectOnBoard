import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('Sign in and sign out successfully', async ({ page }) => {
    // 1. Start from an unauthenticated login page and enter standard_user / secret_sauce.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await expect(page.locator('[data-test="username"]')).toHaveValue('standard_user');

    // 2. Submit the login form.
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);

    // 3. Open the navigation menu and select Logout.
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});