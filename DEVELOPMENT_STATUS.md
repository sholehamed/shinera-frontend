# Development status — 2026-10-02

## Completed

- Landing/signup use the real public plan catalog; Persian loading, empty, retry and invalid-plan states. Values are IRR without guessed pricing or fallback selections.
- Signup submits `POST /api/public/registrations` only when the published zero-IRR price has `canRegister=true`. Paid/disabled plans block progress before account details.
- Typed payload, client validation, stable request ID for retries, new ID after edits, duplicate-submit lock, Persian allowlisted errors and a real server receipt. Password controls are cleared on success.
- Account, workspace/main branch and subscription are provisioned by the paired backend; signup does not claim a payment or authenticated session.
- Removed mock checkout, credential logging, unused coupon/branch controls. Added success/error/retry/payload tests and browser journeys.

## Verification

- Development compilation passed. Angular tests: 18 passed across 5 files. Backend counterpart: 27 tests passed.
- Playwright discovers seven journeys on desktop/mobile (14 cases), including complete signup and paid-plan blocking. Execution/visual verification is not claimed: downloading Chromium again returned an invalid archive.
- Production compilation remains blocked by pre-existing initial-bundle/component-style budgets. Limits were not increased; the CI production-budget job preserves this release gate.

## Remaining

OpenIddict login, contact verification, tenant/branch authorization and paid checkout require further backend/frontend work. Registration is disabled by default and the empty catalog intentionally has no invented production prices. SQL Server migrations and real API/database/browser integration remain unverified. Existing profile, booking and dashboard screens contain demo data outside this slice.
