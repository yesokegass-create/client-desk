<template>
  <DashboardLayout>
    <div class="invoice-page">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">Invoice & Pelunasan</h1>
          <p class="page-subtitle">Kelola invoice awal, pelunasan, bukti bayar, dan tindak lanjut pembayaran.</p>
        </div>
        
        <div class="header-actions">
          <button class="btn-outline">
            <EyeOff :size="16" />
            Sembunyikan nominal
          </button>
          
          <button class="btn-primary">
            <FileDown :size="16" />
            Export Excel
          </button>
        </div>
      </div>

      <!-- Table Section -->
      <div class="table-section">
        <!-- Controls Top -->
        <div class="table-controls-top">
          <div class="search-container">
            <Search :size="16" class="search-icon" />
            <input type="text" placeholder="Cari klien, invoice, paket, lokasi..." class="search-input" />
          </div>
          
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

        <!-- Controls Bottom (Tabs) -->
        <div class="table-controls-bottom">
          <div class="tabs-container">
            <button class="tab-btn active">
              <FolderOpen :size="16" />
              Aktif
            </button>
            <button class="tab-btn">
              <Archive :size="16" />
              Arsip
            </button>
          </div>
          
          <button class="btn-outline btn-small">
            <Settings2 :size="14" />
            Kelola
          </button>
        </div>

        <!-- Table Container -->
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>NO.</th>
                <th>KLIEN</th>
                <th>HARGA TOTAL</th>
                <th>HARGA PAKET</th>
                <th>ADD-ON</th>
                <th>AKSI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="6" class="empty-state">
                  Tidak ada data keuangan.
                </td>
              </tr>
            </tbody>
          </table>
          
          <!-- Custom Scrollbar Area indicator (visual only for mockup) -->
          <div class="custom-scrollbar-track">
            <div class="custom-scrollbar-thumb"></div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="pagination">
          <div class="page-size">
            <span>Tampilkan</span>
            <select class="size-select">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
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
  EyeOff, FileDown, Search, Filter, ChevronDown, 
  FolderOpen, Archive, Settings2, ChevronLeft, ChevronRight
} from 'lucide-vue-next';
</script>

<style scoped>
.invoice-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-height: calc(100vh - 100px);
}

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
}

.header-content {
  flex: 1;
  min-width: 300px;
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
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;
  min-width: 200px;
}

@media (min-width: 768px) {
  .header-actions {
    flex-direction: row;
    align-items: center;
  }
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
  white-space: nowrap;
}

.btn-outline:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.btn-small {
  padding: 0.35rem 0.75rem;
  font-size: 0.8rem;
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
  white-space: nowrap;
}

.btn-primary:hover {
  opacity: 0.9;
}

/* Table Section */
.table-section {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.table-controls-top {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.search-container {
  position: relative;
  flex: 1;
  min-width: 250px;
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
  background-color: #121212;
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

/* Tabs */
.table-controls-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.tabs-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  border: 1px solid transparent;
  color: #888;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.05);
}

.tab-btn.active {
  background-color: #ffffff;
  color: #000000;
}

/* Table */
.table-container {
  background-color: #121212;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow-x: auto;
  position: relative;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px; /* Force minimum width to show horizontal scroll if needed */
}

.data-table th,
.data-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  white-space: nowrap;
}

.data-table th {
  font-size: 0.7rem;
  font-weight: 700;
  color: #888;
  letter-spacing: 0.05em;
}

.data-table td {
  font-size: 0.85rem;
  color: #ffffff;
}

.empty-state {
  text-align: center !important;
  color: #888 !important;
  padding: 6rem 1rem !important;
}

/* Custom Scrollbar Visual (mocking the UI scrollbar) */
.custom-scrollbar-track {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 12px;
  background-color: rgba(255, 255, 255, 0.02);
  display: flex;
  align-items: center;
  padding: 0 4px;
}

.custom-scrollbar-thumb {
  height: 6px;
  width: 60%;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
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
  padding-top: 0.5rem;
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
:root[data-theme="light"] .search-input,
:root[data-theme="light"] .sort-select,
:root[data-theme="light"] .data-table td,
:root[data-theme="light"] .page-current,
:root[data-theme="light"] .size-select {
  color: #111827;
}

:root[data-theme="light"] .search-input,
:root[data-theme="light"] .table-container,
:root[data-theme="light"] .sort-select option,
:root[data-theme="light"] .size-select option {
  background-color: #ffffff;
  border-color: #e5e7eb;
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

:root[data-theme="light"] .tab-btn.active {
  background-color: #111827;
  color: #ffffff;
}

:root[data-theme="light"] .select-icon,
:root[data-theme="light"] .sort-select {
  color: #111827;
}

:root[data-theme="light"] .data-table th,
:root[data-theme="light"] .data-table td {
  border-bottom-color: #e5e7eb;
}

:root[data-theme="light"] .custom-scrollbar-track {
  background-color: #f3f4f6;
}

:root[data-theme="light"] .custom-scrollbar-thumb {
  background-color: #d1d5db;
}
</style>
