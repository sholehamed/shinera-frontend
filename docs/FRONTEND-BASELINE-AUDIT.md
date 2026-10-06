# Frontend Baseline Audit

Date: 2026-10-06

Canonical product and architecture source: `sholehamed/shinera-product`.

## Audit scope

The audit compares this repository with the current PRD, Product Backlog, Project Instructions, Definition of Done, Architecture Overview, and accepted ADRs. It is intentionally limited to frontend baseline and already-approved backend contracts; it does not mark unfinished product features as complete.

## Corrected deviations

- Toolchain realigned from Angular 22 / TypeScript 6 to the approved Angular 20 baseline and a compatible TypeScript line.
- Password Grant and the legacy `postman` OAuth client removed from the first-party browser flow.
- Authorization Code + PKCE implemented with `shinera-web`, protocol callback handling, refresh-token rotation support, and single-flight refresh.
- Access tokens moved to memory; refresh and ID tokens are limited to session storage instead of long-lived local storage.
- Canonical `/System/Auth/me` user context added; JWT payloads are not used as application truth.
- Tenant and branch selection separated from authentication and sent as `X-Tenant-Id` / `X-Branch-Id`.
- Route authentication/workspace guards, permission UX guard/directive, and subscription feature guard/directive added.
- Registration mock checkout replaced by the approved atomic `/System/Registration` contract, including canonical plan keys and server-generated tenant slug.
- Registration now resumes the first-party OIDC flow and targets onboarding rather than a fake payment redirect.
- A Gregorian/UTC temporal boundary service was added; Jalali remains presentation-only.
- Legacy role-menu API and runtime mock menu were removed from the application shell.
- Trezo sample notifications/profile/menu content was removed from the authenticated header.
- Runtime dashboard mock widgets were disconnected from the production dashboard baseline; unfinished modules now present explicit neutral states rather than fabricated business metrics.
- Keyboard focus is no longer globally suppressed.
- Unit-test baseline, Playwright smoke coverage, and repository CI were added.

## Deliberately not marked complete

The following are product delivery items, not baseline corrections, and remain subject to their backlog stories and API readiness:

- Full service/staff/customer/appointment/payment UI flows.
- Full dashboard KPI widgets backed by production APIs.
- Branch-management CRUD UI beyond active workspace selection.
- Complete role/scope-aware navigation for future routes.
- The full cross-module Playwright golden path required when those product flows are implemented.
- Backend-integrated browser E2E for login/registration; baseline E2E intentionally runs without backend secrets or a backend service.

Prototype widget components and their mock files may remain in source while they are not routed by the production dashboard. They must be removed or replaced by real API-backed implementations before the corresponding product story is considered Done.

## Merge gate

A pull request is mergeable only after:

1. `npm ci` succeeds from the committed lockfile.
2. Unit tests pass.
3. Production Angular build passes.
4. Playwright baseline E2E passes.
5. Final review finds no unresolved Critical or High deviation in the changed baseline.
