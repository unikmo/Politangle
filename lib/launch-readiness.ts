import { certificationReadiness } from './certification-server';

export type ReadinessCheck = {
  id: string;
  label: string;
  ready: boolean;
  owner: 'founder' | 'legal' | 'research';
  action: string;
};

function present(value: string | undefined) {
  const normalized = value?.trim() ?? '';
  return Boolean(normalized && !normalized.startsWith('your-') && !normalized.includes('...'));
}

export function launchReadiness() {
  const firebaseServer = present(process.env.FIREBASE_SERVICE_ACCOUNT_JSON) || (
    present(process.env.FIREBASE_PROJECT_ID) &&
    present(process.env.FIREBASE_CLIENT_EMAIL) &&
    present(process.env.FIREBASE_PRIVATE_KEY)
  );
  const certification = certificationReadiness();
  const checks: ReadinessCheck[] = [
    { id: 'firebase-server', label: 'Firebase server credentials', ready: firebaseServer, owner: 'founder', action: 'Add the Firebase service account to Netlify environment variables.' },
    { id: 'firebase-client', label: 'Firebase browser authentication', ready: present(process.env.NEXT_PUBLIC_FIREBASE_API_KEY), owner: 'founder', action: 'Add the Firebase Web API key and authorize politangle.org in Firebase.' },
    { id: 'admin-access', label: 'Initial administrator', ready: present(process.env.POLITANGLE_ADMIN_UIDS) || present(process.env.POLITANGLE_ADMIN_EMAILS), owner: 'founder', action: 'Configure at least one admin UID or verified bootstrap email.' },
    { id: 'contact-email', label: 'Monitored direct contact', ready: present(process.env.NEXT_PUBLIC_CONTACT_EMAIL), owner: 'founder', action: 'Publish a monitored Politangle email for legal and privacy requests.' },
    { id: 'legal-review', label: 'Legal notices approved', ready: process.env.LEGAL_REVIEW_APPROVED === 'true', owner: 'legal', action: 'Have qualified counsel approve the exact privacy, terms and imprint version.' },
    { id: 'accessibility-audit', label: 'Accessibility audit signed off', ready: process.env.ACCESSIBILITY_AUDIT_APPROVED === 'true', owner: 'founder', action: 'Complete and record the WCAG 2.2 AA audit and device checks.' },
    { id: 'school-release', label: 'School privacy package approved', ready: process.env.SCHOOL_RELEASE_APPROVED === 'true', owner: 'legal', action: 'Approve school roles, retention, the DPIA decision and agreements before real-student use.' },
    { id: 'certification-bank', label: '40+40 certification bank validated', ready: certification.bankReady, owner: 'research', action: 'Complete the documented evidence chain and final bank freeze.' },
    { id: 'certification-switch', label: 'Certification release switch', ready: certification.enabled, owner: 'founder', action: 'Enable only after the bank and non-payment launch gates are approved.' },
  ];
  return { ready: checks.every((check) => check.ready), readyCount: checks.filter((check) => check.ready).length, totalCount: checks.length, checks };
}
