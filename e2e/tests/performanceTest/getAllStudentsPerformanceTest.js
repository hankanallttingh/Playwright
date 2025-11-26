import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50,                        // Antal virtuella användare
  duration: '30s',                // Testets längd
};

export default function () {
  // ✅ Korrekt endpoint för att hämta alla studenter
  const url = 'https://test-379574553568.us-central1.run.app/student';
  const headers = {
    'API_KEY': 'h',
    'accept': 'application/json'
  };

  // 1️⃣ Skicka GET-request
  const res = http.get(url, { headers });

  // 2️⃣ Grundläggande asserts
  const statusOk = check(res, {
    'HTTP status är 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
    'content-type är JSON': (r) => String(r.headers['Content-Type'] || '').includes('application/json'),
  });

  if (!statusOk) {
    console.error(`❌ GET misslyckades | status=${res.status} | body=${res.body?.substring(0, 200)}`);
    sleep(1);
    return;
  }

  // 3️⃣ Försök parsa JSON-svar
  let students;
  try {
    students = JSON.parse(res.body);
  } catch (e) {
    console.error(`❌ Ogiltig JSON: ${e.message}`);
    check(null, { 'giltig JSON': () => false });
    sleep(1);
    return;
  }

  // 4️⃣ Assert att svaret är en array
  check(students, {
    'svaret är en array': (s) => Array.isArray(s),
  });

  // 5️⃣ Logga total antal studenter
  console.log(`✅ Totalt antal studenter: ${students.length}`);

  // 6️⃣ Gå igenom hela listan och logga varje student (begränsa vid stor lista)
  students.forEach((student, index) => {
    console.log(`Student #${index + 1}: id=${student.id}, name=${student.name}, age=${student.age}, grade=${student.grade}`);
  });

  // 7️⃣ Pausa innan nästa iteration
  sleep(1);
}

/**k6 run createStudent.js
k6 run getStudent.js
k6 run updateStudent.js
k6 run deleteStudent.js
k6 run deleteAll.js
k6 run getAtudents.js */