import assert from 'node:assert/strict';
import test from 'node:test';
import type { BeliefAnswersV2, BeliefConstruct } from './belief-v2';
import { canonicalFamilyProfilesV2, lockedBeliefItemsV2 } from './belief-v2-engine';
import { evidenceById } from './evidence';
import { assessNuancesV2 } from './nuance-model';

function setConstruct(
  answers: BeliefAnswersV2,
  construct: BeliefConstruct,
  value: -2 | -1 | 0 | 1 | 2,
) {
  for (const item of lockedBeliefItemsV2.filter((candidate) => candidate.construct === construct)) {
    answers[item.id] = value;
  }
}

test('nuance layer never expands the five headline political families', () => {
  assert.deepEqual(canonicalFamilyProfilesV2.map((profile) => profile.id), [
    'liberalism',
    'conservatism',
    'social-democracy',
    'socialism',
    'green-politics',
  ]);
});

test('democratic-socialist nuance appears only with both socialist and democratic-pluralist signals', () => {
  const answers: BeliefAnswersV2 = {};
  setConstruct(answers, 'public-provision', -2);
  setConstruct(answers, 'redistribution', -2);
  setConstruct(answers, 'ownership', -2);
  setConstruct(answers, 'pluralism', -2);
  setConstruct(answers, 'authority-order', -2);

  const nuance = assessNuancesV2(answers).find((item) => item.id === 'democratic-socialist-tendency');
  assert.ok(nuance);
  assert.equal(nuance.anchorFamily, 'socialism');
  assert.equal(nuance.kind, 'subtype');

  setConstruct(answers, 'pluralism', 2);
  setConstruct(answers, 'authority-order', 2);
  assert.equal(
    assessNuancesV2(answers).some((item) => item.id === 'democratic-socialist-tendency'),
    false,
  );
});

test('ordinary socialist economic preferences do not automatically produce democratic socialism', () => {
  const answers: BeliefAnswersV2 = {};
  setConstruct(answers, 'public-provision', -2);
  setConstruct(answers, 'redistribution', -2);
  setConstruct(answers, 'ownership', -2);

  assert.equal(
    assessNuancesV2(answers).some((item) => item.id === 'democratic-socialist-tendency'),
    false,
  );
});

test('ordinary conservatism does not automatically produce a far-right signal', () => {
  const answers: BeliefAnswersV2 = {};
  setConstruct(answers, 'social-change', 2);
  setConstruct(answers, 'personal-autonomy', 1);
  setConstruct(answers, 'authority-order', 1);
  setConstruct(answers, 'pluralism', -2);

  assert.equal(
    assessNuancesV2(answers).some((item) => item.id === 'far-right-radical-right-pattern'),
    false,
  );
});

test('far-right nuance requires the combined nationhood authority and populism pattern', () => {
  const answers: BeliefAnswersV2 = {};
  setConstruct(answers, 'nationhood-membership', 2);
  setConstruct(answers, 'authority-order', 2);
  setConstruct(answers, 'populism', 2);
  setConstruct(answers, 'pluralism', 1);

  const nuance = assessNuancesV2(answers).find((item) => item.id === 'far-right-radical-right-pattern');
  assert.ok(nuance);
  assert.equal(nuance.anchorFamily, 'conservatism');
  assert.equal(nuance.kind, 'edge-pattern');
  assert.match(nuance.caution ?? '', /not ordinary conservatism/i);
  assert.match(nuance.caution ?? '', /not equivalent to fascism/i);

  setConstruct(answers, 'populism', 0);
  assert.equal(
    assessNuancesV2(answers).some((item) => item.id === 'far-right-radical-right-pattern'),
    false,
  );
});

test('every returned nuance is evidence-bound', () => {
  const answers: BeliefAnswersV2 = {};
  setConstruct(answers, 'public-provision', -2);
  setConstruct(answers, 'redistribution', -2);
  setConstruct(answers, 'ownership', -2);
  setConstruct(answers, 'pluralism', -2);
  setConstruct(answers, 'authority-order', -2);

  const nuances = assessNuancesV2(answers);
  assert.ok(nuances.length > 0);
  for (const nuance of nuances) {
    assert.ok(nuance.evidenceIds.length > 0);
    for (const id of nuance.evidenceIds) assert.ok(evidenceById.has(id), `${nuance.id} references unknown evidence ${id}`);
  }
});
