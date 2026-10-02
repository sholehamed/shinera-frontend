import { test, expect } from '@playwright/test';

const plan = {
  key: 'solo', title: 'انفرادی', description: 'برای متخصص مستقل', audience: 'solo', trialDays: 0,
  prices: [{ billingCycle: 'monthly', amount: 0, currency: 'IRR', canRegister: true }],
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

test('creates a free workspace and clears the owner form after success', async ({ page }) => {
  await page.route('**/api/public/plans', route => route.fulfill({ json: { success: true, data: [plan], error: null } }));
  let submissions = 0;
  await page.route('**/api/public/registrations', async route => {
    submissions++;
    const payload = route.request().postDataJSON();
    expect(payload).toMatchObject({ planKey: 'solo', billingCycle: 'monthly', slug: 'browser-workspace', acceptTerms: true, acceptPrivacy: true });
    expect(payload.requestId).toMatch(/^[0-9a-f-]{36}$/);
    expect(payload).not.toHaveProperty('amount');
    expect(payload).not.toHaveProperty('tenantId');
    await route.fulfill({ json: { success: true, data: { tenantId: 'tenant-test', branchId: 'branch-test', slug: 'browser-workspace' }, error: null } });
  });
  await page.goto('/start?plan=solo');
  await page.getByRole('button', { name: 'ادامه', exact: true }).click();
  for (const [field, value] of Object.entries({ firstName: 'تست', lastName: 'مالک', mobile: '09123456789', email: 'owner@example.test', password: 'Browser-test-2026!', confirmPassword: 'Browser-test-2026!' })) {
    await page.locator(`[formControlName="${field}"]`).fill(value);
  }
  await page.getByRole('button', { name: 'ادامه', exact: true }).click();
  for (const [field, value] of Object.entries({ displayName: 'فضای تست', city: 'تهران', address: 'آدرس تست', slug: 'browser-workspace' })) {
    await page.locator(`[formControlName="${field}"]`).fill(value);
  }
  await page.getByRole('button', { name: 'ادامه', exact: true }).click();
  await page.locator('[formControlName="acceptTerms"] input').check();
  await page.locator('[formControlName="acceptPrivacy"] input').check();
  await page.getByRole('button', { name: /ثبت‌نام و ایجاد فضای کاری/ }).click();
  await expect(page.getByText('ثبت‌نام انجام شد. ورود به حساب در حال حاضر در دسترس نیست.')).toBeVisible();
  await expect(page.locator('input[type="password"]')).toHaveCount(0);
  expect(submissions).toBe(1);
});

test('paid plan is blocked before collecting account details', async ({ page }) => {
  await page.route('**/api/public/plans', route => route.fulfill({ json: { success: true, data: [{ ...plan, prices: [{ billingCycle: 'monthly', amount: 100000, currency: 'IRR', canRegister: false }] }], error: null } }));
  await page.goto('/start?plan=solo');
  await expect(page.getByText('ثبت‌نام این پلن هنوز فعال نیست.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'ادامه', exact: true })).toBeDisabled();
  await expect(page.locator('[formControlName="email"]')).toHaveCount(0);
});
