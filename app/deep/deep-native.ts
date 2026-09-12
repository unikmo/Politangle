import type { Locale } from '../LocaleProvider';

export type AxisDisplay = { name: string; low: string; high: string };

const axes: Record<Locale, Record<string, AxisDisplay>> = {
  en: {
    'economic-role': { name: 'Economic role', low: 'Public provision / redistribution', high: 'Market / private responsibility' },
    ownership: { name: 'Ownership', low: 'Social / worker ownership', high: 'Private / shareholder ownership' },
    'social-values': { name: 'Social values', low: 'Personal autonomy / change', high: 'Tradition / moral continuity' },
    authority: { name: 'Authority', low: 'Liberty / safeguards', high: 'Order / preventive authority' },
    pluralism: { name: 'Pluralism', low: 'Checks / competing institutions', high: 'Majoritarian concentration' },
    world: { name: 'World', low: 'International cooperation', high: 'National discretion' },
    nationhood: { name: 'Nationhood', low: 'Civic / inclusive membership', high: 'Inherited / status-based continuity' },
    ecology: { name: 'Ecology', low: 'Ecological limits / structural change', high: 'Growth / incremental adaptation' },
  },
  de: {
    'economic-role': { name: 'Rolle des Staates', low: 'Öffentliche Absicherung / Umverteilung', high: 'Markt / Eigenverantwortung' },
    ownership: { name: 'Eigentum', low: 'Gemeinschafts- / Belegschaftseigentum', high: 'Privat- / Anteilseigentum' },
    'social-values': { name: 'Gesellschaftliche Werte', low: 'Persönliche Freiheit / Wandel', high: 'Tradition / moralische Kontinuität' },
    authority: { name: 'Autorität', low: 'Freiheit / Schutzrechte', high: 'Ordnung / vorbeugende Eingriffe' },
    pluralism: { name: 'Pluralismus', low: 'Kontrolle / Machtteilung', high: 'Konzentration bei der Mehrheit' },
    world: { name: 'Internationale Ordnung', low: 'Internationale Zusammenarbeit', high: 'Nationale Entscheidungshoheit' },
    nationhood: { name: 'Zugehörigkeit', low: 'Bürgerliche / offene Zugehörigkeit', high: 'Herkunft / gewachsene Kontinuität' },
    ecology: { name: 'Ökologie', low: 'Ökologische Grenzen / Strukturwandel', high: 'Wachstum / schrittweise Anpassung' },
  },
  es: {
    'economic-role': { name: 'Papel del Estado', low: 'Servicios públicos / redistribución', high: 'Mercado / responsabilidad individual' },
    ownership: { name: 'Propiedad', low: 'Propiedad social / de trabajadores', high: 'Propiedad privada / de accionistas' },
    'social-values': { name: 'Valores sociales', low: 'Autonomía personal / cambio', high: 'Tradición / continuidad moral' },
    authority: { name: 'Autoridad', low: 'Libertad / garantías', high: 'Orden / autoridad preventiva' },
    pluralism: { name: 'Pluralismo', low: 'Contrapesos / instituciones independientes', high: 'Concentración mayoritaria' },
    world: { name: 'Ámbito internacional', low: 'Cooperación internacional', high: 'Decisión nacional' },
    nationhood: { name: 'Pertenencia nacional', low: 'Pertenencia cívica / inclusiva', high: 'Continuidad heredada / de estatus' },
    ecology: { name: 'Ecología', low: 'Límites ecológicos / cambio estructural', high: 'Crecimiento / adaptación gradual' },
  },
  fr: {
    'economic-role': { name: 'Rôle de l’État', low: 'Services publics / redistribution', high: 'Marché / responsabilité individuelle' },
    ownership: { name: 'Propriété', low: 'Propriété sociale / des salariés', high: 'Propriété privée / des actionnaires' },
    'social-values': { name: 'Valeurs sociales', low: 'Autonomie personnelle / changement', high: 'Tradition / continuité morale' },
    authority: { name: 'Autorité', low: 'Liberté / garanties', high: 'Ordre / autorité préventive' },
    pluralism: { name: 'Pluralisme', low: 'Contre-pouvoirs / institutions indépendantes', high: 'Concentration majoritaire' },
    world: { name: 'Rapport à l’international', low: 'Coopération internationale', high: 'Décision nationale' },
    nationhood: { name: 'Appartenance nationale', low: 'Appartenance civique / inclusive', high: 'Continuité héritée / liée au statut' },
    ecology: { name: 'Écologie', low: 'Limites écologiques / changement structurel', high: 'Croissance / adaptation progressive' },
  },
};

const families: Record<Locale, Record<string, { name: string; meaning: string }>> = {
  en: {
    liberalism: { name: 'Liberalism', meaning: 'liberty, personal autonomy and limits on concentrated power' },
    conservatism: { name: 'Conservatism', meaning: 'continuity, order, private ownership and cautious social change' },
    'social-democracy': { name: 'Social democracy', meaning: 'social protection, redistribution and pluralist democratic institutions' },
    socialism: { name: 'Socialism', meaning: 'social ownership and a stronger challenge to private control of production' },
    'green-politics': { name: 'Green politics', meaning: 'ecological limits, sustainability, pluralism and cooperative politics' },
  },
  de: {
    liberalism: { name: 'Liberalismus', meaning: 'Freiheit, persönliche Selbstbestimmung und Grenzen für konzentrierte Macht' },
    conservatism: { name: 'Konservatismus', meaning: 'Kontinuität, Ordnung, Privateigentum und vorsichtigen gesellschaftlichen Wandel' },
    'social-democracy': { name: 'Sozialdemokratie', meaning: 'soziale Absicherung, Umverteilung und pluralistische demokratische Institutionen' },
    socialism: { name: 'Sozialismus', meaning: 'gemeinschaftliches Eigentum und stärkere Begrenzung privater Kontrolle über Produktion' },
    'green-politics': { name: 'Grüne Politik', meaning: 'ökologische Grenzen, Nachhaltigkeit, Pluralismus und kooperative Politik' },
  },
  es: {
    liberalism: { name: 'Liberalismo', meaning: 'libertad, autonomía personal y límites al poder concentrado' },
    conservatism: { name: 'Conservadurismo', meaning: 'continuidad, orden, propiedad privada y cambio social prudente' },
    'social-democracy': { name: 'Socialdemocracia', meaning: 'protección social, redistribución e instituciones democráticas pluralistas' },
    socialism: { name: 'Socialismo', meaning: 'propiedad social y una crítica más fuerte al control privado de la producción' },
    'green-politics': { name: 'Política verde', meaning: 'límites ecológicos, sostenibilidad, pluralismo y cooperación política' },
  },
  fr: {
    liberalism: { name: 'Libéralisme', meaning: 'liberté, autonomie personnelle et limites au pouvoir concentré' },
    conservatism: { name: 'Conservatisme', meaning: 'continuité, ordre, propriété privée et changement social prudent' },
    'social-democracy': { name: 'Social-démocratie', meaning: 'protection sociale, redistribution et institutions démocratiques pluralistes' },
    socialism: { name: 'Socialisme', meaning: 'propriété sociale et remise en cause plus forte du contrôle privé de la production' },
    'green-politics': { name: 'Écologie politique', meaning: 'limites écologiques, durabilité, pluralisme et coopération politique' },
  },
};

const constructs: Record<Locale, Record<string, string>> = {
  en: {
    'public-provision':'Essential services', redistribution:'Income gap', ownership:'Business ownership', 'social-change':'Social change',
    'personal-autonomy':'Personal freedom', abortion:'Abortion', 'authority-order':'Safety and freedom', pluralism:'Checks on government',
    'world-sovereignty':'Countries working together', 'nationhood-membership':'Belonging', populism:'Political influence',
    'ecology-growth':'Environment and growth', 'religion-public-role':'Religion and law', subsidiarity:'Local or national / regional',
  },
  de: {
    'public-provision':'Wichtige Angebote', redistribution:'Arm und Reich', ownership:'Unternehmenseigentum', 'social-change':'Gesellschaftlicher Wandel',
    'personal-autonomy':'Persönliche Freiheit', abortion:'Schwangerschaftsabbruch', 'authority-order':'Sicherheit und Freiheit', pluralism:'Kontrolle der Regierung',
    'world-sovereignty':'Zusammenarbeit der Länder', 'nationhood-membership':'Zugehörigkeit', populism:'Politischer Einfluss',
    'ecology-growth':'Umwelt und Wachstum', 'religion-public-role':'Religion und Gesetze', subsidiarity:'Lokal oder überregional',
  },
  es: {
    'public-provision':'Servicios esenciales', redistribution:'Desigualdad económica', ownership:'Propiedad empresarial', 'social-change':'Cambio social',
    'personal-autonomy':'Libertad personal', abortion:'Aborto', 'authority-order':'Seguridad y libertad', pluralism:'Contrapesos al gobierno',
    'world-sovereignty':'Cooperación entre países', 'nationhood-membership':'Pertenencia', populism:'Influencia política',
    'ecology-growth':'Medio ambiente y crecimiento', 'religion-public-role':'Religión y leyes', subsidiarity:'Decisiones locales o centrales',
  },
  fr: {
    'public-provision':'Services essentiels', redistribution:'Inégalités économiques', ownership:'Propriété des entreprises', 'social-change':'Changement social',
    'personal-autonomy':'Liberté personnelle', abortion:'Avortement', 'authority-order':'Sécurité et liberté', pluralism:'Contre-pouvoirs',
    'world-sovereignty':'Coopération entre pays', 'nationhood-membership':'Appartenance', populism:'Influence politique',
    'ecology-growth':'Environnement et croissance', 'religion-public-role':'Religion et lois', subsidiarity:'Décisions locales ou centrales',
  },
};

export function deepAxis(locale: Locale, axis: { id: string; name: string; low: string; high: string }): AxisDisplay {
  return axes[locale][axis.id] ?? { name: axis.name, low: axis.low, high: axis.high };
}

export function deepFamily(locale: Locale, id: string, fallback: string) {
  return families[locale][id] ?? { name: fallback, meaning: locale === 'de' ? 'die Kerngedanken dieser Tradition' : locale === 'es' ? 'las ideas centrales de esta tradición' : locale === 'fr' ? 'les idées centrales de cette tradition' : 'the core ideas of that tradition' };
}

export function deepConstruct(locale: Locale, id: string) {
  return constructs[locale][id] ?? id.replaceAll('-', ' ');
}

export function deepUi(locale: Locale) {
  if (locale === 'de') return {
    loading:'Full wird geladen…', quickFirst:'Erst Quick', quickFirstTitle:'Mach Politangle Quick, bevor du mit Full weitermachst.', startQuick:'Quick starten',
    fullLabel:'Dein Politangle · Full', homeAria:'Deine politische Einordnung', mainHome:'Stärkste Nähe', secondary:'Deutliche Nähe', tertiary:'Weiterer Einfluss',
    historical:'Historische Bezugspunkte', historicalNote:'Sie stehen für die Tradition – nicht für dein persönliches Profil.',
    defines:'Was dein politisches Profil prägt', strongest:'Die deutlichsten Kanten deines Profils.', coherence:'Stimmigkeit der Antworten',
    coherenceIntro:'Die Zahl ist nur die Zusammenfassung. Spannender ist, wo Grundsatz, Bauchgefühl und praktische Entscheidung auseinandergehen.',
    coherenceHelp:'Stimmigkeit ist kein Wissens-, Intelligenz-, Ehrlichkeits- oder Überzeugungswert. Unterschiede können echte Nuancen, Unsicherheit oder wechselnde Zielkonflikte zeigen.',
    biggestShift:'Größte Verschiebung', anotherShift:'Weitere Verschiebung', spread:'Punkte Abstand', explain:'Was den Unterschied erklären könnte:',
    noLarge:'Keine großen Unterschiede zwischen Grundsatz, Gefühl und Entscheidung.', noLargeText:'THINK, FEEL und ACT liegen auf allen acht Dimensionen höchstens 20 Punkte auseinander.',
    allAxes:'Alle acht politischen Achsen ansehen', powerStyle:'Macht & politischer Stil', powerStyleTitle:'Muster, die nicht sauber auf eine einzelne Achse passen.',
    powerStyleLead:'Diese Muster zeigen, wie du über Repräsentation und politische Macht denkst. Sie ergänzen dein Politangle, sind aber kein eigenes politisches Zuhause.',
    combinations:'Besondere Kombinationen in deinen Antworten', retake:'Full neu starten', backQuick:'Zurück zum Quick-Ergebnis', complete:'Dein Full-Politangle ist komplett. CLASSIFY und UNDERSTAND kannst du jederzeit separat machen.',
    restart:'Full neu starten', previous:'Zurück', next:'Weiter', result:'Full-Ergebnis anzeigen', noUnsure:'Bisher keine unsicheren Antworten', marked:'als unsicher markiert',
    noCorrect:'Es gibt hier keine politisch richtige Antwort.', shapeNote:'Jede Speiche steht für eine politische Dimension. Entscheidend ist das Gesamtmuster – nicht einfach die längste Speiche.',
  };
  if (locale === 'es') return {
    loading:'Cargando Full…', quickFirst:'Primero Quick', quickFirstTitle:'Haz Politangle Quick antes de pasar a Full.', startQuick:'Empezar Quick',
    fullLabel:'Tu Politangle · Full', homeAria:'Tu encaje político', mainHome:'Coincidencia principal', secondary:'Cercanía importante', tertiary:'Otra influencia',
    historical:'Referencias históricas', historicalNote:'Representan la tradición, no tu perfil personal exacto.',
    defines:'Qué define tu perfil político', strongest:'Los rasgos más marcados de tu perfil.', coherence:'Coherencia de las respuestas',
    coherenceIntro:'La cifra es solo un resumen. Lo interesante es ver dónde se separan tus principios, tu reacción intuitiva y tu decisión práctica.',
    coherenceHelp:'La coherencia no mide conocimientos, inteligencia, sinceridad ni convicción. Las diferencias pueden reflejar matices reales, dudas o dilemas que cambian según el contexto.',
    biggestShift:'Mayor cambio', anotherShift:'Otro cambio', spread:'puntos de diferencia', explain:'Qué puede explicar la diferencia:',
    noLarge:'No aparecen grandes diferencias entre principio, intuición y elección.', noLargeText:'THINK, FEEL y ACT se mantienen a menos de 20 puntos entre sí en las ocho dimensiones.',
    allAxes:'Ver los ocho ejes políticos', powerStyle:'Poder & estilo político', powerStyleTitle:'Patrones que no caben del todo en un solo eje.',
    powerStyleLead:'Estos patrones describen cómo piensas sobre representación y poder político. Añaden contexto a tu Politangle, pero no son una familia política aparte.',
    combinations:'Combinaciones específicas de tus respuestas', retake:'Repetir Full', backQuick:'Volver al resultado Quick', complete:'Tu Politangle Full está completo. CLASSIFY y UNDERSTAND están disponibles cuando quieras poner a prueba tus conocimientos políticos.',
    restart:'Reiniciar Full', previous:'Anterior', next:'Siguiente', result:'Ver resultado Full', noUnsure:'Ninguna respuesta insegura hasta ahora', marked:'marcadas como inseguras',
    noCorrect:'No hay una respuesta política correcta.', shapeNote:'Cada radio representa una dimensión política. Lo importante es el conjunto del perfil, no simplemente el radio más largo.',
  };
  if (locale === 'fr') return {
    loading:'Chargement de Full…', quickFirst:'Quick d’abord', quickFirstTitle:'Fais Politangle Quick avant de passer à Full.', startQuick:'Lancer Quick',
    fullLabel:'Ton Politangle · Full', homeAria:'Ton positionnement politique', mainHome:'Proximité principale', secondary:'Proximité importante', tertiary:'Autre influence',
    historical:'Repères historiques', historicalNote:'Ils illustrent la tradition, pas ton profil personnel exact.',
    defines:'Ce qui structure ton profil politique', strongest:'Les traits les plus marqués de ton profil.', coherence:'Cohérence des réponses',
    coherenceIntro:'Le chiffre n’est qu’un résumé. Le plus intéressant est de voir où principe, réaction intuitive et choix concret s’éloignent les uns des autres.',
    coherenceHelp:'La cohérence ne mesure ni les connaissances, ni l’intelligence, ni l’honnêteté, ni la force des convictions. Les écarts peuvent refléter de vraies nuances, de l’incertitude ou des arbitrages différents selon le contexte.',
    biggestShift:'Écart principal', anotherShift:'Autre écart', spread:'points d’écart', explain:'Ce qui peut expliquer l’écart :',
    noLarge:'Pas de grand écart entre principe, ressenti et choix concret.', noLargeText:'THINK, FEEL et ACT restent à moins de 20 points les uns des autres sur les huit dimensions.',
    allAxes:'Voir les huit axes politiques', powerStyle:'Pouvoir & style politique', powerStyleTitle:'Des schémas qui ne rentrent pas proprement dans un seul axe.',
    powerStyleLead:'Ces schémas décrivent ta manière de penser la représentation et le pouvoir politique. Ils ajoutent du contexte à ton Politangle, mais ne constituent pas une famille politique distincte.',
    combinations:'Combinaisons particulières dans tes réponses', retake:'Refaire Full', backQuick:'Retour au résultat Quick', complete:'Ton Politangle Full est terminé. CLASSIFY et UNDERSTAND restent disponibles quand tu veux tester tes connaissances politiques.',
    restart:'Recommencer Full', previous:'Précédent', next:'Suivant', result:'Voir le résultat Full', noUnsure:'Aucune réponse incertaine pour l’instant', marked:'marquées comme incertaines',
    noCorrect:'Il n’y a pas de bonne réponse politique.', shapeNote:'Chaque branche représente une dimension politique. Ce qui compte, c’est le profil d’ensemble, pas simplement la branche la plus longue.',
  };
  return {
    loading:'Loading Full…', quickFirst:'Quick comes first', quickFirstTitle:'Complete Politangle Quick before Full.', startQuick:'Start Quick',
    fullLabel:'Your Politangle · Full', homeAria:'Your political home', mainHome:'Main home', secondary:'Significant leaning', tertiary:'Additional influence',
    historical:'Historical reference points', historicalNote:'They illustrate the tradition, not your exact personal profile.',
    defines:'What defines your political home', strongest:'The strongest edges of your profile.', coherence:'Response coherence',
    coherenceIntro:'The score is only the summary. The useful part is seeing where your principle, instinct and practical choice move apart.',
    coherenceHelp:'Coherence is not a knowledge, intelligence, honesty or conviction score. Differences can reflect genuine nuance, uncertainty or changing trade-offs.',
    biggestShift:'Biggest shift', anotherShift:'Another shift', spread:'point spread', explain:'What may explain the gap:',
    noLarge:'No large principle–instinct–choice shifts stand out.', noLargeText:'Your THINK, FEEL and ACT positions stay within 20 points of one another across the eight dimensions.',
    allAxes:'See all eight political axes', powerStyle:'Power & political style', powerStyleTitle:'Patterns that do not fit neatly into one axis.',
    powerStyleLead:'These patterns describe how you think about representation and political power. They add context to your main Politangle; they are not separate political homes.',
    combinations:'Specific combinations in your answers', retake:'Retake Full', backQuick:'Back to Quick result', complete:'Your Full Politangle is complete. CLASSIFY and UNDERSTAND are available whenever you want to test political knowledge.',
    restart:'Restart Full', previous:'Previous', next:'Next', result:'See Full result', noUnsure:'No unsure responses so far', marked:'marked not sure',
    noCorrect:'There is no correct political answer.', shapeNote:'Each spoke is one political dimension. Your political home comes from the overall pattern—not simply from whichever spoke happens to be longest.',
  };
}

export function deepCoherence(locale: Locale, score: number | null) {
  if (locale === 'de') return score === null ? 'Noch zu wenig Informationen' : score >= 80 ? 'Sehr stimmig' : score >= 65 ? 'Weitgehend stimmig' : score >= 45 ? 'Kontextabhängig' : 'Stark gemischt';
  if (locale === 'es') return score === null ? 'Aún falta información' : score >= 80 ? 'Muy coherente' : score >= 65 ? 'Bastante coherente' : score >= 45 ? 'Depende del contexto' : 'Muy mixto';
  if (locale === 'fr') return score === null ? 'Pas encore assez d’informations' : score >= 80 ? 'Très cohérent' : score >= 65 ? 'Plutôt cohérent' : score >= 45 ? 'Dépend du contexte' : 'Très mixte';
  return score === null ? 'Not enough information' : score >= 80 ? 'Highly coherent' : score >= 65 ? 'Mostly coherent' : score >= 45 ? 'Context-sensitive' : 'Strongly mixed';
}

export function deepDirection(locale: Locale, score: number | null, low: string, high: string) {
  if (score === null) return locale === 'de' ? 'Noch zu wenig Informationen' : locale === 'es' ? 'Aún falta información' : locale === 'fr' ? 'Pas encore assez d’informations' : 'Not enough information';
  if (locale === 'de') return score <= 24 ? `Deutlich Richtung ${low}` : score <= 39 ? `Eher ${low}` : score <= 60 ? 'Gemischt / ausgewogen' : score <= 74 ? `Eher ${high}` : `Deutlich Richtung ${high}`;
  if (locale === 'es') return score <= 24 ? `Muy cerca de ${low}` : score <= 39 ? `Se inclina hacia ${low}` : score <= 60 ? 'Mixto / equilibrado' : score <= 74 ? `Se inclina hacia ${high}` : `Muy cerca de ${high}`;
  if (locale === 'fr') return score <= 24 ? `Très nettement vers ${low}` : score <= 39 ? `Plutôt vers ${low}` : score <= 60 ? 'Mixte / équilibré' : score <= 74 ? `Plutôt vers ${high}` : `Très nettement vers ${high}`;
  return score <= 24 ? `Strongly toward ${low.toLowerCase()}` : score <= 39 ? `Leans toward ${low.toLowerCase()}` : score <= 60 ? 'Mixed / balanced' : score <= 74 ? `Leans toward ${high.toLowerCase()}` : `Strongly toward ${high.toLowerCase()}`;
}

export function deepModeDirection(locale: Locale, score: number | null, low: string, high: string) {
  if (score === null) return deepDirection(locale, score, low, high);
  if (locale === 'de') return score <= 24 ? `Klar ${low}` : score <= 39 ? `Eher ${low}` : score <= 60 ? 'Zwischen beiden Polen' : score <= 74 ? `Eher ${high}` : `Klar ${high}`;
  if (locale === 'es') return score <= 24 ? `Claramente ${low}` : score <= 39 ? `Más cerca de ${low}` : score <= 60 ? 'Entre ambos polos' : score <= 74 ? `Más cerca de ${high}` : `Claramente ${high}`;
  if (locale === 'fr') return score <= 24 ? `Nettement ${low}` : score <= 39 ? `Plutôt ${low}` : score <= 60 ? 'Entre les deux pôles' : score <= 74 ? `Plutôt ${high}` : `Nettement ${high}`;
  return score <= 24 ? `Strongly ${low.toLowerCase()}` : score <= 39 ? `Leans ${low.toLowerCase()}` : score <= 60 ? 'Between both poles' : score <= 74 ? `Leans ${high.toLowerCase()}` : `Strongly ${high.toLowerCase()}`;
}

export function deepAxisSentence(locale: Locale, score: number | null, low: string, high: string) {
  if (locale === 'de') return score === null ? 'Für diese Achse fehlen noch Antworten.' : score <= 24 ? `${low} ist eine der deutlichsten Tendenzen in deinem Profil.` : score <= 39 ? `Du tendierst zu ${low}, ohne ganz eindeutig zu sein.` : score <= 60 ? `Du hältst ${low} und ${high} vergleichsweise gut in Balance.` : score <= 74 ? `Du tendierst zu ${high}, ohne ganz eindeutig zu sein.` : `${high} ist eine der deutlichsten Tendenzen in deinem Profil.`;
  if (locale === 'es') return score === null ? 'Aún faltan respuestas para este eje.' : score <= 24 ? `${low} es una de las tendencias más claras de tu perfil.` : score <= 39 ? `Te inclinas hacia ${low}, aunque no de forma absoluta.` : score <= 60 ? `Mantienes bastante equilibrio entre ${low} y ${high}.` : score <= 74 ? `Te inclinas hacia ${high}, aunque no de forma absoluta.` : `${high} es una de las tendencias más claras de tu perfil.`;
  if (locale === 'fr') return score === null ? 'Il manque encore des réponses pour cet axe.' : score <= 24 ? `${low} est l’une des tendances les plus nettes de ton profil.` : score <= 39 ? `Tu penches vers ${low}, sans être complètement tranché.` : score <= 60 ? `Tu gardes un équilibre assez marqué entre ${low} et ${high}.` : score <= 74 ? `Tu penches vers ${high}, sans être complètement tranché.` : `${high} est l’une des tendances les plus nettes de ton profil.`;
  return score === null ? 'This part of your profile needs more information.' : score <= 24 ? `${low} is one of the strongest features of your political profile.` : score <= 39 ? `You lean toward ${low.toLowerCase()} while retaining some balance.` : score <= 60 ? `You are comparatively balanced between ${low.toLowerCase()} and ${high.toLowerCase()}.` : score <= 74 ? `You lean toward ${high.toLowerCase()} while retaining some balance.` : `${high} is one of the strongest features of your political profile.`;
}

export function deepGap(locale: Locale, think: number | null, feel: number | null, act: number | null) {
  const entries = [
    think === null ? null : { key: 'THINK', value: think },
    feel === null ? null : { key: 'FEEL', value: feel },
    act === null ? null : { key: 'ACT', value: act },
  ].filter((v): v is { key: string; value: number } => Boolean(v));
  if (entries.length < 2) return locale === 'de' ? 'Noch zu wenig vergleichbare Antworten für eine Einordnung.' : locale === 'es' ? 'Aún faltan respuestas comparables para interpretar esta diferencia.' : locale === 'fr' ? 'Il manque encore des réponses comparables pour interpréter cet écart.' : 'There are not enough comparable answers to interpret this difference.';
  if (entries.length === 2) return locale === 'de' ? 'Die verfügbaren Perspektiven zeigen in unterschiedliche Richtungen. Dieses Thema hängt bei dir stärker vom Kontext ab, als ein einzelner Gesamtwert vermuten lässt.' : locale === 'es' ? 'Las perspectivas disponibles apuntan en direcciones distintas. En este tema, el contexto pesa más de lo que sugiere una sola puntuación.' : locale === 'fr' ? 'Les perspectives disponibles ne vont pas dans le même sens. Sur ce sujet, le contexte compte davantage qu’un score global ne le laisse penser.' : 'The available modes point in different directions, so this topic is more context-dependent than your overall score alone suggests.';
  const pairs = [
    { keys: ['THINK','FEEL'], distance: Math.abs(think! - feel!) },
    { keys: ['THINK','ACT'], distance: Math.abs(think! - act!) },
    { keys: ['FEEL','ACT'], distance: Math.abs(feel! - act!) },
  ].sort((a,b) => a.distance-b.distance);
  const outsider = entries.find((entry) => !pairs[0].keys.includes(entry.key));
  if (pairs[0].distance <= 30 && outsider) {
    if (locale === 'de') return outsider.key === 'THINK' ? 'Dein Grundsatz ist der Ausreißer; Gefühl und praktische Entscheidung liegen näher beieinander. Eine allgemeine Regel kann sich für dich anders anfühlen, sobald sie konkret wird.' : outsider.key === 'FEEL' ? 'Dein spontanes Gefühl ist der Ausreißer; Grundsatz und praktische Entscheidung liegen näher beieinander. Das Thema löst offenbar einen emotionalen Zug aus, der sich nicht vollständig in Regel oder Handlung übersetzt.' : 'Deine praktische Entscheidung ist der Ausreißer; Grundsatz und Gefühl liegen näher beieinander. Folgen, Machbarkeit oder Zielkonflikte verändern offenbar, was du konkret tun würdest.';
    if (locale === 'es') return outsider.key === 'THINK' ? 'Tu principio general es el que más se aleja; intuición y decisión práctica están más cerca. Una regla que apoyas en abstracto puede cambiar cuando la situación se vuelve concreta.' : outsider.key === 'FEEL' ? 'Tu reacción intuitiva es la que más se aleja; principio y decisión práctica están más cerca. El tema parece generar una reacción emocional que no trasladarías del todo a una regla o acción.' : 'Tu decisión práctica es la que más se aleja; principio e intuición están más cerca. Las consecuencias, la viabilidad o los dilemas concretos cambian lo que harías.';
    if (locale === 'fr') return outsider.key === 'THINK' ? 'Ton principe général est le point le plus éloigné ; ressenti et choix concret sont plus proches. Une règle que tu soutiens en théorie peut donc changer quand la situation devient concrète.' : outsider.key === 'FEEL' ? 'Ton ressenti est le point le plus éloigné ; principe et choix concret sont plus proches. Le sujet semble provoquer une réaction émotionnelle que tu ne traduirais pas entièrement en règle ou en action.' : 'Ton choix concret est le point le plus éloigné ; principe et ressenti sont plus proches. Les conséquences, la faisabilité ou les arbitrages semblent modifier ce que tu ferais réellement.';
    return outsider.key === 'THINK' ? 'Your stated principle is the outlier while instinct and practical choice are closer. The general rule you endorse may shift when the issue is felt or applied concretely.' : outsider.key === 'FEEL' ? 'Your instinctive reaction is the outlier while principle and practical choice are closer. The issue may create an emotional pull that you do not fully carry into your rule or action.' : 'Your practical choice is the outlier while principle and instinct are closer. Consequences, feasibility or trade-offs may change what you would actually do.';
  }
  return locale === 'de' ? 'Kein einzelner Modus erklärt den Unterschied: THINK, FEEL und ACT verteilen sich über die Skala. Das wirkt eher kontextabhängig als schlicht widersprüchlich.' : locale === 'es' ? 'Ningún modo explica por sí solo la diferencia: THINK, FEEL y ACT están repartidos por la escala. Es mejor leerlo como una posición dependiente del contexto que como una simple contradicción.' : locale === 'fr' ? 'Aucun mode n’explique à lui seul l’écart : THINK, FEEL et ACT sont répartis sur l’échelle. Il vaut mieux y voir une position dépendante du contexte qu’une simple contradiction.' : 'No single mode explains the gap: THINK, FEEL and ACT are spread across the scale. Treat this as a genuinely context-dependent position rather than a simple contradiction.';
}

export function deepTendency(locale: Locale, id: string, score: number | null) {
  const influenceTitle = locale === 'de' ? 'Politischer Einfluss & Repräsentation' : locale === 'es' ? 'Influencia política & representación' : locale === 'fr' ? 'Influence politique & représentation' : 'Political influence & representation';
  const checksTitle = locale === 'de' ? 'Gewählte Macht & demokratische Kontrolle' : locale === 'es' ? 'Poder elegido & contrapesos democráticos' : locale === 'fr' ? 'Pouvoir élu & contre-pouvoirs démocratiques' : 'Elected power & democratic checks';
  if (id === 'populism') {
    if (score === null) return { title: influenceTitle, explanation: locale === 'de' ? 'Noch zu wenig Informationen für eine stabile Einordnung.' : locale === 'es' ? 'Aún falta información para una lectura estable.' : locale === 'fr' ? 'Pas encore assez d’informations pour une lecture stable.' : 'Not enough information for a stable reading.' };
    if (score >= 70) return { title: influenceTitle, explanation: locale === 'de' ? 'Du vermutest relativ häufig, dass gut vernetzte Gruppen mehr Gehör finden als normale Wähler. Das ist ein populistisches Signal zur Repräsentation – kein politisches Etikett.' : locale === 'es' ? 'Tiendes a sospechar que los grupos bien conectados son escuchados más que los votantes corrientes. Es una señal de estilo populista sobre representación, no una etiqueta política.' : locale === 'fr' ? 'Tu soupçonnes assez souvent que les groupes bien connectés sont davantage entendus que les électeurs ordinaires. C’est un signal de type populiste sur la représentation, pas une étiquette politique.' : 'You often suspect that well-connected groups are heard more than ordinary voters. That is a populist-style signal about representation, not a political-family label.' };
    if (score <= 30) return { title: influenceTitle, explanation: locale === 'de' ? 'Du siehst politische Konflikte eher als Konkurrenz legitimer Interessen und Werte – weniger als einfachen Gegensatz zwischen normalen Wählern und mächtigen Gruppen.' : locale === 'es' ? 'Tiendes a ver el conflicto político como competencia entre intereses y valores legítimos, más que como un choque simple entre votantes corrientes y grupos poderosos.' : locale === 'fr' ? 'Tu vois plutôt le conflit politique comme une concurrence entre intérêts et valeurs légitimes que comme une opposition simple entre électeurs ordinaires et groupes puissants.' : 'You tend to see political conflict as competition among legitimate interests and values rather than mainly as ordinary voters versus powerful groups.' };
    return { title: influenceTitle, explanation: locale === 'de' ? 'Du verbindest Misstrauen gegenüber ungleichem politischem Einfluss mit der Ansicht, dass echte Interessenkonflikte und Wertunterschiede ebenfalls eine Rolle spielen.' : locale === 'es' ? 'Combinas cierta desconfianza hacia la desigualdad de influencia política con la idea de que también existen conflictos reales entre intereses y valores.' : locale === 'fr' ? 'Tu combines une certaine méfiance envers les inégalités d’influence politique avec l’idée qu’il existe aussi de vrais conflits d’intérêts et de valeurs.' : 'You combine some suspicion of unequal political influence with a belief that genuine conflicts among interests and values also matter.' };
  }
  if (score === null) return { title: checksTitle, explanation: locale === 'de' ? 'Noch zu wenig Informationen für eine stabile Einordnung.' : locale === 'es' ? 'Aún falta información para una lectura estable.' : locale === 'fr' ? 'Pas encore assez d’informations pour une lecture stable.' : 'Not enough information for a stable reading.' };
  if (score >= 70) return { title: checksTitle, explanation: locale === 'de' ? 'Du bist vergleichsweise bereit, gewählten Regierungen mehr Handlungsspielraum zu geben – auch wenn dadurch institutionelle Kontrollen oder Verfahrensschutz schwächer werden können.' : locale === 'es' ? 'Estás relativamente dispuesto a dar más margen de acción a los gobiernos elegidos, incluso si eso puede reducir algunos contrapesos institucionales o garantías de procedimiento.' : locale === 'fr' ? 'Tu es relativement disposé à laisser davantage de marge aux gouvernements élus, même si cela peut réduire certains contre-pouvoirs ou certaines garanties de procédure.' : 'You are relatively willing to give elected authorities more room to act, even when that can reduce some institutional checks or procedural safeguards.' };
  if (score <= 30) return { title: checksTitle, explanation: locale === 'de' ? 'Du legst großen Wert auf Schutzrechte, institutionelle Kontrollen und Grenzen konzentrierter Regierungsmacht – auch wenn Entscheidungen dadurch langsamer werden.' : locale === 'es' ? 'Das mucha prioridad a las garantías legales, los contrapesos institucionales y los límites al poder concentrado, aunque eso haga más lenta la acción política.' : locale === 'fr' ? 'Tu accordes beaucoup d’importance aux garanties juridiques, aux contre-pouvoirs et aux limites du pouvoir concentré, même si cela ralentit l’action politique.' : 'You strongly prioritize legal safeguards, institutional checks and limits on concentrated government power, even when they slow action.' };
  return { title: checksTitle, explanation: locale === 'de' ? 'Du versuchst, handlungsfähige gewählte Regierungen mit Gerichten, Oppositionsrechten und Verfahrensschutz auszubalancieren.' : locale === 'es' ? 'Buscas un equilibrio entre la capacidad de actuar de los gobiernos elegidos y los tribunales, los derechos de la oposición y las garantías de procedimiento.' : locale === 'fr' ? 'Tu cherches un équilibre entre la capacité d’action des gouvernements élus et les tribunaux, les droits de l’opposition et les garanties de procédure.' : 'You balance effective elected authority with courts, opposition rights and procedural safeguards rather than consistently favoring one side.' };
}

export function deepNuance(locale: Locale, item: { id: string; name: string; explanation: string; caution?: string }) {
  const localized: Partial<Record<string, Record<'de'|'es'|'fr', { name: string; explanation: string; caution?: string }>>> = {
    'democratic-socialist-tendency': {
      de:{ name:'Demokratisch-sozialistische Tendenz', explanation:'Deine Antworten verbinden eine deutliche Präferenz für mehr gesellschaftliches, öffentliches, genossenschaftliches oder Belegschaftseigentum mit pluralistischen demokratischen Regeln und Grenzen konzentrierter Staatsmacht.', caution:'Das ist eine zusätzliche Tendenz innerhalb der breiten sozialistischen Familie – keine neue Hauptideologie und keine Identitätszuweisung.' },
      es:{ name:'Tendencia socialista democrática', explanation:'Tus respuestas combinan una preferencia clara por más propiedad social, pública, cooperativa o de trabajadores con reglas democráticas pluralistas y límites al poder estatal concentrado.', caution:'Es un matiz dentro de la familia socialista amplia, no una ideología principal adicional ni una etiqueta de identidad.' },
      fr:{ name:'Tendance socialiste démocratique', explanation:'Tes réponses combinent une préférence marquée pour davantage de propriété sociale, publique, coopérative ou salariée avec des règles démocratiques pluralistes et des limites au pouvoir étatique concentré.', caution:'C’est une nuance à l’intérieur de la grande famille socialiste, pas une idéologie principale supplémentaire ni une étiquette d’identité.' },
    },
    'far-right-radical-right-pattern': {
      de:{ name:'Prüfmuster: populistische radikale Rechte', explanation:'Deine Antworten verbinden stärker herkunftsbezogene nationale Zugehörigkeit, mehr autoritäre Ordnungsvorstellungen und eine populistische Gegenüberstellung von Bevölkerung und Elite. Politangle misst Nativismus jedoch nicht direkt.', caution:'Das ist nur ein Prüfmuster. Es ist weder gleichbedeutend mit gewöhnlichem Konservatismus noch mit Faschismus oder „extremer Rechter“ und darf nicht als persönliche Extremismus-Zuschreibung verstanden werden.' },
      es:{ name:'Patrón de cribado: derecha radical populista', explanation:'Tus respuestas combinan una pertenencia nacional más ligada al origen, preferencias más autoritarias por el orden y una visión populista de pueblo frente a élite. Politangle todavía no mide el nativismo de forma directa.', caution:'Es solo un patrón de cribado. No equivale al conservadurismo ordinario, al fascismo ni a la extrema derecha, y no debe leerse como una etiqueta personal de extremismo.' },
      fr:{ name:'Schéma de repérage : droite radicale populiste', explanation:'Tes réponses combinent une appartenance nationale davantage liée à l’origine, des préférences plus autoritaires en matière d’ordre et une lecture populiste opposant peuple et élite. Politangle ne mesure toutefois pas directement le nativisme.', caution:'Il s’agit uniquement d’un schéma de repérage. Il ne correspond ni au conservatisme ordinaire, ni au fascisme, ni à « l’extrême droite », et ne doit pas être lu comme une étiquette personnelle d’extrémisme.' },
    },
  };
  if (locale === 'en') return item;
  const match = localized[item.id]?.[locale];
  return match ?? item;
}

export function deepHome(locale: Locale, home: { headline: string; primary: any; secondary: any; tertiary: any }, complete = true) {
  const primary = home.primary;
  const secondary = home.secondary;
  const tertiary = home.tertiary;
  const p = primary ? deepFamily(locale, primary.id, primary.name) : null;
  const s = secondary ? deepFamily(locale, secondary.id, secondary.name) : null;
  const t = tertiary ? deepFamily(locale, tertiary.id, tertiary.name) : null;
  const ps = primary?.overall ?? null;
  const ss = secondary?.overall ?? null;
  const gap = ps === null || ss === null ? null : ps - ss;
  let headline = home.headline;
  if (locale === 'de') {
    headline = complete ? 'Dein politisches Profil bleibt gemischt.' : 'Dein vorläufiges politisches Profil bleibt gemischt.';
    if (p && ps !== null && s && ss !== null && ps >= 55 && ss >= 55 && gap !== null && gap <= 4) headline = `Dein Profil liegt zwischen ${p.name} und ${s.name}.`;
    else if (p && ps !== null && s && ss !== null && ps >= 55 && ss >= 50) headline = `Dein Profil liegt vor allem bei ${p.name}, mit deutlicher Nähe zu ${s.name}.`;
    else if (p && ps !== null && ps >= 55) headline = `Dein Profil liegt vor allem bei ${p.name}.`;
    else if (p && ps !== null) headline = 'Keine einzelne politische Tradition dominiert deine Antworten.';
  } else if (locale === 'es') {
    headline = 'Tu perfil político sigue siendo mixto.';
    if (p && ps !== null && s && ss !== null && ps >= 55 && ss >= 55 && gap !== null && gap <= 4) headline = `Tu perfil queda entre ${p.name} y ${s.name}.`;
    else if (p && ps !== null && s && ss !== null && ps >= 55 && ss >= 50) headline = `Tu perfil encaja sobre todo con ${p.name}, con una cercanía clara a ${s.name}.`;
    else if (p && ps !== null && ps >= 55) headline = `Tu perfil encaja sobre todo con ${p.name}.`;
    else if (p && ps !== null) headline = 'Ninguna tradición política domina claramente tus respuestas.';
  } else if (locale === 'fr') {
    headline = 'Ton profil politique reste mixte.';
    if (p && ps !== null && s && ss !== null && ps >= 55 && ss >= 55 && gap !== null && gap <= 4) headline = `Ton profil se situe entre ${p.name} et ${s.name}.`;
    else if (p && ps !== null && s && ss !== null && ps >= 55 && ss >= 50) headline = `Ton profil se rapproche surtout de ${p.name}, avec aussi une forte proximité avec ${s.name}.`;
    else if (p && ps !== null && ps >= 55) headline = `Ton profil se rapproche surtout de ${p.name}.`;
    else if (p && ps !== null) headline = 'Aucune tradition politique ne domine clairement tes réponses.';
  }
  const parts: string[] = [];
  if (p && ps !== null) {
    if (locale === 'de') parts.push(`Am stärksten passt ${p.name} (${ps}/100) zu deinem Gesamtmuster. Dabei geht es hier vor allem um ${p.meaning}.`);
    else if (locale === 'es') parts.push(`La coincidencia más fuerte es con ${p.name} (${ps}/100). En este perfil representa sobre todo ${p.meaning}.`);
    else if (locale === 'fr') parts.push(`La proximité la plus forte est avec ${p.name} (${ps}/100). Ici, cela renvoie surtout à ${p.meaning}.`);
    else parts.push(`Your strongest family match is ${p.name} ${ps}/100, reflecting ${p.meaning}.`);
  }
  if (s && ss !== null && (ps === null || ss >= 45)) {
    if (locale === 'de') parts.push(`Auch ${s.name} spielt mit ${ss}/100 eine erkennbare Rolle. Ein einziges Etikett wäre deshalb zu grob.`);
    else if (locale === 'es') parts.push(`${s.name} también pesa con ${ss}/100. Por eso una sola etiqueta se quedaría corta.`);
    else if (locale === 'fr') parts.push(`${s.name} compte aussi, avec ${ss}/100. Une seule étiquette serait donc trop réductrice.`);
    else parts.push(`${s.name} also matters at ${ss}/100, so a one-word label would leave out a meaningful part of your profile.`);
  }
  if (t && tertiary?.overall !== null && tertiary?.overall !== undefined && tertiary.overall >= 60) {
    if (locale === 'de') parts.push(`${t.name} ist mit ${tertiary.overall}/100 ebenfalls ein klarer Einfluss.`);
    else if (locale === 'es') parts.push(`${t.name} también aparece con fuerza: ${tertiary.overall}/100.`);
    else if (locale === 'fr') parts.push(`${t.name} apparaît aussi nettement, avec ${tertiary.overall}/100.`);
    else parts.push(`${t.name} is another clear influence at ${tertiary.overall}/100.`);
  }
  return { headline, summary: parts.join(' ') };
}
