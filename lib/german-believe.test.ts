import assert from 'node:assert/strict';
import test from 'node:test';
import { germanBeliefPairCount, germanBeliefStatement } from './german-believe';
import { lockedBeliefItemsV2 } from './belief-v2-engine';

test('German candidate form covers all 84 adult BELIEVE statements', () => {
  assert.equal(germanBeliefPairCount, 42);
  for (const item of lockedBeliefItemsV2) {
    assert.ok(germanBeliefStatement(item.id, 'negative'));
    assert.ok(germanBeliefStatement(item.id, 'positive'));
  }
});

test('German candidate statements meet a preliminary reading-load guardrail', () => {
  for (const item of lockedBeliefItemsV2) {
    for (const polarity of ['negative', 'positive'] as const) {
      const statement = germanBeliefStatement(item.id, polarity)!;
      assert.ok(statement.split(/\s+/).length <= 30, `${item.id}-${polarity} is too long`);
      assert.match(statement, /[.!?]$/);
    }
  }
});
