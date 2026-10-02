import {
    BookingSourcesData
} from './booking-sources.model';

export const BOOKING_SOURCES_MOCK: BookingSourcesData = {

    title: 'منبع رزروها',

    subtitle: 'نحوه ثبت نوبت‌ها در این هفته',

    periodLabel: '۷ روز گذشته',

    totalBookings: 186,

    sources: [

        {
            type: 'online',

            title: 'رزرو آنلاین',

            subtitle: 'صفحه رزرو شاینرا',

            icon: 'language',

            count: 72,

            percentage: 39
        },

        {
            type: 'phone',

            title: 'تماس تلفنی',

            subtitle: 'ثبت توسط پذیرش',

            icon: 'call',

            count: 48,

            percentage: 26
        },

        {
            type: 'walk-in',

            title: 'مراجعه حضوری',

            subtitle: 'ثبت داخل سالن',

            icon: 'storefront',

            count: 31,

            percentage: 17
        },

        {
            type: 'instagram',

            title: 'اینستاگرام',

            subtitle: 'لینک و دایرکت',

            icon: 'photo_camera',

            count: 22,

            percentage: 12
        },

        {
            type: 'referral',

            title: 'معرفی مشتری',

            subtitle: 'ارجاع توسط مشتریان',

            icon: 'group_add',

            count: 13,

            percentage: 6
        }

    ]

};