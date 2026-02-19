// @ts-check
import { expect } from '@playwright/test';

export class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Cart page verification
    this.cartHeading = page.locator('li.active', { hasText: 'Shopping Cart' });

    // Proceed To Checkout button
    this.proceedToCheckoutBtn = page.locator('a.btn.btn-default.check_out');

    // Checkout modal — shown when user is not logged in
    this.checkoutModal         = page.locator('#checkoutModal');
    this.checkoutModalHeading  = page.locator('#checkoutModal .modal-title');
    this.registerLoginLink     = page.locator('#checkoutModal a', { hasText: 'Register / Login' });
  }

  // ── Assertions ────────────────────────────────────────────────────────────

  async verifyCartPageLoaded() {
    await expect(this.page).toHaveURL(/\/view_cart/);
    await expect(this.cartHeading).toBeVisible();
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  async clickProceedToCheckout() {
    await expect(this.proceedToCheckoutBtn).toBeVisible();
    await this.proceedToCheckoutBtn.click();
  }

  async verifyCheckoutModalVisible() {
    await expect(this.checkoutModal).toBeVisible();
    await expect(this.checkoutModalHeading).toContainText('Checkout');
  }

  async clickRegisterLogin() {
    await expect(this.registerLoginLink).toBeVisible();
    await this.registerLoginLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
