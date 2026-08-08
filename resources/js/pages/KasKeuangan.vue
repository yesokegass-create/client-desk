<template>
  <DashboardLayout>
    <div class="kas-page">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">Kas Keuangan</h1>
          <p class="page-subtitle">Lihat riwayat uang masuk dan keluar dari semua booking.</p>
        </div>
        
        <div class="header-actions">
          <button class="btn-primary">
            <Plus :size="16" />
            Tambah Transaksi
          </button>
          
          <button class="btn-outline">
            <EyeOff :size="16" />
            Sembunyikan nominal
          </button>
          
          <button class="btn-outline">
            <RefreshCw :size="16" />
            Muat ulang
          </button>
        </div>
      </div>

      <!-- Filters Area -->
      <div class="filters-area">
        <div class="filter-row">
          <div class="search-container">
            <Search :size="16" class="search-icon" />
            <input type="text" placeholder="Cari client, kode booking, paket, atau c..." class="search-input" />
          </div>
          
          <div class="filter-btn">
            <Calendar :size="16" />
            <span>Filter tanggal transaksi</span>
            <ChevronDown :size="14" class="ml-auto" />
          </div>
          
          <div class="select-wrapper">
            <select class="filter-select">
              <option value="all">Semua Arah</option>
            </select>
            <ChevronDown :size="14" class="select-icon" />
          </div>
          
          <div class="select-wrapper">
            <select class="filter-select">
              <option value="all">Semua Tipe</option>
            </select>
            <ChevronDown :size="14" class="select-icon" />
          </div>
        </div>
        
        <div class="filter-row">
          <div class="select-wrapper flex-1">
            <select class="filter-select w-full">
              <option value="all">Semua Paket</option>
            </select>
            <ChevronDown :size="14" class="select-icon" />
          </div>
          
          <div class="select-wrapper flex-1">
            <select class="filter-select w-full">
              <option value="all">Semua Status</option>
            </select>
            <ChevronDown :size="14" class="select-icon" />
          </div>
        </div>
      </div>

      <!-- Metrics Horizontal List -->
      <div class="metrics-container">
        <!-- Uang Masuk -->
        <div class="metric-card">
          <div class="metric-header">
            <div class="metric-icon bg-green-dark">
              <ArrowDownLeft :size="16" class="text-green" />
            </div>
            <span class="metric-label">UANG MASUK</span>
          </div>
          <div class="metric-value">Rp 0</div>
          <div class="metric-desc">Total transaksi masuk pada filter ini.</div>
        </div>

        <!-- Uang Keluar -->
        <div class="metric-card">
          <div class="metric-header">
            <div class="metric-icon bg-red-dark">
              <ArrowUpRight :size="16" class="text-red" />
            </div>
            <span class="metric-label">UANG KELUAR</span>
          </div>
          <div class="metric-value">Rp 0</div>
          <div class="metric-desc">Total transaksi keluar pada filter ini.</div>
        </div>

        <!-- Saldo Bersih -->
        <div class="metric-card">
          <div class="metric-header">
            <div class="metric-icon bg-blue-dark">
              <Wallet :size="16" class="text-blue" />
            </div>
            <span class="metric-label">SALDO BERSIH</span>
          </div>
          <div class="metric-value">Rp 0</div>
          <div class="metric-desc">Uang masuk dikurangi uang keluar.</div>
        </div>

        <!-- DP Masuk -->
        <div class="metric-card">
          <div class="metric-header">
            <div class="metric-icon bg-yellow-dark">
              <Landmark :size="16" class="text-yellow" />
            </div>
            <span class="metric-label">DP MASUK</span>
          </div>
          <div class="metric-value">Rp 0</div>
          <div class="metric-desc">DP booking yang sudah terverifikasi.</div>
        </div>

        <!-- Pelunasan Masuk -->
        <div class="metric-card">
          <div class="metric-header">
            <div class="metric-icon bg-blue-dark">
              <FileText :size="16" class="text-blue" />
            </div>
            <span class="metric-label">PELUNASAN MASUK</span>
          </div>
          <div class="metric-value">Rp 0</div>
          <div class="metric-desc">Pelunasan final yang sudah tercatat.</div>
        </div>

        <!-- Biaya Operasional -->
        <div class="metric-card">
          <div class="metric-header">
            <div class="metric-icon bg-gray-dark">
              <ArrowUpRight :size="16" class="text-gray" />
            </div>
            <span class="metric-label">BIAYA OPERASIONAL</span>
          </div>
          <div class="metric-value">Rp 0</div>
          <div class="metric-desc">Total biaya operasional dari booking dan fixed cost.</div>
        </div>
      </div>

      <!-- Table Section -->
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>TANGGAL</th>
              <th>TIPE</th>
              <th>ARAH</th>
              <th>NOMINAL</th>
              <th>BOOKING</th>
              <th>CLIENT</th>
              <th>PAKET</th>
              <th>METODE/SUMBER</th>
              <th>CATATAN</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="9" class="empty-state">
                Belum ada transaksi kas keuangan.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from '../layouts/DashboardLayout.vue';
import { 
  Plus, EyeOff, RefreshCw, Search, Calendar, ChevronDown,
  ArrowDownLeft, ArrowUpRight, Wallet, Landmark, FileText
} from 'lucide-vue-next';
</script>

<style scoped>
.kas-page {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
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

/* Filters Area */
.filters-area {
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filter-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-container {
  position: relative;
  flex: 1.5;
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
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  color: #ffffff;
  font-size: 0.85rem;
}

.search-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.4);
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  cursor: pointer;
  flex: 1;
  min-width: 200px;
}

.ml-auto {
  margin-left: auto;
}

.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 150px;
}

.flex-1 { flex: 1; }
.w-full { width: 100%; }

.filter-select {
  appearance: none;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: #ffffff;
  padding: 0.5rem 2rem 0.5rem 1rem;
  font-size: 0.85rem;
  cursor: pointer;
  width: 100%;
}

.filter-select:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.4);
}

.filter-select option {
  background-color: #121212;
  color: #fff;
}

.select-icon {
  position: absolute;
  right: 0.75rem;
  pointer-events: none;
  color: #fff;
}

/* Metrics Container */
.metrics-container {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.metrics-container::-webkit-scrollbar {
  height: 6px;
}

.metrics-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.metrics-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.metric-card {
  background-color: #121212;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  min-width: 220px;
  flex: 1;
}

.metric-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.metric-icon {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-green-dark { background-color: rgba(16, 185, 129, 0.15); }
.bg-red-dark { background-color: rgba(239, 68, 68, 0.15); }
.bg-blue-dark { background-color: rgba(59, 130, 246, 0.15); }
.bg-yellow-dark { background-color: rgba(234, 179, 8, 0.15); }
.bg-gray-dark { background-color: rgba(156, 163, 175, 0.15); }

.text-green { color: #10b981; }
.text-red { color: #ef4444; }
.text-blue { color: #3b82f6; }
.text-yellow { color: #eab308; }
.text-gray { color: #9ca3af; }

.metric-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: #a0a0a0;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.metric-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.metric-desc {
  font-size: 0.75rem;
  color: #888;
  line-height: 1.4;
}

/* Table Section */
.table-container {
  background-color: #121212;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow-x: auto;
  margin-top: 0.5rem;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
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
  padding: 3rem 1rem !important;
}

/* Light Theme Adjustments */
:root[data-theme="light"] .page-title,
:root[data-theme="light"] .metric-value,
:root[data-theme="light"] .search-input,
:root[data-theme="light"] .filter-btn,
:root[data-theme="light"] .filter-select,
:root[data-theme="light"] .data-table td {
  color: #111827;
}

:root[data-theme="light"] .metric-card,
:root[data-theme="light"] .filters-area,
:root[data-theme="light"] .table-container,
:root[data-theme="light"] .filter-select option {
  background-color: #ffffff;
  border-color: #e5e7eb;
}

:root[data-theme="light"] .btn-outline,
:root[data-theme="light"] .search-input,
:root[data-theme="light"] .filter-btn,
:root[data-theme="light"] .filter-select {
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

:root[data-theme="light"] .select-icon {
  color: #111827;
}

:root[data-theme="light"] .data-table th,
:root[data-theme="light"] .data-table td {
  border-bottom-color: #e5e7eb;
}
</style>
