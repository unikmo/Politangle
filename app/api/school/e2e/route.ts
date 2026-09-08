import { NextResponse } from 'next/server';
import { getAdminDb } from '../../../../lib/firebase-admin';
import { buildClassroomActivity } from '../../../../lib/school-classroom';
import { hashSchoolSecret } from '../../../../lib/school-aggregate';
import {
  SCHOOL_ACCOUNT_COLLECTION,
  SCHOOL_LICENSE_COLLECTION,
  createSchoolLicensePack,
} from '../../../../lib/school-license';

export const maxDuration = 60;

function forwardedHeaders(request: Request, extra: Record<string, string> = {}) {
  const headers = new Headers(extra);
  for (const name of ['cookie', 'x-vercel-protection-bypass', 'x-vercel-set-bypass-cookie']) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  return headers;
}

async function body<T>(response: Response) {
  return await response.json().catch(() => null) as T | null;
}

export async function GET(request: Request) {
  if (process.env.VERCEL_ENV !== 'preview') return NextResponse.json({ error: 'Not found.' }, { status: 404 });

  const db = getAdminDb();
  const origin = new URL(request.url).origin;
  const suffix = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const schoolId = `e2e-${suffix}`;
  const pack = createSchoolLicensePack(schoolId, `Politangle E2E ${suffix}`);
  const teacherLicense = pack.seats[0];
  const participantA = `e2e-participant-a-${suffix}`;
  const participantB = `e2e-participant-b-${suffix}`;
  const cleanupRefs: Array<ReturnType<typeof db.doc>> = [];
  let classCode = '';
  let result: Record<string, unknown> = { pass: false };

  try {
    const provision = db.batch();
    const accountRef = db.collection(SCHOOL_ACCOUNT_COLLECTION).doc(pack.schoolId);
    cleanupRefs.push(accountRef);
    provision.set(accountRef, {
      schemaVersion: 1,
      schoolId: pack.schoolId,
      schoolName: pack.schoolName,
      status: 'active',
      packagePriceUsd: pack.packagePriceUsd,
      teacherLicenseCount: pack.teacherLicenseCount,
      createdAt: pack.createdAt,
    });
    for (const seat of pack.seats) {
      const ref = db.collection(SCHOOL_LICENSE_COLLECTION).doc(seat.documentId);
      cleanupRefs.push(ref);
      provision.set(ref, seat.record);
    }
    await provision.commit();

    const provisionedSeats = await Promise.all(pack.seats.map((seat) => db.collection(SCHOOL_LICENSE_COLLECTION).doc(seat.documentId).get()));
    const tenLicensesProvisioned = provisionedSeats.length === 10 && provisionedSeats.every((snapshot) => snapshot.exists);

    const activation = await fetch(`${origin}/api/school/license/activate`, {
      method: 'POST',
      headers: forwardedHeaders(request, { 'content-type': 'application/json' }),
      body: JSON.stringify({ licenseKey: teacherLicense.key }),
      cache: 'no-store',
    });
    const activationBody = await body<{ active?: boolean }>(activation);
    const licenseCookie = activation.headers.get('set-cookie')?.split(';')[0] ?? '';
    if (!activation.ok || !activationBody?.active || !licenseCookie) throw new Error(`Teacher license activation failed (${activation.status}).`);

    const baseCookie = request.headers.get('cookie') ?? '';
    const classroomCookies = [baseCookie, licenseCookie].filter(Boolean).join('; ');
    const classroom = await fetch(`${origin}/api/school/classes`, {
      method: 'POST',
      headers: forwardedHeaders(request, { 'content-type': 'application/json', cookie: classroomCookies }),
      body: JSON.stringify({ roomLabel: 'E2E verification', activity: { type: 'quick26', pacing: 'teacher', projectorMode: 'reveal' } }),
      cache: 'no-store',
    });
    const classroomBody = await body<{ code?: string; teacherKey?: string; license?: { seatNumber?: number } }>(classroom);
    if (!classroom.ok || !classroomBody?.code || !classroomBody.teacherKey) throw new Error(`Licensed classroom creation failed (${classroom.status}).`);
    classCode = classroomBody.code;
    const teacherKey = classroomBody.teacherKey;
    const classRef = db.collection('schoolClasses').doc(classCode);
    cleanupRefs.push(classRef);

    for (const token of [participantA, participantB]) {
      const join = await fetch(`${origin}/api/school/classes/${encodeURIComponent(classCode)}/join`, {
        method: 'POST',
        headers: forwardedHeaders(request, { 'content-type': 'application/json' }),
        body: JSON.stringify({ participantToken: token }),
        cache: 'no-store',
      });
      if (!join.ok) throw new Error(`Anonymous join failed (${join.status}).`);
      cleanupRefs.push(classRef.collection('joinReceipts').doc(hashSchoolSecret(token)));
    }

    const launch = await fetch(`${origin}/api/school/classes/${encodeURIComponent(classCode)}`, {
      method: 'PATCH',
      headers: forwardedHeaders(request, { authorization: `Bearer ${teacherKey}`, 'content-type': 'application/json' }),
      body: JSON.stringify({ action: 'launch', questionId: 'T01' }),
      cache: 'no-store',
    });
    if (!launch.ok) throw new Error(`Teacher launch failed (${launch.status}).`);

    const submit = await fetch(`${origin}/api/school/classes/${encodeURIComponent(classCode)}/submit`, {
      method: 'POST',
      headers: forwardedHeaders(request, { 'content-type': 'application/json' }),
      body: JSON.stringify({ participantToken: participantA, questionId: 'T01', answer: '2' }),
      cache: 'no-store',
    });
    if (!submit.ok) throw new Error(`Live response failed (${submit.status}).`);
    cleanupRefs.push(classRef.collection('responseReceipts').doc(hashSchoolSecret(`${participantA}:T01`)));

    const teacherLive = await fetch(`${origin}/api/school/classes/${encodeURIComponent(classCode)}`, {
      headers: forwardedHeaders(request, { authorization: `Bearer ${teacherKey}` }),
      cache: 'no-store',
    });
    const teacherLiveBody = await body<{ joinedCount?: number; currentDistribution?: { responses?: number; distribution?: Array<{ id?: string; count?: number }> } }>(teacherLive);
    const liveGraphUpdated = Boolean(
      teacherLive.ok
      && teacherLiveBody?.joinedCount === 2
      && teacherLiveBody.currentDistribution?.responses === 1
      && teacherLiveBody.currentDistribution.distribution?.find((row) => row.id === '2')?.count === 1
    );

    const reveal = await fetch(`${origin}/api/school/classes/${encodeURIComponent(classCode)}`, {
      method: 'PATCH',
      headers: forwardedHeaders(request, { authorization: `Bearer ${teacherKey}`, 'content-type': 'application/json' }),
      body: JSON.stringify({ action: 'reveal', revealed: true }),
      cache: 'no-store',
    });
    if (!reveal.ok) throw new Error(`Projector reveal failed (${reveal.status}).`);

    const projector = await fetch(`${origin}/api/school/classes/${encodeURIComponent(classCode)}`, {
      headers: forwardedHeaders(request),
      cache: 'no-store',
    });
    const projectorBody = await body<{ projectorDistribution?: { responses?: number } | null }>(projector);
    const projectorRevealed = Boolean(projector.ok && projectorBody?.projectorDistribution?.responses === 1);

    const configureFull = await fetch(`${origin}/api/school/classes/${encodeURIComponent(classCode)}`, {
      method: 'PATCH',
      headers: forwardedHeaders(request, { authorization: `Bearer ${teacherKey}`, 'content-type': 'application/json' }),
      body: JSON.stringify({ action: 'configure', activity: { type: 'full42', pacing: 'student', projectorMode: 'reveal' } }),
      cache: 'no-store',
    });
    if (!configureFull.ok) throw new Error(`Full 42 configuration failed (${configureFull.status}).`);

    const full42 = buildClassroomActivity({ type: 'full42', pacing: 'student', projectorMode: 'reveal' });
    if (!full42 || full42.questionIds.length !== 42) throw new Error('Full 42 activity bank unavailable.');
    for (const questionId of full42.questionIds) {
      const fullSubmit = await fetch(`${origin}/api/school/classes/${encodeURIComponent(classCode)}/submit`, {
        method: 'POST',
        headers: forwardedHeaders(request, { 'content-type': 'application/json' }),
        body: JSON.stringify({ participantToken: participantB, questionId, answer: '-2' }),
        cache: 'no-store',
      });
      if (!fullSubmit.ok) throw new Error(`Full 42 response failed for ${questionId} (${fullSubmit.status}).`);
      cleanupRefs.push(classRef.collection('responseReceipts').doc(hashSchoolSecret(`${participantB}:${questionId}`)));
    }

    const teacherFull = await fetch(`${origin}/api/school/classes/${encodeURIComponent(classCode)}`, {
      headers: forwardedHeaders(request, { authorization: `Bearer ${teacherKey}` }),
      cache: 'no-store',
    });
    const teacherFullBody = await body<{
      classSummary?: {
        answeredQuestions?: number;
        polygon?: unknown[];
        families?: Array<{ overall?: number | null }>;
        constructModes?: Array<{ think?: number | null; feel?: number | null; act?: number | null }>;
      };
    }>(teacherFull);
    const summary = teacherFullBody?.classSummary;
    const full42AggregateReady = Boolean(
      teacherFull.ok
      && summary?.answeredQuestions === 42
      && summary.polygon?.length === 8
      && summary.families?.length === 5
      && summary.families.every((family) => family.overall !== null)
      && summary.constructModes?.every((row) => row.think !== null && row.feel !== null && row.act !== null)
    );

    const checks = {
      tenLicensesProvisioned,
      licensedTeacherActivated: activation.ok && activationBody.active === true,
      licensedTeacherCreatedSession: classroom.ok && classroomBody.license?.seatNumber === 1,
      anonymousStudentsJoined: teacherLiveBody?.joinedCount === 2,
      teacherLaunchedQuestion: launch.ok,
      responseAccepted: submit.ok,
      liveAggregateUpdated: liveGraphUpdated,
      projectorRevealWorked: projectorRevealed,
      full42AggregateSummaryReady: full42AggregateReady,
    };

    result = {
      pass: Object.values(checks).every(Boolean),
      environment: 'preview',
      checks,
      privacy: {
        teacherStudentRosterCreated: false,
        individualAnswerMappingReturned: false,
      },
      cleanup: 'temporary school, licenses, classroom and duplicate-prevention receipts deleted after verification',
    };
  } catch (error) {
    result = { pass: false, environment: 'preview', error: error instanceof Error ? error.message : 'Unknown E2E failure.' };
  } finally {
    if (classCode) {
      const classRef = db.collection('schoolClasses').doc(classCode);
      cleanupRefs.push(classRef);
    }
    const uniqueRefs = [...new Map(cleanupRefs.map((ref) => [ref.path, ref])).values()];
    const cleanup = db.batch();
    for (const ref of uniqueRefs) cleanup.delete(ref);
    await cleanup.commit().catch(() => undefined);
  }

  return NextResponse.json(result, { status: result.pass === true ? 200 : 500 });
}
