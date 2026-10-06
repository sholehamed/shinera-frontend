import { Component, Input } from '@angular/core';

export interface PublicProfileAbout {
    title?: string;
    description: string;
    image?: string;
    imageAlt?: string;

    highlights?: {
        value: string;
        label: string;
        icon?: string;
    }[];
}

@Component({
    selector: 'app-profile-about',
    standalone: true,
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent {

    @Input()
    about!: PublicProfileAbout;
}