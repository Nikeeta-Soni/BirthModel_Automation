import { test } from '@playwright/test';

test('Debug Active Patients Simple', async ({ page }) => {
  page.setDefaultTimeout(120000);
  
  console.log('\n=== DEBUG: ACTIVE PATIENTS SIMPLE ===\n');
  
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
  
  // Try clicking on Active Patients
  const activePatientsLocator = page.locator('text=Active Patients');
  const activePatientsCount = await activePatientsLocator.count();
  console.log(`Active Patients text elements found: ${activePatientsCount}`);
  
  if (activePatientsCount > 0) {
    try {
      console.log('Clicking on Active Patients text...');
      await activePatientsLocator.first().click();
      console.log('✅ Clicked Active Patients');
      
      await page.waitForTimeout(2000);
    } catch (e) {
      console.log(`⚠️ Error clicking: ${e.message}`);
    }
  }
  
  // Check page source for button text
  const pageSource = await page.content();
  
  // Search for variations
  const hasADD_NEW_PATIENT = pageSource.includes('ADD NEW PATIENT');
  const hasAddNewPatient = pageSource.includes('Add New Patient');
  const hasadd_new_patient = pageSource.includes('add_new_patient');
  const hasAddPatient = pageSource.includes('Add Patient');
  const hasNewPatient = pageSource.toLowerCase().includes('new patient');
  
  console.log(`\nSearching page source for patient-related text:`);
  console.log(`  "ADD NEW PATIENT": ${hasADD_NEW_PATIENT}`);
  console.log(`  "Add New Patient": ${hasAddNewPatient}`);
  console.log(`  "add_new_patient": ${hasadd_new_patient}`);
  console.log(`  "Add Patient": ${hasAddPatient}`);
  console.log(`  "new patient" (any case): ${hasNewPatient}`);
  
  // Get visible text
  const allText = await page.locator('body').textContent();
  if (allText) {
    console.log(`\nPage visible text length: ${allText.length} characters`);
    if (allText.toLowerCase().includes('add patient')) {
      console.log(`✅ "Add patient" text found in visible content`);
    }
  }
  
  // Try to find any href or onclick containing "patient"
  const patientLinks = await page.locator('a[href*="patient"], button[onclick*="patient"], div[onclick*="patient"]').count();
  console.log(`\nElements with "patient" in href/onclick: ${patientLinks}`);
  
  console.log('\n=== END DEBUG ===\n');
});
