'use client';

import { useEffect, useState } from 'react';
import type { DeepSection } from '../lib/deep-engine';
import LiteracyQuizClientV2 from './LiteracyQuizClientV2';

const MIGRATION_KEY = 'politangle.literacy.v3.migrated';
const LEGACY_SESSION_KEY = 'politangle.literacy.v2.session';

export default function LiteracyQuizEntry({ section, schoolMode }: { section: DeepSection; schoolMode: boolean }) {
  const [ready, setReady] = useState(!schoolMode);

  useEffect(() => {
    if (schoolMode && localStorage.getItem(MIGRATION_KEY) !== '1') {
      // U12/U17/U20 now measure different knowledge concepts. Reusing answers
      // saved under those IDs would score answers to the old questions.
      sessionStorage.removeItem(LEGACY_SESSION_KEY);
      localStorage.setItem(MIGRATION_KEY, '1');
    }
    setReady(true);
  }, [schoolMode]);

  if (!ready) return <section className="engine-shell"><article className="engine-card"><p>Loading…</p></article></section>;
  return <LiteracyQuizClientV2 section={section} feedbackMode={schoolMode ? 'instant' : 'end'} />;
}
