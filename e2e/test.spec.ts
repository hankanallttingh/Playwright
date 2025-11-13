import { test, expect } from '@playwright/test';

/*
test('Insurance form flow', async ({ page }) => {
  await page.goto('https://hoff.is/insurance/');

  const insuranceLink = page.getByRole('link', { name: 'Insurance App' });
  await expect(insuranceLink).toBeVisible();
  await expect(insuranceLink).toHaveText('Insurance App');
  await insuranceLink.click();

  await page.locator('#navbarNav').getByText('Price information').click();
  await page.getByRole('dialog', { name: 'Price information' }).press('Escape');

  await expect(page.getByRole('heading', { name: 'Insurance form' })).toBeVisible();
  await expect(page.getByText('See Price information above,')).toBeVisible();

  await page.getByRole('textbox', { name: 'First name' }).fill('Harkanwal');
  await page.getByRole('textbox', { name: 'Last' }).fill('Singh');
  await page.getByRole('textbox', { name: 'Address' }).fill('GoogleVägen 27');
  await page.getByRole('spinbutton', { name: 'Apartment size' }).fill('25');
  await page.getByRole('spinbutton', { name: 'Adults' }).fill('2');
  await page.getByRole('spinbutton', { name: 'Kids' }).fill('3');

  await page.getByRole('spinbutton', { name: 'Adults Percentage' })

  // Du kan lägga till fler steg här om du vill fortsätta testet
})


test('calculate price', async ({ page }) => {
  await page.goto('https://hoff.is/insurance/');

  const insuranceLink = page.getByRole('link', { name: 'Insurance App' });
  await expect(insuranceLink).toBeVisible();
  await expect(insuranceLink).toHaveText('Insurance App');
  await insuranceLink.click();

  await page.getByRole('textbox', { name: 'First name' }).fill('Harkanwal');
  await page.getByRole('textbox', { name: 'Last' }).fill('Singh');
  await page.getByRole('textbox', { name: 'Address' }).fill('GoogleVägen 27');
  await page.getByRole('spinbutton', { name: 'Apartment size' }).fill('25');
  await page.getByRole('spinbutton', { name: 'Adults' }).fill('2');
  await page.getByRole('spinbutton', { name: 'Kids' }).fill('3');


  const dropdown = page.getByRole('combobox', { name: 'Adults Percentage' });

  // Välj första alternativet
  await dropdown.selectOption('25%');
  await expect(dropdown).toContainText('25%');

  // Välj andra alternativet
  await dropdown.selectOption('50%');
  await expect(dropdown).toContainText('50%');

  // Välj tredje alternativet
  await dropdown.selectOption('75%');
  await expect(dropdown).toContainText('75%');
  await page.getByRole('button', { name: 'Calculate price' }).click();


})
*/