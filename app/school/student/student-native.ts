import type { Locale } from '../../LocaleProvider';

export function studentUi(locale: Locale) {
  if (locale === 'de') return {
    header:'Schülerbereich', joinKicker:'Klasse beitreten', joinTitle:'Gib den Raumcode ein.', joinHelp:'Du brauchst weder Namen noch E-Mail-Adresse, Benutzerkonto oder Schüler-ID. Die Lehrkraft sieht, wie die Klasse antwortet – nicht, welche Antwort von dir kommt.',
    codeAria:'Klassencode', join:'Anonym beitreten', joining:'Anonymer Beitritt läuft…', badCode:'Gib den sechsstelligen Klassencode ein.', notFound:'Klasse nicht gefunden oder nicht verfügbar.', closed:'Diese Klasse ist geschlossen.', joinFailed:'Der Beitritt hat nicht funktioniert.', joined:'Du bist anonym beigetreten. Die Lehrkraft sieht nur Summen und Verteilungen der Klasse, nicht deine einzelne Antwort.',
    privacyDisclaimer:'Klassenantworten fließen nur in aggregierte Statistiken ein. Das System ist so gebaut, dass keine Zuordnung von Teilnehmer zu Antwort gespeichert wird. Ein echter Schuleinsatz mit Minderjährigen braucht weiterhin qualifizierte Rechts- und Datenschutzprüfung.',
    loading:'Klasse wird geladen…', joinedCount:(n:number)=>`${n} dabei`, classLabel:(code:string)=>`Klasse ${code}`,
    responseFailed:'Antwort konnte nicht gesendet werden.', received:'Antwort angekommen. Sie wurde zur Klassensumme hinzugefügt, ohne eine Zuordnung zwischen dir und deiner Antwort zu speichern.',
    sessionEnded:'Sitzung beendet', closedTitle:'Diese Klasse ist geschlossen.', closedText:'Deine persönlichen Politangle-Aktivitäten bleiben im privaten Schülerbereich verfügbar.',
    complete:'Aktivität abgeschlossen', completeTitle:(n:number)=>`Alle ${n} Antworten sind abgegeben.`, completeText:'Die Lehrkraft erhält die Verteilung der Klasse, keinen Einzelbericht über dich.',
    liveQuestion:(n:number)=>`Live-Frage ${n}`, questionOf:(n:number,total:number)=>`Frage ${n} von ${total}`,
    submit:'Anonym absenden', submitting:'Wird gesendet…', submitted:'Antwort angekommen.', waitingClass:'Warte auf Klasse / Lehrkraft.', waitingOpen:'Warte, bis die Lehrkraft diese Frage öffnet.',
    roomAnswers:'Antworten der Klasse', explanation:'Erklärung', previous:'Zurück', next:'Weiter', submittedCount:(n:number,total:number)=>`${n}/${total} abgegeben`,
    lobby:'Anonyme Lobby', inTitle:'Du bist drin.', inText:'Warte, bis die Lehrkraft die nächste Frage startet.',
    scale:['Stimme gar nicht zu','Teils teils / kommt darauf an','Stimme völlig zu','Unsicher'],
    literacyNotice:null as string | null,
  };
  if (locale === 'es') return {
    header:'Alumnado', joinKicker:'Entrar en clase', joinTitle:'Introduce el código de la sala.', joinHelp:'No necesitas nombre, correo, usuario ni número de estudiante. El profesor ve cómo responde el grupo, no qué respuesta es la tuya.',
    codeAria:'Código de clase', join:'Entrar de forma anónima', joining:'Entrando de forma anónima…', badCode:'Introduce el código de seis caracteres.', notFound:'No encontramos esa clase o no está disponible.', closed:'Esta clase está cerrada.', joinFailed:'No se pudo entrar en la clase.', joined:'Has entrado de forma anónima. El profesor ve totales y distribuciones del grupo, no cuál es tu respuesta.',
    privacyDisclaimer:'Tus respuestas se suman a estadísticas agregadas de la clase. El sistema está diseñado para no guardar una relación entre participante y respuesta. El uso real con menores sigue necesitando revisión jurídica y de privacidad cualificada.',
    loading:'Cargando la clase…', joinedCount:(n:number)=>`${n} en la sala`, classLabel:(code:string)=>`Clase ${code}`,
    responseFailed:'No se pudo enviar la respuesta.', received:'Respuesta recibida. Se ha añadido al total de la clase sin guardar una relación entre tú y esa respuesta.',
    sessionEnded:'Sesión terminada', closedTitle:'Esta clase está cerrada.', closedText:'Tus actividades personales de Politangle siguen disponibles en el modo privado.',
    complete:'Actividad terminada', completeTitle:(n:number)=>`Has enviado las ${n} respuestas.`, completeText:'El profesor recibe la distribución de la clase, no un informe individual sobre ti.',
    liveQuestion:(n:number)=>`Pregunta en directo ${n}`, questionOf:(n:number,total:number)=>`Pregunta ${n} de ${total}`,
    submit:'Enviar de forma anónima', submitting:'Enviando…', submitted:'Respuesta recibida.', waitingClass:'Esperando a la clase / al profesor.', waitingOpen:'Esperando a que el profesor abra esta pregunta.',
    roomAnswers:'Respuestas de la clase', explanation:'Explicación', previous:'Anterior', next:'Siguiente', submittedCount:(n:number,total:number)=>`${n}/${total} enviadas`,
    lobby:'Sala anónima', inTitle:'Ya estás dentro.', inText:'Espera a que el profesor lance la siguiente pregunta.',
    scale:['Totalmente en desacuerdo','Neutral / depende','Totalmente de acuerdo','No estoy seguro'],
    literacyNotice:'Esta actividad de alfabetización política todavía usa preguntas en inglés mientras se valida la versión española.',
  };
  if (locale === 'fr') return {
    header:'Élèves', joinKicker:'Rejoindre la classe', joinTitle:'Entre le code de la salle.', joinHelp:'Aucun nom, e-mail, identifiant ou numéro d’élève n’est demandé. L’enseignant voit comment répond le groupe, pas quelle réponse est la tienne.',
    codeAria:'Code de classe', join:'Rejoindre anonymement', joining:'Connexion anonyme…', badCode:'Entre le code de classe à six caractères.', notFound:'Cette classe est introuvable ou indisponible.', closed:'Cette classe est fermée.', joinFailed:'Impossible de rejoindre cette classe.', joined:'Tu as rejoint la classe anonymement. L’enseignant voit les totaux et répartitions du groupe, pas ta réponse individuelle.',
    privacyDisclaimer:'Tes réponses alimentent uniquement les statistiques agrégées de la classe. Le système est conçu pour ne pas conserver de lien entre participant et réponse. Un usage réel avec des mineurs exige encore une revue juridique et vie privée qualifiée.',
    loading:'Chargement de la classe…', joinedCount:(n:number)=>`${n} présents`, classLabel:(code:string)=>`Classe ${code}`,
    responseFailed:'Impossible d’envoyer la réponse.', received:'Réponse reçue. Elle a été ajoutée au total de la classe sans enregistrer de lien entre toi et cette réponse.',
    sessionEnded:'Séance terminée', closedTitle:'Cette classe est fermée.', closedText:'Tes activités Politangle personnelles restent disponibles dans le mode privé.',
    complete:'Activité terminée', completeTitle:(n:number)=>`Tes ${n} réponses sont envoyées.`, completeText:'L’enseignant reçoit la répartition de la classe, pas un rapport individuel sur toi.',
    liveQuestion:(n:number)=>`Question en direct ${n}`, questionOf:(n:number,total:number)=>`Question ${n} sur ${total}`,
    submit:'Envoyer anonymement', submitting:'Envoi…', submitted:'Réponse reçue.', waitingClass:'En attente de la classe / de l’enseignant.', waitingOpen:'Attends que l’enseignant ouvre cette question.',
    roomAnswers:'Réponses de la classe', explanation:'Explication', previous:'Précédent', next:'Suivant', submittedCount:(n:number,total:number)=>`${n}/${total} envoyées`,
    lobby:'Salle anonyme', inTitle:'Tu es dans la classe.', inText:'Attends que l’enseignant lance la prochaine question.',
    scale:['Pas du tout d’accord','Neutre / cela dépend','Tout à fait d’accord','Je ne sais pas'],
    literacyNotice:'Cette activité de culture politique utilise encore les questions en anglais pendant la validation de la version française.',
  };
  return {
    header:'Student', joinKicker:'Join classroom', joinTitle:'Enter the room code.', joinHelp:'No name, email, username or student ID is required. Your teacher sees how the room answers, not which answer came from you.',
    codeAria:'Classroom code', join:'Join anonymously', joining:'Joining anonymously…', badCode:'Enter the six-character classroom code.', notFound:'Classroom not found or unavailable.', closed:'This classroom is closed.', joinFailed:'Could not join this classroom.', joined:'You joined anonymously. Your teacher sees class totals and distributions, not which answer is yours.',
    privacyDisclaimer:'Classroom answers contribute to aggregate room statistics. The classroom backend is designed not to retain a participant-to-answer mapping. Real school/minor deployment requires qualified legal/privacy review.',
    loading:'Loading classroom…', joinedCount:(n:number)=>`${n} joined`, classLabel:(code:string)=>`Class ${code}`,
    responseFailed:'Response could not be submitted.', received:'Response received. Your answer was added to the class total without storing a student-to-answer record.',
    sessionEnded:'Session ended', closedTitle:'This classroom is closed.', closedText:'Your personal Politangle activities remain available in Private Student Mode.',
    complete:'Activity complete', completeTitle:(n:number)=>`All ${n} responses submitted.`, completeText:'Your teacher receives the class distribution, not an individual report about you.',
    liveQuestion:(n:number)=>`Live question ${n}`, questionOf:(n:number,total:number)=>`Question ${n} of ${total}`,
    submit:'Submit anonymously', submitting:'Submitting…', submitted:'Response received.', waitingClass:'Waiting for the class / teacher.', waitingOpen:'Waiting for your teacher to open this question.',
    roomAnswers:'How the room answered', explanation:'Explanation', previous:'Previous', next:'Next', submittedCount:(n:number,total:number)=>`${n}/${total} submitted`,
    lobby:'Anonymous lobby', inTitle:'You’re in.', inText:'Waiting for your teacher to launch the next question.',
    scale:['Strongly disagree','Neither / depends','Strongly agree','Not sure'],
    literacyNotice:null as string | null,
  };
}
