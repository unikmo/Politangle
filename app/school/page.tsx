'use client';

import Link from 'next/link';
import { LanguageSelector, useLocale, type Locale } from '../LocaleProvider';

function copyFor(locale: Locale) {
  if (locale === 'de') return {
    header: '10–18 Jahre · Unterricht + privat', kicker: 'Politische Medienkompetenz für junge Menschen',
    title: 'Politische Bildung beginnt lange vor dem Wahlalter.',
    body: 'Schülerinnen und Schüler begegnen politischen Behauptungen bereits in Feeds, Videos, Gruppenchats, Familie und KI-Inhalten. Politangle schafft einen überparteilichen Raum, in dem sie lernen, Belege von Behauptungen zu trennen, politische Begriffe wirklich zu verstehen und fair zu widersprechen.',
    privacyLabel: 'Privatsphäre im Unterricht:', privacyBody: 'Die Lehrkraft sieht die Klasse, aber nie, wer welche Antwort gegeben hat.',
    whyKicker: 'WARUM SCHÜLER DAS BRAUCHEN', whyTitle: 'Politik verstehen ist heute Teil von Medienkompetenz.',
    why: [
      ['Prüfen statt nur reagieren', 'Behauptung, Beleg, Emotion und Überzeugungsversuch auseinanderhalten.'],
      ['Begriffe verstehen', 'Sozialstaat, Sozialismus, Kommunismus, Populismus und Demokratie nicht als austauschbare Schlagwörter behandeln.'],
      ['Demokratische Macht verstehen', 'Wahlen, Rechte, Rechtsstaat und Kontrollen als zusammengehörige Teile verstehen.'],
      ['Fair widersprechen', 'Die beste Begründung der anderen Seite beschreiben können, ohne sie zu karikieren.'],
    ],
    privateKicker: 'Schüler · privat', privateTitle: 'Auf dem eigenen Gerät entdecken', privateBody: 'Ab 14 können Schülerinnen und Schüler Quick 26, Full 42 und politische Wissensquizze privat nutzen. Das persönliche Ergebnis geht nicht an die Lehrkraft.', privateButton: 'Privaten Schülerbereich öffnen',
    classroomKicker: 'Schüler · Klassenraum', classroomTitle: 'Anonym am Unterricht teilnehmen', classroomBody: '10–13-Jährige nutzen eine eigene Junior-Version mit kürzeren Fragen. Alle treten mit einem sechsstelligen Raumcode bei — ohne Name, E-Mail oder Schülerkonto.', classroomButton: 'Klassenraum beitreten',
    teacherKicker: 'Für Lehrkräfte', teacherTitle: 'Materialien ansehen. Dann Pilotzugang anfragen.', teacherBody: 'Lehrkräfte können die Unterrichtsangebote, Altersstufen und Ziele vorab ansehen. Vollständige Unterrichtsabläufe, Live-Räume und Klassenauswertungen werden erst nach einer Pilotfreigabe geöffnet.', teacherButton: 'Lehrkraft-Materialien & Pilot',
    seeKicker: 'Was die Lehrkraft sehen kann', yes: 'JA', never: 'NIE', yesBody: 'Teilnehmerzahl, Antwortsummen, Live-Verteilungen der Klasse, aggregierte politische Form, Wissensmuster und Unterrichtszusammenfassung.', neverBody: 'Schülernamen, wer welche Antwort gewählt hat, individuelle politische Profile oder individuelle Wissenswerte.',
    pilotNote: 'Pilotphase:', pilotBody: 'Die 10–13-Version ist technisch und sprachlich für jüngere Schülerinnen und Schüler getrennt. Vor einem breiten Einsatz wird sie zusätzlich mit echten 10–13-Jährigen in kognitiven Interviews und Unterrichtspiloten geprüft.',
  };
  if (locale === 'es') return {
    header: '10–18 años · aula + privado', kicker: 'Alfabetización política y mediática para jóvenes',
    title: 'La alfabetización política empieza mucho antes de la edad de votar.',
    body: 'El alumnado ya encuentra afirmaciones políticas en redes, vídeos, chats, conversaciones familiares y contenido generado por IA. Politangle ofrece un espacio no partidista para aprender a separar afirmaciones de pruebas, entender de verdad los conceptos políticos y discrepar de forma justa.',
    privacyLabel: 'Privacidad en el aula:', privacyBody: 'el docente ve a la clase, pero nunca quién dio cada respuesta.',
    whyKicker: 'POR QUÉ LO NECESITA EL ALUMNADO', whyTitle: 'Entender la política ya forma parte de la alfabetización mediática.',
    why: [
      ['Comprobar antes de reaccionar', 'Separar una afirmación, su evidencia, la emoción y el intento de persuadir.'],
      ['Entender las palabras', 'No tratar bienestar, socialismo, comunismo, populismo y democracia como etiquetas intercambiables.'],
      ['Entender el poder democrático', 'Ver elecciones, derechos, Estado de derecho y controles como partes conectadas.'],
      ['Discrepar con justicia', 'Poder explicar el mejor argumento del otro lado sin convertirlo en una caricatura.'],
    ],
    privateKicker: 'Alumnado · privado', privateTitle: 'Explorar en tu propio dispositivo', privateBody: 'A partir de 14 años, el alumnado puede usar Quick 26, Full 42 y los cuestionarios de conocimientos en privado. El resultado personal no se envía al docente.', privateButton: 'Abrir modo privado',
    classroomKicker: 'Alumnado · aula', classroomTitle: 'Entrar anónimamente en clase', classroomBody: 'Los 10–13 años usan una versión Junior propia con preguntas más cortas. Todo el alumnado entra con un código de seis caracteres, sin nombre, correo ni cuenta.', classroomButton: 'Entrar en clase',
    teacherKicker: 'Para docentes', teacherTitle: 'Mira los recursos. Después solicita el piloto.', teacherBody: 'Los docentes pueden ver antes las lecciones, edades y objetivos. Los planes completos, salas en directo y resultados de clase solo se abren tras la aprobación para el piloto.', teacherButton: 'Recursos docentes y piloto',
    seeKicker: 'Lo que puede ver el docente', yes: 'SÍ', never: 'NUNCA', yesBody: 'Número de participantes, totales, distribuciones en directo, forma política agregada, patrones de conocimientos y resumen de la lección.', neverBody: 'Nombres del alumnado, quién eligió una respuesta, perfiles políticos individuales o notas individuales de conocimientos.',
    pilotNote: 'Fase piloto:', pilotBody: 'La versión 10–13 está separada técnica y lingüísticamente para alumnado más joven. Antes de un despliegue amplio también se probará con jóvenes reales de 10–13 años mediante entrevistas cognitivas y pilotos en aula.',
  };
  if (locale === 'fr') return {
    header: '10–18 ans · classe + privé', kicker: 'Culture politique et médiatique pour les jeunes',
    title: 'La culture politique commence bien avant l’âge de voter.',
    body: 'Les élèves rencontrent déjà des affirmations politiques dans les réseaux, les vidéos, les discussions, la famille et les contenus générés par l’IA. Politangle offre un espace non partisan pour apprendre à séparer affirmations et preuves, comprendre réellement les notions politiques et être en désaccord de façon équitable.',
    privacyLabel: 'Confidentialité en classe :', privacyBody: 'l’enseignant voit la classe, mais jamais qui a donné quelle réponse.',
    whyKicker: 'POURQUOI LES ÉLÈVES EN ONT BESOIN', whyTitle: 'Comprendre la politique fait désormais partie de la culture médiatique.',
    why: [
      ['Vérifier avant de réagir', 'Distinguer une affirmation, sa preuve, l’émotion et la tentative de persuasion.'],
      ['Comprendre les mots', 'Ne pas traiter État-providence, socialisme, communisme, populisme et démocratie comme des étiquettes interchangeables.'],
      ['Comprendre le pouvoir démocratique', 'Relier élections, droits, État de droit et contrôles du pouvoir.'],
      ['Être en désaccord équitablement', 'Savoir présenter le meilleur argument de l’autre côté sans le caricaturer.'],
    ],
    privateKicker: 'Élèves · privé', privateTitle: 'Explorer sur son propre appareil', privateBody: 'À partir de 14 ans, les élèves peuvent utiliser Quick 26, Full 42 et les quiz de culture politique en privé. Le résultat personnel n’est pas envoyé à l’enseignant.', privateButton: 'Ouvrir le mode privé',
    classroomKicker: 'Élèves · classe', classroomTitle: 'Rejoindre anonymement la classe', classroomBody: 'Les 10–13 ans utilisent une version Junior distincte avec des questions plus courtes. Tous rejoignent avec un code à six caractères, sans nom, e-mail ni compte élève.', classroomButton: 'Rejoindre la classe',
    teacherKicker: 'Pour les enseignants', teacherTitle: 'Voir les ressources. Puis demander le pilote.', teacherBody: 'Les enseignants peuvent d’abord voir les séquences, tranches d’âge et objectifs. Les déroulés complets, salles en direct et résultats de classe ne sont ouverts qu’après validation du pilote.', teacherButton: 'Ressources enseignantes et pilote',
    seeKicker: 'Ce que l’enseignant peut voir', yes: 'OUI', never: 'JAMAIS', yesBody: 'Nombre de participants, totaux de réponses, distributions en direct, forme politique agrégée, tendances de connaissances et résumé de la séance.', neverBody: 'Noms des élèves, qui a choisi une réponse, profils politiques individuels ou scores individuels de connaissances.',
    pilotNote: 'Phase pilote :', pilotBody: 'La version 10–13 est techniquement et linguistiquement séparée pour les plus jeunes. Avant un déploiement large, elle sera aussi testée avec de vrais 10–13 ans au moyen d’entretiens cognitifs et de pilotes en classe.',
  };
  return {
    header: 'Ages 10–18 · classroom + private', kicker: 'Political and media literacy for young people',
    title: 'Political literacy starts long before voting age.',
    body: 'Students already meet political claims in feeds, videos, group chats, family conversations and AI-generated content. Politangle gives them a non-partisan place to learn how to separate claims from evidence, understand political ideas properly and disagree fairly.',
    privacyLabel: 'Classroom privacy:', privacyBody: 'the teacher sees the room, never which student gave which answer.',
    whyKicker: 'WHY STUDENTS NEED THIS', whyTitle: 'Understanding politics is now part of media literacy.',
    why: [
      ['Check before reacting', 'Separate a claim, its evidence, the emotion it creates and the attempt to persuade.'],
      ['Know what the words mean', 'Do not treat welfare, socialism, communism, populism and democracy as interchangeable labels.'],
      ['Understand democratic power', 'See elections, rights, rule of law and independent checks as connected parts of democracy.'],
      ['Disagree without caricature', 'Be able to explain the strongest reason for another view without turning it into a stereotype.'],
    ],
    privateKicker: 'Students · private', privateTitle: 'Explore on your own device', privateBody: 'From age 14, students can take Quick 26, Full 42 and political-literacy quizzes privately. Their personal result is not sent to a teacher.', privateButton: 'Open private student mode',
    classroomKicker: 'Students · classroom', classroomTitle: 'Join an anonymous classroom', classroomBody: 'Ages 10–13 use a separate Junior version with shorter questions. Everyone joins with a six-character room code — no name, email or student account required.', classroomButton: 'Join classroom',
    teacherKicker: 'For teachers', teacherTitle: 'See the resources. Then request the pilot.', teacherBody: 'Teachers can preview the lesson offer, age bands and learning goals first. Full lesson flows, live rooms and class results unlock only after pilot approval.', teacherButton: 'Teacher resources & pilot',
    seeKicker: 'What the teacher can see', yes: 'YES', never: 'NEVER', yesBody: 'Joined count, response totals, live class distributions, aggregate political shape, literacy patterns and lesson summary.', neverBody: 'Student names, who chose an answer, individual political profiles or individual literacy scores.',
    pilotNote: 'Pilot stage:', pilotBody: 'The 10–13 experience is technically and linguistically separated for younger students. Before broad deployment it will also be tested with real 10–13-year-olds through cognitive interviews and classroom pilots.',
  };
}

export default function SchoolPage() {
  const { locale } = useLocale();
  const copy = copyFor(locale);
  return (
    <main className="engine-page school-page">
      <header className="engine-header"><Link href="/" className="engine-brand">Politangle School</Link><span>{copy.header}</span><LanguageSelector /></header>
      <section className="engine-shell school-shell">
        <article className="engine-card school-hero-card">
          <p className="engine-kicker">{copy.kicker}</p><h1>{copy.title}</h1><p>{copy.body}</p>
          <p className="engine-callout"><strong>{copy.privacyLabel}</strong> {copy.privacyBody}</p>
        </article>

        <article className="engine-card teacher-value-card" style={{ marginTop: 18 }}>
          <p className="engine-kicker">{copy.whyKicker}</p><h2>{copy.whyTitle}</h2>
          <div className="teacher-value-grid">{copy.why.map(([title, body]) => <section key={title}><strong>{title}</strong><p>{body}</p></section>)}</div>
        </article>

        <div className="school-entry-grid">
          <article className="engine-card school-entry-card"><p className="engine-kicker">{copy.privateKicker}</p><h2>{copy.privateTitle}</h2><p>{copy.privateBody}</p><Link className="engine-primary-link" href="/school/private">{copy.privateButton}</Link></article>
          <article className="engine-card school-entry-card"><p className="engine-kicker">{copy.classroomKicker}</p><h2>{copy.classroomTitle}</h2><p>{copy.classroomBody}</p><Link className="engine-primary-link" href="/school/student">{copy.classroomButton}</Link></article>
          <article className="engine-card school-entry-card school-sales-card"><p className="engine-kicker">{copy.teacherKicker}</p><h2>{copy.teacherTitle}</h2><p>{copy.teacherBody}</p><Link className="engine-primary-link" href="/school/teacher">{copy.teacherButton}</Link></article>
        </div>

        <article className="engine-card" style={{ marginTop: 18 }}>
          <p className="engine-kicker">{copy.seeKicker}</p>
          <div className="school-principle-grid"><div><strong>{copy.yes}</strong><span>{copy.yesBody}</span></div><div><strong>{copy.never}</strong><span>{copy.neverBody}</span></div></div>
          <p className="engine-disclaimer"><strong>{copy.pilotNote}</strong> {copy.pilotBody}</p>
        </article>
      </section>
    </main>
  );
}
