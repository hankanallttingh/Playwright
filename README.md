# **Playwright & K6 Testing Project**

## 📌 **Projektbeskrivning**

Detta projekt innehåller:

*   **UI-tester med Playwright**
    *   Login-flöde (positiva + negativa scenarier)
    *   Store-flöde (köp av produkter, kvittoverifiering, totalskontroller)
*   **API-tester** (CRUD-operationer mot student-API)
*   **Accessibility-test** med Axe
*   **Performance-test** med K6
*   **GitHub Actions pipeline** för automatiserad testkörning

Projektet är byggt med **Page Object Model (POM)** för bättre struktur och underhåll.

***

## ✅ **Nya funktioner**

✔ **Login-tester**:

*   Positiva scenarier (korrekta credentials)
*   Negativa scenarier:
    *   Felaktigt användarnamn/lösenord
    *   Tomt användarnamn/lösenord
    *   SQL Injection & XSS
    *   Rollval (Consumer/Business)
    *   Assertion för felmeddelande (`Incorrect password`)

✔ **Store-tester**:

*   Scenario 1: Köp **Apple** och verifiera kvittot
*   Scenario 2: Köp **Apple + Banana** och verifiera kvittot
*   Scenario 3: Negativt test – försök lägga till produkt utan Amount
*   Loggning av **Total Sum**, **Total VAT**, **Grand Total**
*   Kommande: Data-driven tester och totalsassertioner

✔ **Struktur**:

    pages/LoginPage.ts      # POM för login
    pages/StorePage.ts      # POM för köpflöde
    tests/login.spec.ts     # Login-tester
    tests/purchase.spec.ts  # Köpflöden (Apple, Banana, negativa tester)

***

## 🚀 **Installation**

1.  Klona repo:
    ```bash
    git clone <repo-url>
    cd <repo-folder>
    npm install
    npx playwright install
    ```

2.  Kör alla tester:
    ```bash
    npx playwright test
    ```

3.  Kör en specifik testfil:
    ```bash
    npx playwright test tests/login.spec.ts
    npx playwright test tests/purchase.spec.ts
    ```

4.  Kör med UI (headed):
    ```bash
    npx playwright test --headed
    ```

5.  Kör med debug:
    ```bash
    npx playwright test --debug
    ```

***

## ✅ **Exempel: Kör enskilda scenarier**

Använd `--grep` för att köra ett specifikt test:

```bash
npx playwright test --grep "Buy Apple and verify receipt"
```

***

## ✅ **Taggar för scenarier**

Du kan lägga till taggar i testnamn och filtrera:

```typescript
test('[@store] Buy Apple and verify receipt', async ({ page }) => { ... });
```

Kör endast store-tester:

```bash
npx playwright test --grep "@store"
```

***

## ✅ **Data-driven tester (planerat)**

Exempel på hur vi kommer att loopa över produkter:

```typescript
const products = [
  { name: 'Apple', value: '1', amount: '60' },
  { name: 'Banana', value: '2', amount: '30' }
];

for (const product of products) {
  test(`Buy ${product.name}`, async ({ page }) => {
    // login + köpflöde
  });
}
```

***

## ⚡ **K6 Performance-tester**

Alla K6-skript ligger i:

    e2e/tests/performanceTest/

Kör ett test:

```bash
k6 run e2e/tests/performanceTest/<filnamn>.js
```

Kör alla tester:

```bash
Get-ChildItem "e2e/tests/performanceTest/*.js" | ForEach-Object { k6 run $_.FullName }
```

***

## 📂 **Projektstruktur**

    pages/                # Page Object Model-klasser (LoginPage, StorePage)
    tests/                # UI-tester (Login, Store), API-tester, Accessibility-tester
    e2e/tests/performanceTest/  # K6 performance-tester
    .github/workflows/    # GitHub Actions pipeline

***

## 🛠 **Tekniker**

*   Playwright
*   Axe-core
*   K6
*   GitHub Actions

***

## ✅ **Kraven som uppfylls**

✔ Minst 5 UI-tester (Login + Store)  
✔ Minst 1 API-test  
✔ Minst 1 Accessibility-test  
✔ Page Object Model används  
✔ Pipeline kör tester automatiskt  
✔ API används för assertions i UI  
✔ K6 performance-test finns

***

## 🔄 **Pipeline**

GitHub Actions workflow finns i:

    .github/workflows/playwright.yml

***
