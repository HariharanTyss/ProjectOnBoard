
import { test } from '@playwright/test'

test("verify sucessful order", async ({ page }) => {

await page.context().clearCookies();
    await page.goto('https://www.saucedemo.com/')

    await page.getByPlaceholder('Username').fill("standard_user")
    await page.getByPlaceholder('Password').fill("secret_sauce")
    await page.locator('#login-button').click()
    await page.waitForLoadState('domcontentloaded')


    await page.locator('//div[text()="Sauce Labs Backpack"]').click()

    await page.locator('[data-test="add-to-cart"]').click()
    const text = await page.locator("[class='shopping_cart_badge']").innerText()
    console.log(text)

    await page.locator('#back-to-products').click()
        await page.locator('//div[text()="Sauce Labs Bike Light"]').click()




    await page.locator("[class='shopping_cart_link']").click()
    await page.locator("#checkout").click()

    await page.getByPlaceholder('First Name').fill("harry")
    await page.getByPlaceholder('Last Name').fill("hariharan")
    await page.getByPlaceholder('Zip/Postal Code').fill("23231")

    await page.locator('#continue').click()
    await page.getByText('Finish').click()

    const [downloadedfile]=await Promise.all([
         page.waitForEvent('download'),
         page.getByText('Generate PDF order').click()
    ])
    
    await downloadedfile.saveAs("./download/harry.pdf")


    await page.pause()
})