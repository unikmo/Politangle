import assert from 'node:assert/strict';
import test from 'node:test';
import { certificateExpiryDate, certifiedAttemptWindow, evaluateCertification } from './literacy-certification';

test('certificate requires 23 of 25 independently in both sections', () => {
  assert.equal(evaluateCertification(23, 23).passed, true);
  assert.equal(evaluateCertification(25, 22).passed, false);
  assert.equal(evaluateCertification(22, 25).passed, false);
  assert.deepEqual(evaluateCertification(25, 22), {
    passed: false,
    classifyPassed: true,
    understandPassed: false,
    classify: { correct: 25, total: 25 },
    understand: { correct: 22, total: 25 },
  });
});

test('certification rejects impossible section scores', () => {
  assert.throws(() => evaluateCertification(-1, 23));
  assert.throws(() => evaluateCertification(23, 26));
  assert.throws(() => evaluateCertification(22.5, 23));
});

test('rolling window permits at most two certified attempts in 24 hours', () => {
  const now = new Date('2026-09-13T12:00:00.000Z');
  assert.deepEqual(certifiedAttemptWindow([], now), { allowed: true, attemptsInWindow: 0, remaining: 2 });
  assert.deepEqual(certifiedAttemptWindow(['2026-09-13T01:00:00.000Z'], now), { allowed: true, attemptsInWindow: 1, remaining: 1 });
  assert.deepEqual(
    certifiedAttemptWindow(['2026-09-12T13:00:00.000Z', '2026-09-13T01:00:00.000Z'], now),
    { allowed: false, attemptsInWindow: 2, remaining: 0, nextEligibleAt: '2026-09-13T13:00:00.000Z' },
  );
  assert.equal(certifiedAttemptWindow(['2026-09-12T12:00:00.000Z', '2026-09-13T01:00:00.000Z'], now).allowed, true);
});

test('certificate expiry is exactly two calendar years after issue', () => {
  assert.equal(certificateExpiryDate('2026-09-13T10:30:00.000Z'), '2028-09-13T10:30:00.000Z');
  assert.equal(certificateExpiryDate('2024-02-29T10:30:00.000Z'), '2026-02-28T10:30:00.000Z');
});
