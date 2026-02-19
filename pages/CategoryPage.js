// @ts-check
import { expect } from '@playwright/test';

export class CategoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Left sidebar — Category panel heading
    this.categoryHeading = page.locator('.left-sidebar h2', { hasText: 'Category' });

    // Women collapse trigger in the sidebar
    this.womenCategoryLink = page.locator('a[href="#Women"]');

    // DRESS link nested under the Women panel
    this.womenDressLink = page.locator('#Women a', { hasText: 'Dress' });

    // Ad popup (Bootstrap modal) that sometimes appears on category pages
    this.adModal = page.locator('div#exampleModal');
    this.adModalCloseBtn = page.locator('div#exampleModal button.close');
  }

  /**
   * Scrolls the Category sidebar into view so it is interactable.
   */
  async scrollToCategory() {
    await this.categoryHeading.scrollIntoViewIfNeeded();
    await expect(this.categoryHeading).toBeVisible();
  }

  /**
   * Expands the WOMEN panel in the category sidebar.
   */
  async clickWomenCategory() {
    await expect(this.womenCategoryLink).toBeVisible();
    await this.womenCategoryLink.click();
  }

  /**
   * Clicks the DRESS sub-category under WOMEN.
   */
  async clickDressSubCategory() {
    await expect(this.womenDressLink).toBeVisible();
    await this.womenDressLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Dismisses the ad popup/modal if it appears within 4 seconds.
   * Silently continues if no popup is shown.
   */
  async dismissPopupIfPresent() {
    try {
      await this.adModal.waitFor({ state: 'visible', timeout: 4000 });
      await this.adModalCloseBtn.click();
      await this.adModal.waitFor({ state: 'hidden', timeout: 3000 });
    } catch {
      // No popup appeared — safe to continue
    }
  }

  /**
   * Finds the Sleeveless Dress product card by name and price,
   * then clicks its "View Product" link.
   * @param {string} productName - Product name text to match (e.g. 'Sleeveless Dress')
   * @param {string} price - Price text to match (e.g. 'Rs. 1000')
   */
  async viewProduct(productName, price) {
    // Locate the product card that contains both the expected name and price
    const productCard = this.page
      .locator('.product-image-wrapper')
      .filter({ has: this.page.locator('p', { hasText: productName }) })
      .filter({ has: this.page.locator('h2', { hasText: price }) });

    await expect(productCard).toBeVisible();

    // Read the href from the DOM directly — .choose is CSS-hidden until hover
    // but getAttribute() works regardless of CSS visibility.
    // We then call page.goto() instead of clicking, which bypasses the
    // Google Vignette ad interstitial that fires on browser-level navigation.
    const viewProductLink = productCard.locator('.choose a', { hasText: 'View Product' });
    const href = await viewProductLink.getAttribute('href');
    await this.page.goto(`http://automationexercise.com${href}`, { waitUntil: 'domcontentloaded' });
  }
}
