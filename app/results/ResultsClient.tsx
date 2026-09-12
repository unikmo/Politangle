'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { assessFamiliesV2Canonical, assessResponseConsistencyV2, calculatePolygonV2Canonical } from '../../lib/belief-v2-engine';
import { beliefV2StageProgress, lockedBeliefStatementsV3, parseBeliefV2Session, type BeliefV2Session } from '../../lib/belief-v2-session';
import { collapseStatementAnswers } from '../../lib/belief-statements';
import { describePolitangleHome } from '../../lib/politangle-home';
import { useLocale, type Locale } from '../LocaleProvider';
import { translate } from '../translations';

const BELIEF_SESSION_KEY = 'politangle.believe.v2.session';

type AxisLike = ReturnType<typeof calculatePolygonV2Canonical>[number];

const axisCopy: Record<Locale, Record<string, { name: string; low: string; high: string }>> = {
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

const familyCopy: Record<Locale, Record<string, { name: string; meaning: string }>> = {
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

function axisDisplay(locale: Locale, axis: AxisLike) {
  return axisCopy[locale][axis.id] ?? { name: axis.name, low: axis.low, high: axis.high };
}

function familyDisplay(locale: Locale, id: string, fallback: string) {
  return familyCopy[locale][id] ?? { name: fallback, meaning: locale === 'de' ? 'die Kerngedanken dieser Tradition' : locale === 'es' ? 'las ideas centrales de esta tradición' : locale === 'fr' ? 'les idées centrales de cette tradition' : 'the core ideas of that tradition' };
}

function directionLabel(locale: Locale, score: number | null, low: string, high: string) {
  if (locale === 'de') {
    if (score === null) return 'Noch zu wenig Informationen';
    if (score <= 24) return `Deutlich Richtung ${low}`;
    if (score <= 39) return `Eher ${low}`;
    if (score <= 60) return 'Gemischt / ausgewogen';
    if (score <= 74) return `Eher ${high}`;
    return `Deutlich Richtung ${high}`;
  }
  if (locale === 'es') {
    if (score === null) return 'Aún falta información';
    if (score <= 24) return `Muy cerca de ${low}`;
    if (score <= 39) return `Se inclina hacia ${low}`;
    if (score <= 60) return 'Mixto / equilibrado';
    if (score <= 74) return `Se inclina hacia ${high}`;
    return `Muy cerca de ${high}`;
  }
  if (locale === 'fr') {
    if (score === null) return 'Pas encore assez d’informations';
    if (score <= 24) return `Très nettement vers ${low}`;
    if (score <= 39) return `Plutôt vers ${low}`;
    if (score <= 60) return 'Mixte / équilibré';
    if (score <= 74) return `Plutôt vers ${high}`;
    return `Très nettement vers ${high}`;
  }
  if (score === null) return 'Not enough information';
  if (score <= 24) return `Strongly toward ${low.toLowerCase()}`;
  if (score <= 39) return `Leans toward ${low.toLowerCase()}`;
  if (score <= 60) return 'Mixed / balanced';
  if (score <= 74) return `Leans toward ${high.toLowerCase()}`;
  return `Strongly toward ${high.toLowerCase()}`;
}

function coherenceBand(locale: Locale, score: number | null) {
  if (locale === 'de') return score === null ? 'Noch zu wenig Informationen' : score >= 80 ? 'Sehr stimmig' : score >= 65 ? 'Weitgehend stimmig' : score >= 45 ? 'Kontextabhängig' : 'Stark gemischt';
  if (locale === 'es') return score === null ? 'Aún falta información' : score >= 80 ? 'Muy coherente' : score >= 65 ? 'Bastante coherente' : score >= 45 ? 'Depende del contexto' : 'Muy mixto';
  if (locale === 'fr') return score === null ? 'Pas encore assez d’informations' : score >= 80 ? 'Très cohérent' : score >= 65 ? 'Plutôt cohérent' : score >= 45 ? 'Dépend du contexte' : 'Très mixte';
  if (score === null) return 'Not enough information';
  if (score >= 80) return 'Highly coherent';
  if (score >= 65) return 'Mostly coherent';
  if (score >= 45) return 'Context-sensitive';
  return 'Strongly mixed';
}

function axisSentence(locale: Locale, score: number | null, low: string, high: string) {
  if (locale === 'de') {
    if (score === null) return 'Für diese Achse fehlen noch Antworten.';
    if (score <= 24) return `${low} ist eine der deutlichsten Tendenzen in deinen Antworten.`;
    if (score <= 39) return `Du tendierst zu ${low}, ohne ganz eindeutig zu sein.`;
    if (score <= 60) return `Du hältst ${low} und ${high} vergleichsweise gut in Balance.`;
    if (score <= 74) return `Du tendierst zu ${high}, ohne ganz eindeutig zu sein.`;
    return `${high} ist eine der deutlichsten Tendenzen in deinen Antworten.`;
  }
  if (locale === 'es') {
    if (score === null) return 'Aún faltan respuestas para este eje.';
    if (score <= 24) return `${low} es una de las tendencias más claras de tus respuestas.`;
    if (score <= 39) return `Te inclinas hacia ${low}, aunque no de forma absoluta.`;
    if (score <= 60) return `Mantienes bastante equilibrio entre ${low} y ${high}.`;
    if (score <= 74) return `Te inclinas hacia ${high}, aunque no de forma absoluta.`;
    return `${high} es una de las tendencias más claras de tus respuestas.`;
  }
  if (locale === 'fr') {
    if (score === null) return 'Il manque encore des réponses pour cet axe.';
    if (score <= 24) return `${low} est l’une des tendances les plus nettes dans tes réponses.`;
    if (score <= 39) return `Tu penches vers ${low}, sans être complètement tranché.`;
    if (score <= 60) return `Tu gardes un équilibre assez marqué entre ${low} et ${high}.`;
    if (score <= 74) return `Tu penches vers ${high}, sans être complètement tranché.`;
    return `${high} est l’une des tendances les plus nettes dans tes réponses.`;
  }
  if (score === null) return 'This part of your shape needs more answers.';
  if (score <= 24) return `${low} is one of the clearest features of your answers.`;
  if (score <= 39) return `You lean toward ${low.toLowerCase()}, but not absolutely.`;
  if (score <= 60) return `You balance ${low.toLowerCase()} with ${high.toLowerCase()}.`;
  if (score <= 74) return `You lean toward ${high.toLowerCase()}, but not absolutely.`;
  return `${high} is one of the clearest features of your answers.`;
}

function localizedHome(locale: Locale, home: ReturnType<typeof describePolitangleHome>) {
  const primary = home.primary;
  const secondary = home.secondary;
  const tertiary = home.tertiary;
  const p = primary ? familyDisplay(locale, primary.id, primary.name) : null;
  const s = secondary ? familyDisplay(locale, secondary.id, secondary.name) : null;
  const t = tertiary ? familyDisplay(locale, tertiary.id, tertiary.name) : null;
  const pScore = primary?.overall ?? null;
  const sScore = secondary?.overall ?? null;
  const gap = pScore === null || sScore === null ? null : pScore - sScore;

  let headline = home.headline;
  if (locale === 'de') {
    headline = 'Dein vorläufiges politisches Profil bleibt gemischt.';
    if (p && pScore !== null && s && sScore !== null && pScore >= 55 && sScore >= 55 && gap !== null && gap <= 4) headline = `Dein Profil liegt zwischen ${p.name} und ${s.name}.`;
    else if (p && pScore !== null && s && sScore !== null && pScore >= 55 && sScore >= 50) headline = `Dein Profil liegt vor allem bei ${p.name}, mit deutlicher Nähe zu ${s.name}.`;
    else if (p && pScore !== null && pScore >= 55) headline = `Dein Profil liegt vor allem bei ${p.name}.`;
    else if (p && pScore !== null) headline = 'Keine einzelne politische Tradition dominiert deine Antworten.';
  } else if (locale === 'es') {
    headline = 'Tu perfil político sigue siendo mixto.';
    if (p && pScore !== null && s && sScore !== null && pScore >= 55 && sScore >= 55 && gap !== null && gap <= 4) headline = `Tu perfil queda entre ${p.name} y ${s.name}.`;
    else if (p && pScore !== null && s && sScore !== null && pScore >= 55 && sScore >= 50) headline = `Tu perfil encaja sobre todo con ${p.name}, con una cercanía clara a ${s.name}.`;
    else if (p && pScore !== null && pScore >= 55) headline = `Tu perfil encaja sobre todo con ${p.name}.`;
    else if (p && pScore !== null) headline = 'Ninguna tradición política domina claramente tus respuestas.';
  } else if (locale === 'fr') {
    headline = 'Ton profil politique reste mixte.';
    if (p && pScore !== null && s && sScore !== null && pScore >= 55 && sScore >= 55 && gap !== null && gap <= 4) headline = `Ton profil se situe entre ${p.name} et ${s.name}.`;
    else if (p && pScore !== null && s && sScore !== null && pScore >= 55 && sScore >= 50) headline = `Ton profil se rapproche surtout de ${p.name}, avec aussi une forte proximité avec ${s.name}.`;
    else if (p && pScore !== null && pScore >= 55) headline = `Ton profil se rapproche surtout de ${p.name}.`;
    else if (p && pScore !== null) headline = 'Aucune tradition politique ne domine clairement tes réponses.';
  }

  const parts: string[] = [];
  if (p && pScore !== null) {
    if (locale === 'de') parts.push(`Am stärksten passt ${p.name} (${pScore}/100) zu deinem Gesamtmuster. Dabei geht es hier vor allem um ${p.meaning}.`);
    else if (locale === 'es') parts.push(`La coincidencia más fuerte es con ${p.name} (${pScore}/100). En este perfil representa sobre todo ${p.meaning}.`);
    else if (locale === 'fr') parts.push(`La proximité la plus forte est avec ${p.name} (${pScore}/100). Ici, cela renvoie surtout à ${p.meaning}.`);
    else parts.push(`Your strongest family match is ${p.name} ${pScore}/100, reflecting ${p.meaning}.`);
  }
  if (s && sScore !== null && (pScore === null || sScore >= 45)) {
    if (locale === 'de') parts.push(`Auch ${s.name} spielt mit ${sScore}/100 eine erkennbare Rolle. Ein einziges Etikett wäre deshalb zu grob.`);
    else if (locale === 'es') parts.push(`${s.name} también pesa con ${sScore}/100. Por eso una sola etiqueta se quedaría corta.`);
    else if (locale === 'fr') parts.push(`${s.name} compte aussi, avec ${sScore}/100. Une seule étiquette serait donc trop réductrice.`);
    else parts.push(`${s.name} also matters at ${sScore}/100, so a one-word label would leave out a meaningful part of your profile.`);
  }
  if (t && tertiary?.overall !== null && tertiary?.overall !== undefined && tertiary.overall >= 60) {
    if (locale === 'de') parts.push(`${t.name} ist mit ${tertiary.overall}/100 ebenfalls ein klarer Einfluss.`);
    else if (locale === 'es') parts.push(`${t.name} también aparece con fuerza: ${tertiary.overall}/100.`);
    else if (locale === 'fr') parts.push(`${t.name} apparaît aussi nettement, avec ${tertiary.overall}/100.`);
    else parts.push(`${t.name} is another clear influence at ${tertiary.overall}/100.`);
  }
  if (locale === 'de') parts.push('Quick ist eine erste Einordnung. Full prüft dieselben Themen mit zusätzlichen THINK-, FEEL- und ACT-Perspektiven.');
  else if (locale === 'es') parts.push('Quick es una primera lectura. Full vuelve sobre los mismos temas desde ángulos adicionales de THINK, FEEL y ACT.');
  else if (locale === 'fr') parts.push('Quick donne une première lecture. Full reprend les mêmes thèmes avec des angles THINK, FEEL et ACT supplémentaires.');
  else parts.push('Quick is a first reading; Full checks the same political themes from additional THINK, FEEL and ACT angles.');

  return { headline, summary: parts.join(' ') };
}

function referencePeople(familyId: string) {
  const groups: Record<string, readonly string[]> = {
    'social-democracy': ['Willy Brandt', 'Olof Palme', 'Clement Attlee'],
    liberalism: ['John Stuart Mill', 'John Rawls', 'Václav Havel'],
    'green-politics': ['Petra Kelly', 'Wangari Maathai', 'Gro Harlem Brundtland'],
    socialism: ['Aneurin Bevan', 'Salvador Allende', 'Michael Manley'],
    conservatism: ['Edmund Burke', 'Konrad Adenauer', 'Charles de Gaulle'],
  };
  return groups[familyId] ?? [];
}

function PoliticalShape({ axes, locale }: { axes: ReturnType<typeof calculatePolygonV2Canonical>; locale: Locale }) {
  const size = 500;
  const center = size / 2;
  const radius = 162;
  const labelRadius = 214;
  const known = axes.map((axis) => axis.score ?? 50);
  const point = (index: number, value: number, r = radius) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / axes.length;
    const scaled = r * (value / 100);
    return [center + Math.cos(angle) * scaled, center + Math.sin(angle) * scaled] as const;
  };
  const polygon = known.map((value, index) => point(index, value)).map(([x, y]) => `${x},${y}`).join(' ');
  const rings = [25, 50, 75, 100].map((level) => axes.map((_, index) => point(index, level)).map(([x, y]) => `${x},${y}`).join(' '));
  const aria = locale === 'de' ? 'Dein politisches Profil mit acht Achsen' : locale === 'es' ? 'Tu perfil político de ocho ejes' : locale === 'fr' ? 'Ton profil politique à huit axes' : 'Your eight-axis political shape';

  return (
    <div className="shape-wrap compact-shape">
      <svg className="political-shape" viewBox={`0 0 ${size} ${size}`} role="img" aria-label={aria}>
        {rings.map((ring, index) => <polygon key={index} className="shape-ring" points={ring} />)}
        {axes.map((axis, index) => {
          const display = axisDisplay(locale, axis);
          const angle = -Math.PI / 2 + (index * Math.PI * 2) / axes.length;
          const [x, y] = point(index, 100);
          const lx = center + Math.cos(angle) * labelRadius;
          const ly = center + Math.sin(angle) * labelRadius;
          return (
            <g key={axis.id}>
              <line className="shape-spoke" x1={center} y1={center} x2={x} y2={y} />
              <text className="shape-label" x={lx} y={ly} textAnchor={lx < center - 12 ? 'end' : lx > center + 12 ? 'start' : 'middle'} dominantBaseline="middle">
                <tspan x={lx} dy="-0.25em">{display.name}</tspan>
                <tspan className="shape-axis-score" x={lx} dy="1.35em">{axis.score ?? '—'}</tspan>
              </text>
            </g>
          );
        })}
        <polygon className="shape-area" points={polygon} />
        {known.map((value, index) => {
          const [x, y] = point(index, value);
          return <circle key={axes[index].id} className="shape-dot" cx={x} cy={y} r="5" />;
        })}
      </svg>
      <p className="shape-scale-note">{locale === 'de' ? 'Jede Speiche steht für eine politische Dimension. Entscheidend ist das Gesamtmuster – nicht einfach die längste Speiche.' : locale === 'es' ? 'Cada radio representa una dimensión política. Lo importante es el conjunto del perfil, no simplemente el radio más largo.' : locale === 'fr' ? 'Chaque branche représente une dimension politique. Ce qui compte, c’est le profil d’ensemble, pas simplement la branche la plus longue.' : 'Each spoke is one political dimension. Your political home comes from the overall pattern—not simply from whichever spoke happens to be longest.'}</p>
    </div>
  );
}

export default function ResultsClient() {
  const { locale } = useLocale();
  const t = (en: string, de: string) => translate(locale, en, de);
  const [session, setSession] = useState<BeliefV2Session | null | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setSession(parseBeliefV2Session(sessionStorage.getItem(BELIEF_SESSION_KEY)));
  }, []);

  const result = useMemo(() => {
    if (!session || !beliefV2StageProgress(session, 'quick').complete) return null;
    const canonicalAnswers = collapseStatementAnswers(session.answers, lockedBeliefStatementsV3);
    return {
      polygon: calculatePolygonV2Canonical(canonicalAnswers),
      thinkPolygon: calculatePolygonV2Canonical(canonicalAnswers, 'think'),
      actPolygon: calculatePolygonV2Canonical(canonicalAnswers, 'act'),
      families: assessFamiliesV2Canonical(canonicalAnswers),
      coherence: assessResponseConsistencyV2(canonicalAnswers),
    };
  }, [session]);

  if (session === undefined) return <section className="engine-card"><p>{t('Loading result…', 'Ergebnis wird geladen…')}</p></section>;

  if (!session || !result) {
    return (
      <section className="engine-shell">
        <article className="engine-card">
          <p className="engine-kicker">{t('No complete Quick result','Noch kein vollständiges Quick-Ergebnis')}</p>
          <h1>{t('Take Politangle Quick first.','Mach zuerst Politangle Quick.')}</h1>
          <p>{t('Quick uses 26 questions to build your first political shape.','Quick nutzt 26 Fragen für dein erstes politisches Profil.')}</p>
          <Link className="engine-primary-link" href="/quiz">{t('Start Quick','Quick starten')}</Link>
        </article>
      </section>
    );
  }

  const home = describePolitangleHome(result.families, result.polygon, false);
  const localized = localizedHome(locale, home);
  const people = home.primary ? referencePeople(home.primary.id) : [];
  const divergences = result.thinkPolygon.map((axis, index) => {
    const think = axis.score;
    const act = result.actPolygon[index]?.score ?? null;
    return { ...axis, think, act, gap: think === null || act === null ? 0 : Math.abs(think - act) };
  }).filter((axis) => axis.think !== null && axis.act !== null).sort((a, b) => b.gap - a.gap);
  const largestGap = divergences[0];
  const topFamilies = [home.primary, home.secondary, home.tertiary].filter((family): family is NonNullable<typeof family> => Boolean(family && family.overall !== null));

  const copyShape = async () => {
    const axisText = result.polygon.map((axis) => `${axisDisplay(locale, axis).name} ${axis.score ?? '—'}`).join(' · ');
    const text = `Politangle: ${localized.headline} ${axisText}`;
    if (navigator.clipboard) await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="engine-shell result-shell">
      <article className="engine-card politangle-home-card">
        <p className="engine-kicker">{t('Your Politangle · Quick','Dein Politangle · Quick')}</p>
        <h1>{localized.headline}</h1>
        <p className="result-lede">{localized.summary}</p>

        <div className="politangle-family-story" aria-label={locale === 'de' ? 'Nächste politische Traditionen' : locale === 'es' ? 'Tradiciones políticas más cercanas' : locale === 'fr' ? 'Traditions politiques les plus proches' : 'Closest political traditions'}>
          {topFamilies.map((family, index) => {
            const display = familyDisplay(locale, family.id, family.name);
            const label = locale === 'de' ? (index === 0 ? 'Stärkste Nähe' : index === 1 ? 'Deutliche Nähe' : 'Weiterer Einfluss') : locale === 'es' ? (index === 0 ? 'Coincidencia principal' : index === 1 ? 'Cercanía importante' : 'Otra influencia') : locale === 'fr' ? (index === 0 ? 'Proximité principale' : index === 1 ? 'Proximité importante' : 'Autre influence') : (index === 0 ? 'Main home' : index === 1 ? 'Significant leaning' : 'Additional influence');
            return <p key={family.id}><strong>{label} · {display.name} · {family.overall}/100</strong><span>{display.meaning}.</span></p>;
          })}
        </div>

        {people.length > 0 && home.primary && (() => {
          const display = familyDisplay(locale, home.primary.id, home.primary.name);
          return <p className="home-reference"><strong>{locale === 'de' ? `Historische Bezugspunkte für ${display.name}:` : locale === 'es' ? `Referencias históricas de ${display.name}:` : locale === 'fr' ? `Repères historiques pour ${display.name} :` : `Historical reference points for ${display.name}:`}</strong> {people.join(' · ')}. {locale === 'de' ? 'Sie stehen für die Tradition – nicht für dein persönliches Profil.' : locale === 'es' ? 'Representan la tradición, no tu perfil personal exacto.' : locale === 'fr' ? 'Ils illustrent la tradition, pas ton profil personnel exact.' : 'They illustrate the tradition, not your exact personal profile.'}</p>;
        })()}

        <PoliticalShape axes={result.polygon} locale={locale} />
        <div className="result-action-row compact-actions">
          <button className="engine-primary-link" type="button" onClick={copyShape}>{copied ? (locale === 'de' ? 'Kopiert' : locale === 'es' ? 'Copiado' : locale === 'fr' ? 'Copié' : 'Copied') : (locale === 'de' ? 'Mein Politangle kopieren' : locale === 'es' ? 'Copiar mi Politangle' : locale === 'fr' ? 'Copier mon Politangle' : 'Copy my Politangle')}</button>
          <span>{locale === 'de' ? 'Diese achtseitige Form ist dein Politangle. Die Einordnung daneben zeigt, welche politischen Traditionen dem Gesamtmuster am nächsten kommen.' : locale === 'es' ? 'Esta figura de ocho lados es tu Politangle. La lectura explica qué tradiciones políticas se parecen más al conjunto del perfil.' : locale === 'fr' ? 'Cette forme à huit côtés est ton Politangle. La lecture explique quelles traditions politiques se rapprochent le plus de l’ensemble du profil.' : 'This eight-sided shape is your Politangle. The reading beside it explains the political traditions that most closely resemble the whole pattern.'}</span>
        </div>
      </article>

      <article className="engine-card result-story-card compact-result-card" style={{ marginTop: 18 }}>
        <p className="engine-kicker">{locale === 'de' ? 'Warum dieses Ergebnis?' : locale === 'es' ? '¿Por qué este resultado?' : locale === 'fr' ? 'Pourquoi ce résultat ?' : 'Why this is your result'}</p>
        <h2>{locale === 'de' ? 'Die drei Positionen, die dein Profil am stärksten prägen.' : locale === 'es' ? 'Las tres posiciones que más marcan tu perfil.' : locale === 'fr' ? 'Les trois positions qui structurent le plus ton profil.' : 'The three positions that shape your profile most.'}</h2>
        <div className="result-insight-grid">
          {home.strongestAxes.map((axis) => {
            const display = axisDisplay(locale, axis);
            return <section key={axis.id} className="result-insight"><strong>{display.name}</strong><span>{axis.score} / 100</span><p>{axisSentence(locale, axis.score, display.low, display.high)}</p></section>;
          })}
        </div>

        <div className="consistency-quick">
          <div><strong>{result.coherence.score ?? '—'}<small>/100</small></strong><span>{coherenceBand(locale, result.coherence.score)}</span></div>
          <p><b>{locale === 'de' ? 'Stimmigkeit der Antworten.' : locale === 'es' ? 'Coherencia de las respuestas.' : locale === 'fr' ? 'Cohérence des réponses.' : 'Response coherence.'}</b> {locale === 'de' ? 'Hier wird geprüft, ob Antworten auf ähnliche Grundsatz- und Praxissituationen in dieselbe Richtung zeigen. Das sagt nichts darüber aus, ob deine politische Haltung richtig, informiert oder besonders stark ist.' : locale === 'es' ? 'Esto comprueba si tus respuestas a principios y situaciones prácticas relacionadas apuntan en direcciones parecidas. No juzga si tus ideas políticas son correctas, informadas o firmes.' : locale === 'fr' ? 'Cela vérifie si tes réponses à des principes et à des situations concrètes proches vont dans le même sens. Ce score ne juge pas si tes idées politiques sont justes, informées ou fortement ancrées.' : 'This checks whether your answers to related principle and practical-choice questions point in similar directions. It does not judge whether your politics are correct, informed or strongly held.'}</p>
        </div>

        {largestGap && largestGap.gap >= 20 && (() => {
          const display = axisDisplay(locale, largestGap);
          return <div className="result-tension"><strong>{locale === 'de' ? `Der größte Unterschied zwischen Grundsatz und praktischer Entscheidung liegt bei ${display.name}.` : locale === 'es' ? `La mayor diferencia entre principio y decisión práctica aparece en ${display.name}.` : locale === 'fr' ? `Le plus grand écart entre principe et choix concret apparaît sur ${display.name}.` : `Your largest principle-to-choice shift is on ${display.name}.`}</strong><p>{locale === 'de' ? `Dein Grundsatzwert liegt bei ${largestGap.think}, deine praktische Entscheidung bei ${largestGap.act}. Die Differenz von ${largestGap.gap} Punkten zeigt, dass konkrete Zielkonflikte deine Antwort hier spürbar verändern.` : locale === 'es' ? `Tu posición de principio es ${largestGap.think} y tu elección práctica ${largestGap.act}. La diferencia de ${largestGap.gap} puntos indica que los dilemas concretos cambian bastante tu respuesta en este tema.` : locale === 'fr' ? `Ta position de principe est à ${largestGap.think}, ton choix concret à ${largestGap.act}. L’écart de ${largestGap.gap} points montre que les arbitrages concrets changent nettement ta réponse sur ce sujet.` : `Your principle position is ${largestGap.think}, while your practical-choice position is ${largestGap.act}. That ${largestGap.gap}-point difference suggests that concrete trade-offs change how you answer on this topic.`}</p></div>;
        })()}
      </article>

      <details className="engine-card result-details-card" style={{ marginTop: 18 }}>
        <summary>{locale === 'de' ? 'Alle acht politischen Achsen ansehen' : locale === 'es' ? 'Ver los ocho ejes políticos' : locale === 'fr' ? 'Voir les huit axes politiques' : 'See all eight political axes'}</summary>
        <div className="engine-results compact-axis-results">
          {result.polygon.map((axis) => {
            const display = axisDisplay(locale, axis);
            return <section className="engine-dimension" key={axis.id}><div className="engine-dimension-head"><strong>{display.name}</strong><span>{directionLabel(locale, axis.score, display.low, display.high)}</span></div><div className="engine-poles"><span>{display.low}</span><span>{display.high}</span></div><div className="engine-score-track">{axis.score !== null && <span style={{ left: `${axis.score}%` }} />}</div></section>;
          })}
        </div>
      </details>

      <div className="engine-result-actions">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link className="engine-primary-link" href="/deep">{t('Continue to Full: 16 more','Weiter zu Full: 16 mehr')}</Link>
          <Link className="engine-primary-link" href="/quiz">{t('Review Quick','Quick ansehen')}</Link>
        </div>
        <span>{t('Add 16 more questions for the fuller picture.','Mit 16 weiteren Fragen wird das Bild noch genauer.')}</span>
      </div>
    </section>
  );
}
