import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Features from './pages/Features.vue';
import Pricing from './pages/Pricing.vue';
import FAQ from './pages/FAQ.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import AuthCallback from './pages/AuthCallback.vue';
import ForgotPassword from './pages/ForgotPassword.vue';
import ResetPassword from './pages/ResetPassword.vue';
import Dashboard from './pages/Dashboard.vue';
import DaftarBooking from './pages/DaftarBooking.vue';
import StatusBooking from './pages/StatusBooking.vue';
import Kalender from './pages/Kalender.vue';
import Layanan from './pages/Layanan.vue';
import TimFreelance from './pages/TimFreelance.vue';
import RatingUlasan from './pages/RatingUlasan.vue';
import PortalTim from './pages/PortalTim.vue';
import RingkasanKeuangan from './pages/RingkasanKeuangan.vue';
import KasKeuangan from './pages/KasKeuangan.vue';
import InvoicePelunasan from './pages/InvoicePelunasan.vue';
import PembayaranTim from './pages/PembayaranTim.vue';
import FormBooking from './pages/FormBooking.vue';
import FormPelunasan from './pages/FormPelunasan.vue';
import FormBookingKhusus from './pages/FormBookingKhusus.vue';
import TambahBooking from './pages/TambahBooking.vue';
import VoucherKupon from './pages/VoucherKupon.vue';
import Pengaturan from './pages/Pengaturan.vue';
import ProfilAkun from './pages/ProfilAkun.vue';
import PublicBooking from './pages/PublicBooking.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/id/formbooking/:vendorAlias',
    name: 'PublicBooking',
    component: PublicBooking
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/daftar-booking',
    name: 'DaftarBooking',
    component: DaftarBooking
  },
  {
    path: '/status-booking',
    name: 'StatusBooking',
    component: StatusBooking
  },
  {
    path: '/kalender',
    name: 'Kalender',
    component: Kalender
  },
  {
    path: '/services',
    name: 'Layanan',
    component: Layanan
  },
  {
    path: '/team',
    name: 'TimFreelance',
    component: TimFreelance
  },
  {
    path: '/rating-ulasan',
    name: 'RatingUlasan',
    component: RatingUlasan
  },
  {
    path: '/freelance-portal',
    name: 'PortalTim',
    component: PortalTim
  },
  {
    path: '/ringkasan-keuangan',
    name: 'RingkasanKeuangan',
    component: RingkasanKeuangan
  },
  {
    path: '/kas-keuangan',
    name: 'KasKeuangan',
    component: KasKeuangan
  },
  {
    path: '/invoice-pelunasan',
    name: 'InvoicePelunasan',
    component: InvoicePelunasan
  },
  {
    path: '/pembayaran-tim',
    name: 'PembayaranTim',
    component: PembayaranTim
  },
  {
    path: '/form-booking',
    name: 'FormBooking',
    component: FormBooking
  },
  {
    path: '/form-pelunasan',
    name: 'FormPelunasan',
    component: FormPelunasan
  },
  {
    path: '/bookings/new',
    name: 'TambahBooking',
    component: TambahBooking
  },
  {
    path: '/form-booking-khusus',
    name: 'FormBookingKhusus',
    component: FormBookingKhusus
  },
  {
    path: '/voucher-kupon',
    name: 'VoucherKupon',
    component: VoucherKupon
  },
  {
    path: '/pengaturan',
    name: 'Pengaturan',
    component: Pengaturan
  },
  {
    path: '/profil',
    name: 'ProfilAkun',
    component: ProfilAkun
  },
  {
    path: '/fitur',
    name: 'Features',
    component: Features
  },
  {
    path: '/harga',
    name: 'Pricing',
    component: Pricing
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: FAQ
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/auth/callback',
    name: 'AuthCallback',
    component: AuthCallback
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

export default router;
