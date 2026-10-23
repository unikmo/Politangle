import {schoolStudentPilotEnabled} from '../../../../../../lib/school-release';
import { approvedClassroomPilot } from '../../../../../../lib/school-pilot-server';
import { NextResponse } from 'next/server';
import { getAdminDb } from '../../../../../../lib/firebase-admin';
import { validateClassroomResponse } from '../../../../../../lib/school-classroom';
import { applySchoolResponse, hashSchoolSecret, schoolRoomExpired, schoolRoomExpiryDate, type SchoolClassRecord } from '../../../../../../lib/school-aggregate';

async function codeFrom(context: { params: Promise<{ code: string }> }) {
  const { code } = await context.params;
  return code.trim().toUpperCase();
}

function validRecord(value: unknown): value is SchoolClassRecord {
  return Boolean(value && typeof value === 'object' && (value as { schemaVersion?: unknown }).schemaVersion === 2);
}

export async function POST(request: Request, context: { params: Promise<{ code: string }> }) {
  if (!schoolStudentPilotEnabled()) return NextResponse.json({error:'School student pilot is not yet enabled.'},{status:403});
  const code = await codeFrom(context);
  if (!/^[A-HJ-NP-Z2-9]{6}$/.test(code)) return NextResponse.json({error:'Invalid classroom code.'},{status:400});
  const raw = await request.json().catch(() => null);
  const receiptInput = raw && typeof raw === 'object' ? raw as { participantToken?: unknown; questionId?: unknown } : null;
  if (!receiptInput || typeof receiptInput.participantToken !== 'string' || receiptInput.participantToken.length<8 || receiptInput.participantToken.length>128 || typeof receiptInput.questionId !== 'string') {
    return NextResponse.json({ error: 'Invalid classroom response.' }, { status: 400 });
  }
  const db = getAdminDb();
  const room=await db.collection('schoolClasses').doc(code).get();
  if(!room.exists) return NextResponse.json({error:'Class not found.'},{status:404});
  if (!(await approvedClassroomPilot(room.data()))) return NextResponse.json({error:'School pilot access is not approved.'},{status:403});
  const classRef = db.collection('schoolClasses').doc(code);
  const joinRef=classRef.collection('joinReceipts').doc(hashSchoolSecret(receiptInput.participantToken));
  const receiptId = hashSchoolSecret(`${receiptInput.participantToken}:${receiptInput.questionId}`);
  const receiptRef = classRef.collection('responseReceipts').doc(receiptId);

  const result = await db.runTransaction(async (transaction) => {
    const [classSnapshot, receiptSnapshot, joinedSnapshot] = await Promise.all([transaction.get(classRef), transaction.get(receiptRef), transaction.get(joinRef)]);
    if (!classSnapshot.exists) return { status: 404 as const, body: { error: 'Class not found.' } };
    const data = classSnapshot.data();
    if (!validRecord(data)) return { status: 409 as const, body: { error: 'Older School pilot room. Create a new classroom.' } };
    const payload = validateClassroomResponse(raw, data.activity.ageBand);
    if (!payload) return { status: 400 as const, body: { error: 'Invalid classroom response.' } };
    if (data.status !== 'active') return { status: 409 as const, body: { error: 'Class is closed.' } };
    if (schoolRoomExpired(data)) return {status:410 as const,body:{error:'School pilot classroom has expired.'}};
    if (!joinedSnapshot.exists) return {status:403 as const,body:{error:'Join this classroom before submitting answers.'}};
    if (!data.activity.questionIds.includes(payload.questionId)) return { status: 409 as const, body: { error: 'Question is not active in this classroom.' } };
    if (data.activity.pacing === 'teacher' && (!data.questionOpen || data.currentQuestionId !== payload.questionId)) return { status: 409 as const, body: { error: 'This question is not open.' } };
    if (receiptSnapshot.exists) return { status: 200 as const, body: { accepted: true, duplicate: true } };

    const next = applySchoolResponse(data, payload);
    transaction.set(classRef, next);
    transaction.set(receiptRef, { questionId: payload.questionId, createdAt: new Date().toISOString(), expiresAt: schoolRoomExpiryDate(data.createdAt) });
    return { status: 200 as const, body: { accepted: true, duplicate: false } };
  });

  return NextResponse.json(result.body, { status: result.status });
}
