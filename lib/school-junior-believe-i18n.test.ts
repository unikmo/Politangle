import assert from 'node:assert/strict';
import test from 'node:test';
import { germanBeliefStatement } from './german-believe';
import { romanceBeliefStatement } from './romance-believe';
import { schoolJuniorBeliefItems } from './school-believe';

test('all 16 Junior belief items have German Spanish and French wording on both poles', () => {
  assert.equal(schoolJuniorBeliefItems.length, 16);
  for (const item of schoolJuniorBeliefItems) {
    for (const polarity of ['negative', 'positive'] as const) {
      const english = polarity === 'negative' ? item.negative : item.positive;
      const de = germanBeliefStatement(item.id, polarity);
      const es = romanceBeliefStatement('es', item.id, polarity);
      const fr = romanceBeliefStatement('fr', item.id, polarity);
      assert.ok(de && es && fr, `${item.id}/${polarity} needs all three translations`);
      assert.notEqual(de, english);
      assert.notEqual(es, english);
      assert.notEqual(fr, english);
    }
  }
});
