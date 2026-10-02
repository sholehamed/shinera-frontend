import {
    Component,
    inject
} from '@angular/core';

import {
    CommonModule
} from '@angular/common';

import {
    FormsModule
} from '@angular/forms';

import {
    NgScrollbarModule
} from 'ngx-scrollbar';

import {
    MatCardModule
} from '@angular/material/card';

import {
    MatButtonModule
} from '@angular/material/button';

import {
    MatIconModule
} from '@angular/material/icon';

import {
    MatFormFieldModule
} from '@angular/material/form-field';

import {
    MatSelectModule
} from '@angular/material/select';

import {
    MatInputModule
} from '@angular/material/input';

import {
    DateAdapter
} from '@angular/material/core';

import {
    MatDatepickerModule
} from '@angular/material/datepicker';

import moment from 'jalali-moment';

import {
    CustomizerSettingsService
} from '../../../../../core/util/customizer-settings.service';

import {
    Appointment,
    AppointmentDashboardFilter,
    AppointmentStatus,
    AppointmentStatusFilter
} from './recent-appoinments.model';

import {
    RECENT_APPOINTMENTS_MOCK
} from './recent-appointments.mock';


@Component({
    selector: 'app-recent-appointments',

    imports: [
        CommonModule,
        FormsModule,

        NgScrollbarModule,

        MatCardModule,
        MatButtonModule,
        MatIconModule,

        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,

        MatDatepickerModule
    ],

    templateUrl:
        './recent-appointments.component.html',

    styleUrl:
        './recent-appointments.component.scss'
})
export class RecentAppointmentsComponent {
readonly dateAdapter:DateAdapter<moment.Moment>=inject(DateAdapter<moment.Moment>)

    readonly data =
        RECENT_APPOINTMENTS_MOCK;


    /**
     * DateAdapter is Jalali-based.
     * selectedDate therefore must be Moment, not JS Date.
     */
    selectedDate: moment.Moment =
        this.dateAdapter.today();


    filter: AppointmentDashboardFilter = {

        /**
         * Backend / DB date key remains Gregorian.
         * Example: 2026-09-28
         */
        date: this.toDateKey(
            this.selectedDate
        ),

        status: 'all',

        staffId: null,

        search: ''
    };


    readonly statusOptions: {
        value: AppointmentStatusFilter;
        title: string;
    }[] = [

        {
            value: 'all',
            title: 'همه وضعیت‌ها'
        },

        {
            value: 'upcoming',
            title: 'پیش رو'
        },

        {
            value: 'completed',
            title: 'انجام شده'
        },

        {
            value: 'cancelled',
            title: 'لغو شده'
        },

        {
            value: 'no-show',
            title: 'عدم حضور'
        }

    ];

    constructor(
      

        public themeService:
            CustomizerSettingsService
    ) {}


    /**
     * Jalali display only.
     * Example: یکشنبه ۶ مهر
     */
    get formattedDate(): string {

        if (
            !this.selectedDate ||
            !this.dateAdapter.isValid(
                this.selectedDate
            )
        ) {
            return '';
        }

        return this.dateAdapter.format(
            this.selectedDate,
            'dddd jD jMMMM'
        );

    }


    get filteredAppointments(): Appointment[] {

        const search =
            this.filter.search
                ?.trim()
                .toLowerCase();

        return this.data.appointments

            .filter(item => {

                /**
                 * Gregorian date comparison.
                 */
                if (
                    item.date !==
                    this.filter.date
                ) {
                    return false;
                }


                if (
                    this.filter.status !== 'all' &&
                    item.status !==
                        this.filter.status
                ) {
                    return false;
                }


                if (
                    this.data.isSalon &&
                    this.filter.staffId != null &&
                    item.staff.id !==
                        this.filter.staffId
                ) {
                    return false;
                }


                if (search) {

                    const searchable =
                        [
                            item.client.name,
                            item.staff.name,
                            item.serviceName
                        ]
                        .join(' ')
                        .toLowerCase();

                    if (
                        !searchable.includes(
                            search
                        )
                    ) {
                        return false;
                    }

                }


                return true;

            })

            .sort(
                (a, b) =>
                    a.startTime.localeCompare(
                        b.startTime
                    )
            );

    }


    get totalAppointments(): number {

        return this
            .filteredAppointments
            .length;

    }


    get completedCount(): number {

        return this
            .filteredAppointments
            .filter(
                item =>
                    item.status ===
                    'completed'
            )
            .length;

    }


    get remainingCount(): number {

        return this
            .filteredAppointments
            .filter(
                item =>
                    item.status ===
                    'upcoming'
            )
            .length;

    }


    /**
     * Active filter indicator.
     * Date is intentionally not considered a removable filter,
     * because the selected day is part of the dashboard context.
     */
    get hasActiveFilters(): boolean {

        return (
            this.filter.status !== 'all' ||

            this.filter.staffId != null ||

            !!this.filter.search?.trim()
        );

    }


    get isTodaySelected(): boolean {

        return this.dateAdapter.sameDate(
            this.selectedDate,
            this.dateAdapter.today()
        );

    }


    get isTomorrowSelected(): boolean {

        const tomorrow =
            this.dateAdapter
                .addCalendarDays(
                    this.dateAdapter.today(),
                    1
                );

        return this.dateAdapter.sameDate(
            this.selectedDate,
            tomorrow
        );

    }


    selectToday(): void {

        this.setDate(
            this.dateAdapter.today()
        );

    }


    selectTomorrow(): void {

        const tomorrow =
            this.dateAdapter
                .addCalendarDays(
                    this.dateAdapter.today(),
                    1
                );

        this.setDate(tomorrow);

    }


    onDateSelected(
        date: moment.Moment | null
    ): void {

        if (
            !date ||
            !this.dateAdapter.isValid(date)
        ) {
            return;
        }

        this.setDate(date);

    }


    clearFilters(): void {

        this.filter = {
            ...this.filter,

            status: 'all',

            staffId: null,

            search: ''
        };

    }


    getStatusText(
        status: AppointmentStatus
    ): string {

        switch (status) {

            case 'completed':
                return 'انجام شده';

            case 'upcoming':
                return 'پیش رو';

            case 'cancelled':
                return 'لغو شده';

            case 'no-show':
                return 'عدم حضور';

        }

    }


    getStatusIcon(
        status: AppointmentStatus
    ): string {

        switch (status) {

            case 'completed':
                return 'check_circle';

            case 'upcoming':
                return 'schedule';

            case 'cancelled':
                return 'cancel';

            case 'no-show':
                return 'person_off';

        }

    }


    private setDate(
        date: moment.Moment
    ): void {

        /**
         * Moment is mutable, therefore keep our own clone.
         */
        const selectedDate =
            this.dateAdapter.clone(date);

        this.selectedDate =
            selectedDate;

        this.filter = {
            ...this.filter,

            /**
             * Gregorian key for API / DB.
             */
            date:
                this.toDateKey(
                    selectedDate
                )
        };

    }


    /**
     * Converts the selected Jalali-enabled Moment
     * to a Gregorian date key expected by backend.
     *
     * Jalali:
     * jYYYY-jMM-jDD
     *
     * Gregorian:
     * YYYY-MM-DD
     */
   private toDateKey(
    date: moment.Moment
): string {
    return date
        .clone()
        .locale('en')
        .format('YYYY-MM-DD');
}

}