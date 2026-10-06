export interface WelcomeDashboardData {
    userName: string;

    greeting: string;

    title: string;

    message: string;

    today: {
        appointments: number;
        remainingAppointments: number;
        pendingActions: number;
    };

    primaryAction: {
        title: string;
        route: string;
    };

    secondaryAction?: {
        title: string;
        route: string;
    };
}