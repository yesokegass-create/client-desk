<template>
  <DashboardLayout>
    <div class="voucher-page">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">Voucher & Kupon</h1>
          <p class="page-subtitle">Buat kode promo dengan periode, kuota, minimum transaksi, dan target paket atau event.</p>
        </div>
        <button class="btn-primary">
          <Plus :size="16" class="mr-1" /> Buat Voucher
        </button>
      </div>

      <!-- Metrics Row -->
      <div class="metrics-row">
        <!-- Voucher Aktif -->
        <div class="metric-card">
          <div class="metric-info">
            <span class="metric-label">VOUCHER AKTIF</span>
            <div class="metric-value">0 <span class="text-gray">/ 5</span></div>
          </div>
          <div class="metric-icon-wrap bg-purple-dark">
            <Percent :size="20" class="text-purple" />
          </div>
        </div>

        <!-- Total Redemption -->
        <div class="metric-card">
          <div class="metric-info">
            <span class="metric-label">TOTAL REDEMPTION</span>
            <div class="metric-value">0</div>
          </div>
          <div class="metric-icon-wrap bg-blue-dark">
            <Ticket :size="20" class="text-blue" />
          </div>
        </div>

        <!-- Nilai Diskon -->
        <div class="metric-card">
          <div class="metric-info">
            <span class="metric-label">NILAI DISKON</span>
            <div class="metric-value">Rp 0</div>
          </div>
          <div class="metric-icon-wrap bg-green-dark">
            <Sparkles :size="20" class="text-green" />
          </div>
        </div>

        <!-- Segera Berakhir -->
        <div class="metric-card">
          <div class="metric-info">
            <span class="metric-label">SEGERA BERAKHIR</span>
            <div class="metric-value">0</div>
          </div>
          <div class="metric-icon-wrap bg-orange-dark">
            <CalendarClock :size="20" class="text-orange" />
          </div>
        </div>
      </div>

      <!-- Toolbar -->
      <div class="toolbar">
        <div class="search-container">
          <Search :size="16" class="search-icon" />
          <input type="text" class="search-input" placeholder="Cari nama atau kode voucher..." />
        </div>
        <button class="btn-filter">
          <ListFilter :size="16" class="mr-1" /> Filter
        </button>
      </div>

      <!-- Tabs -->
      <div class="tabs-container">
        <button class="tab-btn active">
          <FolderOpen :size="14" class="mr-1" /> Aktif
        </button>
        <button class="tab-btn">
          <Archive :size="14" class="mr-1" /> Arsip
        </button>
      </div>

      <!-- Empty State Area -->
      <div class="empty-state-container">
        <div class="empty-state-content">
          <div class="empty-icon-wrapper">
            <Percent :size="32" class="empty-icon" />
            <div class="slash-line"></div>
          </div>
          <h3 class="empty-title">Belum ada voucher</h3>
          <p class="empty-desc">Buat voucher pertama atau ubah filter pencarian.</p>
          <button class="btn-primary mt-4">
            <Plus :size="16" class="mr-1" /> Buat Voucher
          </button>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from '../layouts/DashboardLayout.vue';
import { 
  Plus, Percent, Ticket, Sparkles, CalendarClock,
  Search, ListFilter, FolderOpen, Archive
} from 'lucide-vue-next';
</script>

<style scoped>
.voucher-page {
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

.header-content {
  flex: 1;
  min-width: 300px;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  color: var(--text-primary);
}

.page-subtitle {
  font-size: 0.85rem;
  color: #a0a0a0;
  margin: 0;
}

.btn-primary {
  display: flex;
  align-items: center;
  background-color: var(--text-primary);
  color: #000000;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1.25rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.btn-primary:hover {
  opacity: 0.9;
}

.mr-1 { margin-right: 0.35rem; }
.mt-4 { margin-top: 1.5rem; }

/* Metrics Row */
.metrics-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.metric-card {
  background-color: #121212;
  border: 1px solid var(--bg-card-hover);
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.metric-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.metric-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--text-secondary);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.metric-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
}

.text-gray {
  color: var(--text-secondary);
  font-size: 1.25rem;
}

.metric-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-purple-dark { background-color: rgba(139, 92, 246, 0.1); }
.bg-blue-dark { background-color: rgba(59, 130, 246, 0.1); }
.bg-green-dark { background-color: rgba(16, 185, 129, 0.1); }
.bg-orange-dark { background-color: rgba(249, 115, 22, 0.1); }

.text-purple { color: #8b5cf6; }
.text-blue { color: #3b82f6; }
.text-green { color: #10b981; }
.text-orange { color: #f97316; }

/* Toolbar */
.toolbar {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
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
  color: var(--text-secondary);
}

.search-input {
  width: 100%;
  background-color: #121212;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 0.6rem 1rem 0.6rem 2.5rem;
  color: var(--text-primary);
  font-size: 0.85rem;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.3);
}

.btn-filter {
  display: flex;
  align-items: center;
  background-color: #121212;
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 0.6rem 1.25rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-filter:hover {
  background-color: var(--bg-card-hover);
}

/* Tabs */
.tabs-container {
  display: flex;
  gap: 0.5rem;
}

.tab-btn {
  display: flex;
  align-items: center;
  background: #121212;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn.active {
  background-color: var(--text-primary);
  color: #000000;
  border-color: var(--text-primary);
}

/* Empty State Area */
.empty-state-container {
  flex: 1;
  min-height: 400px;
  background-color: transparent;
  border: 1px dashed var(--border-color);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-state-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.empty-icon-wrapper {
  position: relative;
  width: 64px;
  height: 64px;
  background-color: var(--bg-card-hover);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.empty-icon {
  color: var(--text-secondary);
}

.slash-line {
  position: absolute;
  width: 4px;
  height: 48px;
  background-color: var(--bg-card);
  transform: rotate(45deg);
  border-radius: 2px;
}

.slash-line::after {
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  right: 1px;
  bottom: 1px;
  background-color: var(--text-secondary);
  border-radius: 1px;
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
}

.empty-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin: 0;
  max-width: 300px;
  line-height: 1.5;
}

/* Light Theme Adjustments */















</style>
