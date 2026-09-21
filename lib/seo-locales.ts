export const seoLocales = ['en', 'de', 'es', 'fr', 'pt-br'] as const;
export type SeoLocale = typeof seoLocales[number];

type SeoEntry = { title: string; description: string };
type SeoTable = Record<string, SeoEntry>;

const en: SeoTable = {
  '': { title: 'Politangle', description: 'Explore your political views across eight dimensions with a 26-question assessment that avoids reducing you to one label.' },
  about: { title: 'About Politangle', description: 'Why Politangle separates political beliefs, knowledge and country context instead of forcing politics onto one line.' },
  account: { title: 'Account', description: 'Access your Politangle account and certification history.' },
  classify: { title: 'CLASSIFY', description: 'Test how well you can recognise political traditions from their ideas and policy descriptions.' },
  contact: { title: 'Contact', description: 'Contact Politangle about the project, education use and partnerships.' },
  deep: { title: 'Politangle Full', description: 'Go beyond the 26-question Quick assessment with 16 additional questions for a fuller political profile.' },
  imprint: { title: 'Legal information', description: 'Legal and provider information for Politangle.' },
  learn: { title: 'Learn political language', description: 'Learn political traditions, concepts and commonly confused terms in clear language.' },
  method: { title: 'Method', description: 'See how Politangle turns answers into eight visible political dimensions and how to interpret the result.' },
  'populism-quiz': { title: 'Spot populism', description: 'A focused quiz on populist framing, democratic warning signs and common misconceptions.' },
  practice: { title: 'Political literacy practice', description: 'Practise CLASSIFY and UNDERSTAND with explanations after every answer.' },
  privacy: { title: 'Privacy', description: 'How Politangle handles assessment, account and classroom data.' },
  'question-banks': { title: 'Question-bank versions', description: 'See how Politangle separates adult, youth and junior question forms and tracks revisions.' },
  quiz: { title: 'Politangle Quick', description: 'Answer 26 balanced political statements and see your views across eight dimensions.' },
  quizzes: { title: 'Political quizzes', description: 'Choose Politangle Quick, political-literacy practice or the focused populism quiz.' },
  results: { title: 'Your Politangle result', description: 'View your Politangle assessment result.' },
  school: { title: 'Politangle for schools', description: 'Explore political literacy in the classroom while keeping individual student beliefs private.' },
  'school/pilot': { title: 'School pilot', description: 'Learn about Politangle School and the requirements for controlled educational use.' },
  terms: { title: 'Terms', description: 'Terms for using Politangle.' },
  understand: { title: 'UNDERSTAND', description: 'Test political concepts, distinctions and common misconceptions.' },
  validation: { title: 'Evidence and limitations', description: 'What Politangle has tested, what remains unvalidated and how to interpret results responsibly.' },
};

const de: SeoTable = {
  '': { title: 'Politangle', description: 'Erkunde deine politischen Ansichten mit 26 Fragen auf acht Dimensionen – ohne auf ein einziges Etikett reduziert zu werden.' },
  about: { title: 'Über Politangle', description: 'Warum Politangle politische Überzeugungen, Wissen und Länderkontext trennt, statt Politik auf eine Linie zu reduzieren.' },
  account: { title: 'Konto', description: 'Greife auf dein Politangle-Konto und deine Zertifizierungen zu.' },
  classify: { title: 'CLASSIFY', description: 'Teste, wie gut du politische Traditionen anhand ihrer Ideen und Positionen erkennst.' },
  contact: { title: 'Kontakt', description: 'Kontaktiere Politangle zum Projekt, zu Bildungseinsätzen oder Partnerschaften.' },
  deep: { title: 'Politangle Full', description: 'Ergänze den Quick-Test um 16 weitere Fragen für ein ausführlicheres politisches Profil.' },
  imprint: { title: 'Impressum', description: 'Rechtliche Anbieterinformationen zu Politangle.' },
  learn: { title: 'Politische Begriffe verstehen', description: 'Politische Traditionen, Konzepte und häufig verwechselte Begriffe verständlich erklärt.' },
  method: { title: 'Methode', description: 'So werden Antworten bei Politangle zu acht sichtbaren politischen Dimensionen und so liest du das Ergebnis.' },
  'populism-quiz': { title: 'Populismus erkennen', description: 'Ein kompakter Quiz zu populistischer Sprache, demokratischen Warnzeichen und typischen Fehlzuschreibungen.' },
  practice: { title: 'Politisches Wissen üben', description: 'Übe CLASSIFY und UNDERSTAND mit Erklärungen nach jeder Antwort.' },
  privacy: { title: 'Datenschutz', description: 'Wie Politangle mit Assessment-, Konto- und Klassenzimmerdaten umgeht.' },
  'question-banks': { title: 'Fragenversionen', description: 'So trennt Politangle Erwachsenen-, Jugend- und Junior-Frageformen und dokumentiert Änderungen.' },
  quiz: { title: 'Politangle Quick', description: 'Beantworte 26 ausgewogene politische Aussagen und sieh deine Ansichten auf acht Dimensionen.' },
  quizzes: { title: 'Politische Quizze', description: 'Wähle Politangle Quick, politische Wissensübungen oder den Populismus-Quiz.' },
  results: { title: 'Dein Politangle-Ergebnis', description: 'Sieh dein Ergebnis aus dem Politangle-Assessment.' },
  school: { title: 'Politangle für Schulen', description: 'Politische Bildung im Unterricht, ohne individuelle politische Ansichten von Schüler:innen offenzulegen.' },
  'school/pilot': { title: 'Schulpilot', description: 'Informationen zu Politangle School und den Voraussetzungen für einen kontrollierten Bildungseinsatz.' },
  terms: { title: 'Nutzungsbedingungen', description: 'Bedingungen für die Nutzung von Politangle.' },
  understand: { title: 'UNDERSTAND', description: 'Teste politische Konzepte, Abgrenzungen und häufige Missverständnisse.' },
  validation: { title: 'Evidenz und Grenzen', description: 'Was bei Politangle getestet wurde, was noch nicht validiert ist und wie Ergebnisse verantwortungsvoll gelesen werden.' },
};

const es: SeoTable = {
  '': { title: 'Politangle', description: 'Explora tus ideas políticas con 26 preguntas y ocho dimensiones, sin reducirlas a una sola etiqueta.' },
  about: { title: 'Qué es Politangle', description: 'Por qué Politangle separa creencias, conocimientos y contexto nacional en vez de reducir la política a una sola línea.' },
  account: { title: 'Cuenta', description: 'Accede a tu cuenta de Politangle y a tu historial de certificaciones.' },
  classify: { title: 'CLASSIFY', description: 'Comprueba si reconoces tradiciones políticas a partir de sus ideas y posiciones.' },
  contact: { title: 'Contacto', description: 'Contacta con Politangle sobre el proyecto, educación o colaboraciones.' },
  deep: { title: 'Politangle Full', description: 'Añade 16 preguntas al Quick para obtener un perfil político más completo.' },
  imprint: { title: 'Información legal', description: 'Información legal y del responsable de Politangle.' },
  learn: { title: 'Entender el lenguaje político', description: 'Tradiciones políticas, conceptos y términos que suelen confundirse, explicados con claridad.' },
  method: { title: 'Método', description: 'Cómo convierte Politangle tus respuestas en ocho dimensiones visibles y cómo interpretar el resultado.' },
  'populism-quiz': { title: 'Reconocer el populismo', description: 'Un quiz breve sobre marcos populistas, señales democráticas de alerta y errores frecuentes.' },
  practice: { title: 'Práctica de cultura política', description: 'Practica CLASSIFY y UNDERSTAND con una explicación después de cada respuesta.' },
  privacy: { title: 'Privacidad', description: 'Cómo trata Politangle los datos del test, la cuenta y el aula.' },
  'question-banks': { title: 'Versiones de preguntas', description: 'Cómo separa Politangle las preguntas para adultos, jóvenes y Junior y cómo registra los cambios.' },
  quiz: { title: 'Politangle Quick', description: 'Responde 26 afirmaciones políticas equilibradas y mira tus ideas en ocho dimensiones.' },
  quizzes: { title: 'Quizzes políticos', description: 'Elige Politangle Quick, práctica de cultura política o el quiz específico sobre populismo.' },
  results: { title: 'Tu resultado de Politangle', description: 'Consulta el resultado de tu evaluación Politangle.' },
  school: { title: 'Politangle para centros educativos', description: 'Cultura política en el aula sin revelar las opiniones políticas individuales del alumnado.' },
  'school/pilot': { title: 'Piloto escolar', description: 'Información sobre Politangle School y los requisitos para un uso educativo controlado.' },
  terms: { title: 'Condiciones', description: 'Condiciones de uso de Politangle.' },
  understand: { title: 'UNDERSTAND', description: 'Comprueba conceptos políticos, diferencias y confusiones frecuentes.' },
  validation: { title: 'Evidencia y límites', description: 'Qué ha probado Politangle, qué sigue sin validar y cómo interpretar los resultados con prudencia.' },
};

const fr: SeoTable = {
  '': { title: 'Politangle', description: 'Explore tes idées politiques avec 26 questions et huit dimensions, sans les réduire à une seule étiquette.' },
  about: { title: 'À propos de Politangle', description: 'Pourquoi Politangle sépare convictions, connaissances et contexte national au lieu de réduire la politique à une seule ligne.' },
  account: { title: 'Compte', description: 'Accède à ton compte Politangle et à ton historique de certifications.' },
  classify: { title: 'CLASSIFY', description: 'Teste ta capacité à reconnaître des traditions politiques à partir de leurs idées et positions.' },
  contact: { title: 'Contact', description: 'Contacter Politangle au sujet du projet, de l’éducation ou de partenariats.' },
  deep: { title: 'Politangle Full', description: 'Ajoute 16 questions au Quick pour obtenir un profil politique plus complet.' },
  imprint: { title: 'Mentions légales', description: 'Informations juridiques et relatives au responsable de Politangle.' },
  learn: { title: 'Comprendre le langage politique', description: 'Traditions politiques, concepts et termes souvent confondus expliqués clairement.' },
  method: { title: 'Méthode', description: 'Comment Politangle transforme les réponses en huit dimensions visibles et comment lire le résultat.' },
  'populism-quiz': { title: 'Reconnaître le populisme', description: 'Un quiz ciblé sur les cadrages populistes, les signaux d’alerte démocratiques et les confusions fréquentes.' },
  practice: { title: 'S’entraîner à la culture politique', description: 'Pratique CLASSIFY et UNDERSTAND avec une explication après chaque réponse.' },
  privacy: { title: 'Vie privée', description: 'Comment Politangle traite les données du test, du compte et de la classe.' },
  'question-banks': { title: 'Versions des questions', description: 'Comment Politangle sépare les formes adultes, Youth et Junior et suit les révisions.' },
  quiz: { title: 'Politangle Quick', description: 'Réponds à 26 affirmations politiques équilibrées et vois tes idées sur huit dimensions.' },
  quizzes: { title: 'Quiz politiques', description: 'Choisis Politangle Quick, un entraînement de culture politique ou le quiz ciblé sur le populisme.' },
  results: { title: 'Ton résultat Politangle', description: 'Consulte le résultat de ton évaluation Politangle.' },
  school: { title: 'Politangle pour les écoles', description: 'Culture politique en classe sans exposer les opinions politiques individuelles des élèves.' },
  'school/pilot': { title: 'Pilote scolaire', description: 'Informations sur Politangle School et les conditions d’un usage éducatif encadré.' },
  terms: { title: 'Conditions', description: 'Conditions d’utilisation de Politangle.' },
  understand: { title: 'UNDERSTAND', description: 'Teste les concepts politiques, les distinctions et les confusions fréquentes.' },
  validation: { title: 'Éléments de preuve et limites', description: 'Ce que Politangle a testé, ce qui reste à valider et comment lire les résultats avec prudence.' },
};

const ptBr: SeoTable = {
  '': { title: 'Politangle', description: 'Explore suas ideias políticas com 26 perguntas e oito dimensões, sem reduzi-las a um único rótulo.' },
  about: { title: 'Sobre o Politangle', description: 'Por que o Politangle separa crenças, conhecimento e contexto nacional em vez de reduzir política a uma única linha.' },
  account: { title: 'Conta', description: 'Acesse sua conta do Politangle e seu histórico de certificações.' },
  classify: { title: 'CLASSIFY', description: 'Teste se você reconhece tradições políticas a partir de suas ideias e posições.' },
  contact: { title: 'Contato', description: 'Entre em contato com o Politangle sobre o projeto, educação ou parcerias.' },
  deep: { title: 'Politangle Full', description: 'Acrescente 16 perguntas ao Quick para obter um perfil político mais completo.' },
  imprint: { title: 'Informações legais', description: 'Informações jurídicas e do responsável pelo Politangle.' },
  learn: { title: 'Entender a linguagem política', description: 'Tradições políticas, conceitos e termos frequentemente confundidos explicados com clareza.' },
  method: { title: 'Método', description: 'Como o Politangle transforma respostas em oito dimensões visíveis e como interpretar o resultado.' },
  'populism-quiz': { title: 'Reconhecer populismo', description: 'Um quiz focado em enquadramentos populistas, sinais de alerta democráticos e confusões comuns.' },
  practice: { title: 'Prática de educação política', description: 'Pratique CLASSIFY e UNDERSTAND com uma explicação depois de cada resposta.' },
  privacy: { title: 'Privacidade', description: 'Como o Politangle trata dados da avaliação, da conta e da sala de aula.' },
  'question-banks': { title: 'Versões das perguntas', description: 'Como o Politangle separa formulários para adultos, Youth e Junior e acompanha revisões.' },
  quiz: { title: 'Politangle Quick', description: 'Responda a 26 afirmações políticas equilibradas e veja suas ideias em oito dimensões.' },
  quizzes: { title: 'Quizzes políticos', description: 'Escolha o Politangle Quick, práticas de educação política ou o quiz focado em populismo.' },
  results: { title: 'Seu resultado Politangle', description: 'Veja o resultado da sua avaliação Politangle.' },
  school: { title: 'Politangle para escolas', description: 'Educação política em sala de aula sem expor as opiniões políticas individuais dos estudantes.' },
  'school/pilot': { title: 'Piloto escolar', description: 'Informações sobre o Politangle School e os requisitos para uso educacional controlado.' },
  terms: { title: 'Termos', description: 'Termos de uso do Politangle.' },
  understand: { title: 'UNDERSTAND', description: 'Teste conceitos políticos, distinções e confusões frequentes.' },
  validation: { title: 'Evidências e limites', description: 'O que o Politangle testou, o que ainda precisa ser validado e como interpretar os resultados com cuidado.' },
};

export const seoCopy: Record<SeoLocale, SeoTable> = { en, de, es, fr, 'pt-br': ptBr };

export function hreflangForPath(path: string) {
  return {
    'en-US': `/en${path}`,
    de: `/de${path}`,
    es: `/es${path}`,
    fr: `/fr${path}`,
    'pt-BR': `/pt-br${path}`,
    'x-default': `/en${path}`,
  };
}
