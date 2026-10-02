import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export type BillingCycle = 'monthly' | 'yearly';
export interface PlanPrice { billingCycle: BillingCycle; amount: number; currency: string; }
export interface PlanFeature { code: string; name: string; limitValue: number | null; }
export interface CheckoutPlan {
    key: string;
    title: string;
    description: string | null;
    audience: 'solo' | 'salon';
    trialDays: number;
    prices: PlanPrice[];
    features: PlanFeature[];
}
interface ApiResponse<T> { success: boolean; data: T | null; error: { code: string; message: string } | null; }

@Injectable({ providedIn: 'root' })
export class SignupCheckoutService {
    private readonly http = inject(HttpClient);

    getPlans(): Observable<CheckoutPlan[]> {
        return this.http.get<ApiResponse<CheckoutPlan[]>>('/api/public/plans').pipe(
            map(response => {
                if (!response.success || !Array.isArray(response.data)) {
                    throw new Error('Plan catalog is unavailable.');
                }
                return response.data;
            })
        );
    }
}
