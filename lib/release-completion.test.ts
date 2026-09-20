import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { countryProfiles } from './countries';
import { nativeCountrySlugs } from './country-localization';

const root = process.cwd();
const reviewApi = readFileSync(join(root, 'app/api/admin/literacy-review/route.ts'), 'utf8');
const reviewUi = readFileSync(join(root, 'app/admin/review/LiteracyReviewClient.tsx'), 'utf8');
const validationWorkflow = readFileSync(join(root, 'docs/literacy-validation-workflow-v1.md'), 'utf8');
const certificationServer = readFileSync(join(root, 'lib/certification-server.ts'), 'utf8');
const bankSchema = readFileSync(join(root, 'lib/literacy-bank-schema.ts'), 'utf8');
const checkout = readFileSync(join(root, 'app/api/certificate/checkout/route.ts'), 'utf8');
const countryLocalization = readFileSync(join(root, 'lib/country-localization.ts'), 'utf8');
const localizedCountryRoute = readFileSync(join(root, 'app/[locale]/countries/[slug]/page.tsx'), 'utf8');
const siteChrome = readFileSync(join(root, 'app/SiteChrome.tsx'), 'utf8');
const countryGuide = readFileSync(join(root, 'app/countries/CountryGuide.tsx'), 'utf8');
const countryPattern = readFileSync(join(root, 'docs/country-perspective-pattern-v2.md'), 'utf8');
const legacyGlobalLabels = readFileSync(join(root, 'lib/country-global-labels-legacy.ts'), 'utf8');

test('founder review covers the exact current bank without silently validating it', () => {
  assert.match(reviewApi, /literacyMasterBankCandidates/);
  assert.match(reviewApi, /contentFingerprint/);
  assert.match(reviewApi, /approve/);
  assert.match(reviewApi, /revise/);
  assert.match(reviewApi, /replace/);
  assert.match(reviewApi, /hold/);
  assert.match(reviewUi, /does <strong>not<\/strong> mark a question validated/);
  assert.doesNotMatch(reviewApi, /status:\s*['"]validated['"]/);
});

test('deferred pilots do not open paid certification', () => {
  assert.match(validationWorkflow, /Certificate release rule while pilots are deferred/);
  assert.match(validationWorkflow, /Certified attempts remain closed/);
  assert.match(validationWorkflow, /No paid Political Literacy Certificate is issued/);
  assert.match(validationWorkflow, /CERTIFICATION_ENABLED.*remains false/);
  assert.match(certificationServer, /validateCertifiedMasterBank/);
  assert.match(bankSchema, /question\.section === section/);
  assert.match(bankSchema, /question\.status === 'validated'|status === 'validated'/);
});

test('certificate checkout remains independently gated by tax readiness and eligibility', () => {
  assert.match(checkout, /STRIPE_TAX_READY/);
  assert.match(checkout, /eligibility\.status !== 'eligible'/);
  assert.match(checkout, /VERIFICATION_ACKNOWLEDGEMENT_REQUIRED/);
});

test('validation workflow follows the 16+ certification policy', () => {
  assert.match(validationWorkflow, /English-speaking users aged 16\+/);
  assert.doesNotMatch(validationWorkflow, /English-speaking adults aged 18\+/);
});


test('all eighty country perspectives have native DE ES FR and pt-BR routes without machine fallback', () => {
  assert.equal(countryProfiles.length, 80);
  assert.equal(nativeCountrySlugs.length, 80);
  assert.deepEqual([...nativeCountrySlugs], countryProfiles.map((country) => country.slug));
  assert.match(countryLocalization, /deExpansion/);
  assert.match(countryLocalization, /esExpansion/);
  assert.match(countryLocalization, /frExpansion/);
  assert.match(countryLocalization, /ptBrWave3/);
  assert.match(countryLocalization, /deWave3/);
  assert.match(countryLocalization, /esWave3/);
  assert.match(countryLocalization, /frWave3/);
  assert.match(countryLocalization, /ptBrWave4/);
  assert.match(countryLocalization, /deWave4/);
  assert.match(countryLocalization, /esWave4/);
  assert.match(countryLocalization, /frWave4/);
  assert.match(countryLocalization, /Vereinigte Staaten/);
  assert.match(countryLocalization, /Estados Unidos/);
  assert.match(countryLocalization, /États-Unis/);
  assert.match(localizedCountryRoute, /localizeCountryProfile/);
  assert.match(localizedCountryRoute, /hreflang|languages:/);
  assert.match(siteChrome, /href\('\/countries'\)/);

});


test('country release pattern is aligned across the full eighty-country registry', () => {
  assert.equal(countryProfiles.length, 80);
  assert.ok(countryProfiles.every((country) => country.atAGlance.length >= 5));
  assert.ok(countryProfiles.every((country) => country.power.length === 3));
  assert.ok(countryProfiles.every((country) => country.vocabulary.length === 2));
  assert.ok(countryProfiles.every((country) => country.timeline.length >= 4));
  assert.ok(countryProfiles.every((country) => country.sources.length >= 2));
  assert.ok(countryProfiles.every((country) => country.globalLabels));
  assert.match(countryPattern, /same .*information architecture.*without becoming a generic template/is);
  assert.match(countryPattern, /strong.*partial.*limited/is);
  assert.match(legacyGlobalLabels, /united-states/);
  assert.match(legacyGlobalLabels, /serbia/);
});
