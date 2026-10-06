import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookingConfirmation } from '../../models/booking-confirmation.model';

@Component({
  selector: 'app-booking-confirmation',
  standalone: true,
  templateUrl: './booking-confirmation.component.html',
  styleUrl: './booking-confirmation.component.scss'
})
export class BookingConfirmationComponent {

  @Input() booking: BookingConfirmation | null = null;

  @Output() back = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<BookingConfirmation>();

  onBack(): void {
    this.back.emit();
  }

  confirm(): void {
    if (!this.booking) {
      return;
    }

    this.confirmed.emit(this.booking);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  }
}