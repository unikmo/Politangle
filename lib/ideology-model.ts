import type { DeepBeliefAxis, DeepBeliefResult } from './deep-engine';
import type { Dimension } from './questions';
import type { QuickResult } from './engine';

export type AxisId = Dimension | DeepBeliefAxis;
export type SignalBucket = 'strong-negative' | 'negative' | 'mixed' | 'positive' | 'strong-positive';
export type CriterionImportance = 'core' | 'typical';
export type TraditionKind = 'democratic-tradition' | 'cross-cutting' | 'historical-family' | 'anti-pluralist-pattern';
export type CompatibilityStatus = 'consistent' | 'possible' | 'tension' | 'insufficient';
export type ExplicitSignal = 'communist-end-state' | 'ultranationalist-state-project';

export type TraditionCriterion = {
  axis: AxisId;
  importance: CriterionImportance;
  supportBuckets: readonly SignalBucket[];
  contradictionBuckets: readonly SignalBucket[];
  rationale: string;
  evidenceIds: readonly string[];
};

export type TraditionProfile = {
  id: string;
  name: string;
  kind: TraditionKind;
  summary: string;
  criteria: readonly TraditionCriterion[];
  evidenceIds: readonly string[];
  requiredExplicitSignals?: readonly ExplicitSignal[];
  caution?: string;
};

export type AxisSignal = {
  axis: AxisId;
  score: number | null;
  interpretable: boolean;
  bucket: SignalBucket | null;
};

export type CriterionAssessment = {
  axis: AxisId;
  importance: CriterionImportance;
  state: 'support' | 'tension' | 'neutral' | 'unknown';
  bucket: SignalBucket | null;
  rationale: string;
  evidenceIds: readonly string[];
};

export type TraditionAssessment = {
  profileId: string;
  name: string;
  kind: TraditionKind;
  status: CompatibilityStatus;
  supports: CriterionAssessment[];
  tensions: CriterionAssessment[];
  neutral: CriterionAssessment[];
  unknown: CriterionAssessment[];
  coreTensions: CriterionAssessment[];
  missingExplicitSignals: ExplicitSignal[];
  explanation: string;
};

export type CompatibilityInput = {
  quick?: QuickResult | null;
  deep?: DeepBeliefResult | null;
  explicitSignals?: readonly ExplicitSignal[];
};

export function bucketScore(score: number | null): SignalBucket | null {
  if (score === null) return null;
  if (score <= 20) return 'strong-negative';
  if (score < 40) return 'negative';
  if (score <= 60) return 'mixed';
  if (score < 80) return 'positive';
  return 'strong-positive';
}

export function collectAxisSignals(input: CompatibilityInput): Partial<Record<AxisId, AxisSignal>> {
  const signals: Partial<Record<AxisId, AxisSignal>> = {};

  if (input.quick) {
    for (const axis of ['economy', 'society', 'power', 'world'] as const) {
      const result = input.quick.scores[axis];
      signals[axis] = {
        axis,
        score: result.score,
        interpretable: result.interpretable,
        bucket: result.interpretable ? bucketScore(result.score) : null,
      };
    }
  }

  if (input.deep) {
    for (const [axis, result] of Object.entries(input.deep.axes) as [DeepBeliefAxis, DeepBeliefResult['axes'][DeepBeliefAxis]][]) {
      signals[axis] = {
        axis,
        score: result.score,
        interpretable: result.interpretable,
        bucket: result.interpretable ? bucketScore(result.score) : null,
      };
    }
  }

  return signals;
}

const N = ['strong-negative', 'negative'] as const;
const NM = ['strong-negative', 'negative', 'mixed'] as const;
const MP = ['mixed', 'positive', 'strong-positive'] as const;
const P = ['positive', 'strong-positive'] as const;
const SN = ['strong-negative'] as const;

/**
 * Context/pattern registry only.
 *
 * The main user-facing political-family model lives in `primary-families.ts`
 * and deliberately contains only Liberalism, Conservatism, Social democracy,
 * Socialism and Green politics. Narrow variants are not separately scored here
 * merely because they exist in political theory. This registry is limited to
 * cross-cutting tendencies and historically important safeguarded patterns that
 * require separate interpretation.
 */
export const traditionProfiles: readonly TraditionProfile[] = [
  {
    id: 'nationalism', name: 'Nationalism', kind: 'cross-cutting',
    summary: 'A cross-cutting family that gives special political value to the nation and national self-determination; it does not by itself determine left-right economics or social policy.',
    evidenceIds: ['SEP-NATIONALISM'],
    criteria: [
      { axis: 'nationhood', importance: 'core', supportBuckets: P, contradictionBuckets: N, rationale: 'Giving special political priority to national self-determination is the defining signal.', evidenceIds: ['SEP-NATIONALISM'] },
      { axis: 'world', importance: 'typical', supportBuckets: MP, contradictionBuckets: SN, rationale: 'Preference for national sovereignty is often compatible, but nationalism can vary in how much international cooperation it accepts.', evidenceIds: ['SEP-NATIONALISM'] },
    ],
    caution: 'Do not infer nativism, fascism or a right-wing economic position from nationalism alone.',
  },
  {
    id: 'populism', name: 'Populism', kind: 'cross-cutting',
    summary: 'A thin-centered people-versus-elite orientation that can attach to different left- or right-wing host ideologies.',
    evidenceIds: ['MUDDE-POPULISM'],
    criteria: [
      { axis: 'populism', importance: 'core', supportBuckets: P, contradictionBuckets: N, rationale: 'People-versus-elite moral dualism and a singular general will are the defining signals.', evidenceIds: ['MUDDE-POPULISM'] },
    ],
    caution: 'Populism should not be treated as a complete economic or social ideology by itself.',
  },
  {
    id: 'communism', name: 'Communism', kind: 'historical-family',
    summary: 'A historically important political family whose Marxian ideal is classless and stateless and rejects private ownership of the means of production.',
    evidenceIds: ['OXFORD-COMMUNISM', 'SEP-SOCIALISM'],
    requiredExplicitSignals: ['communist-end-state'],
    criteria: [
      { axis: 'economy', importance: 'core', supportBuckets: N, contradictionBuckets: P, rationale: 'A strongly collective economic orientation is necessary but not sufficient.', evidenceIds: ['OXFORD-COMMUNISM', 'SEP-SOCIALISM'] },
      { axis: 'ownership', importance: 'core', supportBuckets: ['strong-negative'], contradictionBuckets: MP, rationale: 'Rejection of private ownership of the major means of production is a central discriminator.', evidenceIds: ['OXFORD-COMMUNISM'] },
    ],
    caution: 'This is retained for historical and literacy context. Politangle does not infer communism from welfare-state, redistribution or ordinary social-ownership preferences alone.',
  },
  {
    id: 'populist-radical-right-pattern', name: 'Populist radical-right pattern', kind: 'anti-pluralist-pattern',
    summary: 'A pattern defined in comparative scholarship by the combination of nativism, authoritarianism and populism, with tension toward liberal-democratic pluralism.',
    evidenceIds: ['MUDDE-RADICAL-RIGHT', 'PIRRO-FAR-RIGHT'],
    criteria: [
      { axis: 'nativism', importance: 'core', supportBuckets: P, contradictionBuckets: N, rationale: 'Nativism is a defining feature of the populist radical right.', evidenceIds: ['MUDDE-RADICAL-RIGHT'] },
      { axis: 'power', importance: 'core', supportBuckets: P, contradictionBuckets: N, rationale: 'Authoritarian order preferences are a defining feature.', evidenceIds: ['MUDDE-RADICAL-RIGHT'] },
      { axis: 'populism', importance: 'core', supportBuckets: P, contradictionBuckets: N, rationale: 'Populism is the third defining component.', evidenceIds: ['MUDDE-RADICAL-RIGHT', 'MUDDE-POPULISM'] },
      { axis: 'pluralism', importance: 'typical', supportBuckets: MP, contradictionBuckets: SN, rationale: 'The pattern commonly stands in tension with liberal-democratic pluralism, even while procedural elections may be accepted.', evidenceIds: ['MUDDE-RADICAL-RIGHT'] },
      { axis: 'world', importance: 'typical', supportBuckets: MP, contradictionBuckets: SN, rationale: 'National-sovereignty preferences are often compatible but are not by themselves diagnostic.', evidenceIds: ['SEP-NATIONALISM', 'MUDDE-RADICAL-RIGHT'] },
    ],
    caution: 'This is a safeguarded pattern-level signal, not a headline ideology assignment or a claim that a respondent belongs to a party or extremist movement.',
  },
  {
    id: 'fascist-extreme-right-pattern', name: 'Fascist / extreme-right pattern', kind: 'anti-pluralist-pattern',
    summary: 'A safeguarded historical/pattern concept requiring explicit anti-democratic rejection plus ultranationalist evidence; ordinary conservatism, sovereignty preference or nationalism cannot trigger it.',
    evidenceIds: ['USHMM-FASCISM', 'PIRRO-FAR-RIGHT'],
    requiredExplicitSignals: ['ultranationalist-state-project'],
    criteria: [
      { axis: 'democracyRejection', importance: 'core', supportBuckets: ['strong-positive'], contradictionBuckets: NM, rationale: 'Explicit anti-democracy is the key discriminator between extreme and radical right in the cited literature.', evidenceIds: ['PIRRO-FAR-RIGHT', 'USHMM-FASCISM'] },
      { axis: 'pluralism', importance: 'core', supportBuckets: ['strong-positive'], contradictionBuckets: N, rationale: 'Rejection of pluralism is central to fascism.', evidenceIds: ['USHMM-FASCISM'] },
      { axis: 'nativism', importance: 'core', supportBuckets: ['strong-positive'], contradictionBuckets: N, rationale: 'A strong exclusionary national-membership signal is relevant but still not sufficient without ultranationalist evidence.', evidenceIds: ['USHMM-FASCISM', 'MUDDE-RADICAL-RIGHT'] },
      { axis: 'power', importance: 'core', supportBuckets: ['strong-positive'], contradictionBuckets: N, rationale: 'Authoritarian state power is a defining component.', evidenceIds: ['USHMM-FASCISM'] },
    ],
    caution: 'This pattern is intentionally non-inferable without a dedicated ultranationalist signal; it must never be produced from ordinary right, conservative or nationalist answers alone.',
  },
] as const;

function assessCriterion(criterion: TraditionCriterion, signals: Partial<Record<AxisId, AxisSignal>>): CriterionAssessment {
  const signal = signals[criterion.axis];
  if (!signal || !signal.interpretable || !signal.bucket) {
    return { axis: criterion.axis, importance: criterion.importance, state: 'unknown', bucket: null, rationale: criterion.rationale, evidenceIds: criterion.evidenceIds };
  }
  if (criterion.supportBuckets.includes(signal.bucket)) {
    return { axis: criterion.axis, importance: criterion.importance, state: 'support', bucket: signal.bucket, rationale: criterion.rationale, evidenceIds: criterion.evidenceIds };
  }
  if (criterion.contradictionBuckets.includes(signal.bucket)) {
    return { axis: criterion.axis, importance: criterion.importance, state: 'tension', bucket: signal.bucket, rationale: criterion.rationale, evidenceIds: criterion.evidenceIds };
  }
  return { axis: criterion.axis, importance: criterion.importance, state: 'neutral', bucket: signal.bucket, rationale: criterion.rationale, evidenceIds: criterion.evidenceIds };
}

export function assessTradition(profile: TraditionProfile, input: CompatibilityInput): TraditionAssessment {
  const signals = collectAxisSignals(input);
  const criteria = profile.criteria.map((criterion) => assessCriterion(criterion, signals));
  const supports = criteria.filter((criterion) => criterion.state === 'support');
  const tensions = criteria.filter((criterion) => criterion.state === 'tension');
  const neutral = criteria.filter((criterion) => criterion.state === 'neutral');
  const unknown = criteria.filter((criterion) => criterion.state === 'unknown');
  const core = criteria.filter((criterion) => criterion.importance === 'core');
  const coreTensions = core.filter((criterion) => criterion.state === 'tension');
  const unknownCore = core.filter((criterion) => criterion.state === 'unknown');
  const coreSupports = core.filter((criterion) => criterion.state === 'support');
  const explicit = new Set(input.explicitSignals ?? []);
  const missingExplicitSignals = (profile.requiredExplicitSignals ?? []).filter((signal) => !explicit.has(signal));

  let status: CompatibilityStatus;
  let explanation: string;

  if (missingExplicitSignals.length > 0) {
    status = 'insufficient';
    explanation = 'Politangle intentionally withholds this compatibility because required dedicated evidence is not present.';
  } else if (unknownCore.length > 0) {
    status = 'insufficient';
    explanation = 'One or more core dimensions do not yet have enough interpretable responses.';
  } else if (coreTensions.length > 0) {
    status = 'tension';
    explanation = 'At least one core feature of this tradition conflicts with the current interpretable answers.';
  } else if (core.length > 0 && coreSupports.length === core.length) {
    status = 'consistent';
    explanation = 'All modeled core features are consistent with the current interpretable answers; typical features may still vary.';
  } else {
    status = 'possible';
    explanation = 'The current answers do not contradict a modeled core feature, but they are not sufficient to support all core features.';
  }

  return {
    profileId: profile.id,
    name: profile.name,
    kind: profile.kind,
    status,
    supports,
    tensions,
    neutral,
    unknown,
    coreTensions,
    missingExplicitSignals,
    explanation,
  };
}

export function assessAllTraditions(input: CompatibilityInput) {
  return traditionProfiles.map((profile) => assessTradition(profile, input));
}
