import type { AnswerValue, Dimension } from './questions';

export type AttitudeMode = 'think' | 'feel' | 'act';
export type BeliefStage = 'quick' | 'deep';
export type BeliefConstruct =
  | 'public-provision'
  | 'redistribution'
  | 'ownership'
  | 'social-change'
  | 'personal-autonomy'
  | 'abortion'
  | 'authority-order'
  | 'pluralism'
  | 'world-sovereignty'
  | 'nationhood-membership'
  | 'populism'
  | 'ecology-growth'
  | 'religion-public-role'
  | 'subsidiarity';

export type BeliefItem = {
  id: string;
  stage: BeliefStage;
  mode: AttitudeMode;
  construct: BeliefConstruct;
  quickDimension: Dimension;
  negative: string;
  positive: string;
  evidenceIds: readonly string[];
};

export const BELIEF_V2_VERSION = 'belief-2026.09-v4-quick26-full84' as const;
export const BELIEF_V2_LOCKED_COUNT = 42 as const;
export const BELIEF_V2_PER_MODE = 14 as const;

const constructEvidence: Record<BeliefConstruct, readonly string[]> = {
  'public-provision': ['CHES-ECON-GALTAN'],
  redistribution: ['CHES-2024', 'ROUTLEDGE-SOCIAL-DEMOCRACY'],
  ownership: ['SEP-SOCIALISM', 'CAMBRIDGE-CHRISTIAN-DEMOCRACY'],
  'social-change': ['CHES-ECON-GALTAN', 'SEP-CONSERVATISM'],
  'personal-autonomy': ['SEP-LIBERALISM', 'CHES-ECON-GALTAN'],
  abortion: ['PEW-ABORTION-GLOBAL'],
  'authority-order': ['VDEM-LIBERAL-DEMOCRACY', 'SEP-LIBERTARIANISM'],
  pluralism: ['VDEM-LIBERAL-DEMOCRACY', 'VDEM-POPULISM-AUTOCRATIZATION'],
  'world-sovereignty': ['CHES-2024', 'SEP-NATIONALISM'],
  'nationhood-membership': ['SEP-NATIONALISM', 'GLOBALCIT-BIRTHRIGHT'],
  populism: ['MUDDE-POPULISM', 'VDEM-POPULISM-AUTOCRATIZATION'],
  'ecology-growth': ['CAMBRIDGE-GREEN-POLITICS'],
  'religion-public-role': ['CAMBRIDGE-CD-RELIGIOUS-INSPIRATION'],
  subsidiarity: ['CAMBRIDGE-CD-SUBSIDIARITY'],
};

const dimensions: Record<BeliefConstruct, Dimension> = {
  'public-provision': 'economy',
  redistribution: 'economy',
  ownership: 'economy',
  'social-change': 'society',
  'personal-autonomy': 'society',
  abortion: 'society',
  'authority-order': 'power',
  pluralism: 'power',
  'world-sovereignty': 'world',
  'nationhood-membership': 'world',
  populism: 'power',
  'ecology-growth': 'world',
  'religion-public-role': 'society',
  subsidiarity: 'power',
};

const constructs: readonly BeliefConstruct[] = [
  'public-provision',
  'redistribution',
  'ownership',
  'social-change',
  'personal-autonomy',
  'abortion',
  'authority-order',
  'pluralism',
  'world-sovereignty',
  'nationhood-membership',
  'populism',
  'ecology-growth',
  'religion-public-role',
  'subsidiarity',
] as const;

const thinkPairs: Record<BeliefConstruct, readonly [string, string]> = {
  'public-provision': [
    'When an essential service has little realistic competition, provision should lean more toward public or community ownership.',
    'When an essential service has little realistic competition, provision should lean more toward private ownership under public regulation.',
  ],
  redistribution: [
    'Government should do more to reduce large differences in income and wealth, even when that requires higher taxes or transfers.',
    'Government should do less to alter income and wealth differences that result from the economy, even when inequality remains high.',
  ],
  ownership: [
    'A larger share of major enterprises should be publicly, cooperatively or worker-owned rather than controlled mainly by private shareholders.',
    'Major enterprises should normally remain privately owned, even when government regulates them strongly and protects workers.',
  ],
  'social-change': [
    'Public institutions should adapt relatively quickly when social norms change.',
    'Public institutions should change cautiously so that continuity and social cohesion are preserved.',
  ],
  'personal-autonomy': [
    'Adults should generally be free to make personal lifestyle choices that others disapprove of, as long as they do not harm others.',
    'Society may legitimately use law or public policy to discourage some personal choices in order to uphold shared moral norms.',
  ],
  abortion: [
    'Abortion should generally remain legally available because the pregnant person should have primary decision-making authority.',
    'Abortion should generally face stronger legal limits because the state has a responsibility to protect prenatal life.',
  ],
  'authority-order': [
    'Government should have to show a specific and serious risk of harm before restricting individual liberty.',
    'Government should be able to restrict some liberties preventively when it reasonably expects serious disorder.',
  ],
  pluralism: [
    'Elected governments should remain constrained by independent courts, opposition rights, free media and constitutional rules.',
    'Once a government has clearly won an election, unelected institutions and organized opposition should rarely prevent it from carrying out its mandate.',
  ],
  'world-sovereignty': [
    'Countries should accept binding international rules when joint action is needed on cross-border problems.',
    'Countries should keep final national discretion even when that makes joint action on cross-border problems harder.',
  ],
  'nationhood-membership': [
    'Citizens should be regarded as equally belonging to the nation regardless of ancestry, religion or family origin, and birthplace may legitimately contribute to citizenship at birth.',
    'Historic cultural or ancestral continuity should carry additional weight in national belonging, and citizenship at birth should rely more on parent citizenship or qualifying status than birthplace alone.',
  ],
  populism: [
    'Political conflict usually involves several legitimate interests and values, so no single side can claim to represent “the real people.”',
    'The central political conflict is often between ordinary people and a self-serving elite that ignores the people’s common interests.',
  ],
  'ecology-growth': [
    'In wealthy societies, ecological limits can justify deliberately accepting lower material growth or consumption.',
    'Economic growth should remain a central goal, with environmental harm addressed mainly through technology, pricing and regulation.',
  ],
  'religion-public-role': [
    'Public institutions should remain religiously neutral, and laws applying to everyone should not depend on a particular religious doctrine.',
    'Religiously grounded moral traditions may legitimately help guide public policy, even when citizens do not all share that faith.',
  ],
  subsidiarity: [
    'Government should take direct responsibility for important social tasks when that is the best way to guarantee equal standards and access.',
    'Important social tasks should remain with families, communities, voluntary associations or local institutions where they can handle them, with higher government stepping in when necessary.',
  ],
};

const feelPairs: Record<BeliefConstruct, readonly [string, string]> = {
  'public-provision': [
    'I feel more uneasy when essential services depend heavily on private providers whose incentives may conflict with universal access.',
    'I feel more uneasy when essential services depend heavily on public providers that may face weak competitive pressure.',
  ],
  redistribution: [
    'Large gaps in income and wealth trouble me more than the tax burden used to reduce those gaps.',
    'High compulsory tax burdens trouble me more than income and wealth differences produced by the economy.',
  ],
  ownership: [
    'It feels fairer when workers or the public share more directly in the ownership and control of major enterprises.',
    'It feels fairer when those who provide private capital retain the strongest ownership and control rights, subject to law and worker protections.',
  ],
  'social-change': [
    'I am more uneasy when public institutions lag behind major changes in social norms.',
    'I am more uneasy when public institutions change before newer social norms are broadly established.',
  ],
  'personal-autonomy': [
    'I am more uncomfortable with government policing private, consensual adult choices that do not harm others.',
    'I am more uncomfortable with society abandoning shared moral standards in the name of personal choice.',
  ],
  abortion: [
    'In abortion policy, I feel greater concern about restricting a pregnant person’s autonomy and control over their body.',
    'In abortion policy, I feel greater concern about failing to protect prenatal life.',
  ],
  'authority-order': [
    'During unrest or crisis, I worry more about government overreach and unnecessary restrictions on liberty.',
    'During unrest or crisis, I worry more about authorities being too constrained to restore safety and order.',
  ],
  pluralism: [
    'I am more alarmed by a political majority overriding rights, courts or independent institutions.',
    'I am more alarmed by elected governments being repeatedly blocked by unelected institutions or organized opposition.',
  ],
  'world-sovereignty': [
    'I feel more uneasy when countries cannot solve shared problems because each insists on keeping complete national discretion.',
    'I feel more uneasy when international institutions can bind my country over strong national objections.',
  ],
  'nationhood-membership': [
    'A naturalized citizen with a different ancestry or religion feels just as fully part of the nation to me as a citizen from a long-established family.',
    'Shared historical culture or ancestry matters to my sense of who most fully belongs to the nation, even when legal citizenship is equal.',
  ],
  populism: [
    'When politics disappoints, my first instinct is that genuine differences among many groups make compromise difficult.',
    'When politics disappoints, my first instinct is that a self-serving elite is ignoring ordinary people.',
  ],
  'ecology-growth': [
    'I worry more about ecological damage and resource limits than about somewhat slower economic growth.',
    'I worry more about lower growth and living standards than about environmental risks that technology and regulation may be able to manage.',
  ],
  'religion-public-role': [
    'I feel more uneasy when religious doctrine shapes laws that apply to people who do not share that religion.',
    'I feel more uneasy when public institutions treat religious moral traditions as having no legitimate place in public reasoning.',
  ],
  subsidiarity: [
    'I instinctively trust public institutions more to guarantee consistent standards for important social responsibilities.',
    'I instinctively trust families, communities and local or voluntary institutions more when they are capable of handling important social responsibilities.',
  ],
};

const actPairs: Record<BeliefConstruct, readonly [string, string]> = {
  'public-provision': [
    'If two essential-service options were otherwise comparable, I would choose the public or community-owned provider.',
    'If two essential-service options were otherwise comparable, I would choose the privately owned provider operating under public regulation.',
  ],
  redistribution: [
    'I would support a policy that reduced inequality and strengthened public services even if it moderately increased my own taxes.',
    'I would oppose that policy and prefer to keep my own taxes lower even if inequality and public-service gaps remained larger.',
  ],
  ownership: [
    'If I worked in or invested in a large company, I would support giving workers substantially more binding ownership or decision rights even if shareholder control were reduced.',
    'I would keep final ownership and strategic control primarily with shareholders and their appointed managers while protecting workers through law and representation.',
  ],
  'social-change': [
    'If a long-standing rule no longer matched a clear and sustained change in social norms, I would favor updating the rule relatively quickly.',
    'I would favor keeping the long-standing rule until the newer norm had broad and durable acceptance.',
  ],
  'personal-autonomy': [
    'If I strongly disapproved of a consensual adult lifestyle that harmed no one else, I would still oppose using law to restrict it.',
    'If I believed that lifestyle seriously undermined shared moral standards, I could support some legal or public-policy restrictions even without direct harm to others.',
  ],
  abortion: [
    'If I voted directly on abortion law, I would vote toward broader legal access and decision-making autonomy.',
    'If I voted directly on abortion law, I would vote toward stronger legal limits intended to protect prenatal life.',
  ],
  'authority-order': [
    'During serious disorder, I would keep strong procedural safeguards even if that made the government response slower or less forceful.',
    'During serious disorder, I would give authorities broader temporary powers even if some procedural safeguards were reduced.',
  ],
  pluralism: [
    'If a government I strongly supported faced hostile courts, media and opposition groups, I would still defend their independence and right to obstruct unlawful or unconstitutional action.',
    'If those institutions repeatedly blocked the program voters had chosen, I could support limiting some of their power so the elected government could act.',
  ],
  'world-sovereignty': [
    'I would support keeping my country in a binding international agreement that imposed moderate domestic costs when it was necessary to solve a shared cross-border problem.',
    'I would support withdrawing from or weakening that agreement if national decision-making and immediate domestic interests were significantly constrained.',
  ],
  'nationhood-membership': [
    'In citizenship law, I would give birth in the country substantial independent weight even when neither parent is already a citizen.',
    'In citizenship law, I would make citizenship at birth depend mainly on a parent’s citizenship or qualifying legal status rather than birthplace itself.',
  ],
  populism: [
    'If a leader I supported claimed a clear popular mandate but independent institutions resisted, I would still prefer compromise and institutional checks.',
    'If I believed the institutions were frustrating the clear will of ordinary people, I would be willing to back the leader against those institutions.',
  ],
  'ecology-growth': [
    'I would accept somewhat higher prices, lower consumption or slower growth for binding environmental limits when evidence showed they were needed.',
    'I would prefer policies that preserve growth and consumption while relying more on technology, incentives and gradual regulation to reduce environmental harm.',
  ],
  'religion-public-role': [
    'When voting on laws that apply to everyone, I would avoid relying on a specific religious doctrine as the main justification.',
    'When voting on laws that apply to everyone, I would regard religious moral principles as a legitimate basis for my political decision.',
  ],
  subsidiarity: [
    'When a family, community, voluntary association or local institution can handle a social task adequately, I would normally leave responsibility there rather than transfer it upward.',
    'For important social tasks, I would normally prefer direct responsibility at a higher level of government to guarantee consistent standards and access.',
  ],
};

function item(id: string, stage: BeliefStage, mode: AttitudeMode, construct: BeliefConstruct, pair: readonly [string, string]): BeliefItem {
  return {
    id,
    stage,
    mode,
    construct,
    quickDimension: dimensions[construct],
    negative: pair[0],
    positive: pair[1],
    evidenceIds: constructEvidence[construct],
  };
}

export const beliefV2Items: readonly BeliefItem[] = [
  ...constructs.map((construct, index) => item(`T${String(index + 1).padStart(2, '0')}`, 'quick', 'think', construct, thinkPairs[construct])),
  ...constructs.slice(0, 12).map((construct, index) => item(`F${String(index + 1).padStart(2, '0')}`, 'quick', 'feel', construct, feelPairs[construct])),
  ...constructs.slice(12).map((construct, index) => item(`F${String(index + 13).padStart(2, '0')}`, 'deep', 'feel', construct, feelPairs[construct])),
  ...constructs.map((construct, index) => item(`A${String(index + 1).padStart(2, '0')}`, 'deep', 'act', construct, actPairs[construct])),
] as const;

export type FamilyId = 'liberalism' | 'conservatism' | 'social-democracy' | 'socialism' | 'green-politics';
export type FamilyLoading = {
  construct: BeliefConstruct;
  relevance: 1 | 2;
  direction: -1 | 1;
  evidenceIds: readonly string[];
};
export type FamilyProfile = {
  id: FamilyId;
  name: string;
  loadings: readonly FamilyLoading[];
};

function loading(construct: BeliefConstruct, relevance: 1 | 2, direction: -1 | 1, evidenceIds: readonly string[]): FamilyLoading {
  return { construct, relevance, direction, evidenceIds };
}

export const familyProfilesV2: readonly FamilyProfile[] = [
  {
    id: 'liberalism',
    name: 'Liberalism',
    loadings: [
      loading('social-change', 1, -1, ['SEP-LIBERALISM', 'CHES-ECON-GALTAN']),
      loading('personal-autonomy', 2, -1, ['SEP-LIBERALISM']),
      loading('abortion', 1, -1, ['PEW-ABORTION-GLOBAL']),
      loading('authority-order', 2, -1, ['SEP-LIBERALISM', 'VDEM-LIBERAL-DEMOCRACY']),
      loading('pluralism', 2, -1, ['SEP-LIBERALISM', 'VDEM-LIBERAL-DEMOCRACY']),
      loading('world-sovereignty', 1, -1, ['SEP-LIBERALISM']),
      loading('nationhood-membership', 1, -1, ['SEP-LIBERALISM', 'SEP-NATIONALISM']),
      loading('religion-public-role', 1, -1, ['SEP-LIBERALISM']),
    ],
  },
  {
    id: 'conservatism',
    name: 'Conservatism',
    loadings: [
      loading('social-change', 2, 1, ['SEP-CONSERVATISM', 'CHES-ECON-GALTAN']),
      loading('personal-autonomy', 1, 1, ['SEP-CONSERVATISM', 'CHES-ECON-GALTAN']),
      loading('abortion', 1, 1, ['PEW-ABORTION-GLOBAL']),
      loading('authority-order', 1, 1, ['SEP-CONSERVATISM']),
      loading('pluralism', 1, -1, ['SEP-CONSERVATISM', 'VDEM-LIBERAL-DEMOCRACY']),
      loading('world-sovereignty', 1, 1, ['SEP-CONSERVATISM', 'SEP-NATIONALISM']),
      loading('nationhood-membership', 1, 1, ['SEP-CONSERVATISM', 'SEP-NATIONALISM']),
    ],
  },
  {
    id: 'social-democracy',
    name: 'Social democracy',
    loadings: [
      loading('public-provision', 2, -1, ['ROUTLEDGE-SOCIAL-DEMOCRACY']),
      loading('redistribution', 2, -1, ['ROUTLEDGE-SOCIAL-DEMOCRACY']),
      loading('ownership', 1, 1, ['ROUTLEDGE-SOCIAL-DEMOCRACY', 'SEP-SOCIALISM']),
      loading('social-change', 1, -1, ['CHES-ECON-GALTAN']),
      loading('personal-autonomy', 1, -1, ['CHES-ECON-GALTAN']),
      loading('abortion', 1, -1, ['PEW-ABORTION-GLOBAL']),
      loading('authority-order', 1, -1, ['VDEM-LIBERAL-DEMOCRACY']),
      loading('pluralism', 2, -1, ['VDEM-LIBERAL-DEMOCRACY', 'SEP-SOCIALISM']),
      loading('world-sovereignty', 1, -1, ['CHES-2024']),
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
      loading('social-change', 1, -1, ['CAMBRIDGE-GREEN-POLITICS']),
      loading('personal-autonomy', 1, -1, ['CAMBRIDGE-GREEN-POLITICS']),
      loading('authority-order', 1, -1, ['CAMBRIDGE-GREEN-POLITICS']),
      loading('pluralism', 1, -1, ['CAMBRIDGE-GREEN-POLITICS']),
      loading('world-sovereignty', 2, -1, ['CAMBRIDGE-GREEN-POLITICS']),
      loading('ecology-growth', 2, -1, ['CAMBRIDGE-GREEN-POLITICS']),
    ],
  },
] as const;

export type BeliefAnswersV2 = Partial<Record<string, AnswerValue>>;

function isNumericAnswer(value: AnswerValue | undefined): value is -2 | -1 | 0 | 1 | 2 {
  return typeof value === 'number' && value >= -2 && value <= 2;
}

function answerPosition(value: -2 | -1 | 0 | 1 | 2) {
  return Math.round(((value + 2) / 4) * 100);
}

function familyAlignment(value: -2 | -1 | 0 | 1 | 2, direction: -1 | 1) {
  const aligned = value * direction;
  return Math.round(((aligned + 2) / 4) * 100);
}

export type ConstructModeResult = {
  construct: BeliefConstruct;
  think: number | null;
  feel: number | null;
  act: number | null;
  overall: number | null;
  tension: number | null;
};

export function calculateConstructModes(answers: BeliefAnswersV2): ConstructModeResult[] {
  return constructs.map((construct) => {
    const values = {} as Record<AttitudeMode, number | null>;
    for (const mode of ['think', 'feel', 'act'] as const) {
      const itemForMode = beliefV2Items.find((candidate) => candidate.construct === construct && candidate.mode === mode)!;
      const value = answers[itemForMode.id];
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

  for (const loading of profile.loadings) {
    const candidates = beliefV2Items.filter((candidate) => candidate.construct === loading.construct && (mode === 'overall' || candidate.mode === mode));
    for (const candidate of candidates) {
      totalWeight += loading.relevance;
      const value = answers[candidate.id];
      if (!isNumericAnswer(value)) continue;
      knownWeight += loading.relevance;
      weighted += familyAlignment(value, loading.direction) * loading.relevance;
    }
  }

  return {
    score: knownWeight ? Math.round(weighted / knownWeight) : null,
    coverage: totalWeight ? Math.round((knownWeight / totalWeight) * 100) : 0,
  };
}

export function assessFamiliesV2(answers: BeliefAnswersV2): FamilyCompatibilityV2[] {
  return familyProfilesV2.map((profile) => {
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

export type PolygonAxisId = 'economic-role' | 'ownership' | 'social-values' | 'authority' | 'pluralism' | 'world' | 'nationhood' | 'ecology';
export type PolygonAxis = {
  id: PolygonAxisId;
  name: string;
  low: string;
  high: string;
  constructs: readonly BeliefConstruct[];
};

export const polygonAxesV2: readonly PolygonAxis[] = [
  { id: 'economic-role', name: 'Economic role', low: 'Public provision / redistribution', high: 'Market / private responsibility', constructs: ['public-provision', 'redistribution'] },
  { id: 'ownership', name: 'Ownership', low: 'Social / worker ownership', high: 'Private / shareholder ownership', constructs: ['ownership'] },
  { id: 'social-values', name: 'Social values', low: 'Personal autonomy / change', high: 'Tradition / moral continuity', constructs: ['social-change', 'personal-autonomy', 'abortion'] },
  { id: 'authority', name: 'Authority', low: 'Liberty / safeguards', high: 'Order / preventive authority', constructs: ['authority-order'] },
  { id: 'pluralism', name: 'Pluralism', low: 'Checks / competing institutions', high: 'Majoritarian concentration', constructs: ['pluralism'] },
  { id: 'world', name: 'World', low: 'International cooperation', high: 'National discretion', constructs: ['world-sovereignty'] },
  { id: 'nationhood', name: 'Nationhood', low: 'Civic / inclusive membership', high: 'Inherited / status-based continuity', constructs: ['nationhood-membership'] },
  { id: 'ecology', name: 'Ecology', low: 'Ecological limits / structural change', high: 'Growth / incremental adaptation', constructs: ['ecology-growth'] },
] as const;

export type PolygonPointV2 = PolygonAxis & {
  score: number | null;
  coverage: number;
};

export function calculatePolygonV2(answers: BeliefAnswersV2, mode: AttitudeMode | 'overall' = 'overall'): PolygonPointV2[] {
  const constructResults = calculateConstructModes(answers);
  return polygonAxesV2.map((axis) => {
    const values: number[] = [];
    let expected = 0;
    for (const construct of axis.constructs) {
      const result = constructResults.find((candidate) => candidate.construct === construct)!;
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

export function statementFamilyRelevance(itemId: string) {
  const itemDef = beliefV2Items.find((candidate) => candidate.id === itemId);
  if (!itemDef) return null;
  return {
    item: itemDef,
    families: familyProfilesV2.map((profile) => {
      const match = profile.loadings.find((loading) => loading.construct === itemDef.construct);
      return {
        familyId: profile.id,
        relevance: match?.relevance ?? 0,
        direction: match?.direction ?? 0,
        evidenceIds: match?.evidenceIds ?? [],
      };
    }),
  };
}

export function validateBeliefV2Architecture() {
  const errors: string[] = [];
  const ids = beliefV2Items.map((item) => item.id);
  if (beliefV2Items.length !== BELIEF_V2_LOCKED_COUNT) errors.push(`Belief v2 must contain exactly ${BELIEF_V2_LOCKED_COUNT} items; found ${beliefV2Items.length}`);
  if (new Set(ids).size !== ids.length) errors.push('Belief v2 item IDs must be unique');
  if (beliefV2Items.filter((item) => item.stage === 'quick').length !== 26) errors.push('Belief v2 Quick must contain exactly 26 belief items');
  if (beliefV2Items.filter((item) => item.stage === 'deep').length !== 16) errors.push('Belief v2 Deep must contain exactly 16 belief items');
  for (const mode of ['think', 'feel', 'act'] as const) {
    const count = beliefV2Items.filter((item) => item.mode === mode).length;
    if (count !== BELIEF_V2_PER_MODE) errors.push(`${mode} must contain exactly ${BELIEF_V2_PER_MODE} items; found ${count}`);
  }
  for (const construct of constructs) {
    for (const mode of ['think', 'feel', 'act'] as const) {
      const count = beliefV2Items.filter((item) => item.construct === construct && item.mode === mode).length;
      if (count !== 1) errors.push(`${construct} must have exactly one ${mode} item; found ${count}`);
    }
  }
  for (const profile of familyProfilesV2) {
    const seen = new Set<BeliefConstruct>();
    for (const loading of profile.loadings) {
      if (seen.has(loading.construct)) errors.push(`${profile.name} repeats loading ${loading.construct}`);
      seen.add(loading.construct);
      if (loading.relevance !== 1 && loading.relevance !== 2) errors.push(`${profile.name} has invalid relevance weight`);
    }
  }
  return { valid: errors.length === 0, errors };
}

export const beliefV2Integrity = validateBeliefV2Architecture();
if (!beliefV2Integrity.valid) throw new Error(`Belief v2 integrity failed: ${beliefV2Integrity.errors.join('; ')}`);
