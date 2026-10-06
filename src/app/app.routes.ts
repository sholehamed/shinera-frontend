import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { FrontPagesComponent } from './layouts/fp-layout/front-pages.component';
import { PublicProfileComponent } from './features/public-profile/public-profile.component';
import { PublicBookingPageComponent } from './features/booking-page/booking-page.component';
import { CustomerPagesComponent } from './layouts/cp-layout/customer-pages.component';
import { PanelLayoutComponent } from './layouts/panel-layout/panel-layout.component';
import { SignupCheckoutComponent } from './features/signup-checkout/signup-checkout.component';
import { SignInComponent } from './features/auth/sign-in/sign-in.component';

export const routes: Routes = [
  {
    path: '',
    component: FrontPagesComponent,
    children: [{ path: '', component: HomeComponent },
      { path: 'start', component: SignupCheckoutComponent }
    ],
  },
  { path: 'app', redirectTo: 'app/dashboard' },
  {
    path: 's/:slug',
    component: CustomerPagesComponent,
    children: [
      { path: '', component: PublicProfileComponent },
      { path: 'booking', component: PublicBookingPageComponent },
    ],
  },
  {
    path: 's/:slug/auth',
    children: [
      { path: 'login', component: SignInComponent },
    ],
  },
  {
    path: 'app',
    component: PanelLayoutComponent,
    loadChildren: () => import('./features/app/app.routes'),
  },
  {
    path: 'admin',
    component: PanelLayoutComponent,
    loadChildren: () => import('./features/admin/admin.routes'),
  },
];
