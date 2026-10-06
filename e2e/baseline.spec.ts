import { expect, test } from '@playwright/test';

test('landing page exposes the registration entry point', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Shinera/i);
});

test('registration supports a plan deep link', async ({ page }) => {
  await page.goto('/register?plan=salon-pro');

  await expect(
    page.getByRole('heading', { name: 'فضای کاری خود را در چند مرحله بسازید.' })
  ).toBeVisible();

  const selectedPlan = page.locator('.plan-card.selected');
  await expect(selectedPlan).toContainText('Salon Pro');
});

test('login route renders the first-party interactive login form', async ({ page }) => {
  await page.goto('/auth/login');

  await expect(page.getByRole('heading', { name: 'ورود به حساب کاربری' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'ورود' })).toBeVisible();
});

test('OIDC callback fails safely when protocol parameters are missing', async ({ page }) => {
  await page.goto('/auth/callback');

  await expect(page.getByRole('heading', { name: 'ورود کامل نشد' })).toBeVisible();
  await expect(page.getByRole('alert')).toBeVisible();
});
