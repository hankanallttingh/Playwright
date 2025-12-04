
// e2e/tests/performanceTest/api/updateStudent.e2e.spec.ts
import { test, expect } from "../../fixtures/api.fixture";

test("Create → Update → Delete student via fixtures", async ({ createStudent, updateStudent, deleteStudent }) => {
  // 1) Skapa student först
  const created = await createStudent({ name: "Temp User", age: "20", grade: "B" });
  //expect(created.id).toBe("ok");

  // 2) Uppdatera den nyss skapade
  const payload = { name: "Temp User Updated", age: 45, grade: "A" };
  const updated = await updateStudent(Number(created.id), payload);
 // expect(updated.status).toBe("OK");

  // 3) Verifiera fälten (hantera ev. type-skillnader)
  /*for (const [key, value] of Object.entries(payload)) {
    expect(String(updated.data?.[key] ?? "")).toBe(String(value));
  }*/

  // 4) Cleanup – radera studenten
  const delRes = await deleteStudent(Number(created.id));
 // expect(delRes.status).toBe("OK");
});

