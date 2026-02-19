// @ts-check
import { expect } from '@playwright/test';

export class PaymentPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Payment form fields
    this.nameOnCardInput  = page.locator('[data-qa="name-on-card"]');
    this.cardNumberInput  = page.locator('[data-qa="card-number"]');
    this.cvvInput         = page.locator('[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('[data-qa="expiry-month"]');
    this.expiryYearInput  = page.locator('[data-qa="expiry-year"]');

    // Pay and Confirm Order button
    this.payAndConfirmBtn = page.locator('[data-qa="pay-button"]');

    // Order placed confirmation
    this.orderPlacedHeading = page.locator('b', { hasText: 'Order Placed!' });

    // Continue button on order success page
    this.continueBtn = page.locator('[data-qa="continue-button"]');
  }

  // ── Assertions ────────────────────────────────────────────────────────────

  async verifyPaymentPageLoaded() {
    await expect(this.page).toHaveURL(/\/payment/);
    await expect(this.nameOnCardInput).toBeVisible();
  }

  async verifyOrderPlaced() {
    await expect(this.orderPlacedHeading).toBeVisible();
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  async fillPaymentDetails({ nameOnCard, cardNumber, cvv, expiryMonth, expiryYear }) {
    await this.nameOnCardInput.fill(nameOnCard);
    await this.cardNumberInput.fill(cardNumber);
    await this.cvvInput.fill(cvv);
    await this.expiryMonthInput.fill(expiryMonth);
    await this.expiryYearInput.fill(expiryYear);
  }

  async clickPayAndConfirmOrder() {
    await expect(this.payAndConfirmBtn).toBeVisible();
    await this.payAndConfirmBtn.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickContinue() {
    await expect(this.continueBtn).toBeVisible();
    await this.continueBtn.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
