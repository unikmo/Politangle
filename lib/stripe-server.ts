import { randomBytes } from 'node:crypto';
import Stripe from 'stripe';
import { POLITANGLE_PRODUCT_DECISIONS } from './product-decisions';

let client: Stripe | null = null;

export function getStripeClient() {
  const key = process.env.STRIPE_RESTRICTED_KEY;
  if (!key) throw new Error('Stripe is not configured.');
  client ??= new Stripe(key, { apiVersion: '2026-08-26.dahlia', typescript: true });
  return client;
}

export function certificatePrice(kind: 'issuance' | 'renewal') {
  const price = kind === 'renewal'
    ? POLITANGLE_PRODUCT_DECISIONS.literacy.pricesEur.renewal
    : POLITANGLE_PRODUCT_DECISIONS.literacy.pricesEur.certificate;
  return Math.round(price * 100);
}

export function stripeIntegrationIdentifier() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const bytes = randomBytes(8);
  return `politangle_certificate_${[...bytes].map((value) => letters[value % letters.length]).join('')}`;
}
