import { NgClass } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CustomizerSettingsService } from "../../../core/util/customizer-settings.service";
import { ToggleService } from "../../../layouts/panel-layout/common/header/toggle.service";
import {  TodayCapacityComponent } from "./components/today-capacity/customer-satisfaction-rate.component";
import { CustomersFromChannelsComponent } from "./components/customers-from-channels/customers-from-channels.component";
import { FeaturedServicesComponent } from "./components/featured-services/featured-services.component";
import { NewCustomersComponent } from "./components/new-customers/new-customers.component";
import { RecentAppointmentsComponent } from "./components/recent-appointments/recent-appointments.component";
import { RevenueByServicesComponent } from "./components/revenue-by-services/revenue-by-services.component";
import { TopCustomersComponent } from "./components/top-customers/top-customers.component";
import { TopSellingProductsComponent } from "./components/top-selling-products/top-selling-products.component";
import { TopStylistPerformanceComponent } from "./components/top-stylist-performance/top-stylist-performance.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { DashboardOverviewComponent } from "./components/dashboard-overview/dashboard-overview.component";
import { AttentionSummaryComponent } from "./components/new-customers/attention-summary.component";
import { BookingSourcesComponent } from "./components/customers-from-channels/booking-sources.component";
import { SoloPerformanceComponent } from "./components/solo-performance/solo-performance.component";

@Component({
    selector: 'app-app-dashboard',
    imports: [WelcomeComponent,BookingSourcesComponent,SoloPerformanceComponent, NewCustomersComponent, TopSellingProductsComponent, CustomersFromChannelsComponent, FeaturedServicesComponent, RecentAppointmentsComponent, RevenueByServicesComponent, TopStylistPerformanceComponent, TopCustomersComponent, DashboardOverviewComponent, TodayCapacityComponent, AttentionSummaryComponent],
    templateUrl: './app-dashboard.component.html',
    styleUrl: './app-dashboard.component.scss',
        standalone: true

})
export class AppDashboardComponent {
    private readonly toggleService = inject(ToggleService);
    readonly themeService = inject(CustomizerSettingsService);

    readonly isSidebarToggled = this.toggleService.isSidebarToggled;
    readonly isToggled = this.themeService.isNavbarToggled;
}