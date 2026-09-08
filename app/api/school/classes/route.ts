import { randomBytes, randomInt } from 'node:crypto';
import { NextResponse } from 'next/server';
import { getAdminDb } from '../../../../lib/firebase-admin';
import { createSchoolClassRecord, hashSchoolSecret } from '../../../../lib/school-aggregate';

const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function makeCode(length = 6) {
  return Array.from({ length }, () => CODE_ALPHABET[randomInt(0, CODE_ALPHABET.length)]).join('');
}

export async function POST() {
  const db = getAdminDb();
  const teacherKey = randomBytes(24).toString('base64url');
  const teacherKeyHash = hashSchoolSecret(teacherKey);

  for (let attempt = 0; attempt < 12; attempt += 1) {
    const code = makeCode();
    const ref = db.collection('schoolClasses').doc(code);
    const snapshot = await ref.get();
    if (snapshot.exists) continue;
    const record = createSchoolClassRecord(code, teacherKeyHash);
    await ref.set(record);
    return NextResponse.json({
      code,
      teacherKey,
      status: record.status,
      minAggregateSize: record.minAggregateSize,
      privacy: {
        studentNamesCollected: false,
        politicalBeliefAnswersAccepted: false,
        rawLiteracyAnswersStored: false,
      },
    });
  }

  return NextResponse.json({ error: 'Could not create a unique class code.' }, { status: 503 });
}
