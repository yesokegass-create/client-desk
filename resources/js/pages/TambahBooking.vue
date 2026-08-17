<template>
  <DashboardLayout>
    <div class="tambah-booking-page">
      <!-- Page Header -->
      <div class="page-header">
        <button class="back-button" @click="$router.push('/daftar-booking')">
          <ArrowLeft :size="16" />
        </button>
        <div>
          <h1 class="page-title">Tambah Klien Baru</h1>
          <p class="page-subtitle">Isi detail booking klien baru.</p>
        </div>
      </div>

      <div class="form-container">
        <!-- INFORMASI KLIEN -->
        <div id="tour-target-informasi-klien" class="form-section">
          <div class="section-title">
            <Users :size="16" /> INFORMASI KLIEN
          </div>
          <div class="form-row">
            <div class="form-group flex-1">
              <label>Nama <span class="text-danger">*</span></label>
              <input type="text" class="form-control" placeholder="Nama lengkap klien" v-model="form.nama" />
            </div>
            <div class="form-group flex-1">
              <label>Nomor WhatsApp <span class="text-danger">*</span></label>
              <div class="input-group">
                <div class="country-code" style="cursor: default; padding-right: 12px;">
                  <span>ID +62</span>
                </div>
                <input type="tel" class="form-control flex-1" placeholder="8123456789" v-model="form.whatsapp" @input="formatWhatsApp" />
              </div>
            </div>
          </div>
          <div class="form-group mt-3">
            <label>Instagram</label>
            <input type="text" class="form-control" placeholder="@username" v-model="form.instagram" />
          </div>

          <template v-if="['Wedding', 'Akad', 'Resepsi', 'Lamaran', 'Prewedding'].includes(form.tipeAcara)">
            <div class="form-group mt-3">
              <label>Nama Pasangan <span class="text-danger">*</span></label>
              <input type="text" class="form-control" placeholder="Nama Pasangan" v-model="form.namaPasangan" />
            </div>
            <div class="form-group mt-3">
              <label>Instagram Pasangan</label>
              <input type="text" class="form-control" placeholder="Instagram Pasangan" v-model="form.instagramPasangan" />
            </div>
            <div class="form-group mt-3">
              <label>Estimasi Tamu</label>
              <input type="number" class="form-control" placeholder="Estimasi Tamu" v-model="form.estimasiTamu" />
            </div>
          </template>
        </div>

        <!-- DETAIL SESI/ACARA -->
        <div id="tour-target-detail-sesi" class="form-section mt-4">
          <div class="section-title">
            <Calendar :size="16" /> DETAIL SESI/ACARA
          </div>
          <div class="form-row">
            <div class="form-group flex-1">
              <label>Tipe Acara <span class="text-danger">*</span></label>
              <select class="form-control select-control" v-model="form.tipeAcara">
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
            </div>
          </div>
          <div class="form-row mt-3">
            <div class="form-group flex-1">
              <label>Tanggal <span class="text-danger">*</span></label>
              <div class="input-icon-wrapper">
                <input type="date" class="form-control" v-model="form.tanggal" />
              </div>
            </div>
            <div class="form-group flex-1">
              <label>Jam <span class="text-danger">*</span></label>
              <div class="input-icon-wrapper">
                <input type="time" class="form-control" v-model="form.jam" />
              </div>
            </div>
          </div>
          <div class="form-group mt-3">
            <label>Status Awal</label>
            <select class="form-control select-control" v-model="form.statusAwal">
              <option value="Pending">Pending</option>
            </select>
            <p class="help-text">Status awal selalu Pending. Ubah status setelah booking dibuat.</p>
          </div>
          <div class="form-group mt-3">
            <label>Lokasi Utama</label>
            <div class="input-group">
              <input type="text" class="form-control flex-1" placeholder="Cari lokasi sesi foto..." v-model="form.lokasi" />
              <button class="btn-icon-inside"><MapPin :size="14" /></button>
            </div>
          </div>
          <div class="form-group mt-3">
            <label>Detail Lokasi</label>
            <input type="text" class="form-control" placeholder="Contoh: Gedung Utama, Lt. 3, Ruang Ballroom A" v-model="form.detailLokasi" />
          </div>
          <div class="form-group mt-3">
            <div class="flex-between">
              <label>Paket / Layanan <span class="text-danger">*</span></label>
              <button class="btn-link">Buka Daftar</button>
            </div>
            <select class="form-control select-control" v-model="form.paket">
              <option value="">+ Tambah Paket Baru...</option>
            </select>
          </div>
          <div class="form-group mt-3">
            <div class="flex-between">
              <label>Add-on <span class="text-optional">(opsional)</span></label>
              <button class="btn-link">Buka Daftar</button>
            </div>
            <div class="disabled-box">Belum ada add-on aktif</div>
          </div>
          <div class="form-group mt-3">
            <div class="flex-between">
              <label>Freelance <span class="text-optional">(global, max 5)</span></label>
            </div>
            <div class="freelance-buttons">
              <button class="btn-outline-small">Pilih Freelance</button>
              <button class="btn-outline-small">+ Tambah Baru</button>
            </div>
            <p class="help-text">Belum ada freelance dipilih<br/>0/5 dipilih</p>
          </div>

          <!-- Pajak Booking inside Detail Sesi -->
          <div class="pajak-booking-box mt-4">
            <div class="flex-between">
              <h4 class="box-title">Pajak Booking</h4>
              <button class="btn-outline-small">+ Tambah Pajak</button>
            </div>
            <p class="help-text">Prefill dari Pengaturan Keuangan. Dapat diubah atau dikosongkan sebelum booking disimpan.</p>
            <div class="dashed-box mt-2">
              Booking tidak menggunakan pajak.
            </div>
            <div class="calc-summary mt-4">
              <div class="calc-row">
                <span>Subtotal</span>
                <span>Rp 0</span>
              </div>
              <div class="calc-row">
                <span>Total Pajak</span>
                <span>Rp 0</span>
              </div>
              <div class="calc-row grand-total">
                <span>Grand Total</span>
                <span>Rp 0</span>
              </div>
            </div>
          </div>
        </div>

        <!-- KEUANGAN -->
        <div class="form-section mt-4">
          <div class="section-title">
            <CreditCard :size="16" /> KEUANGAN
          </div>
          <div class="form-row">
            <div class="form-group flex-1">
              <label>Harga Total <span class="text-danger">*</span></label>
              <div class="input-prefix">
                <span class="prefix">Rp</span>
                <input type="tel" class="form-control" placeholder="0" v-model="form.hargaTotal" @input="e => handleCurrency('hargaTotal', e)" />
              </div>
            </div>
            <div class="form-group flex-1">
              <label>DP Dibayar</label>
              <div class="input-prefix">
                <span class="prefix">Rp</span>
                <input type="tel" class="form-control" placeholder="0" v-model="form.dp" @input="e => handleCurrency('dp', e)" />
              </div>
            </div>
          </div>
          <div class="form-row mt-3">
            <div class="form-group flex-1">
              <label>Biaya Akomodasi (Rp)</label>
              <div class="input-prefix">
                <span class="prefix">Rp</span>
                <input type="tel" class="form-control" placeholder="0" v-model="form.akomodasi" @input="e => handleCurrency('akomodasi', e)" />
              </div>
            </div>
            <div class="form-group flex-1">
              <label>Diskon Nominal (Rp)</label>
              <div class="input-prefix">
                <span class="prefix">Rp</span>
                <input type="tel" class="form-control" placeholder="0" v-model="form.diskon" @input="e => handleCurrency('diskon', e)" />
              </div>
            </div>
          </div>
          <div class="form-group mt-3">
            <label><Tag :size="14" class="mr-1" style="display:inline-block;vertical-align:middle;"/> Kode Voucher</label>
            <div class="input-group">
              <input type="text" class="form-control flex-1" placeholder="MASUKKAN KODE VOUCHER" v-model="form.voucher" />
              <button class="btn-secondary">Gunakan</button>
            </div>
          </div>
        </div>

        <!-- CATATAN -->
        <div class="form-section mt-4">
          <div class="section-title">
            <FileText :size="16" /> CATATAN
          </div>
          <textarea class="form-control" rows="3" placeholder="Permintaan khusus, detail tambahan..." v-model="form.catatanKlien"></textarea>
        </div>

        <!-- CATATAN ADMIN -->
        <div class="form-section mt-4">
          <div class="section-title">
            <Lock :size="16" /> CATATAN ADMIN
          </div>
          <textarea class="form-control" rows="3" placeholder="Catatan internal admin (tidak tampil ke klien/freelance)..." v-model="form.catatanAdmin"></textarea>
        </div>

        <!-- LINK GOOGLE DRIVE -->
        <div class="form-section mt-4">
          <div class="section-title">
            <LinkIcon :size="16" /> LINK GOOGLE DRIVE HASIL FOTO
          </div>
          <input type="text" class="form-control" placeholder="https://drive.google.com/drive/folders/..." v-model="form.linkFoto" />
          <p class="help-text mt-1">Sematkan link Google Drive hasil foto klien di sini (opsional)</p>
        </div>

        <div class="form-section mt-4">
          <div class="section-title">
            <LinkIcon :size="16" /> LINK GOOGLE DRIVE HASIL VIDEO
          </div>
          <input type="text" class="form-control" placeholder="https://drive.google.com/drive/folders/..." v-model="form.linkVideo" />
          <p class="help-text mt-1">Sematkan link Google Drive hasil video klien di sini (opsional)</p>
        </div>

        <!-- LINK IG -->
        <div class="form-section mt-4">
          <div class="section-title">
            <LinkIcon :size="16" /> LINK PORTOFOLIO INSTAGRAM
          </div>
          <input type="text" class="form-control" placeholder="https://www.instagram.com/p/..." v-model="form.linkIg" />
          <p class="help-text mt-1">Link postingan IG hasil foto (opsional)</p>
        </div>

        <!-- Footer Actions -->
        <div id="tour-target-simpan-booking" class="footer-actions mt-6">
          <button class="btn-text-cancel" @click="$router.push('/daftar-booking')">Batal</button>
          <button class="btn-primary" @click="handleSimpanBooking">
            <Save :size="16" class="mr-2" /> Simpan Booking
          </button>
        </div>

      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import DashboardLayout from '../layouts/DashboardLayout.vue';
import { useTour } from '../composables/useTour';
import { 
  ArrowLeft, Users, Calendar, MapPin, 
  CreditCard, Tag, FileText, Lock, Link as LinkIcon, Save
} from 'lucide-vue-next';

const router = useRouter();
const { isActive, currentStep, completeStep, endTour } = useTour();
const form = ref({
  nama: '',
  whatsapp: '',
  instagram: '',
  namaPasangan: '',
  instagramPasangan: '',
  estimasiTamu: '',
  tipeAcara: 'Umum',
  tanggal: '',
  jam: '',
  statusAwal: 'Pending',
  lokasi: '',
  detailLokasi: '',
  paket: '',
  hargaTotal: '',
  dp: '',
  akomodasi: '',
  diskon: '',
  voucher: '',
  catatanKlien: '',
  catatanAdmin: '',
  linkFoto: '',
  linkVideo: '',
  linkIg: ''
});

watch(() => form.value, (newVal) => {
  if (isActive.value && currentStep()?.id === 'add-booking-3') {
    if (newVal.nama.trim() !== '' && newVal.whatsapp.trim() !== '' && newVal.tanggal !== '' && newVal.jam !== '') {
      completeStep('add-booking-3');
    }
  }
}, { deep: true });

watch(() => currentStep()?.id, (newVal, oldVal) => {
  // Jika pengguna mengklik Lanjut di popup Tour pada step 3
  if (oldVal === 'add-booking-3' && newVal === 'view-booking-list') {
    handleSimpanBooking(true);
  }
});

const handleSimpanBooking = () => {
  if (!form.value.nama || !form.value.whatsapp || !form.value.tanggal || !form.value.jam) {
    alert('Mohon lengkapi data wajib: Nama Klien, WhatsApp, Tanggal, dan Jam sebelum menyimpan.');
    return;
  }
  if (isActive.value && currentStep()?.id === 'add-booking-3') {
    completeStep('add-booking-3');
    endTour();
  }
  router.push('/daftar-booking');
};

const formatWhatsApp = (e) => {
  let val = e.target.value.replace(/\D/g, '');
  if (val.startsWith('0')) val = val.substring(1);
  else if (val.startsWith('62')) val = val.substring(2);
  form.value.whatsapp = val;
  e.target.value = val;
};

const formatCurrency = (value) => {
  if (!value) return '';
  const numericString = value.toString().replace(/\D/g, '');
  if (!numericString) return '';
  return parseInt(numericString, 10).toLocaleString('id-ID');
};

const handleCurrency = (field, event) => {
  const formatted = formatCurrency(event.target.value);
  form.value[field] = formatted;
  event.target.value = formatted;
};
</script>

<style scoped>
.tambah-booking-page {
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
}

.back-button {
  background: transparent;
  border: none;
  color: #888;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;
  margin-top: 2px;
}

.back-button:hover {
  background: rgba(255,255,255,0.1);
  color: #fff;
}

.page-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 4px 0;
}

.page-subtitle {
  color: #888;
  font-size: 0.85rem;
  margin: 0;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-section {
  background-color: #111111;
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 12px;
  padding: 20px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #a0a0a0;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  gap: 16px;
}

.flex-1 {
  flex: 1;
}

.mt-3 { margin-top: 12px; }
.mt-4 { margin-top: 16px; }
.mt-6 { margin-top: 24px; }
.mr-1 { margin-right: 4px; }
.mr-2 { margin-right: 8px; }

label {
  display: block;
  font-size: 0.85rem;
  color: #fff;
  margin-bottom: 8px;
}

.text-danger { color: #f87171; }
.text-optional { color: #6b7280; font-size: 0.75rem; }

.form-control {
  width: 100%;
  background-color: #1d1e26;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 10px 12px;
  color: #fff;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: #a855f7;
  background-color: #232533;
}

.input-group {
  display: flex;
  background-color: #1d1e26;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.input-group .form-control {
  border: none;
  border-radius: 0;
  background: transparent;
}

.country-code {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 12px;
  background: rgba(0,0,0,0.2);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.85rem;
  color: #fff;
  font-weight: 500;
}

.input-prefix {
  display: flex;
  align-items: center;
  background-color: #1d1e26;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.input-prefix .prefix {
  padding: 0 12px;
  color: #888;
  font-size: 0.9rem;
}

.input-prefix .form-control {
  border: none;
  border-radius: 0;
  background: transparent;
  padding-left: 0;
}

.btn-icon-inside {
  background: transparent;
  border: none;
  color: #888;
  padding: 0 12px;
  cursor: pointer;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.flex-between label {
  margin-bottom: 0;
}

.btn-link {
  background: transparent;
  border: none;
  color: #a855f7;
  font-size: 0.8rem;
  cursor: pointer;
}

.btn-link:hover {
  text-decoration: underline;
}

.disabled-box {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 8px;
  padding: 10px 12px;
  color: #666;
  font-size: 0.85rem;
}

.freelance-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 4px;
}

.btn-outline-small {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.8rem;
  cursor: pointer;
}

.btn-outline-small:hover {
  background: rgba(255,255,255,0.05);
}

.help-text {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 4px 0 0 0;
  line-height: 1.4;
}

.pajak-booking-box {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 8px;
  padding: 16px;
}

.box-title {
  font-size: 0.95rem;
  color: #fff;
  margin: 0;
}

.dashed-box {
  border: 1px dashed rgba(255,255,255,0.1);
  border-radius: 6px;
  padding: 16px;
  text-align: center;
  color: #666;
  font-size: 0.85rem;
}

.calc-summary {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.calc-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #888;
}

.grand-total {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 8px;
  margin-top: 4px;
  color: #fff;
  font-weight: 600;
}

.btn-secondary {
  background: #2a2a35;
  color: #fff;
  border: none;
  padding: 0 16px;
  font-size: 0.85rem;
  cursor: pointer;
  border-left: 1px solid rgba(255,255,255,0.1);
}

.btn-secondary:hover {
  background: #333340;
}

.footer-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  align-items: center;
}

.btn-text-cancel {
  background: transparent;
  border: none;
  color: #a0a0a0;
  font-size: 0.9rem;
  cursor: pointer;
}

.btn-text-cancel:hover {
  color: #fff;
}

.btn-primary {
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.btn-primary:hover {
  background-color: #f0f0f0;
}
</style>
