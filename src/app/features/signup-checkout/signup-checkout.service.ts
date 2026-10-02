import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export type BillingCycle = 'monthly' | 'yearly';
export interface PlanPrice { billingCycle: BillingCycle; amount: number; currency: string; canRegister?: boolean; }
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

export interface RegistrationPayload {
    requestId: string; planKey: string; billingCycle: BillingCycle;
    firstName: string; lastName: string; email: string; mobile: string; password: string;
    businessName: string; slug: string; activityType: string; phone: string;
    city: string; address: string; postalCode: string; instagram: string;
    acceptTerms: boolean; acceptPrivacy: boolean;
}
export interface RegistrationReceipt { tenantId: string; branchId: string; slug: string; }

@Injectable({ providedIn: 'root' })
export class SignupCheckoutService {
    private readonly http = inject(HttpClient);

    register(payload: RegistrationPayload): Observable<RegistrationReceipt> {
        return this.http.post<ApiResponse<RegistrationReceipt>>('/api/public/registrations', payload).pipe(
            map(response => {
                if (!response.success || !response.data) throw new Error('Registration failed.');
                return response.data;
            })
        );
    }

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
