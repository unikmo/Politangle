import assert from 'node:assert/strict';
import test from 'node:test';
import {
  SCHOOL_PACK_LICENSES,
  SCHOOL_PACK_PRICE_USD,
  createSchoolLicensePack,
  isSchoolTeacherLicenseRecord,
  normalizeSchoolLicenseKey,
  schoolLicenseAllowsSession,
  schoolLicenseDocumentId,
} from './school-license';

function deterministicKey(index: number) {
  return `POL-EDU-${index.toString(16).padStart(36, '0')}`;
}

test('school teacher license keys normalize and hash deterministically', () => {
  const key = 'POL-EDU-00112233445566778899AABBCCDDEEFF0011';
  assert.equal(normalizeSchoolLicenseKey(`  ${key.toLowerCase()}  `), key);
  assert.equal(schoolLicenseDocumentId(key), schoolLicenseDocumentId(key.toLowerCase()));
  assert.equal(schoolLicenseDocumentId('short'), '');
});

test('school pack creates exactly ten distinct teacher licenses for $300', () => {
  let counter = 0;
  const pack = createSchoolLicensePack('north-high', 'North High School', '2026-09-08T16:00:00.000Z', () => deterministicKey(++counter));
  assert.equal(pack.packagePriceUsd, SCHOOL_PACK_PRICE_USD);
  assert.equal(pack.teacherLicenseCount, SCHOOL_PACK_LICENSES);
  assert.equal(pack.seats.length, 10);
  assert.equal(new Set(pack.seats.map((seat) => seat.key)).size, 10);
  assert.equal(new Set(pack.seats.map((seat) => seat.documentId)).size, 10);
  assert.equal('key' in pack.seats[0].record, false);
});

test('teacher license records are valid without storing the raw credential', () => {
  let counter = 0;
  const pack = createSchoolLicensePack('north-high', 'North High School', undefined, () => deterministicKey(++counter));
  assert.equal(isSchoolTeacherLicenseRecord(pack.seats[0].record), true);
  assert.equal(schoolLicenseAllowsSession(pack.seats[0].record), true);
  assert.equal(schoolLicenseAllowsSession({ ...pack.seats[0].record, status: 'revoked' }), false);
});

test('school pack rejects duplicate teacher credentials', () => {
  assert.throws(() => createSchoolLicensePack('north-high', 'North High School', undefined, () => 'POL-EDU-00112233445566778899AABBCCDDEEFF0011'), /duplicate/i);
});
