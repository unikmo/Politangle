export type QuickAccessInput = {
  completedBefore: boolean;
  authenticated: boolean;
  registrationAvailable: boolean;
};

export function quickRegistrationConfigured(env: NodeJS.ProcessEnv = process.env) {
  const adminConfigured = Boolean(
    env.FIREBASE_SERVICE_ACCOUNT_JSON ||
    (env.FIREBASE_PROJECT_ID && env.FIREBASE_CLIENT_EMAIL && env.FIREBASE_PRIVATE_KEY)
  );
  return Boolean(env.NEXT_PUBLIC_FIREBASE_API_KEY && adminConfigured);
}

export function quickAccessDecision(input: QuickAccessInput) {
  return {
    completedBefore: input.completedBefore,
    authenticated: input.authenticated,
    registrationAvailable: input.registrationAvailable,
    repeatRegistrationRequired: input.completedBefore && !input.authenticated && input.registrationAvailable,
  };
}
