import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CustomizerSettingsService } from '../../../../core/util/customizer-settings.service';
import { RouterLink } from '@angular/router';
@Component({
    selector: 'app-plans',
    imports: [MatCardModule, MatButtonModule,RouterLink],
    templateUrl: './plans.component.html',
    styleUrl: './plans.component.scss'
})
export class PlansComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}