import { approvedClassroomPilot } from '../../../../../lib/school-pilot-server';
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
  schoolRoomExpired,
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
  if (!(await approvedClassroomPilot(data))) return NextResponse.json({error:'School pilot access is not approved.'},{status:403});
  if (schoolRoomExpired(data)) return NextResponse.json({error:'The school room has expired.'},{status:410});
  const teacherKey = bearer(request);
  if (!teacherKey) return NextResponse.json(publicSchoolClassSummary(data));
  if (!verifyTeacherKey(data, teacherKey)) return NextResponse.json({ error: 'Invalid teacher key.' }, { status: 403 });
  return NextResponse.json(teacherSchoolClassSummary(data));
}

export async function PATCH(request: Request, context: { params: Promise<{ code: string }> }) {
  const code = await codeFrom(context);
  const ref = getAdminDb().collection('schoolClasses').doc(code);
  const teacherKey = bearer(request);
  if (!teacherKey) return NextResponse.json({ error: 'Teacher key required.' }, { status: 403 });
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body || typeof body.action !== 'string') return NextResponse.json({ error: 'Missing teacher action.' }, { status: 400 });

  const existing = await ref.get();
  if (!existing.exists) return NextResponse.json({error:'Class not found.'},{status:404});
  if (!(await approvedClassroomPilot(existing.data()))) return NextResponse.json({error:'School pilot access is not approved.'},{status:403});

  try {
    const updated = await getAdminDb().runTransaction(async transaction => {
      const snapshot=await transaction.get(ref);
      if(!snapshot.exists)throw new Error('Class not found.');
      const data=snapshot.data();
      if(!validRecord(data))throw new Error('Older School pilot room. Create a new classroom.');
      if (!verifyTeacherKey(data,teacherKey))throw new Error('Invalid teacher key.');
      if (schoolRoomExpired(data)) throw new Error('The school room has expired.');
      let next:SchoolClassRecord=data;
      if(body.action==='status'){
        if(body.status!=='active' && body.status!=='closed')throw new Error('Status must be active or closed.');
        next={...data,status:body.status};
      }else if(body.action==='configure'){
        next=configureSchoolClass(data,body.activity);
      }else if(body.action==='launch'){
        if(typeof body.questionId!=='string')throw new Error('Question ID required.');
        next=launchSchoolQuestion(data,body.questionId);
      }else if(body.action==='closeQuestion'){
        next=closeSchoolQuestion(data);
      }else if(body.action==='reveal'){
        next=revealSchoolQuestion(data,body.revealed!==false);
      }else if(body.action==='next'){
        next=nextSchoolQuestion(data);
      }else throw new Error('Unknown teacher action.');
      // Transactional UPDATE, not SET: keep schoolId, teacherLicenseId and
      // expiresAt while students submit answers concurrently.
      transaction.update(ref, {...next});
      return next;
    });
    return NextResponse.json(teacherSchoolClassSummary(updated));
  } catch(error) {
    const message=error instanceof Error?error.message:'Unable to update classroom.';
    const status=message==='Invalid teacher key.'?403:message==='Class not found.'?404:400;
    return NextResponse.json({error:message},{status});
  }
}
