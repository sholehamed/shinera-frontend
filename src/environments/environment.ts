export const environment = {
  production: false,
  appName: 'Shinera',
  apiBaseUrl: 'https://localhost:7156/api',
  apiUrl: 'https://localhost:7156/api',
  oidcAuthority: 'https://localhost:7156',
  oidc: {
    clientId: 'shinera-web',
    scope: 'openid profile email shinera_api offline_access',
    redirectPath: '/auth/callback',
    postLogoutRedirectPath: '/'
  }
} as const;
