import moment from 'jalali-moment';

import {
    DashboardAppointmentsData
} from './recent-appoinments.model';


const today = moment()
    .locale('en')
    .format('YYYY-MM-DD');

const tomorrow = moment()
    .add(1, 'day')
    .locale('en')
    .format('YYYY-MM-DD');

const yesterday = moment()
    .subtract(1, 'day')
    .locale('en')
    .format('YYYY-MM-DD');

export const RECENT_APPOINTMENTS_MOCK: DashboardAppointmentsData = {

    isSalon: true,

    staff: [

        {
            id: 1,
            name: 'سارا محمدی',
            imageUrl: 'images/users/user37.jpg'
        },

        {
            id: 2,
            name: 'نیکا رضایی',
            imageUrl: 'images/users/user40.jpg'
        },

        {
            id: 3,
            name: 'مریم رضایی',
            imageUrl: 'images/users/user38.jpg'
        },

        {
            id: 4,
            name: 'الناز کریمی',
            imageUrl: 'images/users/user43.jpg'
        }

    ],

    appointments: [

        // ==========================================
        // Today
        // ==========================================

        {
            id: 1001,

            date: today,

            startTime: '09:00',
            endTime: '10:00',

            serviceName: 'کوتاهی و استایل مو',

            status: 'completed',

            client: {
                id: 101,
                name: 'نگار احمدی',
                imageUrl: 'images/users/user36.jpg'
            },

            staff: {
                id: 1,
                name: 'سارا محمدی',
                imageUrl: 'images/users/user37.jpg'
            }
        },

        {
            id: 1002,

            date: today,

            startTime: '10:30',
            endTime: '11:30',

            serviceName: 'مانیکور',

            status: 'completed',

            client: {
                id: 102,
                name: 'مریم کریمی',
                imageUrl: 'images/users/user38.jpg'
            },

            staff: {
                id: 2,
                name: 'نیکا رضایی',
                imageUrl: 'images/users/user40.jpg'
            }
        },

        {
            id: 1003,

            date: today,

            startTime: '12:00',
            endTime: '13:30',

            serviceName: 'رنگ مو',

            status: 'upcoming',

            client: {
                id: 103,
                name: 'سارا احمدی',
                imageUrl: 'images/users/user43.jpg'
            },

            staff: {
                id: 3,
                name: 'مریم رضایی',
                imageUrl: 'images/users/user38.jpg'
            }
        },

        {
            id: 1004,

            date: today,

            startTime: '14:00',
            endTime: '15:00',

            serviceName: 'فیشال پوست',

            status: 'upcoming',

            client: {
                id: 104,
                name: 'مهسا رضایی',
                imageUrl: 'images/users/user36.jpg'
            },

            staff: {
                id: 4,
                name: 'الناز کریمی',
                imageUrl: 'images/users/user43.jpg'
            }
        },

        {
            id: 1005,

            date: today,

            startTime: '15:30',
            endTime: '16:30',

            serviceName: 'لیفت مژه',

            status: 'no-show',

            client: {
                id: 105,
                name: 'نیلوفر محمدی',
                imageUrl: 'images/users/user38.jpg'
            },

            staff: {
                id: 1,
                name: 'سارا محمدی',
                imageUrl: 'images/users/user37.jpg'
            }
        },

        {
            id: 1006,

            date: today,

            startTime: '17:00',
            endTime: '18:00',

            serviceName: 'پدیکور',

            status: 'cancelled',

            client: {
                id: 106,
                name: 'الهام رضایی',
                imageUrl: 'images/users/user36.jpg'
            },

            staff: {
                id: 2,
                name: 'نیکا رضایی',
                imageUrl: 'images/users/user40.jpg'
            }
        },


        // ==========================================
        // Tomorrow
        // ==========================================

        {
            id: 2001,

            date: tomorrow,

            startTime: '09:30',
            endTime: '10:30',

            serviceName: 'کراتین مو',

            status: 'upcoming',

            client: {
                id: 107,
                name: 'ندا حسینی',
                imageUrl: 'images/users/user43.jpg'
            },

            staff: {
                id: 3,
                name: 'مریم رضایی',
                imageUrl: 'images/users/user38.jpg'
            }
        },

        {
            id: 2002,

            date: tomorrow,

            startTime: '11:00',
            endTime: '12:00',

            serviceName: 'طراحی ناخن',

            status: 'upcoming',

            client: {
                id: 108,
                name: 'پریسا احمدی',
                imageUrl: 'images/users/user36.jpg'
            },

            staff: {
                id: 4,
                name: 'الناز کریمی',
                imageUrl: 'images/users/user43.jpg'
            }
        },

        {
            id: 2003,

            date: tomorrow,

            startTime: '13:00',
            endTime: '14:00',

            serviceName: 'فیشال پوست',

            status: 'upcoming',

            client: {
                id: 109,
                name: 'شیما اکبری',
                imageUrl: 'images/users/user38.jpg'
            },

            staff: {
                id: 2,
                name: 'نیکا رضایی',
                imageUrl: 'images/users/user40.jpg'
            }
        },


        // ==========================================
        // Yesterday
        // ==========================================

        {
            id: 3001,

            date: yesterday,

            startTime: '10:00',
            endTime: '11:00',

            serviceName: 'مانیکور',

            status: 'completed',

            client: {
                id: 110,
                name: 'سپیده مرادی',
                imageUrl: 'images/users/user36.jpg'
            },

            staff: {
                id: 1,
                name: 'سارا محمدی',
                imageUrl: 'images/users/user37.jpg'
            }
        },

        {
            id: 3002,

            date: yesterday,

            startTime: '13:30',
            endTime: '14:30',

            serviceName: 'پدیکور',

            status: 'completed',

            client: {
                id: 111,
                name: 'مونا رضایی',
                imageUrl: 'images/users/user43.jpg'
            },

            staff: {
                id: 2,
                name: 'نیکا رضایی',
                imageUrl: 'images/users/user40.jpg'
            }
        }

    ]

};