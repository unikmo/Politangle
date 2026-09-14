import assert from 'node:assert/strict';
import test from 'node:test';
import { evidenceById } from './evidence';
import {
  CLASSIFY_CERTIFIED_BLUEPRINT,
  LITERACY_MASTER_BANK_VERSION,
  UNDERSTAND_CERTIFIED_BLUEPRINT,
  validateCertifiedMasterBank,
  validateLiteracyQuestionRecord,
  type LiteracyQuestionRecord,
} from './literacy-bank-schema';
import {
  classifyMasterBankCandidates,
  literacyMasterBankCandidates,
  understandMasterBankCandidates,
} from './literacy-master-bank';

function normalizedTokens(value: string) {
  return new Set(value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((token) => token.length > 3));
}

function jaccard(left: Set<string>, right: Set<string>) {
  const intersection = [...left].filter((token) => right.has(token)).length;
  const union = new Set([...left, ...right]).size;
  return union === 0 ? 0 : intersection / union;
}

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function assertBlueprintCapacity(
  questions: readonly LiteracyQuestionRecord[],
  topicQuotas: Readonly<Record<string, number>>,
  difficultyQuotas: Readonly<Record<string, number>>,
) {
  for (const [bucket, minimum] of Object.entries(topicQuotas)) {
    assert.ok(questions.filter((question) => question.blueprintBucket === bucket).length >= minimum, `${bucket} lacks capacity`);
  }
  for (const [difficulty, minimum] of Object.entries(difficultyQuotas)) {
    assert.ok(questions.filter((question) => question.difficulty === difficulty).length >= minimum, `${difficulty} lacks capacity`);
  }
}

test('candidate master bank contains exactly 40 CLASSIFY and 40 UNDERSTAND records', () => {
  assert.equal(classifyMasterBankCandidates.length, 40);
  assert.equal(understandMasterBankCandidates.length, 40);
  assert.equal(literacyMasterBankCandidates.length, 80);
  assert.equal(new Set(literacyMasterBankCandidates.map((question) => question.id)).size, 80);
});

test('all candidate records are structurally valid and evidence-bound', () => {
  for (const question of literacyMasterBankCandidates) {
    assert.deepEqual(validateLiteracyQuestionRecord(question), { valid: true, errors: [] }, question.id);
    assert.equal(question.bankVersion, LITERACY_MASTER_BANK_VERSION);
    assert.equal(question.status, 'candidate');
    for (const evidenceId of question.evidenceIds) {
      assert.ok(evidenceById.has(evidenceId), `${question.id} references missing evidence ${evidenceId}`);
    }
  }
});

test('candidate coverage can satisfy both certified blueprints after validation', () => {
  assertBlueprintCapacity(
    classifyMasterBankCandidates,
    CLASSIFY_CERTIFIED_BLUEPRINT.topicQuotas,
    CLASSIFY_CERTIFIED_BLUEPRINT.difficultyQuotas,
  );
  assertBlueprintCapacity(
    understandMasterBankCandidates,
    UNDERSTAND_CERTIFIED_BLUEPRINT.topicQuotas,
    UNDERSTAND_CERTIFIED_BLUEPRINT.difficultyQuotas,
  );
});

test('candidate questions cannot enter certified selection prematurely', () => {
  const classify = validateCertifiedMasterBank(classifyMasterBankCandidates, 'classify', LITERACY_MASTER_BANK_VERSION);
  const understand = validateCertifiedMasterBank(understandMasterBankCandidates, 'understand', LITERACY_MASTER_BANK_VERSION);
  assert.equal(classify.valid, false);
  assert.equal(understand.valid, false);
  assert.match(classify.errors.join(' '), /exactly 40 validated questions; found 0/);
  assert.match(understand.errors.join(' '), /exactly 40 validated questions; found 0/);
});

test('the ten founder-approved first expansion themes are explicitly represented', () => {
  const tags = new Set(literacyMasterBankCandidates.flatMap((question) => question.secondaryTags));
  for (const tag of [
    'democratic-socialism',
    'classical-liberalism',
    'authoritarianism',
    'anarchism',
    'marxism-leninism',
    'social-democracy',
    'social-liberalism',
    'libertarianism',
    'totalitarianism',
    'economic-left-right',
  ]) assert.ok(tags.has(tag), `Missing approved expansion theme ${tag}`);
});

test('candidate prompts avoid exact and near-duplicate wording', () => {
  for (let first = 0; first < literacyMasterBankCandidates.length; first += 1) {
    for (let second = first + 1; second < literacyMasterBankCandidates.length; second += 1) {
      const left = literacyMasterBankCandidates[first];
      const right = literacyMasterBankCandidates[second];
      if (left.section !== right.section) continue;
      const similarity = jaccard(normalizedTokens(left.prompt), normalizedTokens(right.prompt));
      assert.ok(similarity < 0.72, `${left.id} and ${right.id} are too similar (${similarity.toFixed(2)})`);
    }
  }
});

test('reader-facing copy stays within the plain-English reading-load limits', () => {
  for (const question of literacyMasterBankCandidates) {
    assert.ok(wordCount(question.prompt) <= 22, `${question.id} prompt is too long`);
    assert.ok(wordCount(question.explanation) <= 26, `${question.id} explanation is too long`);
    assert.equal(question.options.length, 4, `${question.id} must offer exactly four choices`);
    assert.equal(question.acceptedAnswerSets.length, 1, `${question.id} must have one defensible answer`);
    assert.equal(question.acceptedAnswerSets[0].length, 1, `${question.id} must be single-answer`);
    for (const option of question.options) {
      assert.ok(wordCount(option.label) <= 16, `${question.id}/${option.id} is too long`);
    }
  }
});

test('answer wording does not reveal the correct choice through length', () => {
  for (const question of literacyMasterBankCandidates) {
    const accepted = new Set(question.acceptedAnswerSets.flat());
    const correctLongest = Math.max(...question.options.filter((option) => accepted.has(option.id)).map((option) => wordCount(option.label)));
    const distractorLongest = Math.max(...question.options.filter((option) => !accepted.has(option.id)).map((option) => wordCount(option.label)));
    assert.ok(correctLongest - distractorLongest < 4, `${question.id} cues its answer through length`);
  }
});

test('prompts and explanations avoid unexplained academic shorthand', () => {
  const blocked = [
    'thin-centered',
    'host ideology',
    'procedural democracy',
    'cross-pressured',
    'institutional forms',
    'substantially socialized',
    'coercive state power',
  ];
  for (const question of literacyMasterBankCandidates) {
    const readerCopy = `${question.prompt} ${question.explanation}`.toLowerCase();
    for (const phrase of blocked) assert.equal(readerCopy.includes(phrase), false, `${question.id} contains ${phrase}`);
  }
});
