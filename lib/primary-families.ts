import type { DeepBeliefResult } from './deep-engine';
import { collectAxisSignals, type AxisId, type CompatibilityInput, type SignalBucket } from './ideology-model';

export type PrimaryFamilyId =
  | 'liberalism'
  | 'conservatism'
  | 'social-democracy'
  | 'socialism'
  | 'green-politics'
  | 'nationalism'
  | 'populism';

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
    economy: 'Broad family: ranges from market-oriented classical liberalism to social liberalism with a larger welfare and regulatory role.',
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
    economy: 'Often market-friendly in contemporary politics, but economic policy is not the defining core of conservatism.',
    society: 'Usually places greater weight on continuity, established institutions and inherited social norms.',
    statePower: 'Often gives substantial weight to order and established authority, while democratic conservatism remains within constitutional constraints.',
    citizenshipAtBirth: 'No single conservative rule. Some traditions emphasize civic legal continuity; others place more weight on descent, integration or established national membership.',
    abortion: 'Contemporary conservative constituencies are often more supportive of legal restrictions, but views vary substantially by country and religion.',
    world: 'Often sovereignty-conscious, but conservative traditions range from internationalist to strongly nation-centered.',
    evidenceIds: ['SEP-CONSERVATISM', 'VDEM-LIBERAL-DEMOCRACY', 'PEW-ABORTION-GLOBAL'],
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
    economy: 'More collective control of productive assets than social democracy; the family contains several institutional models.',
    society: 'Varies across socialist traditions and countries.',
    statePower: 'Varies widely: democratic-socialist traditions emphasize competitive democracy, while historical authoritarian socialist traditions concentrated state power.',
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
  {
    id: 'nationalism',
    name: 'Nationalism',
    coreIdea: 'The nation has special political value and a strong claim to collective self-determination.',
    economy: 'Can combine with market, welfare, socialist or other economic programs; nationalism alone does not determine left-right economics.',
    society: 'Can be civic and inclusive or ethnic/nativist and tradition-focused; those are important distinctions within nationalism.',
    statePower: 'Nationalism alone does not imply authoritarianism; democratic and authoritarian nationalist traditions both exist.',
    citizenshipAtBirth: 'Central to the civic-versus-descent question. Nationalist traditions can range from inclusive territorial membership to ancestry- or status-based membership.',
    abortion: 'Not a defining feature of nationalism; positions depend on the nationalism’s social, religious and host ideology.',
    world: 'Usually gives greater weight to national self-determination and sovereignty, though the degree of international cooperation varies.',
    evidenceIds: ['SEP-NATIONALISM', 'GLOBALCIT-BIRTHRIGHT'],
    criteria: [
      { axis: 'nationhood', importance: 'core', support: P, tension: N },
      { axis: 'world', importance: 'typical', support: MP, tension: SN },
    ],
  },
  {
    id: 'populism',
    name: 'Populism',
    coreIdea: 'Politics is framed as a conflict between ordinary or “real” people and a self-serving elite, with emphasis on the people’s general will.',
    economy: 'Can be economically left, right or mixed depending on the host ideology.',
    society: 'Varies with the host ideology; populism is not a complete social-policy program by itself.',
    statePower: 'Often majoritarian. Populism is not inherently authoritarian, but anti-pluralist populist governments can weaken checks and balances; authoritarian risk rises when democratic constraints are rejected.',
    citizenshipAtBirth: 'Not inherent to populism. Nativist populism is often more restrictive, while other populisms need not be.',
    abortion: 'Not inherent to populism; the stance generally follows the movement’s host ideology, religion and social-policy orientation.',
    world: 'Varies with the host ideology; some populists are sovereignty-focused while others are not.',
    evidenceIds: ['MUDDE-POPULISM', 'VDEM-POPULISM-AUTOCRATIZATION', 'IDEA-POPULISM-DEMOCRACY'],
    criteria: [
      { axis: 'populism', importance: 'core', support: P, tension: N },
    ],
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

export function assessPrimaryFamilies(input: CompatibilityInput): PrimaryFamilyMatch[] {
  const signals = collectAxisSignals(input);

  return primaryFamilies.map((family) => {
    let knownWeight = 0;
    let totalWeight = 0;
    let weightedPoints = 0;
    let knownCore = 0;

    for (const criterion of family.criteria) {
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

    const coverage = totalWeight === 0 ? 0 : Math.round((knownWeight / totalWeight) * 100);
    const score = knownCore === 0 || coverage < 50 ? null : Math.round(weightedPoints / knownWeight);
    const band = bandForScore(score);

    return {
      id: family.id,
      name: family.name,
      score,
      band: band.band,
      bandLabel: band.label,
      coverage,
      coreIdea: family.coreIdea,
    };
  }).sort((a, b) => {
    if (a.score === null && b.score === null) return a.name.localeCompare(b.name);
    if (a.score === null) return 1;
    if (b.score === null) return -1;
    return b.score - a.score || a.name.localeCompare(b.name);
  });
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
