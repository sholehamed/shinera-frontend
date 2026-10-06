export type BookingSourceType =
    | 'online'
    | 'phone'
    | 'walk-in'
    | 'instagram'
    | 'referral';

export interface BookingSourceItem {
    type: BookingSourceType;

    title: string;

    subtitle: string;

    icon: string;

    count: number;

    percentage: number;
}

export interface BookingSourcesData {
    title: string;

    subtitle: string;

    periodLabel: string;

    totalBookings: number;

    sources: BookingSourceItem[];
}