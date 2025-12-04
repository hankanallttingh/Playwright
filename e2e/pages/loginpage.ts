
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly roleDropdown: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly errorMessage1: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.getByRole('textbox', { name: 'Username' });
    this.passwordField = page.getByRole('textbox', { name: 'Password' });
    this.roleDropdown = page.getByRole('combobox', { name: 'Select Role' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.getByText('Incorrect password'); // exakt text från bilden
    this.errorMessage1 = page.getByText('Please fill in all fields.'); // exakt text från bilden

  }

  async goto() {
    await this.page.goto('https://hoff.is/login/');
  }

  async login(username: string, password: string, role: 'Consumer' | 'Business') {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.roleDropdown.selectOption({ label: role });
    await this.loginButton.click();
  }
}
