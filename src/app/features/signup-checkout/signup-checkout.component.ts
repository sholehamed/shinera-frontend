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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import {
    BillingCycle,
    CheckoutPlan,
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
        MatSelectModule,
        MatSlideToggleModule
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
    // Enable only after server-side registration and verified payments are implemented.
    readonly checkoutEnabled = false;

    readonly steps = [
        { title: 'انتخاب پلن', subtitle: 'پلن و دوره پرداخت' },
        { title: 'حساب مالک', subtitle: 'اطلاعات ورود و تماس' },
        { title: 'کسب‌وکار', subtitle: 'فضای کاری و شعبه' },
        { title: 'مرور و پرداخت', subtitle: 'تأیید نهایی سفارش' }
    ];

    readonly form = this.fb.nonNullable.group({
        subscription: this.fb.nonNullable.group({
            planKey: ['', Validators.required],
            billingCycle: ['monthly' as BillingCycle, Validators.required],
            promoCode: ['']
        }),

        owner: this.fb.nonNullable.group(
            {
                firstName: ['', [Validators.required, Validators.maxLength(60)]],
                lastName: ['', [Validators.required, Validators.maxLength(80)]],
                mobile: ['', [Validators.required, Validators.pattern(/^09\d{9}$/)]],
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(8)]],
                confirmPassword: ['', Validators.required]
            },
            { validators: matchFields('password', 'confirmPassword') }
        ),

        business: this.fb.nonNullable.group({
            displayName: ['', [Validators.required, Validators.maxLength(120)]],
            activityType: ['salon', Validators.required],
            phone: ['', Validators.maxLength(20)],
            city: ['', Validators.required],
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

        branch: this.fb.nonNullable.group({
            enabled: [false],
            name: ['شعبه اصلی'],
            phone: [''],
            city: [''],
            address: ['']
        }),

        legal: this.fb.nonNullable.group({
            acceptTerms: [false, Validators.requiredTrue],
            acceptPrivacy: [false, Validators.requiredTrue]
        })
    });

    constructor() {
        this.loadPlans();

        this.form.controls.branch.controls.enabled.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(enabled => this.applyBranchValidators(enabled));

        this.form.controls.business.controls.displayName.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(name => {
                const branchName = this.form.controls.branch.controls.name;
                if (!branchName.dirty && name?.trim()) {
                    branchName.setValue(`شعبه اصلی ${name.trim()}`, { emitEvent: false });
                }
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

    get hasBranch(): boolean {
        return this.form.controls.branch.controls.enabled.value;
    }

    selectPlan(plan: CheckoutPlan): void {
        if (this.priceFor(plan) === null) return;
        this.selectionError.set(null);
        this.form.controls.subscription.controls.planKey.setValue(plan.key);
    }

    setBillingCycle(cycle: BillingCycle): void {
        this.form.controls.subscription.controls.billingCycle.setValue(cycle);
        if (this.selectedPrice === null) {
            this.form.controls.subscription.controls.planKey.setValue('');
        }
    }

    goToStep(index: number): void {
        // Allow going backwards freely; forward movement stays validated.
        if (index <= this.currentStep()) {
            this.currentStep.set(index);
        }
    }

    next(): void {
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
        if (this.currentStep() > 0) {
            this.currentStep.update(value => value - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    submit(): void {
        // Fail closed until the server can create and verify a real checkout.
        if (!this.checkoutEnabled) return;
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
                return group.valid && !this.plansLoading() && !this.plansError() && this.selectedPrice !== null;
            }

            case 1: {
                const group = this.form.controls.owner;
                group.markAllAsTouched();
                return group.valid;
            }

            case 2: {
                this.form.controls.business.markAllAsTouched();
                this.form.controls.workspace.markAllAsTouched();

                if (this.hasBranch) {
                    this.form.controls.branch.markAllAsTouched();
                }

                return (
                    this.form.controls.business.valid &&
                    this.form.controls.workspace.valid &&
                    (!this.hasBranch || this.form.controls.branch.valid)
                );
            }

            case 3: {
                this.form.controls.legal.markAllAsTouched();
                return this.form.controls.legal.valid;
            }

            default:
                return true;
        }
    }

    private applyBranchValidators(enabled: boolean): void {
        const branch = this.form.controls.branch.controls;
        const controls = [branch.name, branch.phone, branch.city, branch.address];

        controls.forEach(control => {
            control.clearValidators();
        });

        if (enabled) {
            branch.name.setValidators([Validators.required, Validators.maxLength(120)]);
            branch.phone.setValidators([Validators.required, Validators.maxLength(20)]);
            branch.city.setValidators([Validators.required, Validators.maxLength(80)]);
            branch.address.setValidators([Validators.required, Validators.maxLength(400)]);
        }

        controls.forEach(control => control.updateValueAndValidity({ emitEvent: false }));
    }

}
