import { test } from '@playwright/test';

test('Find ADD NEW PATIENT Button', async ({ page }) => {
  page.setDefaultTimeout(120000);
  
  console.log('\n=== FINDING ADD NEW PATIENT BUTTON ===\n');
  
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
  
  // Try clicking on Active Patients first
  const activePatientsLocator = page.locator('text=Active Patients');
  const activePatientsCount = await activePatientsLocator.count();
  
  if (activePatientsCount > 0) {
    console.log('Clicking on Active Patients...');
    await activePatientsLocator.first().click();
    console.log('✅ Clicked Active Patients\n');
    await page.waitForTimeout(2000);
  }
  
  // Use JavaScript to find all elements containing "ADD NEW PATIENT"
  const result = await page.evaluate(() => {
    const elements: any[] = [];
    const allElements = document.querySelectorAll('*');
    
    allElements.forEach((el: any) => {
      const text = el.textContent;
      if (text && text.includes('ADD NEW PATIENT')) {
        elements.push({
          tag: el.tagName,
          class: el.className,
          id: el.id,
          text: el.textContent.substring(0, 100),
          visible: el.offsetHeight > 0 && el.offsetWidth > 0
        });
      }
    });
    return elements;
  });
  
  console.log(`Found ${result.length} elements with "ADD NEW PATIENT" text:\n`);
  result.forEach((el, i) => {
    console.log(`  Element ${i+1}:`);
    console.log(`    Tag: ${el.tag}`);
    console.log(`    Class: ${el.class}`);
    console.log(`    Visible: ${el.visible}`);
  });
  
  // Try to click the first visible one
  if (result.length > 0 && result[0].visible) {
    console.log('\n✅ Found a visible "ADD NEW PATIENT" element!');
    
    // Try to click it using XPath or CSS
    try {
      // Try to find and click it
      const clickResult = await page.evaluate(() => {
        const allElements = document.querySelectorAll('*');
        let found = false;
        
        allElements.forEach((el: any) => {
          const text = el.textContent;
          if (text && text.includes('ADD NEW PATIENT') && el.offsetHeight > 0) {
            el.click();
            found = true;
          }
        });
        return found;
      });
      
      if (clickResult) {
        console.log('✅ Successfully clicked ADD NEW PATIENT via JavaScript');
        await page.waitForTimeout(2000);
      }
    } catch (e) {
      console.log(`⚠️ Error clicking: ${e.message}`);
    }
  } else {
    console.log('\n⚠️ "ADD NEW PATIENT" element not visible or not found');
  }
  
  console.log('\n=== END ===\n');
});
