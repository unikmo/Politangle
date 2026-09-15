export type CountrySource = { title: string; publisher: string; url: string; checkedAt: string };
export type CountryTimelineEvent = { year: string; title: string; text: string };
export type CountryProfile = {
  slug: string;
  name: string;
  status: 'editorial-draft' | 'reviewed';
  updatedAt: string;
  atAGlance: readonly [string, string][];
  power: readonly string[];
  vocabulary: readonly string[];
  timeline: readonly CountryTimelineEvent[];
  incomplete: readonly string[];
  sources: readonly CountrySource[];
};

const checkedAt = '2026-09-15';

export const countryProfiles: readonly CountryProfile[] = [
  {
    slug: 'united-states', name: 'United States', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Federal presidential constitutional republic'], ['Executive', 'President'], ['Legislature', 'Congress: House of Representatives and Senate'], ['Courts', 'Supreme Court and lower federal courts'], ['Territorial structure', 'Federal: power is divided between the federation and the states']],
    power: [
      'The Constitution divides federal authority among legislative, executive and judicial branches. Each can limit actions of the others.',
      'The president leads the executive but does not sit in Congress. Congress writes federal laws and controls federal taxation and spending; federal courts interpret laws and may find them unconstitutional.',
      'Federalism matters as much as the three-branch diagram: states retain substantial law-making and administrative power, including important responsibility for elections.',
    ],
    vocabulary: [
      'In US debate, “liberal” usually means centre-left or progressive. In much of Europe, liberal parties may be economically market-oriented and politically centrist.',
      '“Conservative” often joins social traditionalism, lower-tax politics, gun rights and a strong national identity. Those elements do not always travel together in other countries.',
    ],
    timeline: [
      { year: '1787–1789', title: 'Constitutional founding', text: 'The Constitution was drafted, ratified and brought into operation, creating the present federal framework.' },
      { year: '1865–1870', title: 'Reconstruction amendments', text: 'The 13th, 14th and 15th Amendments abolished slavery, defined national citizenship and prohibited racial discrimination in voting rights.' },
      { year: '1964–1965', title: 'Civil-rights legislation', text: 'Federal civil-rights and voting-rights laws strengthened legal protection against racial exclusion.' },
    ],
    incomplete: ['Current office holders', 'Current Congress and party representation', 'Latest federal election and turnout', 'Democracy, rights and civic-space dimensions', 'Long-term indicator trends'],
    sources: [
      { title: 'Branches of the U.S. government', publisher: 'USAGov', url: 'https://www.usa.gov/branches-of-government', checkedAt },
      { title: 'The Constitution of the United States', publisher: 'U.S. National Archives', url: 'https://www.archives.gov/founding-docs/constitution', checkedAt },
    ],
  },
  {
    slug: 'germany', name: 'Germany', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Federal parliamentary republic'], ['Head of state', 'Federal President'], ['Head of government', 'Federal Chancellor'], ['Legislature', 'Bundestag; Länder participate in federal legislation through the Bundesrat'], ['Territorial structure', 'Federal: 16 Länder']],
    power: [
      'The Bundestag elects the Federal Chancellor and scrutinizes the federal government. A chancellor can be removed only when the Bundestag elects a successor, the constructive vote of no confidence.',
      'The Bundesrat represents the Länder. Its consent is necessary for categories of federal law that particularly affect Länder responsibilities.',
      'The Federal Constitutional Court can review public authority against the Basic Law. Federalism, coalition government and constitutional review distribute power across several institutions.',
    ],
    vocabulary: [
      'German liberalism is strongly associated with civil liberty and, in party politics, often with market economics. It is not a synonym for the whole centre-left.',
      'Christian democracy combines a socially conservative inheritance with social-market economics and welfare commitments; it is not simply US-style small-government conservatism.',
    ],
    timeline: [
      { year: '1949', title: 'Basic Law and two German states', text: 'The Federal Republic adopted the Basic Law; a separate German Democratic Republic was established in the Soviet occupation zone.' },
      { year: '1989–1990', title: 'Peaceful revolution and reunification', text: 'The East German regime collapsed after mass protest and border opening; German unity followed in October 1990.' },
      { year: '2023', title: 'Electoral-law reform', text: 'A reform changed the mechanism and fixed the Bundestag at 630 seats; its application and constitutional review require precise treatment in the election section.' },
    ],
    incomplete: ['Current office holders', 'Current Bundestag composition and party profiles', 'Latest federal election and turnout', 'Democracy, rights and civic-space dimensions', 'Long-term indicator trends'],
    sources: [
      { title: 'Function and role of Parliament', publisher: 'German Bundestag', url: 'https://www.bundestag.de/en/parliament/function', checkedAt },
      { title: 'Basic Law for the Federal Republic of Germany', publisher: 'Federal Ministry of Justice', url: 'https://www.gesetze-im-internet.de/englisch_gg/', checkedAt },
    ],
  },
  {
    slug: 'france', name: 'France', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Unitary semi-presidential republic'], ['Head of state', 'President of the Republic'], ['Head of government', 'Prime Minister'], ['Legislature', 'Parliament: National Assembly and Senate'], ['Constitution', 'Constitution of the Fifth Republic (1958)']],
    power: [
      'Executive authority is divided between a directly elected president and a government led by the prime minister. The balance changes when the president and the National Assembly majority come from opposing camps.',
      'The government is responsible to the National Assembly. Parliament passes laws and scrutinizes government, while the president has important appointment, referendum, foreign-policy and dissolution powers defined by the Constitution.',
      'The Constitutional Council reviews legislation and election matters. France remains unitary, although decentralization gives territorial authorities elected bodies and defined responsibilities.',
    ],
    vocabulary: [
      'French “libéralisme” often points more directly to market economics than the US word “liberal”. The political centre also has its own republican and European integration traditions.',
      'The left–right division emerged from French revolutionary history, but contemporary competition also includes strong arguments over sovereignty, European integration, immigration and presidential power.',
    ],
    timeline: [
      { year: '1789', title: 'Revolution and rights declaration', text: 'The Revolution overturned the old regime; the Declaration of the Rights of Man and of the Citizen became a lasting constitutional reference.' },
      { year: '1958', title: 'Fifth Republic', text: 'A new constitution strengthened executive institutions and created the framework still in force.' },
      { year: '1962', title: 'Direct presidential election', text: 'A constitutional change established election of the president by direct universal suffrage.' },
      { year: '2000', title: 'Five-year presidency', text: 'The presidential term was reduced from seven to five years, changing the rhythm of presidential and parliamentary elections.' },
    ],
    incomplete: ['Current office holders', 'Current National Assembly and party profiles', 'Latest national elections and turnout', 'Democracy, rights and civic-space dimensions', 'Long-term indicator trends'],
    sources: [
      { title: 'Constitution of 4 October 1958', publisher: 'Constitutional Council', url: 'https://www.conseil-constitutionnel.fr/en/constitution-of-4-october-1958', checkedAt },
      { title: 'The institutions of the Fifth Republic', publisher: 'Vie publique', url: 'https://www.vie-publique.fr/fiches/19555-les-institutions-de-la-ve-republique', checkedAt },
    ],
  },
  {
    slug: 'united-kingdom', name: 'United Kingdom', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Unitary state with devolution; parliamentary constitutional monarchy'], ['Head of state', 'Monarch'], ['Head of government', 'Prime Minister'], ['Legislature', 'UK Parliament: House of Commons, House of Lords and the Crown'], ['Constitution', 'Uncodified: statutes, conventions, court judgments and other sources']],
    power: [
      'A government is formed by the person able to command confidence in the House of Commons, normally the leader of the party with a Commons majority.',
      'Parliament makes law, approves taxation and spending, debates public issues, and scrutinizes government. The appointed House of Lords revises legislation but the elected Commons has the decisive democratic role.',
      'Devolution gives Scotland, Wales and Northern Ireland their own institutions and powers. Parliamentary sovereignty remains a central legal principle, while conventions and political accountability shape how formal power is used.',
    ],
    vocabulary: [
      'British “liberal” politics has distinct roots in civil liberty, political reform, internationalism and social liberalism; it does not map neatly onto either major US party.',
      'Conservatism includes both market-liberal and communitarian or paternalist traditions. The constitutional importance of unionism and devolution also has no close US equivalent.',
    ],
    timeline: [
      { year: '1688–1689', title: 'Constitutional settlement', text: 'The Glorious Revolution and Bill of Rights strengthened Parliament and limited monarchical power.' },
      { year: '1918–1928', title: 'Democratic franchise expanded', text: 'Representation reforms created near-universal adult suffrage and then equal voting terms for women and men.' },
      { year: '1998–1999', title: 'Modern devolution', text: 'Legislation established or restored elected institutions in Scotland, Wales and Northern Ireland.' },
      { year: '2016–2020', title: 'Brexit', text: 'The 2016 referendum led to the United Kingdom leaving the European Union in 2020.' },
    ],
    incomplete: ['Current office holders', 'Current Commons composition and party profiles', 'Latest general election and turnout', 'Democracy, rights and civic-space dimensions', 'Long-term indicator trends'],
    sources: [
      { title: 'What is the role of Parliament?', publisher: 'UK Parliament', url: 'https://www.parliament.uk/about/how/role/', checkedAt },
      { title: 'The Cabinet Manual', publisher: 'UK Government', url: 'https://www.gov.uk/government/publications/cabinet-manual', checkedAt },
    ],
  },
] as const;

export const lockedCountryQueue = ['Netherlands', 'Denmark', 'Finland', 'Iceland', 'Norway', 'Sweden'] as const;

export function countryBySlug(slug: string) { return countryProfiles.find((country) => country.slug === slug); }
