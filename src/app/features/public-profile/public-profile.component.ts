import { Component } from "@angular/core";
import { ProfileHeroComponent } from "./components/profile-hero/profile-hero.component";
import { ServicesComponent } from "./components/services/services.component";
import { PublicGalleryItem, GalleryComponent } from "./components/gallery/gallery.component";
import { PublicProfileAbout, AboutComponent } from "./components/about/about.component";
import { PublicProfileWorkingHours, WorkingHoursComponent } from "./components/working-hours/working-hours.component";
import { PublicProfileContact, ContactComponent } from "./components/contact/contact.component";
import { PublicBookingCta, BookingCtaComponent } from "./components/booking-cta/booking-cta.component";

@Component({
    selector: 'app-public-profile',
    standalone: true,
    imports: [
    ProfileHeroComponent,
    ServicesComponent,
    GalleryComponent,
    AboutComponent,
    WorkingHoursComponent,
    ContactComponent,
    BookingCtaComponent
],
    templateUrl: './public-profile.component.html',
    styleUrl: './public-profile.component.scss'
})
export class PublicProfileComponent {
    bookingCta: PublicBookingCta = {
    eyebrow: 'رزرو نوبت',
    title: 'آماده‌ای وقت خودت را برای زیبایی بگذاری؟',
    description:
        'خدمت موردنظر خود را انتخاب کنید و برای دریافت نوبت اقدام کنید.',
    buttonText: 'دریافت نوبت',
    buttonLink: 'booking',
    secondaryText: 'تماس مستقیم',
    phone: '02112345678'
};
    contact: PublicProfileContact = {
    phone: '02112345678',
    mobile: '09121234567',
    email: 'info@aidabeauty.ir',
    instagram: 'https://instagram.com/aida.beauty',
    whatsapp: 'https://wa.me/989121234567'
};
    workingHours: PublicProfileWorkingHours = {

    days: [
        {
            day: 'شنبه',
            shortDay: 'ش',
            isOpen: true,
            openTime: '۱۰:۰۰',
            closeTime: '۲۰:۰۰'
        },
        {
            day: 'یکشنبه',
            shortDay: 'ی',
            isOpen: true,
            openTime: '۱۰:۰۰',
            closeTime: '۲۰:۰۰'
        },
        {
            day: 'دوشنبه',
            shortDay: 'د',
            isOpen: true,
            openTime: '۱۰:۰۰',
            closeTime: '۲۰:۰۰'
        },
        {
            day: 'سه‌شنبه',
            shortDay: 'س',
            isOpen: true,
            openTime: '۱۰:۰۰',
            closeTime: '۲۰:۰۰'
        },
        {
            day: 'چهارشنبه',
            shortDay: 'چ',
            isOpen: true,
            openTime: '۱۰:۰۰',
            closeTime: '۲۰:۰۰'
        },
        {
            day: 'پنجشنبه',
            shortDay: 'پ',
            isOpen: true,
            openTime: '۱۰:۰۰',
            closeTime: '۱۸:۰۰'
        },
        {
            day: 'جمعه',
            shortDay: 'ج',
            isOpen: false
        }
    ],

    location: {
        address: 'تهران، سعادت‌آباد، بلوار سرو، خیابان مثال، پلاک ۱۲',
        city: 'تهران',
        phone: '02112345678',
        mapUrl: '#'
    }
};
    about: PublicProfileAbout = {
    title: 'زیبایی با دقت، ظرافت و توجه به جزئیات',
    description:
        'ما تلاش می‌کنیم تجربه‌ای آرام و متفاوت از خدمات زیبایی برای شما ایجاد کنیم. ' +
        'هر خدمت با توجه به نیاز و سلیقه شما انجام می‌شود تا نتیجه‌ای متناسب با سبک شخصی‌تان داشته باشید.',
    image: 'images/nail/aida-about.jpg',
    imageAlt: 'فضای مجموعه',
    highlights: [
        {
            value: 'تخصص',
            label: 'تمرکز بر کیفیت خدمات',
            icon: 'workspace_premium'
        },
        {
            value: 'تجربه',
            label: 'توجه به جزئیات',
            icon: 'auto_awesome'
        },
        {
            value: 'کیفیت',
            label: 'انتخاب محصولات مناسب',
            icon: 'verified'
        },
        {
            value: 'توجه',
            label: 'تجربه شخصی‌سازی‌شده',
            icon: 'favorite'
        }
    ]
};
    galleryItems: PublicGalleryItem[] = [
    {
        id: '1',
        image: 'images/nail/nail (1).jpg',
        title: 'طراحی ناخن',
        category: 'ژلیش'
    },
    {
        id: '2',
        image: 'images/nail/nail (2).jpg',
        title: 'استایل مو',
        category: 'ژلیش'
    },
    {
        id: '3',
        image: 'images/nail/nail (3).jpg',
        title: 'میکاپ',
        category: 'ژلیش'
    },
    {
        id: '4',
        image: 'images/nail/nail (4).jpg',
        title: 'رنگ و مش',
        category: 'ژلیش'
    },
    {
        id: '5',
        image: 'images/nail/nail (5).jpg',
        title: 'مراقبت پوست',
        category: 'ژلیش'
    },
    {
        id: '6',
        image: 'images/nail/nail (6).jpg',
        title: 'طراحی ناخن',
        category: 'ژلیش'
    },
    {
        id: '7',
        image: 'images/nail/nail (7).jpg',
        title: 'طراحی ناخن',
        category: 'ژلیش'
    },
    {
        id: '8',
        image: 'images/nail/nail (8).jpg',
        title: 'طراحی ناخن',
        category: 'ژلیش'
    },
    {
        id: '9',
        image: 'images/nail/nail (9).jpg',
        title: 'طراحی ناخن',
        category: 'ژلیش'
    },
    {
        id: '10',
        image: 'images/nail/nail (10).jpg',
        title: 'طراحی ناخن',
        category: 'ژلیش'
    },
    {
        id: '11',
        image: 'images/nail/nail (11).jpg',
        title: 'طراحی ناخن',
        category: 'ژلیش'
    },
    {
        id: '12',
        image: 'images/nail/nail (12).jpg',
        title: 'طراحی ناخن',
        category: 'ژلیش'
    },
    {
        id: '13',
        image: 'images/nail/nail (13).jpg',
        title: 'طراحی ناخن',
        category: 'دیزاین'
    },
    {
        id: '14',
        image: 'images/nail/nail (14).jpg',
        title: 'طراحی ناخن',
        category: 'دیزاین'
    },
    {
        id: '15',
        image: 'images/nail/nail (15).jpg',
        title: 'طراحی ناخن',
        category: 'دیزاین'
    }
];

galleryCategories = [
    'ژلیش',
    'دیزاین',
    'ناخن',
    'میکاپ',
    'پوست'
];
services = [
    {
        id: '1',
        name: 'کوتاهی و استایل مو',
        description: 'کوتاهی، فرم‌دهی و استایل متناسب با چهره شما',
        category: 'مو',
        duration: 60,
        price: 850000
    },
    {
        id: '2',
        name: 'طراحی و ژل ناخن',
        description: 'طراحی حرفه‌ای ناخن با انتخاب طرح دلخواه',
        category: 'ناخن',
        duration: 90,
        price: 700000
    },
    {
        id: '3',
        name: 'میکاپ',
        description: 'میکاپ حرفه‌ای برای مراسم و مناسبت‌های خاص',
        category: 'میکاپ',
        duration: 75,
        price: 1200000
    },
    {
        id: '4',
        name: 'پاکسازی پوست',
        description: 'پاکسازی و مراقبت تخصصی از پوست',
        category: 'پوست',
        duration: 60,
        price: 650000
    }
];
    profile = {
    name: 'Aida Beauty',
    category: 'سالن زیبایی',
    tagline: 'زیبایی تو، امضای ماست',
    description:
        'ارائه خدمات تخصصی زیبایی با تمرکز بر کیفیت، ظرافت و تجربه‌ای متفاوت برای شما.',

    logo: 'images/demo/aida-logo.jpg',
    coverImage: 'images/nail/aida-cover.jpg',

    location: 'تهران، سعادت‌آباد',
    phone: '02112345678',

    workingStatus: 'امروز باز است',
    workingHours: '۱۰:۰۰ تا ۲۰:۰۰',

    servicesCount: 18
};

}