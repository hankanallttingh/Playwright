import http from 'k6/http';       // HTTP-modulen för att göra API-anrop
import { check, sleep } from 'k6'; // check = asserts, sleep = paus mellan iterationer

export const options = {
 vus: 50,                        // Antal samtidiga virtuella användare
  duration: '30s',                // Testets längd
  thresholds: {
    // Sätt globala krav/alerts (valfritt): 95% av GET ska vara <500ms
    'http_req_duration{type:GET}': ['p(95)<500'],
    // Säkerställ att minst 99% av GET-responserna är 2xx
    'http_req_failed{type:GET}': ['rate<0.01'],
  },
};

export default function () {
  // 1️⃣ Ange student-id vi vill hämta.
  // Tips: gör det dynamiskt med env eller data-setup, men vi kör statiskt här:
  const studentId = 1;

  // 2️⃣ Bygg endpoint-URL för GET /student/{id}
  const url = `https://test-379574553568.us-central1.run.app/student/${studentId}`;

  // 3️⃣ Sätt headers – API-key och accept JSON
  const headers = {
    'API_KEY': 'h',                  // API-nyckel (ersätt med riktig)
    'accept': 'application/json',    // Vi förväntar oss JSON-svar
  };

  // 4️⃣ Skicka GET-requesten
  const res = http.get(url, { headers, tags: { type: 'GET' } });

  // 5️⃣ Grundläggande asserts på HTTP-nivå
  const statusOk = check(res, {
    'HTTP status är 200': (r) => r.status === 200,              // Rätt statuskod
    'response time < 500ms': (r) => r.timings.duration < 500,   // Prestanda-assert
    'content-type är JSON': (r) => String(r.headers['Content-Type'] || '').includes('application/json'),
  });

  // 6️⃣ Om status inte är OK (t.ex. 404/500), logga och avbryt denna iteration
  if (!statusOk) {
    console.error(`❌ GET misslyckades för studentId=${studentId} | status=${res.status} | body=${res.body?.substring(0, 200)}`);
    sleep(1);
    return;
  }

  // 7️⃣ Försök parsa JSON-svar
  let body;
  try {
    body = JSON.parse(res.body);
  } catch (e) {
    console.error(`❌ Svar är inte giltig JSON: ${e?.message} | rå body: ${res.body?.substring(0, 200)}`);
    // Misslyckad JSON-parsning → faila assert
    check(null, { 'giltig JSON': () => false });
    sleep(1);
    return;
  }

  // 8️⃣ Schema/struktur-asserts för studentobjektet
  const schemaOk = check(body, {
    'har fältet id': (b) => b && typeof b.id !== 'undefined',
    'har fältet name': (b) => b && typeof b.name === 'string' && b.name.length > 0,
    'har fältet age': (b) => b && (typeof b.age === 'number' || typeof b.age === 'string'),
    'har fältet grade': (b) => b && typeof b.grade !== 'undefined',
  });

  if (!schemaOk) {
    console.error(`❌ Felaktigt schema för studentId=${studentId}: ${JSON.stringify(body, null, 2)}`);
  }

  // 9️⃣ Assert att just den student vi bad om faktiskt hämtades (id-match)
  const idMatch = check(body, {
    [`student.id === ${studentId}`]: (b) => Number(b.id) === Number(studentId),
  });

  // 🔟 (valfritt) Assert på rimliga värden
  check(body, {
    'age är rimlig (>=0)': (b) => Number(b.age) >= 0,
    'grade är inom rimlig domän': (b) => ['1','2','3','4','5','6','7','8','9','10',1,2,3,4,5,6,7,8,9,10].includes(b.grade),
  });

  // 11️⃣ Logga ett kort, läsbart utdrag i konsolen (begränsa längd vid last)
  console.log(`✅ Hämtad student (id=${studentId}): ${JSON.stringify({ id: body.id, name: body.name, age: body.age, grade: body.grade })}`);

  // 12️⃣ Pausa för att simulera användarbeteende
  sleep(1);
}


/**k6 run createStudent.js
k6 run getStudent.js
k6 run updateStudent.js
k6 run deleteStudent.js
k6 run deleteAll.js
k6 run getAtudents.js */