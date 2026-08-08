<template>
  <div class="public-booking-page">
    <div class="booking-container">
      <div class="mockup-avatar">
        {{ vendorAlias ? vendorAlias.charAt(0).toUpperCase() : 'F' }}
      </div>
      <h3 class="mockup-vendor-name">{{ vendorName || vendorAlias }}</h3>
      <p class="mockup-subtitle">{{ displayGreetingText }}</p>
      
      <div class="mockup-form-card">
        <!-- Steps List -->
        <div class="mockup-steps-list">
          <div class="mockup-step" :class="{ active: currentStep >= 1 }" :style="currentStep >= 1 ? { backgroundColor: brandColor + '20', borderColor: brandColor } : {}">
            <span class="step-num" :style="currentStep >= 1 ? { backgroundColor: brandColor, color: '#fff' } : {}">1</span>
            <span class="step-text" :style="currentStep >= 1 ? { color: '#000' } : {}">{{ langStrings.clientInfo }}</span>
          </div>
          <div class="mockup-step" :class="{ active: currentStep >= 2 }" :style="currentStep >= 2 ? { backgroundColor: brandColor + '20', borderColor: brandColor } : {}">
            <span class="step-num" :style="currentStep >= 2 ? { backgroundColor: brandColor, color: '#fff' } : {}">2</span>
            <span class="step-text" :style="currentStep >= 2 ? { color: '#000' } : {}">{{ langStrings.packageAddon }}</span>
          </div>
          <div class="mockup-step" :class="{ active: currentStep >= 3 }" :style="currentStep >= 3 ? { backgroundColor: brandColor + '20', borderColor: brandColor } : {}">
            <span class="step-num" :style="currentStep >= 3 ? { backgroundColor: brandColor, color: '#fff' } : {}">3</span>
            <span class="step-text" :style="currentStep >= 3 ? { color: '#000' } : {}">{{ langStrings.summary }}</span>
          </div>
          <div class="mockup-step" :class="{ active: currentStep >= 4 }" :style="currentStep >= 4 ? { backgroundColor: brandColor + '20', borderColor: brandColor } : {}">
            <span class="step-num" :style="currentStep >= 4 ? { backgroundColor: brandColor, color: '#fff' } : {}">4</span>
            <span class="step-text" :style="currentStep >= 4 ? { color: '#000' } : {}">{{ langStrings.paymentConfirmation }}</span>
          </div>
        </div>

        <!-- STEP 1: Informasi Klien -->
        <div v-show="currentStep === 1">
          <div class="mockup-section">
            <h4 class="mockup-section-title" :style="{ color: brandColor }">{{ langStrings.clientInfo }}</h4>
            
            <div class="mockup-field">
              <label><User :size="16" /> Nama Lengkap <span class="req" :style="{ color: brandColor }">*</span></label>
              <input type="text" id="field-namaLengkap" v-model="formData.namaLengkap" :class="['mockup-input', {'has-error': errors.namaLengkap}]" placeholder="Nama lengkap Anda" />
              <span v-if="errors.namaLengkap" class="error-msg">Bidang ini wajib diisi</span>
            </div>

            <div class="mockup-field">
              <label><Phone :size="16" /> Nomor WhatsApp <span class="req" :style="{ color: brandColor }">*</span></label>
              <div class="mockup-phone-input">
                <select class="mockup-select phone-code">
                  <option>ID +62</option>
                </select>
                <input type="text" id="field-noWhatsapp" v-model="formData.noWhatsapp" :class="['mockup-input', {'has-error': errors.noWhatsapp}]" placeholder="8123456789" />
              </div>
              <span v-if="errors.noWhatsapp" class="error-msg">Bidang ini wajib diisi</span>
            </div>

            <div class="mockup-field">
              <label><Instagram :size="16" /> Instagram</label>
              <input type="text" v-model="formData.instagram" class="mockup-input" placeholder="@ username" />
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
              <span v-if="errors.tipeAcara" class="error-msg">Bidang ini wajib diisi</span>
            </div>

            <template v-if="mockupTipeAcara">
              <div class="mockup-field">
                <label><Calendar :size="16" /> Jadwal Sesi/Acara <span class="req" :style="{ color: brandColor }">*</span></label>
                <div class="mockup-input-icon">
                  <input type="text" id="field-jadwal" v-model="formData.jadwal" :class="['mockup-input', {'has-error': errors.jadwal}]" placeholder="mm/dd/yyyy" />
                  <Calendar :size="18" class="icon-right" />
                </div>
                <span v-if="errors.jadwal" class="error-msg">Bidang ini wajib diisi</span>
              </div>

              <div class="mockup-field">
                <label><Clock :size="16" /> Jam <span class="req" :style="{ color: brandColor }">*</span></label>
                <div class="mockup-input-icon">
                  <input type="text" id="field-jam" v-model="formData.jam" :class="['mockup-input', {'has-error': errors.jam}]" placeholder="--:-- --" />
                  <Clock :size="18" class="icon-right" />
                </div>
                <span v-if="errors.jam" class="error-msg">Bidang ini wajib diisi</span>
              </div>

              <div class="mockup-field">
                <label><MapPin :size="16" /> Lokasi <span class="req" :style="{ color: brandColor }">*</span></label>
                <div class="mockup-location-group">
                  <div class="mockup-input-icon" style="flex: 1;">
                    <input type="text" id="field-lokasi" v-model="formData.lokasi" :class="['mockup-input', {'has-error': errors.lokasi}]" placeholder="Cari lokasi acara..." />
                  </div>
                  <button class="mockup-icon-btn" title="Pilih Lokasi di Peta" @click="showMapModal = true">
                    <MapPin :size="18" :style="{ color: brandColor }" />
                  </button>
                </div>
                <span v-if="errors.lokasi" class="error-msg">Bidang ini wajib diisi</span>
              </div>
              
              <div class="mockup-field">
                <label>Detail Lokasi</label>
                <textarea v-model="formData.detailLokasi" class="mockup-textarea" placeholder="Contoh: Gedung Utama, Lt. 3, Ruang Ballroom A"></textarea>
              </div>
            </template>

            <template v-if="['Wedding', 'Akad', 'Resepsi', 'Lamaran', 'Prewedding'].includes(mockupTipeAcara)">
              <div class="mockup-field">
                <label><User :size="16" /> Nama Pasangan <span class="req" :style="{ color: brandColor }">*</span></label>
                <input type="text" id="field-namaPasangan" v-model="formData.namaPasangan" :class="['mockup-input', {'has-error': errors.namaPasangan}]" placeholder="Nama Pasangan" />
                <span v-if="errors.namaPasangan" class="error-msg">Bidang ini wajib diisi</span>
              </div>
              <div class="mockup-field">
                <label><Instagram :size="16" /> Instagram Pasangan</label>
                <input type="text" v-model="formData.instagramPasangan" class="mockup-input" placeholder="Instagram Pasangan" />
              </div>
            </template>

            <template v-if="['Wedding', 'Akad', 'Resepsi', 'Lamaran'].includes(mockupTipeAcara)">
              <div class="mockup-field">
                <label><User :size="16" /> Estimasi Tamu</label>
                <input type="text" v-model="formData.estimasiTamu" class="mockup-input" placeholder="Estimasi Tamu" />
              </div>
            </template>

            <div class="mockup-field">
              <label>Catatan</label>
              <textarea v-model="formData.catatan" class="mockup-textarea" placeholder="Catatan tambahan (opsional)..."></textarea>
            </div>
          </div>
          <div class="mockup-footer">
            <button class="mockup-btn-next" :style="{ backgroundColor: brandColor, borderColor: brandColor, width: '100%' }" @click="validateStep1">{{ langStrings.btnNext }}</button>
          </div>
        </div>

        <!-- STEP 2: Pilih Paket & Add-On -->
        <div v-show="currentStep === 2">
          <div class="mockup-section">
            <h4 class="mockup-section-title" :style="{ color: brandColor }">Pilih Paket Utama</h4>
            <div v-if="availablePaket.length === 0" class="empty-packages">
              Tidak ada paket yang tersedia untuk tipe acara ini.
            </div>
            <div class="packages-grid">
              <div 
                v-for="pkg in availablePaket" 
                :key="pkg.id" 
                class="package-card" 
                :class="{ selected: formData.selectedPaket === pkg.id }"
                @click="formData.selectedPaket = pkg.id; errors.selectedPaket = false;"
              >
                <div class="pkg-header">
                  <h5>{{ pkg.nama_layanan }}</h5>
                  <div class="pkg-radio">
                    <div class="radio-inner" v-if="formData.selectedPaket === pkg.id" :style="{ backgroundColor: brandColor }"></div>
                  </div>
                </div>
                <p class="pkg-price">Rp {{ formatNumber(pkg.harga) }}</p>
                <p class="pkg-desc">{{ pkg.deskripsi }}</p>
              </div>
            </div>
            <span v-if="errors.selectedPaket" class="error-msg mt-2">Pilih salah satu paket utama.</span>
          </div>

          <div class="mockup-section" v-if="availableAddons.length > 0">
            <h4 class="mockup-section-title" :style="{ color: brandColor }">Pilih Add-on (Opsional)</h4>
            <div class="packages-grid">
              <div 
                v-for="addon in availableAddons" 
                :key="addon.id" 
                class="package-card" 
                :class="{ selected: formData.selectedAddons.includes(addon.id) }"
                @click="toggleAddon(addon.id)"
              >
                <div class="pkg-header">
                  <h5>{{ addon.nama_layanan }}</h5>
                  <div class="pkg-checkbox">
                    <Check v-if="formData.selectedAddons.includes(addon.id)" :size="14" :color="brandColor" />
                  </div>
                </div>
                <p class="pkg-price">Rp {{ formatNumber(addon.harga) }}</p>
                <p class="pkg-desc">{{ addon.deskripsi }}</p>
              </div>
            </div>
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
            
            <div class="summary-box">
              <div class="summary-item main-pkg" v-if="selectedPaketDetail">
                <div class="sum-info">
                  <strong>{{ selectedPaketDetail.nama_layanan }}</strong>
                  <span>Paket Utama</span>
                </div>
                <div class="sum-price">Rp {{ formatNumber(selectedPaketDetail.harga) }}</div>
              </div>

              <div class="summary-item" v-for="addon in selectedAddonsDetails" :key="addon.id">
                <div class="sum-info">
                  <strong>{{ addon.nama_layanan }}</strong>
                  <span>Add-on</span>
                </div>
                <div class="sum-price">Rp {{ formatNumber(addon.harga) }}</div>
              </div>

              <hr class="sum-divider" />
              
              <div class="summary-total">
                <span>Total Biaya</span>
                <strong>Rp {{ formatNumber(totalPrice) }}</strong>
              </div>
              
              <div class="summary-dp">
                <span>Minimal DP ({{ dpLabel }})</span>
                <strong>Rp {{ formatNumber(dpAmount) }}</strong>
              </div>
              
              <div class="summary-sisa">
                <span>Sisa Pembayaran</span>
                <strong>Rp {{ formatNumber(totalPrice - dpAmount) }}</strong>
              </div>
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
            <h4 class="mockup-section-title" :style="{ color: brandColor }">{{ langStrings.paymentConfirmation }}</h4>
            
            <div class="payment-methods">
              <div v-if="activePaymentMethods.transfer_bank" class="pay-method-card">
                <div class="pay-header"><CreditCard :size="18" /> Transfer Bank</div>
                <p>Transfer ke rekening bank yang tersedia.</p>
              </div>
              
              <div v-if="activePaymentMethods.qris" class="pay-method-card">
                <div class="pay-header"><QrCode :size="18" /> QRIS</div>
                <p>Scan barcode QRIS untuk membayar.</p>
              </div>
              
              <div v-if="activePaymentMethods.cash" class="pay-method-card">
                <div class="pay-header"><Banknote :size="18" /> Cash</div>
                <p>Bayar langsung secara tunai.</p>
              </div>
            </div>
            
            <div class="alert-success-sim mt-4">
              <strong>Simulasi Selesai!</strong> Ini adalah pratinjau form booking. Di mode live, klien Anda akan mengkonfirmasi pembayaran di sini.
            </div>
          </div>

          <div class="mockup-footer" style="justify-content: flex-start;">
            <button class="mockup-btn-back" @click="currentStep = 3">Kembali</button>
          </div>
        </div>

      </div>
      
      <p class="mockup-powered-by">Powered by <strong>Client Desk</strong></p>
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
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { 
  User, Phone, Instagram, Tag, Calendar, Clock, MapPin, Check, CreditCard, QrCode, Banknote
} from 'lucide-vue-next';
import GoogleMapModal from '../components/GoogleMapModal.vue';

const route = useRoute();
const vendorAlias = ref(route.params.vendorAlias || 'Vendor');
const vendorName = ref('');
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
  selectedPaket: null,
  selectedAddons: []
});

const errors = ref({});

const handleLocationSelect = (address) => {
  formData.value.lokasi = address;
};

// Services filtering
const availablePaket = computed(() => {
  if (!mockupTipeAcara.value) return [];
  return services.value.filter(s => 
    s.jenis_layanan === 'utama' && 
    s.tipe_acara && 
    s.tipe_acara.some(t => t.toLowerCase() === mockupTipeAcara.value.toLowerCase())
  );
});

const availableAddons = computed(() => {
  if (!mockupTipeAcara.value) return [];
  return services.value.filter(s => 
    s.jenis_layanan === 'addon' && 
    s.tipe_acara && 
    s.tipe_acara.some(t => t.toLowerCase() === mockupTipeAcara.value.toLowerCase())
  );
});

const toggleAddon = (id) => {
  const index = formData.value.selectedAddons.indexOf(id);
  if (index > -1) {
    formData.value.selectedAddons.splice(index, 1);
  } else {
    formData.value.selectedAddons.push(id);
  }
};

const validateStep1 = () => {
  errors.value = {};
  
  if (!formData.value.namaLengkap) errors.value.namaLengkap = true;
  if (!formData.value.noWhatsapp) errors.value.noWhatsapp = true;
  if (!mockupTipeAcara.value) errors.value.tipeAcara = true;
  
  if (mockupTipeAcara.value) {
    if (!formData.value.jadwal) errors.value.jadwal = true;
    if (!formData.value.jam) errors.value.jam = true;
    if (!formData.value.lokasi) errors.value.lokasi = true;
  }
  
  if (['Wedding', 'Akad', 'Resepsi', 'Lamaran', 'Prewedding'].includes(mockupTipeAcara.value)) {
    if (!formData.value.namaPasangan) errors.value.namaPasangan = true;
  }
  
  const firstErrorKey = Object.keys(errors.value)[0];
  if (firstErrorKey) {
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
  if (!formData.value.selectedPaket && availablePaket.value.length > 0) {
    errors.value.selectedPaket = true;
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

const selectedPaketDetail = computed(() => {
  return services.value.find(s => s.id === formData.value.selectedPaket);
});

const selectedAddonsDetails = computed(() => {
  return services.value.filter(s => formData.value.selectedAddons.includes(s.id));
});

const totalPrice = computed(() => {
  let total = 0;
  if (selectedPaketDetail.value) {
    total += parsePrice(selectedPaketDetail.value.harga);
  }
  selectedAddonsDetails.value.forEach(a => {
    total += parsePrice(a.harga);
  });
  return total;
});

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
      if (settingsRes.data.form_booking_settings) {
        const fb = settingsRes.data.form_booking_settings;
        if (fb.brandColor) brandColor.value = fb.brandColor;
        if (fb.customGreetingText) customGreetingText.value = fb.customGreetingText;
        if (fb.formLanguage) formLanguage.value = fb.formLanguage;
        if (fb.dpSettings) dpSettings.value = fb.dpSettings;
        if (fb.activePaymentMethods) activePaymentMethods.value = fb.activePaymentMethods;
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
</style>
