import { ApplicationConfig, provideBrowserGlobalErrorListeners, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import moment from 'moment';
import { provideJalaliDateAdapter } from './core/util/JalaliDateAdapter';

moment.locale('fa');
(moment as any).loadPersian?.({ dialect: 'persian-modern', usePersianDigits: true });

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideJalaliDateAdapter(),
  ],
};
