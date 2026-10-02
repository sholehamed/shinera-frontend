import {
    FeaturedServicesData
} from './featured-services.model';

export const FEATURED_SERVICES_MOCK: FeaturedServicesData = {

    title: 'خدمات برتر',

    subtitle: 'محبوب‌ترین خدمات بر اساس عملکرد این هفته',

    periodLabel: '۷ روز گذشته',

    totalServed: 422,

    totalRevenue: 86_450_000,

    services: [

        {
            id: 1,

            name: 'کوتاهی و استایل مو',

            category: 'مو و استایل',

            icon: 'images/icons/hair-cutting.svg',

            servedCount: 132,

            revenue: 18_400_000,

            changePercent: 12.4,

            trend: 'up',

            performancePercent: 100
        },

        {
            id: 2,

            name: 'مانیکور',

            category: 'خدمات ناخن',

            icon: 'images/icons/manicure.svg',

            servedCount: 102,

            revenue: 15_750_000,

            changePercent: 8.1,

            trend: 'up',

            performancePercent: 77
        },

        {
            id: 3,

            name: 'پدیکور',

            category: 'خدمات ناخن',

            icon: 'images/icons/pedicure.svg',

            servedCount: 99,

            revenue: 21_300_000,

            changePercent: -2.8,

            trend: 'down',

            performancePercent: 75
        },

        {
            id: 4,

            name: 'فیشال پوست',

            category: 'مراقبت پوست',

            icon: 'images/icons/woman.svg',

            servedCount: 89,

            revenue: 31_000_000,

            changePercent: 5.6,

            trend: 'up',

            performancePercent: 67
        }

    ],

    summary: {

        averageRevenuePerService: 204_858,

        topGrowthService: {
            name: 'کوتاهی و استایل مو',
            changePercent: 12.4
        },

        topRevenueService: {
            name: 'فیشال پوست',
            revenueSharePercent: 35.9
        }

    }

};