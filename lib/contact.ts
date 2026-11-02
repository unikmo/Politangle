export const CONTACT_BODY_LIMIT = 32768;
const emailPattern = /^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/;
const topics = new Set(['General','Account','Privacy or legal','School','Allgemein','Konto','Datenschutz oder Recht','Schule','Cuenta','Privacidad o asuntos legales','Escuela','Général','Compte','Vie privée ou juridique','École','Geral','Conta','Privacidade ou jurídico','Escola']);
const locales = new Set(['en','de','es','fr','pt-br']);

export type ContactEnquiry = { name:string; email:string; subject:string; message:string; locale:string };
type Dependencies = {
  configured: () => boolean;
  allow: (request:Request) => Promise<boolean>;
  deliver: (enquiry:ContactEnquiry) => Promise<void>;
};
const reply = (status:number, accepted=false) => Response.json(
  accepted ? { accepted:true } : { error:'Unable to send this enquiry. Please try again.' },
  { status, headers:{'Cache-Control':'no-store', ...(status===429 ? {'Retry-After':'3600'} : {})} },
);

export function parseContact(input:unknown): ContactEnquiry | 'bot' | null {
  if (!input || typeof input!=='object' || Array.isArray(input)) return null;
  const item = input as Record<string,unknown>;
  if (typeof item['bot-field']==='string' && item['bot-field'].trim()) return 'bot';
  const limits = { name:120, email:254, subject:50, message:5000, locale:5 };
  for (const [key,max] of Object.entries(limits)) {
    if (typeof item[key]!=='string' || (item[key] as string).length>max) return null;
  }
  const name=(item.name as string).trim(), email=(item.email as string).trim();
  const subject=(item.subject as string).trim(), message=(item.message as string).trim();
  const locale=item.locale as string;
  if (!name || /[\r\n\x00-\x1f\x7f]/.test(name) || !emailPattern.test(email)
      || !topics.has(subject) || message.length<10 || message.includes('\0')
      || !locales.has(locale) || item['privacy-acknowledged']!=='yes') return null;
  return { name,email,subject,message,locale };
}

async function readInput(request:Request) {
  if (Number(request.headers.get('content-length')||0)>CONTACT_BODY_LIMIT) throw new RangeError();
  const reader=request.body?.getReader();
  if (!reader) return null;
  const chunks:Uint8Array[]=[]; let size=0;
  try {
    for (;;) {
      const {done,value}=await reader.read();
      if (done) break;
      size+=value.byteLength;
      if (size>CONTACT_BODY_LIMIT) { await reader.cancel(); throw new RangeError(); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const body=new Uint8Array(size); let offset=0;
  for (const chunk of chunks) { body.set(chunk,offset); offset+=chunk.byteLength; }
  return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(body));
}

export function createContactHandler(deps:Dependencies) {
  return async (request:Request):Promise<Response> => {
    const origin=request.headers.get('origin');
    // Next.js may use an internal hostname in request.url behind its proxy.
    // Compare the browser Origin with the actual request Host, never a supplied forwarding header.
    try {
      const source=new URL(origin || '');
      const host=request.headers.get('host') || new URL(request.url).host;
      if (!['http:','https:'].includes(source.protocol) || source.origin!==origin || source.host!==host) return reply(403);
    } catch { return reply(403); }
    if (request.headers.get('content-type')?.split(';')[0].trim()!=='application/json') return reply(415);
    let input:unknown;
    try { input=await readInput(request); }
    catch(error) { return reply(error instanceof RangeError ? 413 : 400); }
    const enquiry=parseContact(input);
    if (enquiry==='bot') return reply(200,true);
    if (!enquiry) return reply(400);
    if (!deps.configured()) return reply(503);
    let phase='rate-limit';
    try {
      if (!await deps.allow(request)) return reply(429);
      phase='delivery';
      await deps.deliver(enquiry);
      return reply(200,true);
    } catch(error) {
      // Never log message bodies, credentials or addresses, or return provider errors.
      const rawCode=String((error as {code?:unknown})?.code || 'unknown');
      const code=/^[A-Z0-9_-]{1,32}$/.test(rawCode) ? rawCode : 'unknown';
      console.error('Contact enquiry delivery unavailable',{phase,code});
      return reply(503);
    }
  };
}
