import {
  BELIEF_V2_LOCKED_COUNT,
  BELIEF_V2_PER_MODE,
  beliefV2Items,
  polygonAxesV2,
  type AttitudeMode,
  type BeliefAnswersV2,
  type BeliefConstruct,
  type BeliefItem,
  type FamilyId,
  type FamilyLoading,
  type FamilyProfile,
  type PolygonPointV2,
} from './belief-v2';

function correctedItems(): readonly BeliefItem[] {
  return beliefV2Items.map((item) => {
    if (item.id === 'T10') {
      return {
        ...item,
        negative: 'Birth in a country should carry substantial independent weight in acquiring citizenship, even when neither parent is already a citizen.',
        positive: 'Citizenship at birth should depend mainly on a parent’s citizenship or qualifying legal status rather than on birthplace itself.',
      };
    }
    if (item.id === 'F10') {
      return {
        ...item,
        negative: 'It feels fairer for birth in the country to carry substantial weight in a child’s citizenship at birth, even when neither parent is already a citizen.',
        positive: 'It feels fairer for citizenship at birth to depend mainly on a parent’s citizenship or qualifying legal status rather than birthplace itself.',
      };
    }
    if (item.id === 'A10') {
      return {
        ...item,
        negative: 'If I voted directly on citizenship-at-birth rules, I would give birth in the country substantial independent weight even when neither parent is already a citizen.',
        positive: 'If I voted directly on citizenship-at-birth rules, I would make citizenship depend mainly on a parent’s citizenship or qualifying legal status rather than birthplace itself.',
      };
    }
    if (item.id === 'A11') {
      return {
        ...item,
        negative: 'When choosing between otherwise similar candidates, I would prefer one who openly recognizes competing legitimate interests and emphasizes political compromise.',
        positive: 'When choosing between otherwise similar candidates, I would prefer one who promises to take power back from a self-serving elite and implement the common will of ordinary people.',
      };
    }
    if (item.id === 'A14') {
      return {
        ...item,
        negative: 'For important social tasks, I would normally prefer direct responsibility at a higher level of government to guarantee consistent standards and access.',
        positive: 'When a family, community, voluntary association or local institution can handle a social task adequately, I would normally leave responsibility there rather than transfer it upward.',
      };
    }
    return item;
  });
}

export const lockedBeliefItemsV2 = correctedItems();

function loading(construct: BeliefConstruct, relevance: 1 | 2, direction: -1 | 1, evidenceIds: readonly string[]): FamilyLoading {
  return { construct, relevance, direction, evidenceIds };
}

/**
 * Deliberately sparse evidence-informed priors.
 * Omitted constructs have relevance 0 and must not move that family score.
 * The 1/2 values are validation priors, not final psychometric coefficients.
 */
export const canonicalFamilyProfilesV2: readonly FamilyProfile[] = [
  {
    id: 'liberalism',
    name: 'Liberalism',
    loadings: [
      loading('social-change', 1, -1, ['SEP-LIBERALISM', 'CHES-ECON-GALTAN']),
      loading('personal-autonomy', 2, -1, ['SEP-LIBERALISM']),
      loading('authority-order', 2, -1, ['SEP-LIBERALISM', 'VDEM-LIBERAL-DEMOCRACY']),
      loading('pluralism', 2, -1, ['SEP-LIBERALISM', 'VDEM-LIBERAL-DEMOCRACY']),
    ],
  },
  {
    id: 'conservatism',
    name: 'Conservatism',
    loadings: [
      loading('social-change', 2, 1, ['SEP-CONSERVATISM', 'CHES-ECON-GALTAN']),
      loading('personal-autonomy', 1, 1, ['SEP-CONSERVATISM', 'CHES-ECON-GALTAN']),
      loading('authority-order', 1, 1, ['SEP-CONSERVATISM', 'CHES-ECON-GALTAN']),
      loading('pluralism', 1, -1, ['SEP-CONSERVATISM', 'VDEM-LIBERAL-DEMOCRACY']),
    ],
  },
  {
    id: 'social-democracy',
    name: 'Social democracy',
    loadings: [
      loading('public-provision', 2, -1, ['ROUTLEDGE-SOCIAL-DEMOCRACY']),
      loading('redistribution', 2, -1, ['ROUTLEDGE-SOCIAL-DEMOCRACY']),
      loading('ownership', 1, 1, ['ROUTLEDGE-SOCIAL-DEMOCRACY', 'SEP-SOCIALISM']),
      loading('pluralism', 2, -1, ['VDEM-LIBERAL-DEMOCRACY', 'SEP-SOCIALISM']),
    ],
  },
  {
    id: 'socialism',
    name: 'Socialism',
    loadings: [
      loading('public-provision', 1, -1, ['SEP-SOCIALISM']),
      loading('redistribution', 1, -1, ['SEP-SOCIALISM']),
      loading('ownership', 2, -1, ['SEP-SOCIALISM']),
    ],
  },
  {
    id: 'green-politics',
    name: 'Green politics',
    loadings: [
      loading('redistribution', 1, -1, ['CAMBRIDGE-GREEN-POLITICS']),
      loading('authority-order', 1, -1, ['CAMBRIDGE-GREEN-POLITICS']),
      loading('pluralism', 1, -1, ['CAMBRIDGE-GREEN-POLITICS']),
      loading('world-sovereignty', 1, -1, ['CAMBRIDGE-GREEN-POLITICS']),
      loading('ecology-growth', 2, -1, ['CAMBRIDGE-GREEN-POLITICS']),
    ],
  },
] as const;

function isNumericAnswer(value: unknown): value is -2 | -1 | 0 | 1 | 2 {
  return typeof value === 'number' && Number.isInteger(value) && value >= -2 && value <= 2;
}

function answerPosition(value: -2 | -1 | 0 | 1 | 2) {
  return Math.round(((value + 2) / 4) * 100);
}

function familyAlignment(value: -2 | -1 | 0 | 1 | 2, direction: -1 | 1) {
  return answerPosition((value * direction) as -2 | -1 | 0 | 1 | 2);
}

const constructs = [...new Set(lockedBeliefItemsV2.map((item) => item.construct))] as BeliefConstruct[];

export type ConstructModeResultV2 = {
  construct: BeliefConstruct;
  think: number | null;
  feel: number | null;
  act: number | null;
  overall: number | null;
  tension: number | null;
};

export function calculateConstructModesV2(answers: BeliefAnswersV2): ConstructModeResultV2[] {
  return constructs.map((construct) => {
    const values = {} as Record<AttitudeMode, number | null>;
    for (const mode of ['think', 'feel', 'act'] as const) {
      const item = lockedBeliefItemsV2.find((candidate) => candidate.construct === construct && candidate.mode === mode)!;
      const value = answers[item.id];
      values[mode] = isNumericAnswer(value) ? answerPosition(value) : null;
    }
    const known = [values.think, values.feel, values.act].filter((value): value is number => value !== null);
    const overall = known.length ? Math.round(known.reduce((sum, value) => sum + value, 0) / known.length) : null;
    const tension = known.length === 3 ? Math.max(...known) - Math.min(...known) : null;
    return { construct, think: values.think, feel: values.feel, act: values.act, overall, tension };
  });
}

export type FamilyCompatibilityV2 = {
  id: FamilyId;
  name: string;
  overall: number | null;
  think: number | null;
  feel: number | null;
  act: number | null;
  coverage: number;
  modeTension: number | null;
};

function scoreFamilyMode(answers: BeliefAnswersV2, profile: FamilyProfile, mode: AttitudeMode | 'overall') {
  let weighted = 0;
  let knownWeight = 0;
  let totalWeight = 0;
  for (const familyLoading of profile.loadings) {
    const candidates = lockedBeliefItemsV2.filter((candidate) => candidate.construct === familyLoading.construct && (mode === 'overall' || candidate.mode === mode));
    for (const item of candidates) {
      totalWeight += familyLoading.relevance;
      const value = answers[item.id];
      if (!isNumericAnswer(value)) continue;
      knownWeight += familyLoading.relevance;
      weighted += familyAlignment(value, familyLoading.direction) * familyLoading.relevance;
    }
  }
  return {
    score: knownWeight ? Math.round(weighted / knownWeight) : null,
    coverage: totalWeight ? Math.round((knownWeight / totalWeight) * 100) : 0,
  };
}

export function assessFamiliesV2Canonical(answers: BeliefAnswersV2): FamilyCompatibilityV2[] {
  return canonicalFamilyProfilesV2.map((profile) => {
    const overall = scoreFamilyMode(answers, profile, 'overall');
    const think = scoreFamilyMode(answers, profile, 'think');
    const feel = scoreFamilyMode(answers, profile, 'feel');
    const act = scoreFamilyMode(answers, profile, 'act');
    const knownModes = [think.score, feel.score, act.score].filter((value): value is number => value !== null);
    return {
      id: profile.id,
      name: profile.name,
      overall: overall.coverage >= 50 ? overall.score : null,
      think: think.coverage >= 50 ? think.score : null,
      feel: feel.coverage >= 50 ? feel.score : null,
      act: act.coverage >= 50 ? act.score : null,
      coverage: overall.coverage,
      modeTension: knownModes.length === 3 ? Math.max(...knownModes) - Math.min(...knownModes) : null,
    };
  }).sort((a, b) => (b.overall ?? -1) - (a.overall ?? -1) || a.name.localeCompare(b.name));
}

export function calculatePolygonV2Canonical(answers: BeliefAnswersV2, mode: AttitudeMode | 'overall' = 'overall'): PolygonPointV2[] {
  const results = calculateConstructModesV2(answers);
  return polygonAxesV2.map((axis) => {
    const values: number[] = [];
    let expected = 0;
    for (const construct of axis.constructs) {
      const result = results.find((candidate) => candidate.construct === construct)!;
      if (mode === 'overall') {
        expected += 3;
        for (const value of [result.think, result.feel, result.act]) if (value !== null) values.push(value);
      } else {
        expected += 1;
        const value = result[mode];
        if (value !== null) values.push(value);
      }
    }
    return {
      ...axis,
      score: values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : null,
      coverage: expected ? Math.round((values.length / expected) * 100) : 0,
    };
  });
}

export function statementFamilyRelevanceV2(itemId: string) {
  const item = lockedBeliefItemsV2.find((candidate) => candidate.id === itemId);
  if (!item) return null;
  return {
    item,
    families: canonicalFamilyProfilesV2.map((profile) => {
      const match = profile.loadings.find((candidate) => candidate.construct === item.construct);
      return {
        familyId: profile.id,
        relevance: match?.relevance ?? 0,
        direction: match?.direction ?? 0,
        evidenceIds: match?.evidenceIds ?? [],
      };
    }),
  };
}

export type TendencyIdV2 = 'nationalism' | 'populism' | 'authority-democratic-constraints';
export type TendencyResultV2 = { id: TendencyIdV2; score: number | null; coverage: number };

function constructAverage(results: readonly ConstructModeResultV2[], constructsToUse: readonly BeliefConstruct[]) {
  const values = constructsToUse
    .map((construct) => results.find((candidate) => candidate.construct === construct)?.overall ?? null)
    .filter((value): value is number => value !== null);
  return {
    score: values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : null,
    coverage: Math.round((values.length / constructsToUse.length) * 100),
  };
}

export function assessTendenciesV2(answers: BeliefAnswersV2): TendencyResultV2[] {
  const results = calculateConstructModesV2(answers);
  const nationalism = constructAverage(results, ['nationhood-membership', 'world-sovereignty']);
  const populism = constructAverage(results, ['populism']);
  const authority = constructAverage(results, ['authority-order', 'pluralism']);
  return [
    { id: 'nationalism', ...nationalism },
    { id: 'populism', ...populism },
    { id: 'authority-democratic-constraints', ...authority },
  ];
}

export type ConservativeSubtypeIdV2 = 'traditional-secular-conservatism' | 'christian-democracy' | 'religious-conservatism';
export type ConservativeSubtypeResultV2 = {
  id: ConservativeSubtypeIdV2;
  name: string;
  explanation: string;
} | null;

export function assessConservativeSubtypeV2(answers: BeliefAnswersV2): ConservativeSubtypeResultV2 {
  const conservative = assessFamiliesV2Canonical(answers).find((family) => family.id === 'conservatism');
  if (!conservative || conservative.overall === null || conservative.overall < 60) return null;

  const results = calculateConstructModesV2(answers);
  const get = (construct: BeliefConstruct) => results.find((item) => item.construct === construct);
  const religion = get('religion-public-role');
  const subsidiarity = get('subsidiarity');
  const ownership = get('ownership');
  const redistribution = get('redistribution');
  const pluralism = get('pluralism');
  const completeTriplet = (result: ConstructModeResultV2 | undefined) => Boolean(result && result.think !== null && result.feel !== null && result.act !== null);

  if (!completeTriplet(religion) || !completeTriplet(subsidiarity)) return null;
  const religionScore = religion!.overall!;
  const subsidiarityScore = subsidiarity!.overall!;

  if (religionScore <= 40) {
    return {
      id: 'traditional-secular-conservatism',
      name: 'Traditional / secular conservatism',
      explanation: 'Conservative continuity is present without a strong preference for religiously inspired public policy.',
    };
  }

  if (religionScore >= 60) {
    const socialMarketKnown = completeTriplet(ownership) && completeTriplet(redistribution);
    const democraticKnown = completeTriplet(pluralism);
    const socialMarketCompatible = Boolean(socialMarketKnown && ownership!.overall! >= 40 && redistribution!.overall! <= 75);
    const democraticCompatible = Boolean(democraticKnown && pluralism!.overall! <= 60);
    if (subsidiarityScore >= 60 && socialMarketCompatible && democraticCompatible) {
      return {
        id: 'christian-democracy',
        name: 'Christian democracy',
        explanation: 'The profile combines conservative continuity with religious inspiration, subsidiarity, democratic constraints and a social-market-compatible economic pattern.',
      };
    }
    return {
      id: 'religious-conservatism',
      name: 'Religious-conservative orientation',
      explanation: 'Religious moral tradition is important, but the additional subsidiarity and social-market combination is not strong enough for the Christian-democratic subtype.',
    };
  }
  return null;
}

export function validateCanonicalBeliefV2() {
  const errors: string[] = [];
  if (lockedBeliefItemsV2.length !== BELIEF_V2_LOCKED_COUNT) errors.push(`Expected ${BELIEF_V2_LOCKED_COUNT} items; found ${lockedBeliefItemsV2.length}`);
  if (new Set(lockedBeliefItemsV2.map((item) => item.id)).size !== BELIEF_V2_LOCKED_COUNT) errors.push('Item IDs must be unique');
  if (lockedBeliefItemsV2.filter((item) => item.stage === 'quick').length !== 26) errors.push('Quick must contain 26 belief items');
  if (lockedBeliefItemsV2.filter((item) => item.stage === 'deep').length !== 16) errors.push('Deep must contain 16 belief items');
  for (const mode of ['think', 'feel', 'act'] as const) {
    if (lockedBeliefItemsV2.filter((item) => item.mode === mode).length !== BELIEF_V2_PER_MODE) errors.push(`${mode} must contain ${BELIEF_V2_PER_MODE} items`);
  }
  for (const construct of constructs) {
    const triplet = lockedBeliefItemsV2.filter((item) => item.construct === construct);
    if (triplet.length !== 3) errors.push(`${construct} must have three items`);
    for (const mode of ['think', 'feel', 'act'] as const) {
      if (triplet.filter((item) => item.mode === mode).length !== 1) errors.push(`${construct} must have one ${mode} item`);
    }
  }
  const nationhood = lockedBeliefItemsV2.filter((item) => item.construct === 'nationhood-membership');
  if (nationhood.some((item) => !`${item.negative} ${item.positive}`.toLowerCase().includes('citizenship'))) errors.push('Nationhood THINK / FEEL / ACT items must remain aligned on citizenship-at-birth');
  const populistAct = lockedBeliefItemsV2.find((item) => item.id === 'A11');
  if (!populistAct || /court|institution|media|opposition/.test(`${populistAct.negative} ${populistAct.positive}`.toLowerCase())) errors.push('Populism ACT item must not collapse into anti-pluralism');
  const subsidiarityAct = lockedBeliefItemsV2.find((item) => item.id === 'A14');
  if (!subsidiarityAct || !subsidiarityAct.negative.includes('higher level of government') || !subsidiarityAct.positive.includes('leave responsibility there')) errors.push('Subsidiarity ACT poles are not aligned with THINK/FEEL orientation');
  return { valid: errors.length === 0, errors };
}

export const canonicalBeliefV2Integrity = validateCanonicalBeliefV2();
if (!canonicalBeliefV2Integrity.valid) throw new Error(`Canonical BELIEVE v2 integrity failed: ${canonicalBeliefV2Integrity.errors.join('; ')}`);
