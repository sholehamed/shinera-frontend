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
    ATTENTION_SUMMARY_MOCK
} from './attention-summary.mock';


@Component({
    selector: 'app-attention-summary',

    imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        RouterLink
    ],

    templateUrl:
        './attention-summary.component.html',

    styleUrl:
        './attention-summary.component.scss'
})
export class AttentionSummaryComponent {

    readonly data =
        ATTENTION_SUMMARY_MOCK;


    constructor(
        public themeService:
            CustomizerSettingsService
    ) {}

}