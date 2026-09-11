'use client';

import { useEffect, useMemo, useState } from 'react';
import { assessFamiliesV2Canonical, calculatePolygonV2Canonical } from '../lib/belief-v2-engine';
import { beliefV2OverallProgress, beliefV2StageProgress, lockedBeliefStatementsV3, parseBeliefV2Session } from '../lib/belief-v2-session';
import { collapseStatementAnswers } from '../lib/belief-statements';
import { describePolitangleHome } from '../lib/politangle-home';
import { useLocale, type Locale } from './LocaleProvider';

const BELIEF_SESSION_KEY = 'politangle.believe.v2.session';
const COUNTRY_LENS_KEY = 'politangle.country-lens.v1';

type ResultStage = 'quick' | 'full';
type Lens = { politicalContext: string; grewUp: string; influence: string };
type Snapshot = {
  headline: string;
  axes: { id: string; name: string; score: number | null }[];
  families: { id: string; name: string; overall: number | null }[];
};

const emptyLens: Lens = { politicalContext: '', grewUp: '', influence: '' };

function copyFor(locale: Locale, stage: ResultStage) {
  const full = stage === 'full';
  if (locale === 'de') return {
    lensKicker: 'COUNTRY LENS', lensTitle: 'Geben Sie Ihrem Ergebnis politischen Kontext.',
    lensBody: 'Politische Begriffe bedeuten in verschiedenen Ländern nicht immer dasselbe. Der Country Lens speichert Ihren Kontext nur auf diesem Gerät und verändert niemals Ihre acht Werte.',
    politicalContext: 'Land Ihres politischen Bezugs', contextPlaceholder: 'z. B. Deutschland', grewUp: 'Land, in dem Sie überwiegend aufgewachsen sind (optional)', influence: 'Weiteres Land, das Ihre politische Sicht geprägt hat (optional)', save: 'Country Lens speichern', saved: 'Gespeichert',
    toolsKicker: 'BEHALTEN ODER TEILEN', toolsTitle: full ? 'Nehmen Sie Ihr vollständiges Politangle mit.' : 'Nehmen Sie Ihr Quick-Politangle mit.',
    share: 'Politangle als Bild teilen', preparing: 'Bild wird erstellt…', imageSaved: 'Bild erstellt. Wenn Teilen nicht unterstützt wird, wurde es als PNG gespeichert.', shareError: 'Das Bild konnte nicht erstellt werden.',
    emailLabel: 'E-Mail-Adresse', emailPlaceholder: 'name@beispiel.de', emailButton: full ? 'Mein vollständiges Politangle mailen' : 'Mein Quick-Politangle mailen', sending: 'Wird gesendet…',
    marketing: 'Ich möchte gelegentlich Neuigkeiten zu Politangle erhalten.', privacy: 'Der Versand Ihres Ergebnisses meldet Sie nicht für Marketing an. Die Zustimmung oben ist getrennt und optional.',
    delivered: 'Ergebnis-E-Mail gesendet.', deliveredMarketingIssue: 'Ergebnis-E-Mail gesendet; die optionale Marketing-Zustimmung konnte jedoch nicht gespeichert werden.',
  };
  if (locale === 'es') return {
    lensKicker: 'COUNTRY LENS', lensTitle: 'Añade el contexto político de tu resultado.',
    lensBody: 'Las etiquetas políticas no significan exactamente lo mismo en todos los países. Country Lens guarda este contexto solo en este dispositivo y nunca cambia tus ocho puntuaciones.',
    politicalContext: 'País de referencia política', contextPlaceholder: 'p. ej. España', grewUp: 'País donde creciste principalmente (opcional)', influence: 'Otro país que influyó en tu visión política (opcional)', save: 'Guardar Country Lens', saved: 'Guardado',
    toolsKicker: 'GUARDAR O COMPARTIR', toolsTitle: full ? 'Llévate tu Politangle completo.' : 'Llévate tu Politangle Quick.',
    share: 'Compartir Politangle como imagen', preparing: 'Creando imagen…', imageSaved: 'Imagen creada. Si tu navegador no puede compartirla, se guardó como PNG.', shareError: 'No se pudo crear la imagen.',
    emailLabel: 'Correo electrónico', emailPlaceholder: 'nombre@ejemplo.com', emailButton: full ? 'Enviarme mi Politangle completo' : 'Enviarme mi Politangle Quick', sending: 'Enviando…',
    marketing: 'Quiero recibir ocasionalmente novedades de Politangle.', privacy: 'Recibir tu resultado no te suscribe a marketing. La casilla anterior es separada y opcional.',
    delivered: 'Correo con el resultado enviado.', deliveredMarketingIssue: 'El resultado se envió, pero no pudimos guardar la suscripción opcional a novedades.',
  };
  if (locale === 'fr') return {
    lensKicker: 'COUNTRY LENS', lensTitle: 'Ajoutez le contexte politique de votre résultat.',
    lensBody: 'Les étiquettes politiques ne signifient pas exactement la même chose dans tous les pays. Country Lens garde ce contexte uniquement sur cet appareil et ne modifie jamais vos huit scores.',
    politicalContext: 'Pays de référence politique', contextPlaceholder: 'ex. France', grewUp: 'Pays où vous avez principalement grandi (facultatif)', influence: 'Autre pays ayant influencé votre regard politique (facultatif)', save: 'Enregistrer Country Lens', saved: 'Enregistré',
    toolsKicker: 'GARDER OU PARTAGER', toolsTitle: full ? 'Emportez votre Politangle complet.' : 'Emportez votre Politangle Quick.',
    share: 'Partager Politangle comme image', preparing: 'Création de l’image…', imageSaved: 'Image créée. Si le partage n’est pas pris en charge, elle a été enregistrée en PNG.', shareError: 'Impossible de créer l’image.',
    emailLabel: 'Adresse e-mail', emailPlaceholder: 'nom@exemple.fr', emailButton: full ? 'M’envoyer mon Politangle complet' : 'M’envoyer mon Politangle Quick', sending: 'Envoi…',
    marketing: 'Je souhaite recevoir occasionnellement des nouvelles de Politangle.', privacy: 'Recevoir votre résultat ne vous inscrit pas au marketing. La case ci-dessus est séparée et facultative.',
    delivered: 'E-mail du résultat envoyé.', deliveredMarketingIssue: 'Le résultat a été envoyé, mais l’inscription facultative aux nouvelles n’a pas pu être enregistrée.',
  };
  return {
    lensKicker: 'COUNTRY LENS', lensTitle: 'Add the political context behind your result.',
    lensBody: 'Political labels do not mean exactly the same thing in every country. Country Lens keeps this context on this device and never changes your eight scores.',
    politicalContext: 'Political context country', contextPlaceholder: 'e.g. Germany', grewUp: 'Country you mostly grew up in (optional)', influence: 'Another country that shaped your political frame (optional)', save: 'Save Country Lens', saved: 'Saved',
    toolsKicker: 'KEEP OR SHARE', toolsTitle: full ? 'Take your complete Politangle with you.' : 'Take your Quick Politangle with you.',
    share: 'Share Politangle as an image', preparing: 'Creating image…', imageSaved: 'Image created. If system sharing is unavailable, it was saved as a PNG.', shareError: 'The image could not be created.',
    emailLabel: 'Email address', emailPlaceholder: 'name@example.com', emailButton: full ? 'Email me my complete Politangle' : 'Email me my Quick Politangle', sending: 'Sending…',
    marketing: 'I would like occasional Politangle product updates.', privacy: 'Emailing your result does not subscribe you to marketing. The checkbox above is separate and optional.',
    delivered: 'Result email sent.', deliveredMarketingIssue: 'Result email sent, but the optional product-updates consent could not be saved.',
  };
}

const axisTranslations: Record<Exclude<Locale, 'en'>, Record<string, string>> = {
  de: { 'economic-role': 'Wirtschaft', ownership: 'Eigentum', 'social-values': 'Gesellschaft', authority: 'Autorität', pluralism: 'Pluralismus', world: 'Welt', nationhood: 'Nation', ecology: 'Ökologie' },
  es: { 'economic-role': 'Economía', ownership: 'Propiedad', 'social-values': 'Valores sociales', authority: 'Autoridad', pluralism: 'Pluralismo', world: 'Mundo', nationhood: 'Nación', ecology: 'Ecología' },
  fr: { 'economic-role': 'Économie', ownership: 'Propriété', 'social-values': 'Valeurs sociales', authority: 'Autorité', pluralism: 'Pluralisme', world: 'Monde', nationhood: 'Nation', ecology: 'Écologie' },
};

const familyTranslations: Record<Exclude<Locale, 'en'>, Record<string, string>> = {
  de: { liberalism: 'Liberalismus', conservatism: 'Konservatismus', 'social-democracy': 'Sozialdemokratie', socialism: 'Sozialismus', 'green-politics': 'Grüne Politik' },
  es: { liberalism: 'Liberalismo', conservatism: 'Conservadurismo', 'social-democracy': 'Socialdemocracia', socialism: 'Socialismo', 'green-politics': 'Política verde' },
  fr: { liberalism: 'Libéralisme', conservatism: 'Conservatisme', 'social-democracy': 'Social-démocratie', socialism: 'Socialisme', 'green-politics': 'Écologie politique' },
};

function localizedSnapshot(snapshot: Snapshot, locale: Locale): Snapshot {
  if (locale === 'en') return snapshot;
  return {
    ...snapshot,
    axes: snapshot.axes.map((axis) => ({ ...axis, name: axisTranslations[locale][axis.id] ?? axis.name })),
    families: snapshot.families.map((family) => ({ ...family, name: familyTranslations[locale][family.id] ?? family.name })),
  };
}

function readLens(): Lens {
  try {
    const parsed = JSON.parse(localStorage.getItem(COUNTRY_LENS_KEY) ?? 'null') as Partial<Lens> | null;
    if (!parsed) return emptyLens;
    return {
      politicalContext: typeof parsed.politicalContext === 'string' ? parsed.politicalContext : '',
      grewUp: typeof parsed.grewUp === 'string' ? parsed.grewUp : '',
      influence: typeof parsed.influence === 'string' ? parsed.influence : '',
    };
  } catch { return emptyLens; }
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const trial = line ? `${line} ${word}` : word;
    if (ctx.measureText(trial).width <= maxWidth || !line) line = trial;
    else { lines.push(line); line = word; }
  }
  if (line) lines.push(line);
  return lines;
}

async function createSharePng(snapshot: Snapshot, lens: Lens, stage: ResultStage) {
  const canvas = document.createElement('canvas');
  canvas.width = 1200; canvas.height = 630;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas unavailable');

  ctx.fillStyle = '#f45a1f'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(255,255,255,.12)';
  for (let x = 20; x < 1200; x += 28) for (let y = 20; y < 630; y += 28) { ctx.beginPath(); ctx.arc(x, y, 1.1, 0, Math.PI * 2); ctx.fill(); }

  ctx.fillStyle = '#ffffff'; ctx.fillRect(55, 50, 1090, 530);
  ctx.fillStyle = '#c94412'; ctx.font = '700 22px Arial, sans-serif'; ctx.fillText(`POLITANGLE · ${stage.toUpperCase()}`, 95, 105);
  ctx.fillStyle = '#3b251d'; ctx.font = '700 48px Arial, sans-serif';
  const headlineLines = wrapLines(ctx, snapshot.headline, 540).slice(0, 3);
  headlineLines.forEach((line, index) => ctx.fillText(line, 95, 175 + index * 55));

  const topFamilies = snapshot.families.filter((item) => item.overall !== null).slice(0, 3);
  ctx.font = '700 18px Arial, sans-serif'; ctx.fillStyle = '#6f2c19';
  topFamilies.forEach((family, index) => ctx.fillText(`${index === 0 ? '●' : '○'} ${family.name} · ${family.overall}/100`, 95, 370 + index * 34));

  const lensLine = [lens.politicalContext, lens.grewUp, lens.influence].filter(Boolean).join(' · ');
  if (lensLine) { ctx.font = '16px Arial, sans-serif'; ctx.fillStyle = '#74645c'; wrapLines(ctx, `Country Lens · ${lensLine}`, 520).slice(0, 2).forEach((line, i) => ctx.fillText(line, 95, 485 + i * 24)); }
  ctx.font = '14px Arial, sans-serif'; ctx.fillStyle = '#8a7a72'; ctx.fillText('Eight dimensions · one pattern · no single left–right label', 95, 545);

  const cx = 875, cy = 312, radius = 170;
  const point = (index: number, ratio: number) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / snapshot.axes.length;
    return [cx + Math.cos(angle) * radius * ratio, cy + Math.sin(angle) * radius * ratio] as const;
  };
  ctx.strokeStyle = '#ead9cf'; ctx.lineWidth = 1.5;
  for (const ring of [0.25, 0.5, 0.75, 1]) {
    ctx.beginPath(); snapshot.axes.forEach((_, index) => { const [x, y] = point(index, ring); index ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.closePath(); ctx.stroke();
  }
  snapshot.axes.forEach((_, index) => { const [x, y] = point(index, 1); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y); ctx.stroke(); });

  ctx.fillStyle = 'rgba(244,90,31,.18)'; ctx.strokeStyle = '#f45a1f'; ctx.lineWidth = 4; ctx.beginPath();
  snapshot.axes.forEach((axis, index) => { const [x, y] = point(index, (axis.score ?? 50) / 100); index ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.closePath(); ctx.fill(); ctx.stroke();
  snapshot.axes.forEach((axis, index) => { const [x, y] = point(index, (axis.score ?? 50) / 100); ctx.fillStyle = '#6f2c19'; ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fill(); });

  ctx.font = '700 14px Arial, sans-serif'; ctx.fillStyle = '#5a372a'; ctx.textAlign = 'center';
  snapshot.axes.forEach((axis, index) => { const [x, y] = point(index, 1.18); ctx.fillText(`${axis.name} ${axis.score ?? '—'}`, x, y + 4); });
  ctx.textAlign = 'left';

  return new Promise<Blob>((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('PNG failed')), 'image/png', 0.95));
}

export default function ResultExtras({ stage }: { stage: ResultStage }) {
  const { locale } = useLocale();
  const copy = useMemo(() => copyFor(locale, stage), [locale, stage]);
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [lens, setLens] = useState<Lens>(emptyLens);
  const [lensSaved, setLensSaved] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const [email, setEmail] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [emailBusy, setEmailBusy] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');

  useEffect(() => { setLens(readLens()); }, []);
  useEffect(() => {
    const refresh = () => {
      const session = parseBeliefV2Session(sessionStorage.getItem(BELIEF_SESSION_KEY));
      if (!session) { setSnapshot(null); return; }
      const complete = stage === 'full' ? beliefV2OverallProgress(session).complete : beliefV2StageProgress(session, 'quick').complete;
      if (!complete) { setSnapshot(null); return; }
      const canonical = collapseStatementAnswers(session.answers, lockedBeliefStatementsV3);
      const axes = calculatePolygonV2Canonical(canonical);
      const families = assessFamiliesV2Canonical(canonical);
      const home = describePolitangleHome(families, axes, stage === 'full');
      setSnapshot({
        headline: home.headline,
        axes: axes.map((axis) => ({ id: axis.id, name: axis.name, score: axis.score })),
        families: families.slice(0, 5).map((family) => ({ id: family.id, name: family.name, overall: family.overall })),
      });
    };
    refresh();
    const timer = window.setInterval(refresh, 900);
    return () => window.clearInterval(timer);
  }, [stage]);

  if (!snapshot) return null;
  const localized = localizedSnapshot(snapshot, locale);

  function saveLens() {
    const cleaned = { politicalContext: lens.politicalContext.trim().slice(0, 80), grewUp: lens.grewUp.trim().slice(0, 80), influence: lens.influence.trim().slice(0, 80) };
    localStorage.setItem(COUNTRY_LENS_KEY, JSON.stringify(cleaned));
    setLens(cleaned); setLensSaved(true); window.setTimeout(() => setLensSaved(false), 1500);
  }

  async function shareVisual() {
    setSharing(true); setShareMessage('');
    try {
      const blob = await createSharePng(localized, lens, stage);
      const file = new File([blob], `politangle-${stage}.png`, { type: 'image/png' });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ title: `Politangle ${stage === 'full' ? 'Full' : 'Quick'}`, text: localized.headline, files: [file] });
      } else if (navigator.clipboard && typeof ClipboardItem !== 'undefined') {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      } else {
        const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = file.name; link.click(); window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      }
      setShareMessage(copy.imageSaved);
    } catch { setShareMessage(copy.shareError); }
    finally { setSharing(false); }
  }

  async function sendEmail(event: React.FormEvent) {
    event.preventDefault();
    if (!email.trim()) return;
    setEmailBusy(true); setEmailMessage('');
    const response = await fetch('/api/results/email', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email, stage, locale, headline: localized.headline,
        axes: localized.axes.map(({ name, score }) => ({ name, score })),
        families: localized.families.map(({ name, overall }) => ({ name, overall })),
        lens, marketingConsent,
      }),
    }).catch(() => null);
    if (!response) { setEmailMessage('Network error.'); setEmailBusy(false); return; }
    const data = await response.json().catch(() => ({})) as { delivered?: boolean; marketingSaved?: boolean; marketingRequested?: boolean; error?: string };
    if (!response.ok || !data.delivered) setEmailMessage(data.error ?? 'Email could not be sent.');
    else if (data.marketingRequested && !data.marketingSaved) setEmailMessage(copy.deliveredMarketingIssue);
    else setEmailMessage(copy.delivered);
    setEmailBusy(false);
  }

  return (
    <section className="engine-shell result-extras-shell">
      <article className="engine-card country-lens-card">
        <p className="engine-kicker">{copy.lensKicker}</p><h2>{copy.lensTitle}</h2><p className="result-lede">{copy.lensBody}</p>
        <div className="country-lens-grid">
          <label><span>{copy.politicalContext}</span><input value={lens.politicalContext} onChange={(event) => setLens((value) => ({ ...value, politicalContext: event.target.value }))} placeholder={copy.contextPlaceholder} /></label>
          <label><span>{copy.grewUp}</span><input value={lens.grewUp} onChange={(event) => setLens((value) => ({ ...value, grewUp: event.target.value }))} /></label>
          <label><span>{copy.influence}</span><input value={lens.influence} onChange={(event) => setLens((value) => ({ ...value, influence: event.target.value }))} /></label>
        </div>
        <button className="engine-primary-link secondary" type="button" onClick={saveLens}>{lensSaved ? copy.saved : copy.save}</button>
      </article>

      <article className="engine-card result-tools-card">
        <p className="engine-kicker">{copy.toolsKicker}</p><h2>{copy.toolsTitle}</h2>
        <div className="result-tools-grid">
          <div className="share-tool"><p>PNG · 1200 × 630</p><button className="engine-primary-link" type="button" onClick={shareVisual} disabled={sharing}>{sharing ? copy.preparing : copy.share}</button>{shareMessage && <span className="result-tool-message">{shareMessage}</span>}</div>
          <form className="result-email-form" onSubmit={sendEmail}>
            <label><span>{copy.emailLabel}</span><input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={copy.emailPlaceholder} /></label>
            <label className="result-marketing-consent"><input type="checkbox" checked={marketingConsent} onChange={(event) => setMarketingConsent(event.target.checked)} /><span>{copy.marketing}</span></label>
            <p>{copy.privacy}</p>
            <button className="engine-primary-link" type="submit" disabled={emailBusy}>{emailBusy ? copy.sending : copy.emailButton}</button>
            {emailMessage && <span className="result-tool-message">{emailMessage}</span>}
          </form>
        </div>
      </article>
    </section>
  );
}
