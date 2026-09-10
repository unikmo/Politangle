import { deepBeliefQuestions } from './deep-questions';
import { deepDiscriminatorQuestions } from './deep-discriminators';
import { literacyQuestions } from './literacy-questions';

export const DEEP_QUESTIONNAIRE_VERSION = 'deep-2026.09-v1.3-reader' as const;
export const deepLiteracyQuestions = literacyQuestions;

export const allDeepBeliefQuestions = [...deepBeliefQuestions, ...deepDiscriminatorQuestions] as const;
export const allDeepQuestions = [...allDeepBeliefQuestions, ...deepLiteracyQuestions] as const;
