// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { ContactUsPage } from '../pages/ContactUsPage.js';

// process.cwd() is the project root when Playwright runs — no import needed
const FIXTURE_FILE = `${process.cwd()}/fixtures/file-sample_100kB (1).doc`;

// Static contact form data as specified
const CONTACT_DATA = {
  name: 'Mark',
  email: 'mark@yopmail.com',
  subject: 'Order Delivery Delay – Order #ECM45892',
  message: `Hello Support Team,

I placed an order on your website on March 12th (Order #ECM45892), and the expected delivery date was March 15th. However, I have not yet received the package, and there has been no recent update in the tracking details.

Could you please check the status of my order and let me know the expected delivery timeline? If there are any issues with the shipment, I would appreciate an update at the earliest.

Thank you for your assistance.`,
};

test('Contact Us — fill form, upload file, and submit', async ({ page }) => {
  const homePage = new HomePage(page);
  const contactUsPage = new ContactUsPage(page);

  // ── Step 1: Navigate to homepage ─────────────────────────────────────────
  await homePage.goto();
  await homePage.verifyHomePageVisible();

  // ── Step 2: Click "Contact Us" in nav ────────────────────────────────────
  await homePage.clickContactUs();

  // ── Step 3: Verify URL navigated to /contact_us ──────────────────────────
  await expect(page).toHaveURL(/\/contact_us/);

  // Dismiss the ad popup/modal if it appears before interacting with the form
  await contactUsPage.dismissPopupIfPresent();

  // ── Step 4: Validate "GET IN TOUCH" heading is visible ───────────────────
  await contactUsPage.verifyGetInTouchVisible();

  // ── Step 5: Verify Name field is visible then fill ───────────────────────
  await contactUsPage.verifyNameFieldVisible();
  await contactUsPage.fillName(CONTACT_DATA.name);

  // ── Step 6: Verify Email field is visible then fill ──────────────────────
  await contactUsPage.verifyEmailFieldVisible();
  await contactUsPage.fillEmail(CONTACT_DATA.email);

  // ── Step 7: Verify Subject field is visible then fill ────────────────────
  await contactUsPage.verifySubjectFieldVisible();
  await contactUsPage.fillSubject(CONTACT_DATA.subject);

  // ── Step 8: Verify "Your Message Here" textarea is clickable ─────────────
  await contactUsPage.verifyMessageAreaClickable();

  // ── Step 9: Fill the message textarea with the specified message ──────────
  await contactUsPage.fillMessage(CONTACT_DATA.message);

  // ── Step 10: Verify "Choose File" button is present ──────────────────────
  await contactUsPage.verifyChooseFileBtnVisible();

  // ── Step 11: Click Choose File — intercept dialog and select the .doc file
  await contactUsPage.uploadFile(FIXTURE_FILE);

  // ── Step 12: Verify Submit button is visible ──────────────────────────────
  await contactUsPage.verifySubmitButtonVisible();

  // ── Step 13: Click Submit (handles any JS confirm dialog automatically) ───
  await contactUsPage.clickSubmit();

  // ── Step 14: Verify success confirmation message ──────────────────────────
  await contactUsPage.verifySuccessMessage();
});
