import { deepLiteracyQuestions } from './deep-bank';
import { scoreLiteracyItem, type LiteracyQuestion } from './deep-engine';
import { lockedBeliefItemsV2 } from './belief-v2-engine';
import type { AnswerValue } from './questions';
import { getSchoolLesson, schoolLessons, type SchoolLessonId } from './school-lessons';

export const SCHOOL_CLASSROOM_VERSION = 'school-classroom-2026.09-v3' as const;

export type ClassroomActivityType = 'quick26' | 'full42' | 'literacy' | 'guided' | 'custom';
export type ClassroomPacing = 'teacher' | 'student';
export type ClassroomProjectorMode = 'live' | 'reveal';

export type ClassroomActivityConfig = {
  type: ClassroomActivityType;
  title: string;
  questionIds: string[];
  pacing: ClassroomPacing;
  projectorMode: ClassroomProjectorMode;
  lessonId?: SchoolLessonId;
};

export type ClassroomQuestionView = {
  id: string;
  kind: 'believe' | 'literacy';
  title: string;
  construct?: string;
  mode?: string;
  section?: string;
  negative?: string;
  positive?: string;
  prompt?: string;
  multiSelect?: boolean;
  options: readonly { id: string; label: string }[];
  explanation?: string;
  acceptedAnswerSets?: readonly (readonly string[])[];
};

export const BELIEVE_CLASSROOM_OPTIONS = [
  { id: '-2', label: 'Strongly first' },
  { id: '-1', label: 'Somewhat first' },
  { id: '0', label: 'Between / depends' },
  { id: '1', label: 'Somewhat second' },
  { id: '2', label: 'Strongly second' },
  { id: 'unsure', label: 'Unsure' },
] as const;

const literacyById = new Map(deepLiteracyQuestions.map((question) => [question.id, question]));
const beliefById = new Map(lockedBeliefItemsV2.map((item) => [item.id, item]));

export const classroomQuickIds = lockedBeliefItemsV2.filter((item) => item.stage === 'quick').map((item) => item.id);
export const classroomFullIds = lockedBeliefItemsV2.map((item) => item.id);
export const classroomLiteracyIds = deepLiteracyQuestions.map((question) => question.id);
export const classroomAllIds = [...classroomFullIds, ...classroomLiteracyIds];

function titleForMode(mode: string) {
  return mode === 'think' ? 'THINK' : mode === 'feel' ? 'FEEL' : 'ACT';
}

export function getClassroomQuestion(id: string): ClassroomQuestionView | null {
  const belief = beliefById.get(id);
  if (belief) {
    return {
      id: belief.id,
      kind: 'believe',
      title: `${titleForMode(belief.mode)} · ${belief.construct.replaceAll('-', ' ')}`,
      construct: belief.construct,
      mode: belief.mode,
      negative: belief.negative,
      positive: belief.positive,
      options: BELIEVE_CLASSROOM_OPTIONS,
    };
  }
  const literacy = literacyById.get(id);
  if (!literacy) return null;
  return {
    id: literacy.id,
    kind: 'literacy',
    title: `${literacy.section.toUpperCase()} quiz`,
    section: literacy.section,
    prompt: literacy.prompt,
    multiSelect: literacy.multiSelect,
    options: literacy.options,
    explanation: literacy.explanation,
    acceptedAnswerSets: literacy.acceptedAnswerSets,
  };
}

export function publicClassroomQuestion(id: string, revealed = false): ClassroomQuestionView | null {
  const question = getClassroomQuestion(id);
  if (!question) return null;
  if (question.kind === 'believe' || revealed) return question;
  const { acceptedAnswerSets: _accepted, explanation: _explanation, ...safe } = question;
  return safe;
}

export function classroomQuestionLabel(id: string) {
  const question = getClassroomQuestion(id);
  if (!question) return id;
  return question.kind === 'believe'
    ? `${id} · ${question.construct?.replaceAll('-', ' ')} · ${question.mode?.toUpperCase()}`
    : `${id} · ${question.section?.toUpperCase()}`;
}

export function defaultClassroomActivity(): ClassroomActivityConfig {
  return { type: 'quick26', title: 'Quick 26', questionIds: [...classroomQuickIds], pacing: 'teacher', projectorMode: 'reveal' };
}

function cleanIds(ids: unknown): string[] | null {
  if (!Array.isArray(ids)) return null;
  const unique = [...new Set(ids.filter((id): id is string => typeof id === 'string'))];
  if (!unique.length || unique.some((id) => !getClassroomQuestion(id))) return null;
  return unique;
}

export function buildClassroomActivity(input: unknown): ClassroomActivityConfig | null {
  if (!input || typeof input !== 'object') return null;
  const value = input as Record<string, unknown>;
  const type = value.type;
  const pacing = value.pacing === 'student' ? 'student' : value.pacing === 'teacher' || value.pacing === undefined ? 'teacher' : null;
  const projectorMode = value.projectorMode === 'live' ? 'live' : value.projectorMode === 'reveal' || value.projectorMode === undefined ? 'reveal' : null;
  if (!pacing || !projectorMode || !['quick26', 'full42', 'literacy', 'guided', 'custom'].includes(String(type))) return null;

  if (type === 'quick26') return { type, title: 'Quick 26', questionIds: [...classroomQuickIds], pacing, projectorMode };
  if (type === 'full42') return { type, title: 'Full 42', questionIds: [...classroomFullIds], pacing, projectorMode };
  if (type === 'literacy') return { type, title: 'Political Literacy Quiz', questionIds: [...classroomLiteracyIds], pacing, projectorMode };
  if (type === 'guided') {
    const lesson = getSchoolLesson(typeof value.lessonId === 'string' ? value.lessonId : undefined);
    if (!lesson) return null;
    const questionIds = lesson.questionIds.length
      ? [...lesson.questionIds]
      : lesson.id === 'quick26-lab'
        ? [...classroomQuickIds]
        : lesson.id === 'full42-lab'
          ? [...classroomFullIds]
          : [];
    if (!questionIds.length || questionIds.some((id) => !getClassroomQuestion(id))) return null;
    return { type, title: lesson.title, questionIds, pacing, projectorMode, lessonId: lesson.id };
  }
  const questionIds = cleanIds(value.questionIds);
  if (!questionIds) return null;
  const rawTitle = typeof value.title === 'string' ? value.title.trim().slice(0, 80) : '';
  return { type: 'custom', title: rawTitle || (questionIds.length === 1 ? 'Single live question' : 'Custom activity'), questionIds, pacing, projectorMode };
}

export function classroomActivityOptions() {
  return {
    quick26: [...classroomQuickIds],
    full42: [...classroomFullIds],
    literacy: [...classroomLiteracyIds],
    lessons: schoolLessons.map((lesson) => ({ id: lesson.id, title: lesson.title, duration: lesson.duration, goals: lesson.goals })),
  };
}

function isBeliefAnswer(value: unknown): value is AnswerValue {
  return value === 'unsure' || value === -2 || value === -1 || value === 0 || value === 1 || value === 2;
}

export type ClassroomResponse = {
  participantToken: string;
  questionId: string;
  answer: string | string[];
};

export function validateClassroomResponse(input: unknown): ClassroomResponse | null {
  if (!input || typeof input !== 'object') return null;
  const value = input as Record<string, unknown>;
  if (typeof value.participantToken !== 'string' || value.participantToken.length < 8) return null;
  if (typeof value.questionId !== 'string') return null;
  const question = getClassroomQuestion(value.questionId);
  if (!question) return null;

  if (question.kind === 'believe') {
    const raw = value.answer;
    const numeric = typeof raw === 'number' ? raw : typeof raw === 'string' && raw !== 'unsure' ? Number(raw) : raw;
    if (!isBeliefAnswer(numeric)) return null;
    return { participantToken: value.participantToken, questionId: value.questionId, answer: String(numeric) };
  }

  const selected = Array.isArray(value.answer)
    ? [...new Set(value.answer.filter((item): item is string => typeof item === 'string'))]
    : typeof value.answer === 'string'
      ? [value.answer]
      : [];
  const valid = new Set(question.options.map((option) => option.id));
  if (!selected.length || selected.some((id) => !valid.has(id))) return null;
  if (!question.multiSelect && selected.length !== 1) return null;
  return { participantToken: value.participantToken, questionId: value.questionId, answer: selected };
}

export function optionKeysForQuestion(id: string) {
  const question = getClassroomQuestion(id);
  return question?.options.map((option) => option.id) ?? [];
}

export function classroomResponseIsCorrect(questionId: string, answer: string | string[]) {
  const question = literacyById.get(questionId) as LiteracyQuestion | undefined;
  if (!question) return null;
  const selected = Array.isArray(answer) ? answer : [answer];
  return scoreLiteracyItem(question, selected).correct;
}
