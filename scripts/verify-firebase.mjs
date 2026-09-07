import { cert, initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const required = ['FIREBASE_PROJECT_ID', 'FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY'];
for (const name of required) {
  if (!process.env[name]) {
    console.error(`Firebase verification failed: missing ${name}`);
    process.exit(1);
  }
}

try {
  const app = getApps()[0] ?? initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });

  const db = getFirestore(app);
  const collections = await db.listCollections();
  console.log(`Firebase verification passed: Firestore reachable (${collections.length} top-level collections).`);
} catch (error) {
  console.error('Firebase verification failed: credentials or Firestore access are not valid.');
  if (error?.code) console.error(`Code: ${error.code}`);
  process.exit(1);
}
