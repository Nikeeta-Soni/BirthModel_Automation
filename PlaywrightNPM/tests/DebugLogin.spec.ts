import { test } from '@playwright/test';

test('Debug Login Page', async ({ page }) => {
  page.setDefaultTimeout(30000);
  
  console.log('\n=== DEBUG: CHECKING LOGIN PAGE ===\n');
  
  // Navigate to the page
  const response = await page.goto('https://physician.stage.birthmodel.com/', { waitUntil: 'domcontentloaded' });
  console.log('✅ Navigated to URL');
  console.log(`📍 Status: ${response?.status()}`);
  console.log(`📍 URL: ${page.url()}`);
  
  // Wait a bit more
  await page.waitForTimeout(3000);
  
  // Get page content
  const html = await page.content();
  console.log(`📍 Page HTML length: ${html.length} characters`);
  
  // Check for specific text
  const pageText = await page.textContent('body');
  if (pageText) {
    const preview = pageText.substring(0, 500).replace(/\n/g, ' ').replace(/\s+/g, ' ');
    console.log(`📍 Page content preview: ${preview}`);
  }
  
  // Check for the button
  const button = page.getByRole('button', { name: 'Login with Hospital' });
  const count = await button.count();
  console.log(`\n🔍 Looking for 'Login with Hospital' button...`);
  console.log(`   Found: ${count} button(s)`);
  
  // Try to find any button
  const allButtons = await page.locator('button').count();
  console.log(`   Total buttons on page: ${allButtons}`);
  
  // List all button texts
  const buttonTexts = await page.locator('button').allTextContents();
  console.log(`   Button texts: ${buttonTexts.join(', ')}`);
  
  // Try alternative selectors
  const altButton = page.locator('text=Login with Hospital');
  const altCount = await altButton.count();
  console.log(`\n🔍 Looking via text selector: ${altCount} element(s)`);
  
  // Check for specific elements
  const inputs = await page.locator('input').count();
  console.log(`\n📋 Inputs on page: ${inputs}`);
  
  const forms = await page.locator('form').count();
  console.log(`📋 Forms on page: ${forms}`);
  
  console.log('\n=== END DEBUG ===\n');
});
