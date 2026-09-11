export type ResultDeliveryLocale = 'en' | 'de' | 'es' | 'fr';
export type ResultDeliveryStage = 'quick' | 'full';

export type CountryLensPayload = {
  politicalContext: string;
  grewUp: string;
  influence: string;
};

export type ResultEmailPayload = {
  email: string;
  stage: ResultDeliveryStage;
  locale: ResultDeliveryLocale;
  headline: string;
  axes: { name: string; score: number | null }[];
  families: { name: string; overall: number | null }[];
  lens: CountryLensPayload;
  marketingConsent: boolean;
};

function cleanString(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function score(value: unknown) {
  if (value === null) return null;
  return typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 100 ? value : undefined;
}

export function parseResultEmailPayload(raw: unknown): ResultEmailPayload | null {
  if (!raw || typeof raw !== 'object') return null;
  const candidate = raw as Record<string, unknown>;
  const email = cleanString(candidate.email, 254).toLowerCase();
  const stage = candidate.stage === 'quick' || candidate.stage === 'full' ? candidate.stage : null;
  const locale = candidate.locale === 'de' || candidate.locale === 'es' || candidate.locale === 'fr' || candidate.locale === 'en' ? candidate.locale : 'en';
  const headline = cleanString(candidate.headline, 280);
  if (!validEmail(email) || !stage || !headline) return null;

  if (!Array.isArray(candidate.axes) || candidate.axes.length !== 8) return null;
  const axes: ResultEmailPayload['axes'] = [];
  for (const rawAxis of candidate.axes) {
    if (!rawAxis || typeof rawAxis !== 'object') return null;
    const item = rawAxis as Record<string, unknown>;
    const name = cleanString(item.name, 80);
    const parsedScore = score(item.score);
    if (!name || parsedScore === undefined) return null;
    axes.push({ name, score: parsedScore });
  }

  if (!Array.isArray(candidate.families) || candidate.families.length > 5) return null;
  const families: ResultEmailPayload['families'] = [];
  for (const rawFamily of candidate.families) {
    if (!rawFamily || typeof rawFamily !== 'object') return null;
    const item = rawFamily as Record<string, unknown>;
    const name = cleanString(item.name, 80);
    const overall = score(item.overall);
    if (!name || overall === undefined) return null;
    families.push({ name, overall });
  }

  const rawLens = candidate.lens && typeof candidate.lens === 'object' ? candidate.lens as Record<string, unknown> : {};
  const lens: CountryLensPayload = {
    politicalContext: cleanString(rawLens.politicalContext, 80),
    grewUp: cleanString(rawLens.grewUp, 80),
    influence: cleanString(rawLens.influence, 80),
  };

  return {
    email,
    stage,
    locale,
    headline,
    axes,
    families,
    lens,
    marketingConsent: candidate.marketingConsent === true,
  };
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]!));
}

function deliveryCopy(locale: ResultDeliveryLocale) {
  if (locale === 'de') return { subject: 'Ihr Politangle-Ergebnis', title: 'Ihr Politangle', traditions: 'Nächste politische Traditionen', axes: 'Ihre acht Dimensionen', lens: 'Country Lens', context: 'Politischer Kontext', grew: 'Überwiegend aufgewachsen in', influence: 'Zusätzlicher Einfluss', note: 'Der Country Lens dient nur dem Kontext und verändert Ihre Werte nicht.', footer: 'Diese E-Mail wurde angefordert. Sie werden dadurch nicht automatisch für Marketing angemeldet.' };
  if (locale === 'es') return { subject: 'Tu resultado Politangle', title: 'Tu Politangle', traditions: 'Tradiciones políticas más cercanas', axes: 'Tus ocho dimensiones', lens: 'Country Lens', context: 'Contexto político', grew: 'Principalmente creciste en', influence: 'Influencia adicional', note: 'Country Lens solo aporta contexto y no cambia tus puntuaciones.', footer: 'Solicitaste este correo. Recibir tu resultado no te suscribe automáticamente a marketing.' };
  if (locale === 'fr') return { subject: 'Votre résultat Politangle', title: 'Votre Politangle', traditions: 'Traditions politiques les plus proches', axes: 'Vos huit dimensions', lens: 'Country Lens', context: 'Contexte politique', grew: 'Vous avez surtout grandi en', influence: 'Influence supplémentaire', note: 'Country Lens ajoute seulement du contexte et ne modifie pas vos scores.', footer: 'Vous avez demandé cet e-mail. La réception du résultat ne vous inscrit pas automatiquement à des messages marketing.' };
  return { subject: 'Your Politangle result', title: 'Your Politangle', traditions: 'Closest political traditions', axes: 'Your eight dimensions', lens: 'Country Lens', context: 'Political context', grew: 'Mostly grew up in', influence: 'Additional influence', note: 'Country Lens adds context only and never changes your scores.', footer: 'You requested this email. Receiving your result does not automatically subscribe you to marketing.' };
}

export function resultEmailSubject(payload: ResultEmailPayload) {
  const copy = deliveryCopy(payload.locale);
  return `${copy.subject} · ${payload.stage === 'full' ? 'Full' : 'Quick'}`;
}

export function buildResultEmailText(payload: ResultEmailPayload) {
  const copy = deliveryCopy(payload.locale);
  const families = payload.families.filter((item) => item.overall !== null).map((item) => `${item.name}: ${item.overall}/100`).join('\n');
  const axes = payload.axes.map((item) => `${item.name}: ${item.score ?? '—'}/100`).join('\n');
  const lensLines = [
    payload.lens.politicalContext && `${copy.context}: ${payload.lens.politicalContext}`,
    payload.lens.grewUp && `${copy.grew}: ${payload.lens.grewUp}`,
    payload.lens.influence && `${copy.influence}: ${payload.lens.influence}`,
  ].filter(Boolean).join('\n');
  return `${copy.title} · ${payload.stage === 'full' ? 'Full' : 'Quick'}\n\n${payload.headline}\n\n${copy.traditions}\n${families || '—'}\n\n${copy.axes}\n${axes}${lensLines ? `\n\n${copy.lens}\n${lensLines}\n${copy.note}` : ''}\n\n${copy.footer}`;
}

export function buildResultEmailHtml(payload: ResultEmailPayload) {
  const copy = deliveryCopy(payload.locale);
  const familyRows = payload.families.filter((item) => item.overall !== null).map((item) => `<tr><td style="padding:7px 0;color:#5f4e47">${escapeHtml(item.name)}</td><td style="padding:7px 0;text-align:right;font-weight:700;color:#c94412">${item.overall}/100</td></tr>`).join('');
  const axisRows = payload.axes.map((item) => `<tr><td style="padding:7px 0;color:#5f4e47">${escapeHtml(item.name)}</td><td style="padding:7px 0;text-align:right;font-weight:700">${item.score ?? '—'}/100</td></tr>`).join('');
  const lens = [
    payload.lens.politicalContext && `<p style="margin:4px 0"><strong>${escapeHtml(copy.context)}:</strong> ${escapeHtml(payload.lens.politicalContext)}</p>`,
    payload.lens.grewUp && `<p style="margin:4px 0"><strong>${escapeHtml(copy.grew)}:</strong> ${escapeHtml(payload.lens.grewUp)}</p>`,
    payload.lens.influence && `<p style="margin:4px 0"><strong>${escapeHtml(copy.influence)}:</strong> ${escapeHtml(payload.lens.influence)}</p>`,
  ].filter(Boolean).join('');

  return `<!doctype html><html><body style="margin:0;background:#f7f3ef;font-family:Arial,sans-serif;color:#3b251d"><div style="max-width:680px;margin:0 auto;padding:28px"><div style="background:#f45a1f;border-radius:24px;padding:34px;color:#fff"><div style="font-size:12px;letter-spacing:.12em;font-weight:700">POLITANGLE · ${payload.stage === 'full' ? 'FULL' : 'QUICK'}</div><h1 style="margin:18px 0 0;font-size:34px;line-height:1.05">${escapeHtml(payload.headline)}</h1></div><div style="background:#fff;margin-top:14px;border-radius:20px;padding:28px;border:1px solid #eadbd1"><h2 style="margin:0 0 12px;font-size:20px">${escapeHtml(copy.traditions)}</h2><table style="width:100%;border-collapse:collapse">${familyRows || '<tr><td>—</td></tr>'}</table><h2 style="margin:28px 0 12px;font-size:20px">${escapeHtml(copy.axes)}</h2><table style="width:100%;border-collapse:collapse">${axisRows}</table>${lens ? `<div style="margin-top:28px;padding:18px;border-radius:14px;background:#fff5ee"><h2 style="margin:0 0 10px;font-size:18px">${escapeHtml(copy.lens)}</h2>${lens}<p style="margin:12px 0 0;color:#74645c;font-size:12px">${escapeHtml(copy.note)}</p></div>` : ''}<p style="margin:28px 0 0;color:#8a7a72;font-size:12px;line-height:1.5">${escapeHtml(copy.footer)}</p></div></div></body></html>`;
}
