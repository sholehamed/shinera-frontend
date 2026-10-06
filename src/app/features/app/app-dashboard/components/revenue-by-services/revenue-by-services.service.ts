// revenue-by-services.service.ts

import { Injectable } from '@angular/core';
import {
    RevenueByServicesData,
    RevenueTimeframe
} from './revenue-by-services.models';

@Injectable({
    providedIn: 'root'
})
export class RevenueByServicesService {

    private readonly mockData: Record<
        RevenueTimeframe,
        RevenueByServicesData
    > = {

        Daily: {
            categories: [
                'شنبه',
                'یکشنبه',
                'دوشنبه',
                'سه‌شنبه',
                'چهارشنبه',
                'پنجشنبه',
                'جمعه'
            ],
            series: [
                {
                    name: 'فیشال',
                    data: [18, 24, 21, 29, 26, 32, 15]
                },
                {
                    name: 'مانیکور',
                    data: [12, 16, 14, 19, 17, 21, 10]
                },
                {
                    name: 'پدیکور',
                    data: [8, 11, 10, 14, 12, 16, 7]
                },
                {
                    name: 'کوتاهی مو',
                    data: [14, 19, 17, 23, 20, 25, 11]
                }
            ]
        },

        Weekly: {
            categories: [
                'هفته اول',
                'هفته دوم',
                'هفته سوم',
                'هفته چهارم'
            ],
            series: [
                {
                    name: 'فیشال',
                    data: [120, 145, 138, 172]
                },
                {
                    name: 'مانیکور',
                    data: [82, 96, 91, 108]
                },
                {
                    name: 'پدیکور',
                    data: [54, 68, 63, 75]
                },
                {
                    name: 'کوتاهی مو',
                    data: [94, 112, 105, 128]
                }
            ]
        },

        Monthly: {
            categories: [
                'فروردین',
                'اردیبهشت',
                'خرداد',
                'تیر',
                'مرداد',
                'شهریور',
                'مهر',
                'آبان',
                'آذر',
                'دی',
                'بهمن',
                'اسفند'
            ],
            series: [
                {
                    name: 'فیشال',
                    data: [
                        420, 510, 480, 590,
                        630, 570, 680, 720,
                        650, 760, 810, 890
                    ]
                },
                {
                    name: 'مانیکور',
                    data: [
                        280, 320, 305, 360,
                        390, 370, 420, 450,
                        430, 470, 510, 550
                    ]
                },
                {
                    name: 'پدیکور',
                    data: [
                        190, 220, 215, 250,
                        270, 260, 290, 310,
                        300, 330, 350, 380
                    ]
                },
                {
                    name: 'کوتاهی مو',
                    data: [
                        340, 390, 370, 430,
                        460, 440, 510, 540,
                        500, 570, 610, 680
                    ]
                }
            ]
        },

        Yearly: {
            categories: [
                '۱۴۰۱',
                '۱۴۰۲',
                '۱۴۰۳',
                '۱۴۰۴',
                '۱۴۰۵'
            ],
            series: [
                {
                    name: 'فیشال',
                    data: [4200, 5600, 7100, 8400, 9800]
                },
                {
                    name: 'مانیکور',
                    data: [2900, 3600, 4500, 5300, 6200]
                },
                {
                    name: 'پدیکور',
                    data: [1800, 2300, 2900, 3400, 4100]
                },
                {
                    name: 'کوتاهی مو',
                    data: [3400, 4300, 5200, 6400, 7500]
                }
            ]
        }
    };

    getRevenueByServices(
        timeframe: RevenueTimeframe
    ): RevenueByServicesData {

        return this.mockData[timeframe];
    }
}