<template>
  <DashboardLayout>
    <div class="booking-page">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">Daftar Booking</h1>
          <p class="page-subtitle">Kelola klien, jadwal, dan progres pekerjaan di sini.</p>
        </div>
        
        <div class="header-actions">
          <button class="btn-outline">
            <Download :size="16" />
            Export
          </button>
          <button class="btn-outline">
            <SlidersHorizontal :size="16" />
            Kelola kolom
          </button>
          <button class="btn-outline">
            <Zap :size="16" />
            Batch Import
          </button>
          <button class="btn-primary" @click="$router.push('/bookings/new')">
            <Plus :size="16" />
            Tambah Klien Baru
          </button>
        </div>
      </div>

      <!-- Search and Filter Row -->
      <div class="filter-row">
        <div class="search-container">
          <Search :size="16" class="search-icon" />
          <input type="text" placeholder="Cari klien, invoice, lokasi, akad/resepsi/sesi..." class="search-input" />
        </div>
        
        <button class="btn-outline">
          <ListFilter :size="16" />
          Filter
        </button>
        
        <div class="sort-container">
          <select class="sort-select">
            <option>Urutkan: Tanggal Booking Terbaru</option>
            <option>Urutkan: Tanggal Booking Terlama</option>
            <option>Urutkan: Nama Klien (A-Z)</option>
          </select>
        </div>
      </div>

      <!-- Tabs and Table Container -->
      <div class="table-card">
        <!-- Tabs -->
        <div class="tabs-header">
          <div class="tabs-left">
            <button class="tab-btn active">
              <Folder :size="16" />
              Aktif
            </button>
            <button class="tab-btn">
              <Archive :size="16" />
              Arsip
            </button>
          </div>
          <div class="tabs-right">
            <button class="btn-text">
              <Settings2 :size="16" />
              Kelola
            </button>
          </div>
        </div>

        <!-- Table -->
        <div id="tour-target-daftar-booking" class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>NO.</th>
                <th>NAMA KLIEN</th>
                <th>INVOICE</th>
                <th>TANGGAL BOOKING</th>
                <th>PAKET</th>
                <th>TANGGAL SESI</th>
                <th>JAM SESI</th>
                <th>LOKASI</th>
                <th>STATUS</th>
                <th>FREELANCE</th>
                <th>HARGA</th>
                <th>AKSI</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isLoading">
                <td colspan="12" class="empty-state">
                  <p>Memuat data...</p>
                </td>
              </tr>
              <tr v-else-if="bookings.length === 0">
                <td colspan="12" class="empty-state">
                  <p>Data tidak ditemukan.</p>
                </td>
              </tr>
              <tr v-else v-for="(booking, index) in bookings" :key="booking.id">
                <td>{{ index + 1 }}</td>
                <td>
                  <div style="font-weight: 600; color: #fff;">{{ booking.client_name }}</div>
                  <div style="font-size: 0.8rem; color: #a0a0a0;">{{ booking.client_whatsapp }}</div>
                </td>
                <td>
                  <span style="background: rgba(255,255,255,0.1); padding: 4px 8px; border-radius: 4px; font-family: monospace; font-size: 0.85rem;">{{ booking.invoice || '-' }}</span>
                </td>
                <td>{{ formatTanggal(booking.created_at) }}</td>
                <td>{{ formatPackageName(booking.selected_packages) }}</td>
                <td>{{ formatTanggal(booking.event_date) }}</td>
                <td>{{ booking.event_time || '-' }}</td>
                <td style="max-width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" :title="booking.event_location">
                  <MapPin :size="12" style="display: inline-block; vertical-align: middle; margin-right: 2px;" v-if="booking.event_location" />
                  {{ booking.event_location || '-' }}
                </td>
                <td>
                  <span :class="['status-badge', statusClass(booking.status)]">
                    {{ formatStatus(booking.status) }}
                  </span>
                </td>
                <td>
                  <div v-if="booking.freelancers && booking.freelancers.length > 0" style="display: flex; flex-direction: column; gap: 4px;">
                    <div v-for="fl in booking.freelancers" :key="fl.id" style="font-size: 0.8rem; background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 4px; display: inline-block;">
                      {{ fl.nama }}
                    </div>
                  </div>
                  <span v-else>-</span>
                </td>
                <td style="font-weight: 600;">Rp {{ formatRupiah(booking.total_price) }}</td>
                <td>
                  <div class="action-buttons">
                    <div class="split-btn purple" title="Copy" style="position: relative;">
                      <button class="split-btn-main" @click="copyTemplateKlien(booking)"><Copy :size="14" /></button>
                      <button class="split-btn-drop" @click.stop="toggleCopyDropdown(booking.id, $event)"><ChevronDown :size="12" /></button>
                      
                      <Teleport to="body">
                        <div v-if="activeCopyDropdown === booking.id" class="dropdown-menu-copy fixed-dropdown" :style="dropdownStyle">
                          <button class="dropdown-item" @click.stop="copyTemplateKlien(booking)">Salin Template Klien</button>
                          <button class="dropdown-item" @click.stop="copyTemplateFreelance(booking)">Salin Template Freelance</button>
                        </div>
                      </Teleport>
                    </div>
                    <div class="split-btn green" title="WhatsApp">
                      <button class="split-btn-main"><MessageCircle :size="14" /></button>
                      <button class="split-btn-drop"><ChevronDown :size="12" /></button>
                    </div>
                    <button class="action-btn blue" title="Link Invoice"><Link :size="14" /></button>
                    <button class="action-btn gray" title="Info"><Info :size="14" /></button>
                    <button class="action-btn teal" title="Set Freelance" @click="openFreelanceModal(booking)"><Users :size="14" /></button>
                    <button class="action-btn orange" title="Update" @click="openStatusModal(booking)"><RefreshCw :size="14" /></button>
                    <button class="action-btn indigo" title="Edit"><Edit :size="14" /></button>
                    <button class="action-btn dark-gray" title="Arsip"><Archive :size="14" /></button>
                    <button class="action-btn red" title="Hapus" @click="openDeleteModal(booking)"><Trash2 :size="14" /></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="pagination-footer">
          <div class="per-page-selector">
            <span>Tampilkan</span>
            <select class="per-page-select">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span>per<br/>halaman</span>
          </div>
          
          <div class="pagination-controls">
            <span class="data-count">0 data</span>
            <button class="page-btn" disabled><ChevronLeft :size="16" /></button>
            <span class="page-info">1/1</span>
            <button class="page-btn" disabled><ChevronRight :size="16" /></button>
          </div>
        </div>
      </div>
    </div>
    <!-- Status Modal -->
    <div v-if="showStatusModal" class="modal-overlay" @click.self="closeStatusModal">
      <div class="modal-content">
        <div class="modal-header">
          <div>
            <h3 class="modal-title">Ganti Status Booking</h3>
            <p class="modal-subtitle">Ubah status untuk klien <strong>{{ selectedBookingForStatus?.client_name }}</strong></p>
          </div>
          <button class="modal-close" @click="closeStatusModal"><X :size="20" /></button>
        </div>
        
        <div class="status-grid">
          <button 
            v-for="(label, key) in statusMap" 
            :key="key"
            class="status-grid-item"
            :class="{ active: newStatus === key }"
            @click="newStatus = key"
          >
            <span :class="['status-badge', statusClass(key)]">{{ label }}</span>
          </button>
        </div>
        
        <div class="modal-actions">
          <button class="btn-text-modal" @click="closeStatusModal">Batal</button>
          <button class="btn-save-modal" @click="saveStatus" :disabled="isSavingStatus">
            <Check :size="16" class="mr-2" v-if="!isSavingStatus" style="display:inline-block; vertical-align:middle; margin-right:8px;" />
            <span style="display:inline-block; vertical-align:middle;">{{ isSavingStatus ? 'Menyimpan...' : 'Simpan Perubahan' }}</span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Delete Modal -->
    <div v-if="showDeleteModal" class="modal-overlay" @click.self="closeDeleteModal">
      <div class="modal-content" style="max-width: 400px; text-align: center; position: relative;">
        <button class="modal-close" style="position: absolute; top: 1rem; right: 1rem;" @click="closeDeleteModal"><X :size="20" /></button>
        <div style="margin-bottom: 1rem;">
          <AlertCircle :size="36" color="#ef4444" />
        </div>
        <h3 class="modal-title" style="margin-bottom: 0.5rem; justify-content: center; text-align: center;">Hapus Booking?</h3>
        <p class="modal-subtitle" style="margin-bottom: 1.5rem; line-height: 1.5; text-align: center;">
          Tindakan ini tidak dapat dibatalkan. Booking klien {{ selectedBookingForDelete?.client_name }} akan dihapus permanen. Event Google Calendar terkait dan project Fastpik (jika ada) akan ikut dicoba dihapus.
        </p>
        <div style="display: flex; gap: 1rem;">
          <button style="flex: 1; padding: 0.75rem; background: transparent; border: 1px solid rgba(255,255,255,0.1); color: #fff; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='transparent'" @click="closeDeleteModal">Batal</button>
          <button style="flex: 1; padding: 0.75rem; background: #ef4444; border: none; color: #fff; border-radius: 8px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'" @click="confirmDelete" :disabled="isDeleting">
            <Loader2 v-if="isDeleting" :size="16" class="spin" style="display:inline-block; vertical-align:middle; margin-right:8px;" />
            <Trash2 v-else :size="16" style="display:inline-block; vertical-align:middle; margin-right:8px;" />
            <span style="display:inline-block; vertical-align:middle;">Ya, Hapus</span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Freelance Info Modal -->
    <div v-if="showInfoModal" class="modal-overlay" @click.self="showInfoModal = false">
      <div class="modal-content" style="max-width: 400px; position: relative;">
        <button class="modal-close" style="position: absolute; top: 1rem; right: 1rem;" @click="showInfoModal = false"><X :size="20" /></button>
        <h3 class="modal-title" style="margin-bottom: 0.5rem;">Informasi</h3>
        <p class="modal-subtitle" style="margin-bottom: 1.5rem; line-height: 1.5; color: #d1d5db;">
          Freelance belum tersedia untuk template ini.
        </p>
        <div style="display: flex; justify-content: flex-end;">
          <button style="padding: 0.5rem 1.5rem; background: #fff; border: none; color: #000; border-radius: 8px; font-weight: 600; cursor: pointer;" @click="showInfoModal = false">OK</button>
        </div>
      </div>
    </div>

    <!-- Set Freelance Modal -->
    <div v-if="showFreelanceModal" class="modal-overlay" @click.self="closeFreelanceModal">
      <div class="modal-content" style="max-width: 500px; position: relative;">
        <button class="modal-close" style="position: absolute; top: 1rem; right: 1rem;" @click="closeFreelanceModal"><X :size="20" /></button>
        <h3 class="modal-title" style="margin-bottom: 0.25rem;">Set Freelance Booking</h3>
        <p class="modal-subtitle" style="margin-bottom: 1.5rem; line-height: 1.5; color: #a0a0a0; font-size: 0.85rem;">
          Pilih freelance untuk booking klien {{ activeBookingForFreelance?.client_name }}. Kamu bisa mengosongkan pilihan untuk melepas assignment.
        </p>
        
        <div class="search-container" style="margin-bottom: 1rem;">
          <Search :size="16" class="search-icon" style="color: #666;" />
          <input type="text" v-model="searchFreelance" placeholder="Cari freelance, role, tag, atau email..." class="search-input" style="width: 100%;" />
        </div>
        
        <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-bottom: 1rem;">
          <button style="background: transparent; border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 0.25rem 0.5rem; border-radius: 4px; cursor: pointer;"><ListFilter :size="14" /></button>
          <button style="background: transparent; border: 1px solid rgba(255,255,255,0.1); color: #888; padding: 0.25rem 0.5rem; border-radius: 4px; cursor: pointer;"><Settings2 :size="14" /></button>
        </div>
        
        <div style="border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; min-height: 150px; max-height: 300px; overflow-y: auto; margin-bottom: 1.5rem; padding: 0.5rem;">
          <div v-if="isFreelancersLoading" style="display: flex; justify-content: center; align-items: center; height: 100px; color: #888;">
            <Loader2 :size="16" class="spin mr-2" style="margin-right: 8px;" /> Memuat daftar freelance aktif...
          </div>
          <div v-else-if="filteredFreelancers.length === 0" style="text-align: center; color: #888; padding: 2rem 0;">
            Tidak ada freelance yang cocok.
          </div>
          <div v-else v-for="fl in filteredFreelancers" :key="fl.id" style="display: flex; align-items: center; padding: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.05); gap: 1rem;">
            <input type="checkbox" :value="fl.id" v-model="selectedFreelanceIds" style="cursor: pointer; width: 16px; height: 16px; background: transparent; border: 1px solid #555; border-radius: 4px;" :disabled="selectedFreelanceIds.length >= 5 && !selectedFreelanceIds.includes(fl.id)" />
            <div style="width: 32px; height: 32px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <UserCircle :size="16" color="#aaa" />
            </div>
            <div style="flex: 1;">
              <div style="font-weight: 600; font-size: 0.9rem; margin-bottom: 2px;">{{ fl.nama }}</div>
              <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 4px;">
                <span style="font-size: 0.7rem; background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">{{ fl.peran }}</span>
                <span v-if="fl.tags" style="font-size: 0.7rem; background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">{{ Array.isArray(fl.tags) ? fl.tags.join(', ') : fl.tags }}</span>
              </div>
              <div style="font-size: 0.8rem; color: #888;">{{ fl.email || fl.phone_number }}</div>
            </div>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 0.85rem; color: #888;">
            {{ selectedFreelanceIds.length }}/5 dipilih di sesi aktif
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button style="padding: 0.5rem 1.5rem; background: transparent; border: none; color: #fff; font-weight: 600; cursor: pointer;" @click="closeFreelanceModal">Batal</button>
            <button style="padding: 0.5rem 1.5rem; background: #fff; border: none; color: #000; border-radius: 8px; font-weight: 600; cursor: pointer; display: flex; align-items: center;" @click="saveFreelanceAssignment" :disabled="isSavingFreelance">
              <Loader2 v-if="isSavingFreelance" :size="16" class="spin mr-2" style="margin-right: 8px;" />
              <Users v-else :size="16" style="margin-right: 8px;" />
              {{ isSavingFreelance ? 'Menyimpan...' : 'Simpan' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="showToast" class="toast-notification">
      <div class="toast-content">
        <div class="toast-icon"><Check :size="16" /></div>
        <span>{{ toastMessage }}</span>
      </div>
      <button class="toast-close" @click="showToast = false"><X :size="16" /></button>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout.vue';
import { useTour } from '../composables/useTour';
import { 
  Download, SlidersHorizontal, Zap, Plus, 
  Search, ListFilter, Folder, Archive, Settings2,
  ChevronLeft, ChevronRight, ChevronDown, MessageCircle, Link, FileText, UserCircle, Users, RefreshCw, Edit, Trash2, Copy, Info, MapPin, X, Check, AlertCircle, Loader2
} from 'lucide-vue-next';

const bookings = ref([]);
const isLoading = ref(true);
const searchQuery = ref('');

// Freelance Assignment States
const showFreelanceModal = ref(false);
const activeBookingForFreelance = ref(null);
const allFreelancers = ref([]);
const isFreelancersLoading = ref(false);
const searchFreelance = ref('');
const selectedFreelanceIds = ref([]);
const isSavingFreelance = ref(false);
let hasLoadedFreelancers = false;

const fetchFreelancers = async () => {
  if (hasLoadedFreelancers) return;
  isFreelancersLoading.value = true;
  try {
    const token = localStorage.getItem('auth_token');
    const res = await axios.get('/api/team-members', {
      headers: { Authorization: `Bearer ${token}` }
    });
    allFreelancers.value = res.data;
    hasLoadedFreelancers = true;
  } catch (error) {
    console.error('Failed to fetch freelancers:', error);
  } finally {
    isFreelancersLoading.value = false;
  }
};

const filteredFreelancers = computed(() => {
  if (!searchFreelance.value) return allFreelancers.value;
  const q = searchFreelance.value.toLowerCase();
  return allFreelancers.value.filter(f => 
    (f.nama && f.nama.toLowerCase().includes(q)) ||
    (f.peran && f.peran.toLowerCase().includes(q)) ||
    (f.email && f.email.toLowerCase().includes(q)) ||
    (f.tags && (Array.isArray(f.tags) ? f.tags.join(' ').toLowerCase().includes(q) : f.tags.toLowerCase().includes(q)))
  );
});

const openFreelanceModal = (booking) => {
  activeBookingForFreelance.value = booking;
  selectedFreelanceIds.value = booking.freelancers ? booking.freelancers.map(f => f.id) : [];
  searchFreelance.value = '';
  showFreelanceModal.value = true;
  fetchFreelancers();
};

const closeFreelanceModal = () => {
  showFreelanceModal.value = false;
  activeBookingForFreelance.value = null;
  selectedFreelanceIds.value = [];
};

const saveFreelanceAssignment = async () => {
  if (!activeBookingForFreelance.value) return;
  isSavingFreelance.value = true;
  try {
    const token = localStorage.getItem('auth_token');
    const res = await axios.post(`/api/bookings/${activeBookingForFreelance.value.id}/freelancers`, {
      freelancer_ids: selectedFreelanceIds.value
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // Update local booking with returned booking data
    const idx = bookings.value.findIndex(b => b.id === activeBookingForFreelance.value.id);
    if (idx !== -1 && res.data.booking) {
      bookings.value[idx] = res.data.booking;
    }
    
    closeFreelanceModal();
    // Show toast with response message
    triggerToast(res.data.message || 'Freelance berhasil ditugaskan.');
  } catch (err) {
    console.error('Error saving assignment:', err);
    triggerToast('Gagal menyimpan assignment.');
  } finally {
    isSavingFreelance.value = false;
  }
};

const fetchBookings = async () => {
  try {
    const token = localStorage.getItem('auth_token');
    const res = await axios.get('/api/bookings', {
      headers: { Authorization: `Bearer ${token}` }
    });
    bookings.value = res.data;
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
  } finally {
    isLoading.value = false;
  }
};

const closeModals = () => {
  showFreelanceModal.value = false;
  activeBookingForFreelance.value = null;
};

const { isActive, currentStep, completeStep } = useTour();

// Global click listener to close dropdowns
onMounted(() => {
  fetchBookings();
  
  // Auto-complete tour step 7 if active
  if (isActive.value && currentStep()?.id === 'view-booking-list') {
    completeStep('view-booking-list');
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.split-btn.purple') && !e.target.closest('.dropdown-menu-copy')) {
      activeCopyDropdown.value = null;
    }
  });
  window.addEventListener('scroll', () => {
    activeCopyDropdown.value = null;
  }, true);
});

const formatTanggal = (dateStr) => {
  if (!dateStr) return '-';
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateStr).toLocaleDateString('id-ID', options);
};

const formatRupiah = (number) => {
  if (!number) return '0';
  return new Intl.NumberFormat('id-ID').format(number);
};

const formatPackageName = (selectedPackages) => {
  if (!selectedPackages || !Array.isArray(selectedPackages)) return '-';
  return selectedPackages.map(p => p.nama_layanan).join(', ');
};

const formatStatus = (status) => {
  return statusMap[status] || status;
};

const statusMap = {
  'pending': 'Pending',
  'confirmed': 'Booking Confirmed',
  'sesi_foto': 'Sesi Foto / Acara',
  'antrian_edit': 'Antrian Edit',
  'proses_edit': 'Proses Edit',
  'revisi': 'Revisi',
  'file_siap': 'File Siap',
  'selesai': 'Selesai',
  'batal': 'Batal'
};

const showStatusModal = ref(false);
const selectedBookingForStatus = ref(null);
const newStatus = ref('');
const isSavingStatus = ref(false);

const openStatusModal = (booking) => {
  selectedBookingForStatus.value = booking;
  newStatus.value = booking.status;
  showStatusModal.value = true;
};

const closeStatusModal = () => {
  showStatusModal.value = false;
  selectedBookingForStatus.value = null;
  newStatus.value = '';
};

const saveStatus = async () => {
  if (!selectedBookingForStatus.value) return;
  isSavingStatus.value = true;
  try {
    const token = localStorage.getItem('auth_token');
    await axios.put(`/api/bookings/${selectedBookingForStatus.value.id}/status`, {
      status: newStatus.value
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // Update local state
    const idx = bookings.value.findIndex(b => b.id === selectedBookingForStatus.value.id);
    if (idx !== -1) {
      bookings.value[idx].status = newStatus.value;
    }
    closeStatusModal();
  } catch (err) {
    console.error('Error saving status:', err);
    alert('Gagal menyimpan status');
  } finally {
    isSavingStatus.value = false;
  }
};

const showDeleteModal = ref(false);
const selectedBookingForDelete = ref(null);
const isDeleting = ref(false);

const openDeleteModal = (booking) => {
  selectedBookingForDelete.value = booking;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  selectedBookingForDelete.value = null;
};

const confirmDelete = async () => {
  if (!selectedBookingForDelete.value) return;
  isDeleting.value = true;
  try {
    const token = localStorage.getItem('auth_token');
    await axios.delete(`/api/bookings/${selectedBookingForDelete.value.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // Remove from local list
    bookings.value = bookings.value.filter(b => b.id !== selectedBookingForDelete.value.id);
    closeDeleteModal();
  } catch (err) {
    console.error('Error deleting booking:', err);
    alert('Gagal menghapus booking');
  } finally {
    isDeleting.value = false;
  }
};

const statusClass = (status) => {
  switch (status) {
    case 'pending': return 'status-pending';
    case 'confirmed': return 'status-confirmed';
    case 'sesi_foto': return 'status-sesi-foto';
    case 'antrian_edit': return 'status-antrian-edit';
    case 'proses_edit': return 'status-proses-edit';
    case 'revisi': return 'status-revisi';
    case 'file_siap': return 'status-file-siap';
    case 'selesai': return 'status-selesai';
    case 'batal': return 'status-batal';
    case 'completed': return 'status-selesai';
    case 'cancelled': return 'status-batal';
    default: return 'status-pending';
  }
};

// Copy Template Logic
const activeCopyDropdown = ref(null);
const dropdownStyle = ref({});
const showToast = ref(false);
const toastMessage = ref('');
const showInfoModal = ref(false);

const toggleCopyDropdown = (id, event) => {
  if (activeCopyDropdown.value === id) {
    activeCopyDropdown.value = null;
  } else {
    activeCopyDropdown.value = id;
    if (event) {
      const buttonRect = event.currentTarget.getBoundingClientRect();
      // Position the dropdown directly below the button, and align left
      // We align it slightly to the left so it doesn't overflow screen right edge if it's too wide
      const leftPos = Math.max(10, buttonRect.right - 200); 
      dropdownStyle.value = {
        top: `${buttonRect.bottom + 8}px`,
        left: `${leftPos}px`,
      };
    }
  }
};

const triggerToast = (message) => {
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

const copyTemplateKlien = (booking) => {
  activeCopyDropdown.value = null;
  
  const dpAmount = parseFloat(booking.dp_amount || 0);
  const totalPrice = parseFloat(booking.total_price || 0);
  const sisa = totalPrice - dpAmount;
  
  const text = `Halo ${booking.client_name}, berikut detail booking ${booking.invoice}.

Paket: ${formatPackageName(booking.selected_packages)}
Add-on: -
Total Add-on: Rp0
Jadwal: ${formatTanggal(booking.event_date)}
Jam: ${booking.event_time || '-'}
Lokasi: ${booking.event_location || '-'}
Total: Rp ${formatRupiah(totalPrice)}
DP Dibayar: Rp ${formatRupiah(dpAmount)}
Sisa Pembayaran: Rp ${formatRupiah(sisa)}

Invoice: https://clientdesk.id/api/public/invoice?code=${booking.invoice}
Tracking: https://clientdesk.id/id/track/${booking.id}

Terima kasih, Jihan.`;

  navigator.clipboard.writeText(text).then(() => {
    triggerToast('Template klien berhasil disalin.');
  });
};

const copyTemplateFreelance = (booking) => {
  activeCopyDropdown.value = null;
  
  if (!booking.freelancers || booking.freelancers.length === 0) {
    showInfoModal.value = true;
    return;
  }
  
  // Use first assigned freelance
  const fl = booking.freelancers[0];
  const text = `Halo ${fl.nama}, ada jadwal baru. Klien: ${booking.client_name} (${booking.client_whatsapp}) Kode Booking: ${booking.invoice} Paket: ${formatPackageName(booking.selected_packages)} Add-on: - Total Add-on: Rp0 Tanggal: ${formatTanggal(booking.event_date)} Jam: ${booking.event_time || '-'} Lokasi: ${booking.event_location || '-'} Link Drive: - Portal Tim / Freelance: - Kode Akses: - Mohon konfirmasi kehadiran. Terima kasih, Jihan.`;
  
  navigator.clipboard.writeText(text).then(() => {
    triggerToast('Template freelance berhasil disalin.');
  });
};


</script>

<style scoped>
.booking-page {
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

/* Filters */
.filter-row {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.search-container {
  flex: 1;
  min-width: 300px;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  color: #888;
}

.search-input {
  width: 100%;
  padding: 0.6rem 1rem 0.6rem 2.5rem;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  color: #fff;
  font-size: 0.85rem;
}

.search-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.3);
}

.sort-container {
  position: relative;
}

.sort-select {
  padding: 0.6rem 2rem 0.6rem 1rem;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  color: #fff;
  font-size: 0.85rem;
  appearance: none;
  cursor: pointer;
}

.sort-select:focus {
  outline: none;
}

/* Table Card */
.table-card {
  background-color: #0a0a0a;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  min-height: 400px;
}

.tabs-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.5rem 0 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.tabs-left {
  display: flex;
  gap: 0.5rem;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  border: none;
  color: #888;
  padding: 0.75rem 1.25rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px 6px 0 0;
  transition: all 0.2s;
}

.tab-btn.active {
  background-color: #ffffff;
  color: #000000;
}

.tab-btn:not(.active):hover {
  color: #fff;
}

.btn-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem 1rem;
}

.btn-text:hover {
  text-decoration: underline;
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}

.data-table {
  width: 100%;
  min-width: 1000px;
  border-collapse: collapse;
}

.data-table th {
  text-align: left;
  padding: 1rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: #888;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  white-space: nowrap;
}

.data-table th:not(:last-child) {
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

.data-table th:last-child,
.data-table td:last-child {
  position: sticky;
  right: 0;
  background-color: #0a0a0a;
  z-index: 10;
  box-shadow: -8px 0 15px -5px rgba(0,0,0,0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.2);
}

.data-table td {
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.85rem;
}

.empty-state {
  text-align: center;
  padding: 5rem 0;
  color: #888;
  font-style: italic;
  font-size: 0.85rem;
}

/* Status Badges */
.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  text-align: center;
  white-space: nowrap;
}

.status-pending { background-color: #dbeafe; color: #2563eb; } /* Light blue */
.status-confirmed { background-color: #f3e8ff; color: #7c3aed; } /* Light purple */
.status-sesi-foto { background-color: #ffedd5; color: #ea580c; } /* Light orange */
.status-antrian-edit { background-color: #fee2e2; color: #dc2626; } /* Light coral/red */
.status-proses-edit { background-color: #fce7f3; color: #db2777; } /* Light pink */
.status-revisi { background-color: #dcfce7; color: #16a34a; } /* Light green */
.status-file-siap { background-color: #ccfbf1; color: #0d9488; } /* Teal */
.status-selesai { background-color: #cffafe; color: #0891b2; } /* Cyan */
.status-batal { background-color: #991b1b; color: #fca5a5; } /* Dark red bg */

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-content {
  background-color: #111;
  border-radius: 16px;
  padding: 1.5rem;
  width: 100%;
  max-width: 450px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.modal-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.25rem 0;
}

.modal-subtitle {
  font-size: 0.85rem;
  color: #9ca3af;
  margin: 0;
}

.modal-close {
  background: transparent;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.25rem;
}

.modal-close:hover {
  color: #fff;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.status-grid-item {
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.75rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.status-grid-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.status-grid-item.active {
  border-color: #fff;
  background-color: rgba(255, 255, 255, 0.05);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn-text-modal {
  background: transparent;
  border: none;
  color: #fff;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
}

.btn-save-modal {
  background-color: #e5e7eb;
  color: #111827;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.5rem 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.btn-save-modal:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spin {
  animation: spin 1s linear infinite;
}

/* Dropdown Menu Copy */
.dropdown-menu-copy {
  position: fixed;
  background-color: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.8);
  z-index: 9999;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}

.dropdown-item {
  background: transparent;
  border: none;
  color: #fff;
  text-align: left;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  border-radius: 4px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Toast Notification */
.toast-notification {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #16a34a;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 2000;
  animation: slideIn 0.3s ease-out;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
  font-size: 0.9rem;
}

.toast-icon {
  background-color: #dcfce7;
  color: #16a34a;
  border-radius: 50%;
  padding: 0.25rem;
  display: flex;
}

.toast-close {
  background: transparent;
  border: none;
  color: #16a34a;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  opacity: 0.7;
}

.toast-close:hover {
  opacity: 1;
}

@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;
}

.action-btn.purple { border: 1px solid #7c3aed; color: #7c3aed; }
.action-btn.green { border: 1px solid #10b981; color: #10b981; }
.action-btn.blue { border: 1px solid #3b82f6; color: #3b82f6; }
.action-btn.gray { border: 1px solid #9ca3af; color: #9ca3af; }
.action-btn.teal { border: 1px solid #14b8a6; color: #14b8a6; }
.action-btn.orange { border: 1px solid #f97316; color: #f97316; }
.action-btn.indigo { border: 1px solid #6366f1; color: #6366f1; }
.action-btn.dark-gray { border: 1px solid #4b5563; color: #4b5563; }
.action-btn.red { border: 1px solid #ef4444; color: #ef4444; }

.action-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.split-btn {
  display: flex;
  border-radius: 6px;
  overflow: hidden;
}

.split-btn-main {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid;
  border-right: 1px solid rgba(255,255,255,0.1);
  border-radius: 6px 0 0 6px;
}

.split-btn-drop {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 28px;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid;
  border-left: none;
  border-radius: 0 6px 6px 0;
}

.split-btn.purple .split-btn-main, .split-btn.purple .split-btn-drop { border-color: #7c3aed; color: #7c3aed; }
.split-btn.green .split-btn-main, .split-btn.green .split-btn-drop { border-color: #10b981; color: #10b981; }

.split-btn-main:hover, .split-btn-drop:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Pagination */
.pagination-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background-color: rgba(255, 255, 255, 0.02);
}

.per-page-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #888;
}

.per-page-select {
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.8rem;
  color: #888;
}

.page-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  cursor: pointer;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  font-weight: 600;
  color: #fff;
}

/* Light Theme Adjustments */
:root[data-theme="light"] .page-title,
:root[data-theme="light"] .search-input,
:root[data-theme="light"] .sort-select {
  color: #111827;
}

:root[data-theme="light"] .search-input,
:root[data-theme="light"] .sort-select,
:root[data-theme="light"] .btn-outline {
  border-color: #d1d5db;
}

:root[data-theme="light"] .btn-outline {
  color: #111827;
}

:root[data-theme="light"] .btn-outline:hover {
  background-color: #f3f4f6;
}

:root[data-theme="light"] .btn-primary {
  background-color: #111827;
  color: #ffffff;
}

:root[data-theme="light"] .table-card {
  background-color: #ffffff;
  border-color: #e5e7eb;
}

:root[data-theme="light"] .tabs-header,
:root[data-theme="light"] .data-table th,
:root[data-theme="light"] .data-table th:not(:last-child),
:root[data-theme="light"] .data-table td,
:root[data-theme="light"] .pagination-footer {
  border-color: #e5e7eb;
}

:root[data-theme="light"] .tab-btn.active {
  background-color: #111827;
  color: #ffffff;
}

:root[data-theme="light"] .tab-btn:not(.active):hover,
:root[data-theme="light"] .btn-text {
  color: #111827;
}

:root[data-theme="light"] .pagination-footer {
  background-color: #f9fafb;
}

:root[data-theme="light"] .per-page-select {
  border-color: #d1d5db;
  color: #111827;
}

:root[data-theme="light"] .page-btn {
  border-color: #d1d5db;
  color: #111827;
}

:root[data-theme="light"] .page-info {
  color: #111827;
}

:root[data-theme="light"] .data-table th:last-child,
:root[data-theme="light"] .data-table td:last-child {
  background-color: #ffffff;
  box-shadow: -8px 0 15px -5px rgba(0,0,0,0.1);
  border-left: 1px solid #d1d5db;
}
</style>
