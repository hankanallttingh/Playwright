import { test, expect } from "@playwright/test";

test("Get all students", async ({ request }) => {
  const headers = {
    'API_KEY': 'h',
    'accept': 'application/json',
    'Content-Type': 'application/json' 
  };

  const url = 'https://test-379574553568.us-central1.run.app/student'; 

  const response = await request.get(url, { headers:headers });
  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  console.log("Response JSON:", body);

  if (Array.isArray(body)) {
    console.log(`Found ${body.length} students`);
    body.forEach((student, i) => {
      console.log(`Student ${i + 1}:`, student);
      expect(student).toHaveProperty("id");
      expect(student).toHaveProperty("name");
    });
  } else {
    console.warn("Unexpected response:", body);
    expect(body.status).not.toEqual("OK");
  }
});