'use client';

import Link from 'next/link';
import { InfoShell } from '../InfoShell';
import { localePath, useLocale, type Locale } from '../LocaleProvider';

type FaqCopy = { eyebrow:string; title:string; intro:string; items:readonly (readonly [string,string])[]; detail:string; method:string; limits:string; privacy:string; school:string; start:string };
const faq: Record<Locale,FaqCopy> = {
  en: {
    eyebrow:'QUESTIONS, WITHOUT THE LABELS', title:'Curious? Here are the details.',
    intro:'Start with your own views. Come here when you want to know how the questions, results, privacy and limitations work.',
    items:[
      ['What will I discover?','Politangle maps the positions you express across eight political dimensions. You may find points of similarity with more than one tradition, alongside real differences. It does not tell you what to believe or how to vote.'],
      ['Why not just left, centre or right?','One line cannot show every combination of economic, social, institutional and other priorities. Politangle separates recurring trade-offs so you can inspect the pattern rather than accept a single label.'],
      ['What is Quick, and what is Full?','Quick starts with 26 statements. Full adds 16 for more depth. Neither has right or wrong political beliefs. The separate political-literacy practice quizzes do have knowledge-based answers and explanations.'],
      ['Is it free? Do I need an account?','The first Quick run is free and can be started without signing up. Repeat use may require registration. Any separate paid certification flow states its conditions and price before purchase.'],
      ['How is the result calculated?','Answers feed a documented scoring model across eight dimensions. The site also shows similarities to political traditions and where your positions diverge. You can read the method, question-bank version and technical limitations.'],
      ['Does a close tradition mean I support a party?','No. A resemblance to a political tradition is not a party recommendation, voting prediction or fixed identity. Country guides provide context without changing your score or assigning you to a party.'],
      ['How scientifically reliable is the assessment?','The technical scoring logic has consistency checks. Independent psychometric validity, representative norms, test–retest reliability and cross-language equivalence have not been established. Treat results as educational prompts for reflection, not a validated diagnosis of political identity.'],
      ['What happens to my political answers?','The public assessment currently uses browser-session state for answers and the result. Read the Privacy page for details and outstanding legal review. Avoid sharing an individual political result unless you choose to.'],
      ['Can schools use the classroom version now?','Not with real students yet. The classroom experience remains a controlled pilot pending legal, accessibility and educational review. Its design is anonymous: teachers see aggregated class patterns, not individual political answers or profiles.'],
      ['Are Junior, Youth and Adult the same test?','No. Age-appropriate experiences are designed for Junior (10–13), Youth (14–18) and Adult (18+). Questions and interpretation must respect those audiences. A public availability claim is not permission to run a real-student classroom pilot.'],
      ['Are all languages equally validated?','Politangle offers core assessments in English, German, Spanish, French and Brazilian Portuguese. Language-specific editorial review does not, by itself, establish independent cross-language psychometric equivalence.'],
      ['Why are country perspectives useful?','Political institutions and labels have local histories. The country guides help explain context; up-to-date snapshots are provided only where source-checked. They are not party-matching tools.'],
      ['Is Politangle politically neutral?','Its assessment is intended for exploration, not persuasion. The quiz does not grade beliefs as correct or incorrect. Focused knowledge exercises distinguish concepts using explanations; a thematic quiz may also disclose a particular argument or perspective.'],
      ['Where can I check the evidence?','Read Method for scoring, Validation for limitations, Question banks for version history and Privacy for data handling. These sources are more detailed than a landing page.'],
    ],
    detail:'Go deeper, if you want to.',method:'Method',limits:'Validation and limitations',privacy:'Privacy',school:'School pilot conditions',start:'Discover my angle →'
  },
  de: {
    eyebrow:'FRAGEN OHNE SCHUBLADEN',title:'Neugierig? Hier stehen die Antworten.',
    intro:'Starte mit deinen eigenen Ansichten. Hier erfährst du, wie Fragen, Ergebnisse, Datenschutz und Grenzen wirklich funktionieren.',
    items:[
      ['Was erfahre ich über mich?','Politangle zeigt, wie sich deine Antworten über acht politische Dimensionen verteilen. Ähnlichkeiten zu mehreren Traditionen und deutliche Unterschiede können nebeneinanderstehen. Der Test sagt dir nicht, was du denken oder wählen sollst.'],
      ['Warum reicht links, Mitte oder rechts nicht?','Eine einzige Linie zeigt viele Kombinationen politischer Prioritäten nicht. Politangle trennt wiederkehrende Zielkonflikte, damit du dein Muster betrachten kannst, statt nur ein Etikett zu übernehmen.'],
      ['Was unterscheidet Quick und Full?','Quick beginnt mit 26 Aussagen. Full ergänzt 16 Fragen. Politische Überzeugungen werden dabei nicht als richtig oder falsch bewertet. Wissensübungen sind etwas anderes: Dort gibt es fachlich begründete Antworten.'],
      ['Ist der Test kostenlos und ohne Anmeldung?','Den ersten Quick-Durchlauf kannst du kostenlos und ohne Konto beginnen. Bei einer Wiederholung kann eine Registrierung erforderlich sein. Eine separate kostenpflichtige Zertifizierung zeigt Bedingungen und Preis vor dem Kauf.'],
      ['Wie entsteht mein Ergebnis?','Deine Antworten werden über ein dokumentiertes Modell acht Dimensionen zugeordnet. Zusätzlich siehst du Ähnlichkeiten zu politischen Traditionen und Abweichungen. Methode, Fragenversionen und Grenzen sind einsehbar.'],
      ['Bedeutet eine Nähe zu einer Tradition eine Parteizuordnung?','Nein. Eine Ähnlichkeit ist weder Wahlempfehlung noch Vorhersage deiner Wahlentscheidung oder eine feste Identität. Länderporträts liefern Kontext und verändern deinen Wert nicht.'],
      ['Wie wissenschaftlich belastbar ist das Ergebnis?','Die technische Berechnung wird auf Konsistenz geprüft. Unabhängige psychometrische Validität, repräsentative Vergleichswerte, Test-Retest-Zuverlässigkeit und Gleichwertigkeit der Sprachversionen sind noch nicht belegt. Nutze das Ergebnis als Denkanstoß.'],
      ['Was passiert mit meinen politischen Antworten?','Der öffentliche Test verwendet derzeit Daten aus der Browser-Sitzung für Antworten und Ergebnisse. Die Datenschutzhinweise erklären den Stand und offenen Prüfbedarf. Du entscheidest selbst, ob du ein individuelles Profil teilst.'],
      ['Können Schulen den Klassenmodus schon verwenden?','Noch nicht mit echten Schülerinnen und Schülern. Der kontrollierte Pilot benötigt vor der Freigabe eine rechtliche, pädagogische und Barrierefreiheitsprüfung. Geplant sind nur zusammengefasste Klassenwerte, keine individuellen Profile für Lehrkräfte.'],
      ['Sind Junior, Youth und Adult identisch?','Nein. Junior (10–13), Youth (14–18) und Adult (18+) haben unterschiedliche, altersgerechte Fragen. Die Verfügbarkeit eines Tests ersetzt keine Freigabe für echte Schulklassen.'],
      ['Sind alle fünf Sprachen wissenschaftlich gleichwertig geprüft?','Der Kernfragebogen ist auf Englisch, Deutsch, Spanisch, Französisch und brasilianischem Portugiesisch verfügbar. Sprachliche Prüfung allein beweist keine psychometrische Gleichwertigkeit zwischen den Fassungen.'],
      ['Wozu dienen die Länderporträts?','Politische Begriffe und Institutionen haben lokale Geschichten. Die Porträts erklären den Kontext. Aktuelle Informationen werden nur nach Quellenprüfung gezeigt. Sie empfehlen keine Parteien.'],
      ['Ist Politangle politisch neutral?','Das Angebot soll zum Erkunden anregen, nicht zu einer politischen Richtung überzeugen. Persönliche Überzeugungen werden nicht mit richtig oder falsch bewertet. Wissensquizze erklären fachliche Begriffe; thematische Quizze kennzeichnen gegebenenfalls ihre Perspektive.'],
      ['Wo finde ich die ausführlichen Informationen?','Die Methode erklärt die Auswertung, Validierung ihre Grenzen, die Fragenbanken die Versionen und Datenschutz den Umgang mit Daten.'],
    ],
    detail:'Wenn du genauer hinschauen möchtest.',method:'Methode',limits:'Qualität und Grenzen',privacy:'Datenschutz',school:'Bedingungen des Schulpilots',start:'Mein Profil entdecken →'
  },
  es: {
    eyebrow:'PREGUNTAS SIN ETIQUETAS',title:'¿Te da curiosidad? Aquí están las respuestas.',
    intro:'Empieza por tus propias ideas. Aquí puedes consultar cómo funcionan las preguntas, los resultados, la privacidad y los límites del modelo.',
    items:[
      ['¿Qué puedo descubrir?','Politangle muestra tus respuestas en ocho dimensiones políticas. Puedes encontrar coincidencias con distintas tradiciones y también diferencias. No te dice qué pensar ni a quién votar.'],
      ['¿Por qué no basta con izquierda, centro o derecha?','Una sola línea no refleja todas las combinaciones de prioridades. Politangle separa distintos dilemas para que puedas examinar tu perfil sin quedarte con una sola etiqueta.'],
      ['¿Qué diferencia hay entre Quick y Full?','Quick empieza con 26 afirmaciones. Full añade 16. No existen opiniones políticas correctas o incorrectas en esta evaluación. Los ejercicios de conocimientos son distintos: incluyen respuestas explicadas.'],
      ['¿Es gratis y sin registro?','La primera sesión Quick es gratuita y puedes empezar sin cuenta. Para repetirla quizá tengas que registrarte. Si eliges una certificación de pago, verás sus condiciones y precio antes de comprar.'],
      ['¿Cómo se calcula el resultado?','Las respuestas se distribuyen mediante un modelo documentado en ocho dimensiones. También se muestran semejanzas y diferencias con tradiciones políticas. Puedes consultar el método y las limitaciones.'],
      ['¿El resultado me relaciona con un partido?','No. Una semejanza con una tradición no es una recomendación electoral, una predicción de voto ni una identidad permanente. Las guías nacionales aportan contexto sin cambiar la puntuación.'],
      ['¿Está validado científicamente?','Se comprueba la consistencia técnica del cálculo. Aún no están demostradas la validez psicométrica independiente, las normas representativas, la fiabilidad entre sesiones ni la equivalencia entre idiomas. Es una herramienta educativa de reflexión.'],
      ['¿Qué pasa con mis respuestas políticas?','La evaluación pública utiliza actualmente el estado de la sesión del navegador. Consulta Privacidad para conocer los detalles y las revisiones legales pendientes. Tú decides si compartes tu perfil individual.'],
      ['¿Pueden usarlo ya las escuelas?','No con alumnado real. El modo aula es un piloto controlado pendiente de revisión jurídica, educativa y de accesibilidad. El diseño muestra datos colectivos, no respuestas o perfiles individuales al profesorado.'],
      ['¿Son iguales Junior, Youth y Adult?','No. Junior (10–13), Youth (14–18) y Adult (18+) tienen preguntas adaptadas. La disponibilidad de una evaluación no autoriza su uso en clases reales.'],
      ['¿Están validados por igual los cinco idiomas?','Las evaluaciones principales están disponibles en inglés, alemán, español, francés y portugués de Brasil. La revisión lingüística no demuestra por sí sola equivalencia psicométrica.'],
      ['¿Para qué sirven las guías por país?','Ayudan a entender las instituciones y los términos políticos en su contexto. Los datos actuales solo aparecen cuando están comprobados con fuentes. No asignan partidos.'],
      ['¿Politangle es neutral?','La evaluación invita a explorar, no a convencer. No califica las creencias como buenas o malas. Los cuestionarios de conocimientos explican conceptos, y los temáticos indican cuando presentan un argumento concreto.'],
      ['¿Dónde puedo ver los detalles?','Consulta Método, Validación, Banco de preguntas y Privacidad para conocer los cálculos, limitaciones, versiones y tratamiento de datos.'],
    ],
    detail:'Para seguir explorando.',method:'Método',limits:'Validación y límites',privacy:'Privacidad',school:'Condiciones del piloto escolar',start:'Descubrir mi perfil →'
  },
  fr: {
    eyebrow:'DES QUESTIONS SANS ÉTIQUETTES',title:'Envie de comprendre ? Voici les réponses.',
    intro:'Commence par tes propres idées. Tu trouveras ici les détails sur les questions, les résultats, la confidentialité et les limites du modèle.',
    items:[
      ['Que vais-je découvrir ?','Politangle représente tes réponses sur huit dimensions politiques. Tu peux trouver des points communs avec plusieurs traditions et aussi des différences. Il ne te dit ni quoi penser ni pour qui voter.'],
      ['Pourquoi ne pas se limiter à gauche, centre ou droite ?','Une seule ligne ne montre pas toutes les combinaisons de priorités. Politangle distingue plusieurs arbitrages pour te permettre d’examiner ton profil sans te réduire à une étiquette.'],
      ['Quelle différence entre Quick et Full ?','Quick commence par 26 affirmations. Full en ajoute 16. Aucune conviction politique n’est notée juste ou fausse. Les exercices de connaissances sont distincts et proposent des réponses expliquées.'],
      ['Est-ce gratuit et sans compte ?','Le premier Quick est gratuit et accessible sans inscription. Un nouvel essai peut demander un compte. Une certification payante distincte affiche son prix et ses conditions avant l’achat.'],
      ['Comment le résultat est-il calculé ?','Les réponses sont réparties sur huit dimensions selon un modèle documenté. Des rapprochements avec des traditions et des différences sont aussi indiqués. La méthode et ses limites sont consultables.'],
      ['Une ressemblance signifie-t-elle que je soutiens un parti ?','Non. Elle n’est ni un conseil électoral, ni une prédiction de vote, ni une identité définitive. Les guides par pays donnent du contexte sans modifier tes scores.'],
      ['L’évaluation est-elle validée scientifiquement ?','La cohérence technique du calcul est testée. Une validation psychométrique indépendante, des normes représentatives, la fiabilité test–retest et l’équivalence entre langues ne sont pas encore établies. Le résultat est une invitation à réfléchir.'],
      ['Que deviennent mes réponses politiques ?','L’évaluation publique conserve actuellement les réponses dans l’état de la session du navigateur. Consulte Confidentialité pour les détails et les vérifications juridiques en cours. Tu choisis de partager ou non ton profil individuel.'],
      ['Les écoles peuvent-elles utiliser le mode classe ?','Pas encore avec de vrais élèves. Le pilote encadré attend des vérifications juridiques, pédagogiques et d’accessibilité. Le dispositif est conçu pour montrer des résultats agrégés, jamais les réponses individuelles aux enseignants.'],
      ['Junior, Youth et Adult sont-ils identiques ?','Non. Junior (10–13), Youth (14–18) et Adult (18+) utilisent des questions adaptées. La disponibilité d’un test ne vaut pas autorisation d’usage en classe réelle.'],
      ['Les cinq langues sont-elles validées de la même façon ?','Les évaluations principales existent en anglais, allemand, espagnol, français et portugais du Brésil. Une relecture linguistique ne prouve pas une équivalence psychométrique.'],
      ['À quoi servent les guides par pays ?','Ils expliquent le sens local des institutions et des termes politiques. Les informations actuelles ne sont publiées qu’après vérification des sources. Ils n’attribuent pas de parti.'],
      ['Politangle est-il neutre ?','L’évaluation sert à explorer, pas à convaincre. Elle ne juge pas les convictions politiques bonnes ou mauvaises. Les quiz de connaissances expliquent les notions, tandis que les quiz thématiques précisent s’ils présentent une perspective particulière.'],
      ['Où trouver les détails ?','Consulte la Méthode, la Validation, les versions des questions et la Confidentialité pour connaître les calculs, limites et règles de traitement des données.'],
    ],
    detail:'Pour aller plus loin.',method:'Méthode',limits:'Validation et limites',privacy:'Confidentialité',school:'Conditions du pilote scolaire',start:'Découvrir mon profil →'
  },
  'pt-br': {
    eyebrow:'PERGUNTAS SEM RÓTULOS',title:'Ficou curioso? Aqui estão as respostas.',
    intro:'Comece pelas suas ideias. Aqui você encontra os detalhes sobre perguntas, resultados, privacidade e limites do modelo.',
    items:[
      ['O que vou descobrir?','O Politangle representa suas respostas em oito dimensões políticas. Você pode encontrar semelhanças com mais de uma tradição e também diferenças. Ele não diz em que acreditar nem em quem votar.'],
      ['Por que não basta esquerda, centro ou direita?','Uma só linha não mostra todas as combinações de prioridades. O Politangle separa diferentes escolhas e tensões para você analisar seu perfil sem ficar preso a um rótulo.'],
      ['Qual é a diferença entre Quick e Full?','Quick começa com 26 afirmações. Full acrescenta 16. Opiniões políticas não são avaliadas como certas ou erradas. Os exercícios de conhecimento são diferentes: eles trazem respostas com explicações.'],
      ['É grátis e sem cadastro?','O primeiro Quick é gratuito e não exige conta para começar. Para fazer novamente, talvez seja necessário se cadastrar. Certificações pagas separadas mostram o preço e as condições antes da compra.'],
      ['Como o resultado é calculado?','As respostas são distribuídas por oito dimensões segundo um modelo documentado. Também são mostradas semelhanças e diferenças em relação a tradições políticas. Consulte o método e suas limitações.'],
      ['Meu resultado indica um partido?','Não. Semelhança com uma tradição não é recomendação eleitoral, previsão de voto nem identidade fixa. Guias por país trazem contexto sem alterar a pontuação.'],
      ['Existe validação científica?','A consistência técnica do cálculo é testada. Ainda não foram comprovadas validação psicométrica independente, normas representativas, confiabilidade entre aplicações nem equivalência entre idiomas. Use os resultados como ponto de partida para refletir.'],
      ['O que acontece com minhas respostas políticas?','A avaliação pública utiliza atualmente o estado da sessão do navegador. Veja a página de Privacidade para detalhes e revisões jurídicas pendentes. Só você decide se compartilha seu perfil individual.'],
      ['As escolas já podem usar o modo turma?','Ainda não com estudantes reais. O piloto controlado depende de análises jurídicas, pedagógicas e de acessibilidade. O sistema foi projetado para mostrar apenas dados agregados, nunca perfis individuais aos professores.'],
      ['Junior, Youth e Adult são o mesmo teste?','Não. Junior (10–13), Youth (14–18) e Adult (18+) têm perguntas apropriadas para cada faixa etária. A disponibilidade de um teste não autoriza o uso em turmas reais.'],
      ['Os cinco idiomas foram igualmente validados?','As avaliações principais estão disponíveis em inglês, alemão, espanhol, francês e português do Brasil. Revisão linguística não comprova equivalência psicométrica.'],
      ['Para que servem os guias por país?','Eles explicam o contexto local das instituições e dos termos políticos. Informações atuais só aparecem após verificação das fontes. Não indicam partidos.'],
      ['O Politangle é neutro?','A avaliação estimula a descoberta, não a persuasão. Não classifica crenças políticas como boas ou ruins. Os exercícios de conhecimento explicam conceitos; os temáticos informam quando exploram um argumento específico.'],
      ['Onde vejo os detalhes?','Consulte Método, Validação, Bancos de perguntas e Privacidade para entender cálculos, limitações, versões e tratamento de dados.'],
    ],
    detail:'Quer entender mais?',method:'Método',limits:'Validação e limites',privacy:'Privacidade',school:'Condições do piloto escolar',start:'Descobrir meu perfil →'
  }
};

export default function FAQPage() {
  const { locale } = useLocale();
  const c = faq[locale];
  const href = (path:string) => localePath(locale,path);
  return <InfoShell eyebrow={c.eyebrow} title={c.title} intro={c.intro}>
    <div className="politangle-faq" style={{ display:'grid',gap:8 }}>
      {c.items.map(([question,answer])=><details key={question} style={{ borderBottom:'1px solid var(--p-line,#ddd)',padding:'18px 0' }}>
        <summary style={{ cursor:'pointer',fontWeight:700,fontSize:19 }}>{question}</summary>
        <p style={{ lineHeight:1.7,marginTop:12 }}>{answer}</p>
      </details>)}
    </div>
    <section className="info-section" style={{ marginTop:32 }}>
      <h2>{c.detail}</h2>
      <p><Link href={href('/method')}>{c.method}</Link> · <Link href={href('/validation')}>{c.limits}</Link> · <Link href={href('/privacy')}>{c.privacy}</Link> · <Link href={href('/school/pilot')}>{c.school}</Link></p>
      <p><Link className="engine-primary-link" href={href('/quiz')}>{c.start}</Link></p>
    </section>
  </InfoShell>;
}
