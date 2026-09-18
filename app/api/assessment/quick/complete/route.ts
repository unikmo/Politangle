import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const QUICK_COMPLETED_COOKIE = 'politangle_quick_completed';

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: 'Cross-site request is not allowed.' }, { status: 403 });
  }

  const store = await cookies();
  store.set(QUICK_COMPLETED_COOKIE, '1', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });
  return NextResponse.json({ completed: true }, { headers: { 'Cache-Control': 'no-store' } });
}
