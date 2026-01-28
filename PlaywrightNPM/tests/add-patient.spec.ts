import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://bm-physician-dev-qa-stag.us.auth0.com/login?state=hKFo2SBQVElSRXhLckNXMmNqVWxsUVlwYmx3eDN0RFFNOHptWqFupWxvZ2luo3RpZNkgWm1FN240WVVLNjVjVklTVG5WaHhkNjVBTzYydHZlOHqjY2lk2SBzNGFmZlFOajgyOEpvUzF6bGF5RGVyT09QU3VKSkg0Mw&client=s4affQNj828JoS1zlayDerOOPSuJJH43&protocol=oauth2&prompt=login&scope=openid%20read%3Acurrent_user%20update%3Acurrent_user_metadata%20email%20profile%20read%3Auser_idp_tokens%20offline_access&redirect_uri=https%3A%2F%2Fphysician.stage.birthmodel.com%2Flogin-redirect&audience=https%3A%2F%2Fbm-physician-dev-qa-stag.us.auth0.com%2Fapi%2Fv2%2F&response_type=code&response_mode=query&nonce=fkNpdzhBcXk3UzgxTERIcXZLZ2pCU1lGbm5Zc0dkeHBuR1JSRkNsTEg4SA%3D%3D&code_challenge=ePWR0wSBDqeLM_c2IcSLZlU25zbGcredg4iyQPNv754&code_challenge_method=S256&auth0Client=eyJuYW1lIjoiYXV0aDAtcmVhY3QiLCJ2ZXJzaW9uIjoiMi4xLjAifQ%3D%3D');
  await page.getByRole('button', { name: 'Login with Hospital' }).click();
  await page.getByRole('textbox', { name: 'Enter your email or phone' }).fill('daisy1010@testdirectory007.onmicrosoft.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('#i0118').fill('Azure@123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  
  // Wait for page to load after Yes click
  await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {
    console.log('ℹ️ Page load timeout after Yes button');
  });
  
  await page.waitForTimeout(3000);
  
  // The dashboard should be loaded. If not on dashboard, wait a bit more
  let currentURL = page.url();
  console.log('Current URL after login:', currentURL);
  
  if (!currentURL.includes('dashboard')) {
    console.log('ℹ️ Not on dashboard, navigating there');
    await page.goto('https://physician.stage.birthmodel.com/dashboard', { waitUntil: 'networkidle' });
  }
  
  // Wait for the dashboard content to fully load with networkidle
  console.log('⏳ Waiting for dashboard to render with networkidle...');
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {
    console.log('ℹ️ Dashboard load timeout');
  });
  
  // Extra wait for React rendering
  await page.waitForTimeout(3000);
  
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
  await page.getByRole('textbox', { name: 'Enter first name' }).click();
  await page.getByRole('textbox', { name: 'Enter first name' }).fill('Avni');
  await page.getByRole('textbox', { name: 'Enter last name' }).click();
  await page.getByRole('textbox', { name: 'Enter last name' }).fill('smith');
  await page.locator('input[name="dateOfBirth"]').click();
  await page.getByRole('button', { name: 'Choose Wednesday, December 31st,' }).click();
  await page.getByRole('textbox', { name: 'Enter MRN' }).click();
  await page.getByRole('textbox', { name: 'Enter MRN' }).fill('874653845');
  await page.locator('input[name="firstExamination"]').click();
  await page.getByRole('button', { name: 'Choose Thursday, January 22nd,' }).click();
  await page.getByRole('textbox', { name: 'Select Time' }).click();
  await page.getByRole('button', { name: '06' }).first().click();
  await page.getByRole('button', { name: '26' }).click();
  await page.getByRole('button', { name: 'AM' }).click();
  await page.getByText('OK').click();
  await page.locator('.MuiSlider-rail').first().click();
  await page.locator('.MuiSlider-rail').first().click();
  await page.locator('#react-select-15-placeholder').click();
  await page.getByText('-50%').click();
  await page.locator('#react-select-16-placeholder').click();
  await page.locator('#react-select-16-option-1').click();
  await page.locator('#react-select-17-placeholder').click();
  await page.getByText('Posterior').click();
  await page.getByPlaceholder('Enter value (ex: 35.11)').click();
  await page.getByPlaceholder('Enter value (ex: 35.11)').fill('34');
  await page.locator('#react-select-18-placeholder').click();
  await page.getByText('Black or African American').click();
  await page.locator('.css-ackcql').click();
  await page.locator('#react-select-20-option-0').click();
  await page.locator('div:nth-child(20) > .css-b62m3t-container > .css-1hpt32q-control > .css-1d8n9bt > .css-ackcql').click();
  await page.getByText('Daisy Stone (ACMPE, AONL)', { exact: true }).click();
  await page.getByRole('radio', { name: 'Estimated Due Date' }).check();
  await page.locator('.react-datepicker-wrapper.datePicker > .react-datepicker__input-container > div').click();
  await page.getByRole('button', { name: 'Choose Thursday, January 29th,' }).click();
  await page.getByRole('radio', { name: 'No' }).check();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button', { name: 'Done' }).click();
});