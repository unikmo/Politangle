import {
  QUICK_QUESTIONNAIRE_VERSION,
  dimensionMeta,
  quickQuestions,
  type AnswerValue,
  type Dimension,
  type Question,
} from './questions';

export const QUICK_SCORING_VERSION = 'quick-score-1.0.0' as const;
export const QUICK_SESSION_SCHEMA_VERSION = 1 as const;

export type Answers = Partial<Record<number, AnswerValue>>;

export type DimensionScore = {
  name: string;
  negative: string;
  positive: string;
  score: number | null;
  label: string;
  coverage: number;
  answered: number;
  unsure: number;
  total: number;
  raw: number;
};

export type QuickResult = {
  questionnaireVersion: typeof QUICK_QUESTIONNAIRE_VERSION;
  scoringVersion: typeof QUICK_SCORING_VERSION;
  createdAt: string;
  complete: boolean;
  answeredCount: number;
  unsureCount: number;
  scores: Record<Dimension, DimensionScore>;
};

export type QuickSession = {
  schemaVersion: typeof QUICK_SESSION_SCHEMA_VERSION;
  questionnaireVersion: typeof QUICK_QUESTIONNAIRE_VERSION;
  scoringVersion: typeof QUICK_SCORING_VERSION;
  seed: number;
  order: number[];
  answers: Answers;
  startedAt: string;
  completedAt?: string;
};

const dimensions = Object.keys(dimensionMeta) as Dimension[];
const validAnswers = new Set<AnswerValue>([-2, -1, 0, 1, 2]);
const questionById = new Map(quickQuestions.map((question) => [question.id, question]));

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

export function shuffledQuestionIds(seed: number | string) {
  const numericSeed = typeof seed === 'number' ? seed >>> 0 : hashSeed(seed);
  const random = mulberry32(numericSeed);
  const ids = quickQuestions.map((question) => question.id);

  for (let i = ids.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }

  return ids;
}

export function createQuickSession(seed: number | string, startedAt = new Date().toISOString()): QuickSession {
  const numericSeed = typeof seed === 'number' ? seed >>> 0 : hashSeed(seed);
  return {
    schemaVersion: QUICK_SESSION_SCHEMA_VERSION,
    questionnaireVersion: QUICK_QUESTIONNAIRE_VERSION,
    scoringVersion: QUICK_SCORING_VERSION,
    seed: numericSeed,
    order: shuffledQuestionIds(numericSeed),
    answers: {},
    startedAt,
  };
}

export function getQuestion(questionId: number) {
  return questionById.get(questionId) ?? null;
}

export function isAnswerValue(value: unknown): value is AnswerValue {
  return typeof value === 'number' && validAnswers.has(value as AnswerValue);
}

export function validateQuestionBank(questions: readonly Question[] = quickQuestions) {
  const errors: string[] = [];
  const ids = new Set<number>();

  for (const question of questions) {
    if (ids.has(question.id)) errors.push(`Duplicate question id: ${question.id}`);
    ids.add(question.id);
    if (!dimensionMeta[question.dimension]) errors.push(`Unknown dimension on question ${question.id}`);
    if (question.direction !== -1 && question.direction !== 1) errors.push(`Invalid direction on question ${question.id}`);
    if (!question.text.trim()) errors.push(`Empty text on question ${question.id}`);
  }

  if (questions.length !== 26) errors.push(`Quick must contain 26 questions; found ${questions.length}`);

  for (const dimension of dimensions) {
    const subset = questions.filter((question) => question.dimension === dimension);
    if (subset.length < 5) errors.push(`${dimension} needs at least 5 questions`);
    if (!subset.some((question) => question.direction === -1) || !subset.some((question) => question.direction === 1)) {
      errors.push(`${dimension} needs both keyed directions`);
    }
  }

  return { valid: errors.length === 0, errors };
}

export function validateAnswers(answers: Answers) {
  const errors: string[] = [];

  for (const [rawId, value] of Object.entries(answers)) {
    const id = Number(rawId);
    if (!questionById.has(id)) errors.push(`Unknown question id: ${rawId}`);
    if (!isAnswerValue(value)) errors.push(`Invalid answer for question ${rawId}`);
  }

  return { valid: errors.length === 0, errors };
}

export function answerQuestion(session: QuickSession, questionId: number, value: AnswerValue): QuickSession {
  if (!questionById.has(questionId)) throw new Error(`Unknown question id: ${questionId}`);
  if (!isAnswerValue(value)) throw new Error(`Invalid answer value: ${value}`);

  return {
    ...session,
    answers: { ...session.answers, [questionId]: value },
  };
}

export function getProgress(answers: Answers) {
  const answeredCount = quickQuestions.filter((question) => isAnswerValue(answers[question.id])).length;
  const unsureCount = quickQuestions.filter((question) => answers[question.id] === 0).length;
  return {
    answeredCount,
    unsureCount,
    total: quickQuestions.length,
    complete: answeredCount === quickQuestions.length,
    percent: Math.round((answeredCount / quickQuestions.length) * 100),
  };
}

function scoreLabel(score: number | null, negative: string, positive: string) {
  if (score === null) return 'Insufficient signal';
  if (score <= 20) return `Leans strongly toward ${negative.toLowerCase()}`;
  if (score < 40) return `Leans toward ${negative.toLowerCase()}`;
  if (score <= 60) return 'Mixed / cross-pressured';
  if (score < 80) return `Leans toward ${positive.toLowerCase()}`;
  return `Leans strongly toward ${positive.toLowerCase()}`;
}

export function calculateQuickResult(answers: Answers, createdAt = new Date().toISOString()): QuickResult {
  const validation = validateAnswers(answers);
  if (!validation.valid) throw new Error(validation.errors.join('; '));

  const progress = getProgress(answers);
  const scores = {} as Record<Dimension, DimensionScore>;

  for (const dimension of dimensions) {
    const questions = quickQuestions.filter((question) => question.dimension === dimension);
    let raw = 0;
    let answered = 0;
    let unsure = 0;

    for (const question of questions) {
      const answer = answers[question.id];
      if (answer === undefined) continue;
      if (answer === 0) {
        unsure += 1;
        continue;
      }
      raw += answer * question.direction;
      answered += 1;
    }

    const max = answered * 2;
    const score = answered === 0 ? null : Math.round(((raw + max) / (max * 2)) * 100);
    const meta = dimensionMeta[dimension];

    scores[dimension] = {
      score,
      name: meta.name,
      negative: meta.negative,
      positive: meta.positive,
      label: scoreLabel(score, meta.negative, meta.positive),
      coverage: Math.round((answered / questions.length) * 100),
      answered,
      unsure,
      total: questions.length,
      raw,
    };
  }

  return {
    questionnaireVersion: QUICK_QUESTIONNAIRE_VERSION,
    scoringVersion: QUICK_SCORING_VERSION,
    createdAt,
    complete: progress.complete,
    answeredCount: progress.answeredCount,
    unsureCount: progress.unsureCount,
    scores,
  };
}

export function parseStoredSession(raw: string | null): QuickSession | null {
  if (!raw) return null;

  try {
    const candidate = JSON.parse(raw) as Partial<QuickSession>;
    if (candidate.schemaVersion !== QUICK_SESSION_SCHEMA_VERSION) return null;
    if (candidate.questionnaireVersion !== QUICK_QUESTIONNAIRE_VERSION) return null;
    if (candidate.scoringVersion !== QUICK_SCORING_VERSION) return null;
    if (typeof candidate.seed !== 'number') return null;
    if (!Array.isArray(candidate.order) || candidate.order.length !== quickQuestions.length) return null;
    if (new Set(candidate.order).size !== quickQuestions.length) return null;
    if (!candidate.order.every((id) => typeof id === 'number' && questionById.has(id))) return null;
    if (!candidate.answers || typeof candidate.answers !== 'object') return null;
    if (!validateAnswers(candidate.answers).valid) return null;
    if (typeof candidate.startedAt !== 'string') return null;

    return candidate as QuickSession;
  } catch {
    return null;
  }
}

export function parseStoredResult(raw: string | null): QuickResult | null {
  if (!raw) return null;

  try {
    const candidate = JSON.parse(raw) as Partial<QuickResult>;
    if (candidate.questionnaireVersion !== QUICK_QUESTIONNAIRE_VERSION) return null;
    if (candidate.scoringVersion !== QUICK_SCORING_VERSION) return null;
    if (typeof candidate.createdAt !== 'string') return null;
    if (typeof candidate.complete !== 'boolean') return null;
    if (typeof candidate.answeredCount !== 'number' || typeof candidate.unsureCount !== 'number') return null;
    if (!candidate.scores || typeof candidate.scores !== 'object') return null;

    for (const dimension of dimensions) {
      const score = candidate.scores[dimension];
      if (!score) return null;
      if (score.score !== null && (typeof score.score !== 'number' || score.score < 0 || score.score > 100)) return null;
      if (typeof score.coverage !== 'number' || score.coverage < 0 || score.coverage > 100) return null;
      if (typeof score.label !== 'string') return null;
    }

    return candidate as QuickResult;
  } catch {
    return null;
  }
}

export function completeSession(session: QuickSession, completedAt = new Date().toISOString()): QuickSession {
  if (!getProgress(session.answers).complete) throw new Error('Cannot complete an unfinished Quick session');
  return { ...session, completedAt };
}

export const engineIntegrity = validateQuestionBank();
if (!engineIntegrity.valid) {
  throw new Error(`Politangle question bank integrity failed: ${engineIntegrity.errors.join('; ')}`);
}
