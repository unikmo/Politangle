import assert from 'node:assert/strict';
import test from 'node:test';
import {
  assessFamiliesV2Canonical,
  canonicalFamilyProfilesV2,
  lockedBeliefItemsV2,
  statementFamilyRelevanceV2,
} from './belief-v2-engine';
import type { BeliefAnswersV2 } from './belief-v2';

test('conservatism treats private ownership as relevant but not defining', () => {
  const conservative = canonicalFamilyProfilesV2.find((profile) => profile.id === 'conservatism')!;
  const ownership = conservative.loadings.find((loading) => loading.construct === 'ownership');
  assert.ok(ownership);
  assert.equal(ownership.relevance, 1);
  assert.equal(ownership.direction, 1);
  assert.ok(ownership.evidenceIds.includes('SEP-CONSERVATISM'));
  assert.ok(ownership.evidenceIds.includes('CAMBRIDGE-CHRISTIAN-DEMOCRACY'));
});

test('ownership statements no longer have zero relevance for conservatism', () => {
  const item = lockedBeliefItemsV2.find((candidate) => candidate.construct === 'ownership' && candidate.mode === 'think')!;
  const relevance = statementFamilyRelevanceV2(item.id)!;
  const conservative = relevance.families.find((family) => family.familyId === 'conservatism')!;
  assert.equal(conservative.relevance, 1);
  assert.equal(conservative.direction, 1);
});

test('social ownership creates limited tension without erasing an otherwise conservative profile', () => {
  const answers: BeliefAnswersV2 = {};
  const conservative = canonicalFamilyProfilesV2.find((profile) => profile.id === 'conservatism')!;

  for (const loading of conservative.loadings) {
    for (const item of lockedBeliefItemsV2.filter((candidate) => candidate.construct === loading.construct)) {
      answers[item.id] = loading.direction === 1 ? 2 : -2;
    }
  }

  for (const item of lockedBeliefItemsV2.filter((candidate) => candidate.construct === 'ownership')) {
    answers[item.id] = -2;
  }

  const result = assessFamiliesV2Canonical(answers).find((family) => family.id === 'conservatism')!;
  assert.ok(result.overall !== null);
  assert.ok(result.overall! >= 75);
  assert.ok(result.overall! < 100);
});
