'use client';

import { useEffect } from 'react';

const MIGRATION_KEY = 'politangle.literacy.v3.migrated';
const LEGACY_SESSION_KEY = 'politangle.literacy.v2.session';

export default function LiteracySessionMigration({ active }: { active: boolean }) {
  useEffect(() => {
    if (!active || localStorage.getItem(MIGRATION_KEY) === '1') return;
    // U12/U17/U20 were reassigned to new knowledge concepts. Reusing answers
    // saved under those old IDs would score a different question, so discard
    // the old School/private literacy session once per browser.
    sessionStorage.removeItem(LEGACY_SESSION_KEY);
    localStorage.setItem(MIGRATION_KEY, '1');
  }, [active]);
  return null;
}
