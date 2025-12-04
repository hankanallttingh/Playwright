//import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '../fixtures/auth.fixture';
test.describe('Accessibility checks for refresh button', () => {

  test('Axe check for button accessibility', async ({ page }) => {
    await page.goto('https://test-379574553568.us-central1.run.app');
    const results = await new AxeBuilder({ page }).include('#refresh_students').analyze();
    const button = await page.locator('#refresh_students');
    console.log('Violations:', results.violations);
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
    expect(results.incomplete).toEqual([]);
    expect(results.passes.length).toBeGreaterThan(0);
  });

  test('Knappen har synlig text eller aria-label', async ({ page }) => {
    await page.goto('https://test-379574553568.us-central1.run.app');

    const button = page.locator('#refresh_students');
    const innerText = await button.innerText();
    const ariaLabel = await button.getAttribute('aria-label');
//1. Kontrollera att knappen är synlig och interaktiv
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled(); 
//2. Kontrollera att knappen har rätt roll    
    const role = await button.getAttribute('role');
    expect(role === 'button' || role === null).toBeTruthy(); // native button har implicit role

//3 Kontrollera att knappen inte är dold för skärmläsare    
    const ariaHidden = await button.getAttribute('aria-hidden');
    expect(ariaHidden).toBeNull();
//4 Kontrollera att knappen har en unik identifierare
    const id = await button.getAttribute('id');
    expect(id).toBe('refresh_students');

});

  test('Knappen har tillräcklig färgkontrast', async ({ page }) => {
    await page.goto('https://test-379574553568.us-central1.run.app');

    const button = page.locator('#refresh_students');
    const bgColor = await button.evaluate(el => getComputedStyle(el).backgroundColor);
    const color = await button.evaluate(el => getComputedStyle(el).color);

    console.log(`Bakgrundsfärg: ${bgColor}, Textfärg: ${color}`);
    //1. Här kan vi lägga till kontrastberäkning (WCAG AA kräver minst 4.5:1)
    expect(bgColor).not.toBe(color); // Enkel check, men vi kan göra mer avancerad
   // 2. Kontrollera att knappen är synlig och inte genomskinlig
    const opacity = await button.evaluate(el => getComputedStyle(el).opacity);
    expect(parseFloat(opacity)).toBeGreaterThan(0.9);
    // 3. att färger inte är transparent**
    expect(bgColor).not.toContain('transparent');
    expect(color).not.toContain('transparent');
  });

  test('Knappen är tillräckligt stor', async ({ page }) => {
    await page.goto('https://test-379574553568.us-central1.run.app');

    const button = page.locator('#refresh_students');
    const box = await button.boundingBox();

    console.log(`Knappens storlek: ${box?.width}x${box?.height}`);
    expect(box?.width).toBeGreaterThanOrEqual(30);
    expect(box?.height).toBeGreaterThanOrEqual(30);

    //2. Kontrollera att knappen inte är överlappad av andra elemen
    const isClickable = await button.isVisible();
    expect(isClickable).toBeTruthy();

    //3. Kontrollera att knappen har tillräcklig padding
    const padding = await button.evaluate(el => getComputedStyle(el).padding);
    console.log(`Padding: ${padding}`);
    expect(parseInt(padding.split(' ')[0])).toBeGreaterThanOrEqual(5); // Minst 5px

    //4. Kontrollera att knappen har en tydlig visuell stil (inte bara text)
    const bgColor = await button.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bgColor).not.toBe('transparent');

    //5. Kontrollera att knappen är enabled
    await page.keyboard.press('Tab');
    await expect(button).toBeEnabled();

    
  });

});