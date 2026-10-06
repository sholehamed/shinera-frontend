import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

export interface PublicBookingCta {
    eyebrow?: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    secondaryText?: string;
    phone?: string;
}

@Component({
    selector: 'app-profile-booking-cta',
    standalone: true,
    imports: [MatButtonModule, RouterLink],
    templateUrl: './booking-cta.component.html',
    styleUrl: './booking-cta.component.scss'
})
export class BookingCtaComponent {

    @Input({ required: true })
    data!: PublicBookingCta;
}