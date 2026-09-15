import type Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { certificateDates, newCertificateId } from '../../../../lib/certificate-server';
import { getAdminDb } from '../../../../lib/firebase-admin';
import { getStripeClient } from '../../../../lib/stripe-server';

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !secret) return NextResponse.json({ error: 'WEBHOOK_NOT_CONFIGURED' }, { status: 503 });
  let event: Stripe.Event;
  try { event = getStripeClient().webhooks.constructEvent(await request.text(), signature, secret); }
  catch { return NextResponse.json({ error: 'INVALID_SIGNATURE' }, { status: 400 }); }
  if (event.type !== 'checkout.session.completed') return NextResponse.json({ received: true });
  const session = event.data.object;
  const issuanceId = session.metadata?.issuanceId;
  if (!issuanceId || session.payment_status !== 'paid') return NextResponse.json({ received: true });

  const db = getAdminDb();
  const issuanceRef = db.collection('certificateIssuances').doc(issuanceId);
  const certificateId = newCertificateId();
  const certificateRef = db.collection('certificates').doc(certificateId);
  await db.runTransaction(async (transaction) => {
    const issuanceSnapshot = await transaction.get(issuanceRef);
    const issuance = issuanceSnapshot.data();
    if (!issuance || issuance.status === 'issued') return;
    if (issuance.stripeSessionId !== session.id) throw new Error('Stripe session does not match issuance.');
    const eligibilityRef = db.collection('certificateEligibilities').doc(issuance.attemptId);
    const eligibilitySnapshot = await transaction.get(eligibilityRef);
    const eligibility = eligibilitySnapshot.data();
    if (!eligibility || eligibility.uid !== issuance.uid || eligibility.status !== 'eligible') throw new Error('Eligibility is no longer valid.');
    const dates = certificateDates();
    transaction.set(certificateRef, { certificateId, uid: issuance.uid, holderName: issuance.holderName, scores: eligibility.scores, bankVersion: eligibility.bankVersion, language: eligibility.language, ...dates, revokedAt: null, renewedFrom: issuance.renewedFrom, stripeSessionId: session.id, createdAt: dates.issuedAt });
    transaction.update(eligibilityRef, { status: 'issued', certificateId, issuedAt: dates.issuedAt });
    transaction.update(issuanceRef, { status: 'issued', certificateId, issuedAt: dates.issuedAt });
  });
  return NextResponse.json({ received: true });
}
