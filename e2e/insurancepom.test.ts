import { test, expect } from '@playwright/test';
import { InsurancePage } from './pages/insurancePage';

test('Insurance form POM test', async ({ page }) => {
  const insurancePage = new InsurancePage(page);

  await insurancePage.goto();
  await insurancePage.fillForm('Harkanwal', 'Singh', 'GoogleVägen 27', '25', '2', '3');
  await insurancePage.selectCoverage('100%');
  await insurancePage.calculatePrice();

  // Assertions
  await expect(page.getByText(/Monthly cost:/)).toBeVisible();
  await expect(page.getByText(/Yearly cost:/)).toBeVisible();

  const monthlyCostText = await page.getByText(/Monthly cost:/).textContent();
  expect(monthlyCostText).not.toContain('110');

  const yearlyCostText = await page.getByText(/Yearly cost:/).textContent();
  expect(yearlyCostText).not.toContain('1320');
});