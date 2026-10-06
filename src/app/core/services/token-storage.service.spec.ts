import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { TokenStorageService } from './token-storage.service';

describe('TokenStorageService', () => {
  let service: TokenStorageService;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(TokenStorageService);
  });

  afterEach(() => sessionStorage.clear());

  it('keeps refresh and ID tokens in session storage only', () => {
    service.setRefreshToken('refresh-token');
    service.setIdToken('id-token');

    expect(service.getRefreshToken()).toBe('refresh-token');
    expect(service.getIdToken()).toBe('id-token');
    expect(localStorage.getItem('shinera.auth.refresh-token')).toBeNull();
  });

  it('clears persisted authentication material', () => {
    service.setRefreshToken('refresh-token');
    service.setIdToken('id-token');

    service.clear();

    expect(service.getRefreshToken()).toBeNull();
    expect(service.getIdToken()).toBeNull();
  });
});
