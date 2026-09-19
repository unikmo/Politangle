import assert from 'node:assert/strict';
import test from 'node:test';
import { quickAccessDecision, quickRegistrationConfigured } from './quick-registration';

test('repeat Quick registration gate remains disabled until client and admin Firebase are both configured', () => {
  assert.equal(quickRegistrationConfigured({} as NodeJS.ProcessEnv), false);
  assert.equal(quickRegistrationConfigured({
    NEXT_PUBLIC_FIREBASE_API_KEY: 'public-key',
    FIREBASE_PROJECT_ID: 'project',
    FIREBASE_CLIENT_EMAIL: 'service@example.test',
  } as NodeJS.ProcessEnv), false);
  assert.equal(quickRegistrationConfigured({
    NEXT_PUBLIC_FIREBASE_API_KEY: 'public-key',
    FIREBASE_PROJECT_ID: 'project',
    FIREBASE_CLIENT_EMAIL: 'service@example.test',
    FIREBASE_PRIVATE_KEY: 'private-key',
  } as NodeJS.ProcessEnv), true);
  assert.equal(quickRegistrationConfigured({
    NEXT_PUBLIC_FIREBASE_API_KEY: 'public-key',
    FIREBASE_SERVICE_ACCOUNT_JSON: '{"project_id":"project"}',
  } as NodeJS.ProcessEnv), true);
});

test('first anonymous Quick is allowed when registration is configured', () => {
  assert.deepEqual(quickAccessDecision({
    completedBefore: false,
    authenticated: false,
    registrationAvailable: true,
  }), {
    completedBefore: false,
    authenticated: false,
    registrationAvailable: true,
    repeatRegistrationRequired: false,
  });
});

test('second anonymous Quick requires registration when registration is configured', () => {
  assert.equal(quickAccessDecision({
    completedBefore: true,
    authenticated: false,
    registrationAvailable: true,
  }).repeatRegistrationRequired, true);
});

test('signed-in users can repeat Quick', () => {
  assert.equal(quickAccessDecision({
    completedBefore: true,
    authenticated: true,
    registrationAvailable: true,
  }).repeatRegistrationRequired, false);
});

test('misconfigured registration never strands a user behind an unusable gate', () => {
  assert.equal(quickAccessDecision({
    completedBefore: true,
    authenticated: false,
    registrationAvailable: false,
  }).repeatRegistrationRequired, false);
});
