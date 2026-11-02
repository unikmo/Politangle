import { getFirestore } from 'firebase-admin/firestore';
import { getAdminApp } from './firebase-app';

// Firestore-only entry point: do not eagerly load Firebase Auth and its JWT dependencies.
export function getAdminDb() {
  return getFirestore(getAdminApp());
}
