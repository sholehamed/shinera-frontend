import {
    AfterViewInit,
    Component,
    ViewChild
} from '@angular/core';

import {
    MatCardModule
} from '@angular/material/card';

import {
    MatMenuModule
} from '@angular/material/menu';

import {
    MatButtonModule
} from '@angular/material/button';

import {
    MatIconModule
} from '@angular/material/icon';

import {
    MatTableDataSource,
    MatTableModule
} from '@angular/material/table';

import {
    MatPaginator,
    MatPaginatorIntl,
    MatPaginatorModule
} from '@angular/material/paginator';

import {
    CustomerSegment,
    TopCustomer,
    TopCustomersPeriod
} from './top-customers.model';

import {
    TOP_CUSTOMERS_MOCK
} from './top-customers.mock';

import {
    CustomizerSettingsService
} from '../../../../../core/util/customizer-settings.service';


@Component({
    selector: 'app-top-customers',

    imports: [
        MatCardModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule
    ],

    templateUrl:
        './top-customers.component.html',

    styleUrl:
        './top-customers.component.scss'
})
export class TopCustomersComponent
    implements AfterViewInit {

    readonly data =
        TOP_CUSTOMERS_MOCK;


    displayedColumns: string[] = [
        'customer',
        'lastVisit',
        'preferredService',
        'visitCount',
        'totalSpent',
        'segment',
        'action'
    ];


    dataSource =
        new MatTableDataSource<TopCustomer>(
            this.data.customers
        );


    selectedPeriod:
        TopCustomersPeriod =
        this.data.period;


    readonly periodOptions = [

        {
            value: '7d' as TopCustomersPeriod,
            label: '۷ روز گذشته'
        },

        {
            value: '30d' as TopCustomersPeriod,
            label: '۳۰ روز گذشته'
        },

        {
            value: '90d' as TopCustomersPeriod,
            label: '۹۰ روز گذشته'
        },

        {
            value: 'year' as TopCustomersPeriod,
            label: 'سال جاری'
        }

    ];


    @ViewChild(MatPaginator)
    paginator!: MatPaginator;


    constructor(
        public themeService:
            CustomizerSettingsService,
        paginatorIntl:
            MatPaginatorIntl
    ) {

        paginatorIntl.itemsPerPageLabel =
            'تعداد در صفحه';

        paginatorIntl.nextPageLabel =
            'صفحه بعد';

        paginatorIntl.previousPageLabel =
            'صفحه قبل';

        paginatorIntl.firstPageLabel =
            'صفحه اول';

        paginatorIntl.lastPageLabel =
            'صفحه آخر';

    }


    ngAfterViewInit(): void {

        this.dataSource.paginator =
            this.paginator;

    }


    get selectedPeriodLabel(): string {

        return this.periodOptions.find(
            x =>
                x.value ===
                this.selectedPeriod
        )?.label ?? '';

    }


    onPeriodChange(
        period: TopCustomersPeriod
    ): void {

        this.selectedPeriod =
            period;

        // بعداً:
        // API call
    }


    getSegmentText(
        segment: CustomerSegment
    ): string {

        switch (segment) {

            case 'vip':
                return 'VIP';

            case 'loyal':
                return 'وفادار';

            case 'regular':
                return 'عادی';

            case 'new':
                return 'جدید';

            case 'at-risk':
                return 'در معرض ریزش';

        }

    }


    formatCurrency(
        value: number
    ): string {

        return new Intl.NumberFormat(
            'fa-IR',
            {
                notation: 'compact',
                maximumFractionDigits: 1
            }
        ).format(value);

    }


    formatLastVisit(
        date: string
    ): string {

        return new Intl.DateTimeFormat(
            'fa-IR',
            {
                month: 'short',
                day: 'numeric'
            }
        ).format(
            new Date(date)
        );

    }

}