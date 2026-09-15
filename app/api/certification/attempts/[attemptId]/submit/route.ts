import { NextResponse } from 'next/server';
import { authenticatedCertificationUser } from '../../../../../../lib/auth-session';
import { scoreCertifiedAnswers } from '../../../../../../lib/certification-server';
import { getAdminDb } from '../../../../../../lib/firebase-admin';

export async function POST(request: Request, context: { params: Promise<{ attemptId: string }> }) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: 'CROSS_SITE_REQUEST' }, { status: 403 });
  const user = await authenticatedCertificationUser();
  if (!user) return NextResponse.json({ error: 'SIGN_IN_REQUIRED' }, { status: 401 });
  const { attemptId } = await context.params;
  if (!/^att_[A-Za-z0-9_-]{32}$/.test(attemptId)) return NextResponse.json({ error: 'INVALID_ATTEMPT' }, { status: 400 });
  const input = await request.json().catch(() => ({})) as { answers?: unknown };
  if (!input.answers || typeof input.answers !== 'object' || Array.isArray(input.answers)) return NextResponse.json({ error: 'INVALID_ANSWERS' }, { status: 400 });

  const db = getAdminDb();
  const attemptRef = db.collection('certificationAttempts').doc(attemptId);
  const snapshot = await attemptRef.get();
  const attempt = snapshot.data();
  if (!attempt || attempt.uid !== user.uid) return NextResponse.json({ error: 'ATTEMPT_NOT_FOUND' }, { status: 404 });
  if (attempt.status !== 'in_progress') return NextResponse.json({ error: 'ATTEMPT_ALREADY_SUBMITTED' }, { status: 409 });
  if (new Date(attempt.expiresAt).getTime() < Date.now()) return NextResponse.json({ error: 'ATTEMPT_EXPIRED' }, { status: 410 });
  const answers = input.answers as Record<string, readonly string[]>;
  let scored: ReturnType<typeof scoreCertifiedAnswers>;
  try {
    scored = scoreCertifiedAnswers(attempt.questionIds, answers);
  } catch {
    return NextResponse.json({ error: 'INCOMPLETE_OR_INVALID_ANSWERS' }, { status: 400 });
  }
  const incorrectQuestionIds = scored.reviews.filter((item) => !item.correct).map((item) => item.id);
  const completedAt = new Date().toISOString();
  const committed = await db.runTransaction(async (transaction) => {
    const current = await transaction.get(attemptRef);
    if (current.data()?.status !== 'in_progress') return false;
    transaction.update(attemptRef, {
      status: scored.result.passed ? 'passed' : 'failed',
      completedAt,
      scores: scored.result,
      incorrectQuestionIds,
    });
    if (scored.result.passed) {
      transaction.set(db.collection('certificateEligibilities').doc(attemptId), {
        uid: user.uid,
        attemptId,
        status: 'eligible',
        createdAt: completedAt,
        bankVersion: attempt.bankVersion,
        language: attempt.language,
        scores: scored.result,
      });
    }
    return true;
  });
  if (!committed) return NextResponse.json({ error: 'ATTEMPT_ALREADY_SUBMITTED' }, { status: 409 });
  return NextResponse.json({ ...scored, certificateEligible: scored.result.passed }, { headers: { 'Cache-Control': 'no-store' } });
}
