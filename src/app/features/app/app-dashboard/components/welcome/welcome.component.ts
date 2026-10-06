import {
    Component
} from '@angular/core';

import {
    MatCardModule
} from '@angular/material/card';

import {
    MatButtonModule
} from '@angular/material/button';

import {
    MatIconModule
} from '@angular/material/icon';

import {
    RouterLink
} from '@angular/router';

import {
    CustomizerSettingsService
} from '../../../../../core/util/customizer-settings.service';

import {
    WELCOME_DASHBOARD_MOCK
} from './welcome.mock';


@Component({
    selector: 'app-welcome',

    imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        RouterLink
    ],

    templateUrl: './welcome.component.html',

    styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {

    readonly data =
        WELCOME_DASHBOARD_MOCK;

    constructor(
        public themeService:
            CustomizerSettingsService
    ) {}

}