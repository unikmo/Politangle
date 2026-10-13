import assert from 'node:assert/strict';
import test from 'node:test';
import { literacyMasterBankCandidates } from './literacy-master-bank';
import { hasLiteracyTranslation, literacyTranslations, localizedLiteracyQuestion, type LiteracyTranslationLocale } from './literacy-localized';

const locales = Object.keys(literacyTranslations) as LiteracyTranslationLocale[];

// Pins the English source the translations were written against. If this fails, the English wording changed:
// update the affected translations in lib/literacy-localized-*.ts, then update the pin.
function sourceFingerprint() {
  const content = JSON.stringify(literacyMasterBankCandidates.map((q) => [q.id, q.prompt, q.options.map((o) => [o.id, o.label]), q.explanation]));
  let hash = 2166136261;
  for (let i = 0; i < content.length; i += 1) { hash ^= content.charCodeAt(i); hash = Math.imul(hash, 16777619); }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

test('the translated practice bank was written against the current English wording', () => {
  assert.equal(sourceFingerprint(), '5c744024');
});

test('every practice question is available in German, Spanish, French and Portuguese', () => {
  assert.equal(literacyMasterBankCandidates.length, 80);
  for (const locale of locales) {
    for (const question of literacyMasterBankCandidates) {
      assert.ok(hasLiteracyTranslation(locale, question), `${locale} is missing a complete translation of ${question.id}`);
    }
    const extra = Object.keys(literacyTranslations[locale].bank).filter((id) => !literacyMasterBankCandidates.some((q) => q.id === id));
    assert.deepEqual(extra, [], `${locale} has translations for unknown questions`);
  }
});

test('translated questions keep ids and option order and never come back empty or in English', () => {
  for (const locale of locales) {
    for (const question of literacyMasterBankCandidates) {
      const translated = localizedLiteracyQuestion(locale, question);
      assert.deepEqual(translated.options.map((o) => o.id), question.options.map((o) => o.id));
      assert.deepEqual(translated.acceptedAnswerSets, question.acceptedAnswerSets);
      assert.notEqual(translated.prompt, question.prompt, `${locale} ${question.id} prompt is still English`);
      assert.notEqual(translated.explanation, question.explanation, `${locale} ${question.id} explanation is still English`);
      for (const option of translated.options) assert.ok(option.label.trim().length > 2, `${locale} ${question.id} has an empty option`);
      assert.equal(new Set(translated.options.map((o) => o.label)).size, translated.options.length, `${locale} ${question.id} has duplicate options`);
    }
  }
});

test('translations contain no leftover English phrases', () => {
  // Informal address is enforced for all source files by informal-address.test.ts.
  for (const locale of locales) {
    const text = JSON.stringify(literacyTranslations[locale]);
    assert.doesNotMatch(text, /(?:the|which|and|with) (?:movement|tradition|democracy|government)/i, `${locale} contains English leftovers`);
  }
});
