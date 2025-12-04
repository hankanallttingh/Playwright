
import { test as base, expect } from "@playwright/test";

type StudentPayload = { name: string; age: number | string; grade: string };
type StudentResponse = { id?: number; name: string; age: number | string; grade: string };

type Fixtures = {
  createStudent: (payload: StudentPayload) => Promise<StudentResponse>;
  updateStudent: (id: number, payload: StudentPayload) => Promise<{ status: string; message: string; data?: StudentResponse }>;
  deleteStudent: (id: number) => Promise<{ status: string; message: string }>;
  deleteAllStudents: () => Promise<{ status: string; message: string }>;
};

const headers = {
  API_KEY: "h", // byt till din riktiga API-nyckel
  "Content-Type": "application/json",
  accept: "application/json",
};

export const test = base.extend<Fixtures>({
  createStudent: async ({ request }, use) => {
    const createStudent = async (payload: StudentPayload) => {
      const url = `https://test-379574553568.us-central1.run.app/student`;
      const response = await request.post(url, { headers, data: payload });
      expect(response.ok()).toBeTruthy();
      return (await response.json()) as StudentResponse;
    };
    await use(createStudent);
  },

  updateStudent: async ({ request }, use) => {
    const updateStudent = async (id: number, payload: StudentPayload) => {
      const url = `https://test-379574553568.us-central1.run.app/student/${id}`;
      const response = await request.put(url, { headers, data: payload });
      expect(response.ok()).toBeTruthy();
      return (await response.json()) as { status: string; message: string; data?: StudentResponse };
    };
    await use(updateStudent);
  },

  deleteStudent: async ({ request }, use) => {
    const deleteStudent = async (id: number) => {
      const url = `https://test-379574553568.us-central1.run.app/student/${id}`;
      const response = await request.delete(url, { headers });
      expect(response.ok()).toBeTruthy();
      return (await response.json()) as { status: string; message: string };
    };
    await use(deleteStudent);
  },

  deleteAllStudents: async ({ request }, use) => {
    const deleteAllStudents = async () => {
      const url = `https://test-379574553568.us-central1.run.app/student`;
      const response = await request.delete(url, { headers });
      expect(response.ok()).toBeTruthy();
      return (await response.json()) as { status: string; message: string };
    };
    await use(deleteAllStudents);
  },
});

export { expect };
