import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';
import { WorkspaceSelectionStore } from '../services/workspace-selection.store';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const auth = inject(AuthService);
  const workspace = inject(WorkspaceSelectionStore);

  const prepared = prepareRequest(request, auth.accessToken(), workspace);
  return next(prepared).pipe(
    catchError(error => handleUnauthorized(error, prepared, next, auth, workspace))
  );
};

function prepareRequest(
  request: HttpRequest<unknown>,
  accessToken: string | null,
  workspace: WorkspaceSelectionStore
): HttpRequest<unknown> {
  if (!isShineraApiRequest(request.url)) {
    return request;
  }

  const headers: Record<string, string> = {};

  if (accessToken && !isAnonymousApi(request.url)) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const tenantId = workspace.tenantId();
  const branchId = workspace.branchId();

  if (tenantId) {
    headers['X-Tenant-Id'] = tenantId;
  }

  if (branchId) {
    headers['X-Branch-Id'] = branchId;
  }

  return Object.keys(headers).length ? request.clone({ setHeaders: headers }) : request;
}

function handleUnauthorized(
  error: unknown,
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  auth: AuthService,
  workspace: WorkspaceSelectionStore
): Observable<HttpEvent<unknown>> {
  if (
    !(error instanceof HttpErrorResponse) ||
    error.status !== 401 ||
    isAnonymousApi(request.url) ||
    !auth.hasRefreshToken
  ) {
    return throwError(() => error);
  }

  return auth.refreshAccessToken().pipe(
    switchMap(accessToken => next(prepareRequest(request, accessToken, workspace))),
    catchError(refreshError => throwError(() => refreshError))
  );
}

function isShineraApiRequest(url: string): boolean {
  if (url.startsWith('/api/')) {
    return true;
  }

  const base = environment.apiBaseUrl.replace(/\/+$/, '');
  return !!base && url.startsWith(base);
}

function isAnonymousApi(url: string): boolean {
  return (
    url.includes('/System/Auth/session/login') ||
    url.includes('/System/Auth/captcha/') ||
    url.includes('/System/Registration')
  );
}
