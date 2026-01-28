import { test, expect } from '@playwright/test';

test('Add Patient Complete Flow - Physician Portal', async ({ page }) => {
  page.setDefaultTimeout(120000);
  
  console.log('\n========================================');
  console.log('ADD PATIENT FLOW - EXECUTION STARTED');
  console.log('========================================\n');

  try {
    // ===== STEP 1: NAVIGATE AND LOGIN =====
    console.log('📍 STEP 1: Physician Portal Login');
    console.log('-----------------------------------');
    
    // Navigate to physician login page
    await page.goto('https://physician.stage.birthmodel.com/', { waitUntil: 'domcontentloaded' });
    console.log('✅ Navigated to physician.stage.birthmodel.com');

    // Wait for Auth0 redirect
    await page.waitForTimeout(2000);

    // Click Sign in with hospital credentials button (Auth0 page)
    const hospitalButton = page.locator('text=Sign in with hospital credentials');
    if (await hospitalButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await hospitalButton.click();
      console.log('✅ Clicked Sign in with hospital credentials button');
    } else {
      // Fallback to getByRole if text selector doesn't work
      await page.getByRole('button', { name: 'Sign in with hospital credentials' }).click();
      console.log('✅ Clicked Sign in with hospital credentials button (role)');
    }

    // Fill email - exact selector from original
    await page.getByRole('textbox', { name: 'Enter your email or phone' }).fill('daisy1010@testdirectory007.onmicrosoft.com');
    console.log('✅ Entered email: daisy1010@testdirectory007.onmicrosoft.com');

    // Click Next
    await page.getByRole('button', { name: 'Next' }).click();
    console.log('✅ Clicked Next on email screen');

    // Fill password
    await page.waitForTimeout(2000);
    await page.locator('#i0118').fill('Azure@123');
    console.log('✅ Entered password: Azure@123');

    // Click Sign in
    await page.getByRole('button', { name: 'Sign in' }).click();
    console.log('✅ Clicked Sign in button');

    // Click Yes button
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Yes' }).click();
    console.log('✅ Clicked Yes button for permissions');

    // Wait for dashboard
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {
      console.log('ℹ️ Network idle timeout');
    });
    await page.waitForTimeout(3000);

    const currentURL = page.url();
    console.log(`📍 Current URL: ${currentURL}`);
    
    // Navigate to dashboard if not already there
    if (!currentURL.includes('dashboard')) {
      console.log('ℹ️ Not on dashboard, navigating there');
      await page.goto('https://physician.stage.birthmodel.com/dashboard', { waitUntil: 'networkidle' });
      await page.waitForTimeout(3000);
    }
    
    console.log('✅ Login completed\n');

    // ===== STEP 2: NAVIGATE TO ACTIVE PATIENTS =====
    console.log('📍 STEP 2: Click Add New Patient Button');
    console.log('-----------------------------------');

    // Try to find the ADD NEW PATIENT button with a longer timeout
    console.log('🔍 Looking for ADD NEW PATIENT button...');
    const addButton = page.getByRole('button', { name: 'ADD NEW PATIENT' });
    const isVisible = await addButton.isVisible({ timeout: 5000 }).catch(() => false);
    
    if (isVisible) {
      await addButton.click();
      console.log('✅ Clicked ADD NEW PATIENT button');
    } else {
      // Try alternative selectors
      const addButtonAlt = page.locator('button:has-text("ADD NEW PATIENT"), button:has-text("Add New Patient"), [aria-label*="ADD NEW PATIENT"]').first();
      if (await addButtonAlt.isVisible({ timeout: 3000 }).catch(() => false)) {
        await addButtonAlt.click();
        console.log('✅ Clicked ADD NEW PATIENT button (alternative)');
      } else {
        console.log('⚠️ ADD NEW PATIENT button not found');
        throw new Error('ADD NEW PATIENT button not found on the page');
      }
    }

    console.log('✅ Patient form opened\n');

    // ===== STEP 3: FILL FORM FIELDS =====
    console.log('📍 STEP 3: Fill Patient Form');
    console.log('-----------------------------------');

    // First Name
    await page.getByRole('textbox', { name: 'Enter first name' }).click();
    await page.getByRole('textbox', { name: 'Enter first name' }).fill('Jennifer');
    console.log('✅ First Name: Jennifer');

    // Last Name
    await page.getByRole('textbox', { name: 'Enter last name' }).click();
    await page.getByRole('textbox', { name: 'Enter last name' }).fill('Smith');
    console.log('✅ Last Name: Smith');

    // Date of Birth
    await page.locator('input[name="dateOfBirth"]').click();
    console.log('✅ Clicked Date of Birth field');
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Choose Wednesday, December 31st,' }).click();
    console.log('✅ Selected Date of Birth');

    // MRN
    await page.getByRole('textbox', { name: 'Enter MRN' }).click();
    await page.getByRole('textbox', { name: 'Enter MRN' }).fill('874653845');
    console.log('✅ MRN: 874653845');

    // First Examination Date
    await page.locator('input[name="firstExamination"]').click();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Choose Thursday, January 22nd,' }).click();
    console.log('✅ First Examination Date selected');

    // Time Selection
    await page.getByRole('textbox', { name: 'Select Time' }).click();
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: '06' }).first().click();
    console.log('✅ Hour: 06');
    
    await page.getByRole('button', { name: '26' }).click();
    console.log('✅ Minute: 26');
    
    await page.getByRole('button', { name: 'AM' }).click();
    console.log('✅ Period: AM');
    
    await page.getByText('OK').click();
    console.log('✅ Time set: 06:26 AM');

    console.log('');

    // ===== STEP 4: CERVICAL EXAM DETAILS =====
    console.log('📍 STEP 4: Cervical Exam Details');
    console.log('-----------------------------------');

    // Dilation slider (click twice for value of 3)
    await page.locator('.MuiSlider-rail').first().click();
    console.log('✅ Dilation slider clicked');

    // Effacement dropdown
    await page.locator('#react-select-15-placeholder').click();
    await page.getByText('-50%').click();
    console.log('✅ Effacement: -50% selected');

    // Fetal Station
    await page.locator('#react-select-16-placeholder').click();
    await page.locator('#react-select-16-option-1').click();
    console.log('✅ Fetal Station: option selected');

    // Consistency
    await page.locator('#react-select-17-placeholder').click();
    await page.getByText('Posterior').click();
    console.log('✅ Consistency: Posterior selected');

    // BMI
    await page.getByPlaceholder('Enter value (ex: 35.11)').click();
    await page.getByPlaceholder('Enter value (ex: 35.11)').fill('34');
    console.log('✅ BMI: 34');

    console.log('');

    // ===== STEP 5: ADDITIONAL DETAILS =====
    console.log('📍 STEP 5: Additional Details');
    console.log('-----------------------------------');

    // Race
    await page.locator('#react-select-18-placeholder').click();
    await page.getByText('Black or African American').click();
    console.log('✅ Race: Black or African American');

    // Practice
    await page.locator('.css-ackcql').click();
    await page.locator('#react-select-20-option-0').click();
    console.log('✅ Practice: First option selected');

    // Provider - Daisy
    await page.locator('div:nth-child(20) > .css-b62m3t-container > .css-1hpt32q-control > .css-1d8n9bt > .css-ackcql').click();
    await page.getByText('Daisy Stone (ACMPE, AONL)', { exact: true }).click();
    console.log('✅ Provider: Daisy Stone selected');

    console.log('');

    // ===== STEP 6: PREGNANCY DATING =====
    console.log('📍 STEP 6: Pregnancy Dating');
    console.log('-----------------------------------');

    // Estimated Due Date option
    await page.getByRole('radio', { name: 'Estimated Due Date' }).check();
    console.log('✅ Selected Estimated Due Date');

    // EDD Date picker
    await page.locator('.react-datepicker-wrapper.datePicker > .react-datepicker__input-container > div').click();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Choose Thursday, January 29th,' }).click();
    console.log('✅ EDD: January 29 selected');

    console.log('');

    // ===== STEP 7: LABOR HISTORY =====
    console.log('📍 STEP 7: Labor History');
    console.log('-----------------------------------');

    // Trial of Labor - No
    await page.getByRole('radio', { name: 'No' }).check();
    console.log('✅ Trial of Labor: No selected');

    console.log('');

    // ===== STEP 8: SUBMIT FORM =====
    console.log('📍 STEP 8: Submit Form');
    console.log('-----------------------------------');

    // Click Add button
    await page.getByRole('button', { name: 'Add' }).click();
    console.log('✅ Clicked Add button');

    await page.waitForTimeout(2000);
    console.log('✅ Form submitted');

    console.log('');

    // ===== STEP 9: HANDLE POST-SUBMISSION =====
    console.log('📍 STEP 9: Handle Post-Submission');
    console.log('-----------------------------------');

    // Click Done button to close popup
    await page.getByRole('button', { name: 'Done' }).click();
    console.log('✅ Closed delivery prediction popup');

    await page.waitForTimeout(2000);

    console.log('\n========================================');
    console.log('✅ ADD PATIENT FLOW COMPLETED SUCCESSFULLY');
    console.log('========================================\n');

  } catch (error) {
    console.error('\n❌ TEST FAILED:', error);
    throw error;
  }
});
