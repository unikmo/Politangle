import { cert, initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

function getCredentialConfig() {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (json) return JSON.parse(json);

  const required = ['FIREBASE_PROJECT_ID', 'FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY'];
  for (const name of required) {
    if (!process.env[name]) throw new Error(`missing ${name}`);
  }

  return {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  };
}

try {
  const credentialConfig = getCredentialConfig();
  const projectId = credentialConfig.project_id ?? credentialConfig.projectId;

  const app = getApps()[0] ?? initializeApp({
    credential: cert(credentialConfig),
    projectId,
  });

  const db = getFirestore(app);
  const collections = await db.listCollections();
  console.log(`Firebase verification passed: Firestore reachable (${collections.length} top-level collections).`);
} catch (error) {
  console.error('Firebase verification failed: service-account configuration or Firestore access is invalid.');
  if (error?.code) console.error(`Code: ${error.code}`);
  process.exit(1);
}
