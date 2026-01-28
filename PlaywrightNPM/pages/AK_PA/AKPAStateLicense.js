const Base = require("../base/Baseclass");
const UserLogin = require("../commonfunction/UserLogin");
const ConfigReader = require("../base/configreader");
const Locator = require("../commonfunction/locator");
const { expect } = require('@playwright/test');

class AKPAStateLicense extends Base {
    constructor(page) {
        super(page);
        this.userLogin = new UserLogin(page);
        this.locator = new Locator(page);
    }

    async InitialSetup() {
        await this.goto();
        await this.userLogin.PAlogin();
    }

    async PAStateLicenseCreation() {
    expect(this.locator.statelicensebar.isVisible);
    console.log("✅ State License bar is visible");
    await this.locator.statelicensebar.click();
    console.log("✅ State Licenses opened");

    expect(this.locator.addLicenseButton.isVisible);
    console.log("✅ Add License button is visible");
    await this.locator.addLicenseButton.click();
    console.log("✅ Add License clicked");

    expect(this.locator.stateselect.isVisible);
    console.log("✅ State dropdown is visible");
    await this.locator.stateselect.click();
    console.log("✅ State name List is visible");
    await this.locator.stateselect.fill('Alaska');
    await this.locator.stateselect.press('Enter');
    console.log("✅ Alaska State selected");

    expect(this.locator.licenseNumberInput.isVisible);
    console.log("✅ License number input is visible");
    await this.locator.licenseNumberInput.fill('AKPA0825');
    await expect(this.locator.licenseNumberInput).toHaveValue("AKPA0825");
    console.log("✅ License number entered & verified");

    expect(this.locator.expiryDateInput.isVisible);
    await this.locator.expiryDateInput.fill('12/31/2026');
    console.log("✅ Expiry Date entered");

    expect(this.locator.licenseTypeInput.isVisible);
    await this.locator.licenseTypeInput.fill('Playwright Automation test');
    await expect(this.locator.licenseTypeInput).toHaveValue("Playwright Automation test");
    console.log("✅ License type entered & verified");

    expect(this.locator.initialDateInput.isVisible);
    await this.locator.initialDateInput.fill('08/01/2025');
    console.log("✅ Initial Date entered");

    expect(this.locator.Unknownradiooption).toBeChecked();
    console.log("✅ Unknown Radio button is selected by default");

    expect(this.locator.saveButton.isVisible);
    await this.locator.saveButton.click();
    console.log("✅ License saved!");
}

async AKAPATaskVerify(){
    expect(this.locator.dashboardButton.isVisible);
    await this.locator.dashboardButton.click();
    console.log("✅ Dashboard button clicked!");
    expect(this.locator.viewDetailsButton.isVisible);
    await this.locator.viewDetailsButton.click();
    console.log("✅ View Details clicked");

    console.log("✅ Task verification started");
    await this.locator.tasktitle.first().waitFor({ state: 'visible', timeout: 10000 });
    const actualTasks = (await this.locator.tasktitle.allTextContents())
      .map(text => text.replace(/\s+/g, ' ').trim());
    expect(actualTasks.length).toBeGreaterThan(0);
    this.expectedTasks = [
      'Renew State License',
      'Complete 2 CME credits in pain management and opioid use and addiction every 2 years'
    ];
    const actualTextSet = new Set(actualTasks);
    const expectedTextSet = new Set(this.expectedTasks);

    console.log("📋 Actual UI Tasks:");
    [...actualTextSet].forEach(t => console.log(" -", t));

    // Find differences
    const missingTexts = [...expectedTextSet].filter(t => !actualTextSet.has(t));
    const extraTexts = [...actualTextSet].filter(t => !expectedTextSet.has(t));

    if (missingTexts.length > 0 || extraTexts.length > 0) {
      console.log('❌ Text verification failed!');
      if (missingTexts.length > 0) console.log('Missing:', missingTexts);
      if (extraTexts.length > 0) console.log('Unexpected:', extraTexts);
    }

    expect(actualTextSet).toEqual(expectedTextSet);
    console.log("✅ Task verification completed");

    await this.userLogin.RemoveLicense();
  }

}
module.exports = AKPAStateLicense;