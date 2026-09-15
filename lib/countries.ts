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
  {
    slug: 'netherlands', name: 'Netherlands', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Unitary parliamentary constitutional monarchy'], ['Head of state', 'Monarch'], ['Head of government', 'Prime Minister'], ['Legislature', 'States General: House of Representatives and Senate'], ['Elections', 'Proportional representation produces multiparty coalition government']],
    power: [
      'The government needs the confidence of the directly elected House of Representatives. The House debates and amends bills and holds ministers to account.',
      'The Senate is elected indirectly by provincial representatives. It cannot amend a bill: it accepts or rejects the text after the House has passed it.',
      'The Council of State advises on legislation and hears important administrative-law cases. Dutch courts cannot set aside an Act of Parliament because it conflicts with the Constitution.',
    ],
    vocabulary: [
      'Dutch liberal parties include both market-liberal and social-liberal traditions. “Liberal” therefore does not identify one fixed position on every issue.',
      '“Polder model” describes negotiation and compromise among government, employers and unions. “Pillarisation” refers to the older organisation of society into religious and political communities.',
    ],
    timeline: [
      { year: '1815', title: 'Kingdom established', text: 'The Kingdom of the Netherlands was created after the Napoleonic period.' },
      { year: '1848', title: 'Parliamentary constitution', text: 'Constitutional reform made ministers responsible to Parliament and strengthened representative government.' },
      { year: '1917–1919', title: 'Electoral settlement', text: 'Proportional representation and universal male suffrage were introduced; women gained full voting rights soon afterwards.' },
      { year: '1983', title: 'Constitution revised', text: 'A broad constitutional revision modernised rights and the organisation of government.' },
    ],
    incomplete: ['Current office holders', 'Current parliamentary composition and party profiles', 'Latest election and turnout', 'Democracy, rights and civic-space dimensions', 'Long-term indicator trends'],
    sources: [
      { title: 'Constitution and democracy', publisher: 'Government of the Netherlands', url: 'https://www.government.nl/topics/constitution-and-democracy', checkedAt },
      { title: 'How Parliament works', publisher: 'House of Representatives of the Netherlands', url: 'https://www.houseofrepresentatives.nl/how-parliament-works', checkedAt },
    ],
  },
  {
    slug: 'denmark', name: 'Denmark', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Unitary parliamentary constitutional monarchy'], ['Head of state', 'Monarch'], ['Head of government', 'Prime Minister'], ['Legislature', 'Folketing: one elected chamber'], ['Realm', 'Denmark, the Faroe Islands and Greenland; both territories have extensive self-government']],
    power: [
      'A government may remain in office unless a majority in the Folketing opposes it. This negative parliamentarism makes minority governments common.',
      'The Folketing passes laws, approves public finances and scrutinises ministers. Proportional elections usually require parties to negotiate support across blocs.',
      'The monarch has formal constitutional duties, but elected ministers exercise political authority. The Faroe Islands and Greenland manage many of their own affairs.',
    ],
    vocabulary: [
      'Denmark’s Venstre means “Left”, but today it is a liberal centre-right party. Historical party names can mislead readers who translate them literally.',
      'Danish social democracy developed a broad welfare state, while liberal, conservative and nationalist parties disagree over its scale, conditions and membership.',
    ],
    timeline: [
      { year: '1849', title: 'Constitutional monarchy', text: 'The first democratic constitution limited absolute monarchy and created representative institutions.' },
      { year: '1901', title: 'Parliamentary government', text: 'The principle that a government could not govern against a parliamentary majority became established.' },
      { year: '1953', title: 'Present constitutional framework', text: 'A new Constitutional Act created a single parliamentary chamber and changed succession rules.' },
      { year: '1973', title: 'European Community membership', text: 'Denmark joined the European Communities after a referendum.' },
    ],
    incomplete: ['Current office holders', 'Current Folketing composition and party profiles', 'Latest election and turnout', 'Democracy, rights and civic-space dimensions', 'Long-term indicator trends'],
    sources: [
      { title: 'The Danish democracy', publisher: 'The Danish Parliament', url: 'https://www.thedanishparliament.dk/en/democracy/the-danish-democracy', checkedAt },
      { title: 'The Constitutional Act of Denmark', publisher: 'The Danish Parliament', url: 'https://www.thedanishparliament.dk/en/democracy/the-constitutional-act-of-denmark', checkedAt },
    ],
  },
  {
    slug: 'finland', name: 'Finland', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Unitary parliamentary republic'], ['Head of state', 'President of the Republic'], ['Head of government', 'Prime Minister'], ['Legislature', 'Eduskunta: one elected chamber'], ['Territorial structure', 'Unitary state; Åland has constitutionally protected autonomy']],
    power: [
      'Parliament elects the prime minister, passes laws, approves the budget and supervises the government. Coalition governments are the norm.',
      'The president directs foreign policy together with the government and is commander-in-chief, while the prime minister leads domestic government and European Union policy.',
      'Parliament’s Constitutional Law Committee reviews whether proposed laws comply with the Constitution. Courts may give the Constitution priority in a clear conflict.',
    ],
    vocabulary: [
      'The Centre Party grew from an agrarian movement but is not confined to farming. It combines regional decentralisation with positions that vary across economic and social questions.',
      'The National Coalition Party is liberal-conservative and centre-right; its name does not mean a temporary coalition of all parties.',
    ],
    timeline: [
      { year: '1906', title: 'Parliamentary reform', text: 'Finland created a unicameral parliament and introduced universal and equal suffrage.' },
      { year: '1917–1919', title: 'Independence and republic', text: 'Finland declared independence and then adopted a republican constitution.' },
      { year: '1995', title: 'European Union membership', text: 'Finland joined the European Union after a consultative referendum.' },
      { year: '2000', title: 'Unified Constitution', text: 'A new Constitution strengthened parliamentary government and brought earlier constitutional acts together.' },
    ],
    incomplete: ['Current office holders', 'Current Eduskunta composition and party profiles', 'Latest election and turnout', 'Democracy, rights and civic-space dimensions', 'Long-term indicator trends'],
    sources: [
      { title: 'Constitution of Finland', publisher: 'Finlex', url: 'https://www.finlex.fi/en/legislation/collection/1999/731', checkedAt },
      { title: 'Duties of Parliament', publisher: 'Parliament of Finland', url: 'https://www.eduskunta.fi/EN/naineduskuntatoimii/eduskunnan_tehtavat/Pages/default.aspx', checkedAt },
    ],
  },
  {
    slug: 'iceland', name: 'Iceland', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Unitary parliamentary republic'], ['Head of state', 'President of Iceland'], ['Head of government', 'Prime Minister'], ['Legislature', 'Althingi: one elected chamber'], ['Elections', 'Proportional representation in multi-member constituencies']],
    power: [
      'The government must retain the confidence of the Althingi. Coalition government is usual because proportional elections produce several parliamentary parties.',
      'The president is head of state and normally acts on ministerial advice, but may refuse to sign a law and send it to a national vote.',
      'The Althingi passes laws and controls public finances. Courts are independent and may review whether legislation is consistent with the Constitution.',
    ],
    vocabulary: [
      'The Independence Party combines conservative and market-liberal traditions; its name refers to Icelandic history rather than a present campaign for separation.',
      'Icelandic party competition also crosses older urban–rural, environmental, welfare and European-integration divisions, so one left–right line is incomplete.',
    ],
    timeline: [
      { year: '930', title: 'Althing established', text: 'The Althing began as a national assembly and is among the world’s oldest parliamentary institutions.' },
      { year: '1918', title: 'Sovereign kingdom', text: 'Iceland became a sovereign state in a personal union with Denmark.' },
      { year: '1944', title: 'Republic founded', text: 'A referendum ended the union with Denmark and established the Republic of Iceland.' },
      { year: '1994', title: 'European Economic Area', text: 'Iceland entered the European Economic Area while remaining outside the European Union.' },
    ],
    incomplete: ['Current office holders', 'Current Althingi composition and party profiles', 'Latest election and turnout', 'Democracy, rights and civic-space dimensions', 'Long-term indicator trends'],
    sources: [
      { title: 'Constitution', publisher: 'Government of Iceland', url: 'https://www.government.is/topics/governance-and-national-symbols/constitution/', checkedAt },
      { title: 'About the Althingi', publisher: 'Althingi', url: 'https://www.althingi.is/english/', checkedAt },
    ],
  },
  {
    slug: 'norway', name: 'Norway', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Unitary parliamentary constitutional monarchy'], ['Head of state', 'Monarch'], ['Head of government', 'Prime Minister'], ['Legislature', 'Storting: one elected chamber'], ['Elections', 'Proportional representation across electoral districts']],
    power: [
      'A government may remain in office unless a parliamentary majority votes it down. Minority and coalition governments are therefore both common.',
      'The Storting passes laws, approves taxation and spending, and scrutinises the government. The monarch performs formal duties while ministers exercise political power.',
      'Courts may review laws against the Constitution. Local government and the Sámi Parliament add important territorial and Indigenous dimensions to national institutions.',
    ],
    vocabulary: [
      'Norway’s Centre Party grew from agrarian politics and now emphasises rural interests and decentralisation; “centre” does not mean neutral on every issue.',
      'The Progress Party mixes lower-tax and market positions with restrictive immigration politics. These elements should be examined separately rather than treated as one ideology.',
    ],
    timeline: [
      { year: '1814', title: 'Constitution adopted', text: 'Norway adopted its Constitution at Eidsvoll and entered a union with Sweden.' },
      { year: '1884', title: 'Parliamentarism established', text: 'A political struggle established that governments depended on parliamentary support.' },
      { year: '1905', title: 'Independent monarchy', text: 'The union with Sweden ended and Norway became fully independent.' },
      { year: '1972 and 1994', title: 'European Union rejected', text: 'Norwegian voters rejected European Community or European Union membership in two referendums.' },
    ],
    incomplete: ['Current office holders', 'Current Storting composition and party profiles', 'Latest election and turnout', 'Democracy, rights and civic-space dimensions', 'Long-term indicator trends'],
    sources: [
      { title: 'About the Storting', publisher: 'Stortinget', url: 'https://www.stortinget.no/en/In-English/About-the-Storting/', checkedAt },
      { title: 'The government at work', publisher: 'Government of Norway', url: 'https://www.regjeringen.no/en/the-government/the-government-at-work1/id2564958/', checkedAt },
    ],
  },
  {
    slug: 'sweden', name: 'Sweden', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Unitary parliamentary constitutional monarchy'], ['Head of state', 'Monarch'], ['Head of government', 'Prime Minister'], ['Legislature', 'Riksdag: one elected chamber'], ['Territorial structure', 'Unitary state with powerful elected municipalities and regions']],
    power: [
      'The Speaker proposes a prime minister. The candidate is accepted unless a majority of all members of the Riksdag votes against them.',
      'The monarch has ceremonial duties and no political power. The Riksdag passes laws and budgets, examines government, and can remove a minister through a no-confidence vote.',
      'Public agencies are organisationally separate from ministries. Ministers may set general policy but may not direct an agency’s decision in an individual case.',
    ],
    vocabulary: [
      'The Social Democrats shaped the “people’s home” welfare tradition, but Swedish welfare policy is debated and changed by parties across the political spectrum.',
      'The Moderates are liberal-conservative. The Sweden Democrats combine nationalism and social conservatism; these should not be confused merely because both sit on the right.',
    ],
    timeline: [
      { year: '1809', title: 'Constitutional settlement', text: 'A new Instrument of Government limited royal authority and divided public power.' },
      { year: '1921', title: 'Equal national suffrage', text: 'Women and men voted on equal terms in a national parliamentary election.' },
      { year: '1974–1975', title: 'Modern parliamentary constitution', text: 'A new Instrument of Government confirmed parliamentary democracy and the monarch’s ceremonial role.' },
      { year: '1995', title: 'European Union membership', text: 'Sweden joined the European Union after a referendum.' },
    ],
    incomplete: ['Current office holders', 'Current Riksdag composition and party profiles', 'Latest election and turnout', 'Democracy, rights and civic-space dimensions', 'Long-term indicator trends'],
    sources: [
      { title: 'How Sweden is governed', publisher: 'Government Offices of Sweden', url: 'https://www.government.se/how-sweden-is-governed/', checkedAt },
      { title: 'The Constitution', publisher: 'Swedish Parliament', url: 'https://www.riksdagen.se/en/how-the-riksdag-works/democracy/the-constitution/', checkedAt },
    ],
  },
] as const;

export const lockedCountryQueue: readonly string[] = [];

export function countryBySlug(slug: string) { return countryProfiles.find((country) => country.slug === slug); }
