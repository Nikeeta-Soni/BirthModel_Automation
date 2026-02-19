// @ts-check
import { expect } from '@playwright/test';

export class SignupLoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.newUserSignupHeading = page.getByRole('heading', { name: 'New User Signup!' });
    this.signupNameInput = page.locator('[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');

    // Login form locators
    this.loginToAccountHeading = page.getByRole('heading', { name: 'Login to your account' });
    this.loginEmailInput = page.locator('[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
    this.emailAlreadyExistError = page.locator('p', { hasText: 'Email Address already exist!' });
  }

  async verifyNewUserSignupVisible() {
    await expect(this.newUserSignupHeading).toBeVisible();
  }

  async fillSignupForm(name, email) {
    await expect(this.signupNameInput).toBeVisible();
    await this.signupNameInput.fill(name);

    await expect(this.signupEmailInput).toBeVisible();
    await this.signupEmailInput.fill(email);
  }

  async clickSignup() {
    await expect(this.signupButton).toBeVisible();
    await this.signupButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isEmailAlreadyExistErrorVisible() {
    try {
      await expect(this.emailAlreadyExistError).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async verifyLoginToAccountVisible() {
    await expect(this.loginToAccountHeading).toBeVisible();
  }

  async fillLoginForm(email, password) {
    await expect(this.loginEmailInput).toBeVisible();
    await this.loginEmailInput.fill(email);

    await expect(this.loginPasswordInput).toBeVisible();
    await this.loginPasswordInput.fill(password);
  }

  async clickLogin() {
    await expect(this.loginButton).toBeVisible();
    await this.loginButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
