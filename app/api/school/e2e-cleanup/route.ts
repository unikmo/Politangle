import { NextResponse } from 'next/server';
import { getAdminDb } from '../../../../lib/firebase-admin';

export async function GET() {
  if (process.env.VERCEL_ENV !== 'preview') return NextResponse.json({ error: 'Not found.' }, { status: 404 });

  const db = getAdminDb();
  const collections = await db.listCollections();
  const rows = await Promise.all(collections.map(async (collection) => {
    const snapshot = await collection.limit(1).get();
    return { id: collection.id, hasDocuments: !snapshot.empty };
  }));
  const nonEmpty = rows.filter((row) => row.hasDocuments);

  return NextResponse.json({
    pass: nonEmpty.length === 0,
    topLevelCollections: rows,
    nonEmptyTopLevelCollections: nonEmpty.map((row) => row.id),
  }, { status: nonEmpty.length === 0 ? 200 : 500 });
}
