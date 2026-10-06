import {
    AttentionSummaryData
} from './attention-summary.model';

export const ATTENTION_SUMMARY_MOCK: AttentionSummaryData = {

    title: 'نیازمند توجه',

    subtitle: 'مواردی که بهتر است امروز بررسی شوند',

    totalCount: 3,

    items: [

        {
            type: 'pending-appointment',

            title: 'نوبت در انتظار تأیید',

            description: 'نیاز به تأیید رزرو',

            count: 1,

            severity: 'warning',

            icon: 'event_available',

            route: '/app/appointments?status=pending'
        },

        {
            type: 'unpaid',

            title: 'پرداخت ناقص',

            description: 'پرداخت هنوز تکمیل نشده',

            count: 1,

            severity: 'danger',

            icon: 'payments',

            route: '/app/payments?status=pending'
        },

        {
            type: 'waitlist',

            title: 'لیست انتظار',

            description: 'منتظر ظرفیت خالی',

            count: 1,

            severity: 'info',

            icon: 'hourglass_top',

            route: '/app/appointments/waitlist'
        }

    ],

    action: {
        title: 'مشاهده همه',
        route: '/app/attention'
    }

};