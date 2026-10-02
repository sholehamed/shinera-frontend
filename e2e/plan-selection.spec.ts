import { test, expect } from '@playwright/test';

const plan = {
  key: 'solo', title: 'انفرادی', description: 'برای متخصص مستقل', audience: 'solo', trialDays: 0,
  prices: [{ billingCycle: 'monthly', amount: 6900000, currency: 'IRR' }],
  features: [{ code: 'appointments', name: 'مدیریت نوبت‌ها', limitValue: null }]
};
// Deterministic browser contract tests; database/API tests run in the backend suite.
test('selects a linked plan, displays IRR, and advances to the owner form', async ({ page }) => {
  await page.route('**/api/public/plans', route => route.fulfill({ json: { success: true, data: [plan], error: null } }));
  await page.goto('/start?plan=solo');
  await expect(page.getByRole('button', { name: /انفرادی.*برای متخصص مستقل/ })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByText('ریال / ماه')).toBeVisible();
  await page.getByRole('button', { name: 'ادامه', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'حساب اصلی مدیریت را ایجاد کن' })).toBeVisible();
  expect(await page.locator('.signup-main').getAttribute('dir')).toBe('rtl');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('empty catalog prevents continuing', async ({ page }) => {
  await page.route('**/api/public/plans', route => route.fulfill({ json: { success: true, data: [], error: null } }));
  await page.goto('/start');
  await expect(page.getByRole('status')).toContainText('در حال حاضر پلنی');
  await expect(page.getByRole('button', { name: 'ادامه', exact: true })).toBeDisabled();
});

test('failed catalog can be retried', async ({ page }) => {
  let calls = 0;
  await page.route('**/api/public/plans', route => ++calls === 1
    ? route.fulfill({ status: 503, json: {} })
    : route.fulfill({ json: { success: true, data: [plan], error: null } }));
  await page.goto('/start');
  await page.getByRole('button', { name: 'تلاش دوباره' }).click();
  await expect(page.getByRole('button', { name: /انفرادی.*برای متخصص مستقل/ })).toBeVisible();
});

test('unpublished annual price cannot be selected', async ({ page }) => {
  await page.route('**/api/public/plans', route => route.fulfill({ json: { success: true, data: [plan], error: null } }));
  await page.goto('/start?plan=solo');
  await page.getByRole('button', { name: /سالانه/ }).click();
  await expect(page.getByRole('button', { name: /انفرادی.*برای متخصص مستقل/ })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'ادامه', exact: true })).toBeDisabled();
});

test('landing uses the same catalog and links to the selected plan', async ({ page }) => {
  await page.route('**/api/public/plans', route => route.fulfill({ json: { success: true, data: [plan], error: null } }));
  await page.goto('/');
  await page.getByRole('button', { name: 'انتخاب انفرادی' }).click();
  await expect(page).toHaveURL(/\/start\?plan=solo/);
  await expect(page.getByRole('button', { name: /انفرادی.*برای متخصص مستقل/ })).toHaveAttribute('aria-pressed', 'true');
});
