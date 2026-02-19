// @ts-check
import { expect } from '@playwright/test';

export class AccountInfoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Heading
    this.enterAccountInfoHeading = page.locator('b', { hasText: 'Enter Account Information' });

    // Title radio buttons
    this.titleMrRadio = page.locator('#id_gender1');

    // Pre-filled fields
    this.nameInput = page.locator('#name');
    this.emailInput = page.locator('#email');

    // Password
    this.passwordInput = page.locator('#password');

    // Date of birth dropdowns
    this.daySelect = page.locator('#days');
    this.monthSelect = page.locator('#months');
    this.yearSelect = page.locator('#years');

    // Checkboxes
    this.newsletterCheckbox = page.locator('#newsletter');
    this.optinCheckbox = page.locator('#optin');

    // Address fields
    this.firstNameInput = page.locator('#first_name');
    this.lastNameInput = page.locator('#last_name');
    this.companyInput = page.locator('#company');
    this.address1Input = page.locator('#address1');
    this.address2Input = page.locator('#address2');
    this.countrySelect = page.locator('#country');
    this.stateInput = page.locator('#state');
    this.cityInput = page.locator('#city');
    this.zipcodeInput = page.locator('#zipcode');
    this.mobileInput = page.locator('#mobile_number');

    // Submit button
    this.createAccountButton = page.locator('[data-qa="create-account"]');
  }

  async verifyEnterAccountInfoHeadingVisible() {
    await expect(this.enterAccountInfoHeading).toBeVisible();
  }

  async selectTitleMr() {
    await this.titleMrRadio.check();
    await expect(this.titleMrRadio).toBeChecked();
  }

  async verifyNamePrefilled(name) {
    await expect(this.nameInput).toHaveValue(name);
  }

  async verifyEmailPrefilled(email) {
    await expect(this.emailInput).toHaveValue(email);
  }

  async enterPassword(password) {
    await expect(this.passwordInput).toBeVisible();
    await this.passwordInput.fill(password);
  }

  async setDateOfBirth(day, month, year) {
    await this.daySelect.selectOption(day);
    await this.monthSelect.selectOption({ label: month });
    await this.yearSelect.selectOption(year);
  }

  async checkNewsletter() {
    await this.newsletterCheckbox.check();
    await expect(this.newsletterCheckbox).toBeChecked();
  }

  async checkOptin() {
    await this.optinCheckbox.check();
    await expect(this.optinCheckbox).toBeChecked();
  }

  async fillAddressDetails({ firstName, lastName, company, address, address2, country, state, city, zipcode, mobile }) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.companyInput.fill(company);
    await this.address1Input.fill(address);
    await this.address2Input.fill(address2);
    await this.countrySelect.selectOption(country);
    await this.stateInput.fill(state);
    await this.cityInput.fill(city);
    await this.zipcodeInput.fill(zipcode);
    await this.mobileInput.fill(mobile);
  }

  async clickCreateAccount() {
    await expect(this.createAccountButton).toBeVisible();
    await this.createAccountButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
