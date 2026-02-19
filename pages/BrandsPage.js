// @ts-check
import { expect } from '@playwright/test';

export class BrandsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Brands sidebar heading
    this.brandsHeading = page.locator('.left-sidebar h2', { hasText: 'Brands' });

    // Ad popup (same pattern as CategoryPage)
    this.adModal      = page.locator('div#exampleModal');
    this.adModalClose = page.locator('div#exampleModal button.close');

    // "Added!" cart success modal
    this.addedModal    = page.locator('#cartModal');
    this.viewCartLink  = page.locator('#cartModal a[href="/view_cart"]');
  }

  // ── Sidebar navigation ────────────────────────────────────────────────────

  async scrollToBrands() {
    await this.brandsHeading.scrollIntoViewIfNeeded();
    await expect(this.brandsHeading).toBeVisible();
  }

  /**
   * Clicks a brand by name in the sidebar.
   * Uses page.goto() on the href to bypass Google Vignette ad interstitials.
   * @param {string} brandName - Exact brand name as displayed (e.g. 'MAST & HARBOUR')
   */
  async clickBrand(brandName) {
    const brandLink = this.page
      .locator('.brands-name ul li a', { hasText: brandName });

    const href = await brandLink.getAttribute('href');
    await this.page.goto(`http://automationexercise.com${href}`, { waitUntil: 'domcontentloaded' });
  }

  // ── Popup handling ────────────────────────────────────────────────────────

  async dismissPopupIfPresent() {
    try {
      await this.adModal.waitFor({ state: 'visible', timeout: 4000 });
      await this.adModalClose.click();
      await this.adModal.waitFor({ state: 'hidden', timeout: 3000 });
    } catch {
      // No popup — safe to continue
    }
  }

  // ── Product interactions ──────────────────────────────────────────────────

  /**
   * Returns the total number of products displayed on the current brand page.
   * @returns {Promise<number>}
   */
  async getProductCount() {
    await expect(this.page.locator('.product-image-wrapper').first()).toBeVisible();
    const count = await this.page.locator('.product-image-wrapper').count();
    console.log(`Products found on brand page: ${count}`);
    return count;
  }

  /**
   * Scrolls to the product card with the given name and clicks "Add to cart".
   * Uses force:true on the overlay button to bypass any ad overlays.
   * @param {string} productName - Exact product name text
   */
  async addToCartByName(productName) {
    const productCard = this.page
      .locator('.product-image-wrapper')
      .filter({ has: this.page.locator('p', { hasText: productName }) });

    await productCard.scrollIntoViewIfNeeded();
    await expect(productCard).toBeVisible();

    // Hover to reveal the overlay Add to Cart button
    await productCard.hover();

    const addToCartBtn = productCard.locator('.add-to-cart').first();
    await addToCartBtn.click({ force: true });
  }

  // ── Added popup ───────────────────────────────────────────────────────────

  async verifyAddedPopup() {
    await expect(this.addedModal).toBeVisible();
    await expect(this.page.locator('#cartModal h4')).toContainText('Added!');
  }

  async clickViewCart() {
    await expect(this.viewCartLink).toBeVisible();
    await this.viewCartLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
