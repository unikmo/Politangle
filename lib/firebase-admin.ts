import { getAuth } from 'firebase-admin/auth';
import { getAdminApp } from './firebase-app';
export { getAdminDb } from './firebase-db';

export function getAdminAuth() {
  return getAuth(getAdminApp());
}
