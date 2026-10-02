export type AppointmentStatus =
    | 'completed'
    | 'upcoming'
    | 'cancelled'
    | 'no-show';

export type AppointmentStatusFilter =
    | 'all'
    | AppointmentStatus;

export interface AppointmentClient {
    id: number;
    name: string;
    imageUrl: string;
}

export interface AppointmentStaff {
    id: number;
    name: string;
    imageUrl: string;
}

export interface Appointment {
    id: number;

    date: string;

    startTime: string;
    endTime?: string;

    serviceName: string;

    status: AppointmentStatus;

    client: AppointmentClient;

    staff: AppointmentStaff;
}

export interface AppointmentStaffFilterItem {
    id: number;
    name: string;
    imageUrl?: string;
}

export interface DashboardAppointmentsData {
    isSalon: boolean;

    staff: AppointmentStaffFilterItem[];

    appointments: Appointment[];
}

export interface AppointmentDashboardFilter {
    date: string;

    status: AppointmentStatusFilter;

    staffId?: number | null;

    search?: string;
}