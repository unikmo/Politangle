import assert from 'node:assert/strict';
import test from 'node:test';
import { schoolJuniorBeliefItems, schoolYouthBeliefItems } from './school-believe';
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

test('Junior 10-13 set has both sides in all four languages', () => {
  const junior = schoolJuniorBeliefItems;
  assert.equal(junior.length, 16);
  for (const item of junior) {
    for (const locale of ['de', 'es', 'fr', 'pt-br'] as const) {
      const negative = schoolStatement(locale, item.id, 'negative', item.negative);
      const positive = schoolStatement(locale, item.id, 'positive', item.positive);
      assert.notEqual(negative, item.negative, `${locale}/${item.id}: negative still English`);
      assert.notEqual(positive, item.positive, `${locale}/${item.id}: positive still English`);
      assert.notEqual(negative, positive, `${locale}/${item.id}: both sides identical`);
      assert.ok(words(negative) <= 24 && words(positive) <= 24, `${locale}/${item.id}: too long for a 10-year-old`);
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
  // German Junior wording lives in german-believe.ts, so the Youth lookup has no J items for German.
  assert.equal(schoolYouthStatement('de', 'J01', 'negative'), undefined);
});
