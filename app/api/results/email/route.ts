import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { getAdminDb } from '../../../../lib/firebase-admin';
import { buildResultEmailHtml, buildResultEmailText, parseResultEmailPayload, resultEmailSubject } from '../../../../lib/result-email';

function hash(value: string) {
  return createHash('sha256').update(value).digest('hex');
}

async function takeRateLimit(key: string, limit: number) {
  const db = getAdminDb();
  const hour = new Date().toISOString().slice(0, 13);
  const ref = db.collection('resultEmailRateLimits').doc(hash(`${hour}:${key}`));
  return db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    const count = snapshot.exists && typeof snapshot.data()?.count === 'number' ? snapshot.data()!.count as number : 0;
    if (count >= limit) return false;
    transaction.set(ref, { count: count + 1, hour, expiresHint: `${hour}:59:59Z` }, { merge: true });
    return true;
  });
}

export async function POST(request: Request) {
  const payload = parseResultEmailPayload(await request.json().catch(() => null));
  if (!payload) return NextResponse.json({ error: 'Invalid result email request.' }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.POLITANGLE_RESULTS_FROM;
  if (!apiKey || !from) {
    return NextResponse.json({ error: 'Result email delivery is not configured yet.' }, { status: 503 });
  }

  try {
    const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const [ipAllowed, emailAllowed] = await Promise.all([
      takeRateLimit(`ip:${forwardedFor}`, 5),
      takeRateLimit(`email:${payload.email}`, 3),
    ]);
    if (!ipAllowed || !emailAllowed) return NextResponse.json({ error: 'Too many result emails. Please try again later.' }, { status: 429 });
  } catch {
    return NextResponse.json({ error: 'Result email delivery is temporarily unavailable.' }, { status: 503 });
  }

  const delivery = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [payload.email],
      subject: resultEmailSubject(payload),
      html: buildResultEmailHtml(payload),
      text: buildResultEmailText(payload),
    }),
  }).catch(() => null);

  if (!delivery?.ok) {
    return NextResponse.json({ error: 'The result email could not be sent. Please try again.' }, { status: 502 });
  }

  let marketingSaved = false;
  if (payload.marketingConsent) {
    try {
      const db = getAdminDb();
      await db.collection('marketingSubscribers').doc(hash(payload.email)).set({
        email: payload.email,
        consentedAt: new Date().toISOString(),
        source: 'politangle-result-email',
        locale: payload.locale,
        resultStage: payload.stage,
        status: 'pending-double-opt-in',
        canEmailMarketing: false,
      }, { merge: true });
      marketingSaved = true;
    } catch {
      marketingSaved = false;
    }
  }

  return NextResponse.json({ delivered: true, marketingSaved, marketingRequested: payload.marketingConsent });
}
