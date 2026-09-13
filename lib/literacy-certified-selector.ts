import {
  CERTIFIED_BLUEPRINT_VERSION,
  certifiedBlueprintFor,
  validateCertifiedMasterBank,
  type LiteracyDifficulty,
  type LiteracyQuestionRecord,
} from './literacy-bank-schema';

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
  signature: string;
};

function betterSolution(current: SelectionSolution | null, candidate: SelectionSolution) {
  if (!current) return candidate;
  if (candidate.reused !== current.reused) return candidate.reused < current.reused ? candidate : current;
  return candidate.signature < current.signature ? candidate : current;
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

  const seed = numericSeed(input.seed);
  const previousShown = new Set(input.previousAttempt?.shownQuestionIds ?? []);
  const excluded = new Set(input.previousAttempt?.incorrectQuestionIds ?? []);
  const candidates = input.questions.filter(
    (question) =>
      question.section === input.section &&
      question.bankVersion === input.bankVersion &&
      question.status === 'validated' &&
      !excluded.has(question.id),
  );
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
      return remaining.every((count) => count === 0) ? { selected: [], reused: 0, signature: '' } : null;
    }
    const key = `${topicIndex}:${remaining.join(',')}`;
    if (memo.has(key)) return memo.get(key) ?? null;

    const [topic, required] = topicEntries[topicIndex];
    const groups = candidatesByTopic.get(topic)!;
    const limits = DIFFICULTIES.map((difficulty) => groups.get(difficulty)!.length);
    let best: SelectionSolution | null = null;

    for (const allocation of allocations(required, limits, remaining)) {
      const chosen = DIFFICULTIES.flatMap((difficulty, index) => groups.get(difficulty)!.slice(0, allocation[index]));
      const nextRemaining = remaining.map((count, index) => count - allocation[index]);
      const tail = solve(topicIndex + 1, nextRemaining);
      if (!tail) continue;
      const selected = [...chosen, ...tail.selected];
      const reused = chosen.filter((question) => previousShown.has(question.id)).length + tail.reused;
      const signature = selected.map((question) => question.id).join('|');
      best = betterSolution(best, { selected, reused, signature });
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
    (left, right) => deterministicRank(seed, 'certified-plan-order', left.id) - deterministicRank(seed, 'certified-plan-order', right.id),
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
