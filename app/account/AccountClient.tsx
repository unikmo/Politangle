'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { localePath, useLocale, type Locale } from '../LocaleProvider';
import { SiteHeader } from '../SiteChrome';

type Certificate = { certificateId: string; status: 'VALID' | 'EXPIRED' | 'REVOKED'; issuedAt: string; expiresAt: string; classifyScore: number; understandScore: number };
type Session = { authenticated: boolean; user?: { emailVerified: boolean; certificationAgeConfirmed: boolean; isAdmin?: boolean } | null };

type Copy = {
  freeAccount: string; repeatTitle: string; repeatIntro: string; title: string; intro: string; secure: string;
  signIn: string; create: string; email: string; password: string; createButton: string; signInButton: string;
  noPayment: string; existing: string; need: string; forgot: string; signedOut: string; accountCreated: string; signedIn: string;
  verified: string; adult: string; yes: string; notYet: string; certificates: string; noCertificates: string; continue: string;
  certificationCheck: string; confirmCertificationAge: string; certificationNote: string; signOut: string; resetSent: string; wait: string;
};

const copy: Record<Locale, Copy> = {
  en: {
    freeAccount:'FREE ACCOUNT', repeatTitle:'Create a free account to take Quick again.', repeatIntro:'Your first Quick can be taken without an account. From the second run onward, sign in or create a free account. Your BELIEVE answers still stay in your browser and are not added to your account.',
    title:'Your Politangle account', intro:'Registration is free. Use one account for repeat assessments, literacy certification and certificates.', secure:'ACCOUNT',
    signIn:'Sign in', create:'Create account', email:'Email', password:'Password', createButton:'Create free account', signInButton:'Sign in',
    noPayment:'No payment is required to register. A certificate is a separate paid product after you pass the certified literacy test.', existing:'Already have an account? Sign in', need:'Need an account? Create one', forgot:'Forgot password?', signedOut:'Signed out.', accountCreated:'Account created. Check your email when convenient to verify it.', signedIn:'Signed in securely.',
    verified:'Email verified', adult:'16+ certification', yes:'Yes', notYet:'Not yet', certificates:'Your certificates', noCertificates:'No certificates have been issued to this account.', continue:'Continue', certificationCheck:'I confirm that I am at least 16 years old for certification.', confirmCertificationAge:'Confirm 16+ for certification', certificationNote:'The free account itself has no 16+ restriction. The age confirmation applies only to certification.', signOut:'Sign out', resetSent:'If an account exists for that address, a password-reset email has been sent.', wait:'Please wait…',
  },
  de: {
    freeAccount:'KOSTENLOSES KONTO', repeatTitle:'Erstelle ein kostenloses Konto, um Quick erneut zu machen.', repeatIntro:'Den ersten Quick-Test kannst du ohne Konto machen. Ab dem zweiten Durchgang meldest du dich an oder erstellst kostenlos ein Konto. Deine BELIEVE-Antworten bleiben weiterhin im Browser und werden nicht deinem Konto zugeordnet.',
    title:'Dein Politangle-Konto', intro:'Die Registrierung ist kostenlos. Dein Konto gilt für weitere Tests, die Wissenszertifizierung und Zertifikate.', secure:'KONTO',
    signIn:'Anmelden', create:'Konto erstellen', email:'E-Mail', password:'Passwort', createButton:'Kostenloses Konto erstellen', signInButton:'Anmelden',
    noPayment:'Für die Registrierung zahlst du nichts. Ein Zertifikat ist ein separates kostenpflichtiges Produkt, nachdem du den zertifizierten Wissenstest bestanden hast.', existing:'Du hast schon ein Konto? Anmelden', need:'Noch kein Konto? Konto erstellen', forgot:'Passwort vergessen?', signedOut:'Abgemeldet.', accountCreated:'Konto erstellt. Prüfe deine E-Mail, um die Adresse zu bestätigen.', signedIn:'Sicher angemeldet.',
    verified:'E-Mail bestätigt', adult:'16+ Zertifizierung', yes:'Ja', notYet:'Noch nicht', certificates:'Deine Zertifikate', noCertificates:'Für dieses Konto wurden noch keine Zertifikate ausgestellt.', continue:'Weiter', certificationCheck:'Ich bestätige, dass ich für die Zertifizierung mindestens 16 Jahre alt bin.', confirmCertificationAge:'16+ für Zertifizierung bestätigen', certificationNote:'Für das kostenlose Konto gibt es keine 16+-Voraussetzung. Die Altersbestätigung gilt nur für die Zertifizierung.', signOut:'Abmelden', resetSent:'Wenn ein Konto mit dieser Adresse existiert, wurde eine E-Mail zum Zurücksetzen des Passworts versendet.', wait:'Bitte warten…',
  },
  es: {
    freeAccount:'CUENTA GRATUITA', repeatTitle:'Crea una cuenta gratuita para volver a hacer Quick.', repeatIntro:'Puedes hacer tu primer Quick sin cuenta. A partir del segundo, inicia sesión o crea una cuenta gratuita. Tus respuestas de BELIEVE siguen en tu navegador y no se añaden a tu cuenta.',
    title:'Tu cuenta de Politangle', intro:'Registrarse es gratis. Usa una sola cuenta para repetir evaluaciones, la certificación de conocimientos y tus certificados.', secure:'CUENTA',
    signIn:'Iniciar sesión', create:'Crear cuenta', email:'Correo electrónico', password:'Contraseña', createButton:'Crear cuenta gratuita', signInButton:'Iniciar sesión',
    noPayment:'Registrarse no requiere pago. El certificado es un producto de pago separado después de aprobar la prueba certificada.', existing:'¿Ya tienes cuenta? Inicia sesión', need:'¿Necesitas una cuenta? Créala', forgot:'¿Olvidaste la contraseña?', signedOut:'Sesión cerrada.', accountCreated:'Cuenta creada. Revisa tu correo cuando puedas para verificarla.', signedIn:'Sesión iniciada.',
    verified:'Correo verificado', adult:'Certificación 16+', yes:'Sí', notYet:'Aún no', certificates:'Tus certificados', noCertificates:'Todavía no hay certificados emitidos para esta cuenta.', continue:'Continuar', certificationCheck:'Confirmo que tengo al menos 16 años para la certificación.', confirmCertificationAge:'Confirmar 16+ para certificación', certificationNote:'La cuenta gratuita no exige tener 16 años. La confirmación de edad solo se aplica a la certificación.', signOut:'Cerrar sesión', resetSent:'Si existe una cuenta con esa dirección, se ha enviado un correo para restablecer la contraseña.', wait:'Espera…',
  },
  fr: {
    freeAccount:'COMPTE GRATUIT', repeatTitle:'Crée un compte gratuit pour refaire Quick.', repeatIntro:'Tu peux faire ton premier Quick sans compte. À partir du deuxième, connecte-toi ou crée un compte gratuit. Tes réponses BELIEVE restent dans ton navigateur et ne sont pas ajoutées à ton compte.',
    title:'Ton compte Politangle', intro:'L’inscription est gratuite. Utilise un seul compte pour refaire les évaluations, passer la certification de connaissances et retrouver tes certificats.', secure:'COMPTE',
    signIn:'Se connecter', create:'Créer un compte', email:'E-mail', password:'Mot de passe', createButton:'Créer un compte gratuit', signInButton:'Se connecter',
    noPayment:'Aucun paiement n’est demandé pour l’inscription. Le certificat est un produit payant séparé après réussite du test certifié.', existing:'Tu as déjà un compte ? Connecte-toi', need:'Besoin d’un compte ? Crée-en un', forgot:'Mot de passe oublié ?', signedOut:'Déconnecté.', accountCreated:'Compte créé. Consulte ton e-mail pour le vérifier lorsque tu le souhaites.', signedIn:'Connexion réussie.',
    verified:'E-mail vérifié', adult:'Certification 16+', yes:'Oui', notYet:'Pas encore', certificates:'Tes certificats', noCertificates:'Aucun certificat n’a encore été émis pour ce compte.', continue:'Continuer', certificationCheck:'Je confirme avoir au moins 16 ans pour la certification.', confirmCertificationAge:'Confirmer 16+ pour la certification', certificationNote:'Le compte gratuit n’est pas réservé aux 16 ans et plus. La confirmation d’âge concerne uniquement la certification.', signOut:'Se déconnecter', resetSent:'Si un compte existe pour cette adresse, un e-mail de réinitialisation a été envoyé.', wait:'Patiente…',
  },
};

async function firebasePassword(endpoint: 'signUp' | 'signInWithPassword', email: string, password: string) {
  const key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!key) throw new Error('Registration is not configured on this deployment yet.');
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${endpoint}?key=${encodeURIComponent(key)}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password, returnSecureToken: true }),
  });
  const data = await response.json();
  if (!response.ok || typeof data.idToken !== 'string') throw new Error(data.error?.message?.replaceAll('_', ' ') ?? 'Authentication failed.');
  return data.idToken as string;
}

async function sendVerificationEmail(idToken: string) {
  const key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!key) return;
  await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${encodeURIComponent(key)}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ requestType: 'VERIFY_EMAIL', idToken }),
  });
}

export default function AccountClient() {
  const { locale } = useLocale();
  const c = copy[locale];
  const [mode, setMode] = useState<'sign-in' | 'create'>('create');
  const [session, setSession] = useState<Session | null>(null);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [returnPath, setReturnPath] = useState('');
  const [repeatReason, setRepeatReason] = useState(false);
  const [certificationMode, setCertificationMode] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('return') ?? '';
    if (requested.startsWith('/') && !requested.startsWith('//')) setReturnPath(requested);
    setRepeatReason(params.get('reason') === 'repeat');
    setCertificationMode(params.get('certification') === '1');
    fetch('/api/auth/session', { cache: 'no-store' })
      .then((response) => response.json())
      .then((data) => { setSession(data); if (data.authenticated) loadSummary(); })
      .catch(() => setSession({ authenticated: false }));
  }, []);

  async function loadSummary() {
    const response = await fetch('/api/account/summary', { cache: 'no-store' });
    if (response.ok) setCertificates((await response.json()).certificates ?? []);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setMessage('');
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') ?? '').trim();
    const password = String(form.get('password') ?? '');
    const certificationAgeConfirmed = form.get('certificationAge') === 'on';
    try {
      if (certificationMode && !certificationAgeConfirmed) throw new Error(c.certificationCheck);
      const idToken = await firebasePassword(mode === 'create' ? 'signUp' : 'signInWithPassword', email, password);
      if (mode === 'create') await sendVerificationEmail(idToken);
      const response = await fetch('/api/auth/session', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken, certificationAgeConfirmed: certificationMode && certificationAgeConfirmed }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? 'Could not start a secure session.');
      setSession({ authenticated: true, user: { emailVerified: data.emailVerified === true, certificationAgeConfirmed: data.certificationAgeConfirmed === true, isAdmin: data.isAdmin === true } });
      await loadSummary();
      setMessage(mode === 'create' ? c.accountCreated : c.signedIn);
      if (returnPath) window.location.assign(returnPath);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Authentication failed.');
    } finally { setBusy(false); }
  }

  async function signOut() {
    await fetch('/api/auth/session', { method: 'DELETE' });
    setSession({ authenticated: false }); setMessage(c.signedOut);
  }

  async function confirmCertificationAge() {
    setBusy(true); setMessage('');
    const response = await fetch('/api/account/certification-age-confirmation', { method: 'POST' });
    const data = await response.json();
    if (response.ok) {
      setSession((current) => current?.authenticated ? { ...current, user: { ...current.user!, certificationAgeConfirmed: true } } : current);
      if (returnPath) window.location.assign(returnPath);
    } else setMessage(data.error ?? 'Could not save the age confirmation.');
    setBusy(false);
  }

  async function resetPassword() {
    const email = window.prompt(`${c.email}:`)?.trim();
    if (!email) return;
    setBusy(true);
    await fetch('/api/auth/password-reset', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
    setMessage(c.resetSent); setBusy(false);
  }

  return <main className="home account-page">
    <SiteHeader />
    <section className="account-shell p-shell">
      <div className="account-intro">
        <p className="p-kicker">{c.freeAccount}</p>
        <h1>{repeatReason ? c.repeatTitle : c.title}</h1>
        <p>{repeatReason ? c.repeatIntro : c.intro}</p>
      </div>

      <article className="account-card">
        <p className="p-kicker">{c.secure}</p>
        {session?.authenticated ? <>
          <h2>{c.title}</h2>
          <div className="account-status">
            <span>{c.verified}</span><strong>{session.user?.emailVerified ? c.yes : c.notYet}</strong>
            <span>{c.adult}</span><strong>{session.user?.certificationAgeConfirmed ? c.yes : c.notYet}</strong>
          </div>
          {certificationMode && !session.user?.certificationAgeConfirmed && <>
            <p className="account-note">{c.certificationNote}</p>
            <button className="p-button account-button" disabled={busy} type="button" onClick={confirmCertificationAge}>{busy ? c.wait : c.confirmCertificationAge}</button>
          </>}
          <section className="account-certificates">
            <h3>{c.certificates}</h3>
            {certificates.length ? certificates.map((certificate) => <Link key={certificate.certificateId} href={`/certificate/${certificate.certificateId}`}><strong>{certificate.status}</strong><span>CLASSIFY {certificate.classifyScore}/25 · UNDERSTAND {certificate.understandScore}/25</span><small>{new Date(certificate.issuedAt).toLocaleDateString()} → {new Date(certificate.expiresAt).toLocaleDateString()}</small></Link>) : <p>{c.noCertificates}</p>}
          </section>
          <div className="account-actions">
            {returnPath && <a className="p-button account-button" href={returnPath}>{c.continue} →</a>}
            <Link className="p-text-link" href="/certify">Certification</Link>
            {session.user?.isAdmin && <Link className="p-text-link" href="/admin">Admin</Link>}
            <button className="account-link-button" type="button" onClick={resetPassword}>{c.forgot}</button>
            <button className="account-link-button" type="button" onClick={signOut}>{c.signOut}</button>
          </div>
        </> : <>
          <div className="account-mode-tabs">
            <button type="button" className={mode === 'create' ? 'active' : ''} onClick={() => setMode('create')}>{c.create}</button>
            <button type="button" className={mode === 'sign-in' ? 'active' : ''} onClick={() => setMode('sign-in')}>{c.signIn}</button>
          </div>
          <form className="account-form" onSubmit={submit}>
            <label><span>{c.email}</span><input required type="email" name="email" autoComplete="email" /></label>
            <label><span>{c.password}</span><input required minLength={8} type="password" name="password" autoComplete={mode === 'create' ? 'new-password' : 'current-password'} /></label>
            {certificationMode && <label className="account-check"><input required type="checkbox" name="certificationAge" /><span>{c.certificationCheck}</span></label>}
            <button className="p-button account-button" disabled={busy} type="submit">{busy ? c.wait : mode === 'create' ? c.createButton : c.signInButton}</button>
          </form>
          <p className="account-note">{c.noPayment}</p>
          <button className="account-link-button" type="button" onClick={() => setMode(mode === 'create' ? 'sign-in' : 'create')}>{mode === 'create' ? c.existing : c.need}</button>
          {mode === 'sign-in' && <button className="account-link-button" disabled={busy} type="button" onClick={resetPassword}>{c.forgot}</button>}
        </>}
        {message && <p className="account-message" role="status">{message}</p>}
      </article>
    </section>
  </main>;
}
