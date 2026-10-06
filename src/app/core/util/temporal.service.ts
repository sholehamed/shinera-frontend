import { Injectable } from '@angular/core';

const BUSINESS_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const BUSINESS_TIME_PATTERN = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;

@Injectable({ providedIn: 'root' })
export class TemporalService {
  toInstant(value: Date): string {
    if (Number.isNaN(value.getTime())) {
      throw new Error('Invalid instant.');
    }

    return value.toISOString();
  }

  toBusinessDate(value: Date): string {
    if (Number.isNaN(value.getTime())) {
      throw new Error('Invalid business date.');
    }

    return [
      value.getFullYear().toString().padStart(4, '0'),
      (value.getMonth() + 1).toString().padStart(2, '0'),
      value.getDate().toString().padStart(2, '0')
    ].join('-');
  }

  assertBusinessDate(value: string): string {
    if (!BUSINESS_DATE_PATTERN.test(value)) {
      throw new Error('Business dates must use YYYY-MM-DD Gregorian format.');
    }

    return value;
  }

  assertBusinessTime(value: string): string {
    if (!BUSINESS_TIME_PATTERN.test(value)) {
      throw new Error('Business times must use HH:mm:ss format.');
    }

    return value;
  }
}
