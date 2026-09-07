import assert from 'node:assert/strict';
import test from 'node:test';
import type { DeepBeliefAxis, DeepBeliefResult } from './deep-engine';
import { evidenceById } from './evidence';
import { assessPrimaryFamilies, compatibilityAnchors, populismGovernanceQualifier, primaryFamilies } from './primary-families';

const axes: DeepBeliefAxis[] = ['pluralism', 'ownership', 'nativism', 'populism', 'ecology', 'nationhood', 'democracyRejection'];

function deepResult(scores: Partial<Record<DeepBeliefAxis, number>>): DeepBeliefResult {
  const resultAxes = {} as DeepBeliefResult['axes'];
  for (const axis of axes) {
    const score = scores[axis] ?? 50;
    resultAxes[axis] = {
      axis,
      negative: 'negative',
      positive: 'positive',
      score,
      label: 'fixture',
      coverage: 100,
      interpretable: true,
      answered: 2,
      unsure: 0,
      total: 2,
      raw: 0,
    };
  }
  return {
    version: 'deep-belief-score-1.1.0',
    createdAt: '2026-09-07T00:00:00.000Z',
    complete: true,
    answeredCount: 14,
    unsureCount: 0,
    axes: resultAxes,
  };
}

test('public-facing table contains seven broad political families only', () => {
  assert.deepEqual(primaryFamilies.map((family) => family.id), [
    'liberalism',
    'conservatism',
    'social-democracy',
    'socialism',
    'green-politics',
    'nationalism',
    'populism',
  ]);
  assert.equal(primaryFamilies.some((family) => family.id === ('democratic-socialism' as never)), false);
});

test('all public family descriptions are bound to registered evidence', () => {
  for (const family of primaryFamilies) {
    assert.ok(family.evidenceIds.length > 0);
    for (const id of family.evidenceIds) assert.ok(evidenceById.has(id), `${family.name} references unknown evidence ${id}`);
  }
});

test('75 to 100 is anchored as a strong match rather than a probability', () => {
  assert.deepEqual(compatibilityAnchors[0], {
    min: 75,
    max: 100,
    label: 'Strong match',
    meaning: 'Strongly consistent with the family’s defining characteristics in the dimensions measured.',
  });
});

test('populism compatibility is separate from authoritarian or anti-pluralist signals', () => {
  const democratic = deepResult({ populism: 90, pluralism: 10, democracyRejection: 10 });
  const authoritarianRisk = deepResult({ populism: 90, pluralism: 90, democracyRejection: 90 });

  const democraticMatch = assessPrimaryFamilies({ deep: democratic }).find((item) => item.id === 'populism');
  const riskMatch = assessPrimaryFamilies({ deep: authoritarianRisk }).find((item) => item.id === 'populism');

  assert.equal(democraticMatch?.score, 100);
  assert.equal(riskMatch?.score, 100);
  assert.match(populismGovernanceQualifier(democratic), /support for competitive democracy/i);
  assert.match(populismGovernanceQualifier(authoritarianRisk), /authoritarian-risk/i);
});
