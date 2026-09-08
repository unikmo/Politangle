import assert from 'node:assert/strict';
import test from 'node:test';
import { schoolBaselineQuestions } from './school-literacy';
import {
  applySchoolAggregate,
  createSchoolClassRecord,
  hashSchoolSecret,
  publicSchoolClassSummary,
  teacherSchoolClassSummary,
  validateSchoolAggregatePayload,
  verifyTeacherKey,
} from './school-aggregate';

test('school class record hashes teacher access and never exposes it in summaries', () => {
  const key = 'teacher-secret-123';
  const record = createSchoolClassRecord('ABC234', hashSchoolSecret(key), '2026-09-08T00:00:00.000Z');
  assert.equal(verifyTeacherKey(record, key), true);
  assert.equal(verifyTeacherKey(record, 'wrong'), false);
  assert.equal('teacherKeyHash' in publicSchoolClassSummary(record), false);
  assert.equal('teacherKeyHash' in teacherSchoolClassSummary(record), false);
});

test('school aggregate accepts complete correctness-only literacy submissions', () => {
  const payload = validateSchoolAggregatePayload({
    participantToken: 'participant-123456',
    phase: 'baseline',
    results: schoolBaselineQuestions.map((question) => ({ questionId: question.id, section: question.section, correct: true })),
  });
  assert.ok(payload);
  assert.equal(payload?.results?.length, 15);

  const record = createSchoolClassRecord('ABC234', hashSchoolSecret('teacher'));
  const next = applySchoolAggregate(record, payload!);
  assert.equal(next.baseline.submissions, 1);
  assert.equal(next.baseline.correct, 15);
  assert.equal(next.baseline.answered, 15);
});

test('school aggregate rejects partial or malformed submissions', () => {
  assert.equal(validateSchoolAggregatePayload({ participantToken: 'participant-123456', phase: 'baseline', results: [] }), null);
  assert.equal(validateSchoolAggregatePayload({ participantToken: 'short', phase: 'practice' }), null);
  assert.equal(validateSchoolAggregatePayload({ participantToken: 'participant-123456', phase: 'belief', results: [] }), null);
});

test('teacher question-level analytics stay hidden below the minimum aggregation threshold', () => {
  let record = createSchoolClassRecord('ABC234', hashSchoolSecret('teacher'));
  const payload = validateSchoolAggregatePayload({
    participantToken: 'participant-123456',
    phase: 'baseline',
    results: schoolBaselineQuestions.map((question) => ({ questionId: question.id, section: question.section, correct: true })),
  })!;
  record = applySchoolAggregate(record, payload);
  const summary = teacherSchoolClassSummary(record);
  assert.equal(summary.baseline.detailedAvailable, false);
  assert.equal(summary.baseline.questions, null);
  assert.deepEqual(summary.privacy, {
    individualStudentsVisible: false,
    rawLiteracyAnswersStored: false,
    politicalBeliefAnswersAccepted: false,
  });
});

test('practice aggregation stores completion count only', () => {
  const record = createSchoolClassRecord('ABC234', hashSchoolSecret('teacher'));
  const payload = validateSchoolAggregatePayload({ participantToken: 'participant-123456', phase: 'practice' })!;
  const next = applySchoolAggregate(record, payload);
  assert.equal(next.practiceCompletions, 1);
  assert.equal(next.baseline.submissions, 0);
  assert.equal(next.post.submissions, 0);
});
