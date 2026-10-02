import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CustomizerSettingsService } from '../../../../core/util/customizer-settings.service';
import { RouterLink } from '@angular/router';
import { CheckoutPlan, SignupCheckoutService } from '../../../signup-checkout/signup-checkout.service';

@Component({
    selector: 'app-plans',
    imports: [MatCardModule, MatButtonModule, RouterLink],
    templateUrl: './plans.component.html',
    styleUrl: './plans.component.scss'
})
export class PlansComponent {
    readonly themeService = inject(CustomizerSettingsService);
    private readonly catalog = inject(SignupCheckoutService);
    private readonly destroyRef = inject(DestroyRef);
    readonly plans = signal<CheckoutPlan[]>([]);
    readonly loading = signal(false);
    readonly failed = signal(false);

    constructor() { this.load(); }

    load(): void {
        if (this.loading()) return;
        this.loading.set(true);
        this.failed.set(false);
        this.catalog.getPlans().pipe(
            takeUntilDestroyed(this.destroyRef), finalize(() => this.loading.set(false))
        ).subscribe({ next: plans => this.plans.set(plans), error: () => this.failed.set(true) });
    }

    monthlyPrice(plan: CheckoutPlan): number | null {
        return plan.prices.find(p => p.currency === 'IRR' && p.billingCycle === 'monthly')?.amount ?? null;
    }

    formatPrice(plan: CheckoutPlan): string {
        const amount = this.monthlyPrice(plan);
        return amount === null ? 'هنوز ارائه نشده' : new Intl.NumberFormat('fa-IR').format(amount);
    }
}
