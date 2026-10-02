import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import {
  BookingDate,
  BookingSlot
} from '../../models/booking-slot.model';

@Component({
  selector: 'app-booking-schedule-step',
  standalone: true,
  templateUrl: './booking-schedule-step.component.html',
  styleUrl: './booking-schedule-step.component.scss'
})
export class BookingScheduleStepComponent implements OnInit {

  @Input() dates: BookingDate[] = [];
  @Input() slots: BookingSlot[] = [];

  @Output() scheduleSelected =
    new EventEmitter<{
      date: BookingDate;
      slot: BookingSlot;
    }>();

  selectedDate: BookingDate | null = null;
  selectedSlot: BookingSlot | null = null;

  ngOnInit(): void {

    if (this.dates.length) {
      this.selectDate(this.dates[0]);
    }
  }

  selectDate(date: BookingDate): void {

    this.selectedDate = date;
    this.selectedSlot = null;
  }

  get availableSlots(): BookingSlot[] {

    if (!this.selectedDate) {
      return [];
    }

    return this.slots.filter(
      slot =>
        slot.date === this.selectedDate?.value &&
        slot.available
    );
  }

  selectSlot(slot: BookingSlot): void {
    this.selectedSlot = slot;
  }

  continue(): void {

    if (!this.selectedDate || !this.selectedSlot) {
      return;
    }

    this.scheduleSelected.emit({
      date: this.selectedDate,
      slot: this.selectedSlot
    });
  }
}