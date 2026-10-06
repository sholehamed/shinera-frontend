import {
    Component
} from '@angular/core';

import {
    MatCardModule
} from '@angular/material/card';

import {
    MatIconModule
} from '@angular/material/icon';

import {
    CustomizerSettingsService
} from '../../../../../core/util/customizer-settings.service';

import {
    SOLO_PERFORMANCE_MOCK
} from './solo-performance.mock';

@Component({
    selector: 'app-solo-performance',

    imports: [
        MatCardModule,
        MatIconModule
    ],

    templateUrl:
        './solo-performance.component.html',

    styleUrl:
        './solo-performance.component.scss'
})
export class SoloPerformanceComponent {

    readonly data =
        SOLO_PERFORMANCE_MOCK;


    constructor(
        public themeService:
            CustomizerSettingsService
    ) {}


    formatRevenue(
        value: number
    ): string {

        return new Intl.NumberFormat(
            'fa-IR',
            {
                notation: 'compact',
                maximumFractionDigits: 1
            }
        ).format(value);

    }

}