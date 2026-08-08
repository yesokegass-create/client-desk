<template>
  <DashboardLayout>
    <div class="booking-page">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">Daftar Booking</h1>
          <p class="page-subtitle">Kelola klien, jadwal, dan progres pekerjaan di sini.</p>
        </div>
        
        <div class="header-actions">
          <button class="btn-outline">
            <Download :size="16" />
            Export
          </button>
          <button class="btn-outline">
            <SlidersHorizontal :size="16" />
            Kelola kolom
          </button>
          <button class="btn-outline">
            <Zap :size="16" />
            Batch Import
          </button>
          <button class="btn-primary">
            <Plus :size="16" />
            Tambah Klien Baru
          </button>
        </div>
      </div>

      <!-- Search and Filter Row -->
      <div class="filter-row">
        <div class="search-container">
          <Search :size="16" class="search-icon" />
          <input type="text" placeholder="Cari klien, invoice, lokasi, akad/resepsi/sesi..." class="search-input" />
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
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>NO.</th>
                <th>NAMA KLIEN</th>
                <th>INVOICE</th>
                <th>TANGGAL BOOKING</th>
                <th>PAKET</th>
                <th>TANGGAL SESI</th>
                <th>JAM SESI</th>
                <th>LOKASI</th>
                <th>STATUS</th>
                <th>AKSI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="10" class="empty-state">
                  <p>Data tidak ditemukan.</p>
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
import DashboardLayout from '../layouts/DashboardLayout.vue';
import { 
  Download, SlidersHorizontal, Zap, Plus, 
  Search, ListFilter, Folder, Archive, Settings2,
  ChevronLeft, ChevronRight 
} from 'lucide-vue-next';
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

/* Filters */
.filter-row {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.search-container {
  flex: 1;
  min-width: 300px;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  color: #888;
}

.search-input {
  width: 100%;
  padding: 0.6rem 1rem 0.6rem 2.5rem;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  color: #fff;
  font-size: 0.85rem;
}

.search-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.3);
}

.sort-container {
  position: relative;
}

.sort-select {
  padding: 0.6rem 2rem 0.6rem 1rem;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  color: #fff;
  font-size: 0.85rem;
  appearance: none;
  cursor: pointer;
}

.sort-select:focus {
  outline: none;
}

/* Table Card */
.table-card {
  background-color: #0a0a0a;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
}

.tabs-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.5rem 0 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
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
  color: #888;
  padding: 0.75rem 1.25rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px 6px 0 0;
  transition: all 0.2s;
}

.tab-btn.active {
  background-color: #ffffff;
  color: #000000;
}

.tab-btn:not(.active):hover {
  color: #fff;
}

.btn-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  border: none;
  color: #fff;
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
  min-width: 1000px;
  border-collapse: collapse;
}

.data-table th {
  text-align: left;
  padding: 1rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: #888;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  white-space: nowrap;
}

.data-table th:not(:last-child) {
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

.data-table td {
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.85rem;
}

.empty-state {
  text-align: center;
  padding: 5rem 0;
  color: #888;
  font-style: italic;
  font-size: 0.85rem;
}

/* Pagination */
.pagination-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background-color: rgba(255, 255, 255, 0.02);
}

.per-page-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #888;
}

.per-page-select {
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.8rem;
  color: #888;
}

.page-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
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
  color: #fff;
}

/* Light Theme Adjustments */
:root[data-theme="light"] .page-title,
:root[data-theme="light"] .search-input,
:root[data-theme="light"] .sort-select {
  color: #111827;
}

:root[data-theme="light"] .search-input,
:root[data-theme="light"] .sort-select,
:root[data-theme="light"] .btn-outline {
  border-color: #d1d5db;
}

:root[data-theme="light"] .btn-outline {
  color: #111827;
}

:root[data-theme="light"] .btn-outline:hover {
  background-color: #f3f4f6;
}

:root[data-theme="light"] .btn-primary {
  background-color: #111827;
  color: #ffffff;
}

:root[data-theme="light"] .table-card {
  background-color: #ffffff;
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
  color: #ffffff;
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
