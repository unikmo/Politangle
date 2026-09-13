import { validateLiteracyQuestion, type LiteracyQuestion } from './deep-engine';
import { POLITANGLE_PRODUCT_DECISIONS } from './product-decisions';

export const LITERACY_MASTER_BANK_VERSION = 'literacy-master-2026.09-candidate-1' as const;
export const CERTIFIED_BLUEPRINT_VERSION = 'literacy-certified-blueprint-2026.09-1' as const;

export type LiteracyValidationStatus =
  | 'draft'
  | 'candidate'
  | 'expert_review'
  | 'cognitive_test'
  | 'validated'
  | 'retired';

export type LiteracyDifficulty = 'introductory' | 'intermediate' | 'advanced';

const DIFFICULTIES = new Set<LiteracyDifficulty>(['introductory', 'intermediate', 'advanced']);
const VALIDATION_STATUSES = new Set<LiteracyValidationStatus>([
  'draft',
  'candidate',
  'expert_review',
  'cognitive_test',
  'validated',
  'retired',
]);

export type LiteracyValidationRecord = {
  reviewedAt: string;
  reviewerRole: string;
  definitionEvidence: 'pass';
  ambiguity: 'pass';
  ideologicalBias: 'pass';
  distractorQuality: 'pass';
  duplicateConcept: 'pass';
  difficulty: 'pass';
  multidimensionalConsistency: 'pass';
};

export type ClassifyBlueprintBucket =
  | 'liberal'
  | 'socialist_communist'
  | 'conservative_christian_democratic'
  | 'green_ecological'
  | 'nationalism_populism'
  | 'radical_extreme_fascist'
  | 'democracy_authoritarianism'
  | 'anarchism_other'
  | 'cross_family';

export type UnderstandBlueprintBucket =
  | 'definitions'
  | 'adjacent_distinctions'
  | 'institutions_power'
  | 'economics_ownership'
  | 'misconceptions'
  | 'authoritarian_totalitarian'
  | 'left_right_limits'
  | 'multidimensional_patterns';

type LiteracyQuestionRecordBase = Omit<LiteracyQuestion, 'section'> & {
  bankVersion: string;
  status: LiteracyValidationStatus;
  difficulty: LiteracyDifficulty;
  secondaryTags: readonly string[];
  sourceLanguage: string;
  validation?: LiteracyValidationRecord;
};

export type ClassifyQuestionRecord = LiteracyQuestionRecordBase & {
  section: 'classify';
  blueprintBucket: ClassifyBlueprintBucket;
};

export type UnderstandQuestionRecord = LiteracyQuestionRecordBase & {
  section: 'understand';
  blueprintBucket: UnderstandBlueprintBucket;
};

export type LiteracyQuestionRecord = ClassifyQuestionRecord | UnderstandQuestionRecord;

export type CertifiedSectionBlueprint<TBucket extends string> = {
  version: typeof CERTIFIED_BLUEPRINT_VERSION;
  total: number;
  topicQuotas: Readonly<Record<TBucket, number>>;
  difficultyQuotas: Readonly<Record<LiteracyDifficulty, number>>;
};

export const CLASSIFY_CERTIFIED_BLUEPRINT: CertifiedSectionBlueprint<ClassifyBlueprintBucket> = {
  version: CERTIFIED_BLUEPRINT_VERSION,
  total: POLITANGLE_PRODUCT_DECISIONS.literacy.servedQuestionsPerSection,
  topicQuotas: {
    liberal: 3,
    socialist_communist: 3,
    conservative_christian_democratic: 3,
    green_ecological: 2,
    nationalism_populism: 3,
    radical_extreme_fascist: 3,
    democracy_authoritarianism: 3,
    anarchism_other: 2,
    cross_family: 3,
  },
  difficultyQuotas: { introductory: 6, intermediate: 13, advanced: 6 },
};

export const UNDERSTAND_CERTIFIED_BLUEPRINT: CertifiedSectionBlueprint<UnderstandBlueprintBucket> = {
  version: CERTIFIED_BLUEPRINT_VERSION,
  total: POLITANGLE_PRODUCT_DECISIONS.literacy.servedQuestionsPerSection,
  topicQuotas: {
    definitions: 3,
    adjacent_distinctions: 4,
    institutions_power: 3,
    economics_ownership: 3,
    misconceptions: 3,
    authoritarian_totalitarian: 3,
    left_right_limits: 3,
    multidimensional_patterns: 3,
  },
  difficultyQuotas: { introductory: 6, intermediate: 13, advanced: 6 },
};

export function certifiedBlueprintFor(section: LiteracyQuestionRecord['section']) {
  return section === 'classify' ? CLASSIFY_CERTIFIED_BLUEPRINT : UNDERSTAND_CERTIFIED_BLUEPRINT;
}

export function validateLiteracyQuestionRecord(question: LiteracyQuestionRecord) {
  const errors = [...validateLiteracyQuestion(question).errors];
  if (!question.bankVersion.trim()) errors.push(`Question ${question.id} has no bank version`);
  if (!question.sourceLanguage.trim()) errors.push(`Question ${question.id} has no source language`);
  if (!['classify', 'understand'].includes(question.section)) errors.push(`Question ${question.id} has an invalid section`);
  if (!DIFFICULTIES.has(question.difficulty)) errors.push(`Question ${question.id} has an invalid difficulty`);
  if (!VALIDATION_STATUSES.has(question.status)) errors.push(`Question ${question.id} has an invalid validation status`);
  if (question.section === 'classify' || question.section === 'understand') {
    const blueprint = certifiedBlueprintFor(question.section);
    if (!Object.prototype.hasOwnProperty.call(blueprint.topicQuotas, question.blueprintBucket)) {
      errors.push(`Question ${question.id} has an invalid ${question.section} blueprint bucket`);
    }
  }
  if (question.status === 'validated') {
    if (!question.validation?.reviewedAt || !question.validation.reviewerRole.trim()) {
      errors.push(`Validated question ${question.id} has no complete validation record`);
    } else {
      const checks = [
        question.validation.definitionEvidence,
        question.validation.ambiguity,
        question.validation.ideologicalBias,
        question.validation.distractorQuality,
        question.validation.duplicateConcept,
        question.validation.difficulty,
        question.validation.multidimensionalConsistency,
      ];
      if (checks.some((check) => check !== 'pass')) errors.push(`Validated question ${question.id} has an incomplete validation check`);
    }
  }
  return { valid: errors.length === 0, errors };
}

export function validateCertifiedMasterBank(
  questions: readonly LiteracyQuestionRecord[],
  section: LiteracyQuestionRecord['section'],
  bankVersion: string,
) {
  const errors: string[] = [];
  const eligible = questions.filter(
    (question) => question.section === section && question.bankVersion === bankVersion && question.status === 'validated',
  );
  const expected = POLITANGLE_PRODUCT_DECISIONS.literacy.masterBankSizePerSection;
  if (eligible.length !== expected) errors.push(`${section} requires exactly ${expected} validated questions; found ${eligible.length}`);

  const ids = eligible.map((question) => question.id);
  if (new Set(ids).size !== ids.length) errors.push(`${section} contains duplicate question ids`);

  for (const question of eligible) errors.push(...validateLiteracyQuestionRecord(question).errors);

  const blueprint = certifiedBlueprintFor(section);
  const topicTotal = Object.values(blueprint.topicQuotas).reduce((sum, count) => sum + count, 0);
  const difficultyTotal = Object.values(blueprint.difficultyQuotas).reduce((sum, count) => sum + count, 0);
  if (topicTotal !== blueprint.total) errors.push(`${section} topic quotas total ${topicTotal}, expected ${blueprint.total}`);
  if (difficultyTotal !== blueprint.total) errors.push(`${section} difficulty quotas total ${difficultyTotal}, expected ${blueprint.total}`);

  for (const [bucket, required] of Object.entries(blueprint.topicQuotas)) {
    const available = eligible.filter((question) => question.blueprintBucket === bucket).length;
    if (available < required) errors.push(`${section} bucket ${bucket} requires ${required}, found ${available}`);
  }
  for (const [difficulty, required] of Object.entries(blueprint.difficultyQuotas)) {
    const available = eligible.filter((question) => question.difficulty === difficulty).length;
    if (available < required) errors.push(`${section} difficulty ${difficulty} requires ${required}, found ${available}`);
  }

  return { valid: errors.length === 0, errors };
}
