import type { CountryProfile } from './countries';

const checkedAt = '2026-09-20';

export const thirdWaveCountryProfiles: readonly CountryProfile[] = [
  {
    slug: 'austria', name: 'Austria', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System','Federal parliamentary republic'],['Head of state','Federal President'],['Head of government','Federal Chancellor'],['Legislature','Parliament: National Council and Federal Council'],['Territorial structure','Federal: nine Länder']],
    power: [
      'Federal legislative authority is shared between the directly elected National Council and the Federal Council, which represents the Länder. The National Council has the stronger role in most federal legislation and in sustaining the government.',
      'The Federal President is directly elected and has constitutionally defined appointment and reserve powers, while day-to-day government is led by the Federal Chancellor and cabinet.',
      'Austria is a federation: the Constitution divides legislative and administrative responsibilities between the federation and nine Länder, each of which has its own legislature and government.',
    ],
    vocabulary: [
      'Austrian party labels sit within continental European traditions: “liberal”, “social democratic”, “Christian democratic/conservative” and “green” do not map one-to-one onto US party coalitions.',
      'Federalism matters, but Austrian Länder have a different balance of powers from US states or Swiss cantons. Comparative language should therefore describe the actual constitutional allocation rather than infer from the word “federal”.',
    ],
    timeline: [
      { year:'1918–1920', title:'Republic and federal Constitution', text:'The monarchy ended after the First World War and the 1920 Federal Constitutional Law established the core republican and federal framework.' },
      { year:'1933–1945', title:'Democratic breakdown and dictatorship', text:'Parliamentary democracy collapsed, followed by authoritarian rule, annexation by Nazi Germany and the Second World War.' },
      { year:'1945', title:'Republic restored', text:'Austria re-established republican institutions after the war and returned to parliamentary constitutional government.' },
      { year:'1995', title:'European Union membership', text:'Austria joined the European Union after a national referendum.' },
    ],
    incomplete:['Current office holders','Current National Council and Federal Council composition','Latest federal election and turnout','Democracy, rights and civic-space dimensions','Long-term indicator trends'],
    sources:[
      { title:'Political System', publisher:'Austrian Parliament', url:'https://www.parlament.gv.at/en/explore/political-system', checkedAt },
      { title:'The Federal State of Austria', publisher:'Austrian Parliament', url:'https://www.parlament.gv.at/en/explore/political-system/the-federal-state-of-austria', checkedAt },
    ],
  },
  {
    slug: 'czechia', name: 'Czechia', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System','Unitary parliamentary republic'],['Head of state','President of the Republic'],['Head of government','Prime Minister'],['Legislature','Parliament: Chamber of Deputies and Senate'],['Territorial structure','Unitary state with constitutionally protected territorial self-government']],
    power: [
      'The government is politically responsible to the Chamber of Deputies. The Chamber is therefore central to government formation, confidence and the passage of ordinary legislation.',
      'The Senate participates in legislation and constitutional change, while the directly elected president has a separate mandate and defined appointment, legislative and representative functions.',
      'The Constitution protects territorial self-government and establishes constitutional review within a parliamentary system governed by the rule of law.',
    ],
    vocabulary: [
      'Czech party competition contains liberal, conservative, Christian-democratic, social-democratic, populist and other traditions, but party names should be read in their Czech historical context rather than imported from another country.',
      'The distinction between the directly elected presidency and a government responsible to the Chamber of Deputies is especially important: direct presidential election did not turn Czechia into a presidential system.',
    ],
    timeline: [
      { year:'1918', title:'Czechoslovakia founded', text:'An independent Czechoslovak state was established after the collapse of Austria-Hungary.' },
      { year:'1948–1989', title:'Communist rule', text:'A communist regime ended competitive democratic government until the Velvet Revolution.' },
      { year:'1989', title:'Velvet Revolution', text:'Mass civic mobilisation led to the end of communist rule and the restoration of pluralist politics.' },
      { year:'1993', title:'Independent Czech Republic', text:'Czechoslovakia dissolved peacefully and the Czech Republic began operating under its present constitutional order.' },
    ],
    incomplete:['Current office holders','Current Chamber and Senate composition','Latest parliamentary and presidential election review','Democracy, rights and civic-space dimensions','Long-term indicator trends'],
    sources:[
      { title:'Legal framework', publisher:'Chamber of Deputies, Parliament of the Czech Republic', url:'https://pspen.psp.cz/chamber-members/legal-framework/', checkedAt },
      { title:'Constitution of the Czech Republic', publisher:'Parliament of the Czech Republic', url:'https://www.psp.cz/en/docs/laws/constitution.html', checkedAt },
    ],
  },
  {
    slug: 'greece', name: 'Greece', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System','Unitary parliamentary republic'],['Head of state','President of the Hellenic Republic'],['Head of government','Prime Minister'],['Legislature','Hellenic Parliament: one elected chamber'],['Constitution','1975 Constitution, subsequently revised']],
    power: [
      'The Constitution defines Greece as a parliamentary republic. The government must enjoy parliamentary confidence and the prime minister leads the executive government.',
      'The president is head of state and performs constitutionally defined functions, while the elected Hellenic Parliament legislates, approves public finance and scrutinises government.',
      'Judicial authority is constitutionally separate. Greece is unitary, with regional and municipal administration operating within national constitutional and statutory rules.',
    ],
    vocabulary: [
      'Greek party politics has been shaped by socialist, liberal-conservative, communist, nationalist and centrist traditions, as well as by debates over Europe, public finances and the role of the state.',
      'The word “republic” here describes the constitutional form of the state; it is not a reference to the US Republican Party or a single ideological family.',
    ],
    timeline: [
      { year:'1974', title:'Democracy restored', text:'Military rule ended and civilian parliamentary government was restored during the Metapolitefsi transition.' },
      { year:'1975', title:'Current Constitution adopted', text:'A new Constitution established the framework of the Third Hellenic Republic.' },
      { year:'1981', title:'European Communities membership', text:'Greece joined the European Communities, later the European Union.' },
      { year:'1986', title:'Presidential powers revised', text:'Constitutional revision reduced important presidential powers and reinforced the parliamentary character of the system.' },
    ],
    incomplete:['Current office holders','Current Parliament and party profiles','Latest national election and turnout','Democracy, rights and civic-space dimensions','Long-term indicator trends'],
    sources:[
      { title:'The Constitution of Greece — Article 1', publisher:'Hellenic Parliament', url:'https://www.hellenicparliament.gr/vouli-ton-ellinon/to-politevma/syntagma/article-1/', checkedAt },
      { title:'The Constitution', publisher:'Hellenic Parliament', url:'https://www.hellenicparliament.gr/en/Vouli-ton-Ellinon/To-Politevma/Syntagma/', checkedAt },
    ],
  },
  {
    slug: 'hungary', name: 'Hungary', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System','Unitary parliamentary republic'],['Head of state','President of the Republic'],['Head of government','Prime Minister'],['Legislature','National Assembly: one elected chamber'],['Constitution','Fundamental Law of Hungary']],
    power: [
      'The National Assembly is the central legislative institution. It passes laws and the budget, elects the prime minister and exercises constitutionally defined scrutiny and appointment powers.',
      'The President of the Republic is head of state, while executive government is led by the prime minister and ministers. The government is politically accountable within the parliamentary framework.',
      'The Fundamental Law establishes constitutional institutions including the Constitutional Court and local government, while Hungary remains a unitary state.',
    ],
    vocabulary: [
      'Hungarian political language combines national, conservative, liberal, social-democratic and other European traditions. The meaning of these labels should be explained through policies and institutions rather than assumed from foreign party systems.',
      'Disputes over constitutional design, European integration and national sovereignty form political dimensions that can cut across conventional economic left and right.',
    ],
    timeline: [
      { year:'1989–1990', title:'Democratic transition', text:'The communist system ended and multiparty parliamentary elections established a new democratic constitutional order.' },
      { year:'1990', title:'First freely elected post-communist Parliament', text:'Competitive elections produced the first government of the post-communist parliamentary era.' },
      { year:'2004', title:'European Union membership', text:'Hungary joined the European Union after an accession referendum.' },
      { year:'2012', title:'Fundamental Law enters into force', text:'A new Fundamental Law replaced the previous constitutional text and became the basis of the current constitutional framework.' },
    ],
    incomplete:['Current office holders','Current National Assembly and party profiles','Latest national election and turnout','Rule-of-law and civic-space source review','Long-term indicator trends'],
    sources:[
      { title:'The Fundamental Law of Hungary', publisher:'Hungarian National Assembly', url:'https://www.parlament.hu/documents/125505/138409/Fundamental%2Blaw/', checkedAt },
      { title:'National Assembly of Hungary', publisher:'Hungarian National Assembly', url:'https://www.parlament.hu/web/house-of-the-national-assembly', checkedAt },
    ],
  },
  {
    slug: 'ukraine', name: 'Ukraine', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System','Unitary semi-presidential republic'],['Head of state','President of Ukraine'],['Head of government','Prime Minister'],['Legislature','Verkhovna Rada: one elected chamber'],['Territorial structure','Unitary state with constitutionally defined local self-government']],
    power: [
      'The Verkhovna Rada exercises legislative authority and has major roles in government formation, public finance, oversight and constitutional procedures.',
      'Executive authority is divided institutionally between a directly elected president with substantial constitutional responsibilities and a Cabinet of Ministers led by the prime minister.',
      'The Constitution establishes judicial review and local self-government within a unitary state. Wartime emergency arrangements can affect ordinary political processes and must be distinguished from the permanent constitutional design.',
    ],
    vocabulary: [
      'Ukrainian political competition cannot be reduced to a single left–right line. National sovereignty, decentralisation, language, European integration, security and relations with Russia have all been major dimensions.',
      'Because Russia’s full-scale invasion has placed institutions under wartime conditions, Politangle should separate permanent constitutional rules from temporary emergency arrangements and avoid treating wartime practice as the normal baseline.',
    ],
    timeline: [
      { year:'1991', title:'Independence', text:'Ukraine declared independence as the Soviet Union dissolved and confirmed it in a national referendum.' },
      { year:'1996', title:'Constitution adopted', text:'The Verkhovna Rada adopted the Constitution that forms the basis of the current state structure.' },
      { year:'2004–2005', title:'Orange Revolution', text:'Mass protests over a disputed presidential election were followed by a repeat runoff and a peaceful transfer of executive power.' },
      { year:'2014', title:'Revolution of Dignity and renewed constitutional shift', text:'Political upheaval was followed by a return to a more parliament-centred distribution of executive authority and by Russian aggression against Ukraine.' },
    ],
    incomplete:['Current wartime office-holder and institutional review','Current Verkhovna Rada composition','Election scheduling under martial-law conditions','Territorial and security context requiring current sourcing','Democracy, rights and civic-space dimensions'],
    sources:[
      { title:'Constitution of Ukraine', publisher:'Verkhovna Rada of Ukraine', url:'https://www.rada.gov.ua/en/news/Constitution_of_Ukraine/', checkedAt },
      { title:'Official webportal of the Verkhovna Rada', publisher:'Verkhovna Rada of Ukraine', url:'https://www.rada.gov.ua/en/', checkedAt },
    ],
  },
  {
    slug: 'serbia', name: 'Serbia', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System','Unitary parliamentary republic'],['Head of state','President of the Republic'],['Head of government','Prime Minister'],['Legislature','National Assembly: one elected chamber'],['Territorial structure','Unitary state with provincial autonomy and local self-government']],
    power: [
      'The National Assembly is the supreme representative body and holder of constitutional and legislative power. It adopts laws, the budget and constitutional amendments and exercises oversight functions.',
      'The government is led by the prime minister and is accountable within the parliamentary system. The directly elected president has a separate constitutional mandate and defined state functions.',
      'The Constitution recognises provincial autonomy and local self-government within a unitary state, including a distinct constitutional role for the Autonomous Province of Vojvodina.',
    ],
    vocabulary: [
      'Serbian politics combines economic and social left–right questions with national identity, European integration, constitutional status questions and relations with neighbouring states.',
      'Party names such as progressive, socialist, democratic or radical have specific Serbian histories and should not be translated into foreign ideological categories without examining their actual programmes and records.',
    ],
    timeline: [
      { year:'1990', title:'Multiparty elections restored', text:'Competitive multiparty elections returned as Yugoslavia entered a period of profound political and territorial crisis.' },
      { year:'2000', title:'Change of government after mass mobilisation', text:'A disputed federal presidential election and mass protest ended Slobodan Milošević’s rule.' },
      { year:'2006', title:'Independent Republic of Serbia', text:'Serbia became an independent state after the dissolution of the State Union of Serbia and Montenegro.' },
      { year:'2006', title:'Current Constitution adopted', text:'A new Constitution was approved in a referendum and established the present constitutional framework.' },
    ],
    incomplete:['Current office holders','Current National Assembly and party profiles','Latest national election and turnout','Kosovo-related constitutional and diplomatic context requiring careful sourcing','Democracy, rights and civic-space dimensions'],
    sources:[
      { title:'Jurisdiction, competences and duties of the National Assembly', publisher:'National Assembly of the Republic of Serbia', url:'https://www.parlament.gov.rs/national-assembly/role-and-mode-of-operation/jurisdiction.501.html', checkedAt },
      { title:'Important Documents — Constitution', publisher:'National Assembly of the Republic of Serbia', url:'https://www.parlament.gov.rs/national-assembly/important-documents.531.html', checkedAt },
    ],
  },
  {
    slug: 'turkiye', name: 'Türkiye', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System','Unitary presidential republic'],['Head of state and executive','President of the Republic'],['Legislature','Grand National Assembly of Türkiye: one elected chamber'],['Legislative term','600 deputies elected for five-year terms'],['Constitution','1982 Constitution, substantially amended including the 2017 system change']],
    power: [
      'The Constitution vests executive power in the President of the Republic. The presidency is institutionally separate from the Grand National Assembly and appoints the executive administration under the presidential system.',
      'The Grand National Assembly has 600 directly elected deputies and exercises legislative, budgetary, treaty, oversight and other constitutional powers.',
      'The Constitutional Court and other courts exercise judicial functions under the Constitution. Türkiye remains a unitary state with elected local governments.',
    ],
    vocabulary: [
      'Turkish political competition includes secularist, conservative, nationalist, social-democratic, Islamist-rooted, Kurdish political and other traditions. These dimensions do not collapse into a single imported left–right vocabulary.',
      'The 2017 constitutional amendments replaced the previous prime-ministerial parliamentary executive with a presidential executive. Older descriptions of a Turkish prime minister are therefore outdated for the present constitutional system.',
    ],
    timeline: [
      { year:'1923', title:'Republic proclaimed', text:'The Republic of Türkiye was proclaimed after the War of Independence and the end of the Ottoman political order.' },
      { year:'1982', title:'Current Constitution adopted', text:'A new Constitution was approved following the 1980 military coup and has since been amended many times.' },
      { year:'2007', title:'Direct presidential election approved', text:'Constitutional change moved selection of the president from Parliament to direct popular election.' },
      { year:'2017–2018', title:'Presidential system introduced', text:'Constitutional amendments approved in 2017 took full effect after the 2018 elections, vesting executive power in the presidency and abolishing the office of prime minister.' },
    ],
    incomplete:['Current office holders','Current Assembly composition and party profiles','Latest presidential and parliamentary election review','Democracy, rights and civic-space dimensions','Long-term indicator trends'],
    sources:[
      { title:'Constitution of the Republic of Türkiye', publisher:'Grand National Assembly of Türkiye', url:'https://cdn.tbmm.gov.tr/TbmmWeb/Yayinlar/Dosya/ea266075-d26a-4bad-8007-efa2b7b773a8.pdf', checkedAt },
      { title:'About the Grand National Assembly of Türkiye', publisher:'Grand National Assembly of Türkiye', url:'https://cdn.tbmm.gov.tr/TbmmWeb/Yayinlar/Dosya/72b234ad-f25c-42fa-817a-10b41aee94a3.pdf', checkedAt },
    ],
  },
  {
    slug: 'israel', name: 'Israel', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System','Parliamentary republic operating through Basic Laws rather than one consolidated constitution'],['Head of state','President'],['Head of government','Prime Minister'],['Legislature','Knesset: one elected chamber of 120 members'],['Constitutional framework','Basic Laws enacted by the Knesset']],
    power: [
      'The Knesset is the national legislature and is elected through national proportional elections. Government takes office after receiving the confidence of the Knesset and is collectively responsible to it.',
      'The prime minister heads the government. The president is head of state with functions defined by law, including a formal role in the process of assigning the task of forming a government.',
      'Israel does not have one consolidated written constitution. Basic Laws regulate major parts of the state structure, government, legislature, judiciary and rights framework, and their constitutional status has also been the subject of legal and political debate.',
    ],
    vocabulary: [
      'Israeli political competition includes security, religion–state relations, economic policy, constitutional questions, Jewish and Arab political representation, and competing positions on the Israeli–Palestinian conflict. These dimensions do not map cleanly onto another country’s left–right spectrum.',
      'Terms such as “left”, “right”, “religious”, “secular”, “national”, “Zionist” and “Arab” can refer to different dimensions. Politangle should describe the specific issue rather than infer a complete political profile from one label.',
    ],
    timeline: [
      { year:'1948', title:'State established', text:'The State of Israel declared independence and established provisional representative institutions.' },
      { year:'1950', title:'Harari compromise', text:'The Knesset decided that constitutional chapters would be enacted gradually as Basic Laws rather than through one immediate constitutional document.' },
      { year:'1958', title:'First Basic Law', text:'Basic-Law: The Knesset became the first Basic Law in the evolving constitutional framework.' },
      { year:'1992', title:'Rights-related Basic Laws', text:'Basic Laws on human dignity and freedom of occupation became central parts of later constitutional and judicial debate.' },
    ],
    incomplete:['Current office holders','Current Knesset and coalition/opposition composition','Latest national election and turnout','Current constitutional and judicial-reform developments','Rights, security and civic-space dimensions with careful source separation'],
    sources:[
      { title:'Basic Laws of the State of Israel', publisher:'The Knesset', url:'https://main.knesset.gov.il/en/activity/pages/basiclaws.aspx', checkedAt },
      { title:'The Knesset as a constitutive authority', publisher:'The Knesset', url:'https://m.knesset.gov.il/en/activity/pages/basiclawsandconstitution.aspx', checkedAt },
    ],
  },
  {
    slug: 'pakistan', name: 'Pakistan', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System','Federal parliamentary republic'],['Head of state','President'],['Head of government','Prime Minister'],['Legislature','Parliament: President, National Assembly and Senate'],['Territorial structure','Federal: provinces and the Islamabad Capital Territory']],
    power: [
      'The prime minister is the chief executive within a federal parliamentary system and must command support in the National Assembly.',
      'Parliament is bicameral. The National Assembly represents the population, while the Senate provides representation to the federating units and continuity between general elections.',
      'The Constitution divides responsibilities between federal and provincial institutions and establishes superior courts with constitutional jurisdiction.',
    ],
    vocabulary: [
      'Pakistani political competition combines economic policy with civil–military relations, federal–provincial power, religion, regional identity and constitutional questions. A single left–right label therefore hides important dimensions.',
      'Terms such as “Islamic”, “democratic”, “federal” and “national” have specific constitutional and party-political meanings in Pakistan and should be explained rather than imported from another political system.',
    ],
    timeline: [
      { year:'1947', title:'Independence and partition', text:'Pakistan became independent during the partition of British India, initially with eastern and western wings separated geographically.' },
      { year:'1971', title:'Bangladesh independence', text:'East Pakistan became independent Bangladesh after war and political breakdown, fundamentally reshaping the Pakistani federation.' },
      { year:'1973', title:'Current Constitution', text:'The 1973 Constitution established the core federal parliamentary framework, although it has been amended and interrupted by later military rule.' },
      { year:'2008–2010', title:'Parliamentary framework strengthened', text:'The return to civilian government was followed by major constitutional amendments that reduced presidential powers and expanded provincial autonomy.' },
    ],
    incomplete:['Current office holders','Current National Assembly and Senate composition','Latest national election and dispute review','Civil–military institutional context','Democracy, rights and civic-space dimensions'],
    sources:[
      { title:'How the National Assembly Works', publisher:'National Assembly of Pakistan', url:'https://na.gov.pk/en/content.php?id=246', checkedAt },
      { title:'Composition of Parliament', publisher:'National Assembly of Pakistan', url:'https://na.gov.pk/en/composition.php', checkedAt },
    ],
  },
  {
    slug: 'bangladesh', name: 'Bangladesh', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System','Unitary parliamentary republic under the constitutional framework'],['Head of state','President'],['Head of government','Prime Minister'],['Legislature','Jatiya Sangsad: one elected chamber'],['Constitution','Constitution of the People’s Republic of Bangladesh (1972), as amended']],
    power: [
      'The Constitution establishes a unicameral Parliament known as the Jatiya Sangsad. Parliament legislates, approves the budget and exercises constitutional oversight functions.',
      'Under the parliamentary framework, the prime minister leads government while the president serves as head of state with constitutionally defined functions.',
      'Bangladesh is a unitary state. The Supreme Court heads the judiciary and constitutional amendment authority lies with Parliament subject to the constitutional framework.',
    ],
    vocabulary: [
      'Bangladeshi party competition has historically been shaped by nationalism, secularism, religion, development policy, institutional legitimacy and the legacy of the independence movement, not only conventional economic left and right.',
      'The country has experienced major political transition since 2024. Politangle should distinguish the enduring constitutional structure from temporary or newly adopted arrangements and should not treat draft reforms as settled law.',
    ],
    timeline: [
      { year:'1971', title:'Independence', text:'Bangladesh emerged as an independent state after the Liberation War.' },
      { year:'1972', title:'Constitution adopted', text:'The new republic adopted a Constitution establishing its core state institutions and principles.' },
      { year:'1991', title:'Parliamentary government restored', text:'A constitutional amendment restored the parliamentary system after a period of presidential government.' },
      { year:'2024', title:'Major political transition', text:'A mass protest movement and change of government opened a new period of institutional and constitutional debate that requires current-source treatment.' },
    ],
    incomplete:['Current transitional/government structure','Any constitutional reforms adopted after the 2024 transition','Current Parliament and election timetable','Latest election and turnout review','Democracy, rights and civic-space dimensions'],
    sources:[
      { title:'Bangladesh Parliament — Introduction', publisher:'Bangladesh Parliament', url:'https://www.parliament.gov.bd/about/introduction', checkedAt },
      { title:'Bangladesh Parliament — Constitution', publisher:'Bangladesh Parliament', url:'https://www.parliament.gov.bd/', checkedAt },
    ],
  },
  {
    slug: 'thailand', name: 'Thailand', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System','Unitary parliamentary constitutional monarchy'],['Head of state','King'],['Head of government','Prime Minister'],['Legislature','National Assembly: House of Representatives and Senate'],['Constitution','2017 Constitution, as amended or supplemented by later law']],
    power: [
      'The House of Representatives is the directly elected chamber and is central to legislation, public finance and the formation of government under the parliamentary system.',
      'The Senate forms the second chamber of the National Assembly and exercises constitutionally defined legislative, appointment and oversight functions whose selection rules have changed over time.',
      'The king is head of state under a constitutional monarchy. Courts include a Constitutional Court with powers defined by the Constitution.',
    ],
    vocabulary: [
      'Thai political conflict has often involved elected-party competition, monarchy, military intervention, constitutional design, regional voting patterns and reform movements. These dimensions are not captured by a simple imported left–right line.',
      'Terms such as “royalist”, “reformist”, “populist”, “conservative” or “pro-democracy” can carry contested meanings. Politangle should connect them to specific institutional or policy positions rather than use them as totalising labels.',
    ],
    timeline: [
      { year:'1932', title:'Constitutional monarchy begins', text:'A political revolution ended absolute monarchy and introduced constitutional government.' },
      { year:'1997', title:'People’s Constitution', text:'A new Constitution introduced extensive institutional reforms before being displaced after a later military coup.' },
      { year:'2014', title:'Military coup', text:'The armed forces removed the elected government and established military rule.' },
      { year:'2017', title:'Current constitutional framework', text:'A new Constitution was promulgated and became the basis for subsequent elections and state institutions.' },
    ],
    incomplete:['Current office holders','Current House and Senate composition','Latest general election and government-formation review','Current constitutional amendment proposals','Rights and civic-space dimensions'],
    sources:[
      { title:'Constitution', publisher:'National Assembly of Thailand', url:'https://www.parliament.go.th/view/7/Constitution/EN-US', checkedAt },
      { title:'Powers and duties of the House of Representatives', publisher:'National Assembly of Thailand', url:'https://www.parliament.go.th/view/1/%E0%B8%AD%E0%B8%B3%E0%B8%99%E0%B8%B2%E0%B8%88%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%AA%E0%B8%A0%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B9%81%E0%B8%97%E0%B8%99%E0%B8%A3%E0%B8%B2%E0%B8%A9%E0%B8%8E%E0%B8%A3/TH-TH', checkedAt },
    ],
  },
  {
    slug: 'sri-lanka', name: 'Sri Lanka', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System','Unitary republic with a directly elected president and parliamentary government'],['Head of state and executive','President'],['Head of government','Prime Minister'],['Legislature','Parliament: one elected chamber'],['Constitution','1978 Constitution, substantially amended']],
    power: [
      'The president is directly elected and holds executive powers defined by the Constitution. A prime minister and cabinet operate within the constitutional relationship between presidency and Parliament.',
      'The unicameral Parliament legislates, controls public finance and exercises oversight, confidence and constitutional-amendment functions.',
      'The Supreme Court and other courts form the judiciary. Sri Lanka is unitary, although provincial councils provide a constitutionally recognised layer of devolved administration.',
    ],
    vocabulary: [
      'Sri Lankan political competition includes economic policy, Sinhala and Tamil nationalism, religion, devolution, executive-presidential power and the legacy of civil conflict. These dimensions cannot be reduced to one left–right axis.',
      '“Nationalist”, “federal”, “unitary” and “devolution” are especially sensitive constitutional terms in Sri Lanka and should be used with precise institutional definitions.',
    ],
    timeline: [
      { year:'1948', title:'Independence', text:'Ceylon became an independent state within the Commonwealth.' },
      { year:'1972', title:'Republic established', text:'A new Constitution created the Republic of Sri Lanka and replaced the previous dominion framework.' },
      { year:'1978', title:'Executive presidency introduced', text:'A new Constitution created the executive-presidential structure that, with later amendments, remains central to the system.' },
      { year:'2009', title:'Civil war ends', text:'The long conflict between the state and the Liberation Tigers of Tamil Eelam ended militarily, leaving lasting political debates over reconciliation, rights and devolution.' },
    ],
    incomplete:['Current office holders','Current Parliament and party/coalition profiles','Latest presidential and parliamentary election review','Current constitutional-reform proposals','Rights, reconciliation and civic-space dimensions'],
    sources:[
      { title:'Constitution', publisher:'Parliament of Sri Lanka', url:'https://www.parliament.lk/en/constitution/main', checkedAt },
      { title:'Parliament of Sri Lanka', publisher:'Parliament of Sri Lanka', url:'https://www.parliament.lk/', checkedAt },
    ],
  },
  {
    slug: 'nepal', name: 'Nepal', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System','Federal parliamentary republic'],['Head of state','President'],['Head of government','Prime Minister'],['Legislature','Federal Parliament: House of Representatives and National Assembly'],['Territorial structure','Federal: seven provinces plus local governments']],
    power: [
      'The House of Representatives is directly elected and is central to government confidence and formation. The National Assembly is a permanent upper chamber designed in part to represent the provinces and groups specified by the Constitution.',
      'The president is head of state, while executive government is led by the prime minister and Council of Ministers under the parliamentary system.',
      'The 2015 Constitution created a federal structure with national, provincial and local levels of government and an independent judiciary headed by the Supreme Court.',
    ],
    vocabulary: [
      'Nepal’s politics has been shaped by monarchy versus republic, federalism, inclusion, caste and ethnic representation, secularism, communist party traditions and regional demands alongside economic policy.',
      'Several major parties use “communist” in their names while participating in competitive parliamentary politics and containing different ideological currents. The label alone does not describe every policy position.',
    ],
    timeline: [
      { year:'1990', title:'Multiparty constitutional monarchy restored', text:'A popular movement ended the partyless Panchayat system and restored competitive multiparty politics under a constitutional monarchy.' },
      { year:'1996–2006', title:'Maoist insurgency', text:'A decade-long armed conflict transformed the political system and ended through a comprehensive peace process.' },
      { year:'2008', title:'Republic declared', text:'The Constituent Assembly abolished the monarchy and declared Nepal a federal democratic republic.' },
      { year:'2015', title:'Federal Constitution', text:'A new Constitution established the current federal parliamentary system and seven provinces.' },
    ],
    incomplete:['Current office holders','Current House and National Assembly composition','Latest federal election and turnout','Federal implementation and inclusion indicators','Rights and civic-space dimensions'],
    sources:[
      { title:'Constitution of Nepal', publisher:'Federal Parliament of Nepal', url:'https://na.parliament.gov.np/en/publication/1597568369', checkedAt },
      { title:'National Assembly, Nepal', publisher:'Federal Parliament of Nepal', url:'https://na.parliament.gov.np/en/national-assembly-nepal', checkedAt },
    ],
  },
  {
    slug: 'egypt', name: 'Egypt', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System','Unitary republic with a president, government and bicameral legislature'],['Head of state','President of the Republic'],['Head of government','Prime Minister'],['Legislature','Parliament: House of Representatives and Senate'],['Constitution','2014 Constitution, subsequently amended']],
    power: [
      'The Constitution identifies the president as head of state and head of the executive branch. The prime minister heads the government and ministers within the constitutional executive structure.',
      'The House of Representatives exercises the primary legislative role, budget authority and government accountability functions. The Senate has constitutionally defined consultative and legislative-related responsibilities.',
      'The Constitution establishes a judiciary, Supreme Constitutional Court, national election institutions and local administration within a unitary state.',
    ],
    vocabulary: [
      'Egyptian political language is shaped by republicanism, Arab nationalism, political Islam, secular and civil-state arguments, military institutions, economic reform and social policy. Imported Western left–right labels explain only part of this landscape.',
      'The phrase “civil state” in Egyptian debate has a specific domestic history and can refer to different positions on military rule, clerical rule and constitutional government; it should not be translated as a simple ideological label.',
    ],
    timeline: [
      { year:'1952–1953', title:'Monarchy ends and republic established', text:'The Free Officers movement removed the monarchy and Egypt became a republic.' },
      { year:'1971', title:'New Constitution', text:'A new Constitution structured the state during the Sadat era and remained in force, with amendments, until the 2011 revolution.' },
      { year:'2011', title:'Revolution and constitutional transition', text:'Mass protests ended Hosni Mubarak’s presidency and opened a turbulent period of electoral and constitutional change.' },
      { year:'2014', title:'Current Constitution adopted', text:'A new Constitution was approved by referendum and later amended.' },
    ],
    incomplete:['Current office holders','Current House and Senate composition','Latest presidential and parliamentary election review','Current constitutional amendment status','Rights and civic-space dimensions'],
    sources:[
      { title:'Constitution', publisher:'State Information Service of Egypt', url:'https://hrightsstudies.sis.gov.eg/en/constitution/', checkedAt },
      { title:'Egyptian Constitution', publisher:'State Information Service of Egypt', url:'https://www.sis.gov.eg/Story/84172/Constitution-of-The-Arab-Republic-of-Egypt?lang=en-us', checkedAt },
    ],
  },
  {
    slug: 'morocco', name: 'Morocco', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System','Unitary parliamentary constitutional monarchy'],['Head of state','King'],['Head of government','Head of Government'],['Legislature','Parliament: House of Representatives and House of Councillors'],['Constitution','Constitution approved by referendum in 2011']],
    power: [
      'The king is head of state and exercises powers defined by the Constitution. The Head of Government leads the government within a constitutional monarchy and is appointed through the electoral and parliamentary framework set out in the Constitution.',
      'Parliament is bicameral. The House of Representatives is directly elected, while the House of Councillors represents territorial, professional and other constitutionally defined interests through indirect election.',
      'The Constitution recognises regional and local government and provides for constitutional review and a range of rights and institutions.',
    ],
    vocabulary: [
      'Moroccan political competition includes monarchy, party politics, political Islam, social democracy, liberal and conservative traditions, regional development and language and identity questions.',
      '“Monarchy”, “government” and “parliamentary” must be read together in Morocco: elected institutions exercise significant functions, while the king retains distinct constitutional, religious and strategic powers.',
    ],
    timeline: [
      { year:'1956', title:'Independence', text:'Morocco ended the French and Spanish protectorate arrangements and re-established full sovereignty under the monarchy.' },
      { year:'1962', title:'First post-independence Constitution', text:'A referendum approved a constitutional framework for monarchy, government and Parliament.' },
      { year:'1996', title:'Constitutional reform', text:'A constitutional revision established a bicameral Parliament and adjusted institutional relationships.' },
      { year:'2011', title:'Current Constitution', text:'A new Constitution was approved by referendum amid regional protest movements and expanded the formal role of government, Parliament and rights protections.' },
    ],
    incomplete:['Current office holders','Current parliamentary composition and party profiles','Latest election and turnout','Western Sahara-related constitutional and territorial claims requiring source separation','Rights and civic-space dimensions'],
    sources:[
      { title:'Constitution of Morocco and Referendum Operations', publisher:'Maroc.ma', url:'https://www.maroc.ma/en/morocco/constitution', checkedAt },
      { title:'Parliament of Morocco', publisher:'Parliament of Morocco', url:'https://www.parlement.ma/en/', checkedAt },
    ],
  },
  {
    slug: 'tanzania', name: 'Tanzania', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System','Union republic with presidential government'],['Head of state and government','President of the United Republic'],['Legislature','National Assembly (Bunge): one national chamber'],['Union structure','Mainland Tanzania and Zanzibar; Zanzibar has separate institutions for non-Union matters'],['Constitution','Constitution of the United Republic of Tanzania (1977), as amended']],
    power: [
      'The President of the United Republic heads the Union executive. The National Assembly legislates on Union and mainland matters within the constitutional division of responsibilities.',
      'The National Assembly represents citizens, legislates, approves public finance and oversees and advises the Union government under powers set out in the Constitution.',
      'The Union structure is distinctive: Zanzibar has its own President, House of Representatives and government for matters that are not assigned to the Union.',
    ],
    vocabulary: [
      'Tanzanian politics combines Union questions, mainland–Zanzibar relations, development policy, party competition and decentralisation. “Federal” is not the formal constitutional label, even though the Union contains two historically distinct components.',
      'The long history of CCM and its predecessor parties matters for political development, but party dominance should be analysed separately from the formal constitutional powers of Parliament, courts and executive institutions.',
    ],
    timeline: [
      { year:'1961', title:'Tanganyika independence', text:'Tanganyika became independent from British rule.' },
      { year:'1964', title:'Union of Tanganyika and Zanzibar', text:'Tanganyika and Zanzibar united to form the United Republic of Tanzania.' },
      { year:'1977', title:'Current Union Constitution', text:'The present constitutional framework was adopted and has subsequently been amended.' },
      { year:'1992', title:'Multiparty politics restored', text:'Constitutional changes ended the formal one-party system and permitted multiparty electoral competition.' },
    ],
    incomplete:['Current office holders','Current National Assembly and Zanzibar institutions','Latest Union and Zanzibar election review','Current constitutional-reform status','Rights and civic-space dimensions'],
    sources:[
      { title:'Constitution of Tanzania', publisher:'Parliament of Tanzania', url:'https://www.parliament.go.tz/documents/constitution-of-tanzania', checkedAt },
      { title:'Functions of Parliament', publisher:'Parliament of Tanzania', url:'https://www.parliament.go.tz/pages/function', checkedAt },
    ],
  },
  {
    slug: 'uganda', name: 'Uganda', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System','Unitary presidential republic'],['Head of state and government','President'],['Legislature','Parliament: one chamber with constituency and constitutionally defined special representation'],['Courts','Supreme Court, Court of Appeal/Constitutional Court and lower courts'],['Constitution','1995 Constitution, as amended']],
    power: [
      'The president leads the executive separately from Parliament. Parliament has constitutional authority to legislate, approve public finance and oversee government.',
      'Parliament combines directly elected constituency members with constitutionally or statutorily defined representation for women and specified groups.',
      'The Constitution establishes an independent judiciary and a system of local government within a unitary state.',
    ],
    vocabulary: [
      'Ugandan political competition includes presidential power, party organisation, regional interests, decentralisation, security institutions, social policy and generational change. These dimensions do not fit neatly on one imported left–right scale.',
      'Reserved and special-interest representation is part of the constitutional design of Parliament; it should be explained as an institutional feature rather than treated as equivalent to party-list proportional representation.',
    ],
    timeline: [
      { year:'1962', title:'Independence', text:'Uganda became independent and began its post-colonial constitutional history.' },
      { year:'1971–1979', title:'Idi Amin dictatorship', text:'A military dictatorship dismantled constitutional government and committed severe human-rights abuses.' },
      { year:'1986', title:'National Resistance Movement takes power', text:'The National Resistance Movement assumed power after civil conflict and established a new political order.' },
      { year:'1995', title:'Current Constitution', text:'A new Constitution established the present presidential, parliamentary and judicial framework.' },
    ],
    incomplete:['Current office holders','Current Parliament composition','Latest presidential and parliamentary election review','Political-party and term-limit history update','Rights and civic-space dimensions'],
    sources:[
      { title:'Constitution', publisher:'Parliament of Uganda', url:'https://www.parliament.go.ug/page/constitution', checkedAt },
      { title:'About Parliament', publisher:'Parliament of Uganda', url:'https://web.parliament.go.ug/page/about-parliament', checkedAt },
    ],
  },
  {
    slug: 'cameroon', name: 'Cameroon', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System','Decentralised unitary republic with presidential government'],['Head of state','President of the Republic'],['Head of government','Prime Minister'],['Legislature','Parliament: National Assembly and Senate'],['Official languages','English and French have equal official status under the Constitution']],
    power: [
      'The president is head of state and exercises extensive constitutional executive powers. A prime minister heads the government under the constitutional authority structure.',
      'Parliament is bicameral, consisting of the National Assembly and Senate. It legislates and exercises constitutionally defined oversight and other functions.',
      'The Constitution describes Cameroon as a decentralised unitary state and recognises regional and local authorities within that framework.',
    ],
    vocabulary: [
      'Cameroon’s politics is shaped by presidential institutions, decentralisation, bilingualism, regional identity, party competition and the Anglophone crisis. Those dimensions should be kept distinct rather than compressed into one ideological label.',
      '“Anglophone” and “Francophone” in Cameroon refer to language, legal-administrative traditions and regional political experience; they are not themselves complete ideological categories.',
    ],
    timeline: [
      { year:'1960–1961', title:'Independence and federation', text:'French-administered Cameroon became independent in 1960; Southern Cameroons joined in 1961, creating a federal republic.' },
      { year:'1972', title:'Unitary state', text:'A referendum replaced the federal structure with a unitary republic.' },
      { year:'1990', title:'Multiparty politics legalised', text:'Political liberalisation restored legal multiparty competition.' },
      { year:'1996', title:'Major constitutional revision', text:'A constitutional revision introduced a decentralised unitary model and provided for a bicameral Parliament including a Senate.' },
    ],
    incomplete:['Current 2026 constitutional-amendment consolidation','Current office holders','Current National Assembly and Senate composition','Latest election and turnout','Anglophone conflict, rights and civic-space dimensions'],
    sources:[
      { title:'Constitution', publisher:'Presidency of the Republic of Cameroon', url:'https://www.prc.cm/en/cameroon/constitution', checkedAt },
      { title:'Governing Instrument — Constitution', publisher:'National Assembly of Cameroon', url:'https://www.assnat.cm/index.php/fr/national-assembly/governing-instrument', checkedAt },
    ],
  },
  {
    slug: 'ecuador', name: 'Ecuador', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System','Unitary presidential republic with decentralised territorial government'],['Head of state and government','President'],['Legislature','National Assembly: one elected chamber'],['Courts','National Court of Justice and Constitutional Court within distinct constitutional jurisdictions'],['Constitution','Constitution of 2008, subsequently amended']],
    power: [
      'The president heads the executive separately from the unicameral National Assembly. Both institutions have direct electoral mandates under the presidential system.',
      'The National Assembly legislates, approves public finance and exercises political-control and constitutional functions, while the Constitutional Court reviews constitutional questions.',
      'Ecuador is unitary but constitutionally decentralised, with elected autonomous territorial governments at several levels.',
    ],
    vocabulary: [
      'Ecuadorian politics combines economic left and right with Indigenous movements, regional divides, resource policy, constitutional rights, public security and presidential–legislative conflict.',
      '“Correísmo” refers to the political movement and legacy associated with Rafael Correa and cannot be treated as a synonym for every left-wing position in Ecuador.',
    ],
    timeline: [
      { year:'1979', title:'Return to elected civilian government', text:'A new constitutional order ended a period of military government and restored electoral civilian rule.' },
      { year:'1998', title:'Constitutional reform', text:'A new Constitution reorganised state institutions and rights before being replaced a decade later.' },
      { year:'2008', title:'Current Constitution', text:'A constituent process produced a new Constitution with expanded rights language, institutional changes and a reworked territorial model.' },
      { year:'2018', title:'Referendum reforms', text:'A national referendum approved amendments affecting political institutions, re-election rules and oversight bodies.' },
    ],
    incomplete:['Current office holders','Current National Assembly and party/coalition profiles','Latest presidential and legislative election review','Current security/emergency-law context','Rights and civic-space dimensions'],
    sources:[
      { title:'Constitution of the Republic of Ecuador', publisher:'National Assembly of Ecuador', url:'https://www.asambleanacional.gob.ec/es/contenido/constitucion-de-la-republica-del-ecuador', checkedAt },
      { title:'National Assembly of Ecuador', publisher:'National Assembly of Ecuador', url:'https://www.asambleanacional.gob.ec/es/home', checkedAt },
    ],
  },
  {
    slug: 'dominican-republic', name: 'Dominican Republic', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System','Unitary presidential republic'],['Head of state and government','President'],['Legislature','National Congress: Senate and Chamber of Deputies'],['Territorial structure','Unitary state with elected municipal government'],['Constitution','Constitution revised and proclaimed in 2024']],
    power: [
      'The president heads the executive separately from the bicameral National Congress. Executive and legislative institutions hold separate electoral mandates.',
      'The Senate and Chamber of Deputies jointly exercise legislative power, with distinct representation rules and constitutionally assigned functions for each chamber.',
      'The Constitution establishes judicial and constitutional-review institutions as well as elected municipal government within a unitary state.',
    ],
    vocabulary: [
      'Dominican party competition includes economic and social policy, institutional reform, migration and nationality questions, public services and the historical legacies of major party movements.',
      'Party names such as “revolutionary”, “liberation” or “modern revolutionary” are historical organisational labels; they should not be interpreted literally as evidence that a party is revolutionary in the ordinary contemporary sense.',
    ],
    timeline: [
      { year:'1844', title:'Independence and republic', text:'The Dominican Republic declared independence and established republican institutions.' },
      { year:'1930–1961', title:'Trujillo dictatorship', text:'Rafael Trujillo and his regime dominated the state for three decades until his assassination.' },
      { year:'1965–1966', title:'Civil conflict and constitutional restoration', text:'Civil war and foreign intervention were followed by elections and a renewed constitutional order.' },
      { year:'2024', title:'Constitution revised', text:'The National Assembly proclaimed a revised Constitution, continuing the country’s long history of constitutional amendment.' },
    ],
    incomplete:['Current office holders','Current Senate and Chamber composition and party profiles','Latest national election and turnout','Migration/nationality jurisprudence requiring careful sourcing','Rights and civic-space dimensions'],
    sources:[
      { title:'About the Chamber of Deputies', publisher:'Chamber of Deputies of the Dominican Republic', url:'https://camaradediputados.gob.do/nosotros/', checkedAt },
      { title:'Constitution of the Dominican Republic 2024', publisher:'Senate of the Dominican Republic', url:'https://transparencia.senadord.gob.do/base-legal-de-la-institucion/', checkedAt },
    ],
  },
] as const;
