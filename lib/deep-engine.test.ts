import assert from 'node:assert/strict';
import test from 'node:test';
import {
  calculateDeepLiteracyResult,
  scoreLiteracyItem,
  validateLiteracyQuestion,
  type LiteracyQuestion,
} from './deep-engine';

const classify: LiteracyQuestion = {
  id: 'C1',
  section: 'classify',
  prompt: 'Synthetic classification fixture',
  optionIds: ['a', 'b', 'c', 'insufficient'],
  acceptedAnswerSets: [['a', 'b'], ['insufficient']],
};

const understand: LiteracyQuestion = {
  id: 'U1',
  section: 'understand',
  prompt: 'Synthetic understanding fixture',
  optionIds: ['x', 'y', 'z'],
  acceptedAnswerSets: [['y']],
};

test('literacy question validation passes for multiple defensible answer sets', () => {
  assert.deepEqual(validateLiteracyQuestion(classify), { valid: true, errors: [] });
});

test('classification accepts exact sets regardless of selection order', () => {
  assert.equal(scoreLiteracyItem(classify, ['b', 'a']).correct, true);
  assert.equal(scoreLiteracyItem(classify, ['insufficient']).correct, true);
  assert.equal(scoreLiteracyItem(classify, ['a']).correct, false);
});

test('unknown selected options cannot score as correct', () => {
  assert.equal(scoreLiteracyItem(classify, ['unknown']).correct, false);
});

test('Deep literacy reports classify and understand separately', () => {
  const result = calculateDeepLiteracyResult(
    [classify, understand],
    { C1: ['a', 'b'], U1: ['x'] },
    '2026-09-07T00:00:00.000Z',
  );

  assert.equal(result.complete, true);
  assert.equal(result.sections.classify.percent, 100);
  assert.equal(result.sections.understand.percent, 0);
  assert.equal(result.overall.percent, 50);
});

test('unanswered literacy items reduce coverage and do not receive credit', () => {
  const result = calculateDeepLiteracyResult([classify, understand], { C1: ['insufficient'] });
  assert.equal(result.complete, false);
  assert.equal(result.overall.correct, 1);
  assert.equal(result.overall.coverage, 50);
  assert.equal(result.overall.percent, 50);
});
