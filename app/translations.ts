import type { Locale } from './LocaleProvider';

const es: Record<string, string> = {
  'How it works':'Cómo funciona','Your result':'Tu resultado','For schools':'Para escuelas','Take Quick':'Empezar Quick',
  'POLITICS WITHOUT THE BOXES':'POLÍTICA SIN ETIQUETAS','See your politics from every angle.':'Mira tus ideas políticas desde todos los ángulos.',
  'Answer 26 clear questions. Get a multidimensional picture of what you think—without being forced into a party label.':'Responde 26 preguntas claras. Descubre tus ideas desde varios ángulos, sin quedar dentro de una etiqueta política.',
  'Start the 3-minute Quick':'Empieza el Quick de 3 minutos','See how it works':'Ver cómo funciona','Free':'Gratis','No account':'Sin cuenta','Answers stay in your session':'Tus respuestas quedan en tu sesión',
  'YOUR POLITICAL SHAPE':'TU FORMA POLÍTICA','Collective':'Colectivo','Individual':'Individual','Change':'Cambio','Continuity':'Continuidad','A shape, not a verdict.':'Una forma, no un veredicto.',
  'one-question screens':'una pregunta por pantalla','for a deeper profile':'para un perfil más profundo','Economy':'Economía','Society':'Sociedad','Power':'Poder','World':'Mundo',
  'Public provision ↔ Market freedom':'Servicios públicos ↔ Libertad de mercado','Social change ↔ Continuity':'Cambio social ↔ Continuidad','Personal freedom ↔ Authority':'Libertad personal ↔ Autoridad','Cooperation ↔ Sovereignty':'Cooperación ↔ Soberanía',
  'START LIGHT':'EMPIEZA FÁCIL','Quick questions':'preguntas Quick','SEE MORE':'VER MÁS','political axes':'ejes políticos','GO DEEPER':'PROFUNDIZA','Full statements':'afirmaciones Full','STAY PRIVATE':'PRIVACIDAD','accounts required':'cuentas necesarias',
  'A CLEARER START':'UN INICIO CLARO','One question. One decision. Then the next.':'Una pregunta. Una decisión. Después, la siguiente.',
  'Quick samples 26 distinct political constructs. Full adds balancing statements and greater depth when you want it.':'Quick presenta 26 preguntas distintas. Full añade afirmaciones de equilibrio y más profundidad cuando tú quieras.',
  'Respond':'Responde','One statement per screen on a clear −2 to +2 agreement scale.':'Una afirmación por pantalla, con una escala clara de −2 a +2.',
  'See your shape':'Mira tu forma','Explore several independent axes instead of a single left–right score.':'Explora varios ejes independientes en lugar de una sola línea izquierda-derecha.',
  'Choose the depth':'Elige la profundidad','Stop after Quick or continue to Full and political-literacy learning.':'Termina después de Quick o continúa con Full y el aprendizaje político.',
  'YOUR RESULT':'TU RESULTADO','Nuance survives the calculation.':'El resultado conserva los matices.','Discover your angle':'Descubre tu ángulo','POLITICAL SHAPE':'FORMA POLÍTICA','Example only':'Solo un ejemplo',
  'You can lean conservative and support universal healthcare. You can value national sovereignty and international cooperation. Politangle keeps those positions visible instead of averaging them into a label.':'Puedes inclinarte hacia el conservadurismo y apoyar la sanidad universal. Puedes valorar la soberanía nacional y la cooperación internacional. Politangle conserva esos matices sin reducirlos a una etiqueta.',
  'No party assignment. No single-axis verdict.':'Sin partido asignado. Sin un veredicto de un solo eje.','FOR SCHOOLS':'PARA ESCUELAS',
  'Teach political thinking without exposing individual beliefs.':'Enseña pensamiento político sin revelar las creencias individuales.',
  'Anonymous classroom participation, live aggregate distributions, guided lessons and classroom reports—while teachers cannot access a student-to-answer map.':'Participación anónima, resultados agregados en directo, clases guiadas e informes, sin que el docente pueda vincular alumnos y respuestas.',
  'Explore School mode':'Ver el modo Escuela','Private student mode':'Modo privado del alumno','Anonymous by design':'Anónimo desde el diseño','Temporary room codes; no student roster.':'Códigos temporales; sin lista de alumnos.',
  'Built for discussion':'Hecho para dialogar','Live distributions reveal consensus and division.':'Los resultados en directo muestran acuerdos y diferencias.','Teacher-ready paths':'Rutas listas para docentes','Quick, Full, literacy, guided and custom activities.':'Actividades Quick, Full, de aprendizaje, guiadas y personalizadas.',
  'START WITH CURIOSITY':'EMPIEZA CON CURIOSIDAD','26 questions. More than one angle.':'26 preguntas. Más de un ángulo.','Take Politangle Quick':'Empezar Politangle Quick','Method':'Método','Schools':'Escuelas','Privacy':'Privacidad','Imprint':'Aviso legal',
};

const fr: Record<string, string> = {
  'How it works':'Comment ça marche','Your result':'Votre résultat','For schools':'Pour les écoles','Take Quick':'Commencer Quick',
  'POLITICS WITHOUT THE BOXES':'LA POLITIQUE SANS ÉTIQUETTES','See your politics from every angle.':'Voyez vos idées politiques sous tous les angles.',
  'Answer 26 clear questions. Get a multidimensional picture of what you think—without being forced into a party label.':'Répondez à 26 questions claires. Découvrez vos idées sous plusieurs angles, sans étiquette de parti.',
  'Start the 3-minute Quick':'Commencer le Quick de 3 minutes','See how it works':'Voir comment ça marche','Free':'Gratuit','No account':'Sans compte','Answers stay in your session':'Vos réponses restent dans votre session',
  'YOUR POLITICAL SHAPE':'VOTRE FORME POLITIQUE','Collective':'Collectif','Individual':'Individuel','Change':'Changement','Continuity':'Continuité','A shape, not a verdict.':'Une forme, pas un verdict.',
  'one-question screens':'une question par écran','for a deeper profile':'pour un profil plus détaillé','Economy':'Économie','Society':'Société','Power':'Pouvoir','World':'Monde',
  'Public provision ↔ Market freedom':'Services publics ↔ Liberté du marché','Social change ↔ Continuity':'Changement social ↔ Continuité','Personal freedom ↔ Authority':'Liberté personnelle ↔ Autorité','Cooperation ↔ Sovereignty':'Coopération ↔ Souveraineté',
  'START LIGHT':'COMMENCEZ SIMPLEMENT','Quick questions':'questions Quick','SEE MORE':'VOIR PLUS','political axes':'axes politiques','GO DEEPER':'ALLER PLUS LOIN','Full statements':'affirmations Full','STAY PRIVATE':'VIE PRIVÉE','accounts required':'comptes nécessaires',
  'A CLEARER START':'UN DÉPART CLAIR','One question. One decision. Then the next.':'Une question. Une décision. Puis la suivante.',
  'Quick samples 26 distinct political constructs. Full adds balancing statements and greater depth when you want it.':'Quick présente 26 questions distinctes. Full ajoute des affirmations équilibrées et plus de profondeur si vous le souhaitez.',
  'Respond':'Répondez','One statement per screen on a clear −2 to +2 agreement scale.':'Une affirmation par écran, sur une échelle claire de −2 à +2.',
  'See your shape':'Voyez votre forme','Explore several independent axes instead of a single left–right score.':'Explorez plusieurs axes indépendants plutôt qu’une seule ligne gauche-droite.',
  'Choose the depth':'Choisissez la profondeur','Stop after Quick or continue to Full and political-literacy learning.':'Arrêtez-vous après Quick ou continuez avec Full et l’apprentissage politique.',
  'YOUR RESULT':'VOTRE RÉSULTAT','Nuance survives the calculation.':'Le résultat conserve les nuances.','Discover your angle':'Découvrez votre angle','POLITICAL SHAPE':'FORME POLITIQUE','Example only':'Exemple seulement',
  'You can lean conservative and support universal healthcare. You can value national sovereignty and international cooperation. Politangle keeps those positions visible instead of averaging them into a label.':'Vous pouvez pencher vers le conservatisme et soutenir la santé universelle. Vous pouvez valoriser la souveraineté nationale et la coopération internationale. Politangle garde ces nuances au lieu de les réduire à une étiquette.',
  'No party assignment. No single-axis verdict.':'Aucun parti attribué. Aucun verdict sur un seul axe.','FOR SCHOOLS':'POUR LES ÉCOLES',
  'Teach political thinking without exposing individual beliefs.':'Enseignez la réflexion politique sans révéler les opinions individuelles.',
  'Anonymous classroom participation, live aggregate distributions, guided lessons and classroom reports—while teachers cannot access a student-to-answer map.':'Participation anonyme, résultats globaux en direct, cours guidés et rapports, sans lien entre élèves et réponses.',
  'Explore School mode':'Voir le mode École','Private student mode':'Mode privé élève','Anonymous by design':'Anonyme par conception','Temporary room codes; no student roster.':'Codes temporaires, sans liste d’élèves.',
  'Built for discussion':'Conçu pour le dialogue','Live distributions reveal consensus and division.':'Les résultats en direct montrent accords et différences.','Teacher-ready paths':'Parcours prêts à enseigner','Quick, Full, literacy, guided and custom activities.':'Activités Quick, Full, pédagogiques, guidées et personnalisées.',
  'START WITH CURIOSITY':'COMMENCEZ PAR LA CURIOSITÉ','26 questions. More than one angle.':'26 questions. Plus d’un angle.','Take Politangle Quick':'Commencer Politangle Quick','Method':'Méthode','Schools':'Écoles','Privacy':'Confidentialité','Imprint':'Mentions légales',
};

export function translate(locale: Locale, english: string, german: string) {
  if (locale === 'de') return german;
  if (locale === 'es') return es[english] ?? english;
  if (locale === 'fr') return fr[english] ?? english;
  return english;
}
