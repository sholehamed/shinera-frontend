import {
    Component
} from '@angular/core';

import {
    MatCardModule
} from '@angular/material/card';

import {
    MatProgressBarModule
} from '@angular/material/progress-bar';

import {
    MatIconModule
} from '@angular/material/icon';

import {
    CustomizerSettingsService
} from '../../../../../core/util/customizer-settings.service';

import {
    BOOKING_SOURCES_MOCK
} from './booking-sources.mock';


@Component({
    selector: 'app-booking-sources',

    imports: [
        MatCardModule,
        MatProgressBarModule,
        MatIconModule
    ],

    templateUrl:
        './booking-sources.component.html',

    styleUrl:
        './booking-sources.component.scss'
})
export class BookingSourcesComponent {

    readonly data =
        BOOKING_SOURCES_MOCK;

    constructor(
        public themeService:
            CustomizerSettingsService
    ) {}

}