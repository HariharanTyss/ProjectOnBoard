// spec: TestPlan/SauceDemo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Inventory', () => {
  test('View product details', async ({ page }) => {
    // 1. Log in as standard_user.
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // 2. Select Sauce Labs Backpack from the inventory.
    await page.locator('[data-test="item-4-title-link"]').click();
    await expect(page).toHaveURL(/\/inventory-item\.html\?id=4$/);

    // 3. Verify its product detail page and available action.
    const productName = page.locator('[data-test="inventory-item-name"]');
    await expect(productName).toHaveCount(1);
    await expect(productName).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('[data-test="inventory-item-desc"]')).toHaveText(
      'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
    );
    await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');
    await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible();

    // 4. Select Back to products.
    await page.getByRole('button', { name: 'Back to products' }).click();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
  });
});
