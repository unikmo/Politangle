import { DEEP_QUESTIONNAIRE_VERSION, allDeepBeliefQuestions, deepLiteracyQuestions } from './deep-bank';
import type { DeepBeliefAnswers, LiteracyAnswers } from './deep-engine';
import type { AnswerValue } from './questions';

export const DEEP_SESSION_SCHEMA_VERSION = 2 as const;

export type DeepPhase = 'believe' | 'classify' | 'understand';

export type DeepSession = {
  schemaVersion: typeof DEEP_SESSION_SCHEMA_VERSION;
  questionnaireVersion: typeof DEEP_QUESTIONNAIRE_VERSION;
  seed: number;
  beliefOrder: string[];
  classifyOrder: string[];
  understandOrder: string[];
  beliefAnswers: DeepBeliefAnswers;
  literacyAnswers: LiteracyAnswers;
  startedAt: string;
  completedAt?: string;
};

function hashSeed(input: string) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled(ids: readonly string[], seed: number, salt: string) {
  const result = [...ids];
  const random = mulberry32(hashSeed(`${seed}:${salt}`));
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function createDeepSession(seed: number, startedAt = new Date().toISOString()): DeepSession {
  const classify = deepLiteracyQuestions.filter((question) => question.section === 'classify').map((question) => question.id);
  const understand = deepLiteracyQuestions.filter((question) => question.section === 'understand').map((question) => question.id);
  return {
    schemaVersion: DEEP_SESSION_SCHEMA_VERSION,
    questionnaireVersion: DEEP_QUESTIONNAIRE_VERSION,
    seed: seed >>> 0,
    beliefOrder: shuffled(allDeepBeliefQuestions.map((question) => question.id), seed, 'believe'),
    classifyOrder: shuffled(classify, seed, 'classify'),
    understandOrder: shuffled(understand, seed, 'understand'),
    beliefAnswers: {},
    literacyAnswers: {},
    startedAt,
  };
}

export function isDeepPoleFlipped(seed: number, questionId: string) {
  return (hashSeed(`${seed}:${questionId}:poles`) & 1) === 1;
}

export function displayedToStoredDeepAnswer(value: AnswerValue, flipped: boolean): AnswerValue {
  if (value === 'unsure' || value === 0 || !flipped) return value;
  return (-value) as -2 | -1 | 1 | 2;
}

export function storedToDisplayedDeepAnswer(value: AnswerValue | undefined, flipped: boolean): AnswerValue | undefined {
  if (value === undefined || value === 'unsure' || value === 0 || !flipped) return value;
  return (-value) as -2 | -1 | 1 | 2;
}

export function answerDeepBelief(session: DeepSession, questionId: string, value: AnswerValue): DeepSession {
  if (!allDeepBeliefQuestions.some((question) => question.id === questionId)) throw new Error(`Unknown Deep belief question: ${questionId}`);
  if (![-2, -1, 0, 1, 2, 'unsure'].includes(value)) throw new Error(`Invalid Deep belief answer: ${String(value)}`);
  return { ...session, beliefAnswers: { ...session.beliefAnswers, [questionId]: value } };
}

export function answerDeepLiteracy(session: DeepSession, questionId: string, optionIds: readonly string[]): DeepSession {
  const question = deepLiteracyQuestions.find((item) => item.id === questionId);
  if (!question) throw new Error(`Unknown Deep literacy question: ${questionId}`);
  const validOptions = new Set(question.options.map((option) => option.id));
  if (optionIds.length === 0 || optionIds.some((id) => !validOptions.has(id))) throw new Error(`Invalid Deep literacy answer for ${questionId}`);
  if (!question.multiSelect && optionIds.length !== 1) throw new Error(`Question ${questionId} accepts one option`);
  return { ...session, literacyAnswers: { ...session.literacyAnswers, [questionId]: [...new Set(optionIds)] } };
}

export function deepPhaseProgress(session: DeepSession, phase: DeepPhase) {
  const order = phase === 'believe' ? session.beliefOrder : phase === 'classify' ? session.classifyOrder : session.understandOrder;
  const answered = order.filter((id) => phase === 'believe' ? session.beliefAnswers[id] !== undefined : (session.literacyAnswers[id]?.length ?? 0) > 0).length;
  return { answered, total: order.length, complete: answered === order.length, percent: order.length ? Math.round((answered / order.length) * 100) : 0 };
}

export function deepOverallProgress(session: DeepSession) {
  const phases: DeepPhase[] = ['believe', 'classify', 'understand'];
  const parts = phases.map((phase) => deepPhaseProgress(session, phase));
  const answered = parts.reduce((sum, part) => sum + part.answered, 0);
  const total = parts.reduce((sum, part) => sum + part.total, 0);
  return { answered, total, complete: answered === total, percent: total ? Math.round((answered / total) * 100) : 0 };
}

export function completeDeepSession(session: DeepSession, completedAt = new Date().toISOString()): DeepSession {
  if (!deepOverallProgress(session).complete) throw new Error('Cannot complete an unfinished Deep session');
  return { ...session, completedAt };
}

export function parseStoredDeepSession(raw: string | null): DeepSession | null {
  if (!raw) return null;
  try {
    const candidate = JSON.parse(raw) as Partial<DeepSession>;
    if (candidate.schemaVersion !== DEEP_SESSION_SCHEMA_VERSION) return null;
    if (candidate.questionnaireVersion !== DEEP_QUESTIONNAIRE_VERSION) return null;
    if (typeof candidate.seed !== 'number' || typeof candidate.startedAt !== 'string') return null;
    if (!Array.isArray(candidate.beliefOrder) || !Array.isArray(candidate.classifyOrder) || !Array.isArray(candidate.understandOrder)) return null;
    const expectedBeliefs = new Set(allDeepBeliefQuestions.map((question) => question.id));
    const expectedClassify = new Set(deepLiteracyQuestions.filter((question) => question.section === 'classify').map((question) => question.id));
    const expectedUnderstand = new Set(deepLiteracyQuestions.filter((question) => question.section === 'understand').map((question) => question.id));
    const sameIds = (actual: string[], expected: Set<string>) => actual.length === expected.size && new Set(actual).size === expected.size && actual.every((id) => expected.has(id));
    if (!sameIds(candidate.beliefOrder, expectedBeliefs) || !sameIds(candidate.classifyOrder, expectedClassify) || !sameIds(candidate.understandOrder, expectedUnderstand)) return null;
    if (!candidate.beliefAnswers || typeof candidate.beliefAnswers !== 'object') return null;
    if (!candidate.literacyAnswers || typeof candidate.literacyAnswers !== 'object') return null;
    return candidate as DeepSession;
  } catch {
    return null;
  }
}
