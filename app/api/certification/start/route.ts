import { randomBytes } from 'node:crypto';
import { NextResponse } from 'next/server';
import { authenticatedCertificationUser } from '../../../../lib/auth-session';
import { certificationReadiness, createCertifiedPlans, newAttemptId, publicCertifiedQuestion } from '../../../../lib/certification-server';
import { getAdminDb } from '../../../../lib/firebase-admin';
import { literacyMasterBankCandidates } from '../../../../lib/literacy-master-bank';

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: 'CROSS_SITE_REQUEST' }, { status: 403 });
  const user = await authenticatedCertificationUser();
  if (!user) return NextResponse.json({ error: 'SIGN_IN_REQUIRED' }, { status: 401 });
  if (!user.emailVerified) return NextResponse.json({ error: 'EMAIL_VERIFICATION_REQUIRED' }, { status: 403 });
  if (!user.certificationAgeConfirmed) return NextResponse.json({ error: 'CERTIFICATION_AGE_CONFIRMATION_REQUIRED' }, { status: 403 });
  const readiness = certificationReadiness();
  if (!readiness.enabled) return NextResponse.json({ error: 'CERTIFICATION_NOT_RELEASED' }, { status: 503 });
  if (!readiness.bankReady) return NextResponse.json({ error: 'CERTIFIED_BANK_NOT_READY' }, { status: 503 });

  const db = getAdminDb();
  const guardRef = db.collection('certificationAttemptGuards').doc(user.uid);
  const attemptId = newAttemptId();
  const attemptRef = db.collection('certificationAttempts').doc(attemptId);
  const seed = randomBytes(24).toString('base64url');
  const now = new Date();
  const nowIso = now.toISOString();

  const created = await db.runTransaction(async (transaction) => {
    const guardSnapshot = await transaction.get(guardRef);
    const guard = guardSnapshot.data() ?? {};
    const activeStarts = Array.isArray(guard.recentAttemptStarts)
      ? guard.recentAttemptStarts.filter((value: unknown): value is string => typeof value === 'string' && new Date(value).getTime() > now.getTime() - 24 * 60 * 60 * 1000)
      : [];
    if (activeStarts.length >= 2) return { blocked: true as const, activeStarts };

    let previous: { shownQuestionIds: string[]; incorrectQuestionIds: string[] } | undefined;
    if (typeof guard.lastAttemptId === 'string') {
      const previousSnapshot = await transaction.get(db.collection('certificationAttempts').doc(guard.lastAttemptId));
      const data = previousSnapshot.data();
      if (data && Array.isArray(data.questionIds) && Array.isArray(data.incorrectQuestionIds)) {
        previous = { shownQuestionIds: data.questionIds, incorrectQuestionIds: data.incorrectQuestionIds };
      }
    }
    const plans = createCertifiedPlans(seed, previous);
    if (!plans.classify.ok || !plans.understand.ok) return { unavailable: true as const };
    const questionIds = [...plans.classify.plan.questionIds, ...plans.understand.plan.questionIds];
    transaction.set(attemptRef, {
      uid: user.uid,
      status: 'in_progress',
      language: 'en',
      bankVersion: readiness.bankVersion,
      blueprintVersions: [plans.classify.plan.blueprintVersion, plans.understand.plan.blueprintVersion],
      questionIds,
      startedAt: nowIso,
      expiresAt: new Date(now.getTime() + 90 * 60 * 1000).toISOString(),
      incorrectQuestionIds: [],
    });
    transaction.set(guardRef, { recentAttemptStarts: [...activeStarts, nowIso], lastAttemptId: attemptId, updatedAt: nowIso }, { merge: true });
    return { attemptId, questionIds, expiresAt: new Date(now.getTime() + 90 * 60 * 1000).toISOString() };
  });

  if ('blocked' in created) return NextResponse.json({ error: 'ATTEMPT_LIMIT_REACHED', attempts: created.activeStarts }, { status: 429 });
  if ('unavailable' in created) return NextResponse.json({ error: 'RETEST_BLUEPRINT_UNAVAILABLE' }, { status: 409 });
  const bank = new Map(literacyMasterBankCandidates.map((question) => [question.id, question]));
  return NextResponse.json({
    attemptId: created.attemptId,
    expiresAt: created.expiresAt,
    questions: created.questionIds.map((id) => publicCertifiedQuestion(bank.get(id)!)),
  }, { headers: { 'Cache-Control': 'no-store' } });
}
