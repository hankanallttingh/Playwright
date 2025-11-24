import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50,
  duration: '30s',
};

export default function () {
  const studentId = 1;
  const url = `https://test-379574553568.us-central1.run.app/student/${studentId}`;
  const headers = {
    'API_KEY': 'h',
    'accept': 'application/json'
  };

  const res = http.del(url, null, { headers });

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500
  });

  sleep(1);
}


/**k6 run createStudent.js
k6 run getStudent.js
k6 run updateStudent.js
k6 run deleteStudent.js
k6 run deleteAll.js
k6 run getAtudents.js */