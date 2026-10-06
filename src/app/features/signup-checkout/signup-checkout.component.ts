import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { AuthService } from '../../core/services/auth.service';
import {
  BusinessMode,
  RegistrationPlanKey,
  RegistrationRequest,
  SignupCheckoutService
} from './signup-checkout.service';

const matchFields = (first: string, second: string): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstValue = control.get(first)?.value;
    const secondValue = control.get(second)?.value;
    return firstValue && secondValue && firstValue !== secondValue
      ? { fieldsMismatch: true }
      : null;
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
  private readonly registration = inject(SignupCheckoutService);
  private readonly auth = inject(AuthService);

  readonly currentStep = signal(0);
  readonly submitting = signal(false);
  readonly errorMessage = signal('');

  readonly plans: Array<{
    key: RegistrationPlanKey;
    title: string;
    subtitle: string;
    mode: BusinessMode;
  }> = [
    { key: 'solo', title: 'Solo', subtitle: 'برای متخصص مستقل', mode: 1 },
    { key: 'solo-pro', title: 'Solo Pro', subtitle: 'برای متخصص مستقل در حال رشد', mode: 1 },
    { key: 'salon', title: 'Salon', subtitle: 'برای سالن و تیم', mode: 2 },
    { key: 'salon-pro', title: 'Salon Pro', subtitle: 'برای مجموعه حرفه‌ای', mode: 2 }
  ];

  readonly steps = [
    { title: 'انتخاب پلن', subtitle: 'انتخاب اشتراک اولیه' },
    { title: 'کسب‌وکار', subtitle: 'مشخصات فضای کاری' },
    { title: 'حساب مالک', subtitle: 'اطلاعات ورود مالک' },
    { title: 'شعبه اصلی', subtitle: 'ایجاد شعبه و تأیید نهایی' }
  ];

  readonly form = this.fb.nonNullable.group({
    planKey: ['solo' as RegistrationPlanKey, Validators.required],
    business: this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      businessType: ['beauty', [Validators.required, Validators.maxLength(100)]],
      mode: [1 as BusinessMode, Validators.required],
      phone: ['', [Validators.required, Validators.maxLength(32)]],
      email: ['', [Validators.email, Validators.maxLength(256)]],
      city: ['', [Validators.required, Validators.maxLength(150)]],
      address: ['', [Validators.required, Validators.maxLength(500)]],
      defaultTimeZoneId: ['Asia/Tehran', Validators.required]
    }),
    owner: this.fb.nonNullable.group(
      {
        firstName: ['', [Validators.required, Validators.maxLength(100)]],
        lastName: ['', [Validators.required, Validators.maxLength(100)]],
        phone: ['', [Validators.required, Validators.maxLength(32)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(256)]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(200)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: matchFields('password', 'confirmPassword') }
    ),
    branch: this.fb.nonNullable.group({
      name: ['شعبه اصلی', [Validators.required, Validators.maxLength(200)]],
      phone: ['', [Validators.required, Validators.maxLength(32)]],
      address: ['', [Validators.required, Validators.maxLength(500)]],
      timeZoneId: ['Asia/Tehran']
    }),
    acceptTerms: [false, Validators.requiredTrue]
  });

  constructor() {
    const requestedPlan = this.route.snapshot.queryParamMap.get('plan');
    const plan = this.plans.find(item => item.key === requestedPlan);
    if (plan) {
      this.selectPlan(plan.key);
    }
  }

  selectPlan(planKey: RegistrationPlanKey): void {
    const plan = this.plans.find(item => item.key === planKey);
    if (!plan) {
      return;
    }

    this.form.controls.planKey.setValue(plan.key);
    this.form.controls.business.controls.mode.setValue(plan.mode);
  }

  goToStep(index: number): void {
    if (index <= this.currentStep()) {
      this.currentStep.set(index);
    }
  }

  next(): void {
    if (!this.validateStep(this.currentStep())) {
      return;
    }

    if (this.currentStep() < this.steps.length - 1) {
      this.currentStep.update(value => value + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  previous(): void {
    if (this.currentStep() > 0) {
      this.currentStep.update(value => value - 1);
    }
  }

  submit(): void {
    if (this.submitting() || !this.validateStep(3)) {
      return;
    }

    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    this.errorMessage.set('');
    this.submitting.set(true);

    this.registration
      .register(this.buildRequest())
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: response => {
          if (!response.success || !response.data) {
            this.errorMessage.set(response.error?.message ?? 'ثبت‌نام کامل نشد.');
            return;
          }

          void this.auth.beginAuthorization(response.data.next || '/onboarding');
        },
        error: error => {
          const code = error?.error?.error?.code as string | undefined;
          if (code === 'registration.owner_email_exists') {
            this.errorMessage.set('برای این ایمیل قبلاً حساب کاربری ساخته شده است.');
          } else {
            this.errorMessage.set(
              error?.error?.error?.message ?? 'ثبت‌نام با خطا مواجه شد. دوباره تلاش کنید.'
            );
          }
        }
      });
  }

  private validateStep(step: number): boolean {
    const control =
      step === 0
        ? this.form.controls.planKey
        : step === 1
          ? this.form.controls.business
          : step === 2
            ? this.form.controls.owner
            : this.form.controls.branch;

    control.markAsTouched();
    if ('markAllAsTouched' in control) {
      control.markAllAsTouched();
    }

    if (step === 3) {
      this.form.controls.acceptTerms.markAsTouched();
      return control.valid && this.form.controls.acceptTerms.valid;
    }

    return control.valid;
  }

  private buildRequest(): RegistrationRequest {
    const raw = this.form.getRawValue();

    return {
      planKey: raw.planKey,
      business: {
        name: raw.business.name.trim(),
        businessType: raw.business.businessType.trim(),
        mode: raw.business.mode,
        phone: raw.business.phone.trim(),
        email: raw.business.email.trim() || null,
        city: raw.business.city.trim(),
        address: raw.business.address.trim(),
        defaultTimeZoneId: raw.business.defaultTimeZoneId
      },
      owner: {
        firstName: raw.owner.firstName.trim(),
        lastName: raw.owner.lastName.trim(),
        phone: raw.owner.phone.trim(),
        email: raw.owner.email.trim(),
        password: raw.owner.password
      },
      branch: {
        name: raw.branch.name.trim(),
        phone: raw.branch.phone.trim(),
        address: raw.branch.address.trim(),
        timeZoneId: raw.branch.timeZoneId.trim() || null
      }
    };
  }
}
