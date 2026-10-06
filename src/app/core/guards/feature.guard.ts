import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { FeatureService } from '../services/feature.service';

export const featureGuard: CanActivateFn = async route => {
  const features = inject(FeatureService);
  const router = inject(Router);
  const feature = route.data['feature'] as string | undefined;

  if (!feature) {
    return true;
  }

  if (!features.entitlements()) {
    await features.load();
  }

  return features.has(feature)
    ? true
    : router.createUrlTree(['/feature-unavailable'], {
        queryParams: { feature }
      });
};
