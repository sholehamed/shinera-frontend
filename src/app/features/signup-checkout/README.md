# Signup and plan selection

The active route is `/start?plan=<catalog-code>`. Plans, prices and visible features come from the real `GET /api/public/plans` envelope through SignupCheckoutService. Landing uses the same service. Missing/inactive plans are never silently replaced; missing IRR prices are not treated as zero.

The first stage (plan selection) is connected. Owner/business/review forms remain preparation for registration. Checkout is disabled and the UI explains this before any personal details are entered. No owner data is submitted, logged or persisted. No mock payment or mock success exists.

Before enabling checkout, implement server validation, authoritative price lookup, registration drafts, secure credential handling, provider-verified payment completion and idempotent transactional creation of tenant, owner, main branch, memberships and subscription. Returning from a payment provider is not proof of payment.

See root TESTING.md and DEVELOPMENT_STATUS.md for commands, coverage and remaining work.
