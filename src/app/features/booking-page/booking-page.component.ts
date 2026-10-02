import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookingServiceStepComponent } from './components/booking-service-step/booking-service-step.component';
import { BookingService } from './models/booking-service.model';
import { BookingStaffStepComponent } from './components/booking-staff-step/booking-staff-step.component';
import { BookingStaff } from './models/booking-staff.model';
import { BookingDate, BookingSlot } from './models/booking-slot.model';
import { BookingScheduleStepComponent } from './components/booking-schedule-step/booking-schedule-step.component';
import { BookingCustomerStepComponent } from './components/booking-customer-step/booking-customer-step.component';
import { BookingCustomer } from './models/booking-customer.model';
import { BookingConfirmationComponent } from './components/booking-confirmation/booking-confirmation.component';
import { BookingConfirmation } from './models/booking-confirmation.model';

@Component({
  selector: 'app-public-booking-page',
  standalone: true,
  imports: [
    RouterLink,
    BookingServiceStepComponent,
    BookingStaffStepComponent,
    BookingScheduleStepComponent,
    BookingCustomerStepComponent,
    BookingConfirmationComponent,
  ],
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.scss',
})
export class PublicBookingPageComponent implements OnInit {
  currentStep = 1;
ngOnInit(): void {
  window.scrollTo(0, 0);
}
  get bookingConfirmation(): BookingConfirmation | null {
    if (
      !this.selectedService ||
      !this.selectedDate ||
      !this.selectedSlot ||
      !this.selectedCustomer
    ) {
      return null;
    }

    return {
      service: this.selectedService,
      staff: this.selectedStaff,
      date: this.selectedDate,
      slot: this.selectedSlot,
      customer: this.selectedCustomer,
    };
  }
  dates: BookingDate[] = [
    {
      value: '1405-07-05',
      dayName: 'شنبه',
      dayNumber: 5,
      monthName: 'مهر',
    },
    {
      value: '1405-07-06',
      dayName: 'یکشنبه',
      dayNumber: 6,
      monthName: 'مهر',
    },
    {
      value: '1405-07-07',
      dayName: 'دوشنبه',
      dayNumber: 7,
      monthName: 'مهر',
    },
    {
      value: '1405-07-08',
      dayName: 'سه‌شنبه',
      dayNumber: 8,
      monthName: 'مهر',
    },
    {
      value: '1405-07-09',
      dayName: 'چهارشنبه',
      dayNumber: 9,
      monthName: 'مهر',
    },
    {
      value: '1405-07-10',
      dayName: 'پنجشنبه',
      dayNumber: 10,
      monthName: 'مهر',
    },
    {
      value: '1405-07-11',
      dayName: 'جمعه',
      dayNumber: 11,
      monthName: 'مهر',
    },
  ];
  selectedDate: BookingDate | null = null;
  selectedSlot: BookingSlot | null = null;

  onScheduleSelected(event: { date: BookingDate; slot: BookingSlot }): void {
    this.selectedDate =event.date;
    this.selectedSlot =event.slot;
    console.log('Selected schedule:', event);

    this.nextStep();
  }
  slots: BookingSlot[] = [
    { id: '1', date: '1405-07-05', time: '10:00', available: true },
    { id: '2', date: '1405-07-05', time: '11:00', available: true },
    { id: '3', date: '1405-07-05', time: '12:00', available: false },
    { id: '4', date: '1405-07-05', time: '14:00', available: true },
    { id: '5', date: '1405-07-05', time: '15:00', available: true },
    { id: '6', date: '1405-07-05', time: '16:00', available: true },

    { id: '7', date: '1405-07-06', time: '10:00', available: true },
    { id: '8', date: '1405-07-06', time: '11:30', available: true },
    { id: '9', date: '1405-07-06', time: '14:00', available: true },
    { id: '10', date: '1405-07-06', time: '17:00', available: true },
  ];
  staff: BookingStaff[] = [
    {
      id: '1',
      name: 'آیدا محمدی',
      title: 'متخصص مو',
      description: 'متخصص رنگ، مش و استایل مو',
    },
    {
      id: '2',
      name: 'سارا احمدی',
      title: 'متخصص ناخن',
      description: 'متخصص طراحی و خدمات ناخن',
    },
    {
      id: '3',
      name: 'مریم رضایی',
      title: 'میکاپ آرتیست',
      description: 'متخصص میکاپ و گریم',
    },
  ];
  selectedCustomer: BookingCustomer | null = null;

  onCustomerSubmitted(customer: BookingCustomer): void {
    this.selectedCustomer = customer;

    this.nextStep();
  }
  get hasStaffStep(): boolean {
  return this.isSalon;
}
get staffStep(): number {
  return 2;
}

get scheduleStep(): number {
  return this.isSalon ? 3 : 2;
}

get customerStep(): number {
  return this.isSalon ? 4 : 3;
}

get confirmationStep(): number {
  return this.isSalon ? 5 : 4;
}
 nextStep(): void {
  if (this.currentStep < this.confirmationStep) {
    this.currentStep++;
  }
}
onStaffSelected(staff: BookingStaff): void {
  this.selectedStaff = staff;

  this.nextStep();
}
  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  selectedService:BookingService|null=null
  onServiceSelected(service: BookingService): void {
    console.log('Selected service:', service);
this.selectedService=service;
    this.nextStep();
  }
  onBookingConfirmed(booking: BookingConfirmation): void {
  console.log('Booking confirmed:', booking);

  this.nextStep();
}
isSalon = false;

ownerStaff: BookingStaff = {
  id: 'owner',
  name: 'آیدا محمدی',
  title: 'متخصص زیبایی',
  description: 'ارائه خدمات تخصصی زیبایی و مراقبت',
};

selectedStaff: BookingStaff | null = this.isSalon
  ? null
  : this.ownerStaff;
  services: BookingService[] = [
    {
      id: '1',
      name: 'کوتاهی مو',
      description: 'کوتاهی و فرم‌دهی مو',
      duration: 45,
      price: 500000,
      category: 'مو',
    },
    {
      id: '2',
      name: 'رنگ و مش',
      description: 'رنگ، مش و تکنیک‌های تخصصی',
      duration: 90,
      price: 1200000,
      category: 'مو',
    },
    {
      id: '3',
      name: 'طراحی ناخن',
      description: 'مانیکور و طراحی تخصصی ناخن',
      duration: 60,
      price: 650000,
      category: 'ناخن',
    },
    {
      id: '4',
      name: 'میکاپ',
      description: 'میکاپ تخصصی برای مراسم',
      duration: 75,
      price: 900000,
      category: 'میکاپ',
    },
  ];
}
