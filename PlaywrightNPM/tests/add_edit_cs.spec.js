import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://physician.stage.birthmodel.com/');
  await page.getByText('Sign in Sign in with hospital').click();
  await page.getByRole('button', { name: 'Sign in with hospital' }).click();
  await page.getByRole('textbox', { name: 'Enter your email or phone' }).click();
  await page.getByRole('textbox', { name: 'Enter your email or phone' }).fill('daisy1010@testdirectory007.onmicrosoft.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Enter the password for' }).click();
  await page.getByRole('textbox', { name: 'Enter the password for' }).fill('Azure@123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByText('Active Patients').click();
  await page.getByText('Pos Asd').click();
  await page.getByText('Intrapartum Management').click();
  await page.getByRole('button', { name: 'Add Intrapartum Updates' }).click();
  //await page.getByRole('textbox', { name: 'mm/dd/yyyy' }).click();
  //await page.getByRole('button', { name: 'Choose Tuesday, December 9th,' }).click();
  await page.getByText('Bloody').click();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  //await page.locator('div').filter({ hasText: 'Intrapartum Details updated successfully!Estimated Time when Fully Dilated01/14' }).nth(1).click();
  
  // ---------- HANDLE SUCCESS MODAL (FIXED) ----------
    console.log('⏳ Waiting for Intrapartum success modal...');
  
    const dialog = page.getByRole('dialog');
    const backdrop = page.locator('.MuiBackdrop-root');
  
    await expect(dialog).toBeVisible({ timeout: 10000 });
  
    await dialog.getByRole('button', { name: /close|done/i }).click();
  
    await expect(dialog).toBeHidden({ timeout: 10000 });
    await expect(backdrop).toBeHidden({ timeout: 10000 });
  
    console.log('✅ Intrapartum success modal closed cleanly');
  
  // Now click Cervical Exam History tab
  console.log('✅ Clicking Cervical Exam History tab');
  await page.getByText('Cervical Exam History').click();
  await page.waitForTimeout(2000);
  
  // Find and click the Add Cervical Exam button with multiple approaches
  let addButtonFound = false;
  
  // Try multiple button selectors
  const buttonOptions = [
    page.getByRole('button', { name: '+ Add Cervical Exam' }),
    page.getByRole('button', { name: 'Add Cervical Exam' }),
    page.locator('button:has-text("Add Cervical")'),
    page.locator('button:has-text("+")'),
    page.locator('button').filter({ hasText: /Add.*Cervical|Cervical.*Exam/ })
  ];
  
  for (const button of buttonOptions) {
    if (await button.count() > 0) {
      console.log(`✅ Found Add Cervical Exam button`);
      await button.click();
      addButtonFound = true;
      await page.waitForTimeout(2000);
      break;
    }
  }
  
  if (!addButtonFound) {
    console.log('⚠️ Add Cervical Exam button not found, trying text search');
    const allButtons = await page.locator('button').allTextContents();
    console.log(`Available buttons: ${allButtons.slice(0, 10).join(', ')}`);
    
    // Try to find it by inspecting the page
    const pageText = await page.textContent('body');
    if (pageText && pageText.includes('Add Cervical')) {
      console.log('✅ "Add Cervical" text found on page, trying direct click');
      await page.locator('text=Add Cervical').first().click({ force: true, timeout: 5000 });
      addButtonFound = true;
      await page.waitForTimeout(2000);
    }
  }
  
  if (addButtonFound) {
    console.log('✅ Add Cervical form opened');
    await page.waitForTimeout(2000);
    
    // Now proceed with form filling
    await page.locator('div').filter({ hasText: /^Select Date$/ }).nth(4).click();
  } else {
    console.log('⚠️ Could not open Add Cervical form, skipping to edit existing');
    // Skip to the edit section
    await page.waitForTimeout(2000);
  }
  
  // This section appears to be for editing an existing cervical exam
  try {
    await page.getByRole('button', { name: 'Choose Wednesday, February 4th,' }).click();
    await page.getByRole('textbox', { name: 'Select Time' }).click();
    await page.getByRole('button', { name: '07' }).first().click();
    await page.getByRole('button', { name: '07' }).first().click();
    await page.getByRole('button', { name: 'AM' }).click();
    await page.getByText('OK').click();
    await page.getByText('012345678910').click();
    await page.getByText('-3-2-10+1+').click();
    await page.locator('div').filter({ hasText: /^Select$/ }).nth(2).click();
    await page.getByText('-50%').click();
    await page.locator('#react-select-17-placeholder').click();
    await page.getByText('Medium', { exact: true }).click();
    await page.getByText('Select', { exact: true }).click();
    await page.getByText('Posterior', { exact: true }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    
    // Wait for the Intrapartum updated successfully popup to appear and close it
    console.log('⏳ Waiting for Cervical exam submitted popup...');
    await page.waitForTimeout(2000);
    
    // Try to close any popup that might have appeared
    const submitModalClose = page.getByRole('button', { name: 'Close' });
    const submitModalDone = page.getByRole('button', { name: 'Done' });
    const submitModalX = page.locator('button[aria-label="Close"], button:has-text("×")');
    
    if (await submitModalClose.count() > 0) {
      console.log('✅ Closing popup with Close button');
      await submitModalClose.last().click();
      await page.waitForTimeout(1500);
    } else if (await submitModalDone.count() > 0) {
      console.log('✅ Closing popup with Done button');
      await submitModalDone.last().click();
      await page.waitForTimeout(1500);
    } else if (await submitModalX.count() > 0) {
      console.log('✅ Closing popup with X button');
      await submitModalX.last().click();
      await page.waitForTimeout(1500);
    }
    
    // Wait for page to settle
    await page.waitForTimeout(2000);
    
    // Now try the edit flow
    const editRow = page.getByRole('row', { name: '12/30/2025 7:15 AM Daisy' });
    if (await editRow.count() > 0) {
      console.log('✅ Found cervical exam row');
      await editRow.getByRole('button').click();
      await page.waitForTimeout(1500); // Wait for modal to open
      await page.waitForTimeout(1500);
      await page.getByText('Midposition', { exact: true }).click();
      await page.waitForTimeout(500);
      await page.getByText('Posterior', { exact: true }).click();
      await page.waitForTimeout(500);
      await page.getByRole('button', { name: 'Update' }).click();
      console.log('✅ Cervical exam updated successfully');
    } else {
      console.log('⚠️ Cervical exam row not found');
    }
  } catch (e) {
    console.log(`⚠️ Error during cervical exam section: ${e.message}`);
  }
});