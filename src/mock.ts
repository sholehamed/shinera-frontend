import { MenuCategoryDto } from "./app/layouts/panel-layout/common/sidebar/sidebar-menu.service";

export const appMenuCategories: MenuCategoryDto[] = [
  {
    title: 'اصلی',
    items: [
      {
        title: 'داشبورد',
        route: '/app/dashboard',
        icon: 'dashboard',
        childs: [],
      },
      {
        title: 'نوبت‌ها',
        route: '/app/appointments',
        icon: 'event',
        childs: [],
      },
    ],
  },

  {
    title: 'مدیریت کسب‌وکار',
    items: [
      {
        title: 'خدمات',
        route: '/app/services',
        icon: 'spa',
        childs: [],
      },
      {
        title: 'متخصصان',
        route: '/app/staff',
        icon: 'groups',
        childs: [],
      },
      {
        title: 'مشتریان',
        route: '/app/customers',
        icon: 'people',
        childs: [],
      },
    ],
  },

  {
    title: 'صفحه عمومی',
    items: [
      {
        title: 'صفحه من',
        route: '/app/public-profile',
        icon: 'public',
        childs: [],
      },
      {
        title: 'نمونه‌کارها',
        route: '/app/gallery',
        icon: 'photo_library',
        childs: [],
      },
      {
        title: 'ساعات کاری',
        route: '/app/working-hours',
        icon: 'schedule',
        childs: [],
      },
    ],
  },

  {
    title: 'تنظیمات',
    items: [
      {
        title: 'تنظیمات کسب‌وکار',
        route: '/app/settings',
        icon: 'settings',
        childs: [],
      },
      {
        title: 'اشتراک و صورتحساب',
        route: '/app/subscription',
        icon: 'card_membership',
        childs: [],
      },
    ],
  },
];