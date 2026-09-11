'use client';

import { useEffect, useMemo, useState } from 'react';
import { schoolLessons } from '../../../lib/school-lessons';
import { useLocale, type Locale } from '../../LocaleProvider';
import TeacherSchoolClient from './TeacherSchoolClient';

type LicenseInfo = {
  schoolId: string;
  schoolName: string;
  seatNumber: number;
  seatLabel: string;
};

type LicenseStatus = { active: false } | { active: true; license: LicenseInfo };
type PilotForm = { email: string; school: string; country: string; role: string; ageBand: '10-13' | '14-18' | 'both'; note: string; website: string };

const emptyPilot: PilotForm = { email: '', school: '', country: '', role: 'Teacher', ageBand: 'both', note: '', website: '' };

const lessonTitles: Record<Exclude<Locale, 'en'>, Record<string, string>> = {
  de: {
    'junior-social-media': 'Wer versucht, mich zu beeinflussen?',
    'junior-power-and-fairness': 'Macht, Fairness und Meinungsverschiedenheiten',
    'room-stand': 'Wo steht unser Klassenraum?',
    'families-without-stereotypes': 'Politische Familien ohne Klischees',
    'think-feel-act': 'Denken, Fühlen, Handeln',
    'quick26-lab': 'Quick 26 Klassenlabor',
    'full42-lab': 'Full 42 Profil-Labor',
    'democracy-pluralism-populism': 'Demokratie, Pluralismus und Populismus',
  },
  es: {
    'junior-social-media': '¿Quién intenta influir en mí?',
    'junior-power-and-fairness': 'Poder, justicia y desacuerdo',
    'room-stand': '¿Dónde se sitúa nuestra clase?',
    'families-without-stereotypes': 'Familias políticas sin estereotipos',
    'think-feel-act': 'Pensar, sentir, actuar',
    'quick26-lab': 'Laboratorio de clase Quick 26',
    'full42-lab': 'Laboratorio de perfil Full 42',
    'democracy-pluralism-populism': 'Democracia, pluralismo y populismo',
  },
  fr: {
    'junior-social-media': 'Qui essaie de m’influencer ?',
    'junior-power-and-fairness': 'Pouvoir, équité et désaccord',
    'room-stand': 'Où se situe notre classe ?',
    'families-without-stereotypes': 'Familles politiques sans stéréotypes',
    'think-feel-act': 'Penser, ressentir, agir',
    'quick26-lab': 'Atelier de classe Quick 26',
    'full42-lab': 'Atelier de profil Full 42',
    'democracy-pluralism-populism': 'Démocratie, pluralisme et populisme',
  },
};

function copyFor(locale: Locale) {
  if (locale === 'de') return {
    checking: 'Schulzugang wird geprüft…', teacherAccess: 'Lehrkraft-Zugang',
    heroTitle: 'Politische Medienkompetenz beginnt lange vor dem Wahlalter.',
    heroBody: 'Schülerinnen und Schüler begegnen politischen Behauptungen bereits in Feeds, Videos, Gruppenchats, Familie und KI-Inhalten. Politangle gibt ihnen einen strukturierten, überparteilichen Raum, um Belege, Werte, politische Ideen und Überzeugungsversuche auseinanderzuhalten — ohne individuelle politische Antworten offenzulegen.',
    whyKicker: 'WARUM DAS ZUR GRUNDAUSSTATTUNG GEHÖRT', whyTitle: 'Politik verstehen ist heute Teil von Medienkompetenz.',
    values: [
      ['Erst prüfen, dann reagieren', 'Behauptung, Beleg, Emotion und Überzeugungsversuch voneinander unterscheiden.'],
      ['Fair widersprechen', 'Verstehen, dass vernünftige Menschen unterschiedliche Werte gewichten können, ohne die andere Seite zu karikieren.'],
      ['Demokratische Macht verstehen', 'Wahlen, Rechte, Rechtsstaat und unabhängige Kontrollen als zusammengehörige Teile verstehen.'],
      ['Begriffe wirklich verstehen', 'Sozialstaat ist nicht automatisch Sozialismus; Staatseigentum ist nicht automatisch Kommunismus; Populismus ist nicht automatisch Autoritarismus.'],
    ],
    resourcesKicker: 'LEHRKRAFT-MATERIALIEN', resourcesTitle: 'Sehen Sie vorab, was im Pilot enthalten ist.',
    resourcesBody: 'Die Materialien sind sichtbar, damit Sie vor der Registrierung beurteilen können, ob sie zu Ihrer Klasse passen. Vollständige Abläufe, Diskussionsfragen, Live-Räume und Auswertungen werden nach Pilotfreigabe geöffnet.',
    lesson: 'Unterrichtseinheit', locked: 'Vollständiges Material nach Pilotfreigabe', goals: 'Unterrichtsziele',
    pilotKicker: 'PILOT ANFRAGEN', pilotTitle: 'Pilotzugang für Ihre Schule anfragen.',
    pilotBody: 'Wir starten bewusst mit Pilotklassen, damit Sprache, Altersstufen und Unterrichtsabläufe mit echten Lehrkräften und Schülerinnen und Schülern geprüft werden können.',
    email: 'Dienstliche E-Mail', school: 'Schule / Organisation', country: 'Land', role: 'Ihre Rolle', age: 'Altersstufe', note: 'Was möchten Sie testen? (optional)',
    ageJunior: '10–13 Jahre', ageYouth: '14–18 Jahre', ageBoth: 'Beide Altersstufen', submit: 'Pilotzugang anfragen', submitting: 'Anfrage wird gesendet…',
    requested: 'Pilotanfrage erhalten. Wir melden uns mit den nächsten Schritten.', requestError: 'Die Pilotanfrage konnte nicht gesendet werden.',
    privacy: 'Bitte keine Namen oder Daten von Schülerinnen und Schülern eingeben. Wir verwenden diese Angaben nur, um Sie zum School-Pilot zu kontaktieren.',
    approved: 'Bereits für den Pilot freigeschaltet? Lehrkraft-Code eingeben', license: 'Lehrkraft-Code', useLicense: 'Lehrkraft-Code verwenden', checkingLicense: 'Lehrkraft-Code wird geprüft…', licenseError: 'Lehrkraft-Code konnte nicht geprüft werden.', licenseActive: 'Lehrkraft-Zugang ist für diese Browser-Sitzung aktiv.', licenseRemoved: 'Lehrkraft-Zugang wurde aus dieser Browser-Sitzung entfernt.', licensed: 'freigeschalteter Lehrkraft-Zugang', another: 'Anderen Code verwenden',
    licenseHelp: 'Für diesen Schritt sind weder Name der Lehrkraft noch Schülerliste oder Schülerkonto erforderlich. Der Zugangscode bleibt nur als geschützte Sitzungsberechtigung im Browser.',
  };
  if (locale === 'es') return {
    checking: 'Comprobando acceso escolar…', teacherAccess: 'Acceso docente',
    heroTitle: 'La alfabetización política empieza mucho antes de la edad de votar.',
    heroBody: 'El alumnado ya encuentra afirmaciones políticas en redes, vídeos, chats, conversaciones familiares y contenido generado por IA. Politangle ofrece un espacio estructurado y no partidista para separar pruebas, valores, ideas políticas y persuasión sin exponer respuestas políticas individuales.',
    whyKicker: 'POR QUÉ DEBE FORMAR PARTE DE SU CAJA DE HERRAMIENTAS', whyTitle: 'Entender la política ya es una habilidad de alfabetización mediática.',
    values: [
      ['Comprobar antes de reaccionar', 'Distinguir entre una afirmación, la evidencia, la emoción y el intento de persuadir.'],
      ['Discrepar sin caricaturas', 'Entender que personas razonables pueden priorizar valores distintos sin convertir al otro lado en un estereotipo.'],
      ['Entender el poder democrático', 'Ver elecciones, derechos, Estado de derecho y controles independientes como partes conectadas.'],
      ['Dominar el vocabulario', 'Bienestar no significa automáticamente socialismo; propiedad pública no significa automáticamente comunismo; populismo no significa automáticamente autoritarismo.'],
    ],
    resourcesKicker: 'RECURSOS PARA DOCENTES', resourcesTitle: 'Mira lo que incluye el piloto antes de solicitar acceso.',
    resourcesBody: 'Los recursos se muestran para que puedas valorar si encajan en tu aula. Los planes completos, preguntas de debate, salas en directo y resultados se desbloquean tras aprobar el piloto.',
    lesson: 'Lección', locked: 'Material completo tras la aprobación del piloto', goals: 'objetivos',
    pilotKicker: 'SOLICITAR PILOTO', pilotTitle: 'Solicita acceso piloto para tu centro.',
    pilotBody: 'Empezamos deliberadamente con aulas piloto para probar lenguaje, edades y dinámica de clase con docentes y estudiantes reales.',
    email: 'Correo profesional', school: 'Centro / organización', country: 'País', role: 'Tu función', age: 'Edad del alumnado', note: '¿Qué te gustaría probar? (opcional)',
    ageJunior: '10–13 años', ageYouth: '14–18 años', ageBoth: 'Ambos grupos', submit: 'Solicitar acceso piloto', submitting: 'Enviando solicitud…',
    requested: 'Solicitud recibida. Nos pondremos en contacto con los siguientes pasos.', requestError: 'No se pudo enviar la solicitud de piloto.',
    privacy: 'No introduzcas nombres ni datos del alumnado. Usaremos estos datos únicamente para contactarte sobre el piloto escolar.',
    approved: '¿Ya tienes aprobación para el piloto? Introduce tu código docente', license: 'Código docente', useLicense: 'Usar código docente', checkingLicense: 'Comprobando código docente…', licenseError: 'No se pudo verificar el código docente.', licenseActive: 'Acceso docente activo para esta sesión del navegador.', licenseRemoved: 'Acceso docente eliminado de esta sesión.', licensed: 'acceso docente aprobado', another: 'Usar otro código',
    licenseHelp: 'Este paso no requiere nombre del docente, lista de estudiantes ni cuentas del alumnado. El código se conserva solo como credencial segura de esta sesión.',
  };
  if (locale === 'fr') return {
    checking: 'Vérification de l’accès scolaire…', teacherAccess: 'Accès enseignant',
    heroTitle: 'La culture politique commence bien avant l’âge de voter.',
    heroBody: 'Les élèves rencontrent déjà des affirmations politiques dans les réseaux, les vidéos, les discussions, la famille et les contenus générés par l’IA. Politangle leur offre un cadre structuré et non partisan pour distinguer preuves, valeurs, idées politiques et persuasion sans exposer leurs réponses politiques individuelles.',
    whyKicker: 'POURQUOI CELA FAIT PARTIE DES COMPÉTENCES ESSENTIELLES', whyTitle: 'Comprendre la politique est désormais une compétence de culture médiatique.',
    values: [
      ['Vérifier avant de réagir', 'Distinguer une affirmation, une preuve, une émotion et une tentative de persuasion.'],
      ['Être en désaccord sans caricaturer', 'Comprendre que des personnes raisonnables peuvent donner des priorités différentes aux valeurs sans réduire l’autre camp à un stéréotype.'],
      ['Comprendre le pouvoir démocratique', 'Relier élections, droits, État de droit et contrôles indépendants.'],
      ['Maîtriser le vocabulaire', 'État-providence ne veut pas automatiquement dire socialisme ; propriété publique ne veut pas automatiquement dire communisme ; populisme ne veut pas automatiquement dire autoritarisme.'],
    ],
    resourcesKicker: 'RESSOURCES ENSEIGNANTES', resourcesTitle: 'Voyez ce que contient le pilote avant de demander l’accès.',
    resourcesBody: 'Les ressources sont visibles afin que vous puissiez juger si elles conviennent à votre classe. Les déroulés complets, questions de discussion, salles en direct et résultats sont débloqués après validation du pilote.',
    lesson: 'Séquence', locked: 'Ressource complète après validation du pilote', goals: 'objectifs',
    pilotKicker: 'DEMANDER LE PILOTE', pilotTitle: 'Demandez un accès pilote pour votre établissement.',
    pilotBody: 'Nous commençons volontairement par des classes pilotes afin de tester le langage, les tranches d’âge et le déroulement avec de vrais enseignants et élèves.',
    email: 'E-mail professionnel', school: 'Établissement / organisation', country: 'Pays', role: 'Votre rôle', age: 'Âge des élèves', note: 'Que souhaitez-vous tester ? (facultatif)',
    ageJunior: '10–13 ans', ageYouth: '14–18 ans', ageBoth: 'Les deux groupes', submit: 'Demander l’accès pilote', submitting: 'Envoi de la demande…',
    requested: 'Demande reçue. Nous vous contacterons pour la suite.', requestError: 'La demande de pilote n’a pas pu être envoyée.',
    privacy: 'N’indiquez aucun nom ni aucune donnée d’élève. Ces informations servent uniquement à vous contacter au sujet du pilote scolaire.',
    approved: 'Déjà autorisé pour le pilote ? Saisissez votre code enseignant', license: 'Code enseignant', useLicense: 'Utiliser le code enseignant', checkingLicense: 'Vérification du code enseignant…', licenseError: 'Le code enseignant n’a pas pu être vérifié.', licenseActive: 'Accès enseignant actif pour cette session du navigateur.', licenseRemoved: 'Accès enseignant retiré de cette session.', licensed: 'accès enseignant autorisé', another: 'Utiliser un autre code',
    licenseHelp: 'Aucun nom d’enseignant, liste d’élèves ou compte élève n’est requis. Le code reste uniquement une autorisation sécurisée pour cette session du navigateur.',
  };
  return {
    checking: 'Checking school access…', teacherAccess: 'Teacher access',
    heroTitle: 'Political literacy starts long before voting age.',
    heroBody: 'Students already meet political claims in feeds, videos, group chats, family conversations and AI-generated content. Politangle gives them a structured, non-partisan place to separate evidence, values, political ideas and persuasion without exposing individual political answers.',
    whyKicker: 'WHY THIS BELONGS IN EVERY STUDENT’S TOOLKIT', whyTitle: 'Understanding politics is now a media-literacy skill.',
    values: [
      ['Check before reacting', 'Separate a claim, its evidence, the emotion it creates and the attempt to persuade.'],
      ['Disagree without caricature', 'Learn that reasonable people can prioritize different values without turning the other side into a stereotype.'],
      ['Understand democratic power', 'See elections, rights, rule of law and independent checks as connected parts of democratic government.'],
      ['Know what the words mean', 'A welfare state is not automatically socialism; public ownership is not automatically communism; populism is not automatically authoritarianism.'],
    ],
    resourcesKicker: 'TEACHER RESOURCES', resourcesTitle: 'See what is in the pilot before you request access.',
    resourcesBody: 'The resource library is visible so you can judge whether it fits your classroom. Full lesson timelines, discussion prompts, live rooms and class results unlock after pilot approval.',
    lesson: 'Lesson', locked: 'Full resource after pilot approval', goals: 'goals',
    pilotKicker: 'REQUEST THE PILOT', pilotTitle: 'Request pilot access for your school.',
    pilotBody: 'We are deliberately starting with pilot classrooms so language, age bands and classroom flow can be tested with real teachers and students before broader rollout.',
    email: 'Work email', school: 'School / organisation', country: 'Country', role: 'Your role', age: 'Student age band', note: 'What would you like to test? (optional)',
    ageJunior: 'Ages 10–13', ageYouth: 'Ages 14–18', ageBoth: 'Both age bands', submit: 'Request pilot access', submitting: 'Sending request…',
    requested: 'Pilot request received. We will contact you with the next steps.', requestError: 'The pilot request could not be sent.',
    privacy: 'Do not enter student names or student data. We use these details only to contact you about the School pilot.',
    approved: 'Already approved for the pilot? Enter your teacher access code', license: 'Teacher access code', useLicense: 'Use teacher access code', checkingLicense: 'Checking teacher access code…', licenseError: 'Teacher access code could not be verified.', licenseActive: 'Teacher access is active for this browser session.', licenseRemoved: 'Teacher access was removed from this browser session.', licensed: 'approved teacher access', another: 'Use another code',
    licenseHelp: 'No teacher name, student roster or student account is required by this access step. The access code is kept only as a secure browser-session credential.',
  };
}

function localizedLessonTitle(locale: Locale, id: string, fallback: string) {
  return locale === 'en' ? fallback : lessonTitles[locale][id] ?? fallback;
}

export default function TeacherLicenseGate() {
  const { locale } = useLocale();
  const copy = useMemo(() => copyFor(locale), [locale]);
  const [status, setStatus] = useState<LicenseStatus | null>(null);
  const [licenseKey, setLicenseKey] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [pilot, setPilot] = useState<PilotForm>(emptyPilot);
  const [pilotBusy, setPilotBusy] = useState(false);
  const [pilotMessage, setPilotMessage] = useState('');
  const [pilotRequested, setPilotRequested] = useState(false);

  useEffect(() => { void refresh(); }, []);

  async function refresh() {
    const response = await fetch('/api/school/license/status', { cache: 'no-store' }).catch(() => null);
    if (!response?.ok) { setStatus({ active: false }); setMessage(copy.licenseError); return; }
    setStatus(await response.json() as LicenseStatus);
  }

  async function requestPilot(event: React.FormEvent) {
    event.preventDefault();
    setPilotBusy(true); setPilotMessage('');
    const response = await fetch('/api/school/pilot-request', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...pilot, locale }),
    }).catch(() => null);
    if (!response?.ok) {
      const error = response ? await response.json().catch(() => null) as { error?: string } | null : null;
      setPilotMessage(error?.error ?? copy.requestError); setPilotBusy(false); return;
    }
    setPilotRequested(true); setPilotMessage(copy.requested); setPilotBusy(false);
  }

  async function activate() {
    if (!licenseKey.trim()) return;
    setBusy(true); setMessage(copy.checkingLicense);
    const response = await fetch('/api/school/license/activate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ licenseKey }),
    }).catch(() => null);
    if (!response?.ok) {
      const error = response ? await response.json().catch(() => null) as { error?: string } | null : null;
      setMessage(error?.error ?? copy.licenseError);
      setBusy(false);
      return;
    }
    const next = await response.json() as LicenseStatus;
    setStatus(next); setLicenseKey(''); setMessage(copy.licenseActive); setBusy(false);
  }

  async function forget() {
    setBusy(true);
    await fetch('/api/school/license/activate', { method: 'DELETE' }).catch(() => null);
    setStatus({ active: false }); setMessage(copy.licenseRemoved); setBusy(false);
  }

  if (status === null) return <section className="engine-shell school-shell"><article className="engine-card school-config-card"><p className="engine-kicker">{copy.teacherAccess}</p><h2>{copy.checking}</h2></article></section>;

  if (!status.active) {
    return (
      <section className="engine-shell school-shell teacher-pilot-shell">
        <article className="engine-card teacher-pilot-hero">
          <p className="engine-kicker">POLITANGLE SCHOOL</p>
          <h1>{copy.heroTitle}</h1>
          <p className="result-lede">{copy.heroBody}</p>
        </article>

        <article className="engine-card teacher-value-card">
          <p className="engine-kicker">{copy.whyKicker}</p>
          <h2>{copy.whyTitle}</h2>
          <div className="teacher-value-grid">
            {copy.values.map(([title, body]) => <section key={title}><strong>{title}</strong><p>{body}</p></section>)}
          </div>
        </article>

        <article className="engine-card teacher-resource-preview">
          <p className="engine-kicker">{copy.resourcesKicker}</p>
          <h2>{copy.resourcesTitle}</h2>
          <p>{copy.resourcesBody}</p>
          <div className="teacher-resource-grid">
            {schoolLessons.map((lesson) => (
              <section className="teacher-resource-card" key={lesson.id}>
                <span>{copy.lesson} · {lesson.ageBand} · {lesson.duration}</span>
                <strong>{localizedLessonTitle(locale, lesson.id, lesson.title)}</strong>
                <small>{lesson.goals.length} {copy.goals}</small>
                <em>🔒 {copy.locked}</em>
              </section>
            ))}
          </div>
        </article>

        <article className="engine-card school-config-card teacher-pilot-form-card">
          <p className="engine-kicker">{copy.pilotKicker}</p>
          <h2>{copy.pilotTitle}</h2>
          <p>{copy.pilotBody}</p>
          <form onSubmit={requestPilot} className="teacher-pilot-form">
            <input className="teacher-pilot-honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" value={pilot.website} onChange={(event) => setPilot((value) => ({ ...value, website: event.target.value }))} />
            <div className="school-config-grid teacher-pilot-fields">
              <label><span>{copy.email}</span><input type="email" required autoComplete="email" value={pilot.email} onChange={(event) => setPilot((value) => ({ ...value, email: event.target.value }))} /></label>
              <label><span>{copy.school}</span><input required value={pilot.school} onChange={(event) => setPilot((value) => ({ ...value, school: event.target.value }))} /></label>
              <label><span>{copy.country}</span><input required autoComplete="country-name" value={pilot.country} onChange={(event) => setPilot((value) => ({ ...value, country: event.target.value }))} /></label>
              <label><span>{copy.role}</span><input required value={pilot.role} onChange={(event) => setPilot((value) => ({ ...value, role: event.target.value }))} /></label>
              <label><span>{copy.age}</span><select value={pilot.ageBand} onChange={(event) => setPilot((value) => ({ ...value, ageBand: event.target.value as PilotForm['ageBand'] }))}><option value="10-13">{copy.ageJunior}</option><option value="14-18">{copy.ageYouth}</option><option value="both">{copy.ageBoth}</option></select></label>
              <label><span>{copy.note}</span><input value={pilot.note} onChange={(event) => setPilot((value) => ({ ...value, note: event.target.value }))} /></label>
            </div>
            <button className="engine-primary-link" type="submit" disabled={pilotBusy || pilotRequested}>{pilotBusy ? copy.submitting : pilotRequested ? copy.requested : copy.submit}</button>
            {pilotMessage && <p className="school-status-message">{pilotMessage}</p>}
            <p className="engine-help">{copy.privacy}</p>
          </form>
        </article>

        <details className="engine-card teacher-existing-access">
          <summary>{copy.approved}</summary>
          <div className="teacher-license-inner">
            <div className="school-config-grid">
              <label><span>{copy.license}</span><input value={licenseKey} onChange={(event) => setLicenseKey(event.target.value)} placeholder="POL-EDU-…" autoComplete="off" spellCheck={false} /></label>
            </div>
            <div className="engine-result-actions"><button className="engine-primary-link secondary" type="button" disabled={busy || !licenseKey.trim()} onClick={activate}>{copy.useLicense}</button></div>
            {message && <p className="school-status-message">{message}</p>}
            <p className="engine-help">{copy.licenseHelp}</p>
          </div>
        </details>
      </section>
    );
  }

  return (
    <>
      <section className="engine-shell school-shell no-print">
        <div className="school-room-strip"><strong>{status.license.schoolName}</strong><span>{status.license.seatLabel}</span><span>{copy.licensed}</span><button className="engine-link-button" type="button" disabled={busy} onClick={forget}>{copy.another}</button></div>
        {message && <p className="school-status-message">{message}</p>}
      </section>
      <TeacherSchoolClient />
    </>
  );
}
