import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildEditorialReviewLedger,
  questionsReadyForExternalReview,
  validateEditorialReviewLedger,
} from './literacy-editorial-review';
import { literacyMasterBankCandidates } from './literacy-master-bank';

test('every candidate has a current explicit editorial review entry', () => {
  const ledger = buildEditorialReviewLedger(literacyMasterBankCandidates);
  assert.equal(ledger.length, 80);
  assert.deepEqual(validateEditorialReviewLedger(literacyMasterBankCandidates, ledger), { valid: true, errors: [] });
});

test('a wording change invalidates the pinned editorial review', () => {
  const ledger = buildEditorialReviewLedger(literacyMasterBankCandidates);
  const changed = literacyMasterBankCandidates.map((question) => question.id === 'C1' ? { ...question, prompt: `${question.prompt} Changed.` } : question);
  const validation = validateEditorialReviewLedger(changed, ledger);
  assert.equal(validation.valid, false);
  assert.match(validation.errors.join(' '), /C1 changed after editorial review/);
});

test('contested C36 remains outside the external-review-ready set', () => {
  const ledger = buildEditorialReviewLedger(literacyMasterBankCandidates);
  const ready = questionsReadyForExternalReview(literacyMasterBankCandidates, ledger);
  assert.equal(ready.length, 79);
  assert.equal(ready.some((question) => question.id === 'C36'), false);
});

test('editorial review never changes candidate questions to validated', () => {
  assert.equal(literacyMasterBankCandidates.every((question) => question.status === 'candidate'), true);
});
