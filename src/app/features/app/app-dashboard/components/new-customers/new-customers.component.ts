import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CustomizerSettingsService } from '../../../../../core/util/customizer-settings.service';

@Component({
    selector: 'app-new-customers',
    imports: [MatCardModule],
    templateUrl: './new-customers.component.html',
    styleUrl: './new-customers.component.scss'
})
export class NewCustomersComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}