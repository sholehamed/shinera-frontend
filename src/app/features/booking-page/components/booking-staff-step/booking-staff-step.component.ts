import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { BookingStaff } from '../../models/booking-staff.model';

@Component({
  selector: 'app-booking-staff-step',
  standalone: true,
  templateUrl: './booking-staff-step.component.html',
  styleUrl: './booking-staff-step.component.scss'
})
export class BookingStaffStepComponent {

  @Input() staff: BookingStaff[] = [];

  @Output() staffSelected =
    new EventEmitter<BookingStaff>();

  selectedStaffId: string | null = null;

  selectStaff(staff: BookingStaff): void {
    this.selectedStaffId = staff.id;
  }

  continue(): void {

    const staff = this.staff.find(
      x => x.id === this.selectedStaffId
    );

    if (!staff) {
      return;
    }

    this.staffSelected.emit(staff);
  }
}