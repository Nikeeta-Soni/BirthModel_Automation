// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { CategoryPage } from '../pages/CategoryPage.js';
import { ProductDetailPage } from '../pages/ProductDetailPage.js';

test('Women > Dress — view Rs.1000 Sleeveless Dress, set qty 5 and add to cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const categoryPage = new CategoryPage(page);
  const productDetailPage = new ProductDetailPage(page);

  // ── Step 1-2: Navigate to homepage ───────────────────────────────────────
  await homePage.goto();
  await homePage.verifyHomePageVisible();

  // ── Step 3: Scroll down to the Category section ──────────────────────────
  await categoryPage.scrollToCategory();

  // ── Step 4: Click WOMEN to expand the sub-category panel ─────────────────
  await categoryPage.clickWomenCategory();

  // ── Step 5: Click DRESS under Women ──────────────────────────────────────
  await categoryPage.clickDressSubCategory();

  // ── Step 6: Dismiss the ad popup/modal if it appears ─────────────────────
  await categoryPage.dismissPopupIfPresent();

  // ── Step 7: Find the Rs. 1000 Sleeveless Dress and click View Product ────
  await categoryPage.viewProduct('Sleeveless Dress', 'Rs. 1000');

  // ── Step 8: Verify product detail page loaded completely ─────────────────
  await expect(page).toHaveURL(/\/product_details\//);
  await expect(productDetailPage.productInfo).toBeVisible();

  // ── Step 9: Check Availability and Brand ─────────────────────────────────
  await productDetailPage.verifyAvailabilityAndBrand();

  // ── Step 10: Increase quantity to 5 ──────────────────────────────────────
  await productDetailPage.setQuantity(5);

  // ── Step 11: Click Add to Cart ───────────────────────────────────────────
  await productDetailPage.clickAddToCart();

  // ── Step 12: Verify the success popup ────────────────────────────────────
  await productDetailPage.verifySuccessModal();

  // ── Step 13: Click Continue Shopping ─────────────────────────────────────
  await productDetailPage.clickContinueShopping();
});
