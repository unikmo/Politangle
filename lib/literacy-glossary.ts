import { evidenceById } from './evidence';

export type GlossaryCategory = 'Political families' | 'Democracy and power' | 'Economy and society' | 'Reading political patterns';

export type GlossaryEntry = {
  slug: string;
  term: string;
  category: GlossaryCategory;
  shortDefinition: string;
  explanation: string;
  evidenceIds: readonly string[];
  tags: readonly string[];
};

export const literacyGlossary: readonly GlossaryEntry[] = [
  {
    slug: 'liberalism', term: 'Liberalism', category: 'Political families',
    shortDefinition: 'A broad political family that puts individual freedom and equal rights near the center.',
    explanation: 'Liberals disagree about how much government should do. Some mainly want limits on government. Others support public action that helps people use their freedom in practice.',
    evidenceIds: ['SEP-LIBERALISM'], tags: ['liberal', 'liberalism'],
  },
  {
    slug: 'classical-liberalism', term: 'Classical liberalism', category: 'Political families',
    shortDefinition: 'A liberal tradition favoring individual freedom, limited government, private property and open markets.',
    explanation: 'Classical liberals still accept a state, especially to protect rights, contracts and security. They usually give it a smaller economic role than social liberals do.',
    evidenceIds: ['SEP-LIBERALISM', 'SEP-LIBERTARIANISM'], tags: ['classical-liberalism', 'markets'],
  },
  {
    slug: 'social-liberalism', term: 'Social liberalism', category: 'Political families',
    shortDefinition: 'A liberal tradition that accepts public action to make freedom more real and widely usable.',
    explanation: 'Social liberals may support education, social insurance and market rules. They see freedom as more than being left alone: people also need real opportunities.',
    evidenceIds: ['SEP-LIBERALISM'], tags: ['social-liberalism', 'positive-liberty'],
  },
  {
    slug: 'libertarianism', term: 'Libertarianism', category: 'Political families',
    shortDefinition: 'A political family that gives very strong priority to individual choice and limits on force.',
    explanation: 'Many libertarians strongly defend private property and voluntary exchange. Libertarian views differ on how much government, if any, is needed to protect freedom.',
    evidenceIds: ['SEP-LIBERTARIANISM'], tags: ['libertarianism', 'limited-government'],
  },
  {
    slug: 'conservatism', term: 'Conservatism', category: 'Political families',
    shortDefinition: 'A political family that values continuity, inherited institutions and cautious rather than sudden change.',
    explanation: 'Conservatives are not against every reform. They tend to ask what existing institutions protect and what rapid change might unintentionally damage.',
    evidenceIds: ['SEP-CONSERVATISM'], tags: ['conservatism', 'gradual-change', 'social-duty'],
  },
  {
    slug: 'christian-democracy', term: 'Christian democracy', category: 'Political families',
    shortDefinition: 'A tradition combining Christian social ideas, democracy, private property, welfare and shared responsibility.',
    explanation: 'Christian democracy often supports a social market economy and help for families and communities. It also values decisions being made close to the people affected.',
    evidenceIds: ['CAMBRIDGE-CHRISTIAN-DEMOCRACY', 'CAMBRIDGE-CD-RELIGIOUS-INSPIRATION'], tags: ['christian-democracy', 'social-market'],
  },
  {
    slug: 'social-democracy', term: 'Social democracy', category: 'Political families',
    shortDefinition: 'A tradition that keeps mostly private businesses while using democracy, welfare and regulation to reduce inequality.',
    explanation: 'Modern social democrats usually aim to reform capitalism rather than replace it. Public services, worker protection and redistribution are common parts of the approach.',
    evidenceIds: ['ROUTLEDGE-SOCIAL-DEMOCRACY', 'SEP-SOCIALISM'], tags: ['social-democracy', 'redistribution', 'capitalism'],
  },
  {
    slug: 'democratic-socialism', term: 'Democratic socialism', category: 'Political families',
    shortDefinition: 'A socialist tradition combining political democracy with much more public, cooperative or worker ownership.',
    explanation: 'Democratic socialists support democratic rights and elections. Compared with modern social democracy, they usually want ownership itself to change more deeply.',
    evidenceIds: ['SEP-SOCIALISM'], tags: ['democratic-socialism', 'social-ownership'],
  },
  {
    slug: 'socialism', term: 'Socialism', category: 'Political families',
    shortDefinition: 'A broad family seeking greater social control of economic resources and less domination through private ownership.',
    explanation: 'Socialism includes many different models. Social control can mean public, cooperative, community or worker ownership; it does not describe one single government system.',
    evidenceIds: ['SEP-SOCIALISM'], tags: ['socialism', 'social-ownership'],
  },
  {
    slug: 'communism', term: 'Communism', category: 'Political families',
    shortDefinition: 'A broad tradition aiming for a society without economic classes and private ownership of major production.',
    explanation: 'Communist ideas have taken different forms. The broad goal should not be confused with every historical government that called itself communist.',
    evidenceIds: ['OXFORD-COMMUNISM'], tags: ['communism', 'marxism'],
  },
  {
    slug: 'marxism-leninism', term: 'Marxism–Leninism', category: 'Political families',
    shortDefinition: 'A communist doctrine giving a disciplined revolutionary party a leading role in taking and organizing power.',
    explanation: 'It is a specific historical doctrine, not another name for every communist or socialist idea. Its party-led route to change is a defining feature.',
    evidenceIds: ['BRITANNICA-MARXISM-LENINISM', 'OXFORD-COMMUNISM'], tags: ['marxism-leninism', 'vanguard-party'],
  },
  {
    slug: 'anarchism', term: 'Anarchism', category: 'Political families',
    shortDefinition: 'A political family that questions imposed hierarchy and favors voluntary cooperation and self-rule.',
    explanation: 'Anarchists often support local organization, mutual aid and direct participation. They disagree about markets, property and the best way to organize economic life.',
    evidenceIds: ['SEP-ANARCHISM'], tags: ['anarchism', 'mutual-aid', 'decentralization'],
  },
  {
    slug: 'green-politics', term: 'Green politics', category: 'Political families',
    shortDefinition: 'A political family that puts ecological limits and a sustainable society at the center.',
    explanation: 'Green politics often also supports social justice, participation and local decision-making. Green movements can disagree about markets and ownership.',
    evidenceIds: ['CAMBRIDGE-GREEN-POLITICS'], tags: ['green-politics', 'ecological-limits', 'ecology'],
  },
  {
    slug: 'nationalism', term: 'Nationalism', category: 'Political families',
    shortDefinition: 'A family of beliefs that gives the nation special political value and often supports national self-government.',
    explanation: 'Nationalism can define belonging through citizenship, culture or ancestry. It can combine with liberal, conservative, socialist and other political traditions.',
    evidenceIds: ['SEP-NATIONALISM'], tags: ['nationalism', 'self-determination', 'national-sovereignty'],
  },
  {
    slug: 'populism', term: 'Populism', category: 'Political families',
    shortDefinition: 'A way of framing politics as a struggle between ordinary people and a corrupt powerful group.',
    explanation: 'Populism does not provide a complete economic or social program by itself. It can attach to movements on the left, right or elsewhere.',
    evidenceIds: ['MUDDE-POPULISM'], tags: ['populism', 'people-elite', 'left-populism'],
  },
  {
    slug: 'radical-and-extreme-right', term: 'Radical right and extreme right', category: 'Political families',
    shortDefinition: 'Two related labels separated mainly by whether a movement accepts or rejects democracy itself.',
    explanation: 'The radical right may contest liberal rights and pluralism while competing in elections. The extreme right rejects democracy more openly, including real opposition.',
    evidenceIds: ['MUDDE-RADICAL-RIGHT', 'PIRRO-FAR-RIGHT'], tags: ['radical-right', 'extreme-right', 'populist-radical-right'],
  },
  {
    slug: 'fascism', term: 'Fascism', category: 'Political families',
    shortDefinition: 'An anti-democratic, ultranationalist tradition that puts the nation above individual rights and political opposition.',
    explanation: 'Fascist movements seek forceful national unity, reject equal democratic competition and accept violence or repression against perceived enemies.',
    evidenceIds: ['USHMM-FASCISM'], tags: ['fascism', 'ultranationalism'],
  },
  {
    slug: 'liberal-democracy', term: 'Liberal democracy', category: 'Democracy and power',
    shortDefinition: 'A system combining real elections with civil rights, rule of law and checks on leaders.',
    explanation: 'Elections matter, but they are not enough. People also need protected freedoms, legal equality and institutions able to limit those in power.',
    evidenceIds: ['VDEM-LIBERAL-DEMOCRACY'], tags: ['liberal-democracy', 'checks-and-balances'],
  },
  {
    slug: 'authoritarianism', term: 'Authoritarianism', category: 'Democracy and power',
    shortDefinition: 'A system where rulers concentrate power and prevent people from freely replacing them.',
    explanation: 'Authoritarian systems block real political competition and weaken checks on rulers. Some still leave parts of private and social life alone.',
    evidenceIds: ['VDEM-REGIMES-OF-THE-WORLD'], tags: ['authoritarianism', 'electoral-authoritarianism'],
  },
  {
    slug: 'totalitarianism', term: 'Totalitarianism', category: 'Democracy and power',
    shortDefinition: 'An extreme form of rule seeking control over politics, society and much of private life.',
    explanation: 'Totalitarian rule goes beyond stopping opposition. It tries to reshape society through a ruling ideology, mass control and deep intrusion into personal life.',
    evidenceIds: ['OXFORD-TOTALITARIANISM'], tags: ['totalitarianism', 'authoritarian-totalitarian'],
  },
  {
    slug: 'pluralism', term: 'Pluralism', category: 'Democracy and power',
    shortDefinition: 'The acceptance that different groups and viewpoints may organize, compete and share political life.',
    explanation: 'Pluralism treats disagreement as normal. No one party or group is assumed to speak for every legitimate member of society.',
    evidenceIds: ['VDEM-LIBERAL-DEMOCRACY', 'IDEA-POPULISM-DEMOCRACY'], tags: ['pluralism', 'anti-pluralism'],
  },
  {
    slug: 'rule-of-law', term: 'Rule of law', category: 'Democracy and power',
    shortDefinition: 'The principle that rulers and citizens are bound by public laws applied through independent institutions.',
    explanation: 'Rule of law limits arbitrary power. Leaders cannot simply ignore legal limits or use the courts only against their opponents.',
    evidenceIds: ['VDEM-LIBERAL-DEMOCRACY'], tags: ['rule-of-law', 'constitutionalism'],
  },
  {
    slug: 'subsidiarity', term: 'Subsidiarity', category: 'Democracy and power',
    shortDefinition: 'The idea that decisions should be made at the lowest level that can handle them well.',
    explanation: 'A city should decide local matters when it can. Larger levels step in when a problem cannot be solved effectively closer to home.',
    evidenceIds: ['CAMBRIDGE-CD-SUBSIDIARITY'], tags: ['subsidiarity', 'decentralization'],
  },
  {
    slug: 'social-ownership', term: 'Social ownership', category: 'Economy and society',
    shortDefinition: 'Ownership or control by the public, workers, cooperatives or communities rather than private investors alone.',
    explanation: 'Social ownership is broader than government ownership. A worker cooperative, a community trust and a public company are different possible forms.',
    evidenceIds: ['SEP-SOCIALISM'], tags: ['social-ownership', 'worker-ownership', 'cooperative-ownership'],
  },
  {
    slug: 'public-ownership', term: 'Public ownership', category: 'Economy and society',
    shortDefinition: 'Ownership by the state or another public body on behalf of the public.',
    explanation: 'A service can be publicly funded without being publicly owned. Ownership asks who controls the organization, not only who pays for it.',
    evidenceIds: ['SEP-SOCIALISM', 'WVS-W7-DOCUMENTATION'], tags: ['public-ownership', 'public-provision'],
  },
  {
    slug: 'redistribution', term: 'Redistribution', category: 'Economy and society',
    shortDefinition: 'Using taxes, benefits or services to change how income and resources are shared.',
    explanation: 'Redistribution exists in many market economies and is not enough by itself to identify socialism. The ownership system may remain mostly private.',
    evidenceIds: ['ROUTLEDGE-SOCIAL-DEMOCRACY', 'CHES-ECON-GALTAN'], tags: ['redistribution'],
  },
  {
    slug: 'left-and-right', term: 'Left and right', category: 'Reading political patterns',
    shortDefinition: 'Useful political shortcuts whose meaning changes somewhat across countries, issues and historical periods.',
    explanation: 'One left–right line can hide important combinations. Economic views, social values, national questions and attitudes toward power do not always move together.',
    evidenceIds: ['CHES-2024', 'CHES-ECON-GALTAN'], tags: ['left-right', 'economic-left-right'],
  },
  {
    slug: 'political-spectrum', term: 'Political spectrum', category: 'Reading political patterns',
    shortDefinition: 'A way of arranging political positions so similarities and differences become easier to see.',
    explanation: 'A spectrum is a model, not the political world itself. Different models highlight different questions and can place the same person differently.',
    evidenceIds: ['CHES-2024'], tags: ['political-spectrum', 'measurement'],
  },
  {
    slug: 'multidimensional-profile', term: 'Multidimensional political profile', category: 'Reading political patterns',
    shortDefinition: 'A profile that keeps several kinds of political views separate instead of reducing them to one score.',
    explanation: 'Two people can share the same average while disagreeing sharply on specific dimensions. Showing each dimension preserves that useful difference.',
    evidenceIds: ['CHES-2024', 'CHES-ECON-GALTAN'], tags: ['multidimensional-patterns', 'political-patterns', 'mixed-pattern', 'dimension-scores'],
  },
] as const;

export const glossaryBySlug = new Map(literacyGlossary.map((entry) => [entry.slug, entry]));

export function glossaryEntriesForTags(tags: readonly string[], limit = 3) {
  const wanted = new Set(tags);
  return literacyGlossary.filter((entry) => entry.tags.some((tag) => wanted.has(tag))).slice(0, limit);
}

export function glossaryEvidence(entry: GlossaryEntry) {
  return entry.evidenceIds.map((id) => evidenceById.get(id)).filter((source): source is NonNullable<typeof source> => Boolean(source));
}
