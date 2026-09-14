import type { LiteracyQuestionRecord } from './literacy-bank-schema';

export const LITERACY_EDITORIAL_REVIEW_VERSION = 'literacy-editorial-review-2026.09-1' as const;

export type EditorialReviewDisposition = 'ready_for_founder_review';

export type EditorialReviewEntry = {
  questionId: string;
  contentFingerprint: string;
  disposition: EditorialReviewDisposition;
  readerComprehension: 'pass' | 'concern';
  ambiguity: 'pass' | 'concern';
  ideologicalFraming: 'pass' | 'concern';
  distractors: 'pass' | 'concern';
  note: string;
};

const CONTENT_FINGERPRINTS: Readonly<Record<string, string>> = {
  C1: '2286982a', C2: '0001faaa', C3: '2d8043e1', C4: '1a1ab738', C5: 'd8f37262',
  C6: '15d61f1a', C7: 'cb6fac9d', C8: '61e15baf', C9: '6e307132', C10: '14b487ac',
  C11: 'eec1bba8', C12: '726bde88', C13: '5398a2c2', C14: 'd803111e', C15: '98688218',
  C16: 'a2d52279', C17: '5a2d07a1', C18: '5e32268a', C19: '646e419b', C20: '6bca87f3',
  C21: 'ae10f036', C22: '9d920197', C23: '160775f3', C24: '7de8091e', C25: 'ba8c4a2c',
  C26: '4f776656', C27: '8721768c', C28: '93f4ad19', C29: 'cc767389', C30: '2226b8a1',
  C31: 'a858fe3e', C32: '9ee317bd', C33: '4693003f', C34: '1b0d3eb6', C35: '43b7f1e6',
  C36: 'a4cde3ed', C37: '10e61f2c', C38: 'cc0e4312', C39: 'd411b0e5', C40: '74a2bc16',
  U1: 'b1bf255d', U2: '77c5f6e5', U3: '742a8d8c', U4: 'd1b39ed9', U5: 'b8ec92ce',
  U6: '890ffff5', U7: 'fc60e5f2', U8: '9d519c21', U9: '5bd335c2', U10: 'cef526ea',
  U11: '8a900e32', U12: '94ed9dfc', U13: '5f275fe1', U14: 'df6c428b', U15: '4c4e4c51',
  U16: 'f1ee61ed', U17: '770ca44e', U18: '3fa60fe4', U19: '6420eaa1', U20: 'bc60424a',
  U21: 'b1824ae8', U22: '8f632d4c', U23: '334c6707', U24: '17bb95b2', U25: '7dae0f7e',
  U26: '1b1e5122', U27: 'bc9b2acd', U28: '4be1fd81', U29: '58024e83', U30: 'e5565654',
  U31: 'a569cccb', U32: 'a518c80a', U33: 'a7ef5ed9', U34: '38f78c3d', U35: 'cf592d65',
  U36: '3abef426', U37: 'e985f13c', U38: 'a6dcf63b', U39: 'b3832390', U40: 'b236e865',
};

const REVISED_FOR_READER = new Set(['C5', 'C24', 'C34', 'C35', 'C36', 'C37', 'C38', 'U9', 'U14', 'U38']);
const CONCEPT_OVERLAP = new Set(['C1', 'C16', 'C14', 'C32', 'C17', 'C21', 'C24', 'C36', 'U3', 'U34', 'U7', 'U22']);

function fingerprint(question: LiteracyQuestionRecord) {
  const content = JSON.stringify({
    prompt: question.prompt,
    options: question.options,
    acceptedAnswerSets: question.acceptedAnswerSets,
    explanation: question.explanation,
    evidenceIds: question.evidenceIds,
  });
  let hash = 2166136261;
  for (let index = 0; index < content.length; index += 1) {
    hash ^= content.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

function reviewEntry(question: LiteracyQuestionRecord): EditorialReviewEntry {
  const notes: string[] = [];
  if (REVISED_FOR_READER.has(question.id)) notes.push('Reader wording revised in this pass.');
  if (CONCEPT_OVERLAP.has(question.id)) notes.push('Concept overlaps another bank item; selection must prevent repetitive serving.');
  if (question.id === 'C30') notes.push('Founder review must preserve the limits of the civic-versus-ancestry contrast.');
  if (question.id === 'U21') notes.push('Founder review should confirm the simplified description of the revolutionary party role.');
  if (question.id === 'C36') notes.push('Disputed market-property framing replaced with a separate political-authority test.');
  return {
    questionId: question.id,
    contentFingerprint: CONTENT_FINGERPRINTS[question.id],
    disposition: 'ready_for_founder_review',
    readerComprehension: 'pass',
    ambiguity: 'pass',
    ideologicalFraming: 'pass',
    distractors: 'pass',
    note: notes.join(' ') || 'No blocking issue found in the internal reader and editorial pass.',
  };
}

export function buildEditorialReviewLedger(questions: readonly LiteracyQuestionRecord[]) {
  return questions.map(reviewEntry);
}

export function validateEditorialReviewLedger(
  questions: readonly LiteracyQuestionRecord[],
  entries: readonly EditorialReviewEntry[],
) {
  const errors: string[] = [];
  const questionIds = new Set(questions.map((question) => question.id));
  const entryIds = entries.map((entry) => entry.questionId);
  if (new Set(entryIds).size !== entryIds.length) errors.push('Editorial review contains duplicate question ids');
  for (const question of questions) {
    const entry = entries.find((candidate) => candidate.questionId === question.id);
    if (!entry) {
      errors.push(`${question.id} has no editorial review`);
      continue;
    }
    if (!entry.contentFingerprint) errors.push(`${question.id} has no pinned content fingerprint`);
    if (entry.contentFingerprint !== fingerprint(question)) errors.push(`${question.id} changed after editorial review`);
    if (!entry.note.trim()) errors.push(`${question.id} has no editorial review note`);
  }
  for (const id of entryIds) if (!questionIds.has(id)) errors.push(`${id} review has no matching question`);
  return { valid: errors.length === 0, errors };
}

export function questionsReadyForFounderReview(
  questions: readonly LiteracyQuestionRecord[],
  entries: readonly EditorialReviewEntry[],
) {
  const ready = new Set(entries.filter((entry) => entry.disposition === 'ready_for_founder_review').map((entry) => entry.questionId));
  return questions.filter((question) => ready.has(question.id));
}
