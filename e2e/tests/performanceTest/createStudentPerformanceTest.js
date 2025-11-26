import http from 'k6/http';       // Importerar HTTP-modulen för att göra API-anrop
import { check, sleep } from 'k6'; // Importerar check (assert) och sleep (paus)

export const options = {
  vus: 100,                        // Antal virtuella användare (VUs) som kör samtidigt
  duration: '10s',                // Testets totala varaktighet
};

export default function () {
  // Bas-URL för API:et
  const baseUrl = 'https://test-379574553568.us-central1.run.app/student';

  // Headers som skickas med varje request
  const headers = {
    'API_KEY': 'h',               // API-nyckel för autentisering
    'Content-Type': 'application/json', // Vi skickar JSON-data
    'accept': 'application/json'  // Vi förväntar oss JSON-svar
  };

  // 1️⃣ Skapa en ny student (POST)
  const payload = JSON.stringify({
    name: `User_${__VU}_${__ITER}`, // Dynamiskt namn baserat på VU och iteration
    age: 20,                        // Ålder (hårdkodad här)
    grade: '3'                      // Klass (hårdkodad här)
  });

  const res = http.post(baseUrl, payload, { headers }); // Skickar POST-request

  // ✅ Kontrollera att POST lyckades
  check(res, {
    'status is 200': (r) => r.status === 200, // Assert: HTTP-status ska vara 200
  });

  // 2️⃣ Hämta alla studenter (GET)
  const getRes = http.get(baseUrl, { headers }); // Skickar GET-request för att lista studenter
  const students = JSON.parse(getRes.body);      // Tolkar svaret som JSON-array

  // ✅ Kontrollera att GET lyckades och att det finns minst en student
  check(getRes, {
    'GET status is 200': (r) => r.status === 200,       // Assert: HTTP-status ska vara 200
    'antal studenter > 0': () => students.length > 0,   // Assert: minst en student i listan
  });

  // 🖨 Logga antalet studenter i konsolen
  console.log(`Totalt antal studenter just nu: ${students.length}`);

  // 3️⃣ Pausa 1 sekund innan nästa iteration
  sleep(1);
}



/**k6 run createStudent.js
k6 run getStudent.js
k6 run updateStudent.js
k6 run deleteStudent.js
k6 run deleteAll.js
k6 run getAtudents.js */