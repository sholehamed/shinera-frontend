import { NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';

import { AuthService } from '../../../../core/services/auth.service';
import { WorkspaceService } from '../../../../core/services/workspace.service';
import { CustomizerSettingsService } from '../../../../core/util/customizer-settings.service';
import { ToggleService } from './toggle.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly toggleService = inject(ToggleService);

  readonly auth = inject(AuthService);
  readonly workspace = inject(WorkspaceService);
  readonly themeService = inject(CustomizerSettingsService);

  readonly isSidebarToggled = this.toggleService.isSidebarToggled;
  readonly fullName = computed(() => {
    const user = this.auth.currentUser()?.user;
    if (!user) {
      return '';
    }

    return [user.firstName, user.lastName].filter(Boolean).join(' ') || user.userName;
  });

  toggle(): void {
    this.toggleService.toggle();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  changeTenant(tenantId: string): void {
    if (!tenantId || tenantId === this.workspace.selection.tenantId()) {
      return;
    }

    this.workspace.selectTenant(tenantId);
    window.location.reload();
  }

  changeBranch(branchId: string): void {
    if (!branchId || branchId === this.workspace.selection.branchId()) {
      return;
    }

    this.workspace.selectBranch(branchId);
    window.location.reload();
  }

  logout(): void {
    this.auth.logout();
  }
}
