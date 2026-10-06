import { Injectable, signal } from '@angular/core';

const TENANT_KEY = 'shinera.workspace.tenant-id';
const BRANCH_KEY = 'shinera.workspace.branch-id';

@Injectable({ providedIn: 'root' })
export class WorkspaceSelectionStore {
  readonly tenantId = signal<string | null>(sessionStorage.getItem(TENANT_KEY));
  readonly branchId = signal<string | null>(sessionStorage.getItem(BRANCH_KEY));

  selectTenant(tenantId: string | null): void {
    this.tenantId.set(tenantId);
    this.persist(TENANT_KEY, tenantId);

    if (!tenantId) {
      this.selectBranch(null);
    }
  }

  selectBranch(branchId: string | null): void {
    this.branchId.set(branchId);
    this.persist(BRANCH_KEY, branchId);
  }

  select(tenantId: string, branchId: string | null): void {
    this.selectTenant(tenantId);
    this.selectBranch(branchId);
  }

  clear(): void {
    this.selectTenant(null);
    this.selectBranch(null);
  }

  private persist(key: string, value: string | null): void {
    if (value) {
      sessionStorage.setItem(key, value);
    } else {
      sessionStorage.removeItem(key);
    }
  }
}
