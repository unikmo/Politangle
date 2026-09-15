import { randomBytes } from 'node:crypto';
import { certificateExpiryDate } from './literacy-certification';

export type PublicCertificate = {
  certificateId: string;
  holderName: string;
  classifyScore: number;
  understandScore: number;
  issuedAt: string;
  expiresAt: string;
  bankVersion: string;
  language: string;
  status: 'VALID' | 'EXPIRED' | 'REVOKED';
};

export function newCertificateId() {
  return `cert_${randomBytes(24).toString('base64url')}`;
}

export function certificateDates(now = new Date()) {
  const issuedAt = now.toISOString();
  return { issuedAt, expiresAt: certificateExpiryDate(issuedAt) };
}

export function publicCertificate(certificateId: string, data: Record<string, unknown>, now = new Date()): PublicCertificate | null {
  if (typeof data.holderName !== 'string' || typeof data.issuedAt !== 'string' || typeof data.expiresAt !== 'string' || typeof data.bankVersion !== 'string' || typeof data.language !== 'string') return null;
  const scores = data.scores as { classify?: { correct?: unknown }; understand?: { correct?: unknown } } | undefined;
  if (typeof scores?.classify?.correct !== 'number' || typeof scores?.understand?.correct !== 'number') return null;
  const status = data.revokedAt ? 'REVOKED' : new Date(data.expiresAt).getTime() <= now.getTime() ? 'EXPIRED' : 'VALID';
  return { certificateId, holderName: data.holderName, classifyScore: scores.classify.correct, understandScore: scores.understand.correct, issuedAt: data.issuedAt, expiresAt: data.expiresAt, bankVersion: data.bankVersion, language: data.language, status };
}
