<template>
  <DashboardLayout>
    <div class="portal-page">
      <!-- Page Header -->
      <div class="page-header">
        <h1 class="page-title">Portal Tim / Freelance</h1>
        <p class="page-subtitle">Kelola akses publik tim / freelance untuk jadwal, pembayaran, link Drive, dan status upload.</p>
      </div>

      <!-- Activation Card -->
      <div class="portal-card">
        <div class="card-content">
          <div class="card-header">
            <div class="card-title-wrap">
              <MonitorPlay :size="20" class="text-white mr-2" />
              <h2 class="card-title">Aktifkan Portal Tim / Freelance</h2>
              <span class="badge-disabled">Nonaktif</span>
            </div>
            <p class="card-desc">Toggle global. Saat nonaktif, semua kode akses ditolak dan session portal lama invalid.</p>
            
            <div class="alert alert-warning">
              <p>Fitur sedang nonaktif. Admin tetap bisa generate, simpan, dan copy kode akses.</p>
            </div>
            
            <div class="url-box">
              https://vender.id/id/freelance-portal/94a53411-4115-4b4f-9370-09253b080e73
            </div>
          </div>
          
          <div class="card-actions">
            <div class="action-row">
              <button class="btn-outline">
                <Copy :size="16" />
                Copy Link Portal
              </button>
              <button class="btn-outline">
                <ExternalLink :size="16" />
                Buka Link Portal
              </button>
            </div>
            <button class="btn-primary">
              <CheckCircle2 :size="16" />
              Aktifkan
            </button>
          </div>
        </div>
      </div>

      <!-- Data Table Card -->
      <div class="portal-card data-card">
        <div class="data-header">
          <div class="data-title-wrap">
            <h2 class="card-title">Kode Akses & Status Upload</h2>
            <p class="card-desc">Kode bisa dibuat custom atau digenerate admin. Buka detail untuk melihat booking assigned.</p>
          </div>
          <button class="btn-outline">
            <RefreshCw :size="16" />
            Refresh
          </button>
        </div>

        <div class="table-controls">
          <div class="search-container">
            <Search :size="16" class="search-icon" />
            <input type="text" placeholder="Cari freelance, role, booking, atau klien..." class="search-input" />
          </div>
          
          <div class="control-actions">
            <button class="btn-outline">
              <Filter :size="16" />
              Filter
            </button>
            <div class="select-wrapper">
              <select class="sort-select">
                <option value="terbaru">Urutkan: Tanggal Booking Terbaru</option>
                <option value="terlama">Urutkan: Tanggal Booking Terlama</option>
              </select>
              <ChevronDown :size="14" class="select-icon" />
            </div>
          </div>
        </div>

        <div class="table-container">
          <div class="empty-state">
            Belum ada data freelance.
          </div>
        </div>

        <!-- Pagination -->
        <div class="pagination">
          <div class="page-size">
            <span>Tampilkan</span>
            <select class="size-select">
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span>per halaman</span>
          </div>
          
          <div class="page-nav">
            <span class="page-info">0 data</span>
            <button class="page-btn"><ChevronLeft :size="16" /></button>
            <span class="page-current">1/1</span>
            <button class="page-btn"><ChevronRight :size="16" /></button>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from '../layouts/DashboardLayout.vue';
import { 
  MonitorPlay, Copy, ExternalLink, CheckCircle2,
  RefreshCw, Search, Filter, ChevronDown, ChevronLeft, ChevronRight
} from 'lucide-vue-next';
</script>

<style scoped>
.portal-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-height: calc(100vh - 100px);
}

/* Header */
.page-header {
  margin-bottom: 0.5rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  color: #fff;
}

.page-subtitle {
  font-size: 0.85rem;
  color: #a0a0a0;
  margin: 0;
}

/* Cards */
.portal-card {
  background-color: #121212;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.card-header {
  flex: 1;
  min-width: 300px;
}

.card-title-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.mr-2 {
  margin-right: 0.5rem;
}

.card-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  margin-right: 0.75rem;
}

.badge-disabled {
  background-color: rgba(255, 255, 255, 0.1);
  color: #a0a0a0;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
}

.card-desc {
  font-size: 0.85rem;
  color: #a0a0a0;
  margin: 0 0 1rem 0;
}

.alert {
  background-color: rgba(234, 179, 8, 0.05);
  border: 1px solid rgba(234, 179, 8, 0.3);
  border-radius: 8px;
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;
  color: #eab308;
  font-size: 0.85rem;
  font-weight: 500;
}

.alert p {
  margin: 0;
}

.portal-link {
  font-size: 0.8rem;
  color: #555;
}

.card-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
}

.action-row {
  display: flex;
  gap: 0.75rem;
}

.btn-outline {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-outline:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  opacity: 0.9;
}

/* Data Card */
.data-card {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.data-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
}

.data-title-wrap {
  flex: 1;
}

.table-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.search-container {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
}

.search-input {
  width: 100%;
  background-color: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  color: #ffffff;
  font-size: 0.85rem;
}

.search-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.3);
}

.control-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.sort-select {
  appearance: none;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: #ffffff;
  padding: 0.5rem 2rem 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}

.sort-select:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.4);
}

.sort-select option {
  background-color: #121212;
  color: #fff;
}

.select-icon {
  position: absolute;
  right: 0.75rem;
  pointer-events: none;
  color: #fff;
}

.table-container {
  background-color: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-state {
  text-align: center;
  color: #888;
  font-size: 0.85rem;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #888;
  flex-wrap: wrap;
  gap: 1rem;
}

.page-size {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.size-select {
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border-radius: 4px;
  padding: 0.25rem;
  cursor: pointer;
}

.size-select option {
  background-color: #121212;
  color: #fff;
}

.page-nav {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.page-info {
  margin-right: 0.5rem;
}

.page-btn {
  background: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
}

.page-btn:hover {
  color: #ffffff;
}

.page-current {
  font-weight: 600;
  color: #ffffff;
}

/* Light Theme Adjustments */
:root[data-theme="light"] .page-title,
:root[data-theme="light"] .card-title,
:root[data-theme="light"] .search-input,
:root[data-theme="light"] .sort-select,
:root[data-theme="light"] .page-current,
:root[data-theme="light"] .size-select {
  color: #111827;
}

:root[data-theme="light"] .portal-card,
:root[data-theme="light"] .search-input,
:root[data-theme="light"] .table-container,
:root[data-theme="light"] .sort-select option,
:root[data-theme="light"] .size-select option {
  background-color: #ffffff;
  border-color: #e5e7eb;
}

:root[data-theme="light"] .badge-disabled {
  background-color: #f3f4f6;
  color: #6b7280;
}

:root[data-theme="light"] .alert {
  background-color: #fefce8;
  border-color: #fef08a;
  color: #ca8a04;
}

:root[data-theme="light"] .btn-outline {
  border-color: #d1d5db;
  color: #111827;
}

:root[data-theme="light"] .btn-outline:hover {
  background-color: #f3f4f6;
}

:root[data-theme="light"] .btn-primary {
  background-color: #111827;
  color: #ffffff;
}

:root[data-theme="light"] .select-icon,
:root[data-theme="light"] .sort-select {
  color: #111827;
}

:root[data-theme="light"] .text-white {
  color: #111827; /* MonitorPlay icon */
}
</style>
