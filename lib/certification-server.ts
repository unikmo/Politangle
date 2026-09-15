import { randomBytes } from 'node:crypto';
import { classifyMasterBankCandidates, literacyMasterBankCandidates, understandMasterBankCandidates } from './literacy-master-bank';
import { LITERACY_MASTER_BANK_VERSION, validateCertifiedMasterBank, type LiteracyQuestionRecord } from './literacy-bank-schema';
import { certifiedAttemptWindow, evaluateCertification } from './literacy-certification';
import { selectCertifiedQuestionPlan, type PreviousCertifiedAttempt } from './literacy-certified-selector';

export const CERTIFICATION_ATTEMPT_DURATION_MS = 90 * 60 * 1000;

export function certificationReadiness() {
  const classify = validateCertifiedMasterBank(classifyMasterBankCandidates, 'classify', LITERACY_MASTER_BANK_VERSION);
  const understand = validateCertifiedMasterBank(understandMasterBankCandidates, 'understand', LITERACY_MASTER_BANK_VERSION);
  return {
    enabled: process.env.CERTIFICATION_ENABLED === 'true',
    bankVersion: LITERACY_MASTER_BANK_VERSION,
    bankReady: classify.valid && understand.valid,
    blockers: [...classify.errors, ...understand.errors],
  };
}

export function createCertifiedPlans(seed: string, previous?: PreviousCertifiedAttempt) {
  const classify = selectCertifiedQuestionPlan({ questions: classifyMasterBankCandidates, section: 'classify', bankVersion: LITERACY_MASTER_BANK_VERSION, seed: `${seed}:classify`, previousAttempt: previous });
  const understand = selectCertifiedQuestionPlan({ questions: understandMasterBankCandidates, section: 'understand', bankVersion: LITERACY_MASTER_BANK_VERSION, seed: `${seed}:understand`, previousAttempt: previous });
  return { classify, understand };
}

export function newAttemptId() {
  return `att_${randomBytes(24).toString('base64url')}`;
}

export function publicCertifiedQuestion(question: LiteracyQuestionRecord) {
  return {
    id: question.id,
    section: question.section,
    prompt: question.prompt,
    options: question.options.map(({ id, label }) => ({ id, label })),
  };
}

function sameAnswer(actual: readonly string[], expected: readonly string[]) {
  const left = [...actual].sort();
  const right = [...expected].sort();
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

export function scoreCertifiedAnswers(questionIds: readonly string[], answers: Readonly<Record<string, readonly string[]>>) {
  const bank = new Map(literacyMasterBankCandidates.map((question) => [question.id, question]));
  const questions = questionIds.map((id) => bank.get(id)).filter((question): question is LiteracyQuestionRecord => Boolean(question));
  if (questions.length !== questionIds.length || new Set(questionIds).size !== questionIds.length) throw new Error('Attempt question set is invalid.');
  const reviews = questions.map((question) => {
    const answer = answers[question.id] ?? [];
    const allowed = new Set(question.options.map((option) => option.id));
    if (answer.length === 0 || answer.some((id) => !allowed.has(id))) throw new Error(`Answer for ${question.id} is missing or invalid.`);
    const correct = question.acceptedAnswerSets.some((expected) => sameAnswer(answer, expected));
    return {
      id: question.id,
      section: question.section,
      correct,
      ...(correct ? {} : {
        selectedOptionIds: answer,
        correctOptionIds: question.acceptedAnswerSets[0],
        explanation: question.explanation,
      }),
    };
  });
  const classifyCorrect = reviews.filter((item) => item.section === 'classify' && item.correct).length;
  const understandCorrect = reviews.filter((item) => item.section === 'understand' && item.correct).length;
  return { result: evaluateCertification(classifyCorrect, understandCorrect), reviews };
}

export function attemptAvailability(starts: readonly string[], now = new Date()) {
  return certifiedAttemptWindow(starts, now);
}
