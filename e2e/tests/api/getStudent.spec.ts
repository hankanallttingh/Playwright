import { test, expect } from "@playwright/test";

test("Get single student", async ({ request }) => {
  const headers = {
    'API_KEY': 'h',
    'accept': 'application/json'
  };

  const studentId = 7; // Ange ID för studenten du vill hämta
  const url = `https://test-379574553568.us-central1.run.app/student/${studentId}`;

  const response = await request.get(url, { headers });

  console.log("Status:", response.status(), response.statusText());
  console.log("Headers:", await response.headers());

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  console.log("✅ Student data:\n", JSON.stringify(body, null, 2));

  // Assertions
  expect(body.id).toBe(studentId);
  expect(body).toHaveProperty("name");
  expect(body).toHaveProperty("age");
  expect(body).toHaveProperty("grade");
});