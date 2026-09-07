import assert from 'node:assert/strict';
import test from 'node:test';
import {
  calculateDeepBeliefResult,
  calculateDeepLiteracyResult,
  scoreLiteracyItem,
  validateLiteracyQuestion,
  type DeepBeliefQuestion,
  type LiteracyQuestion,
} from './deep-engine';

const classify: LiteracyQuestion = {
  id: 'C1',
  section: 'classify',
  prompt: 'Synthetic classification fixture',
  options: [
    { id: 'a', label: 'A' },
    { id: 'b', label: 'B' },
    { id: 'c', label: 'C' },
    { id: 'insufficient', label: 'Insufficient information' },
  ],
  acceptedAnswerSets: [['a', 'b'], ['insufficient']],
  explanation: 'Synthetic explanation.',
  evidenceIds: ['TEST-SOURCE'],
  multiSelect: true,
};

const understand: LiteracyQuestion = {
  id: 'U1',
  section: 'understand',
  prompt: 'Synthetic understanding fixture',
  options: [
    { id: 'x', label: 'X' },
    { id: 'y', label: 'Y' },
    { id: 'z', label: 'Z' },
  ],
  acceptedAnswerSets: [['y']],
  explanation: 'Synthetic explanation.',
  evidenceIds: ['TEST-SOURCE'],
};

const beliefQuestions: readonly DeepBeliefQuestion[] = [
  { id: 'B1', section: 'believe', axis: 'populism', construct: 'fixture one', negative: 'Plural view', positive: 'Populist view', evidenceIds: ['TEST-SOURCE'] },
  { id: 'B2', section: 'believe', axis: 'populism', construct: 'fixture two', negative: 'Compromise view', positive: 'General-will view', evidenceIds: ['TEST-SOURCE'] },
];

test('literacy question validation passes for multiple defensible answer sets', () => {
  assert.deepEqual(validateLiteracyQuestion(classify), { valid: true, errors: [] });
});

test('classification accepts exact sets regardless of selection order', () => {
  assert.equal(scoreLiteracyItem(classify, ['b', 'a']).correct, true);
  assert.equal(scoreLiteracyItem(classify, ['insufficient']).correct, true);
  assert.equal(scoreLiteracyItem(classify, ['a']).correct, false);
});

test('single-select literacy questions reject multi-option answers', () => {
  assert.equal(scoreLiteracyItem(understand, ['y', 'x']).correct, false);
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

test('Deep belief midpoint is scored while unsure is excluded', () => {
  const midpoint = calculateDeepBeliefResult(beliefQuestions, { B1: 0, B2: 0 });
  assert.equal(midpoint.axes.populism.score, 50);
  assert.equal(midpoint.axes.populism.coverage, 100);
  assert.equal(midpoint.axes.populism.interpretable, true);

  const unsure = calculateDeepBeliefResult(beliefQuestions, { B1: 'unsure', B2: 'unsure' });
  assert.equal(unsure.axes.populism.score, null);
  assert.equal(unsure.axes.populism.coverage, 0);
  assert.equal(unsure.axes.populism.interpretable, false);
});
