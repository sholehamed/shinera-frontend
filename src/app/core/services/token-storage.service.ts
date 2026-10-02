import { Injectable } from '@angular/core';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const Tenant = 'tenant';
const TenantId = 'tenantId';
const FullName = 'fullname';
const Picure = 'picture';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
  setUserInfo(fullName:string,tenantId:string,tenant:string,picture:string){
    localStorage.setItem(Tenant, tenant);
    localStorage.setItem(TenantId, tenantId);
    localStorage.setItem(FullName, fullName);
    localStorage.setItem(Picure, picture);
  }
  getUserFullname(){
        return localStorage.getItem(FullName);
  }
  getUsertenant(){
       return localStorage.getItem(Tenant);
  }
  getUsertenantId(){
       return localStorage.getItem(TenantId);
  }
  getUserPicture(){
       return localStorage.getItem(Picure);
  }
  clear(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
}
