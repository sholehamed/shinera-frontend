import {
    DashboardOverviewData
} from './dashboard-overview.model';

export const DASHBOARD_OVERVIEW_MOCK: DashboardOverviewData = {

    metrics: [

        {
            key: 'revenue',

            title: 'درآمد امروز',

            value: 13_450_000,

            type: 'currency',

            trend: 'up',

            changePercent: 12.4,

            comparisonText: 'نسبت به دیروز',

            detail: 'میانگین هر نوبت ۷۴۷ هزار تومان',

            chart: {
                type: 'area',

                values: [
                    6_200_000,
                    7_100_000,
                    6_700_000,
                    8_900_000,
                    8_300_000,
                    10_600_000,
                    13_450_000
                ],

                categories: [
                    'شنبه',
                    'یکشنبه',
                    'دوشنبه',
                    'سه‌شنبه',
                    'چهارشنبه',
                    'پنجشنبه',
                    'امروز'
                ],

                color: '#D9798C'
            }
        },

        {
            key: 'appointments',

            title: 'نوبت‌های امروز',

            value: 18,

            type: 'number',

            trend: 'up',

            changePercent: 8.2,

            comparisonText: 'نسبت به دیروز',

            detail: '۱۴ انجام‌شده · ۴ باقی‌مانده',

            chart: {
                type: 'bar',

                values: [
                    11,
                    15,
                    13,
                    17,
                    14,
                    16,
                    18
                ],

                categories: [
                    'شنبه',
                    'یکشنبه',
                    'دوشنبه',
                    'سه‌شنبه',
                    'چهارشنبه',
                    'پنجشنبه',
                    'امروز'
                ],

                color: '#B28AD8'
            }
        },

        {
            key: 'occupancy',

            title: 'ظرفیت رزرو شده',

            value: 78,

            type: 'percent',

            trend: 'up',

            changePercent: 6.1,

            comparisonText: 'نسبت به هفته قبل',

            detail: '۱۴ از ۱۸ ظرفیت فعال رزرو شده',

            chart: {
                type: 'area',

                values: [
                    52,
                    57,
                    61,
                    59,
                    68,
                    72,
                    78
                ],

                categories: [
                    'شنبه',
                    'یکشنبه',
                    'دوشنبه',
                    'سه‌شنبه',
                    'چهارشنبه',
                    'پنجشنبه',
                    'امروز'
                ],

                color: '#6FAFC8'
            }
        },

        {
            key: 'new-customers',

            title: 'مشتریان جدید',

            value: 6,

            type: 'number',

            trend: 'up',

            changePercent: 20,

            comparisonText: 'نسبت به دیروز',

            detail: '۶ مشتری از ۱۸ نوبت امروز',

            chart: {
                type: 'area',

                values: [
                    2,
                    3,
                    2,
                    4,
                    3,
                    5,
                    6
                ],

                categories: [
                    'شنبه',
                    'یکشنبه',
                    'دوشنبه',
                    'سه‌شنبه',
                    'چهارشنبه',
                    'پنجشنبه',
                    'امروز'
                ],

                color: '#D9A35F'
            }
        }

    ]

};