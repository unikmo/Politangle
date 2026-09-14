import {
  CERTIFIED_BLUEPRINT_VERSION,
  certifiedBlueprintFor,
  validateCertifiedMasterBank,
  validateLiteracyQuestionRecord,
  type LiteracyDifficulty,
  type LiteracyQuestionRecord,
} from './literacy-bank-schema';
import { POLITANGLE_PRODUCT_DECISIONS } from './product-decisions';

const DIFFICULTIES: readonly LiteracyDifficulty[] = ['introductory', 'intermediate', 'advanced'];

export type PreviousCertifiedAttempt = {
  shownQuestionIds: readonly string[];
  incorrectQuestionIds: readonly string[];
};

export type CertifiedQuestionPlan = {
  section: LiteracyQuestionRecord['section'];
  bankVersion: string;
  blueprintVersion: typeof CERTIFIED_BLUEPRINT_VERSION;
  seed: number;
  questionIds: readonly string[];
  topicCoverage: Readonly<Record<string, number>>;
  difficultyCoverage: Readonly<Record<LiteracyDifficulty, number>>;
};

export type CertifiedSelectionResult =
  | { ok: true; plan: CertifiedQuestionPlan }
  | {
      ok: false;
      reason: 'BANK_NOT_READY' | 'BLUEPRINT_INFEASIBLE_AFTER_EXCLUSIONS';
      errors: readonly string[];
    };

export type PracticeSelectionResult = CertifiedSelectionResult;

function hashSeed(input: string) {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}
function numericSeed(seed: number | string) {
  return typeof seed === 'number' ? seed >>> 0 : hashSeed(seed);
}

function deterministicRank(seed: number, salt: string, id: string) {
  return hashSeed(`${seed}:${salt}:${id}`);
}

function allocations(total: number, limits: readonly number[], remaining: readonly number[]) {
  const result: number[][] = [];
  for (let first = 0; first <= total; first += 1) {
    for (let second = 0; second <= total - first; second += 1) {
      const candidate = [first, second, total - first - second];
      if (candidate.every((count, index) => count <= limits[index] && count <= remaining[index])) result.push(candidate);
    }
  }
  return result;
}

type SelectionSolution = {
  selected: LiteracyQuestionRecord[];
  reused: number;
  repeatedConcepts: number;
  rankScore: number;
  signature: string;
};

function betterSolution(current: SelectionSolution | null, candidate: SelectionSolution) {
  if (!current) return candidate;
  if (candidate.reused !== current.reused) return candidate.reused < current.reused ? candidate : current;
  if (candidate.repeatedConcepts !== current.repeatedConcepts) {
    return candidate.repeatedConcepts < current.repeatedConcepts ? candidate : current;
  }
  if (candidate.rankScore !== current.rankScore) return candidate.rankScore < current.rankScore ? candidate : current;
  return candidate.signature < current.signature ? candidate : current;
}

function conceptKey(question: LiteracyQuestionRecord) {
  return `${question.blueprintBucket}:${question.secondaryTags[0] ?? question.id}`;
}

function repeatedConceptCount(questions: readonly LiteracyQuestionRecord[]) {
  const counts = new Map<string, number>();
  for (const question of questions) {
    const key = conceptKey(question);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.values()].reduce((total, count) => total + Math.max(0, count - 1), 0);
}

function combinations<T>(values: readonly T[], count: number): T[][] {
  if (count === 0) return [[]];
  if (count > values.length) return [];
  const result: T[][] = [];
  function visit(start: number, chosen: T[]) {
    if (chosen.length === count) {
      result.push(chosen);
      return;
    }
    for (let index = start; index <= values.length - (count - chosen.length); index += 1) {
      visit(index + 1, [...chosen, values[index]]);
    }
  }
  visit(0, []);
  return result;
}

function selectBalancedPlan(input: {
  candidates: readonly LiteracyQuestionRecord[];
  section: LiteracyQuestionRecord['section'];
  bankVersion: string;
  seed: number | string;
  previousAttempt?: PreviousCertifiedAttempt;
  orderSalt: string;
}): CertifiedSelectionResult {
  const seed = numericSeed(input.seed);
  const previousShown = new Set(input.previousAttempt?.shownQuestionIds ?? []);
  const excluded = new Set(input.previousAttempt?.incorrectQuestionIds ?? []);
  const candidates = input.candidates.filter((question) => !excluded.has(question.id));
  const blueprint = certifiedBlueprintFor(input.section);
  const topicEntries = Object.entries(blueprint.topicQuotas) as [string, number][];
  const difficultyTarget = DIFFICULTIES.map((difficulty) => blueprint.difficultyQuotas[difficulty]);

  const candidatesByTopic = new Map<string, Map<LiteracyDifficulty, LiteracyQuestionRecord[]>>();
  for (const [topic] of topicEntries) {
    const byDifficulty = new Map<LiteracyDifficulty, LiteracyQuestionRecord[]>();
    for (const difficulty of DIFFICULTIES) {
      byDifficulty.set(
        difficulty,
        candidates
          .filter((question) => question.blueprintBucket === topic && question.difficulty === difficulty)
          .sort((left, right) => {
            const reuseDelta = Number(previousShown.has(left.id)) - Number(previousShown.has(right.id));
            if (reuseDelta !== 0) return reuseDelta;
            return deterministicRank(seed, `${topic}:${difficulty}`, left.id) - deterministicRank(seed, `${topic}:${difficulty}`, right.id);
          }),
      );
    }
    candidatesByTopic.set(topic, byDifficulty);
  }

  const memo = new Map<string, SelectionSolution | null>();
  function solve(topicIndex: number, remaining: readonly number[]): SelectionSolution | null {
    if (topicIndex === topicEntries.length) {
      return remaining.every((count) => count === 0)
        ? { selected: [], reused: 0, repeatedConcepts: 0, rankScore: 0, signature: '' }
        : null;
    }
    const key = `${topicIndex}:${remaining.join(',')}`;
    if (memo.has(key)) return memo.get(key) ?? null;

    const [topic, required] = topicEntries[topicIndex];
    const groups = candidatesByTopic.get(topic)!;
    const limits = DIFFICULTIES.map((difficulty) => groups.get(difficulty)!.length);
    let best: SelectionSolution | null = null;

    for (const allocation of allocations(required, limits, remaining)) {
      const nextRemaining = remaining.map((count, index) => count - allocation[index]);
      const tail = solve(topicIndex + 1, nextRemaining);
      if (!tail) continue;
      const choices = DIFFICULTIES.map((difficulty, index) => combinations(groups.get(difficulty)!, allocation[index]));
      for (const introductory of choices[0]) {
        for (const intermediate of choices[1]) {
          for (const advanced of choices[2]) {
            const chosen = [...introductory, ...intermediate, ...advanced];
            const selected = [...chosen, ...tail.selected];
            const reused = chosen.filter((question) => previousShown.has(question.id)).length + tail.reused;
            const repeatedConcepts = repeatedConceptCount(chosen) + tail.repeatedConcepts;
            const rankScore = chosen.reduce(
              (total, question) => total + deterministicRank(seed, `selection:${topic}`, question.id),
              tail.rankScore,
            );
            const signature = selected.map((question) => question.id).join('|');
            best = betterSolution(best, { selected, reused, repeatedConcepts, rankScore, signature });
          }
        }
      }
    }
    memo.set(key, best);
    return best;
  }

  const solution = solve(0, difficultyTarget);
  if (!solution) {
    const errors = topicEntries
      .map(([topic, required]) => {
        const available = candidates.filter((question) => question.blueprintBucket === topic).length;
        return available < required ? `${input.section} bucket ${topic} requires ${required} after exclusions; found ${available}` : '';
      })
      .filter(Boolean);
    return {
      ok: false,
      reason: 'BLUEPRINT_INFEASIBLE_AFTER_EXCLUSIONS',
      errors: errors.length > 0 ? errors : ['Topic and difficulty quotas cannot be satisfied after exclusions'],
    };
  }

  const ordered = [...solution.selected].sort(
    (left, right) => deterministicRank(seed, input.orderSalt, left.id) - deterministicRank(seed, input.orderSalt, right.id),
  );
  const topicCoverage: Record<string, number> = {};
  const difficultyCoverage: Record<LiteracyDifficulty, number> = { introductory: 0, intermediate: 0, advanced: 0 };
  for (const question of ordered) {
    topicCoverage[question.blueprintBucket] = (topicCoverage[question.blueprintBucket] ?? 0) + 1;
    difficultyCoverage[question.difficulty] += 1;
  }

  return {
    ok: true,
    plan: {
      section: input.section,
      bankVersion: input.bankVersion,
      blueprintVersion: CERTIFIED_BLUEPRINT_VERSION,
      seed,
      questionIds: ordered.map((question) => question.id),
      topicCoverage,
      difficultyCoverage,
    },
  };
}

export function selectCertifiedQuestionPlan(input: {
  questions: readonly LiteracyQuestionRecord[];
  section: LiteracyQuestionRecord['section'];
  bankVersion: string;
  seed: number | string;
  previousAttempt?: PreviousCertifiedAttempt;
}): CertifiedSelectionResult {
  const bankValidation = validateCertifiedMasterBank(input.questions, input.section, input.bankVersion);
  if (!bankValidation.valid) return { ok: false, reason: 'BANK_NOT_READY', errors: bankValidation.errors };
  const candidates = input.questions.filter(
    (question) =>
      question.section === input.section &&
      question.bankVersion === input.bankVersion &&
      question.status === 'validated',
  );
  return selectBalancedPlan({ ...input, candidates, orderSalt: 'certified-plan-order' });
}

export function selectPracticeQuestionPlan(input: {
  questions: readonly LiteracyQuestionRecord[];
  section: LiteracyQuestionRecord['section'];
  bankVersion: string;
  seed: number | string;
}): PracticeSelectionResult {
  const candidates = input.questions.filter(
    (question) =>
      question.section === input.section &&
      question.bankVersion === input.bankVersion &&
      !['draft', 'retired'].includes(question.status),
  );
  const expected = POLITANGLE_PRODUCT_DECISIONS.literacy.masterBankSizePerSection;
  const errors = candidates.length === expected
    ? candidates.flatMap((question) => validateLiteracyQuestionRecord(question).errors)
    : [`${input.section} practice requires exactly ${expected} eligible questions; found ${candidates.length}`];
  if (errors.length > 0) return { ok: false, reason: 'BANK_NOT_READY', errors };
  return selectBalancedPlan({ ...input, candidates, orderSalt: 'practice-plan-order' });
}
