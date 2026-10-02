import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

export interface PublicProfileHero {
    name: string;
    category: string;

    tagline?: string;
    description?: string;

    logo: string;
    coverImage: string;

    location?: string;
    phone?: string;

    workingStatus?: string;
    workingHours?: string;

    servicesCount?: number;
}

@Component({
    selector: 'app-profile-hero',
    standalone: true,
    imports: [
    MatButtonModule,
    RouterLink
],
    templateUrl: './profile-hero.component.html',
    styleUrl: './profile-hero.component.scss'
})
export class ProfileHeroComponent {

    @Input({ required: true })
    profile!: PublicProfileHero;

}