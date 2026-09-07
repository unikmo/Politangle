export type DeepSection = 'classify' | 'understand';

export type LiteracyQuestion = {
  id: string;
  section: DeepSection;
  prompt: string;
  optionIds: readonly string[];
  acceptedAnswerSets: readonly (readonly string[])[];
};

export type LiteracyAnswers = Partial<Record<string, readonly string[]>>;

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
  version: 'deep-literacy-score-1.0.0';
  createdAt: string;
  complete: boolean;
  items: LiteracyItemResult[];
  sections: Record<DeepSection, LiteracySectionResult>;
  overall: LiteracySectionResult;
};

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
  const optionSet = new Set(question.optionIds);

  if (!question.id.trim()) errors.push('Question id is required');
  if (!question.prompt.trim()) errors.push(`Question ${question.id} has no prompt`);
  if (question.optionIds.length < 2) errors.push(`Question ${question.id} needs at least two options`);
  if (optionSet.size !== question.optionIds.length) errors.push(`Question ${question.id} has duplicate option ids`);
  if (question.acceptedAnswerSets.length === 0) errors.push(`Question ${question.id} needs at least one accepted answer set`);

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

  const answered = Array.isArray(answer) && answer.length > 0;
  const validAnswer = answered && answer!.every((optionId) => question.optionIds.includes(optionId));
  const correct = Boolean(validAnswer && question.acceptedAnswerSets.some((accepted) => sameSet(accepted, answer!)));

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
    version: 'deep-literacy-score-1.0.0',
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
