import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '5s',
  thresholds: {
    'http_req_duration{type:GET}': ['p(95)<500'],
    'http_req_failed{type:GET}': ['rate<0.01'],
  },
};

export default function () {
  const studentId = 1512;
  const url = `https://test-379574553568.us-central1.run.app/student/${studentId}`;
  const headers = {
    'API_KEY': 'h',
    'accept': 'application/json',
  };

  const res = http.get(url, { headers, tags: { type: 'GET' } });

  // Grundläggande HTTP-checks
  const statusOk = check(res, {
    'status är 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
    'content-type är JSON': (r) => String(r.headers['Content-Type'] || '').includes('application/json'),
  });

  if (!statusOk) {
    console.error(`❌ Misslyckades: status=${res.status}, body=${res.body}`);
    sleep(1);
    return;
  }

  // Försök parsa JSON
  let body;
  try {
    body = JSON.parse(res.body);
  } catch (e) {
    console.error(`❌ Ogiltig JSON: ${e.message}`);
    check(null, { 'giltig JSON': () => false });
    sleep(1);
    return;
  }

  // Dynamisk schema-check
  const schemaOk = check(body, {
    'har id': (b) => b && typeof b.id !== 'undefined',
    'har name': (b) => b && typeof b.name === 'string',
    'har age': (b) => b && (typeof b.age === 'number' || typeof b.age === 'string'),
    'har grade': (b) => b && typeof b.grade !== 'undefined',
  });

  if (!schemaOk) {
    console.warn(`⚠️ Schema fel: body=${JSON.stringify(body)}`);
  }

  sleep(1);


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

