import { deepLiteracyQuestions } from './deep-bank';
import type { LiteracyAnswers } from './deep-engine';

export const LITERACY_SESSION_V2_SCHEMA = 1 as const;
export const LITERACY_BANK_VERSION = 'literacy-2026.09-v1' as const;

export type LiteracyPhaseV2 = 'classify' | 'understand';

export type LiteracySessionV2 = {
  schemaVersion: typeof LITERACY_SESSION_V2_SCHEMA;
  bankVersion: typeof LITERACY_BANK_VERSION;
  seed: number;
  classifyOrder: string[];
  understandOrder: string[];
  answers: LiteracyAnswers;
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

export function createLiteracySessionV2(seed: number | string, startedAt = new Date().toISOString()): LiteracySessionV2 {
  const numericSeed = typeof seed === 'number' ? seed >>> 0 : hashSeed(seed);
  const classify = deepLiteracyQuestions.filter((question) => question.section === 'classify').map((question) => question.id);
  const understand = deepLiteracyQuestions.filter((question) => question.section === 'understand').map((question) => question.id);
  return {
    schemaVersion: LITERACY_SESSION_V2_SCHEMA,
    bankVersion: LITERACY_BANK_VERSION,
    seed: numericSeed,
    classifyOrder: shuffled(classify, numericSeed, 'classify'),
    understandOrder: shuffled(understand, numericSeed, 'understand'),
    answers: {},
    startedAt,
  };
}

export function literacyOrderV2(session: LiteracySessionV2, phase: LiteracyPhaseV2) {
  return phase === 'classify' ? session.classifyOrder : session.understandOrder;
}

export function answerLiteracyV2(session: LiteracySessionV2, questionId: string, optionIds: readonly string[]): LiteracySessionV2 {
  const question = deepLiteracyQuestions.find((item) => item.id === questionId);
  if (!question) throw new Error(`Unknown literacy question: ${questionId}`);
  const valid = new Set(question.options.map((option) => option.id));
  if (optionIds.length === 0 || optionIds.some((id) => !valid.has(id))) throw new Error(`Invalid literacy answer for ${questionId}`);
  if (!question.multiSelect && optionIds.length !== 1) throw new Error(`${questionId} accepts one option`);
  return { ...session, answers: { ...session.answers, [questionId]: [...new Set(optionIds)] } };
}

export function literacyPhaseProgressV2(session: LiteracySessionV2, phase: LiteracyPhaseV2) {
  const order = literacyOrderV2(session, phase);
  const answered = order.filter((id) => (session.answers[id]?.length ?? 0) > 0).length;
  return { answered, total: order.length, complete: answered === order.length, percent: order.length ? Math.round((answered / order.length) * 100) : 0 };
}

export function literacyOverallProgressV2(session: LiteracySessionV2) {
  const classify = literacyPhaseProgressV2(session, 'classify');
  const understand = literacyPhaseProgressV2(session, 'understand');
  const answered = classify.answered + understand.answered;
  const total = classify.total + understand.total;
  return { answered, total, complete: answered === total, percent: total ? Math.round((answered / total) * 100) : 0 };
}

export function completeLiteracySessionV2(session: LiteracySessionV2, completedAt = new Date().toISOString()): LiteracySessionV2 {
  if (!literacyOverallProgressV2(session).complete) throw new Error('Cannot complete unfinished literacy session');
  return { ...session, completedAt };
}

export function parseLiteracySessionV2(raw: string | null): LiteracySessionV2 | null {
  if (!raw) return null;
  try {
    const candidate = JSON.parse(raw) as Partial<LiteracySessionV2>;
    if (candidate.schemaVersion !== LITERACY_SESSION_V2_SCHEMA || candidate.bankVersion !== LITERACY_BANK_VERSION) return null;
    if (typeof candidate.seed !== 'number' || typeof candidate.startedAt !== 'string') return null;
    if (!Array.isArray(candidate.classifyOrder) || !Array.isArray(candidate.understandOrder)) return null;
    const classifyExpected = new Set(deepLiteracyQuestions.filter((q) => q.section === 'classify').map((q) => q.id));
    const understandExpected = new Set(deepLiteracyQuestions.filter((q) => q.section === 'understand').map((q) => q.id));
    const sameIds = (actual: string[], expected: Set<string>) => actual.length === expected.size && new Set(actual).size === expected.size && actual.every((id) => expected.has(id));
    if (!sameIds(candidate.classifyOrder, classifyExpected) || !sameIds(candidate.understandOrder, understandExpected)) return null;
    if (!candidate.answers || typeof candidate.answers !== 'object') return null;
    for (const [questionId, optionIds] of Object.entries(candidate.answers)) {
      const question = deepLiteracyQuestions.find((item) => item.id === questionId);
      if (!question || !Array.isArray(optionIds) || optionIds.length === 0) return null;
      const valid = new Set(question.options.map((option) => option.id));
      if (optionIds.some((id) => typeof id !== 'string' || !valid.has(id))) return null;
      if (!question.multiSelect && optionIds.length !== 1) return null;
    }
    return candidate as LiteracySessionV2;
  } catch {
    return null;
  }
}
