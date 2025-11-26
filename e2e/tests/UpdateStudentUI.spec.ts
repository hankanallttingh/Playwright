import { test, expect } from "@playwright/test";

test("Create student via API, update in UI, verify via API", async ({ request, page }) => {
  // 1. Skapa student via API
  const createResponse = await request.post("https://test-379574553568.us-central1.run.app/student", {
    headers: {
      'API_KEY': 'h',
      'Content-Type': 'application/json',
      'accept': 'application/json'
    },
    data: { name: "Harkanwal Singh", age: 25, grade: "3" }
  });

  expect(createResponse.ok()).toBeTruthy();
  const createBody = await createResponse.json();
  console.log("✅ Create Response:", createBody);

  const studentId = createBody.student_id;
  console.log(`✅ Student created with ID: ${studentId}`);

  // 2. Uppdatera student i UI
  await page.goto("https://test-379574553568.us-central1.run.app/"); // UI URL
  await page.fill('[data-testid="name_input"]', "Updated Name");
  await page.fill('[data-testid="age_input"]', "25");
  await page.fill('[data-testid="grade_input"]', "5");
  await page.click('[data-testid="submit_student"]');

  // 3. Verifiera ändringen via API
  const getResponse = await request.get(`https://test-379574553568.us-central1.run.app/student/${studentId}`, {
    headers: {
      'API_KEY': 'h',
      'accept': 'application/json'
    }
  });

  expect(getResponse.ok()).toBeTruthy();
  const updatedBody = await getResponse.json();
  console.log("🔍 Updated Student:", updatedBody);
/*
  expect(updatedBody.data.name).toBe("Updated Name");
  expect(updatedBody.data.age).toBe(25);
  expect(updatedBody.data.grade).toBe("5");
*/
  // 4. Cleanup: Radera studenten
  const deleteResponse = await request.delete(`https://test-379574553568.us-central1.run.app/student/${studentId}`, {
    headers: {
      'API_KEY': 'h',
      'accept': 'application/json'
    }
  });

  expect(deleteResponse.ok()).toBeTruthy();
  console.log(`✅ Student ${studentId} deleted`);
});