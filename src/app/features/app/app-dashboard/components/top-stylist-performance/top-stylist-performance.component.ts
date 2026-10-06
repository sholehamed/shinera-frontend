import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CustomizerSettingsService } from '../../../../../core/util/customizer-settings.service';

@Component({
    selector: 'app-top-stylist-performance',
    imports: [MatCardModule, MatTableModule],
    templateUrl: './top-stylist-performance.component.html',
    styleUrl: './top-stylist-performance.component.scss'
})
export class TopStylistPerformanceComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}
        
    displayedColumns: string[] = ['user', 'ratings'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

}

export interface PeriodicElement {
    user: any;
    ratings: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        user: {
            img: 'images/users/user75.jpg',
            name: 'Johhna Loren',
            totalBookings: '2032 Total Bookings'
        },
        ratings: {
            stars: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                }
            ],
            number: '5.0'
        }
    },
    {
        user: {
            img: 'images/users/user76.jpg',
            name: 'Angela Carter',
            totalBookings: '1020 Total Bookings'
        },
        ratings: {
            stars: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-line'
                }
            ],
            number: '4.5'
        }
    },
    {
        user: {
            img: 'images/users/user77.jpg',
            name: 'Skyler White',
            totalBookings: '99 Total Bookings'
        },
        ratings: {
            stars: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-line'
                }
            ],
            number: '4.0'
        }
    },
    {
        user: {
            img: 'images/users/user78.jpg',
            name: 'Jane Ronan',
            totalBookings: '89 Total Bookings'
        },
        ratings: {
            stars: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-line'
                },
                {
                    star: 'ri-star-line'
                }
            ],
            number: '3.5'
        }
    },
    {
        user: {
            img: 'images/users/user79.jpg',
            name: 'Angel Peril',
            totalBookings: '72 Total Bookings'
        },
        ratings: {
            stars: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-line'
                },
                {
                    star: 'ri-star-line'
                }
            ],
            number: '3.0'
        }
    }
];