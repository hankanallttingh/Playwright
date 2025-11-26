# Playwright & K6 Testing Project

## 📌 Projektbeskrivning
Detta projekt innehåller:
- **UI-tester med Playwright** (Login & Store-sidor)
- **API-tester** (CRUD-operationer mot student-API)
- **Accessibility-test** med Axe
- **Performance-test** med K6
- **GitHub Actions pipeline** för automatiserad testkörning

Projektet är byggt med **Page Object Model (POM)** för bättre struktur och underhåll.

---

## 🚀 Installation
1. Klona repo:
   ```bash
   git clone <repo-url>
   cd <repo-folder>

   npm install
   npx playwright install
   npx playwright test
   npx playwright test tests/login.spec.ts
   npx playwright test --headed
   npx playwright test --debug

    K6 Performance-tester
Alla K6-skript ligger i:
e2e/tests/performanceTest/

k6 run e2e/tests/performanceTest/<filnamn>.js
Get-ChildItem "e2e/tests/performanceTest/*.js" | ForEach-Object { k6 run $_.FullName }

pages/                # Page Object Model-klasser
tests/                # UI-, API- och accessibility-tester
e2e/tests/performanceTest/  # K6 performance-tester
.github/workflows/    # GitHub Actions pipeline

Tekniker

Playwright
Axe-core
K6
GitHub Actions

Kraven som uppfylls
✔ Minst 5 UI-tester (Login + Store)
✔ Minst 1 API-test
✔ Minst 1 Accessibility-test
✔ Page Object Model används
✔ Pipeline kör tester automatiskt
✔ API används för assertions i UI
✔ K6 performance-test finns

Pipeline
GitHub Actions workflow finns i:
.github/workflows/playwright.yml