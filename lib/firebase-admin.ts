import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
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

function getAdminApp(): App {
  const credentialConfig = getCredentialConfig();
  const projectId = credentialConfig.project_id ?? credentialConfig.projectId;

  return (
    getApps()[0] ??
    initializeApp({
      credential: cert(credentialConfig),
      projectId,
    })
  );
}

export function getAdminDb() {
  return getFirestore(getAdminApp());
}

export function getAdminAuth() {
  return getAuth(getAdminApp());
}
