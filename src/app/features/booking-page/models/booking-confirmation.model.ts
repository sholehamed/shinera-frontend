import { BookingService } from './booking-service.model';
import { BookingStaff } from './booking-staff.model';
import { BookingDate, BookingSlot } from './booking-slot.model';
import { BookingCustomer } from './booking-customer.model';

export interface BookingConfirmation {
  service: BookingService;
  staff?: BookingStaff | null;
  date: BookingDate;
  slot: BookingSlot;
  customer: BookingCustomer;
}