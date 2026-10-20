import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('Reject blank login and invalid credentials', async ({ page }) => {
    // 1. Open the login page and submit the form without entering either field.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#login-button').click();
    const error = page.locator('[data-test="error"]');
    await expect(error).toContainText('Epic sadface: Username is required');
    await expect(page.locator('#login-button')).toBeVisible();

    // 2. Enter an unrecognized username and an incorrect password, then submit.
    await page.locator('[data-test="username"]').fill('unknown_user');
    await page.locator('[data-test="password"]').fill('bad_password');
    await page.locator('#login-button').click();
    await expect(error).toContainText('Epic sadface: Username and password do not match any user in this service');
    await expect(page.locator('#login-button')).toBeVisible();

    // 3. Dismiss the error, clear both fields, enter locked_out_user and secret_sauce, and submit.
    await page.locator('[data-test="error-button"]').click();
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(error).toContainText('Epic sadface: Sorry, this user has been locked out.');
    await expect(page.locator('#login-button')).toBeVisible();
  });
});