import { NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CustomizerSettingsService } from '../../../../core/util/customizer-settings.service';

@Component({
    selector: 'app-cp-navbar',
    imports: [RouterLink, RouterLinkActive, NgClass, MatButtonModule],
    templateUrl: './cp-navbar.component.html',
    styleUrl: './cp-navbar.component.scss'
})
export class CpNavbarComponent {

    // Toggle Class
    classApplied = false;
    toggleClass(): void {
    this.classApplied = !this.classApplied;
}
closeMenu(): void {
    this.classApplied = false;
}
scrollToSection(
    sectionId: string,
    event?: Event
): void {

    event?.preventDefault();

    this.closeMenu();

    const element = document.getElementById(sectionId);

    if (!element) {
        return;
    }

    const navbar = document.querySelector(
        '.navbar-area'
    ) as HTMLElement | null;

    const navbarHeight = navbar?.offsetHeight ?? 0;

    const elementTop =
        element.getBoundingClientRect().top +
        window.scrollY;

    const offset = navbarHeight + 20;

    window.scrollTo({
        top: elementTop - offset,
        behavior: 'smooth'
    });
}
toggleTheme() {
        this.themeService.toggleTheme();
    }
    // Navbar Sticky
    isSticky: boolean = false;
    @HostListener('window:scroll')
    checkScroll() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}