
// Importerar vår custom test med fixtures (OBS: justera path om nödvändigt)
import { test, expect } from "../../../fixtures/api.fixture";

// Grupp för Student API-tester
test.describe("Student API", () => {
  // Körs innan alla tester i denna grupp
  test.beforeAll(async () => {
    console.log("✅ Setup done before all tests");
  });

  // Test: Radera alla studenter via fixture
  test("Delete all students via fixture", async ({ deleteAllStudents }) => {
    // Anropa vår fixture-funktion
    const body = await deleteAllStudents();

    // Logga hela svaret för debugging
    console.log("🔍 Full DELETE ALL Response:\n", JSON.stringify(body, null, 2));

    // Assertions för att verifiera API-svaret
    expect(body.status).toBe("OK");
    expect(body.message).toBe("Deleted all students");
  });
});
