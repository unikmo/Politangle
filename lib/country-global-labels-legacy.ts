import type { GlobalLabelFit } from './countries';

export const legacyGlobalLabels: Record<string, GlobalLabelFit> = {
  'united-states': {
    fit: 'strong',
    summary: 'Economic and social left–right comparison works well in the United States, but US uses of “liberal” and “conservative” are nationally specific and should not be exported unchanged to other countries.',
    localDimensions: ['Federal versus state authority','Race and civil-rights history','Gun rights and constitutional rights','Religion and social policy','Presidential versus congressional power'],
  },
  germany: {
    fit: 'strong',
    summary: 'Germany has recognisable left, centre and right party traditions, but social-market economics, Christian democracy, federalism and coalition government give familiar labels a specifically German meaning.',
    localDimensions: ['Social-market economy','Christian democracy','Federal–Länder relations','Coalition politics','Constitutional-court limits'],
  },
  france: {
    fit: 'strong',
    summary: 'Left and right remain meaningful French political traditions, but republicanism, presidential power, European integration and sovereignty debates create additional dimensions that are not captured by a single ideological line.',
    localDimensions: ['Republicanism and laïcité','Presidential versus parliamentary power','European integration and sovereignty','Centralisation versus decentralisation','Immigration and national identity'],
  },
  'united-kingdom': {
    fit: 'strong',
    summary: 'Economic and social left–right competition is highly usable in the United Kingdom, but unionism, devolution, constitutional convention and the country’s own liberal and conservative traditions need separate explanation.',
    localDimensions: ['Unionism and devolution','Parliamentary sovereignty','Constitutional monarchy and convention','Brexit and European alignment','Regional party systems'],
  },
  netherlands: {
    fit: 'strong',
    summary: 'Dutch party politics maps reasonably well onto familiar ideological families, while coalition bargaining, social liberalism, Christian-democratic traditions and the legacy of pillarisation add important national context.',
    localDimensions: ['Coalition bargaining','Polder-model consensus','Pillarisation legacy','Christian-democratic traditions','European integration'],
  },
  denmark: {
    fit: 'strong',
    summary: 'Danish politics contains familiar social-democratic, liberal, conservative and nationalist families, but party names, minority government and the welfare-state consensus need national interpretation.',
    localDimensions: ['Negative parliamentarism','Minority-government bargaining','Welfare-state design','Immigration and national identity','Greenland and Faroe Islands'],
  },
  finland: {
    fit: 'strong',
    summary: 'Shared left–right and liberal–conservative labels are useful in Finland, but agrarian-centre politics, coalition government, territorial questions and the distinct role of the presidency in foreign policy add separate dimensions.',
    localDimensions: ['Centre/agrarian tradition','Coalition government','President and foreign policy','Åland autonomy','Security and Russia policy'],
  },
  iceland: {
    fit: 'strong',
    summary: 'Icelandic parties can be compared on familiar economic and social axes, but urban–rural interests, fisheries, environmental policy and European integration regularly cut across a simple left–right line.',
    localDimensions: ['Fisheries and resource policy','Urban–rural interests','European integration','Environmental policy','Coalition government'],
  },
  norway: {
    fit: 'strong',
    summary: 'Norway has clearly recognisable left, centre and right party families, while rural decentralisation, petroleum governance, welfare policy and European integration create additional political dimensions.',
    localDimensions: ['Petroleum and sovereign-wealth governance','Rural decentralisation','Welfare-state design','European integration','Immigration policy'],
  },
  sweden: {
    fit: 'strong',
    summary: 'Swedish politics maps well onto international party families, but welfare-state history, immigration, nationalism, labour-market institutions and coalition blocs remain important national dimensions.',
    localDimensions: ['Folkhem welfare tradition','Labour-market model','Immigration and integration','Nationalism','Bloc and coalition politics'],
  },
  spain: {
    fit: 'partial',
    summary: 'Spanish left–right competition is highly meaningful, but territorial identity and the constitutional distribution of power between the state and autonomous communities form an independent political axis.',
    localDimensions: ['Autonomous-community powers','Catalan and Basque nationalism','Monarchy and republicanism','Post-Franco constitutional settlement','European integration'],
  },
  mexico: {
    fit: 'partial',
    summary: 'Economic and social ideology is useful in Mexico, but revolutionary nationalism, presidential institutions, anti-corruption politics, federalism and party-system history frequently cut across a conventional left–right spectrum.',
    localDimensions: ['Revolutionary-nationalist legacy','Federal–state politics','Presidential power','Anti-corruption and institutional reform','Security and organised crime'],
  },
  canada: {
    fit: 'partial',
    summary: 'Canadian parties fit familiar centre-left, centre-right and social-democratic families reasonably well, but Quebec nationalism, Indigenous self-government, federalism and regional politics require their own explanatory layer.',
    localDimensions: ['Federal–provincial relations','Quebec nationalism','Indigenous self-government','Regional political interests','Charter and rights politics'],
  },
  'south-africa': {
    fit: 'partial',
    summary: 'Economic left–right comparisons are useful in South Africa, but liberation-movement history, apartheid’s institutional legacy, race, inequality and coalition change are indispensable additional dimensions.',
    localDimensions: ['Liberation-movement history','Apartheid legacy and redress','Race and inequality','Land and redistribution','Coalition and provincial politics'],
  },
  india: {
    fit: 'partial',
    summary: 'Economic and social ideology remains meaningful in India, but religion, caste, federalism, linguistic and regional identities, and differing ideas of secularism create multiple independent political dimensions.',
    localDimensions: ['Hindu nationalism and secularism','Caste representation','Federal–state relations','Language and regional parties','Welfare and market reform'],
  },
  nigeria: {
    fit: 'limited',
    summary: 'Issue-by-issue economic and social comparison is possible in Nigeria, but the main national parties are broad coalitions and political alignment is strongly shaped by region, religion, ethnicity, candidate networks and federal power-sharing.',
    localDimensions: ['Regional balance','Religion and ethnicity','Federal–state revenue relations','Candidate and patronage networks','Security and state capacity'],
  },
  philippines: {
    fit: 'limited',
    summary: 'Specific policies can be placed on shared economic or social dimensions, but Philippine party competition is often organised more by candidates, families, regional alliances and coalition networks than by stable left–right party blocs.',
    localDimensions: ['Political families','Candidate-centred coalitions','Regional networks','Presidential power','Mindanao and Bangsamoro autonomy'],
  },
  brazil: {
    fit: 'partial',
    summary: 'Brazil has meaningful left–right economic and social competition, but congressional coalition-building, federalism, religion, public security and regional interests create important dimensions beyond a single spectrum.',
    localDimensions: ['Coalition presidentialism','Federal–state politics','Religion and social policy','Public security','Regional interests'],
  },
  indonesia: {
    fit: 'partial',
    summary: 'Economic and social comparison is useful in Indonesia, but Pancasila, religion, nationalism, decentralisation and coalition politics are distinct dimensions that should not be collapsed into one Western ideological scale.',
    localDimensions: ['Pancasila','Religion and pluralism','Decentralisation','Nationalism','Coalition and party alliances'],
  },
  japan: {
    fit: 'partial',
    summary: 'Japan has recognisable conservative, centrist and progressive traditions, but security policy, constitutional pacifism, developmental-state politics and a long dominant-party history complicate a simple left–right translation.',
    localDimensions: ['Pacifism and constitutional revision','US alliance and security policy','Developmental-state legacy','LDP dominant-party history','Administrative reform'],
  },
  italy: {
    fit: 'strong',
    summary: 'Italian politics uses familiar left, centre and right party families, but Christian-democratic, post-communist, regionalist and national-conservative traditions make coalition labels more fluid than a single spectrum suggests.',
    localDimensions: ['Christian-democratic tradition','Post-communist left','Regional autonomy','Coalition realignment','European integration'],
  },
  poland: {
    fit: 'partial',
    summary: 'Economic and social left–right labels are meaningful in Poland, but sovereignty, European integration, church–state relations and disputes over institutional checks form additional major political axes.',
    localDimensions: ['EU integration and sovereignty','Church–state relations','Judicial and constitutional institutions','National identity','Welfare and market policy'],
  },
  romania: {
    fit: 'partial',
    summary: 'Romanian parties use recognisable liberal, social-democratic, conservative and nationalist language, but anti-corruption, judicial independence, presidency–government relations and post-communist party realignment often cut across those labels.',
    localDimensions: ['Anti-corruption institutions','Judicial independence','President–government relations','Post-communist party legacy','European integration'],
  },
  portugal: {
    fit: 'strong',
    summary: 'Portuguese politics maps well onto social-democratic, socialist, liberal and conservative families, while the 1974 revolution, welfare-state development and constitutional history give those labels distinct national context.',
    localDimensions: ['1974 Revolution legacy','Welfare-state model','Presidential reserve powers','European integration','Regional autonomy'],
  },
  belgium: {
    fit: 'partial',
    summary: 'Belgian party families can be located on familiar ideological axes, but language community, federal reform and regional autonomy are at least as important because major party families operate in separate Dutch- and French-speaking systems.',
    localDimensions: ['Flemish–Francophone relations','Federal reform','Regional autonomy','Language communities','Coalition bargaining'],
  },
  switzerland: {
    fit: 'partial',
    summary: 'Swiss parties fit broad international ideological families, but direct democracy, federalism, linguistic regions and consensus government create a political structure that cannot be summarised by left and right alone.',
    localDimensions: ['Direct democracy','Cantonal federalism','Linguistic regions','Consensus government','European relations'],
  },
  ireland: {
    fit: 'partial',
    summary: 'Modern Irish politics increasingly uses familiar economic and social ideological distinctions, but the historic civil-war cleavage, republicanism, partition and constitutional questions remain important independent dimensions.',
    localDimensions: ['Civil-war party legacy','Republicanism and partition','Northern Ireland relations','Social and constitutional change','Coalition politics'],
  },
  argentina: {
    fit: 'partial',
    summary: 'Argentina has meaningful economic left–right conflict, but Peronism, federal–provincial relations, leadership coalitions and recurring debates over state intervention cannot be reduced to a stable two-bloc ideological map.',
    localDimensions: ['Peronism','Federal–provincial politics','State intervention and markets','Labour movement','Leadership coalitions'],
  },
  colombia: {
    fit: 'partial',
    summary: 'Economic and social left–right labels are useful in Colombia, but armed-conflict history, peace implementation, security, rural land and regional inequality form separate political dimensions.',
    localDimensions: ['Armed-conflict legacy','Peace implementation','Security policy','Rural land','Regional inequality'],
  },
  chile: {
    fit: 'strong',
    summary: 'Chile has durable left, centre and right political traditions, while constitutional design, the legacy of military rule, pensions and the role of markets provide nationally specific issues within that spectrum.',
    localDimensions: ['Legacy of military rule','Constitutional design','Pension system','Market versus public provision','Public security'],
  },
  peru: {
    fit: 'partial',
    summary: 'Peruvian candidates and policies can be compared on economic and social dimensions, but highly fluid parties, presidential–congressional conflict, regional politics and anti-corruption institutions make party labels unusually unstable.',
    localDimensions: ['Party-system fluidity','President–Congress conflict','Regional politics','Anti-corruption institutions','Informal economy and state capacity'],
  },
  'costa-rica': {
    fit: 'partial',
    summary: 'Costa Rican parties contain recognisable social-democratic, social-Christian, liberal and conservative traditions, while fiscal policy, religion, public institutions and the decline of the old two-party system create additional dimensions.',
    localDimensions: ['Social-democratic and social-Christian traditions','Fiscal politics','Public-sector institutions','Religion and social policy','Party-system fragmentation'],
  },
  kenya: {
    fit: 'limited',
    summary: 'Shared issue dimensions remain useful in Kenya, but national coalitions are often shaped by regional, ethnic, personal and alliance politics, while devolution creates a major constitutional axis outside conventional left–right competition.',
    localDimensions: ['Ethnic and regional coalitions','County devolution','Candidate alliances','Land and inequality','Executive and constitutional reform'],
  },
  ghana: {
    fit: 'partial',
    summary: 'Ghana’s major parties differ on economic and governance questions, but historical party traditions, regional support, pan-African ideas and broad coalition identities do not map exactly onto imported left–right labels.',
    localDimensions: ['Nkrumahist tradition','Market versus social-democratic policy','Regional support','Pan-Africanism','Decentralisation'],
  },
  senegal: {
    fit: 'partial',
    summary: 'Senegalese politics includes socialist, liberal, nationalist and pan-African traditions, but leadership coalitions, institutional reform, sovereignty and economic-autonomy debates often cut across conventional left–right categories.',
    localDimensions: ['Institutional reform','Sovereignty and economic autonomy','Pan-Africanism','Leadership coalitions','Centre–local governance'],
  },
  australia: {
    fit: 'strong',
    summary: 'Australian Labor, liberal, conservative, green and agrarian traditions map well onto familiar global categories, while federalism, compulsory voting and preferential voting shape how those ideological choices are organised.',
    localDimensions: ['Federal–state relations','Preferential voting','Compulsory voting','Labor–Coalition competition','Indigenous recognition and policy'],
  },
  'new-zealand': {
    fit: 'strong',
    summary: 'New Zealand’s parties fit familiar economic and social ideological families, but proportional representation, coalition agreements, Māori representation and Treaty of Waitangi obligations create distinct national dimensions.',
    localDimensions: ['MMP coalition politics','Māori representation','Treaty of Waitangi obligations','Crown–iwi relations','Welfare and market policy'],
  },
  'south-korea': {
    fit: 'partial',
    summary: 'Progressive and conservative labels are meaningful in South Korea, but North Korea, national security, regional political traditions, institutional reform and relations with major powers add dimensions not captured by economic left and right.',
    localDimensions: ['North Korea policy','National security','Regional political traditions','Presidential institutions','US–China–Japan relations'],
  },
  taiwan: {
    fit: 'partial',
    summary: 'Taiwan has meaningful social and economic ideological differences, but national identity, cross-strait relations and the constitutional future form a separate political axis that often structures party competition more strongly.',
    localDimensions: ['Cross-strait relations','Taiwanese versus Chinese identity','Constitutional status','Security policy','Economic integration with China'],
  },
  malaysia: {
    fit: 'limited',
    summary: 'Policy positions can be compared on shared economic and social dimensions, but Malaysian coalition politics is strongly structured by ethnicity, religion, monarchy, federal–state relations and communal party histories.',
    localDimensions: ['Ethnicity and communal representation','Islam and religion–state relations','Malay rulers and monarchy','Federal–state relations','Coalition realignment'],
  },
  austria: {
    fit: 'strong',
    summary: 'Austrian parties fit familiar social-democratic, conservative, liberal, green and nationalist families, while social partnership, Proporz history, federalism and coalition practice give those categories a distinct national form.',
    localDimensions: ['Social partnership','Proporz legacy','Federal–Länder relations','Coalition government','Neutrality and European integration'],
  },
  czechia: {
    fit: 'strong',
    summary: 'Czech politics contains recognisable liberal, conservative, social-democratic and populist party traditions, while post-communist transition, European integration and the role of the presidency add national context.',
    localDimensions: ['Post-communist transition','European integration','President–government relations','Regional government','Party-system realignment'],
  },
  greece: {
    fit: 'strong',
    summary: 'Greek politics has durable left, centre and right traditions, but the Metapolitefsi settlement, European integration, clientelism debates and the legacy of the debt crisis shape how those labels operate nationally.',
    localDimensions: ['Metapolitefsi legacy','European integration','Debt-crisis politics','State–society clientelism debates','Church–state relations'],
  },
  hungary: {
    fit: 'partial',
    summary: 'Left–right and liberal–conservative language is meaningful in Hungary, but nationalism, European integration, constitutional change and the institutional balance of power form additional central dimensions.',
    localDimensions: ['National sovereignty','European integration','Constitutional and cardinal laws','Media and institutional rules','Historical identity politics'],
  },
  ukraine: {
    fit: 'partial',
    summary: 'Economic and social ideology is relevant in Ukraine, but national sovereignty, relations with Russia and Europe, war, language, decentralisation and state-building are independent dimensions that often dominate political alignment.',
    localDimensions: ['Sovereignty and war','EU integration','Relations with Russia','Language and identity','Decentralisation and state reform'],
  },
  turkiye: {
    fit: 'partial',
    summary: 'Türkiye has meaningful left–right economic and social traditions, but secularism, political Islam, Kurdish politics, nationalism and presidential-system questions create distinct axes that must be kept separate.',
    localDimensions: ['Laiklik and political Islam','Kurdish politics','Nationalism','Presidential system','Civil–military legacy'],
  },
  israel: {
    fit: 'partial',
    summary: 'Israeli parties can be compared on economic and social ideology, but security, the Israeli–Palestinian conflict, religion–state relations, constitutional Basic Laws and identity politics form separate major dimensions.',
    localDimensions: ['Security and Israeli–Palestinian conflict','Religion–state relations','Basic Laws and institutional design','Jewish and Arab political representation','Territorial questions'],
  },
  uruguay: {
    fit: 'strong',
    summary: 'Uruguay has longstanding left, centre and right party traditions that map well onto global categories, while Batllismo, coalition blocs and a strong welfare-state tradition give those labels national depth.',
    localDimensions: ['Batllismo','Broad Front tradition','Welfare-state model','Coalition blocs','Secular republican tradition'],
  },
  ecuador: {
    fit: 'partial',
    summary: 'Ecuadorian economic and social ideology is meaningful, but presidential–legislative conflict, regional differences, indigenous politics and constitutional mechanisms such as muerte cruzada create separate political dimensions.',
    localDimensions: ['President–Assembly conflict','Muerte cruzada','Indigenous movements','Coast–highlands regional politics','Constitutional redesign'],
  },
  'dominican-republic': {
    fit: 'partial',
    summary: 'Dominican parties can be compared on broad economic and social positions, but long party traditions, presidential leadership, clientelism debates and institutional reform often matter as much as imported ideological labels.',
    localDimensions: ['Presidential leadership','Historic party traditions','Clientelism and patronage debates','Institutional reform','Haiti and migration policy'],
  },
  panama: {
    fit: 'partial',
    summary: 'Economic and social ideology is useful in Panama, but Canal governance, presidential politics, coalition networks, indigenous comarcas and the legacy of military rule form additional national dimensions.',
    localDimensions: ['Panama Canal governance','Presidential coalition politics','Indigenous comarcas','Post-military institutional order','US–Panama historical relationship'],
  },
  cameroon: {
    fit: 'limited',
    summary: 'Specific policies can be compared globally, but Cameroon’s politics is not well described by a standard competitive left–right party spectrum because executive dominance, Anglophone–Francophone relations, regional identity and institutional structure are central.',
    localDimensions: ['Anglophone–Francophone relations','Executive dominance','Regional and linguistic identity','Decentralisation','Party-system and state institutions'],
  },
  zambia: {
    fit: 'partial',
    summary: 'Zambian parties differ on economic, social and governance policy, but leadership coalitions, constitutional reform, regional support and the legacy of one-party and multiparty transitions also structure political competition.',
    localDimensions: ['Constitutional reform','Leadership coalitions','Regional support','Copper and economic policy','One-party to multiparty transition'],
  },
  bangladesh: {
    fit: 'limited',
    summary: 'Economic and social policy can be compared issue by issue, but Bangladeshi national competition is heavily shaped by rival party blocs, constitutional disputes over elections, caretaker-government history, liberation-war memory and leadership networks.',
    localDimensions: ['Awami League–BNP rivalry','Caretaker-government debate','Liberation-war legacy','Election administration','Religion and national identity'],
  },
  pakistan: {
    fit: 'limited',
    summary: 'Shared economic and social dimensions remain useful in Pakistan, but civil–military relations, federal–provincial politics, religion, constitutional courts and party leadership networks are central to political alignment.',
    localDimensions: ['Civil–military relations','Federal–provincial balance','Religion and constitutional identity','Judicial and constitutional institutions','Party leadership networks'],
  },
  thailand: {
    fit: 'limited',
    summary: 'Issue-by-issue ideological comparison is possible in Thailand, but monarchy, military intervention, constitutional redesign, regional voting patterns and competing democratic movements are more important than a stable left–right party spectrum.',
    localDimensions: ['Monarchy','Military intervention','Constitutional redesign','Regional voting patterns','Democratic and reform movements'],
  },
  egypt: {
    fit: 'limited',
    summary: 'Economic and social positions can be compared in Egypt, but the present political order is not accurately summarised as competitive left versus right; executive authority, military institutions, Islamism, nationalism and the 1952 republican legacy require separate treatment.',
    localDimensions: ['Executive and military institutions','Islamist–secular currents','1952 Revolution legacy','Nationalism','State-led economic tradition'],
  },
  ethiopia: {
    fit: 'limited',
    summary: 'Economic and social policy can be compared issue by issue, but Ethiopia’s federal system is organised around ethnolinguistic regions and nationalities, while federal–regional relations and constitutional self-determination questions are central political dimensions.',
    localDimensions: ['Ethnolinguistic federalism','Federal–regional relations','House of the Federation','Nationalities and self-determination','State-building and conflict'],
  },
  'democratic-republic-congo': {
    fit: 'limited',
    summary: 'Shared policy dimensions remain usable in the Democratic Republic of the Congo, but regional networks, conflict, state capacity, resource governance and debates over Congolité often explain political alignment better than a stable left–right party spectrum.',
    localDimensions: ['Regional political networks','Conflict and security','Resource governance','State capacity','Congolité and citizenship'],
  },
  serbia: {
    fit: 'partial',
    summary: 'Serbian parties can be compared on economic and social ideology, but Kosovo, European integration, relations with Russia, nationalism and the constitutional role of institutions form separate major political dimensions.',
    localDimensions: ['Kosovo','European integration','Relations with Russia','Nationalism and identity','President–government institutional balance'],
  },
};
