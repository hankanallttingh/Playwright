
// e2e/tests/performanceTest/api/deleteStudent.spec.ts

// Importera vår custom test (med fixtures) istället för standard "@playwright/test"
import { test, expect } from "../../../fixtures/api.fixture";

test.describe("Student API", () => {
  test("Delete student by ID via fixture", async ({ deleteStudent }) => {
    // Välj ett ID att radera (kan komma från tidigare skapande eller hårdkodat för test)
    const studentId = 15;

    // Anropa vår fixture-funktion som kapslar DELETE-anropet
    const body = await deleteStudent(studentId);

    // 🔍 Logga hela svaret för insyn vid felsökning
    console.log("🔍 Full DELETE Response:\n", JSON.stringify(body, null, 2));

    // ✅ Assertions: verifiera att backend svarar korrekt
    expect(body.status).toBe("OK");
    expect(body.message).toContain(`Deleted student: ${studentId}`);
  });
});
