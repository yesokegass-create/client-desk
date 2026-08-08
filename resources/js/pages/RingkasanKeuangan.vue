<template>
  <DashboardLayout>
    <div class="finance-page">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">Keuangan</h1>
          <p class="page-subtitle">Pantau pemasukan, biaya operasional, sumber dana, dan paket terlaris.</p>
        </div>
        
        <div class="header-actions">
          <div class="select-wrapper">
            <select class="period-select">
              <option value="all">Ringkasan Semua</option>
              <option value="this_month">Bulan Ini</option>
              <option value="last_month">Bulan Lalu</option>
            </select>
            <ChevronDown :size="14" class="select-icon" />
          </div>
          
          <button class="btn-outline">
            <EyeOff :size="16" />
            Sembunyikan nominal
          </button>
          
          <button class="btn-outline">
            <RefreshCw :size="16" />
            Coba Lagi
          </button>
        </div>
      </div>

      <!-- Period Indicator -->
      <div class="period-indicator">
        <span class="text-gray">Periode:</span> Ringkasan Semua
      </div>

      <!-- Metrics Grid -->
      <div class="metrics-grid">
        <!-- Total Pemasukan -->
        <div class="metric-card">
          <div class="metric-header">
            <div class="metric-icon bg-green-dark">
              <Wallet :size="16" class="text-green" />
            </div>
            <span class="metric-label">TOTAL PEMASUKAN</span>
          </div>
          <div class="metric-value">Rp 0</div>
          <div class="metric-desc">Transaksi terverifikasi pada periode ini.</div>
        </div>

        <!-- Biaya Operasional -->
        <div class="metric-card">
          <div class="metric-header">
            <div class="metric-icon bg-pink-dark">
              <DollarSign :size="16" class="text-pink" />
            </div>
            <span class="metric-label">BIAYA OPERASIONAL</span>
          </div>
          <div class="metric-value">Rp 0</div>
          <div class="metric-desc">Mengurangi pemasukan bersih internal.</div>
        </div>

        <!-- Pemasukan Bersih -->
        <div class="metric-card">
          <div class="metric-header">
            <div class="metric-icon bg-blue-dark">
              <TrendingUp :size="16" class="text-blue" />
            </div>
            <span class="metric-label">PEMASUKAN BERSIH</span>
          </div>
          <div class="metric-value">Rp 0</div>
          <div class="metric-desc">Pemasukan terverifikasi setelah dikurangi biaya operasional.</div>
        </div>

        <!-- Status DP -->
        <div class="metric-card">
          <div class="metric-header">
            <div class="metric-icon bg-yellow-dark">
              <Landmark :size="16" class="text-yellow" />
            </div>
            <span class="metric-label">STATUS DP</span>
          </div>
          <div class="metric-value">Rp 0</div>
          <div class="metric-desc mb-2">Terverifikasi</div>
          <div class="divider"></div>
          <div class="metric-sub-status text-orange">
            <Clock :size="14" class="mr-1" /> Rp 0 <span class="ml-1">Belum terverifikasi</span>
          </div>
        </div>

        <!-- Sisa Tagihan -->
        <div class="metric-card">
          <div class="metric-header">
            <div class="metric-icon bg-gray-dark">
              <Clock :size="16" class="text-gray" />
            </div>
            <span class="metric-label">SISA TAGIHAN</span>
          </div>
          <div class="metric-value">Rp 0</div>
          <div class="metric-desc">Sisa tagihan booking pada periode terpilih.</div>
        </div>

        <!-- Total Booking -->
        <div class="metric-card">
          <div class="metric-header">
            <div class="metric-icon bg-purple-dark">
              <Layers :size="16" class="text-purple" />
            </div>
            <span class="metric-label">TOTAL BOOKING</span>
          </div>
          <div class="metric-value">0</div>
          <div class="metric-desc">Jumlah booking berdasarkan tanggal booking pada periode ini.</div>
        </div>
      </div>

      <!-- Bottom Layout -->
      <div class="bottom-layout">
        <!-- Main Chart Area -->
        <div class="chart-section">
          <div class="chart-header">
            <div class="chart-title-wrap">
              <h3 class="chart-title">Grafik Pemasukan Bulanan</h3>
              <p class="chart-desc">12 bulan terakhir dari periode yang dipilih.</p>
            </div>
            <div class="chart-legend">
              <div class="legend-item">
                <span class="dot bg-blue"></span> Pemasukan Bersih
              </div>
              <div class="legend-item">
                <span class="dot bg-pink"></span> Biaya Operasional
              </div>
            </div>
          </div>
          
          <div class="chart-area">
            <!-- Simulated Chart Grid -->
            <div class="y-axis">
              <span>4</span>
              <span>3</span>
              <span>2</span>
              <span>1</span>
              <span>0</span>
            </div>
            <div class="chart-grid-lines">
              <div class="grid-line"></div>
              <div class="grid-line"></div>
              <div class="grid-line"></div>
              <div class="grid-line"></div>
              <div class="grid-line"></div>
            </div>
            <div class="x-axis">
              <span>Sep</span>
              <span>Okt</span>
              <span>Nov</span>
              <span>Des</span>
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>Mei</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Agu</span>
            </div>
          </div>
        </div>

        <!-- Sidebar Widgets -->
        <div class="sidebar-widgets">
          <!-- Sumber Keuangan -->
          <div class="widget-card">
            <div class="widget-header">
              <h3 class="widget-title">Sumber Keuangan</h3>
              <p class="widget-desc">Ringkasan Semua</p>
            </div>
            <div class="widget-empty">
              Belum ada transaksi pada periode ini.
            </div>
          </div>
          
          <!-- Paket Terlaris -->
          <div class="widget-card">
            <div class="widget-header">
              <div class="widget-icon-wrap">
                <div class="metric-icon bg-yellow-dark">
                  <Package :size="16" class="text-yellow" />
                </div>
                <div class="widget-title-wrap">
                  <h3 class="widget-title">Paket Terlaris</h3>
                  <p class="widget-desc">Paket utama dengan booking terbanyak pada periode ini.</p>
                </div>
              </div>
            </div>
            <div class="widget-empty">
              Belum ada paket terlaris untuk periode ini.
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from '../layouts/DashboardLayout.vue';
import { 
  ChevronDown, EyeOff, RefreshCw, Wallet, DollarSign,
  TrendingUp, Landmark, Clock, Layers, Package
} from 'lucide-vue-next';
</script>

<style scoped>
.finance-page {
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

.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.period-select {
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

.period-select:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.4);
}

.period-select option {
  background-color: #121212;
  color: #fff;
}

.select-icon {
  position: absolute;
  right: 0.75rem;
  pointer-events: none;
  color: #fff;
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

/* Period Indicator */
.period-indicator {
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem 1.25rem;
  font-size: 0.85rem;
  color: #ffffff;
  font-weight: 500;
}

.text-gray {
  color: #888;
}

/* Metrics Grid */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-green-dark { background-color: rgba(16, 185, 129, 0.15); }
.bg-pink-dark { background-color: rgba(236, 72, 153, 0.15); }
.bg-blue-dark { background-color: rgba(59, 130, 246, 0.15); }
.bg-yellow-dark { background-color: rgba(234, 179, 8, 0.15); }
.bg-gray-dark { background-color: rgba(156, 163, 175, 0.15); }
.bg-purple-dark { background-color: rgba(139, 92, 246, 0.15); }

.text-green { color: #10b981; }
.text-pink { color: #ec4899; }
.text-blue { color: #3b82f6; }
.text-yellow { color: #eab308; }
.text-orange { color: #f97316; }
.text-purple { color: #8b5cf6; }

.metric-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #a0a0a0;
  letter-spacing: 0.05em;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.metric-desc {
  font-size: 0.8rem;
  color: #888;
  line-height: 1.4;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.divider {
  height: 1px;
  background-color: rgba(255, 255, 255, 0.05);
  margin: 0.5rem 0;
}

.metric-sub-status {
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 600;
}

.mr-1 { margin-right: 0.25rem; }
.ml-1 { margin-left: 0.25rem; }

/* Bottom Layout */
.bottom-layout {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.chart-section {
  flex: 2;
  min-width: 400px;
  background-color: #121212;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  gap: 1rem;
}

.chart-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.25rem 0;
}

.chart-desc {
  font-size: 0.85rem;
  color: #888;
  margin: 0;
}

.chart-legend {
  display: flex;
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #a0a0a0;
  background-color: rgba(255, 255, 255, 0.02);
  padding: 0.4rem 0.75rem;
  border-radius: 20px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.bg-blue { background-color: #3b82f6; }
.bg-pink { background-color: #ec4899; }

.chart-area {
  position: relative;
  flex: 1;
  min-height: 250px;
  display: flex;
  flex-direction: column;
}

.y-axis {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #555;
  font-size: 0.75rem;
  width: 20px;
}

.chart-grid-lines {
  position: absolute;
  left: 30px;
  right: 0;
  top: 6px;
  bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.grid-line {
  width: 100%;
  border-top: 1px dashed rgba(255, 255, 255, 0.05);
}

.x-axis {
  position: absolute;
  left: 30px;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  color: #555;
  font-size: 0.75rem;
  padding-top: 10px;
}

/* Sidebar Widgets */
.sidebar-widgets {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.widget-card {
  background-color: #121212;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
}

.widget-header {
  margin-bottom: 1rem;
}

.widget-icon-wrap {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.widget-title {
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.25rem 0;
}

.widget-desc {
  font-size: 0.8rem;
  color: #888;
  margin: 0;
  line-height: 1.4;
}

.widget-empty {
  border: 1px dashed rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem 1rem;
  text-align: center;
  color: #888;
  font-size: 0.85rem;
  background-color: rgba(255, 255, 255, 0.01);
}

/* Light Theme Adjustments */
:root[data-theme="light"] .page-title,
:root[data-theme="light"] .period-indicator,
:root[data-theme="light"] .metric-value,
:root[data-theme="light"] .chart-title,
:root[data-theme="light"] .widget-title,
:root[data-theme="light"] .period-select,
:root[data-theme="light"] .select-icon {
  color: #111827;
}

:root[data-theme="light"] .metric-card,
:root[data-theme="light"] .chart-section,
:root[data-theme="light"] .widget-card,
:root[data-theme="light"] .period-indicator,
:root[data-theme="light"] .period-select option {
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

:root[data-theme="light"] .divider {
  background-color: #e5e7eb;
}

:root[data-theme="light"] .legend-item {
  background-color: #f3f4f6;
  color: #4b5563;
}

:root[data-theme="light"] .widget-empty {
  border-color: #d1d5db;
  background-color: #f9fafb;
}

:root[data-theme="light"] .grid-line {
  border-color: #e5e7eb;
}
</style>
