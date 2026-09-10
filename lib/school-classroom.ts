import { deepLiteracyQuestions } from './deep-bank';
import { scoreLiteracyItem, type LiteracyQuestion } from './deep-engine';
import { lockedBeliefItemsV2 } from './belief-v2-engine';
import { expandBeliefItems, type BeliefPolarity } from './belief-statements';
import type { AnswerValue } from './questions';
import { getSchoolLesson, schoolLessons, type SchoolLessonId } from './school-lessons';
import { isJuniorSchoolAgeBand, schoolBeliefItems, schoolJuniorBeliefItems, type SchoolAgeBand } from './school-believe';

export const SCHOOL_CLASSROOM_VERSION = 'school-classroom-2026.09-v4-single-statements' as const;

export type ClassroomActivityType = 'junior' | 'quick26' | 'full42' | 'literacy' | 'guided' | 'custom';
export type ClassroomPacing = 'teacher' | 'student';
export type ClassroomProjectorMode = 'live' | 'reveal';

export type ClassroomActivityConfig = {
  type: ClassroomActivityType;
  title: string;
  questionIds: string[];
  pacing: ClassroomPacing;
  projectorMode: ClassroomProjectorMode;
  ageBand: SchoolAgeBand;
  lessonId?: SchoolLessonId;
};

export type ClassroomQuestionView = {
  id: string;
  kind: 'believe' | 'literacy';
  title: string;
  construct?: string;
  mode?: string;
  sourceItemId?: string;
  polarity?: BeliefPolarity;
  section?: string;
  statement?: string;
  prompt?: string;
  multiSelect?: boolean;
  options: readonly { id: string; label: string }[];
  explanation?: string;
  acceptedAnswerSets?: readonly (readonly string[])[];
};

export const BELIEVE_CLASSROOM_OPTIONS = [
  { id: '-2', label: 'Strongly disagree' },
  { id: '-1', label: 'Disagree' },
  { id: '0', label: 'Neither / it depends' },
  { id: '1', label: 'Agree' },
  { id: '2', label: 'Strongly agree' },
  { id: 'unsure', label: 'Not sure / I do not understand' },
] as const;

const literacyById = new Map(deepLiteracyQuestions.map((question) => [question.id, question]));
const adultBeliefStatements = expandBeliefItems(lockedBeliefItemsV2);

export const classroomQuickIds = adultBeliefStatements.filter((item) => item.stage === 'quick').map((item) => item.id);
export const classroomFullIds = adultBeliefStatements.map((item) => item.id);
export const classroomLiteracyIds = deepLiteracyQuestions.map((question) => question.id);
export const classroomAllIds = [...classroomFullIds, ...classroomLiteracyIds];
export const classroomJuniorIds = expandBeliefItems(schoolJuniorBeliefItems).map((item) => item.id);

function titleForConstruct(construct: string) {
  if (construct === 'nationhood-membership') return 'Nationhood';
  return construct.replaceAll('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function getClassroomQuestion(id: string, ageBand: SchoolAgeBand = 'youth-14-18'): ClassroomQuestionView | null {
  const belief = new Map(expandBeliefItems(schoolBeliefItems(ageBand)).map((item) => [item.id, item])).get(id)
    ?? new Map(adultBeliefStatements.map((item) => [item.id, item])).get(id);
  if (belief) {
    return {
      id: belief.id,
      kind: 'believe',
      title: titleForConstruct(belief.construct),
      construct: belief.construct,
      mode: belief.mode,
      sourceItemId: belief.sourceItemId,
      polarity: belief.polarity,
      statement: belief.statement,
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

export function publicClassroomQuestion(id: string, revealed = false, ageBand: SchoolAgeBand = 'youth-14-18'): ClassroomQuestionView | null {
  const question = getClassroomQuestion(id, ageBand);
  if (!question) return null;
  if (question.kind === 'believe' || revealed) return question;
  const { acceptedAnswerSets: _accepted, explanation: _explanation, ...safe } = question;
  return safe;
}

export function classroomQuestionLabel(id: string, ageBand: SchoolAgeBand = 'youth-14-18') {
  const question = getClassroomQuestion(id, ageBand);
  if (!question) return id;
  return question.kind === 'believe'
    ? `${id} · ${question.construct?.replaceAll('-', ' ')} · ${question.mode?.toUpperCase()}`
    : `${id} · ${question.section?.toUpperCase()}`;
}

export function defaultClassroomActivity(): ClassroomActivityConfig {
  return { type: 'quick26', title: 'Youth Quick 52', questionIds: [...classroomQuickIds], pacing: 'teacher', projectorMode: 'reveal', ageBand: 'youth-14-18' };
}

function cleanIds(ids: unknown, ageBand: SchoolAgeBand): string[] | null {
  if (!Array.isArray(ids)) return null;
  const unique = [...new Set(ids.filter((id): id is string => typeof id === 'string'))];
  if (!unique.length || unique.some((id) => !getClassroomQuestion(id, ageBand))) return null;
  return unique;
}

export function buildClassroomActivity(input: unknown): ClassroomActivityConfig | null {
  if (!input || typeof input !== 'object') return null;
  const value = input as Record<string, unknown>;
  const type = value.type;
  const ageBand: SchoolAgeBand = isJuniorSchoolAgeBand(String(value.ageBand ?? '')) ? 'junior-10-13' : 'youth-14-18';
  const pacing = value.pacing === 'student' ? 'student' : value.pacing === 'teacher' || value.pacing === undefined ? 'teacher' : null;
  const projectorMode = value.projectorMode === 'live' ? 'live' : value.projectorMode === 'reveal' || value.projectorMode === undefined ? 'reveal' : null;
  if (!pacing || !projectorMode || !['junior', 'quick26', 'full42', 'literacy', 'guided', 'custom'].includes(String(type))) return null;

  if (type === 'junior') return { type, title: 'Junior 32', questionIds: [...classroomJuniorIds], pacing, projectorMode, ageBand: 'junior-10-13' };
  if (type === 'quick26') return { type, title: 'Youth Quick 52', questionIds: [...classroomQuickIds], pacing, projectorMode, ageBand };
  if (type === 'full42') return { type, title: 'Youth Full 84', questionIds: [...classroomFullIds], pacing, projectorMode, ageBand };
  if (type === 'literacy') return { type, title: 'Political Literacy Quiz', questionIds: [...classroomLiteracyIds], pacing, projectorMode, ageBand };
  if (type === 'guided') {
    const lesson = getSchoolLesson(typeof value.lessonId === 'string' ? value.lessonId : undefined);
    if (!lesson) return null;
    const lessonAgeBand: SchoolAgeBand = lesson.ageBand === '10–13' ? 'junior-10-13' : 'youth-14-18';
    const lessonBeliefStatements = expandBeliefItems(schoolBeliefItems(lessonAgeBand));
    const questionIds = lesson.questionIds.length
      ? lesson.questionIds.flatMap((id) => lessonBeliefStatements.some((item) => item.sourceItemId === id) ? [`${id}-N`, `${id}-P`] : [id])
      : lesson.id === 'quick26-lab'
        ? [...classroomQuickIds]
        : lesson.id === 'full42-lab'
          ? [...classroomFullIds]
          : [];
    if (!questionIds.length || questionIds.some((id) => !getClassroomQuestion(id, lessonAgeBand))) return null;
    return { type, title: lesson.title, questionIds, pacing, projectorMode, lessonId: lesson.id, ageBand: lessonAgeBand };
  }
  const questionIds = cleanIds(value.questionIds, ageBand);
  if (!questionIds) return null;
  const rawTitle = typeof value.title === 'string' ? value.title.trim().slice(0, 80) : '';
  return { type: 'custom', title: rawTitle || (questionIds.length === 1 ? 'Single live question' : 'Custom activity'), questionIds, pacing, projectorMode, ageBand };
}

export function classroomActivityOptions() {
  return {
    quick26: [...classroomQuickIds],
    full42: [...classroomFullIds],
    junior: [...classroomJuniorIds],
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

export function validateClassroomResponse(input: unknown, ageBand: SchoolAgeBand = 'youth-14-18'): ClassroomResponse | null {
  if (!input || typeof input !== 'object') return null;
  const value = input as Record<string, unknown>;
  if (typeof value.participantToken !== 'string' || value.participantToken.length < 8) return null;
  if (typeof value.questionId !== 'string') return null;
  const question = getClassroomQuestion(value.questionId, ageBand);
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

export function optionKeysForQuestion(id: string, ageBand: SchoolAgeBand = 'youth-14-18') {
  const question = getClassroomQuestion(id, ageBand);
  return question?.options.map((option) => option.id) ?? [];
}

export function classroomResponseIsCorrect(questionId: string, answer: string | string[]) {
  const question = literacyById.get(questionId) as LiteracyQuestion | undefined;
  if (!question) return null;
  const selected = Array.isArray(answer) ? answer : [answer];
  return scoreLiteracyItem(question, selected).correct;
}
