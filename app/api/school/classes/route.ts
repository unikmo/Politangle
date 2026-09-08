import { randomBytes, randomInt } from 'node:crypto';
import { NextResponse } from 'next/server';
import { getAdminDb } from '../../../../lib/firebase-admin';
import { buildClassroomActivity, defaultClassroomActivity } from '../../../../lib/school-classroom';
import { createSchoolClassRecord, hashSchoolSecret } from '../../../../lib/school-aggregate';

const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function makeCode(length = 6) {
  return Array.from({ length }, () => CODE_ALPHABET[randomInt(0, CODE_ALPHABET.length)]).join('');
}

export async function POST(request: Request) {
  const raw = await request.json().catch(() => ({})) as { activity?: unknown; roomLabel?: unknown };
  const activity = raw.activity === undefined ? defaultClassroomActivity() : buildClassroomActivity(raw.activity);
  if (!activity) return NextResponse.json({ error: 'Invalid classroom activity.' }, { status: 400 });
  const roomLabel = typeof raw.roomLabel === 'string' ? raw.roomLabel.trim().slice(0, 80) : '';
  const db = getAdminDb();
  const teacherKey = randomBytes(24).toString('base64url');
  const teacherKeyHash = hashSchoolSecret(teacherKey);

  for (let attempt = 0; attempt < 12; attempt += 1) {
    const code = makeCode();
    const ref = db.collection('schoolClasses').doc(code);
    const snapshot = await ref.get();
    if (snapshot.exists) continue;
    const record = createSchoolClassRecord(code, teacherKeyHash, activity, roomLabel);
    await ref.set(record);
    return NextResponse.json({
      code,
      teacherKey,
      status: record.status,
      roomLabel: record.roomLabel,
      activity: record.activity,
      privacy: { studentNamesCollected: false, participantAnswerMappingsStored: false, politicalAnswersAggregated: true },
    });
  }
  return NextResponse.json({ error: 'Could not create a unique class code.' }, { status: 503 });
}
