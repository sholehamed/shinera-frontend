import { NgClass } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CustomizerSettingsService } from "../../../core/util/customizer-settings.service";
import { ToggleService } from "../../../layouts/panel-layout/common/header/toggle.service";

@Component({
    selector: 'app-app-dashboard',
    imports: [RouterOutlet, NgClass],
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.scss',
        standalone: true

})
export class AdminDashboardComponent {
    private readonly toggleService = inject(ToggleService);
    readonly themeService = inject(CustomizerSettingsService);

    readonly isSidebarToggled = this.toggleService.isSidebarToggled;
    readonly isToggled = this.themeService.isNavbarToggled;
}