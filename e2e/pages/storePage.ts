
import { Page, Locator } from '@playwright/test';

export class StorePage {
  readonly page: Page;
  readonly productDropdown: Locator;
  readonly amountField: Locator;
  readonly addToCartButton: Locator;
  readonly buyButton: Locator;
  readonly nameField: Locator;
  readonly addressField: Locator;
  readonly confirmPurchaseButton: Locator;
  readonly receiptItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productDropdown = page.getByTestId('select-product');
    this.amountField = page.getByRole('textbox', { name: 'Amount' });
    this.addToCartButton = page.getByTestId('add-to-cart-button');
    this.buyButton = page.getByRole('button', { name: 'Buy' });
    this.nameField = page.getByRole('textbox', { name: 'Name:' });
    this.addressField = page.getByRole('textbox', { name: 'Address:' });
    this.confirmPurchaseButton = page.getByRole('button', { name: 'Confirm Purchase' });
    this.receiptItems = page.locator('#receiptItems');
  }

  async selectProduct(productValue: string) {
    await this.productDropdown.selectOption(productValue);
  }

  async addToCart(amount: string) {
    await this.amountField.fill(amount);
    await this.addToCartButton.click();
  }

  async buy(name: string, address: string) {
    await this.buyButton.click();
    await this.nameField.fill(name);
    await this.addressField.fill(address);
    await this.confirmPurchaseButton.click();
  }

  async getReceiptItems(): Promise<string[]> {
    return await this.receiptItems.allTextContents();
  }
}
