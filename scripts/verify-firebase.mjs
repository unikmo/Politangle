import { createPrivateKey } from 'node:crypto';
import { cert, initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const required = ['FIREBASE_PROJECT_ID', 'FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY'];
for (const name of required) {
  if (!process.env[name]) {
    console.error(`Firebase verification failed: missing ${name}`);
    process.exit(1);
  }
}

function normalizePrivateKey(value) {
  let key = value.trim();
  if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
    key = key.slice(1, -1);
  }
  return key.replace(/\\n/g, '\n').trim();
}

try {
  const projectId = process.env.FIREBASE_PROJECT_ID.trim();
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL.trim();
  const privateKey = normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY);

  try {
    createPrivateKey(privateKey);
  } catch {
    console.error('Firebase verification failed: FIREBASE_PRIVATE_KEY is not a valid PEM private key after normalization.');
    process.exit(1);
  }

  const app = getApps()[0] ?? initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
    projectId,
  });

  const db = getFirestore(app);
  const collections = await db.listCollections();
  console.log(`Firebase verification passed: Firestore reachable (${collections.length} top-level collections).`);
} catch (error) {
  console.error('Firebase verification failed: credentials or Firestore access are not valid.');
  if (error?.code) console.error(`Code: ${error.code}`);
  process.exit(1);
}
