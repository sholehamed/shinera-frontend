import {
    CommonModule
} from '@angular/common';

import {
    Component
} from '@angular/core';

import {
    MatButtonModule
} from '@angular/material/button';

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
    FeaturedService
} from './featured-services.model';

import {
    FEATURED_SERVICES_MOCK
} from './featured-services.mock';


@Component({
    selector: 'app-featured-services',

    standalone: true,

    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule
    ],

    templateUrl:
        './featured-services.component.html',

    styleUrl:
        './featured-services.component.scss'
})
export class FeaturedServicesComponent {

    isLoading = false;

    readonly data =
        FEATURED_SERVICES_MOCK;


    constructor(
        public themeService:
            CustomizerSettingsService
    ) {}


    getTrendLabel(
        service: FeaturedService
    ): string {

        if (service.trend === 'flat') {
            return 'بدون تغییر';
        }

        const sign =
            service.changePercent > 0
                ? '+'
                : '';

        return `${sign}${service.changePercent}٪`;

    }


    formatCurrency(
        value: number
    ): string {

        return (
            new Intl.NumberFormat('fa-IR', {
                notation: 'compact',
                maximumFractionDigits: 1
            }).format(value)
            + ' تومان'
        );

    }

}