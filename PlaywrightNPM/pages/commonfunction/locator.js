class locator {
    constructor(page) {
        this.page = page;
 
    this.FloatingButton = page.getByText('Active Patients');
    this.StateFloatingButton = page.locator('//span[text()=" Add a license "]');
    this.StateLicenseTitle = page.locator('//h4[text()=" State Licenses "]');

    // Navigation
    this.statelicensebar = page.locator('#sidebar-container').getByText('State Licenses');
    this.dashboardButton = page.locator('#sidebar-container').getByText('Dashboard');

    // License creation
    this.addLicenseButton = page.getByRole('button', { name: '+ Add License' });
    this.stateDropdown = page.locator('#state div').first();
    this.stateselect = page.locator('//*[@id="state"]/div/div/div[2]/input');
    this.statename = page.getByRole('option', { name: 'Alaska' });
    this.licenseNumberInput = page.getByRole('textbox', { name: 'Enter the license number' });
    this.expiryDateInput = page.locator('#expiry_date');
    this.noradiooption = page.locator('#radio1');
    this.licenseTypeInput = page.getByRole('textbox', { name: 'Enter the license type' });
    this.initialDateInput = page.locator('#initial_date');
    this.Unknownradiooption = page.locator('#radio20');
    this.saveButton = page.getByRole('button', { name: 'Save' });

    // Dashboard tasks
    this.viewDetailsButton = page.getByRole('button', { name: 'search View Details' });
    this.tasktitle = page.locator('div.task-title.pb-1');

    // Delete license
    this.stateLicenseEntry = page.getByRole('row', { name: 'State License License Number' }).locator('span');
    this.deleteButton = page.getByRole('button', { name: 'Delete' });
    this.confirmDeleteButton = page.getByRole('button', { name: 'Yes' });
    }}

module.exports = locator;
