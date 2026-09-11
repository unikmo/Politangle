'use client';
import Link from 'next/link';
import { LanguageSelector, useLocale } from '../LocaleProvider';
import { translate } from '../translations';

export default function SchoolPage() {
  const { locale } = useLocale();
  const t = (en: string, de: string) => translate(locale, en, de);
  return (
    <main className="engine-page school-page">
      <header className="engine-header">
        <Link href="/" className="engine-brand">Politangle School</Link>
        <span>{t('Young people · classroom + private','Junge Menschen · Unterricht + privat')}</span><LanguageSelector />
      </header>
      <section className="engine-shell school-shell">
        <article className="engine-card school-hero-card">
          <p className="engine-kicker">{t('Political literacy for young people','Politische Bildung für junge Menschen')}</p>
          <h1>{t('Understand politics. See the room. Keep the individual private.','Politik verstehen. Die Klasse sehen. Einzelne schützen.')}</h1>
          <p>{t('Politangle School is designed for secondary-school learning. Students can explore privately or join an anonymous teacher-led classroom where the teacher sees only the class totals and distributions.','Politangle School wurde für den Unterricht entwickelt. Schülerinnen und Schüler können privat lernen oder anonym an einem geleiteten Klassenraum teilnehmen. Lehrkräfte sehen ausschließlich Summen und Verteilungen der Klasse.')}</p>
          <p className="engine-callout"><strong>{t('Classroom privacy:','Privatsphäre im Unterricht:')}</strong> {t('the teacher sees the room, never which student gave which answer.','Die Lehrkraft sieht die Klasse, aber nie, wer welche Antwort gegeben hat.')}</p>
        </article>

        <div className="school-entry-grid">
          <article className="engine-card school-entry-card">
            <p className="engine-kicker">{t('Students · private','Schüler · privat')}</p>
            <h2>{t('Explore on your own device','Auf dem eigenen Gerät entdecken')}</h2>
            <p>{t('Take Quick 26, continue to Full 42, or practise political literacy. Your individual result is not sent to a teacher.','Quick 26 durchführen, mit Full 42 fortfahren oder politische Bildung üben. Das persönliche Ergebnis wird nicht an eine Lehrkraft gesendet.')}</p>
            <Link className="engine-primary-link" href="/school/private">{t('Private Student Mode','Privater Schülerbereich')}</Link>
          </article>
          <article className="engine-card school-entry-card">
            <p className="engine-kicker">{t('Students · classroom','Schüler · Klassenraum')}</p>
            <h2>{t('Join an anonymous classroom','Anonym einem Klassenraum beitreten')}</h2>
            <p>{t('Enter the six-character session code from your teacher. No name, email, username or student ID is required.','Den sechsstelligen Sitzungscode der Lehrkraft eingeben. Name, E-Mail-Adresse, Benutzername oder Schüler-ID sind nicht erforderlich.')}</p>
            <Link className="engine-primary-link" href="/school/student">{t('Join classroom','Klassenraum beitreten')}</Link>
          </article>
          <article className="engine-card school-entry-card school-sales-card">
            <p className="engine-kicker">{t('For teachers','Für Lehrkräfte')}</p>
            <h2>{t('Run a live lesson','Live-Unterricht durchführen')}</h2>
            <p>{t('School pack: $300 for 10 teacher licenses. Licensed teachers can create temporary classroom codes and run Quick, Full, knowledge quizzes, guided lessons or custom activities.','Schulpaket: 300 $ für 10 Lehrkraft-Lizenzen. Lizenzierte Lehrkräfte können temporäre Klassenraumcodes erstellen und Quick, Full, Wissensquizze, geführte Unterrichtseinheiten oder eigene Aktivitäten durchführen.')}</p>
            <Link className="engine-primary-link" href="/school/teacher">{t('Open teacher classroom','Lehrkraft-Bereich öffnen')}</Link>
          </article>
        </div>

        <article className="engine-card" style={{ marginTop: 18 }}>
          <p className="engine-kicker">{t('What the teacher can see','Was die Lehrkraft sehen kann')}</p>
          <div className="school-principle-grid">
            <div><strong>{t('YES','JA')}</strong><span>{t('Joined count, response totals, live class distributions, aggregate political shape, literacy patterns and lesson summary.','Teilnehmerzahl, Antwortsummen, Live-Verteilungen der Klasse, aggregierte politische Form, Wissensmuster und Unterrichtszusammenfassung.')}</span></div>
            <div><strong>{t('NEVER','NIE')}</strong><span>{t('Student names, who chose an answer, an individual political profile, individual polygon or individual literacy score.','Schülernamen, wer welche Antwort gewählt hat, individuelle politische Profile, individuelle Polygone oder individuelle Wissenswerte.')}</span></div>
          </div>
          <p className="engine-disclaimer"><strong>{t('LEGAL REVIEW REQUIRED','RECHTLICHE PRÜFUNG ERFORDERLICH')}</strong> {t('before deployment with minors or schools. The current implementation is a non-production pilot.','vor einem Einsatz mit Minderjährigen oder Schulen. Die aktuelle Umsetzung ist ein Pilot und nicht für den Produktivbetrieb bestimmt.')}</p>
        </article>
      </section>
    </main>
  );
}
