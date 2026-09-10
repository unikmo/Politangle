import assert from 'node:assert/strict';
import test from 'node:test';
import { lockedBeliefItemsV2 } from './belief-v2-engine';
import { canonicalizeStatementAnswer, collapseStatementAnswers, expandBeliefItems } from './belief-statements';

test('42 paired constructs expand to 84 unique single statements with Quick 52', () => {
  const statements = expandBeliefItems(lockedBeliefItemsV2);
  assert.equal(statements.length, 84);
  assert.equal(statements.filter((item) => item.stage === 'quick').length, 52);
  assert.equal(new Set(statements.map((item) => item.id)).size, 84);
  assert.ok(statements.every((item) => item.statement.trim() && !('negative' in item) && !('positive' in item)));
});

test('negative-statement agreement is reversed into the canonical coordinate', () => {
  assert.equal(canonicalizeStatementAnswer(2, 'negative'), -2);
  assert.equal(canonicalizeStatementAnswer(-2, 'negative'), 2);
  assert.equal(canonicalizeStatementAnswer(2, 'positive'), 2);
  assert.equal(canonicalizeStatementAnswer('unsure', 'negative'), 'unsure');
});

test('semantically equivalent answers reproduce the original pair score without double weighting', () => {
  const statements = expandBeliefItems(lockedBeliefItemsV2);
  const answers = { 'T01-N': -2 as const, 'T01-P': 2 as const };
  assert.equal(collapseStatementAnswers(answers, statements).T01, 2);
  const opposite = { 'T01-N': 2 as const, 'T01-P': -2 as const };
  assert.equal(collapseStatementAnswers(opposite, statements).T01, -2);
});
