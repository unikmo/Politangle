import { deepBeliefQuestions, deepLiteracyQuestions, DEEP_QUESTIONNAIRE_VERSION } from './deep-questions';
import { deepDiscriminatorQuestions } from './deep-discriminators';

export { DEEP_QUESTIONNAIRE_VERSION, deepLiteracyQuestions };

export const allDeepBeliefQuestions = [...deepBeliefQuestions, ...deepDiscriminatorQuestions] as const;
export const allDeepQuestions = [...allDeepBeliefQuestions, ...deepLiteracyQuestions] as const;
