import type { Locale } from '../app/LocaleProvider';

// Stable, descriptive background, not an electoral recommendation or party-score prediction.
// German-language source: Bundeszentrale für politische Bildung, Parteien in Deutschland.
// Election numbers are separately dated in the country detail component.
export const germanyPartySummary: Record<string,Partial<Record<Locale,string>>> = {
 'cdu-csu': {
  en:'The CDU and CSU share a parliamentary group. The CSU contests elections in Bavaria and the CDU in the other federal states. Both belong to Germany’s Christian-democratic and social-market traditions.',
  es:'La CDU y la CSU forman un grupo parlamentario común. La CSU se presenta en Baviera y la CDU en los demás estados federados. Ambas siguen la tradición democristiana y de economía social de mercado.',
  fr:'La CDU et la CSU forment un groupe parlementaire commun. La CSU se présente en Bavière et la CDU dans les autres Länder. Toutes deux s’inscrivent dans la tradition démocrate-chrétienne et de l’économie sociale de marché.',
  'pt-br':'A CDU e a CSU formam um grupo parlamentar. A CSU concorre na Baviera; a CDU, nos outros estados. Ambas fazem parte da tradição democrata-cristã e da economia social de mercado.'
 },
 spd: {
  en:'The SPD comes from Germany’s social-democratic and labour-movement traditions. The welfare state, collective bargaining, economic participation and workers’ rights have shaped its history.',
  es:'El SPD procede de la tradición socialdemócrata y del movimiento obrero. El Estado de bienestar, los convenios colectivos y los derechos laborales han marcado su historia.',
  fr:'Le SPD s’inscrit dans la tradition social-démocrate et du mouvement ouvrier. La protection sociale, la négociation collective et les droits des salariés ont marqué son histoire.',
  'pt-br':'O SPD vem da tradição social-democrata e do movimento trabalhista. O bem-estar social, a negociação coletiva e os direitos dos trabalhadores marcaram sua trajetória.'
 },
 afd: {
  en:'Founded in 2013, the AfD has developed positions centred on immigration, national identity and European integration. Its ideological development is analysed in more detail by Germany’s Federal Agency for Civic Education.',
  es:'Fundada en 2013, la AfD centra buena parte de su actividad en inmigración, identidad nacional e integración europea. La Agencia Federal de Educación Cívica analiza su evolución ideológica.',
  fr:'Fondée en 2013, l’AfD met particulièrement l’accent sur l’immigration, l’identité nationale et l’intégration européenne. L’Agence fédérale pour l’éducation civique analyse son évolution idéologique.',
  'pt-br':'Fundada em 2013, a AfD dá destaque à imigração, à identidade nacional e à integração europeia. A Agência Federal de Educação Política analisa sua evolução ideológica.'
 },
 'bundnis-90-die-grunen': {
  en:'Alliance 90/The Greens grew from environmental, peace and civil-rights movements. Climate policy, energy, civic freedoms and international cooperation are recurring themes in its history.',
  es:'Alianza 90/Los Verdes surgió de movimientos ecologistas, pacifistas y de derechos civiles. El clima, la energía y las libertades cívicas son temas centrales de su trayectoria.',
  fr:'Alliance 90/Les Verts est issu des mouvements écologistes, pacifistes et de défense des droits civiques. Le climat, l’énergie et les libertés figurent parmi ses thèmes historiques.',
  'pt-br':'A Aliança 90/Os Verdes surgiu de movimentos ambientais, pacifistas e de direitos civis. Clima, energia e liberdades são temas recorrentes em sua história.'
 },
 'die-linke': {
  en:'Die Linke emerged from the PDS and WASG. Its political debates focus on inequality, redistribution, housing and publicly provided services.',
  es:'Die Linke surgió del PDS y del WASG. Sus debates giran en torno a la desigualdad, la redistribución, la vivienda y los servicios públicos.',
  fr:'Die Linke est issu du PDS et de la WASG. Ses débats portent notamment sur les inégalités, la redistribution, le logement et les services publics.',
  'pt-br':'O Die Linke surgiu do PDS e do WASG. Suas pautas incluem desigualdade, redistribuição, moradia e serviços públicos.'
 },
 fdp: {
  en:'The FDP represents a German liberal tradition emphasising individual liberties, competitive markets, entrepreneurship and reducing bureaucracy.',
  es:'El FDP pertenece a la tradición liberal alemana, que destaca las libertades individuales, la economía de mercado, el emprendimiento y la reducción de la burocracia.',
  fr:'Le FDP appartient à la tradition libérale allemande, mettant l’accent sur les libertés individuelles, l’économie de marché, l’entrepreneuriat et la réduction des formalités.',
  'pt-br':'O FDP representa a tradição liberal alemã, com ênfase em liberdades individuais, mercado competitivo, empreendedorismo e redução da burocracia.'
 },
 bsw: {
  en:'The Sahra Wagenknecht Alliance was established in 2024. It combines advocacy of social protection and economic redistribution with distinctive positions on immigration, foreign policy and sovereignty.',
  es:'La Alianza Sahra Wagenknecht se fundó en 2024. Combina la protección social y la redistribución económica con posiciones propias sobre inmigración, política exterior y soberanía.',
  fr:'L’Alliance Sahra Wagenknecht a été créée en 2024. Elle associe la protection sociale et la redistribution à des positions particulières sur l’immigration, la politique étrangère et la souveraineté.',
  'pt-br':'A Aliança Sahra Wagenknecht foi criada em 2024. Combina proteção social e redistribuição econômica com posições específicas sobre imigração, política externa e soberania.'
 }
};
