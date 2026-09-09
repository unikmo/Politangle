import assert from 'node:assert/strict';
import test from 'node:test';
import {
  assessConservativeSubtypeV2,
  assessFamiliesV2Canonical,
  assessTendenciesV2,
  calculateConstructModesV2,
  calculatePolygonV2Canonical,
  canonicalFamilyProfilesV2,
  lockedBeliefItemsV2,
  statementFamilyRelevanceV2,
  validateCanonicalBeliefV2,
} from './belief-v2-engine';
import type { BeliefAnswersV2 } from './belief-v2';

test('canonical BELIEVE v2 preserves the 42-item / 14x3 lock', () => {
  assert.deepEqual(validateCanonicalBeliefV2(), { valid: true, errors: [] });
  assert.equal(lockedBeliefItemsV2.length, 42);
  assert.equal(lockedBeliefItemsV2.filter((item) => item.mode === 'think').length, 14);
  assert.equal(lockedBeliefItemsV2.filter((item) => item.mode === 'feel').length, 14);
  assert.equal(lockedBeliefItemsV2.filter((item) => item.mode === 'act').length, 14);
});

test('phase-1 source wording keeps every alternative within the burden guardrail', () => {
  const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;
  for (const item of lockedBeliefItemsV2) {
    assert.ok(wordCount(item.negative) <= 26, `${item.id} negative pole is too long`);
    assert.ok(wordCount(item.positive) <= 26, `${item.id} positive pole is too long`);
  }
});

test('public provision is separated from productive ownership', () => {
  const triplet = lockedBeliefItemsV2.filter((item) => item.construct === 'public-provision');
  assert.equal(triplet.length, 3);
  for (const item of triplet) {
    assert.doesNotMatch(`${item.negative} ${item.positive}`, /ownership|shareholder|worker-owned/i);
    assert.match(`${item.negative} ${item.positive}`, /essential services/i);
  }
});

test('redistribution ACT item measures redistribution rather than bundling public services', () => {
  const item = lockedBeliefItemsV2.find((candidate) => candidate.id === 'A02')!;
  const text = `${item.negative} ${item.positive}`;
  assert.match(text, /income gaps/i);
  assert.match(text, /tax/i);
  assert.doesNotMatch(text, /public service/i);
});

test('nationhood THINK FEEL ACT items measure national membership rather than citizenship-at-birth law', () => {
  const triplet = lockedBeliefItemsV2.filter((item) => item.construct === 'nationhood-membership');
  assert.equal(triplet.length, 3);
  for (const item of triplet) {
    const text = `${item.negative} ${item.positive}`;
    assert.match(text, /naturalized/i);
    assert.match(text, /citizen from birth/i);
    assert.doesNotMatch(text, /parent|birthplace|citizenship-at-birth/i);
  }
});

test('populism ACT item does not collapse into anti-pluralism, institutions or leader authoritarianism', () => {
  const item = lockedBeliefItemsV2.find((candidate) => candidate.id === 'A11')!;
  const text = `${item.negative} ${item.positive}`.toLowerCase();
  assert.match(text, /elite/);
  assert.match(text, /ordinary people/);
  assert.doesNotMatch(text, /court|institution|media|opposition|leader/);
});

test('religion public-role triplet measures legitimacy of religious moral reasons rather than theocracy', () => {
  const triplet = lockedBeliefItemsV2.filter((item) => item.construct === 'religion-public-role');
  assert.equal(triplet.length, 3);
  for (const item of triplet) {
    const text = `${item.negative} ${item.positive}`;
    assert.match(text, /religious moral principles/i);
    assert.doesNotMatch(text, /theocracy|state religion/i);
  }
});

test('subsidiarity THINK FEEL ACT poles point in the same direction', () => {
  const triplet = lockedBeliefItemsV2.filter((item) => item.construct === 'subsidiarity');
  const act = triplet.find((item) => item.mode === 'act')!;
  assert.match(act.negative, /higher-level government/i);
  assert.match(act.positive, /lowest capable/i);
});

test('main family priors are deliberately sparse rather than forcing every issue into every ideology', () => {
  const liberal = canonicalFamilyProfilesV2.find((profile) => profile.id === 'liberalism')!;
  const conservative = canonicalFamilyProfilesV2.find((profile) => profile.id === 'conservatism')!;
  assert.equal(liberal.loadings.some((loading) => loading.construct === 'redistribution'), false);
  assert.equal(conservative.loadings.some((loading) => loading.construct === 'public-provision'), false);
  assert.equal(conservative.loadings.some((loading) => loading.construct === 'world-sovereignty'), false);
  assert.equal(liberal.loadings.some((loading) => loading.construct === 'abortion'), false);
  assert.equal(conservative.loadings.some((loading) => loading.construct === 'abortion'), false);
});

test('academic loading pass gives private ownership modest relevance to broad liberalism', () => {
  const liberal = canonicalFamilyProfilesV2.find((profile) => profile.id === 'liberalism')!;
  const ownership = liberal.loadings.find((loading) => loading.construct === 'ownership');
  assert.ok(ownership);
  assert.equal(ownership.relevance, 1);
  assert.equal(ownership.direction, 1);
  assert.ok(ownership.evidenceIds.includes('SEP-LIBERALISM'));
});

test('pluralism stays cross-cutting rather than defining broad conservatism', () => {
  const item = lockedBeliefItemsV2.find((candidate) => candidate.construct === 'pluralism' && candidate.mode === 'think')!;
  const relevance = statementFamilyRelevanceV2(item.id)!;
  const conservative = relevance.families.find((family) => family.familyId === 'conservatism')!;
  assert.equal(conservative.relevance, 0);
  assert.equal(conservative.direction, 0);
});

test('green politics gives modest relevance to subsidiarity and decentralization', () => {
  const green = canonicalFamilyProfilesV2.find((profile) => profile.id === 'green-politics')!;
  const subsidiarity = green.loadings.find((loading) => loading.construct === 'subsidiarity');
  assert.ok(subsidiarity);
  assert.equal(subsidiarity.relevance, 1);
  assert.equal(subsidiarity.direction, 1);
  assert.ok(subsidiarity.evidenceIds.includes('CAMBRIDGE-GREEN-POLITICS'));
});

test('universal-service and redistribution preferences do not disqualify a conservative pattern', () => {
  const answers: BeliefAnswersV2 = {};
  const conservative = canonicalFamilyProfilesV2.find((profile) => profile.id === 'conservatism')!;
  for (const loading of conservative.loadings) {
    for (const item of lockedBeliefItemsV2.filter((candidate) => candidate.construct === loading.construct)) {
      answers[item.id] = loading.direction === 1 ? 2 : -2;
    }
  }
  for (const construct of ['public-provision', 'redistribution'] as const) {
    for (const item of lockedBeliefItemsV2.filter((candidate) => candidate.construct === construct)) answers[item.id] = -2;
  }
  const result = assessFamiliesV2Canonical(answers).find((family) => family.id === 'conservatism')!;
  assert.equal(result.overall, 100);
});

test('statement relevance explicitly returns zero for a family when the construct is not part of that family prior', () => {
  const item = lockedBeliefItemsV2.find((candidate) => candidate.construct === 'public-provision' && candidate.mode === 'think')!;
  const relevance = statementFamilyRelevanceV2(item.id)!;
  assert.equal(relevance.families.find((family) => family.familyId === 'conservatism')!.relevance, 0);
  assert.equal(relevance.families.find((family) => family.familyId === 'social-democracy')!.relevance, 2);
});

test('Think Feel Act tension is calculated within identical constructs', () => {
  const answers: BeliefAnswersV2 = {};
  const triplet = lockedBeliefItemsV2.filter((item) => item.construct === 'pluralism');
  answers[triplet.find((item) => item.mode === 'think')!.id] = -2;
  answers[triplet.find((item) => item.mode === 'feel')!.id] = 2;
  answers[triplet.find((item) => item.mode === 'act')!.id] = -2;
  const result = calculateConstructModesV2(answers).find((item) => item.construct === 'pluralism')!;
  assert.equal(result.think, 0);
  assert.equal(result.feel, 100);
  assert.equal(result.act, 0);
  assert.equal(result.tension, 100);
});

test('family triangle can show different Think Feel Act compatibility scores', () => {
  const answers: BeliefAnswersV2 = {};
  const liberal = canonicalFamilyProfilesV2.find((profile) => profile.id === 'liberalism')!;
  for (const loading of liberal.loadings) {
    const triplet = lockedBeliefItemsV2.filter((item) => item.construct === loading.construct);
    answers[triplet.find((item) => item.mode === 'think')!.id] = loading.direction === -1 ? -2 : 2;
    answers[triplet.find((item) => item.mode === 'feel')!.id] = 0;
    answers[triplet.find((item) => item.mode === 'act')!.id] = loading.direction === -1 ? 2 : -2;
  }
  const result = assessFamiliesV2Canonical(answers).find((family) => family.id === 'liberalism')!;
  assert.equal(result.think, 100);
  assert.equal(result.feel, 50);
  assert.equal(result.act, 0);
  assert.equal(result.modeTension, 100);
});

test('polygon remains an eight-axis political shape rather than an ideology label', () => {
  const answers: BeliefAnswersV2 = {};
  for (const item of lockedBeliefItemsV2) answers[item.id] = 0;
  const polygon = calculatePolygonV2Canonical(answers);
  assert.equal(polygon.length, 8);
  assert.ok(polygon.every((axis) => axis.score === 50 && axis.coverage === 100));
});

test('populism and authority remain scored tendencies while nationalism stays decomposed into polygon axes', () => {
  const answers: BeliefAnswersV2 = {};
  for (const item of lockedBeliefItemsV2) answers[item.id] = 0;
  assert.deepEqual(assessTendenciesV2(answers).map((item) => item.id), [
    'populism',
    'authority-democratic-constraints',
  ]);
  const polygonIds = calculatePolygonV2Canonical(answers).map((axis) => axis.id);
  assert.ok(polygonIds.includes('world'));
  assert.ok(polygonIds.includes('nationhood'));
});

test('Christian democracy requires more than religion alone', () => {
  const answers: BeliefAnswersV2 = {};
  const conservative = canonicalFamilyProfilesV2.find((profile) => profile.id === 'conservatism')!;
  for (const loading of conservative.loadings) {
    for (const item of lockedBeliefItemsV2.filter((candidate) => candidate.construct === loading.construct)) {
      answers[item.id] = loading.direction === 1 ? 2 : -2;
    }
  }
  for (const item of lockedBeliefItemsV2.filter((candidate) => candidate.construct === 'religion-public-role')) answers[item.id] = 2;
  for (const item of lockedBeliefItemsV2.filter((candidate) => candidate.construct === 'subsidiarity')) answers[item.id] = -2;
  assert.equal(assessConservativeSubtypeV2(answers)?.id, 'religious-conservatism');

  for (const item of lockedBeliefItemsV2.filter((candidate) => candidate.construct === 'subsidiarity')) answers[item.id] = 2;
  for (const item of lockedBeliefItemsV2.filter((candidate) => candidate.construct === 'ownership')) answers[item.id] = 1;
  for (const item of lockedBeliefItemsV2.filter((candidate) => candidate.construct === 'redistribution')) answers[item.id] = -1;
  for (const item of lockedBeliefItemsV2.filter((candidate) => candidate.construct === 'pluralism')) answers[item.id] = -2;
  assert.equal(assessConservativeSubtypeV2(answers)?.id, 'christian-democracy');
});

test('conservative subtype stays unknown when decisive triplets contain insufficient data', () => {
  const answers: BeliefAnswersV2 = {};
  const conservative = canonicalFamilyProfilesV2.find((profile) => profile.id === 'conservatism')!;
  for (const loading of conservative.loadings) {
    for (const item of lockedBeliefItemsV2.filter((candidate) => candidate.construct === loading.construct)) answers[item.id] = loading.direction === 1 ? 2 : -2;
  }
  const religion = lockedBeliefItemsV2.filter((candidate) => candidate.construct === 'religion-public-role');
  answers[religion.find((item) => item.mode === 'think')!.id] = 2;
  answers[religion.find((item) => item.mode === 'feel')!.id] = 'unsure';
  answers[religion.find((item) => item.mode === 'act')!.id] = 2;
  assert.equal(assessConservativeSubtypeV2(answers), null);
});
