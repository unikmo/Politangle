import assert from 'node:assert/strict';
import test from 'node:test';
import { deepLiteracyQuestions } from './deep-bank';
import {
  answerLiteracy,
  completeLiteracySession,
  createLiteracySession,
  literacyPhaseProgress,
  parseLiteracySession,
  revealLiteracyAnswer,
} from './literacy-session';

test('literacy training keeps nine CLASSIFY and six UNDERSTAND questions', () => {
  const session = createLiteracySession('literacy-count');
  assert.equal(session.classifyOrder.length, 9);
  assert.equal(session.understandOrder.length, 6);
  assert.equal(new Set([...session.classifyOrder, ...session.understandOrder]).size, 15);
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

test('literacy training round-trips and completion requires all checked questions', () => {
  let session = createLiteracySession('literacy-complete');
  assert.throws(() => completeLiteracySession(session));
  for (const id of [...session.classifyOrder, ...session.understandOrder]) {
    const question = deepLiteracyQuestions.find((item) => item.id === id)!;
    session = answerLiteracy(session, id, [question.acceptedAnswerSets[0][0]]);
    session = revealLiteracyAnswer(session, id);
  }
  const completed = completeLiteracySession(session, '2026-09-07T16:00:00.000Z');
  assert.ok(completed.completedAt);
  assert.deepEqual(parseLiteracySession(JSON.stringify(completed)), completed);
});
