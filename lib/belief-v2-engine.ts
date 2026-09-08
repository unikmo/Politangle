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

type CanonicalModePairs = Record<AttitudeMode, readonly [string, string]>;

/**
 * Phase-1 academically and methodologically reviewed source wording.
 *
 * These pairs are deliberately written as balanced alternatives rather than
 * agree/disagree statements. THINK, FEEL and ACT stay on the same attitude
 * object within each construct. ACT is a stated choice/intention, not observed
 * real-world behaviour.
 */
const phase1ValidatedPairs: Record<BeliefConstruct, CanonicalModePairs> = {
  'public-provision': {
    think: [
      'Government should take broad responsibility for ensuring that everyone can obtain essential services.',
      'Government should keep a more limited role, with people relying more on private arrangements for essential services.',
    ],
    feel: [
      'I worry more about people missing essential services when access depends heavily on private arrangements.',
      'I worry more about dependence and weak choice when government takes broad responsibility for essential services.',
    ],
    act: [
      'If I voted on essential services, I would favor broader public responsibility for ensuring access.',
      'If I voted on essential services, I would favor a more limited government role and greater reliance on private arrangements.',
    ],
  },
  redistribution: {
    think: [
      'Government should reduce large income differences through taxes and transfers, even if this means higher taxes for some people.',
      'Government should interfere less with income differences produced by the economy, even if large gaps remain.',
    ],
    feel: [
      'Large income gaps trouble me more than the higher tax burden used to reduce those gaps.',
      'Higher tax burdens trouble me more than large income gaps produced by the economy.',
    ],
    act: [
      'I would support higher taxes and transfers that reduced large income gaps, even if my own taxes rose moderately.',
      'I would prefer lower taxes even if large income gaps remained.',
    ],
  },
  ownership: {
    think: [
      'A larger share of large businesses should be owned by workers, cooperatives or public bodies rather than mainly by private shareholders.',
      'Large businesses should normally remain mainly privately owned, even when government regulates them and protects workers.',
    ],
    feel: [
      'It feels fairer when workers, cooperatives or the public own a larger share of large businesses.',
      'It feels fairer when private investors retain most ownership of large businesses, subject to law and worker protections.',
    ],
    act: [
      'I would support policies that shift a substantial share of large-company ownership to workers, cooperatives or public funds.',
      'I would prefer large-company ownership to remain primarily with private shareholders.',
    ],
  },
  'social-change': {
    think: [
      'When a new social norm gains substantial support but remains contested, public institutions should adapt relatively early.',
      'When a new social norm remains contested, public institutions should wait for broad and durable acceptance before changing long-standing rules.',
    ],
    feel: [
      'I feel more uneasy when public institutions lag behind a social change that has gained substantial support.',
      'I feel more uneasy when public institutions change long-standing rules before a new social norm is broadly accepted.',
    ],
    act: [
      'If a new social norm had substantial but not yet overwhelming support, I would generally favor updating an old rule sooner.',
      'I would generally keep the old rule until the new norm had broad and durable acceptance.',
    ],
  },
  'personal-autonomy': {
    think: [
      'Law should generally leave private, consensual adult behavior alone when it does not directly harm others.',
      'Law may legitimately restrict some private, consensual adult behavior to uphold shared moral standards, even without direct harm to others.',
    ],
    feel: [
      'I feel more uneasy when government restricts private, consensual adult behavior that does not directly harm others.',
      'I feel more uneasy when law gives no weight to shared moral standards in regulating private adult behavior.',
    ],
    act: [
      'If I strongly disapproved of private adult behavior that caused no direct harm, I would still oppose legal restrictions.',
      'If I thought that behavior seriously undermined shared moral standards, I could support legal restrictions even without direct harm.',
    ],
  },
  abortion: {
    think: [
      'Abortion should generally remain legally available because the pregnant person should have primary decision-making authority.',
      'Abortion should generally face stronger legal limits because the state should give greater protection to prenatal life.',
    ],
    feel: [
      'In abortion policy, I feel greater concern about restricting the pregnant person’s autonomy.',
      'In abortion policy, I feel greater concern about failing to protect prenatal life.',
    ],
    act: [
      'If I voted directly on abortion law, I would vote toward broader legal access and decision-making autonomy.',
      'If I voted directly on abortion law, I would vote toward stronger legal limits intended to protect prenatal life.',
    ],
  },
  'authority-order': {
    think: [
      'Government should restrict liberty only when it can show a concrete and serious risk of harm.',
      'Government may restrict some liberties preventively when there is a credible risk of serious disorder.',
    ],
    feel: [
      'During unrest or crisis, I worry more about government overreach and unnecessary limits on liberty.',
      'During unrest or crisis, I worry more about authorities lacking enough power to restore safety and order.',
    ],
    act: [
      'During serious disorder, I would keep strong legal safeguards even if the response were slower or less forceful.',
      'During serious disorder, I would allow broader temporary powers even if some legal safeguards were reduced.',
    ],
  },
  pluralism: {
    think: [
      'Winning an election should not free a government from independent checks such as courts and legal safeguards.',
      'An elected government should have wide latitude to carry out its program even when independent institutions try to block it.',
    ],
    feel: [
      'I am more alarmed when an elected majority weakens independent checks on government power.',
      'I am more alarmed when independent institutions repeatedly block an elected government from carrying out its program.',
    ],
    act: [
      'If a government I strongly supported clashed with independent checks, I would still defend those checks even when they slowed its program.',
      'If those checks repeatedly blocked the elected program, I could support reducing some of their power.',
    ],
  },
  'world-sovereignty': {
    think: [
      'Countries should accept binding international rules when joint action is needed to solve cross-border problems.',
      'Countries should keep the final national say even when this makes joint action on cross-border problems less effective.',
    ],
    feel: [
      'I feel more uneasy when shared problems go unsolved because countries refuse binding international commitments.',
      'I feel more uneasy when international commitments limit my country’s final say.',
    ],
    act: [
      'I would support a binding international agreement when it was necessary for a shared problem, even if it limited some national decision-making.',
      'I would prefer to keep national decision-making even if that made the international response less effective.',
    ],
  },
  'nationhood-membership': {
    think: [
      'A naturalized citizen can be just as fully part of the nation as someone who has been a citizen from birth.',
      'Being a citizen from birth should carry additional weight in deciding who is fully part of the nation.',
    ],
    feel: [
      'A naturalized citizen who embraces the country’s civic life feels just as fully part of the nation to me as a citizen from birth.',
      'A citizen from birth feels more fully part of the nation to me than a naturalized citizen.',
    ],
    act: [
      'If two otherwise similar candidates were citizens, I would not prefer one simply because they had been a citizen from birth.',
      'If two otherwise similar candidates were citizens, I would prefer the citizen from birth over a naturalized citizen.',
    ],
  },
  populism: {
    think: [
      'Most political disagreements reflect genuine conflicts among groups and values, not mainly a struggle between ordinary people and a self-serving elite.',
      'Politics is often a conflict between ordinary people and a self-serving elite that ignores the people’s common interests.',
    ],
    feel: [
      'When politics disappoints, I am more likely to blame difficult trade-offs among competing interests.',
      'When politics disappoints, I am more likely to blame a self-serving elite that ignores ordinary people.',
    ],
    act: [
      'When choosing between otherwise similar candidates, I would prefer one who says political problems cannot usually be reduced to people versus elite.',
      'I would prefer one who promises to take power back from a self-serving elite and carry out the common will of ordinary people.',
    ],
  },
  'ecology-growth': {
    think: [
      'When environmental protection and economic growth clearly conflict, ecological limits should sometimes take priority even if growth is slower.',
      'When they conflict, economic growth should generally take priority, with environmental harm addressed without deliberately limiting growth.',
    ],
    feel: [
      'In a real trade-off, I worry more about ecological damage from prioritizing growth.',
      'In a real trade-off, I worry more about jobs and living standards from prioritizing environmental limits.',
    ],
    act: [
      'I would support binding environmental limits even if they moderately slowed economic growth.',
      'I would oppose limits that deliberately slow growth and prefer environmental policies designed to preserve growth.',
    ],
  },
  'religion-public-role': {
    think: [
      'Religious moral principles should not count as legitimate public reasons for laws that apply to people who do not share the religion.',
      'Religious moral principles can legitimately count as public reasons for laws even when some citizens do not share the religion.',
    ],
    feel: [
      'I feel more uneasy when religious moral principles are used to justify laws for people who do not share that faith.',
      'I feel more uneasy when religious moral principles are treated as illegitimate in public debate simply because they are religious.',
    ],
    act: [
      'I would prefer public officials not to cite religious moral principles as reasons for laws that apply to everyone.',
      'I would accept public officials citing religious moral principles as legitimate reasons for laws that apply to everyone.',
    ],
  },
  subsidiarity: {
    think: [
      'Important social tasks should usually be handled by higher-level government when that is the best way to guarantee equal standards and access.',
      'Important social tasks should stay at the lowest capable level, with higher government stepping in only when needed.',
    ],
    feel: [
      'I feel more comfortable when higher-level government takes responsibility for important social tasks to guarantee consistent standards.',
      'I feel more comfortable when capable families, communities or local institutions keep responsibility instead of passing it upward.',
    ],
    act: [
      'If both approaches could work, I would usually choose higher-level government responsibility to guarantee consistent standards.',
      'If both approaches could work, I would usually keep responsibility with the lowest capable family, community or local institution.',
    ],
  },
};

function correctedItems(): readonly BeliefItem[] {
  return beliefV2Items.map((item) => {
    const pair = phase1ValidatedPairs[item.construct][item.mode];
    return {
      ...item,
      negative: pair[0],
      positive: pair[1],
      evidenceIds: item.construct === 'nationhood-membership'
        ? ['SEP-NATIONALISM']
        : item.evidenceIds,
    };
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
      loading('ownership', 1, 1, ['SEP-LIBERALISM', 'CHES-ECON-GALTAN']),
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
      loading('ownership', 1, 1, ['SEP-CONSERVATISM', 'CAMBRIDGE-CHRISTIAN-DEMOCRACY', 'CHES-ECON-GALTAN']),
      loading('authority-order', 1, 1, ['SEP-CONSERVATISM', 'CHES-ECON-GALTAN']),
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
      loading('subsidiarity', 1, 1, ['CAMBRIDGE-GREEN-POLITICS']),
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

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
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
  for (const item of lockedBeliefItemsV2) {
    if (wordCount(item.negative) > 26 || wordCount(item.positive) > 26) errors.push(`${item.id} exceeds the 26-word source-language burden guardrail`);
  }
  const provision = lockedBeliefItemsV2.filter((item) => item.construct === 'public-provision');
  if (provision.some((item) => /ownership|shareholder|worker-owned/i.test(`${item.negative} ${item.positive}`))) errors.push('Public-provision triplet must not collapse into ownership');
  const redistributionAct = lockedBeliefItemsV2.find((item) => item.id === 'A02');
  if (!redistributionAct || /public service/i.test(`${redistributionAct.negative} ${redistributionAct.positive}`)) errors.push('Redistribution ACT item must not double-barrel redistribution with public services');
  const nationhood = lockedBeliefItemsV2.filter((item) => item.construct === 'nationhood-membership');
  if (nationhood.some((item) => !/naturalized/i.test(`${item.negative} ${item.positive}`) || !/citizen from birth/i.test(`${item.negative} ${item.positive}`))) errors.push('Nationhood THINK / FEEL / ACT items must stay aligned on naturalized versus citizen-from-birth national membership');
  if (nationhood.some((item) => /parent|birthplace|citizenship-at-birth/i.test(`${item.negative} ${item.positive}`))) errors.push('Nationhood core must not use citizenship-at-birth law as a proxy for national belonging');
  const populistAct = lockedBeliefItemsV2.find((item) => item.id === 'A11');
  if (!populistAct || /court|institution|media|opposition|leader/.test(`${populistAct.negative} ${populistAct.positive}`.toLowerCase())) errors.push('Populism ACT item must not collapse into anti-pluralism or leader authoritarianism');
  const religion = lockedBeliefItemsV2.filter((item) => item.construct === 'religion-public-role');
  if (religion.some((item) => !/religious moral principles/i.test(`${item.negative} ${item.positive}`))) errors.push('Religion-public-role triplet must stay aligned on legitimacy of religious moral principles in public reasoning');
  const subsidiarityAct = lockedBeliefItemsV2.find((item) => item.id === 'A14');
  if (!subsidiarityAct || !/higher-level government/i.test(subsidiarityAct.negative) || !/lowest capable/i.test(subsidiarityAct.positive)) errors.push('Subsidiarity ACT poles are not aligned with THINK/FEEL orientation');
  return { valid: errors.length === 0, errors };
}

export const canonicalBeliefV2Integrity = validateCanonicalBeliefV2();
if (!canonicalBeliefV2Integrity.valid) throw new Error(`Canonical BELIEVE v2 integrity failed: ${canonicalBeliefV2Integrity.errors.join('; ')}`);
