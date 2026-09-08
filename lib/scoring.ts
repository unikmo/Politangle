import { dimensionMeta, quickQuestions, type Dimension } from './questions';

export type Answers = Record<number, number>;
export type DimensionScore = { score: number; label: string; name: string; negative: string; positive: string };
export type QuickResult = {
  version: 'quick-v0.1-validation';
  createdAt: string;
  scores: Record<Dimension, DimensionScore>;
};

function scoreLabel(score: number, negative: string, positive: string) {
  if (score <= 24) return `Strongly ${negative.toLowerCase()}`;
  if (score <= 42) return `Moderately ${negative.toLowerCase()}`;
  if (score < 58) return 'Mixed / balanced';
  if (score < 76) return `Moderately ${positive.toLowerCase()}`;
  return `Strongly ${positive.toLowerCase()}`;
}

export function calculateQuickResult(answers: Answers): QuickResult {
  const dimensions = Object.keys(dimensionMeta) as Dimension[];
  const scores = {} as Record<Dimension, DimensionScore>;

  for (const dimension of dimensions) {
    const qs = quickQuestions.filter((question) => question.dimension === dimension);
    let raw = 0;
    let max = 0;

    for (const question of qs) {
      const answer = answers[question.id] ?? 0;
      raw += answer * question.direction;
      max += 2;
    }

    const score = Math.round(((raw + max) / (max * 2)) * 100);
    const meta = dimensionMeta[dimension];
    scores[dimension] = {
      score,
      name: meta.name,
      negative: meta.negative,
      positive: meta.positive,
      label: scoreLabel(score, meta.negative, meta.positive),
    };
  }

  return {
    version: 'quick-v0.1-validation',
    createdAt: new Date().toISOString(),
    scores,
  };
}

export function trianglePoint(result: QuickResult) {
  const economy = result.scores.economy.score;
  const society = result.scores.society.score;
  const power = result.scores.power.score;

  return {
    x: Math.max(18, Math.min(82, Math.round((economy + society) / 2))),
    y: Math.max(18, Math.min(82, Math.round(100 - power * 0.72))),
  };
}
