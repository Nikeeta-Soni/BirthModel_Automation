// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { BrandsPage } from '../pages/BrandsPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { PaymentPage } from '../pages/PaymentPage.js';
import { SignupLoginPage } from '../pages/SignupLoginPage.js';
import { AccountInfoPage } from '../pages/AccountInfoPage.js';
import { TEST_USER } from '../utils/testDataHelper.js';

test('Brand browse → Add to cart → Checkout → Register', async ({ page }) => {
  const homePage      = new HomePage(page);
  const brandsPage    = new BrandsPage(page);
  const cartPage      = new CartPage(page);
  const checkoutPage  = new CheckoutPage(page);
  const paymentPage   = new PaymentPage(page);
  const signupPage    = new SignupLoginPage(page);
  const accountPage   = new AccountInfoPage(page);

  // ── Step 1: Navigate to homepage ─────────────────────────────────────────
  await homePage.goto();
  await homePage.verifyHomePageVisible();

  // ── Step 2: Scroll to BRANDS section in sidebar ──────────────────────────
  await brandsPage.scrollToBrands();

  // ── Step 3: Click MAST & HARBOUR brand ───────────────────────────────────
  await brandsPage.clickBrand('MAST & HARBOUR');
  await brandsPage.dismissPopupIfPresent();

  // ── Step 4 & 5: Count and log the number of MAST & HARBOUR products ──────
  const mastHarbourCount = await brandsPage.getProductCount();
  console.log(`MAST & HARBOUR — Total products: ${mastHarbourCount}`);
  expect(mastHarbourCount).toBeGreaterThan(0);

  // ── Step 6: Navigate back to homepage then click BIBA brand ──────────────
  await homePage.goto();
  await brandsPage.scrollToBrands();
  await brandsPage.clickBrand('BIBA');

  // ── Step 7: Wait for BIBA brand page to load, dismiss any popup ──────────
  await expect(page).toHaveURL(/brand_products/);
  await brandsPage.dismissPopupIfPresent();

  // ── Step 8 & 9: Scroll to Cotton Silk Saree and Add to Cart ──────────────
  await brandsPage.addToCartByName('Cotton Silk Hand Block Print Saree');

  // ── Step 10: Verify "Added!" popup ───────────────────────────────────────
  await brandsPage.verifyAddedPopup();

  // ── Step 11: Click "View Cart" on the popup ───────────────────────────────
  await brandsPage.clickViewCart();

  // ── Step 12: Verify cart page loaded ─────────────────────────────────────
  await cartPage.verifyCartPageLoaded();

  // ── Step 13: Click "Proceed To Checkout" ─────────────────────────────────
  await cartPage.clickProceedToCheckout();

  // ── Step 14: Verify Checkout modal and click "Register / Login" ───────────
  await cartPage.verifyCheckoutModalVisible();
  await cartPage.clickRegisterLogin();

  // ── Steps 15-22: Registration flow (same as userSignupFlow, STOP before Delete Account) ──

  // Step 15: Verify "New User Signup!" heading on login page
  await signupPage.verifyNewUserSignupVisible();

  // Step 16: Fill signup form with TEST_USER data
  await signupPage.fillSignupForm(TEST_USER.name, TEST_USER.email);
  await signupPage.clickSignup();

  // Step 17: Verify "ENTER ACCOUNT INFORMATION" heading
  await accountPage.verifyEnterAccountInfoHeadingVisible();

  // Step 18: Fill the complete account information form
  await accountPage.selectTitleMr();
  await accountPage.verifyNamePrefilled(TEST_USER.name);
  await accountPage.verifyEmailPrefilled(TEST_USER.email);
  await accountPage.enterPassword(TEST_USER.password);
  await accountPage.setDateOfBirth(TEST_USER.dob.day, TEST_USER.dob.month, TEST_USER.dob.year);
  await accountPage.checkNewsletter();
  await accountPage.checkOptin();
  await accountPage.fillAddressDetails(TEST_USER.address);

  // Step 19: Create account
  await accountPage.clickCreateAccount();

  // Step 20: Verify "ACCOUNT CREATED!" message
  const accountCreatedHeading = page.locator('b', { hasText: 'Account Created!' });
  await expect(accountCreatedHeading).toBeVisible();

  // Step 21: Click Continue
  await page.locator('[data-qa="continue-button"]').click();
  await page.waitForLoadState('domcontentloaded');

  // Step 22: Verify "Logged in as Mathew Smith"
  await homePage.verifyLoggedInAs(TEST_USER.name);

  // ── Step 23: Click "Cart" in the nav ─────────────────────────────────────
  await homePage.clickCart();

  // ── Step 24: Verify cart page loaded completely ───────────────────────────
  await cartPage.verifyCartPageLoaded();

  // ── Step 25: Click "Proceed To Checkout" ─────────────────────────────────
  // User is now logged in — no modal appears; navigates directly to /checkout
  await cartPage.clickProceedToCheckout();

  // ── Step 26: Verify checkout page loaded completely ───────────────────────
  await checkoutPage.verifyCheckoutPageLoaded();

  // ── Step 27: Click "Place Order" ─────────────────────────────────────────
  await checkoutPage.clickPlaceOrder();

  // ── Step 28: Verify Payment page loaded ───────────────────────────────────
  await paymentPage.verifyPaymentPageLoaded();

  // ── Step 29: Fill payment details ─────────────────────────────────────────
  await paymentPage.fillPaymentDetails({
    nameOnCard:  'Mask',
    cardNumber:  '234576899873',
    cvv:         '311',
    expiryMonth: '02',
    expiryYear:  '2033',
  });

  // ── Step 30: Click "Pay and Confirm Order" ────────────────────────────────
  await paymentPage.clickPayAndConfirmOrder();

  // ── Step 31: Verify "Order Placed!" heading ───────────────────────────────
  await paymentPage.verifyOrderPlaced();

  // ── Step 32: Click Continue ────────────────────────────────────────────────
  await paymentPage.clickContinue();
});
