import { NextResponse } from 'next/server';
import { authenticatedCertificationUser } from '../../../../lib/auth-session';
import { certificatePrice, getStripeClient, stripeIntegrationIdentifier } from '../../../../lib/stripe-server';
import { getAdminDb } from '../../../../lib/firebase-admin';

function cleanName(value: unknown) {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u001f\u007f]/g, '').replace(/\s+/g, ' ').trim().slice(0, 80);
}

export async function POST(request: Request) {
  const user = await authenticatedCertificationUser();
  if (!user) return NextResponse.json({ error: 'SIGN_IN_REQUIRED' }, { status: 401 });
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: 'CROSS_SITE_REQUEST' }, { status: 403 });
  if (process.env.STRIPE_TAX_READY !== 'true') return NextResponse.json({ error: 'TAX_CONFIGURATION_NOT_APPROVED' }, { status: 503 });
  const input = await request.json().catch(() => ({})) as { attemptId?: unknown; holderName?: unknown; verificationAcknowledged?: unknown; renewCertificateId?: unknown };
  const attemptId = typeof input.attemptId === 'string' ? input.attemptId : '';
  const holderName = cleanName(input.holderName);
  if (!/^att_[A-Za-z0-9_-]{32}$/.test(attemptId) || holderName.length < 2) return NextResponse.json({ error: 'INVALID_CERTIFICATE_DETAILS' }, { status: 400 });
  if (input.verificationAcknowledged !== true) return NextResponse.json({ error: 'VERIFICATION_ACKNOWLEDGEMENT_REQUIRED' }, { status: 400 });

  const db = getAdminDb();
  const eligibilityRef = db.collection('certificateEligibilities').doc(attemptId);
  const eligibilitySnapshot = await eligibilityRef.get();
  const eligibility = eligibilitySnapshot.data();
  if (!eligibility || eligibility.uid !== user.uid || eligibility.status !== 'eligible') return NextResponse.json({ error: 'NOT_ELIGIBLE' }, { status: 403 });

  let kind: 'issuance' | 'renewal' = 'issuance';
  let renewedFrom: string | null = null;
  if (typeof input.renewCertificateId === 'string') {
    const oldSnapshot = await db.collection('certificates').doc(input.renewCertificateId).get();
    const old = oldSnapshot.data();
    if (!old || old.uid !== user.uid || new Date(old.expiresAt).getTime() > Date.now()) return NextResponse.json({ error: 'RENEWAL_NOT_AVAILABLE' }, { status: 400 });
    kind = 'renewal'; renewedFrom = input.renewCertificateId;
  }

  const issuanceId = `iss_${attemptId.slice(4)}`;
  const pendingRef = db.collection('certificateIssuances').doc(issuanceId);
  const priceCents = certificatePrice(kind);
  const existingSnapshot = await pendingRef.get();
  const existing = existingSnapshot.data();
  let checkoutGeneration = typeof existing?.checkoutGeneration === 'number' ? existing.checkoutGeneration : 1;
  if (existing) {
    if (existing.uid !== user.uid || existing.attemptId !== attemptId || existing.kind !== kind) return NextResponse.json({ error: 'CHECKOUT_CONFLICT' }, { status: 409 });
    if (existing.status === 'issued') return NextResponse.json({ error: 'CERTIFICATE_ALREADY_ISSUED', certificateId: existing.certificateId }, { status: 409 });
    if (typeof existing.stripeSessionId === 'string') {
      try {
        const session = await getStripeClient().checkout.sessions.retrieve(existing.stripeSessionId);
        if (session.status === 'open' && session.url) return NextResponse.json({ url: session.url });
        if (session.status === 'expired') checkoutGeneration += 1;
      } catch { /* create or recover the checkout below */ }
    }
  }
  const now = new Date().toISOString();
  await pendingRef.set({ issuanceId, uid: user.uid, attemptId, holderName, verificationAcknowledgedAt: now, kind, renewedFrom, priceCents, currency: 'eur', checkoutGeneration, status: 'checkout_pending', createdAt: existing?.createdAt ?? now, updatedAt: now }, { merge: true });
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;
    const session = await getStripeClient().checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        quantity: 1,
        price_data: {
          currency: 'eur', unit_amount: priceCents, tax_behavior: 'inclusive',
          product_data: { name: kind === 'renewal' ? 'Politangle Political Literacy Certificate renewal' : 'Politangle Political Literacy Certificate' },
        },
      }],
      automatic_tax: { enabled: true },
      customer_creation: 'always',
      metadata: { issuanceId },
      integration_identifier: stripeIntegrationIdentifier(),
      success_url: `${siteUrl}/certificate/issue/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/certificate/issue?attempt=${encodeURIComponent(attemptId)}`,
    }, { idempotencyKey: `politangle-certificate-${attemptId}-${checkoutGeneration}` });
    if (!session.url) throw new Error('Stripe did not return a checkout URL.');
    await pendingRef.update({ stripeSessionId: session.id, status: 'checkout_open', updatedAt: new Date().toISOString() });
    return NextResponse.json({ url: session.url });
  } catch {
    await pendingRef.update({ status: 'checkout_failed', updatedAt: new Date().toISOString() });
    return NextResponse.json({ error: 'CHECKOUT_UNAVAILABLE' }, { status: 503 });
  }
}
