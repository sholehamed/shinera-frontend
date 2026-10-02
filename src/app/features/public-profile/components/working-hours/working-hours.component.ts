import { Component, Input } from '@angular/core';

export interface PublicWorkingDay {
    day: string;
    shortDay?: string;
    isOpen: boolean;
    openTime?: string;
    closeTime?: string;
}

export interface PublicProfileLocation {
    address: string;
    city?: string;
    phone?: string;
    latitude?: number;
    longitude?: number;
    mapUrl?: string;
}

export interface PublicProfileWorkingHours {
    days: PublicWorkingDay[];
    location: PublicProfileLocation;
}

@Component({
    selector: 'app-profile-working-hours',
    standalone: true,
    templateUrl: './working-hours.component.html',
    styleUrl: './working-hours.component.scss'
})
export class WorkingHoursComponent {

    @Input({ required: true })
    data!: PublicProfileWorkingHours;
}