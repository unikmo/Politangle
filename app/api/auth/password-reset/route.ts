import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: 'CROSS_SITE_REQUEST' }, { status: 403 });
  const input = await request.json().catch(() => ({})) as { email?: unknown };
  const email = typeof input.email === 'string' ? input.email.trim().slice(0, 254) : '';
  const key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!key) return NextResponse.json({ error: 'AUTH_NOT_CONFIGURED' }, { status: 503 });
  if (email.includes('@')) {
    await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${encodeURIComponent(key)}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ requestType: 'PASSWORD_RESET', email }), cache: 'no-store',
    }).catch(() => undefined);
  }
  return NextResponse.json({ sent: true }, { headers: { 'Cache-Control': 'no-store' } });
}
