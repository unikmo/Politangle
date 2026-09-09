import assert from 'node:assert/strict';
import test from 'node:test';
import {
  BELIEF_V2_LOCKED_COUNT,
  BELIEF_V2_PER_MODE,
  assessFamiliesV2,
  beliefV2Items,
  calculateConstructModes,
  calculatePolygonV2,
  familyProfilesV2,
  statementFamilyRelevance,
  validateBeliefV2Architecture,
  type BeliefAnswersV2,
} from './belief-v2';
import { evidenceById } from './evidence';

test('belief v2 locks exactly 42 political-belief items', () => {
  assert.equal(BELIEF_V2_LOCKED_COUNT, 42);
  assert.equal(beliefV2Items.length, 42);
  assert.equal(beliefV2Items.filter((item) => item.stage === 'quick').length, 26);
  assert.equal(beliefV2Items.filter((item) => item.stage === 'deep').length, 16);
  assert.deepEqual(validateBeliefV2Architecture(), { valid: true, errors: [] });
});

test('Think Feel Act are balanced at fourteen items each and every construct has one of each', () => {
  for (const mode of ['think', 'feel', 'act'] as const) {
    assert.equal(beliefV2Items.filter((item) => item.mode === mode).length, BELIEF_V2_PER_MODE);
  }
  const constructs = new Set(beliefV2Items.map((item) => item.construct));
  assert.equal(constructs.size, 14);
  for (const construct of constructs) {
    const triplet = beliefV2Items.filter((item) => item.construct === construct);
    assert.equal(triplet.length, 3);
    assert.deepEqual(new Set(triplet.map((item) => item.mode)), new Set(['think', 'feel', 'act']));
  }
});

test('every locked statement and every ideology loading is evidence-bound', () => {
  for (const item of beliefV2Items) {
    assert.ok(item.evidenceIds.length > 0, `${item.id} has no evidence`);
    for (const id of item.evidenceIds) assert.ok(evidenceById.has(id), `${item.id} references unknown evidence ${id}`);
  }
  for (const profile of familyProfilesV2) {
    for (const loading of profile.loadings) {
      assert.ok(loading.evidenceIds.length > 0, `${profile.name}/${loading.construct} has no evidence`);
      for (const id of loading.evidenceIds) assert.ok(evidenceById.has(id), `${profile.name}/${loading.construct} references unknown evidence ${id}`);
    }
  }
});

test('statement-to-ideology relevance is explicit and permits zero relevance', () => {
  const provision = beliefV2Items.find((item) => item.construct === 'public-provision' && item.mode === 'think')!;
  const relevance = statementFamilyRelevance(provision.id)!;
  const socialism = relevance.families.find((item) => item.familyId === 'socialism')!;
  const conservatism = relevance.families.find((item) => item.familyId === 'conservatism')!;
  assert.ok(socialism.relevance > 0);
  assert.equal(conservatism.relevance, 0);
});

test('mixed economic views do not force a respondent out of conservatism', () => {
  const answers: BeliefAnswersV2 = {};
  const conservative = familyProfilesV2.find((profile) => profile.id === 'conservatism')!;

  for (const loading of conservative.loadings) {
    for (const item of beliefV2Items.filter((candidate) => candidate.construct === loading.construct)) {
      answers[item.id] = loading.direction === 1 ? 2 : -2;
    }
  }

  for (const construct of ['public-provision', 'redistribution'] as const) {
    for (const item of beliefV2Items.filter((candidate) => candidate.construct === construct)) answers[item.id] = -2;
  }

  const result = assessFamiliesV2(answers).find((profile) => profile.id === 'conservatism')!;
  assert.equal(result.overall, 100);
});

test('Think Feel Act tension is measured within the same construct rather than across unrelated questions', () => {
  const socialChange = beliefV2Items.filter((item) => item.construct === 'social-change');
  const answers: BeliefAnswersV2 = {};
  answers[socialChange.find((item) => item.mode === 'think')!.id] = 2;
  answers[socialChange.find((item) => item.mode === 'feel')!.id] = -2;
  answers[socialChange.find((item) => item.mode === 'act')!.id] = 2;

  const result = calculateConstructModes(answers).find((item) => item.construct === 'social-change')!;
  assert.equal(result.think, 100);
  assert.equal(result.feel, 0);
  assert.equal(result.act, 100);
  assert.equal(result.tension, 100);
});

test('family compatibility can differ between Think Feel and Act without assigning an identity', () => {
  const answers: BeliefAnswersV2 = {};
  const liberal = familyProfilesV2.find((profile) => profile.id === 'liberalism')!;
  for (const loading of liberal.loadings) {
    const triplet = beliefV2Items.filter((item) => item.construct === loading.construct);
    answers[triplet.find((item) => item.mode === 'think')!.id] = loading.direction === 1 ? 2 : -2;
    answers[triplet.find((item) => item.mode === 'feel')!.id] = loading.direction === 1 ? 0 : 0;
    answers[triplet.find((item) => item.mode === 'act')!.id] = loading.direction === 1 ? -2 : 2;
  }
  const result = assessFamiliesV2(answers).find((profile) => profile.id === 'liberalism')!;
  assert.equal(result.think, 100);
  assert.equal(result.feel, 50);
  assert.equal(result.act, 0);
  assert.equal(result.modeTension, 100);
});

test('polygon exposes eight independent political-shape axes and can be calculated by mode', () => {
  const answers: BeliefAnswersV2 = {};
  for (const item of beliefV2Items) answers[item.id] = 0;
  const overall = calculatePolygonV2(answers);
  const feel = calculatePolygonV2(answers, 'feel');
  assert.equal(overall.length, 8);
  assert.equal(feel.length, 8);
  assert.ok(overall.every((axis) => axis.score === 50 && axis.coverage === 100));
  assert.ok(feel.every((axis) => axis.score === 50 && axis.coverage === 100));
});
