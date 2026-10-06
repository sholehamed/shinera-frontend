# Shinera Frontend

Angular frontend for Shinera, a multi-tenant SaaS for beauty salons and independent professionals.

## Source of truth

Product, architecture, Definition of Done, ADRs, and delivery status are maintained in:

https://github.com/sholehamed/shinera-product

This repository owns frontend implementation details only.

## Baseline

- Angular 20
- Angular Material / Trezo-based UI
- Standalone components and functional guards/interceptors
- Persian-first, RTL, responsive, dark/light capable
- OpenIddict Authorization Code + PKCE
- Tenant and branch context through `X-Tenant-Id` and `X-Branch-Id`
- Permission and subscription feature gating as frontend UX only; backend remains authoritative
- Gregorian API contracts with Jalali limited to presentation

## Local development

```bash
npm ci
npm start
```

The default development environment expects the backend at `https://localhost:7156` and the frontend at `http://localhost:4200`. The registered OIDC callback is `/auth/callback`.

## Quality gates

```bash
npm run test:ci
npm run build:ci
npx playwright install chromium
npm run e2e
```

GitHub Actions runs dependency install, unit tests, a production build, and Playwright baseline tests on pushes and pull requests.

## Baseline audit

Implementation-specific findings and deferred integration work are tracked in:

`docs/FRONTEND-BASELINE-AUDIT.md`
