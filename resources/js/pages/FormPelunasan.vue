<template>
  <DashboardLayout>
    <div class="form-pelunasan-page">
      <!-- Page Header -->
      <div class="page-header">
        <h1 class="page-title">Form Pelunasan</h1>
        <p class="page-subtitle">Atur tampilan form pelunasan publik dan preview halaman yang akan dibuka klien.</p>
      </div>

      <!-- Warning Alert -->
      <div class="alert-warning">
        <div class="alert-content">
          <p class="alert-desc">Belum ada booking dengan tracking link untuk dipakai sebagai preview. Buat satu booking dulu, lalu buka halaman ini lagi.</p>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="main-content">
        
        <!-- Left Column: Settings -->
        <div class="settings-column">

          <!-- Section: Kustomisasi Tampilan -->
          <div class="settings-section">
            <div class="section-header">
              <Palette :size="16" />
              <h3>Kustomisasi Tampilan</h3>
            </div>
            
            <div class="form-group">
              <label>Warna Brand</label>
              <div class="color-picker-wrap">
                <div class="color-input">
                  <div class="color-preview" style="background-color: #10b981;"></div>
                  <span>#10b981</span>
                </div>
                <div class="color-swatch bg-green"></div>
              </div>
            </div>
            
            <div class="form-group">
              <label>Teks Sapaan</label>
              <textarea class="form-control textarea" rows="3">Silakan lanjutkan pelunasan booking Anda.</textarea>
              <p class="input-hint">Teks ini tampil di bagian atas form pelunasan. Tekan Enter untuk baris baru.</p>
            </div>
            
            <div class="form-group">
              <label>
                <Globe :size="14" class="inline-icon" /> 
                Bahasa Form
              </label>
              <div class="select-wrapper">
                <div class="select-prefix">
                  <span class="flag-icon">ID</span>
                </div>
                <select class="form-control with-prefix">
                  <option>Bahasa Indonesia</option>
                </select>
                <ChevronDown :size="14" class="select-icon" />
              </div>
            </div>
          </div>

          <!-- Section: Metode Pembayaran -->
          <div class="settings-section">
            <div class="section-header">
              <CreditCard :size="16" />
              <h3>Metode Pembayaran</h3>
            </div>
            <p class="section-desc">Sumber rekening bank dan QRIS tetap memakai data yang sudah diatur di halaman Form Booking.</p>
            
            <div class="method-options">
              <!-- Transfer Bank (Active) -->
              <div class="method-card active">
                <div class="method-header">
                  <div class="method-info">
                    <div class="method-icon-wrap"><CreditCard :size="18" /></div>
                    <div>
                      <h4 class="method-title">Transfer Bank</h4>
                      <p class="method-subtitle">Belum ada rekening aktif</p>
                    </div>
                  </div>
                  <div class="radio-btn active"></div>
                </div>
              </div>

              <!-- QRIS (Inactive) -->
              <div class="method-card">
                <div class="method-header">
                  <div class="method-info">
                    <div class="method-icon-wrap"><QrCode :size="18" /></div>
                    <div>
                      <h4 class="method-title">QRIS</h4>
                      <p class="method-subtitle">QRIS belum tersedia</p>
                    </div>
                  </div>
                  <div class="radio-btn"></div>
                </div>
              </div>

              <!-- Cash (Inactive) -->
              <div class="method-card">
                <div class="method-header">
                  <div class="method-info">
                    <div class="method-icon-wrap"><Banknote :size="18" /></div>
                    <div>
                      <h4 class="method-title">Cash</h4>
                      <p class="method-subtitle">Pelunasan tunai diverifikasi admin</p>
                    </div>
                  </div>
                  <div class="radio-btn"></div>
                </div>
              </div>

              <!-- Online Payment (Inactive) -->
              <div class="method-card">
                <div class="method-header">
                  <div class="method-info">
                    <div class="method-icon-wrap"><Globe :size="18" /></div>
                    <div>
                      <h4 class="method-title">Online Payment</h4>
                      <p class="method-subtitle">Pilih provider di bawah</p>
                    </div>
                  </div>
                  <div class="radio-btn"></div>
                </div>
              </div>
            </div>
            
            <p class="input-hint mt-4">
              Butuh edit rekening bank atau QRIS? Buka halaman <router-link to="/form-booking" class="text-link">Form Booking</router-link>.
            </p>
          </div>
          
          <!-- Action Buttons -->
          <div class="action-buttons-bottom">
            <button class="btn-primary">Simpan Pengaturan</button>
            <button class="btn-text">
              <RefreshCcw :size="14" class="mr-1" /> Reset Default
            </button>
          </div>
          
        </div>
        
        <!-- Right Column: Preview -->
        <div class="preview-column">
          <div class="preview-header">
            <h3>Preview</h3>
            <button class="icon-btn"><RefreshCw :size="14" /></button>
          </div>
          
          <div class="preview-container">
            <div class="preview-empty">
              <p>Preview akan muncul setelah ada booking yang punya tracking link.</p>
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
  Palette, Globe, ChevronDown, CreditCard, 
  QrCode, Banknote, RefreshCcw, RefreshCw
} from 'lucide-vue-next';
</script>

<style scoped>
.form-pelunasan-page {
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

/* Alert Warning */
.alert-warning {
  background-color: rgba(253, 230, 138, 0.1);
  border: 1px solid rgba(253, 230, 138, 0.3);
  border-radius: 8px;
  padding: 1rem 1.25rem;
  color: #fcd34d;
}

.alert-desc {
  font-size: 0.85rem;
  margin: 0;
  line-height: 1.4;
}

/* Main Content Area */
.main-content {
  display: flex;
  gap: 2rem;
  position: relative;
}

.settings-column {
  flex: 1.2;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.preview-column {
  flex: 1;
  min-width: 320px;
  position: sticky;
  top: 2rem;
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
}

@media (max-width: 992px) {
  .main-content {
    flex-direction: column;
  }
  .preview-column {
    position: static;
    height: 400px;
  }
}

/* Settings Sections */
.settings-section {
  background-color: #121212;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.section-header h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.section-desc {
  font-size: 0.8rem;
  color: #888;
  margin: -1rem 0 1.5rem 0;
  line-height: 1.4;
}

/* Form Controls */
.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #d1d5db;
  margin-bottom: 0.75rem;
}

.inline-icon {
  color: #a0a0a0;
}

.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.select-prefix {
  position: absolute;
  left: 1rem;
  display: flex;
  align-items: center;
  z-index: 1;
}

.flag-icon {
  font-size: 0.7rem;
  font-weight: 700;
  background-color: #fff;
  color: #000;
  padding: 0.1rem 0.2rem;
  border-radius: 2px;
}

.form-control {
  width: 100%;
  background-color: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 0.6rem 1rem;
  color: #fff;
  font-size: 0.85rem;
  font-family: inherit;
}

.form-control.with-prefix {
  padding-left: 2.5rem;
}

.form-control:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.3);
}

select.form-control {
  appearance: none;
  cursor: pointer;
  padding-right: 2.5rem;
}

select.form-control option {
  background-color: #1a1a1a;
}

.textarea {
  resize: vertical;
  min-height: 80px;
}

.select-icon {
  position: absolute;
  right: 1rem;
  pointer-events: none;
  color: #888;
}

.input-hint {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0.5rem 0 0 0;
  line-height: 1.4;
}

.text-link {
  color: #a0a0a0;
  text-decoration: underline;
}

.text-link:hover {
  color: #fff;
}

/* Tampilan */
.color-picker-wrap {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.color-input {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 0.5rem 1rem;
  min-width: 150px;
}

.color-preview {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.color-input span {
  font-size: 0.85rem;
  color: #fff;
}

.color-swatch {
  width: 60px;
  height: 32px;
  border-radius: 6px;
}

.bg-green { background-color: #10b981; }

/* Method Options */
.method-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.method-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.method-card.active {
  border-color: rgba(255, 255, 255, 0.3);
}

.method-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1rem;
  background-color: transparent;
  cursor: pointer;
}

.method-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.method-icon-wrap {
  width: 36px;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.method-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 0.2rem 0;
}

.method-subtitle {
  font-size: 0.75rem;
  color: #888;
  margin: 0;
}

.radio-btn {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  position: relative;
}

.radio-btn.active {
  border-color: #fff;
}

.radio-btn.active::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #fff;
}

.mt-4 { margin-top: 1.5rem; }

/* Action Buttons Bottom */
.action-buttons-bottom {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding-top: 0.5rem;
}

.btn-primary {
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-text {
  background: transparent;
  border: none;
  color: #888;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.btn-text:hover {
  color: #fff;
}

.mr-1 { margin-right: 0.25rem; }

/* Preview Column */
.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.preview-header h3 {
  font-size: 0.9rem;
  font-weight: 600;
  color: #888;
  margin: 0;
}

.icon-btn {
  background: transparent;
  border: none;
  color: #888;
  cursor: pointer;
}

.preview-container {
  flex: 1;
  background-color: transparent;
  border: 1px dashed rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.preview-empty {
  text-align: center;
}

.preview-empty p {
  font-size: 0.85rem;
  color: #888;
  margin: 0;
  max-width: 300px;
  line-height: 1.5;
}

/* Light Theme Adjustments */
:root[data-theme="light"] .page-title,
:root[data-theme="light"] .section-header h3,
:root[data-theme="light"] .form-group label,
:root[data-theme="light"] .method-title {
  color: #111827;
}

:root[data-theme="light"] .settings-section {
  background-color: #ffffff;
  border-color: #e5e7eb;
}

:root[data-theme="light"] .color-input,
:root[data-theme="light"] .form-control,
:root[data-theme="light"] select.form-control option {
  background-color: #f9fafb;
  border-color: #e5e7eb;
  color: #111827;
}

:root[data-theme="light"] .method-card {
  border-color: #e5e7eb;
}

:root[data-theme="light"] .method-card.active {
  border-color: #111827;
}

:root[data-theme="light"] .radio-btn.active {
  border-color: #111827;
}
:root[data-theme="light"] .radio-btn.active::after {
  background-color: #111827;
}

:root[data-theme="light"] .btn-primary {
  background-color: #111827;
  color: #ffffff;
}

:root[data-theme="light"] .preview-container {
  border-color: #d1d5db;
}

:root[data-theme="light"] .text-link {
  color: #4b5563;
}
:root[data-theme="light"] .text-link:hover {
  color: #111827;
}

:root[data-theme="light"] .alert-warning {
  background-color: #fef3c7;
  border-color: #fde68a;
  color: #b45309;
}
</style>
