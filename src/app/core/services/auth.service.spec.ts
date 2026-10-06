import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

describe('AuthService', () => {
  let service: AuthService;
  let storage: TokenStorageService;
  let http: HttpTestingController;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(AuthService);
    storage = TestBed.inject(TokenStorageService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    sessionStorage.clear();
  });

  it('uses a single refresh request and rotates the refresh token', async () => {
    storage.setRefreshToken('old-refresh');

    const first = firstValueFrom(service.refreshAccessToken());
    const second = firstValueFrom(service.refreshAccessToken());

    const request = http.expectOne('https://localhost:7156/connect/token');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toContain('grant_type=refresh_token');
    expect(request.request.body).toContain('client_id=shinera-web');

    request.flush({
      access_token: 'new-access',
      refresh_token: 'new-refresh',
      token_type: 'Bearer'
    });

    expect(await first).toBe('new-access');
    expect(await second).toBe('new-access');
    expect(service.accessToken()).toBe('new-access');
    expect(storage.getRefreshToken()).toBe('new-refresh');
  });
});
