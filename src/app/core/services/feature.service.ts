import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../../environments/environment';

export interface EffectiveEntitlements {
  subscription: {
    subscriptionId: string | null;
    planKey: string | null;
    state: number;
    status: string | null;
  };
  features: string[];
  limits: Record<string, number>;
}

@Injectable({ providedIn: 'root' })
export class FeatureService {
  private readonly http = inject(HttpClient);

  readonly entitlements = signal<EffectiveEntitlements | null>(null);

  has(key: string): boolean {
    const normalized = key.trim().toLowerCase();
    return (
      this.entitlements()?.features.some(feature => feature.toLowerCase() === normalized) ??
      false
    );
  }

  limit(key: string): number | null {
    return this.entitlements()?.limits[key] ?? null;
  }

  async load(): Promise<EffectiveEntitlements> {
    const result = await firstValueFrom(
      this.http.get<EffectiveEntitlements>(
        `${environment.apiBaseUrl.replace(/\/+$/, '')}/Subscription/Entitlements/current`
      )
    );
    this.entitlements.set(result);
    return result;
  }

  clear(): void {
    this.entitlements.set(null);
  }
}
