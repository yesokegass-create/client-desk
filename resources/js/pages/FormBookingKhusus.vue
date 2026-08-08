<template>
  <DashboardLayout>
    <div class="form-khusus-page">
      <!-- Page Header -->
      <div class="page-header">
        <h1 class="page-title">Form Booking Khusus</h1>
        <p class="page-subtitle">Buat link booking khusus dengan aturan lock/unlock Paket dan Add-on, plus biaya akomodasi dan diskon nominal.</p>
      </div>

      <!-- Main Content Area -->
      <div class="main-content">
        
        <!-- Left Column: Form Buat Link -->
        <div class="form-column">
          <h2 class="column-title">BUAT LINK BARU</h2>

          <!-- Nama Link -->
          <div class="form-group">
            <label>Nama Link</label>
            <input type="text" class="form-control" placeholder="Contoh: Wedding Luar Kota - Klien A" />
          </div>

          <!-- Info Box -->
          <div class="info-box">
            <Calendar :size="16" class="info-icon" />
            <div class="info-content">
              <h4 class="info-title">Metode sesi mengikuti Form Booking umum</h4>
              <p class="info-desc">Single, Akad/Resepsi, Wisuda Sesi 1/2, atau Multi Session otomatis mengikuti pengaturan tipe acara di menu Form Booking. Jika tipe acara dikunci dan diset Multi Session, klien akan mengisi semua tanggal sesi dari link khusus ini.</p>
            </div>
          </div>

          <!-- Tipe Acara -->
          <div class="settings-section">
            <div class="section-header-flex">
              <div>
                <h3>Tipe Acara</h3>
                <p class="section-desc">Saat lock, klien hanya bisa memilih dari whitelist ini.</p>
              </div>
              <button class="btn-unlock">
                <Unlock :size="12" class="mr-1" /> Unlock
              </button>
            </div>
            
            <div class="scrollable-list">
              <label class="checkbox-item">
                <span class="item-label">Umum</span>
                <input type="checkbox" class="custom-checkbox" />
              </label>
              <label class="checkbox-item">
                <span class="item-label">Wedding</span>
                <input type="checkbox" class="custom-checkbox" />
              </label>
              <label class="checkbox-item">
                <span class="item-label">Akad</span>
                <input type="checkbox" class="custom-checkbox" />
              </label>
              <label class="checkbox-item">
                <span class="item-label">Resepsi</span>
                <input type="checkbox" class="custom-checkbox" />
              </label>
              
              <!-- Scrollbar mock -->
              <div class="scroll-track">
                <div class="scroll-thumb"></div>
              </div>
            </div>
          </div>

          <!-- Paket -->
          <div class="settings-section">
            <div class="section-header-flex">
              <div>
                <h3>Paket</h3>
                <p class="section-desc">Saat unlock, pilihan di bawah jadi prefill opsional.</p>
              </div>
              <button class="btn-unlock">
                <Unlock :size="12" class="mr-1" /> Unlock
              </button>
            </div>
            
            <p class="empty-text">Belum ada paket aktif publik.</p>
            
            <div class="feature-box">
              <label class="checkbox-wrapper">
                <input type="checkbox" class="custom-checkbox dark-bg" />
                <div class="checkbox-content">
                  <span class="checkbox-title">Klien bisa tambah paket walaupun paket dikunci</span>
                  <span class="checkbox-desc">Paket yang dicentang tetap wajib ikut, lalu klien bisa menambahkan paket lain dari form.</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Add-on -->
          <div class="settings-section">
            <div class="section-header-flex">
              <div>
                <h3>Add-on</h3>
                <p class="section-desc">Saat unlock, pilihan di bawah jadi prefill opsional.</p>
              </div>
              <button class="btn-unlock">
                <Unlock :size="12" class="mr-1" /> Unlock
              </button>
            </div>
            
            <p class="empty-text">Belum ada add-on aktif publik.</p>
            
            <div class="feature-box">
              <label class="checkbox-wrapper">
                <input type="checkbox" class="custom-checkbox dark-bg" />
                <div class="checkbox-content">
                  <span class="checkbox-title">Klien bisa tambah add-on walaupun add-on dikunci</span>
                  <span class="checkbox-desc">Add-on yang dicentang tetap wajib ikut, lalu klien bisa menambahkan add-on lain dari form.</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Biaya & Diskon -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label>Biaya Akomodasi (Rp)</label>
              <input type="text" class="form-control" value="0" />
            </div>
            <div class="form-group flex-1">
              <label>Diskon Nominal (Rp)</label>
              <input type="text" class="form-control" value="0" />
            </div>
          </div>

          <!-- Pajak Booking -->
          <div class="settings-section border-section">
            <div class="section-header-flex">
              <div>
                <h3>Pajak Booking</h3>
                <p class="section-desc">Prefill dari Pengaturan Keuangan. Pajak masih dapat diubah selama link belum digunakan klien.</p>
              </div>
              <button class="btn-outline-small">
                <Plus :size="12" class="mr-1" /> Tambah Pajak
              </button>
            </div>
            
            <div class="dashed-box">
              Booking tidak menggunakan pajak.
            </div>

            <!-- Calculation Summary -->
            <div class="calc-summary">
              <div class="calc-row">
                <span>Subtotal</span>
                <span class="font-bold">Rp 0</span>
              </div>
              <div class="calc-row">
                <span>Total Pajak</span>
                <span class="font-bold">Rp 0</span>
              </div>
              <div class="calc-row grand-total">
                <span>Grand Total</span>
                <span class="font-bold">Rp 0</span>
              </div>
            </div>
          </div>

          <!-- Options -->
          <div class="options-group">
            <label class="checkbox-wrapper-simple">
              <input type="checkbox" class="custom-checkbox" />
              <div class="checkbox-content">
                <span class="checkbox-title">Disable DP / pembayaran awal</span>
                <span class="checkbox-desc">Klien bisa submit booking dari link ini tanpa DP, metode pembayaran, dan bukti pembayaran.</span>
              </div>
            </label>

            <label class="checkbox-wrapper-simple mt-3">
              <input type="checkbox" class="custom-checkbox" checked />
              <div class="checkbox-content">
                <span class="checkbox-title text-white">Link aktif</span>
              </div>
            </label>
          </div>
          
          <!-- Action Buttons -->
          <div class="action-buttons-bottom">
            <button class="btn-primary">Buat Link</button>
            <button class="btn-dark">
              <RefreshCw :size="14" class="mr-1" /> Refresh
            </button>
          </div>
          
        </div>
        
        <!-- Right Column: Daftar Link -->
        <div class="list-column">
          <div class="list-header-box">
            <h2 class="column-title">DAFTAR LINK BOOKING KHUSUS</h2>
            <p class="list-desc">URL akan mengarah ke form booking publik yang sama, dengan token 'offer' sesuai link.</p>
          </div>
          
          <div class="list-container">
            <div class="list-empty">
              Belum ada link booking khusus.
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
  Calendar, Unlock, Plus, RefreshCw
} from 'lucide-vue-next';
</script>

<style scoped>
.form-khusus-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Header */
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

/* Main Content Area */
.main-content {
  display: flex;
  gap: 2rem;
}

.form-column {
  flex: 1.2;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.list-column {
  flex: 1;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (max-width: 992px) {
  .main-content {
    flex-direction: column;
  }
}

.column-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: #888;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin: 0 0 1rem 0;
}

/* Form Controls */
.form-group {
  margin-bottom: 0.5rem;
}

.form-group label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.5rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.flex-1 { flex: 1; }

.form-control {
  width: 100%;
  background-color: #121212;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 0.6rem 1rem;
  color: #fff;
  font-size: 0.85rem;
  font-family: inherit;
}

.form-control:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.3);
}

/* Info Box */
.info-box {
  display: flex;
  gap: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.25rem;
}

.info-icon {
  color: #888;
  margin-top: 0.1rem;
}

.info-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.5rem 0;
}

.info-desc {
  font-size: 0.75rem;
  color: #888;
  margin: 0;
  line-height: 1.4;
}

/* Settings Sections */
.settings-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.border-section {
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.25rem;
  background-color: #121212;
}

.section-header-flex {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.section-header-flex h3 {
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.25rem 0;
}

.section-desc {
  font-size: 0.75rem;
  color: #888;
  margin: 0;
  max-width: 90%;
}

.empty-text {
  font-size: 0.75rem;
  color: #888;
  margin: 0;
}

.btn-unlock {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 0.75rem;
  padding: 0.3rem 0.75rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
  white-space: nowrap;
}

.btn-outline-small {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 0.75rem;
  padding: 0.4rem 0.75rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
  white-space: nowrap;
}

/* Scrollable List */
.scrollable-list {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  height: 160px;
  overflow-y: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

.checkbox-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
}

.item-label {
  font-size: 0.85rem;
  color: #fff;
}

.scroll-track {
  position: absolute;
  right: 2px;
  top: 2px;
  bottom: 2px;
  width: 6px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.scroll-thumb {
  height: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  margin-top: 10px;
}

/* Feature Box */
.feature-box {
  background-color: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
}

.checkbox-wrapper {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  cursor: pointer;
}

.checkbox-wrapper-simple {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  cursor: pointer;
}

.custom-checkbox {
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  background-color: transparent;
  margin-top: 0.15rem;
  cursor: pointer;
  position: relative;
}

.custom-checkbox.dark-bg {
  background-color: #121212;
}

.custom-checkbox:checked {
  background-color: #fff;
  border-color: #fff;
}

.custom-checkbox:checked::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 1px;
  width: 4px;
  height: 8px;
  border: solid #000;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.checkbox-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: #d1d5db;
}

.text-white { color: #fff !important; }

.checkbox-desc {
  font-size: 0.75rem;
  color: #888;
  line-height: 1.4;
}

/* Dashed Box */
.dashed-box {
  border: 1px dashed rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 1rem;
  font-size: 0.8rem;
  color: #888;
}

/* Calc Summary */
.calc-summary {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.calc-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #888;
}

.grand-total {
  color: #fff;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
}

.font-bold {
  font-weight: 700;
}

.options-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.mt-3 { margin-top: 0.75rem; }

/* Action Buttons Bottom */
.action-buttons-bottom {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
}

.btn-primary {
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-dark {
  background-color: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 6px;
  padding: 0.6rem 1.25rem;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.mr-1 { margin-right: 0.25rem; }

/* Right Column */
.list-header-box {
  border: 1px solid rgba(255, 255, 255, 0.05);
  background-color: #121212;
  border-radius: 8px;
  padding: 1.25rem;
}

.list-header-box .column-title {
  margin-bottom: 0.5rem;
}

.list-desc {
  font-size: 0.75rem;
  color: #888;
  margin: 0;
  line-height: 1.4;
}

.list-container {
  border: 1px solid rgba(255, 255, 255, 0.05);
  background-color: transparent;
  border-radius: 8px;
  padding: 1.25rem;
}

.list-empty {
  font-size: 0.8rem;
  color: #888;
}

/* Light Theme Adjustments */
:root[data-theme="light"] .page-title,
:root[data-theme="light"] .info-title,
:root[data-theme="light"] .section-header-flex h3,
:root[data-theme="light"] .item-label,
:root[data-theme="light"] .form-group label,
:root[data-theme="light"] .checkbox-title,
:root[data-theme="light"] .grand-total,
:root[data-theme="light"] .text-white {
  color: #111827 !important;
}

:root[data-theme="light"] .form-control {
  background-color: #ffffff;
  border-color: #d1d5db;
  color: #111827;
}

:root[data-theme="light"] .border-section,
:root[data-theme="light"] .list-header-box {
  background-color: #ffffff;
  border-color: #e5e7eb;
}

:root[data-theme="light"] .info-box,
:root[data-theme="light"] .scrollable-list,
:root[data-theme="light"] .feature-box,
:root[data-theme="light"] .btn-dark,
:root[data-theme="light"] .list-container {
  background-color: #f9fafb;
  border-color: #e5e7eb;
}

:root[data-theme="light"] .btn-unlock,
:root[data-theme="light"] .btn-outline-small {
  border-color: #d1d5db;
  color: #4b5563;
}

:root[data-theme="light"] .btn-primary {
  background-color: #111827;
  color: #ffffff;
}

:root[data-theme="light"] .custom-checkbox {
  border-color: #d1d5db;
}

:root[data-theme="light"] .custom-checkbox.dark-bg {
  background-color: #ffffff;
}

:root[data-theme="light"] .custom-checkbox:checked {
  background-color: #111827;
  border-color: #111827;
}

:root[data-theme="light"] .custom-checkbox:checked::after {
  border-color: #ffffff;
}

:root[data-theme="light"] .dashed-box {
  border-color: #d1d5db;
}

:root[data-theme="light"] .scroll-track {
  background-color: #e5e7eb;
}

:root[data-theme="light"] .scroll-thumb {
  background-color: #d1d5db;
}

:root[data-theme="light"] .checkbox-item {
  border-bottom-color: #e5e7eb;
}
</style>
