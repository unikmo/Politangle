import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateDeepBeliefResult } from './deep-engine';
import { allDeepBeliefQuestions } from './deep-bank';
import { assessTradition, traditionProfiles } from './ideology-model';
import { calculateQuickResult, type Answers } from './engine';
import { quickQuestions, type AnswerValue } from './questions';

function profile(id: string) {
  const found = traditionProfiles.find((item) => item.id === id);
  assert.ok(found, `Missing profile ${id}`);
  return found;
}

function quickResult(values: Partial<Record<'economy' | 'society' | 'power' | 'world', -2 | -1 | 0 | 1 | 2>>) {
  const answers: Answers = {};
  for (const question of quickQuestions) answers[question.id] = values[question.dimension] ?? 0;
  return calculateQuickResult(answers, '2026-09-07T00:00:00.000Z');
}

function deepResult(values: Partial<Record<string, AnswerValue>>) {
  const answers: Record<string, AnswerValue> = {};
  for (const question of allDeepBeliefQuestions) answers[question.id] = values[question.axis] ?? 0;
  return calculateDeepBeliefResult(allDeepBeliefQuestions, answers, '2026-09-07T00:00:00.000Z');
}

test('context registry excludes headline-family and niche subtype duplication', () => {
  const ids = traditionProfiles.map((item) => item.id);
  for (const id of [
    'classical-liberalism',
    'social-liberalism',
    'libertarianism',
    'conservatism',
    'christian-democracy',
    'social-democracy',
    'democratic-socialism',
    'green-politics',
  ]) {
    assert.equal(ids.includes(id), false, `${id} should not be an active contextual compatibility profile`);
  }
});

test('nationalism and populism are modeled as cross-cutting, not left-right endpoints', () => {
  assert.equal(profile('nationalism').kind, 'cross-cutting');
  assert.equal(profile('populism').kind, 'cross-cutting');
});

test('Quick alone cannot classify the populist radical-right pattern', () => {
  const quick = quickResult({ economy: 2, society: 2, power: 2, world: 2 });
  const assessment = assessTradition(profile('populist-radical-right-pattern'), { quick });
  assert.equal(assessment.status, 'insufficient');
  assert.ok(assessment.unknown.some((item) => item.axis === 'nativism'));
  assert.ok(assessment.unknown.some((item) => item.axis === 'populism'));
});

test('ordinary right/conservative Quick answers cannot trigger fascist or extreme-right compatibility', () => {
  const quick = quickResult({ economy: 2, society: 2, power: 1, world: 2 });
  const assessment = assessTradition(profile('fascist-extreme-right-pattern'), { quick });
  assert.equal(assessment.status, 'insufficient');
  assert.ok(assessment.missingExplicitSignals.includes('ultranationalist-state-project'));
});

test('communism is never inferred from welfare-state or social-ownership answers alone', () => {
  const quick = quickResult({ economy: -2, society: 0, power: 0, world: 0 });
  const deep = deepResult({ ownership: -2, pluralism: -2, democracyRejection: -2 });
  const assessment = assessTradition(profile('communism'), { quick, deep });
  assert.equal(assessment.status, 'insufficient');
  assert.ok(assessment.missingExplicitSignals.includes('communist-end-state'));
});

test('populist radical-right pattern requires the nativism-authoritarianism-populism combination', () => {
  const quick = quickResult({ economy: 0, society: 1, power: 2, world: 1 });
  const deep = deepResult({ nativism: 2, populism: 2, pluralism: 1, democracyRejection: -2 });
  const assessment = assessTradition(profile('populist-radical-right-pattern'), { quick, deep });
  assert.equal(assessment.status, 'consistent');

  const noNativism = deepResult({ nativism: -2, populism: 2, pluralism: 1, democracyRejection: -2 });
  const contradicted = assessTradition(profile('populist-radical-right-pattern'), { quick, deep: noNativism });
  assert.equal(contradicted.status, 'tension');
});

test('explicit anti-democracy alone is not enough for fascist/extreme-right pattern', () => {
  const quick = quickResult({ economy: 0, society: 2, power: 2, world: 2 });
  const deep = deepResult({ democracyRejection: 2, pluralism: 2, nativism: 2, nationhood: 2 });
  const assessment = assessTradition(profile('fascist-extreme-right-pattern'), { quick, deep });
  assert.equal(assessment.status, 'insufficient');

  const withDedicatedUltranationalistEvidence = assessTradition(profile('fascist-extreme-right-pattern'), {
    quick,
    deep,
    explicitSignals: ['ultranationalist-state-project'],
  });
  assert.equal(withDedicatedUltranationalistEvidence.status, 'consistent');
});
