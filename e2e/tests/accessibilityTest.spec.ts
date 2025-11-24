import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';


test.describe('Accessibility checks for refresh button', () => {

  test('Axe check for button accessibility', async ({ page }) => {
    await page.goto('https://test-379574553568.us-central1.run.app');
    const results = await new AxeBuilder({ page }).include('#refresh_students').analyze();
    console.log('Violations:', results.violations);
    expect(results.violations).toEqual([]); // Passar efter fix
  });

  test('Knappen har synlig text eller aria-label', async ({ page }) => {
    await page.goto('https://test-379574553568.us-central1.run.app');

    const button = page.locator('#refresh_students');
    const innerText = await button.innerText();
    const ariaLabel = await button.getAttribute('aria-label');

    expect(innerText.trim().length > 0 || (ariaLabel && ariaLabel.trim().length > 0)).toBeTruthy();
  });

  test('Knappen har tillräcklig färgkontrast', async ({ page }) => {
    await page.goto('https://test-379574553568.us-central1.run.app');

    const button = page.locator('#refresh_students');
    const bgColor = await button.evaluate(el => getComputedStyle(el).backgroundColor);
    const color = await button.evaluate(el => getComputedStyle(el).color);

    console.log(`Bakgrundsfärg: ${bgColor}, Textfärg: ${color}`);
    // Här kan vi lägga till kontrastberäkning (WCAG AA kräver minst 4.5:1)
    expect(bgColor).not.toBe(color); // Enkel check, men vi kan göra mer avancerad
  });

  test('Knappen är tillräckligt stor', async ({ page }) => {
    await page.goto('https://test-379574553568.us-central1.run.app');

    const button = page.locator('#refresh_students');
    const box = await button.boundingBox();

    console.log(`Knappens storlek: ${box?.width}x${box?.height}`);
    expect(box?.width).toBeGreaterThanOrEqual(30);
    expect(box?.height).toBeGreaterThanOrEqual(30);
  });

});