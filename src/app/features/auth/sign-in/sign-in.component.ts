import { Component, inject, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AuthService } from '../../../core/services/auth.service';
import { CustomizerSettingsService } from '../../../core/util/customizer-settings.service';
import { CaptchaComponent } from '../../../shared/components/share-captcha/share-captcha.component';
import { CustomInputComponent } from '../../../shared/components/input-string.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CustomInputComponent,
    CaptchaComponent
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  @ViewChild(CaptchaComponent) captchaComponent?: CaptchaComponent;

  private readonly auth = inject(AuthService);
  private readonly route = inject(ActivatedRoute);

  readonly themeService = inject(CustomizerSettingsService);
  readonly loading = signal(false);
  readonly errorMessage = signal('');

  submitted = false;
  captchaToken = '';

  readonly loginForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    captchaCode: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  onCaptchaTokenChange(token: string): void {
    this.captchaToken = token;
  }

  submit(): void {
    if (this.loading()) {
      return;
    }

    this.submitted = true;
    this.errorMessage.set('');
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid || !this.captchaToken) {
      return;
    }

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

    this.loading.set(true);
    this.auth
      .login({
        identifier: this.loginForm.controls.username.value,
        password: this.loginForm.controls.password.value,
        captchaCode: this.loginForm.controls.captchaCode.value,
        captchaToken: this.captchaToken,
        returnUrl
      })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: response => {
          if (response.returnUrl) {
            this.auth.resumeInteractiveAuthorization(response.returnUrl);
            return;
          }

          void this.auth.beginAuthorization('/app');
        },
        error: error => {
          this.loginForm.controls.captchaCode.setValue('');
          this.captchaToken = '';
          this.captchaComponent?.reload();

          this.errorMessage.set(
            error?.error?.message === 'Captcha is invalid or expired.'
              ? 'کد امنیتی نامعتبر یا منقضی شده است.'
              : 'نام کاربری یا رمز عبور صحیح نیست.'
          );
        }
      });
  }
}
