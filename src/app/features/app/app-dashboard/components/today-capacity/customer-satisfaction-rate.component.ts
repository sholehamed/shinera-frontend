import {
    AfterViewInit,
    Component,
    Inject,
    OnDestroy,
    PLATFORM_ID
} from '@angular/core';

import {
    isPlatformBrowser
} from '@angular/common';

import {
    MatCardModule
} from '@angular/material/card';

import {
    CustomizerSettingsService
} from '../../../../../core/util/customizer-settings.service';

import {
    TODAY_CAPACITY_MOCK
} from './today-capacity.mock';


@Component({
    selector: 'app-today-capacity',

    imports: [
        MatCardModule
    ],

    templateUrl: './today-capacity.component.html',

    styleUrl: './today-capacity.component.scss'
})
export class TodayCapacityComponent
    implements AfterViewInit, OnDestroy {

    readonly data =
        TODAY_CAPACITY_MOCK;

    private readonly isBrowser: boolean;

    private chart?: any;


    constructor(
        public themeService:
            CustomizerSettingsService,

        @Inject(PLATFORM_ID)
        platformId: object
    ) {

        this.isBrowser =
            isPlatformBrowser(platformId);

    }


    async ngAfterViewInit(): Promise<void> {

        if (!this.isBrowser) {
            return;
        }

        const ApexCharts = (
            await import('apexcharts')
        ).default;

        const element =
            document.getElementById(
                'today_capacity_chart'
            );

        if (!element) {
            return;
        }


        this.chart =
            new ApexCharts(
                element,
                {
                    series: [
                        this.data.utilizationPercent,
                        100 - this.data.utilizationPercent
                    ],

                    chart: {
                        type: 'donut',
                        height: 145,
                        width: 145,

                        sparkline: {
                            enabled: true
                        }
                    },

                    labels: [
                        'رزرو شده',
                        'آزاد'
                    ],

                    colors: [
                        '#D77A90',
                        '#EEF0F4'
                    ],

                    stroke: {
                        width: 0
                    },

                    dataLabels: {
                        enabled: false
                    },

                    legend: {
                        show: false
                    },

                    tooltip: {
                        enabled: false
                    },

                    plotOptions: {
                        pie: {
                            donut: {
                                size: '78%'
                            }
                        }
                    },

                    states: {
                        hover: {
                            filter: {
                                type: 'none'
                            }
                        },

                        active: {
                            filter: {
                                type: 'none'
                            }
                        }
                    }
                }
            );

        await this.chart.render();

    }


    ngOnDestroy(): void {

        this.chart?.destroy();

    }

}