const {test, expect} = require('@playwright/test');
const AKPAStateLicense = require('../../pages/AK_PA/AKPAStateLicense');

test('AK PA State License Flow test', async ({page}) => {
    const akpaStateLicense = new AKPAStateLicense(page);

    await akpaStateLicense.InitialSetup();

    await akpaStateLicense.PAStateLicenseCreation();

    await akpaStateLicense.AKAPATaskVerify();

});
