'use client';
import Link from 'next/link';
import { LanguageSelector, useLocale, type Locale } from '../../LocaleProvider';

function copyFor(locale: Locale) {
  if (locale === 'de') return {
    mode: 'Privater Schülerbereich', kicker: 'Ihr Gerät · Ihr Ergebnis', title: 'Politik privat entdecken.', body: 'Diese Aktivitäten senden Ihr persönliches politisches Profil nicht an eine Lehrkraft.',
    juniorKicker: '10–13 JAHRE', juniorTitle: 'Junior nutzt den betreuten Klassenraum.', juniorBody: 'Für 10–13-Jährige verwenden wir kürzere, altersgerechte Fragen und Erklärungen in einem von der Lehrkraft gestarteten anonymen Raum. So muss ein elfjähriges Kind nicht durch die ältere Jugendversion.', juniorButton: 'Junior-Klassenraum beitreten',
    youthKicker: '14–18 JAHRE · PRIVAT', youthIntro: 'Ab 14 stehen die privaten Youth-Aktivitäten zur Verfügung.', quickBody: '26 einzelne Aussagen zeigen Ihre mehrdimensionale politische Form.', quick: 'Quick 26 starten', fullBody: 'Nach Quick ergänzt Full 16 andere Fragen und zeigt das vollständige Ergebnis.', full: 'Quick → Full starten', literacy: 'Politisches Wissen', classifyBody: 'Politische Beschreibungen den passendsten Traditionen zuordnen.', understandBody: 'Politische Begriffe und häufige Missverständnisse auseinanderhalten.', classify: 'CLASSIFY starten', understand: 'UNDERSTAND starten',
  };
  if (locale === 'es') return {
    mode: 'Modo privado del alumnado', kicker: 'Tu dispositivo · tu resultado', title: 'Explora la política en privado.', body: 'Estas actividades no envían tu perfil político personal al docente.',
    juniorKicker: '10–13 AÑOS', juniorTitle: 'Junior utiliza el aula guiada.', juniorBody: 'Para 10–13 años usamos preguntas y explicaciones más cortas y adaptadas dentro de una sala anónima iniciada por el docente. Así un alumno de once años no pasa por la versión para mayores.', juniorButton: 'Entrar en aula Junior',
    youthKicker: '14–18 AÑOS · PRIVADO', youthIntro: 'A partir de 14 años están disponibles las actividades privadas Youth.', quickBody: '26 afirmaciones muestran tu forma política multidimensional.', quick: 'Empezar Quick 26', fullBody: 'Después de Quick, Full añade 16 preguntas diferentes y muestra el resultado completo.', full: 'Empezar Quick → Full', literacy: 'Conocimientos políticos', classifyBody: 'Relaciona descripciones políticas con las tradiciones que mejor encajan.', understandBody: 'Distingue conceptos políticos y errores comunes.', classify: 'Empezar CLASSIFY', understand: 'Empezar UNDERSTAND',
  };
  if (locale === 'fr') return {
    mode: 'Mode élève privé', kicker: 'Votre appareil · votre résultat', title: 'Explorez la politique en privé.', body: 'Ces activités n’envoient pas votre profil politique personnel à un enseignant.',
    juniorKicker: '10–13 ANS', juniorTitle: 'Junior passe par la classe guidée.', juniorBody: 'Pour les 10–13 ans, nous utilisons des questions et explications plus courtes, adaptées à l’âge, dans une salle anonyme lancée par l’enseignant. Un élève de onze ans n’est donc pas envoyé vers la version des plus grands.', juniorButton: 'Rejoindre une classe Junior',
    youthKicker: '14–18 ANS · PRIVÉ', youthIntro: 'À partir de 14 ans, les activités Youth privées sont disponibles.', quickBody: '26 affirmations montrent votre forme politique multidimensionnelle.', quick: 'Commencer Quick 26', fullBody: 'Après Quick, Full ajoute 16 questions différentes et affiche le résultat complet.', full: 'Commencer Quick → Full', literacy: 'Repères politiques', classifyBody: 'Associez des descriptions politiques aux traditions qui correspondent le mieux.', understandBody: 'Distinguez les concepts politiques et les confusions fréquentes.', classify: 'Commencer CLASSIFY', understand: 'Commencer UNDERSTAND',
  };
  return {
    mode: 'Private Student Mode', kicker: 'Your device · your result', title: 'Explore politics privately.', body: 'These activities do not send your individual political profile to a teacher.',
    juniorKicker: 'AGES 10–13', juniorTitle: 'Junior uses the guided classroom.', juniorBody: 'For ages 10–13 we use shorter, age-appropriate questions and explanations inside an anonymous room started by a teacher. An eleven-year-old is not sent through the older Youth form.', juniorButton: 'Join a Junior classroom',
    youthKicker: 'AGES 14–18 · PRIVATE', youthIntro: 'From age 14, the private Youth activities are available.', quickBody: '26 single statements show your broad multidimensional political shape.', quick: 'Start Quick 26', fullBody: 'After Quick, Full adds 16 different questions and shows your completed result.', full: 'Start Quick → Full', literacy: 'Political literacy', classifyBody: 'Match political descriptions to the traditions that fit them best.', understandBody: 'Distinguish political concepts and common misconceptions.', classify: 'Start CLASSIFY', understand: 'Start UNDERSTAND',
  };
}

export default function PrivateSchoolPage() {
  const { locale } = useLocale();
  const copy = copyFor(locale);
  return (
    <main className="engine-page school-page">
      <header className="engine-header"><Link href="/school" className="engine-brand">Politangle School</Link><span>{copy.mode}</span><LanguageSelector /></header>
      <section className="engine-shell school-shell">
        <article className="engine-card"><p className="engine-kicker">{copy.kicker}</p><h1>{copy.title}</h1><p>{copy.body}</p></article>
        <article className="engine-card school-junior-private-note" style={{ marginTop: 18 }}>
          <p className="engine-kicker">{copy.juniorKicker}</p><h2>{copy.juniorTitle}</h2><p>{copy.juniorBody}</p><Link className="engine-primary-link" href="/school/student">{copy.juniorButton}</Link>
        </article>
        <p className="engine-kicker school-youth-private-label">{copy.youthKicker}</p><p>{copy.youthIntro}</p>
        <div className="school-entry-grid school-private-youth-grid">
          <article className="engine-card school-entry-card"><p className="engine-kicker">BELIEVE</p><h2>Quick 26</h2><p>{copy.quickBody}</p><Link className="engine-primary-link" href="/quiz">{copy.quick}</Link></article>
          <article className="engine-card school-entry-card"><p className="engine-kicker">BELIEVE</p><h2>Full 42</h2><p>{copy.fullBody}</p><Link className="engine-primary-link" href="/quiz">{copy.full}</Link></article>
          <article className="engine-card school-entry-card"><p className="engine-kicker">{copy.literacy}</p><h2>CLASSIFY</h2><p>{copy.classifyBody}</p><Link className="engine-primary-link" href="/classify?mode=school">{copy.classify}</Link></article>
          <article className="engine-card school-entry-card"><p className="engine-kicker">{copy.literacy}</p><h2>UNDERSTAND</h2><p>{copy.understandBody}</p><Link className="engine-primary-link" href="/understand?mode=school">{copy.understand}</Link></article>
        </div>
      </section>
    </main>
  );
}
