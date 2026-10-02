# Development status — 2026-10-02

## Completed in this slice

- Landing and signup consume the same real public plan catalog (`GET /api/public/plans`).
- Registered the missing HttpClient provider and lazy-loaded the signup page.
- Persian loading, empty, retry and invalid-plan states; no silent fallback to another plan from a deep link.
- Billing-cycle selection respects published IRR prices; zero is valid, missing prices disable selection. All amounts are labeled ریال.
- Removed mock checkout, simulated success, credential/payload logging, speculative plan prices, unimplemented coupon field and developer instructions from the UI.
- Checkout explicitly disabled until server-side registration/payment exists; availability notice appears before entering personal data.
- 14 unit tests passing, including 9 new signup cases. Repaired three existing test setup defects (stale service import, missing route provider, obsolete starter heading assertion).
- Playwright configured with five browser journeys on desktop and mobile (10 cases) and CI workflows.

## Existing/incomplete

Landing, profile, booking and dashboard UI exists, with substantial demo data outside this slice. Registration remains an unsubmitted form. Existing auth services do not establish a complete authentication/tenant flow. Do not consider these modules production-complete.

## Verification and remaining gates

- Development build passed.
- Unit tests: 14 passed across 5 files.
- Production build still fails existing initial-bundle and component-style budgets. Limits were not increased. The dedicated production-budget CI job keeps this release gate visible.
- Playwright test discovery passed. Browser launch was blocked because Chromium/headless downloads returned a Site Unavailable HTML page. The first run's 8 cases failed at launch, before assertions; two landing cases were added afterward. No browser test or visual verification is claimed as passed.
- Backend counterpart passed build and 11 tests; SQL Server migration execution and real database/browser integration are not yet verified.

## Next work

Pair with backend registration/identity persistence, tenant/main-branch membership and verified checkout. Then activate checkout with server-side pricing, validation, idempotency and appropriate browser tests. Publish approved catalog values via authenticated administration. A fresh catalog intentionally shows the empty state.
