import assert from 'node:assert/strict';
import test from 'node:test';
import { deepLiteracyQuestions } from './deep-bank';
import {
  answerLiteracy,
  completeLiteracySession,
  createLiteracySession,
  literacyOptionOrder,
  literacyPhaseProgress,
  parseLiteracySession,
  revealLiteracyAnswer,
} from './literacy-session';

test('CLASSIFY and UNDERSTAND each keep 20 independent questions', () => {
  const session = createLiteracySession('literacy-count');
  assert.equal(session.classifyOrder.length, 20);
  assert.equal(session.understandOrder.length, 20);
  assert.equal(new Set([...session.classifyOrder, ...session.understandOrder]).size, 40);
});

test('literacy option order is deterministic within a session and shuffled by session seed', () => {
  const first = createLiteracySession('options-a');
  const second = createLiteracySession('options-b');
  let changed = false;
  for (const question of deepLiteracyQuestions) {
    const a1 = literacyOptionOrder(first, question.id);
    const a2 = literacyOptionOrder(first, question.id);
    const b = literacyOptionOrder(second, question.id);
    assert.deepEqual(a1, a2);
    assert.deepEqual(new Set(a1), new Set(question.options.map((option) => option.id)));
    if (a1.join('|') !== b.join('|')) changed = true;
  }
  assert.equal(changed, true);
});

test('literacy training requires checking an answer before a question is complete', () => {
  let session = createLiteracySession('literacy-check');
  const id = session.classifyOrder[0];
  const question = deepLiteracyQuestions.find((item) => item.id === id)!;
  session = answerLiteracy(session, id, [question.options[0].id]);
  assert.equal(literacyPhaseProgress(session, 'classify').answered, 1);
  assert.equal(literacyPhaseProgress(session, 'classify').checked, 0);
  session = revealLiteracyAnswer(session, id);
  assert.equal(literacyPhaseProgress(session, 'classify').checked, 1);
});

test('checked literacy answers are locked against post-feedback changes', () => {
  let session = createLiteracySession('literacy-lock');
  const id = session.classifyOrder[0];
  const question = deepLiteracyQuestions.find((item) => item.id === id)!;
  session = answerLiteracy(session, id, [question.options[0].id]);
  session = revealLiteracyAnswer(session, id);
  const locked = answerLiteracy(session, id, [question.options[1].id]);
  assert.deepEqual(locked.answers[id], session.answers[id]);
});

test('literacy training round-trips and completion requires both independent quizzes to be complete', () => {
  let session = createLiteracySession('literacy-complete');
  assert.throws(() => completeLiteracySession(session));
  for (const id of [...session.classifyOrder, ...session.understandOrder]) {
    const question = deepLiteracyQuestions.find((item) => item.id === id)!;
    session = answerLiteracy(session, id, [question.acceptedAnswerSets[0][0]]);
    session = revealLiteracyAnswer(session, id);
  }
  const completed = completeLiteracySession(session, '2026-09-10T16:00:00.000Z');
  assert.ok(completed.completedAt);
  assert.deepEqual(parseLiteracySession(JSON.stringify(completed)), completed);
});
