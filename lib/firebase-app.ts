import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';

export function getAdminApp(): App {
  const existing=getApps()[0];
  if (existing) return existing;
  const json=process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  const credentials=json ? JSON.parse(json) : {
    projectId:process.env.FIREBASE_PROJECT_ID,
    clientEmail:process.env.FIREBASE_CLIENT_EMAIL,
    privateKey:process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g,'\n'),
  };
  return initializeApp({
    credential:cert(credentials),
    projectId:credentials.project_id ?? credentials.projectId,
  });
}
