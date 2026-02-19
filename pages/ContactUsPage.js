// @ts-check
import { expect } from '@playwright/test';

export class ContactUsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Page heading — actual DOM text is "GET IN TOUCH", no <b> wrapper
    this.getInTouchHeading = page.locator('h2.title', { hasText: 'GET IN TOUCH' });

    // Ad popup that may appear on the contact page
    this.adModal       = page.locator('div#exampleModal');
    this.adModalClose  = page.locator('div#exampleModal button.close');

    // Form fields
    this.nameInput    = page.locator('[data-qa="name"]');
    this.emailInput   = page.locator('[data-qa="email"]');
    this.subjectInput = page.locator('[data-qa="subject"]');
    this.messageArea  = page.locator('[data-qa="message"]');

    // File upload — the visible "Choose File" button is backed by an <input type="file">
    this.fileInput      = page.locator('input[name="upload_file"]');
    this.chooseFileBtn  = page.locator('input[name="upload_file"]');

    // Submit button
    this.submitButton = page.locator('[data-qa="submit-button"]');

    // Success alert shown after submission
    this.successAlert = page.locator('.contact-form .alert-success');
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

  // ── Assertions ────────────────────────────────────────────────────────────

  async verifyGetInTouchVisible() {
    await expect(this.getInTouchHeading).toBeVisible();
  }

  async verifyNameFieldVisible() {
    await expect(this.nameInput).toBeVisible();
  }

  async verifyEmailFieldVisible() {
    await expect(this.emailInput).toBeVisible();
  }

  async verifySubjectFieldVisible() {
    await expect(this.subjectInput).toBeVisible();
  }

  async verifyMessageAreaClickable() {
    await expect(this.messageArea).toBeVisible();
    await expect(this.messageArea).toBeEnabled();
  }

  async verifyChooseFileBtnVisible() {
    await expect(this.chooseFileBtn).toBeVisible();
  }

  async verifySubmitButtonVisible() {
    await expect(this.submitButton).toBeVisible();
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  async fillName(name) {
    // force:true bypasses ad-overlay intercept — value still lands in the field
    await this.nameInput.fill(name, { force: true });
    await expect(this.nameInput).toHaveValue(name);
  }

  async fillEmail(email) {
    await this.emailInput.fill(email, { force: true });
    await expect(this.emailInput).toHaveValue(email);
  }

  async fillSubject(subject) {
    await this.subjectInput.fill(subject, { force: true });
    await expect(this.subjectInput).toHaveValue(subject);
  }

  async fillMessage(message) {
    await this.messageArea.fill(message, { force: true });
    await expect(this.messageArea).toHaveValue(message);
  }

  /**
   * Opens the OS file chooser dialog and selects the given file.
   * Playwright's waitForEvent('filechooser') intercepts the native dialog
   * so no OS interaction is needed.
   * @param {string} filePath - Absolute path to the file to upload
   */
  async uploadFile(filePath) {
    // Intercept the file chooser BEFORE clicking so the event is not missed
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.chooseFileBtn.click(),
    ]);
    await fileChooser.setFiles(filePath);
  }

  async clickSubmit() {
    await expect(this.submitButton).toBeVisible();
    // The site shows a JS confirm dialog on submit — accept it automatically
    this.page.once('dialog', dialog => dialog.accept());
    await this.submitButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifySuccessMessage() {
    await expect(this.successAlert).toBeVisible();
    await expect(this.successAlert).toContainText('Success! Your details have been submitted successfully.');
  }
}
