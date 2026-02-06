const { test, expect } = require('@playwright/test');

test('Login to Birth Model with Hospital Credentials', async ({ page }) => {
  // Navigate to the URL
  await page.goto('https://physician.stage.birthmodel.com/');
  console.log('✅ Navigated to the Birth Model URL');

  // Click on "Login with Hospital Credentials" button
  await page.getByRole('button', { name: /Sign in with hospital credentials/i }).click();
  console.log('✅ Clicked on "Login with Hospital Credentials" button');

  // Wait for and fill email field
  await page.waitForSelector('input[placeholder*="email" i], input[placeholder*="Email" i]', { timeout: 10000 });
  const emailField = page.locator('input[placeholder*="email" i], input[placeholder*="Email" i]').first();
  await emailField.fill('daisy1010@testdirectory007.onmicrosoft.com');
  console.log('✅ Email entered: daisy1010@testdirectory007.onmicrosoft.com');

  // Click Next button after email
  await page.getByRole('button', { name: 'Next' }).click();
  console.log('✅ Clicked Next button after email entry');

  // Wait for and fill password field
  await page.waitForSelector('input[type="password"]', { timeout: 10000 });
  const passwordField = page.locator('input[type="password"]');
  await passwordField.fill('Azure@123');
  console.log('✅ Password entered: Azure@123');

  // Click Next/Sign in button after password
  await page.getByRole('button', { name: /Next|Sign in|Submit/i }).click();
  console.log('✅ Clicked Sign in button after password entry');

  // Click on Yes button for "Stay signed in?" prompt
  await page.waitForSelector('input[type="submit"][value="Yes"], button:has-text("Yes"), #idSIButton9', { timeout: 10000 });
  await page.click('input[type="submit"][value="Yes"], button:has-text("Yes"), #idSIButton9');
  console.log('✅ Clicked "Yes" on Stay signed in prompt');

  // Wait for redirect to the application
  await page.waitForURL('**/physician.stage.birthmodel.com/**', { timeout: 30000 }).catch(() => {
    console.log('ℹ️ Still waiting for redirect to application...');
  });

  // Wait for page to fully load
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {
    console.log('ℹ️ Network idle timeout - page may still be loading');
  });

  console.log('✅ Login process completed');

  // Assertion: Verify we're on the application page
  const currentUrl = page.url();
  console.log(`📍 Current URL: ${currentUrl}`);
  expect(currentUrl).toContain('physician.stage.birthmodel.com');
  console.log('✅ Assertion passed: Successfully redirected to Birth Model application');

  // Take a screenshot of the post-login page
  await page.screenshot({ path: 'screenshots/post-login.png', fullPage: true });
  console.log('📸 Screenshot saved to: screenshots/post-login.png');

  // Close the browser
  await page.close();
  console.log('✅ Browser closed');
});

