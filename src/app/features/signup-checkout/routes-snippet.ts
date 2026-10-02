// app.routes.ts (or your public route file)
import { Routes } from '@angular/router';
import { SignupCheckoutComponent } from './signup-checkout.component';

export const routes: Routes = [
    {
        path: 'start',
        component: SignupCheckoutComponent
    },
    {
        // Allows: /start/salon-pro
        path: 'start/:plan',
        component: SignupCheckoutComponent
    }
];

// Also supported by the component:
// /start?plan=salon-pro
