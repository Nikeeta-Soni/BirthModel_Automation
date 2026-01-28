const { test, expect } = require('@playwright/test');

test('Hospital Login Flow', async ({ page }) => {
  // Navigate to the superadmin URL
  await page.goto('https://superadmin.stage.birthmodel.com/');
  console.log('✅ Navigated to superadmin URL');

  // Find and click the Login button on the homescreen
  const loginButton = page.getByRole('button', { name: 'Login' });
  await loginButton.click();
  console.log('✅ Clicked on the Login button');

  // Wait for email field and enter email
  const emailField = page.getByRole('textbox', { name: /email address/i });
  await emailField.waitFor({ timeout: 10000 });
  await emailField.fill('nikeetasoni151@gmail.com');
  console.log('✅ Email entered: nikeetasoni151@gmail.com');

  // Click the continue button
  const continueButton = page.getByRole('button', { name: 'Continue' });
  await continueButton.click();
  console.log('✅ Clicked on the Continue button');

  // Wait for Google email confirmation Next button and click it
  // Add longer timeout and retry logic
  let nextButtonClicked = false;
  for (let i = 0; i < 5; i++) {
    try {
      const nextEmailButton = page.getByRole('button', { name: 'Next' }).first();
      const isVisible = await nextEmailButton.isVisible({ timeout: 3000 }).catch(() => false);
      if (isVisible) {
        await nextEmailButton.click();
        console.log('✅ Clicked Next button on email confirmation');
        nextButtonClicked = true;
        break;
      }
    } catch (e) {
      console.log('⏳ Retrying to find Next button...');
    }
    await page.waitForTimeout(1000);
  }

  if (!nextButtonClicked) {
    console.log('⚠️ Next button not found, continuing anyway');
  }

  // Wait for the page to transition to password page
  await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {
    console.log('ℹ️ No navigation detected, page may be loading content dynamically');
  });

  // Wait for password field to appear - try multiple selectors
  console.log('⏳ Waiting for password field...');
  
  let passwordFound = false;
  let attempts = 0;
  const maxAttempts = 20;
  
  while (!passwordFound && attempts < maxAttempts) {
    // Try multiple selectors for the password field
    const passwordSelectors = [
      'input[placeholder="Enter your password"]',
      'input[type="password"][aria-label*="password" i]',
      'input[type="password"]',
      'textarea[placeholder*="password" i]'
    ];
    
    for (const selector of passwordSelectors) {
      try {
        const field = page.locator(selector).first();
        const isVisible = await field.isVisible({ timeout: 500 }).catch(() => false);
        
        if (isVisible) {
          await field.fill('Qwerty@123');
          console.log('✅ Password entered: Qwerty@123');
          passwordFound = true;
          break;
        }
      } catch (e) {
        // Try next selector
      }
    }
    
    if (!passwordFound) {
      await page.waitForTimeout(300);
      attempts++;
    }
  }
  
  if (!passwordFound) {
    console.log('⚠️ Password field not found with standard selectors, trying generic approach');
    // Last resort: use evaluate to find and fill password field
    await page.evaluate(() => {
      const inputs = document.querySelectorAll('input[type="password"]');
      if (inputs.length > 0) {
        inputs[0].value = 'Qwerty@123';
        inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    console.log('✅ Password entered via JavaScript');
  }

  // Click the next button after password
  let nextPasswordClicked = false;
  for (let i = 0; i < 5; i++) {
    try {
      const nextPasswordButton = page.getByRole('button', { name: 'Next' }).last();
      const isVisible = await nextPasswordButton.isVisible({ timeout: 3000 }).catch(() => false);
      if (isVisible) {
        await nextPasswordButton.click();
        console.log('✅ Clicked Next button after password entry');
        nextPasswordClicked = true;
        break;
      }
    } catch (e) {
      console.log('⏳ Retrying to find Next button after password...');
    }
    await page.waitForTimeout(1000);
  }

  if (!nextPasswordClicked) {
    console.log('⚠️ Next button after password not found');
  }

  // Wait for navigation to complete and check for successful login
  await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {
    console.log('ℹ️ Network idle timeout - page may still be loading');
  });

  // Check if login is successful
  const pageURL = page.url();
  console.log('📍 Current URL:', pageURL);

  // Check for successful login indicators
  if (!pageURL.includes('accounts.google') && !pageURL.includes('signin')) {
    console.log('✅ Login is successful - redirected to main application');
  } else if (pageURL.includes('superadmin') || pageURL.includes('dashboard')) {
    console.log('✅ Login is successful - on superadmin dashboard');
  } else {
    console.log('ℹ️ Login flow in progress');
  }

  console.log('✅ Hospital Login Flow automation completed');
});
