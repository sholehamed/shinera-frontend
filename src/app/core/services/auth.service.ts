import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TenantContextService } from './tenant-context.service';
import { TokenStorageService } from './token-storage.service';


export interface AuthTokens {
   access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token?: string;
  scope?: string;
}
export interface UserInfo{
 sub? :string;
 username?:string;
 email?:string;
 given_name:string;
 picture:string;
 tenant:string;
 tenant_id:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
_http=inject(HttpClient)
_tenant=inject(TenantContextService)
_tokenStorage=inject(TokenStorageService)

login(username:string,password:string, captchaCode:string, captchaId:string): Observable<AuthTokens> {
    const body = new URLSearchParams();

    body.set('grant_type', environment.grant_type);
    body.set('client_id', environment.client_id);
    body.set('username', username);
    body.set('password', password);
    body.set('userEnteredCaptchaCode', captchaCode);
    body.set('captchaId', captchaId);
    body.set('scope', environment.scope);
    body.set('tenant', this._tenant.current!.slug);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this._http.post<AuthTokens>(
      environment.apiUrl + '/system/Auth/login',
      body.toString(),
      { headers }
    ).pipe(
      tap(response => {
        
       this.saveTokens(response)
      })
    );
  }
  CallUserInfo(){
    this._http.get<UserInfo>(environment.apiUrl +'/system/Auth/userinfo').subscribe(d=>{
        this.saveUserInfo(d)
       
    })
  }
  getAccessToken(): string | null {
    return this._tokenStorage.getAccessToken();
  }

  getRefreshToken(): string | null {
    return this._tokenStorage.getRefreshToken();
  }

  saveTokens(tokens: AuthTokens): void {
    debugger
    this._tokenStorage.setTokens(tokens.access_token, tokens.refresh_token!);
    this.CallUserInfo()
  }
  saveUserInfo(info:UserInfo){
    this._tokenStorage.setUserInfo(info.given_name,info.tenant_id,info.tenant,info.picture)
  }
  getFullName(){
    return this._tokenStorage.getUserFullname()
  }
  getUserPicture(){
    return this._tokenStorage.getUserPicture()
  }
  getUserInfo(){
    const info:UserInfo={
        given_name:this._tokenStorage.getUserFullname()!,
        picture:this._tokenStorage.getUserPicture()!,
        tenant:this._tokenStorage.getUsertenant()!,
        tenant_id:this._tokenStorage.getUsertenantId()!
    }
    return info
  }

 refreshToken(): Observable<AuthTokens> {
  const refreshToken = this.getRefreshToken();

  if (!refreshToken) {
    this.logout();
    return throwError(() => new Error('Refresh token not found.'));
  }

  const body = new HttpParams()
    .set('grant_type', 'refresh_token')
    .set('client_id', environment.client_id)
    .set('refresh_token', refreshToken);

  return this._http.post<AuthTokens>(
    environment.apiUrl + '/system/Auth/login',
    body
  ).pipe(
    tap((tokens) => {
      this.saveTokens(tokens);
    })
  );
}


  logout(): void {
    this._tokenStorage.clear();
    // اینجا می‌تونی redirect هم انجام بدی
    // مثال:
    // this.router.navigate(['/login']);
  }
}
