'use client';
import Link from 'next/link';
import { LanguageSelector, useLocale } from '../../LocaleProvider';

export default function PrivateSchoolPage() {
  const { locale } = useLocale();
  const t = (en: string, de: string) => locale === 'de' ? de : en;
  return (
    <main className="engine-page school-page">
      <header className="engine-header"><Link href="/school" className="engine-brand">Politangle School</Link><span>{t('Private Student Mode','Privater Schülerbereich')}</span><LanguageSelector /></header>
      <section className="engine-shell school-shell">
        <article className="engine-card"><p className="engine-kicker">{t('Your device · your result','Ihr Gerät · Ihr Ergebnis')}</p><h1>{t('Explore politics privately.','Politik privat entdecken.')}</h1><p>{t('No classroom code is needed. These activities do not send your individual political profile to a teacher.','Es ist kein Klassenraumcode nötig. Ihr persönliches politisches Profil wird nicht an eine Lehrkraft gesendet.')}</p></article>
        <div className="school-entry-grid">
          <article className="engine-card school-entry-card"><p className="engine-kicker">BELIEVE</p><h2>Quick 26</h2><p>{t('Start with 26 single statements and see your broad multidimensional political shape.','Beginnen Sie mit 26 einzelnen Aussagen und sehen Sie Ihre mehrdimensionale politische Form.')}</p><Link className="engine-primary-link" href="/quiz">{t('Start Quick 26','Quick 26 starten')}</Link></article>
          <article className="engine-card school-entry-card"><p className="engine-kicker">BELIEVE</p><h2>Full 84</h2><p>{t('Full 84 continues from Quick and adds the remaining THINK, FEEL and ACT statements.','Full 84 setzt Quick fort und ergänzt die übrigen THINK-, FEEL- und ACT-Aussagen.')}</p><Link className="engine-primary-link" href="/quiz">{t('Start Quick → Full','Quick → Full starten')}</Link></article>
          <article className="engine-card school-entry-card"><p className="engine-kicker">Political literacy</p><h2>Private quiz</h2><p>Test CLASSIFY and UNDERSTAND without sharing an individual score with a classroom.</p><Link className="engine-primary-link" href="/school/private/literacy">Start literacy quiz</Link></article>
        </div>
      </section>
    </main>
  );
}
