import assert from 'node:assert/strict';
import test from 'node:test';
import { POLITANGLE_PRODUCT_DECISIONS } from './product-decisions';

test('consequential literacy and certification decisions remain locked', () => {
  const { literacy, schoolAgeBands, countries } = POLITANGLE_PRODUCT_DECISIONS;
  assert.deepEqual(schoolAgeBands, { junior: { min: 10, max: 13 }, youth: { min: 14, max: 18 } });
  assert.equal(literacy.masterBankSizePerSection, 40);
  assert.equal(literacy.servedQuestionsPerSection, 25);
  assert.equal(literacy.passingAnswersPerSection, 23);
  assert.deepEqual(literacy.certifiedAttempts, { maximum: 2, rollingWindowHours: 24 });
  assert.equal(literacy.certificationMinimumAge, 18);
  assert.equal(literacy.initialCertificationLanguage, 'en');
  assert.equal(literacy.certificateValidityYears, 2);
  assert.equal(literacy.practiceIsFree, true);
  assert.equal(literacy.certifiedAttemptsAreFree, true);
  assert.deepEqual(literacy.pricesEur, { launchIssuance: 9.9, standardIssuance: 16.99, renewal: 13.9 });
  assert.deepEqual(countries.templateProfiles, ['US', 'DE', 'FR', 'GB']);
  assert.deepEqual(countries.initialProfiles, ['US', 'DE', 'FR', 'GB', 'NL', 'DK', 'FI', 'IS', 'NO', 'SE']);
});
