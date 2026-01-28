import { test } from '@playwright/test';

test('Debug Wait for Elements', async ({ page }) => {
  page.setDefaultTimeout(120000);
  
  console.log('\n=== DEBUG: WAIT FOR PATIENT ELEMENTS ===\n');
  
  // Login first
  await page.goto('https://physician.stage.birthmodel.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  
  // Click Sign in with hospital credentials
  const hospitalButton = page.locator('text=Sign in with hospital credentials');
  await hospitalButton.click();
  
  // Fill email
  await page.getByRole('textbox', { name: 'Enter your email or phone' }).fill('daisy1010@testdirectory007.onmicrosoft.com');
  
  // Click Next
  await page.getByRole('button', { name: 'Next' }).click();
  
  // Fill password
  await page.waitForTimeout(2000);
  await page.locator('#i0118').fill('Azure@123');
  
  // Click Sign in
  await page.getByRole('button', { name: 'Sign in' }).click();
  
  // Click Yes
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Yes' }).click();
  
  // Wait for dashboard
  await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(3000);
  
  console.log(`📍 Current URL: ${page.url()}\n`);
  
  // Try waiting for specific text to appear
  console.log('Waiting for "Active Patients" text...');
  try {
    await page.locator('text=Active Patients').waitFor({ timeout: 10000 });
    console.log('✅ "Active Patients" text found!');
    
    // Once found, check for buttons again
    const buttons = await page.locator('button').count();
    console.log(`Buttons on page after Active Patients: ${buttons}`);
    
    if (buttons > 0) {
      const buttonTexts = await page.locator('button').allTextContents();
      console.log(`Button texts: ${buttonTexts.join(', ')}`);
    }
  } catch (e) {
    console.log('⚠️ "Active Patients" text NOT found');
  }
  
  // Try alternative: look for any text mentioning "add"
  console.log('\nWaiting for "Add" text (any case)...');
  try {
    await page.locator('text=/add|ADD|Add/i').first().waitFor({ timeout: 5000 });
    console.log('✅ "Add" text found!');
  } catch (e) {
    console.log('⚠️ "Add" text NOT found');
  }
  
  // Wait longer and check again
  console.log('\nWaiting additional 5 seconds...');
  await page.waitForTimeout(5000);
  
  const finalButtons = await page.locator('button').count();
  console.log(`Final button count: ${finalButtons}`);
  
  if (finalButtons > 0) {
    const finalTexts = await page.locator('button').allTextContents();
    console.log(`Final button texts: ${finalTexts.map(t => t.trim()).join(', ')}`);
  }
  
  console.log('\n=== END DEBUG ===\n');
});
