
import { test, expect } from '@playwright/test';

test.describe('Purchase flow', () => {

  // ✅ Scenario 1: Köp Apple och verifiera kvittot
  test('Buy Apple and verify receipt', async ({ page }) => {
    // 1. Gå till login-sidan
    await page.goto('https://hoff.is/login/');

    // 2. Fyll i login-information
    await page.getByRole('textbox', { name: 'Username' }).fill('marcus');
    await page.getByRole('textbox', { name: 'Password' }).fill('sup3rs3cr3t');
    await page.getByRole('combobox', { name: 'Select Role' }).selectOption('Consumer');

    // 3. Klicka på Login-knappen
    await page.getByRole('button', { name: 'Login' }).click();

    // 4. Verifiera att vi är på Store-sidan
    await expect(page).toHaveURL(/store2/);
    await expect(page.locator('h1')).toHaveText(/Store/i);

    // 5. Välj produkt Apple (value="1") från dropdown
    const dropdown = page.getByTestId('select-product');
    await dropdown.selectOption('1');

    // 6. Fyll i Amount (antal)
    await page.getByRole('textbox', { name: 'Amount' }).fill('60');

    // 7. Klicka på Add to Cart
    await page.getByTestId('add-to-cart-button').click();

    // 8. Logga totals (för kontroll)
    const totalSum = await page.locator('#totalSum').textContent();
    const totalVAT = await page.getByText('Total VAT:').textContent();
    const grandTotal = await page.locator('#grandTotal').textContent();
    console.log(`Total Sum: ${totalSum}`);
    console.log(`Total VAT: ${totalVAT}`);
    console.log(`Grand Total: ${grandTotal}`);

    // 9. Klicka på Buy för att gå till checkout
    await page.getByRole('button', { name: 'Buy' }).click();

    // 10. Fyll i Name och Address
    await page.getByRole('textbox', { name: 'Name:' }).fill('Harkanwal');
    await page.getByRole('textbox', { name: 'Address:' }).fill('Google');

    // 11. Bekräfta köp
    await page.getByRole('button', { name: 'Confirm Purchase' }).click();

    // 12. Verifiera att kvittot innehåller Apple
    const receiptItems = await page.locator('#receiptItems').allTextContents();
    console.log('Receipt Items:', receiptItems);
    expect(receiptItems.join(' ')).toContain('Apple');

    // 13. Stäng kvittot
    await page.getByText('Close').click();
  });

  // ✅ Scenario 2: Köp Apple + Banana och verifiera kvittot
  test('Buy Apple and Banana and verify receipt', async ({ page }) => {
    // Login-flöde
    await page.goto('https://hoff.is/login/');
    await page.getByRole('textbox', { name: 'Username' }).fill('marcus');
    await page.getByRole('textbox', { name: 'Password' }).fill('sup3rs3cr3t');
    await page.getByRole('combobox', { name: 'Select Role' }).selectOption('Consumer');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/store2/);

    // Välj Apple
    const dropdown = page.getByTestId('select-product');
    await dropdown.selectOption('1');
    await page.getByRole('textbox', { name: 'Amount' }).fill('60');
    await page.getByTestId('add-to-cart-button').click();

    // Välj Banana
    await dropdown.selectOption('2');
    await page.getByRole('textbox', { name: 'Amount' }).fill('30');
    await page.getByTestId('add-to-cart-button').click();

    // Checkout
    await page.getByRole('button', { name: 'Buy' }).click();
    await page.getByRole('textbox', { name: 'Name:' }).fill('Harkanwal');
    await page.getByRole('textbox', { name: 'Address:' }).fill('Google');
    await page.getByRole('button', { name: 'Confirm Purchase' }).click();

    // Verifiera kvittot
    const receiptItems = await page.locator('#receiptItems').allTextContents();
    expect(receiptItems.join(' ')).toContain('Apple');
    expect(receiptItems.join(' ')).toContain('Banana');

    await page.getByText('Close').click();
  });

  // ✅ Scenario 3: Negativt test – försök lägga till produkt utan Amount
  test('Try to add product without amount', async ({ page }) => {
    // Login-flöde
    await page.goto('https://hoff.is/login/');
    await page.getByRole('textbox', { name: 'Username' }).fill('marcus');
    await page.getByRole('textbox', { name: 'Password' }).fill('sup3rs3cr3t');
    await page.getByRole('combobox', { name: 'Select Role' }).selectOption('Consumer');
    await page.getByRole('button', { name: 'Login' }).click();

    // Välj produkt men fyll inte i Amount
    const dropdown = page.getByTestId('select-product');
    await dropdown.selectOption('1');
    await page.getByTestId('add-to-cart-button').click();

    // Kontrollera felmeddelande
    await expect(page.getByText(/amount is required/i)).not.toBeVisible();
  });

});
