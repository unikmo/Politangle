'use client';
import Link from 'next/link';
import { LanguageSelector, useLocale } from '../LocaleProvider';

export default function SchoolPage() {
  const { locale } = useLocale();
  const t = (en: string, de: string) => locale === 'de' ? de : en;
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
            <p className="engine-kicker">Students · private</p>
            <h2>{t('Explore on your own device','Auf dem eigenen Gerät entdecken')}</h2>
            <p>{t('Take Quick 26, continue to Full 84, or practise political literacy. Your individual result is not sent to a teacher.','Quick 26 durchführen, mit Full 84 fortfahren oder politische Bildung üben. Das persönliche Ergebnis wird nicht an eine Lehrkraft gesendet.')}</p>
            <Link className="engine-primary-link" href="/school/private">{t('Private Student Mode','Privater Schülerbereich')}</Link>
          </article>
          <article className="engine-card school-entry-card">
            <p className="engine-kicker">Students · classroom</p>
            <h2>{t('Join an anonymous classroom','Anonym einem Klassenraum beitreten')}</h2>
            <p>{t('Enter the six-character session code from your teacher. No name, email, username or student ID is required.','Den sechsstelligen Sitzungscode der Lehrkraft eingeben. Name, E-Mail-Adresse, Benutzername oder Schüler-ID sind nicht erforderlich.')}</p>
            <Link className="engine-primary-link" href="/school/student">{t('Join classroom','Klassenraum beitreten')}</Link>
          </article>
          <article className="engine-card school-entry-card">
            <p className="engine-kicker">Teachers</p>
            <h2>{t('Run a live lesson','Live-Unterricht durchführen')}</h2>
            <p>School pack: <strong>$300 for 10 teacher licenses.</strong> A licensed teacher can generate temporary session codes and run Quick 26, Full 84, literacy, guided or custom activities.</p>
            <Link className="engine-primary-link" href="/school/teacher">{t('Teacher classroom','Lehrkraft-Bereich')}</Link>
          </article>
        </div>

        <article className="engine-card" style={{ marginTop: 18 }}>
          <p className="engine-kicker">What the teacher can see</p>
          <div className="school-principle-grid">
            <div><strong>YES</strong><span>Joined count, response totals, live class distributions, aggregate political shape, literacy patterns and lesson summary.</span></div>
            <div><strong>NEVER</strong><span>Student names, who chose an answer, an individual political profile, individual polygon or individual literacy score.</span></div>
          </div>
          <p className="engine-disclaimer"><strong>REQUIRES QUALIFIED LEGAL REVIEW</strong> before real deployment with minors or schools. The current implementation is a non-production pilot.</p>
        </article>
      </section>
    </main>
  );
}
