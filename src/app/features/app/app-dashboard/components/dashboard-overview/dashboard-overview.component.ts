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
    DashboardMetric
} from './dashboard-overview.model';

import {
    DASHBOARD_OVERVIEW_MOCK
} from './dashboard-overview.mock';


@Component({
    selector: 'app-dashboard-overview',

    imports: [
        MatCardModule
    ],

    templateUrl: './dashboard-overview.component.html',

    styleUrl: './dashboard-overview.component.scss'
})
export class DashboardOverviewComponent
    implements AfterViewInit, OnDestroy {

    readonly data = DASHBOARD_OVERVIEW_MOCK;

    private readonly isBrowser: boolean;

    private charts: any[] = [];


    constructor(
        public themeService: CustomizerSettingsService,

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

        await this.loadCharts();

    }


    ngOnDestroy(): void {

        for (const chart of this.charts) {

            chart.destroy();

        }

        this.charts = [];

    }


    formatValue(
        metric: DashboardMetric
    ): string {

        const formattedValue =
            new Intl.NumberFormat('fa-IR')
                .format(metric.value);

        switch (metric.type) {

            case 'currency':

                return `${formattedValue} تومان`;

            case 'percent':

                return `${formattedValue}٪`;

            default:

                return formattedValue;

        }

    }


    formatPercent(
        value: number
    ): string {

        return `${new Intl.NumberFormat(
            'fa-IR',
            {
                maximumFractionDigits: 1
            }
        ).format(value)}٪`;

    }


    private async loadCharts(): Promise<void> {

        const ApexCharts = (
            await import('apexcharts')
        ).default;


        for (const metric of this.data.metrics) {

            this.renderChart(
                ApexCharts,
                metric
            );

        }

    }


   private renderChart(
    ApexCharts: any,
    metric: DashboardMetric
): void {

    const element = document.getElementById(
        `dashboard_${metric.key}_chart`
    );

    if (!element) {
        return;
    }

    const options = {

        series: [
            {
                name: metric.title,
                data: metric.chart.values
            }
        ],

        chart: {
            type: metric.chart.type,

            // برای KPI عمداً ثابت
            width: 115,
            height: 65,

            parentHeightOffset: 0,

            toolbar: {
                show: false
            },

            sparkline: {
                enabled: true
            },

            animations: {
                enabled: true,
                speed: 450
            }
        },

        colors: [
            metric.chart.color
        ],

        stroke: {
            width:
                metric.chart.type === 'area'
                    ? 2.5
                    : 0,

            curve: 'smooth',
            lineCap: 'round'
        },

        fill: {
            type:
                metric.chart.type === 'area'
                    ? 'gradient'
                    : 'solid',

            opacity:
                metric.chart.type === 'area'
                    ? 0.2
                    : 1,

            gradient: {
                shadeIntensity: 0,
                opacityFrom: 0.30,
                opacityTo: 0.03,
                stops: [0, 90, 100]
            }
        },

        plotOptions: {
            bar: {
                columnWidth: '42%',
                borderRadius: 3,
                borderRadiusApplication: 'end'
            }
        },

        dataLabels: {
            enabled: false
        },

        grid: {
            show: false,
            padding: {
                top: 2,
                right: 2,
                bottom: 2,
                left: 2
            }
        },

        xaxis: {
            categories: metric.chart.categories,

            labels: {
                show: false
            },

            axisBorder: {
                show: false
            },

            axisTicks: {
                show: false
            },

            tooltip: {
                enabled: false
            }
        },

        yaxis: {
            show: false
        },

        tooltip: {
            enabled: true,

            marker: {
                show: false
            },

            x: {
                show: false
            },

            y: {
                formatter: (value: number) =>
                    this.formatChartValue(
                        value,
                        metric
                    )
            }
        }
    };

    const chart = new ApexCharts(
        element,
        options
    );

    chart.render();

    this.charts.push(chart);
}
private formatChartValue(
    value: number,
    metric: DashboardMetric
): string {

    const formatted =
        new Intl.NumberFormat('fa-IR')
            .format(value);

    switch (metric.type) {

        case 'currency':
            return `${formatted} تومان`;

        case 'percent':
            return `${formatted}٪`;

        default:
            return formatted;
    }
}
}