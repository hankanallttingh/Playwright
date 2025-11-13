import { Page, Locator } from '@playwright/test';

export class InsurancePage {
  readonly page: Page;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly addressField: Locator;
  readonly apartmentSizeField: Locator;
  readonly adultsField: Locator;
  readonly kidsField: Locator;
  readonly adultsPercentageDropdown: Locator;
  readonly calculateButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameField = page.getByPlaceholder('First name');
    this.lastNameField = page.getByPlaceholder('Last name');
    this.addressField = page.getByPlaceholder('1234 main st');
    this.apartmentSizeField = page.getByRole('spinbutton', { name: 'Apartment size' });
    this.adultsField = page.getByRole('spinbutton', { name: 'Adults' });
    this.kidsField = page.getByRole('spinbutton', { name: 'Kids' });
    this.adultsPercentageDropdown = page.locator('#inputCoverage'); // justera om ID är annorlunda
    this.calculateButton = page.getByRole('button', { name: 'Calculate price' });
  }

  async goto() {
    await this.page.goto('https://hoff.is/insurance/');
  }

  async fillForm(firstName: string, lastName: string, address: string, size: string, adults: string, kids: string) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.addressField.fill(address);
    await this.apartmentSizeField.fill(size);
    await this.adultsField.fill(adults);
    await this.kidsField.fill(kids);
  }

  async selectCoverage(option: string) {
    await this.adultsPercentageDropdown.selectOption(option);
  }

  async calculatePrice() {
    await this.calculateButton.click();
  }
}