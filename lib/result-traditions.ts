export type ResultTraditionId =
  | 'liberalism'
  | 'conservatism'
  | 'social-democracy'
  | 'socialism'
  | 'green-politics'
  | 'nationalism'
  | 'populism';

export type ResultTraditionKind = 'political-family' | 'cross-cutting-tendency';

export type ResultTradition = {
  id: ResultTraditionId;
  name: string;
  kind: ResultTraditionKind;
  coreIdea: string;
  economy: string;
  society: string;
  statePower: string;
  citizenshipAtBirth: string;
  abortion: string;
  world: string;
  evidenceIds: readonly string[];
};

/**
 * User-facing headline table.
 *
 * Keep this deliberately small. Politangle is a public political-literacy
 * product, not an exhaustive taxonomy of political philosophy. Narrower
 * traditions can appear as conditional nuances, but they do not become rows
 * here unless they materially improve understanding for a broad audience.
 */
export const resultTraditions: readonly ResultTradition[] = [
  {
    id: 'liberalism',
    name: 'Liberalism',
    kind: 'political-family',
    coreIdea: 'Individual liberty, equal legal rights and limits on concentrated political power.',
    economy: 'A broad family ranging from strongly market-oriented variants to liberal traditions with a larger welfare and regulatory role.',
    society: 'Generally gives substantial weight to personal autonomy and equal legal treatment.',
    statePower: 'Government power should be constrained by rights, rule of law, independent institutions and checks on executive power.',
    citizenshipAtBirth: 'Generally compatible with civic and legal membership, but the balance between birthplace and parentage varies by country and liberal tradition.',
    abortion: 'Contemporary liberal politics often gives greater weight to legal personal choice, but abortion is not a universal defining test of liberalism.',
    world: 'Often compatible with international cooperation, while ranging from cosmopolitan to more nationally focused liberal traditions.',
    evidenceIds: ['SEP-LIBERALISM', 'VDEM-LIBERAL-DEMOCRACY', 'GLOBALCIT-BIRTHRIGHT', 'PEW-ABORTION-GLOBAL'],
  },
  {
    id: 'conservatism',
    name: 'Conservatism',
    kind: 'political-family',
    coreIdea: 'Continuity, inherited institutions and caution toward rapid or abstractly designed change.',
    economy: 'Often market-friendly in contemporary politics, but economics is not the defining core; Christian-democratic conservatism includes a strong social-market tradition.',
    society: 'Usually places greater weight on continuity, established institutions and inherited social norms.',
    statePower: 'Often gives substantial weight to order and established authority; democratic conservatism remains compatible with constitutional limits and pluralist institutions.',
    citizenshipAtBirth: 'No single conservative rule: traditions differ over birthplace, descent, integration and established national membership.',
    abortion: 'Contemporary conservative constituencies are often more supportive of legal restrictions, but views vary substantially across countries and religious traditions.',
    world: 'Often sovereignty-conscious, but conservative traditions range from internationalist to strongly nation-centered.',
    evidenceIds: ['SEP-CONSERVATISM', 'CAMBRIDGE-CHRISTIAN-DEMOCRACY', 'VDEM-LIBERAL-DEMOCRACY', 'GLOBALCIT-BIRTHRIGHT', 'PEW-ABORTION-GLOBAL'],
  },
  {
    id: 'social-democracy',
    name: 'Social democracy',
    kind: 'political-family',
    coreIdea: 'A predominantly capitalist economy combined with regulation, welfare, public services and redistribution.',
    economy: 'Retains predominantly private ownership while using regulation, social insurance, public services and redistribution to pursue social justice.',
    society: 'Frequently socially liberal in contemporary politics, though social policy is not the tradition’s sole defining feature.',
    statePower: 'Supports capable public institutions operating within competitive democracy, rights, rule of law and pluralist constraints.',
    citizenshipAtBirth: 'Not a defining doctrine; citizenship-at-birth rules vary across countries.',
    abortion: 'Often supportive of legal access in contemporary social-democratic politics, but abortion is not the economic tradition’s defining principle.',
    world: 'Generally compatible with multilateral and international cooperation.',
    evidenceIds: ['ROUTLEDGE-SOCIAL-DEMOCRACY', 'SEP-SOCIALISM', 'VDEM-LIBERAL-DEMOCRACY', 'GLOBALCIT-BIRTHRIGHT', 'PEW-ABORTION-GLOBAL'],
  },
  {
    id: 'socialism',
    name: 'Socialism',
    kind: 'political-family',
    coreIdea: 'Economic power and productive assets should be subject to substantially more social, public, cooperative or worker control.',
    economy: 'Places substantially more weight than social democracy on social, public, cooperative or worker ownership and control of productive assets.',
    society: 'Varies across socialist traditions and countries.',
    statePower: 'Varies widely: democratic-socialist traditions emphasize political democracy, while historical authoritarian variants concentrated state power.',
    citizenshipAtBirth: 'Not a defining socialist doctrine; positions vary by national and ideological tradition.',
    abortion: 'Not a defining feature of socialism as an economic family; positions vary historically and cross-nationally.',
    world: 'Internationalist strands are influential, but socialist movements have also operated through nation-states and national projects.',
    evidenceIds: ['SEP-SOCIALISM', 'GLOBALCIT-BIRTHRIGHT', 'PEW-ABORTION-GLOBAL'],
  },
  {
    id: 'green-politics',
    name: 'Green politics',
    kind: 'political-family',
    coreIdea: 'Ecological limits and a sustainable society are central political priorities.',
    economy: 'Usually accepts substantial intervention or structural change when needed for ecological sustainability and related social goals.',
    society: 'Often associated with socially progressive and post-material positions.',
    statePower: 'Green political thought commonly stresses participation, decentralization and democratic accountability rather than concentrated authority.',
    citizenshipAtBirth: 'Not a defining green doctrine; citizenship law remains a separate institutional choice.',
    abortion: 'Not a defining green principle; contemporary green parties often align with broader personal-autonomy positions.',
    world: 'Strongly compatible with international cooperation on cross-border ecological problems.',
    evidenceIds: ['CAMBRIDGE-GREEN-POLITICS', 'GLOBALCIT-BIRTHRIGHT', 'PEW-ABORTION-GLOBAL'],
  },
  {
    id: 'nationalism',
    name: 'Nationalism',
    kind: 'cross-cutting-tendency',
    coreIdea: 'Gives special political value to the nation and national self-determination.',
    economy: 'No fixed economic programme; nationalist politics can combine with market, welfare, socialist or other economic approaches.',
    society: 'Varies from civic and inclusive forms to more culturally or ancestrally restrictive forms.',
    statePower: 'Nationalism is not inherently authoritarian. Its relationship to political authority depends on the host ideology and commitment to democratic constraints.',
    citizenshipAtBirth: 'Can support civic membership or place more weight on descent and inherited national membership; citizenship-at-birth systems themselves vary widely across countries.',
    abortion: 'Not a defining nationalist doctrine.',
    world: 'Places greater weight on national self-determination and sovereignty, while the degree of international cooperation varies.',
    evidenceIds: ['SEP-NATIONALISM', 'GLOBALCIT-BIRTHRIGHT', 'VDEM-LIBERAL-DEMOCRACY'],
  },
  {
    id: 'populism',
    name: 'Populism',
    kind: 'cross-cutting-tendency',
    coreIdea: 'Frames politics around ordinary or “real” people versus a self-serving elite and gives special weight to the people’s common will.',
    economy: 'No fixed economic programme; populism can attach to left-, right- or otherwise oriented host ideologies.',
    society: 'No fixed social programme; positions depend heavily on the host ideology.',
    statePower: 'Often majoritarian. Populism is not inherently authoritarian, but empirical research finds populist governments are associated with weakened checks and civil liberties; V-Dem finds anti-pluralism is a stronger predictor of autocratization than the populist label alone.',
    citizenshipAtBirth: 'No fixed position; it depends on the host ideology, including whether the populism is civic, nativist or otherwise.',
    abortion: 'No fixed position; it depends on the host ideology and coalition.',
    world: 'Often skeptical of institutions portrayed as overriding the popular will, but positions on sovereignty and international cooperation vary substantially.',
    evidenceIds: ['MUDDE-POPULISM', 'IDEA-POPULISM-DEMOCRACY', 'VDEM-POPULISM-AUTOCRATIZATION'],
  },
] as const;

export const resultTraditionById = new Map(resultTraditions.map((item) => [item.id, item]));
