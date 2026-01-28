import { test } from '@playwright/test';

test('Debug Active Patients Section', async ({ page }) => {
  page.setDefaultTimeout(120000);
  
  console.log('\n=== DEBUG: ACTIVE PATIENTS SECTION ===\n');
  
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
  
  // Find the Active Patients section
  const activePatientsLocator = page.locator('text=Active Patients');
  const activePatientsCount = await activePatientsLocator.count();
  console.log(`Active Patients text elements found: ${activePatientsCount}`);
  
  if (activePatientsCount > 0) {
    // Get the parent container
    const parent = activePatientsLocator.first().locator('..');
    console.log(`Found Active Patients, examining parent...`);
    
    // Check what's around it
    const siblingsCount = await parent.locator('xpath=following-sibling::*').count();
    console.log(`Siblings after parent: ${siblingsCount}`);
    
    // Look for any clickable elements in the vicinity
    const nearbyClickable = await activePatientsLocator.locator('ancestor::*').first().locator('button, div[role="button"], a').count();
    console.log(`Clickable elements in Active Patients ancestor: ${nearbyClickable}`);
    
    // Check if Active Patients is a clickable element itself
    const selfRole = await activePatientsLocator.first().getAttribute('role');
    console.log(`Active Patients element role: ${selfRole}`);
    
    // Try clicking on Active Patients
    try {
      await activePatientsLocator.first().click();
      console.log('\n✅ Successfully clicked Active Patients text');
      
      await page.waitForTimeout(2000);
      
      // Check for buttons after clicking
      const buttonsAfter = await page.locator('button').count();
      console.log(`Buttons after clicking Active Patients: ${buttonsAfter}`);
      
      if (buttonsAfter > 0) {
        const buttonTexts = await page.locator('button').allTextContents();
        console.log(`Button texts: ${buttonTexts.map(t => t.trim()).join(', ')}`);
      }
    } catch (e) {
      console.log(`⚠️ Could not click Active Patients: ${e.message}`);
    }
  }
  
  // Try to find the page source HTML for "ADD NEW PATIENT"
  const pageSource = await page.content();
  if (pageSource.includes('ADD NEW PATIENT')) {
    console.log('\n✅ "ADD NEW PATIENT" found in page source');
  } else if (pageSource.includes('Add New Patient')) {
    console.log('\n✅ "Add New Patient" found in page source');
  } else {
    console.log('\n⚠️ "ADD NEW PATIENT" or "Add New Patient" NOT in page source');
    
    // Search for any "new" text
    if (pageSource.includes('new patient')) {
      console.log('  But "new patient" text was found');
    }
    if (pageSource.includes('New Patient')) {
      console.log('  But "New Patient" text was found');
    }
  }
  
  console.log('\n=== END DEBUG ===\n');
});
