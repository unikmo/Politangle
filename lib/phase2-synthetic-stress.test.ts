import assert from 'node:assert/strict';
import test from 'node:test';
import type { AttitudeMode, BeliefAnswersV2, BeliefConstruct, FamilyId } from './belief-v2';
import {
  assessFamiliesV2Canonical,
  assessTendenciesV2,
  calculatePolygonV2Canonical,
  canonicalFamilyProfilesV2,
  lockedBeliefItemsV2,
} from './belief-v2-engine';
import { assessNuancesV2 } from './nuance-model';

type Scalar = -2 | -1 | 0 | 1 | 2;
type ProfileOverrides = Partial<Record<BeliefConstruct, Scalar>>;

function profile(overrides: ProfileOverrides = {}, defaultValue: Scalar = 0): BeliefAnswersV2 {
  const answers: BeliefAnswersV2 = {};
  for (const item of lockedBeliefItemsV2) answers[item.id] = overrides[item.construct] ?? defaultValue;
  return answers;
}

function familyScores(answers: BeliefAnswersV2) {
  return new Map(assessFamiliesV2Canonical(answers).map((family) => [family.id, family]));
}

function familyScore(answers: BeliefAnswersV2, id: FamilyId) {
  const score = familyScores(answers).get(id)?.overall ?? null;
  assert.notEqual(score, null, `${id} unexpectedly had insufficient coverage`);
  return score as number;
}

function tendencyScore(answers: BeliefAnswersV2, id: 'populism' | 'authority-democratic-constraints') {
  const score = assessTendenciesV2(answers).find((item) => item.id === id)?.score ?? null;
  assert.notEqual(score, null, `${id} unexpectedly had insufficient coverage`);
  return score as number;
}

function nuanceIds(answers: BeliefAnswersV2) {
  return new Set(assessNuancesV2(answers).map((item) => item.id));
}

function axisScore(answers: BeliefAnswersV2, id: 'world' | 'nationhood') {
  const score = calculatePolygonV2Canonical(answers).find((axis) => axis.id === id)?.score ?? null;
  assert.notEqual(score, null, `${id} unexpectedly had insufficient coverage`);
  return score as number;
}

function setMode(
  answers: BeliefAnswersV2,
  constructs: readonly BeliefConstruct[],
  mode: AttitudeMode,
  value: Scalar,
) {
  for (const item of lockedBeliefItemsV2) {
    if (constructs.includes(item.construct) && item.mode === mode) answers[item.id] = value;
  }
}

test('Phase 2 hybrid profiles permit realistic overlap instead of forcing one ideology box', () => {
  const marketLiberalProgressive = profile({
    'public-provision': 2,
    redistribution: 2,
    ownership: 2,
    'social-change': -2,
    'personal-autonomy': -2,
    'authority-order': -2,
    pluralism: -2,
  });
  assert.ok(familyScore(marketLiberalProgressive, 'liberalism') >= 95);
  assert.ok(familyScore(marketLiberalProgressive, 'conservatism') <= 25);
  assert.ok(familyScore(marketLiberalProgressive, 'socialism') <= 10);

  const welfareConservative = profile({
    'public-provision': -2,
    redistribution: -2,
    ownership: 2,
    'social-change': 2,
    'personal-autonomy': 2,
    'authority-order': 1,
    pluralism: -2,
  });
  assert.ok(familyScore(welfareConservative, 'conservatism') >= 90);
  assert.ok(familyScore(welfareConservative, 'social-democracy') >= 90);
  assert.equal(nuanceIds(welfareConservative).has('far-right-radical-right-pattern'), false);

  const progressiveSocialist = profile({
    'public-provision': -2,
    redistribution: -2,
    ownership: -2,
    'social-change': -2,
    'personal-autonomy': -2,
    'authority-order': -2,
    pluralism: -2,
  });
  assert.ok(familyScore(progressiveSocialist, 'socialism') >= 95);
  assert.ok(familyScore(progressiveSocialist, 'liberalism') >= 80);
  assert.ok(familyScore(progressiveSocialist, 'social-democracy') >= 80);
});

test('traditional constitutional conservatism can remain conservative without authoritarian preference', () => {
  const answers = profile({
    'social-change': 2,
    'personal-autonomy': 1,
    ownership: 2,
    'authority-order': -2,
    pluralism: -2,
  });
  assert.ok(familyScore(answers, 'conservatism') >= 70);
  assert.ok(tendencyScore(answers, 'authority-democratic-constraints') <= 10);
  assert.equal(nuanceIds(answers).has('far-right-radical-right-pattern'), false);
});

test('social democracy stays distinct from socialism through ownership under welfare-state profiles', () => {
  const classicSocialDemocrat = profile({
    'public-provision': -2,
    redistribution: -2,
    ownership: 2,
    pluralism: -2,
    'social-change': -1,
    'personal-autonomy': -1,
    'authority-order': -1,
  });
  assert.ok(familyScore(classicSocialDemocrat, 'social-democracy') >= 95);
  assert.ok(familyScore(classicSocialDemocrat, 'socialism') <= 55);

  const marketSocialDemocrat = profile({
    'public-provision': -1,
    redistribution: -1,
    ownership: 2,
    pluralism: -2,
    'social-change': -1,
    'personal-autonomy': -1,
    'authority-order': -1,
  });
  assert.ok(familyScore(marketSocialDemocrat, 'social-democracy') >= 80);
  assert.ok(familyScore(marketSocialDemocrat, 'socialism') <= 45);
});

test('socialist economics can combine with either pluralist or authoritarian institutional preferences', () => {
  const pluralistSocialist = profile({
    'public-provision': -2,
    redistribution: -2,
    ownership: -2,
    pluralism: -2,
    'authority-order': -2,
  });
  assert.ok(familyScore(pluralistSocialist, 'socialism') >= 95);
  assert.equal(nuanceIds(pluralistSocialist).has('democratic-socialist-tendency'), true);
  assert.ok(tendencyScore(pluralistSocialist, 'authority-democratic-constraints') <= 10);

  const authoritarianSocialist = profile({
    'public-provision': -2,
    redistribution: -2,
    ownership: -2,
    pluralism: 2,
    'authority-order': 2,
  });
  assert.ok(familyScore(authoritarianSocialist, 'socialism') >= 95);
  assert.equal(nuanceIds(authoritarianSocialist).has('democratic-socialist-tendency'), false);
  assert.ok(tendencyScore(authoritarianSocialist, 'authority-democratic-constraints') >= 95);
});

test('Green compatibility does not require socialist ownership but does require ecological priority', () => {
  const greenStructural = profile({
    redistribution: -1,
    'authority-order': -2,
    pluralism: -2,
    'world-sovereignty': -2,
    'ecology-growth': -2,
    subsidiarity: 2,
  });
  assert.ok(familyScore(greenStructural, 'green-politics') >= 90);

  const greenMarketOriented = profile({
    redistribution: 1,
    ownership: 2,
    'authority-order': -2,
    pluralism: -2,
    'world-sovereignty': -2,
    'ecology-growth': -2,
    subsidiarity: 2,
  });
  assert.ok(familyScore(greenMarketOriented, 'green-politics') >= 85);
  assert.ok(familyScore(greenMarketOriented, 'socialism') <= 25);

  const progressiveGrowthFirst = profile({
    ownership: 2,
    'social-change': -2,
    'personal-autonomy': -2,
    'authority-order': -2,
    pluralism: -2,
    'world-sovereignty': -1,
    'ecology-growth': 2,
  });
  assert.ok(familyScore(progressiveGrowthFirst, 'liberalism') >= 95);
  assert.ok(familyScore(progressiveGrowthFirst, 'green-politics') < 60);
});

test('populism and authority are independent cross-cutting signals', () => {
  const populistDemocrat = profile({
    populism: 2,
    'authority-order': -2,
    pluralism: -2,
  });
  assert.equal(tendencyScore(populistDemocrat, 'populism'), 100);
  assert.equal(tendencyScore(populistDemocrat, 'authority-democratic-constraints'), 0);
  assert.equal(nuanceIds(populistDemocrat).has('far-right-radical-right-pattern'), false);

  const authoritarianNonPopulist = profile({
    populism: -2,
    'authority-order': 2,
    pluralism: 2,
  });
  assert.equal(tendencyScore(authoritarianNonPopulist, 'populism'), 0);
  assert.equal(tendencyScore(authoritarianNonPopulist, 'authority-democratic-constraints'), 100);
  assert.equal(nuanceIds(authoritarianNonPopulist).has('far-right-radical-right-pattern'), false);
});

test('national membership and sovereignty remain separate instead of cancelling into a fake nationalism score', () => {
  const civicSovereigntist = profile({
    'nationhood-membership': -2,
    'world-sovereignty': 2,
  });
  assert.equal(axisScore(civicSovereigntist, 'nationhood'), 0);
  assert.equal(axisScore(civicSovereigntist, 'world'), 100);

  const birthWeightedInternationalist = profile({
    'nationhood-membership': 2,
    'world-sovereignty': -2,
  });
  assert.equal(axisScore(birthWeightedInternationalist, 'nationhood'), 100);
  assert.equal(axisScore(birthWeightedInternationalist, 'world'), 0);

  const tendencyIds = assessTendenciesV2(civicSovereigntist).map((item) => item.id);
  assert.deepEqual(tendencyIds, ['populism', 'authority-democratic-constraints']);
});

test('a national social-democratic profile keeps its economic family signal without becoming conservative by definition', () => {
  const answers = profile({
    'public-provision': -2,
    redistribution: -2,
    ownership: 2,
    pluralism: -2,
    'nationhood-membership': 2,
    'world-sovereignty': 2,
  });
  assert.ok(familyScore(answers, 'social-democracy') >= 95);
  assert.ok(familyScore(answers, 'conservatism') < familyScore(answers, 'social-democracy'));
  assert.equal(axisScore(answers, 'nationhood'), 100);
  assert.equal(axisScore(answers, 'world'), 100);
});

test('radical-right screening requires nationhood restriction, authoritarian order and populism together', () => {
  const fullPattern = profile({
    'nationhood-membership': 2,
    'world-sovereignty': 2,
    populism: 2,
    'authority-order': 2,
    pluralism: 2,
    'social-change': 2,
    'personal-autonomy': 2,
    ownership: 2,
  });
  const fullNuance = assessNuancesV2(fullPattern).find((item) => item.id === 'far-right-radical-right-pattern');
  assert.ok(fullNuance);
  assert.equal(fullNuance.strength, 'clear');
  assert.match(fullNuance.name, /screening pattern/i);
  assert.match(fullNuance.caution ?? '', /must not be used as a personal extremist or far-right identity label/i);

  for (const overrides of [
    { 'nationhood-membership': -2, 'authority-order': 2, pluralism: 2, populism: 2 },
    { 'nationhood-membership': 2, 'authority-order': -2, pluralism: -2, populism: 2 },
    { 'nationhood-membership': 2, 'authority-order': 2, pluralism: 2, populism: -2 },
  ] satisfies ProfileOverrides[]) {
    assert.equal(nuanceIds(profile(overrides)).has('far-right-radical-right-pattern'), false);
  }
});

test('Christian-democratic and religious-conservative nuance gates remain selective', () => {
  const religiousConservative = profile({
    'social-change': 2,
    'personal-autonomy': 2,
    ownership: 2,
    'authority-order': 1,
    pluralism: -2,
    'religion-public-role': 2,
    subsidiarity: -2,
  });
  assert.equal(nuanceIds(religiousConservative).has('religious-conservatism'), true);
  assert.equal(nuanceIds(religiousConservative).has('christian-democracy'), false);

  const christianDemocrat = profile({
    'public-provision': -1,
    redistribution: -1,
    ownership: 1,
    'social-change': 1,
    'personal-autonomy': 1,
    'authority-order': 0,
    pluralism: -2,
    'religion-public-role': 2,
    subsidiarity: 2,
  });
  assert.equal(nuanceIds(christianDemocrat).has('christian-democracy'), true);

  const religiousButNotConservative = profile({
    ownership: -2,
    'social-change': -2,
    'personal-autonomy': -2,
    'authority-order': -2,
    'religion-public-role': 2,
    subsidiarity: 2,
  });
  assert.equal(nuanceIds(religiousButNotConservative).has('religious-conservatism'), false);
  assert.equal(nuanceIds(religiousButNotConservative).has('christian-democracy'), false);
});

test('THINK FEEL ACT stress profile preserves mode divergence rather than averaging it away', () => {
  const answers = profile();
  const conservativeConstructs = canonicalFamilyProfilesV2
    .find((family) => family.id === 'conservatism')!
    .loadings
    .map((loading) => loading.construct);

  for (const loading of canonicalFamilyProfilesV2.find((family) => family.id === 'conservatism')!.loadings) {
    setMode(answers, [loading.construct], 'think', loading.direction === 1 ? 2 : -2);
    setMode(answers, [loading.construct], 'feel', 0);
    setMode(answers, [loading.construct], 'act', loading.direction === 1 ? -2 : 2);
  }

  assert.equal(conservativeConstructs.length, 4);
  const conservative = familyScores(answers).get('conservatism')!;
  assert.equal(conservative.think, 100);
  assert.equal(conservative.feel, 50);
  assert.equal(conservative.act, 0);
  assert.equal(conservative.modeTension, 100);
  assert.equal(conservative.overall, 50);
});

test('constructs with zero family relevance cannot silently move that family score', () => {
  const neutral = profile();
  for (const family of canonicalFamilyProfilesV2) {
    const relevant = new Set(family.loadings.map((loading) => loading.construct));
    const baseline = familyScore(neutral, family.id);
    for (const construct of [...new Set(lockedBeliefItemsV2.map((item) => item.construct))]) {
      if (relevant.has(construct)) continue;
      const low = profile({ [construct]: -2 });
      const high = profile({ [construct]: 2 });
      assert.equal(familyScore(low, family.id), baseline, `${family.id} moved on irrelevant ${construct} at -2`);
      assert.equal(familyScore(high, family.id), baseline, `${family.id} moved on irrelevant ${construct} at +2`);
    }
  }
});

test('every family loading is monotone in its evidence-defined direction', () => {
  for (const family of canonicalFamilyProfilesV2) {
    for (const loading of family.loadings) {
      const opposite = profile({ [loading.construct]: loading.direction === 1 ? -2 : 2 });
      const aligned = profile({ [loading.construct]: loading.direction === 1 ? 2 : -2 });
      assert.ok(
        familyScore(aligned, family.id) > familyScore(opposite, family.id),
        `${family.id}/${loading.construct} is not monotone in the declared direction`,
      );
    }
  }
});

test('all unsure answers produce insufficient signal rather than synthetic centrism', () => {
  const answers: BeliefAnswersV2 = {};
  for (const item of lockedBeliefItemsV2) answers[item.id] = 'unsure';

  assert.ok(assessFamiliesV2Canonical(answers).every((family) => family.overall === null && family.coverage === 0));
  assert.ok(assessTendenciesV2(answers).every((tendency) => tendency.score === null && tendency.coverage === 0));
  assert.ok(calculatePolygonV2Canonical(answers).every((axis) => axis.score === null && axis.coverage === 0));
  assert.deepEqual(assessNuancesV2(answers), []);
});
