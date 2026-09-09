import { NextResponse } from 'next/server';
import { getAdminDb } from '../../../../../../lib/firebase-admin';
import { applySchoolJoin, hashSchoolSecret, type SchoolClassRecord } from '../../../../../../lib/school-aggregate';

async function codeFrom(context: { params: Promise<{ code: string }> }) {
  const { code } = await context.params;
  return code.trim().toUpperCase();
}

function validRecord(value: unknown): value is SchoolClassRecord {
  return Boolean(value && typeof value === 'object' && (value as { schemaVersion?: unknown }).schemaVersion === 2);
}

export async function POST(request: Request, context: { params: Promise<{ code: string }> }) {
  const code = await codeFrom(context);
  const body = await request.json().catch(() => null) as { participantToken?: unknown } | null;
  if (!body || typeof body.participantToken !== 'string' || body.participantToken.length < 8) {
    return NextResponse.json({ error: 'Invalid anonymous participant token.' }, { status: 400 });
  }

  const db = getAdminDb();
  const classRef = db.collection('schoolClasses').doc(code);
  const receiptId = hashSchoolSecret(body.participantToken);
  const receiptRef = classRef.collection('joinReceipts').doc(receiptId);

  const result = await db.runTransaction(async (transaction) => {
    const [classSnapshot, receiptSnapshot] = await Promise.all([transaction.get(classRef), transaction.get(receiptRef)]);
    if (!classSnapshot.exists) return { status: 404 as const, body: { error: 'Class not found.' } };
    const data = classSnapshot.data();
    if (!validRecord(data)) return { status: 409 as const, body: { error: 'Older School pilot room. Create a new classroom.' } };
    if (data.status !== 'active') return { status: 409 as const, body: { error: 'Class is closed.' } };
    if (receiptSnapshot.exists) return { status: 200 as const, body: { joined: true, duplicate: true, joinedCount: data.joinedCount } };
    const next = applySchoolJoin(data);
    transaction.set(classRef, next);
    transaction.set(receiptRef, { createdAt: new Date().toISOString() });
    return { status: 200 as const, body: { joined: true, duplicate: false, joinedCount: next.joinedCount } };
  });

  return NextResponse.json(result.body, { status: result.status });
}
