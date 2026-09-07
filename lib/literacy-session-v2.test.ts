import assert from 'node:assert/strict';
import test from 'node:test';
import { deepLiteracyQuestions } from './deep-bank';
import {
  answerLiteracyV2,
  completeLiteracySessionV2,
  createLiteracySessionV2,
  literacyOverallProgressV2,
  literacyPhaseProgressV2,
  parseLiteracySessionV2,
  revealLiteracyAnswerV2,
} from './literacy-session-v2';

test('literacy v2 preserves nine CLASSIFY and six UNDERSTAND items', () => {
  const session = createLiteracySessionV2('literacy');
  assert.equal(session.classifyOrder.length, 9);
  assert.equal(session.understandOrder.length, 6);
  assert.equal(new Set([...session.classifyOrder, ...session.understandOrder]).size, 15);
});

test('literacy v2 training completes only after all fifteen answers are checked', () => {
  let session = createLiteracySessionV2('complete');
  assert.throws(() => completeLiteracySessionV2(session));
  for (const question of deepLiteracyQuestions) {
    session = answerLiteracyV2(session, question.id, [question.options[0].id]);
    session = revealLiteracyAnswerV2(session, question.id);
  }
  assert.deepEqual(literacyOverallProgressV2(session), { answered: 15, checked: 15, total: 15, complete: true, percent: 100 });
  assert.doesNotThrow(() => completeLiteracySessionV2(session));
});

test('literacy phases remain separate from BELIEVE and require checking for progress', () => {
  let session = createLiteracySessionV2('phases');
  assert.deepEqual(literacyPhaseProgressV2(session, 'classify'), { answered: 0, checked: 0, total: 9, complete: false, percent: 0 });
  assert.deepEqual(literacyPhaseProgressV2(session, 'understand'), { answered: 0, checked: 0, total: 6, complete: false, percent: 0 });
  const id = session.classifyOrder[0];
  const question = deepLiteracyQuestions.find((item) => item.id === id)!;
  session = answerLiteracyV2(session, id, [question.options[0].id]);
  assert.equal(literacyPhaseProgressV2(session, 'classify').answered, 1);
  assert.equal(literacyPhaseProgressV2(session, 'classify').checked, 0);
  session = revealLiteracyAnswerV2(session, id);
  assert.equal(literacyPhaseProgressV2(session, 'classify').checked, 1);
});

test('checked training answers are locked against post-feedback changes', () => {
  let session = createLiteracySessionV2('lock');
  const id = session.classifyOrder[0];
  const question = deepLiteracyQuestions.find((item) => item.id === id)!;
  session = answerLiteracyV2(session, id, [question.options[0].id]);
  session = revealLiteracyAnswerV2(session, id);
  const attempted = answerLiteracyV2(session, id, [question.options[1].id]);
  assert.deepEqual(attempted.answers[id], session.answers[id]);
});

test('literacy session safely round-trips and rejects older schema', () => {
  let session = createLiteracySessionV2('parse', '2026-09-07T00:00:00.000Z');
  const question = deepLiteracyQuestions[0];
  session = answerLiteracyV2(session, question.id, [question.options[0].id]);
  session = revealLiteracyAnswerV2(session, question.id);
  assert.deepEqual(parseLiteracySessionV2(JSON.stringify(session)), session);
  assert.equal(parseLiteracySessionV2('{"schemaVersion":1}'), null);
});
