<template>
  <div class="public-booking-page">
    <div v-if="currentStep < 5" class="booking-container">
      <div v-if="vendorLogo" class="mockup-avatar" style="background: transparent;">
        <img :src="vendorLogo" alt="Vendor Logo" style="width: 100%; height: 100%; object-fit: contain; border-radius: 50%;" />
      </div>
      <div v-else class="mockup-avatar">
        {{ vendorAlias ? vendorAlias.charAt(0).toUpperCase() : 'F' }}
      </div>
      <h3 class="mockup-vendor-name">{{ vendorName || vendorAlias }}</h3>
      <p class="mockup-subtitle">{{ displayGreetingText }}</p>
      
      <div class="mockup-form-card">
        <!-- Steps List -->
        <div class="mockup-steps-list">
          <div class="mockup-step" :class="{ active: currentStep >= 1 }" :style="currentStep > 1 ? { backgroundColor: '#f0fdf4', borderColor: '#22c55e' } : (currentStep === 1 ? { backgroundColor: brandColor + '20', borderColor: brandColor } : {})">
            <span class="step-num" :style="currentStep > 1 ? { backgroundColor: '#22c55e', color: '#fff' } : (currentStep === 1 ? { backgroundColor: brandColor, color: '#fff' } : {})">1</span>
            <span class="step-text" :style="currentStep > 1 ? { color: '#166534', fontWeight: 600 } : (currentStep === 1 ? { color: '#000', fontWeight: 600 } : {})">{{ langStrings.clientInfo }}</span>
          </div>
          <div class="mockup-step" :class="{ active: currentStep >= 2 }" :style="currentStep > 2 ? { backgroundColor: '#f0fdf4', borderColor: '#22c55e' } : (currentStep === 2 ? { backgroundColor: brandColor + '20', borderColor: brandColor } : {})">
            <span class="step-num" :style="currentStep > 2 ? { backgroundColor: '#22c55e', color: '#fff' } : (currentStep === 2 ? { backgroundColor: brandColor, color: '#fff' } : {})">2</span>
            <span class="step-text" :style="currentStep > 2 ? { color: '#166534', fontWeight: 600 } : (currentStep === 2 ? { color: '#000', fontWeight: 600 } : {})">{{ langStrings.packageAddon }}</span>
          </div>
          <div class="mockup-step" :class="{ active: currentStep >= 3 }" :style="currentStep > 3 ? { backgroundColor: '#f0fdf4', borderColor: '#22c55e' } : (currentStep === 3 ? { backgroundColor: brandColor + '20', borderColor: brandColor } : {})">
            <span class="step-num" :style="currentStep > 3 ? { backgroundColor: '#22c55e', color: '#fff' } : (currentStep === 3 ? { backgroundColor: brandColor, color: '#fff' } : {})">3</span>
            <span class="step-text" :style="currentStep > 3 ? { color: '#166534', fontWeight: 600 } : (currentStep === 3 ? { color: '#000', fontWeight: 600 } : {})">{{ langStrings.summary }}</span>
          </div>
          <div class="mockup-step" :class="{ active: currentStep >= 4 }" :style="currentStep > 4 ? { backgroundColor: '#f0fdf4', borderColor: '#22c55e' } : (currentStep === 4 ? { backgroundColor: brandColor + '20', borderColor: brandColor } : {})">
            <span class="step-num" :style="currentStep > 4 ? { backgroundColor: '#22c55e', color: '#fff' } : (currentStep === 4 ? { backgroundColor: brandColor, color: '#fff' } : {})">4</span>
            <span class="step-text" :style="currentStep > 4 ? { color: '#166534', fontWeight: 600 } : (currentStep === 4 ? { color: '#000', fontWeight: 600 } : {})">{{ langStrings.paymentConfirmation }}</span>
          </div>
        </div>

        <!-- STEP 1: Informasi Klien -->
        <div v-show="currentStep === 1">
          <div class="mockup-section">
            <h4 class="mockup-section-title" :style="{ color: brandColor }">{{ langStrings.clientInfo }}</h4>
            
            <div class="mockup-field">
              <label><User :size="16" /> Nama Lengkap <span class="req" :style="{ color: brandColor }">*</span></label>
              <input type="text" id="field-namaLengkap" v-model="formData.namaLengkap" :class="['mockup-input', {'has-error': errors.namaLengkap}]" placeholder="Nama lengkap Anda" @input="errors.namaLengkap = null" />
              <span v-if="errors.namaLengkap" class="error-msg" style="display:block; margin-top:4px; font-size:12px; color:#ef4444;">{{ errors.namaLengkap === true ? 'Bidang ini wajib diisi' : errors.namaLengkap }}</span>
            </div>

            <div class="mockup-field">
              <label><Phone :size="16" /> Nomor WhatsApp <span class="req" :style="{ color: brandColor }">*</span></label>
              <div class="mockup-phone-input">
                <select class="mockup-select phone-code">
                  <option>ID +62</option>
                </select>
                <input type="number" id="field-noWhatsapp" v-model="formData.noWhatsapp" :class="['mockup-input', {'has-error': errors.noWhatsapp}]" placeholder="8123456789" @input="errors.noWhatsapp = null" />
              </div>
              <span v-if="errors.noWhatsapp" class="error-msg" style="display:block; margin-top:4px; font-size:12px; color:#ef4444;">{{ errors.noWhatsapp === true ? 'Bidang ini wajib diisi' : errors.noWhatsapp }}</span>
            </div>

            <div class="mockup-field">
              <label><Instagram :size="16" /> Instagram</label>
              <div class="mockup-phone-input">
                <div style="padding: 0 16px; background: #f9fafb; color: #6b7280; border: 1px solid #e5e7eb; border-right: none; border-radius: 8px 0 0 8px; display: flex; align-items: center; justify-content: center; width: auto; font-weight: 600;">@</div>
                <input type="text" v-model="formData.instagram" class="mockup-input" placeholder="username" style="border-top-left-radius: 0; border-bottom-left-radius: 0;" />
              </div>
            </div>
          </div>

          <!-- Detail Sesi/Acara Section -->
          <div class="mockup-section">
            <h4 class="mockup-section-title" :style="{ color: brandColor }">{{ langStrings.sessionDetails }}</h4>
            
            <div class="mockup-field">
              <label><Tag :size="16" /> Tipe Acara <span class="req" :style="{ color: brandColor }">*</span></label>
              <select id="field-tipeAcara" class="mockup-select" :class="{'has-error': errors.tipeAcara}" v-model="mockupTipeAcara">
                <option value="">Pilih tipe...</option>
                <option value="Umum">Umum</option>
                <option value="Wedding">Wedding</option>
                <option value="Akad">Akad</option>
                <option value="Resepsi">Resepsi</option>
                <option value="Lamaran">Lamaran</option>
                <option value="Prewedding">Prewedding</option>
                <option value="Wisuda">Wisuda</option>
                <option value="Maternity">Maternity</option>
                <option value="Newborn">Newborn</option>
                <option value="Family">Family</option>
                <option value="Komersil">Komersil</option>
                <option value="Custom/Lainnya">Custom/Lainnya</option>
              </select>
              <span v-if="errors.tipeAcara" class="error-msg" style="display:block; margin-top:4px; font-size:12px; color:#ef4444;">{{ errors.tipeAcara === true ? 'Bidang ini wajib diisi' : errors.tipeAcara }}</span>
            </div>

            <template v-if="mockupTipeAcara">
              <div class="mockup-field">
                <label><Calendar :size="16" /> Jadwal Sesi/Acara <span class="req" :style="{ color: brandColor }">*</span></label>
                <div class="mockup-input-icon">
                  <input type="date" id="field-jadwal" v-model="formData.jadwal" :class="['mockup-input', {'has-error': errors.jadwal}]" @input="errors.jadwal = null" />
                </div>
                <span v-if="errors.jadwal" class="error-msg" style="display:block; margin-top:4px; font-size:12px; color:#ef4444;">{{ errors.jadwal === true ? 'Bidang ini wajib diisi' : errors.jadwal }}</span>
              </div>

              <div class="mockup-field">
                <label><Clock :size="16" /> Jam <span class="req" :style="{ color: brandColor }">*</span></label>
                <div class="mockup-input-icon">
                  <input type="time" id="field-jam" v-model="formData.jam" :class="['mockup-input', {'has-error': errors.jam}]" @input="errors.jam = null" />
                </div>
                <span v-if="errors.jam" class="error-msg" style="display:block; margin-top:4px; font-size:12px; color:#ef4444;">{{ errors.jam === true ? 'Bidang ini wajib diisi' : errors.jam }}</span>
              </div>

              <div class="mockup-field">
                <label><MapPin :size="16" /> Lokasi <span class="req" :style="{ color: brandColor }">*</span></label>
                <div class="mockup-location-group">
                  <div class="mockup-input-icon" style="flex: 1;">
                    <input type="text" id="field-lokasi" v-model="formData.lokasi" :class="['mockup-input', {'has-error': errors.lokasi}]" placeholder="Cari lokasi acara..." @input="errors.lokasi = null" />
                  </div>
                  <button class="mockup-icon-btn" title="Pilih Lokasi di Peta" @click="showMapModal = true">
                    <MapPin :size="18" :style="{ color: brandColor }" />
                  </button>
                </div>
                <span v-if="errors.lokasi" class="error-msg" style="display:block; margin-top:4px; font-size:12px; color:#ef4444;">{{ errors.lokasi === true ? 'Bidang ini wajib diisi' : errors.lokasi }}</span>
              </div>
              
              <div class="mockup-field">
                <label>Detail Lokasi</label>
                <textarea v-model="formData.detailLokasi" class="mockup-textarea" placeholder="Contoh: Gedung Utama, Lt. 3, Ruang Ballroom A"></textarea>
              </div>
            </template>

            <template v-if="['Wedding', 'Akad', 'Resepsi', 'Lamaran', 'Prewedding'].includes(mockupTipeAcara)">
              <div class="mockup-field">
                <label><User :size="16" /> Nama Pasangan <span class="req" :style="{ color: brandColor }">*</span></label>
                <input type="text" id="field-namaPasangan" v-model="formData.namaPasangan" :class="['mockup-input', {'has-error': errors.namaPasangan}]" placeholder="Nama Pasangan" @input="errors.namaPasangan = null" />
                <span v-if="errors.namaPasangan" class="error-msg" style="display:block; margin-top:4px; font-size:12px; color:#ef4444;">{{ errors.namaPasangan === true ? 'Bidang ini wajib diisi' : errors.namaPasangan }}</span>
              </div>
              <div class="mockup-field">
                <label><Instagram :size="16" /> Instagram Pasangan</label>
                <div class="mockup-phone-input">
                  <div style="padding: 0 16px; background: #f9fafb; color: #6b7280; border: 1px solid #e5e7eb; border-right: none; border-radius: 8px 0 0 8px; display: flex; align-items: center; justify-content: center; width: auto; font-weight: 600;">@</div>
                  <input type="text" v-model="formData.instagramPasangan" class="mockup-input" placeholder="username pasangan" style="border-top-left-radius: 0; border-bottom-left-radius: 0;" />
                </div>
              </div>
            </template>

            <template v-if="['Wedding', 'Akad', 'Resepsi', 'Lamaran'].includes(mockupTipeAcara)">
              <div class="mockup-field">
                <label><User :size="16" /> Estimasi Tamu</label>
                <input type="number" v-model="formData.estimasiTamu" class="mockup-input" placeholder="Estimasi Tamu" />
              </div>
            </template>

            <div class="mockup-field">
              <label>Catatan</label>
              <textarea v-model="formData.catatan" class="mockup-textarea" placeholder="Catatan tambahan (opsional)..."></textarea>
            </div>
          </div>
          
          <div v-if="formErrorMsg" class="form-error-alert" style="color: #ef4444; background: #fee2e2; border: 1px solid #fca5a5; padding: 1rem; border-radius: 8px; margin: 1rem 1.5rem 0; font-size: 0.9rem;">
            {{ formErrorMsg }}
          </div>
          
          <div class="mockup-footer">
            <button class="mockup-btn-next" :style="{ backgroundColor: brandColor, borderColor: brandColor, width: '100%' }" @click="validateStep1">{{ langStrings.btnNext }}</button>
          </div>
        </div>

        <!-- STEP 2: Pilih Paket & Add-On -->
        <div v-show="currentStep === 2">
          
          <div class="mockup-section" id="step-2-packages">
            <div class="package-selection-container">
              <label class="mockup-field-label">Paket Utama <span class="req" style="color: #ef4444;">*</span></label>
              <div class="selection-trigger" @click="showPackageModal = true" :class="{ 'has-error': errors.selectedPackages }">
                <div class="selection-text">
                   <span v-if="formData.selectedPackages.length === 0">Pilih Paket Utama</span>
                   <span v-else>{{ formData.selectedPackages.length }} paket dipilih</span>
                </div>
                <div class="selection-action">Buka Daftar</div>
              </div>
              <small class="selection-hint">Mode paket: bisa pilih lebih dari satu.</small>
              <span v-if="errors.selectedPackages" class="error-msg mt-2">Pilih salah satu paket utama.</span>
            </div>

            <div class="selected-items-list" v-if="selectedPackagesDetails.length > 0">
              <div class="selected-item-card" v-for="pkg in selectedPackagesDetails" :key="pkg.id">
                <div class="item-card-left">
                   <div class="item-title">{{ pkg.nama_layanan }} <span v-if="pkg.qty > 1">x{{ pkg.qty }}</span></div>
                   <div class="item-desc">{{ pkg.deskripsi }}</div>
                </div>
                <div class="item-card-right">
                   <div class="item-price">Rp {{ formatNumber(parsePrice(pkg.harga) * pkg.qty) }}</div>
                   <div class="item-original-price" v-if="pkg.harga_coret" style="text-decoration: line-through; font-size: 0.8rem; color: #9ca3af; text-align: right;">Rp {{ formatNumber(pkg.harga_coret) }}</div>
                   <div class="item-qty-control mt-2">
                     <button @click="updatePackageQty(pkg.id, -1)" class="qty-btn">-</button>
                     <span class="qty-text">{{ pkg.qty }}</span>
                     <button @click="updatePackageQty(pkg.id, 1)" class="qty-btn">+</button>
                   </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mockup-section" id="step-2-addons" v-if="availableAddons.length > 0">
            <div class="package-selection-container">
              <label class="mockup-field-label">Add-on (Opsional)</label>
              <div class="selection-trigger" @click="showAddonModal = true">
                <div class="selection-text">
                   <span v-if="formData.selectedAddons.length === 0">Pilih Add-on</span>
                   <span v-else>{{ formData.selectedAddons.length }} add-on dipilih</span>
                </div>
                <div class="selection-action">Buka Daftar</div>
              </div>
              <small class="selection-hint">Mode add-on: bisa pilih lebih dari satu.</small>
            </div>

            <div class="selected-items-list" v-if="selectedAddonsDetails.length > 0">
              <div class="selected-item-card" v-for="addon in selectedAddonsDetails" :key="addon.id">
                <div class="item-card-left">
                   <div class="item-title">{{ addon.nama_layanan }} <span v-if="addon.qty > 1">x{{ addon.qty }}</span></div>
                   <div class="item-desc">{{ addon.deskripsi }}</div>
                </div>
                <div class="item-card-right">
                   <div class="item-price">Rp {{ formatNumber(parsePrice(addon.harga) * addon.qty) }}</div>
                   <div class="item-original-price" v-if="addon.harga_coret" style="text-decoration: line-through; font-size: 0.8rem; color: #9ca3af; text-align: right;">Rp {{ formatNumber(addon.harga_coret) }}</div>
                   <div class="item-qty-control mt-2">
                     <button @click="updateAddonQty(addon.id, -1)" class="qty-btn">-</button>
                     <span class="qty-text">{{ addon.qty }}</span>
                     <button @click="updateAddonQty(addon.id, 1)" class="qty-btn">+</button>
                   </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="formErrorMsg" class="form-error-alert" style="color: #ef4444; background: #fee2e2; border: 1px solid #fca5a5; padding: 1rem; border-radius: 8px; margin: 1rem 1.5rem 0; font-size: 0.9rem;">
            {{ formErrorMsg }}
          </div>

          <div class="mockup-footer" style="justify-content: space-between;">
            <button class="mockup-btn-back" @click="currentStep = 1">Kembali</button>
            <button class="mockup-btn-next" :style="{ backgroundColor: brandColor, borderColor: brandColor }" @click="validateStep2">{{ langStrings.btnNext }}</button>
          </div>
        </div>

        <!-- STEP 3: Ringkasan -->
        <div v-show="currentStep === 3">
          <div class="mockup-section">
            <h4 class="mockup-section-title" :style="{ color: brandColor }">{{ langStrings.summary }}</h4>
            
            <div class="summary-box-modern">
              <div class="summary-section">
                <h5>Informasi Klien</h5>
                <div class="summary-row">
                  <div class="summary-label"><User :size="16" /> Nama Klien</div>
                  <div class="summary-value">{{ formData.namaLengkap || '-' }}</div>
                </div>
                <div class="summary-row" v-if="formData.namaPasangan">
                  <div class="summary-label"><User :size="16" /> Nama Pasangan</div>
                  <div class="summary-value">{{ formData.namaPasangan }}</div>
                </div>
                <div class="summary-row">
                  <div class="summary-label"><Phone :size="16" /> WhatsApp</div>
                  <div class="summary-value">{{ formData.noWhatsapp || '-' }}</div>
                </div>
                <div class="summary-row" v-if="formData.instagram">
                  <div class="summary-label"><Instagram :size="16" /> Instagram</div>
                  <div class="summary-value">@{{ formData.instagram }}</div>
                </div>
                <div class="summary-row">
                  <div class="summary-label"><Tag :size="16" /> Tipe Acara</div>
                  <div class="summary-value">{{ mockupTipeAcara || '-' }}</div>
                </div>
              </div>

              <div class="summary-section">
                <h5>Detail Sesi/Acara</h5>
                <div class="summary-row">
                  <div class="summary-label"><Calendar :size="16" /> Tanggal Sesi</div>
                  <div class="summary-value">{{ formatTanggal(formData.jadwal) }}</div>
                </div>
                <div class="summary-row">
                  <div class="summary-label"><Clock :size="16" /> Jam Sesi</div>
                  <div class="summary-value">{{ sessionTimeRange }}</div>
                </div>
                <div class="summary-row">
                  <div class="summary-label"><MapPin :size="16" /> Lokasi</div>
                  <div class="summary-value">{{ formData.lokasi || '-' }}</div>
                </div>
              </div>

              <div class="summary-section">
                <h5>Paket & Add-On</h5>
                <div class="summary-row" v-for="pkg in selectedPackagesDetails" :key="pkg.id">
                  <div class="summary-label"><Package :size="16" /> Paket Utama</div>
                  <div class="summary-value">{{ pkg.nama_layanan }} <span v-if="pkg.qty > 1">x{{ pkg.qty }}</span></div>
                </div>
                <div class="summary-row" v-for="addon in selectedAddonsDetails" :key="addon.id">
                  <div class="summary-label"><Plus :size="16" /> Add-on</div>
                  <div class="summary-value">{{ addon.nama_layanan }} <span v-if="addon.qty > 1">x{{ addon.qty }}</span></div>
                </div>
              </div>

              <div class="summary-total-section">
                <h5>Total Booking</h5>
                <div class="summary-row">
                  <div class="summary-label">Paket • {{ combinedPackageNames }}</div>
                  <div class="summary-value">Rp {{ formatNumber(totalPackagesPrice) }}</div>
                </div>
                <div class="summary-row">
                  <div class="summary-label">Subtotal Paket</div>
                  <div class="summary-value">Rp {{ formatNumber(totalPackagesPrice) }}</div>
                </div>
                <div class="summary-row">
                  <div class="summary-label">Subtotal Add-on</div>
                  <div class="summary-value">Rp {{ formatNumber(totalAddonsPrice) }}</div>
                </div>
                <div class="summary-row total mt-3 pt-3" style="border-top: 1px solid #e5e7eb;">
                  <div class="summary-label" style="font-weight: 700; color: #111827;">Total Booking</div>
                  <div class="summary-value" style="font-weight: 800; font-size: 1.15rem; color: #111827;">Rp {{ formatNumber(totalPrice) }}</div>
                </div>
                
                <div class="summary-row mt-2" v-if="dpAmount > 0">
                  <div class="summary-label" style="color: #059669;">Minimal DP ({{ dpLabel }})</div>
                  <div class="summary-value" style="color: #059669; font-weight: 700;">Rp {{ formatNumber(dpAmount) }}</div>
                </div>
                <div class="summary-row" v-if="dpAmount > 0">
                  <div class="summary-label" style="color: #dc2626;">Sisa Pembayaran</div>
                  <div class="summary-value" style="color: #dc2626; font-weight: 700;">Rp {{ formatNumber(totalPrice - dpAmount) }}</div>
                </div>
              </div>
              
              <p class="mt-4 text-center" style="font-size: 0.8rem; color: #9ca3af; text-align: center;">Cek ulang data di atas sebelum lanjut ke pembayaran dan konfirmasi.</p>
            </div>
          </div>

          <div class="mockup-footer" style="justify-content: space-between;">
            <button class="mockup-btn-back" @click="currentStep = 2">Kembali</button>
            <button class="mockup-btn-next" :style="{ backgroundColor: brandColor, borderColor: brandColor }" @click="currentStep = 4">{{ langStrings.btnNext }}</button>
          </div>
        </div>

        <!-- STEP 4: Pembayaran -->
        <div v-show="currentStep === 4">
          <div class="mockup-section">
            <h4 class="mockup-section-title" :style="{ color: brandColor }">Paket Pembayaran</h4>
            
            <div class="mockup-field">
              <label>DP (Minimal {{ activeDpSetting.type === 'percentage' ? activeDpSetting.percentageValue + '%' : 'Nominal' }}) <span class="req">*</span></label>
              <div class="input-with-prefix">
                <span class="input-prefix">Rp</span>
                <input type="text" class="mockup-input dp-input" :class="{ 'has-error': dpError }" :value="inputDpFormatted" @input="handleDpInput" />
              </div>
              <div class="field-hint mt-1" :class="{ 'text-error': dpError }" style="font-size: 0.85rem; color: #6b7280;">
                <span v-if="!dpError">Minimum: Rp {{ formatNumber(dpAmount) }}</span>
                <span v-else style="display: flex; align-items: center; gap: 4px; color: #ef4444;"><TriangleAlert :size="14" /> DP minimal {{ activeDpSetting.type === 'percentage' ? activeDpSetting.percentageValue + '%' : 'Nominal' }} dari harga paket (Rp {{ formatNumber(dpAmount) }}).</span>
              </div>
            </div>

            <h4 class="mockup-section-title mt-4" :style="{ color: brandColor }">Metode Pembayaran <span class="req">*</span></h4>
            
            <div class="payment-methods-horizontal">
              <div v-if="activePaymentMethods.transfer_bank" class="pay-method-card" :class="{ selected: formData.paymentMethod === 'transfer_bank' }" @click="formData.paymentMethod = 'transfer_bank'">
                <div class="pay-header" style="justify-content: flex-start; gap: 0.5rem;">
                  <CreditCard :size="20" /> 
                  <div style="flex:1; font-weight:600; text-align: left;">Transfer Bank</div>
                  <div class="pkg-radio"><div class="radio-inner" v-if="formData.paymentMethod === 'transfer_bank'" :style="{ backgroundColor: brandColor }"></div></div>
                </div>
                <p style="text-align: left; margin-left: 28px;">Pilih bank tujuan pembayaran</p>
              </div>
              
              <div v-if="activePaymentMethods.qris" class="pay-method-card" :class="{ selected: formData.paymentMethod === 'qris' }" @click="formData.paymentMethod = 'qris'">
                <div class="pay-header" style="justify-content: flex-start; gap: 0.5rem;">
                  <QrCode :size="20" />
                  <div style="flex:1; font-weight:600; text-align: left;">QRIS</div>
                  <div class="pkg-radio"><div class="radio-inner" v-if="formData.paymentMethod === 'qris'" :style="{ backgroundColor: brandColor }"></div></div>
                </div>
                <p style="text-align: left; margin-left: 28px;">Bayar dengan scan QRIS</p>
              </div>
              
              <div v-if="activePaymentMethods.cash" class="pay-method-card" :class="{ selected: formData.paymentMethod === 'cash' }" @click="formData.paymentMethod = 'cash'">
                <div class="pay-header" style="justify-content: flex-start; gap: 0.5rem;">
                  <Banknote :size="20" />
                  <div style="flex:1; font-weight:600; text-align: left;">Cash</div>
                  <div class="pkg-radio"><div class="radio-inner" v-if="formData.paymentMethod === 'cash'" :style="{ backgroundColor: brandColor }"></div></div>
                </div>
                <p style="text-align: left; margin-left: 28px;">Bayar tunai saat bertemu</p>
              </div>
            </div>
            
            <!-- Detail Rekening Bank -->
            <div v-if="formData.paymentMethod === 'transfer_bank'" class="mt-4">
              <h4 class="mockup-section-title" style="color: #6b7280; font-size: 0.95rem; border: none; margin-bottom: 0.5rem;">Pilih Bank <span class="req">*</span></h4>
              <div class="bank-list">
                <div v-for="(bank, index) in bankAccounts" :key="index" class="bank-item" :class="{ selected: selectedBankIndex === index }" @click="selectedBankIndex = index">
                  <div class="bank-header">
                    <strong>{{ bank.bank_name }}</strong>
                    <div class="pkg-radio"><div class="radio-inner" v-if="selectedBankIndex === index" :style="{ backgroundColor: brandColor }"></div></div>
                  </div>
                  <div class="bank-desc">Transfer via {{ bank.bank_name }}</div>
                </div>
              </div>
              
              <div v-if="selectedBankIndex !== null && bankAccounts[selectedBankIndex]" class="bank-detail-box mt-3">
                <div class="bank-detail-header">
                  <CreditCard :size="16"/> {{ bankAccounts[selectedBankIndex].bank_name }}
                </div>
                <div class="bank-detail-body">
                  <div class="acc-info">
                    <span class="acc-label">NOMOR REKENING</span>
                    <strong class="acc-number">{{ bankAccounts[selectedBankIndex].account_number }}</strong>
                    <span class="acc-name">a.n. {{ bankAccounts[selectedBankIndex].account_name }}</span>
                  </div>
                  <button class="btn-copy" @click="copyToClipboard(bankAccounts[selectedBankIndex].account_number)">
                    <Copy :size="16" /> Salin
                  </button>
                </div>
              </div>
            </div>

            <!-- Detail QRIS -->
            <div v-if="formData.paymentMethod === 'qris'" class="mt-4">
              <h4 class="mockup-section-title" style="color: #6b7280; font-size: 0.95rem; border: none; margin-bottom: 0.5rem;">QRIS</h4>
              <div class="qris-box">
                <img v-if="qrisImage" :src="qrisImage" alt="QRIS" class="qris-img" />
                <div v-else style="text-align: center; padding: 2rem; color: #9ca3af;">QRIS belum diatur oleh vendor.</div>
              </div>
            </div>

            <!-- Detail Cash -->
            <div v-if="formData.paymentMethod === 'cash'" class="mt-4">
              <div class="cash-box">
                Pembayaran cash tidak memerlukan upload bukti pembayaran.
              </div>
            </div>

            <div v-if="submitSuccess" class="alert-success-sim mt-4" style="background-color: #d1fae5; color: #065f46; border-color: #34d399;">
              <strong>Booking Berhasil Dibuat!</strong> Terima kasih, pesanan Anda telah tersimpan.
            </div>
            <div v-if="submitError" class="alert-success-sim mt-4" style="background-color: #fee2e2; color: #991b1b; border-color: #f87171;">
              <strong>Gagal:</strong> Terjadi kesalahan saat menyimpan booking.
            </div>
          </div>

          <div class="mockup-footer" style="justify-content: space-between;">
            <button class="mockup-btn-back" @click="currentStep = 3" :disabled="isSubmitting">Kembali</button>
            <button class="mockup-btn-next" :style="{ backgroundColor: brandColor, borderColor: brandColor }" @click="submitBooking" :disabled="isSubmitting || !formData.paymentMethod || dpError || submitSuccess">
              <span v-if="isSubmitting">Menyimpan...</span>
              <span v-else>Kirim Booking</span>
            </button>
          </div>
        </div>
      </div>
      
      <p class="mockup-powered-by">Powered by <strong>Client Desk</strong></p>
    </div>

    <!-- STEP 5: Success / Konfirmasi (Full Screen) -->
    <div v-if="currentStep === 5" style="width: 100%; max-width: 600px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh;">
      <div style="width: 80px; height: 80px; background-color: #d1fae5; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
        <Check :size="40" color="#059669" />
      </div>
      <h2 style="font-size: 2rem; font-weight: 800; color: #111827; margin-bottom: 0.5rem; text-align: center;">Booking Berhasil!</h2>
      <p style="color: #6b7280; font-size: 1rem; margin-bottom: 0.5rem; text-align: center;">Kode Booking Anda:</p>
      <h3 style="font-size: 2.5rem; font-weight: 800; color: #111827; margin-bottom: 2rem; letter-spacing: 0.05em; text-align: center;">{{ confirmedInvoice }}</h3>
      <p style="color: #6b7280; font-size: 1rem; margin-bottom: 2.5rem; max-width: 450px; text-align: center;">
        Silakan konfirmasi booking Anda ke admin melalui WhatsApp untuk proses lebih lanjut.
      </p>
      
      <a :href="whatsappLink" target="_blank" style="background-color: #25D366; color: white; border: none; padding: 1.25rem 2.5rem; font-size: 1.1rem; font-weight: 700; border-radius: 12px; text-decoration: none; display: flex; align-items: center; justify-content: center; width: auto; box-shadow: 0 4px 6px rgba(37, 211, 102, 0.2); transition: all 0.2s;">
        <Phone :size="20" style="margin-right: 0.75rem;" /> Konfirmasi via WhatsApp
      </a>
    </div>

    <!-- Package Modal -->
    <div class="pkg-modal-backdrop" v-if="showPackageModal" @click.self="showPackageModal = false">
      <div class="pkg-modal-content">
        <div class="pkg-modal-header">
          <div>
            <h3>Paket Utama</h3>
            <p>Pilih satu atau lebih paket utama sesuai kebutuhan.</p>
          </div>
          <button class="pkg-modal-close" @click="showPackageModal = false">&times;</button>
        </div>
        <div class="pkg-modal-search">
          <input type="text" placeholder="Cari paket..." v-model="packageSearch" class="mockup-input">
        </div>
        <div class="pkg-modal-body">
          <div 
            v-for="pkg in filteredPackages" 
            :key="pkg.id" 
            class="pkg-list-item"
            :class="{ selected: formData.selectedPackages.some(p => p.id === pkg.id) }"
            @click="togglePackageSelection(pkg.id)"
          >
            <div class="pkg-checkbox">
              <Check v-if="formData.selectedPackages.some(p => p.id === pkg.id)" :size="14" :color="brandColor" />
            </div>
            <div class="pkg-item-info">
              <h4>{{ pkg.nama_layanan }}</h4>
              <p>{{ pkg.deskripsi }}</p>
            </div>
            <div class="pkg-item-price">
              <div class="price-current">Rp {{ formatNumber(pkg.harga) }}</div>
              <div class="price-strike" v-if="pkg.harga_coret">Rp {{ formatNumber(pkg.harga_coret) }}</div>
            </div>
          </div>
          <div v-if="filteredPackages.length === 0" class="empty-packages">Tidak ada paket ditemukan.</div>
        </div>
        <div class="pkg-modal-footer">
          <button class="mockup-btn-next" :style="{ backgroundColor: brandColor, borderColor: brandColor, padding: '0.6rem 2rem' }" @click="showPackageModal = false">Selesai</button>
        </div>
      </div>
    </div>

    <!-- Addon Modal -->
    <div class="pkg-modal-backdrop" v-if="showAddonModal" @click.self="showAddonModal = false">
      <div class="pkg-modal-content">
        <div class="pkg-modal-header">
          <div>
            <h3>Add-on</h3>
            <p>Pilih add-on tambahan jika diperlukan.</p>
          </div>
          <button class="pkg-modal-close" @click="showAddonModal = false">&times;</button>
        </div>
        <div class="pkg-modal-search">
          <input type="text" placeholder="Cari add-on..." v-model="addonSearch" class="mockup-input">
        </div>
        <div class="pkg-modal-body">
          <div 
            v-for="addon in filteredAddons" 
            :key="addon.id" 
            class="pkg-list-item"
            :class="{ selected: formData.selectedAddons.some(a => a.id === addon.id) }"
            @click="toggleAddonSelection(addon.id)"
          >
            <div class="pkg-checkbox">
              <Check v-if="formData.selectedAddons.some(a => a.id === addon.id)" :size="14" :color="brandColor" />
            </div>
            <div class="pkg-item-info">
              <h4>{{ addon.nama_layanan }}</h4>
              <p>{{ addon.deskripsi }}</p>
            </div>
            <div class="pkg-item-price">
              <div class="price-current">Rp {{ formatNumber(addon.harga) }}</div>
              <div class="price-strike" v-if="addon.harga_coret">Rp {{ formatNumber(addon.harga_coret) }}</div>
            </div>
          </div>
          <div v-if="filteredAddons.length === 0" class="empty-packages">Tidak ada add-on ditemukan.</div>
        </div>
        <div class="pkg-modal-footer">
          <button class="mockup-btn-next" :style="{ backgroundColor: brandColor, borderColor: brandColor, padding: '0.6rem 2rem' }" @click="showAddonModal = false">Selesai</button>
        </div>
      </div>
    </div>

    <!-- Google Map Modal -->
    <GoogleMapModal 
      :show="showMapModal" 
      :initial-address="formData.lokasi"
      @close="showMapModal = false"
      @select="handleLocationSelect"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { 
  User, Phone, Instagram, Tag, Calendar, Clock, MapPin, Check, CreditCard, QrCode, Banknote, Package, Plus, TriangleAlert, Copy
} from 'lucide-vue-next';
import GoogleMapModal from '../components/GoogleMapModal.vue';

const route = useRoute();
const vendorAlias = ref(route.params.vendorAlias || 'Vendor');
const vendorName = ref('');
const vendorLogo = ref('');
const mockupTipeAcara = ref('');
const isLoading = ref(true);
const showMapModal = ref(false);

const currentStep = ref(1);

const brandColor = ref('#000000');
const customGreetingText = ref('');
const formLanguage = ref('ID');
const dpSettings = ref({});
const activePaymentMethods = ref({});

const services = ref([]);

const defaultGreetingText = computed(() => {
  return formLanguage.value === 'EN' 
    ? 'Please fill in the form below to make a booking.' 
    : 'Silakan isi formulir di bawah ini untuk booking.';
});

const displayGreetingText = computed(() => {
  return customGreetingText.value.trim() !== '' 
    ? customGreetingText.value 
    : defaultGreetingText.value;
});

const langStrings = computed(() => {
  return formLanguage.value === 'EN' ? {
    clientInfo: 'Client Info',
    packageAddon: 'Package & Add-On',
    summary: 'Summary',
    paymentConfirmation: 'Payment & Confirmation',
    sessionDetails: 'Session/Event Details',
    btnNext: 'Continue'
  } : {
    clientInfo: 'Informasi Klien',
    packageAddon: 'Pilih Paket & Add-On',
    summary: 'Ringkasan',
    paymentConfirmation: 'Pembayaran & Konfirmasi',
    sessionDetails: 'Detail Sesi/Acara',
    btnNext: 'Lanjut'
  };
});

const formData = ref({
  namaLengkap: '',
  noWhatsapp: '',
  instagram: '',
  jadwal: '',
  jam: '',
  lokasi: '',
  detailLokasi: '',
  namaPasangan: '',
  instagramPasangan: '',
  estimasiTamu: '',
  catatan: '',
  selectedPackages: [],
  selectedAddons: [],
  paymentMethod: ''
});

const errors = ref({});
const isSubmitting = ref(false);
const submitSuccess = ref(false);
const submitError = ref(false);
const confirmedInvoice = ref('');
const whatsappLink = ref('');

const bankAccounts = ref([]);
const qrisImage = ref('');
const inputDpAmount = ref(0);
const inputDpFormatted = ref('');
const selectedBankIndex = ref(null);
const dpError = ref(false);

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  alert('Disalin: ' + text);
};

const parseInputPrice = (val) => {
  if (!val) return 0;
  return parseInt(val.toString().replace(/[^0-9]/g, ''), 10) || 0;
};

const handleDpInput = (e) => {
  const val = parseInputPrice(e.target.value);
  inputDpAmount.value = val;
  inputDpFormatted.value = formatNumber(val);
  dpError.value = val < dpAmount.value;
};

const generateWhatsappMessage = (invoice, vendorPhone) => {
  const tgl = formatTanggal.value;
  const jam = sessionTimeRange.value;
  const pkgNames = combinedPackageNames.value || '-';
  const addonNames = selectedAddonsDetails.value.length > 0 ? selectedAddonsDetails.value.map(a => `${a.nama_layanan} (x${a.qty})`).join(', ') : '-';
  const dp = inputDpAmount.value;
  const total = totalPrice.value;
  const sisa = total - dp;
  let payMethodText = formData.value.paymentMethod;
  if (payMethodText === 'transfer_bank') payMethodText = 'Transfer Bank';
  if (payMethodText === 'qris') payMethodText = 'QRIS';
  if (payMethodText === 'cash') payMethodText = 'Cash';

  const text = `Halo ${vendorName.value}, saya ${formData.value.namaLengkap} sudah mengisi form booking.

Nomor WhatsApp: ${formData.value.noWhatsapp}
Kode Booking: ${invoice}
Paket: ${pkgNames}
Add-on: ${addonNames}
Total Add-on: Rp ${formatNumber(totalAddonsPrice.value)}
Jadwal: ${tgl}
Jam: ${jam}
Total: Rp ${formatNumber(total)}
DP: Rp ${formatNumber(dp)}
Sisa Pelunasan: Rp ${formatNumber(sisa)}
Metode pembayaran: ${payMethodText}
Sumber pembayaran: ${payMethodText}

Mohon konfirmasi booking saya. Terima kasih.`;

  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${vendorPhone}?text=${encodedText}`;
};

const submitBooking = async () => {
  if (!formData.value.paymentMethod || dpError.value) return;
  
  isSubmitting.value = true;
  submitError.value = false;
  submitSuccess.value = false;
  
  try {
    const payload = {
      ...formData.value,
      tipeAcara: mockupTipeAcara.value,
      jam: sessionTimeRange.value,
      totalPrice: totalPrice.value,
      dpAmount: inputDpAmount.value,
      selectedPackages: formData.value.selectedPackages
    };
    
    const res = await axios.post(`/api/public/vendor/${vendorAlias.value}/bookings`, payload);
    const invoice = res.data.booking.invoice;
    const vendorPhone = res.data.vendor_phone;
    
    confirmedInvoice.value = invoice;
    whatsappLink.value = generateWhatsappMessage(invoice, vendorPhone);
    
    submitSuccess.value = true;
    currentStep.value = 5; // Go to success step
  } catch (err) {
    console.error('Error submitting booking:', err);
    if (err.response && err.response.data) {
      console.error('Validation errors:', err.response.data);
      alert('Validation errors: ' + JSON.stringify(err.response.data.errors || err.response.data));
    }
    submitError.value = true;
  } finally {
    isSubmitting.value = false;
  }
};

const handleLocationSelect = (address) => {
  formData.value.lokasi = address;
};

// Services filtering
const parseTipeAcara = (ta) => {
  if (Array.isArray(ta)) return ta;
  if (typeof ta === 'string') {
    try { return JSON.parse(ta); } catch (e) { return []; }
  }
  return [];
};

const availablePaket = computed(() => {
  if (!mockupTipeAcara.value) return [];
  return services.value.filter(s => {
    const ta = parseTipeAcara(s.tipe_acara);
    return (s.jenis_layanan === 'paket' || s.jenis_layanan === 'utama') && 
           (ta.length === 0 || ta.some(t => t.toLowerCase() === mockupTipeAcara.value.toLowerCase()));
  });
});

const availableAddons = computed(() => {
  if (!mockupTipeAcara.value) return [];
  return services.value.filter(s => {
    const ta = parseTipeAcara(s.tipe_acara);
    return (s.jenis_layanan === 'addon') && 
           (ta.length === 0 || ta.some(t => t.toLowerCase() === mockupTipeAcara.value.toLowerCase()));
  });
});

const showPackageModal = ref(false);
const packageSearch = ref('');
const showAddonModal = ref(false);
const addonSearch = ref('');

const togglePackageSelection = (id) => {
  const index = formData.value.selectedPackages.findIndex(p => p.id === id);
  if (index > -1) {
    formData.value.selectedPackages.splice(index, 1);
  } else {
    formData.value.selectedPackages.push({ id, qty: 1 });
  }
};

const updatePackageQty = (id, delta) => {
  const pkg = formData.value.selectedPackages.find(p => p.id === id);
  if (pkg) {
    pkg.qty += delta;
    if (pkg.qty < 1) {
      formData.value.selectedPackages = formData.value.selectedPackages.filter(p => p.id !== id);
    }
  }
};

const toggleAddonSelection = (id) => {
  const index = formData.value.selectedAddons.findIndex(a => a.id === id);
  if (index > -1) {
    formData.value.selectedAddons.splice(index, 1);
  } else {
    formData.value.selectedAddons.push({ id, qty: 1 });
  }
};

const updateAddonQty = (id, delta) => {
  const addon = formData.value.selectedAddons.find(a => a.id === id);
  if (addon) {
    addon.qty += delta;
    if (addon.qty < 1) {
      formData.value.selectedAddons = formData.value.selectedAddons.filter(a => a.id !== id);
    }
  }
};

const filteredPackages = computed(() => {
  if (!packageSearch.value) return availablePaket.value;
  return availablePaket.value.filter(p => p.nama_layanan.toLowerCase().includes(packageSearch.value.toLowerCase()));
});

const filteredAddons = computed(() => {
  if (!addonSearch.value) return availableAddons.value;
  return availableAddons.value.filter(a => a.nama_layanan.toLowerCase().includes(addonSearch.value.toLowerCase()));
});

const formErrorMsg = ref('');

const validateStep1 = () => {
  errors.value = {};
  formErrorMsg.value = '';
  
  if (!formData.value.namaLengkap || !formData.value.namaLengkap.trim()) {
    errors.value.namaLengkap = 'Nama lengkap wajib diisi';
  }
  
  if (!formData.value.noWhatsapp || !formData.value.noWhatsapp.trim()) {
    errors.value.noWhatsapp = 'Nomor WhatsApp wajib diisi';
  } else if (!/^[\d\s\+\-]{8,20}$/.test(formData.value.noWhatsapp)) {
    errors.value.noWhatsapp = 'Format nomor WhatsApp tidak valid';
  }
  
  if (!mockupTipeAcara.value) {
    errors.value.tipeAcara = 'Tipe acara wajib dipilih';
  }
  
  if (mockupTipeAcara.value) {
    if (!formData.value.jadwal) errors.value.jadwal = 'Tanggal jadwal wajib dipilih';
    if (!formData.value.jam) errors.value.jam = 'Jam wajib dipilih';
    if (!formData.value.lokasi || !formData.value.lokasi.trim()) errors.value.lokasi = 'Lokasi wajib diisi';
  }
  
  if (['Wedding', 'Akad', 'Resepsi', 'Lamaran', 'Prewedding'].includes(mockupTipeAcara.value)) {
    if (!formData.value.namaPasangan || !formData.value.namaPasangan.trim()) errors.value.namaPasangan = 'Nama pasangan wajib diisi';
  }
  
  const firstErrorKey = Object.keys(errors.value)[0];
  if (firstErrorKey) {
    formErrorMsg.value = 'Mohon lengkapi semua field yang wajib.';
    const el = document.getElementById(`field-${firstErrorKey}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.focus();
    }
  } else {
    currentStep.value = 2;
  }
};

const validateStep2 = () => {
  errors.value = {};
  formErrorMsg.value = '';
  if (formData.value.selectedPackages.length === 0 && availablePaket.value.length > 0) {
    errors.value.selectedPackages = true;
    formErrorMsg.value = 'Mohon lengkapi semua field yang wajib.';
    const el = document.getElementById('step-2-packages');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    currentStep.value = 3;
  }
};

const formatNumber = (val) => {
  if (!val) return '0';
  const num = parseFloat(String(val).replace(/[^0-9]/g, ''));
  if (isNaN(num)) return '0';
  return new Intl.NumberFormat('id-ID').format(num);
};

const parsePrice = (val) => {
  if (!val) return 0;
  const num = parseFloat(String(val).replace(/[^0-9]/g, ''));
  return isNaN(num) ? 0 : num;
};

const selectedPackagesDetails = computed(() => {
  return formData.value.selectedPackages.map(sp => {
    const s = services.value.find(sv => sv.id === sp.id);
    return s ? { ...s, qty: sp.qty } : null;
  }).filter(Boolean);
});

const selectedAddonsDetails = computed(() => {
  return formData.value.selectedAddons.map(sa => {
    const s = services.value.find(sv => sv.id === sa.id);
    return s ? { ...s, qty: sa.qty } : null;
  }).filter(Boolean);
});

const totalPackagesPrice = computed(() => {
  let total = 0;
  selectedPackagesDetails.value.forEach(p => {
    total += parsePrice(p.harga) * p.qty;
  });
  return total;
});

const totalAddonsPrice = computed(() => {
  let total = 0;
  selectedAddonsDetails.value.forEach(a => {
    total += parsePrice(a.harga) * a.qty;
  });
  return total;
});

const totalPrice = computed(() => {
  return totalPackagesPrice.value + totalAddonsPrice.value;
});

const combinedPackageNames = computed(() => {
  return selectedPackagesDetails.value.map(p => p.nama_layanan).join(' + ');
});

const totalDurationMinutes = computed(() => {
  let minutes = 0;
  selectedPackagesDetails.value.forEach(pkg => {
    if (pkg.durasi_kuota) {
      const lower = pkg.durasi_kuota.toLowerCase();
      if (lower.includes('jam') && lower.includes('menit')) {
        const m = lower.match(/(\d+)\s*jam\s*(\d+)\s*menit/);
        if (m) minutes += (parseInt(m[1]) * 60 + parseInt(m[2])) * pkg.qty;
      } else if (lower.includes('jam')) {
        const m = lower.match(/(\d+)\s*jam/);
        if (m) minutes += parseInt(m[1]) * 60 * pkg.qty;
      } else if (lower.includes('menit')) {
        const m = lower.match(/(\d+)\s*menit/);
        if (m) minutes += parseInt(m[1]) * pkg.qty;
      }
    }
  });
  return minutes;
});

const sessionTimeRange = computed(() => {
  if (!formData.value.jam) return '-';
  const startJamStr = formData.value.jam; 
  if (!startJamStr.includes(':')) return startJamStr;

  const [h, m] = startJamStr.split(':').map(Number);
  const startTotalMinutes = h * 60 + m;
  
  const totalDuration = totalDurationMinutes.value;
  if (totalDuration === 0) return startJamStr.replace(':', '.'); 
  
  const endTotalMinutes = startTotalMinutes + totalDuration;
  const endH = Math.floor(endTotalMinutes / 60) % 24;
  const endM = endTotalMinutes % 60;
  
  const formatTime = (hour, min) => `${hour.toString().padStart(2, '0')}.${min.toString().padStart(2, '0')}`;
  
  return `${formatTime(h, m)} - ${formatTime(endH, endM)}`;
});

const formatTanggal = (dateStr) => {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

const activeDpSetting = computed(() => {
  if (mockupTipeAcara.value && dpSettings.value && dpSettings.value[mockupTipeAcara.value]) {
    return dpSettings.value[mockupTipeAcara.value];
  }
  return { type: 'percentage', percentageValue: 50, nominalValue: 0 }; // fallback
});

const dpLabel = computed(() => {
  if (activeDpSetting.value.type === 'percentage') {
    return `${activeDpSetting.value.percentageValue}%`;
  }
  return 'Nominal';
});

const dpAmount = computed(() => {
  if (activeDpSetting.value.type === 'percentage') {
    return (totalPrice.value * activeDpSetting.value.percentageValue) / 100;
  } else {
    return parsePrice(activeDpSetting.value.nominalValue);
  }
});


watch(dpAmount, (newVal) => {
  if (inputDpAmount.value < newVal) {
    inputDpAmount.value = newVal;
    inputDpFormatted.value = formatNumber(newVal);
    dpError.value = false;
  }
});

onMounted(async () => {
  document.title = `${vendorAlias.value} - Booking Form | Client Desk`;
  
  try {
    const [settingsRes, servicesRes] = await Promise.all([
      axios.get(`/api/public/vendor/${vendorAlias.value}/settings`),
      axios.get(`/api/public/vendor/${vendorAlias.value}/services`)
    ]);

    if (servicesRes.data) {
      services.value = servicesRes.data;
    }

    if (settingsRes.data) {
      vendorName.value = settingsRes.data.vendor_name || vendorAlias.value;
      vendorLogo.value = settingsRes.data.logo_url || '';
      
      if (settingsRes.data.form_booking_settings) {
        const fb = settingsRes.data.form_booking_settings;
        if (fb.brandColor) brandColor.value = fb.brandColor;
        if (fb.customGreetingText) customGreetingText.value = fb.customGreetingText;
        if (fb.formLanguage) formLanguage.value = fb.formLanguage;
        if (fb.dpSettings) dpSettings.value = fb.dpSettings;
        if (fb.activePaymentMethods) activePaymentMethods.value = fb.activePaymentMethods;
        if (fb.bankAccounts) bankAccounts.value = fb.bankAccounts;
        if (fb.qrisImagePreview) qrisImage.value = fb.qrisImagePreview;
      }
      document.title = `${vendorName.value} - Booking Form | Client Desk`;
    }
  } catch (error) {
    console.error('Error fetching public settings:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.public-booking-page {
  min-height: 100vh;
  background: radial-gradient(circle at center top, #f3f4f6, #e5e7eb);
  display: flex;
  justify-content: center;
  padding: 3rem 1rem;
  font-family: 'Inter', sans-serif;
}

.booking-container {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mockup-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #ffffff;
  color: #111827;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.mockup-vendor-name {
  font-size: 1.8rem;
  font-weight: 800;
  color: #111827;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.02em;
}

.mockup-subtitle {
  font-size: 1rem;
  color: #6b7280;
  margin: 0 0 2rem 0;
}

.mockup-form-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 2.5rem;
  width: 100%;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
}

.mockup-steps-list {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.mockup-step {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  border-radius: 24px;
  border: 1px solid #e5e7eb;
  color: #9ca3af;
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
}

.mockup-step.active {
  background-color: #f3f4f6;
  border-color: #111827;
  color: #111827;
}

.step-num {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
}

.mockup-step.active .step-num {
  background-color: #111827;
  color: #ffffff;
}

.mockup-section {
  margin-bottom: 2.5rem;
}

.mockup-section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1.25rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #f3f4f6;
}

.mockup-field {
  margin-bottom: 1.25rem;
}

.mockup-field label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.mockup-field label .req {
  color: #ef4444;
}

.mockup-input, .mockup-select, .mockup-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  color: #111827;
  background-color: #ffffff;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.mockup-input.has-error, .mockup-select.has-error {
  border-color: #ef4444;
  background-color: #fef2f2;
}

.mockup-input:focus, .mockup-select:focus, .mockup-textarea:focus {
  border-color: #d1d5db;
}

.mockup-input.has-error:focus, .mockup-select.has-error:focus {
  border-color: #ef4444;
}

.error-msg {
  display: block;
  color: #ef4444;
  font-size: 0.85rem;
  margin-top: 0.4rem;
}

.mockup-textarea {
  resize: vertical;
  min-height: 100px;
}

.mockup-phone-input {
  display: flex;
  gap: 0.5rem;
}

.mockup-phone-input .phone-code {
  width: 110px;
  flex-shrink: 0;
}

.mockup-input-icon {
  position: relative;
}

.mockup-input-icon .icon-right {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
}

.mockup-location-group {
  display: flex;
  gap: 0.5rem;
}

.mockup-icon-btn {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #111827;
  flex-shrink: 0;
}

.mockup-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 2.5rem;
  gap: 1rem;
}

.mockup-btn-next {
  background-color: #111827;
  color: #ffffff;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

.mockup-btn-next:hover {
  opacity: 0.9;
}

.mockup-btn-back {
  background-color: #f3f4f6;
  color: #374151;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: background-color 0.2s;
}

.mockup-btn-back:hover {
  background-color: #e5e7eb;
}

.mockup-powered-by {
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: #9ca3af;
  text-align: center;
}
.mockup-powered-by strong {
  color: #6b7280;
}

/* Packages Styles */
.packages-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.package-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.2s;
}

.package-card:hover {
  border-color: #d1d5db;
  background-color: #f9fafb;
}

.package-card.selected {
  border-color: #111827;
  background-color: #f3f4f6;
}

.pkg-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.pkg-header h5 {
  font-size: 1.05rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.pkg-radio {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
}
.package-card.selected .pkg-radio {
  border-color: #111827;
}
.radio-inner {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.pkg-checkbox {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
}
.package-card.selected .pkg-checkbox {
  border-color: #111827;
}

.pkg-price {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
}

.pkg-desc {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
}

.empty-packages {
  color: #6b7280;
  font-style: italic;
  padding: 1rem 0;
}

/* Summary Styles */
.summary-box {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.summary-item .sum-info {
  display: flex;
  flex-direction: column;
}
.summary-item .sum-info strong {
  color: #111827;
  font-size: 1rem;
}
.summary-item .sum-info span {
  color: #6b7280;
  font-size: 0.85rem;
}
.summary-item .sum-price {
  font-weight: 600;
  color: #374151;
}

.sum-divider {
  border: 0;
  border-top: 1px dashed #d1d5db;
  margin: 1.5rem 0;
}

.summary-total, .summary-dp, .summary-sisa {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 1rem;
}
.summary-total strong {
  font-size: 1.1rem;
  color: #111827;
}
.summary-dp {
  color: #059669;
}
.summary-dp strong {
  color: #059669;
}
.summary-sisa {
  color: #dc2626;
}
.summary-sisa strong {
  color: #dc2626;
}

/* Payment Styles */
.payment-methods {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
.pay-method-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.pay-header {
  font-size: 1.05rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #111827;
}
.pay-method-card p {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
}

.alert-success-sim {
  background-color: #d1fae5;
  color: #065f46;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #a7f3d0;
}
.mt-4 {
  margin-top: 1rem;
}

/* Package Selection Custom UI */
.package-selection-container {
  margin-bottom: 1rem;
}
.selection-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.2s;
}
.selection-trigger:hover {
  border-color: #d1d5db;
  background-color: #f9fafb;
}
.selection-trigger.has-error {
  border-color: #ef4444;
}
.selection-text {
  font-size: 1rem;
  color: #111827;
}
.selection-action {
  font-size: 0.9rem;
  font-weight: 600;
  color: #4b5563;
}
.selection-hint {
  display: block;
  font-size: 0.85rem;
  color: #6b7280;
  margin-top: 0.4rem;
}
.selected-items-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
}
.selected-item-card {
  display: flex;
  justify-content: space-between;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
}
.item-card-left {
  flex: 1;
}
.item-title {
  font-weight: 700;
  color: #111827;
  font-size: 1.05rem;
}
.item-desc {
  font-size: 0.85rem;
  color: #6b7280;
  margin-top: 0.25rem;
}
.item-card-right {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
}
.item-price {
  font-weight: 700;
  color: #111827;
  font-size: 1.1rem;
}
.item-qty-control {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 20px;
  padding: 0.25rem 0.5rem;
}
.qty-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #374151;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.qty-text {
  font-weight: 600;
  font-size: 0.95rem;
  min-width: 16px;
  text-align: center;
  color: #111827;
}

/* Modals */
.pkg-modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.pkg-modal-content {
  background: #fff;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
}
.pkg-modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.pkg-modal-header h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
}
.pkg-modal-header p {
  margin: 0;
  font-size: 0.9rem;
  color: #6b7280;
}
.pkg-modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #9ca3af;
  cursor: pointer;
}
.pkg-modal-search {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f3f4f6;
}
.pkg-modal-body {
  padding: 1rem 1.5rem;
  overflow-y: auto;
  flex: 1;
}
.pkg-list-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}
.pkg-list-item:hover {
  background-color: #f9fafb;
}
.pkg-list-item.selected {
  background-color: #f3f4f6;
  border-color: #111827;
}
.pkg-item-info {
  flex: 1;
}
.pkg-item-info h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
}
.pkg-item-info p {
  margin: 0;
  font-size: 0.85rem;
  color: #6b7280;
}
.pkg-item-price {
  text-align: right;
}
.price-current {
  font-weight: 700;
  color: #111827;
}
.price-strike {
  font-size: 0.8rem;
  color: #9ca3af;
  text-decoration: line-through;
}
.pkg-modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #f3f4f6;
  display: flex;
  justify-content: flex-end;
}
/* Summary Modern UI */
.summary-box-modern {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.summary-section {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}
.summary-section h5, .summary-total-section h5 {
  margin: 0 0 1rem 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: #111827;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}
.summary-row:last-child {
  margin-bottom: 0;
}
.summary-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.9rem;
  flex: 1;
}
.summary-value {
  color: #111827;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: right;
  flex: 1;
  word-break: break-word;
}
.summary-total-section {
  background-color: #f9fafb;
  padding: 1.5rem;
  border-radius: 8px;
}
.pt-3 {
  padding-top: 1rem;
}

/* Step 4 Custom UI */
.input-with-prefix {
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease;
}
.input-with-prefix:focus-within {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
.input-prefix {
  padding: 0.75rem 1rem;
  background-color: #f3f4f6;
  color: #6b7280;
  font-weight: 500;
  border-right: 1px solid #d1d5db;
}
.dp-input {
  border: none !important;
  box-shadow: none !important;
  border-radius: 0;
  flex: 1;
}
.dp-input.has-error {
  background-color: #fef2f2;
}
.input-with-prefix:has(.has-error) {
  border-color: #ef4444;
}
.payment-methods-horizontal {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.payment-methods-horizontal .pay-method-card {
  flex: 1;
  min-width: 200px;
  margin-bottom: 0;
}
.bank-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.bank-item {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  background-color: #f9fafb;
}
.bank-item.selected {
  border-color: #111827;
  background-color: #ffffff;
}
.bank-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
  color: #111827;
}
.bank-desc {
  font-size: 0.85rem;
  color: #6b7280;
}
.bank-detail-box {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background-color: #f9fafb;
  overflow: hidden;
}
.bank-detail-header {
  background-color: #ffffff;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}
.bank-detail-body {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.acc-info {
  display: flex;
  flex-direction: column;
}
.acc-label {
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}
.acc-number {
  font-size: 1.5rem;
  color: #111827;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}
.acc-name {
  font-size: 0.9rem;
  color: #4b5563;
}
.btn-copy {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: #ffffff;
  color: #374151;
  font-weight: 500;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-copy:hover {
  background-color: #f3f4f6;
}
.qris-box {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background-color: #f9fafb;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.qris-img {
  max-width: 100%;
  max-height: 400px;
  border-radius: 8px;
}
.cash-box {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #ffffff;
  padding: 1rem;
  color: #6b7280;
  font-size: 0.9rem;
}
</style>
