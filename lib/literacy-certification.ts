import { POLITANGLE_PRODUCT_DECISIONS } from './product-decisions';

export type CertifiedSectionScore = {
  correct: number;
  total: number;
};

export type CertificationResult = {
  passed: boolean;
  classifyPassed: boolean;
  understandPassed: boolean;
  classify: CertifiedSectionScore;
  understand: CertifiedSectionScore;
};

export function evaluateCertification(
  classifyCorrect: number,
  understandCorrect: number,
): CertificationResult {
  const total = POLITANGLE_PRODUCT_DECISIONS.literacy.servedQuestionsPerSection;
  const threshold = POLITANGLE_PRODUCT_DECISIONS.literacy.passingAnswersPerSection;
  for (const [label, score] of [['CLASSIFY', classifyCorrect], ['UNDERSTAND', understandCorrect]] as const) {
    if (!Number.isInteger(score) || score < 0 || score > total) throw new Error(`${label} score must be an integer from 0 to ${total}`);
  }
  const classifyPassed = classifyCorrect >= threshold;
  const understandPassed = understandCorrect >= threshold;
  return {
    passed: classifyPassed && understandPassed,
    classifyPassed,
    understandPassed,
    classify: { correct: classifyCorrect, total },
    understand: { correct: understandCorrect, total },
  };
}

export type AttemptWindowResult = {
  allowed: boolean;
  attemptsInWindow: number;
  remaining: number;
  nextEligibleAt?: string;
};

export function certifiedAttemptWindow(
  previousAttemptStarts: readonly string[],
  now = new Date(),
): AttemptWindowResult {
  const maximum = POLITANGLE_PRODUCT_DECISIONS.literacy.certifiedAttempts.maximum;
  const windowMs = POLITANGLE_PRODUCT_DECISIONS.literacy.certifiedAttempts.rollingWindowHours * 60 * 60 * 1000;
  const nowMs = now.getTime();
  if (!Number.isFinite(nowMs)) throw new Error('Invalid current time');

  const active = previousAttemptStarts
    .map((value) => new Date(value).getTime())
    .filter((value) => Number.isFinite(value) && value <= nowMs && value > nowMs - windowMs)
    .sort((a, b) => a - b);
  const allowed = active.length < maximum;
  return {
    allowed,
    attemptsInWindow: active.length,
    remaining: Math.max(0, maximum - active.length),
    ...(allowed ? {} : { nextEligibleAt: new Date(active[0] + windowMs).toISOString() }),
  };
}

export function certificateExpiryDate(issueDate: string) {
  const issued = new Date(issueDate);
  if (!Number.isFinite(issued.getTime())) throw new Error('Invalid certificate issue date');
  const expiry = new Date(issued);
  const originalDay = expiry.getUTCDate();
  expiry.setUTCDate(1);
  expiry.setUTCFullYear(expiry.getUTCFullYear() + POLITANGLE_PRODUCT_DECISIONS.literacy.certificateValidityYears);
  const finalMonthDay = new Date(Date.UTC(expiry.getUTCFullYear(), expiry.getUTCMonth() + 1, 0)).getUTCDate();
  expiry.setUTCDate(Math.min(originalDay, finalMonthDay));
  return expiry.toISOString();
}
