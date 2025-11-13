import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';

test('Login flow using POM', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  // Felaktiga credentials
 // await loginPage.login('wrongUser', 'wrongPass', 'Consumer');
  //await expect(page.getByText(/invalid username or password/i)).toBeVisible();

  // Korrekta credentials
  await loginPage.login('marcus', 'sup3rs3cr3t', 'Consumer');
  await expect(page).toHaveURL(/store2/); // Justera efter din riktiga URL

  
  // 1. Assert header och h3
  await expect(page.locator('h1')).toHaveText(/Store/i);

  
//  2. Klicka på dropdown och logga alla alternativ
  const dropdown = page.getByTestId('select-product');

 const options = await dropdown.locator('option').allTextContents();
  console.log('Dropdown options:', options);

 //  3. Välj första alternativet (value="1")
  await dropdown.selectOption('1');


//  Fortsätt med din befintliga flöde
  await page.getByRole('textbox', { name: 'Amount' }).fill('60');
  await page.getByTestId('add-to-cart-button').click();



//  Hämta och logga totals
const totalSum = await page.locator('#totalSum').textContent();
const totalVAT = await page.getByText('Total VAT:').textContent();
const grandTotal = await page.locator('#grandTotal').textContent();

console.log(`Total Sum: ${totalSum}`);
console.log(`Total VAT: ${totalVAT}`);
console.log(`Grand Total: ${grandTotal}`);


// Fortsätt med köpflödet
await page.getByRole('button', { name: 'Buy' }).click();
await page.getByRole('textbox', { name: 'Name:' }).fill('hankanallt');
await page.getByRole('textbox', { name: 'Address:' }).fill('google');
await page.getByRole('button', { name: 'Confirm Purchase' }).click();


//  Hämta och logga alla kvittoposter
const receiptItems = await page.locator('#receiptItems').allTextContents();
console.log('Receipt Items:', receiptItems);

// Du kan även asserta att listan innehåller "Apple"
expect(receiptItems.join(' ')).toContain('Apple');

// Stäng kvittot
await page.getByText('Close').click();

});