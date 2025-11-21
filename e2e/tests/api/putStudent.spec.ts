import { test, expect } from "@playwright/test";

test("Update student by ID", async ({ request }) => {
  const headers = {
    'API_KEY': 'h',
    'Content-Type': 'application/json',
    'accept': 'application/json'
  };

  const studentId = 1;
  const url = `https://test-379574553568.us-central1.run.app/student/${studentId}`;

  const payload = {
    name: "Marcus Done",
    age: 22,
    grade: "5"
  };

  // Helper för logg + assert
  const logAndAssert = (field: string, actual: any, expected: any) => {
    console.log(`✅ ${field}:`, actual);
    expect(actual).toBe(expected);
  };

  const response = await request.put(url, {
    headers,
    data: payload
  });

  console.log("Status:", response.status(), response.statusText());
  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  // ✅ Logga hela bodyn snyggt
  console.log("🔍 Full Response Body:\n", JSON.stringify(body, null, 2));

  // Grundläggande asserts
  expect(body.status).toBe("OK");
  expect(body.message).toContain(`Updated student with id: ${studentId}`);

  // ✅ Kontrollera att data finns innan vi gör asserts
  if (!body.data) {
    console.warn("⚠️ Ingen 'data' i responsen!");
    return; // Avbryt testet här om du vill
  }

  // ✅ Dynamisk loop över payload
  for (const [key, value] of Object.entries(payload)) {
    logAndAssert(key, body.data[key], value);
  }
});