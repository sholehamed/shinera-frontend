import { TestBed } from '@angular/core/testing';

import { TemporalService } from './temporal.service';

describe('TemporalService', () => {
  let service: TemporalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemporalService);
  });

  it('serializes instants as UTC ISO-8601', () => {
    expect(service.toInstant(new Date('2026-10-06T12:30:00+03:30'))).toBe(
      '2026-10-06T09:00:00.000Z'
    );
  });

  it('serializes business dates as Gregorian YYYY-MM-DD', () => {
    expect(service.toBusinessDate(new Date(2026, 9, 6))).toBe('2026-10-06');
  });

  it('rejects non-contract business date and time strings', () => {
    expect(() => service.assertBusinessDate('1405-07-14')).toThrow();
    expect(() => service.assertBusinessTime('9:30')).toThrow();
  });
});
