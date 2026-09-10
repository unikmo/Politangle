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
 * Plain-language source wording for the adult BELIEVE bank.
 *
 * THINK, FEEL and ACT stay on the same attitude object, but each mode uses a
 * different angle so users are not asked the same sentence repeatedly. The
 * session shows only one polarity of each source item, not both alternatives.
 */
const phase1ValidatedPairs: Record<BeliefConstruct, CanonicalModePairs> = {
  'public-provision': {
    think: [
      'Government should make sure everyone can obtain essential services such as healthcare and education.',
      'Government should have a limited role in essential services, with people relying more on private providers and personal choice.',
    ],
    feel: [
      'It concerns me when people can miss essential services because access depends too much on private arrangements.',
      'It concerns me when government control of essential services leaves people with too little choice.',
    ],
    act: [
      'I would support public funding to keep an essential local service available when private provision would leave people without access.',
      'If an essential local service could be delivered reliably either way, I would prefer a private provider to additional public funding.',
    ],
  },
  redistribution: {
    think: [
      'Government should use taxes and transfers to reduce very large income gaps.',
      'Government should interfere less with income differences produced by the economy, even when the gaps become large.',
    ],
    feel: [
      'Very large income gaps concern me enough to justify higher taxes on some people.',
      'High taxes concern me even when they are intended to reduce very large income gaps.',
    ],
    act: [
      'I would accept a moderate increase in my own taxes if it substantially reduced very large income gaps.',
      'I would prefer lower taxes even if very large income gaps remained.',
    ],
  },
  ownership: {
    think: [
      'Workers, cooperatives or public bodies should own a larger share of major businesses.',
      'Major businesses should usually remain privately owned, with strong legal protections for workers.',
    ],
    feel: [
      'It feels fair when workers or the public have a meaningful ownership stake in major businesses.',
      'It feels fair when private investors retain most ownership of major businesses, subject to worker protections.',
    ],
    act: [
      'If a large company offered employees a meaningful ownership stake in exchange for reducing outside shareholder control, I would support the change.',
      'If a large company were performing well, I would keep ownership mainly with private shareholders rather than shift a substantial stake to workers or public funds.',
    ],
  },
  'social-change': {
    think: [
      'Laws and public rules should change reasonably quickly when a new social norm gains strong and sustained support.',
      'Long-standing laws and public rules should change only after a new social norm has broad and durable support.',
    ],
    feel: [
      'I am uncomfortable when public rules lag far behind a social change that has strong support.',
      'I am uncomfortable when long-standing rules change before a new social norm is broadly accepted.',
    ],
    act: [
      'If an old law no longer matched a widely accepted social norm, I would support changing it fairly soon.',
      'I would keep an old law until support for changing it was broad and durable.',
    ],
  },
  'personal-autonomy': {
    think: [
      'Law should generally leave private, consensual adult behavior alone when it does not directly harm others.',
      'Law may restrict some private, consensual adult behavior to uphold shared moral standards, even without direct harm to others.',
    ],
    feel: [
      'I am uncomfortable when government restricts private adult choices that do not directly harm anyone else.',
      'I am uncomfortable when law gives no weight to shared moral standards in private adult behavior.',
    ],
    act: [
      'If I strongly disliked a private adult choice that harmed nobody else, I would still oppose banning it.',
      'I could support legal limits on a private adult choice if I believed it seriously undermined shared moral standards.',
    ],
  },
  abortion: {
    think: [
      'Abortion should generally remain legally available because the pregnant person should have primary decision-making authority.',
      'Abortion should generally face stronger legal limits because prenatal life should receive greater legal protection.',
    ],
    feel: [
      'Restrictions on abortion concern me because they can take an important personal decision away from the pregnant person.',
      'Broad abortion access concerns me because I believe prenatal life deserves stronger protection.',
    ],
    act: [
      'If abortion law were put to a vote, I would support broader legal access.',
      'If abortion law were put to a vote, I would support tighter legal limits.',
    ],
  },
  'authority-order': {
    think: [
      'Government should restrict individual freedom only when it can show a concrete and serious risk of harm.',
      'Government may restrict some freedoms before harm occurs when there is a credible risk of serious disorder.',
    ],
    feel: [
      'During a crisis, government using more power than necessary worries me.',
      'During a crisis, authorities having too little power to restore safety worries me.',
    ],
    act: [
      'During serious disorder, I would keep strong legal safeguards even if the response became slower.',
      'During serious disorder, I would allow broader temporary powers even if some legal safeguards were reduced.',
    ],
  },
  pluralism: {
    think: [
      'Winning an election should not remove independent checks such as courts, constitutional rules and opposition rights.',
      'An elected government should have wide freedom to carry out its legal program even when independent bodies strongly oppose it.',
    ],
    feel: [
      'It concerns me when an elected majority weakens independent checks on government power.',
      'It concerns me when independent bodies repeatedly block an elected government from carrying out policies that are legal and constitutional.',
    ],
    act: [
      'If a court blocked a policy I strongly supported, I would still defend the court’s independence.',
      'If independent checks repeatedly blocked legal policies voters chose, I could support reducing some of those checks.',
    ],
  },
  'world-sovereignty': {
    think: [
      'Countries should accept binding international rules when shared problems cannot be solved effectively by each country acting alone.',
      'Countries should keep the final national say even when this makes joint action on shared problems less effective.',
    ],
    feel: [
      'I am uncomfortable when shared problems remain unsolved because countries refuse binding cooperation.',
      'I am uncomfortable when international commitments prevent my country from making its own final decision on an important issue.',
    ],
    act: [
      'I would support a binding international agreement when it was necessary to solve a shared problem, even if it limited some national choices.',
      'I would keep national decision-making even when doing so made a shared international response less effective.',
    ],
  },
  'nationhood-membership': {
    think: [
      'Someone who becomes a citizen can belong to the nation just as fully as someone who was a citizen from birth.',
      'Being a citizen from birth is an important part of national belonging beyond legal citizenship alone.',
    ],
    feel: [
      'I feel the same national belonging toward naturalized citizens who take part in civic life as toward citizens from birth.',
      'Long-standing family roots in the country matter to my sense of national belonging.',
    ],
    act: [
      'I would support allowing naturalized citizens to hold the same elected offices as people who have been citizens from birth.',
      'I would support reserving some senior elected offices for citizens from birth.',
    ],
  },
  populism: {
    think: [
      'Political disagreements usually reflect real conflicts among interests and values, not one side simply betraying ordinary voters.',
      'Political decisions often give too much influence to well-connected groups and too little to ordinary voters.',
    ],
    feel: [
      'When politics disappoints me, I usually think difficult trade-offs and competing interests are the main reason.',
      'When politics disappoints me, I often suspect that well-connected groups are being heard more than ordinary voters.',
    ],
    act: [
      'I prefer candidates who explain political trade-offs openly, even when their message is less dramatic or popular.',
      'I prefer candidates who promise to reduce the influence of well-connected groups and give ordinary voters more direct influence.',
    ],
  },
  'ecology-growth': {
    think: [
      'When environmental protection and economic growth clearly conflict, ecological limits should sometimes take priority even if growth is slower.',
      'When they conflict, economic growth should generally take priority while environmental harm is reduced through other means.',
    ],
    feel: [
      'Serious ecological damage worries me even when preventing it could slow economic growth.',
      'Lost jobs and living standards worry me when environmental limits significantly slow economic growth.',
    ],
    act: [
      'I would support binding environmental limits even if they moderately slowed economic growth.',
      'I would oppose environmental limits that deliberately slow growth and prefer approaches designed to preserve growth.',
    ],
  },
  'religion-public-role': {
    think: [
      'Religious moral principles should not be enough to justify laws that apply to people who do not share the religion.',
      'Religious moral principles can be legitimate reasons for laws even when some citizens do not share the religion.',
    ],
    feel: [
      'I am uneasy when religious moral principles are used to justify laws for people who do not share that faith.',
      'I am uneasy when religious moral principles are dismissed from public debate simply because they are religious.',
    ],
    act: [
      'I would prefer public officials not to rely mainly on religious moral principles when justifying laws that apply to everyone.',
      'I would accept public officials using religious moral principles as legitimate reasons for laws that apply to everyone.',
    ],
  },
  subsidiarity: {
    think: [
      'National or regional government should take responsibility for important services when that is the best way to guarantee equal access and standards.',
      'Important services should usually stay with local government or community institutions when they can provide them well.',
    ],
    feel: [
      'I feel confident when national or regional government sets the same minimum standard for important services everywhere.',
      'I feel confident when capable local institutions keep control rather than handing decisions to regional or national government.',
    ],
    act: [
      'If local areas provided very different quality, I would support national or regional standards even if local control were reduced.',
      'If local services worked well, I would keep decisions local even if national rules would make them more uniform.',
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

export type ResponseConsistencyV2 = {
  score: number | null;
  coverage: number;
  comparedConstructs: number;
  highlyAligned: number;
  contextSensitive: number;
};

/**
 * Measures response coherence across THINK, FEEL and ACT within the same
 * construct. It is not a conviction, knowledge or honesty score. A lower score
 * can reflect genuine trade-offs, context sensitivity, uncertainty or noise.
 */
export function assessResponseConsistencyV2(answers: BeliefAnswersV2): ResponseConsistencyV2 {
  const results = calculateConstructModesV2(answers);
  const comparable = results.flatMap((result) => {
    const known = [result.think, result.feel, result.act].filter((value): value is number => value !== null);
    if (known.length < 2) return [];
    const spread = Math.max(...known) - Math.min(...known);
    return [{ consistency: 100 - spread }];
  });
  if (!comparable.length) return { score: null, coverage: 0, comparedConstructs: 0, highlyAligned: 0, contextSensitive: 0 };
  const score = Math.round(comparable.reduce((sum, item) => sum + item.consistency, 0) / comparable.length);
  return {
    score,
    coverage: Math.round((comparable.length / results.length) * 100),
    comparedConstructs: comparable.length,
    highlyAligned: comparable.filter((item) => item.consistency >= 75).length,
    contextSensitive: comparable.filter((item) => item.consistency <= 50).length,
  };
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

/**
 * Cross-cutting tendency outputs that can be defended by dedicated BELIEVE
 * constructs in the current 42-item pilot.
 *
 * Nationalism is intentionally not emitted as one numeric tendency. The
 * nationhood-membership construct measures inclusive versus birth-weighted
 * national membership, while world-sovereignty measures international rules
 * versus final national discretion. Nationalism can be civic or culturally
 * restrictive and national self-determination is not identical to state
 * sovereignty, so averaging those two axes would create a false single score.
 */
export type TendencyIdV2 = 'populism' | 'authority-democratic-constraints';
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
  const populism = constructAverage(results, ['populism']);
  const authority = constructAverage(results, ['authority-order', 'pluralism']);
  return [
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
  const allText = lockedBeliefItemsV2.flatMap((item) => [item.negative, item.positive]).join(' ');
  if (/\belites?\b/i.test(allText)) errors.push('BELIEVE wording should not repeatedly frame politics around elites');
  const incompleteComparatives = lockedBeliefItemsV2.filter((item) => item.mode === 'feel' && /\bI (?:feel |am )?more\b/i.test(`${item.negative} ${item.positive}`));
  if (incompleteComparatives.length) errors.push('FEEL items should be complete standalone statements, not unfinished “more ...” comparisons');
  const provision = lockedBeliefItemsV2.filter((item) => item.construct === 'public-provision');
  if (provision.some((item) => /ownership|shareholder|worker-owned/i.test(`${item.negative} ${item.positive}`))) errors.push('Public-provision triplet must not collapse into ownership');
  const redistributionAct = lockedBeliefItemsV2.find((item) => item.id === 'A02');
  if (!redistributionAct || /public service/i.test(`${redistributionAct.negative} ${redistributionAct.positive}`)) errors.push('Redistribution ACT item must not double-barrel redistribution with public services');
  const nationhood = lockedBeliefItemsV2.filter((item) => item.construct === 'nationhood-membership');
  if (nationhood.some((item) => !/naturalized|becomes a citizen/i.test(`${item.negative} ${item.positive}`) || !/citizens? from birth/i.test(`${item.negative} ${item.positive}`))) errors.push('Nationhood THINK / FEEL / ACT items must stay aligned on naturalized versus citizen-from-birth national membership');
  if (nationhood.some((item) => /parent|birthplace|citizenship-at-birth/i.test(`${item.negative} ${item.positive}`))) errors.push('Nationhood core must not use citizenship-at-birth law as a proxy for national belonging');
  const populistAct = lockedBeliefItemsV2.find((item) => item.id === 'A11');
  if (!populistAct || !/well-connected/i.test(`${populistAct.negative} ${populistAct.positive}`) || !/ordinary voters/i.test(`${populistAct.negative} ${populistAct.positive}`)) errors.push('Populism ACT should measure unequal political influence without relying on an elite-versus-people slogan');
  if (populistAct && /court|institution|media|opposition|leader/.test(`${populistAct.negative} ${populistAct.positive}`.toLowerCase())) errors.push('Populism ACT item must not collapse into anti-pluralism or leader authoritarianism');
  const religion = lockedBeliefItemsV2.filter((item) => item.construct === 'religion-public-role');
  if (religion.some((item) => !/religious moral principles/i.test(`${item.negative} ${item.positive}`))) errors.push('Religion-public-role triplet must stay aligned on legitimacy of religious moral principles in public reasoning');
  const subsidiarityAct = lockedBeliefItemsV2.find((item) => item.id === 'A14');
  if (!subsidiarityAct || !/national or regional/i.test(subsidiarityAct.negative) || !/local/i.test(subsidiarityAct.positive)) errors.push('Subsidiarity ACT poles are not aligned with national/regional versus local responsibility');
  return { valid: errors.length === 0, errors };
}

export const canonicalBeliefV2Integrity = validateCanonicalBeliefV2();
if (!canonicalBeliefV2Integrity.valid) throw new Error(`Canonical BELIEVE v2 integrity failed: ${canonicalBeliefV2Integrity.errors.join('; ')}`);
