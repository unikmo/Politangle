import assert from 'node:assert/strict';
import test from 'node:test';
import {
  answerQuestion,
  calculateQuickResult,
  completeSession,
  createQuickSession,
  displayedToStoredAnswer,
  getDisplayedQuestion,
  getProgress,
  parseStoredSession,
  shuffledQuestionIds,
  storedToDisplayedAnswer,
  validateQuestionBank,
} from './engine';
import { quickQuestions, type AnswerValue } from './questions';

function answersForPole(pole: 'negative' | 'positive') {
  const answers: Record<number, AnswerValue> = {};
  for (const question of quickQuestions) answers[question.id] = pole === 'negative' ? -2 : 2;
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
    assert.equal(negative.scores[dimension].interpretable, true);
    assert.equal(positive.scores[dimension].interpretable, true);
  }
});

test('a genuine midpoint remains a scored midpoint rather than being treated as unsure', () => {
  const answers: Record<number, AnswerValue> = {};
  for (const question of quickQuestions) answers[question.id] = 0;
  const result = calculateQuickResult(answers);

  for (const dimension of ['economy', 'society', 'power', 'world'] as const) {
    assert.equal(result.scores[dimension].score, 50);
    assert.equal(result.scores[dimension].coverage, 100);
    assert.equal(result.scores[dimension].unsure, 0);
    assert.equal(result.scores[dimension].interpretable, true);
  }
});

test('not-sure answers are excluded from scoring and reduce coverage', () => {
  const answers: Record<number, AnswerValue> = {};
  for (const question of quickQuestions) answers[question.id] = 'unsure';

  const economy = quickQuestions.find((question) => question.dimension === 'economy')!;
  answers[economy.id] = -2;

  const result = calculateQuickResult(answers);
  assert.equal(result.scores.economy.score, 0);
  assert.equal(result.scores.economy.answered, 1);
  assert.equal(result.scores.economy.unsure, 6);
  assert.equal(result.scores.economy.coverage, 14);
  assert.equal(result.scores.economy.interpretable, false);
  assert.equal(result.scores.economy.label, 'Low coverage — insufficient signal');
});

test('all not-sure answers return insufficient signal rather than a fake midpoint', () => {
  const answers: Record<number, AnswerValue> = {};
  for (const question of quickQuestions) answers[question.id] = 'unsure';
  const result = calculateQuickResult(answers);

  for (const dimension of ['economy', 'society', 'power', 'world'] as const) {
    assert.equal(result.scores[dimension].score, null);
    assert.equal(result.scores[dimension].label, 'Insufficient signal');
    assert.equal(result.scores[dimension].coverage, 0);
    assert.equal(result.scores[dimension].interpretable, false);
  }
});

test('pole display flipping reverses scored answers but not midpoint or unsure', () => {
  const session = createQuickSession('display-test');
  const question = quickQuestions[0];
  const displayed = getDisplayedQuestion(session, question);

  assert.equal(displayedToStoredAnswer(-2, displayed.flipped), displayed.flipped ? 2 : -2);
  assert.equal(storedToDisplayedAnswer(2, displayed.flipped), displayed.flipped ? -2 : 2);
  assert.equal(displayedToStoredAnswer(0, displayed.flipped), 0);
  assert.equal(displayedToStoredAnswer('unsure', displayed.flipped), 'unsure');
});

test('session persists deterministic order and valid answers', () => {
  let session = createQuickSession('session-1', '2026-09-07T00:00:00.000Z');
  session = answerQuestion(session, session.order[0], 2);
  const restored = parseStoredSession(JSON.stringify(session));
  assert.deepEqual(restored, session);
  assert.equal(getProgress(session.answers).answeredCount, 1);
});

test('completed session requires all 26 responses including explicit unsure', () => {
  let session = createQuickSession('session-2');
  assert.throws(() => completeSession(session));

  for (const question of quickQuestions) session = answerQuestion(session, question.id, 'unsure');
  assert.equal(getProgress(session.answers).complete, true);
  assert.doesNotThrow(() => completeSession(session));
});
