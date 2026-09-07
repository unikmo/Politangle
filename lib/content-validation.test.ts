import assert from 'node:assert/strict';
import test from 'node:test';
import { allDeepBeliefQuestions, deepLiteracyQuestions } from './deep-bank';
import { deepBeliefAxisMeta, validateDeepBeliefQuestion, validateLiteracyQuestion } from './deep-engine';
import { evidenceById } from './evidence';
import { quickQuestions } from './questions';

function assertEvidence(ids: readonly string[], label: string) {
  assert.ok(ids.length > 0, `${label} needs evidence`);
  for (const id of ids) assert.ok(evidenceById.has(id), `${label} references unknown evidence ${id}`);
}

test('Quick v2 has 26 paired items with auditable evidence', () => {
  assert.equal(quickQuestions.length, 26);
  for (const question of quickQuestions) {
    assert.ok(question.negative.trim());
    assert.ok(question.positive.trim());
    assert.notEqual(question.negative, question.positive);
    assertEvidence(question.evidenceIds, `Quick ${question.id}`);
  }
});

test('Deep belief bank has exactly two items per validation axis', () => {
  const axes = Object.keys(deepBeliefAxisMeta) as (keyof typeof deepBeliefAxisMeta)[];
  assert.equal(allDeepBeliefQuestions.length, axes.length * 2);
  for (const axis of axes) {
    const items = allDeepBeliefQuestions.filter((question) => question.axis === axis);
    assert.equal(items.length, 2, `${axis} should have exactly two content-validation items`);
    for (const question of items) {
      assert.deepEqual(validateDeepBeliefQuestion(question), { valid: true, errors: [] });
      assertEvidence(question.evidenceIds, `Deep belief ${question.id}`);
    }
  }
});

test('Deep literacy bank contains nine classify and six understand items', () => {
  assert.equal(deepLiteracyQuestions.filter((question) => question.section === 'classify').length, 9);
  assert.equal(deepLiteracyQuestions.filter((question) => question.section === 'understand').length, 6);
  assert.equal(deepLiteracyQuestions.length, 15);

  for (const question of deepLiteracyQuestions) {
    assert.deepEqual(validateLiteracyQuestion(question), { valid: true, errors: [] });
    assertEvidence(question.evidenceIds, `Deep literacy ${question.id}`);
  }
});

test('canonical literacy answer keys distinguish key traditions', () => {
  const expected: Record<string, string> = {
    C1: 'social-democracy',
    C2: 'democratic-socialism',
    C3: 'libertarianism',
    C4: 'conservatism',
    C5: 'christian-democracy',
    C6: 'green-politics',
    C7: 'communism',
    C8: 'fascism',
    C9: 'cross-cutting-nationalism',
    U1: 'thin-host',
    U2: 'cross-cutting',
    U3: 'rights-checks',
    U4: 'democracy',
    U5: 'diverse-family',
    U6: 'broad-family',
  };

  for (const question of deepLiteracyQuestions) {
    assert.deepEqual(question.acceptedAnswerSets, [[expected[question.id]]], `Unexpected key for ${question.id}`);
  }
});
