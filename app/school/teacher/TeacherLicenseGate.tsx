'use client';

import { useEffect, useState } from 'react';
import TeacherSchoolClient from './TeacherSchoolClient';
import { useLocale, type Locale } from '../../LocaleProvider';

type LicenseInfo = {
  schoolId: string;
  schoolName: string;
  seatNumber: number;
  seatLabel: string;
};

type LicenseStatus = { active: false } | { active: true; license: LicenseInfo };

function copy(locale: Locale) {
  if (locale === 'de') return {
    verifyFailed:'Die Lehrkraft-Lizenz konnte nicht geprüft werden.', checking:'Lehrkraft-Lizenz wird geprüft…', active:'Die Lehrkraft-Lizenz ist für diese Browser-Sitzung aktiv.', removed:'Die Lehrkraft-Lizenz wurde aus dieser Browser-Sitzung entfernt.',
    access:'Zugang für Lehrkräfte', title:'Gib deine Lehrkraft-Lizenz ein', pack:'Ein Schulpaket kostet 300 $ und enthält 10 Lehrkraft-Lizenzen. Mit deiner Lizenz kannst du Klassenräume erstellen; Schüler:innen treten weiterhin anonym mit einem temporären Sitzungscode bei.',
    license:'Lehrkraft-Lizenz', use:'Lizenz verwenden', privacy:'Für diesen Zugang brauchen wir weder deinen Namen noch eine Schülerliste oder Schülerkonten. Die Lizenz bleibt nur als geschützter Zugang für diese Browser-Sitzung gespeichert.',
    licensed:'lizenzierter Lehrkraft-Zugang', another:'Andere Lizenz verwenden', dashboardNotice:null as string | null,
  };
  if (locale === 'es') return {
    verifyFailed:'No se pudo comprobar la licencia docente.', checking:'Comprobando la licencia docente…', active:'La licencia docente está activa en esta sesión del navegador.', removed:'La licencia docente se ha eliminado de esta sesión del navegador.',
    access:'Acceso docente', title:'Introduce tu licencia docente', pack:'El paquete escolar cuesta 300 $ e incluye 10 licencias docentes. Tu licencia permite crear aulas; el alumnado sigue entrando de forma anónima con el código temporal que generes.',
    license:'Licencia docente', use:'Usar licencia', privacy:'Para este acceso no necesitamos tu nombre, una lista de alumnos ni cuentas del alumnado. La licencia se conserva únicamente como credencial segura durante esta sesión del navegador.',
    licensed:'acceso docente con licencia', another:'Usar otra licencia', dashboardNotice:'La entrada y el contenido de BELIEVE ya respetan el idioma seleccionado. La consola docente avanzada aún conserva algunos controles operativos en inglés mientras completamos su revisión lingüística.',
  };
  if (locale === 'fr') return {
    verifyFailed:'Impossible de vérifier la licence enseignant.', checking:'Vérification de la licence enseignant…', active:'La licence enseignant est active pour cette session du navigateur.', removed:'La licence enseignant a été retirée de cette session du navigateur.',
    access:'Accès enseignant', title:'Entre ta licence enseignant', pack:'Le pack établissement coûte 300 $ et comprend 10 licences enseignant. Ta licence permet de créer des classes ; les élèves continuent de rejoindre anonymement avec le code temporaire que tu génères.',
    license:'Licence enseignant', use:'Utiliser la licence', privacy:'Cet accès ne demande ni ton nom, ni liste d’élèves, ni comptes élèves. La licence reste uniquement comme identifiant sécurisé pendant cette session du navigateur.',
    licensed:'accès enseignant sous licence', another:'Utiliser une autre licence', dashboardNotice:'L’accès et les contenus BELIEVE respectent déjà la langue choisie. La console enseignant avancée conserve encore quelques commandes opérationnelles en anglais pendant la fin de sa révision linguistique.',
  };
  return {
    verifyFailed:'Teacher license could not be verified.', checking:'Checking teacher license…', active:'Teacher license active for this browser session.', removed:'Teacher license removed from this browser session.',
    access:'Teacher access', title:'Enter your school teacher license', pack:'A school pack is $300 for 10 teacher licenses. Your teacher license unlocks classroom creation; students still join anonymously with the temporary session code you generate.',
    license:'Teacher license', use:'Use teacher license', privacy:'No teacher name, student roster or student account is required by this access step. The license is kept only as a secure browser-session credential.',
    licensed:'licensed teacher access', another:'Use another license', dashboardNotice:null as string | null,
  };
}

export default function TeacherLicenseGate() {
  const { locale } = useLocale();
  const c = copy(locale);
  const [status, setStatus] = useState<LicenseStatus | null>(null);
  const [licenseKey, setLicenseKey] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => { void refresh(); }, []);

  async function refresh() {
    const response = await fetch('/api/school/license/status', { cache: 'no-store' }).catch(() => null);
    if (!response?.ok) { setStatus({ active: false }); setMessage(c.verifyFailed); return; }
    setStatus(await response.json() as LicenseStatus);
  }

  async function activate() {
    if (!licenseKey.trim()) return;
    setBusy(true); setMessage(c.checking);
    const response = await fetch('/api/school/license/activate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ licenseKey }),
    }).catch(() => null);
    if (!response?.ok) {
      const error = response ? await response.json().catch(() => null) as { error?: string } | null : null;
      setMessage(locale === 'en' && error?.error ? error.error : c.verifyFailed);
      setBusy(false);
      return;
    }
    const next = await response.json() as LicenseStatus;
    setStatus(next); setLicenseKey(''); setMessage(c.active); setBusy(false);
  }

  async function forget() {
    setBusy(true);
    await fetch('/api/school/license/activate', { method: 'DELETE' }).catch(() => null);
    setStatus({ active: false }); setMessage(c.removed); setBusy(false);
  }

  if (status === null) return <section className="engine-shell school-shell"><article className="engine-card school-config-card"><p className="engine-kicker">{c.access}</p><h2>{c.checking}</h2></article></section>;

  if (!status.active) {
    return (
      <section className="engine-shell school-shell">
        <article className="engine-card school-config-card">
          <p className="engine-kicker">{c.access}</p>
          <h1>{c.title}</h1>
          <p>{c.pack}</p>
          <div className="school-config-grid">
            <label><span>{c.license}</span><input value={licenseKey} onChange={(event) => setLicenseKey(event.target.value)} placeholder="POL-EDU-…" autoComplete="off" spellCheck={false} /></label>
          </div>
          <div className="engine-result-actions"><button className="engine-primary-link" type="button" disabled={busy || !licenseKey.trim()} onClick={activate}>{c.use}</button></div>
          {message && <p className="school-status-message">{message}</p>}
          <p className="engine-help">{c.privacy}</p>
        </article>
      </section>
    );
  }

  return (
    <>
      <section className="engine-shell school-shell no-print">
        <div className="school-room-strip"><strong>{status.license.schoolName}</strong><span>{status.license.seatLabel}</span><span>{c.licensed}</span><button className="engine-link-button" type="button" disabled={busy} onClick={forget}>{c.another}</button></div>
        {message && <p className="school-status-message">{message}</p>}
        {c.dashboardNotice && <p className="engine-help">{c.dashboardNotice}</p>}
      </section>
      <TeacherSchoolClient />
    </>
  );
}
