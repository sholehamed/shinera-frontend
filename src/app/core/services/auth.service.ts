import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom, Observable, throwError } from 'rxjs';
import { catchError, finalize, map, shareReplay, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { TokenStorageService } from './token-storage.service';

const PKCE_VERIFIER_KEY = 'shinera.auth.pkce-verifier';
const PKCE_STATE_KEY = 'shinera.auth.pkce-state';
const RETURN_URL_KEY = 'shinera.auth.return-url';

export interface InteractiveLoginRequest {
  identifier: string;
  password: string;
  captchaToken: string;
  captchaCode: string;
  returnUrl: string | null;
}

export interface InteractiveLoginResponse {
  success: boolean;
  returnUrl: string | null;
}

export interface EffectivePermission {
  key: string;
  scope: string;
  scopeReferenceId: string | null;
}

export interface CurrentUserResponse {
  user: {
    id: string;
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    imageId: string | null;
  };
  memberships: Array<{
    tenantId: string;
    name: string;
    slug: string;
  }>;
  activeTenantId: string | null;
  permissions: EffectivePermission[];
}

interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  id_token?: string;
  expires_in?: number;
  token_type: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenStorage = inject(TokenStorageService);

  private refreshRequest$: Observable<string> | null = null;

  readonly accessToken = signal<string | null>(null);
  readonly currentUser = signal<CurrentUserResponse | null>(null);

  get isAuthenticated(): boolean {
    return !!this.accessToken();
  }

  get hasRefreshToken(): boolean {
    return !!this.tokenStorage.getRefreshToken();
  }

  login(request: InteractiveLoginRequest): Observable<InteractiveLoginResponse> {
    return this.http.post<InteractiveLoginResponse>(
      this.apiUrl('/System/Auth/session/login'),
      request,
      { withCredentials: true }
    );
  }

  async beginAuthorization(returnUrl = '/app'): Promise<void> {
    const verifier = this.randomUrlSafe(64);
    const state = this.randomUrlSafe(32);
    const challenge = await this.createCodeChallenge(verifier);

    sessionStorage.setItem(PKCE_VERIFIER_KEY, verifier);
    sessionStorage.setItem(PKCE_STATE_KEY, state);
    sessionStorage.setItem(RETURN_URL_KEY, this.normalizeAppReturnUrl(returnUrl));

    const authorizeUrl = new URL(this.protocolUrl('/connect/authorize'), window.location.origin);
    authorizeUrl.searchParams.set('client_id', environment.oidc.clientId);
    authorizeUrl.searchParams.set('response_type', 'code');
    authorizeUrl.searchParams.set('redirect_uri', this.frontendUrl(environment.oidc.redirectPath));
    authorizeUrl.searchParams.set('scope', environment.oidc.scope);
    authorizeUrl.searchParams.set('code_challenge', challenge);
    authorizeUrl.searchParams.set('code_challenge_method', 'S256');
    authorizeUrl.searchParams.set('state', state);

    window.location.assign(authorizeUrl.toString());
  }

  resumeInteractiveAuthorization(returnUrl: string): void {
    if (!returnUrl.startsWith('/') || returnUrl.startsWith('//')) {
      void this.beginAuthorization('/app');
      return;
    }

    window.location.assign(new URL(returnUrl, this.protocolOrigin()).toString());
  }

  async completeAuthorizationCallback(code: string, state: string): Promise<string> {
    const expectedState = sessionStorage.getItem(PKCE_STATE_KEY);
    const verifier = sessionStorage.getItem(PKCE_VERIFIER_KEY);

    if (!expectedState || !verifier || state !== expectedState) {
      this.clearTransientAuthorization();
      throw new Error('OIDC state validation failed.');
    }

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: environment.oidc.clientId,
      code,
      code_verifier: verifier,
      redirect_uri: this.frontendUrl(environment.oidc.redirectPath)
    });

    const response = await firstValueFrom(this.exchangeToken(body));
    this.acceptTokens(response);

    const returnUrl = sessionStorage.getItem(RETURN_URL_KEY) ?? '/app';
    this.clearTransientAuthorization();

    return this.normalizeAppReturnUrl(returnUrl);
  }

  refreshAccessToken(): Observable<string> {
    if (this.refreshRequest$) {
      return this.refreshRequest$;
    }

    const refreshToken = this.tokenStorage.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token is available.'));
    }

    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: environment.oidc.clientId,
      refresh_token: refreshToken
    });

    this.refreshRequest$ = this.exchangeToken(body).pipe(
      tap(response => this.acceptTokens(response)),
      map(response => response.access_token),
      catchError(error => {
        this.clearLocalSession();
        return throwError(() => error);
      }),
      finalize(() => {
        this.refreshRequest$ = null;
      }),
      shareReplay({ bufferSize: 1, refCount: false })
    );

    return this.refreshRequest$;
  }

  async restoreSession(): Promise<boolean> {
    if (this.accessToken()) {
      return true;
    }

    if (!this.hasRefreshToken) {
      return false;
    }

    try {
      await firstValueFrom(this.refreshAccessToken());
      return true;
    } catch {
      return false;
    }
  }

  loadCurrentUser(): Observable<CurrentUserResponse> {
    return this.http
      .get<CurrentUserResponse>(this.apiUrl('/System/Auth/me'))
      .pipe(tap(user => this.currentUser.set(user)));
  }

  logout(): void {
    const idToken = this.tokenStorage.getIdToken();
    this.clearLocalSession();

    const logoutUrl = new URL(this.protocolUrl('/connect/logout'), window.location.origin);
    logoutUrl.searchParams.set(
      'post_logout_redirect_uri',
      this.frontendUrl(environment.oidc.postLogoutRedirectPath)
    );

    if (idToken) {
      logoutUrl.searchParams.set('id_token_hint', idToken);
    }

    window.location.assign(logoutUrl.toString());
  }

  clearLocalSession(): void {
    this.accessToken.set(null);
    this.currentUser.set(null);
    this.tokenStorage.clear();
    this.clearTransientAuthorization();
  }

  private exchangeToken(body: URLSearchParams): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(
      this.protocolUrl('/connect/token'),
      body.toString(),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      }
    );
  }

  private acceptTokens(response: TokenResponse): void {
    this.accessToken.set(response.access_token);

    if (response.refresh_token) {
      this.tokenStorage.setRefreshToken(response.refresh_token);
    }

    if (response.id_token) {
      this.tokenStorage.setIdToken(response.id_token);
    }
  }

  private apiUrl(path: string): string {
    return `${environment.apiBaseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
  }

  private protocolUrl(path: string): string {
    const authority = environment.oidcAuthority.replace(/\/+$/, '');
    return `${authority}/${path.replace(/^\/+/, '')}`;
  }

  private protocolOrigin(): string {
    return environment.oidcAuthority || window.location.origin;
  }

  private frontendUrl(path: string): string {
    return new URL(path, window.location.origin).toString();
  }

  private normalizeAppReturnUrl(value: string): string {
    if (!value.startsWith('/') || value.startsWith('//')) {
      return '/app';
    }

    return value;
  }

  private clearTransientAuthorization(): void {
    sessionStorage.removeItem(PKCE_VERIFIER_KEY);
    sessionStorage.removeItem(PKCE_STATE_KEY);
    sessionStorage.removeItem(RETURN_URL_KEY);
  }

  private randomUrlSafe(byteLength: number): string {
    const bytes = crypto.getRandomValues(new Uint8Array(byteLength));
    return this.base64Url(bytes);
  }

  private async createCodeChallenge(verifier: string): Promise<string> {
    const digest = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(verifier)
    );

    return this.base64Url(new Uint8Array(digest));
  }

  private base64Url(bytes: Uint8Array): string {
    let binary = '';
    bytes.forEach(byte => {
      binary += String.fromCharCode(byte);
    });

    return btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/g, '');
  }
}
