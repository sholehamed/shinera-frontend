import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CustomizerSettingsService } from '../../core/util/customizer-settings.service';
import { FpFooterComponent } from '../../features/home/components/fp-footer/fp-footer.component';
import { CustomizerSettingsComponent } from '../../core/util/customizer-settings/customizer-settings.component';
import { CpNavbarComponent } from '../../features/public-profile/components/cp-navbar/cp-navbar.component';

@Component({
    selector: 'app-customer-front-pages',
    imports: [RouterOutlet, CpNavbarComponent, FpFooterComponent, CustomizerSettingsComponent],
    templateUrl: './customer-pages.component.html',
    styleUrl: './customer-pages.component.scss'
})
export class CustomerPagesComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}