import { deepBeliefQuestions, deepLiteracyQuestions } from './deep-questions';
import { deepDiscriminatorQuestions } from './deep-discriminators';

export const DEEP_QUESTIONNAIRE_VERSION = 'deep-2026.09-v1.1' as const;
export { deepLiteracyQuestions };

export const allDeepBeliefQuestions = [...deepBeliefQuestions, ...deepDiscriminatorQuestions] as const;
export const allDeepQuestions = [...allDeepBeliefQuestions, ...deepLiteracyQuestions] as const;
