import { BELIEF_V2_VERSION } from '../../../lib/belief-v2';

export const dynamic = 'force-dynamic';

/** Non-sensitive release identity for independent production smoke tests. */
export function GET() {
  const commit =
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.COMMIT_REF ||
    null;

  return Response.json(
    {
      product: 'politangle',
      beliefVersion: BELIEF_V2_VERSION,
      populismModel: 'three-component-minimum-v1',
      countryComparison: { maxCountries: 3, enabled: true },
      commit,
    },
    { headers: { 'Cache-Control': 'no-store, max-age=0' } },
  );
}
