import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Loginpage';



test.describe('Login tests with roles', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Incorrect password for Consumer role', async ({ page }) => {
    await loginPage.login('Harkanwal', 'wrongPass', 'Consumer');
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('Incorrect password for Business role', async ({ page }) => {
    await loginPage.login('Harkanwal', 'wrongPass', 'Business');
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('Empty username', async ({ page }) => {
    await loginPage.login('', 'sup3rs3cr3t', 'Consumer');
    await expect(page.getByText(/Please fill in all fields./i)).toBeVisible();
  });

  test('Empty password', async ({ page }) => {
    await loginPage.login('Harkanwal', '', 'Consumer');
    await expect(page.getByText(/Please fill in all fields./i)).toBeVisible();
  });
});
