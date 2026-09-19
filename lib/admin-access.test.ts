import assert from 'node:assert/strict';
import test from 'node:test';
import { isConfiguredAdmin } from './admin-access';

function withAdminEnv<T>(values: { uids?: string; emails?: string }, run: () => T) {
  const previousUids = process.env.POLITANGLE_ADMIN_UIDS;
  const previousEmails = process.env.POLITANGLE_ADMIN_EMAILS;
  process.env.POLITANGLE_ADMIN_UIDS = values.uids ?? '';
  process.env.POLITANGLE_ADMIN_EMAILS = values.emails ?? '';
  try { return run(); }
  finally {
    if (previousUids == null) delete process.env.POLITANGLE_ADMIN_UIDS; else process.env.POLITANGLE_ADMIN_UIDS = previousUids;
    if (previousEmails == null) delete process.env.POLITANGLE_ADMIN_EMAILS; else process.env.POLITANGLE_ADMIN_EMAILS = previousEmails;
  }
}

test('admin custom claim always grants admin access', () => {
  withAdminEnv({}, () => assert.equal(isConfiguredAdmin({ uid: 'u1', admin: true }), true));
});

test('configured UID grants admin access', () => {
  withAdminEnv({ uids: 'u1,u2' }, () => assert.equal(isConfiguredAdmin({ uid: 'u2' }), true));
});

test('configured email requires Firebase email verification', () => {
  withAdminEnv({ emails: 'founder@example.com' }, () => {
    assert.equal(isConfiguredAdmin({ uid: 'u1', email: 'founder@example.com', email_verified: false }), false);
    assert.equal(isConfiguredAdmin({ uid: 'u1', email: 'Founder@Example.com', email_verified: true }), true);
  });
});

test('unconfigured identity cannot become admin', () => {
  withAdminEnv({ uids: 'u1', emails: 'founder@example.com' }, () => {
    assert.equal(isConfiguredAdmin({ uid: 'other', email: 'other@example.com', email_verified: true }), false);
  });
});
