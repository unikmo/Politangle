import assert from 'node:assert/strict';

const base = (process.env.LIVE_BASE_URL || 'https://politangle.org').replace(/\/$/, '');
const expectedCommit = process.env.EXPECTED_COMMIT_SHA || '';
const expectedVersion = 'belief-2026.10-v7-populism-quick26-full84';
const maxAttempts = Number(process.env.LIVE_VERIFY_ATTEMPTS || 36);
const pauseMs = Number(process.env.LIVE_VERIFY_INTERVAL_MS || 15000);

function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
async function get(relative) {
  const url = base + relative + (relative.includes('?') ? '&' : '?') + '_qa=' + Date.now();
  const response = await fetch(url, { redirect: 'follow', headers: { 'Cache-Control': 'no-cache', 'User-Agent': 'PolitangleReleaseQA/1.0' }, signal: AbortSignal.timeout(17000) });
  const body = await response.text();
  return { status: response.status, body, url: response.url };
}

let release;
for (let attempt = 1; attempt <= maxAttempts; attempt++) {
  try {
    const r = await get('/api/release-status');
    const doc = r.status === 200 ? JSON.parse(r.body) : null;
    if (doc?.product === 'politangle' &&
        doc.beliefVersion === expectedVersion &&
        doc.populismModel === 'three-component-minimum-v1' &&
        doc.countryComparison?.enabled === true &&
        doc.countryComparison.maxCountries === 3 &&
        (!expectedCommit || !doc.commit || doc.commit === expectedCommit)) {
      release = doc;
      console.log('PASS live release identity:', JSON.stringify(release));
      if (!doc.commit) console.log('WARN: Hosting did not expose a Git SHA; verified feature/version markers instead.');
      break;
    }
    console.log('Release attempt', attempt, '/', maxAttempts, 'HTTP', r.status, 'version=', doc?.beliefVersion || 'missing', 'commit=', doc?.commit || 'missing');
  } catch(error) {
    console.log('Release attempt', attempt, '/', maxAttempts, String(error).slice(0,180));
  }
  if (attempt < maxAttempts) await delay(pauseMs);
}
assert(release, 'Live domain is NOT VERIFIED to serve the corrected scoring + three-country build.');

for (const [route, text] of [
  ['/', 'Politangle'],
  ['/quiz', 'Politangle'],
  ['/results', 'Politangle'],
  ['/countries/germany', 'Germany'],
  ['/de/countries/germany/3', 'Bundesländer'],
  ['/de/countries/germany/parties/afd', 'AfD'],
]) {
  const response = await get(route);
  assert.equal(response.status, 200, route + ' HTTP ' + response.status);
  assert(response.body.toLowerCase().includes(text.toLowerCase()), route + ' missing text: ' + text);
  console.log('PASS live route', route, response.status, response.url);
}
for (const route of ['/countries/germany/0', '/de/countries/germany/99']) {
  const response = await get(route);
  assert.equal(response.status, 404, route + ' should be 404 (actual ' + response.status + ')');
  console.log('PASS invalid route', route);
}
console.log('LIVE RELEASE VERIFIED',base,release.commit ?? '(no commit SHA surfaced)');
