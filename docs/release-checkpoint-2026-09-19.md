# Politangle release checkpoint — 2026-09-19

Purpose: production deployment trigger and rollback record after PR #26.

## Release baseline
- Approved application baseline: `9bf741f4d05e96dd0e56340ae1a086f1d59e7795`
- Previous Netlify production application baseline: `b862b01372cdb629ecc8a1130e103ba916b868bc`
- Previous Netlify production deploy: `6aac8d097de4e60007eb03d7`

## Verified before release
- GitHub Engine CI passed on merged main.
- PR #26 preview build passed and Netlify preview reached READY.
- No scoring/question-bank algorithm changes were introduced by the public-site UX work.

## Open release dependencies
- Firebase registration credentials must be configured in Netlify before account creation/sign-in and repeat-Quick registration enforcement can be treated as operational.
- Certified-test release remains closed until the question-bank validation gate is explicitly satisfied.
- Stripe/certificate checkout remains intentionally closed.
- Final legal pages still require qualified legal review and a monitored Politangle contact channel.

## Rollback
If the release causes a production regression, restore the previous known-good Netlify production deploy `6aac8d097de4e60007eb03d7` or revert to application baseline `b862b01372cdb629ecc8a1130e103ba916b868bc` while preserving post-release evidence.
