import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

export interface PublicProfileContact {
    title?: string;
    description?: string;
    phone?: string;
    mobile?: string;
    email?: string;
    instagram?: string;
    whatsapp?: string;
}

@Component({
    selector: 'app-profile-contact',
    standalone: true,
    imports: [
        FormsModule,
        MatButtonModule
    ],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})
export class ContactComponent {

    @Input({ required: true })
    contact!: PublicProfileContact;

    name = '';
    phone = '';
    message = '';

    submit(): void {
        // TODO: connect to API
        console.log({
            name: this.name,
            phone: this.phone,
            message: this.message
        });
    }
}