import type { AnswerValue } from './questions';

export type DeepSection = 'classify' | 'understand';
export type DeepBeliefAxis =
  | 'pluralism'
  | 'ownership'
  | 'nativism'
  | 'populism'
  | 'ecology'
  | 'nationhood'
  | 'democracyRejection'
  | 'religionPublicRole'
  | 'subsidiarity';

export type DeepBeliefQuestion = {
  id: string;
  section: 'believe';
  axis: DeepBeliefAxis;
  construct: string;
  negative: string;
  positive: string;
  evidenceIds: readonly string[];
};

export type LiteracyOption = {
  id: string;
  label: string;
};

export type LiteracyQuestion = {
  id: string;
  section: DeepSection;
  prompt: string;
  options: readonly LiteracyOption[];
  acceptedAnswerSets: readonly (readonly string[])[];
  explanation: string;
  evidenceIds: readonly string[];
  multiSelect?: boolean;
};

export type DeepBeliefAnswers = Partial<Record<string, AnswerValue>>;
export type LiteracyAnswers = Partial<Record<string, readonly string[]>>;

export type DeepBeliefAxisResult = {
  axis: DeepBeliefAxis;
  negative: string;
  positive: string;
  score: number | null;
  label: string;
  coverage: number;
  interpretable: boolean;
  answered: number;
  unsure: number;
  total: number;
  raw: number;
};

export type DeepBeliefResult = {
  version: 'deep-belief-score-1.2.0';
  createdAt: string;
  complete: boolean;
  answeredCount: number;
  unsureCount: number;
  axes: Record<DeepBeliefAxis, DeepBeliefAxisResult>;
};

export type LiteracyItemResult = {
  id: string;
  section: DeepSection;
  answered: boolean;
  correct: boolean;
};

export type LiteracySectionResult = {
  correct: number;
  answered: number;
  total: number;
  percent: number;
  coverage: number;
};

export type DeepLiteracyResult = {
  version: 'deep-literacy-score-1.1.0';
  createdAt: string;
  complete: boolean;
  items: LiteracyItemResult[];
  sections: Record<DeepSection, LiteracySectionResult>;
  overall: LiteracySectionResult;
};

export const deepBeliefAxisMeta: Record<DeepBeliefAxis, { negative: string; positive: string }> = {
  pluralism: { negative: 'Pluralism / institutional constraints', positive: 'Majoritarian / concentrated authority' },
  ownership: { negative: 'Social / worker ownership', positive: 'Private / shareholder ownership' },
  nativism: { negative: 'Civic / inclusive membership', positive: 'Inherited / native priority' },
  populism: { negative: 'Plural interests / compromise', positive: 'People-versus-elite general will' },
  ecology: { negative: 'Ecological limits / structural change', positive: 'Growth / incremental adaptation' },
  nationhood: { negative: 'Shared / post-national authority', positive: 'Nation-centered self-determination' },
  democracyRejection: { negative: 'Competitive democracy as necessary', positive: 'Openness to non-democratic rule' },
  religionPublicRole: { negative: 'Institutionally secular public policy', positive: 'Religiously inspired public policy' },
  subsidiarity: { negative: 'More direct central responsibility', positive: 'Subsidiarity / distributed responsibility' },
};

const deepBeliefAxes = Object.keys(deepBeliefAxisMeta) as DeepBeliefAxis[];
const validBeliefAnswers = new Set<AnswerValue>([-2, -1, 0, 1, 2, 'unsure']);

function beliefLabel(score: number | null, axis: DeepBeliefAxis, interpretable: boolean) {
  if (score === null) return 'Insufficient signal';
  if (!interpretable) return 'Low coverage — insufficient signal';
  const meta = deepBeliefAxisMeta[axis];
  if (score <= 20) return `Leans strongly toward ${meta.negative.toLowerCase()}`;
  if (score < 40) return `Leans toward ${meta.negative.toLowerCase()}`;
  if (score <= 60) return 'Mixed / cross-pressured';
  if (score < 80) return `Leans toward ${meta.positive.toLowerCase()}`;
  return `Leans strongly toward ${meta.positive.toLowerCase()}`;
}

export function validateDeepBeliefQuestion(question: DeepBeliefQuestion) {
  const errors: string[] = [];
  if (!question.id.trim()) errors.push('Belief question id is required');
  if (!deepBeliefAxisMeta[question.axis]) errors.push(`Belief question ${question.id} has unknown axis`);
  if (!question.construct.trim()) errors.push(`Belief question ${question.id} has no construct label`);
  if (!question.negative.trim() || !question.positive.trim()) errors.push(`Belief question ${question.id} needs two poles`);
  if (question.negative.trim() === question.positive.trim()) errors.push(`Belief question ${question.id} has identical poles`);
  if (question.evidenceIds.length === 0) errors.push(`Belief question ${question.id} has no evidence binding`);
  return { valid: errors.length === 0, errors };
}

export function calculateDeepBeliefResult(
  questions: readonly DeepBeliefQuestion[],
  answers: DeepBeliefAnswers,
  createdAt = new Date().toISOString(),
): DeepBeliefResult {
  const ids = new Set<string>();
  for (const question of questions) {
    const validation = validateDeepBeliefQuestion(question);
    if (!validation.valid) throw new Error(validation.errors.join('; '));
    if (ids.has(question.id)) throw new Error(`Duplicate belief question id: ${question.id}`);
    ids.add(question.id);
  }

  for (const [id, value] of Object.entries(answers)) {
    if (!ids.has(id)) throw new Error(`Unknown belief question id: ${id}`);
    if (!validBeliefAnswers.has(value as AnswerValue)) throw new Error(`Invalid belief answer for ${id}`);
  }

  const axes = {} as Record<DeepBeliefAxis, DeepBeliefAxisResult>;
  let answeredCount = 0;
  let unsureCount = 0;

  for (const axis of deepBeliefAxes) {
    const subset = questions.filter((question) => question.axis === axis);
    let raw = 0;
    let answered = 0;
    let unsure = 0;

    for (const question of subset) {
      const answer = answers[question.id];
      if (answer === undefined) continue;
      answeredCount += 1;
      if (answer === 'unsure') {
        unsure += 1;
        unsureCount += 1;
        continue;
      }
      raw += answer;
      answered += 1;
    }

    const max = answered * 2;
    const score = answered === 0 ? null : Math.round(((raw + max) / (max * 2)) * 100);
    const minimumScoredResponses = subset.length <= 2 ? subset.length : Math.ceil(subset.length * 0.67);
    const interpretable = subset.length > 0 && answered >= minimumScoredResponses;
    const meta = deepBeliefAxisMeta[axis];

    axes[axis] = {
      axis,
      negative: meta.negative,
      positive: meta.positive,
      score,
      label: beliefLabel(score, axis, interpretable),
      coverage: subset.length === 0 ? 0 : Math.round((answered / subset.length) * 100),
      interpretable,
      answered,
      unsure,
      total: subset.length,
      raw,
    };
  }

  return {
    version: 'deep-belief-score-1.2.0',
    createdAt,
    complete: answeredCount === questions.length,
    answeredCount,
    unsureCount,
    axes,
  };
}

function canonicalSet(values: readonly string[]) {
  return [...new Set(values)].sort();
}

function sameSet(a: readonly string[], b: readonly string[]) {
  const left = canonicalSet(a);
  const right = canonicalSet(b);
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

export function validateLiteracyQuestion(question: LiteracyQuestion) {
  const errors: string[] = [];
  const optionIds = question.options.map((option) => option.id);
  const optionSet = new Set(optionIds);

  if (!question.id.trim()) errors.push('Question id is required');
  if (!question.prompt.trim()) errors.push(`Question ${question.id} has no prompt`);
  if (question.options.length < 2) errors.push(`Question ${question.id} needs at least two options`);
  if (optionSet.size !== optionIds.length) errors.push(`Question ${question.id} has duplicate option ids`);
  if (question.options.some((option) => !option.id.trim() || !option.label.trim())) errors.push(`Question ${question.id} has an empty option`);
  if (question.acceptedAnswerSets.length === 0) errors.push(`Question ${question.id} needs at least one accepted answer set`);
  if (!question.explanation.trim()) errors.push(`Question ${question.id} needs an explanation`);
  if (question.evidenceIds.length === 0) errors.push(`Question ${question.id} has no evidence binding`);

  for (const accepted of question.acceptedAnswerSets) {
    if (accepted.length === 0) errors.push(`Question ${question.id} has an empty accepted answer set`);
    for (const optionId of accepted) {
      if (!optionSet.has(optionId)) errors.push(`Question ${question.id} accepts unknown option ${optionId}`);
    }
  }

  return { valid: errors.length === 0, errors };
}

export function scoreLiteracyItem(question: LiteracyQuestion, answer: readonly string[] | undefined): LiteracyItemResult {
  const validation = validateLiteracyQuestion(question);
  if (!validation.valid) throw new Error(validation.errors.join('; '));

  const optionIds = question.options.map((option) => option.id);
  const answered = Array.isArray(answer) && answer.length > 0;
  const validAnswer = answered && answer!.every((optionId) => optionIds.includes(optionId));
  const allowedCardinality = question.multiSelect || !answered || answer!.length === 1;
  const correct = Boolean(validAnswer && allowedCardinality && question.acceptedAnswerSets.some((accepted) => sameSet(accepted, answer!)));

  return { id: question.id, section: question.section, answered, correct };
}

function summarize(items: LiteracyItemResult[]): LiteracySectionResult {
  const total = items.length;
  const answered = items.filter((item) => item.answered).length;
  const correct = items.filter((item) => item.correct).length;
  return {
    correct,
    answered,
    total,
    percent: total === 0 ? 0 : Math.round((correct / total) * 100),
    coverage: total === 0 ? 0 : Math.round((answered / total) * 100),
  };
}

export function calculateDeepLiteracyResult(
  questions: readonly LiteracyQuestion[],
  answers: LiteracyAnswers,
  createdAt = new Date().toISOString(),
): DeepLiteracyResult {
  const ids = new Set<string>();
  for (const question of questions) {
    const validation = validateLiteracyQuestion(question);
    if (!validation.valid) throw new Error(validation.errors.join('; '));
    if (ids.has(question.id)) throw new Error(`Duplicate literacy question id: ${question.id}`);
    ids.add(question.id);
  }

  for (const id of Object.keys(answers)) {
    if (!ids.has(id)) throw new Error(`Unknown literacy question id: ${id}`);
  }

  const items = questions.map((question) => scoreLiteracyItem(question, answers[question.id]));
  const classifyItems = items.filter((item) => item.section === 'classify');
  const understandItems = items.filter((item) => item.section === 'understand');

  return {
    version: 'deep-literacy-score-1.1.0',
    createdAt,
    complete: items.every((item) => item.answered),
    items,
    sections: {
      classify: summarize(classifyItems),
      understand: summarize(understandItems),
    },
    overall: summarize(items),
  };
}
