# SauceDemo System Test Plan

## Application Overview

System-level coverage for SauceDemo (Swag Labs) at https://www.saucedemo.com/. Scope includes login and account errors, product inventory, sorting and detail views, cart state, checkout validation and completion, menu actions, and the Dynamic Catalog lazy-load, spinner, and slider views. Use independent scenarios with a fresh browser context and reset application state for each run. Login scenarios start on the unauthenticated login page; authenticated shopping scenarios start after signing in as standard_user (password: secret_sauce) with an empty cart. Test data uses disposable demo orders only. Success means the visible UI state, navigation, cart counts, item/pricing summaries, and error/confirmation messages match expected results; fail on incorrect state, missing feedback, stale cart contents, or a loading indicator that does not resolve within the agreed timeout. Exploratory note: Lazy Load still showed loading placeholders after a 5-second wait during exploration; validate that loading completes under the product's agreed timeout.

## Test Scenarios

### 1. Authentication

**Seed:** `tests/seed.spec.ts`

#### 1.1. Reject blank login and invalid credentials

**File:** `tests/SauceDemo/system-login-validation.spec.ts`

**Steps:**
  1. Open https://www.saucedemo.com/ in a fresh browser context and submit the login form without entering either field.
    - expect: Login remains on the sign-in page.
    - expect: An alert reports that Username is required.
  2. Enter an unrecognized username and an incorrect password, then submit.
    - expect: Login remains on the sign-in page.
    - expect: An alert reports that the username and password do not match any user.
  3. Dismiss the error, clear both fields, enter locked_out_user and secret_sauce, and submit.
    - expect: Login remains on the sign-in page.
    - expect: An alert states that this user has been locked out.

#### 1.2. Sign in and sign out successfully

**File:** `tests/SauceDemo/system-successful-login-logout.spec.ts`

**Steps:**
  1. Start from a fresh unauthenticated login page and enter standard_user / secret_sauce.
    - expect: Username and password are accepted.
  2. Submit the login form.
    - expect: The Products inventory page opens.
    - expect: The inventory displays six products and the cart is empty.
  3. Open the navigation menu and select Logout.
    - expect: The login page is displayed.
    - expect: The authenticated inventory is no longer accessible without signing in again.

### 2. Inventory and Product Discovery

**Seed:** `tests/seed.spec.ts`

#### 2.1. Sort all inventory products by name and price

**File:** `tests/SauceDemo/system-inventory-sort.spec.ts`

**Steps:**
  1. Start with a fresh authenticated standard_user session and empty cart on the Products page.
    - expect: Six distinct products are visible.
    - expect: Name (A to Z) is the initial selected sort order.
  2. Select Name (Z to A) in Sort products.
    - expect: Products appear in reverse alphabetical order.
  3. Select Price (low to high).
    - expect: Products appear in ascending price order; Sauce Labs Onesie ($7.99) is first and Sauce Labs Fleece Jacket ($49.99) is last.
  4. Select Price (high to low).
    - expect: Products appear in descending price order; Sauce Labs Fleece Jacket ($49.99) is first and Sauce Labs Onesie ($7.99) is last.
  5. Select Name (A to Z) again.
    - expect: Products return to alphabetical order without changing the cart.

#### 2.2. Open a product detail page and return to inventory

**File:** `tests/SauceDemo/system-product-details.spec.ts`

**Steps:**
  1. Start with a fresh authenticated session on the Products page and open Sauce Labs Backpack by selecting its product name or image.
    - expect: The product detail page opens for Sauce Labs Backpack.
    - expect: The page shows the matching image, description, and $29.99 price.
  2. Select Back to products.
    - expect: The Products inventory page returns with the full product list.
  3. Open the cart from the detail page without adding the product, then return to Products.
    - expect: The cart is empty and no product was added unintentionally.

### 3. Cart

**Seed:** `tests/seed.spec.ts`

#### 3.1. Add, retain, and remove products from the cart

**File:** `tests/SauceDemo/system-cart-management.spec.ts`

**Steps:**
  1. Start with a fresh authenticated session and empty cart on Products.
    - expect: The cart badge is empty and each product offers Add to cart.
  2. Add Sauce Labs Backpack and Sauce Labs Bike Light from the inventory.
    - expect: Each selected product changes to a Remove action.
    - expect: The cart badge shows 2 items.
  3. Open the cart.
    - expect: Both selected products appear with quantity 1, correct names, descriptions, and prices.
  4. Remove Sauce Labs Backpack from the cart.
    - expect: Backpack is removed, Bike Light remains, and the badge shows 1 item.
  5. Remove the remaining product.
    - expect: The cart contains no products and the cart badge is empty.

#### 3.2. Continue shopping and cancel checkout without losing cart contents

**File:** `tests/SauceDemo/system-cart-navigation.spec.ts`

**Steps:**
  1. Start with a fresh authenticated session, add one product, and open the cart.
    - expect: The selected product appears in the cart.
  2. Select Continue Shopping.
    - expect: The Products inventory page opens and the selected product remains in the cart.
  3. Open the cart again and select Checkout.
    - expect: The Checkout: Your Information form opens.
  4. Select Cancel.
    - expect: The user returns to the cart and the selected product remains in the cart.

### 4. Checkout

**Seed:** `tests/seed.spec.ts`

#### 4.1. Validate required checkout information

**File:** `tests/SauceDemo/system-checkout-validation.spec.ts`

**Steps:**
  1. Start with a fresh authenticated session, add one product, open the cart, and select Checkout.
    - expect: The Checkout: Your Information form displays First Name, Last Name, and Zip/Postal Code fields.
  2. Leave all fields blank and select Continue.
    - expect: Checkout remains on the information step.
    - expect: An alert identifies First Name as required.
  3. Enter only a first name and select Continue.
    - expect: Checkout remains on the information step.
    - expect: An alert identifies Last Name as required.
  4. Enter a last name but leave Zip/Postal Code blank, then select Continue.
    - expect: Checkout remains on the information step.
    - expect: An alert identifies Zip/Postal Code as required.
  5. Enter valid values in all three fields and select Continue.
    - expect: The checkout overview opens and contains the selected product.

#### 4.2. Complete a purchase and verify order confirmation

**File:** `tests/SauceDemo/system-complete-order.spec.ts`

**Steps:**
  1. Start with a fresh authenticated session, add Sauce Labs Backpack ($29.99), open the cart, and proceed to Checkout.
    - expect: The cart contains one Backpack and checkout information is requested.
  2. Enter Jane, Tester, and postal code 12345, then select Continue.
    - expect: Checkout overview shows the Backpack, SauceCard payment information, and free delivery.
    - expect: Item total is $29.99, tax is $2.40, and total is $32.39.
  3. Select Finish.
    - expect: The Checkout: Complete! page displays Thank you for your order and the dispatch confirmation message.
    - expect: The cart is empty.
  4. Select Back Home.
    - expect: The Products inventory page opens and the cart remains empty.

#### 4.3. Cancel checkout from the overview

**File:** `tests/SauceDemo/system-checkout-cancel.spec.ts`

**Steps:**
  1. Start with a fresh authenticated session, add one product, and proceed from cart through valid customer information to Checkout: Overview.
    - expect: The overview shows the selected product and order totals.
  2. Select Cancel.
    - expect: The user returns to the Products inventory page.
    - expect: The order is not completed and the cart state is not silently converted into a completed order.

### 5. Navigation and Dynamic Catalog

**Seed:** `tests/seed.spec.ts`

#### 5.1. Use menu navigation and reset application state

**File:** `tests/SauceDemo/system-app-menu.spec.ts`

**Steps:**
  1. Start with a fresh authenticated session, add a product to the cart, then open the navigation menu.
    - expect: Menu options include All Items, Dynamic Catalog, About, Logout, and Reset App State.
  2. Select Reset App State.
    - expect: The app returns to the inventory and clears cart state; products offer Add to cart and the cart badge is empty.
  3. Open the menu and select All Items.
    - expect: The Products inventory is displayed.

#### 5.2. Load all items in the Lazy Load catalog

**File:** `tests/SauceDemo/system-dynamic-catalog-lazy-load.spec.ts`

**Steps:**
  1. Start with a fresh authenticated session, open the menu, expand Dynamic Catalog, and select Lazy Load.
    - expect: The Dynamic Catalog - Lazy Load page opens.
    - expect: Product cards and loading placeholders are displayed while items load.
  2. Wait for lazy loading to complete within the agreed application timeout.
    - expect: Loading placeholders disappear and all expected catalog entries are visible.
    - expect: No product card remains indefinitely in a loading state.

#### 5.3. Load catalog items after the spinner state

**File:** `tests/SauceDemo/system-dynamic-catalog-spinner.spec.ts`

**Steps:**
  1. Start with a fresh authenticated session, open Dynamic Catalog and select Spinner.
    - expect: The Dynamic Catalog - Spinner page opens and exposes a loading status while data is pending.
  2. Wait for the spinner to resolve.
    - expect: The loading status disappears and six product entries with names and prices are displayed.

#### 5.4. Change the selected product in the slider

**File:** `tests/SauceDemo/system-dynamic-catalog-slider.spec.ts`

**Steps:**
  1. Start with a fresh authenticated session, open Dynamic Catalog and select Slider.
    - expect: The slider page displays an initial product image, name, and price.
    - expect: Six product-selection controls are available.
  2. Select Show Sauce Labs Backpack.
    - expect: The selected product image, name, and price update to Sauce Labs Backpack and $29.99.
  3. Select Show Sauce Labs Fleece Jacket, then select Show Sauce Labs Bike Light.
    - expect: Each selection updates the displayed product consistently to the selected name, image, and price.
