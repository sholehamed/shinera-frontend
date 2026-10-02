import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { SignupCheckoutComponent } from './signup-checkout.component';
import { CheckoutPlan } from './signup-checkout.service';

const plan: CheckoutPlan = {
  key: 'solo', title: 'انفرادی', description: null, audience: 'solo', trialDays: 0,
  prices: [{ billingCycle: 'monthly', amount: 6900000, currency: 'IRR' }], features: []
};

describe('Signup plan selection', () => {
  let http: HttpTestingController;
  beforeEach(() => { vi.spyOn(window, 'scrollTo').mockImplementation(() => {}); });
  function create(requested?: string) {
    TestBed.configureTestingModule({
      imports: [SignupCheckoutComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: {
          paramMap: convertToParamMap({}), queryParamMap: convertToParamMap(requested ? { plan: requested } : {})
        } } }]
    });
    http = TestBed.inject(HttpTestingController);
    return TestBed.createComponent(SignupCheckoutComponent);
  }
  afterEach(() => http.verify());
  it('blocks advancing until plans arrive and a plan is selected', () => {
    const c = create().componentInstance;
    c.next(); expect(c.currentStep()).toBe(0);
    http.expectOne('/api/public/plans').flush({ success: true, data: [plan] });
    c.next(); expect(c.currentStep()).toBe(0);
    c.selectPlan(plan); c.next(); expect(c.currentStep()).toBe(0);
  });
  it('selects a valid deep link after loading and keeps IRR amounts unchanged', () => {
    const c = create('solo').componentInstance;
    http.expectOne('/api/public/plans').flush({ success: true, data: [plan] });
    expect(c.selectedPlan?.key).toBe('solo'); expect(c.selectedPrice).toBe(6900000);
  });
  it('never substitutes a different plan for an unavailable deep link', () => {
    const c = create('private-plan').componentInstance;
    http.expectOne('/api/public/plans').flush({ success: true, data: [plan] });
    expect(c.selectedPlan).toBeUndefined(); expect(c.selectionError()).toBeTruthy();
  });
  it('clears selection when a billing cycle has no published IRR price', () => {
    const c = create('solo').componentInstance;
    http.expectOne('/api/public/plans').flush({ success: true, data: [plan] });
    c.setBillingCycle('yearly'); c.next();
    expect(c.selectedPrice).toBeNull(); expect(c.currentStep()).toBe(0);
  });
  it('allows a genuine zero-price plan', () => {
    const c = create('solo').componentInstance;
    http.expectOne('/api/public/plans').flush({ success: true, data: [{ ...plan, prices: [{ billingCycle: 'monthly', currency: 'IRR', amount: 0, canRegister: true }] }] });
    expect(c.selectedPrice).toBe(0); c.next(); expect(c.currentStep()).toBe(1);
  });
  it('shows an empty state without selecting a phantom plan', async () => {
    const f = create();
    http.expectOne('/api/public/plans').flush({ success: true, data: [] });
    await f.whenStable();
    expect(f.nativeElement.textContent).toContain('در حال حاضر پلنی');
    expect(f.componentInstance.selectedPlan).toBeUndefined();
  });
  it('recovers from an API failure by retrying', () => {
    const c = create().componentInstance;
    http.expectOne('/api/public/plans').flush({}, { status: 503, statusText: 'Unavailable' });
    expect(c.plansError()).toBe(true); expect(c.plansLoading()).toBe(false);
    c.loadPlans(); http.expectOne('/api/public/plans').flush({ success: true, data: [plan] });
    expect(c.plansError()).toBe(false); expect(c.plans()).toHaveLength(1);
  });
  it('treats an unsuccessful envelope as an error', () => {
    const c = create().componentInstance;
    http.expectOne('/api/public/plans').flush({ success: false, data: null });
    expect(c.plansError()).toBe(true);
  });
  it('never submits owner credentials while checkout is unavailable', () => {
    const c = create().componentInstance;
    http.expectOne('/api/public/plans').flush({ success: true, data: [plan] });
    c.submit(); http.expectNone('/api/public/registrations');
    expect(c.checkoutEnabled).toBe(false);
  });
  function ready() {
    const c = create('solo').componentInstance;
    http.expectOne('/api/public/plans').flush({ success: true, data: [{ ...plan, prices: [{ billingCycle: 'monthly', currency: 'IRR', amount: 0, canRegister: true }] }] });
    c.form.patchValue({ owner: { firstName: 'First', lastName: 'Last', email: 'test@example.test', mobile: '09123456789', password: 'a-long-test-password', confirmPassword: 'a-long-test-password' },
      business: { displayName: 'Beauty', city: 'Tehran', address: 'Street' }, workspace: { slug: 'beauty' }, legal: { acceptTerms: true, acceptPrivacy: true } });
    c.currentStep.set(3);
    return c;
  }
  it('submits only the server contract, prevents duplicate submits and clears passwords after success', () => {
    const c = ready(); c.submit(); c.submit();
    const req = http.expectOne('/api/public/registrations');
    expect(req.request.body.confirmPassword).toBeUndefined();
    expect(req.request.body.tenantId).toBeUndefined();
    expect(req.request.body.amount).toBeUndefined();
    expect(c.form.disabled).toBe(true);
    req.flush({ success: true, data: { tenantId: 'tenant', branchId: 'branch', slug: 'beauty' } });
    expect(c.registration()?.slug).toBe('beauty');
    expect(c.form.controls.owner.controls.password.value).toBe('');
    expect(c.form.controls.owner.controls.confirmPassword.value).toBe('');
    c.submit(); http.expectNone('/api/public/registrations');
  });
  it('retains the idempotency key after a transport failure and restores form controls', () => {
    const c = ready(); c.submit(); const first = http.expectOne('/api/public/registrations');
    const key = first.request.body.requestId;
    first.flush({}, { status: 503, statusText: 'Unavailable' });
    expect(c.form.enabled).toBe(true); expect(c.registrationError()).toBeTruthy();
    c.submit(); const second = http.expectOne('/api/public/registrations');
    expect(second.request.body.requestId).toBe(key);
    second.flush({}, { status: 503, statusText: 'Unavailable' });
    c.form.controls.business.controls.displayName.setValue('Changed');
    c.submit(); const third = http.expectOne('/api/public/registrations');
    expect(third.request.body.requestId).not.toBe(key);
    third.flush({}, { status: 503, statusText: 'Unavailable' });
  });
  it('shows a Persian conflict message without rendering arbitrary server text', () => {
    const c = ready(); c.submit(); http.expectOne('/api/public/registrations').flush(
      { error: { code: 'Registration.Conflict', message: 'sensitive server content' } }, { status: 409, statusText: 'Conflict' });
    expect(c.registrationError()).toContain('ثبت‌نام با این اطلاعات ممکن نیست');
    expect(c.registrationError()).not.toContain('sensitive');
  });
  it('rejects invalid owner input even for an eligible free plan', () => {
    const c = ready(); c.form.controls.owner.controls.password.setValue('short');
    c.submit(); http.expectNone('/api/public/registrations');
  });

});
