import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { getAdminDb } from '../../../../lib/firebase-admin';
import { parseSchoolPilotRequest } from '../../../../lib/school-pilot-request';

function hash(value: string) {
  return createHash('sha256').update(value).digest('hex');
}

async function takeHourlyLimit(key: string, limit: number) {
  const db = getAdminDb();
  const hour = new Date().toISOString().slice(0, 13);
  const ref = db.collection('schoolPilotRateLimits').doc(hash(`${hour}:${key}`));
  return db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    const count = snapshot.exists && typeof snapshot.data()?.count === 'number' ? snapshot.data()!.count as number : 0;
    if (count >= limit) return false;
    transaction.set(ref, { count: count + 1, hour }, { merge: true });
    return true;
  });
}

export async function POST(request: Request) {
  const payload = parseSchoolPilotRequest(await request.json().catch(() => null));
  if (!payload) return NextResponse.json({ error: 'Please complete the pilot request fields.' }, { status: 400 });

  try {
    const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const allowed = await takeHourlyLimit(`ip:${forwardedFor}`, 10);
    if (!allowed) return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });

    const db = getAdminDb();
    await db.collection('schoolPilotRequests').doc(hash(payload.email)).set({
      ...payload,
      requestedAt: new Date().toISOString(),
      status: 'requested',
      source: 'teacher-resource-gate',
      includesStudentData: false,
    }, { merge: true });
    return NextResponse.json({ requested: true });
  } catch {
    return NextResponse.json({ error: 'Pilot registration is temporarily unavailable. Please try again.' }, { status: 503 });
  }
}
