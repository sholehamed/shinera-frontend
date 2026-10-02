// revenue-by-services.models.ts

export interface RevenueServiceSeries {
    name: string;
    data: number[];
}

export interface RevenueByServicesData {
    series: RevenueServiceSeries[];
    categories: string[];
}

export type RevenueTimeframe =
    | 'Daily'
    | 'Weekly'
    | 'Monthly'
    | 'Yearly';