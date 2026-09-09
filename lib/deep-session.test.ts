import assert from 'node:assert/strict';
import test from 'node:test';
import {
  answerDeepBelief,
  answerDeepLiteracy,
  completeDeepSession,
  createDeepSession,
  deepOverallProgress,
  displayedToStoredDeepAnswer,
  isDeepPoleFlipped,
  parseStoredDeepSession,
  storedToDisplayedDeepAnswer,
} from './deep-session';
import { allDeepBeliefQuestions, deepLiteracyQuestions } from './deep-bank';

test('Deep session ordering is deterministic and complete for a seed', () => {
  const a = createDeepSession(123, '2026-09-07T00:00:00.000Z');
  const b = createDeepSession(123, '2026-09-07T00:00:00.000Z');
  assert.deepEqual(a.beliefOrder, b.beliefOrder);
  assert.deepEqual(a.classifyOrder, b.classifyOrder);
  assert.deepEqual(a.understandOrder, b.understandOrder);
  assert.equal(new Set(a.beliefOrder).size, allDeepBeliefQuestions.length);
  assert.equal(new Set([...a.classifyOrder, ...a.understandOrder]).size, deepLiteracyQuestions.length);
});

test('Deep pole flipping preserves semantic scores', () => {
  const flipped = isDeepPoleFlipped(456, 'B1');
  const stored = displayedToStoredDeepAnswer(-2, flipped);
  assert.equal(storedToDisplayedDeepAnswer(stored, flipped), -2);
  assert.equal(displayedToStoredDeepAnswer(0, flipped), 0);
  assert.equal(displayedToStoredDeepAnswer('unsure', flipped), 'unsure');
});

test('Deep completion requires every belief and literacy response', () => {
  let session = createDeepSession(789);
  assert.throws(() => completeDeepSession(session));

  for (const question of allDeepBeliefQuestions) session = answerDeepBelief(session, question.id, 0);
  for (const question of deepLiteracyQuestions) session = answerDeepLiteracy(session, question.id, [question.acceptedAnswerSets[0][0]]);

  assert.equal(deepOverallProgress(session).complete, true);
  assert.doesNotThrow(() => completeDeepSession(session));
});

test('Deep session round-trips through safe parser', () => {
  let session = createDeepSession(999, '2026-09-07T00:00:00.000Z');
  session = answerDeepBelief(session, session.beliefOrder[0], 'unsure');
  const restored = parseStoredDeepSession(JSON.stringify(session));
  assert.deepEqual(restored, session);
});

test('Deep parser rejects outdated schema', () => {
  const session = createDeepSession(999);
  const invalid = JSON.stringify({ ...session, schemaVersion: 999 });
  assert.equal(parseStoredDeepSession(invalid), null);
});
