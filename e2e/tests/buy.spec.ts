
import { test, expect } from '@playwright/test';

test.describe('Purchase flow', () => {
  test('Buy Apple and verify receipt', async ({ page }) => {
    // 1. Gå till login och logga in
    await page.goto('https://hoff.is/login/');
    await page.getByRole('textbox', { name: 'Username' }).fill('marcus');
    await page.getByRole('textbox', { name: 'Password' }).fill('sup3rs3cr3t');
    await page.getByRole('combobox', { name: 'Select Role' }).selectOption('Consumer');
    await page.getByRole('button', { name: 'Login' }).click();

    // 2. Verifiera att vi är på Store-sidan
    await expect(page).toHaveURL(/store2/);
    await expect(page.locator('h1')).toHaveText(/Store/i);

    // 3. Välj produkt Apple (value="1")
    const dropdown = page.getByTestId('select-product');
    await dropdown.selectOption('1');

    // 4. Fyll i Amount
    await page.getByRole('textbox', { name: 'Amount' }).fill('60');

    // 5. Klicka på Add to Cart
    await page.getByTestId('add-to-cart-button').click();

    // 6. Logga totals
    const totalSum = await page.locator('#totalSum').textContent();
    const totalVAT = await page.getByText('Total VAT:').textContent();
    const grandTotal = await page.locator('#grandTotal').textContent();
    console.log(`Total Sum: ${totalSum}`);
    console.log(`Total VAT: ${totalVAT}`);
    console.log(`Grand Total: ${grandTotal}`);

    // 7. Klicka på Buy
    await page.getByRole('button', { name: 'Buy' }).click();

    // 8. Fyll i Name och Address
    await page.getByRole('textbox', { name: 'Name:' }).fill('Harkanwal');
    await page.getByRole('textbox', { name: 'Address:' }).fill('Google');

    // 9. Bekräfta köp
    await page.getByRole('button', { name: 'Confirm Purchase' }).click();

    // 10. Verifiera kvittot innehåller Apple
    const receiptItems = await page.locator('#receiptItems').allTextContents();
    console.log('Receipt Items:', receiptItems);
    expect(receiptItems.join(' ')).toContain('Apple');

    // 11. Stäng kvittot
    await page.getByText('Close').click();
  });

  
});
