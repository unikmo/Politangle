const baseUrl = (process.env.POLITANGLE_BASE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
const requireFirebase = process.env.REQUIRE_FIREBASE === 'true';

const pages = [
  ['/', 'Politangle'],
  ['/method', 'Eight questions'],
  ['/learn', 'Learn'],
  ['/quizzes', 'Choose a quiz'],
  ['/countries', 'Country'],
  ['/countries/france', 'France'],
  ['/school', 'student'],
  ['/account', 'Politangle account'],
  ['/privacy', 'PRIVACY'],
  ['/imprint', 'TSquare Ventures LLC'],
  ['/terms', 'TERMS'],
  ['/contact', 'TSquare Ventures LLC'],
  ['/de/method', 'Acht Fragen'],
  ['/es/method', 'Ocho preguntas'],
  ['/fr/method', 'Huit questions'],
];

const failures = [];
for (const [path, expected] of pages) {
  try {
    const response = await fetch(baseUrl + path, { redirect: 'follow' });
    const body = await response.text();
    if (!response.ok) failures.push(`${path}: HTTP ${response.status}`);
    else if (!body.toLowerCase().includes(expected.toLowerCase())) failures.push(`${path}: missing expected text "${expected}"`);
    else console.log(`PASS ${path} ${response.status}`);
  } catch (error) {
    failures.push(`${path}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

try {
  const response = await fetch(baseUrl + '/api/assessment/quick/access', { cache: 'no-store' });
  const data = await response.json();
  if (!response.ok) failures.push(`/api/assessment/quick/access: HTTP ${response.status}`);
  else if (typeof data.registrationAvailable !== 'boolean' || typeof data.repeatRegistrationRequired !== 'boolean') failures.push('/api/assessment/quick/access: malformed response');
  else console.log(`PASS quick access registrationAvailable=${data.registrationAvailable}`);
} catch (error) {
  failures.push(`quick access API: ${error instanceof Error ? error.message : String(error)}`);
}

try {
  const response = await fetch(baseUrl + '/api/firebase/health', { cache: 'no-store' });
  const data = await response.json().catch(() => ({}));
  if (requireFirebase && !response.ok) failures.push(`Firebase health required but returned HTTP ${response.status}: ${JSON.stringify(data)}`);
  else console.log(`INFO Firebase health HTTP ${response.status} ${JSON.stringify(data)}`);
} catch (error) {
  if (requireFirebase) failures.push(`Firebase health: ${error instanceof Error ? error.message : String(error)}`);
}

if (failures.length) {
  console.error('\nRelease smoke failures:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('\nRelease smoke checks passed.');
