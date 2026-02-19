// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { SignupLoginPage } from '../pages/SignupLoginPage.js';
import { AccountInfoPage } from '../pages/AccountInfoPage.js';
import { generateUniqueEmail, TEST_USER } from '../utils/testDataHelper.js';

// ─────────────────────────────────────────────────────────────
// N1: Signup with an already-registered email
// ─────────────────────────────────────────────────────────────
test('N1 - Signup with existing email shows error', async ({ page }) => {
  const homePage = new HomePage(page);
  const signupLoginPage = new SignupLoginPage(page);
  const accountInfoPage = new AccountInfoPage(page);

  // Use a unique email so we can register it fresh, then try again
  const existingEmail = generateUniqueEmail('existing');

  // --- First registration (makes the email exist) ---
  await homePage.goto();
  await homePage.clickSignupLogin();
  await signupLoginPage.fillSignupForm(TEST_USER.name, existingEmail);
  await signupLoginPage.clickSignup();

  // Complete account creation so the email is permanently registered
  await accountInfoPage.verifyEnterAccountInfoHeadingVisible();
  await accountInfoPage.selectTitleMr();
  await accountInfoPage.enterPassword(TEST_USER.password);
  await accountInfoPage.setDateOfBirth(TEST_USER.dob.day, TEST_USER.dob.month, TEST_USER.dob.year);
  await accountInfoPage.fillAddressDetails(TEST_USER.address);
  await accountInfoPage.clickCreateAccount();
  await expect(page.locator('b', { hasText: 'Account Created!' })).toBeVisible();

  // Delete the account after test to keep the site clean
  await page.locator('[data-qa="continue-button"]').click();
  await page.waitForLoadState('domcontentloaded');

  // Logout so the Signup/Login link becomes available again
  // (navigating to /login while logged in silently redirects back to home)
  await homePage.clickLogout();

  // --- Second registration attempt with the same email ---
  await homePage.clickSignupLogin();
  await signupLoginPage.verifyNewUserSignupVisible();
  await signupLoginPage.fillSignupForm(TEST_USER.name, existingEmail);
  await signupLoginPage.clickSignup();

  // Expect the duplicate-email error message
  const errorMsg = page.locator('p', { hasText: 'Email Address already exist!' });
  await expect(errorMsg).toBeVisible();

  // Clean up: delete the registered account
  await page.goto('http://automationexercise.com/delete_account', { waitUntil: 'domcontentloaded' });
});

// ─────────────────────────────────────────────────────────────
// N2: Signup with blank Name field — browser validation fires
// ─────────────────────────────────────────────────────────────
test('N2 - Signup with blank name does not proceed', async ({ page }) => {
  const homePage = new HomePage(page);
  const signupLoginPage = new SignupLoginPage(page);

  await homePage.goto();
  await homePage.clickSignupLogin();
  await signupLoginPage.verifyNewUserSignupVisible();

  // Leave name blank, fill only email
  await signupLoginPage.fillSignupForm('', generateUniqueEmail('blank_name'));
  await signupLoginPage.clickSignup();

  // The browser's required-field validation prevents form submission.
  // The page must NOT navigate away from /login — "New User Signup!" stays visible.
  await expect(page).toHaveURL(/\/login/);
  await expect(signupLoginPage.newUserSignupHeading).toBeVisible();
});

// ─────────────────────────────────────────────────────────────
// N3: Signup with blank Email field — browser validation fires
// ─────────────────────────────────────────────────────────────
test('N3 - Signup with blank email does not proceed', async ({ page }) => {
  const homePage = new HomePage(page);
  const signupLoginPage = new SignupLoginPage(page);

  await homePage.goto();
  await homePage.clickSignupLogin();
  await signupLoginPage.verifyNewUserSignupVisible();

  // Fill name, leave email blank
  await signupLoginPage.fillSignupForm(TEST_USER.name, '');
  await signupLoginPage.clickSignup();

  // Same as N2 — browser validation prevents navigation; page stays at /login
  await expect(page).toHaveURL(/\/login/);
  await expect(signupLoginPage.newUserSignupHeading).toBeVisible();
});
