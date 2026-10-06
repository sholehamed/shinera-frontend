export const environment = {
  production: true,
  appName: 'Shinera',
  apiBaseUrl: '/api',
  apiUrl: '/api',
  oidcAuthority: '',
  oidc: {
    clientId: 'shinera-web',
    scope: 'openid profile email shinera_api offline_access',
    redirectPath: '/auth/callback',
    postLogoutRedirectPath: '/'
  }
} as const;
