import type { SchoolLesson } from './school-lessons';
import type { SchoolQuestionLocale } from './school-question-i18n';

type LessonText = Pick<SchoolLesson, 'title' | 'goals' | 'timeline' | 'discussionPrompts' | 'followUp'>;

const junior: Record<Exclude<SchoolQuestionLocale, 'en'>, Record<string, LessonText>> = {
  de: {
    'junior-social-media': {
      title: 'Wer versucht, mich zu beeinflussen?',
      goals: ['Emotionale politische Botschaften erkennen, ohne automatisch anzunehmen, dass sie falsch sind.', 'Belege von Schuldzuweisungen und vereinfachten Wir-gegen-sie-Erzählungen unterscheiden.', 'Kurz innehalten, bevor Inhalte geteilt werden, die Wut oder Angst auslösen sollen.'],
      timeline: [
        { minutes: '0–8', teacher: 'Zeigen Sie zwei erfundene Social-Media-Beiträge: einen mit Belegen und einen, der vor allem Wut auslösen soll.', students: 'Markiert Wörter, die eine schnelle emotionale Reaktion auslösen sollen.' },
        { minutes: '8–22', teacher: 'Starten Sie die Junior-Fragen zu politischem Einfluss und Demokratie anonym.', students: 'Antwortet, ohne dass eure einzelne Antwort sichtbar wird.' },
        { minutes: '22–35', teacher: 'Erklären Sie Behauptung, Beleg, Emotion und Schuldzuweisung als vier verschiedene Merkmale.', students: 'Sortiert erfundene Aussagen und erklärt, welche Belege man dafür bräuchte.' },
        { minutes: '35–45', teacher: 'Üben Sie die Routine: Pause – prüfen – vergleichen.', students: 'Formuliert einen manipulativen Beitrag als faire, überprüfbare Behauptung um.' },
      ],
      discussionPrompts: ['Kann eine Botschaft emotional und trotzdem wahr sein?', 'Warum ist es verlockend, bei komplizierten Problemen eine einzige Gruppe verantwortlich zu machen?', 'Woran könnte man eine vertrauenswürdige Quelle erkennen?'],
      followUp: 'Macht, Fairness und Meinungsverschiedenheiten',
    },
    'junior-power-and-fairness': {
      title: 'Macht, Fairness und Meinungsverschiedenheiten',
      goals: ['Verstehen, dass Wahlen und Grenzen für politische Macht zusammengehören.', 'Erkennen, dass vernünftige Menschen Freiheit, Sicherheit und Fairness unterschiedlich gewichten können.', 'Unterschiedliche Seiten beschreiben, ohne Beschimpfungen oder politische Etiketten zu benutzen.'],
      timeline: [
        { minutes: '0–8', teacher: 'Erklären Sie die Anonymität und dass es bei Meinungsfragen keine politisch richtige Antwort gibt.', students: 'Tretet dem Raum bei und probiert die Antwortskala aus.' },
        { minutes: '8–28', teacher: 'Starten Sie sechs Junior-Fragen und halten Sie bei geteilten Verteilungen an.', students: 'Nennt den stärksten fairen Grund für beide Seiten.' },
        { minutes: '28–38', teacher: 'Erklären Sie, warum auch gewählte Macht Regeln und unabhängige Kontrollen braucht.', students: 'Entwerft eine faire Regel, die die Macht eines erfundenen Schülerrats begrenzt.' },
        { minutes: '38–45', teacher: 'Besprechen Sie die Klassenverteilung, ohne der Klasse eine politische Identität zu geben.', students: 'Schreibt eine Position auf, die ihr jetzt besser versteht, auch wenn ihr ihr nicht zustimmt.' },
      ],
      discussionPrompts: ['Wann kann Sicherheit eine Einschränkung von Freiheit rechtfertigen?', 'Warum könnte auch eine Mehrheit Regeln brauchen?', 'Bedeutet Fairness immer, allen genau das Gleiche zu geben?'],
      followUp: 'Wer versucht, mich zu beeinflussen?',
    },
  },
  es: {
    'junior-social-media': {
      title: '¿Quién intenta influir en mí?',
      goals: ['Reconocer mensajes políticos emocionales sin suponer automáticamente que son falsos.', 'Separar pruebas de culpabilización y relatos simplistas de nosotros contra ellos.', 'Parar antes de compartir contenido diseñado para provocar enfado o miedo.'],
      timeline: [
        { minutes: '0–8', teacher: 'Muestra dos publicaciones sociales ficticias: una aporta pruebas y otra busca sobre todo provocar enfado.', students: 'Señalad las palabras pensadas para provocar una reacción inmediata.' },
        { minutes: '8–22', teacher: 'Lanza de forma anónima las preguntas Junior sobre influencia política y democracia.', students: 'Responded sin que vuestras respuestas individuales sean visibles.' },
        { minutes: '22–35', teacher: 'Enseña afirmación, evidencia, emoción y culpabilización como cuatro rasgos distintos.', students: 'Clasificad afirmaciones ficticias y explicad qué pruebas harían falta.' },
        { minutes: '35–45', teacher: 'Practica la rutina parar–comprobar–comparar.', students: 'Reescribid una publicación manipuladora como una afirmación justa y comprobable.' },
      ],
      discussionPrompts: ['¿Puede un mensaje ser emocional y aun así ser verdadero?', '¿Por qué resulta atractivo culpar a un solo grupo cuando un problema es complicado?', '¿Qué haría que una fuente fuera fiable?'],
      followUp: 'Poder, justicia y desacuerdo',
    },
    'junior-power-and-fairness': {
      title: 'Poder, justicia y desacuerdo',
      goals: ['Entender que las elecciones y los límites al poder funcionan juntos.', 'Ver que personas razonables pueden valorar de forma distinta la libertad, la seguridad y la justicia.', 'Practicar cómo describir ambos lados sin insultos ni etiquetas.'],
      timeline: [
        { minutes: '0–8', teacher: 'Explica el anonimato y que en las preguntas de opinión no existe una respuesta política correcta.', students: 'Entrad en la sala y practicad con la escala de respuesta.' },
        { minutes: '8–28', teacher: 'Lanza seis preguntas Junior y detente cuando la clase esté dividida.', students: 'Dad la razón más fuerte y justa que pueda tener cada lado.' },
        { minutes: '28–38', teacher: 'Explica por qué incluso el poder elegido necesita reglas y controles independientes.', students: 'Diseñad una regla justa que limite a un consejo estudiantil ficticio.' },
        { minutes: '38–45', teacher: 'Revisa la distribución sin poner una etiqueta política a la clase.', students: 'Escribid una postura que ahora entendáis mejor aunque no estéis de acuerdo.' },
      ],
      discussionPrompts: ['¿Cuándo puede la seguridad justificar limitar la libertad?', '¿Por qué una mayoría también puede necesitar reglas?', '¿Ser justo significa siempre dar exactamente lo mismo a todos?'],
      followUp: '¿Quién intenta influir en mí?',
    },
  },
  fr: {
    'junior-social-media': {
      title: 'Qui essaie de m’influencer ?',
      goals: ['Reconnaître les messages politiques émotionnels sans supposer automatiquement qu’ils sont faux.', 'Distinguer les preuves de l’accusation et des récits simplistes opposant « nous » à « eux ».','Faire une pause avant de partager un contenu conçu pour provoquer colère ou peur.'],
      timeline: [
        { minutes: '0–8', teacher: 'Montrez deux publications fictives : l’une donne des preuves et l’autre cherche surtout à provoquer la colère.', students: 'Repérez les mots conçus pour provoquer une réaction immédiate.' },
        { minutes: '8–22', teacher: 'Lancez anonymement les questions Junior sur l’influence politique et la démocratie.', students: 'Répondez sans que vos réponses individuelles soient visibles.' },
        { minutes: '22–35', teacher: 'Présentez affirmation, preuve, émotion et accusation comme quatre éléments différents.', students: 'Classez des affirmations fictives et expliquez quelles preuves seraient nécessaires.' },
        { minutes: '35–45', teacher: 'Utilisez la routine : pause – vérifier – comparer.', students: 'Réécrivez une publication manipulatrice sous forme d’affirmation équitable et vérifiable.' },
      ],
      discussionPrompts: ['Un message peut-il être émotionnel tout en étant vrai ?', 'Pourquoi est-il tentant d’accuser un seul groupe quand un problème est compliqué ?', 'Qu’est-ce qui rendrait une source digne de confiance ?'],
      followUp: 'Pouvoir, équité et désaccord',
    },
    'junior-power-and-fairness': {
      title: 'Pouvoir, équité et désaccord',
      goals: ['Comprendre que les élections et les limites du pouvoir fonctionnent ensemble.', 'Voir que des personnes raisonnables peuvent donner des priorités différentes à la liberté, à la sécurité et à l’équité.', 'S’entraîner à décrire les deux côtés sans insultes ni étiquettes.'],
      timeline: [
        { minutes: '0–8', teacher: 'Expliquez l’anonymat et qu’il n’existe pas de bonne réponse politique aux questions d’opinion.', students: 'Rejoignez la salle et essayez l’échelle de réponse.' },
        { minutes: '8–28', teacher: 'Lancez six questions Junior et arrêtez-vous lorsque les réponses sont partagées.', students: 'Donnez la meilleure raison équitable en faveur de chaque côté.' },
        { minutes: '28–38', teacher: 'Expliquez pourquoi même un pouvoir élu a besoin de règles et de contrôles indépendants.', students: 'Imaginez une règle équitable qui limite le pouvoir d’un conseil d’élèves fictif.' },
        { minutes: '38–45', teacher: 'Examinez la distribution sans donner d’identité politique à la classe.', students: 'Écrivez une opinion que vous comprenez mieux, même si vous n’êtes pas d’accord.' },
      ],
      discussionPrompts: ['Quand la sécurité peut-elle justifier une limite à la liberté ?', 'Pourquoi une majorité peut-elle elle aussi avoir besoin de règles ?', 'Être équitable signifie-t-il toujours donner exactement la même chose à tout le monde ?'],
      followUp: 'Qui essaie de m’influencer ?',
    },
  },
};

export function localizedJuniorLesson(locale: SchoolQuestionLocale, lesson: SchoolLesson): SchoolLesson {
  if (locale === 'en' || lesson.ageBand !== '10–13') return lesson;
  const text = junior[locale][lesson.id];
  return text ? { ...lesson, ...text } : lesson;
}
