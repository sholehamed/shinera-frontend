import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { WorkspaceService } from '../../core/services/workspace.service';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="onboarding" dir="rtl">
      <section>
        <span class="eyebrow">فضای کاری آماده است</span>
        <h1>به شاینرا خوش آمدید</h1>
        <p>
          {{ workspace.activeTenant()?.name ?? 'فضای کاری شما' }} ایجاد شده است.
          از داشبورد می‌توانید تنظیمات اولیه و داده‌های واقعی کسب‌وکار را ادامه دهید.
        </p>
        <a routerLink="/app/dashboard">ورود به داشبورد</a>
      </section>
    </main>
  `,
  styles: `
    .onboarding {
      min-height: 100dvh;
      display: grid;
      place-items: center;
      padding: 24px;
      background: var(--bodyBgColor);
    }
    section {
      width: min(620px, 100%);
      padding: 36px;
      border: 1px solid var(--borderColor);
      border-radius: 24px;
      background: var(--cardBgColor);
      text-align: center;
    }
    .eyebrow,
    a {
      color: var(--primaryColor);
      font-weight: 700;
    }
    a {
      display: inline-block;
      margin-top: 16px;
    }
  `
})
export class OnboardingComponent {
  readonly workspace = inject(WorkspaceService);
}
