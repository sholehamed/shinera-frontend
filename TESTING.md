# Frontend verification

Requires Node 24 and npm. Use the committed lockfile:

```sh
npm ci
npm run build -- --configuration development
npm test -- --watch=false
npx playwright install --with-deps chromium
npm run e2e
```

`npm start` uses `proxy.conf.json` to forward `/api` to `http://localhost:5080`. Start the paired backend after configuring its SQL Server connection and applying its migration. Production hosting must forward `/api` on the same origin; this avoids hard-coded backend hosts and CORS assumptions.

## Test layers

- Angular tests use HttpTestingController and do not require an API/database. They check valid/invalid deep links, missing/zero prices, billing changes, empty/error/retry states, disabled/paid registration, exact registration payloads, duplicate submission, success, error translation and retry IDs.
- Playwright starts Angular automatically unless `E2E_BASE_URL` specifies an existing instance. It stubs `/api/public/plans` and `/api/public/registrations` using deterministic fixtures, so these are browser contract tests, not a live-database full-stack test. No live test users or database reset are needed for these mocked browser journeys.
- Backend WebApplicationFactory/SQLite tests separately exercise the real HTTP endpoint, query and relational schema. Registration tests use isolated relational fixtures for real HTTP provisioning, replay, validation, rollback and rate limits. Full-stack SQL Server/browser testing remains a separate gate.
- CI runs unit and browser tests and uploads Playwright reports. A separate production-budget job currently exposes existing bundle/SCSS release failures.

## Current known limitations

`npm run build` fails the repository's pre-existing 1 MB initial and 8 kB component style limits (Trezo/theme assets). Development compilation succeeds. Do not treat that as a release-ready production build.

This workspace could not download Playwright's browser (the latest attempt returned an invalid archive). Test discovery succeeded, but execution/RTL visual verification must be rerun in an environment with Chromium available. See DEVELOPMENT_STATUS.md for exact results.
