// @ts-check
import { expect } from '@playwright/test';

export class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Breadcrumb confirms we are on the checkout page
    this.checkoutHeading = page.locator('li.active', { hasText: 'Checkout' });

    // "Place Order" button at the bottom of the checkout page
    this.placeOrderBtn = page.locator('a.btn.btn-default.check_out');
  }

  async verifyCheckoutPageLoaded() {
    await expect(this.page).toHaveURL(/\/checkout/);
    await expect(this.checkoutHeading).toBeVisible();
  }

  async clickPlaceOrder() {
    await expect(this.placeOrderBtn).toBeVisible();
    await this.placeOrderBtn.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
