import assert from 'node:assert/strict';
import test from 'node:test';
import { lockedBeliefItemsV2 } from './belief-v2-engine';
import { lockedBeliefStatementsV3, lockedQuickStatementIds, lockedFullFollowUpStatementIds } from './belief-v2-session';
import { germanBeliefStatement } from './german-believe';
import { romanceBeliefStatement } from './romance-believe';
import { portugueseBrBeliefStatement } from './portuguese-br-believe';

const localized = {
  de: germanBeliefStatement,
  es: (id: string, polarity: 'negative' | 'positive') => romanceBeliefStatement('es', id, polarity),
  fr: (id: string, polarity: 'negative' | 'positive') => romanceBeliefStatement('fr', id, polarity),
  'pt-br': portugueseBrBeliefStatement,
} as const;
const danglingComparatives: Record<keyof typeof localized, RegExp> = {
  de: /^(ich finde es schlimmer|es beunruhigt mich mehr|ich mache mir mehr sorgen|ich sorge mich stärker)/i,
  es: /^(me preocupa más|me incomoda más|me molesta más)/i,
  fr: /^(je crains davantage|je suis plus mal à l'aise|je m'inquiète davantage)/i,
  'pt-br': /^(me preocupa mais|me incomoda mais|me inquieta mais)/i,
};

test('all 42 adult questions retain two distinct complete wordings in each locale', () => {
  assert.equal(lockedBeliefItemsV2.length, 42);
  assert.equal(lockedBeliefStatementsV3.length, 84);
  for (const [locale, statement] of Object.entries(localized) as [keyof typeof localized, typeof germanBeliefStatement][]) {
    for (const item of lockedBeliefItemsV2) {
      const negative = statement(item.id, 'negative');
      const positive = statement(item.id, 'positive');
      for (const text of [negative, positive]) {
        assert.ok(text && text.length >= 25, locale + '/' + item.id + ': absent or unclear');
        assert.match(text, /[.!?]$/, locale + '/' + item.id + ': incomplete sentence');
      }
      assert.notEqual(negative, positive, locale + '/' + item.id + ': identical political alternatives');
    }
  }
});

test('Full FEEL questions no longer use a missing second comparison', () => {
  for (const [locale, statement] of Object.entries(localized) as [keyof typeof localized, typeof germanBeliefStatement][]) {
    for (let i = 1; i <= 14; i++) {
      const id = 'F' + String(i).padStart(2, '0');
      for (const polarity of ['negative', 'positive'] as const) {
        const candidate = statement(id, polarity)!;
        assert.doesNotMatch(candidate, danglingComparatives[locale], locale + '/' + id);
      }
    }
  }
});

test('pluralism spells out independent courts in five language versions', () => {
  for (const id of ['T08', 'F08', 'A08']) {
    for (const polarity of ['negative', 'positive'] as const) {
      assert.match(germanBeliefStatement(id, polarity)!, /Gericht/i, 'de/' + id);
      assert.match(romanceBeliefStatement('es', id, polarity)!, /tribunal|jue[cz]/i, 'es/' + id);
      assert.match(romanceBeliefStatement('fr', id, polarity)!, /tribun|juge/i, 'fr/' + id);
      assert.match(portugueseBrBeliefStatement(id, polarity)!, /tribuna|juí/i, 'pt-br/' + id);
    }
  }
});

test('birth-citizenship ACT scenario measures access to political office, not hiring prejudice', () => {
  for (const [locale, statement] of Object.entries(localized) as [keyof typeof localized, typeof germanBeliefStatement][]) {
    const together = [statement('A10', 'negative'), statement('A10', 'positive')].join(' ').toLowerCase();
    assert.doesNotMatch(together, /empleo público|emploi public|emprego público|öffentliche stelle/);
    assert.match(together, /politisch|polític|électif|eletiv/, locale);
  }
});

test('one item per source remains locked across the 26 Quick and 16 Full stages', () => {
  assert.equal(lockedQuickStatementIds.length, 26);
  assert.equal(lockedFullFollowUpStatementIds.length, 16);
  assert.equal(new Set([...lockedQuickStatementIds, ...lockedFullFollowUpStatementIds].map(id => id.slice(0, 3))).size, 42);
});
