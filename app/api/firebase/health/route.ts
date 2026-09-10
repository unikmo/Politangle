import { NextResponse } from 'next/server';
import { getAdminDb } from '../../../../lib/firebase-admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const configured = Boolean(
    process.env.FIREBASE_SERVICE_ACCOUNT_JSON ||
      (process.env.FIREBASE_PROJECT_ID &&
        process.env.FIREBASE_CLIENT_EMAIL &&
        process.env.FIREBASE_PRIVATE_KEY),
  );

  if (!configured) {
    return NextResponse.json(
      { ok: false, configured: false, firestore: 'not_checked' },
      { status: 503 },
    );
  }

  try {
    const db = getAdminDb();
    const collections = await db.listCollections();

    return NextResponse.json({
      ok: true,
      configured: true,
      firestore: 'reachable',
      collectionCount: collections.length,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        configured: true,
        firestore: 'unreachable',
        error: 'FIREBASE_CONNECTION_FAILED',
      },
      { status: 503 },
    );
  }
}
