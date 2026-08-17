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

<style>
/* CSS global */
:root {
  --bg-main: #121212;
  --bg-card: #1c1c1c;
  --text-primary: #ffffff;
  --text-secondary: #a0a0a0;
  --border-color: rgba(255, 255, 255, 0.1);
  --radius-md: 8px;
  --radius-lg: 12px;
}

:root[data-theme="light"] {
  --bg-main: #f9fafb;
  --bg-card: #ffffff;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --border-color: #e5e7eb;
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-main);
  color: var(--text-primary);
  transition: background-color 0.3s, color 0.3s;
}

* {
  box-sizing: border-box;
}
</style>
