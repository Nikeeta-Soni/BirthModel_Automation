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
}
