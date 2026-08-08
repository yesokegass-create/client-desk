<template>
  <DashboardLayout>
    <div class="pembayaran-page">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">Pembayaran Tim / Freelance</h1>
          <p class="page-subtitle">Kelola status pembayaran internal tim dan freelance yang terhubung ke booking.</p>
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
          
          <button class="btn-outline">
            <Settings2 :size="16" />
            Kelola kolom
          </button>
        </div>
      </div>

      <!-- Metrics Horizontal Row -->
      <div class="metrics-row">
        <!-- Freelance -->
        <div class="metric-card">
          <div class="metric-header">
            <div class="metric-icon bg-purple-dark">
              <Users :size="16" class="text-purple" />
            </div>
            <span class="metric-label">FREELANCE</span>
          </div>
          <div class="metric-value">0</div>
        </div>

        <!-- Total Job -->
        <div class="metric-card">
          <div class="metric-header">
            <div class="metric-icon bg-blue-dark">
              <Briefcase :size="16" class="text-blue" />
            </div>
            <span class="metric-label">TOTAL JOB</span>
          </div>
          <div class="metric-value">0</div>
        </div>

        <!-- Belum Lunas -->
        <div class="metric-card">
          <div class="metric-header">
            <div class="metric-icon bg-yellow-dark">
              <Clock :size="16" class="text-yellow" />
            </div>
            <span class="metric-label">BELUM LUNAS</span>
          </div>
          <div class="metric-value text-yellow">0</div>
        </div>

        <!-- Total Belum Dibayar -->
        <div class="metric-card">
          <div class="metric-header">
            <div class="metric-icon bg-green-dark">
              <Wallet :size="16" class="text-green" />
            </div>
            <span class="metric-label">TOTAL BELUM DIBAYAR</span>
          </div>
          <div class="metric-value">Rp 0</div>
        </div>
      </div>

      <!-- Table Section -->
      <div class="table-section">
        <!-- Table Controls -->
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
                <option value="terbaru">Urutkan: Booking terbaru</option>
                <option value="terlama">Urutkan: Booking terlama</option>
              </select>
              <ChevronDown :size="14" class="select-icon" />
            </div>
            
            <button class="btn-outline">
              <Settings2 :size="16" />
              Kelola
            </button>
          </div>
        </div>

        <!-- Table -->
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>FREELANCE</th>
                <th>JOB</th>
                <th>LUNAS</th>
                <th>BELUM LUNAS</th>
                <th>TOTAL BELUM DIBAYAR</th>
                <th>AKSI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="6" class="empty-state">
                  Belum ada pembayaran tim.
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
  EyeOff, FileDown, Settings2, Users, Briefcase, Clock, Wallet,
  Search, Filter, ChevronDown, ChevronLeft, ChevronRight
} from 'lucide-vue-next';
</script>

<style scoped>
.pembayaran-page {
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

/* Metrics Row */
.metrics-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.metric-card {
  background-color: #121212;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
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

.bg-purple-dark { background-color: rgba(139, 92, 246, 0.15); }
.bg-blue-dark { background-color: rgba(59, 130, 246, 0.15); }
.bg-yellow-dark { background-color: rgba(234, 179, 8, 0.15); }
.bg-green-dark { background-color: rgba(16, 185, 129, 0.15); }

.text-purple { color: #8b5cf6; }
.text-blue { color: #3b82f6; }
.text-yellow { color: #eab308; }
.text-green { color: #10b981; }

.metric-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: #a0a0a0;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.metric-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #ffffff;
}

/* Table Section */
.table-section {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
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
  min-width: 250px;
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

.control-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
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

/* Table */
.table-container {
  background-color: #121212;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow-x: auto;
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
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
  background-color: #1a1a1a;
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
  margin-top: auto;
  height: 12px;
  background-color: rgba(255, 255, 255, 0.02);
  display: flex;
  align-items: center;
  padding: 0 4px;
}

.custom-scrollbar-thumb {
  height: 6px;
  width: 20%; /* Example width to show it's scrollable */
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
:root[data-theme="light"] .metric-value,
:root[data-theme="light"] .search-input,
:root[data-theme="light"] .sort-select,
:root[data-theme="light"] .data-table td,
:root[data-theme="light"] .page-current,
:root[data-theme="light"] .size-select {
  color: #111827;
}

:root[data-theme="light"] .metric-card,
:root[data-theme="light"] .table-container,
:root[data-theme="light"] .sort-select option,
:root[data-theme="light"] .size-select option {
  background-color: #ffffff;
  border-color: #e5e7eb;
}

:root[data-theme="light"] .btn-outline,
:root[data-theme="light"] .search-input {
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

:root[data-theme="light"] .data-table th {
  background-color: #f9fafb;
  border-bottom-color: #e5e7eb;
}

:root[data-theme="light"] .data-table td {
  border-bottom-color: #e5e7eb;
}

:root[data-theme="light"] .custom-scrollbar-track {
  background-color: #f3f4f6;
}

:root[data-theme="light"] .custom-scrollbar-thumb {
  background-color: #d1d5db;
}

:root[data-theme="light"] .text-yellow.metric-value {
  color: #ca8a04; /* Darker yellow for text on light bg */
}
</style>
