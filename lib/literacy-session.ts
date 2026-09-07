import { deepLiteracyQuestions } from './deep-bank';
import type { DeepSection, LiteracyAnswers } from './deep-engine';

export const LITERACY_SESSION_SCHEMA = 1 as const;
export const LITERACY_SESSION_VERSION = 'literacy-2026.09-v1' as const;

export type LiteracySession = {
  schemaVersion: typeof LITERACY_SESSION_SCHEMA;
  version: typeof LITERACY_SESSION_VERSION;
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
const idsBySection = {
  classify: deepLiteracyQuestions.filter((question) => question.section === 'classify').map((question) => question.id),
  understand: deepLiteracyQuestions.filter((question) => question.section === 'understand').map((question) => question.id),
} as const;

export function createLiteracySession(seed: number | string, startedAt = new Date().toISOString()): LiteracySession {
  const numericSeed = typeof seed === 'number' ? seed >>> 0 : hashSeed(seed);
  return {
    schemaVersion: LITERACY_SESSION_SCHEMA,
    version: LITERACY_SESSION_VERSION,
    seed: numericSeed,
    classifyOrder: shuffled(idsBySection.classify, numericSeed, 'classify'),
    understandOrder: shuffled(idsBySection.understand, numericSeed, 'understand'),
    answers: {},
    revealed: [],
    startedAt,
  };
}

export function literacyOrder(session: LiteracySession, section: DeepSection) {
  return section === 'classify' ? session.classifyOrder : session.understandOrder;
}

export function answerLiteracy(session: LiteracySession, questionId: string, optionIds: readonly string[]): LiteracySession {
  const question = questionById.get(questionId);
  if (!question) throw new Error(`Unknown literacy question: ${questionId}`);
  if (session.revealed.includes(questionId)) return session;

  const valid = new Set(question.options.map((option) => option.id));
  const unique = [...new Set(optionIds)];
  if (unique.length === 0 || unique.some((id) => !valid.has(id))) throw new Error(`Invalid literacy answer for ${questionId}`);
  if (!question.multiSelect && unique.length !== 1) throw new Error(`Question ${questionId} accepts one option`);

  return { ...session, answers: { ...session.answers, [questionId]: unique } };
}

export function revealLiteracyAnswer(session: LiteracySession, questionId: string): LiteracySession {
  if (!questionById.has(questionId)) throw new Error(`Unknown literacy question: ${questionId}`);
  if ((session.answers[questionId]?.length ?? 0) === 0) throw new Error(`Cannot reveal unanswered literacy question ${questionId}`);
  if (session.revealed.includes(questionId)) return session;
  return { ...session, revealed: [...session.revealed, questionId] };
}

export function literacyPhaseProgress(session: LiteracySession, section: DeepSection) {
  const order = literacyOrder(session, section);
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

export function completeLiteracySession(session: LiteracySession, completedAt = new Date().toISOString()): LiteracySession {
  if (!literacyPhaseProgress(session, 'classify').complete || !literacyPhaseProgress(session, 'understand').complete) {
    throw new Error('Cannot complete unfinished literacy training');
  }
  return { ...session, completedAt };
}

export function parseLiteracySession(raw: string | null): LiteracySession | null {
  if (!raw) return null;
  try {
    const candidate = JSON.parse(raw) as Partial<LiteracySession>;
    if (candidate.schemaVersion !== LITERACY_SESSION_SCHEMA || candidate.version !== LITERACY_SESSION_VERSION) return null;
    if (typeof candidate.seed !== 'number' || typeof candidate.startedAt !== 'string') return null;
    if (!Array.isArray(candidate.classifyOrder) || !Array.isArray(candidate.understandOrder) || !Array.isArray(candidate.revealed)) return null;
    if (!candidate.answers || typeof candidate.answers !== 'object') return null;

    const sameIds = (actual: string[], expected: readonly string[]) => actual.length === expected.length && new Set(actual).size === expected.length && actual.every((id) => expected.includes(id));
    if (!sameIds(candidate.classifyOrder, idsBySection.classify) || !sameIds(candidate.understandOrder, idsBySection.understand)) return null;

    const allIds = new Set([...idsBySection.classify, ...idsBySection.understand]);
    if (candidate.revealed.some((id) => !allIds.has(id))) return null;
    if (new Set(candidate.revealed).size !== candidate.revealed.length) return null;

    for (const [id, optionIds] of Object.entries(candidate.answers)) {
      const question = questionById.get(id);
      if (!question || !Array.isArray(optionIds) || optionIds.length === 0) return null;
      const valid = new Set(question.options.map((option) => option.id));
      if (optionIds.some((optionId) => typeof optionId !== 'string' || !valid.has(optionId))) return null;
      if (!question.multiSelect && optionIds.length !== 1) return null;
    }
    if (candidate.revealed.some((id) => (candidate.answers![id]?.length ?? 0) === 0)) return null;

    return candidate as LiteracySession;
  } catch {
    return null;
  }
}
