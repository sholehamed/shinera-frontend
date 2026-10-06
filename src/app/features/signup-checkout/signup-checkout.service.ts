import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

export type RegistrationPlanKey = 'solo' | 'solo-pro' | 'salon' | 'salon-pro';
export type BusinessMode = 1 | 2;

export interface RegistrationRequest {
  planKey: RegistrationPlanKey;
  business: {
    name: string;
    businessType: string;
    mode: BusinessMode;
    phone: string;
    email: string | null;
    city: string;
    address: string;
    defaultTimeZoneId: string;
  };
  owner: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
  };
  branch: {
    name: string;
    phone: string;
    address: string;
    timeZoneId: string | null;
  };
}

export interface RegistrationSuccess {
  userId: string;
  tenantId: string;
  tenantSlug: string;
  branchId: string;
  businessProfileId: string;
  subscriptionId: string;
  planKey: string;
  next: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: { code: string; message: string } | null;
}

@Injectable({ providedIn: 'root' })
export class SignupCheckoutService {
  private readonly http = inject(HttpClient);

  register(request: RegistrationRequest): Observable<ApiResponse<RegistrationSuccess>> {
    return this.http.post<ApiResponse<RegistrationSuccess>>(
      `${environment.apiBaseUrl.replace(/\/+$/, '')}/System/Registration`,
      request,
      { withCredentials: true }
    );
  }
}
