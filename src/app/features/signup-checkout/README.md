# Shinera Registration

This feature implements the approved frontend registration contract.

## Canonical route

- `/register`
- Optional plan deep link: `/register?plan=salon-pro`
- Legacy `/start` redirects to `/register`.

## Flow

1. Select canonical plan key: `solo`, `solo-pro`, `salon`, or `salon-pro`.
2. Collect business information.
3. Collect owner account information.
4. Collect main-branch information and accept terms.
5. Submit one atomic registration request to `POST /api/System/Registration`.
6. The backend creates the Tenant, BusinessProfile, Main Branch, Owner, memberships, and initial subscription.
7. The browser resumes the OpenIddict Authorization Code + PKCE flow.
8. The authenticated user continues to onboarding.

The frontend does not generate the tenant slug and does not treat client-side pricing as authoritative.
