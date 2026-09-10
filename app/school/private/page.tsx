'use client';
import Link from 'next/link';
import { LanguageSelector, useLocale } from '../../LocaleProvider';
import { translate } from '../../translations';

export default function PrivateSchoolPage() {
  const { locale } = useLocale();
  const t = (en: string, de: string) => translate(locale, en, de);
  return (
    <main className="engine-page school-page">
      <header className="engine-header"><Link href="/school" className="engine-brand">Politangle School</Link><span>{t('Private Student Mode','Privater Schülerbereich')}</span><LanguageSelector /></header>
      <section className="engine-shell school-shell">
        <article className="engine-card"><p className="engine-kicker">{t('Your device · your result','Ihr Gerät · Ihr Ergebnis')}</p><h1>{t('Explore politics privately.','Politik privat entdecken.')}</h1><p>{t('No classroom code is needed. These activities do not send your individual political profile to a teacher.','Es ist kein Klassenraumcode nötig. Ihr persönliches politisches Profil wird nicht an eine Lehrkraft gesendet.')}</p></article>
        <div className="school-entry-grid">
          <article className="engine-card school-entry-card"><p className="engine-kicker">BELIEVE</p><h2>Quick 26</h2><p>{t('Start with 26 single statements and see your broad multidimensional political shape.','Beginnen Sie mit 26 einzelnen Aussagen und sehen Sie Ihre mehrdimensionale politische Form.')}</p><Link className="engine-primary-link" href="/quiz">{t('Start Quick 26','Quick 26 starten')}</Link></article>
          <article className="engine-card school-entry-card"><p className="engine-kicker">BELIEVE</p><h2>Full 42</h2><p>{t('After Quick, Full adds 16 different questions and then shows your completed result.','Nach Quick ergänzt Full 16 andere Fragen und zeigt danach direkt Ihr vollständiges Ergebnis.')}</p><Link className="engine-primary-link" href="/quiz">{t('Start Quick → Full','Quick → Full starten')}</Link></article>
          <article className="engine-card school-entry-card"><p className="engine-kicker">Political literacy</p><h2>CLASSIFY</h2><p>{t('Match political descriptions to the traditions that fit them best.','Ordnen Sie politische Beschreibungen den passendsten Traditionen zu.')}</p><Link className="engine-primary-link" href="/classify">Start CLASSIFY</Link></article>
          <article className="engine-card school-entry-card"><p className="engine-kicker">Political literacy</p><h2>UNDERSTAND</h2><p>{t('Distinguish political concepts and common misconceptions.','Unterscheiden Sie politische Begriffe und häufige Missverständnisse.')}</p><Link className="engine-primary-link" href="/understand">Start UNDERSTAND</Link></article>
        </div>
      </section>
    </main>
  );
}
