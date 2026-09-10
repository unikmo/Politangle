import { createHash } from 'node:crypto';
import {
  buildClassroomActivity,
  classroomResponseIsCorrect,
  defaultClassroomActivity,
  getClassroomQuestion,
  optionKeysForQuestion,
  publicClassroomQuestion,
  type ClassroomActivityConfig,
  type ClassroomResponse,
} from './school-classroom';
import { canonicalFamilyProfilesV2, lockedBeliefItemsV2 } from './belief-v2-engine';
import { polygonAxesV2, type AttitudeMode, type BeliefConstruct } from './belief-v2';
import type { SchoolAgeBand } from './school-believe';

export const SCHOOL_AGGREGATE_SCHEMA = 2 as const;

export type SchoolQuestionAggregate = {
  responses: number;
  optionCounts: Record<string, number>;
  correct: number;
};

export type SchoolClassRecord = {
  schemaVersion: typeof SCHOOL_AGGREGATE_SCHEMA;
  code: string;
  status: 'active' | 'closed';
  createdAt: string;
  teacherKeyHash: string;
  roomLabel: string;
  joinedCount: number;
  activity: ClassroomActivityConfig;
  currentIndex: number;
  currentQuestionId: string | null;
  questionOpen: boolean;
  revealed: boolean;
  questions: Record<string, SchoolQuestionAggregate>;
};

function emptyQuestion(id: string, ageBand: SchoolAgeBand = 'youth-14-18'): SchoolQuestionAggregate {
  return {
    responses: 0,
    optionCounts: Object.fromEntries(optionKeysForQuestion(id, ageBand).map((key) => [key, 0])),
    correct: 0,
  };
}

function ensureQuestions(current: Record<string, SchoolQuestionAggregate>, ids: readonly string[], ageBand: SchoolAgeBand = 'youth-14-18') {
  const next = Object.fromEntries(Object.entries(current).map(([id, value]) => [id, {
    responses: value.responses,
    optionCounts: { ...value.optionCounts },
    correct: value.correct,
  }])) as Record<string, SchoolQuestionAggregate>;
  for (const id of ids) if (!next[id]) next[id] = emptyQuestion(id, ageBand);
  return next;
}

export function createSchoolClassRecord(
  code: string,
  teacherKeyHash: string,
  activity: ClassroomActivityConfig = defaultClassroomActivity(),
  roomLabel = '',
  createdAt = new Date().toISOString(),
): SchoolClassRecord {
  return {
    schemaVersion: SCHOOL_AGGREGATE_SCHEMA,
    code: code.toUpperCase(),
    status: 'active',
    createdAt,
    teacherKeyHash,
    roomLabel: roomLabel.trim().slice(0, 80),
    joinedCount: 0,
    activity,
    currentIndex: -1,
    currentQuestionId: null,
    questionOpen: false,
    revealed: false,
    questions: ensureQuestions({}, activity.questionIds, activity.ageBand),
  };
}

export function hashSchoolSecret(value: string) {
  return createHash('sha256').update(value).digest('hex');
}

export function verifyTeacherKey(record: SchoolClassRecord, key: string) {
  return hashSchoolSecret(key) === record.teacherKeyHash;
}

export function applySchoolJoin(record: SchoolClassRecord) {
  return { ...record, joinedCount: record.joinedCount + 1 };
}

export function configureSchoolClass(record: SchoolClassRecord, rawActivity: unknown) {
  const activity = buildClassroomActivity(rawActivity);
  if (!activity) throw new Error('Invalid classroom activity');
  return {
    ...record,
    activity,
    currentIndex: -1,
    currentQuestionId: null,
    questionOpen: false,
    revealed: false,
    questions: ensureQuestions(record.questions, activity.questionIds, activity.ageBand),
  };
}

export function launchSchoolQuestion(record: SchoolClassRecord, questionId: string) {
  const index = record.activity.questionIds.indexOf(questionId);
  if (index < 0 || !getClassroomQuestion(questionId, record.activity.ageBand)) throw new Error('Question is not part of this activity');
  return { ...record, currentIndex: index, currentQuestionId: questionId, questionOpen: true, revealed: false };
}

export function closeSchoolQuestion(record: SchoolClassRecord) {
  return { ...record, questionOpen: false };
}

export function revealSchoolQuestion(record: SchoolClassRecord, revealed = true) {
  return { ...record, revealed };
}

export function nextSchoolQuestion(record: SchoolClassRecord) {
  const nextIndex = Math.min(record.activity.questionIds.length - 1, Math.max(0, record.currentIndex + 1));
  const id = record.activity.questionIds[nextIndex] ?? null;
  return id ? { ...record, currentIndex: nextIndex, currentQuestionId: id, questionOpen: true, revealed: false } : record;
}

export function applySchoolResponse(record: SchoolClassRecord, response: ClassroomResponse) {
  if (!record.activity.questionIds.includes(response.questionId)) throw new Error('Question is outside the current classroom activity');
  const question = getClassroomQuestion(response.questionId, record.activity.ageBand);
  if (!question) throw new Error('Unknown classroom question');
  const current = record.questions[response.questionId] ?? emptyQuestion(response.questionId, record.activity.ageBand);
  const next: SchoolQuestionAggregate = {
    responses: current.responses + 1,
    optionCounts: { ...current.optionCounts },
    correct: current.correct,
  };
  const selected = Array.isArray(response.answer) ? response.answer : [response.answer];
  for (const option of selected) {
    if (!(option in next.optionCounts)) throw new Error('Unknown response option');
    next.optionCounts[option] += 1;
  }
  const correct = classroomResponseIsCorrect(response.questionId, response.answer);
  if (correct === true) next.correct += 1;
  return { ...record, questions: { ...record.questions, [response.questionId]: next } };
}

function percent(value: number, total: number) {
  return total ? Math.round((value / total) * 100) : 0;
}

function questionSummary(id: string, aggregate: SchoolQuestionAggregate, ageBand: SchoolAgeBand = 'youth-14-18') {
  const question = getClassroomQuestion(id, ageBand);
  if (!question) return null;
  const distribution = question.options.map((option) => ({
    id: option.id,
    label: option.label,
    count: aggregate.optionCounts[option.id] ?? 0,
    percent: percent(aggregate.optionCounts[option.id] ?? 0, aggregate.responses),
  }));
  return {
    id,
    kind: question.kind,
    title: question.title,
    construct: question.construct ?? null,
    mode: question.mode ?? null,
    section: question.section ?? null,
    responses: aggregate.responses,
    distribution,
    correct: question.kind === 'literacy' ? aggregate.correct : null,
    correctPercent: question.kind === 'literacy' ? percent(aggregate.correct, aggregate.responses) : null,
  };
}

function numericPosition(aggregate: SchoolQuestionAggregate) {
  const keys = ['-2', '-1', '0', '1', '2'] as const;
  const total = keys.reduce((sum, key) => sum + (aggregate.optionCounts[key] ?? 0), 0);
  if (!total) return null;
  const weighted = keys.reduce((sum, key) => sum + Number(key) * (aggregate.optionCounts[key] ?? 0), 0);
  const mean = weighted / total;
  return Math.round(((mean + 2) / 4) * 100);
}

function canonicalAggregateForSource(record: SchoolClassRecord, sourceItemId: string): SchoolQuestionAggregate | null {
  const negative = record.questions[`${sourceItemId}-N`];
  const positive = record.questions[`${sourceItemId}-P`];
  if (!negative && !positive) return null;
  const optionCounts: Record<string, number> = { '-2': 0, '-1': 0, '0': 0, '1': 0, '2': 0, unsure: 0 };
  if (positive) for (const [key, count] of Object.entries(positive.optionCounts)) optionCounts[key] = (optionCounts[key] ?? 0) + count;
  if (negative) {
    for (const [key, count] of Object.entries(negative.optionCounts)) {
      const canonicalKey = key === 'unsure' || key === '0' ? key : String(-Number(key));
      optionCounts[canonicalKey] = (optionCounts[canonicalKey] ?? 0) + count;
    }
  }
  return { responses: (negative?.responses ?? 0) + (positive?.responses ?? 0), optionCounts, correct: 0 };
}

function entropy(aggregate: SchoolQuestionAggregate) {
  const counts = Object.values(aggregate.optionCounts).filter((count) => count > 0);
  const total = counts.reduce((sum, count) => sum + count, 0);
  if (total < 2 || counts.length < 2) return 0;
  const raw = -counts.reduce((sum, count) => {
    const p = count / total;
    return sum + p * Math.log(p);
  }, 0);
  return raw / Math.log(Object.keys(aggregate.optionCounts).length);
}

function constructModes(record: SchoolClassRecord) {
  const constructs = [...new Set(lockedBeliefItemsV2.map((item) => item.construct))] as BeliefConstruct[];
  return constructs.map((construct) => {
    const values = {} as Record<AttitudeMode, number | null>;
    for (const mode of ['think', 'feel', 'act'] as const) {
      const item = lockedBeliefItemsV2.find((candidate) => candidate.construct === construct && candidate.mode === mode)!;
      const aggregate = canonicalAggregateForSource(record, item.id);
      values[mode] = aggregate ? numericPosition(aggregate) : null;
    }
    const known = [values.think, values.feel, values.act].filter((value): value is number => value !== null);
    return {
      construct,
      think: values.think,
      feel: values.feel,
      act: values.act,
      overall: known.length ? Math.round(known.reduce((sum, value) => sum + value, 0) / known.length) : null,
      tension: known.length === 3 ? Math.max(...known) - Math.min(...known) : null,
    };
  });
}

function polygonSummary(record: SchoolClassRecord) {
  const modes = constructModes(record);
  return polygonAxesV2.map((axis) => {
    const values: number[] = [];
    let expected = 0;
    for (const construct of axis.constructs) {
      const result = modes.find((item) => item.construct === construct)!;
      for (const value of [result.think, result.feel, result.act]) {
        expected += 1;
        if (value !== null) values.push(value);
      }
    }
    return {
      id: axis.id,
      name: axis.name,
      low: axis.low,
      high: axis.high,
      score: values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : null,
      coverage: expected ? Math.round((values.length / expected) * 100) : 0,
    };
  });
}

function familySummary(record: SchoolClassRecord) {
  return canonicalFamilyProfilesV2.map((profile) => {
    let weighted = 0;
    let knownWeight = 0;
    let totalWeight = 0;
    for (const loading of profile.loadings) {
      const items = lockedBeliefItemsV2.filter((item) => item.construct === loading.construct);
      for (const item of items) {
        totalWeight += loading.relevance;
        const aggregate = canonicalAggregateForSource(record, item.id);
        const position = aggregate ? numericPosition(aggregate) : null;
        if (position === null) continue;
        knownWeight += loading.relevance;
        const aligned = loading.direction === 1 ? position : 100 - position;
        weighted += aligned * loading.relevance;
      }
    }
    const coverage = totalWeight ? Math.round((knownWeight / totalWeight) * 100) : 0;
    return { id: profile.id, name: profile.name, overall: knownWeight && coverage >= 50 ? Math.round(weighted / knownWeight) : null, coverage };
  }).sort((a, b) => (b.overall ?? -1) - (a.overall ?? -1));
}

export function schoolClassSummary(record: SchoolClassRecord) {
  const questionResults = Object.entries(record.questions)
    .map(([id, aggregate]) => ({ summary: questionSummary(id, aggregate, record.activity.ageBand), diversity: entropy(aggregate) }))
    .filter((row): row is { summary: NonNullable<ReturnType<typeof questionSummary>>; diversity: number } => Boolean(row.summary))
    .filter((row) => row.summary.responses > 0);
  const ranked = questionResults.filter((row) => row.summary.responses >= 2);
  const mostDivided = [...ranked].sort((a, b) => b.diversity - a.diversity).slice(0, 5).map((row) => row.summary);
  const mostConsensus = [...ranked].sort((a, b) => a.diversity - b.diversity).slice(0, 5).map((row) => row.summary);
  const literacyRows = questionResults.filter((row) => row.summary.kind === 'literacy');
  const literacyResponses = literacyRows.reduce((sum, row) => sum + row.summary.responses, 0);
  const literacyCorrect = literacyRows.reduce((sum, row) => sum + (row.summary.correct ?? 0), 0);
  const modeRows = constructModes(record);
  return {
    joinedCount: record.joinedCount,
    activityTitle: record.activity.title,
    answeredQuestions: questionResults.length,
    totalQuestions: Object.keys(record.questions).length,
    totalResponses: questionResults.reduce((sum, row) => sum + row.summary.responses, 0),
    questions: questionResults.map((row) => row.summary),
    mostDivided,
    mostConsensus,
    polygon: polygonSummary(record),
    families: familySummary(record),
    constructModes: modeRows,
    strongestModeTensions: modeRows.filter((row) => row.tension !== null).sort((a, b) => (b.tension ?? 0) - (a.tension ?? 0)).slice(0, 5),
    literacy: {
      responses: literacyResponses,
      correct: literacyCorrect,
      percent: literacyResponses ? percent(literacyCorrect, literacyResponses) : null,
      weakestQuestions: literacyRows.filter((row) => row.summary.correctPercent !== null).sort((a, b) => (a.summary.correctPercent ?? 0) - (b.summary.correctPercent ?? 0)).slice(0, 5).map((row) => row.summary),
    },
  };
}

export function publicSchoolClassSummary(record: SchoolClassRecord) {
  const currentAggregate = record.currentQuestionId ? record.questions[record.currentQuestionId] : null;
  const projectorVisible = record.activity.projectorMode === 'live' || record.revealed;
  return {
    code: record.code,
    status: record.status,
    active: record.status === 'active',
    roomLabel: record.roomLabel,
    joinedCount: record.joinedCount,
    activity: record.activity,
    currentIndex: record.currentIndex,
    currentQuestionId: record.currentQuestionId,
    questionOpen: record.questionOpen,
    revealed: record.revealed,
    currentQuestion: record.currentQuestionId ? publicClassroomQuestion(record.currentQuestionId, record.revealed, record.activity.ageBand) : null,
    activityQuestions: record.activity.questionIds.map((id) => publicClassroomQuestion(id, false, record.activity.ageBand)).filter(Boolean),
    projectorDistribution: projectorVisible && record.currentQuestionId && currentAggregate ? questionSummary(record.currentQuestionId, currentAggregate, record.activity.ageBand) : null,
  };
}

export function teacherSchoolClassSummary(record: SchoolClassRecord) {
  const currentAggregate = record.currentQuestionId ? record.questions[record.currentQuestionId] : null;
  return {
    code: record.code,
    status: record.status,
    createdAt: record.createdAt,
    roomLabel: record.roomLabel,
    joinedCount: record.joinedCount,
    activity: record.activity,
    currentIndex: record.currentIndex,
    currentQuestionId: record.currentQuestionId,
    questionOpen: record.questionOpen,
    revealed: record.revealed,
    currentQuestion: record.currentQuestionId ? getClassroomQuestion(record.currentQuestionId, record.activity.ageBand) : null,
    currentDistribution: record.currentQuestionId && currentAggregate ? questionSummary(record.currentQuestionId, currentAggregate, record.activity.ageBand) : null,
    classSummary: schoolClassSummary(record),
    privacy: {
      individualStudentsVisible: false,
      participantAnswerMappingsStored: false,
      politicalAnswersAggregated: true,
      rawParticipantPoliticalProfilesStored: false,
    },
  };
}
