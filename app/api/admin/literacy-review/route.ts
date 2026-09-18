import { NextResponse } from 'next/server';
import { authenticatedAdmin } from '../../../../lib/auth-session';
import { buildEditorialReviewLedger } from '../../../../lib/literacy-editorial-review';
import { LITERACY_MASTER_BANK_VERSION } from '../../../../lib/literacy-bank-schema';
import { literacyMasterBankCandidates } from '../../../../lib/literacy-master-bank';
import { getAdminDb } from '../../../../lib/firebase-admin';

const decisions = new Set(['approve', 'revise', 'replace', 'hold']);

function docId(questionId: string) {
  return `${LITERACY_MASTER_BANK_VERSION}__${questionId}`;
}

export async function GET() {
  const admin = await authenticatedAdmin();
  if (!admin) return NextResponse.json({ error: 'ADMIN_REQUIRED' }, { status: 403 });

  const editorial = buildEditorialReviewLedger(literacyMasterBankCandidates);
  const editorialById = new Map(editorial.map((entry) => [entry.questionId, entry]));
  const snapshot = await getAdminDb().collection('literacyFounderReviews').where('bankVersion', '==', LITERACY_MASTER_BANK_VERSION).get();
  const stored = new Map(snapshot.docs.map((document) => [document.data().questionId, document.data()]));

  const questions = literacyMasterBankCandidates.map((question) => {
    const editorialEntry = editorialById.get(question.id)!;
    const review = stored.get(question.id);
    const current = Boolean(review && review.contentFingerprint === editorialEntry.contentFingerprint);
    return {
      id: question.id,
      section: question.section,
      prompt: question.prompt,
      options: question.options,
      acceptedAnswerSets: question.acceptedAnswerSets,
      explanation: question.explanation,
      evidenceIds: question.evidenceIds,
      difficulty: question.difficulty,
      blueprintBucket: question.blueprintBucket,
      editorialNote: editorialEntry.note,
      contentFingerprint: editorialEntry.contentFingerprint,
      review: review ? {
        decision: review.decision,
        note: review.note ?? '',
        reviewedAt: review.reviewedAt,
        current,
      } : null,
    };
  });

  const currentReviews = questions.filter((question) => question.review?.current);
  const approved = currentReviews.filter((question) => question.review?.decision === 'approve').length;
  return NextResponse.json({
    bankVersion: LITERACY_MASTER_BANK_VERSION,
    total: questions.length,
    reviewed: currentReviews.length,
    approved,
    allReviewed: currentReviews.length === questions.length,
    allApproved: approved === questions.length,
    questions,
  }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request: Request) {
  const admin = await authenticatedAdmin();
  if (!admin) return NextResponse.json({ error: 'ADMIN_REQUIRED' }, { status: 403 });
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: 'CROSS_SITE_REQUEST' }, { status: 403 });

  const input = await request.json().catch(() => ({})) as { questionId?: unknown; decision?: unknown; note?: unknown };
  const questionId = typeof input.questionId === 'string' ? input.questionId : '';
  const decision = typeof input.decision === 'string' ? input.decision : '';
  const note = typeof input.note === 'string' ? input.note.trim().slice(0, 2000) : '';
  if (!decisions.has(decision)) return NextResponse.json({ error: 'INVALID_DECISION' }, { status: 400 });

  const question = literacyMasterBankCandidates.find((candidate) => candidate.id === questionId);
  if (!question) return NextResponse.json({ error: 'QUESTION_NOT_FOUND' }, { status: 404 });
  const editorial = buildEditorialReviewLedger([question])[0];
  const now = new Date().toISOString();

  await getAdminDb().collection('literacyFounderReviews').doc(docId(questionId)).set({
    bankVersion: LITERACY_MASTER_BANK_VERSION,
    questionId,
    contentFingerprint: editorial.contentFingerprint,
    decision,
    note,
    reviewedAt: now,
    reviewedBy: admin.uid,
  }, { merge: true });

  return NextResponse.json({ ok: true, questionId, decision, reviewedAt: now }, { headers: { 'Cache-Control': 'no-store' } });
}
