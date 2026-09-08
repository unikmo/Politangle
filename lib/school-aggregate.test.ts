import assert from 'node:assert/strict';
import test from 'node:test';
import { schoolBaselineQuestions, schoolPostQuestions } from './school-literacy';
import {
  applySchoolAggregate,
  createSchoolClassRecord,
  hashSchoolSecret,
  publicSchoolClassSummary,
  teacherSchoolClassSummary,
  validateSchoolAggregatePayload,
  verifyTeacherKey,
} from './school-aggregate';

function scoredPayload(phase: 'baseline' | 'post', participantToken = 'participant-123456') {
  const questions = phase === 'baseline' ? schoolBaselineQuestions : schoolPostQuestions;
  return validateSchoolAggregatePayload({
    participantToken,
    phase,
    results: questions.map((question) => ({ questionId: question.id, section: question.section, correct: true })),
  })!;
}

test('school class record hashes teacher access and never exposes it in summaries', () => {
  const key = 'teacher-secret-123';
  const record = createSchoolClassRecord('ABC234', hashSchoolSecret(key), '2026-09-08T00:00:00.000Z');
  assert.equal(verifyTeacherKey(record, key), true);
  assert.equal(verifyTeacherKey(record, 'wrong'), false);
  assert.equal('teacherKeyHash' in publicSchoolClassSummary(record), false);
  assert.equal('teacherKeyHash' in teacherSchoolClassSummary(record), false);
});

test('school aggregate accepts complete correctness-only literacy submissions', () => {
  const payload = scoredPayload('baseline');
  assert.equal(payload.results?.length, 15);

  const record = createSchoolClassRecord('ABC234', hashSchoolSecret('teacher'));
  const next = applySchoolAggregate(record, payload);
  assert.equal(next.baseline.submissions, 1);
  assert.equal(next.baseline.correct, 15);
  assert.equal(next.baseline.answered, 15);
});

test('school aggregate rejects partial or malformed submissions', () => {
  assert.equal(validateSchoolAggregatePayload({ participantToken: 'participant-123456', phase: 'baseline', results: [] }), null);
  assert.equal(validateSchoolAggregatePayload({ participantToken: 'short', phase: 'practice' }), null);
  assert.equal(validateSchoolAggregatePayload({ participantToken: 'participant-123456', phase: 'belief', results: [] }), null);
});

test('teacher sees completion count but no scores or question details below the privacy threshold', () => {
  let record = createSchoolClassRecord('ABC234', hashSchoolSecret('teacher'));
  record = applySchoolAggregate(record, scoredPayload('baseline'));
  const summary = teacherSchoolClassSummary(record);
  assert.equal(summary.baseline.submissions, 1);
  assert.equal(summary.baseline.overall, null);
  assert.equal(summary.baseline.classify, null);
  assert.equal(summary.baseline.understand, null);
  assert.equal(summary.baseline.detailedAvailable, false);
  assert.equal(summary.baseline.questions, null);
  assert.equal(summary.change, null);
  assert.deepEqual(summary.privacy, {
    individualStudentsVisible: false,
    rawLiteracyAnswersStored: false,
    politicalBeliefAnswersAccepted: false,
  });
});

test('class-average and question-level analytics unlock only at the minimum aggregation threshold', () => {
  let record = createSchoolClassRecord('ABC234', hashSchoolSecret('teacher'));
  for (let i = 0; i < record.minAggregateSize; i += 1) {
    record = applySchoolAggregate(record, scoredPayload('baseline', `participant-baseline-${i}`));
  }
  const summary = teacherSchoolClassSummary(record);
  assert.equal(summary.baseline.submissions, record.minAggregateSize);
  assert.equal(summary.baseline.overall, 100);
  assert.equal(summary.baseline.classify, 100);
  assert.equal(summary.baseline.understand, 100);
  assert.equal(summary.baseline.detailedAvailable, true);
  assert.ok(summary.baseline.questions);
  assert.equal(summary.baseline.questions?.C1.percent, 100);
});

test('baseline-to-post class change stays hidden until both phases reach threshold', () => {
  let record = createSchoolClassRecord('ABC234', hashSchoolSecret('teacher'));
  for (let i = 0; i < record.minAggregateSize; i += 1) {
    record = applySchoolAggregate(record, scoredPayload('baseline', `participant-baseline-${i}`));
  }
  record = applySchoolAggregate(record, scoredPayload('post', 'participant-post-one'));
  assert.equal(teacherSchoolClassSummary(record).change, null);

  for (let i = 1; i < record.minAggregateSize; i += 1) {
    record = applySchoolAggregate(record, scoredPayload('post', `participant-post-${i}`));
  }
  assert.equal(teacherSchoolClassSummary(record).change, 0);
});

test('practice aggregation stores completion count only', () => {
  const record = createSchoolClassRecord('ABC234', hashSchoolSecret('teacher'));
  const payload = validateSchoolAggregatePayload({ participantToken: 'participant-123456', phase: 'practice' })!;
  const next = applySchoolAggregate(record, payload);
  assert.equal(next.practiceCompletions, 1);
  assert.equal(next.baseline.submissions, 0);
  assert.equal(next.post.submissions, 0);
});
