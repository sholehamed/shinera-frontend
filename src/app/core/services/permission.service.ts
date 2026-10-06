import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  private readonly auth = inject(AuthService);

  has(permissionKey: string): boolean {
    const normalized = permissionKey.trim().toLowerCase();
    return (
      this.auth.currentUser()?.permissions.some(
        permission => permission.key.toLowerCase() === normalized
      ) ?? false
    );
  }
}
