<template>
  <div id="app">
    <Navbar v-if="!hideNavAndFooter" />
    <router-view></router-view>
    <Footer v-if="!hideNavAndFooter" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

const route = useRoute();

// Sembunyikan navbar dan footer di halaman auth
const hideNavAndFooter = computed(() => {
  if (route.name === 'PublicBooking') return true;
  return ['/login', '/register', '/auth/callback', '/forgot-password', '/reset-password', '/dashboard', '/daftar-booking', '/status-booking', '/kalender', '/services', '/team', '/rating-ulasan', '/freelance-portal', '/ringkasan-keuangan', '/kas-keuangan', '/invoice-pelunasan', '/pembayaran-tim', '/form-booking', '/form-pelunasan', '/form-booking-khusus', '/voucher-kupon', '/pengaturan', '/profil', '/bookings/new'].includes(route.path);
});
</script>

