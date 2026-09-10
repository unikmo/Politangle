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
  const wordCounts: number[] = [];
  for (const item of lockedBeliefItemsV2) {
    for (const polarity of ['negative', 'positive'] as const) {
      const statement = germanBeliefStatement(item.id, polarity)!;
      const wordCount = statement.split(/\s+/).length;
      wordCounts.push(wordCount);
      assert.ok(wordCount <= 20, `${item.id}-${polarity} is too long`);
      assert.match(statement, /[.!?]$/);
    }
  }
  assert.ok(wordCounts.reduce((sum, count) => sum + count, 0) / wordCounts.length <= 15);
});

test('German candidate avoids unexplained administrative jargon', () => {
  const all = lockedBeliefItemsV2.flatMap((item) => [
    germanBeliefStatement(item.id, 'negative')!,
    germanBeliefStatement(item.id, 'positive')!,
  ]).join(' ').toLowerCase();
  for (const jargon of ['daseinsvorsorge', 'subsidiarität', 'anteilseigner', 'zielkonflikt', 'moralvorstellungen']) {
    assert.equal(all.includes(jargon), false, `German candidate still contains ${jargon}`);
  }
});
