// @ts-check
import { expect } from '@playwright/test';

export class ProductDetailPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Product information section
    this.productInfo = page.locator('.product-information');

    // Individual detail rows
    this.availabilityText = page.locator('.product-information p', { hasText: 'Availability' });
    this.conditionText    = page.locator('.product-information p', { hasText: 'Condition' });
    this.brandText        = page.locator('.product-information p', { hasText: 'Brand' });

    // Quantity input field
    this.quantityInput = page.locator('#quantity');

    // Add to Cart button on the detail page
    this.addToCartBtn = page.locator('button.cart');

    // ── Success modal (appears after clicking Add to Cart) ──
    this.successModal        = page.locator('#cartModal');
    this.successModalTitle   = page.locator('#cartModal h4');   // "Added!"
    // Two <p> tags exist in the modal; scope to the one with the confirmation text
    this.successModalText    = page.locator('#cartModal p', { hasText: 'Your product has been added to cart.' });
    // Role-based selector — immune to class name changes
    this.continueShoppingBtn = page.locator('#cartModal').getByRole('button', { name: 'Continue Shopping' });
  }

  /**
   * Asserts both Availability and Brand detail lines are visible
   * and logs their text for traceability.
   */
  async verifyAvailabilityAndBrand() {
    await expect(this.availabilityText).toBeVisible();
    await expect(this.brandText).toBeVisible();

    const availText = await this.availabilityText.innerText();
    const brandText = await this.brandText.innerText();

    console.log(`Product details — ${availText.trim()} | ${brandText.trim()}`);
  }

  /**
   * Clears the quantity field and sets it to the specified amount.
   * @param {number} qty
   */
  async setQuantity(qty) {
    await expect(this.quantityInput).toBeVisible();
    // Triple-click selects the current value, then fill replaces it
    await this.quantityInput.click({ clickCount: 3 });
    await this.quantityInput.fill(String(qty));
    await expect(this.quantityInput).toHaveValue(String(qty));
  }

  /**
   * Clicks the Add to Cart button on the product detail page.
   */
  async clickAddToCart() {
    await expect(this.addToCartBtn).toBeVisible();
    await this.addToCartBtn.click();
  }

  /**
   * Waits for the success modal and asserts the confirmation message.
   */
  async verifySuccessModal() {
    await expect(this.successModal).toBeVisible();
    await expect(this.successModalTitle).toContainText('Added!');
    await expect(this.successModalText).toContainText('Your product has been added to cart.');
  }

  /**
   * Clicks the Continue Shopping button inside the success modal.
   */
  async clickContinueShopping() {
    await expect(this.continueShoppingBtn).toBeVisible();
    await this.continueShoppingBtn.click();
    // Wait for the modal to close
    await expect(this.successModal).toBeHidden();
  }
}
