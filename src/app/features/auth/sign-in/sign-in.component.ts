import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { environment } from '../../../../environments/environment';
import { CaptchaComponent } from '../../../shared/components/share-captcha/share-captcha.component';
import { CustomInputComponent } from '../../../shared/components/input-string.component';
import { AuthService } from '../../../core/services/auth.service';
import { CustomizerSettingsService } from '../../../core/util/customizer-settings.service';



@Component({
  selector: 'app-sign-in',
  standalone: true,
  providers: [AuthService],
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CustomInputComponent,
    CaptchaComponent,
    
],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  @ViewChild(CaptchaComponent) captchaComponent?: CaptchaComponent;

  AppName = environment.AppName;
  ApiUrl = environment.apiUrl;

  submitted = false;
  captchaToken = '';

  loginForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    captchaCode: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(
    public themeService: CustomizerSettingsService,
    private authService: AuthService,
  ) {}

  onCaptchaTokenChange(token: string): void {
    this.captchaToken = token;
  }

  GetToken(): void {
    this.submitted = true;
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid || !this.captchaToken) {
      return;
    }

    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;
    const captchaCode = this.loginForm.controls.captchaCode.value;

    this.authService.login(
      username,
      password,
      captchaCode,
      this.captchaToken,
    ).subscribe({
      next: (response) => {
        this.authService.saveTokens(response)
      },
      error: (d) => {
        
        this.loginForm.controls.captchaCode.setValue('');
        this.captchaToken = '';
        this.captchaComponent?.reload();
      },
    });
  }
}
