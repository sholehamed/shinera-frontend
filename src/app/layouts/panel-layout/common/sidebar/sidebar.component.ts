import { CommonModule, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { CustomizerSettingsService } from '../../../../core/util/customizer-settings.service';
import { WorkspaceService } from '../../../../core/services/workspace.service';
import { ToggleService } from '../header/toggle.service';
import { SidebarMenuService } from './sidebar-menu.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, NgClass, RouterLink, RouterLinkActive, NgScrollbarModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  private readonly toggleService = inject(ToggleService);
  private readonly menuService = inject(SidebarMenuService);

  readonly themeService = inject(CustomizerSettingsService);
  readonly workspace = inject(WorkspaceService);
  readonly menuSections = this.menuService.sections;
  readonly isSidebarToggled = this.toggleService.isSidebarToggled;

  toggle(): void {
    this.toggleService.toggle();
  }
}
