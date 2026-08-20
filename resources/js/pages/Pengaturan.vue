<template>
  <DashboardLayout>
    <div class="settings-page">
      <!-- Toast Notification -->
      <transition name="toast-fade">
        <div v-if="showToast" class="toast-notification">
          <CheckCircle2 :size="16" class="text-green-500 mr-2" />
          <span>Pengaturan berhasil disimpan.</span>
          <button @click="showToast = false" class="ml-4 text-gray-400 hover:text-white">
            <X :size="14" />
          </button>
        </div>
      </transition>

      <div class="page-header">
        <span class="breadcrumb">Pengaturan</span>
        <h1 class="page-title">Pengaturan</h1>
        <p class="page-subtitle">Kelola profil vendor dan template pesan Anda.</p>
      </div>

      <!-- Settings Grid (Show if no tab selected) -->
      <div v-if="!currentTab" class="settings-grid">
        <!-- 01 Akun -->
        <a href="#" class="setting-card">
          <div class="card-icon-wrap bg-purple-dark">
            <User :size="20" class="text-purple" />
          </div>
          <div class="card-content">
            <div class="card-title-row">
              <span class="card-num">01</span>
              <h3 class="card-title">Akun</h3>
            </div>
            <p class="card-desc">Kelola profil pribadi, keamanan, perangkat, dan paket Anda.</p>
          </div>
          <ChevronRight :size="16" class="card-chevron" />
        </a>

        <!-- 02 Umum -->
        <router-link to="/pengaturan?tab=umum" class="setting-card">
          <div class="card-icon-wrap bg-blue-dark">
            <Store :size="20" class="text-blue" />
          </div>
          <div class="card-content">
            <div class="card-title-row">
              <span class="card-num">02</span>
              <h3 class="card-title">Umum</h3>
            </div>
            <p class="card-desc">Atur identitas studio, nomor WhatsApp, URL form booking, logo, dan alamat invoice.</p>
          </div>
          <ChevronRight :size="16" class="card-chevron" />
        </router-link>

        <!-- 03 SEO -->
        <a href="#" class="setting-card">
          <div class="card-icon-wrap border-green">
            <Search :size="20" class="text-green" />
          </div>
          <div class="card-content">
            <div class="card-title-row">
              <span class="card-num">03</span>
              <h3 class="card-title">SEO</h3>
            </div>
            <p class="card-desc">Kelola metadata link klien untuk form booking, tracking, dan pelunasan.</p>
          </div>
          <ChevronRight :size="16" class="card-chevron" />
        </a>

        <!-- 04 Template Pesan -->
        <a href="#" class="setting-card">
          <div class="card-icon-wrap border-purple">
            <MessageSquare :size="20" class="text-purple-light" />
          </div>
          <div class="card-content">
            <div class="card-title-row">
              <span class="card-num">04</span>
              <h3 class="card-title">Template Pesan</h3>
            </div>
            <p class="card-desc">Sesuaikan template WhatsApp dan pesan otomatis sesuai alur kerja studio.</p>
          </div>
          <ChevronRight :size="16" class="card-chevron" />
        </a>

        <!-- 05 Daftar Booking -->
        <a href="#" class="setting-card">
          <div class="card-icon-wrap bg-purple-dark">
            <List :size="20" class="text-purple" />
          </div>
          <div class="card-content">
            <div class="card-title-row">
              <span class="card-num">05</span>
              <h3 class="card-title">Daftar Booking</h3>
            </div>
            <p class="card-desc">Atur aksi utama WhatsApp dan tampilan warna tabel untuk daftar booking.</p>
          </div>
          <ChevronRight :size="16" class="card-chevron" />
        </a>

        <!-- 06 Portal Tim / Freelance -->
        <a href="#" class="setting-card">
          <div class="card-icon-wrap bg-blue-dark">
            <Monitor :size="20" class="text-blue" />
          </div>
          <div class="card-content">
            <div class="card-title-row">
              <span class="card-num">06</span>
              <h3 class="card-title">Portal Tim / Freelance</h3>
            </div>
            <p class="card-desc">Atur informasi yang tampil di portal publik tim / freelance.</p>
          </div>
          <ChevronRight :size="16" class="card-chevron" />
        </a>

        <!-- 07 Rating & Ulasan -->
        <a href="#" class="setting-card">
          <div class="card-icon-wrap border-yellow">
            <Star :size="20" class="text-yellow" />
          </div>
          <div class="card-content">
            <div class="card-title-row">
              <span class="card-num">07</span>
              <h3 class="card-title">Rating & Ulasan</h3>
            </div>
            <p class="card-desc">Atur durasi link dan aturan pengisian review klien.</p>
          </div>
          <ChevronRight :size="16" class="card-chevron" />
        </a>

        <!-- 08 Akses User -->
        <a href="#" class="setting-card">
          <div class="card-icon-wrap border-green">
            <Shield :size="20" class="text-green" />
          </div>
          <div class="card-content">
            <div class="card-title-row">
              <span class="card-num">08</span>
              <h3 class="card-title">Akses User</h3>
            </div>
            <p class="card-desc">Undang user, pilih role, dan atur permission menu/aksi.</p>
          </div>
          <ChevronRight :size="16" class="card-chevron" />
        </a>

        <!-- 09 Keuangan -->
        <a href="#" class="setting-card">
          <div class="card-icon-wrap border-yellow">
            <CreditCard :size="20" class="text-yellow" />
          </div>
          <div class="card-content">
            <div class="card-title-row">
              <span class="card-num">09</span>
              <h3 class="card-title">Keuangan</h3>
            </div>
            <p class="card-desc">Kelola rekening invoice, biaya operasional, dan preferensi keuangan admin.</p>
          </div>
          <ChevronRight :size="16" class="card-chevron" />
        </a>

        <!-- 10 Status Booking -->
        <a href="#" class="setting-card">
          <div class="card-icon-wrap border-red">
            <Activity :size="20" class="text-red" />
          </div>
          <div class="card-content">
            <div class="card-title-row">
              <span class="card-num">10</span>
              <h3 class="card-title">Status Booking</h3>
            </div>
            <p class="card-desc">Susun status booking, trigger otomatis, deadline, dan visibilitas tracking klien.</p>
          </div>
          <ChevronRight :size="16" class="card-chevron" />
        </a>

        <!-- 11 Tipe Acara -->
        <a href="#" class="setting-card">
          <div class="card-icon-wrap border-teal">
            <Tag :size="20" class="text-teal" />
          </div>
          <div class="card-content">
            <div class="card-title-row">
              <span class="card-num">11</span>
              <h3 class="card-title">Tipe Acara</h3>
            </div>
            <p class="card-desc">Atur tipe acara aktif, urutan tampil, dan tipe acara custom.</p>
          </div>
          <ChevronRight :size="16" class="card-chevron" />
        </a>

        <!-- 12 Integrasi -->
        <router-link to="/pengaturan?tab=google" class="setting-card">
          <div class="card-icon-wrap border-blue">
            <LinkIcon :size="20" class="text-blue-light" />
          </div>
          <div class="card-content">
            <div class="card-title-row">
              <span class="card-num">12</span>
              <h3 class="card-title">Integrasi</h3>
            </div>
            <p class="card-desc">Hubungkan Google, Fastpik, dan Bot Telegram untuk otomasi studio.</p>
          </div>
          <ChevronRight :size="16" class="card-chevron" />
        </router-link>
      </div>

      <!-- Tab Content: Umum -->
      <div v-else-if="currentTab === 'umum'" class="tab-content">
        <div class="tab-header">
          <router-link to="/pengaturan" class="back-link">
            <ArrowLeft :size="18" />
          </router-link>
          <div>
            <h2>Umum</h2>
            <p>Atur identitas studio, nomor WhatsApp, URL form booking, logo, dan alamat invoice.</p>
          </div>
        </div>
        
        <div class="settings-form-card">
          
          <!-- SECTION 1: Profil Vendor/Studio -->
          <div class="form-section">
            <div class="form-section-header">
              <div class="icon-wrap">
                <Building :size="18" />
              </div>
              <div>
                <h3>Profil Vendor/Studio</h3>
                <p>Informasi dasar vendor/studio Anda.</p>
              </div>
            </div>
            
            <div class="form-group-row">
              <div class="form-group flex-1">
                <label><User :size="14" /> Nama Vendor/Studio <span class="text-danger">*</span></label>
                <input type="text" 
                       :class="getInputClass('vendor_name')" 
                       id="tour-target-studio"
                       v-model="vendorName"
                       @input="clearError('vendor_name')"
                       placeholder="Misal: Memori Studio" />
                <span v-if="errors.vendor_name" class="error-text">{{ errors.vendor_name }}</span>
              </div>
              <div class="form-group flex-1">
                <label><Phone :size="14" /> Nomor WhatsApp Studio <span class="text-danger">*</span></label>
                <div class="input-group" :class="{ 'has-error': errors.phone_number }">
                  <span class="input-addon">ID +62</span>
                  <input type="text" :class="getInputClass('phone_number', 'form-control border-0')" :value="phoneNumber" @input="(e) => { handlePhoneInput(e); clearError('phone_number'); }" placeholder="812 3456 7890" />
                </div>
                <span v-if="errors.phone_number" class="error-text">{{ errors.phone_number }}</span>
              </div>
            </div>
            
            <div class="form-group mt-4">
              <label><Globe :size="14" /> Custom URL Form Booking</label>
              <input type="text" class="form-control" v-model="customUrl" placeholder="nama-vendor" />
              <p class="help-text">https://vender.id/id/formbooking/{{ customUrl || 'nama-vendor' }}</p>
              <a href="#" class="help-link mt-2 inline-flex items-center gap-1"><Globe :size="12" /> Mau hubungkan ke domain milikmu sendiri? Cek di sini ya!</a>
            </div>

            <div class="setting-toggle-row mt-6" style="opacity: 0.6; cursor: not-allowed;">
              <div class="setting-toggle-info" style="pointer-events: none;">
                <h4>Disable slug</h4>
                <p>Saat aktif, custom domain bisa akses form booking tanpa slug.</p>
                <p class="help-text mt-1">Domain utama selalu memakai URL dengan slug vendor.</p>
              </div>
              <div class="setting-toggle">
                <div class="switch mr-3" style="cursor: not-allowed;">
                  <input type="checkbox" v-model="disableSlug" disabled style="pointer-events: none;">
                  <span class="slider round" style="cursor: not-allowed; pointer-events: none;"></span>
                </div>
                <span style="cursor: not-allowed; pointer-events: none;">Disable slug</span>
              </div>
            </div>

          <hr class="section-divider" />

          <!-- SECTION 2: Logo Studio -->
          <div class="form-section">
            <div class="form-section-header">
              <div class="icon-wrap"><ImageIcon :size="18" /></div>
              <div>
                <h3>Logo Studio</h3>
                <p>Logo akan digunakan di invoice. Maks 500KB. Jika kosong, menggunakan nama studio.</p>
              </div>
            </div>
            
            <div class="orientation-selector mb-4">
              <span class="mr-3 text-sm text-gray-400">Orientasi:</span>
              <button class="btn-orientation" :class="{ 'active': logoOrientation === 'horizontal' }" @click="logoOrientation = 'horizontal'">Horizontal</button>
              <button class="btn-orientation" :class="{ 'active': logoOrientation === 'persegi' }" @click="logoOrientation = 'persegi'">Persegi</button>
            </div>
            
            <div v-if="uploadedLogoUrl" class="logo-preview-section mb-6">
              <p class="text-sm text-gray-400 mb-2">Preview:</p>
              <div class="logo-preview-box" :class="logoOrientation">
                <img :src="uploadedLogoUrl" alt="Logo Preview" />
              </div>
              <button class="btn-text-danger mt-3" @click="removeLogo">
                <Trash2 :size="14" class="mr-1" /> Hapus Logo
              </button>
            </div>
            
            <div class="upload-area" @click="triggerFileInput">
              <UploadCloud :size="24" class="text-gray-400 mb-2" />
              <p>{{ uploadedLogoUrl ? 'Klik untuk ganti logo' : 'Klik atau drag & drop gambar' }}</p>
              <span class="help-text">PNG, JPG - Maks 500KB</span>
              <input type="file" ref="fileInput" @change="handleFileSelect" style="display: none" accept="image/png, image/jpeg" />
            </div>
          </div>

          <hr class="section-divider" />

          <!-- SECTION 3: Alamat Studio (Invoice) -->
          <div class="form-section mb-6">
            <div class="form-group">
              <label><MapPin :size="14" /> Alamat Studio (Invoice)</label>
              <p class="help-text">Alamat ini akan tampil di bawah logo pada PDF invoice.</p>
              <textarea class="form-control w-full" rows="3" v-model="address" placeholder="Contoh: Jl. Mawar No. 10, Jakarta"></textarea>
            </div>
          </div>

          <hr class="section-divider" />

          <!-- SECTION 4: Jam Kerja -->
          <div class="form-section mb-6">
            <div class="setting-toggle-row">
              <div class="setting-toggle-info">
                <h4><Clock :size="16" class="mr-2 inline" /> Jam Kerja</h4>
                <p>Tampilkan jam kerja studio di invoice dan, bila diaktifkan, tutup form booking di luar jam kerja.</p>
              </div>
              <label class="toggle-wrap">
                <div class="switch mr-3">
                  <input type="checkbox" v-model="enableWorkingHours">
                  <span class="slider round"></span>
                </div>
                Tampilkan
              </label>
            </div>
            
            <div :class="{ 'opacity-50 pointer-events-none': !enableWorkingHours }">
              <div class="sub-setting-box mt-4">
                <label class="checkbox-label">
                  <input type="checkbox" class="custom-checkbox mr-3" v-model="closeBookingOutsideHours" :disabled="!enableWorkingHours" />
                  <div>
                    <h4>Tutup Form Booking di luar jam kerja</h4>
                    <p class="text-sm text-gray-400 m-0">Jika aktif, klien hanya bisa mengakses form booking pada hari dan jam yang dipilih.</p>
                  </div>
                </label>
              </div>
              
              <div class="working-days-list mt-4">
                <div class="day-row" v-for="day in workingDays" :key="day.name">
                  <label class="day-checkbox">
                    <input type="checkbox" class="custom-checkbox mr-3" v-model="day.active" :disabled="!enableWorkingHours" />
                    {{ day.name }}
                  </label>
                  <div class="day-times" :class="{ 'opacity-50': !day.active }">
                    <div class="time-input-group">
                      <label>Jam buka</label>
                      <input type="time" class="form-control" v-model="day.open" :disabled="!enableWorkingHours || !day.active" />
                    </div>
                    <div class="time-input-group">
                      <label>Jam tutup</label>
                      <input type="time" class="form-control" v-model="day.close" :disabled="!enableWorkingHours || !day.active" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sticky Bottom Bar -->
        <div class="sticky-action-bar">
          <button class="btn-primary" @click="saveSettings" :disabled="isSaving">
            <span v-if="isSaving">Menyimpan...</span>
            <span v-else><Save :size="16" class="mr-2 inline" /> Simpan</span>
          </button>
        </div>
      </div>
    </div>
    </div>
    
    <!-- Crop Modal -->
    <div v-if="showCropModal" class="crop-modal-overlay">
      <div class="crop-modal-card">
        <div class="crop-modal-header">
          <h3>Crop Logo ({{ logoOrientation === 'horizontal' ? 'Horizontal' : 'Persegi' }})</h3>
          <button class="close-btn" @click="cancelCrop"><X :size="18" /></button>
        </div>
        
        <div class="crop-modal-body">
            <div class="crop-container" :class="logoOrientation">
              <!-- Simulated crop area with image -->
              <img ref="imageElement" :src="tempImageUrl" class="crop-image" :style="{ transform: `scale(${zoomLevel / 50})` }" />
              <div class="crop-overlay"></div>
              <div ref="frameElement" class="crop-frame" 
                   :style="{ transform: `translate(${cropX}px, ${cropY}px)` }"
                   @mousedown="startDrag"
                   @touchstart.passive="startDrag">
              </div>
            </div>
          
          <div class="crop-zoom-control">
            <ZoomOut :size="16" class="text-gray-400" />
            <input type="range" v-model="zoomLevel" min="10" max="100" class="zoom-slider" />
            <ZoomIn :size="16" class="text-gray-400" />
          </div>
        </div>
        
        <div class="crop-modal-footer">
          <button class="btn-outline w-full" @click="cancelCrop"><X :size="14" class="mr-2" /> Batal</button>
          <button class="btn-white-solid w-full justify-center" @click="applyCrop"><Check :size="14" class="mr-2" /> Gunakan</button>
        </div>
      </div>
    </div>

      <!-- Tab Content: Google Integrasi -->
      <div v-else-if="currentTab === 'google'" class="tab-content">
        <div class="tab-header">
          <router-link to="/pengaturan" class="back-link">
            <ArrowLeft :size="18" />
          </router-link>
          <div>
            <h2 style="display:flex; align-items:center; gap:8px;">
              <span style="display:inline-flex; align-items:center; justify-content:center; width:24px; height:24px; border-radius:50%; background:white; color:black; font-size:14px; font-weight:900;">G</span> 
              Google
            </h2>
            <p>Hubungkan Google Calendar, Google Drive, dan Google Spreadsheet serta format otomatisnya.</p>
          </div>
        </div>
        
        <div class="settings-form-card">
          <div class="form-section">
            <div class="form-section-header">
              <h3><span style="color:#4285F4; font-weight:800; margin-right:4px;">G</span> Integrasi Google</h3>
              <p>Hubungkan akun Google untuk sinkronisasi kalender, penyimpanan file, dan auto export spreadsheet.</p>
            </div>
            
            <div style="display:flex; gap:24px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:12px; margin-bottom:24px; overflow-x:auto;">
              <div style="color:white; font-weight:600; font-size:14px; display:flex; align-items:center; gap:6px; cursor:pointer;">
                Google Calendar <X :size="14" style="color:#666;" />
              </div>
              <div style="color:#888; font-size:14px; display:flex; align-items:center; gap:6px; cursor:pointer;">
                Google Drive <X :size="14" style="color:#666;" />
              </div>
              <div style="color:#888; font-size:14px; display:flex; align-items:center; gap:6px; cursor:pointer;">
                Google Spreadsheet <X :size="14" style="color:#666;" />
              </div>
            </div>

            <div id="tour-target-google-calendar" style="background:#171717; border:1px solid rgba(255,255,255,0.05); border-radius:12px; padding:20px; margin-bottom:20px;">
              <div style="display:flex; align-items:center; gap:16px; margin-bottom:20px;">
                <div style="background:#4285F4; color:white; width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center;">
                  <span style="font-weight:700; font-size:20px;">31</span>
                </div>
                <div>
                  <h4 style="font-size:16px; font-weight:600; margin:0 0 4px 0; color:white;">Google Calendar</h4>
                  <p style="font-size:13px; color:#a0a0a0; margin:0;">Sinkronisasi jadwal sesi ke Google Calendar</p>
                </div>
              </div>
              <div style="border-top:1px solid rgba(255,255,255,0.05); padding-top:16px; display:flex; align-items:center; gap:8px;">
                <X :size="14" style="color:#a0a0a0;" />
                <span style="color:#a0a0a0; font-size:13px;">Belum terhubung</span>
              </div>
            </div>

            <div id="tour-target-google-drive" style="background:#171717; border:1px solid rgba(255,255,255,0.05); border-radius:12px; padding:20px;">
              <div style="display:flex; align-items:center; gap:16px; margin-bottom:20px;">
                <div style="background:#0F9D58; color:white; width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center;">
                  <HardDrive :size="24" />
                </div>
                <div>
                  <h4 style="font-size:16px; font-weight:600; margin:0 0 4px 0; color:white;">Google Drive</h4>
                  <p style="font-size:13px; color:#a0a0a0; margin:0;">Hubungkan akun Google Drive</p>
                </div>
              </div>
              <div style="border-top:1px solid rgba(255,255,255,0.05); padding-top:16px; display:flex; align-items:center; gap:8px;">
                <X :size="14" style="color:#a0a0a0;" />
                <span style="color:#a0a0a0; font-size:13px;">Belum terhubung</span>
              </div>
            </div>

          </div>

          <!-- Bottom Save Actions -->
          <div class="settings-actions">
            <button class="btn-primary" @click="saveSettings('google')">
              <Save :size="16" class="mr-2" /> Simpan
            </button>
            <button class="btn-text" style="margin-left: 1rem;">
              <RefreshCw :size="16" class="mr-2" /> Balik ke Default
            </button>
          </div>
        </div>
      </div>
      
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout.vue';
import { useFormValidation } from '../composables/useFormValidation';
import { useTour } from '../composables/useTour';
import { 
  ChevronRight, ArrowLeft, Building2, Smartphone, MonitorSmartphone, Store, Link as LinkIcon, Edit, Clock,
  LayoutTemplate, Settings as SettingsIcon, MessageCircle, Info, UploadCloud, X, Save, FileText, Image as ImageIcon,
  Calendar as CalendarIcon, HardDrive, Search, ArrowRight, User, HelpCircle, CheckCircle2, Phone, Globe,
  Maximize2, Search as SearchIcon, Check, ZoomIn, ZoomOut
} from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();

const currentTab = computed(() => route.query.tab);
const { isActive, currentStep, completeStep } = useTour();

// --- 1. Vendor Name & Custom URL Logic ---
const vendorName = ref('');
const customUrl = ref('');
const disableSlug = ref(false);
const phoneNumber = ref('');
const address = ref('');

const { errors, clearErrors, clearError, handleValidationErrors, isValidPhone, getInputClass } = useFormValidation();

// Auto-slugify customUrl when vendorName changes
watch(vendorName, (newVal) => {
  if (!disableSlug.value) {
    customUrl.value = newVal
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
});

// Re-evaluate slug if disableSlug changes
watch(disableSlug, (newVal) => {
  if (!newVal && vendorName.value) {
    customUrl.value = vendorName.value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
});

// --- 2. Country Code Logic (Removed) ---

// --- 3. Logo Upload & Crop Logic ---
const logoOrientation = ref('horizontal'); // 'horizontal' | 'persegi'
const uploadedLogoUrl = ref(null);
const showCropModal = ref(false);
const tempImageUrl = ref(null);
const fileInput = ref(null);
const zoomLevel = ref(50);

// --- Dragging Logic for Crop Frame ---
const cropX = ref(0);
const cropY = ref(0);
const isDragging = ref(false);
let startDragX = 0;
let startDragY = 0;

const startDrag = (e) => {
  isDragging.value = true;
  startDragX = e.clientX - cropX.value;
  startDragY = e.clientY - cropY.value;
  window.addEventListener('mousemove', onDrag);
  window.addEventListener('mouseup', stopDrag);
};

const onDrag = (e) => {
  if (!isDragging.value) return;
  cropX.value = e.clientX - startDragX;
  cropY.value = e.clientY - startDragY;
};

const stopDrag = () => {
  isDragging.value = false;
  window.removeEventListener('mousemove', onDrag);
  window.removeEventListener('mouseup', stopDrag);
};

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      tempImageUrl.value = e.target.result;
      showCropModal.value = true;
      zoomLevel.value = 50; // reset zoom
      cropX.value = 0; // reset drag
      cropY.value = 0;
    };
    reader.readAsDataURL(file);
  }
  // Reset input so same file can be selected again if needed
  event.target.value = '';
};

const imageElement = ref(null);
const frameElement = ref(null);

const applyCrop = () => {
  if (!imageElement.value || !frameElement.value) return;

  const img = imageElement.value;
  const frame = frameElement.value;
  
  // Get DOM bounding rects
  const imgRect = img.getBoundingClientRect();
  const frameRect = frame.getBoundingClientRect();

  // The img element has object-fit: contain.
  // This means the actual rendered pixels of the image don't necessarily fill imgRect.
  // We need to calculate the actual rendered bounds of the image inside imgRect.
  const fitScale = Math.min(imgRect.width / img.naturalWidth, imgRect.height / img.naturalHeight);
  
  const renderedWidth = img.naturalWidth * fitScale;
  const renderedHeight = img.naturalHeight * fitScale;
  const renderedLeft = imgRect.left + (imgRect.width - renderedWidth) / 2;
  const renderedTop = imgRect.top + (imgRect.height - renderedHeight) / 2;

  // Create canvas for output
  const canvas = document.createElement('canvas');
  const outputWidth = logoOrientation.value === 'horizontal' ? 800 : 400;
  const outputHeight = logoOrientation.value === 'horizontal' ? 450 : 400;
  canvas.width = outputWidth;
  canvas.height = outputHeight;
  const ctx = canvas.getContext('2d');

  // Calculate the scale from screen pixels to destination canvas pixels
  const destScale = outputWidth / frameRect.width;
  
  // Calculate destination coordinates and dimensions
  const destX = (renderedLeft - frameRect.left) * destScale;
  const destY = (renderedTop - frameRect.top) * destScale;
  const destWidth = renderedWidth * destScale;
  const destHeight = renderedHeight * destScale;
  
  // Fill with white background (optional, but good for logos with transparent backgrounds if converted to jpeg, 
  // but we are using PNG so we keep it transparent. Let's keep it transparent as intended).
  
  // Draw the image onto the canvas
  // By using the 5-argument drawImage, we avoid any clipping issues with negative source bounds!
  ctx.drawImage(img, destX, destY, destWidth, destHeight);

  const croppedDataUrl = canvas.toDataURL('image/png');

  uploadedLogoUrl.value = croppedDataUrl;
  showCropModal.value = false;
};

const removeLogo = () => {
  uploadedLogoUrl.value = null;
};

const cancelCrop = () => {
  showCropModal.value = false;
  tempImageUrl.value = null;
  cropX.value = 0;
  cropY.value = 0;
};

// --- 4. Working Hours Logic ---
const enableWorkingHours = ref(false);
const closeBookingOutsideHours = ref(false);
const workingDays = ref([
  { name: 'Senin', active: false, open: '09:00', close: '17:00' },
  { name: 'Selasa', active: false, open: '09:00', close: '17:00' },
  { name: 'Rabu', active: false, open: '09:00', close: '17:00' },
  { name: 'Kamis', active: false, open: '09:00', close: '17:00' },
  { name: 'Jumat', active: false, open: '09:00', close: '17:00' },
  { name: 'Sabtu', active: false, open: '09:00', close: '17:00' },
  { name: 'Minggu', active: false, open: '09:00', close: '17:00' }
]);

// --- 5. Save & Fetch Logic ---
const showToast = ref(false);
const isSaving = ref(false);

const fetchSettings = async () => {
  try {
    const response = await axios.get('/api/settings');
    if (response.data) {
      const data = response.data;
      vendorName.value = data.vendor_name || '';
      customUrl.value = data.custom_url || '';
      
      // Country code is now hardcoded to 'ID' for +62
      // so we don't need to load the country API or set selectedCountry
      
      phoneNumber.value = data.phone_number || '';
      disableSlug.value = data.disable_slug || false;
      uploadedLogoUrl.value = data.logo_url || null;
      address.value = data.address || '';
      enableWorkingHours.value = data.working_hours_enabled ?? true;
      closeBookingOutsideHours.value = data.close_booking_outside_hours || false;
      if (data.working_days) {
        workingDays.value = data.working_days;
      }
      
      if (vendorName.value) {
        completeStep('setup-studio');
      }
    }
  } catch (error) {
    console.error('Error fetching settings:', error);
  }
};


const handlePhoneInput = (e) => {
  let val = e.target.value;
  val = val.replace(/\D/g, '');
  if (val.startsWith('0')) {
    val = val.substring(1);
  } else if (val.startsWith('62')) {
    val = val.substring(2);
  }
  phoneNumber.value = val;
  e.target.value = val;
};

const saveSettings = async () => {
  if (isSaving.value) return;

  // Cleanup phone number just in case
  if (phoneNumber.value) {
    let cleaned = phoneNumber.value.replace(/\s+/g, '');
    if (cleaned.startsWith('0')) cleaned = cleaned.substring(1);
    else if (cleaned.startsWith('+62')) cleaned = cleaned.substring(3);
    else if (cleaned.startsWith('62')) cleaned = cleaned.substring(2);
    phoneNumber.value = cleaned;
  }

  let hasError = false;
  
  if (!vendorName.value.trim()) {
    errors.value.vendor_name = 'Nama vendor harus diisi';
    hasError = true;
  }
  
  if (!phoneNumber.value.trim()) {
    errors.value.phone_number = 'Nomor telepon harus diisi';
    hasError = true;
  } else if (!isValidPhone(phoneNumber.value)) {
    errors.value.phone_number = 'Format nomor telepon tidak valid';
    hasError = true;
  }
  
  if (hasError) return;

  isSaving.value = true;
  try {
    await axios.post('/api/settings', {
      vendor_name: vendorName.value,
      custom_url: customUrl.value,
      phone_country_code: 'ID',
      phone_number: phoneNumber.value,
      disable_slug: disableSlug.value,
      logo_url: uploadedLogoUrl.value,
      address: address.value,
      working_hours_enabled: enableWorkingHours.value,
      close_booking_outside_hours: closeBookingOutsideHours.value,
      working_days: workingDays.value,
    });
    
    // Show toast and redirect
    showToast.value = true;
    completeStep('setup-studio');
    setTimeout(() => {
      showToast.value = false;
      router.push('/dashboard');
    }, 1000);
    completeStep('setup-profile');
  } catch (error) {
    console.error('Failed to save settings:', error);
    if (!handleValidationErrors(error)) {
      alert('Gagal menyimpan pengaturan.');
    }
  } finally {
    isSaving.value = false;
  }
};

onMounted(() => {
  fetchSettings();
});
</script>

<style scoped>
.pengaturan-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 100%;
}

/* Header */
.page-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.breadcrumb {
  font-size: 0.75rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.5rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: #fff;
}

.page-subtitle {
  font-size: 0.85rem;
  color: #a0a0a0;
  margin: 0;
}

.text-danger {
  color: #ef4444;
}

.error-msg {
  font-size: 0.75rem;
  color: #ef4444;
  margin-top: 0.25rem;
  display: block;
}

.form-control.has-error {
  border-color: #ef4444;
}

.input-group.has-error {
  border-color: #ef4444;
}

.border-0 {
  border: none !important;
}

/* Settings Grid */
.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

@media (max-width: 768px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
}

.setting-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.25rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.setting-card:hover {
  background-color: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.2);
}

.card-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.card-title-row {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.card-num {
  font-size: 0.75rem;
  color: #888;
}

.card-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.card-desc {
  font-size: 0.8rem;
  color: #888;
  margin: 0;
  line-height: 1.4;
  padding-right: 1rem;
}

.card-chevron {
  color: #888;
  flex-shrink: 0;
}

.setting-card:hover .card-chevron {
  color: #fff;
}

/* Icon Colors */
.bg-purple-dark { background-color: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.2); }
.bg-blue-dark { background-color: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2); }

.border-green { background-color: transparent; border: 1px solid rgba(16, 185, 129, 0.3); }
.border-purple { background-color: transparent; border: 1px solid rgba(168, 85, 247, 0.3); }
.border-yellow { background-color: transparent; border: 1px solid rgba(234, 179, 8, 0.3); }
.border-red { background-color: transparent; border: 1px solid rgba(239, 68, 68, 0.3); }
.border-teal { background-color: transparent; border: 1px solid rgba(20, 184, 166, 0.3); }
.border-blue { background-color: transparent; border: 1px solid rgba(59, 130, 246, 0.3); }

.text-purple { color: #a78bfa; }
.text-purple-light { color: #c084fc; }
.text-blue { color: #60a5fa; }
.text-blue-light { color: #93c5fd; }
.text-green { color: #34d399; }
.text-yellow { color: #facc15; }
.text-red { color: #f87171; }
.text-teal { color: #2dd4bf; }

/* Light Theme Adjustments */
:root[data-theme="light"] .breadcrumb,
:root[data-theme="light"] .page-title,
:root[data-theme="light"] .card-title {
  color: #111827;
}

:root[data-theme="light"] .setting-card {
  border-color: #e5e7eb;
}

:root[data-theme="light"] .setting-card:hover {
  background-color: #f9fafb;
  border-color: #d1d5db;
}

:root[data-theme="light"] .setting-card:hover .card-chevron {
  color: #111827;
}

/* Tab Content Styles */
.tab-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.tab-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.back-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  color: #fff;
  text-decoration: none;
  transition: background-color 0.2s;
  margin-top: 2px;
}

.back-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.tab-header h2 {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  color: #fff;
}

.tab-header p {
  font-size: 0.85rem;
  color: #a0a0a0;
  margin: 0;
}

.settings-form-card {
  background-color: #0f0f0f;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
}

.form-section-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.icon-wrap {
  color: #888;
}

.form-section-header h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 0.25rem 0;
}

.form-section-header p {
  font-size: 0.85rem;
  color: #a0a0a0;
  margin: 0;
}

.form-group-row {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.flex-1 {
  flex: 1;
  min-width: 250px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #d1d5db;
}

.form-control {
  background-color: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 0.75rem 1rem;
  color: #fff;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s;
}

.form-control:focus {
  border-color: rgba(255, 255, 255, 0.3);
}

.input-group {
  display: flex;
  align-items: center;
}

.input-addon {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-right: none;
  padding: 0.75rem 1rem;
  color: #a0a0a0;
  font-size: 0.85rem;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.input-group .form-control {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  flex: 1;
}

.help-text {
  font-size: 0.75rem;
  color: #a0a0a0;
  margin: 0;
}

.mt-4 {
  margin-top: 1rem;
}

/* Form Layout Additions */
.help-link {
  font-size: 0.75rem;
  color: #60a5fa;
  text-decoration: none;
}
.help-link:hover {
  text-decoration: underline;
}
.inline-flex { display: inline-flex; }
.items-center { align-items: center; }
.flex-between { display: flex; justify-content: space-between; align-items: center; }
.flex-row { display: flex; flex-direction: row; }
.gap-1 { gap: 0.25rem; }
.gap-3 { gap: 0.75rem; }
.gap-4 { gap: 1rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-6 { margin-top: 1.5rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 0.75rem; }
.mb-4 { margin-bottom: 1rem; }
.ml-2 { margin-left: 0.5rem; }
.ml-3 { margin-left: 0.75rem; }
.mr-2 { margin-right: 0.5rem; }
.mr-3 { margin-right: 0.75rem; }
.w-full { width: 100%; }
.opacity-50 { opacity: 0.5; }
.pointer-events-none { pointer-events: none; }
.font-medium { font-weight: 500; }
.text-xs { font-size: 0.75rem; }
.text-sm { font-size: 0.85rem; }
.text-gray-400 { color: #9ca3af; }
.text-gray-500 { color: #6b7280; }

.section-divider {
  border: 0;
  border-top: 1px dashed rgba(255, 255, 255, 0.1);
  margin: 2rem 0;
}

/* Toggle Switch */
.setting-toggle-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1rem 1.25rem;
  border-radius: 8px;
}
.setting-toggle-info h4 { margin: 0 0 0.25rem 0; font-size: 0.95rem; color: #fff; }
.setting-toggle-info p { margin: 0; font-size: 0.85rem; color: #a0a0a0; }

.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}
.switch input { opacity: 0; width: 0; height: 0; }
.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #333;
  transition: .2s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .2s;
}
input:checked + .slider {
  background-color: #a855f7;
}
input:checked + .slider:before {
  transform: translateX(20px);
}
.slider.round { border-radius: 24px; }
.slider.round:before { border-radius: 50%; }
.toggle-wrap { display: flex; align-items: center; color: #fff; }

.error-input {
  border-color: #ef4444 !important;
}

.error-text {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: block;
}

/* Orientation Selector */
.btn-orientation {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #a0a0a0;
  padding: 0.4rem 1rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-orientation:first-of-type { border-top-left-radius: 20px; border-bottom-left-radius: 20px; border-right: none; }
.btn-orientation:last-of-type { border-top-right-radius: 20px; border-bottom-right-radius: 20px; }
.btn-orientation.active {
  background-color: #fff;
  color: #000;
  border-color: #fff;
  font-weight: 500;
}

/* Upload Area */
.upload-area {
  border: 1px dashed rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.02);
  cursor: pointer;
  transition: background-color 0.2s;
}
.upload-area:hover { background-color: rgba(255, 255, 255, 0.05); }
.upload-area p { margin: 0 0 0.25rem 0; color: #d1d5db; font-size: 0.9rem; }

/* Sub Setting Box */
.sub-setting-box {
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem 1.25rem;
}
.checkbox-label {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
}
.custom-checkbox {
  width: 18px;
  height: 18px;
  margin-top: 2px;
  accent-color: #a855f7;
  cursor: pointer;
}
.sub-setting-box h4 { margin: 0 0 0.25rem 0; font-size: 0.9rem; color: #fff; }

/* Working Days List */
.working-days-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.day-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
}
.day-checkbox {
  display: flex;
  align-items: center;
  color: #fff;
  width: 150px;
}
.day-times {
  display: flex;
  gap: 1.5rem;
  flex: 1;
}
.time-input-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}
.time-input-group label {
  font-size: 0.75rem;
  color: #888;
}

/* Bottom Action Bar */
.bottom-action-bar {
  background-color: #0f0f0f;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  z-index: 100;
}

.toast-notification {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  background-color: #f0fdf4;
  color: #166534;
  border: 1px solid #bbf7d0;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  font-weight: 500;
  font-size: 0.9rem;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s ease;
}
.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px) translateX(20px);
}

.text-green-500 { color: #22c55e; }
.hover\:text-white:hover { color: #ffffff; }

/* Custom Checkbox */
.custom-checkbox {
  width: 18px;
  height: 18px;
  margin-top: 2px;
  accent-color: #a855f7;
  cursor: pointer;
}

.btn-white-solid {
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: opacity 0.2s;
}
.btn-white-solid:hover { opacity: 0.9; }

/* Country Dropdown Logic Removed */

/* Logo Preview */
.logo-preview-box {
  background-color: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-preview-box.horizontal {
  width: 200px;
  height: 100px;
}
.logo-preview-box.persegi {
  width: 120px;
  height: 120px;
}
.logo-preview-box img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
.btn-text-danger {
  background: transparent;
  border: none;
  color: #ef4444;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0;
}
.btn-text-danger:hover {
  text-decoration: underline;
}

/* Crop Modal */
.crop-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.crop-modal-card {
  background-color: #111111;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  width: 450px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
}
.crop-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.crop-modal-header h3 {
  margin: 0;
  font-size: 1rem;
  color: #fff;
}
.crop-modal-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}
.crop-container {
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 250px;
  background-color: #000;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.crop-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.1s;
  pointer-events: none;
}
.crop-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0,0,0,0.5);
  pointer-events: none;
}
.crop-frame {
  position: absolute;
  border: 2px solid rgba(255,255,255,0.8);
  box-shadow: 0 0 0 9999px rgba(0,0,0,0.5);
  cursor: move;
  pointer-events: auto;
  /* Center it initially before transform translate kicks in */
  top: 50%;
  left: 50%;
  margin-left: auto;
  margin-top: auto;
}
.crop-container.horizontal .crop-frame {
  width: 90%; 
  height: auto;
  aspect-ratio: 16 / 9;
  /* adjust for top/left 50% */
  transform: translate(-50%, -50%); /* This will be overridden by inline style, so we must rely on translate in JS or adjust JS logic. 
  Actually, let's just use flexbox to center it or negative margins. */
  margin-left: -45%;
  margin-top: calc(-45% * 9 / 16);
}
.crop-container.persegi .crop-frame {
  height: 90%; 
  width: auto;
  aspect-ratio: 1 / 1;
  margin-top: -112.5px; /* (250 * 0.9 / 2) */
  margin-left: -112.5px;
}
.crop-zoom-control {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 80%;
}
.zoom-slider {
  flex: 1;
  accent-color: #fff;
}
.crop-modal-footer {
  display: flex;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}
.btn-outline {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.btn-outline:hover {
  background-color: rgba(255, 255, 255, 0.05);
}
.justify-center { justify-content: center; }
.rotate-90 { transform: rotate(90deg); transition: transform 0.2s; }

/* Light Theme overrides */
:root[data-theme="light"] .tab-header h2,
:root[data-theme="light"] .form-section-header h3,
:root[data-theme="light"] .setting-toggle-info h4,
:root[data-theme="light"] .sub-setting-box h4 {
  color: #111827;
}

:root[data-theme="light"] .settings-form-card,
:root[data-theme="light"] .bottom-action-bar {
  background-color: #ffffff;
  border-color: #e5e7eb;
}

:root[data-theme="light"] .setting-toggle-row,
:root[data-theme="light"] .upload-area,
:root[data-theme="light"] .sub-setting-box,
:root[data-theme="light"] .day-row {
  background-color: #f9fafb;
  border-color: #e5e7eb;
}

:root[data-theme="light"] .btn-orientation { color: #6b7280; border-color: #d1d5db; }
:root[data-theme="light"] .btn-orientation.active { background-color: #111827; color: #fff; border-color: #111827; }

:root[data-theme="light"] .form-control {
  background-color: #ffffff;
  border-color: #d1d5db;
  color: #111827;
}

:root[data-theme="light"] .input-addon {
  background-color: #f3f4f6;
  border-color: #d1d5db;
  color: #6b7280;
}

:root[data-theme="light"] .form-group label,
:root[data-theme="light"] .day-checkbox,
:root[data-theme="light"] .toggle-wrap {
  color: #4b5563;
}

:root[data-theme="light"] .btn-white-solid {
  background-color: #111827;
  color: #ffffff;
}
:root[data-theme="light"] .section-divider {
  border-top-color: #e5e7eb;
}
</style>
