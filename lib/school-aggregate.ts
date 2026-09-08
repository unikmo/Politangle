import { createHash } from 'node:crypto';
import { schoolBaselineQuestions, schoolPostQuestions } from './school-literacy';
import type { SchoolAggregatePayload } from './school-session';

export const SCHOOL_AGGREGATE_SCHEMA = 1 as const;
export const SCHOOL_MIN_AGGREGATE_SIZE = 10 as const;

export type SchoolQuestionStat = { correct: number; answered: number };
export type SchoolPhaseAggregate = {
  submissions: number;
  correct: number;
  answered: number;
  classifyCorrect: number;
  classifyAnswered: number;
  understandCorrect: number;
  understandAnswered: number;
  questions: Record<string, SchoolQuestionStat>;
};

export type SchoolClassRecord = {
  schemaVersion: typeof SCHOOL_AGGREGATE_SCHEMA;
  code: string;
  status: 'active' | 'closed';
  createdAt: string;
  teacherKeyHash: string;
  minAggregateSize: number;
  baseline: SchoolPhaseAggregate;
  post: SchoolPhaseAggregate;
  practiceCompletions: number;
};

function emptyPhase(ids: readonly string[]): SchoolPhaseAggregate {
  return {
    submissions: 0,
    correct: 0,
    answered: 0,
    classifyCorrect: 0,
    classifyAnswered: 0,
    understandCorrect: 0,
    understandAnswered: 0,
    questions: Object.fromEntries(ids.map((id) => [id, { correct: 0, answered: 0 }])),
  };
}

export function createSchoolClassRecord(code: string, teacherKeyHash: string, createdAt = new Date().toISOString()): SchoolClassRecord {
  return {
    schemaVersion: SCHOOL_AGGREGATE_SCHEMA,
    code: code.toUpperCase(),
    status: 'active',
    createdAt,
    teacherKeyHash,
    minAggregateSize: SCHOOL_MIN_AGGREGATE_SIZE,
    baseline: emptyPhase(schoolBaselineQuestions.map((q) => q.id)),
    post: emptyPhase(schoolPostQuestions.map((q) => q.id)),
    practiceCompletions: 0,
  };
}

export function hashSchoolSecret(value: string) {
  return createHash('sha256').update(value).digest('hex');
}

export function verifyTeacherKey(record: SchoolClassRecord, key: string) {
  return hashSchoolSecret(key) === record.teacherKeyHash;
}

function expectedQuestions(phase: 'baseline' | 'post') {
  return phase === 'baseline' ? schoolBaselineQuestions : schoolPostQuestions;
}

export function validateSchoolAggregatePayload(input: unknown): SchoolAggregatePayload | null {
  if (!input || typeof input !== 'object') return null;
  const candidate = input as Partial<SchoolAggregatePayload>;
  if (typeof candidate.participantToken !== 'string' || candidate.participantToken.length < 8) return null;
  if (!['baseline', 'practice', 'post'].includes(candidate.phase ?? '')) return null;
  if (candidate.phase === 'practice') return { participantToken: candidate.participantToken, phase: 'practice' };
  if (!Array.isArray(candidate.results)) return null;

  const questions = expectedQuestions(candidate.phase as 'baseline' | 'post');
  const byId = new Map(questions.map((q) => [q.id, q]));
  if (candidate.results.length !== questions.length) return null;
  const seen = new Set<string>();
  const results: NonNullable<SchoolAggregatePayload['results']> = [];
  for (const result of candidate.results) {
    if (!result || typeof result !== 'object') return null;
    const item = result as { questionId?: unknown; section?: unknown; correct?: unknown };
    if (typeof item.questionId !== 'string' || seen.has(item.questionId)) return null;
    const question = byId.get(item.questionId);
    if (!question || item.section !== question.section || typeof item.correct !== 'boolean') return null;
    seen.add(item.questionId);
    results.push({ questionId: item.questionId, section: question.section, correct: item.correct });
  }
  return { participantToken: candidate.participantToken, phase: candidate.phase as 'baseline' | 'post', results };
}

function applyPhase(current: SchoolPhaseAggregate, results: NonNullable<SchoolAggregatePayload['results']>): SchoolPhaseAggregate {
  const next: SchoolPhaseAggregate = {
    ...current,
    submissions: current.submissions + 1,
    questions: Object.fromEntries(Object.entries(current.questions).map(([id, stat]) => [id, { ...stat }])),
  };
  for (const result of results) {
    next.answered += 1;
    if (result.correct) next.correct += 1;
    if (result.section === 'classify') {
      next.classifyAnswered += 1;
      if (result.correct) next.classifyCorrect += 1;
    } else {
      next.understandAnswered += 1;
      if (result.correct) next.understandCorrect += 1;
    }
    const stat = next.questions[result.questionId] ?? { correct: 0, answered: 0 };
    stat.answered += 1;
    if (result.correct) stat.correct += 1;
    next.questions[result.questionId] = stat;
  }
  return next;
}

export function applySchoolAggregate(record: SchoolClassRecord, payload: SchoolAggregatePayload): SchoolClassRecord {
  if (payload.phase === 'practice') return { ...record, practiceCompletions: record.practiceCompletions + 1 };
  if (!payload.results) throw new Error('Scored school submission requires results');
  return payload.phase === 'baseline'
    ? { ...record, baseline: applyPhase(record.baseline, payload.results) }
    : { ...record, post: applyPhase(record.post, payload.results) };
}

function percent(correct: number, answered: number) {
  return answered ? Math.round((correct / answered) * 100) : 0;
}

function phaseSummary(phase: SchoolPhaseAggregate, minAggregateSize: number) {
  const scoreAvailable = phase.submissions >= minAggregateSize;
  return {
    submissions: phase.submissions,
    overall: scoreAvailable ? percent(phase.correct, phase.answered) : null,
    classify: scoreAvailable ? percent(phase.classifyCorrect, phase.classifyAnswered) : null,
    understand: scoreAvailable ? percent(phase.understandCorrect, phase.understandAnswered) : null,
    detailedAvailable: scoreAvailable,
    questions: scoreAvailable
      ? Object.fromEntries(Object.entries(phase.questions).map(([id, stat]) => [id, { answered: stat.answered, percent: percent(stat.correct, stat.answered) }]))
      : null,
  };
}

export function publicSchoolClassSummary(record: SchoolClassRecord) {
  return {
    code: record.code,
    status: record.status,
    active: record.status === 'active',
    createdAt: record.createdAt,
  };
}

export function teacherSchoolClassSummary(record: SchoolClassRecord) {
  const baseline = phaseSummary(record.baseline, record.minAggregateSize);
  const post = phaseSummary(record.post, record.minAggregateSize);
  return {
    code: record.code,
    status: record.status,
    createdAt: record.createdAt,
    minAggregateSize: record.minAggregateSize,
    baseline,
    practiceCompletions: record.practiceCompletions,
    post,
    change: baseline.overall !== null && post.overall !== null ? post.overall - baseline.overall : null,
    privacy: {
      individualStudentsVisible: false,
      rawLiteracyAnswersStored: false,
      politicalBeliefAnswersAccepted: false,
    },
  };
}
