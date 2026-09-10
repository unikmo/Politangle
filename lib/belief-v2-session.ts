import { BELIEF_V2_VERSION, type AttitudeMode, type BeliefAnswersV2 } from './belief-v2';
import { lockedBeliefItemsV2 } from './belief-v2-engine';
import { expandBeliefItems } from './belief-statements';
import type { AnswerValue } from './questions';

export const BELIEF_V2_SESSION_SCHEMA = 3 as const;
export const lockedBeliefStatementsV3 = expandBeliefItems(lockedBeliefItemsV2);
const quickSourceIds = [
  ...lockedBeliefItemsV2.filter((item) => item.mode === 'think').map((item) => item.id),
  ...lockedBeliefItemsV2.filter((item) => item.mode === 'act').slice(0, 12).map((item) => item.id),
];
export const lockedQuickStatementIds = quickSourceIds.map((id, index) => `${id}-${index % 2 === 0 ? 'P' : 'N'}`);
export const lockedFullFollowUpStatementIds = lockedBeliefStatementsV3
  .map((item) => item.id)
  .filter((id) => !lockedQuickStatementIds.includes(id));

export type BeliefV2Stage = 'quick' | 'deep';

export type BeliefV2Session = {
  schemaVersion: typeof BELIEF_V2_SESSION_SCHEMA;
  questionnaireVersion: typeof BELIEF_V2_VERSION;
  seed: number;
  quickOrder: string[];
  deepOrder: string[];
  answers: BeliefAnswersV2;
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

function validAnswer(value: unknown): value is AnswerValue {
  return value === 'unsure' || value === -2 || value === -1 || value === 0 || value === 1 || value === 2;
}

export function createBeliefV2Session(seed: number | string, startedAt = new Date().toISOString()): BeliefV2Session {
  const numericSeed = typeof seed === 'number' ? seed >>> 0 : hashSeed(seed);
  const quick = lockedQuickStatementIds;
  const deep = lockedFullFollowUpStatementIds;
  return {
    schemaVersion: BELIEF_V2_SESSION_SCHEMA,
    questionnaireVersion: BELIEF_V2_VERSION,
    seed: numericSeed,
    quickOrder: shuffled(quick, numericSeed, 'quick'),
    deepOrder: shuffled(deep, numericSeed, 'deep'),
    answers: {},
    startedAt,
  };
}

export function getBeliefV2Item(id: string) {
  return lockedBeliefStatementsV3.find((item) => item.id === id) ?? null;
}

export function isBeliefV2PoleFlipped(seed: number, itemId: string) {
  return (hashSeed(`${seed}:${itemId}:poles`) & 1) === 1;
}

export function displayedToStoredBeliefV2Answer(value: AnswerValue, flipped: boolean): AnswerValue {
  if (value === 'unsure' || value === 0 || !flipped) return value;
  return (-value) as -2 | -1 | 1 | 2;
}

export function storedToDisplayedBeliefV2Answer(value: AnswerValue | undefined, flipped: boolean): AnswerValue | undefined {
  if (value === undefined || value === 'unsure' || value === 0 || !flipped) return value;
  return (-value) as -2 | -1 | 1 | 2;
}

export function answerBeliefV2(session: BeliefV2Session, itemId: string, value: AnswerValue): BeliefV2Session {
  if (!getBeliefV2Item(itemId)) throw new Error(`Unknown BELIEVE v2 item: ${itemId}`);
  if (!validAnswer(value)) throw new Error(`Invalid BELIEVE v2 answer: ${String(value)}`);
  return { ...session, answers: { ...session.answers, [itemId]: value } };
}

export function beliefV2StageProgress(session: BeliefV2Session, stage: BeliefV2Stage) {
  const order = stage === 'quick' ? session.quickOrder : session.deepOrder;
  const answered = order.filter((id) => validAnswer(session.answers[id])).length;
  const unsure = order.filter((id) => session.answers[id] === 'unsure').length;
  return {
    answered,
    unsure,
    total: order.length,
    complete: answered === order.length,
    percent: order.length ? Math.round((answered / order.length) * 100) : 0,
  };
}

export function firstUnansweredIndex(session: BeliefV2Session, stage: BeliefV2Stage) {
  const order = stage === 'quick' ? session.quickOrder : session.deepOrder;
  const index = order.findIndex((id) => !validAnswer(session.answers[id]));
  return index === -1 ? null : index;
}

export function beliefV2OverallProgress(session: BeliefV2Session) {
  const quick = beliefV2StageProgress(session, 'quick');
  const deep = beliefV2StageProgress(session, 'deep');
  const answered = quick.answered + deep.answered;
  const total = quick.total + deep.total;
  return {
    answered,
    unsure: quick.unsure + deep.unsure,
    total,
    complete: answered === total,
    percent: total ? Math.round((answered / total) * 100) : 0,
  };
}

export function modeProgress(session: BeliefV2Session, mode: AttitudeMode) {
  const ids = lockedBeliefStatementsV3.filter((item) => item.mode === mode).map((item) => item.id);
  const answered = ids.filter((id) => validAnswer(session.answers[id])).length;
  const scored = ids.filter((id) => typeof session.answers[id] === 'number').length;
  return { answered, scored, total: ids.length, complete: answered === ids.length };
}

export function completeBeliefV2Session(session: BeliefV2Session, completedAt = new Date().toISOString()): BeliefV2Session {
  if (!beliefV2OverallProgress(session).complete) throw new Error('Cannot complete an unfinished 84-statement BELIEVE session');
  return { ...session, completedAt };
}

export function parseBeliefV2Session(raw: string | null): BeliefV2Session | null {
  if (!raw) return null;
  try {
    const candidate = JSON.parse(raw) as Partial<BeliefV2Session>;
    if (candidate.schemaVersion !== BELIEF_V2_SESSION_SCHEMA) return null;
    if (candidate.questionnaireVersion !== BELIEF_V2_VERSION) return null;
    if (typeof candidate.seed !== 'number' || typeof candidate.startedAt !== 'string') return null;
    if (!Array.isArray(candidate.quickOrder) || !Array.isArray(candidate.deepOrder)) return null;
    const expectedQuick = new Set(lockedQuickStatementIds);
    const expectedDeep = new Set(lockedFullFollowUpStatementIds);
    const sameIds = (actual: string[], expected: Set<string>) => actual.length === expected.size && new Set(actual).size === expected.size && actual.every((id) => expected.has(id));
    if (!sameIds(candidate.quickOrder, expectedQuick) || !sameIds(candidate.deepOrder, expectedDeep)) return null;
    if (!candidate.answers || typeof candidate.answers !== 'object') return null;
    for (const [id, value] of Object.entries(candidate.answers)) {
      if (!getBeliefV2Item(id) || !validAnswer(value)) return null;
    }
    return candidate as BeliefV2Session;
  } catch {
    return null;
  }
}
