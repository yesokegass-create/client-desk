<template>
  <DashboardLayout>
    <div class="rating-page">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">Rating & Ulasan</h1>
          <p class="page-subtitle">Kelola ulasan dari klien selesai dan salin link review untuk klien yang belum mengisi.</p>
        </div>
        
        <div class="header-actions">
          <button class="btn-outline">
            <Settings2 :size="16" />
            Kelola
          </button>
          <button class="btn-outline">
            <RefreshCw :size="16" />
            Muat ulang
          </button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <!-- Rata-rata -->
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">RATA-RATA</span>
            <div class="stat-icon-wrapper bg-brown">
              <Star :size="16" class="text-yellow" />
            </div>
          </div>
          <div class="stat-value">-</div>
          <div class="stat-desc">0 / 0</div>
        </div>

        <!-- Review Masuk -->
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">REVIEW MASUK</span>
            <div class="stat-icon-wrapper bg-blue-dark">
              <MessageSquare :size="16" class="text-blue" />
            </div>
          </div>
          <div class="stat-value">0</div>
          <div class="stat-desc">Sudah review</div>
        </div>

        <!-- Response Rate -->
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">RESPONSE RATE</span>
            <div class="stat-icon-wrapper bg-green-dark">
              <TrendingUp :size="16" class="text-green" />
            </div>
          </div>
          <div class="stat-value">0%</div>
          <div class="stat-desc">Belum review</div>
        </div>

        <!-- Klien Selesai -->
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">KLIEN SELESAI</span>
            <div class="stat-icon-wrapper bg-purple-dark">
              <Users :size="16" class="text-purple" />
            </div>
          </div>
          <div class="stat-value">0</div>
          <div class="stat-desc">Klien selesai</div>
        </div>
      </div>

      <!-- Rating Breakdown -->
      <div class="rating-breakdown">
        <div class="rating-row" v-for="star in [5, 4, 3, 2, 1]" :key="star">
          <div class="rating-label">
            {{ star }} <Star :size="14" class="text-yellow ml-1" />
          </div>
          <div class="rating-bar-container">
            <div class="rating-bar-fill" :style="{ width: '0%' }"></div>
          </div>
          <div class="rating-count">0</div>
        </div>
      </div>

      <!-- Table Section -->
      <div class="table-section">
        <!-- Table Controls -->
        <div class="table-controls">
          <div class="search-container">
            <Search :size="16" class="search-icon" />
            <input type="text" placeholder="Cari klien, kode, paket, atau ulasan..." class="search-input" />
          </div>
          
          <div class="control-actions">
            <button class="btn-outline">
              <Filter :size="16" />
              Filter
            </button>
            <div class="select-wrapper">
              <select class="sort-select">
                <option value="terbaru">Terbaru</option>
                <option value="terlama">Terlama</option>
              </select>
              <ChevronDown :size="14" class="select-icon" />
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="tabs-container">
          <button class="tab-btn active">
            <List :size="16" />
            Semua
          </button>
          <button class="tab-btn">
            <FolderOpen :size="16" />
            Aktif
          </button>
          <button class="tab-btn">
            <Archive :size="16" />
            Arsip
          </button>
        </div>

        <!-- Table -->
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>KLIEN</th>
                <th>RATING</th>
                <th>ULASAN</th>
                <th>STATUS</th>
                <th>AKSI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="5" class="empty-state">
                  Belum ada booking selesai sesuai filter.
                </td>
              </tr>
            </tbody>
          </table>
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
  Settings2, RefreshCw, Star, MessageSquare, TrendingUp, Users,
  Search, Filter, ChevronDown, List, FolderOpen, Archive,
  ChevronLeft, ChevronRight
} from 'lucide-vue-next';
</script>

<style scoped>
.rating-page {
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

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.stat-card {
  background-color: #121212;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.stat-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: #888;
  letter-spacing: 0.05em;
}

.stat-icon-wrapper {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-brown { background-color: rgba(234, 179, 8, 0.15); }
.bg-blue-dark { background-color: rgba(59, 130, 246, 0.15); }
.bg-green-dark { background-color: rgba(16, 185, 129, 0.15); }
.bg-purple-dark { background-color: rgba(139, 92, 246, 0.15); }

.text-yellow { color: #eab308; }
.text-blue { color: #3b82f6; }
.text-green { color: #10b981; }
.text-purple { color: #8b5cf6; }

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.25rem;
}

.stat-desc {
  font-size: 0.8rem;
  color: #888;
}

/* Rating Breakdown */
.rating-breakdown {
  background-color: #121212;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.rating-label {
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  font-weight: 600;
  color: #ffffff;
  width: 40px;
}

.ml-1 {
  margin-left: 0.25rem;
}

.rating-bar-container {
  flex: 1;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.rating-bar-fill {
  height: 100%;
  background-color: #eab308;
  border-radius: 4px;
}

.rating-count {
  font-size: 0.85rem;
  color: #ffffff;
  font-weight: 600;
  width: 20px;
  text-align: right;
}

/* Table Section */
.table-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

/* Tabs */
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
:root[data-theme="light"] .stat-value,
:root[data-theme="light"] .rating-label,
:root[data-theme="light"] .rating-count,
:root[data-theme="light"] .search-input,
:root[data-theme="light"] .sort-select,
:root[data-theme="light"] .data-table td,
:root[data-theme="light"] .page-current,
:root[data-theme="light"] .size-select {
  color: #111827;
}

:root[data-theme="light"] .stat-card,
:root[data-theme="light"] .rating-breakdown,
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
</style>
