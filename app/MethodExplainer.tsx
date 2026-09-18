'use client';

import { type Locale } from './LocaleProvider';

type AxisCopy = {
  name: string;
  question: string;
  left: string;
  right: string;
  why: string;
};

type MethodCopy = {
  whyTitle: string;
  whyBody: string;
  notClaim: string;
  axesTitle: string;
  axesIntro: string;
  endLabel: string;
  otherEndLabel: string;
  whySeparate: string;
  flowTitle: string;
  flow: readonly { n: string; title: string; text: string }[];
  readTitle: string;
  readBody: string;
  caution: string;
};

const axes: Record<Locale, readonly AxisCopy[]> = {
  en: [
    { name:'Economic role', question:'How much should government provide directly, and how much inequality should it try to reduce?', left:'More public provision & redistribution', right:'More market & private responsibility', why:'A person can want strong public services while still preferring private ownership of companies. That is why this is separate from Ownership.' },
    { name:'Ownership', question:'Who should own and control major businesses?', left:'More public / worker / cooperative ownership', right:'More private / shareholder ownership', why:'Ownership asks who controls productive assets. It is different from how large the welfare state should be.' },
    { name:'Social values', question:'When personal autonomy and inherited norms conflict, which should carry more weight?', left:'Personal autonomy & social change', right:'Tradition & moral continuity', why:'This keeps cultural and moral questions from being treated as if they were automatically economic positions.' },
    { name:'Authority', question:'When liberty and public order pull in different directions, which should carry more weight?', left:'Liberty & procedural safeguards', right:'Order & preventive authority', why:'Views about policing, emergency powers and safeguards can differ sharply from someone’s economic views.' },
    { name:'Pluralism', question:'How constrained should elected majorities be by courts, opposition, media and constitutional rules?', left:'More checks & competing institutions', right:'More room for elected majorities to act', why:'This captures attitudes toward concentrated political power rather than left or right policy content.' },
    { name:'World', question:'How much national discretion should countries trade for binding international cooperation?', left:'More international cooperation', right:'More national discretion', why:'People can agree on domestic policy but differ strongly on who should make cross-border decisions.' },
    { name:'Nationhood', question:'What should matter most for full national belonging?', left:'Civic & inclusive membership', right:'Inherited / cultural / status continuity', why:'Belonging and citizenship are treated separately from immigration policy, economics or social values.' },
    { name:'Ecology', question:'When ecological limits and economic growth conflict, which should take priority?', left:'Ecological limits & structural change', right:'Growth & incremental adaptation', why:'Environmental trade-offs deserve their own axis rather than being assumed from a person’s economic position.' },
  ],
  de: [
    { name:'Rolle des Staates', question:'Wie viel soll der Staat direkt bereitstellen – und wie stark soll er wirtschaftliche Ungleichheit verringern?', left:'Mehr öffentliche Absicherung & Umverteilung', right:'Mehr Markt & private Verantwortung', why:'Man kann starke öffentliche Leistungen wollen und Unternehmen trotzdem überwiegend in privater Hand sehen. Deshalb ist diese Achse von Eigentum getrennt.' },
    { name:'Eigentum', question:'Wer sollte große Unternehmen besitzen und kontrollieren?', left:'Mehr öffentliches / Belegschafts- / Genossenschaftseigentum', right:'Mehr privates / Anteilseigentum', why:'Eigentum fragt nach Kontrolle über Unternehmen – nicht danach, wie groß der Sozialstaat sein soll.' },
    { name:'Gesellschaftliche Werte', question:'Wenn persönliche Selbstbestimmung und überlieferte Normen kollidieren: Was soll stärker wiegen?', left:'Selbstbestimmung & gesellschaftlicher Wandel', right:'Tradition & moralische Kontinuität', why:'Kulturelle und moralische Fragen werden so nicht automatisch aus wirtschaftlichen Positionen abgeleitet.' },
    { name:'Autorität', question:'Wenn Freiheit und öffentliche Ordnung miteinander in Konflikt geraten: Was soll stärker wiegen?', left:'Freiheit & Verfahrensschutz', right:'Ordnung & vorbeugende Eingriffe', why:'Haltungen zu Sicherheit, Eingriffsbefugnissen und Schutzrechten können unabhängig von Wirtschaftsfragen sein.' },
    { name:'Pluralismus', question:'Wie stark sollen gewählte Mehrheiten durch Gerichte, Opposition, Medien und Verfassungsregeln begrenzt werden?', left:'Mehr Kontrolle & Gegenmacht', right:'Mehr Handlungsspielraum für gewählte Mehrheiten', why:'Hier geht es um den Umgang mit politischer Macht – nicht um ein bestimmtes Sachthema von links oder rechts.' },
    { name:'Internationale Ordnung', question:'Wie viel nationale Entscheidungshoheit soll für verbindliche internationale Zusammenarbeit abgegeben werden?', left:'Mehr internationale Zusammenarbeit', right:'Mehr nationale Entscheidungshoheit', why:'Menschen können innenpolitisch ähnlich denken und sich trotzdem stark darin unterscheiden, wer grenzüberschreitend entscheiden soll.' },
    { name:'Zugehörigkeit', question:'Was sollte für die volle Zugehörigkeit zu einer Nation am meisten zählen?', left:'Bürgerliche & offene Zugehörigkeit', right:'Herkunft / Kultur / gewachsene Kontinuität', why:'Zugehörigkeit wird getrennt von Wirtschafts-, Sozial- oder Einwanderungspolitik betrachtet.' },
    { name:'Ökologie', question:'Wenn ökologische Grenzen und wirtschaftliches Wachstum kollidieren: Was soll Vorrang haben?', left:'Ökologische Grenzen & Strukturwandel', right:'Wachstum & schrittweise Anpassung', why:'Umweltkonflikte bekommen eine eigene Achse, statt aus wirtschaftlichen Positionen abgeleitet zu werden.' },
  ],
  es: [
    { name:'Papel económico', question:'¿Cuánto debería proporcionar directamente el Estado y cuánto debería reducir la desigualdad?', left:'Más provisión pública y redistribución', right:'Más mercado y responsabilidad privada', why:'Se pueden defender servicios públicos fuertes y, al mismo tiempo, preferir empresas privadas. Por eso se separa de Propiedad.' },
    { name:'Propiedad', question:'¿Quién debería poseer y controlar las grandes empresas?', left:'Más propiedad pública / de trabajadores / cooperativa', right:'Más propiedad privada / de accionistas', why:'La propiedad pregunta quién controla los activos productivos, no el tamaño del Estado social.' },
    { name:'Valores sociales', question:'Cuando la autonomía personal choca con normas heredadas, ¿qué debería pesar más?', left:'Autonomía personal y cambio social', right:'Tradición y continuidad moral', why:'Así las cuestiones culturales no se deducen automáticamente de las posiciones económicas.' },
    { name:'Autoridad', question:'Cuando libertad y orden público entran en tensión, ¿qué debería pesar más?', left:'Libertad y garantías', right:'Orden y autoridad preventiva', why:'Las opiniones sobre seguridad y salvaguardas pueden ser muy distintas de las económicas.' },
    { name:'Pluralismo', question:'¿Hasta qué punto deberían limitar a las mayorías elegidas los tribunales, la oposición, los medios y las reglas constitucionales?', left:'Más contrapesos', right:'Más margen para las mayorías elegidas', why:'Mide la actitud ante la concentración del poder, no el contenido de una política concreta.' },
    { name:'Mundo', question:'¿Cuánta autonomía nacional debería cederse a cambio de cooperación internacional vinculante?', left:'Más cooperación internacional', right:'Más decisión nacional', why:'Dos personas pueden coincidir en política interna y discrepar sobre quién debe decidir los problemas transfronterizos.' },
    { name:'Pertenencia nacional', question:'¿Qué debería importar más para pertenecer plenamente a una nación?', left:'Pertenencia cívica e inclusiva', right:'Continuidad heredada / cultural / de estatus', why:'La pertenencia se separa de economía, valores sociales y política migratoria.' },
    { name:'Ecología', question:'Cuando los límites ecológicos chocan con el crecimiento, ¿qué debería tener prioridad?', left:'Límites ecológicos y cambio estructural', right:'Crecimiento y adaptación gradual', why:'Los conflictos ambientales merecen su propio eje y no se presuponen a partir de la economía.' },
  ],
  fr: [
    { name:'Rôle économique', question:'Que doit fournir directement l’État, et jusqu’où doit-il réduire les inégalités ?', left:'Plus de services publics et de redistribution', right:'Plus de marché et de responsabilité privée', why:'On peut vouloir des services publics solides tout en préférant des entreprises privées. C’est pourquoi cet axe est séparé de la Propriété.' },
    { name:'Propriété', question:'Qui devrait posséder et contrôler les grandes entreprises ?', left:'Davantage de propriété publique / salariale / coopérative', right:'Davantage de propriété privée / actionnariale', why:'La propriété demande qui contrôle les actifs productifs, pas quelle doit être la taille de l’État social.' },
    { name:'Valeurs sociales', question:'Quand autonomie personnelle et normes héritées s’opposent, que faut-il privilégier ?', left:'Autonomie personnelle et changement social', right:'Tradition et continuité morale', why:'Les questions culturelles ne sont ainsi pas déduites automatiquement des positions économiques.' },
    { name:'Autorité', question:'Quand liberté et ordre public entrent en tension, que faut-il privilégier ?', left:'Liberté et garanties procédurales', right:'Ordre et autorité préventive', why:'Les opinions sur la sécurité et les garanties peuvent différer fortement des positions économiques.' },
    { name:'Pluralisme', question:'Dans quelle mesure les majorités élues devraient-elles être limitées par les tribunaux, l’opposition, les médias et les règles constitutionnelles ?', left:'Plus de contre-pouvoirs', right:'Plus de marge pour les majorités élues', why:'Cet axe porte sur la concentration du pouvoir, pas sur le contenu d’une politique de gauche ou de droite.' },
    { name:'Monde', question:'Quelle marge de décision nationale faut-il céder pour une coopération internationale contraignante ?', left:'Plus de coopération internationale', right:'Plus de décision nationale', why:'Deux personnes peuvent être proches en politique intérieure et diverger sur le niveau auquel les décisions transfrontalières doivent être prises.' },
    { name:'Appartenance nationale', question:'Qu’est-ce qui devrait compter le plus pour appartenir pleinement à une nation ?', left:'Appartenance civique et inclusive', right:'Continuité héritée / culturelle / de statut', why:'L’appartenance est séparée de l’économie, des valeurs sociales et de la politique migratoire.' },
    { name:'Écologie', question:'Quand limites écologiques et croissance économique s’opposent, que faut-il privilégier ?', left:'Limites écologiques et changement structurel', right:'Croissance et adaptation progressive', why:'Les arbitrages environnementaux ont leur propre axe au lieu d’être déduits des positions économiques.' },
  ],
};

const copy: Record<Locale, MethodCopy> = {
  en: {
    whyTitle:'Why eight axes?',
    whyBody:'Because Politangle is trying to separate questions that are often bundled together. A single left–right score can hide combinations that matter: someone can support a large welfare state and private ownership, favor personal autonomy but stronger public order, or prefer national discretion while supporting environmental regulation.',
    notClaim:'Eight is Politangle’s model—not a claim that politics has exactly eight natural dimensions. The test can be revised when evidence shows that an axis overlaps too much, misses an important distinction or is not understood consistently.',
    axesTitle:'The eight questions behind the eight axes',
    axesIntro:'Think of each axis as one recurring political trade-off. Neither end is treated as the “correct” answer.',
    endLabel:'One end',
    otherEndLabel:'Other end',
    whySeparate:'Why keep it separate?',
    flowTitle:'How an answer becomes a result',
    flow:[
      { n:'01', title:'You answer statements', text:'Quick uses 26 statements. Full adds 16 more for 42 in total. “Not sure” is allowed and is not silently treated as a neutral opinion.' },
      { n:'02', title:'Related answers feed an axis', text:'Questions are linked to specific constructs. Politangle combines those responses into the eight visible dimensions instead of producing one hidden overall score.' },
      { n:'03', title:'You see the pattern', text:'The result shows each axis separately, then compares the whole pattern with broad political traditions. The axis detail matters more than any single label.' },
    ],
    readTitle:'How to read your result',
    readBody:'A score is a position inside Politangle’s current model. It is not a probability, a diagnosis, a measure of political knowledge or a statement about how you should vote.',
    caution:'The method is transparent by design, but it is still a candidate assessment. Technical consistency is tested; psychometric validation and population norms are separate work.',
  },
  de: {
    whyTitle:'Warum acht Achsen?',
    whyBody:'Weil Politangle Fragen trennt, die in politischen Etiketten oft zusammengeworfen werden. Ein einziger Links-rechts-Wert kann wichtige Kombinationen verdecken: Man kann einen starken Sozialstaat und privates Eigentum befürworten, persönliche Selbstbestimmung mit stärkerer öffentlicher Ordnung verbinden oder nationale Entscheidungshoheit und strenge Umweltpolitik gleichzeitig unterstützen.',
    notClaim:'Acht ist das Modell von Politangle – keine Behauptung, dass Politik naturgegeben genau acht Dimensionen hat. Die Struktur kann verändert werden, wenn sich zeigt, dass Achsen zu stark überlappen, wichtige Unterschiede fehlen oder Fragen nicht zuverlässig verstanden werden.',
    axesTitle:'Die acht Fragen hinter den acht Achsen',
    axesIntro:'Jede Achse steht für einen wiederkehrenden politischen Zielkonflikt. Keine Seite wird als die „richtige“ Antwort behandelt.',
    endLabel:'Ein Ende',
    otherEndLabel:'Anderes Ende',
    whySeparate:'Warum getrennt?',
    flowTitle:'Wie aus Antworten ein Ergebnis wird',
    flow:[
      { n:'01', title:'Du beantwortest Aussagen', text:'Quick verwendet 26 Aussagen. Full ergänzt 16 weitere und kommt auf 42. „Unsicher“ ist erlaubt und wird nicht heimlich als neutrale Meinung gewertet.' },
      { n:'02', title:'Verwandte Antworten speisen eine Achse', text:'Fragen sind klaren Konstrukten zugeordnet. Daraus entstehen die acht sichtbaren Dimensionen – statt eines einzigen versteckten Gesamtwerts.' },
      { n:'03', title:'Du siehst das Muster', text:'Das Ergebnis zeigt jede Achse einzeln und vergleicht anschließend das Gesamtmuster mit breiten politischen Traditionen. Die Achsen sind wichtiger als ein einzelnes Etikett.' },
    ],
    readTitle:'So liest du dein Ergebnis',
    readBody:'Ein Wert zeigt deine Position im aktuellen Politangle-Modell. Er ist keine Wahrscheinlichkeit, keine Diagnose, kein Wissenstest und keine Aussage darüber, wie du wählen solltest.',
    caution:'Die Methode ist bewusst transparent, aber weiterhin eine Kandidatenfassung. Technische Konsistenz wird getestet; psychometrische Validierung und repräsentative Vergleichswerte sind separate Arbeit.',
  },
  es: {
    whyTitle:'¿Por qué ocho ejes?',
    whyBody:'Porque Politangle separa preguntas que suelen agruparse bajo una sola etiqueta. Un único eje izquierda–derecha puede ocultar combinaciones importantes: se puede apoyar un Estado social amplio y la propiedad privada, combinar autonomía personal con más orden público o preferir decisión nacional y regulación ambiental.',
    notClaim:'Ocho es el modelo de Politangle; no afirmamos que la política tenga exactamente ocho dimensiones naturales. El modelo puede cambiar si la evidencia muestra solapamientos, distinciones ausentes o problemas de comprensión.',
    axesTitle:'Las ocho preguntas detrás de los ocho ejes',
    axesIntro:'Cada eje representa un conflicto político recurrente. Ninguno de los extremos se trata como la respuesta “correcta”.',
    endLabel:'Un extremo',
    otherEndLabel:'Otro extremo',
    whySeparate:'¿Por qué separarlo?',
    flowTitle:'Cómo una respuesta se convierte en resultado',
    flow:[
      { n:'01', title:'Respondes afirmaciones', text:'Quick utiliza 26 afirmaciones. Full añade 16 más, hasta 42. “No estoy seguro” está permitido y no se trata automáticamente como una opinión neutral.' },
      { n:'02', title:'Las respuestas relacionadas alimentan un eje', text:'Cada pregunta está vinculada a constructos concretos. Politangle combina esas respuestas en ocho dimensiones visibles, en lugar de ocultarlas en una sola puntuación.' },
      { n:'03', title:'Ves el patrón', text:'El resultado muestra cada eje por separado y después compara el patrón completo con tradiciones políticas amplias. El detalle de los ejes importa más que una etiqueta.' },
    ],
    readTitle:'Cómo leer tu resultado',
    readBody:'Una puntuación es una posición dentro del modelo actual de Politangle. No es una probabilidad, un diagnóstico, una medida de conocimiento ni una indicación de cómo votar.',
    caution:'El método es transparente por diseño, pero sigue siendo una evaluación candidata. La consistencia técnica se prueba; la validación psicométrica y las normas poblacionales son trabajos separados.',
  },
  fr: {
    whyTitle:'Pourquoi huit axes ?',
    whyBody:'Parce que Politangle sépare des questions souvent regroupées sous une seule étiquette. Un seul axe gauche–droite peut masquer des combinaisons importantes : on peut soutenir un État social développé et la propriété privée, associer autonomie personnelle et ordre public renforcé, ou préférer la décision nationale tout en soutenant une réglementation environnementale forte.',
    notClaim:'Huit est le modèle de Politangle — pas l’affirmation que la politique possède exactement huit dimensions naturelles. Le modèle peut évoluer si les données montrent trop de chevauchement, une distinction manquante ou des problèmes de compréhension.',
    axesTitle:'Les huit questions derrière les huit axes',
    axesIntro:'Chaque axe représente un arbitrage politique récurrent. Aucun des deux pôles n’est présenté comme la “bonne” réponse.',
    endLabel:'Un pôle',
    otherEndLabel:'Autre pôle',
    whySeparate:'Pourquoi le séparer ?',
    flowTitle:'Comment une réponse devient un résultat',
    flow:[
      { n:'01', title:'Tu réponds à des affirmations', text:'Quick utilise 26 affirmations. Full en ajoute 16 pour atteindre 42. “Je ne sais pas” est autorisé et n’est pas transformé silencieusement en opinion neutre.' },
      { n:'02', title:'Les réponses liées alimentent un axe', text:'Les questions sont rattachées à des construits précis. Politangle les combine en huit dimensions visibles plutôt qu’en une note globale cachée.' },
      { n:'03', title:'Tu vois le motif', text:'Le résultat montre chaque axe séparément puis compare l’ensemble du motif à de grandes traditions politiques. Le détail des axes compte davantage qu’une seule étiquette.' },
    ],
    readTitle:'Comment lire ton résultat',
    readBody:'Un score indique une position dans le modèle actuel de Politangle. Ce n’est ni une probabilité, ni un diagnostic, ni un test de connaissances, ni une indication de vote.',
    caution:'La méthode est transparente par conception, mais reste une évaluation candidate. La cohérence technique est testée ; la validation psychométrique et les normes de population constituent un travail séparé.',
  },
};

export default function MethodExplainer({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <>
      <section className="method-why">
        <h2>{c.whyTitle}</h2>
        <p>{c.whyBody}</p>
        <aside>{c.notClaim}</aside>
      </section>

      <section className="method-axes">
        <div className="method-section-head">
          <h2>{c.axesTitle}</h2>
          <p>{c.axesIntro}</p>
        </div>
        <div className="method-axis-grid">
          {axes[locale].map((axis, index) => (
            <article className="method-axis-card" key={axis.name}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{axis.name}</h3>
              <p className="method-axis-question">{axis.question}</p>
              <div className="method-axis-ends">
                <div><small>{c.endLabel}</small><strong>{axis.left}</strong></div>
                <i aria-hidden="true"><em/></i>
                <div><small>{c.otherEndLabel}</small><strong>{axis.right}</strong></div>
              </div>
              <p className="method-axis-why"><b>{c.whySeparate}</b> {axis.why}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="method-flow">
        <h2>{c.flowTitle}</h2>
        <div className="method-flow-grid">
          {c.flow.map((step) => (
            <article key={step.n}>
              <span>{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="method-read">
        <h2>{c.readTitle}</h2>
        <p>{c.readBody}</p>
        <aside>{c.caution}</aside>
      </section>
    </>
  );
}
