import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

export interface PublicService {
    id: string;
    name: string;
    description?: string;
    category?: string;
    duration?: number;
    price?: number;
    image?: string;
}

@Component({
    selector: 'app-profile-services',
    standalone: true,
    imports: [
        MatButtonModule
    ],
    templateUrl: './services.component.html',
    styleUrl: './services.component.scss'
})
export class ServicesComponent {

    @Input()
    services: PublicService[] = [];

    categories: string[] = [];

    selectedCategory = 'all';

    get filteredServices(): PublicService[] {
        if (this.selectedCategory === 'all') {
            return this.services;
        }

        return this.services.filter(
            service => service.category === this.selectedCategory
        );
    }

    selectCategory(category: string): void {
        this.selectedCategory = category;
    }

    formatPrice(price?: number): string {
        if (price === undefined || price === null) {
            return 'استعلام قیمت';
        }

        return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
    }
}