import assert from 'node:assert/strict';
import test from 'node:test';
import {
  LITERACY_MASTER_BANK_VERSION,
  certifiedBlueprintFor,
  validateCertifiedMasterBank,
  validateLiteracyQuestionRecord,
  type LiteracyDifficulty,
  type LiteracyQuestionRecord,
} from './literacy-bank-schema';
import { selectCertifiedQuestionPlan } from './literacy-certified-selector';

const DIFFICULTIES: readonly LiteracyDifficulty[] = ['introductory', 'intermediate', 'advanced'];

function syntheticBank(section: LiteracyQuestionRecord['section']): LiteracyQuestionRecord[] {
  const blueprint = certifiedBlueprintFor(section);
  const difficultyQueue: LiteracyDifficulty[] = [
    ...Array<LiteracyDifficulty>(6).fill('introductory'),
    ...Array<LiteracyDifficulty>(13).fill('intermediate'),
    ...Array<LiteracyDifficulty>(6).fill('advanced'),
  ];
  const topicEntries = Object.entries(blueprint.topicQuotas) as [string, number][];
  const records: LiteracyQuestionRecord[] = [];
  let sequence = 0;

  function add(bucket: string, difficulty: LiteracyDifficulty) {
    sequence += 1;
    records.push({
      id: `${section === 'classify' ? 'SC' : 'SU'}${sequence}`,
      section,
      prompt: `Synthetic ${section} question ${sequence}`,
      options: [
        { id: 'correct', label: 'Correct fixture option' },
        { id: 'incorrect', label: 'Incorrect fixture option' },
      ],
      acceptedAnswerSets: [['correct']],
      explanation: 'Synthetic explanation for selector tests.',
      evidenceIds: ['TEST-EVIDENCE'],
      bankVersion: LITERACY_MASTER_BANK_VERSION,
      status: 'validated',
      difficulty,
      blueprintBucket: bucket,
      secondaryTags: [],
      sourceLanguage: 'en',
      validation: {
        reviewedAt: '2026-09-13',
        reviewerRole: 'synthetic-test-reviewer',
        definitionEvidence: 'pass',
        ambiguity: 'pass',
        ideologicalBias: 'pass',
        distractorQuality: 'pass',
        duplicateConcept: 'pass',
        difficulty: 'pass',
        multidimensionalConsistency: 'pass',
      },
    } as LiteracyQuestionRecord);
  }

  let difficultyIndex = 0;
  for (const [bucket, quota] of topicEntries) {
    for (let count = 0; count < quota; count += 1) add(bucket, difficultyQueue[difficultyIndex++]);
  }
  for (let extra = 0; records.length < 40; extra += 1) {
    add(topicEntries[extra % topicEntries.length][0], DIFFICULTIES[extra % DIFFICULTIES.length]);
  }
  return records;
}

test('both 40-question synthetic master banks satisfy the versioned blueprints', () => {
  for (const section of ['classify', 'understand'] as const) {
    assert.deepEqual(validateCertifiedMasterBank(syntheticBank(section), section, LITERACY_MASTER_BANK_VERSION), {
      valid: true,
      errors: [],
    });
  }
});

test('validated status requires the full recorded review gate', () => {
  const question = syntheticBank('classify')[0];
  const withoutReview = { ...question, validation: undefined } as LiteracyQuestionRecord;
  assert.equal(validateLiteracyQuestionRecord(withoutReview).valid, false);
});

test('selector returns a deterministic balanced 25-question plan', () => {
  const questions = syntheticBank('classify');
  const first = selectCertifiedQuestionPlan({ questions, section: 'classify', bankVersion: LITERACY_MASTER_BANK_VERSION, seed: 'attempt-1' });
  const second = selectCertifiedQuestionPlan({ questions, section: 'classify', bankVersion: LITERACY_MASTER_BANK_VERSION, seed: 'attempt-1' });
  assert.equal(first.ok, true);
  assert.deepEqual(second, first);
  if (!first.ok) return;
  assert.equal(first.plan.questionIds.length, 25);
  assert.equal(new Set(first.plan.questionIds).size, 25);
  assert.deepEqual(first.plan.topicCoverage, certifiedBlueprintFor('classify').topicQuotas);
  assert.deepEqual(first.plan.difficultyCoverage, certifiedBlueprintFor('classify').difficultyQuotas);
});

test('immediate retest excludes failed questions and prefers unseen questions', () => {
  const questions = syntheticBank('understand');
  const initial = selectCertifiedQuestionPlan({ questions, section: 'understand', bankVersion: LITERACY_MASTER_BANK_VERSION, seed: 'initial' });
  assert.equal(initial.ok, true);
  if (!initial.ok) return;
  const failed = initial.plan.questionIds.slice(0, 2);
  const retest = selectCertifiedQuestionPlan({
    questions,
    section: 'understand',
    bankVersion: LITERACY_MASTER_BANK_VERSION,
    seed: 'retest',
    previousAttempt: { shownQuestionIds: initial.plan.questionIds, incorrectQuestionIds: failed },
  });
  assert.equal(retest.ok, true);
  if (!retest.ok) return;
  assert.equal(retest.plan.questionIds.some((id) => failed.includes(id)), false);
  const unseen = retest.plan.questionIds.filter((id) => !initial.plan.questionIds.includes(id));
  assert.ok(unseen.length >= 14, `expected balanced retest to use nearly all unseen questions; found ${unseen.length}`);
});

test('selector refuses a compromised retest when exclusions break a topic quota', () => {
  const questions = syntheticBank('classify');
  const liberalIds = questions.filter((question) => question.blueprintBucket === 'liberal').map((question) => question.id);
  const result = selectCertifiedQuestionPlan({
    questions,
    section: 'classify',
    bankVersion: LITERACY_MASTER_BANK_VERSION,
    seed: 'blocked',
    previousAttempt: { shownQuestionIds: liberalIds, incorrectQuestionIds: liberalIds },
  });
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.reason, 'BLUEPRINT_INFEASIBLE_AFTER_EXCLUSIONS');
  assert.match(result.errors.join(' '), /liberal/);
});

test('selector cannot certify an incomplete or unvalidated master bank', () => {
  const incomplete = syntheticBank('classify').slice(0, 39);
  const result = selectCertifiedQuestionPlan({
    questions: incomplete,
    section: 'classify',
    bankVersion: LITERACY_MASTER_BANK_VERSION,
    seed: 'incomplete',
  });
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.reason, 'BANK_NOT_READY');
});
