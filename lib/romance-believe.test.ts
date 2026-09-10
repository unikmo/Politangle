import assert from 'node:assert/strict';
import test from 'node:test';
import { lockedBeliefItemsV2 } from './belief-v2-engine';
import { frenchBeliefPairCount, romanceBeliefStatement, spanishBeliefPairCount } from './romance-believe';

test('Spanish and French candidate forms cover all 84 BELIEVE statements', () => {
  assert.equal(spanishBeliefPairCount, 42);
  assert.equal(frenchBeliefPairCount, 42);
  for (const locale of ['es', 'fr'] as const) {
    for (const item of lockedBeliefItemsV2) {
      assert.ok(romanceBeliefStatement(locale, item.id, 'negative'));
      assert.ok(romanceBeliefStatement(locale, item.id, 'positive'));
    }
  }
});

test('Spanish and French candidate wording keeps a controlled reading load', () => {
  for (const locale of ['es', 'fr'] as const) {
    const statements = lockedBeliefItemsV2.flatMap((item) => [
      romanceBeliefStatement(locale, item.id, 'negative')!,
      romanceBeliefStatement(locale, item.id, 'positive')!,
    ]);
    assert.ok(statements.every((statement) => statement.trim().split(/\s+/).length <= 24));
    assert.ok(statements.every((statement) => /[.!?]$/.test(statement)));
  }
});
