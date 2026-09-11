import type { LiteracyQuestion } from './deep-engine';
import { germanBeliefStatement } from './german-believe';
import { publicLiteracyExplanation, publicLiteracyOption, publicLiteracyPrompt } from './public-literacy-i18n';
import { romanceBeliefStatement } from './romance-believe';
import { schoolJuniorLiteracyExplanation, schoolJuniorLiteracyOption, schoolJuniorLiteracyPrompt } from './school-junior-literacy';
import type { SchoolAgeBand } from './school-believe';

export type SchoolQuestionLocale = 'en' | 'de' | 'es' | 'fr';

export type LocalizableSchoolQuestion = {
  id: string;
  kind: 'believe' | 'literacy';
  sourceItemId?: string;
  polarity?: 'negative' | 'positive';
  statement?: string;
  section?: string;
  prompt?: string;
  multiSelect?: boolean;
  options: readonly { id: string; label: string }[];
  acceptedAnswerSets?: readonly (readonly string[])[];
  explanation?: string;
};

function asLiteracyQuestion(question: LocalizableSchoolQuestion): LiteracyQuestion {
  return {
    id: question.id,
    section: question.section === 'understand' ? 'understand' : 'classify',
    prompt: question.prompt ?? '',
    options: question.options,
    acceptedAnswerSets: question.acceptedAnswerSets ?? [],
    explanation: question.explanation ?? '',
    evidenceIds: [],
    multiSelect: question.multiSelect,
  };
}

export function localizedSchoolBeliefStatement(locale: SchoolQuestionLocale, question: LocalizableSchoolQuestion) {
  if (question.kind !== 'believe' || !question.sourceItemId || !question.polarity) return question.statement ?? '';
  if (locale === 'de') return germanBeliefStatement(question.sourceItemId, question.polarity) ?? question.statement ?? '';
  if (locale === 'es' || locale === 'fr') return romanceBeliefStatement(locale, question.sourceItemId, question.polarity) ?? question.statement ?? '';
  return question.statement ?? '';
}

export function localizedSchoolLiteracyPrompt(locale: SchoolQuestionLocale, question: LocalizableSchoolQuestion, ageBand: SchoolAgeBand) {
  if (question.kind !== 'literacy') return '';
  const typed = asLiteracyQuestion(question);
  return ageBand === 'junior-10-13' ? schoolJuniorLiteracyPrompt(locale, typed) : publicLiteracyPrompt(locale, typed);
}

export function localizedSchoolLiteracyOption(locale: SchoolQuestionLocale, question: LocalizableSchoolQuestion, optionId: string, ageBand: SchoolAgeBand) {
  const fallback = question.options.find((option) => option.id === optionId)?.label ?? optionId;
  if (question.kind !== 'literacy') return fallback;
  const typed = asLiteracyQuestion(question);
  return ageBand === 'junior-10-13' ? schoolJuniorLiteracyOption(locale, typed, optionId) : publicLiteracyOption(locale, typed, optionId);
}

export function localizedSchoolLiteracyExplanation(locale: SchoolQuestionLocale, question: LocalizableSchoolQuestion, ageBand: SchoolAgeBand) {
  if (question.kind !== 'literacy') return '';
  const typed = asLiteracyQuestion(question);
  return ageBand === 'junior-10-13' ? schoolJuniorLiteracyExplanation(locale, typed) : publicLiteracyExplanation(locale, typed);
}
