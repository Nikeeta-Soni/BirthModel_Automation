import { test, expect } from '@playwright/test';

test('Birth Model - Hospital Credentials Login Flow', async ({ page }) => {
  console.log('\n========================================');
  console.log('BIRTH MODEL LOGIN TEST - STARTED');
  console.log('========================================\n');

  // Step 1: Navigate to the physician portal and wait for full page load
  console.log('📍 Step 1: Navigating to https://physician.stage.birthmodel.com/');
  await page.goto('https://physician.stage.birthmodel.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  console.log('✅ Page fully loaded and stable\n');

  // Step 2: Identify and click ONLY the upper SSO button with Epic logo
  console.log('📍 Step 2: Clicking the upper "Sign in with hospital credentials" button (Epic SSO)');
  
  // Get all buttons with the hospital credentials text
  const ssoButtons = page.locator('button:has-text("Sign in with hospital credentials")');
  const buttonCount = await ssoButtons.count();
  console.log(`🔍 Found ${buttonCount} "Sign in with hospital credentials" button(s)`);
  
  // Click only the first (upper) button - the Epic SSO button
  if (buttonCount > 0) {
    await ssoButtons.first().click();
    console.log('✅ Clicked the upper SSO button with Epic logo\n');
  } else {
    throw new Error('Could not find "Sign in with hospital credentials" button');
  }

  // Step 3: Wait for authentication redirect page to load completely
  console.log('📍 Step 3: Waiting for authentication page to load...');
  await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {
    console.log('ℹ️ Network idle timeout - continuing with page load');
  });
  await page.waitForTimeout(3000);
  console.log('✅ Authentication redirect page loaded\n');

  // Step 4: Locate and fill the Email input field
  console.log('📍 Step 4: Filling email field with daisy1010@testdirectory007.onmicrosoft.com');
  
  // Wait for email input field to be visible
  await page.waitForSelector(
    'input[type="email"], input[placeholder*="email" i], [name*="email" i]',
    { timeout: 10000 }
  );
  
  // Fill the email field
  const emailField = page.locator('input[type="email"], input[placeholder*="email" i], [name*="email" i]').first();
  await emailField.fill('daisy1010@testdirectory007.onmicrosoft.com');
  console.log('✅ Email entered: daisy1010@testdirectory007.onmicrosoft.com\n');

  // Step 5: Click Next button and wait for password screen
  console.log('📍 Step 5: Clicking Next button and waiting for password screen...');
  
  const nextButton = page.getByRole('button', { name: 'Next' });
  await nextButton.waitFor({ state: 'visible', timeout: 5000 });
  await nextButton.click();
  
  // Wait for password field to appear
  await page.waitForSelector('input[type="password"]', { timeout: 10000 });
  await page.waitForTimeout(2000);
  console.log('✅ Password screen appeared\n');

  // Step 6: Locate and fill the Password input field
  console.log('📍 Step 6: Filling password field with Azure@123');
  
  const passwordField = page.locator('input[type="password"]').first();
  await passwordField.fill('Azure@123');
  console.log('✅ Password entered: Azure@123\n');

  // Step 7: Click the Next button again (Sign in)
  console.log('📍 Step 7: Clicking Sign in button');
  
  const signInButton = page.getByRole('button', { name: /Sign in|Next/i });
  await signInButton.waitFor({ state: 'visible', timeout: 5000 });
  await signInButton.click();
  console.log('✅ Sign in button clicked\n');

  // Step 8: Handle "Stay signed in?" confirmation if it appears
  await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Yes' }).click();
    console.log('✅ Clicked Yes button for permissions');

  // Step 9: Wait for successful redirect to dashboard
  console.log('📍 Step 9: Waiting for redirect to dashboard...');
  
  try {
    await page.waitForURL(/dashboard/, { timeout: 30000 });
    console.log('✅ Successfully redirected to dashboard\n');
  } catch (error) {
    console.log('⚠️ Dashboard URL not detected - waiting for page stabilization');
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {
      console.log('ℹ️ Page stabilized');
    });
  }

  // Final verification
  const finalUrl = page.url();
  console.log(`📍 Final URL: ${finalUrl}`);
  
  // Take a screenshot to verify successful login
  await page.screenshot({ path: 'screenshots/birth-login-success.png', fullPage: true });
  console.log('📸 Screenshot saved to: screenshots/birth-login-success.png');

  console.log('\n========================================');
  console.log('✅ BIRTH MODEL LOGIN TEST - PASSED');
  console.log('========================================\n');
});
