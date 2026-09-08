import { NextResponse } from 'next/server';
import { getAdminDb } from '../../../../../lib/firebase-admin';
import {
  closeSchoolQuestion,
  configureSchoolClass,
  launchSchoolQuestion,
  nextSchoolQuestion,
  publicSchoolClassSummary,
  revealSchoolQuestion,
  teacherSchoolClassSummary,
  type SchoolClassRecord,
  verifyTeacherKey,
} from '../../../../../lib/school-aggregate';

async function codeFrom(context: { params: Promise<{ code: string }> }) {
  const { code } = await context.params;
  return code.trim().toUpperCase();
}

function bearer(request: Request) {
  const value = request.headers.get('authorization') ?? '';
  return value.startsWith('Bearer ') ? value.slice(7).trim() : '';
}

function validRecord(value: unknown): value is SchoolClassRecord {
  return Boolean(value && typeof value === 'object' && (value as { schemaVersion?: unknown }).schemaVersion === 2);
}

export async function GET(request: Request, context: { params: Promise<{ code: string }> }) {
  const code = await codeFrom(context);
  const snapshot = await getAdminDb().collection('schoolClasses').doc(code).get();
  if (!snapshot.exists) return NextResponse.json({ error: 'Class not found.' }, { status: 404 });
  const data = snapshot.data();
  if (!validRecord(data)) return NextResponse.json({ error: 'This pilot room uses an older School schema. Create a new classroom.' }, { status: 409 });
  const teacherKey = bearer(request);
  if (!teacherKey) return NextResponse.json(publicSchoolClassSummary(data));
  if (!verifyTeacherKey(data, teacherKey)) return NextResponse.json({ error: 'Invalid teacher key.' }, { status: 403 });
  return NextResponse.json(teacherSchoolClassSummary(data));
}

export async function PATCH(request: Request, context: { params: Promise<{ code: string }> }) {
  const code = await codeFrom(context);
  const ref = getAdminDb().collection('schoolClasses').doc(code);
  const snapshot = await ref.get();
  if (!snapshot.exists) return NextResponse.json({ error: 'Class not found.' }, { status: 404 });
  const data = snapshot.data();
  if (!validRecord(data)) return NextResponse.json({ error: 'This pilot room uses an older School schema. Create a new classroom.' }, { status: 409 });
  const teacherKey = bearer(request);
  if (!teacherKey || !verifyTeacherKey(data, teacherKey)) return NextResponse.json({ error: 'Invalid teacher key.' }, { status: 403 });
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body || typeof body.action !== 'string') return NextResponse.json({ error: 'Missing teacher action.' }, { status: 400 });

  let next: SchoolClassRecord = data;
  try {
    if (body.action === 'status') {
      if (body.status !== 'active' && body.status !== 'closed') throw new Error('Status must be active or closed.');
      next = { ...data, status: body.status };
    } else if (body.action === 'configure') {
      next = configureSchoolClass(data, body.activity);
    } else if (body.action === 'launch') {
      if (typeof body.questionId !== 'string') throw new Error('Question ID required.');
      next = launchSchoolQuestion(data, body.questionId);
    } else if (body.action === 'closeQuestion') {
      next = closeSchoolQuestion(data);
    } else if (body.action === 'reveal') {
      next = revealSchoolQuestion(data, body.revealed !== false);
    } else if (body.action === 'next') {
      next = nextSchoolQuestion(data);
    } else {
      throw new Error('Unknown teacher action.');
    }
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Invalid teacher action.' }, { status: 400 });
  }

  await ref.set(next);
  return NextResponse.json(teacherSchoolClassSummary(next));
}
