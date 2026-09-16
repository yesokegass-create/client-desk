<template>
  <DashboardLayout>
    <div class="booking-page">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-content">
          <div class="title-with-icon">
            <Activity :size="24" class="text-white" />
            <h1 class="page-title">Status Booking</h1>
          </div>
          <p class="page-subtitle">Kelola progress dan antrian klien. Klien bisa tracking via link.</p>
        </div>
        
        <div class="header-actions">
          <button class="btn-outline">
            <SlidersHorizontal :size="16" />
            Kelola kolom
          </button>
        </div>
      </div>

      <!-- Search and Filter Row -->
      <div class="filter-row">
        <div class="search-container">
          <Search :size="16" class="search-icon" />
          <input type="text" placeholder="Cari nama klien atau kode..." class="search-input" />
        </div>
        
        <div class="view-switcher">
          <button class="view-btn active">
            <Table :size="16" />
            Tabel
          </button>
          <button class="view-btn">
            <Kanban :size="16" />
            Kanban
          </button>
        </div>
        
        <button class="btn-outline">
          <ListFilter :size="16" />
          Filter
        </button>
        
        <div class="sort-container">
          <select class="sort-select">
            <option>Urutkan: Tanggal Booking Terbaru</option>
            <option>Urutkan: Tanggal Booking Terlama</option>
            <option>Urutkan: Nama Klien (A-Z)</option>
          </select>
        </div>
      </div>

      <!-- Tabs and Table Container -->
      <div class="table-card">
        <!-- Tabs -->
        <div class="tabs-header">
          <div class="tabs-left">
            <button class="tab-btn active">
              <Folder :size="16" />
              Aktif
            </button>
            <button class="tab-btn">
              <Archive :size="16" />
              Arsip
            </button>
          </div>
          <div class="tabs-right">
            <button class="btn-text">
              <Settings2 :size="16" />
              Kelola
            </button>
          </div>
        </div>

        <!-- Table -->
        <div id="tour-target-status-booking" class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>NO.</th>
                <th>KLIEN</th>
                <th>PAKET</th>
                <th>STATUS</th>
                <th>ANTRIAN</th>
                <th>DEADLINE</th>
                <th>AKSI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="7" class="empty-state">
                  <p>Belum ada booking.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="pagination-footer">
          <div class="per-page-selector">
            <span>Tampilkan</span>
            <select class="per-page-select">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span>per<br/>halaman</span>
          </div>
          
          <div class="pagination-controls">
            <span class="data-count">0 data</span>
            <button class="page-btn" disabled><ChevronLeft :size="16" /></button>
            <span class="page-info">1/1</span>
            <button class="page-btn" disabled><ChevronRight :size="16" /></button>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { onMounted } from 'vue';
import DashboardLayout from '../layouts/DashboardLayout.vue';
import { useTour } from '../composables/useTour';
import { 
  Activity, SlidersHorizontal, Search, Table, Kanban, 
  ListFilter, Folder, Archive, Settings2,
  ChevronLeft, ChevronRight 
} from 'lucide-vue-next';

const { isActive, currentStep, completeStep } = useTour();

onMounted(() => {
  // Auto-complete tour step 8 if active
  if (isActive.value && currentStep()?.id === 'view-status-booking') {
    completeStep('view-status-booking');
  }
});
</script>

<style scoped>
.booking-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
}

.title-with-icon {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.25rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: var(--text-primary);
}

.page-subtitle {
  font-size: 0.85rem;
  color: #a0a0a0;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-outline {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  color: var(--text-primary);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-outline:hover {
  background-color: var(--bg-card-hover);
}

/* Filters */
.filter-row {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.search-container {
  flex: 1;
  min-width: 250px;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  color: var(--text-secondary);
}

.search-input {
  width: 100%;
  padding: 0.6rem 1rem 0.6rem 2.5rem;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  color: var(--text-primary);
  font-size: 0.85rem;
}

.search-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.3);
}

.view-switcher {
  display: flex;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  overflow: hidden;
}

.view-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background-color: transparent;
  border: none;
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.view-btn:not(:last-child) {
  border-right: 1px solid rgba(255, 255, 255, 0.15);
}

.view-btn.active {
  background-color: var(--border-color);
  color: var(--text-primary);
}

.view-btn:hover:not(.active) {
  background-color: var(--bg-card-hover);
  color: var(--text-primary);
}

.sort-container {
  position: relative;
}

.sort-select {
  padding: 0.6rem 2rem 0.6rem 1rem;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  color: var(--text-primary);
  font-size: 0.85rem;
  appearance: none;
  cursor: pointer;
}

.sort-select:focus {
  outline: none;
}

/* Table Card */
.table-card {
  background-color: var(--bg-main);
  border: 1px solid var(--bg-card-hover);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
}

.tabs-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.5rem 0 0.5rem;
  border-bottom: 1px solid var(--bg-card-hover);
}

.tabs-left {
  display: flex;
  gap: 0.5rem;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  border: none;
  color: var(--text-secondary);
  padding: 0.75rem 1.25rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px 6px 0 0;
  transition: all 0.2s;
}

.tab-btn.active {
  background-color: var(--text-primary);
  color: #000000;
}

.tab-btn:not(.active):hover {
  color: var(--text-primary);
}

.btn-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem 1rem;
}

.btn-text:hover {
  text-decoration: underline;
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
  min-height: 300px; /* To match the large empty space in the image */
}

.data-table {
  width: 100%;
  min-width: 800px;
  border-collapse: collapse;
}

.data-table th {
  text-align: left;
  padding: 1rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--bg-card-hover);
  white-space: nowrap;
}

.data-table th:not(:last-child) {
  border-right: 1px solid var(--bg-card-hover);
}

.data-table td {
  padding: 1rem;
  border-bottom: 1px solid var(--bg-card-hover);
  font-size: 0.85rem;
}

.empty-state {
  text-align: center;
  padding: 5rem 0;
  color: var(--text-secondary);
  font-size: 0.85rem;
}

/* Pagination */
.pagination-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid var(--bg-card-hover);
  background-color: rgba(255, 255, 255, 0.02);
}

.per-page-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.per-page-select {
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--text-primary);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.page-btn {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  cursor: pointer;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  font-weight: 600;
  color: var(--text-primary);
}

/* Light Theme Adjustments */
:root[data-theme="light"] .page-title,
:root[data-theme="light"] .search-input,
:root[data-theme="light"] .sort-select,
:root[data-theme="light"] .title-with-icon .text-white {
  color: #111827;
}

:root[data-theme="light"] .search-input,
:root[data-theme="light"] .sort-select,
:root[data-theme="light"] .btn-outline,
:root[data-theme="light"] .view-switcher,
:root[data-theme="light"] .view-btn:not(:last-child) {
  border-color: #d1d5db;
}

:root[data-theme="light"] .btn-outline,
:root[data-theme="light"] .view-btn {
  color: #111827;
}

:root[data-theme="light"] .btn-outline:hover,
:root[data-theme="light"] .view-btn:hover:not(.active) {
  background-color: #f3f4f6;
}

:root[data-theme="light"] .view-btn.active {
  background-color: #e5e7eb;
  color: #111827;
}

:root[data-theme="light"] .table-card {
  background-color: var(--text-primary);
  border-color: #e5e7eb;
}

:root[data-theme="light"] .tabs-header,
:root[data-theme="light"] .data-table th,
:root[data-theme="light"] .data-table th:not(:last-child),
:root[data-theme="light"] .data-table td,
:root[data-theme="light"] .pagination-footer {
  border-color: #e5e7eb;
}

:root[data-theme="light"] .tab-btn.active {
  background-color: #111827;
  color: var(--text-primary);
}

:root[data-theme="light"] .tab-btn:not(.active):hover,
:root[data-theme="light"] .btn-text {
  color: #111827;
}

:root[data-theme="light"] .pagination-footer {
  background-color: #f9fafb;
}

:root[data-theme="light"] .per-page-select {
  border-color: #d1d5db;
  color: #111827;
}

:root[data-theme="light"] .page-btn {
  border-color: #d1d5db;
  color: #111827;
}

:root[data-theme="light"] .page-info {
  color: #111827;
}
</style>
