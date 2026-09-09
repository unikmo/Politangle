import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

function getCredentialConfig() {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (json) {
    const parsed = JSON.parse(json);
    return parsed;
  }

  return {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };
}

export function getAdminDb() {
  const credentialConfig = getCredentialConfig();
  const projectId = credentialConfig.project_id ?? credentialConfig.projectId;

  const app =
    getApps()[0] ??
    initializeApp({
      credential: cert(credentialConfig),
      projectId,
    });

  return getFirestore(app);
}
