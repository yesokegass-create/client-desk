<template>
  <DashboardLayout>
    <div class="dashboard-page">
      <!-- Welcome Title -->
      <div class="welcome-header">
        <h1 class="welcome-title">👋 Selamat datang, {{ userName }}!</h1>
      </div>

      <!-- Setup Section -->
      <div class="setup-section dashboard-card">
        <div class="setup-header">
          <div class="setup-header-left">
            <span class="badge-quick-setup">⚡ Quick Setup</span>
            <h2 class="setup-title">Siapkan Vender.id langkah demi langkah</h2>
            <p class="setup-subtitle">Selesaikan langkah ini ini supaya dashboard, form booking, dan alur kerja utamamu langsung siap dipakai.</p>
          </div>
          <div class="setup-header-right">
            <div class="progress-info">
              <span class="progress-text">{{ completedSteps }} dari 8 langkah selesai</span>
              <span class="progress-percent">{{ progressPercent }}%</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" :style="{ width: progressPercent + '%' }"></div>
            </div>
            <button class="btn-primary mt-3 w-100" :disabled="isLoadingSetup" @click="continueSetup">
              <span v-if="isLoadingSetup">Memeriksa status...</span>
              <span v-else>Lanjutkan setup <ArrowRight :size="16" /></span>
            </button>
          </div>
        </div>

        <div class="setup-list" :class="{ 'opacity-50 pointer-events-none': isLoadingSetup }">
          <!-- Step 1 -->
          <div class="setup-item" :class="{ 'completed': setupStatus.step1_completed }">
            <div class="item-icon"><User :size="18" /></div>
            <div class="item-content">
              <div class="item-title-row">
                <h3>1. Lengkapi Profil</h3>
                <span v-if="setupStatus.step1_completed" class="status-badge success"><CheckCircle2 :size="12" /> Selesai</span>
                <span v-else class="status-badge pending"><Circle :size="12" /> Belum</span>
              </div>
              <p>Isi identitas dasar akun agar area admin dan tampilan publik tampil lebih rapi.</p>
            </div>
            <button :class="setupStatus.step1_completed ? 'btn-outline' : 'btn-white'" @click="startTourGuide('setup-profile')">
              {{ setupStatus.step1_completed ? 'Lihat lagi' : 'Buka panduan' }}
            </button>
          </div>

          <!-- Step 2 -->
          <div class="setup-item" :class="{ 'completed': setupStatus.step2_completed }">
            <div class="item-icon"><Building2 :size="18" /></div>
            <div class="item-content">
              <div class="item-title-row">
                <h3>2. Atur Nama Studio</h3>
                <span v-if="setupStatus.step2_completed" class="status-badge success"><CheckCircle2 :size="12" /> Selesai</span>
                <span v-else class="status-badge pending"><Circle :size="12" /> Belum</span>
              </div>
              <p>Isi nama studio di Pengaturan Umum supaya identitas dan link form booking siap dipakai dengan benar.</p>
            </div>
            <button :class="setupStatus.step2_completed ? 'btn-outline' : 'btn-white'" @click="startTourGuide('setup-studio')">
              {{ setupStatus.step2_completed ? 'Lihat lagi' : 'Buka panduan' }}
            </button>
          </div>

          <!-- Step 3 -->
          <div class="setup-item" :class="{ 'completed': setupStatus.step3_completed }">
            <div class="item-icon"><Briefcase :size="18" /></div>
            <div class="item-content">
              <div class="item-title-row">
                <h3>3. Buat Layanan/Paket</h3>
                <span v-if="setupStatus.step3_completed" class="status-badge success"><CheckCircle2 :size="12" /> Selesai</span>
                <span v-else class="status-badge pending"><Circle :size="12" /> Belum</span>
              </div>
              <p>Tambahkan minimal satu layanan agar form booking dan booking manual bisa dipakai dengan benar.</p>
            </div>
            <button :class="setupStatus.step3_completed ? 'btn-outline' : 'btn-white'" @click="startTourGuide('add-service')">
              {{ setupStatus.step3_completed ? 'Lihat lagi' : 'Buka panduan' }}
            </button>
          </div>

          <!-- Step 4 -->
          <div class="setup-item" :class="{ 'completed': setupStatus.step4_completed }">
            <div class="item-icon"><Users :size="18" /></div>
            <div class="item-content">
              <div class="item-title-row">
                <h3>4. Buat Tim / Freelance</h3>
                <span v-if="setupStatus.step4_completed" class="status-badge success"><CheckCircle2 :size="12" /> Selesai</span>
                <span v-else class="status-badge pending"><Circle :size="12" /> Belum</span>
              </div>
              <p>Tambahkan minimal satu anggota agar booking bisa dibagikan atau dikelola bersama dengan lebih rapi.</p>
            </div>
            <button :class="setupStatus.step4_completed ? 'btn-outline' : 'btn-white'" @click="startTourGuide('add-team')">
              {{ setupStatus.step4_completed ? 'Lihat lagi' : 'Buka panduan' }}
            </button>
          </div>

          <!-- Step 5 -->
          <div class="setup-item" :class="{ 'completed': setupStatus.step5_completed }">
            <div class="item-icon"><FormInput :size="18" /></div>
            <div class="item-content">
              <div class="item-title-row">
                <h3>5. Atur Form Booking</h3>
                <span v-if="setupStatus.step5_completed" class="status-badge success"><CheckCircle2 :size="12" /> Selesai</span>
                <span v-else class="status-badge pending"><Circle :size="12" /> Belum</span>
              </div>
              <p>Siapkan link form dan metode pembayaran supaya klien bisa booking sendiri dengan alur yang rapi.</p>
            </div>
            <button :class="setupStatus.step5_completed ? 'btn-outline' : 'btn-white'" @click="startTourGuide('setup-form')">
              {{ setupStatus.step5_completed ? 'Lihat lagi' : 'Buka panduan' }}
            </button>
          </div>

          <!-- Step 6 -->
          <div class="setup-item" :class="{ 'completed': setupStatus.step6_completed }">
            <div class="item-icon"><Sparkles :size="18" /></div>
            <div class="item-content">
              <div class="item-title-row">
                <h3>6. Buat Booking Pertama</h3>
                <span v-if="setupStatus.step6_completed" class="status-badge success"><CheckCircle2 :size="12" /> Selesai</span>
                <span v-else class="status-badge pending"><Circle :size="12" /> Belum</span>
              </div>
              <p>Masukkan satu booking pertama agar kamu bisa melihat alur kerja Vender.id berjalan end-to-end.</p>
            </div>
            <button :class="setupStatus.step6_completed ? 'btn-outline' : 'btn-white'" @click="startTourGuide('add-booking')">
              {{ setupStatus.step6_completed ? 'Lihat lagi' : 'Buka panduan' }}
            </button>
          </div>
          
          <!-- Step 7 -->
          <div class="setup-item" :class="{ 'completed': setupStatus.step7_completed }">
            <div class="item-icon"><ListChecks :size="18" /></div>
            <div class="item-content">
              <div class="item-title-row">
                <h3>7. Pantau Halaman Daftar Booking</h3>
                <span v-if="setupStatus.step7_completed" class="status-badge success"><CheckCircle2 :size="12" /> Selesai</span>
                <span v-else class="status-badge pending"><Circle :size="12" /> Belum</span>
              </div>
              <p>Lihat booking yang baru tersimpan dan kenali area daftar booking beserta aksi utamanya.</p>
            </div>
            <button :class="setupStatus.step7_completed ? 'btn-outline' : 'btn-white'" @click="startTourGuide('view-booking-list')">
              {{ setupStatus.step7_completed ? 'Lihat lagi' : 'Buka panduan' }}
            </button>
          </div>

          <!-- Step 8 -->
          <div class="setup-item" :class="{ 'completed': setupStatus.step8_completed }">
            <div class="item-icon"><Activity :size="18" /></div>
            <div class="item-content">
              <div class="item-title-row">
                <h3>8. Pantau Halaman Status Booking</h3>
                <span v-if="setupStatus.step8_completed" class="status-badge success"><CheckCircle2 :size="12" /> Selesai</span>
                <span v-else class="status-badge pending"><Circle :size="12" /> Belum</span>
              </div>
              <p>Setelah ada booking, pantau progres klien dan gunakan link tracking dari halaman status booking.</p>
            </div>
            <button :class="setupStatus.step8_completed ? 'btn-outline' : 'btn-white'" @click="startTourGuide('view-status-booking')">
              {{ setupStatus.step8_completed ? 'Lihat lagi' : 'Buka panduan' }}
            </button>
          </div>
        </div>

        <!-- Integrations -->
        <div class="integrations-section">
          <h4 class="integrations-title">Integrasi opsional</h4>
          <p class="integrations-subtitle">Hubungkan Google jika kamu ingin kalender dan file berjalan otomatis setelah setup inti beres.</p>
          
          <div class="setup-list">
            <div class="setup-item">
              <div class="item-icon"><CalendarDays :size="18" /></div>
              <div class="item-content">
                <div class="item-title-row">
                  <h3>Hubungkan Google Calendar</h3>
                  <span class="status-badge optional">Opsional</span>
                </div>
                <p>Sinkronkan jadwal booking ke Google Calendar agar agenda kerja lebih rapi.</p>
              </div>
              <button class="btn-outline">Buka panduan</button>
            </div>
            
            <div class="setup-item">
              <div class="item-icon"><HardDrive :size="18" /></div>
              <div class="item-content">
                <div class="item-title-row">
                  <h3>Hubungkan Google Drive</h3>
                  <span class="status-badge optional">Opsional</span>
                </div>
                <p>Sambungkan Google Drive untuk kebutuhan file, QRIS, dan folder kerja otomatis.</p>
              </div>
              <button class="btn-outline">Buka panduan</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Row -->
      <div class="action-row">
        <button class="btn-outline btn-sm" @click="hideNominal = !hideNominal">
          <EyeOff v-if="!hideNominal" :size="14" />
          <Eye v-else :size="14" />
          {{ hideNominal ? 'Tampilkan' : 'Sembunyikan' }} nominal
        </button>
      </div>

      <!-- Metrics Grid -->
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-info">
            <p class="metric-label">TOTAL BOOKING</p>
            <h2 class="metric-value">0 <span class="metric-unit">Booking</span></h2>
          </div>
          <div class="metric-icon bg-blue"><Users :size="20" /></div>
        </div>
        
        <div class="metric-card">
          <div class="metric-info">
            <p class="metric-label">BOOKING BULAN INI</p>
            <h2 class="metric-value">0 <span class="metric-unit">Booking</span></h2>
          </div>
          <div class="metric-icon bg-orange"><Calendar :size="20" /></div>
        </div>
        
        <div class="metric-card">
          <div class="metric-info">
            <p class="metric-label">TOTAL PEMASUKAN</p>
            <h2 class="metric-value">{{ hideNominal ? 'Rp ***' : 'Rp 0' }}</h2>
          </div>
          <div class="metric-icon bg-green"><TrendingUp :size="20" /></div>
        </div>
        
        <div class="metric-card">
          <div class="metric-info">
            <p class="metric-label">MENUNGGU PELUNASAN</p>
            <h2 class="metric-value">{{ hideNominal ? 'Rp ***' : 'Rp 0' }}</h2>
          </div>
          <div class="metric-icon bg-red"><CreditCard :size="20" /></div>
        </div>
      </div>

      <!-- Two Column Summary -->
      <div class="summary-grid">
        <!-- Upcoming Bookings -->
        <div class="dashboard-card">
          <div class="card-header">
            <div class="icon-label">
              <Calendar :size="16" class="text-purple" />
              <h3>BOOKING TERDEKAT</h3>
            </div>
          </div>
          <div class="empty-state">
            <p>Tidak ada booking mendatang.</p>
          </div>
        </div>

        <!-- Today's Summary -->
        <div class="dashboard-card">
          <div class="card-header">
            <h3>RINGKASAN HARI INI</h3>
          </div>
          
          <div class="today-stats">
            <div class="stat-box">
              <p class="stat-label">SESI HARI INI</p>
              <div class="stat-value-row">
                <span class="stat-value">0</span>
                <span class="stat-unit">Sesi</span>
                <Camera :size="20" class="stat-icon text-blue ml-auto" />
              </div>
            </div>
            
            <div class="stat-box">
              <p class="stat-label">PERLU KONFIRMASI</p>
              <div class="stat-value-row">
                <span class="stat-value">0</span>
                <span class="stat-unit">Pending</span>
                <Clock :size="20" class="stat-icon text-orange ml-auto" />
              </div>
            </div>
          </div>
          
          <div class="quick-actions">
            <p class="quick-action-label">AKSI CEPAT</p>
            <div class="action-buttons">
              <button class="action-btn">
                <div class="action-icon"><Plus :size="18" /></div>
                <span>Baru</span>
              </button>
              <button class="action-btn">
                <div class="action-icon"><ListTodo :size="18" /></div>
                <span>Daftar Booking</span>
              </button>
              <button class="action-btn">
                <div class="action-icon"><Calendar :size="18" /></div>
                <span>Kalender</span>
              </button>
              <button class="action-btn">
                <div class="action-icon"><Wallet :size="18" /></div>
                <span>Keuangan</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Grid -->
      <div class="charts-grid">
        <div class="dashboard-card">
          <div class="card-header">
            <h3>Pemasukan 30 Hari Terakhir</h3>
          </div>
          <div class="chart-container">
            <div class="y-axis">
              <span>4</span>
              <span>3</span>
              <span>2</span>
              <span>1</span>
              <span>0</span>
            </div>
            <div class="chart-content">
              <div class="line-chart"></div>
              <div class="x-axis">
                <span>5 Jul</span>
                <span>12 Jul</span>
                <span>19 Jul</span>
                <span>26 Jul</span>
                <span>2 Agu</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="dashboard-card">
          <div class="card-header">
            <h3>Pemasukan per Bulan (1 Tahun)</h3>
          </div>
          <div class="chart-container">
            <div class="y-axis">
              <span>4</span>
              <span>3</span>
              <span>2</span>
              <span>1</span>
              <span>0</span>
            </div>
            <div class="chart-content">
              <div class="bar-chart-placeholder"></div>
              <div class="x-axis">
                <span>Okt 25</span>
                <span>Des 25</span>
                <span>Feb 26</span>
                <span>Apr 26</span>
                <span>Jun 26</span>
                <span>Agu 26</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Bookings Table -->
      <div class="dashboard-card no-pad">
        <div class="card-header with-padding">
          <div>
            <h3>Booking Terbaru</h3>
            <p class="subtitle">Transaksi terakhir dari klien</p>
          </div>
          <button class="btn-text">Lihat Semua &rarr;</button>
        </div>
        
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Klien</th>
                <th>Paket</th>
                <th>Tanggal Booking</th>
                <th>Jadwal</th>
                <th>Status</th>
                <th class="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="6" class="text-center py-5">
                  <p class="empty-table-text">Belum ada data booking.</p>
                </td>
              </tr>
            </tbody>
          </table>
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
  ArrowRight, User, CheckCircle2, Circle, Building2, 
  Briefcase, Users, FormInput, Sparkles, ListChecks, 
  Activity, CalendarDays, HardDrive, EyeOff, Eye, 
  TrendingUp, CreditCard, Calendar, Camera, Clock, 
  Plus, ListTodo, Wallet 
} from 'lucide-vue-next';

const userName = ref('Johnathan Baker');
const hideNominal = ref(false);
const cachedSetup = localStorage.getItem('vender_setup_status');
const isLoadingSetup = ref(!cachedSetup);
const setupStatus = ref(cachedSetup ? JSON.parse(cachedSetup) : {
  step1_completed: false,
  step2_completed: false,
  step3_completed: false,
  step4_completed: false,
  step5_completed: false,
  step6_completed: false,
  step7_completed: false,
  step8_completed: false
});

const completedSteps = computed(() => {
  let count = 0;
  if (setupStatus.value.step1_completed) count++;
  if (setupStatus.value.step2_completed) count++;
  if (setupStatus.value.step3_completed) count++;
  if (setupStatus.value.step4_completed) count++;
  if (setupStatus.value.step5_completed) count++;
  if (setupStatus.value.step6_completed) count++;
  if (setupStatus.value.step7_completed) count++;
  if (setupStatus.value.step8_completed) count++;
  // Add other steps as they are implemented
  return count;
});

  const progressPercent = computed(() => {
    return Math.round((completedSteps.value / 8) * 100);
  });
  
  const { startTour } = useTour();
  
  const startTourGuide = (stepId = 0) => {
    startTour(stepId);
  };

  const continueSetup = () => {
    if (!setupStatus.value.step1_completed) return startTourGuide('setup-profile');
    if (!setupStatus.value.step2_completed) return startTourGuide('setup-studio');
    if (!setupStatus.value.step3_completed) return startTourGuide('add-service');
    if (!setupStatus.value.step4_completed) return startTourGuide('add-team');
    if (!setupStatus.value.step5_completed) return startTourGuide('setup-form');
    if (!setupStatus.value.step6_completed) return startTourGuide('add-booking');
    if (!setupStatus.value.step7_completed) return startTourGuide('view-booking-list');
    if (!setupStatus.value.step8_completed) return startTourGuide('view-status-booking');
  };
  
  const fetchSetupStatus = async () => {
  if (!localStorage.getItem('vender_setup_status')) {
    isLoadingSetup.value = true;
  }
  try {
    const token = localStorage.getItem('auth_token');
    const response = await axios.get('/api/setup-status', {
      headers: { Authorization: `Bearer ${token}` }
    });
      if (response.data) {
        const existing = JSON.parse(localStorage.getItem('vender_setup_status') || '{}');
        const defaultState = {
          step1_completed: false, step2_completed: false, step3_completed: false,
          step4_completed: false, step5_completed: false, step6_completed: false,
          step7_completed: false, step8_completed: false
        };
        setupStatus.value = { ...defaultState, ...existing, ...response.data };
        localStorage.setItem('vender_setup_status', JSON.stringify(setupStatus.value));
      }
  } catch (error) {
    console.error('Could not fetch setup status', error);
  } finally {
    isLoadingSetup.value = false;
  }
};

onMounted(async () => {
  fetchSetupStatus();
  try {
    const token = localStorage.getItem('auth_token');
    const response = await axios.get('/api/user', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.data && response.data.name) {
      userName.value = response.data.name;
    }
  } catch (error) {
    console.error('Could not fetch user profile', error);
  }
});
</script>

<style scoped>
.dashboard-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 100%;
  margin: 0 auto;
}

.welcome-header {
  margin-bottom: 0.5rem;
}

.welcome-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.dashboard-card {
  background-color: #0f0f0f;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
}

.dashboard-card.no-pad {
  padding: 0;
}

/* Setup Section */
.setup-section {
  background: linear-gradient(to right, #111111, #0a0a0a);
}

.setup-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  gap: 1.5rem;
}

.setup-header-left {
  width: 100%;
}

.badge-quick-setup {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 100px;
  margin-bottom: 1rem;
}

.setup-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.setup-subtitle {
  font-size: 0.9rem;
  color: #a0a0a0;
  margin: 0;
}

.setup-header-right {
  width: 100%;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.progress-percent {
  color: #a0a0a0;
}

.progress-bar-bg {
  height: 6px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-bar-fill {
  height: 100%;
  background-color: #ffffff;
  border-radius: 3px;
}

.btn-primary {
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: opacity 0.2s;
}

.btn-primary:hover {
  opacity: 0.9;
}

.w-100 {
  width: 100%;
}

.setup-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.setup-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.02);
  transition: background-color 0.2s;
}

.setup-item:hover {
  background-color: rgba(255, 255, 255, 0.04);
}

.setup-item.completed {
  border-color: rgba(16, 185, 129, 0.2);
}

.item-icon {
  background-color: rgba(255, 255, 255, 0.05);
  padding: 0.5rem;
  border-radius: 8px;
  color: #ffffff;
}

.setup-item.completed .item-icon {
  background-color: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.item-content {
  flex: 1;
}

.item-title-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.25rem;
}

.item-title-row h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.item-content p {
  font-size: 0.85rem;
  color: #a0a0a0;
  margin: 0;
  line-height: 1.4;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 100px;
}

.status-badge.success {
  background-color: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.status-badge.pending {
  background-color: rgba(255, 255, 255, 0.1);
  color: #a0a0a0;
}

.status-badge.optional {
  background-color: rgba(255, 255, 255, 0.05);
  color: #888;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-white {
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

.btn-outline {
  background-color: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

.btn-outline:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.integrations-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px dashed rgba(255, 255, 255, 0.1);
}

.integrations-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.integrations-subtitle {
  font-size: 0.85rem;
  color: #a0a0a0;
  margin: 0 0 1rem 0;
}

/* Actions Row */
.action-row {
  display: flex;
  justify-content: flex-end;
}

.btn-sm {
  padding: 0.4rem 0.75rem;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

/* Metrics Grid */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.metric-card {
  background-color: #0f0f0f;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.metric-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: #888;
  margin: 0 0 0.5rem 0;
  letter-spacing: 0.05em;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.metric-unit {
  font-size: 0.9rem;
  font-weight: 500;
  color: #a0a0a0;
}

.metric-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-blue { background-color: rgba(59, 130, 246, 0.1); color: #3b82f6; }
.bg-orange { background-color: rgba(249, 115, 22, 0.1); color: #f97316; }
.bg-green { background-color: rgba(16, 185, 129, 0.1); color: #10b981; }
.bg-red { background-color: rgba(239, 68, 68, 0.1); color: #ef4444; }
.text-purple { color: #a855f7; }
.text-blue { color: #3b82f6; }
.text-orange { color: #f97316; }
.ml-auto { margin-left: auto; }

/* Summary Grid */
.summary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.card-header {
  margin-bottom: 1rem;
}

.card-header h3 {
  font-size: 0.8rem;
  font-weight: 600;
  color: #a0a0a0;
  margin: 0;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.icon-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon-label h3 {
  color: #fff;
}

.empty-state {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #888;
  font-size: 0.9rem;
}

.today-stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-box {
  flex: 1;
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
}

.stat-label {
  font-size: 0.65rem;
  font-weight: 600;
  color: #888;
  margin: 0 0 0.5rem 0;
  letter-spacing: 0.05em;
}

.stat-value-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
}

.stat-unit {
  font-size: 0.85rem;
  color: #a0a0a0;
}

.quick-action-label {
  font-size: 0.65rem;
  font-weight: 600;
  color: #888;
  margin: 0 0 0.75rem 0;
  letter-spacing: 0.05em;
}

.action-buttons {
  display: flex;
  gap: 1rem;
}

.action-btn {
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0;
}

.action-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.action-btn:hover .action-icon {
  background-color: rgba(255, 255, 255, 0.1);
}

.action-btn span {
  font-size: 0.75rem;
  color: #a0a0a0;
}

/* Charts Grid */
.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.chart-container {
  display: flex;
  height: 200px;
  margin-top: 1.5rem;
}

.y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 1rem;
  color: #666;
  font-size: 0.7rem;
  border-right: 1px dashed rgba(255, 255, 255, 0.1);
  padding-bottom: 20px; /* space for x axis */
}

.chart-content {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
}

.line-chart {
  flex: 1;
  border-bottom: 1px solid #a855f7;
  position: relative;
}

.bar-chart-placeholder {
  flex: 1;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.x-axis {
  display: flex;
  justify-content: space-between;
  padding-top: 0.5rem;
  color: #666;
  font-size: 0.7rem;
  height: 20px;
}

/* Table */
.card-header.with-padding {
  padding: 1.5rem 1.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.card-header.with-padding h3 {
  font-size: 1.1rem;
  color: #fff;
  text-transform: none;
  letter-spacing: normal;
}

.subtitle {
  font-size: 0.85rem;
  color: #a0a0a0;
  margin: 0.25rem 0 0 0;
}

.btn-text {
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.btn-text:hover {
  text-decoration: underline;
}

.table-container {
  width: 100%;
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  text-align: left;
  padding: 0.75rem 1.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #888;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.data-table td {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.text-right {
  text-align: right !important;
}

.text-center {
  text-align: center !important;
}

.py-5 {
  padding-top: 3rem !important;
  padding-bottom: 3rem !important;
}

.empty-table-text {
  color: #666;
  font-size: 0.9rem;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .summary-grid, .charts-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .setup-item {
    flex-direction: column;
    align-items: stretch;
  }
  
  .setup-item button {
    align-self: flex-start;
  }
  
  .today-stats {
    flex-direction: column;
  }
  
  .action-buttons {
    justify-content: space-between;
  }
}

/* Light Theme Adjustments */
:root[data-theme="light"] .dashboard-card {
  background-color: #ffffff;
  border-color: #e5e7eb;
}

:root[data-theme="light"] .setup-section {
  background: #ffffff;
}

:root[data-theme="light"] .badge-quick-setup {
  background-color: #f3f4f6;
  border-color: #e5e7eb;
  color: #111827;
}

:root[data-theme="light"] .setup-title,
:root[data-theme="light"] .welcome-title,
:root[data-theme="light"] .metric-value,
:root[data-theme="light"] .icon-label h3,
:root[data-theme="light"] .card-header.with-padding h3 {
  color: #111827;
}

:root[data-theme="light"] .setup-header-right {
  background-color: transparent;
}

:root[data-theme="light"] .progress-bar-bg {
  background-color: #e5e7eb;
}

:root[data-theme="light"] .progress-bar-fill,
:root[data-theme="light"] .btn-primary {
  background-color: #111827;
  color: #ffffff;
}

:root[data-theme="light"] .setup-item {
  background-color: #ffffff;
  border-color: #e5e7eb;
}

:root[data-theme="light"] .setup-item:hover {
  background-color: #f9fafb;
}

:root[data-theme="light"] .item-icon {
  background-color: #f3f4f6;
  color: #111827;
}

:root[data-theme="light"] .item-title-row h3 {
  color: #111827;
}

:root[data-theme="light"] .btn-white {
  background-color: #111827;
  color: #ffffff;
}

:root[data-theme="light"] .btn-outline {
  border-color: #d1d5db;
  color: #111827;
}

:root[data-theme="light"] .btn-outline:hover {
  background-color: #f3f4f6;
}

:root[data-theme="light"] .stat-box {
  background-color: #f9fafb;
  border-color: #e5e7eb;
}

:root[data-theme="light"] .stat-value {
  color: #111827;
}

:root[data-theme="light"] .action-icon {
  background-color: #f3f4f6;
  color: #111827;
}

:root[data-theme="light"] .action-btn:hover .action-icon {
  background-color: #e5e7eb;
}

:root[data-theme="light"] .btn-text {
  color: #111827;
}

:root[data-theme="light"] .data-table th,
:root[data-theme="light"] .data-table td,
:root[data-theme="light"] .y-axis {
  border-color: #e5e7eb;
}
</style>
