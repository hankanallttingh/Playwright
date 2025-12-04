
import { test as base } from '@playwright/test';

// Vi skapar en custom fixture som ger oss en sida med inloggad session
export const test = base.extend<{ authPage: any }>({
  authPage: async ({ browser }, use) => {
    // Skapa en ny browser context med sparad session (auth.json)
    // Detta gör att vi slipper logga in varje gång
    const context = await browser.newContext({ storageState: 'auth.json' });

    // Skapa en ny sida i denna context
    const page = await context.newPage();

    // Gör sidan tillgänglig för testet
    await use(page);

    // Stäng context efter testet är klart
    await context.close();
  },
});

// Exportera expect så vi kan använda det i tester
export { expect } from '@playwright/test';
