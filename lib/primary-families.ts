import type { DeepBeliefResult } from './deep-engine';
import { collectAxisSignals, type AxisId, type CompatibilityInput, type SignalBucket } from './ideology-model';

export type PrimaryFamilyId =
  | 'liberalism'
  | 'conservatism'
  | 'social-democracy'
  | 'socialism'
  | 'green-politics';

export type PoliticalTendencyId = 'nationalism' | 'populism' | 'authority-democratic-constraints';
export type ConservativeSubtypeId = 'traditional-secular-conservatism' | 'christian-democracy' | 'religious-conservatism';
export type MatchBand = 'strong-match' | 'broad-match' | 'mixed' | 'limited-match' | 'strong-tension' | 'insufficient';

type FamilyCriterion = {
  axis: AxisId;
  importance: 'core' | 'typical';
  support: readonly SignalBucket[];
  tension: readonly SignalBucket[];
};

export type PrimaryFamily = {
  id: PrimaryFamilyId;
  name: string;
  coreIdea: string;
  importantSubtypes: string;
  economy: string;
  society: string;
  statePower: string;
  citizenshipAtBirth: string;
  abortion: string;
  world: string;
  evidenceIds: readonly string[];
  criteria: readonly FamilyCriterion[];
};

export type PrimaryFamilyMatch = {
  id: PrimaryFamilyId;
  name: string;
  score: number | null;
  band: MatchBand;
  bandLabel: string;
  coverage: number;
  coreIdea: string;
};

export type PoliticalTendency = {
  id: PoliticalTendencyId;
  name: string;
  lowPole: string;
  highPole: string;
  meaning: string;
  evidenceIds: readonly string[];
};

export type PoliticalTendencyAssessment = PoliticalTendency & {
  score: number | null;
  label: string;
  coverage: number;
};

export type ConservativeSubtypeAssessment = {
  id: ConservativeSubtypeId;
  name: string;
  explanation: string;
  evidenceIds: readonly string[];
} | null;

const N = ['strong-negative', 'negative'] as const;
const NM = ['strong-negative', 'negative', 'mixed'] as const;
const MP = ['mixed', 'positive', 'strong-positive'] as const;
const P = ['positive', 'strong-positive'] as const;
const SP = ['strong-positive'] as const;
const SN = ['strong-negative'] as const;

export const primaryFamilies: readonly PrimaryFamily[] = [
  {
    id: 'liberalism',
    name: 'Liberalism',
    coreIdea: 'Individual liberty, equal legal rights and limits on concentrated political power.',
    importantSubtypes: 'Market-oriented and social-welfare variants exist; narrower labels are background context unless they materially improve the result.',
    economy: 'Broad family: ranges from strongly market-oriented approaches to variants with a larger welfare and regulatory role.',
    society: 'Generally gives substantial weight to personal autonomy and equal legal treatment.',
    statePower: 'Government power should be constrained by rights, rule of law and institutional checks.',
    citizenshipAtBirth: 'Usually compatible with civic and legal membership; the exact role of birthplace versus parentage varies by country and liberal tradition.',
    abortion: 'Contemporary liberal politics often gives greater weight to legal personal choice, but abortion is not a universal defining test of liberalism.',
    world: 'Often compatible with international cooperation; positions range from cosmopolitan to more nationally focused liberal traditions.',
    evidenceIds: ['SEP-LIBERALISM', 'VDEM-LIBERAL-DEMOCRACY', 'PEW-ABORTION-GLOBAL'],
    criteria: [
      { axis: 'power', importance: 'core', support: N, tension: P },
      { axis: 'pluralism', importance: 'core', support: N, tension: P },
      { axis: 'democracyRejection', importance: 'core', support: N, tension: P },
      { axis: 'society', importance: 'typical', support: NM, tension: SP },
    ],
  },
  {
    id: 'conservatism',
    name: 'Conservatism',
    coreIdea: 'Continuity, inherited institutions and caution toward rapid or abstractly designed change.',
    importantSubtypes: 'Traditional/secular conservatism; Christian democracy; other religious-conservative variants where relevant.',
    economy: 'Often market-friendly in contemporary politics, but economic policy is not the defining core. Christian democracy adds a distinctive social-market and welfare tradition.',
    society: 'Usually places greater weight on continuity, established institutions and inherited social norms.',
    statePower: 'Often gives substantial weight to order and established authority, while democratic conservatism remains within constitutional constraints.',
    citizenshipAtBirth: 'No single conservative rule. Some traditions emphasize civic legal continuity; others place more weight on descent, integration or established national membership.',
    abortion: 'Contemporary conservative constituencies are often more supportive of legal restrictions, but views vary substantially by country and religion.',
    world: 'Often sovereignty-conscious, but conservative traditions range from internationalist to strongly nation-centered.',
    evidenceIds: ['SEP-CONSERVATISM', 'CAMBRIDGE-CHRISTIAN-DEMOCRACY', 'CAMBRIDGE-CD-SUBSIDIARITY', 'CAMBRIDGE-CD-RELIGIOUS-INSPIRATION', 'VDEM-LIBERAL-DEMOCRACY', 'PEW-ABORTION-GLOBAL'],
    criteria: [
      { axis: 'society', importance: 'core', support: P, tension: SN },
      { axis: 'democracyRejection', importance: 'core', support: NM, tension: SP },
      { axis: 'pluralism', importance: 'typical', support: NM, tension: SP },
      { axis: 'economy', importance: 'typical', support: MP, tension: SN },
    ],
  },
  {
    id: 'social-democracy',
    name: 'Social democracy',
    coreIdea: 'A predominantly capitalist economy combined with regulation, welfare, public services and redistribution.',
    importantSubtypes: 'Kept as one broad family in the default result to avoid unnecessary taxonomy.',
    economy: 'Regulated capitalism with a strong social floor, public services, social insurance and redistribution.',
    society: 'Frequently socially liberal in contemporary parties, although social policy is not the sole defining feature.',
    statePower: 'Strong public institutions operating within competitive democracy, rights and pluralist constraints.',
    citizenshipAtBirth: 'Not a defining doctrine; contemporary social-democratic politics is usually compatible with civic membership, but citizenship rules differ across countries.',
    abortion: 'Often supportive of legal access in contemporary social-democratic politics, but it is not the economic tradition’s defining principle.',
    world: 'Generally compatible with multilateral and international cooperation.',
    evidenceIds: ['ROUTLEDGE-SOCIAL-DEMOCRACY', 'SEP-SOCIALISM', 'VDEM-LIBERAL-DEMOCRACY', 'PEW-ABORTION-GLOBAL'],
    criteria: [
      { axis: 'economy', importance: 'core', support: N, tension: SP },
      { axis: 'pluralism', importance: 'core', support: N, tension: P },
      { axis: 'democracyRejection', importance: 'core', support: N, tension: P },
      { axis: 'ownership', importance: 'typical', support: MP, tension: SN },
    ],
  },
  {
    id: 'socialism',
    name: 'Socialism',
    coreIdea: 'Economic power and productive assets should be subject to substantially more social, public, cooperative or worker control.',
    importantSubtypes: 'Several democratic, cooperative, state-led and revolutionary variants exist; narrower labels are background context rather than headline result categories.',
    economy: 'More collective control of productive assets than social democracy; the family contains several institutional models.',
    society: 'Varies across socialist traditions and countries.',
    statePower: 'Varies widely: some socialist traditions emphasize competitive democratic institutions, while historical authoritarian variants concentrated state power.',
    citizenshipAtBirth: 'Not a defining socialist doctrine; positions vary by national and ideological tradition.',
    abortion: 'Not a defining feature of socialism as an economic family; positions vary historically and cross-nationally.',
    world: 'Internationalist strands are influential, but socialist movements have also operated through nation-states and national projects.',
    evidenceIds: ['SEP-SOCIALISM'],
    criteria: [
      { axis: 'economy', importance: 'core', support: N, tension: SP },
      { axis: 'ownership', importance: 'core', support: N, tension: P },
    ],
  },
  {
    id: 'green-politics',
    name: 'Green politics',
    coreIdea: 'Ecological limits and a sustainable society are central political priorities.',
    importantSubtypes: 'No subtype is shown by default unless later evidence demonstrates that it materially improves the user result.',
    economy: 'Usually accepts substantial intervention or structural change where needed for ecological sustainability and social goals.',
    society: 'Often associated with socially progressive and post-material positions.',
    statePower: 'Green political thought commonly stresses participation, decentralization and democratic accountability rather than concentrated authority.',
    citizenshipAtBirth: 'Not a defining green doctrine; contemporary green politics is often inclusive, but citizenship law remains a separate institutional choice.',
    abortion: 'Not a defining green principle; contemporary green parties often align with broader personal-autonomy positions.',
    world: 'Strongly compatible with international cooperation on cross-border ecological problems.',
    evidenceIds: ['CAMBRIDGE-GREEN-POLITICS', 'PEW-ABORTION-GLOBAL'],
    criteria: [
      { axis: 'ecology', importance: 'core', support: N, tension: P },
      { axis: 'pluralism', importance: 'typical', support: N, tension: SP },
      { axis: 'society', importance: 'typical', support: NM, tension: SP },
      { axis: 'world', importance: 'typical', support: NM, tension: SP },
    ],
  },
] as const;

export const politicalTendencies: readonly PoliticalTendency[] = [
  {
    id: 'nationalism',
    name: 'Nationalism',
    lowPole: 'Shared / post-national authority',
    highPole: 'Nation-centered self-determination',
    meaning: 'Gives special political value to the nation and national self-determination. It can combine with liberal, conservative, socialist or other families and does not by itself imply authoritarianism.',
    evidenceIds: ['SEP-NATIONALISM', 'GLOBALCIT-BIRTHRIGHT'],
  },
  {
    id: 'populism',
    name: 'Populism',
    lowPole: 'Plural interests / compromise',
    highPole: 'People-versus-elite general will',
    meaning: 'Frames politics around ordinary or “real” people versus a self-serving elite. It can attach to different host ideologies; democratic and authoritarian-risk signals are measured separately.',
    evidenceIds: ['MUDDE-POPULISM', 'VDEM-POPULISM-AUTOCRATIZATION', 'IDEA-POPULISM-DEMOCRACY'],
  },
  {
    id: 'authority-democratic-constraints',
    name: 'Authority / democratic constraints',
    lowPole: 'Pluralism, rights and institutional constraints',
    highPole: 'Concentrated authority / weaker constraints',
    meaning: 'Measures willingness to concentrate political authority or weaken institutional constraints. Strong anti-pluralist or democracy-rejection signals are reported separately from ideology labels.',
    evidenceIds: ['VDEM-LIBERAL-DEMOCRACY', 'VDEM-POPULISM-AUTOCRATIZATION'],
  },
] as const;

function bandForScore(score: number | null): { band: MatchBand; label: string } {
  if (score === null) return { band: 'insufficient', label: 'Not enough information' };
  if (score >= 75) return { band: 'strong-match', label: 'Strong match' };
  if (score >= 60) return { band: 'broad-match', label: 'Broad match' };
  if (score >= 40) return { band: 'mixed', label: 'Mixed / overlapping' };
  if (score >= 25) return { band: 'limited-match', label: 'Limited match' };
  return { band: 'strong-tension', label: 'Strong tension' };
}

function scoreCriteria(input: CompatibilityInput, criteria: readonly FamilyCriterion[]) {
  const signals = collectAxisSignals(input);
  let knownWeight = 0;
  let totalWeight = 0;
  let weightedPoints = 0;
  let knownCore = 0;

  for (const criterion of criteria) {
    const weight = criterion.importance === 'core' ? 2 : 1;
    totalWeight += weight;
    const signal = signals[criterion.axis];
    if (!signal?.interpretable || !signal.bucket) continue;

    knownWeight += weight;
    if (criterion.importance === 'core') knownCore += 1;
    const points = criterion.support.includes(signal.bucket)
      ? 100
      : criterion.tension.includes(signal.bucket)
        ? 0
        : 50;
    weightedPoints += points * weight;
  }

  return {
    coverage: totalWeight === 0 ? 0 : Math.round((knownWeight / totalWeight) * 100),
    score: knownCore === 0 || knownWeight === 0 ? null : Math.round(weightedPoints / knownWeight),
  };
}

export function assessPrimaryFamilies(input: CompatibilityInput): PrimaryFamilyMatch[] {
  return primaryFamilies.map((family) => {
    const scored = scoreCriteria(input, family.criteria);
    const score = scored.coverage < 50 ? null : scored.score;
    const band = bandForScore(score);
    return {
      id: family.id,
      name: family.name,
      score,
      band: band.band,
      bandLabel: band.label,
      coverage: scored.coverage,
      coreIdea: family.coreIdea,
    };
  }).sort((a, b) => {
    if (a.score === null && b.score === null) return a.name.localeCompare(b.name);
    if (a.score === null) return 1;
    if (b.score === null) return -1;
    return b.score - a.score || a.name.localeCompare(b.name);
  });
}

function directionalLabel(score: number | null, low: string, high: string) {
  if (score === null) return 'Not enough information';
  if (score <= 24) return `Strongly toward ${low.toLowerCase()}`;
  if (score <= 39) return `Leans toward ${low.toLowerCase()}`;
  if (score <= 59) return 'Mixed / balanced';
  if (score <= 74) return `Leans toward ${high.toLowerCase()}`;
  return `Strongly toward ${high.toLowerCase()}`;
}

export function assessPoliticalTendencies(input: CompatibilityInput): PoliticalTendencyAssessment[] {
  const signals = collectAxisSignals(input);
  const nationalismCriteria: readonly FamilyCriterion[] = [
    { axis: 'nationhood', importance: 'core', support: P, tension: N },
    { axis: 'world', importance: 'typical', support: MP, tension: SN },
  ];
  const nationalismScored = scoreCriteria(input, nationalismCriteria);
  const nationalismScore = nationalismScored.coverage < 50 ? null : nationalismScored.score;

  const populismSignal = signals.populism;
  const populismScore = populismSignal?.interpretable && populismSignal.score !== null ? populismSignal.score : null;
  const populismCoverage = populismSignal?.interpretable ? 100 : 0;

  const authorityParts = [
    { signal: signals.power, weight: 1 },
    { signal: signals.pluralism, weight: 2 },
    { signal: signals.democracyRejection, weight: 2 },
  ];
  let authorityKnownWeight = 0;
  let authorityWeighted = 0;
  for (const part of authorityParts) {
    if (!part.signal?.interpretable || part.signal.score === null) continue;
    authorityKnownWeight += part.weight;
    authorityWeighted += part.signal.score * part.weight;
  }
  const authorityCoverage = Math.round((authorityKnownWeight / 5) * 100);
  const authorityScore = authorityKnownWeight === 0 || authorityCoverage < 40 ? null : Math.round(authorityWeighted / authorityKnownWeight);
  const democracy = signals.democracyRejection;
  const pluralism = signals.pluralism;
  const authorityRisk = Boolean(
    authorityScore !== null
    && authorityScore >= 75
    && ((democracy?.interpretable && (democracy.score ?? 0) >= 60) || (pluralism?.interpretable && (pluralism.score ?? 0) >= 80)),
  );

  return politicalTendencies.map((tendency) => {
    if (tendency.id === 'nationalism') {
      return {
        ...tendency,
        score: nationalismScore,
        coverage: nationalismScored.coverage,
        label: directionalLabel(nationalismScore, tendency.lowPole, tendency.highPole),
      };
    }
    if (tendency.id === 'populism') {
      return {
        ...tendency,
        score: populismScore,
        coverage: populismCoverage,
        label: directionalLabel(populismScore, tendency.lowPole, tendency.highPole),
      };
    }
    return {
      ...tendency,
      score: authorityScore,
      coverage: authorityCoverage,
      label: authorityRisk
        ? 'Strong authority / authoritarian-risk signal'
        : directionalLabel(authorityScore, tendency.lowPole, tendency.highPole),
    };
  });
}

export function assessConservativeSubtype(input: CompatibilityInput): ConservativeSubtypeAssessment {
  const conservative = assessPrimaryFamilies(input).find((item) => item.id === 'conservatism');
  if (!conservative || conservative.score === null || conservative.score < 60 || !input.deep) return null;

  const religion = input.deep.axes.religionPublicRole;
  const subsidiarity = input.deep.axes.subsidiarity;
  if (!religion.interpretable || religion.score === null) return null;

  if (religion.score <= 40) {
    return {
      id: 'traditional-secular-conservatism',
      name: 'Traditional / secular conservatism',
      explanation: 'Your conservative-leaning answers emphasize continuity and established institutions without giving religiously inspired public policy a central role.',
      evidenceIds: ['SEP-CONSERVATISM', 'CAMBRIDGE-CD-RELIGIOUS-INSPIRATION'],
    };
  }

  if (religion.score >= 60) {
    const economy = input.quick?.scores.economy;
    const ownership = input.deep.axes.ownership;
    const democracy = input.deep.axes.democracyRejection;
    const socialMarketKnown = Boolean(economy?.interpretable && economy.score !== null && ownership.interpretable && ownership.score !== null);
    const socialMarketCompatible = Boolean(
      socialMarketKnown
      && (economy!.score as number) >= 25
      && (economy!.score as number) <= 75
      && (ownership.score as number) >= 40,
    );
    const democraticCompatible = democracy.interpretable && democracy.score !== null && democracy.score <= 60;

    if (subsidiarity.interpretable && subsidiarity.score !== null && subsidiarity.score >= 60 && socialMarketCompatible && democraticCompatible) {
      return {
        id: 'christian-democracy',
        name: 'Christian democracy',
        explanation: 'Your answers combine conservative social continuity with religious inspiration, subsidiarity and a social-market-compatible economic position — the combination that most clearly distinguishes Christian democracy from generic conservatism.',
        evidenceIds: ['CAMBRIDGE-CHRISTIAN-DEMOCRACY', 'CAMBRIDGE-CD-SUBSIDIARITY', 'CAMBRIDGE-CD-RELIGIOUS-INSPIRATION', 'VDEM-LIBERAL-DEMOCRACY'],
      };
    }

    return {
      id: 'religious-conservatism',
      name: 'Religious-conservative orientation',
      explanation: 'Religious or moral tradition plays an important role in your conservative-leaning answers, but the additional subsidiarity and social-market signals are not strong enough to label the subtype Christian democratic.',
      evidenceIds: ['SEP-CONSERVATISM', 'CAMBRIDGE-CD-RELIGIOUS-INSPIRATION'],
    };
  }

  return null;
}

export function populismGovernanceQualifier(deep: DeepBeliefResult | null | undefined): string {
  if (!deep) return 'Populism by itself does not establish an authoritarian position.';

  const pluralism = deep.axes.pluralism;
  const democracy = deep.axes.democracyRejection;
  if (!pluralism.interpretable || !democracy.interpretable || pluralism.score === null || democracy.score === null) {
    return 'Populism by itself does not establish an authoritarian position; the democratic-constraints questions do not yet provide enough signal.';
  }

  if (democracy.score >= 60 || pluralism.score >= 80) {
    return 'Your answers pair any populist tendency with a separate anti-pluralist or authoritarian-risk signal. That risk comes from rejection of democratic constraints, not from the populist label alone.';
  }

  if (democracy.score <= 40 && pluralism.score <= 40) {
    return 'Your answers pair any populist tendency with support for competitive democracy and institutional constraints.';
  }

  return 'Your answers do not show a clear democratic-constraints pattern. Populism alone should not be read as authoritarian.';
}

export const compatibilityAnchors = [
  { min: 75, max: 100, label: 'Strong match', meaning: 'Strongly consistent with the family’s defining characteristics in the dimensions measured.' },
  { min: 60, max: 74, label: 'Broad match', meaning: 'Broadly consistent, with some mixed or unresolved dimensions.' },
  { min: 40, max: 59, label: 'Mixed / overlapping', meaning: 'Some meaningful overlap, but also neutral or cross-pressured signals.' },
  { min: 25, max: 39, label: 'Limited match', meaning: 'Only limited consistency with the family’s defining characteristics.' },
  { min: 0, max: 24, label: 'Strong tension', meaning: 'Measured views are in substantial tension with the family’s defining characteristics.' },
] as const;
