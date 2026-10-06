import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { workspaceGuard } from './core/guards/workspace.guard';
import { AuthCallbackComponent } from './features/auth/auth-callback.component';
import { SignInComponent } from './features/auth/sign-in/sign-in.component';
import { PublicBookingPageComponent } from './features/booking-page/booking-page.component';
import { HomeComponent } from './features/home/home.component';
import { PublicProfileComponent } from './features/public-profile/public-profile.component';
import { SignupCheckoutComponent } from './features/signup-checkout/signup-checkout.component';
import { AccessStatusComponent } from './features/status/access-status.component';
import { WorkspaceSelectorComponent } from './features/workspace/workspace-selector.component';
import { CustomerPagesComponent } from './layouts/cp-layout/customer-pages.component';
import { FrontPagesComponent } from './layouts/fp-layout/front-pages.component';
import { PanelLayoutComponent } from './layouts/panel-layout/panel-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: FrontPagesComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'register', component: SignupCheckoutComponent },
      { path: 'start', redirectTo: 'register', pathMatch: 'full' }
    ]
  },
  {
    path: 'auth',
    children: [
      { path: 'login', component: SignInComponent },
      { path: 'callback', component: AuthCallbackComponent }
    ]
  },
  {
    path: 'workspace/select',
    component: WorkspaceSelectorComponent,
    canActivate: [authGuard]
  },
  {
    path: 's/:slug',
    component: CustomerPagesComponent,
    children: [
      { path: '', component: PublicProfileComponent },
      { path: 'booking', component: PublicBookingPageComponent }
    ]
  },
  {
    path: 'app',
    component: PanelLayoutComponent,
    canActivate: [workspaceGuard],
    loadChildren: () => import('./features/app/app.routes')
  },
  {
    path: 'admin',
    component: PanelLayoutComponent,
    canActivate: [workspaceGuard],
    loadChildren: () => import('./features/admin/admin.routes')
  },
  { path: 'forbidden', component: AccessStatusComponent },
  { path: 'feature-unavailable', component: AccessStatusComponent },
  { path: '**', redirectTo: '' }
];
