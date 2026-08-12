<template>
  <DashboardLayout>
    <div class="services-page">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">Layanan & Paket</h1>
          <p class="page-subtitle">Kelola katalog layanan dan harga yang ditawarkan ke klien.</p>
        </div>
        
        <div class="header-actions">
          <button class="btn-outline">
            <ArrowUpDown :size="16" />
            Atur Urutan
          </button>
          <button class="btn-outline">
            <Settings2 :size="16" />
            Kelola
          </button>
          <button class="btn-primary" @click="openModal" id="tour-target-add-service">
            <Plus :size="16" />
            Tambah Layanan
          </button>
        </div>
      </div>

      <!-- Toast Notification -->
      <transition name="toast-fade">
        <div v-if="showToast" class="toast-notification">
          <CheckCircle2 :size="18" class="mr-2 text-emerald-600" />
          <span>{{ toastMessage }}</span>
          <button @click="showToast = false" class="ml-auto"><X :size="16" /></button>
        </div>
      </transition>

      <!-- Empty State Card -->
      <div v-if="services.length === 0 && !isLoadingServices" class="empty-state-card">
        <div class="empty-state-content">
          <div class="icon-container">
            <Package :size="48" class="text-gray" stroke-width="1.5" />
          </div>
          <h2 class="empty-title">Belum ada layanan</h2>
          <p class="empty-subtitle">Klik "Tambah Layanan" untuk membuat layanan pertama Anda.</p>
        </div>
      </div>

      <!-- Services List -->
      <div v-else class="services-list mt-6">
        
        <!-- Search and Filter (Matching reference image) -->
        <div class="search-filter-row">
          <div class="search-input-wrapper">
            <Search :size="18" class="search-icon" />
            <input type="text" class="search-input" placeholder="Cari nama atau deskripsi layanan..." v-model="serviceSearch" />
          </div>
          <div class="filter-dropdown">
            <select class="filter-select" v-model="serviceFilter">
              <option value="all">Semua</option>
              <option value="active">Aktif</option>
              <option value="inactive">Nonaktif</option>
            </select>
          </div>
        </div>
        
        <hr class="section-divider" />

        <div class="service-category mb-8">
          <h2 class="category-title">Paket Utama <span class="badge">{{ paketUtama.length }}</span></h2>
          <p class="category-subtitle">Paket utama tampil sebagai pilihan inti di form booking publik.</p>
          <div class="cards-grid">
            <div v-for="(svc, index) in paketUtama" :key="svc.id" class="service-card-new">
              <div class="sc-header">
                <h3 class="sc-title">
                  {{ formatTitleCase(svc.nama_layanan) }}
                  <span v-if="svc.warna_paket" class="sc-color-dot" :style="{ backgroundColor: svc.warna_paket }"></span>
                </h3>
                <div class="sc-badges-top">
                  <span v-if="svc.is_active" class="sc-badge sc-badge-active">Aktif</span>
                  <span v-else class="sc-badge sc-badge-inactive">Nonaktif</span>
                  <span v-if="svc.tampilkan_publik" class="sc-badge sc-badge-public">Publik</span>
                  <span v-else class="sc-badge sc-badge-private">Privat</span>
                </div>
              </div>
              
              <div class="sc-body">
                <p v-if="svc.deskripsi" class="sc-desc">{{ svc.deskripsi }}</p>
                <div class="sc-tags">
                  <span v-for="tipe in svc.tipe_acara" :key="tipe" class="sc-tag sc-tag-event">{{ formatTitleCase(tipe) }}</span>
                  <span class="sc-tag sc-tag-city">
                    {{ (!svc.kota || svc.kota.length === 0) ? 'Semua Kota/Kabupaten' : svc.kota.join(', ') }}
                  </span>
                </div>
                
                <div class="sc-price-row">
                  <span class="sc-price-main">Rp {{ svc.harga }}</span>
                  <span v-if="svc.harga_coret" class="sc-price-strike">Rp {{ svc.harga_coret }}</span>
                </div>
                
                <div class="sc-duration">
                  <span v-if="svc.durasi_kuota" class="sc-dur-item"><Clock :size="14" /> {{ svc.durasi_kuota }}</span>
                  <span v-if="svc.jumlah_edit" class="sc-dur-item">{{ svc.jumlah_edit }} edit foto</span>
                </div>
                
                <div v-if="svc.biaya_operasional && svc.biaya_operasional.length > 0" class="sc-operational">
                  Biaya operasional default: <strong>Rp {{ svc.biaya_operasional[0].nominal }}</strong>
                </div>
              </div>
              
              <div class="sc-actions">
                <button class="sc-btn sc-btn-edit" @click="editService(svc)"><Edit2 :size="16" /> <span>Edit</span></button>
                <button class="sc-btn-icon" :class="svc.is_active ? 'sc-icon-active' : 'sc-icon-inactive'" @click="toggleActive(svc)" title="Toggle Aktif/Nonaktif">
                  <ToggleRight v-if="svc.is_active" :size="18" />
                  <ToggleLeft v-else :size="18" />
                </button>
                <button class="sc-btn-icon sc-icon-public" @click="togglePublic(svc)" title="Toggle Publik/Privat">
                  <Eye v-if="svc.tampilkan_publik" :size="18" />
                  <EyeOff v-else :size="18" />
                </button>
                <button class="sc-btn-icon sc-icon-duplicate" @click="confirmDuplicate(svc)" title="Duplikat Layanan"><Copy :size="18" /></button>
                <button class="sc-btn-icon sc-icon-delete" @click="confirmDelete(svc)" title="Hapus Layanan"><Trash2 :size="18" /></button>
                <div class="sc-spacer"></div>
                <button class="sc-btn-icon sc-icon-move" @click="moveServiceUp('utama', index)"><ArrowUp :size="18" /></button>
                <button class="sc-btn-icon sc-icon-move" @click="moveServiceDown('utama', index)"><ArrowDown :size="18" /></button>
              </div>
            </div>
          </div>
        </div>
        
        <hr class="section-divider" />

        <div class="service-category mb-8">
          <h2 class="category-title">Paket Add-on <span class="badge">{{ addon.length }}</span></h2>
          <p class="category-subtitle">Paket tambahan tampil terpisah agar klien bisa menambah opsi ekstra saat booking.</p>
          
          <div v-if="addon.length === 0" class="empty-state-card-new">
            <div class="empty-state-content-new">
              <h3>Belum ada paket add-on</h3>
              <p>Tambahkan add-on jika Anda ingin menawarkan paket tambahan terpisah.</p>
            </div>
          </div>
          
          <div v-else class="cards-grid">
            <div v-for="(svc, index) in addon" :key="svc.id" class="service-card-new">
              <div class="sc-header">
                <h3 class="sc-title">
                  {{ formatTitleCase(svc.nama_layanan) }}
                  <span v-if="svc.warna_paket" class="sc-color-dot" :style="{ backgroundColor: svc.warna_paket }"></span>
                </h3>
                <div class="sc-badges-top">
                  <span v-if="svc.is_active" class="sc-badge sc-badge-active">Aktif</span>
                  <span v-else class="sc-badge sc-badge-inactive">Nonaktif</span>
                  <span v-if="svc.tampilkan_publik" class="sc-badge sc-badge-public">Publik</span>
                  <span v-else class="sc-badge sc-badge-private">Privat</span>
                </div>
              </div>
              
              <div class="sc-body">
                <p v-if="svc.deskripsi" class="sc-desc">{{ svc.deskripsi }}</p>
                <div class="sc-tags">
                  <span v-for="tipe in svc.tipe_acara" :key="tipe" class="sc-tag sc-tag-event">{{ formatTitleCase(tipe) }}</span>
                  <span class="sc-tag sc-tag-city">
                    {{ (!svc.kota || svc.kota.length === 0) ? 'Semua Kota/Kabupaten' : svc.kota.join(', ') }}
                  </span>
                </div>
                
                <div class="sc-price-row">
                  <span class="sc-price-main">Rp {{ svc.harga }}</span>
                  <span v-if="svc.harga_coret" class="sc-price-strike">Rp {{ svc.harga_coret }}</span>
                </div>
                
                <div class="sc-duration">
                  <span v-if="svc.durasi_kuota" class="sc-dur-item"><Clock :size="14" /> {{ svc.durasi_kuota }}</span>
                  <span v-if="svc.jumlah_edit" class="sc-dur-item">{{ svc.jumlah_edit }} edit foto</span>
                </div>
                
                <div v-if="svc.biaya_operasional && svc.biaya_operasional.length > 0" class="sc-operational">
                  Biaya operasional default: <strong>Rp {{ svc.biaya_operasional[0].nominal }}</strong>
                </div>
              </div>
              
              <div class="sc-actions">
                <button class="sc-btn sc-btn-edit" @click="editService(svc)"><Edit2 :size="16" /> <span>Edit</span></button>
                <button class="sc-btn-icon" :class="svc.is_active ? 'sc-icon-active' : 'sc-icon-inactive'" @click="toggleActive(svc)" title="Toggle Aktif/Nonaktif">
                  <ToggleRight v-if="svc.is_active" :size="18" />
                  <ToggleLeft v-else :size="18" />
                </button>
                <button class="sc-btn-icon sc-icon-public" @click="togglePublic(svc)" title="Toggle Publik/Privat">
                  <Eye v-if="svc.tampilkan_publik" :size="18" />
                  <EyeOff v-else :size="18" />
                </button>
                <button class="sc-btn-icon sc-icon-duplicate" @click="confirmDuplicate(svc)" title="Duplikat Layanan"><Copy :size="18" /></button>
                <button class="sc-btn-icon sc-icon-delete" @click="confirmDelete(svc)" title="Hapus Layanan"><Trash2 :size="18" /></button>
                <div class="sc-spacer"></div>
                <button class="sc-btn-icon sc-icon-move" @click="moveServiceUp('addon', index)"><ArrowUp :size="18" /></button>
                <button class="sc-btn-icon sc-icon-move" @click="moveServiceDown('addon', index)"><ArrowDown :size="18" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Service Modal -->
      <div v-if="showAddModal" class="modal-overlay" @click="closeModal">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <div>
              <h3>Tambah Layanan Baru</h3>
              <p>Masukkan detail layanan yang Anda tawarkan kepada klien.</p>
            </div>
            <button class="close-btn" @click="closeModal"><X :size="18" /></button>
          </div>
          
          <div class="modal-body scrollable">
            <div class="form-group mb-4">
              <label>Jenis Layanan</label>
              <select class="form-control" v-model="form.jenisLayanan">
                <option value="paket">Paket</option>
                <option value="addon">Add-on</option>
              </select>
            </div>
            
            <div class="form-group mb-4">
              <label>Nama Layanan</label>
              <input type="text" class="form-control" v-model="form.namaLayanan" placeholder="e.g.: Wedding Photography" />
            </div>
            
            <div class="form-group mb-4">
              <label>Deskripsi</label>
              <textarea class="form-control" rows="3" v-model="form.deskripsi" placeholder="Deskripsi singkat layanan..."></textarea>
            </div>
            
            <div class="form-group mb-4">
              <label>Warna Paket</label>
              <div class="color-picker-wrap">
                <input type="color" v-model="form.warnaPaket" class="color-input" />
                <input type="text" class="form-control color-text" v-model="form.warnaPaket" />
              </div>
            </div>
            
            <div class="form-group mb-4">
              <label>Harga (Rp)</label>
              <input type="text" class="form-control" v-model="form.harga" @input="form.harga = formatCurrency($event.target.value)" placeholder="2.500.000" />
            </div>
            
            <div class="form-group mb-4">
              <label>Harga Coret <span class="text-optional">(opsional)</span></label>
              <input type="text" class="form-control" v-model="form.hargaCoret" @input="form.hargaCoret = formatCurrency($event.target.value)" placeholder="3.500.000" />
            </div>
            
            <div class="form-group mb-4">
              <label>Durasi</label>
              <div class="duration-wrap">
                <input type="number" class="form-control w-24" v-model="form.durasiJam" placeholder="2" />
                <span>Jam</span>
                <input type="number" class="form-control w-24" v-model="form.durasiMenit" placeholder="0" />
                <span>Menit</span>
              </div>
            </div>
            
            <div class="form-group mb-4">
              <label>Jumlah Edit Foto <span class="text-optional">(opsional)</span></label>
              <input type="number" class="form-control" v-model="form.jumlahEdit" placeholder="Contoh: 50" />
              <p class="help-text">Menimpa jumlah edit foto dari preset Fastpik/ClientDesk untuk project baru. Project yang sudah ada tidak ikut berubah otomatis.</p>
            </div>
            
            <div class="form-group mb-4">
              <label>Template Cetak Fastpik <span class="text-optional">(opsional)</span></label>
              <select class="form-control" v-model="form.templateCetak">
                <option value="">Tidak ada template cetak</option>
              </select>
              <p class="help-text">Fitur cetak Fastpik sedang nonaktif. Snapshot tetap dapat disimpan, tetapi override tidak diterapkan saat sync.</p>
            </div>
            
            <div class="checkbox-box mb-4">
              <label class="checkbox-label">
                <input type="checkbox" class="custom-checkbox" v-model="form.wajibPilihKuota" />
                <div class="checkbox-content">
                  <span class="checkbox-title">Wajib pilih semua kuota cetak</span>
                  <p class="checkbox-desc">Klien harus memenuhi setiap ukuran sebelum dapat mengonfirmasi di Fastpik.</p>
                </div>
              </label>
            </div>
            
            <div class="form-group mb-4">
              <label class="checkbox-label align-center">
                <input type="checkbox" class="custom-checkbox mr-2" v-model="form.tampilkanPublik" />
                <span class="font-bold">Tampilkan di form publik</span> <span class="text-optional ml-1">(jika mati, hanya bisa dipilih dari booking admin)</span>
              </label>
            </div>
            
            <div class="form-group mb-4">
              <label>Tipe Acara</label>
              <p class="help-text mb-2">Kosongkan jika paket ini untuk semua tipe acara.</p>
              <div class="event-types-grid">
                <label v-for="type in eventTypes" :key="type" class="checkbox-label type-label">
                  <input type="checkbox" class="custom-checkbox mr-2" :value="type" v-model="form.tipeAcara" />
                  {{ type }}
                </label>
              </div>
            </div>
            
            <div class="form-group mb-4 relative">
              <label>Kota / Kabupaten (Wisuda)</label>
              <p class="help-text mb-2">Berlaku untuk event Wisuda. Bisa pilih lebih dari satu. Kosongkan jika paket berlaku untuk semua kota/kabupaten.</p>
              
              <div class="relative">
                <div class="custom-dropdown-trigger mb-2" @click="showCityDropdown = true">
                  <span v-if="form.kota.length > 0">{{ form.kota.length }} kota / kabupaten dipilih</span>
                  <span v-else>Bebas semua kota / kabupaten</span>
                  <ChevronDown :size="16" class="text-gray" />
                </div>

                <!-- Custom Dropdown Panel -->
                <div v-if="showCityDropdown">
                  <div class="custom-dropdown-overlay" @click="showCityDropdown = false"></div>
                  <div class="custom-dropdown-panel" @click.stop>
                    <div class="panel-header">
                      <h4>Kota / Kabupaten</h4>
                      <button class="close-btn" @click="showCityDropdown = false"><X :size="16" /></button>
                    </div>
                    
                    <div class="panel-search">
                      <Search :size="16" class="search-icon" />
                      <input type="text" v-model="searchQuery" placeholder="Cari kota / kabupaten..." @input="filterCities" />
                    </div>
                    
                    <div class="panel-list">
                      <div v-if="isLoadingCities" class="panel-state-text">Memuat data kota se-Indonesia...</div>
                      <div v-else-if="filteredCities.length === 0" class="panel-state-text">Kota tidak ditemukan</div>
                      <label v-for="city in filteredCities" :key="city.id" class="city-item">
                        <span class="city-name">{{ city.name }}</span>
                        <input type="checkbox" class="custom-checkbox" :value="city.name" v-model="form.kota" />
                      </label>
                    </div>
                    
                    <div class="panel-footer" v-if="form.kota.length > 0">
                      <span class="footer-text">{{ form.kota.length }} kota / kabupaten dipilih.</span>
                      <button class="btn-text-reset" @click.stop="form.kota = []">Reset</button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Selected Cities Chips -->
              <div v-if="form.kota.length > 0" class="selected-cities-container mt-3 mb-3">
                <div v-for="city in form.kota" :key="city" class="city-chip">
                  <span>{{ city }}</span>
                  <button @click="removeCity(city)" class="chip-close"><X :size="14" /></button>
                </div>
              </div>

              <div class="flex-row gap-2 mt-2">
                <button class="btn-outline btn-sm"><Copy :size="14" class="mr-1" /> Copy Lokasi</button>
                <button class="btn-outline btn-sm"><ClipboardPaste :size="14" class="mr-1" /> Paste Lokasi</button>
              </div>
            </div>
            
            <div class="operational-cost-box mb-4">
              <div class="oc-header">
                <span class="font-bold">Biaya operasional default</span>
                <button class="btn-text-white" @click="addBiayaOperasional"><Plus :size="14" class="mr-1" /> Tambah Biaya</button>
              </div>
              <p class="help-text mb-3">Item ini akan otomatis masuk ke detail booking saat paket dipilih, lalu tetap bisa diedit di booking.</p>
              
              <div v-if="form.biayaOperasional.length === 0" class="oc-empty">
                Belum ada biaya operasional default.
              </div>
              
              <div v-else class="oc-list">
                <div v-for="(biaya, index) in form.biayaOperasional" :key="index" class="oc-item">
                  <div class="oc-field flex-1">
                    <label>Nama Biaya {{ index + 1 }}</label>
                    <input type="text" class="form-control" v-model="biaya.nama" placeholder="Contoh: Biaya cetak album" />
                  </div>
                  <div class="oc-field w-32">
                    <label>Nominal</label>
                    <input type="text" class="form-control" v-model="biaya.nominal" @input="biaya.nominal = formatCurrency($event.target.value)" placeholder="0" />
                  </div>
                  <button class="btn-delete-icon" @click="removeBiayaOperasional(index)">
                    <Trash2 :size="16" />
                  </button>
                </div>
              </div>
            </div>
            
          </div>
          
          <div class="modal-footer">
            <button class="btn-white-solid w-full justify-center" @click="saveService" :disabled="isSaving">
              <span v-if="isSaving">Menyimpan...</span>
              <template v-else>
                <Save :size="14" class="mr-2" /> Simpan Perubahan
              </template>
            </button>
          </div>
        </div>
      </div>

      <!-- Duplicate Confirmation Modal -->
      <div v-if="showDuplicateModal" class="modal-overlay" @click="showDuplicateModal = false">
        <div class="modal-container modal-sm" @click.stop>
          <div class="modal-header border-b-0 pb-0">
            <h3>Konfirmasi</h3>
            <button class="close-btn" @click="showDuplicateModal = false"><X :size="18" /></button>
          </div>
          <div class="modal-body">
            <p>Duplikat paket ini?</p>
          </div>
          <div class="modal-footer border-t-0 pt-0 flex justify-end gap-3 mt-4">
            <button class="btn-outline" @click="showDuplicateModal = false">Batal</button>
            <button class="btn-white-solid" @click="executeDuplicate" :disabled="isProcessing">
              {{ isProcessing ? 'Memproses...' : 'Duplikat' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteModal" class="modal-overlay" @click="showDeleteModal = false">
        <div class="modal-container modal-sm" @click.stop>
          <div class="modal-header border-b-0 pb-0">
            <h3>Konfirmasi</h3>
            <button class="close-btn" @click="showDeleteModal = false"><X :size="18" /></button>
          </div>
          <div class="modal-body">
            <p>Hapus layanan ini? Booking yang sudah terhubung akan kehilangan referensi layanan.</p>
          </div>
          <div class="modal-footer border-t-0 pt-0 flex justify-end gap-3 mt-4">
            <button class="btn-outline" @click="showDeleteModal = false">Batal</button>
            <button class="btn-danger-solid" @click="executeDelete" :disabled="isProcessing">
              {{ isProcessing ? 'Memproses...' : 'Hapus' }}
            </button>
          </div>
        </div>
      </div>

    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout.vue';
import { useTour } from '../composables/useTour';
import { 
  ArrowUpDown, Settings2, Plus, Package, X, Save, Copy, ClipboardPaste, Trash2, ChevronDown, Search, CheckCircle2, Edit2, Eye, EyeOff, ArrowUp, ArrowDown, Clock, ToggleRight, ToggleLeft
} from 'lucide-vue-next';

const { isActive, currentStep, completeStep } = useTour();

const showAddModal = ref(false);

const form = ref({
  jenisLayanan: 'paket',
  namaLayanan: '',
  deskripsi: '',
  warnaPaket: '#000000',
  harga: '',
  hargaCoret: '',
  durasiJam: '2',
  durasiMenit: '0',
  jumlahEdit: '',
  templateCetak: '',
  wajibPilihKuota: false,
  tampilkanPublik: true,
  isActive: true,
  tipeAcara: [],
  kota: [],
  biayaOperasional: []
});

const eventTypes = [
  'Umum', 'Wedding', 'Akad', 'Resepsi', 'Lamaran', 'Prewedding', 
  'Wisuda', 'Maternity', 'Newborn', 'Family', 'Komersil', 'Custom/Lainnya'
];

const openModal = () => {
  editingId.value = null;
  form.value = {
    jenisLayanan: 'paket',
    namaLayanan: '',
    deskripsi: '',
    warnaPaket: '#000000',
    harga: '',
    hargaCoret: '',
    durasiJam: '2',
    durasiMenit: '0',
    jumlahEdit: '',
    templateCetak: '',
    wajibPilihKuota: false,
    tampilkanPublik: true,
    isActive: true,
    tipeAcara: [],
    kota: [],
    biayaOperasional: []
  };
  showAddModal.value = true;
};

const closeModal = () => {
  showAddModal.value = false;
};

const addBiayaOperasional = () => {
  form.value.biayaOperasional.push({ nama: '', nominal: '' });
};

const removeBiayaOperasional = (index) => {
  form.value.biayaOperasional.splice(index, 1);
};

const formatCurrency = (value) => {
  if (!value) return '';
  // Hanya ambil karakter angka
  const numericString = value.toString().replace(/\D/g, '');
  if (!numericString) return '';
  // Format dengan titik sebagai pemisah ribuan
  return numericString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const showCityDropdown = ref(false);
const searchQuery = ref('');
const allCities = ref([]);
const filteredCities = ref([]);
const isLoadingCities = ref(false);

const formatTitleCase = (str) => {
  return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const fetchCities = async () => {
  isLoadingCities.value = true;
  try {
    const res = await axios.get('/data/regencies.json');
    allCities.value = res.data;
    filteredCities.value = allCities.value;
  } catch (err) {
    console.error("Gagal mengambil data kota:", err);
  } finally {
    isLoadingCities.value = false;
  }
};

const filterCities = () => {
  const q = searchQuery.value.toLowerCase();
  filteredCities.value = allCities.value.filter(c => c.name.toLowerCase().includes(q));
};

const removeCity = (cityName) => {
  form.value.kota = form.value.kota.filter(c => c !== cityName);
};

const services = ref([]);
const isLoadingServices = ref(true);
const isSaving = ref(false);
const showToast = ref(false);
const toastMessage = ref('Layanan berhasil disimpan.');
const editingId = ref(null);
const serviceSearch = ref('');
const serviceFilter = ref('all');

const showDuplicateModal = ref(false);
const showDeleteModal = ref(false);
const selectedService = ref(null);
const isProcessing = ref(false);

const paketUtama = computed(() => services.value.filter(s => s.jenis_layanan === 'paket'));
const addon = computed(() => services.value.filter(s => s.jenis_layanan === 'addon'));

const fetchServices = async () => {
  isLoadingServices.value = true;
  try {
    const res = await axios.get('/api/services');
    services.value = res.data;
    if (services.value.length > 0) {
      completeStep('add-service');
    }
  } catch (err) {
    console.error("Gagal memuat layanan:", err);
  } finally {
    isLoadingServices.value = false;
  }
};

const showSuccessToast = (msg) => {
  toastMessage.value = msg;
  showToast.value = true;
  setTimeout(() => showToast.value = false, 3000);
};

const saveService = async () => {
  if (!form.value.namaLayanan || !form.value.harga) return;
  
  isSaving.value = true;
  try {
    const payload = {
      jenis_layanan: form.value.jenisLayanan,
      nama_layanan: form.value.namaLayanan,
      deskripsi: form.value.deskripsi,
      warna_paket: form.value.warnaPaket,
      harga: form.value.harga,
      harga_coret: form.value.hargaCoret,
      durasi_kuota: form.value.durasiJam + ' jam ' + form.value.durasiMenit + ' menit',
      jumlah_edit: form.value.jumlahEdit,
      template_cetak: form.value.templateCetak,
      wajib_pilih_kuota: form.value.wajibPilihKuota,
      tampilkan_publik: form.value.tampilkanPublik,
      is_active: form.value.isActive,
      tipe_acara: form.value.tipeAcara,
      kota: form.value.kota,
      biaya_operasional: form.value.biayaOperasional,
    };
    
    if (editingId.value) {
      const res = await axios.put(`/api/services/${editingId.value}`, payload);
      const index = services.value.findIndex(s => s.id === editingId.value);
      if (index !== -1) services.value[index] = res.data;
      showSuccessToast('Layanan berhasil diperbarui.');
    } else {
      const res = await axios.post('/api/services', payload);
      services.value.unshift(res.data);
      showSuccessToast('Layanan berhasil disimpan.');
      completeStep('add-service');
    }
    
    closeModal();
  } catch (err) {
    console.error("Gagal menyimpan layanan:", err);
    let errorMsg = "Terjadi kesalahan.";
    if (err.response && err.response.data && err.response.data.message) {
      errorMsg = err.response.data.message;
    }
    alert("Gagal menyimpan layanan: " + errorMsg);
  } finally {
    isSaving.value = false;
  }
};

const moveServiceUp = (listName, index) => {
  const list = listName === 'utama' ? paketUtama.value : addon.value;
  if (index > 0) {
    const temp = list[index];
    list[index] = list[index - 1];
    list[index - 1] = temp;
  }
};

const moveServiceDown = (listName, index) => {
  const list = listName === 'utama' ? paketUtama.value : addon.value;
  if (index < list.length - 1) {
    const temp = list[index];
    list[index] = list[index + 1];
    list[index + 1] = temp;
  }
};

const toggleActive = async (svc) => {
  try {
    const res = await axios.put(`/api/services/${svc.id}`, { ...svc, is_active: !svc.is_active });
    const index = services.value.findIndex(s => s.id === svc.id);
    if (index !== -1) services.value[index].is_active = res.data.is_active;
  } catch (err) {
    console.error("Gagal update status:", err);
  }
};

const togglePublic = async (svc) => {
  try {
    const res = await axios.put(`/api/services/${svc.id}`, { ...svc, tampilkan_publik: !svc.tampilkan_publik });
    const index = services.value.findIndex(s => s.id === svc.id);
    if (index !== -1) services.value[index].tampilkan_publik = res.data.tampilkan_publik;
  } catch (err) {
    console.error("Gagal update visibilitas:", err);
  }
};

const editService = (svc) => {
  editingId.value = svc.id;
  form.value = {
    jenisLayanan: svc.jenis_layanan,
    namaLayanan: svc.nama_layanan,
    deskripsi: svc.deskripsi || '',
    warnaPaket: svc.warna_paket || '#000000',
    harga: svc.harga,
    hargaCoret: svc.harga_coret || '',
    durasiJam: svc.durasi_kuota ? svc.durasi_kuota.split(' jam ')[0] : '2',
    durasiMenit: svc.durasi_kuota ? (svc.durasi_kuota.split(' jam ')[1] || '0 menit').replace(' menit', '') : '0',
    jumlahEdit: svc.jumlah_edit || '',
    templateCetak: svc.template_cetak || '',
    wajibPilihKuota: svc.wajib_pilih_kuota,
    tampilkanPublik: svc.tampilkan_publik,
    isActive: svc.is_active,
    tipeAcara: svc.tipe_acara || [],
    kota: svc.kota || [],
    biayaOperasional: svc.biaya_operasional || []
  };
  showAddModal.value = true;
};

const confirmDuplicate = (svc) => {
  selectedService.value = svc;
  showDuplicateModal.value = true;
};

const executeDuplicate = async () => {
  if (!selectedService.value) return;
  isProcessing.value = true;
  try {
    const res = await axios.post(`/api/services/${selectedService.value.id}/duplicate`);
    services.value.unshift(res.data);
    showDuplicateModal.value = false;
    showSuccessToast('Layanan berhasil diduplikat.');
  } catch (err) {
    console.error("Gagal menduplikat:", err);
  } finally {
    isProcessing.value = false;
  }
};

const confirmDelete = (svc) => {
  selectedService.value = svc;
  showDeleteModal.value = true;
};

const executeDelete = async () => {
  if (!selectedService.value) return;
  isProcessing.value = true;
  try {
    await axios.delete(`/api/services/${selectedService.value.id}`);
    services.value = services.value.filter(s => s.id !== selectedService.value.id);
    showDeleteModal.value = false;
    showSuccessToast('Layanan berhasil dihapus.');
  } catch (err) {
    console.error("Gagal menghapus:", err);
  } finally {
    isProcessing.value = false;
  }
};

onMounted(() => {
  fetchCities();
  fetchServices();
});
</script>

<style scoped>
.services-page {
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
}

.btn-primary:hover {
  opacity: 0.9;
}

/* Empty State Card */
.empty-state-card {
  background-color: #0a0a0a;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 400px; /* Ensure it takes up enough space when empty */
}

.empty-state-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 400px;
}

.icon-container {
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.text-gray {
  color: #888;
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.5rem 0;
}

.empty-subtitle {
  font-size: 0.85rem;
  color: #888;
  margin: 0;
}

/* Light Theme Adjustments */
:root[data-theme="light"] .page-title,
:root[data-theme="light"] .empty-title {
  color: #111827;
}

:root[data-theme="light"] .btn-outline {
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

:root[data-theme="light"] .empty-state-card {
  background-color: #ffffff;
  border-color: #e5e7eb;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
}

.modal-container {
  background-color: #111111;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
}

.modal-header h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
}

.modal-header p {
  margin: 0;
  font-size: 0.85rem;
  color: #888;
}

.close-btn {
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  padding: 0.25rem;
}
.close-btn:hover { color: #fff; }

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}
.modal-body::-webkit-scrollbar {
  width: 6px;
}
.modal-body::-webkit-scrollbar-track {
  background: transparent;
}
.modal-body::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.modal-footer {
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0 0 12px 12px;
}

/* Form Styles */
.form-group {
  display: flex;
  flex-direction: column;
}
.form-group label {
  font-size: 0.85rem;
  font-weight: 500;
  color: #ddd;
  margin-bottom: 0.5rem;
}

.form-control {
  background-color: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 0.6rem 0.8rem;
  color: #fff;
  font-family: inherit;
  font-size: 0.9rem;
  transition: border-color 0.2s;
}
.form-control:focus {
  outline: none;
  border-color: #a855f7;
}
.form-control::placeholder {
  color: #555;
}

.text-optional {
  color: #888;
  font-weight: normal;
}
.help-text {
  font-size: 0.75rem;
  color: #888;
  margin: 0.25rem 0 0 0;
  line-height: 1.4;
}
.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 1rem; }
.mb-4 { margin-bottom: 1.25rem; }
.mr-1 { margin-right: 0.25rem; }
.mr-2 { margin-right: 0.5rem; }
.ml-1 { margin-left: 0.25rem; }
.w-24 { width: 4rem; }
.w-full { width: 100%; }
.font-bold { font-weight: 600; }
.flex-row { display: flex; align-items: center; }
.gap-2 { gap: 0.5rem; }
.justify-center { justify-content: center; }

/* Custom elements */
.color-picker-wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.color-input {
  -webkit-appearance: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 6px;
  padding: 0;
  background: none;
  cursor: pointer;
}
.color-input::-webkit-color-swatch-wrapper { padding: 0; }
.color-input::-webkit-color-swatch { border: none; border-radius: 5px; }
.color-text { width: 120px; }

.duration-wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #888;
  font-size: 0.9rem;
}

.checkbox-box {
  background-color: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
}
.checkbox-label {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
}
.checkbox-label.align-center {
  align-items: center;
}
.custom-checkbox {
  width: 16px;
  height: 16px;
  accent-color: #a855f7;
  margin-top: 3px;
  cursor: pointer;
}
.checkbox-label.align-center .custom-checkbox {
  margin-top: 0;
}
.checkbox-content {
  margin-left: 0.75rem;
}
.checkbox-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: #fff;
  display: block;
}
.checkbox-desc {
  font-size: 0.75rem;
  color: #888;
  margin: 0.25rem 0 0 0;
}

.event-types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.75rem;
}
.type-label {
  align-items: center;
  background-color: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  color: #ddd;
}
.type-label:hover { background-color: rgba(255,255,255,0.05); }
.type-label .custom-checkbox { margin-top: 0; }

.btn-sm { padding: 0.4rem 0.75rem; font-size: 0.8rem; }

.operational-cost-box {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
}
.oc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
  color: #fff;
}
.btn-text-white {
  background: none;
  border: none;
  color: #fff;
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}
.oc-empty {
  border: 1px dashed rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  padding: 1rem;
  text-align: center;
  color: #666;
  font-size: 0.85rem;
}

.oc-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.oc-item {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.02);
}
.oc-field {
  display: flex;
  flex-direction: column;
}
.oc-field label {
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 0.5rem;
}
.btn-delete-icon {
  background: none;
  border: none;
  color: #ef4444;
  padding: 0.6rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: background-color 0.2s;
}
.btn-delete-icon:hover {
  background-color: rgba(239, 68, 68, 0.1);
}
.flex-1 { flex: 1; }
.w-32 { width: 8rem; }

.btn-white-solid {
  display: flex;
  align-items: center;
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1.25rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
}
.btn-white-solid:hover { opacity: 0.9; }

/* Custom City Dropdown */
.relative { position: relative; }

.custom-dropdown-trigger {
  background-color: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 0.6rem 0.8rem;
  color: #fff;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: border-color 0.2s;
}
.custom-dropdown-trigger:hover {
  border-color: rgba(255, 255, 255, 0.2);
}

.custom-dropdown-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
  background-color: transparent;
}

.custom-dropdown-panel {
  position: absolute;
  top: calc(100% - 0.2rem);
  left: 0;
  right: 0;
  z-index: 1002;
  background-color: #111111;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  width: 100%;
  max-width: none;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
}

.custom-dropdown-panel .panel-header {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.custom-dropdown-panel .panel-header h4 {
  margin: 0;
  font-size: 0.9rem;
  color: #888;
}

.panel-search {
  padding: 0.75rem 1.25rem;
  position: relative;
  display: flex;
  align-items: center;
}
.panel-search .search-icon {
  position: absolute;
  left: 1.75rem;
  color: #888;
}
.panel-search input {
  width: 100%;
  background-color: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 0.6rem 0.8rem 0.6rem 2.5rem;
  color: #fff;
  font-size: 0.9rem;
}
.panel-search input:focus {
  outline: none;
  border-color: #a855f7;
}

.panel-list {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.panel-list::-webkit-scrollbar { width: 6px; }
.panel-list::-webkit-scrollbar-thumb { background-color: rgba(255, 255, 255, 0.1); border-radius: 3px; }

.panel-state-text {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 0.85rem;
}

.city-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.city-item:hover {
  background-color: rgba(255, 255, 255, 0.03);
}
.city-item .city-name {
  font-size: 0.9rem;
  color: #eee;
}
.city-item .custom-checkbox {
  margin: 0;
}

.panel-footer {
  padding: 0.75rem 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.panel-footer .footer-text {
  font-size: 0.8rem;
  color: #888;
}
.panel-footer .btn-text-reset {
  background: none;
  border: none;
  color: #888;
  font-size: 0.85rem;
  cursor: pointer;
  transition: color 0.2s;
}
.panel-footer .btn-text-reset:hover {
  color: #fff;
}

/* City Chips */
.selected-cities-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.city-chip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #eee;
  padding: 0.4rem 0.6rem 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
}
.city-chip .chip-close {
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: color 0.2s;
}
.city-chip .chip-close:hover {
  color: #ef4444;
}

/* Toast */
.toast-notification {
  position: fixed;
  top: 24px;
  right: 50%;
  transform: translateX(50%);
  background-color: #f0fdf4;
  color: #047857;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  border: 1px solid #6ee7b7;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  z-index: 1050;
  font-weight: 500;
  font-size: 0.95rem;
  min-width: 320px;
}
.toast-notification button {
  background: none;
  border: none;
  color: #047857;
  opacity: 0.7;
  cursor: pointer;
  padding: 0.2rem;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
}
.toast-notification button:hover { opacity: 1; }

.toast-fade-enter-active, .toast-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.toast-fade-enter-from, .toast-fade-leave-to {
  opacity: 0;
  transform: translate(50%, -30px);
}

/* Cards Grid */
.category-title {
  font-size: 1.1rem;
  color: #fff;
  font-weight: 600;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.category-title .badge {
  background-color: #333;
  color: #aaa;
  border-radius: 12px;
  padding: 0.1rem 0.6rem;
  font-size: 0.8rem;
}

.category-subtitle {
  color: #888;
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.search-filter-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.search-input-wrapper {
  position: relative;
  flex-grow: 1;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  background-color: #141414;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  color: #fff;
  font-size: 0.95rem;
  transition: all 0.2s;
}
.search-input:focus { outline: none; border-color: #3b82f6; }

.filter-select {
  padding: 0.75rem 2rem 0.75rem 1.25rem;
  background-color: #141414;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  color: #fff;
  font-size: 0.95rem;
  cursor: pointer;
  appearance: none;
  min-width: 120px;
}
.filter-select:focus { outline: none; border-color: #3b82f6; }

.section-divider {
  border: 0;
  height: 1px;
  background-color: #2a2a2a;
  margin: 2rem 0;
}

.cards-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.empty-state-card-new {
  margin-top: 1rem;
  border: 1px dashed rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  background-color: #141414;
  padding: 3rem 1.5rem;
  text-align: center;
}
.empty-state-content-new h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 0.5rem 0;
}
.empty-state-content-new p {
  font-size: 0.9rem;
  color: #9ca3af;
  margin: 0;
}

.service-card-new {
  background-color: #141414;
  border: 1px solid #2a2a2a;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 350px;
}

.sc-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.sc-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  line-height: 1.2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  word-break: break-word;
}

.sc-color-dot {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid #141414;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.1);
}

.sc-badges-top {
  display: flex;
  gap: 0.4rem;
}

.sc-badge {
  padding: 0.25rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}
.sc-badge-active { background: rgba(16, 185, 129, 0.1); color: #10b981; }
.sc-badge-inactive { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
.sc-badge-public { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
.sc-badge-private { background: rgba(156, 163, 175, 0.1); color: #9ca3af; }

.sc-body {
  margin-top: 0.5rem;
}

.sc-desc {
  color: #9ca3af;
  font-size: 0.95rem;
  margin: 0 0 1rem 0;
  white-space: pre-line;
}

.sc-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.sc-tag {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
}
.sc-tag-event {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: #60a5fa;
}
.sc-tag-city {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #9ca3af;
}

.sc-price-row {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}
.sc-price-main {
  font-size: 1.55rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;
  word-break: break-word;
}
.sc-price-strike {
  font-size: 1rem;
  color: #6b7280;
  text-decoration: line-through;
  text-decoration-color: rgba(255,255,255,0.2);
}

.sc-duration {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  color: #9ca3af;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}
.sc-dur-item {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-right: 0.5rem;
}

.sc-operational {
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  color: #9ca3af;
  font-size: 0.9rem;
  margin-bottom: 1.25rem;
}
.sc-operational strong {
  color: #ffffff;
  font-weight: 700;
}

.sc-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem;
  margin-top: auto;
  width: 100%;
}
.sc-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.35rem 0.6rem;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  background: transparent;
  transition: all 0.2s;
  flex-shrink: 0;
}
.sc-btn-edit {
  border: 1px solid rgba(59, 130, 246, 0.5);
  color: #60a5fa;
}
.sc-btn-edit:hover { background: rgba(59, 130, 246, 0.1); }

.sc-btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  cursor: pointer;
  background: transparent;
  transition: all 0.2s;
  flex-shrink: 0;
}
.sc-icon-active { border: 1px solid rgba(16, 185, 129, 0.5); color: #34d399; }
.sc-icon-active:hover { background: rgba(16, 185, 129, 0.1); }

.sc-icon-inactive { border: 1px solid rgba(239, 68, 68, 0.5); color: #f87171; }
.sc-icon-inactive:hover { background: rgba(239, 68, 68, 0.1); }

.sc-icon-public { border: 1px solid rgba(59, 130, 246, 0.5); color: #60a5fa; }
.sc-icon-public:hover { background: rgba(59, 130, 246, 0.1); }

.sc-icon-duplicate { border: 1px solid rgba(168, 85, 247, 0.5); color: #c084fc; }
.sc-icon-duplicate:hover { background: rgba(168, 85, 247, 0.1); }

.sc-icon-delete { border: 1px solid rgba(239, 68, 68, 0.5); color: #f87171; }
.sc-icon-delete:hover { background: rgba(239, 68, 68, 0.1); }

.sc-icon-move { border: 1px solid rgba(255, 255, 255, 0.15); color: #9ca3af; }
.sc-icon-move:hover { background: rgba(255, 255, 255, 0.05); color: #e5e7eb; }

.sc-spacer {
  display: none;
}
.btn-action {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #eee;
  font-size: 0.85rem;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  transition: background-color 0.2s;
}
.btn-action:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.btn-action-icon {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #aaa;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-action-icon:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #eee;
}
</style>
