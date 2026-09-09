import { calculateDeepLiteracyResult, scoreLiteracyItem, type DeepSection, type LiteracyAnswers, type LiteracyQuestion } from './deep-engine';
import { schoolBaselineQuestions, schoolPostQuestions, schoolPracticeQuestions } from './school-literacy';

export const SCHOOL_SESSION_SCHEMA = 1 as const;
export const SCHOOL_SESSION_VERSION = 'school-session-2026.09-v1' as const;
export type SchoolPhase = 'baseline' | 'learn' | 'practice' | 'post' | 'result';

export type SchoolSession = {
  schemaVersion: typeof SCHOOL_SESSION_SCHEMA;
  version: typeof SCHOOL_SESSION_VERSION;
  seed: number;
  classCode?: string;
  participantToken: string;
  phase: SchoolPhase;
  baselineOrder: string[];
  practiceOrder: string[];
  postOrder: string[];
  baselineAnswers: LiteracyAnswers;
  practiceAnswers: LiteracyAnswers;
  practiceRevealed: string[];
  postAnswers: LiteracyAnswers;
  learnIndex: number;
  baselineSubmitted: boolean;
  practiceSubmitted: boolean;
  postSubmitted: boolean;
  startedAt: string;
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

const bank = {
  baseline: schoolBaselineQuestions,
  practice: schoolPracticeQuestions,
  post: schoolPostQuestions,
} as const;

function questionMap(questions: readonly LiteracyQuestion[]) {
  return new Map(questions.map((question) => [question.id, question]));
}

const maps = {
  baseline: questionMap(schoolBaselineQuestions),
  practice: questionMap(schoolPracticeQuestions),
  post: questionMap(schoolPostQuestions),
};

export function createSchoolSession(
  seed: number | string,
  participantToken: string,
  classCode?: string,
  startedAt = new Date().toISOString(),
): SchoolSession {
  const numericSeed = typeof seed === 'number' ? seed >>> 0 : hashSeed(seed);
  return {
    schemaVersion: SCHOOL_SESSION_SCHEMA,
    version: SCHOOL_SESSION_VERSION,
    seed: numericSeed,
    classCode: classCode?.trim().toUpperCase() || undefined,
    participantToken,
    phase: 'baseline',
    baselineOrder: shuffled(schoolBaselineQuestions.map((q) => q.id), numericSeed, 'baseline'),
    practiceOrder: shuffled(schoolPracticeQuestions.map((q) => q.id), numericSeed, 'practice'),
    postOrder: shuffled(schoolPostQuestions.map((q) => q.id), numericSeed, 'post'),
    baselineAnswers: {},
    practiceAnswers: {},
    practiceRevealed: [],
    postAnswers: {},
    learnIndex: 0,
    baselineSubmitted: false,
    practiceSubmitted: false,
    postSubmitted: false,
    startedAt,
  };
}

export function schoolOrder(session: SchoolSession, phase: 'baseline' | 'practice' | 'post') {
  return phase === 'baseline' ? session.baselineOrder : phase === 'practice' ? session.practiceOrder : session.postOrder;
}

export function schoolQuestions(phase: 'baseline' | 'practice' | 'post') {
  return bank[phase];
}

export function schoolQuestion(session: SchoolSession, phase: 'baseline' | 'practice' | 'post', index: number) {
  const id = schoolOrder(session, phase)[index];
  return maps[phase].get(id) ?? null;
}

export function answerSchoolQuestion(session: SchoolSession, phase: 'baseline' | 'practice' | 'post', questionId: string, optionIds: readonly string[]) {
  const question = maps[phase].get(questionId);
  if (!question) throw new Error(`Unknown school ${phase} question: ${questionId}`);
  if (phase === 'practice' && session.practiceRevealed.includes(questionId)) return session;
  const valid = new Set(question.options.map((option) => option.id));
  const unique = [...new Set(optionIds)];
  if (unique.length === 0 || unique.some((id) => !valid.has(id))) throw new Error(`Invalid answer for ${questionId}`);
  if (!question.multiSelect && unique.length !== 1) throw new Error(`${questionId} accepts one answer`);
  const key = phase === 'baseline' ? 'baselineAnswers' : phase === 'practice' ? 'practiceAnswers' : 'postAnswers';
  return { ...session, [key]: { ...session[key], [questionId]: unique } };
}

export function revealSchoolPractice(session: SchoolSession, questionId: string) {
  if (!maps.practice.has(questionId)) throw new Error(`Unknown practice question: ${questionId}`);
  if ((session.practiceAnswers[questionId]?.length ?? 0) === 0) throw new Error('Cannot reveal unanswered practice item');
  if (session.practiceRevealed.includes(questionId)) return session;
  return { ...session, practiceRevealed: [...session.practiceRevealed, questionId] };
}

export function schoolPhaseProgress(session: SchoolSession, phase: 'baseline' | 'practice' | 'post') {
  const order = schoolOrder(session, phase);
  const answers = phase === 'baseline' ? session.baselineAnswers : phase === 'practice' ? session.practiceAnswers : session.postAnswers;
  const answered = order.filter((id) => (answers[id]?.length ?? 0) > 0).length;
  const checked = phase === 'practice' ? order.filter((id) => session.practiceRevealed.includes(id)).length : answered;
  return { answered, checked, total: order.length, complete: checked === order.length, percent: Math.round((checked / order.length) * 100) };
}

export function setSchoolPhase(session: SchoolSession, phase: SchoolPhase) {
  return { ...session, phase };
}

export function markSchoolSubmitted(session: SchoolSession, phase: 'baseline' | 'practice' | 'post') {
  const key = phase === 'baseline' ? 'baselineSubmitted' : phase === 'practice' ? 'practiceSubmitted' : 'postSubmitted';
  return { ...session, [key]: true };
}

export function scoreSchoolPhase(session: SchoolSession, phase: 'baseline' | 'post') {
  const questions = phase === 'baseline' ? schoolBaselineQuestions : schoolPostQuestions;
  const answers = phase === 'baseline' ? session.baselineAnswers : session.postAnswers;
  return calculateDeepLiteracyResult(questions, answers);
}

export function schoolResult(session: SchoolSession) {
  const baseline = scoreSchoolPhase(session, 'baseline');
  const post = scoreSchoolPhase(session, 'post');
  return {
    baseline,
    post,
    change: post.overall.percent - baseline.overall.percent,
    classifyChange: post.sections.classify.percent - baseline.sections.classify.percent,
    understandChange: post.sections.understand.percent - baseline.sections.understand.percent,
  };
}

export type SchoolAggregatePayload = {
  participantToken: string;
  phase: 'baseline' | 'practice' | 'post';
  results?: { questionId: string; section: DeepSection; correct: boolean }[];
};

export function schoolAggregatePayload(session: SchoolSession, phase: 'baseline' | 'practice' | 'post'): SchoolAggregatePayload {
  if (phase === 'practice') return { participantToken: session.participantToken, phase };
  const questions = phase === 'baseline' ? schoolBaselineQuestions : schoolPostQuestions;
  const answers = phase === 'baseline' ? session.baselineAnswers : session.postAnswers;
  return {
    participantToken: session.participantToken,
    phase,
    results: questions.map((question) => ({
      questionId: question.id,
      section: question.section,
      correct: scoreLiteracyItem(question, answers[question.id] ?? []).correct,
    })),
  };
}

function validAnswers(answers: LiteracyAnswers, map: Map<string, LiteracyQuestion>) {
  for (const [id, values] of Object.entries(answers)) {
    const question = map.get(id);
    if (!question || !Array.isArray(values) || values.length === 0) return false;
    const valid = new Set(question.options.map((option) => option.id));
    if (values.some((value) => typeof value !== 'string' || !valid.has(value))) return false;
    if (!question.multiSelect && values.length !== 1) return false;
  }
  return true;
}

function sameIds(actual: string[], expected: readonly string[]) {
  return actual.length === expected.length && new Set(actual).size === expected.length && actual.every((id) => expected.includes(id));
}

export function parseSchoolSession(raw: string | null): SchoolSession | null {
  if (!raw) return null;
  try {
    const candidate = JSON.parse(raw) as Partial<SchoolSession>;
    if (candidate.schemaVersion !== SCHOOL_SESSION_SCHEMA || candidate.version !== SCHOOL_SESSION_VERSION) return null;
    if (typeof candidate.seed !== 'number' || typeof candidate.participantToken !== 'string' || candidate.participantToken.length < 8) return null;
    if (!['baseline', 'learn', 'practice', 'post', 'result'].includes(candidate.phase ?? '')) return null;
    if (!Array.isArray(candidate.baselineOrder) || !Array.isArray(candidate.practiceOrder) || !Array.isArray(candidate.postOrder) || !Array.isArray(candidate.practiceRevealed)) return null;
    if (!sameIds(candidate.baselineOrder, schoolBaselineQuestions.map((q) => q.id))) return null;
    if (!sameIds(candidate.practiceOrder, schoolPracticeQuestions.map((q) => q.id))) return null;
    if (!sameIds(candidate.postOrder, schoolPostQuestions.map((q) => q.id))) return null;
    if (!candidate.baselineAnswers || !candidate.practiceAnswers || !candidate.postAnswers) return null;
    if (!validAnswers(candidate.baselineAnswers, maps.baseline) || !validAnswers(candidate.practiceAnswers, maps.practice) || !validAnswers(candidate.postAnswers, maps.post)) return null;
    if (candidate.practiceRevealed.some((id) => !maps.practice.has(id) || (candidate.practiceAnswers![id]?.length ?? 0) === 0)) return null;
    if (typeof candidate.learnIndex !== 'number' || typeof candidate.startedAt !== 'string') return null;
    return candidate as SchoolSession;
  } catch {
    return null;
  }
}
