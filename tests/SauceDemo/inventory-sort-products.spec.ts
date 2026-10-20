// spec: TestPlan/SauceDemo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Inventory', () => {
  test('Sort products', async ({ page }) => {
    // 1. Log in as standard_user.
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('#login-button').click();

    const productNames = page.locator('[data-test="inventory-item-name"]');
    const productPrices = page.locator('[data-test="inventory-item-price"]');
    const sortProducts = page.getByRole('combobox', { name: 'Sort products' });

    // 2. Select each available sort option and verify the corresponding product order.
    await sortProducts.selectOption('az');
    await expect(productNames).toHaveText([
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Onesie',
      'Test.allTheThings() T-Shirt (Red)',
    ]);

    await sortProducts.selectOption('za');
    await expect(productNames).toHaveText([
      'Test.allTheThings() T-Shirt (Red)',
      'Sauce Labs Onesie',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Bike Light',
      'Sauce Labs Backpack',
    ]);

    await sortProducts.selectOption('lohi');
    await expect(productNames).toHaveText([
      'Sauce Labs Onesie',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Test.allTheThings() T-Shirt (Red)',
      'Sauce Labs Backpack',
      'Sauce Labs Fleece Jacket',
    ]);
    await expect(productPrices).toHaveText([
      '$7.99',
      '$9.99',
      '$15.99',
      '$15.99',
      '$29.99',
      '$49.99',
    ]);

    await sortProducts.selectOption('hilo');
    await expect(productNames).toHaveText([
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Backpack',
      'Sauce Labs Bolt T-Shirt',
      'Test.allTheThings() T-Shirt (Red)',
      'Sauce Labs Bike Light',
      'Sauce Labs Onesie',
    ]);
    await expect(productPrices).toHaveText([
      '$49.99',
      '$29.99',
      '$15.99',
      '$15.99',
      '$9.99',
      '$7.99',
    ]);
  });
});
