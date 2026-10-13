import { deLiteracyBank, deLiteracyTerms } from './literacy-localized-de';
import { literacyMasterBankCandidates } from './literacy-master-bank';
import { esLiteracyBank, esLiteracyTerms } from './literacy-localized-es';
import { frLiteracyBank, frLiteracyTerms } from './literacy-localized-fr';
import { ptBrLiteracyBank, ptBrLiteracyTerms } from './literacy-localized-pt-br';
import type { LocalizedLiteracyBank, LocalizedLiteracyTerms } from './literacy-localized-types';

// Draft translations of the CLASSIFY / UNDERSTAND practice bank. They follow the English wording of the
// master bank and have not been reviewed by native speakers yet. A question is shown translated only
// when every part of it (prompt, all options, explanation) is available; otherwise it stays English.
export const LITERACY_LOCALIZED_VERSION = 'literacy-localized-2026.10-draft-v1' as const;

export type LiteracyTranslationLocale = 'de' | 'es' | 'fr' | 'pt-br';

type TextQuestion = {
  id: string;
  prompt: string;
  explanation: string;
  options: readonly { id: string; label: string }[];
};

export const literacyTranslations: Record<LiteracyTranslationLocale, { bank: LocalizedLiteracyBank; terms: LocalizedLiteracyTerms }> = {
  de: { bank: deLiteracyBank, terms: deLiteracyTerms },
  es: { bank: esLiteracyBank, terms: esLiteracyTerms },
  fr: { bank: frLiteracyBank, terms: frLiteracyTerms },
  'pt-br': { bank: ptBrLiteracyBank, terms: ptBrLiteracyTerms },
};

const masterById = new Map(literacyMasterBankCandidates.map((question) => [question.id, question]));

// A translation is only used for the exact English question it was written for. Questions with the same id but
// different wording (for example edited school copies) stay in English instead of showing a mismatched translation.
function sourceFor(question: TextQuestion) {
  const source = masterById.get(question.id);
  if (!source || source.prompt !== question.prompt || source.options.length !== question.options.length) return null;
  return question.options.every((option) => source.options.find((candidate) => candidate.id === option.id)?.label === option.label) ? source : null;
}

export function isLiteracyTranslationLocale(locale: string): locale is LiteracyTranslationLocale {
  return locale === 'de' || locale === 'es' || locale === 'fr' || locale === 'pt-br';
}

/** Returns the question in the reader's language, or the original English question when no complete translation exists. */
export function localizedLiteracyQuestion<Q extends TextQuestion>(locale: string, question: Q): Q {
  if (!isLiteracyTranslationLocale(locale)) return question;
  const { bank, terms } = literacyTranslations[locale];
  const entry = bank[question.id];
  const source = sourceFor(question);
  if (!entry || !source) return question;
  const [prompt, explanation, labels] = entry;
  if (labels && labels.length !== question.options.length) return question;
  // Labels are stored in the order of the English source options, so a caller that reorders options still gets the right text.
  const options = question.options.map((option) => {
    const position = source.options.findIndex((candidate) => candidate.id === option.id);
    return { ...option, label: labels ? labels[position] : terms[option.label] };
  });
  if (options.some((option) => !option.label)) return question;
  return { ...question, prompt, explanation, options };
}

/** True when the question would be shown in the reader's language. */
export function hasLiteracyTranslation(locale: string, question: TextQuestion) {
  return localizedLiteracyQuestion(locale, question) !== question;
}

function translationFor(locale: string, id: string) {
  if (!isLiteracyTranslationLocale(locale)) return null;
  const source = masterById.get(id);
  const entry = literacyTranslations[locale].bank[id];
  return source && entry ? { source, entry, terms: literacyTranslations[locale].terms } : null;
}

// Single-field helpers for screens that only hold parts of a question (for example class result bars).
// Each one translates only when the English text it was given is exactly the English source text.
export function localizedLiteracyPrompt(locale: string, id: string, prompt: string) {
  const found = translationFor(locale, id);
  return found && found.source.prompt === prompt ? found.entry[0] : prompt;
}

export function localizedLiteracyExplanation(locale: string, id: string, explanation: string) {
  const found = translationFor(locale, id);
  return found && found.source.explanation === explanation ? found.entry[1] : explanation;
}

/** Shows a glossary term in the reader's language where the practice bank already uses a translated name for it. */
export function localizedLiteracyTerm(locale: string, term: string) {
  return isLiteracyTranslationLocale(locale) ? literacyTranslations[locale].terms[term] ?? term : term;
}

export function localizedLiteracyOption(locale: string, id: string, optionId: string, label: string) {
  const found = translationFor(locale, id);
  if (!found) return label;
  const position = found.source.options.findIndex((option) => option.id === optionId && option.label === label);
  if (position < 0) return label;
  return (found.entry[2] ? found.entry[2][position] : found.terms[label]) ?? label;
}
