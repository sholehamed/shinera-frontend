export type ServiceTrend = 'up' | 'down' | 'flat';

export interface FeaturedService {
    id: number;

    name: string;

    category: string;

    icon: string;

    servedCount: number;

    revenue: number;

    changePercent: number;

    trend: ServiceTrend;

    performancePercent: number;
}

export interface FeaturedServicesData {
    title: string;

    subtitle: string;

    periodLabel: string;

    totalServed: number;

    totalRevenue: number;

    services: FeaturedService[];
}
export interface FeaturedServicesSummary {
    averageRevenuePerService: number;

    topGrowthService: {
        name: string;
        changePercent: number;
    };

    topRevenueService: {
        name: string;
        revenueSharePercent: number;
    };
}

export interface FeaturedServicesData {
    title: string;

    subtitle: string;

    periodLabel: string;

    totalServed: number;

    totalRevenue: number;

    services: FeaturedService[];

    summary: FeaturedServicesSummary;
}