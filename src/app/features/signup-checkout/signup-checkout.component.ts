import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import {
    BillingCycle,
    CheckoutPlan,
    RegistrationPayload,
    RegistrationReceipt,
    SignupCheckoutService
} from './signup-checkout.service';

const matchFields = (first: string, second: string): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        const a = control.get(first)?.value;
        const b = control.get(second)?.value;
        return a && b && a !== b ? { fieldsMismatch: true } : null;
    };
};

@Component({
    selector: 'app-signup-checkout',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
    ],
    templateUrl: './signup-checkout.component.html',
    styleUrl: './signup-checkout.component.scss'
})
export class SignupCheckoutComponent {
    private readonly fb = inject(FormBuilder);
    private readonly route = inject(ActivatedRoute);
    private readonly destroyRef = inject(DestroyRef);
    private readonly checkoutService = inject(SignupCheckoutService);

    readonly currentStep = signal(0);
    readonly submitting = signal(false);
    readonly plans = signal<CheckoutPlan[]>([]);
    readonly plansLoading = signal(false);
    readonly plansError = signal(false);
    readonly selectionError = signal<string | null>(null);
    readonly registration = signal<RegistrationReceipt | null>(null);
    readonly registrationError = signal<string | null>(null);
    private requestId = crypto.randomUUID();

    get checkoutEnabled(): boolean {
        return this.selectedPlan?.prices.some(p => p.billingCycle === this.billingCycle &&
            p.currency === 'IRR' && p.amount === 0 && p.canRegister === true) ?? false;
    }

    readonly steps = [
        { title: 'انتخاب پلن', subtitle: 'پلن و دوره پرداخت' },
        { title: 'حساب مالک', subtitle: 'اطلاعات ورود و تماس' },
        { title: 'کسب‌وکار', subtitle: 'فضای کاری و شعبه' },
        { title: 'تأیید ثبت‌نام', subtitle: 'مرور اطلاعات' }
    ];

    readonly form = this.fb.nonNullable.group({
        subscription: this.fb.nonNullable.group({
            planKey: ['', Validators.required],
            billingCycle: ['monthly' as BillingCycle, Validators.required]
        }),

        owner: this.fb.nonNullable.group(
            {
                firstName: ['', [Validators.required, Validators.maxLength(60)]],
                lastName: ['', [Validators.required, Validators.maxLength(80)]],
                mobile: ['', [Validators.required, Validators.pattern(/^09\d{9}$/)]],
                email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
                password: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(128)]],
                confirmPassword: ['', Validators.required]
            },
            { validators: matchFields('password', 'confirmPassword') }
        ),

        business: this.fb.nonNullable.group({
            displayName: ['', [Validators.required, Validators.maxLength(120)]],
            activityType: ['salon', Validators.required],
            phone: ['', Validators.maxLength(20)],
            city: ['', [Validators.required, Validators.maxLength(80)]],
            address: ['', [Validators.required, Validators.maxLength(400)]],
            postalCode: ['', Validators.maxLength(20)],
            instagram: ['', Validators.maxLength(80)]
        }),

        workspace: this.fb.nonNullable.group({
            slug: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(40),
                    Validators.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
                ]
            ],
            culture: ['fa-IR', Validators.required],
            timezone: ['Asia/Tehran', Validators.required],
            currency: ['IRR', Validators.required]
        }),

        legal: this.fb.nonNullable.group({
            acceptTerms: [false, Validators.requiredTrue],
            acceptPrivacy: [false, Validators.requiredTrue]
        })
    });

    constructor() {
        this.loadPlans();
        this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
            if (!this.submitting()) this.requestId = crypto.randomUUID();
        });


    }

    get selectedPlan(): CheckoutPlan | undefined {
        return this.plans().find(x => x.key === this.form.controls.subscription.controls.planKey.value);
    }

    loadPlans(): void {
        if (this.plansLoading()) return;
        this.plansLoading.set(true);
        this.plansError.set(false);
        this.plans.set([]);
        this.checkoutService.getPlans()
            .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.plansLoading.set(false)))
            .subscribe({
                next: plans => {
                    this.plans.set(plans);
                    this.applyPlanFromRoute();
                },
                error: () => this.plansError.set(true)
            });
    }

    priceFor(plan: CheckoutPlan): number | null {
        return plan.prices.find(x => x.billingCycle === this.billingCycle && x.currency === 'IRR')?.amount ?? null;
    }

    get billingCycle(): BillingCycle {
        return this.form.controls.subscription.controls.billingCycle.value;
    }

    get selectedPrice(): number | null {
        return this.selectedPlan ? this.priceFor(this.selectedPlan) : null;
    }

    selectPlan(plan: CheckoutPlan): void {
        if (this.submitting() || this.registration()) return;
        if (this.priceFor(plan) === null) return;
        this.selectionError.set(null);
        this.form.controls.subscription.controls.planKey.setValue(plan.key);
    }

    setBillingCycle(cycle: BillingCycle): void {
        if (this.submitting() || this.registration()) return;
        this.form.controls.subscription.controls.billingCycle.setValue(cycle);
        if (this.selectedPrice === null) {
            this.form.controls.subscription.controls.planKey.setValue('');
        }
    }

    goToStep(index: number): void {
        if (this.submitting() || this.registration()) return;
        // Allow going backwards freely; forward movement stays validated.
        if (index <= this.currentStep()) {
            this.currentStep.set(index);
        }
    }

    next(): void {
        if (this.submitting() || this.registration()) return;
        const step = this.currentStep();

        if (!this.validateStep(step)) {
            return;
        }

        if (step < this.steps.length - 1) {
            this.currentStep.set(step + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    previous(): void {
        if (this.submitting() || this.registration()) return;
        if (this.currentStep() > 0) {
            this.currentStep.update(value => value - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    submit(): void {
        if (!this.checkoutEnabled || this.submitting() || this.registration()) return;
        this.form.markAllAsTouched();
        if (this.form.invalid) return;
        const data = this.form.getRawValue();
        const payload: RegistrationPayload = {
            requestId: this.requestId, planKey: data.subscription.planKey,
            billingCycle: data.subscription.billingCycle,
            firstName: data.owner.firstName, lastName: data.owner.lastName, email: data.owner.email,
            mobile: data.owner.mobile, password: data.owner.password, businessName: data.business.displayName, slug: data.workspace.slug,
            activityType: data.business.activityType, phone: data.business.phone,
            city: data.business.city, address: data.business.address,
            postalCode: data.business.postalCode, instagram: data.business.instagram,
            ...data.legal
        };
        this.submitting.set(true);
        this.registrationError.set(null);
        this.form.disable({ emitEvent: false });
        this.checkoutService.register(payload)
            .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => {
                this.submitting.set(false);
                if (!this.registration()) this.form.enable({ emitEvent: false });
            }))
            .subscribe({
                next: receipt => {
                    this.registration.set(receipt);
                    this.form.controls.owner.patchValue({ password: '', confirmPassword: '' }, { emitEvent: false });
                },
                error: (error: unknown) => {
                    const messages: Record<string, string> = {
                        'Registration.Conflict': 'ثبت‌نام با این اطلاعات ممکن نیست. اطلاعات حساب و نشانی فضای کاری را بررسی کنید.',
                        'Registration.RequestConflict': 'اطلاعات درخواست تغییر کرده است. فرم را بررسی و دوباره ارسال کنید.',
                        'Registration.Unavailable': 'ثبت‌نام در حال حاضر فعال نیست.',
                        'Registration.PlanUnavailable': 'پلن انتخابی دیگر در دسترس نیست. پلن‌ها را دوباره دریافت کنید.',
                        'Registration.PaymentRequired': 'این پلن نیاز به پرداخت دارد و پرداخت آنلاین هنوز فعال نیست.',
                        'Registration.Invalid': 'اطلاعات فرم را بررسی کنید؛ رمز عبور باید حداقل ۱۲ کاراکتر باشد.'
                    };
                    this.registrationError.set(error instanceof HttpErrorResponse && error.status === 429
                        ? 'تعداد درخواست‌ها زیاد است. یک دقیقه دیگر تلاش کنید.'
                        : error instanceof HttpErrorResponse
                            ? messages[error.error?.error?.code] ?? 'ثبت‌نام انجام نشد. دوباره تلاش کنید.'
                            : 'ثبت‌نام انجام نشد. دوباره تلاش کنید.');
                }
            });
    }

    formatMoney(value: number | null): string {
        return value === null ? 'قیمت این دوره موجود نیست' : new Intl.NumberFormat('fa-IR').format(value);
    }

    private applyPlanFromRoute(): void {
        const requested = this.route.snapshot.paramMap.get('plan') ?? this.route.snapshot.queryParamMap.get('plan');
        const current = this.form.controls.subscription.controls.planKey.value;
        const key = requested ?? current;
        const plan = this.plans().find(x => x.key === key);
        if (plan && this.priceFor(plan) !== null) {
            this.selectPlan(plan);
        } else {
            this.form.controls.subscription.controls.planKey.setValue('');
            this.selectionError.set(key ? 'پلن درخواستی در این دوره در دسترس نیست؛ پلن دیگری انتخاب کنید.' : null);
        }
    }

    private validateStep(step: number): boolean {
        switch (step) {
            case 0: {
                const group = this.form.controls.subscription;
                group.markAllAsTouched();
                return group.valid && this.checkoutEnabled && !this.plansLoading() && !this.plansError() && this.selectedPrice !== null;
            }

            case 1: {
                const group = this.form.controls.owner;
                group.markAllAsTouched();
                return group.valid;
            }

            case 2: {
                this.form.controls.business.markAllAsTouched();
                this.form.controls.workspace.markAllAsTouched();

                return this.form.controls.business.valid && this.form.controls.workspace.valid;
            }

            case 3: {
                this.form.controls.legal.markAllAsTouched();
                return this.form.controls.legal.valid;
            }

            default:
                return true;
        }
    }

}
