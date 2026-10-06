import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CustomizerSettingsService } from '../../core/util/customizer-settings.service';
import { FpNavbarComponent } from '../../features/home/components/fp-navbar/fp-navbar.component';
import { FpFooterComponent } from '../../features/home/components/fp-footer/fp-footer.component';
import { CustomizerSettingsComponent } from '../../core/util/customizer-settings/customizer-settings.component';

@Component({
    selector: 'app-front-pages',
    imports: [RouterOutlet, FpNavbarComponent, FpFooterComponent, CustomizerSettingsComponent],
    templateUrl: './front-pages.component.html',
    styleUrl: './front-pages.component.scss'
})
export class FrontPagesComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}