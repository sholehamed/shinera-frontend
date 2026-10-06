import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../../core/util/customizer-settings.service';

@Component({
    selector: 'app-fp-team',
    imports: [],
    templateUrl: './fp-team.component.html',
    styleUrl: './fp-team.component.scss'
})
export class FpTeamComponent {

    // Owl Carousel
   

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}