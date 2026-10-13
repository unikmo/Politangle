import assert from 'node:assert/strict';
import test from 'node:test';
import { assessTendenciesV2 } from './belief-v2-engine';
import { lockedBeliefStatementsV3, lockedQuickStatementIds, lockedFullFollowUpStatementIds } from './belief-v2-session';
import { collapseStatementAnswers } from './belief-statements';

test('actual 26+16 presentation uses two positive and one reverse-coded populism statement', () => {
  assert.ok(lockedQuickStatementIds.includes('T11-P'));
  assert.ok(lockedQuickStatementIds.includes('A11-P'));
  assert.ok(lockedFullFollowUpStatementIds.includes('F11-N'));
});

test('reverse-coded FEEL statement is not accidentally counted as a populist endorsement', () => {
  const measure = (answers: Record<string, -2 | 2>) => {
    const canonical = collapseStatementAnswers(answers, lockedBeliefStatementsV3);
    return assessTendenciesV2(canonical).find((row) => row.id === 'populism')!;
  };
  // FEEL question says it is upsetting when politics is portrayed as good
  // people vs bad politicians. Disagreeing is the populist-direction response.
  assert.deepEqual(measure({ 'T11-P': 2, 'F11-N': -2, 'A11-P': 2 }),
    { id: 'populism', score: 100, coverage: 100 });
  // Agreeing with this FEEL item rejects moralized political conflict.
  assert.deepEqual(measure({ 'T11-P': 2, 'F11-N': 2, 'A11-P': 2 }),
    { id: 'populism', score: 0, coverage: 100 });
  assert.deepEqual(measure({ 'T11-P': 2, 'A11-P': 2 }),
    { id: 'populism', score: null, coverage: 67 });
});
