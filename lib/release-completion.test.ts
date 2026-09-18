import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

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


test('first four country perspectives have native DE ES FR routes without machine fallback', () => {
  for (const slug of ['united-states','germany','france','united-kingdom']) assert.match(countryLocalization, new RegExp(slug));
  assert.match(countryLocalization, /Vereinigte Staaten/);
  assert.match(countryLocalization, /Estados Unidos/);
  assert.match(countryLocalization, /États-Unis/);
  assert.match(localizedCountryRoute, /localizeCountryProfile/);
  assert.match(localizedCountryRoute, /hreflang|languages:/);
  assert.match(siteChrome, /href\('\/countries'\)/);
});
