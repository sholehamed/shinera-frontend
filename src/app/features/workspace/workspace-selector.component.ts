import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WorkspaceService } from '../../core/services/workspace.service';

@Component({
  selector: 'app-workspace-selector',
  standalone: true,
  template: `
    <main class="workspace-page" dir="rtl">
      <section class="workspace-card">
        <header>
          <span class="eyebrow">فضای کاری</span>
          <h1>فضای کاری خود را انتخاب کنید</h1>
          <p>فقط فضاها و شعبه‌هایی نمایش داده می‌شوند که حساب شما به آن‌ها دسترسی دارد.</p>
        </header>

        @if (loading()) {
          <p aria-live="polite">در حال دریافت فضاهای کاری...</p>
        } @else if (error()) {
          <p class="error" role="alert">{{ error() }}</p>
          <button type="button" (click)="load()">تلاش دوباره</button>
        } @else if (!workspace.current()?.tenants?.length) {
          <p>فضای کاری فعالی برای این حساب پیدا نشد.</p>
        } @else {
          <div class="tenant-list">
            @for (tenant of workspace.current()!.tenants; track tenant.id) {
              <button type="button" class="tenant" (click)="selectTenant(tenant.id)">
                <strong>{{ tenant.name }}</strong>
                <span>{{ tenant.branches.length }} شعبه در دسترس</span>
              </button>
            }
          </div>
        }
      </section>
    </main>
  `,
  styles: `
    .workspace-page {
      min-height: 100dvh;
      display: grid;
      place-items: center;
      padding: 24px;
      background: var(--bodyBgColor);
    }
    .workspace-card {
      width: min(620px, 100%);
      padding: 32px;
      border: 1px solid var(--borderColor);
      border-radius: 22px;
      background: var(--cardBgColor);
    }
    .eyebrow {
      color: var(--primaryColor);
      font-weight: 700;
    }
    .tenant-list {
      display: grid;
      gap: 12px;
      margin-top: 24px;
    }
    .tenant {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      padding: 18px;
      border: 1px solid var(--borderColor);
      border-radius: 14px;
      color: var(--headingColor);
      background: var(--surfaceColor);
      text-align: right;
    }
    .tenant:hover,
    .tenant:focus-visible {
      border-color: var(--primaryColor);
    }
    .tenant span {
      color: var(--mutedColor);
    }
    .error {
      color: var(--errorColor);
    }
  `
})
export class WorkspaceSelectorComponent implements OnInit {
  readonly workspace = inject(WorkspaceService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly loading = signal(true);
  readonly error = signal('');

  ngOnInit(): void {
    void this.load();
  }

  async load(): Promise<void> {
    this.loading.set(true);
    this.error.set('');
    try {
      await this.workspace.load();
    } catch {
      this.error.set('دریافت فضای کاری با خطا مواجه شد.');
    } finally {
      this.loading.set(false);
    }
  }

  async selectTenant(tenantId: string): Promise<void> {
    this.workspace.selectTenant(tenantId);
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/app';
    await this.router.navigateByUrl(
      returnUrl.startsWith('/') && !returnUrl.startsWith('//') ? returnUrl : '/app'
    );
  }
}
