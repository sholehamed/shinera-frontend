import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-access-status',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="status-page" dir="rtl">
      <section>
        <span class="material-symbols-outlined" aria-hidden="true">lock</span>
        @if (isFeatureUnavailable) {
          <h1>این قابلیت در دسترس نیست</h1>
          <p>اشتراک فعلی شما این قابلیت را فعال نمی‌کند.</p>
        } @else {
          <h1>دسترسی مجاز نیست</h1>
          <p>برای مشاهده این بخش دسترسی لازم را ندارید.</p>
        }
        <a routerLink="/app">بازگشت به داشبورد</a>
      </section>
    </main>
  `,
  styles: `
    .status-page {
      min-height: 100dvh;
      display: grid;
      place-content: center;
      padding: 24px;
      text-align: center;
      background: var(--bodyBgColor);
    }
    section {
      max-width: 480px;
      padding: 32px;
      border: 1px solid var(--borderColor);
      border-radius: 20px;
      background: var(--cardBgColor);
    }
    .material-symbols-outlined {
      font-size: 44px;
      color: var(--primaryColor);
    }
    a {
      display: inline-block;
      margin-top: 12px;
      color: var(--primaryColor);
      font-weight: 700;
    }
  `
})
export class AccessStatusComponent {
  private readonly route = inject(ActivatedRoute);
  readonly isFeatureUnavailable =
    this.route.snapshot.routeConfig?.path === 'feature-unavailable';
}
