import assert from 'node:assert/strict';
import test from 'node:test';
import { schoolYouthBeliefItems } from './school-believe';
import { schoolYouthStatement, schoolYouthLocalizedIds } from './school-youth-localized';
import { schoolStatement } from './school-statement';
import { germanBeliefStatement } from './german-believe';

const locales = ['de', 'es', 'fr', 'pt-br'] as const;
const words = (value: string) => value.trim().split(/\s+/).length;

test('localized Youth bank covers every item and both sides in four languages', () => {
  assert.equal(schoolYouthLocalizedIds.length, 42);
  for (const locale of locales) {
    for (const item of schoolYouthBeliefItems) {
      const negative = schoolYouthStatement(locale, item.id, 'negative');
      const positive = schoolYouthStatement(locale, item.id, 'positive');
      assert.ok(negative && positive, `${locale}/${item.id}: missing side`);
      assert.notEqual(negative, positive, `${locale}/${item.id}: both sides identical`);
      for (const text of [negative, positive]) {
        assert.match(text, /[.!?]$/, `${locale}/${item.id}: incomplete sentence`);
        assert.ok(words(text) <= 36, `${locale}/${item.id}: too long for a young reader`);
      }
    }
  }
});

test('localized Youth wording is not a copy of the adult wording', () => {
  let same = 0;
  for (const item of schoolYouthBeliefItems) {
    for (const polarity of ['negative', 'positive'] as const) {
      if (schoolYouthStatement('de', item.id, polarity) === germanBeliefStatement(item.id, polarity)) same += 1;
    }
  }
  assert.ok(same <= 2, `${same}/84 German Youth sides equal the adult wording`);
});

test('school screens use Youth wording first, then adult wording, then the English text', () => {
  assert.equal(schoolStatement('en', 'T01', 'negative', 'English text'), 'English text');
  assert.equal(schoolStatement('de', 'T01', 'negative', 'English text'), schoolYouthStatement('de', 'T01', 'negative'));
  assert.equal(schoolStatement('de', 'ZZ99', 'negative', 'English text'), 'English text');
  // Junior items are not in the Youth bank, so they keep their existing adult-bank lookup.
  assert.equal(schoolYouthStatement('de', 'J01', 'negative'), undefined);
});
