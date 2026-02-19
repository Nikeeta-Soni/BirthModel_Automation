// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { SignupLoginPage } from '../pages/SignupLoginPage.js';
import { AccountInfoPage } from '../pages/AccountInfoPage.js';
import { TEST_USER } from '../utils/testDataHelper.js';

test('User Signup and Account Deletion Flow', async ({ page }) => {
  const homePage = new HomePage(page);
  const signupLoginPage = new SignupLoginPage(page);
  const accountInfoPage = new AccountInfoPage(page);

  // Step 1-3: Launch browser, navigate to homepage and verify it is displayed
  await homePage.goto();
  await homePage.verifyHomePageVisible();

  // Step 4: Click "Signup / Login"
  await homePage.clickSignupLogin();

  // Step 5: Verify "New User Signup!" is visible
  await signupLoginPage.verifyNewUserSignupVisible();

  // Step 6: Fill signup form and submit
  await signupLoginPage.fillSignupForm(TEST_USER.name, TEST_USER.email);
  await signupLoginPage.clickSignup();

  // Step 7: Verify "ENTER ACCOUNT INFORMATION" heading is visible
  await accountInfoPage.verifyEnterAccountInfoHeadingVisible();

  // Step 8: Fill account information form

  // Select title Mr
  await accountInfoPage.selectTitleMr();

  // Verify pre-filled name and email
  await accountInfoPage.verifyNamePrefilled(TEST_USER.name);
  await accountInfoPage.verifyEmailPrefilled(TEST_USER.email);

  // Enter password
  await accountInfoPage.enterPassword(TEST_USER.password);

  // Set date of birth
  await accountInfoPage.setDateOfBirth(TEST_USER.dob.day, TEST_USER.dob.month, TEST_USER.dob.year);

  // Check newsletter and special offers checkboxes
  await accountInfoPage.checkNewsletter();
  await accountInfoPage.checkOptin();

  // Fill address details
  await accountInfoPage.fillAddressDetails(TEST_USER.address);

  // Step 9: Click "Create Account"
  await accountInfoPage.clickCreateAccount();

  // Step 10: Verify "ACCOUNT CREATED!" message
  const accountCreatedHeading = page.locator('b', { hasText: 'Account Created!' });
  await expect(accountCreatedHeading).toBeVisible();

  // Step 11: Click "Continue"
  await page.locator('[data-qa="continue-button"]').click();
  await page.waitForLoadState('domcontentloaded');

  // Step 12: Verify "Logged in as Mathew Smith" is visible
  await homePage.verifyLoggedInAs(TEST_USER.name);

  // Step 13: Click "Delete Account"
  await homePage.clickDeleteAccount();

  // Step 14: Verify "ACCOUNT DELETED!" message
  const accountDeletedHeading = page.locator('b', { hasText: 'Account Deleted!' });
  await expect(accountDeletedHeading).toBeVisible();

  // Step 15: Click "Continue"
  await page.locator('[data-qa="continue-button"]').click();
  await page.waitForLoadState('domcontentloaded');
});
