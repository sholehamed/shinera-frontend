import { Routes } from '@angular/router';
import { AppDashboardComponent } from './app-dashboard/app-dashboard.component';

export default [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: AppDashboardComponent
  }
] as Routes;
