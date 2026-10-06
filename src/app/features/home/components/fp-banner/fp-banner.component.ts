import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../../core/util/customizer-settings.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-fp-banner',
    imports: [MatButtonModule,RouterLink],
    templateUrl: './fp-banner.component.html',
    styleUrl: './fp-banner.component.scss'
})
export class FpBannerComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}