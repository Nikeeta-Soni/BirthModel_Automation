const ConfigReader = require("../base/configreader");
const Base = require("../base/Baseclass");
const Locator = require("./locator");
const { expect } = require('@playwright/test');

class UserLogin {
  constructor(page) {
    this.page = page;
    this.locator = new Locator(page);
    this.Base = new Base(page);
  }

  get usernameField() {
    return this.page.getByRole("textbox", { name: "Username/Email *" });
  }

  get passwordField() {
    return this.page.getByRole("textbox", { name: "Password *" });
  }

  get loginButton() {
    return this.page.getByRole("button", { name: "Log in" });
  }

  async DOlogin() {
    const username = ConfigReader.getDoUsername(Base.env);   
    const password = ConfigReader.getDoPassword(Base.env);  

    await this.usernameField.fill(username);
    console.log("✅ DOUsername entered!");
    await this.passwordField.fill(password);
    console.log("✅ DOPassword entered!");
    await this.loginButton.click();
    console.log("✅ Login button clicked!");
  }

  async PAlogin() {
    const username = ConfigReader.getPaUsername(Base.env);   
    const password = ConfigReader.getPaPassword(Base.env);  
    
    await this.usernameField.fill(username);
    console.log("✅ PAUsername entered!");
    await this.passwordField.fill(password);
    console.log("✅ PAPassword entered!");
    await this.loginButton.click();
    console.log("✅ Login button clicked!");
  }

  async RemoveLicense() {
    expect(this.locator.statelicensebar.isVisible);
    await this.locator.statelicensebar.click();
    console.log("✅ State License bar clicked!");
    expect(this.locator.stateLicenseEntry.isVisible);
    await this.locator.stateLicenseEntry.click();
    console.log("✅ State License entry selected");

    await this.page.waitForTimeout(5000);
    expect(this.locator.deleteButton.isVisible);
    await this.locator.deleteButton.click();
    console.log("✅ Delete button clicked");

    expect(this.locator.confirmDeleteButton.isVisible);
    await this.locator.confirmDeleteButton.click();
    console.log("✅ Confirmed delete");

    await this.page.waitForTimeout(5000);
    console.log("✅ License removed!");
} 
}

module.exports = UserLogin;