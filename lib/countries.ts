import { additionalCountryProfiles } from './countries-expansion';
import { wave3CountryProfiles } from './countries-wave3';

export type CountrySource = { title: string; publisher: string; url: string; checkedAt: string };
export type CountryTimelineEvent = { year: string; title: string; text: string };
export type CountryCurrentSnapshot = {
  asOf: string;
  officeholders: readonly [string, string][];
  election: {
    title: string;
    date: string;
    turnout: string;
    summary: string;
    representation: readonly [string, string][];
  };
  rights: {
    provider: string;
    edition: string;
    score: string;
    status: string;
    comparison: string;
    note: string;
    url: string;
  };
  trends: readonly string[];
};
export type CountryProfile = {
  slug: string;
  name: string;
  status: 'editorial-draft' | 'reviewed';
  updatedAt: string;
  atAGlance: readonly [string, string][];
  power: readonly string[];
  vocabulary: readonly string[];
  timeline: readonly CountryTimelineEvent[];
  current?: CountryCurrentSnapshot;
  incomplete: readonly string[];
  sources: readonly CountrySource[];
};

const checkedAt = '2026-09-15';

const initialCountryProfiles: readonly CountryProfile[] = [
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
  {
    slug: 'spain', name: 'Spain', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Decentralised parliamentary constitutional monarchy'], ['Head of state', 'Monarch'], ['Head of government', 'Prime Minister'], ['Legislature', 'Cortes Generales: Congress of Deputies and Senate'], ['Territorial structure', '17 autonomous communities and two autonomous cities']],
    power: [
      'The Congress of Deputies chooses the prime minister through an investiture vote and can remove a government only by electing a replacement.',
      'Congress and Senate make national law, but Congress has the stronger role in forming government and resolving many legislative disagreements.',
      'Autonomous communities govern important areas such as health and education. The Constitutional Court decides disputes about constitutional rights and the division of powers.',
    ],
    vocabulary: [
      'Spanish politics cannot be understood through left and right alone. Parties also disagree over how much authority should belong to Spain, its regions and its historic nationalities.',
      'Regional nationalism may be left-wing, centrist or conservative. Supporting Catalan or Basque autonomy does not by itself identify a complete economic or social ideology.',
    ],
    timeline: [
      { year: '1936–1939', title: 'Civil War', text: 'Civil war ended with Francisco Franco’s dictatorship, which lasted until his death in 1975.' },
      { year: '1978', title: 'Democratic Constitution', text: 'Voters approved a constitution establishing parliamentary democracy, rights, autonomous communities and a constitutional monarchy.' },
      { year: '1986', title: 'European Community membership', text: 'Spain joined the European Communities, now the European Union.' },
      { year: '2017', title: 'Catalan constitutional crisis', text: 'An unauthorised independence vote and the national response exposed deep disputes over sovereignty and territorial power.' },
    ],
    current: {
      asOf: checkedAt,
      officeholders: [['Head of state', 'King Felipe VI'], ['Head of government', 'Pedro Sánchez, Spanish Socialist Workers’ Party (PSOE)']],
      election: {
        title: '2023 general election', date: '23 July 2023', turnout: '66.59% of registered voters',
        summary: 'No party won a majority in the 350-seat Congress. The People’s Party won the most seats, but Pedro Sánchez secured parliamentary investiture for a coalition government led by PSOE.',
        representation: [['People’s Party (PP)', '137 seats'], ['Spanish Socialist Workers’ Party (PSOE)', '121 seats'], ['Vox', '33 seats'], ['Sumar', '31 seats'], ['Regional and other parties', '28 seats']],
      },
      rights: {
        provider: 'Freedom House', edition: 'Freedom in the World 2026', score: '91/100', status: 'Free', comparison: 'Up from 90/100 in the 2025 edition',
        note: 'This is one organisation’s assessment, not Politangle’s verdict. It combines 40 political-rights points and 60 civil-liberties points.',
        url: 'https://freedomhouse.org/country/spain/freedom-world/2026',
      },
      trends: [
        'National politics remains fragmented: forming a government can depend on agreements with smaller regional parties as well as nationwide parties.',
        'The 2026 Freedom House score rose by one point after progress in filling judicial vacancies, while its report continued to flag corruption and restrictions affecting expression and assembly.',
      ],
    },
    incomplete: ['Independent editorial sign-off', 'Second-source review of current political facts', 'Spanish, German and French localization'],
    sources: [
      { title: 'The Spanish Constitution', publisher: 'Congress of Deputies', url: 'https://www.congreso.es/constitucion/ficheros/c78/cons_ingl.pdf', checkedAt },
      { title: 'The State organisation', publisher: 'La Moncloa, Government of Spain', url: 'https://www.lamoncloa.gob.es/lang/en/espana/Paginas/state-organization.aspx', checkedAt },
      { title: 'Government of Spain', publisher: 'La Moncloa', url: 'https://www.lamoncloa.gob.es/lang/en/gobierno/Paginas/index.aspx', checkedAt },
      { title: '2023 general election results', publisher: 'Ministry of the Interior', url: 'https://resultados.generales23j.es/es/inicio/0', checkedAt },
      { title: 'Freedom in the World 2026: Spain', publisher: 'Freedom House', url: 'https://freedomhouse.org/country/spain/freedom-world/2026', checkedAt },
    ],
  },
  {
    slug: 'mexico', name: 'Mexico', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Federal presidential republic'], ['Executive', 'President'], ['Legislature', 'Congress of the Union: Chamber of Deputies and Senate'], ['Courts', 'Supreme Court and federal judiciary'], ['Territorial structure', 'Federal: 31 states and Mexico City']],
    power: [
      'The president leads the executive separately from Congress and is elected for one six-year term without re-election.',
      'Congress makes federal law, approves taxation and spending, and scrutinises government. Deputies and senators are chosen through a mixture of district and proportional seats.',
      'States have their own constitutions and elected institutions. The Supreme Court conducts constitutional review, while autonomous electoral bodies administer and supervise elections.',
    ],
    vocabulary: [
      'Mexico’s revolutionary and nationalist traditions mixed social reform, state leadership and business interests. Party names inherited from that history do not map neatly onto a European left–right line.',
      'Criticism of corruption, tax privilege or concentrated influence is not automatically populism. Populism appears when politics is framed as one morally pure people against an entirely illegitimate elite.',
    ],
    timeline: [
      { year: '1910–1917', title: 'Revolution and Constitution', text: 'Revolutionary conflict led to the 1917 Constitution, which included federal institutions and major social rights.' },
      { year: '1929–2000', title: 'Long dominant-party era', text: 'One political organisation and its successors dominated the presidency for seven decades while elections and institutions gradually became more competitive.' },
      { year: '1990–1996', title: 'Electoral institutions strengthened', text: 'Reforms created and then increased the independence of the national electoral authority.' },
      { year: '2000', title: 'Presidential alternation', text: 'An opposition candidate won the presidency, ending seven decades of uninterrupted governing-party control.' },
    ],
    current: {
      asOf: checkedAt,
      officeholders: [['President', 'Claudia Sheinbaum, National Regeneration Movement (Morena)'], ['Presidential term', '1 October 2024 to 30 September 2030; immediate re-election is prohibited']],
      election: {
        title: '2024 federal election', date: '2 June 2024', turnout: '61.05% in the presidential election',
        summary: 'Claudia Sheinbaum won the presidency with about 59.8% of valid votes. Morena and its Green Party and Labour Party allies also won a large majority in the Chamber of Deputies.',
        representation: [['Morena', '236 Chamber seats allocated after the election'], ['Ecologist Green Party (PVEM)', '77 seats'], ['Labour Party (PT)', '51 seats'], ['National Action Party (PAN)', '72 seats'], ['Institutional Revolutionary Party (PRI)', '35 seats'], ['Citizens’ Movement (MC)', '27 seats'], ['Other', '2 seats']],
      },
      rights: {
        provider: 'Freedom House', edition: 'Freedom in the World 2026', score: '58/100', status: 'Partly Free', comparison: 'Down from 59/100 in the 2025 edition',
        note: 'This is one organisation’s assessment, not Politangle’s verdict. Its 2026 report highlights competitive elections alongside serious rule-of-law, violence, corruption and impunity concerns.',
        url: 'https://freedomhouse.org/country/mexico/freedom-world/2026',
      },
      trends: [
        'The 2024 election strengthened Morena and its allies. Concentrated electoral power should be analysed separately from whether particular policies are popular or effective.',
        'Freedom House reduced Mexico’s score by one point in 2026 and specifically linked the change to concerns about judicial independence following the new judicial-election system.',
        'Criticising corruption, tax privilege, organised-crime influence or unequal access to power is not itself populist. The populist move is to claim that one morally pure people has a single will and that opponents are inherently illegitimate.',
      ],
    },
    incomplete: ['Independent editorial sign-off', 'Second-source review of current political facts', 'Spanish, German and French localization'],
    sources: [
      { title: 'Political Constitution of the United Mexican States', publisher: 'Chamber of Deputies', url: 'https://www.diputados.gob.mx/LeyesBiblio/pdf/CPEUM.pdf', checkedAt },
      { title: 'Mexican electoral system', publisher: 'Instituto Nacional Electoral', url: 'https://www.ine.mx/', checkedAt },
      { title: 'Presidency of Mexico', publisher: 'Government of Mexico', url: 'https://www.gob.mx/presidencia', checkedAt },
      { title: '2024 district counts', publisher: 'Instituto Nacional Electoral', url: 'https://computos2024.ine.mx/presidencia/nacional/candidatura', checkedAt },
      { title: 'Freedom in the World 2026: Mexico', publisher: 'Freedom House', url: 'https://freedomhouse.org/country/mexico/freedom-world/2026', checkedAt },
    ],
  },
  {
    slug: 'canada', name: 'Canada', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Federal parliamentary constitutional monarchy'], ['Head of state', 'Monarch, represented federally by the Governor General'], ['Head of government', 'Prime Minister'], ['Legislature', 'Parliament: Crown, Senate and House of Commons'], ['Territorial structure', 'Federal: 10 provinces and three territories']],
    power: [
      'A government must retain the confidence of the elected House of Commons. The prime minister and cabinet exercise executive authority while remaining answerable to Parliament.',
      'The appointed Senate reviews legislation and represents regions, but the House of Commons has the central democratic role and exclusive priority over taxation and spending bills.',
      'The Constitution divides powers between federal and provincial governments. Courts may review legislation under the Constitution and the Canadian Charter of Rights and Freedoms.',
    ],
    vocabulary: [
      'The Liberal Party is a specific centrist-to-centre-left organisation; “liberal” can also describe a broader tradition of rights, markets or social reform.',
      'Canadian conservatism includes market-oriented, social-conservative, regional and older communitarian traditions. Quebec nationalism and Indigenous self-government add separate political dimensions.',
    ],
    timeline: [
      { year: '1867', title: 'Confederation', text: 'The Constitution Act created the Canadian federation and its parliamentary institutions.' },
      { year: '1931', title: 'Legislative independence', text: 'The Statute of Westminster confirmed Canada’s legislative autonomy from the United Kingdom.' },
      { year: '1982', title: 'Constitution and Charter', text: 'Canada patriated its Constitution and added the Charter of Rights and Freedoms.' },
      { year: '1999', title: 'Nunavut created', text: 'Nunavut became a territory following a major Indigenous land-claim agreement.' },
    ],
    current: {
      asOf: checkedAt,
      officeholders: [['Head of state', 'King Charles III'], ['Governor General', 'Mary Simon'], ['Prime Minister', 'Mark Carney, Liberal Party']],
      election: {
        title: '2025 federal election', date: '28 April 2025', turnout: '69.5% of registered electors',
        summary: 'The Liberal Party won the most seats but not a majority in the expanded 343-seat House of Commons, so Mark Carney continued as prime minister with a minority government.',
        representation: [['Liberal Party', '169 seats in the validated general-election result'], ['Conservative Party', '144 seats'], ['Bloc Québécois', '22 seats'], ['New Democratic Party', '7 seats'], ['Green Party', '1 seat']],
      },
      rights: {
        provider: 'Freedom House', edition: 'Freedom in the World 2026', score: '97/100', status: 'Free', comparison: 'Unchanged from the 2025 edition',
        note: 'This is one organisation’s assessment, not Politangle’s verdict. Its report recognises strong rights protections while noting persistent discrimination and socioeconomic barriers affecting Indigenous and Black Canadians.',
        url: 'https://freedomhouse.org/country/canada/freedom-world/2026',
      },
      trends: [
        'The 2025 election produced a Liberal minority government and the highest federal turnout since 1993.',
        'The two largest parties together received most votes and seats, while regional and smaller parties continued to matter in a Parliament where no party held a majority.',
        'Canada’s aggregate Freedom House score stayed at 97, but a high score does not erase disputes over Indigenous rights, discrimination, transparency or provincial restrictions on religious symbols.',
      ],
    },
    incomplete: ['Independent editorial sign-off', 'Second-source review of current political facts', 'German, Spanish and French localization'],
    sources: [
      { title: 'How government works', publisher: 'Government of Canada', url: 'https://www.canada.ca/en/government/system/how-government-works.html', checkedAt },
      { title: 'The Constitution Acts, 1867 to 1982', publisher: 'Department of Justice Canada', url: 'https://laws-lois.justice.gc.ca/eng/const/', checkedAt },
      { title: 'Prime Minister of Canada', publisher: 'Government of Canada', url: 'https://www.pm.gc.ca/en', checkedAt },
      { title: 'Governor General Mary Simon', publisher: 'Governor General of Canada', url: 'https://www.gg.ca/en/governor-general/governor-general-mary-simon', checkedAt },
      { title: 'Official results of the 2025 federal election', publisher: 'Elections Canada', url: 'https://electionsanddemocracy.ca/geography-elections-0/map-official-results', checkedAt },
      { title: 'Freedom in the World 2026: Canada', publisher: 'Freedom House', url: 'https://freedomhouse.org/country/canada/freedom-world/2026', checkedAt },
    ],
  },
  {
    slug: 'south-africa', name: 'South Africa', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Constitutional parliamentary republic'], ['Head of state and government', 'President, elected by the National Assembly'], ['Legislature', 'Parliament: National Assembly and National Council of Provinces'], ['Courts', 'Constitutional Court and other independent courts'], ['Territorial structure', 'National, provincial and local spheres of government']],
    power: [
      'Voters elect the National Assembly, which elects the president. The Assembly can remove the president or cabinet through constitutionally defined votes.',
      'The National Council of Provinces represents provincial interests. National, provincial and local governments have constitutionally assigned responsibilities and must cooperate.',
      'The Constitution is supreme. Courts can invalidate laws or government conduct that conflicts with it, and independent institutions support constitutional democracy and accountability.',
    ],
    vocabulary: [
      'The African National Congress grew from a liberation movement and contains labour, nationalist, social-democratic and other currents. Its history does not make every policy left-wing.',
      'Economic arguments are shaped by apartheid’s lasting inequalities. Support for redistribution or stronger action against concentrated wealth is not, by itself, evidence of populism.',
    ],
    timeline: [
      { year: '1910', title: 'Union of South Africa', text: 'The Union centralised white minority government while excluding most people from national political power.' },
      { year: '1948', title: 'Apartheid formalised', text: 'The National Party government expanded systematic racial classification, segregation and disenfranchisement.' },
      { year: '1994', title: 'First inclusive national election', text: 'South Africans voted in the first national election based on universal adult suffrage.' },
      { year: '1996', title: 'Final Constitution', text: 'The democratic Constitution established enforceable rights, cooperative government and strong constitutional review.' },
    ],
    current: {
      asOf: checkedAt,
      officeholders: [['President', 'Cyril Ramaphosa, African National Congress (ANC)'], ['Government', 'Multiparty Government of National Unity formed after the 2024 election']],
      election: {
        title: '2024 national and provincial elections', date: '29 May 2024', turnout: '58.64% of registered voters',
        summary: 'The ANC remained the largest party but lost its National Assembly majority for the first time since 1994. Parliament re-elected Cyril Ramaphosa after parties formed a Government of National Unity.',
        representation: [['African National Congress (ANC)', '159 seats'], ['Democratic Alliance (DA)', '87 seats'], ['uMkhonto weSizwe Party (MK)', '58 seats'], ['Economic Freedom Fighters (EFF)', '39 seats'], ['Inkatha Freedom Party (IFP)', '17 seats'], ['Other parties', '40 seats']],
      },
      rights: {
        provider: 'Freedom House', edition: 'Freedom in the World 2026', score: '81/100', status: 'Free', comparison: 'Unchanged from the 2025 edition',
        note: 'This is one organisation’s assessment, not Politangle’s verdict. Democracy scores measure rights and institutions; they do not measure whether inequality, unemployment or public services are acceptable.',
        url: 'https://freedomhouse.org/country/south-africa/freedom-world/2026',
      },
      trends: [
        'The loss of the ANC’s majority moved national government from single-party dominance to formal multiparty bargaining.',
        'Official election reporting recorded turnout falling from 65.99% in 2019 to 58.64% in 2024.',
        'Freedom House kept South Africa at 81/100. That institutional measure must be read alongside severe inequality, unemployment and uneven public services rather than treated as a complete national scorecard.',
      ],
    },
    incomplete: ['Independent editorial sign-off', 'Second-source review of current political facts', 'German, Spanish and French localization'],
    sources: [
      { title: 'Constitution of the Republic of South Africa', publisher: 'South African Government', url: 'https://www.gov.za/documents/constitution-republic-south-africa-1996', checkedAt },
      { title: 'How Parliament is structured', publisher: 'Parliament of South Africa', url: 'https://www.parliament.gov.za/how-parliament-is-structured', checkedAt },
      { title: 'President Cyril Ramaphosa', publisher: 'The Presidency of South Africa', url: 'https://www.thepresidency.gov.za/president-cyril-ramaphosa', checkedAt },
      { title: '2024 national and provincial election report', publisher: 'Electoral Commission of South Africa', url: 'https://www.elections.org.za/pw/News-And-Media/News-List/News/News-Article/Electoral-Commission-presents-NPE-2024-Report-to-Parliament%2C-sets-sights-on-2026-Local-Government-Elections?a=AISDGvpz75ps1usOfX7oigs7Yh0VdwYy+pOUbF1N9lY%3D', checkedAt },
      { title: 'Freedom in the World 2026: South Africa', publisher: 'Freedom House', url: 'https://freedomhouse.org/country/south-africa/freedom-world/2026', checkedAt },
    ],
  },
  {
    slug: 'india', name: 'India', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Federal parliamentary republic'], ['Head of state', 'President of India'], ['Head of government', 'Prime Minister'], ['Legislature', 'Parliament: President, Lok Sabha and Rajya Sabha'], ['Territorial structure', 'Federal union of states and union territories']],
    power: [
      'The prime minister leads a government that must retain the confidence of the directly elected Lok Sabha. The president normally acts on ministerial advice.',
      'The Rajya Sabha represents the states, while the Lok Sabha has the decisive role in government confidence and greater authority over money bills.',
      'The Constitution divides powers between the Union and the states but gives the Union important overriding and emergency powers. The Supreme Court can review laws and protect the Constitution’s basic structure.',
    ],
    vocabulary: [
      'Indian secularism does not always mean a strict wall between religion and government. It often means equal respect, religious freedom and state intervention to protect rights or reform practices.',
      'Hindu nationalism, economic liberalisation, welfare policy, caste representation and federal autonomy are separate dimensions. Combining them into a single left–right score would hide important differences.',
    ],
    timeline: [
      { year: '1947', title: 'Independence and partition', text: 'British rule ended and the subcontinent was partitioned into India and Pakistan amid mass displacement and violence.' },
      { year: '1950', title: 'Constitution in force', text: 'India became a republic under a detailed Constitution establishing rights, parliamentary government and federal institutions.' },
      { year: '1975–1977', title: 'National Emergency', text: 'Emergency rule restricted civil liberties and political opposition before elections restored a change of government.' },
      { year: '1992–1993', title: 'Local democracy strengthened', text: 'Constitutional amendments gave elected village and urban local bodies a stronger nationwide foundation.' },
    ],
    incomplete: ['Current office holders', 'Current Parliament, governing coalition and opposition profiles', 'Latest national election and turnout', 'Comparable democracy, minority-rights and civic-space measures', 'Long-term indicator trends'],
    sources: [
      { title: 'The Constitution of India', publisher: 'Legislative Department, Government of India', url: 'https://legislative.gov.in/constitution-of-india/', checkedAt },
      { title: 'The Union Legislature', publisher: 'National Portal of India', url: 'https://knowindia.india.gov.in/profile/the-union/legislature.php', checkedAt },
    ],
  },
  {
    slug: 'nigeria', name: 'Nigeria', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Federal presidential republic'], ['Executive', 'President'], ['Legislature', 'National Assembly: House of Representatives and Senate'], ['Courts', 'Supreme Court and federal and state courts'], ['Territorial structure', 'Federal: 36 states and the Federal Capital Territory']],
    power: [
      'The president leads the executive separately from the National Assembly. Federal law-making, taxation, spending and scrutiny are shared by two elected chambers.',
      'Each state has an elected governor and legislature. The Constitution divides responsibilities, but oil revenue and national allocation make relations between federal, state and local government especially important.',
      'Courts can review government action and election disputes. Independent commissions administer elections and perform other constitutional functions, although formal independence and practical capacity must be assessed separately.',
    ],
    vocabulary: [
      'Nigeria’s largest parties are broad national coalitions rather than clean ideological blocs. Region, religion, ethnicity, patronage and candidate networks often cut across economic left and right.',
      'Public anger about corruption, tax avoidance or capture by a small group can be factually justified. It becomes populist framing only when all legitimate disagreement is reduced to a pure people versus a wholly corrupt elite.',
    ],
    timeline: [
      { year: '1960', title: 'Independence', text: 'Nigeria became independent with a federal parliamentary constitution.' },
      { year: '1966–1970', title: 'Coups and civil war', text: 'Military coups were followed by the Biafran secession and a devastating civil war.' },
      { year: '1999', title: 'Fourth Republic', text: 'Military rule ended and the present presidential constitutional order began.' },
      { year: '2015', title: 'First opposition presidential victory', text: 'An incumbent president lost an election and transferred power to an opposition candidate for the first time.' },
    ],
    incomplete: ['Current office holders', 'Current National Assembly and party profiles', 'Latest national election, turnout and dispute outcomes', 'Comparable democracy, security, rights and civic-space measures', 'Long-term indicator trends'],
    sources: [
      { title: 'About the National Assembly', publisher: 'National Assembly of Nigeria', url: 'https://nass.gov.ng/', checkedAt },
      { title: 'The electoral process', publisher: 'Independent National Electoral Commission', url: 'https://www.inecnigeria.org/', checkedAt },
    ],
  },
  {
    slug: 'philippines', name: 'Philippines', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Unitary presidential republic'], ['Executive', 'President'], ['Legislature', 'Congress: House of Representatives and Senate'], ['Courts', 'Supreme Court and lower courts'], ['Territorial structure', 'Unitary state with elected local governments and an autonomous Bangsamoro region']],
    power: [
      'The president leads the executive separately from Congress and serves one six-year term without immediate or later presidential re-election.',
      'Senators are elected nationally. The House combines geographical districts with party-list seats intended to broaden sectoral and group representation.',
      'The Supreme Court reviews constitutional disputes. Independent constitutional commissions oversee elections, the civil service and public auditing, while local governments exercise powers granted by national law.',
    ],
    vocabulary: [
      'Party labels are often less reliable guides than candidate alliances, regional networks and political families. A politician changing party does not necessarily signal an ideological conversion.',
      'A leader’s direct, anti-establishment style may be populist, but popular policies or accurate criticism of oligarchic influence are not enough. The key question is whether pluralism and legitimate opposition are denied.',
    ],
    timeline: [
      { year: '1946', title: 'Independence', text: 'The Philippines became an independent republic after colonial rule and wartime occupation.' },
      { year: '1972', title: 'Martial law', text: 'President Ferdinand Marcos declared martial law, concentrating power and restricting opposition and civil liberties.' },
      { year: '1986', title: 'People Power transition', text: 'Mass protest and a disputed election ended the Marcos presidency and restored competitive democratic government.' },
      { year: '1987', title: 'Present Constitution', text: 'A new Constitution restored checks and balances, rights protections and presidential term limits.' },
    ],
    incomplete: ['Current office holders', 'Current Congress, party blocs and political-family context', 'Latest national election and turnout', 'Comparable democracy, media-freedom and civic-space measures', 'Long-term indicator trends'],
    sources: [
      { title: 'The 1987 Constitution of the Republic of the Philippines', publisher: 'Official Gazette', url: 'https://www.officialgazette.gov.ph/constitutions/1987-constitution/', checkedAt },
      { title: 'Congressional structure and legislation', publisher: 'House of Representatives of the Philippines', url: 'https://www.congress.gov.ph/', checkedAt },
    ],
  },
  {
    slug: 'brazil', name: 'Brazil', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Federal presidential republic'], ['Executive', 'President'], ['Legislature', 'National Congress: Chamber of Deputies and Federal Senate'], ['Courts', 'Federal Supreme Court and other federal and state courts'], ['Territorial structure', 'Federal: 26 states, municipalities and the Federal District']],
    power: [
      'The president leads the executive separately from Congress. Governing usually requires agreements among several parties represented in the two chambers.',
      'Deputies are elected proportionally within states, while senators represent states and the Federal District equally. Congress legislates, controls the budget and investigates government.',
      'The Constitution gives courts strong review powers and protects an independent public prosecution service. States and municipalities elect their own governments and deliver major public services.',
    ],
    vocabulary: [
      'Brazilian party competition combines economic left and right with regional interests, religious movements, public-security politics and flexible congressional alliances.',
      'Anti-corruption politics may rely on evidence and lawful accountability. It becomes populist when one leader claims exclusive moral authority and treats courts, media or opposition as enemies simply for disagreeing.',
    ],
    timeline: [
      { year: '1822–1889', title: 'Independence and empire', text: 'Brazil became independent under a constitutional monarchy before a military-led movement established a republic.' },
      { year: '1964–1985', title: 'Military dictatorship', text: 'Military governments restricted political competition, rights and civil society for more than two decades.' },
      { year: '1988', title: 'Democratic Constitution', text: 'The present Constitution established extensive rights, federal democracy and strong public institutions.' },
      { year: '1989', title: 'Direct presidential election restored', text: 'Brazil held its first direct presidential election since 1960.' },
    ],
    incomplete: ['Current office holders', 'Current Congress, coalitions and party profiles', 'Latest national election and turnout', 'Comparable democracy, rights, corruption-control and civic-space measures', 'Long-term indicator trends'],
    sources: [
      { title: 'Constitution of the Federative Republic of Brazil', publisher: 'Chamber of Deputies', url: 'https://www2.camara.leg.br/english/brazilian-constitution', checkedAt },
      { title: 'Brazilian electoral system', publisher: 'Superior Electoral Court', url: 'https://international.tse.jus.br/en', checkedAt },
    ],
  },
  {
    slug: 'indonesia', name: 'Indonesia', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Unitary presidential republic'], ['Executive', 'President'], ['National representation', 'People’s Consultative Assembly: House of Representatives and Regional Representative Council'], ['Courts', 'Supreme Court and Constitutional Court'], ['Territorial structure', 'Unitary state with extensive provincial and local decentralisation']],
    power: [
      'The president and vice-president are directly elected and do not depend on continuing parliamentary confidence. The president appoints the cabinet and leads the executive.',
      'The House of Representatives makes laws and scrutinises government with the president. The Regional Representative Council represents provinces but has more limited legislative authority.',
      'The Constitutional Court reviews statutes and election disputes. Since the democratic transition, substantial responsibilities and budgets have moved to elected provincial and local governments.',
    ],
    vocabulary: [
      'Pancasila is the state philosophy built around belief in God, humanitarianism, national unity, deliberative democracy and social justice. It does not map onto one Western ideology.',
      'Nationalism is shared across much of Indonesian politics. Religious pluralism, the role of Islam, decentralisation, welfare and economic development create separate political disagreements.',
    ],
    timeline: [
      { year: '1945', title: 'Independence and Constitution', text: 'Independence was proclaimed and the 1945 Constitution established the republic’s foundational framework.' },
      { year: '1965–1998', title: 'New Order', text: 'Suharto’s authoritarian government concentrated political power while overseeing major economic and social change.' },
      { year: '1998–2002', title: 'Reformasi and constitutional change', text: 'Suharto’s fall was followed by competitive politics, decentralisation and four rounds of constitutional amendments.' },
      { year: '2004', title: 'Direct presidential election', text: 'Citizens elected the president directly for the first time.' },
    ],
    incomplete: ['Current office holders', 'Current legislature, governing coalition and party profiles', 'Latest national election and turnout', 'Comparable democracy, religious-freedom and civic-space measures', 'Long-term indicator trends'],
    sources: [
      { title: 'The 1945 Constitution of the Republic of Indonesia', publisher: 'Constitutional Court of Indonesia', url: 'https://www.mkri.id/public/content/infoumum/regulation/pdf/uud45%20eng.pdf', checkedAt },
      { title: 'Election information', publisher: 'General Elections Commission of Indonesia', url: 'https://www.kpu.go.id/', checkedAt },
    ],
  },
  {
    slug: 'japan', name: 'Japan', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Unitary parliamentary constitutional monarchy'], ['Head of state', 'Emperor, constitutionally defined as the symbol of the state'], ['Head of government', 'Prime Minister'], ['Legislature', 'National Diet: House of Representatives and House of Councillors'], ['Territorial structure', 'Unitary state with 47 elected prefectural governments']],
    power: [
      'The Diet designates the prime minister, who must be a member of the legislature. The cabinet is collectively responsible to the House of Representatives.',
      'Both chambers legislate, but the House of Representatives has priority in choosing the prime minister and stronger authority over budgets, treaties and some legislative disagreements.',
      'The emperor performs only constitutional state functions and has no powers of government. Courts may review constitutionality, while prefectures and municipalities administer major services.',
    ],
    vocabulary: [
      'The Liberal Democratic Party is generally conservative despite its name. “Liberal” in a party title therefore should not be read as the US meaning of centre-left.',
      'Post-war politics also turns on pacifism, constitutional revision, the security alliance, administrative reform and the developmental state—not only taxes and social values.',
    ],
    timeline: [
      { year: '1868', title: 'Meiji Restoration', text: 'Political authority was reorganised around the emperor and Japan began rapid state-building and industrialisation.' },
      { year: '1945–1947', title: 'Defeat and democratic Constitution', text: 'After wartime defeat, a new Constitution established popular sovereignty, parliamentary government, rights and the emperor’s symbolic role.' },
      { year: '1955', title: 'Long dominant-party system begins', text: 'Conservative parties united as the Liberal Democratic Party, which subsequently governed for most of the post-war period.' },
      { year: '1994', title: 'Electoral system reformed', text: 'Japan replaced multi-member lower-house districts with a mixed system combining single-member and proportional seats.' },
    ],
    incomplete: ['Current office holders', 'Current Diet and party profiles', 'Latest national election and turnout', 'Comparable democracy, media, equality and civic-space measures', 'Long-term indicator trends'],
    sources: [
      { title: 'The Constitution of Japan', publisher: 'Prime Minister of Japan and His Cabinet', url: 'https://japan.kantei.go.jp/constitution_and_government_of_japan/constitution_e.html', checkedAt },
      { title: 'Guide to the House of Representatives', publisher: 'House of Representatives, Japan', url: 'https://www.shugiin.go.jp/internet/itdb_english.nsf/html/statics/guide/index.htm', checkedAt },
    ],
  },
] as const;

export const countryProfiles: readonly CountryProfile[] = [
  ...initialCountryProfiles,
  ...additionalCountryProfiles,
  ...wave3CountryProfiles,
];

export const lockedCountryQueue: readonly string[] = [];

export function countryBySlug(slug: string) { return countryProfiles.find((country) => country.slug === slug); }
