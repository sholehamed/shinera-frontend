import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../../environments/environment';
import { WorkspaceSelectionStore } from './workspace-selection.store';

export interface WorkspaceBranch {
  id: string;
  name: string;
  isMain: boolean;
}

export interface WorkspaceTenant {
  id: string;
  name: string;
  slug: string;
  branches: WorkspaceBranch[];
}

export interface CurrentWorkspace {
  userId: string;
  activeTenantId: string | null;
  activeBranchId: string | null;
  tenants: WorkspaceTenant[];
}

@Injectable({ providedIn: 'root' })
export class WorkspaceService {
  private readonly http = inject(HttpClient);
  readonly selection = inject(WorkspaceSelectionStore);

  readonly current = signal<CurrentWorkspace | null>(null);
  readonly loading = signal(false);

  readonly activeTenant = computed(() => {
    const tenantId = this.selection.tenantId();
    return this.current()?.tenants.find(tenant => tenant.id === tenantId) ?? null;
  });

  readonly activeBranch = computed(() => {
    const branchId = this.selection.branchId();
    return this.activeTenant()?.branches.find(branch => branch.id === branchId) ?? null;
  });

  async load(): Promise<CurrentWorkspace> {
    this.loading.set(true);
    try {
      const workspace = await firstValueFrom(
        this.http.get<CurrentWorkspace>(this.apiUrl('/System/Workspace/current'))
      );

      this.current.set(workspace);
      this.reconcileSelection(workspace);
      return workspace;
    } finally {
      this.loading.set(false);
    }
  }

  selectTenant(tenantId: string): void {
    const tenant = this.current()?.tenants.find(item => item.id === tenantId);
    if (!tenant) {
      return;
    }

    const preferredBranch =
      tenant.branches.find(branch => branch.isMain) ??
      (tenant.branches.length === 1 ? tenant.branches[0] : null);

    this.selection.select(tenant.id, preferredBranch?.id ?? null);
  }

  selectBranch(branchId: string): void {
    const exists = this.activeTenant()?.branches.some(branch => branch.id === branchId);
    if (exists) {
      this.selection.selectBranch(branchId);
    }
  }

  private reconcileSelection(workspace: CurrentWorkspace): void {
    const selectedTenantId = workspace.activeTenantId ?? this.selection.tenantId();
    const selectedTenant = workspace.tenants.find(tenant => tenant.id === selectedTenantId);

    if (selectedTenant) {
      const selectedBranchId = workspace.activeBranchId ?? this.selection.branchId();
      const selectedBranch = selectedTenant.branches.find(branch => branch.id === selectedBranchId);
      this.selection.select(selectedTenant.id, selectedBranch?.id ?? null);
      return;
    }

    if (workspace.tenants.length === 1) {
      this.selectTenant(workspace.tenants[0].id);
      return;
    }

    this.selection.clear();
  }

  private apiUrl(path: string): string {
    return `${environment.apiBaseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
  }
}
