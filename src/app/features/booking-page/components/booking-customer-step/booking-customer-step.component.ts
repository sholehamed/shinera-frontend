import {
  Component,
  EventEmitter,
  inject,
  Output
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-booking-customer-step',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './booking-customer-step.component.html',
  styleUrl: './booking-customer-step.component.scss'
})
export class BookingCustomerStepComponent {

  @Output() customerSubmitted =
    new EventEmitter<{
      fullName: string;
      mobile: string;
      note?: string;
    }>();
fb=inject(FormBuilder)
  form = this.fb.nonNullable.group({
    fullName: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ],

    mobile: [
      '',
      [
        Validators.required,
        Validators.pattern(/^09\d{9}$/)
      ]
    ],

    note: [
      ''
    ]
  });



  submit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.customerSubmitted.emit(
      this.form.getRawValue()
    );
  }

  get fullName() {
    return this.form.controls.fullName;
  }

  get mobile() {
    return this.form.controls.mobile;
  }
}