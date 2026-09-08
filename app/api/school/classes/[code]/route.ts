import { NextResponse } from 'next/server';
import { getAdminDb } from '../../../../../lib/firebase-admin';
import { publicSchoolClassSummary, teacherSchoolClassSummary, type SchoolClassRecord, verifyTeacherKey } from '../../../../../lib/school-aggregate';

async function codeFrom(context: { params: Promise<{ code: string }> }) {
  const { code } = await context.params;
  return code.trim().toUpperCase();
}

function bearer(request: Request) {
  const value = request.headers.get('authorization') ?? '';
  return value.startsWith('Bearer ') ? value.slice(7).trim() : '';
}

export async function GET(request: Request, context: { params: Promise<{ code: string }> }) {
  const code = await codeFrom(context);
  const snapshot = await getAdminDb().collection('schoolClasses').doc(code).get();
  if (!snapshot.exists) return NextResponse.json({ error: 'Class not found.' }, { status: 404 });
  const record = snapshot.data() as SchoolClassRecord;
  const teacherKey = bearer(request);
  if (!teacherKey) return NextResponse.json(publicSchoolClassSummary(record));
  if (!verifyTeacherKey(record, teacherKey)) return NextResponse.json({ error: 'Invalid teacher key.' }, { status: 403 });
  return NextResponse.json(teacherSchoolClassSummary(record));
}

export async function PATCH(request: Request, context: { params: Promise<{ code: string }> }) {
  const code = await codeFrom(context);
  const ref = getAdminDb().collection('schoolClasses').doc(code);
  const snapshot = await ref.get();
  if (!snapshot.exists) return NextResponse.json({ error: 'Class not found.' }, { status: 404 });
  const record = snapshot.data() as SchoolClassRecord;
  const teacherKey = bearer(request);
  if (!teacherKey || !verifyTeacherKey(record, teacherKey)) return NextResponse.json({ error: 'Invalid teacher key.' }, { status: 403 });
  const body = await request.json().catch(() => null) as { status?: unknown } | null;
  if (!body || (body.status !== 'active' && body.status !== 'closed')) return NextResponse.json({ error: 'Status must be active or closed.' }, { status: 400 });
  await ref.update({ status: body.status });
  return NextResponse.json({ ...teacherSchoolClassSummary({ ...record, status: body.status }), status: body.status });
}
