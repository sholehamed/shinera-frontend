import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (_route, state) => {
  const auth = inject(AuthService);

  if (await auth.restoreSession()) {
    return true;
  }

  await auth.beginAuthorization(state.url);
  return false;
};
