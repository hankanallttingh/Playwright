import { test, expect } from "@playwright/test";

test.describe("Student API", () => {
  test.beforeAll(async () => {
    console.log("✅ Setup done before all tests");
  });

  test("Delete all students", async ({ request }) => {
    const headers = {
      'API_KEY': 'h',
      'Content-Type': 'application/json',
      'accept': 'application/json'
    };

    const url = `https://test-379574553568.us-central1.run.app/student_delete_all`;

    const response = await request.delete(url, { headers });

    console.log("Status:", response.status(), response.statusText());
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    console.log("🔍 Full DELETE ALL Response:\n", JSON.stringify(body, null, 2));

    expect(body.status).toBe("OK");
    expect(body.message).toBe("Deleted all students");
  });
});