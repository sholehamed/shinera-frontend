import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { PermissionService } from '../services/permission.service';

export const permissionGuard: CanActivateFn = async route => {
  const auth = inject(AuthService);
  const permissions = inject(PermissionService);
  const router = inject(Router);
  const permission = route.data['permission'] as string | undefined;

  if (!permission) {
    return true;
  }

  if (!auth.currentUser()) {
    await firstValueFrom(auth.loadCurrentUser());
  }

  return permissions.has(permission) ? true : router.createUrlTree(['/forbidden']);
};
