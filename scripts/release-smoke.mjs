const baseUrl = (process.env.POLITANGLE_BASE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
const requireFirebase = process.env.REQUIRE_FIREBASE === 'true';

const countrySlugs = [
  'united-states','germany','france','united-kingdom','netherlands','denmark','finland','iceland','norway','sweden',
  'spain','mexico','canada','south-africa','india','nigeria','philippines','brazil','indonesia','japan',
  'italy','poland','romania','portugal','belgium','switzerland','ireland','argentina','colombia','chile',
  'peru','costa-rica','kenya','ghana','senegal','australia','new-zealand','south-korea','taiwan','malaysia',
  'austria','czechia','greece','hungary','ukraine','turkiye','israel','uruguay','ecuador','dominican-republic',
  'panama','cameroon','zambia','bangladesh','pakistan','thailand','egypt','ethiopia','democratic-republic-congo','serbia',
  'vietnam','morocco','algeria','tanzania','uganda','cote-divoire','angola','mozambique','sri-lanka','nepal',
  'iraq','guatemala','bolivia','paraguay','venezuela','honduras','el-salvador','singapore','tunisia','georgia',
];
const locales = ['de','es','fr','pt-br'];

const pages = [
  ['/', 'Politangle'],
  ['/method', 'Eight questions'],
  ['/learn', 'Learn'],
  ['/quizzes', 'Choose a quiz'],
  ['/countries', 'Country'],
  ['/school', 'student'],
  ['/account', 'Politangle account'],
  ['/certify', 'POLITICAL LITERACY CERTIFICATE'],
  ['/privacy', 'PRIVACY'],
  ['/imprint', 'TSquare Ventures LLC'],
  ['/terms', 'TERMS'],
  ['/contact', 'TSquare Ventures LLC'],
  ['/de/method', 'Acht Fragen'],
  ['/es/method', 'Ocho preguntas'],
  ['/fr/method', 'Huit questions'],
  ['/de/countries', '80 Länderperspektiven'],
  ['/es/countries', '80 perspectivas'],
  ['/fr/countries', '80 perspectives'],
  ['/pt-br/countries', '80 perspectivas'],
];

const failures = [];
let checkedPages = 0;
let slowest = { path: '', ms: 0 };

async function fetchPage(path) {
  const started = Date.now();
  const response = await fetch(baseUrl + path, { redirect: 'follow' });
  const body = await response.text();
  const ms = Date.now() - started;
  checkedPages += 1;
  if (ms > slowest.ms) slowest = { path, ms };
  return { response, body, ms };
}

for (const [path, expected] of pages) {
  try {
    const { response, body, ms } = await fetchPage(path);
    if (!response.ok) failures.push(`${path}: HTTP ${response.status}`);
    else if (!body.toLowerCase().includes(expected.toLowerCase())) failures.push(`${path}: missing expected text "${expected}"`);
    else if (!body.includes('<main')) failures.push(`${path}: missing main landmark`);
    else if (!body.includes('<h1')) failures.push(`${path}: missing h1`);
    else console.log(`PASS ${path} ${response.status} ${ms}ms`);
  } catch (error) {
    failures.push(`${path}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

for (const slug of countrySlugs) {
  const paths = [`/countries/${slug}`, ...locales.map((locale) => `/${locale}/countries/${slug}`)];
  for (const path of paths) {
    try {
      const { response, body, ms } = await fetchPage(path);
      if (!response.ok) failures.push(`${path}: HTTP ${response.status}`);
      else if (!body.includes('country-hero')) failures.push(`${path}: country hero missing`);
      else if (!body.includes('<h1')) failures.push(`${path}: h1 missing`);
      else if (path !== `/countries/${slug}` && !body.includes(`/${path.split('/')[1]}/countries/${slug}`)) failures.push(`${path}: localized canonical/hreflang path missing`);
      else console.log(`PASS country ${path} ${response.status} ${ms}ms`);
    } catch (error) {
      failures.push(`${path}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

try {
  const { response, body } = await fetchPage('/countries/france');
  if (!response.ok) failures.push(`/countries/france: HTTP ${response.status}`);
  else if (/noindex/i.test(body)) failures.push('/countries/france: substantive country page should be indexable');
} catch (error) {
  failures.push(`country robots check: ${error instanceof Error ? error.message : String(error)}`);
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

for (const [path, body] of [
  ['/api/assessment/quick/complete', undefined],
  ['/api/auth/session', JSON.stringify({ idToken: 'x'.repeat(120) })],
]) {
  try {
    const response = await fetch(baseUrl + path, {
      method: 'POST',
      headers: { Origin: 'https://cross-site.invalid', 'Content-Type': 'application/json' },
      ...(body ? { body } : {}),
    });
    if (response.status !== 403) failures.push(`${path}: cross-site POST expected 403, got ${response.status}`);
    else console.log(`PASS security ${path} cross-site blocked`);
  } catch (error) {
    failures.push(`${path} cross-site security: ${error instanceof Error ? error.message : String(error)}`);
  }
}

try {
  const response = await fetch(baseUrl + '/api/admin/overview', { cache: 'no-store' });
  if (response.status !== 403) failures.push(`/api/admin/overview: unauthenticated request expected 403, got ${response.status}`);
  else console.log('PASS admin overview protected');
} catch (error) {
  failures.push(`admin protection: ${error instanceof Error ? error.message : String(error)}`);
}

try {
  const response = await fetch(baseUrl + '/api/certification/status', { cache: 'no-store' });
  const data = await response.json();
  if (!response.ok) failures.push(`/api/certification/status: HTTP ${response.status}`);
  else if (data?.readiness?.enabled !== false) failures.push('/api/certification/status: certification must remain closed in ungated QA environment');
  else if (data?.readiness?.bankReady !== false) failures.push('/api/certification/status: candidate bank must not report ready');
  else console.log('PASS certification release gates closed');
} catch (error) {
  failures.push(`certification status: ${error instanceof Error ? error.message : String(error)}`);
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
  console.error('\nRelease QA failures:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`\nRelease QA passed: ${checkedPages} pages checked. Slowest page: ${slowest.path} ${slowest.ms}ms.`);
