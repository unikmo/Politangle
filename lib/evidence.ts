export type EvidenceSource = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  authority: 'primary-method' | 'academic-reference' | 'academic-research' | 'institutional-reference';
  supports: readonly string[];
  accessed: string;
};

export const evidenceSources: readonly EvidenceSource[] = [
  {
    id: 'PEW-SURVEY-WORDING',
    title: 'Writing Survey Questions',
    publisher: 'Pew Research Center',
    url: 'https://www.pewresearch.org/writing-survey-questions/',
    authority: 'primary-method',
    supports: [
      'Clear, specific, neutral wording and pretesting are essential.',
      'Agree/disagree formats are vulnerable to acquiescence bias; balanced alternatives are preferable when feasible.',
      'Question order can influence responses, so randomization can reduce systematic order effects.',
    ],
    accessed: '2026-09-07',
  },
  {
    id: 'AAPOR-BEST-PRACTICES',
    title: 'Best Practices for Survey Research',
    publisher: 'American Association for Public Opinion Research',
    url: 'https://aapor.org/standards-and-ethics/best-practices/',
    authority: 'primary-method',
    supports: [
      'Ask one construct at a time, use simple language, avoid leading wording, and order questions carefully.',
    ],
    accessed: '2026-09-07',
  },
  {
    id: 'CHES-2024',
    title: 'Chapel Hill Expert Survey',
    publisher: 'CHES',
    url: 'https://www.chesdata.eu/',
    authority: 'academic-research',
    supports: [
      'Economic left-right, social-cultural GAL-TAN, European integration, immigration, redistribution and related dimensions are established comparative party-position measures.',
    ],
    accessed: '2026-09-07',
  },
  {
    id: 'CHES-ECON-GALTAN',
    title: 'CHES ideological question wordings reproduced in academic research',
    publisher: 'Journal of European Public Policy / Taylor & Francis',
    url: 'https://doi.org/10.1080/13501763.2023.2245443',
    authority: 'academic-research',
    supports: [
      'Economic left-right can be operationalized through the desired role of government in taxation, regulation, spending, welfare and privatization.',
      'The social-cultural axis contrasts expanded personal freedoms with tradition, authority and stability.',
    ],
    accessed: '2026-09-07',
  },
  {
    id: 'VDEM-LIBERAL-DEMOCRACY',
    title: 'V-Dem Liberal Democracy Index methodology summary',
    publisher: 'V-Dem Institute',
    url: 'https://www.v-dem.net/about/faq/',
    authority: 'primary-method',
    supports: [
      'Liberal democracy includes civil liberties, rule of law, and checks and balances that constrain executive power in addition to elections.',
    ],
    accessed: '2026-09-07',
  },
  {
    id: 'SEP-LIBERALISM',
    title: 'Liberalism',
    publisher: 'Stanford Encyclopedia of Philosophy',
    url: 'https://plato.stanford.edu/entries/liberalism/',
    authority: 'academic-reference',
    supports: [
      'Liberalism is a diverse family united around liberty but divided over negative versus positive liberty and old versus new liberalism.',
    ],
    accessed: '2026-09-07',
  },
  {
    id: 'SEP-LIBERTARIANISM',
    title: 'Libertarianism',
    publisher: 'Stanford Encyclopedia of Philosophy',
    url: 'https://plato.stanford.edu/entries/libertarianism/',
    authority: 'academic-reference',
    supports: [
      'Libertarianism makes individual freedom central and typically strongly protects private property, voluntary exchange and limits on coercion.',
    ],
    accessed: '2026-09-07',
  },
  {
    id: 'SEP-CONSERVATISM',
    title: 'Conservatism',
    publisher: 'Stanford Encyclopedia of Philosophy',
    url: 'https://plato.stanford.edu/archives/fall2020/entries/conservatism/',
    authority: 'academic-reference',
    supports: [
      'A major strand of conservatism emphasizes living tradition, continuity and skepticism toward abstract or rapid reform.',
    ],
    accessed: '2026-09-07',
  },
  {
    id: 'SEP-SOCIALISM',
    title: 'Socialism',
    publisher: 'Stanford Encyclopedia of Philosophy',
    url: 'https://plato.stanford.edu/archives/spr2026/entries/socialism/',
    authority: 'academic-reference',
    supports: [
      'Socialism is a broad family critical of capitalism and includes multiple institutional designs.',
      'Democratic socialist models can combine political democracy with public, cooperative or worker-controlled ownership.',
      'Social democracy can be understood as taming capitalism through social insurance, public goods, regulation and redistribution.',
    ],
    accessed: '2026-09-07',
  },
  {
    id: 'ROUTLEDGE-SOCIAL-DEMOCRACY',
    title: 'Social democracy',
    publisher: 'Routledge Encyclopedia of Philosophy',
    url: 'https://www.rep.routledge.com/articles/thematic/social-democracy',
    authority: 'academic-reference',
    supports: [
      'Modern social democracy generally retains a predominantly capitalist economy while regulating markets, providing welfare services and redistributing income and wealth for social justice.',
    ],
    accessed: '2026-09-07',
  },
  {
    id: 'CAMBRIDGE-CHRISTIAN-DEMOCRACY',
    title: 'Social Capitalism, in What is Christian Democracy?',
    publisher: 'Cambridge University Press',
    url: 'https://www.cambridge.org/core/books/abs/what-is-christian-democracy/social-capitalism/8EE4DFB7697F5F05C8A63BEEA098461C',
    authority: 'academic-reference',
    supports: [
      'Christian democracy has a distinctive social-capitalist tradition associated with social market economy, private property, welfare and distributive justice.',
    ],
    accessed: '2026-09-07',
  },
  {
    id: 'CAMBRIDGE-GREEN-POLITICS',
    title: 'Green political thought',
    publisher: 'Cambridge University Press',
    url: 'https://www.cambridge.org/core/books/abs/politics-of-the-environment/green-political-thought/BA5EB7C4D160DD1D16ECF39BF55C2047',
    authority: 'academic-reference',
    supports: [
      'Green political thought centers ecological limits and sustainable society and commonly connects these to grassroots democracy, decentralization, social justice and non-violence.',
    ],
    accessed: '2026-09-07',
  },
  {
    id: 'SEP-NATIONALISM',
    title: 'Nationalism',
    publisher: 'Stanford Encyclopedia of Philosophy',
    url: 'https://plato.stanford.edu/entries/nationalism/',
    authority: 'academic-reference',
    supports: [
      'Nationalism is a family of beliefs about the value and political significance of nations and can combine with other ideologies, including conservative and socialist forms.',
    ],
    accessed: '2026-09-07',
  },
  {
    id: 'MUDDE-POPULISM',
    title: 'Populism in Europe: An Illiberal Democratic Response to Undemocratic Liberalism',
    publisher: 'Government and Opposition / Cambridge University Press',
    url: 'https://www.cambridge.org/core/journals/government-and-opposition/article/populism-in-europe-an-illiberal-democratic-response-to-undemocratic-liberalism-the-government-and-oppositionleonard-schapiro-lecture-2019/C624D1A36A8737434085C127BE310016',
    authority: 'academic-research',
    supports: [
      'Populism is widely conceptualized as a thin-centered ideology opposing a pure people to a corrupt elite and prioritizing the general will.',
      'Because it is thin-centered, populism can attach to different host ideologies rather than defining a full left-right program on its own.',
    ],
    accessed: '2026-09-07',
  },
  {
    id: 'MUDDE-RADICAL-RIGHT',
    title: 'Populist Radical Right Parties in Europe',
    publisher: 'Cambridge University Press',
    url: 'https://www.cambridge.org/core/books/abs/populist-radical-right-parties-in-europe/populist-radical-right-democracy/8FD7C41B3BDC2BA410C6A0AFD25894F9',
    authority: 'academic-reference',
    supports: [
      'The populist radical right is commonly analyzed through nativism, authoritarianism and populism and can accept procedural democracy while conflicting with liberal-democratic pluralism.',
    ],
    accessed: '2026-09-07',
  },
  {
    id: 'PIRRO-FAR-RIGHT',
    title: 'Far right: The significance of an umbrella concept',
    publisher: 'Nations and Nationalism / Wiley',
    url: 'https://doi.org/10.1111/nana.12860',
    authority: 'academic-research',
    supports: [
      'A common distinction places radical-right and extreme-right actors under the far-right umbrella, with explicit anti-democracy distinguishing the extreme right.',
    ],
    accessed: '2026-09-07',
  },
  {
    id: 'USHMM-FASCISM',
    title: 'Fascism',
    publisher: 'United States Holocaust Memorial Museum',
    url: 'https://encyclopedia.ushmm.org/content/en/article/fascism-1',
    authority: 'institutional-reference',
    supports: [
      'Fascism is ultranationalist and authoritarian and rejects pluralism, individual rights and representative or liberal democracy.',
    ],
    accessed: '2026-09-07',
  },
  {
    id: 'OXFORD-COMMUNISM',
    title: 'Karl Marx and Friedrich Engels on Communism',
    publisher: 'Oxford Academic',
    url: 'https://academic.oup.com/edited-volume/35402/chapter-abstract/302647055',
    authority: 'academic-reference',
    supports: [
      'The Marxian communist ideal is classless and stateless, with collective appropriation and no private ownership of the means of production.',
    ],
    accessed: '2026-09-07',
  },
] as const;

export const evidenceById = new Map(evidenceSources.map((source) => [source.id, source]));
