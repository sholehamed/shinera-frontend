import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookingService } from '../../models/booking-service.model';

@Component({
  selector: 'app-booking-service-step',
  standalone: true,
  templateUrl: './booking-service-step.component.html',
  styleUrl: './booking-service-step.component.scss'
})
export class BookingServiceStepComponent {

  @Input() services: BookingService[] = [];

  @Output() serviceSelected = new EventEmitter<BookingService>();

  selectedServiceId: string | null = null;

  selectService(service: BookingService): void {
    this.selectedServiceId = service.id;
  }

  continue(): void {

    const service = this.services.find(
      x => x.id === this.selectedServiceId
    );

    if (!service) {
      return;
    }

    this.serviceSelected.emit(service);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('fa-IR').format(price);
  }

}