import { literacyQuestions as deepLiteracyQuestions } from './literacy-questions';
import type { LiteracyAnswers } from './deep-engine';

export const LITERACY_SESSION_V2_SCHEMA = 2 as const;
export const LITERACY_BANK_VERSION = 'literacy-2026.09-v4-reader' as const;

export type LiteracyPhaseV2 = 'classify' | 'understand';

export type LiteracySessionV2 = {
  schemaVersion: typeof LITERACY_SESSION_V2_SCHEMA;
  bankVersion: typeof LITERACY_BANK_VERSION;
  seed: number;
  classifyOrder: string[];
  understandOrder: string[];
  answers: LiteracyAnswers;
  revealed: string[];
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

const questionById = new Map(deepLiteracyQuestions.map((question) => [question.id, question]));
const classifyIds = deepLiteracyQuestions.filter((question) => question.section === 'classify').map((question) => question.id);
const understandIds = deepLiteracyQuestions.filter((question) => question.section === 'understand').map((question) => question.id);

export function createLiteracySessionV2(seed: number | string, startedAt = new Date().toISOString()): LiteracySessionV2 {
  const numericSeed = typeof seed === 'number' ? seed >>> 0 : hashSeed(seed);
  return {
    schemaVersion: LITERACY_SESSION_V2_SCHEMA,
    bankVersion: LITERACY_BANK_VERSION,
    seed: numericSeed,
    classifyOrder: shuffled(classifyIds, numericSeed, 'classify'),
    understandOrder: shuffled(understandIds, numericSeed, 'understand'),
    answers: {},
    revealed: [],
    startedAt,
  };
}

export function literacyOrderV2(session: LiteracySessionV2, phase: LiteracyPhaseV2) {
  return phase === 'classify' ? session.classifyOrder : session.understandOrder;
}

export function answerLiteracyV2(session: LiteracySessionV2, questionId: string, optionIds: readonly string[]): LiteracySessionV2 {
  const question = questionById.get(questionId);
  if (!question) throw new Error(`Unknown literacy question: ${questionId}`);
  if (session.revealed.includes(questionId)) return session;

  const valid = new Set(question.options.map((option) => option.id));
  const unique = [...new Set(optionIds)];
  if (unique.length === 0 || unique.some((id) => !valid.has(id))) throw new Error(`Invalid literacy answer for ${questionId}`);
  if (!question.multiSelect && unique.length !== 1) throw new Error(`${questionId} accepts one option`);
  return { ...session, answers: { ...session.answers, [questionId]: unique } };
}

export function revealLiteracyAnswerV2(session: LiteracySessionV2, questionId: string): LiteracySessionV2 {
  if (!questionById.has(questionId)) throw new Error(`Unknown literacy question: ${questionId}`);
  if ((session.answers[questionId]?.length ?? 0) === 0) throw new Error(`Cannot reveal unanswered literacy question ${questionId}`);
  if (session.revealed.includes(questionId)) return session;
  return { ...session, revealed: [...session.revealed, questionId] };
}

export function literacyPhaseProgressV2(session: LiteracySessionV2, phase: LiteracyPhaseV2) {
  const order = literacyOrderV2(session, phase);
  const answered = order.filter((id) => (session.answers[id]?.length ?? 0) > 0).length;
  const checked = order.filter((id) => session.revealed.includes(id)).length;
  return {
    answered,
    checked,
    total: order.length,
    complete: checked === order.length,
    percent: order.length ? Math.round((checked / order.length) * 100) : 0,
  };
}

export function literacyOverallProgressV2(session: LiteracySessionV2) {
  const classify = literacyPhaseProgressV2(session, 'classify');
  const understand = literacyPhaseProgressV2(session, 'understand');
  const answered = classify.answered + understand.answered;
  const checked = classify.checked + understand.checked;
  const total = classify.total + understand.total;
  return {
    answered,
    checked,
    total,
    complete: checked === total,
    percent: total ? Math.round((checked / total) * 100) : 0,
  };
}

export function completeLiteracySessionV2(session: LiteracySessionV2, completedAt = new Date().toISOString()): LiteracySessionV2 {
  if (!literacyOverallProgressV2(session).complete) throw new Error('Cannot complete unfinished literacy training session');
  return { ...session, completedAt };
}

export function parseLiteracySessionV2(raw: string | null): LiteracySessionV2 | null {
  if (!raw) return null;
  try {
    const candidate = JSON.parse(raw) as Partial<LiteracySessionV2>;
    if (candidate.schemaVersion !== LITERACY_SESSION_V2_SCHEMA || candidate.bankVersion !== LITERACY_BANK_VERSION) return null;
    if (typeof candidate.seed !== 'number' || typeof candidate.startedAt !== 'string') return null;
    if (!Array.isArray(candidate.classifyOrder) || !Array.isArray(candidate.understandOrder) || !Array.isArray(candidate.revealed)) return null;
    if (!candidate.answers || typeof candidate.answers !== 'object') return null;

    const sameIds = (actual: string[], expected: readonly string[]) => actual.length === expected.length && new Set(actual).size === expected.length && actual.every((id) => expected.includes(id));
    if (!sameIds(candidate.classifyOrder, classifyIds) || !sameIds(candidate.understandOrder, understandIds)) return null;

    const allIds = new Set([...classifyIds, ...understandIds]);
    if (candidate.revealed.some((id) => !allIds.has(id))) return null;
    if (new Set(candidate.revealed).size !== candidate.revealed.length) return null;

    for (const [questionId, optionIds] of Object.entries(candidate.answers)) {
      const question = questionById.get(questionId);
      if (!question || !Array.isArray(optionIds) || optionIds.length === 0) return null;
      const valid = new Set(question.options.map((option) => option.id));
      if (optionIds.some((id) => typeof id !== 'string' || !valid.has(id))) return null;
      if (!question.multiSelect && optionIds.length !== 1) return null;
    }
    if (candidate.revealed.some((id) => (candidate.answers![id]?.length ?? 0) === 0)) return null;

    return candidate as LiteracySessionV2;
  } catch {
    return null;
  }
}
