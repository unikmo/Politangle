import assert from 'node:assert/strict';
import test from 'node:test';
import {
  answerQuestion,
  calculateQuickResult,
  completeSession,
  createQuickSession,
  getProgress,
  parseStoredSession,
  shuffledQuestionIds,
  validateQuestionBank,
} from './engine';
import { quickQuestions, type AnswerValue } from './questions';

function answersForPole(pole: 'negative' | 'positive') {
  const answers: Record<number, AnswerValue> = {};
  for (const question of quickQuestions) {
    const aligned = pole === 'negative' ? -question.direction : question.direction;
    answers[question.id] = (aligned * 2) as AnswerValue;
  }
  return answers;
}

test('question bank integrity passes', () => {
  assert.deepEqual(validateQuestionBank(), { valid: true, errors: [] });
});

test('shuffle is deterministic for the same seed and changes across seeds', () => {
  assert.deepEqual(shuffledQuestionIds('abc'), shuffledQuestionIds('abc'));
  assert.notDeepEqual(shuffledQuestionIds('abc'), shuffledQuestionIds('xyz'));
  assert.equal(new Set(shuffledQuestionIds('abc')).size, 26);
});

test('negative-pole answers score 0 and positive-pole answers score 100', () => {
  const negative = calculateQuickResult(answersForPole('negative'), '2026-09-07T00:00:00.000Z');
  const positive = calculateQuickResult(answersForPole('positive'), '2026-09-07T00:00:00.000Z');

  for (const dimension of ['economy', 'society', 'power', 'world'] as const) {
    assert.equal(negative.scores[dimension].score, 0);
    assert.equal(positive.scores[dimension].score, 100);
    assert.equal(negative.scores[dimension].coverage, 100);
    assert.equal(positive.scores[dimension].coverage, 100);
  }
});

test('not-sure answers do not pull a score toward the midpoint', () => {
  const answers: Record<number, AnswerValue> = {};
  for (const question of quickQuestions) answers[question.id] = 0;

  const economy = quickQuestions.find((question) => question.dimension === 'economy')!;
  answers[economy.id] = (economy.direction === -1 ? 2 : -2) as AnswerValue;

  const result = calculateQuickResult(answers);
  assert.equal(result.scores.economy.score, 0);
  assert.equal(result.scores.economy.answered, 1);
  assert.equal(result.scores.economy.unsure, 6);
  assert.equal(result.scores.economy.coverage, 14);
});

test('all not-sure answers return insufficient signal rather than a fake 50 score', () => {
  const answers: Record<number, AnswerValue> = {};
  for (const question of quickQuestions) answers[question.id] = 0;
  const result = calculateQuickResult(answers);

  for (const dimension of ['economy', 'society', 'power', 'world'] as const) {
    assert.equal(result.scores[dimension].score, null);
    assert.equal(result.scores[dimension].label, 'Insufficient signal');
    assert.equal(result.scores[dimension].coverage, 0);
  }
});

test('session persists deterministic order and valid answers', () => {
  let session = createQuickSession('session-1', '2026-09-07T00:00:00.000Z');
  session = answerQuestion(session, session.order[0], 2);
  const restored = parseStoredSession(JSON.stringify(session));
  assert.deepEqual(restored, session);
  assert.equal(getProgress(session.answers).answeredCount, 1);
});

test('completed session requires all 26 responses including explicit not-sure', () => {
  let session = createQuickSession('session-2');
  assert.throws(() => completeSession(session));

  for (const question of quickQuestions) session = answerQuestion(session, question.id, 0);
  assert.equal(getProgress(session.answers).complete, true);
  assert.doesNotThrow(() => completeSession(session));
});
