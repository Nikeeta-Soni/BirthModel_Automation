import { test } from '@playwright/test';

test('Debug Dashboard Page', async ({ page }) => {
  page.setDefaultTimeout(120000);
  
  console.log('\n=== DEBUG: CHECKING DASHBOARD PAGE ===\n');
  
  // Login first
  await page.goto('https://physician.stage.birthmodel.com/', { waitUntil: 'domcontentloaded' });
  console.log('✅ Navigated to physician portal');
  
  await page.waitForTimeout(2000);
  
  // Click Sign in with hospital credentials
  const hospitalButton = page.locator('text=Sign in with hospital credentials');
  await hospitalButton.click();
  console.log('✅ Clicked Sign in with hospital credentials');
  
  // Fill email
  await page.getByRole('textbox', { name: 'Enter your email or phone' }).fill('daisy1010@testdirectory007.onmicrosoft.com');
  console.log('✅ Filled email');
  
  // Click Next
  await page.getByRole('button', { name: 'Next' }).click();
  console.log('✅ Clicked Next');
  
  // Fill password
  await page.waitForTimeout(2000);
  await page.locator('#i0118').fill('Azure@123');
  console.log('✅ Filled password');
  
  // Click Sign in
  await page.getByRole('button', { name: 'Sign in' }).click();
  console.log('✅ Clicked Sign in');
  
  // Click Yes
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Yes' }).click();
  console.log('✅ Clicked Yes');
  
  // Wait for dashboard
  await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {
    console.log('ℹ️ Network idle timeout');
  });
  await page.waitForTimeout(3000);
  
  console.log(`\n📍 Current URL: ${page.url()}\n`);
  
  // Get page content
  const html = await page.content();
  console.log(`📍 Page HTML length: ${html.length} characters`);
  
  // Check for the button
  const button = page.getByRole('button', { name: 'ADD NEW PATIENT' });
  const count = await button.count();
  console.log(`\n🔍 Looking for 'ADD NEW PATIENT' button...`);
  console.log(`   Found: ${count} button(s)`);
  
  // Try to find any button
  const allButtons = await page.locator('button').count();
  console.log(`   Total buttons on page: ${allButtons}`);
  
  // List all button texts
  const buttonTexts = await page.locator('button').allTextContents();
  console.log(`\n   All button texts on page:`);
  buttonTexts.forEach((text, i) => {
    console.log(`     ${i+1}. "${text.trim().substring(0, 50)}"`);
  });
  
  // Try alternative selectors
  const textButton = page.locator('text=ADD NEW PATIENT');
  const textCount = await textButton.count();
  console.log(`\n🔍 Looking via text selector: ${textCount} element(s)`);
  
  // Check for text variations
  const addNewText = page.locator('text=Add New Patient');
  const addNewCount = await addNewText.count();
  console.log(`🔍 Looking for 'Add New Patient' (capitalized): ${addNewCount} element(s)`);
  
  // Check page text
  const pageText = await page.textContent('body');
  if (pageText && pageText.includes('ADD NEW PATIENT')) {
    console.log('\n✅ "ADD NEW PATIENT" text found on page');
  } else if (pageText && pageText.includes('Add New Patient')) {
    console.log('\n✅ "Add New Patient" text found on page');
  } else {
    console.log('\n⚠️ "ADD NEW PATIENT" text NOT found on page');
  }
  
  console.log('\n=== END DEBUG ===\n');
});
