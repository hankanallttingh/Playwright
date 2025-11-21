import { test, expect } from "@playwright/test";

test("Delete student by ID", async ({ request }) => {
  const headers = {
    'API_KEY': 'h',
    'Content-Type': 'application/json',
    'accept': 'application/json'
  };

  const studentId = 3;
  const url = `https://test-379574553568.us-central1.run.app/student/${studentId}`;

  const response = await request.delete(url, { headers });

  console.log("Status:", response.status(), response.statusText());
  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  // ✅ Logga hela responsen
  console.log("🔍 Full DELETE Response:\n", JSON.stringify(body, null, 2));

  // ✅ Assertions
  expect(body.status).toBe("OK");
  expect(body.message).toContain(`Deleted student: ${studentId}`);
});