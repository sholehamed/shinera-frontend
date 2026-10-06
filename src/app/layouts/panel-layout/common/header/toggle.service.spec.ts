import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ToggleService } from './toggle.service';

describe('ToggleService', () => {
  let service: ToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(ToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
