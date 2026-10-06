import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  template: `
    <main class="callback" dir="rtl">
      @if (error()) {
        <h1>ورود کامل نشد</h1>
        <p role="alert">{{ error() }}</p>
        <button type="button" (click)="retry()">تلاش دوباره</button>
      } @else {
        <h1>در حال تکمیل ورود...</h1>
        <p>لطفاً این صفحه را نبندید.</p>
      }
    </main>
  `,
  styles: `
    .callback {
      min-height: 100dvh;
      display: grid;
      place-content: center;
      gap: 12px;
      text-align: center;
      padding: 24px;
      background: var(--bodyBgColor);
      color: var(--bodyColor);
    }
    button {
      justify-self: center;
      border: 0;
      border-radius: 10px;
      padding: 10px 20px;
      color: var(--whiteColor);
      background: var(--primaryColor);
    }
  `
})
export class AuthCallbackComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  readonly error = signal('');

  async ngOnInit(): Promise<void> {
    const code = this.route.snapshot.queryParamMap.get('code');
    const state = this.route.snapshot.queryParamMap.get('state');
    const oidcError = this.route.snapshot.queryParamMap.get('error');

    if (oidcError || !code || !state) {
      this.error.set('پاسخ ورود معتبر نیست. دوباره وارد حساب شوید.');
      return;
    }

    try {
      const returnUrl = await this.auth.completeAuthorizationCallback(code, state);
      await this.router.navigateByUrl(returnUrl);
    } catch {
      this.error.set('اعتبارسنجی ورود با خطا مواجه شد. دوباره تلاش کنید.');
    }
  }

  retry(): void {
    void this.auth.beginAuthorization('/app');
  }
}
