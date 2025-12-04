//import { test, expect } from "@playwright/test";

import { test, expect } from "../../fixtures/api.fixture";

test("Create student", async ({ request }) => {
  const headers = {
    'API_KEY': 'h',
    'Content-Type': 'application/json',
    'accept': 'application/json'
  };
  
  
 const url = 'https://test-379574553568.us-central1.run.app/student';

 const payload = {
  name: "Harkanwal",
  age: "25",        // som string
  grade: "5"        // som string
};

  const response = await request.post(url, {
    headers,
    data: payload
  });

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  console.log("✅ Created Student:\n", JSON.stringify(body, null, 2));
});
