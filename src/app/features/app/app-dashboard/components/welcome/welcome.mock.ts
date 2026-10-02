import {
    WelcomeDashboardData
} from './welcome.model';

export const WELCOME_DASHBOARD_MOCK: WelcomeDashboardData = {

    userName: 'علی',

    greeting: 'عصر بخیر',

    title: 'امروز در شاینرا',

    message:
        'برنامه امروز آماده است؛ نوبت‌ها، وضعیت سالن و موارد نیازمند توجه را یک‌جا ببینید.',

    today: {
        appointments: 18,
        remainingAppointments: 4,
        pendingActions: 3
    },

    primaryAction: {
        title: 'ثبت نوبت جدید',
        route: '/app/appointments/create'
    },

    secondaryAction: {
        title: 'مشاهده نوبت‌ها',
        route: '/app/appointments'
    }

};