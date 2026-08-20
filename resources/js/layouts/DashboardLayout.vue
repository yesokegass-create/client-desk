<template>
  <div class="dashboard-layout" :class="{ 'is-collapsed': isCollapsed }">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'collapsed': isCollapsed }">
      <div class="sidebar-header">
        <div class="logo">
          <button class="menu-toggle-btn desktop-only" @click="toggleSidebar">
            <Menu :size="20" class="text-white" />
          </button>
          <div class="logo-icon">
            <User :size="20" class="text-white" />
          </div>
          <span class="logo-text">Vender.id</span>
        </div>
        <button class="close-sidebar-btn mobile-only" @click="toggleSidebar" v-if="!isCollapsed">
          <X :size="20" class="text-white" />
        </button>
      </div>

      <div class="sidebar-nav custom-scrollbar">
        <div class="menu-section">
          <p class="menu-label">OPERASIONAL</p>
          <ul class="menu-list">
            <li>
              <router-link to="/dashboard" class="menu-item" active-class="active" :title="isCollapsed ? 'Dashboard' : ''">
                <LayoutDashboard :size="18" />
                <span>Dashboard</span>
              </router-link>
            </li>
            <li>
              <router-link to="/daftar-booking" class="menu-item" active-class="active" :class="{ 'active': $route.path === '/bookings/new' }" :title="isCollapsed ? 'Daftar Booking' : ''">
                <ListTodo :size="18" />
                <span>Daftar Booking</span>
              </router-link>
            </li>
            <li>
              <router-link to="/status-booking" class="menu-item" active-class="active" :title="isCollapsed ? 'Status Booking' : ''">
                <Activity :size="18" />
                <span>Status Booking</span>
              </router-link>
            </li>
            <li>
              <router-link to="/kalender" class="menu-item" active-class="active" :title="isCollapsed ? 'Kalender' : ''">
                <Calendar :size="18" />
                <span>Kalender</span>
              </router-link>
            </li>
            <li>
              <router-link to="/services" class="menu-item" active-class="active" :title="isCollapsed ? 'Layanan / Paket' : ''">
                <Package :size="18" />
                <span>Layanan / Paket</span>
              </router-link>
            </li>
            <li>
              <router-link to="/team" class="menu-item" active-class="active" :title="isCollapsed ? 'Tim / Freelance' : ''">
                <Users :size="18" />
                <span>Tim / Freelance</span>
              </router-link>
            </li>
            <li>
              <router-link to="/rating-ulasan" class="menu-item" active-class="active" :title="isCollapsed ? 'Rating & Ulasan' : ''">
                <Star :size="18" />
                <span>Rating & Ulasan</span>
              </router-link>
            </li>
            <li>
              <router-link to="/freelance-portal" class="menu-item" active-class="active" :title="isCollapsed ? 'Portal Tim / Freelance' : ''">
                <UserCircle :size="18" />
                <span>Portal Tim / Freelance</span>
              </router-link>
            </li>
          </ul>
        </div>

        <div class="menu-section">
          <p class="menu-label">FINANSIAL</p>
          <ul class="menu-list">
            <li>
              <router-link to="/ringkasan-keuangan" class="menu-item" active-class="active" :title="isCollapsed ? 'Ringkasan Keuangan' : ''">
                <Wallet :size="18" />
                <span>Ringkasan Keuangan</span>
              </router-link>
            </li>
            <li>
              <router-link to="/kas-keuangan" class="menu-item" active-class="active" :title="isCollapsed ? 'Kas Keuangan' : ''">
                <Coins :size="18" />
                <span>Kas Keuangan</span>
              </router-link>
            </li>
            <li>
              <router-link to="/invoice-pelunasan" class="menu-item" active-class="active" :title="isCollapsed ? 'Invoice & Pelunasan' : ''">
                <FileSignature :size="18" />
                <span>Invoice & Pelunasan</span>
              </router-link>
            </li>
            <li>
              <router-link to="/pembayaran-tim" class="menu-item" active-class="active" :title="isCollapsed ? 'Pembayaran Tim' : ''">
                <Coins :size="18" />
                <span>Pembayaran Tim</span>
              </router-link>
            </li>
          </ul>
        </div>

        <div class="menu-section">
          <p class="menu-label">FORM & VOUCHER</p>
          <ul class="menu-list">
            <li>
              <router-link to="/form-booking" class="menu-item" active-class="active" :title="isCollapsed ? 'Form Booking' : ''">
                <FormInput :size="18" />
                <span>Form Booking</span>
              </router-link>
            </li>
            <li>
              <router-link to="/form-pelunasan" class="menu-item" active-class="active" :title="isCollapsed ? 'Form Pelunasan' : ''">
                <FileCheck :size="18" />
                <span>Form Pelunasan</span>
              </router-link>
            </li>
            <li>
              <router-link to="/form-booking-khusus" class="menu-item" active-class="active" :title="isCollapsed ? 'Form Booking Khusus' : ''">
                <Ticket :size="18" />
                <span>Form Booking Khusus</span>
              </router-link>
            </li>
            <li>
              <router-link to="/voucher-kupon" class="menu-item" active-class="active" :title="isCollapsed ? 'Voucher & Kupon' : ''">
                <Tag :size="18" />
                <span>Voucher & Kupon</span>
              </router-link>
            </li>
          </ul>
        </div>

      </div>

      <div class="sidebar-bottom">
        <div class="menu-section bottom-menu">
          <ul class="menu-list">
            <li>
              <router-link to="/pengaturan" class="menu-item" active-class="active" :title="isCollapsed ? 'Pengaturan' : ''">
                <Settings :size="18" />
                <span>Pengaturan</span>
              </router-link>
            </li>
          </ul>
        </div>

        <div class="sidebar-footer">
          <div class="user-profile" @click="goToProfile" role="button">
            <div class="avatar">{{ userInitials }}</div>
            <div class="user-info">
              <p class="user-name">{{ userName }}</p>
              <p class="user-role">Owner / Super User</p>
            </div>
            <button @click.stop="handleLogout" class="logout-btn" title="Keluar">
              <LogOut :size="18" />
            </button>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="main-content">
      <!-- Overlay for mobile -->
      <div class="sidebar-overlay" v-if="!isCollapsed" @click="toggleSidebar"></div>

      <!-- Top Header -->
      <header class="top-header">
        <div class="header-left">
          <button class="mobile-menu-btn" @click="toggleSidebar">
            <Menu :size="20" class="text-white" />
          </button>
          <h1 class="page-title">{{ pageTitle }}</h1>
        </div>
        <div class="header-right">
          <span class="current-date">{{ currentDate }}</span>
          <div class="header-actions">
            <button class="icon-btn">
              <Languages :size="18" />
            </button>
            <button class="icon-btn" @click="toggleTheme">
              <Moon :size="18" v-if="currentTheme === 'dark'" />
              <Sun :size="18" v-else />
            </button>
            <button class="icon-btn notification-btn">
              <Bell :size="18" />
              <span class="badge">2</span>
            </button>
            <div class="avatar-small">{{ userInitials }}</div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <div class="page-container">
        <div class="page-inner">
          <slot></slot>
        </div>
      </div>
      
      <!-- Tour Guide Popup -->
      <TourGuide />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import { 
  User, LayoutDashboard, ListTodo, Activity, Calendar, 
  Package, Users, Star, UserCircle, MessageSquare, 
  Settings, LogOut, Languages, Moon, Sun, Bell,
  FileText, DollarSign, FileSignature, Coins, FormInput, FileCheck, Ticket, Tag, Leaf, PlusSquare, Menu, Wallet, X
} from 'lucide-vue-next';
import TourGuide from '../components/TourGuide.vue';

const router = useRouter();
const route = useRoute();
const currentTheme = ref('dark');
const userName = ref('Johnathan Baker'); // Default placeholder, will be updated via API
const currentDate = ref('');
const isCollapsed = ref(false);
let timer = null;

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

// Auto collapse sidebar when navigating to another page (especially on mobile)
router.afterEach(() => {
  if (window.innerWidth <= 1280) {
    isCollapsed.value = true;
  }
});

const goToProfile = () => {
  router.push('/profil');
};

const userInitials = computed(() => {
  if (!userName.value) return 'U';
  return userName.value.charAt(0).toUpperCase();
});

const pageTitle = computed(() => {
  if (!route.name) return '';
  const names = {
    'Dashboard': 'Dashboard',
    'DaftarBooking': 'Daftar Booking',
    'StatusBooking': 'Status Booking',
    'Kalender': 'Kalender',
    'Layanan': 'Layanan / Paket',
    'TimFreelance': 'Tim / Freelance',
    'RatingUlasan': 'Rating & Ulasan',
    'PortalTim': 'Portal Tim / Freelance',
    'RingkasanKeuangan': 'Ringkasan Keuangan',
    'KasKeuangan': 'Kas Keuangan',
    'InvoicePelunasan': 'Invoice & Pelunasan',
    'PembayaranTim': 'Pembayaran Tim',
    'FormBooking': 'Form Booking',
    'FormPelunasan': 'Form Pelunasan',
    'FormBookingKhusus': 'Form Booking Khusus',
    'VoucherKupon': 'Voucher & Kupon',
    'Pengaturan': 'Pengaturan',
    'ProfilAkun': 'Profil Akun',
    'TambahBooking': 'Tambah Klien Baru'
  };
  return names[route.name] || route.name;
});

const updateDateTime = () => {
  const now = new Date();
  const days = ['Ming', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  
  const dayName = days[now.getDay()];
  const date = now.getDate();
  const month = months[now.getMonth()];
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  currentDate.value = `${dayName}, ${date} ${month} ${hours}.${minutes}.${seconds}`;
};

const fetchUser = async () => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.push('/login');
      return;
    }
    
    // axios default header setup for subsequent requests can be done in a separate file, but for now we set it here
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    const response = await axios.get('/api/user');
    if (response.data && response.data.name) {
      userName.value = response.data.name;
    }
  } catch (error) {
    console.error('Failed to fetch user', error);
    // If unauthorized, token is invalid
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('auth_token');
      router.push('/login');
    }
  }
};

const handleLogout = async () => {
  try {
    const token = localStorage.getItem('auth_token');
    if (token) {
      await axios.post('/api/logout', null, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
  } catch (e) {
    console.error(e);
  } finally {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('vender_setup_status');
    window.location.href = '/login';
  }
};

onMounted(() => {
  if (window.innerWidth <= 1280) {
    isCollapsed.value = true;
  }
  
  const savedTheme = localStorage.getItem('theme') || 'dark';
  currentTheme.value = savedTheme;
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  updateDateTime();
  timer = setInterval(updateDateTime, 1000);
  
  fetchUser();
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

const toggleTheme = () => {
  const newTheme = currentTheme.value === 'dark' ? 'light' : 'dark';
  currentTheme.value = newTheme;
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
};
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: #000000;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
}

/* Sidebar Styles */
.sidebar {
  width: 260px;
  background-color: #0a0a0a;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  transition: transform 0.3s ease, width 0.3s ease;
}

.sidebar.collapsed {
  transform: translateX(-100%);
}

.sidebar-header {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.close-sidebar-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.close-sidebar-btn:hover {
  opacity: 1;
}

:root[data-theme="light"] .close-sidebar-btn {
  color: #000;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.menu-toggle-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.menu-toggle-btn:hover {
  opacity: 1;
}

.logo-icon {
  background-color: #ffffff;
  border-radius: 6px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon .text-white {
  color: #000000;
}

.logo-text {
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: -0.02em;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem 1rem 0 1rem;
}

/* Custom Scrollbar for Sidebar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
  margin-right: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.sidebar-bottom {
  padding: 0;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.bottom-menu {
  padding: 1rem 1rem 0.5rem 1rem;
  margin-bottom: 0;
}

.menu-section {
  margin-bottom: 2rem;
}

.menu-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: #666;
  margin-bottom: 0.75rem;
  padding-left: 0.75rem;
  letter-spacing: 0.05em;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  color: #a0a0a0;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: #ffffff;
}

.menu-item.active {
  background-color: #ffffff;
  color: #000000;
}

.sidebar-footer {
  padding: 1.25rem 1rem;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.user-profile:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #333;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.user-info {
  flex: 1;
  overflow: hidden;
}

.user-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 0.1rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role {
  font-size: 0.7rem;
  color: #888;
  margin: 0;
}

.logout-btn {
  background: transparent;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.2s;
}

.logout-btn:hover {
  color: #ff4444;
  background-color: rgba(255, 68, 68, 0.1);
}

/* Main Content Styles */
.main-content {
  flex: 1;
  width: 100%;
  max-width: none !important;
  margin: 0 !important;
  padding-left: 260px;
  display: flex;
  flex-direction: column;
  transition: padding-left 0.3s ease;
  box-sizing: border-box;
}

.dashboard-layout.is-collapsed .main-content {
  padding-left: 0;
}

.top-header {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  background-color: #000000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: sticky;
  top: 0;
  z-index: 90;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.page-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.current-date {
  font-size: 0.85rem;
  color: #a0a0a0;
  font-family: monospace;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.icon-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #a0a0a0;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.icon-btn:hover {
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.3);
}

.badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: #10b981;
  color: #000;
  font-size: 0.65rem;
  font-weight: 700;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #000;
}

.avatar-small {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #10b981;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

.page-container {
  padding: 2rem 0 2rem 2rem;
  flex: 1;
  background-color: #000000;
}

.page-inner {
  max-width: 100%;
  width: 100%;
}

:root[data-theme="light"] .dashboard-layout {
  background-color: #f9fafb;
  color: #111827;
}

:root[data-theme="light"] .sidebar {
  background-color: #111827;
  border-right-color: #e5e7eb;
}

:root[data-theme="light"] .logo-text {
  color: #ffffff;
}

:root[data-theme="light"] .menu-toggle-btn {
  color: #ffffff;
}

:root[data-theme="light"] .sidebar-header,
:root[data-theme="light"] .sidebar-footer {
  border-color: #e5e7eb;
}

:root[data-theme="light"] .logo-icon {
  background-color: #000000;
}

:root[data-theme="light"] .logo-icon .text-white {
  color: #ffffff;
}

:root[data-theme="light"] .menu-item {
  color: #6b7280;
}

:root[data-theme="light"] .menu-item:hover {
  background-color: #f3f4f6;
  color: #111827;
}

:root[data-theme="light"] .menu-item.active {
  background-color: #000000;
  color: #ffffff;
}

:root[data-theme="light"] .user-name {
  color: #111827;
}

:root[data-theme="light"] .top-header {
  background-color: #ffffff;
  border-bottom-color: #e5e7eb;
}

:root[data-theme="light"] .current-date {
  color: #6b7280;
}

:root[data-theme="light"] .icon-btn {
  border-color: #e5e7eb;
  color: #6b7280;
}

:root[data-theme="light"] .icon-btn:hover {
  color: #111827;
  border-color: #d1d5db;
}

:root[data-theme="light"] .page-title {
  color: #111827;
}

:root[data-theme="light"] .page-container {
  background-color: #f9fafb;
}

:root[data-theme="light"] .badge {
  border-color: #ffffff;
}
.item-highlight {
  border: 1px solid rgba(168, 85, 247, 0.3); /* Default fallback */
  border-color: rgba(234, 179, 8, 0.3); /* Yellowish */
  background-color: rgba(234, 179, 8, 0.05);
}

.item-highlight:hover {
  background-color: rgba(234, 179, 8, 0.1);
  border-color: rgba(234, 179, 8, 0.5);
}

.badge-new {
  margin-left: auto;
  font-size: 0.6rem;
  font-weight: 700;
  padding: 0.15rem 0.4rem;
  background-color: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border-radius: 4px;
}

.text-yellow {
  color: #eab308;
}

.mt-4 {
  margin-top: 1rem;
}
</style>

<style scoped>
.sidebar-overlay {
  display: none;
}
.desktop-only {
  display: flex;
}
.mobile-only {
  display: none;
}

.mobile-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  margin-right: 0.5rem;
  padding: 0.2rem;
}

.dashboard-layout:not(.is-collapsed) .mobile-menu-btn {
  display: none;
}

:root[data-theme="light"] .mobile-menu-btn .text-white {
  color: #000;
}

@media (max-width: 1280px) {
  .desktop-only {
    display: none !important;
  }
  .mobile-only {
    display: flex !important;
  }
  .sidebar-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 95;
    backdrop-filter: blur(2px);
  }
  .sidebar {
    width: 260px !important;
  }
  .sidebar:not(.collapsed) {
    transform: translateX(0);
    box-shadow: 10px 0 30px rgba(0, 0, 0, 0.5);
  }
  .dashboard-layout.is-collapsed .sidebar {
    transform: translateX(-100%);
  }
  .main-content, .dashboard-layout .main-content, .dashboard-layout.is-collapsed .main-content {
    padding-left: 0 !important;
    width: 100% !important;
    max-width: 100vw !important;
  }
  .page-container {
    padding: 1.5rem !important;
    max-width: 100vw !important;
    overflow-x: hidden;
  }
  .top-header {
    padding: 0 1rem;
  }
  .header-right {
    gap: 0.5rem;
  }
  .page-title {
    font-size: 1rem;
  }
}
@media (max-width: 480px) {
  .page-container {
    padding: 1rem !important;
  }
}
</style>
