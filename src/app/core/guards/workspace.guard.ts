import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { FeatureService } from '../services/feature.service';
import { WorkspaceService } from '../services/workspace.service';

export const workspaceGuard: CanActivateFn = async (_route, state) => {
  const auth = inject(AuthService);
  const features = inject(FeatureService);
  const workspace = inject(WorkspaceService);
  const router = inject(Router);

  if (!(await auth.restoreSession())) {
    await auth.beginAuthorization(state.url);
    return false;
  }

  const current = await workspace.load();

  if (!workspace.selection.tenantId()) {
    return router.createUrlTree(['/workspace/select'], {
      queryParams: { returnUrl: state.url }
    });
  }

  await Promise.all([firstValueFrom(auth.loadCurrentUser()), features.load()]);

  if (
    current.activeTenantId !== workspace.selection.tenantId() ||
    (workspace.selection.branchId() &&
      current.activeBranchId !== workspace.selection.branchId())
  ) {
    await workspace.load();
  }

  return true;
};
