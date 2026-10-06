import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CustomizerSettingsService } from '../../../../../core/util/customizer-settings.service';
import { CommonModule, DecimalPipe } from '@angular/common';
interface TopSellingProduct {
    id: number;
    name: string;
    image: string;
    price: string;
    sold: number;
    trend?: number;
}

@Component({
    selector: 'app-top-selling-products',
    imports: [
        DecimalPipe,
        RouterLink,
        MatCardModule,
        MatButtonModule,
        MatMenuModule
    ],
    templateUrl: './top-selling-products.component.html',
    styleUrl: './top-selling-products.component.scss'
})
export class TopSellingProductsComponent {

    readonly themeService = inject(CustomizerSettingsService);

    selectedPeriod = signal('این ماه');

    products: TopSellingProduct[] = [
        {
            id: 1,
            name: 'پکیج مراقبت مو',
            image: 'images/products/product24.jpg',
            price: '۲۳.۵۰',
            sold: 321,
            trend: 12
        },
        {
            id: 2,
            name: 'پک مراقبت پوست',
            image: 'images/products/product25.jpg',
            price: '۲۰.۵۰',
            sold: 124,
            trend: 8
        },
        {
            id: 3,
            name: 'کرم زمستانی',
            image: 'images/products/product26.jpg',
            price: '۱۲.۴۳',
            sold: 99,
            trend: 5
        },
        {
            id: 4,
            name: 'عطر و ادکلن',
            image: 'images/products/product27.jpg',
            price: '۲۲.۱۲',
            sold: 23,
            trend: -2
        },
        {
            id: 5,
            name: 'ماسک ترمیم مو',
            image: 'images/products/product24.jpg',
            price: '۱۸.۹۰',
            sold: 87,
            trend: 6
        },
        {
            id: 6,
            name: 'سرم صورت',
            image: 'images/products/product25.jpg',
            price: '۲۶.۵۰',
            sold: 74,
            trend: 4
        }
    ];

    periods = [
        'امروز',
        'این هفته',
        'این ماه',
        'امسال'
    ];

    setPeriod(period: string): void {
        this.selectedPeriod.set(period);

        // بعداً:
        // this.loadTopSellingProducts(period);
    }
absolute(value: number): number {
    return Math.abs(value);
}
    scrollProducts(direction: 'next' | 'previous'): void {
        const container = document.querySelector(
            '.products-scroll-container'
        ) as HTMLElement | null;

        if (!container) {
            return;
        }

        const amount = container.clientWidth * 0.8;

        container.scrollBy({
            left: direction === 'next' ? amount : -amount,
            behavior: 'smooth'
        });
    }
}