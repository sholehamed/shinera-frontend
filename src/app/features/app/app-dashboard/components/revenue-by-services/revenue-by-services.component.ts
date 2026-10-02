// revenue-by-services.component.ts

import { AfterViewInit, Component, OnDestroy } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

import {
  RevenueByServicesData,
  RevenueServiceSeries,
  RevenueTimeframe,
} from './revenue-by-services.models';

import { RevenueByServicesService } from './revenue-by-services.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-revenue-by-services',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatButtonModule, MatMenuModule],
  templateUrl: './revenue-by-services.component.html',
  styleUrl: './revenue-by-services.component.scss',
})
export class RevenueByServicesComponent implements AfterViewInit, OnDestroy {
  selectedTimeframe: RevenueTimeframe = 'Monthly';
  readonly timeframeOptions = [
    {
      value: 'Daily' as RevenueTimeframe,
      label: 'روزانه',
    },
    {
      value: 'Weekly' as RevenueTimeframe,
      label: 'هفتگی',
    },
    {
      value: 'Monthly' as RevenueTimeframe,
      label: 'ماهانه',
    },
    {
      value: 'Yearly' as RevenueTimeframe,
      label: 'سالانه',
    },
  ];

  get selectedTimeframeLabel(): string {
    return this.timeframeOptions.find((x) => x.value === this.selectedTimeframe)?.label ?? '';
  }
  private chartInstance: any;

  constructor(private readonly revenueService: RevenueByServicesService) {}

  async ngAfterViewInit(): Promise<void> {
    await this.initializeChart();
  }

  async onTimeframeChange(timeframe: RevenueTimeframe): Promise<void> {
    this.selectedTimeframe = timeframe;

    const data = this.revenueService.getRevenueByServices(timeframe);

    if (!this.chartInstance) {
      await this.initializeChart();
      return;
    }

    await this.chartInstance.updateOptions({
      xaxis: {
        categories: data.categories,
      },
      series: data.series,
    });
  }

  private async initializeChart(): Promise<void> {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const ApexCharts = (await import('apexcharts')).default;

      const data = this.revenueService.getRevenueByServices(this.selectedTimeframe);

      const options = this.createChartOptions(data);

      const element = document.querySelector('#revenue_by_services_chart') as HTMLElement | null;

      if (!element) {
        return;
      }

      this.chartInstance = new ApexCharts(element, options);

      await this.chartInstance.render();
    } catch (error) {
      console.error('Failed to initialize Revenue By Services chart.', error);
    }
  }

  private createChartOptions(data: RevenueByServicesData): any {
    return {
      series: data.series,

      chart: {
        type: 'bar',
        height: 340,
        stacked: true,

        toolbar: {
          show: false,
        },

        fontFamily: 'inherit',

        parentHeightOffset: 0,

        animations: {
          enabled: true,
          speed: 550,

          animateGradually: {
            enabled: true,
            delay: 70,
          },

          dynamicAnimation: {
            enabled: true,
            speed: 400,
          },
        },
      },

      colors: ['#E98B9C', '#B99AE8', '#73B7E8', '#F0B56B'],

      plotOptions: {
        bar: {
          horizontal: false,

          columnWidth: '42%',

          borderRadius: 8,

          borderRadiusWhenStacked: 'last',

          dataLabels: {
            position: 'center',
          },
        },
      },

      fill: {
        type: 'solid',
        opacity: 0.96,
      },

      stroke: {
        show: false,
      },

      dataLabels: {
        enabled: false,
      },

      grid: {
        show: true,

        borderColor: '#F1EDF1',

        strokeDashArray: 5,

        position: 'back',

        xaxis: {
          lines: {
            show: false,
          },
        },

        yaxis: {
          lines: {
            show: true,
          },
        },

        padding: {
          left: 8,
          right: 8,
          top: 5,
          bottom: 2,
        },
      },

      xaxis: {
        categories: data.categories,

        axisBorder: {
          show: false,
        },

        axisTicks: {
          show: false,
        },

        labels: {
          offsetY: 3,

          style: {
            colors: '#8A7F87',
            fontSize: '11px',
            fontWeight: 500,
          },
        },
      },

      yaxis: {
        min: 0,

        forceNiceScale: true,

        labels: {
          offsetX: -4,

          formatter: (value: number) => {
            return value.toLocaleString('fa-IR');
          },

          style: {
            colors: '#A1989F',
            fontSize: '10px',
            fontWeight: 400,
          },
        },

        axisBorder: {
          show: false,
        },

        axisTicks: {
          show: false,
        },
      },

      legend: {
        show: true,

        fontSize: '11px',

        fontWeight: 500,

        position: 'bottom',

        horizontalAlign: 'center',

        offsetY: 6,

        itemMargin: {
          horizontal: 14,
          vertical: 8,
        },

        labels: {
          colors: '#665D65',
        },

        markers: {
          size: 7,
          offsetX: -3,
          shape: 'circle',
        },
      },

      tooltip: {
        shared: true,

        intersect: false,

        theme: 'light',

        style: {
          fontSize: '11px',
        },

        marker: {
          show: true,
        },

        y: {
          formatter: (value: number) => {
            return `${value.toLocaleString('fa-IR')} هزار تومان`;
          },
        },

        custom: ({ series, dataPointIndex, w }: any) => {
          const category = w.globals.labels[dataPointIndex];

          const total = series.reduce(
            (sum: number, currentSeries: number[]) => sum + (currentSeries[dataPointIndex] ?? 0),
            0,
          );

          const items = w.config.series
            .map((item: RevenueServiceSeries, index: number) => {
              const value = series[index]?.[dataPointIndex] ?? 0;

              const color = w.globals.colors[index];

              return `
                        <div class="revenue-tooltip-row">

                            <div class="revenue-tooltip-name">

                                <span
                                    class="revenue-tooltip-dot"
                                    style="background:${color}"
                                ></span>

                                <span>
                                    ${item.name}
                                </span>

                            </div>

                            <strong>
                                ${value.toLocaleString('fa-IR')}
                                هزار تومان
                            </strong>

                        </div>
                    `;
            })
            .join('');

          const isDark =
            document.body.classList.contains('dark-theme') ||
            document.documentElement.classList.contains('dark-theme');

          return `
        <div
            class="revenue-tooltip
            ${isDark ? 'dark' : ''}"
        >

            <div class="revenue-tooltip-title">
                ${category}
            </div>

            <div class="revenue-tooltip-items">
                ${items}
            </div>

            <div class="revenue-tooltip-total">

                <span>
                    جمع کل
                </span>

                <strong>
                    ${total.toLocaleString('fa-IR')}
                    هزار تومان
                </strong>

            </div>

        </div>
    `;
        },
      },

      states: {
        hover: {
          filter: {
            type: 'lighten',
            value: 0.08,
          },
        },

        active: {
          allowMultipleDataPointsSelection: false,

          filter: {
            type: 'none',
          },
        },
      },
    };
  }
  ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
  }
}
