import assert from 'node:assert/strict';
import test from 'node:test';
import type { DeepBeliefAxis, DeepBeliefResult } from './deep-engine';
import { calculateQuickResult, type Answers } from './engine';
import { evidenceById } from './evidence';
import {
  assessConservativeSubtype,
  assessPoliticalTendencies,
  assessPrimaryFamilies,
  compatibilityAnchors,
  politicalTendencies,
  populismGovernanceQualifier,
  primaryFamilies,
} from './primary-families';
import { quickQuestions } from './questions';

const axes: DeepBeliefAxis[] = [
  'pluralism',
  'ownership',
  'nativism',
  'populism',
  'ecology',
  'nationhood',
  'democracyRejection',
  'religionPublicRole',
  'subsidiarity',
];

function deepResult(scores: Partial<Record<DeepBeliefAxis, number>>): DeepBeliefResult {
  const resultAxes = {} as DeepBeliefResult['axes'];
  for (const axis of axes) {
    const score = scores[axis] ?? 50;
    const singleItem = axis === 'religionPublicRole' || axis === 'subsidiarity';
    resultAxes[axis] = {
      axis,
      negative: 'negative',
      positive: 'positive',
      score,
      label: 'fixture',
      coverage: 100,
      interpretable: true,
      answered: singleItem ? 1 : 2,
      unsure: 0,
      total: singleItem ? 1 : 2,
      raw: 0,
    };
  }
  return {
    version: 'deep-belief-score-1.2.0',
    createdAt: '2026-09-07T00:00:00.000Z',
    complete: true,
    answeredCount: 16,
    unsureCount: 0,
    axes: resultAxes,
  };
}

function quickResult(values: Partial<Record<'economy' | 'society' | 'power' | 'world', -2 | -1 | 0 | 1 | 2>>) {
  const answers: Answers = {};
  for (const question of quickQuestions) answers[question.id] = values[question.dimension] ?? 0;
  return calculateQuickResult(answers, '2026-09-07T00:00:00.000Z');
}

test('headline result contains five political families and separates cross-cutting tendencies', () => {
  assert.deepEqual(primaryFamilies.map((family) => family.id), [
    'liberalism',
    'conservatism',
    'social-democracy',
    'socialism',
    'green-politics',
  ]);
  assert.deepEqual(politicalTendencies.map((tendency) => tendency.id), [
    'nationalism',
    'populism',
    'authority-democratic-constraints',
  ]);
});

test('all public family and tendency descriptions are bound to registered evidence', () => {
  for (const item of [...primaryFamilies, ...politicalTendencies]) {
    assert.ok(item.evidenceIds.length > 0);
    for (const id of item.evidenceIds) assert.ok(evidenceById.has(id), `${item.name} references unknown evidence ${id}`);
  }
});

test('75 to 100 is anchored as a strong family match rather than a probability', () => {
  assert.deepEqual(compatibilityAnchors[0], {
    min: 75,
    max: 100,
    label: 'Strong match',
    meaning: 'Strongly consistent with the family’s defining characteristics in the dimensions measured.',
  });
});

test('populism tendency is separate from authoritarian or anti-pluralist signals', () => {
  const democratic = deepResult({ populism: 90, pluralism: 10, democracyRejection: 10 });
  const authoritarianRisk = deepResult({ populism: 90, pluralism: 90, democracyRejection: 90 });

  const democraticTendency = assessPoliticalTendencies({ deep: democratic }).find((item) => item.id === 'populism');
  const riskTendency = assessPoliticalTendencies({ deep: authoritarianRisk }).find((item) => item.id === 'populism');

  assert.equal(democraticTendency?.score, 90);
  assert.equal(riskTendency?.score, 90);
  assert.match(populismGovernanceQualifier(democratic), /support for competitive democracy/i);
  assert.match(populismGovernanceQualifier(authoritarianRisk), /authoritarian-risk/i);
});

test('authority tendency surfaces a high-risk democratic-constraints signal without changing ideology family', () => {
  const deep = deepResult({ pluralism: 90, democracyRejection: 90 });
  const quick = quickResult({ power: 2 });
  const authority = assessPoliticalTendencies({ quick, deep }).find((item) => item.id === 'authority-democratic-constraints');
  assert.ok(authority);
  assert.ok((authority.score ?? 0) >= 75);
  assert.match(authority.label, /authoritarian-risk/i);
});

test('secular conservative subtype requires a conservative family match and low religious-public-role score', () => {
  const quick = quickResult({ economy: 1, society: 2, power: 0, world: 1 });
  const deep = deepResult({ pluralism: 20, democracyRejection: 20, religionPublicRole: 20, subsidiarity: 50 });
  const subtype = assessConservativeSubtype({ quick, deep });
  assert.equal(subtype?.id, 'traditional-secular-conservatism');
});

test('Christian democracy requires religious inspiration, subsidiarity, democratic compatibility and social-market-compatible economics', () => {
  const quick = quickResult({ economy: 0, society: 2, power: 0, world: 0 });
  const deep = deepResult({
    pluralism: 20,
    ownership: 70,
    democracyRejection: 20,
    religionPublicRole: 80,
    subsidiarity: 80,
  });
  const subtype = assessConservativeSubtype({ quick, deep });
  assert.equal(subtype?.id, 'christian-democracy');
});

test('religious conservative orientation is used when religion matters but Christian-democratic combination is incomplete', () => {
  const quick = quickResult({ economy: 2, society: 2, power: 1, world: 1 });
  const deep = deepResult({
    pluralism: 30,
    ownership: 90,
    democracyRejection: 20,
    religionPublicRole: 90,
    subsidiarity: 20,
  });
  const subtype = assessConservativeSubtype({ quick, deep });
  assert.equal(subtype?.id, 'religious-conservatism');
});

test('primary family scoring no longer treats nationalism or populism as competing headline families', () => {
  const quick = quickResult({ economy: 0, society: 0, power: 0, world: 2 });
  const deep = deepResult({ nationhood: 90, populism: 90 });
  const ids = assessPrimaryFamilies({ quick, deep }).map((item) => item.id);
  assert.equal(ids.includes('nationalism' as never), false);
  assert.equal(ids.includes('populism' as never), false);
});
