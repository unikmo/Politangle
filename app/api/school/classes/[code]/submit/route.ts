import { NextResponse } from 'next/server';
import { getAdminDb } from '../../../../../../lib/firebase-admin';
import { applySchoolAggregate, hashSchoolSecret, type SchoolClassRecord, validateSchoolAggregatePayload } from '../../../../../../lib/school-aggregate';

async function codeFrom(context: { params: Promise<{ code: string }> }) {
  const { code } = await context.params;
  return code.trim().toUpperCase();
}

export async function POST(request: Request, context: { params: Promise<{ code: string }> }) {
  const code = await codeFrom(context);
  const raw = await request.json().catch(() => null);
  const payload = validateSchoolAggregatePayload(raw);
  if (!payload) return NextResponse.json({ error: 'Invalid school submission.' }, { status: 400 });

  const db = getAdminDb();
  const classRef = db.collection('schoolClasses').doc(code);
  const receiptId = hashSchoolSecret(`${payload.participantToken}:${payload.phase}`);
  const receiptRef = classRef.collection('receipts').doc(receiptId);

  const result = await db.runTransaction(async (transaction) => {
    const [classSnapshot, receiptSnapshot] = await Promise.all([
      transaction.get(classRef),
      transaction.get(receiptRef),
    ]);
    if (!classSnapshot.exists) return { status: 404 as const, body: { error: 'Class not found.' } };
    const record = classSnapshot.data() as SchoolClassRecord;
    if (record.status !== 'active') return { status: 409 as const, body: { error: 'Class is closed.' } };
    if (receiptSnapshot.exists) return { status: 200 as const, body: { accepted: true, duplicate: true } };

    const next = applySchoolAggregate(record, payload);
    transaction.set(classRef, next);
    transaction.set(receiptRef, { phase: payload.phase, createdAt: new Date().toISOString() });
    return { status: 200 as const, body: { accepted: true, duplicate: false } };
  });

  return NextResponse.json(result.body, { status: result.status });
}
