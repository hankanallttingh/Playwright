import { test, expect } from "@playwright/test";

test("Get single student", async ({ request }) => {
  const headers = {
    'API_KEY': 'h',
    'accept': 'application/json'
  };

  const studentId = 776; // Ange ID för studenten du vill hämta
  const url = `https://test-379574553568.us-central1.run.app/student/${studentId}`;

  const response = await request.get(url, { headers });

  console.log("Status:", response.status(), response.statusText());
  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  console.log("✅ Full Response:\n", JSON.stringify(body, null, 2));

 if (Array.isArray(body)) {
  expect(body.length).toBeGreaterThan(0);
  body.forEach(student => {
    expect(student).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String)
    });
  });
} else {
  expect(body).toMatchObject({
    id: expect.any(Number),
    name: expect.any(String),
    age: expect.any(Number),
    grade: expect.any(String)
  });
}
  /* Kontrollera status först
  expect(body).toHaveProperty("status");
  if (body.status !== "OK") {
    console.warn(`⚠️ Student med ID ${studentId} hittades. Meddelande: ${body.message}`);
    return; // Avbryt testet här
  }

  // Nu kan vi göra asserts på data
  expect(body).toHaveProperty("data");
  expect(body.data).toHaveProperty("name");
  expect(body.data).toHaveProperty("age");
  expect(body.data).toHaveProperty("grade");

  // Extra: jämför ID
  expect(body.data.id).toBe(studentId);*/
});