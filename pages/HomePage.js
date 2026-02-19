// @ts-check
import { expect } from '@playwright/test';

export class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Use href-based selector — stable even when the link contains icon elements
    this.signupLoginLink = page.locator('a[href="/login"]');
    this.deleteAccountLink = page.locator('a[href="/delete_account"]');
    this.logoutLink = page.locator('a[href="/logout"]');
    this.contactUsLink = page.locator('a[href="/contact_us"]');
    // Two a[href="/view_cart"] exist (nav + page body) — .first() targets the nav one
    this.cartLink = page.locator('a[href="/view_cart"]').first();
    this.loggedInAsText = page.locator('li a', { hasText: 'Logged in as' });
  }

  async goto() {
    // Use 'domcontentloaded' — 'networkidle' times out on this site due to persistent ad scripts
    await this.page.goto('http://automationexercise.com', { waitUntil: 'domcontentloaded' });
  }

  async verifyHomePageVisible() {
    await expect(this.page).toHaveTitle(/Automation Exercise/);
  }

  async clickSignupLogin() {
    await expect(this.signupLoginLink).toBeVisible();
    await this.signupLoginLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyLoggedInAs(name) {
    await expect(this.loggedInAsText).toBeVisible();
    await expect(this.loggedInAsText).toContainText(name);
  }

  async clickDeleteAccount() {
    await expect(this.deleteAccountLink).toBeVisible();
    await this.deleteAccountLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickLogout() {
    await expect(this.logoutLink).toBeVisible();
    await this.logoutLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickContactUs() {
    await expect(this.contactUsLink).toBeVisible();
    await this.contactUsLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickCart() {
    await expect(this.cartLink).toBeVisible();
    await this.cartLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
