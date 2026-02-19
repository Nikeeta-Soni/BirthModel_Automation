// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { SignupLoginPage } from '../pages/SignupLoginPage.js';
import { AccountInfoPage } from '../pages/AccountInfoPage.js';
import { TEST_USER } from '../utils/testDataHelper.js';

test('User Signup and Login Flow', async ({ page }) => {
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

  // Step 7: Branch based on whether the email already exists
  const emailExists = await signupLoginPage.isEmailAlreadyExistErrorVisible();

  if (emailExists) {
    // Path B: Email already exists — fall back to login
    await signupLoginPage.verifyLoginToAccountVisible();
    await signupLoginPage.fillLoginForm(TEST_USER.email, TEST_USER.password);
    await signupLoginPage.clickLogin();
  } else {
    // Path A: New user — complete account creation
    await accountInfoPage.verifyEnterAccountInfoHeadingVisible();

    await accountInfoPage.selectTitleMr();
    await accountInfoPage.verifyNamePrefilled(TEST_USER.name);
    await accountInfoPage.verifyEmailPrefilled(TEST_USER.email);
    await accountInfoPage.enterPassword(TEST_USER.password);
    await accountInfoPage.setDateOfBirth(TEST_USER.dob.day, TEST_USER.dob.month, TEST_USER.dob.year);
    await accountInfoPage.checkNewsletter();
    await accountInfoPage.checkOptin();
    await accountInfoPage.fillAddressDetails(TEST_USER.address);
    await accountInfoPage.clickCreateAccount();

    const accountCreatedHeading = page.locator('b', { hasText: 'Account Created!' });
    await expect(accountCreatedHeading).toBeVisible();

    await page.locator('[data-qa="continue-button"]').click();
    await page.waitForLoadState('domcontentloaded');
  }

  // Both paths converge: Verify logged in
  await homePage.verifyLoggedInAs(TEST_USER.name);
});
