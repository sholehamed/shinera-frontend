import { Injectable } from '@angular/core';

const REFRESH_TOKEN_KEY = 'shinera.auth.refresh-token';
const ID_TOKEN_KEY = 'shinera.auth.id-token';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  getRefreshToken(): string | null {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY);
  }

  setRefreshToken(token: string | null): void {
    if (!token) {
      sessionStorage.removeItem(REFRESH_TOKEN_KEY);
      return;
    }

    sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  getIdToken(): string | null {
    return sessionStorage.getItem(ID_TOKEN_KEY);
  }

  setIdToken(token: string | null): void {
    if (!token) {
      sessionStorage.removeItem(ID_TOKEN_KEY);
      return;
    }

    sessionStorage.setItem(ID_TOKEN_KEY, token);
  }

  clear(): void {
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(ID_TOKEN_KEY);
  }
}
