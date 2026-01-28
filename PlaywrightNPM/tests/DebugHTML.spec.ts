import { test } from '@playwright/test';

test('Debug Dashboard HTML', async ({ page }) => {
  page.setDefaultTimeout(120000);
  
  console.log('\n=== DEBUG: DASHBOARD HTML ANALYSIS ===\n');
  
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
  await page.waitForTimeout(5000);
  
  console.log(`📍 Current URL: ${page.url()}\n`);
  
  // Check various elements
  const html = await page.content();
  
  // Check for React divs
  const reactRoots = await page.locator('#root, [data-testid="root"], .react-app').count();
  console.log(`React roots found: ${reactRoots}`);
  
  // Check for common component structures
  const mobileView = await page.locator('[class*="Container"], [class*="Layout"]').count();
  console.log(`Container/Layout elements: ${mobileView}`);
  
  // Check all clickable elements
  const allClickable = await page.locator('a, button, div[role="button"], div[role="link"]').count();
  console.log(`All clickable elements: ${allClickable}`);
  
  // Get page structure
  console.log(`\nSearching for patient-related elements...`);
  
  // Look for any "patient" text
  const hasPatientText = html.includes('patient') || html.includes('Patient');
  console.log(`Page contains "patient" text: ${hasPatientText}`);
  
  // Look for "add" text
  const hasAddText = html.includes('"add"') || html.includes('Add') || html.includes('ADD');
  console.log(`Page contains "add" text: ${hasAddText}`);
  
  // Search for specific navigation elements
  const navElements = await page.locator('nav, [role="navigation"]').count();
  console.log(`Navigation elements: ${navElements}`);
  
  // Get page title
  const title = await page.title();
  console.log(`\nPage title: "${title}"`);
  
  // Check for specific classNames or IDs that might contain buttons
  const divs = await page.locator('div[role="button"]').count();
  console.log(`DIVs with role="button": ${divs}`);
  
  if (divs > 0) {
    const divTexts = await page.locator('div[role="button"]').allTextContents();
    console.log(`  Div button texts: ${divTexts.slice(0, 5).join(', ')}`);
  }
  
  // Look for icons or SVGs that might be buttons
  const svgs = await page.locator('svg').count();
  console.log(`\nSVG elements: ${svgs}`);
  
  // Check for specific page sections
  const headers = await page.locator('h1, h2, h3').count();
  console.log(`Headers (h1-h3): ${headers}`);
  
  if (headers > 0) {
    const headerTexts = await page.locator('h1, h2, h3').allTextContents();
    console.log(`  Header texts: ${headerTexts.slice(0, 3).join(', ')}`);
  }
  
  console.log('\n=== END DEBUG ===\n');
});
