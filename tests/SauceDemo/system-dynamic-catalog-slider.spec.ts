import { test, expect } from '@playwright/test';

test.describe('Navigation and Dynamic Catalog', () => {
  test('Change the selected product in the slider', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // 1. Open Dynamic Catalog and select Slider.
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="dynamic-catalog-sidebar-link"]').click();
    await page.locator('[data-test="dynamic-catalog-slider-link"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Dynamic Catalog - Slider');
    await expect(page.getByRole('button', { name: 'Show Sauce Labs Backpack' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Show Sauce Labs Fleece Jacket' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Show Sauce Labs Bike Light' })).toBeVisible();

    // 2. Select Sauce Labs Backpack.
    await page.getByRole('button', { name: 'Show Sauce Labs Backpack' }).click();
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(page.getByText('$29.99', { exact: true })).toBeVisible();
    await expect(page.getByRole('img', { name: 'Sauce Labs Backpack' })).toBeVisible();

    // 3. Select Fleece Jacket, then Bike Light.
    await page.getByRole('button', { name: 'Show Sauce Labs Fleece Jacket' }).click();
    await expect(page.getByText('Sauce Labs Fleece Jacket', { exact: true })).toBeVisible();
    await expect(page.getByText('$49.99', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Show Sauce Labs Bike Light' }).click();
    await expect(page.getByText('Sauce Labs Bike Light', { exact: true })).toBeVisible();
    await expect(page.getByText('$9.99', { exact: true })).toBeVisible();
    await expect(page.getByRole('img', { name: 'Sauce Labs Bike Light' })).toBeVisible();
  });
});