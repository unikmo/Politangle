import type { CountryProfile } from './countries';

const checkedAt = '2026-09-19';

export const additionalCountryProfiles: readonly CountryProfile[] = [
  {
    slug: 'italy', name: 'Italy', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Unitary parliamentary republic with regional autonomy'], ['Head of state', 'President of the Republic'], ['Head of government', 'President of the Council of Ministers (Prime Minister)'], ['Legislature', 'Parliament: Chamber of Deputies and Senate of the Republic'], ['Parliamentary structure', 'Symmetric bicameralism: both chambers exercise substantially equal legislative and confidence powers']],
    power: [
      'The government must obtain and retain the confidence of both the Chamber of Deputies and the Senate. This makes coalition formation and parliamentary support central to executive survival.',
      'The two chambers perform substantially equal legislative functions: a bill normally becomes law only after both approve the same text. Parliament also elects the President of the Republic in a joint sitting enlarged by regional delegates.',
      'The Constitutional Court reviews constitutional disputes, while regions have constitutionally recognised legislative and administrative responsibilities. Italy is unitary but significantly decentralised.',
    ],
    vocabulary: [
      'Italian “liberal” traditions range from classical and market liberalism to centrist constitutional politics; the word does not map neatly onto the US centre-left meaning.',
      'Christian democracy, post-communist left traditions, national-conservative politics and regional autonomy have all shaped Italian competition. Party labels and coalitions can change faster than these underlying traditions.',
    ],
    timeline: [
      { year: '1946', title: 'Republic chosen by referendum', text: 'Voters chose a republic over the monarchy, opening the way to a constituent assembly and a new constitutional order.' },
      { year: '1948', title: 'Republican Constitution enters into force', text: 'The Constitution established the parliamentary republic, fundamental rights and the present institutional framework.' },
      { year: '1993–1994', title: 'Party-system transformation', text: 'Electoral reform, corruption investigations and party collapse reshaped post-war political competition and coalition building.' },
      { year: '2001', title: 'Regional powers revised', text: 'Constitutional reform changed the allocation of legislative responsibilities between the state and the regions.' },
    ],
    incomplete: ['Current office holders', 'Current parliamentary composition and party profiles', 'Latest national election and turnout', 'Democracy, rights and civic-space dimensions', 'Long-term indicator trends'],
    sources: [
      { title: 'Constitution', publisher: 'Senate of the Republic', url: 'https://www.senato.it/en/constitution', checkedAt },
      { title: 'The Chamber in the parliamentary system', publisher: 'Chamber of Deputies', url: 'https://conoscere.camera.it/la-camera-dei-deputati/la-camera-nel-sistema-parlamentare', checkedAt },
    ],
  },
  {
    slug: 'poland', name: 'Poland', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Unitary parliamentary republic with a directly elected president'], ['Head of state', 'President of the Republic'], ['Head of government', 'Prime Minister'], ['Legislature', 'Parliament: Sejm and Senate'], ['Territorial structure', 'Unitary state with elected regional and local self-government']],
    power: [
      'Legislative power is exercised by the Sejm and Senate. The government is politically responsible to the Sejm, which has the decisive role in sustaining or replacing a cabinet.',
      'The directly elected president represents the state and exercises constitutionally defined powers including participation in legislation. Executive authority is otherwise exercised through the Council of Ministers led by the prime minister.',
      'Courts and tribunals form a separate branch under the Constitution. Local self-government has constitutionally protected responsibilities even though Poland remains a unitary state.',
    ],
    vocabulary: [
      'Polish political competition combines economic and social left–right questions with disputes over national sovereignty, European integration, church–state relations and the institutional balance of power.',
      '“Liberal” may refer to market-oriented or socially liberal traditions, while “conservative” can combine national, religious and welfare-oriented positions. These packages do not reproduce US party coalitions exactly.',
    ],
    timeline: [
      { year: '1989', title: 'Negotiated democratic transition', text: 'Round Table agreements and partially free elections accelerated the end of communist rule and the restoration of competitive politics.' },
      { year: '1997', title: 'Current Constitution adopted', text: 'A new Constitution defined the present parliamentary, presidential and judicial framework and was approved in a referendum.' },
      { year: '1999', title: 'Territorial reform', text: 'A major reform reorganised regional and local government and strengthened decentralised administration.' },
      { year: '2004', title: 'European Union membership', text: 'Poland joined the European Union after a national referendum on accession.' },
    ],
    incomplete: ['Current office holders', 'Current Sejm and Senate composition and party profiles', 'Latest national elections and turnout', 'Democracy, rule-of-law and civic-space dimensions', 'Long-term indicator trends'],
    sources: [
      { title: 'Constitution of the Republic of Poland', publisher: 'Senate of the Republic of Poland', url: 'https://www.senat.gov.pl/en/about-the-senate/konstytucja/chapter-i/', checkedAt },
      { title: 'Sejm of the Republic of Poland', publisher: 'Sejm', url: 'https://www.sejm.gov.pl/english/sejm/pos.htm', checkedAt },
    ],
  },
  {
    slug: 'romania', name: 'Romania', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Unitary semi-presidential republic'], ['Head of state', 'President of Romania'], ['Head of government', 'Prime Minister'], ['Legislature', 'Parliament: Chamber of Deputies and Senate'], ['Constitution', '1991 Constitution, substantially revised in 2003']],
    power: [
      'Parliament is bicameral and is the sole legislative authority. The government is politically responsible to Parliament, while the president has a separate direct electoral mandate and constitutionally defined powers.',
      'The president nominates a candidate for prime minister, and the proposed government must obtain parliamentary confidence. This creates a dual executive in which presidential and governmental authority are distinct.',
      'The Constitutional Court reviews constitutionality and resolves specified institutional disputes. Romania remains unitary, with elected local public administration operating within the constitutional framework.',
    ],
    vocabulary: [
      'Romanian party names inherited from post-communist transitions can be misleading if read as simple Western European labels. Liberal, social-democratic, conservative and nationalist traditions have repeatedly recombined.',
      'Arguments over anti-corruption institutions, judicial independence, European integration, minority representation and the power of the presidency often cut across conventional economic left and right.',
    ],
    timeline: [
      { year: '1989', title: 'Communist regime falls', text: 'The Romanian Revolution ended Nicolae Ceaușescu’s rule and opened the transition to competitive electoral politics.' },
      { year: '1991', title: 'Democratic Constitution adopted', text: 'A new Constitution established the post-communist state structure and was approved by referendum.' },
      { year: '2003', title: 'Constitution revised', text: 'A major revision updated institutional rules and prepared the constitutional framework for deeper European integration.' },
      { year: '2007', title: 'European Union membership', text: 'Romania joined the European Union, adding a further layer of law and political accountability to domestic institutions.' },
    ],
    incomplete: ['Current office holders', 'Current parliamentary composition and party profiles', 'Latest national elections and turnout', 'Democracy, rule-of-law and civic-space dimensions', 'Long-term indicator trends'],
    sources: [
      { title: 'Constitution of Romania', publisher: 'Chamber of Deputies', url: 'https://www.cdep.ro/pls/dic/site.page?den=act2_2&par1=3', checkedAt },
      { title: 'Constitution of Romania — overview', publisher: 'Chamber of Deputies', url: 'https://www.cdep.ro/pls/dic/site.page?den=act1_2', checkedAt },
    ],
  },
  {
    slug: 'portugal', name: 'Portugal', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Unitary semi-presidential republic'], ['Head of state', 'President of the Republic'], ['Head of government', 'Prime Minister'], ['Legislature', 'Assembly of the Republic: one elected chamber'], ['Constitution', 'Constitution of the Portuguese Republic (1976)']],
    power: [
      'The Assembly of the Republic is the single national parliamentary chamber and represents all citizens. The government depends on parliamentary support and is politically accountable to the Assembly.',
      'The president is directly elected and is institutionally separate from the government. Constitutional powers include appointing the prime minister in light of election results, promulgating legislation and dissolving parliament under defined conditions.',
      'The Constitutional Court reviews constitutional questions. The autonomous regions of the Azores and Madeira possess their own political and administrative institutions within the unitary state.',
    ],
    vocabulary: [
      'Portugal’s Social Democratic Party is generally a centre-right party despite its name. Party names therefore should not be translated into ideological placement without national context.',
      'The democratic order was shaped by the 1974 revolution and the constitutional debates that followed. Attitudes toward the welfare state, markets and the legacy of the revolutionary period remain distinct from the US liberal–conservative divide.',
    ],
    timeline: [
      { year: '1974', title: 'Carnation Revolution', text: 'A military-led uprising ended the authoritarian Estado Novo and opened a rapid transition to competitive democracy.' },
      { year: '1976', title: 'Democratic Constitution', text: 'The new Constitution created the present republican institutions and codified extensive political and social rights.' },
      { year: '1982', title: 'Constitutional revision', text: 'A major revision reduced the military’s formal political role and created the Constitutional Court.' },
      { year: '1986', title: 'European Communities membership', text: 'Portugal joined the European Communities, now the European Union.' },
    ],
    incomplete: ['Current office holders', 'Current Assembly composition and party profiles', 'Latest national election and turnout', 'Democracy, rights and civic-space dimensions', 'Long-term indicator trends'],
    sources: [
      { title: 'The Assembleia da República as a body that exercises sovereign power', publisher: 'Assembly of the Republic', url: 'https://www.parlamento.pt/sites/EN', checkedAt },
      { title: 'Constitutional revisions', publisher: 'Assembly of the Republic', url: 'https://www.parlamento.pt/sites/EN/Parliament/Paginas/Constitutional-revisions.aspx', checkedAt },
    ],
  },
  {
    slug: 'belgium', name: 'Belgium', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Federal parliamentary constitutional monarchy'], ['Head of state', 'King of the Belgians'], ['Head of government', 'Prime Minister'], ['Legislature', 'Federal Parliament: Chamber of Representatives and Senate'], ['Territorial structure', 'Federal state composed of communities and regions']],
    power: [
      'Power is divided not only between federal institutions but also among language-based communities and territorial regions. These entities exercise constitutionally assigned responsibilities within a federal state.',
      'The directly elected Chamber of Representatives is the central federal parliamentary chamber. The Senate was transformed into a largely indirectly composed chamber representing communities and regions.',
      'The king has constitutional functions but no personal political authority: ministers assume responsibility for royal acts. Coalition bargaining is central because linguistic and ideological divisions both shape federal government formation.',
    ],
    vocabulary: [
      'Belgian parties are largely organised in separate Dutch-speaking and French-speaking families. Liberal, socialist, Christian-democratic and green traditions therefore appear in parallel party systems rather than as single nationwide parties.',
      'Federalism, language and regional autonomy can be as politically important as economic left and right. Flemish or Francophone institutional preferences do not by themselves determine a party’s economic or social ideology.',
    ],
    timeline: [
      { year: '1830–1831', title: 'Independence and Constitution', text: 'Belgium became independent and adopted a constitution establishing a parliamentary constitutional monarchy.' },
      { year: '1970–1993', title: 'Federalisation', text: 'Successive state reforms transformed Belgium from a unitary state into a federal state built around communities and regions.' },
      { year: '1993', title: 'Federal state confirmed', text: 'Constitutional reform formally defined Belgium as a federal state composed of communities and regions.' },
      { year: '2014', title: 'Senate fundamentally reformed', text: 'The Senate became a non-permanent chamber whose membership mainly comes from community and regional parliaments.' },
    ],
    incomplete: ['Current office holders', 'Current federal and regional party composition', 'Latest election and turnout', 'Democracy, rights and civic-space dimensions', 'Long-term indicator trends'],
    sources: [
      { title: 'Belgium, a federal state', publisher: 'Belgium.be', url: 'https://www.belgium.be/en/about_belgium/government/federale_staat', checkedAt },
      { title: 'The federal parliament', publisher: 'Belgium.be', url: 'https://www.belgium.be/en/about_belgium/government/federal_authorities/federal_parliament', checkedAt },
    ],
  },
  {
    slug: 'switzerland', name: 'Switzerland', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Federal republic with parliamentary and direct-democratic institutions'], ['Collective executive', 'Seven-member Federal Council'], ['Legislature', 'Federal Assembly: National Council and Council of States'], ['Territorial structure', 'Federal: 26 cantons with substantial autonomy'], ['Direct democracy', 'Popular initiatives and referendums operate alongside representative institutions']],
    power: [
      'The Federal Assembly elects the seven-member Federal Council. The council governs collectively rather than around a single politically dominant president or prime minister.',
      'The National Council represents the population and the Council of States represents the cantons. Federal legislation normally requires agreement between both chambers.',
      'Citizens can challenge legislation through referendums and propose constitutional amendments through popular initiatives. Cantons retain extensive authority, making federalism and direct democracy central to how power is distributed.',
    ],
    vocabulary: [
      'Swiss “radical-liberal” politics has roots in the nineteenth-century movement that built the federal state; “radical” here is a historical label and does not mean political extremism.',
      'Federalism, linguistic region, urban–rural differences and attitudes toward direct democracy and European integration can cut across the conventional left–right spectrum.',
    ],
    timeline: [
      { year: '1848', title: 'Federal state created', text: 'A new Federal Constitution transformed the confederation of states into the modern Swiss federal state.' },
      { year: '1874', title: 'Referendum strengthened', text: 'A total constitutional revision expanded federal powers and introduced the optional referendum at federal level.' },
      { year: '1891', title: 'Popular initiative introduced', text: 'Citizens gained the federal constitutional initiative, allowing them to propose partial amendments to the Constitution.' },
      { year: '1999–2000', title: 'Current Constitution adopted', text: 'Voters and cantons approved a modernised Federal Constitution, which entered into force in 2000.' },
    ],
    incomplete: ['Current Federal Council and parliamentary composition', 'Latest federal election and turnout', 'Current referendum agenda', 'Democracy, rights and civic-space dimensions', 'Long-term indicator trends'],
    sources: [
      { title: 'Political system', publisher: 'Swiss Federal Department of Foreign Affairs', url: 'https://www.aboutswitzerland.eda.admin.ch/en/political-system', checkedAt },
      { title: 'Federal Constitution', publisher: 'Swiss Parliament', url: 'https://www.parlament.ch/en/%C3%BCber-das-parlament/Pages/bundesverfassung.aspx', checkedAt },
    ],
  },
  {
    slug: 'ireland', name: 'Ireland', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Unitary parliamentary republic'], ['Head of state', 'President of Ireland'], ['Head of government', 'Taoiseach'], ['Legislature', 'Oireachtas: President, Dáil Éireann and Seanad Éireann'], ['Electoral system', 'Dáil elections use proportional representation by single transferable vote (PR-STV)']],
    power: [
      'The government must retain the confidence of Dáil Éireann. The Taoiseach and cabinet emerge from the parliamentary majority or agreements capable of sustaining a government in the Dáil.',
      'The Oireachtas makes laws and holds government to account. The Seanad can revise and delay most legislation, but the Dáil has the stronger democratic and financial role.',
      'The president has a mainly constitutional role and may refer certain bills to the Supreme Court for a constitutional decision. Constitutional amendments require approval by referendum.',
    ],
    vocabulary: [
      '“Republican” in Irish politics is strongly connected to Irish nationalism, constitutional status and the history of partition; it does not mean the same thing as “Republican” in US party politics.',
      'Two historically dominant parties emerged from opposing sides of the civil-war split rather than a simple left–right division. Contemporary economic and social competition increasingly overlays that older cleavage.',
    ],
    timeline: [
      { year: '1922', title: 'Irish Free State established', text: 'The Irish Free State was created after the independence struggle and Anglo-Irish Treaty, while Northern Ireland remained in the United Kingdom.' },
      { year: '1937', title: 'Current Constitution adopted', text: 'Bunreacht na hÉireann established the present constitutional institutions and was approved by referendum.' },
      { year: '1949', title: 'Republic declared in law', text: 'The Republic of Ireland Act ended the remaining external role of the British Crown in the state’s international relations.' },
      { year: '1973', title: 'European Communities membership', text: 'Ireland joined the European Communities following a referendum.' },
    ],
    incomplete: ['Current office holders', 'Current Dáil and Seanad composition and party profiles', 'Latest election and turnout', 'Democracy, rights and civic-space dimensions', 'Long-term indicator trends'],
    sources: [
      { title: 'How Parliament works', publisher: 'Houses of the Oireachtas', url: 'https://www.oireachtas.ie/en/visit-and-learn/how-parliament-works/', checkedAt },
      { title: 'Voting in Ireland', publisher: 'Houses of the Oireachtas', url: 'https://www.oireachtas.ie/en/visit-and-learn/how-parliament-works/voting-in-ireland/', checkedAt },
    ],
  },
  {
    slug: 'argentina', name: 'Argentina', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Federal presidential republic'], ['Head of state and government', 'President'], ['Legislature', 'National Congress: Chamber of Deputies and Senate'], ['Courts', 'Supreme Court and lower federal courts'], ['Territorial structure', 'Federal: provinces and the Autonomous City of Buenos Aires retain their own institutions']],
    power: [
      'The president heads the executive separately from Congress. Congress makes national law through two elected chambers, with deputies representing the population and senators representing the provinces and Buenos Aires.',
      'Federalism is constitutionally central: provinces govern themselves under their own constitutions while powers assigned to the nation are exercised by federal institutions.',
      'The judiciary can review the constitutionality of public acts. The 1994 constitutional reform also strengthened several accountability and institutional mechanisms while retaining presidential government.',
    ],
    vocabulary: [
      'Peronism is a broad political tradition rather than a single point on a left–right line. It has contained labour, nationalist, welfare-oriented, market-oriented and socially conservative currents at different times.',
      'The Radical Civic Union’s name is historical: “radical” does not mean extremist in current international usage. Provincial politics and federal fiscal relations also shape competition independently of national ideology.',
    ],
    timeline: [
      { year: '1853', title: 'Federal Constitution', text: 'A national Constitution established the federal republican framework that, with later reforms, remains the foundation of the state.' },
      { year: '1946', title: 'Peronist era begins', text: 'Juan Perón’s election consolidated a mass political movement that became one of the enduring traditions of Argentine politics.' },
      { year: '1976–1983', title: 'Military dictatorship', text: 'A military regime suspended democratic government and committed systematic human-rights abuses before collapsing and returning power to elected civilians.' },
      { year: '1994', title: 'Constitutional reform', text: 'A major reform changed presidential terms and election rules and revised the structure of national institutions.' },
    ],
    incomplete: ['Current office holders', 'Current Congress and party/coalition profiles', 'Latest national election and turnout', 'Democracy, rights and institutional-quality dimensions', 'Long-term indicator trends'],
    sources: [
      { title: 'National Constitution', publisher: 'Congress of the Argentine Nation', url: 'https://www.congreso.gob.ar/nationalConstitution.php', checkedAt },
      { title: 'Legislative Power — functions', publisher: 'Congress of the Argentine Nation', url: 'https://www.congreso.gob.ar/poderLegislativo.php', checkedAt },
    ],
  },
  {
    slug: 'colombia', name: 'Colombia', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Unitary presidential republic with decentralised territorial government'], ['Head of state and government', 'President'], ['Legislature', 'Congress: Senate and House of Representatives'], ['Courts', 'Constitutional Court, Supreme Court, Council of State and other courts'], ['Constitution', 'Political Constitution of 1991']],
    power: [
      'The president leads the executive separately from Congress. Congress is bicameral and exercises legislative, constitutional-reform and political-control functions.',
      'The House represents territorial and special constituencies while the Senate has a national representative role alongside special seats. The chambers also exercise distinct constitutional appointment and accountability functions.',
      'The 1991 Constitution strengthened constitutional review, rights protection and decentralised government. Departments and municipalities elect authorities and administer significant responsibilities within a unitary state.',
    ],
    vocabulary: [
      'The Liberal and Conservative names refer to historic Colombian party traditions and should not be mapped directly onto contemporary US party labels.',
      'Security, the armed conflict and peace implementation, rural land, regional inequality and decentralisation have often structured political disagreement alongside economic and social left–right questions.',
    ],
    timeline: [
      { year: '1886', title: 'Long-lived central Constitution', text: 'A new Constitution created a strongly centralised framework that remained in force, with amendments, for more than a century.' },
      { year: '1958–1974', title: 'National Front', text: 'Liberal and Conservative elites alternated the presidency and shared public offices after a period of intense partisan violence.' },
      { year: '1991', title: 'New Constitution', text: 'A constituent process produced a rights-focused Constitution with stronger judicial review, political pluralism and decentralisation.' },
      { year: '2016', title: 'Peace agreement with FARC', text: 'The government and FARC signed a peace agreement that reshaped debates over security, transitional justice, rural policy and political participation.' },
    ],
    incomplete: ['Current office holders', 'Current Congress and party/coalition profiles', 'Latest national election and turnout', 'Peace-process and security indicators', 'Democracy, rights and civic-space dimensions'],
    sources: [
      { title: 'Functions and powers of the House of Representatives', publisher: 'House of Representatives of Colombia', url: 'https://www.camara.gov.co/que-es-la-camara/funciones-y-atribuciones/', checkedAt },
      { title: 'Basic guide to the structure and functions of Congress', publisher: 'House of Representatives of Colombia', url: 'https://www.camara.gov.co/wp-content/uploads/2025/06/Guia-basica-Estructura-y-Funciones-del-Congreso._0.pdf', checkedAt },
    ],
  },
  {
    slug: 'chile', name: 'Chile', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Unitary presidential republic'], ['Head of state and government', 'President'], ['Legislature', 'National Congress: Chamber of Deputies and Senate'], ['Courts', 'Supreme Court and other courts; Constitutional Court has defined constitutional-review functions'], ['Constitution', '1980 Constitution, subsequently amended many times']],
    power: [
      'The president leads the executive separately from the bicameral National Congress. Legislative authority is shared through constitutionally defined procedures and the executive has important agenda and legislative powers.',
      'The Chamber of Deputies and Senate perform different functions in law-making and accountability. Courts adjudicate ordinary legal disputes, while the Constitutional Court performs specified constitutional-review tasks.',
      'Chile is unitary but has progressively expanded elected regional and local government. The division of authority between national institutions and subnational government remains constitutionally regulated.',
    ],
    vocabulary: [
      'Chilean left and right have strong historical roots, but contemporary coalitions also divide over the legacy of military rule, constitutional design, pensions, social policy, public security and the role of markets.',
      '“Liberal” can describe economic liberalism, civil-libertarian positions or specific party traditions. Those meanings should be separated rather than treated as one fixed ideological package.',
    ],
    timeline: [
      { year: '1973', title: 'Military coup', text: 'The armed forces overthrew President Salvador Allende, beginning a military dictatorship under Augusto Pinochet.' },
      { year: '1980–1981', title: 'New Constitution', text: 'A constitution approved under military rule was promulgated in 1980 and entered into force in 1981.' },
      { year: '1990', title: 'Return to elected civilian government', text: 'An elected president took office after the 1988 plebiscite rejected an extension of Pinochet’s rule.' },
      { year: '2005', title: 'Major constitutional reform', text: 'A package of amendments removed or changed several institutional provisions inherited from the military period.' },
    ],
    incomplete: ['Current office holders', 'Current Congress and party/coalition profiles', 'Latest election and turnout', 'Constitutional-reform developments after 2005', 'Democracy, rights and civic-space dimensions'],
    sources: [
      { title: 'Constitution of the Republic of Chile — consolidated text', publisher: 'Library of the National Congress of Chile', url: 'https://www.bcn.cl/leychile/navegar?idNorma=242302', checkedAt },
      { title: 'Political constitutions and constitutional acts', publisher: 'Library of the National Congress of Chile', url: 'https://www.bcn.cl/historiapolitica/constituciones/index.html', checkedAt },
    ],
  },
  {
    slug: 'peru', name: 'Peru', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Unitary presidential republic'], ['Head of state and government', 'President'], ['Legislature', 'Bicameral Congress: Chamber of Deputies and Senate'], ['Legislative structure', 'Bicameralism restored in 2026 after more than three decades of unicameralism'], ['Constitution', 'Political Constitution of 1993, as amended']],
    power: [
      'The president heads the executive separately from Congress. Since July 2026, national legislative power is again exercised through a Chamber of Deputies and a Senate.',
      'The Chamber of Deputies initiates and approves legislation that is then reviewed by the Senate, while the Senate also has constitutionally defined appointment and review functions. The executive and legislature retain separate electoral mandates.',
      'The Constitutional Court reviews constitutional disputes. Peru is unitary but has elected regional and municipal governments with decentralised responsibilities.',
    ],
    vocabulary: [
      'Peruvian parties and electoral vehicles are often organisationally fluid, so a party name alone may reveal less about ideology than its candidates, programme, alliances and regional base.',
      'Debates over presidential power, congressional accountability, decentralisation, informality, public security and the political role of anti-corruption institutions frequently cut across a simple left–right line.',
    ],
    timeline: [
      { year: '1979–1980', title: 'Return to constitutional government', text: 'A new Constitution and elections marked the transition from military government back to civilian rule.' },
      { year: '1992–1993', title: 'Institutional rupture and new Constitution', text: 'President Alberto Fujimori dissolved Congress in 1992; a constituent process produced the 1993 Constitution and a unicameral legislature.' },
      { year: '2000–2001', title: 'Democratic transition', text: 'The collapse of the Fujimori government led to an interim administration and new elections.' },
      { year: '2026', title: 'Bicameral Congress restored', text: 'A constitutional reform took effect with a new Congress composed of a Chamber of Deputies and Senate, ending more than three decades of unicameralism.' },
    ],
    incomplete: ['Current office holders', 'Current Senate and Chamber composition and party profiles', '2026 election turnout and full results review', 'Democracy, institutional-stability and rights dimensions', 'Long-term indicator trends'],
    sources: [
      { title: 'Constitution and Standing Rules', publisher: 'Congress of the Republic of Peru', url: 'https://www.congreso.gob.pe/eng/overview/Constitution/', checkedAt },
      { title: 'Bicameral Congress for the 2026 elections', publisher: 'National Office of Electoral Processes', url: 'https://eg2026.onpe.gob.pe/bicameralidad/', checkedAt },
    ],
  },
  {
    slug: 'costa-rica', name: 'Costa Rica', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Unitary presidential republic'], ['Head of state and government', 'President'], ['Legislature', 'Legislative Assembly: one elected chamber'], ['Courts', 'Supreme Court and constitutional jurisdiction'], ['Electoral authority', 'Supreme Electoral Tribunal has constitutionally protected independence']],
    power: [
      'The president leads the executive separately from the unicameral Legislative Assembly. The Assembly makes laws and exercises constitutionally assigned oversight and appointment powers.',
      'The Supreme Electoral Tribunal is constitutionally independent and has exclusive responsibility for organising, directing and supervising electoral acts, giving electoral administration an unusually strong institutional position.',
      'The judiciary is a separate branch and constitutional review is exercised through the Supreme Court’s constitutional jurisdiction. Municipal government provides the main elected subnational layer in a unitary state.',
    ],
    vocabulary: [
      'Costa Rican party competition historically developed around reformist, social-democratic and social-Christian traditions, but newer parties have weakened the old two-party pattern.',
      '“Liberal” may refer to market reform or civil-libertarian positions rather than a single party family. Fiscal policy, social protection, public-sector institutions and religion can create different cross-cutting coalitions.',
    ],
    timeline: [
      { year: '1948', title: 'Civil war and political settlement', text: 'A short civil war was followed by a constituent process that reshaped democratic institutions and the party system.' },
      { year: '1949', title: 'Current Constitution', text: 'The Constitution established the modern institutional order and entrenched the independent electoral authority.' },
      { year: '1949', title: 'Standing army abolished', text: 'The Constitution abolished the army as a permanent institution, making civilian public institutions central to national security and state identity.' },
      { year: '1989', title: 'Constitutional chamber created', text: 'Reform established a specialised constitutional chamber within the Supreme Court, strengthening judicial review of laws and rights claims.' },
    ],
    incomplete: ['Current office holders', 'Current Legislative Assembly and party profiles', '2026 election results and turnout review', 'Democracy, rights and civic-space dimensions', 'Long-term indicator trends'],
    sources: [
      { title: 'Political Constitution of the Republic of Costa Rica', publisher: 'Legislative Assembly', url: 'https://www.asamblea.go.cr/sd/Documents/BIBLIOTECADIGITAL/DOCUMENTOS/CONSTITUCI%C3%93N%20POL%C3%8DTICA/Constitucion%20pol%C3%ADtica%20historico%20reformas.pdf', checkedAt },
      { title: 'Electoral jurisdiction and system', publisher: 'Supreme Electoral Tribunal', url: 'https://www.tse.go.cr/generalidades_jurisdiccion.html', checkedAt },
    ],
  },
  {
    slug: 'kenya', name: 'Kenya', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Presidential republic with devolved county government'], ['Head of state and government', 'President'], ['Legislature', 'Parliament: National Assembly and Senate'], ['Courts', 'Supreme Court and other constitutionally established courts'], ['Territorial structure', 'National government and 47 county governments under the 2010 Constitution']],
    power: [
      'The president heads the national executive separately from Parliament. Parliament is bicameral, with the National Assembly and Senate exercising distinct constitutional functions.',
      'The National Assembly legislates on national matters and exercises budgetary and executive oversight. The Senate represents counties, participates in legislation concerning counties and oversees nationally allocated county revenue.',
      'Devolution is a central feature of the 2010 Constitution: counties have elected governments and constitutionally assigned functions. Courts can review public action under a supreme Constitution.',
    ],
    vocabulary: [
      'Kenyan party coalitions often combine regional, ethnic, personal and policy interests, so party labels alone may not reveal a stable left–right ideology.',
      '“Devolution” has a particularly concrete meaning in Kenya: it concerns the constitutional distribution of money, responsibilities and representation between the national government and 47 counties.',
    ],
    timeline: [
      { year: '1963', title: 'Independence', text: 'Kenya gained independence from Britain and established national representative institutions.' },
      { year: '1991', title: 'Multiparty politics restored', text: 'Constitutional change ended the formal one-party system and restored multiparty electoral competition.' },
      { year: '2007–2008', title: 'Post-election crisis and settlement', text: 'Disputed elections were followed by widespread violence and a power-sharing settlement that accelerated demands for institutional reform.' },
      { year: '2010', title: 'New Constitution', text: 'A referendum approved a new Constitution with a presidential system, bill of rights, bicameral parliament and extensive county devolution.' },
    ],
    incomplete: ['Current office holders', 'Current National Assembly and Senate composition and coalition profiles', 'Latest national election and turnout', 'Devolution, rights and civic-space dimensions', 'Long-term indicator trends'],
    sources: [
      { title: 'About Parliament', publisher: 'Parliament of Kenya', url: 'https://www.parliament.go.ke/About_Parliament/', checkedAt },
      { title: 'Constitution of Kenya (2010)', publisher: 'Parliament of Kenya / National Council for Law Reporting', url: 'https://www.parliament.go.ke/constitution', checkedAt },
    ],
  },
  {
    slug: 'ghana', name: 'Ghana', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Unitary presidential republic'], ['Head of state and government', 'President'], ['Legislature', 'Parliament: one elected chamber'], ['Courts', 'Supreme Court and other superior and lower courts'], ['Constitution', '1992 Constitution of the Fourth Republic']],
    power: [
      'The president is both head of state and head of government and leads an executive institutionally separate from the unicameral Parliament.',
      'Legislative power is vested in Parliament. The Constitution also requires part of the ministerial team to be drawn from Parliament, creating an important connection between executive and legislative institutions.',
      'The Constitution is supreme and the Supreme Court can determine whether legislation or public action is inconsistent with it. Independent constitutional bodies perform electoral, auditing and other accountability functions.',
    ],
    vocabulary: [
      'Ghana’s two largest party traditions combine economic, regional and historical identities that do not map exactly onto US Democrats and Republicans or European party families.',
      'Ideas associated with Nkrumahism, social democracy, market liberalism, pan-Africanism and decentralisation remain important reference points, but contemporary parties contain broader coalitions than any one label suggests.',
    ],
    timeline: [
      { year: '1957', title: 'Independence', text: 'Ghana became the first sub-Saharan African colony to gain independence in the post-war wave of decolonisation.' },
      { year: '1966–1981', title: 'Coups and unstable constitutional periods', text: 'Repeated military interventions interrupted several attempts at civilian constitutional government.' },
      { year: '1992–1993', title: 'Fourth Republic', text: 'A new Constitution was approved and civilian constitutional government resumed under the framework still in force.' },
      { year: '2000–2001', title: 'Peaceful electoral transfer', text: 'An opposition presidential victory produced the first transfer of power between parties under the Fourth Republic.' },
    ],
    incomplete: ['Current office holders', 'Current parliamentary composition and party profiles', 'Latest national election and turnout', 'Democracy, rights and civic-space dimensions', 'Long-term indicator trends'],
    sources: [
      { title: 'Constitution of the Republic of Ghana 1992', publisher: 'Judicial Service of Ghana', url: 'https://judicial.gov.gh/index.php/the-constitution', checkedAt },
      { title: 'The Legislature', publisher: 'Judicial Service of Ghana', url: 'https://judicial.gov.gh/index.php/the-legislature', checkedAt },
    ],
  },
  {
    slug: 'senegal', name: 'Senegal', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Unitary republic with a directly elected president and a prime minister'], ['Head of state', 'President of the Republic'], ['Head of government', 'Prime Minister'], ['Legislature', 'National Assembly: one elected chamber'], ['Constitution', '2001 Constitution, subsequently amended']],
    power: [
      'The president is directly elected and holds substantial constitutional executive authority. A prime minister and government operate within that presidential constitutional framework.',
      'The National Assembly is the national legislature and exercises law-making and oversight functions. The precise balance among president, government and legislature has changed through constitutional revisions over time.',
      'The Constitutional Council adjudicates defined constitutional and electoral matters. Local authorities form the decentralised layer of government within a unitary state.',
    ],
    vocabulary: [
      'Senegalese party competition has historically mixed socialist, liberal, nationalist and pan-African traditions with leadership coalitions and debates over institutional reform.',
      'Terms such as “sovereignty”, “rupture” or “system change” can refer to domestic institutional reform, economic autonomy or foreign-policy orientation; they should not automatically be treated as left- or right-wing positions.',
    ],
    timeline: [
      { year: '1960', title: 'Independence', text: 'Senegal became independent and began building republican institutions after French colonial rule.' },
      { year: '1970s–1980s', title: 'Political competition broadens', text: 'Legal opposition expanded gradually and the party system moved from restricted competition toward a broader multiparty framework.' },
      { year: '2000', title: 'First opposition presidential alternation', text: 'An opposition candidate won the presidency, producing the first transfer of executive power between rival parties since independence.' },
      { year: '2001', title: 'Current Constitution adopted', text: 'A new Constitution was approved by referendum and has since been amended several times.' },
    ],
    incomplete: ['Current office holders', 'Current National Assembly and party/coalition profiles', 'Latest national election and turnout', 'Pending constitutional-reform developments', 'Democracy, rights and civic-space dimensions'],
    sources: [
      { title: 'Constitution of Senegal', publisher: 'Constitutional Council of Senegal', url: 'https://conseilconstitutionnel.sn/la-constitution/', checkedAt },
      { title: 'Institutions of the Republic', publisher: 'Presidency of Senegal', url: 'https://www.presidence.sn/en/institutions/', checkedAt },
    ],
  },
  {
    slug: 'australia', name: 'Australia', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Federal parliamentary constitutional monarchy'], ['Head of state', 'Monarch, represented federally by the Governor-General'], ['Head of government', 'Prime Minister'], ['Legislature', 'Parliament: Crown, Senate and House of Representatives'], ['Territorial structure', 'Federal: six states plus self-governing territories']],
    power: [
      'Government is formed by the party or coalition able to command support in the House of Representatives. Ministers sit in Parliament and are accountable to it under responsible-government conventions.',
      'The Senate represents the states equally and is a powerful elected upper house. Both chambers participate in legislation, while government is formed in and depends on the House of Representatives.',
      'The Constitution divides legislative authority between the Commonwealth and the states. The High Court interprets the Constitution and resolves federal disputes.',
    ],
    vocabulary: [
      'Australia’s Liberal Party is a centre-right party; “Liberal” in its name therefore does not carry the usual US centre-left meaning.',
      'Labor, liberal, conservative, agrarian, green and populist traditions interact with federal and state politics. Preferential voting and compulsory voting also shape competition differently from many other democracies.',
    ],
    timeline: [
      { year: '1901', title: 'Federation', text: 'Six colonies federated under the Australian Constitution, creating the Commonwealth and a national Parliament.' },
      { year: '1949', title: 'Senate electoral reform', text: 'Proportional representation was introduced for Senate elections, helping produce a more plural upper chamber.' },
      { year: '1967', title: 'Constitutional referendum on Indigenous Australians', text: 'Voters overwhelmingly approved constitutional changes concerning the federal government’s powers and population counting relating to Aboriginal Australians.' },
      { year: '1986', title: 'Australia Acts', text: 'Legislation completed the removal of remaining constitutional links that allowed UK institutions to legislate for Australian states or hear specified appeals.' },
    ],
    incomplete: ['Current office holders', 'Current House and Senate composition and party profiles', 'Latest federal election and turnout', 'Indigenous constitutional and representation debates', 'Democracy, rights and civic-space dimensions'],
    sources: [
      { title: 'Australian system of government', publisher: 'Parliamentary Education Office', url: 'https://peo.gov.au/understand-our-parliament/how-parliament-works/system-of-government/australian-system-of-government', checkedAt },
      { title: 'Australian Constitution', publisher: 'Parliamentary Education Office', url: 'https://peo.gov.au/understand-our-parliament/how-parliament-works/the-australian-constitution/australian-constitution', checkedAt },
    ],
  },
  {
    slug: 'new-zealand', name: 'New Zealand', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Unitary parliamentary constitutional monarchy'], ['Head of state', 'Monarch, represented by the Governor-General'], ['Head of government', 'Prime Minister'], ['Legislature', 'Parliament: Sovereign and House of Representatives'], ['Constitution', 'Uncodified across statutes, conventions, court decisions and other constitutional sources']],
    power: [
      'Government is formed from the elected House of Representatives and can remain in office only while it retains the confidence of the House.',
      'Parliament is unicameral. The House makes law, approves public finance and holds ministers to account, while the executive is drawn from Parliament under responsible-government conventions.',
      'New Zealand has no single codified higher-law constitution. Constitutional rules come from statutes, judicial decisions, prerogative instruments and conventions, while the Treaty of Waitangi is a central constitutional reference in public life.',
    ],
    vocabulary: [
      'New Zealand “liberal” and “conservative” positions sit within a party system strongly shaped by proportional representation and coalition agreements rather than a two-party presidential structure.',
      'Māori representation, Treaty of Waitangi obligations and the relationship between Crown institutions and iwi add constitutional and political dimensions that cannot be reduced to left and right.',
    ],
    timeline: [
      { year: '1852–1854', title: 'Representative government established', text: 'The New Zealand Constitution Act created a representative legislature and provincial institutions, followed by the first General Assembly.' },
      { year: '1907', title: 'Dominion status', text: 'New Zealand became a Dominion within the British Empire while continuing its evolution toward full constitutional autonomy.' },
      { year: '1986', title: 'Constitution Act', text: 'The Constitution Act 1986 reorganised central constitutional statutes and clarified the roles of Parliament, the executive and judiciary.' },
      { year: '1996', title: 'MMP begins', text: 'The first election under mixed-member proportional representation transformed parliamentary representation and coalition politics.' },
    ],
    incomplete: ['Current office holders', 'Current House composition and party profiles', 'Latest general election and turnout', 'Treaty and constitutional reform developments', 'Democracy, rights and civic-space dimensions'],
    sources: [
      { title: 'Our system of government', publisher: 'New Zealand Parliament', url: 'https://www3.parliament.nz/en/visit-and-learn/how-parliament-works/our-system-of-government/', checkedAt },
      { title: 'Constitution Act 1986 and amendments', publisher: 'New Zealand Legislation', url: 'https://www.legislation.govt.nz/act/public/1986/0114/latest/DLM94204.html', checkedAt },
    ],
  },
  {
    slug: 'south-korea', name: 'South Korea', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Unitary presidential republic'], ['Head of state and government', 'President'], ['Legislature', 'National Assembly: one elected chamber'], ['Courts', 'Supreme Court and Constitutional Court'], ['Constitution', '1987 constitutional framework of the Sixth Republic']],
    power: [
      'The president is directly elected for a single five-year term and heads the executive. The executive does not depend on continuing parliamentary confidence in the way a parliamentary cabinet does.',
      'The unicameral National Assembly makes laws, approves the budget, scrutinises government and exercises constitutional powers including impeachment. The prime minister is appointed by the president with National Assembly consent.',
      'The Constitutional Court and Supreme Court have distinct judicial roles. Local governments are elected and operate within a unitary constitutional system.',
    ],
    vocabulary: [
      'South Korean political competition combines economic and social policy with strong disagreements over North Korea, national security, institutional reform, regional political traditions and relations with major powers.',
      '“Progressive” and “conservative” in South Korea therefore include foreign-policy and security dimensions that do not map cleanly onto European or US economic left and right.',
    ],
    timeline: [
      { year: '1948', title: 'Republic established', text: 'The Republic of Korea adopted its first Constitution and established national republican institutions.' },
      { year: '1961–1987', title: 'Authoritarian development era', text: 'Military-backed and authoritarian governments dominated much of the period while South Korea underwent rapid economic transformation.' },
      { year: '1987', title: 'Democratic constitutional reform', text: 'Mass mobilisation led to constitutional revision, direct presidential elections and the institutional framework of the Sixth Republic.' },
      { year: '1997–1998', title: 'First opposition presidential transfer', text: 'An opposition victory led to a peaceful transfer of presidential power between rival political camps.' },
    ],
    incomplete: ['Current office holders', 'Current National Assembly and party profiles', 'Latest presidential and legislative election review', 'Democracy, rights and civic-space dimensions', 'Long-term indicator trends'],
    sources: [
      { title: 'Constitution of Korea', publisher: 'Korea.net — Republic of Korea', url: 'https://www.korea.net/Government/Constitution-and-Government/Constitution', checkedAt },
      { title: 'Executive, Legislature, and Judiciary', publisher: 'Korea.net — Republic of Korea', url: 'https://www.korea.net/Government/Constitution-and-Government/Executive-Legislature-and-Judiciary', checkedAt },
    ],
  },
  {
    slug: 'taiwan', name: 'Taiwan', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Democratic republic under the Republic of China constitutional framework'], ['Head of state', 'President'], ['Head of government', 'President of the Executive Yuan (Premier)'], ['Legislature', 'Legislative Yuan: one elected chamber'], ['Central institutions', 'Five Yuan: Executive, Legislative, Judicial, Examination and Control']],
    power: [
      'The president is directly elected and exercises constitutionally defined head-of-state powers. The Executive Yuan, led by the premier, is the highest administrative organ.',
      'The Legislative Yuan is the national legislature and exercises legislative power on behalf of voters. The constitutional structure also assigns separate functions to the Judicial, Examination and Control Yuans.',
      'Constitutional amendments are governed by the Additional Articles and require a demanding legislative and referendum process. Local governments exercise elected authority under the constitutional and statutory framework.',
    ],
    vocabulary: [
      'Taiwanese political competition cannot be understood through economic left and right alone. National identity, relations across the Taiwan Strait and the constitutional future form major additional dimensions.',
      'Terms such as “pan-blue” and “pan-green” refer to broad political camps shaped largely by identity and cross-strait questions; neither label by itself defines a complete economic or social ideology.',
    ],
    timeline: [
      { year: '1947', title: 'ROC Constitution enters into force', text: 'The Constitution of the Republic of China entered into force and established the formal five-branch constitutional structure.' },
      { year: '1987', title: 'Martial law lifted in Taiwan', text: 'The lifting of martial law accelerated political liberalisation, party competition and civil-society development.' },
      { year: '1991–2005', title: 'Constitutional Additional Articles revised', text: 'A series of constitutional revisions adapted national institutions to democratic elections and the political system operating in Taiwan.' },
      { year: '1996', title: 'First direct presidential election', text: 'Voters directly elected the president for the first time, a major milestone in Taiwan’s democratic transition.' },
    ],
    incomplete: ['Current office holders', 'Current Legislative Yuan composition and party profiles', 'Latest national election and turnout', 'Cross-strait and constitutional developments', 'Democracy, rights and civic-space dimensions'],
    sources: [
      { title: 'Constitution of the Republic of China (Taiwan) — introduction', publisher: 'Office of the President', url: 'https://english.president.gov.tw/Page/7', checkedAt },
      { title: 'Legislative Yuan — introduction', publisher: 'Legislative Yuan', url: 'https://www.ly.gov.tw/EngPages/List.aspx?nodeid=345', checkedAt },
    ],
  },
  {
    slug: 'malaysia', name: 'Malaysia', status: 'editorial-draft', updatedAt: checkedAt,
    atAGlance: [['System', 'Federal parliamentary constitutional monarchy'], ['Head of state', 'Yang di-Pertuan Agong'], ['Head of government', 'Prime Minister'], ['Legislature', 'Parliament: Yang di-Pertuan Agong, Dewan Negara and Dewan Rakyat'], ['Territorial structure', 'Federation of 13 states and federal territories']],
    power: [
      'The federal government operates through parliamentary democracy under a constitutional monarchy. The prime minister heads the cabinet and must command parliamentary support in the Dewan Rakyat.',
      'Parliament consists of the head of state and two chambers: the Dewan Rakyat and Dewan Negara. The federal Constitution allocates responsibilities between federal and state governments.',
      'Malaysia’s monarchy is distinctive because the federal head of state is selected from among hereditary rulers under the constitutional system, while several states have hereditary rulers and others have appointed governors.',
    ],
    vocabulary: [
      'Malaysian political competition combines economic and governance questions with ethnicity, religion, language, federal–state relations and the constitutional position of Malay rulers and special protections.',
      'Coalition labels can change while component parties retain different ideological and communal bases. A single left–right scale therefore misses important institutional and identity dimensions.',
    ],
    timeline: [
      { year: '1957', title: 'Federation of Malaya becomes independent', text: 'Independence established a federal constitutional monarchy and parliamentary institutions under the Federal Constitution.' },
      { year: '1963', title: 'Malaysia formed', text: 'Malaya, Sabah, Sarawak and Singapore formed Malaysia; Singapore left the federation in 1965.' },
      { year: '1969–1971', title: 'Political crisis and policy reset', text: 'Post-election violence led to emergency rule followed by the restoration of Parliament and a major reorientation of economic and social policy.' },
      { year: '2018', title: 'First federal change of governing coalition', text: 'An opposition coalition won the general election, ending uninterrupted rule by the same governing alliance since independence.' },
    ],
    incomplete: ['Current office holders', 'Current Dewan Rakyat and Dewan Negara composition and coalition profiles', 'Latest general election and turnout', 'Federal–state and rights dimensions', 'Long-term indicator trends'],
    sources: [
      { title: 'Malaysia ruling system', publisher: 'Government of Malaysia', url: 'https://www.malaysia.gov.my/en/government/malaysiarulingsystem', checkedAt },
      { title: 'Structure of Parliament of Malaysia', publisher: 'Parliament of Malaysia', url: 'https://www.parlimen.gov.my/struktur-parlimen.html?lang=en', checkedAt },
    ],
  },
] as const;
