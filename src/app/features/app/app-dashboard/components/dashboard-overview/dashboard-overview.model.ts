export type DashboardMetricKey =
    | 'revenue'
    | 'appointments'
    | 'occupancy'
    | 'new-customers';

export type DashboardMetricType =
    | 'currency'
    | 'number'
    | 'percent';

export type DashboardTrend =
    | 'up'
    | 'down'
    | 'neutral';

export type DashboardChartType =
    | 'area'
    | 'bar';

export interface DashboardMetricChart {
    type: DashboardChartType;

    values: number[];

    categories: string[];

    color: string;
}

export interface DashboardMetric {
    key: DashboardMetricKey;

    title: string;

    /**
     * Raw value from backend
     */
    value: number;

    type: DashboardMetricType;

    trend: DashboardTrend;

    changePercent: number;

    comparisonText: string;

    /**
     * Extra operational information
     * Example:
     * 14 completed · 4 remaining
     */
    detail?: string;

    chart: DashboardMetricChart;
}

export interface DashboardOverviewData {
    metrics: DashboardMetric[];
}