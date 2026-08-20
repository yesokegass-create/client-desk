<template>
  <DashboardLayout>
    <div class="profil-akun-page">
      <!-- Breadcrumbs & Header -->
      <div class="page-header">
        <div class="breadcrumb">
          <router-link to="/pengaturan" class="breadcrumb-link">Pengaturan</router-link>
          <span class="separator">›</span>
          <span class="breadcrumb-link">Akun</span>
          <span class="separator">›</span>
          <span class="breadcrumb-current">Profil</span>
        </div>
        
        <div class="header-title-row">
          <button class="back-btn" @click="$router.push('/pengaturan')">
            <ArrowLeft :size="20" />
          </button>
          <div class="title-content">
            <h1 class="page-title">Profil</h1>
            <p class="page-subtitle">Perbarui nama pribadi, informasi email, dan foto profil Anda.</p>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="profile-card">
        <!-- Avatar Upload -->
        <div class="avatar-section">
          <div class="avatar-wrapper">
            <div class="avatar-large">{{ userInitials }}</div>
            <button class="camera-btn">
              <Camera :size="14" />
            </button>
          </div>
          <p class="upload-hint">Klik untuk upload foto</p>
        </div>

        <!-- Form Fields -->
        <div class="form-section">
          <div class="form-group">
            <label class="form-label">Nama <span class="text-danger">*</span></label>
            <input type="text" v-model="form.nama" :class="getInputClass('nama')" id="tour-target-nama" :disabled="isLoading" :placeholder="isLoading ? 'Memuat data...' : ''" @input="clearError('nama')" />
            <span v-if="errors.nama" class="error-text">{{ errors.nama }}</span>
          </div>

          <div class="form-group">
            <label>Email</label>
            <input type="email" v-model="form.email" class="form-control" disabled :placeholder="isLoading ? 'Memuat data...' : ''" />
            <span class="help-text">Email tidak dapat diubah</span>
          </div>

          <!-- Membership Status -->
          <div class="membership-section">
            <label>Status Membership</label>
            <div class="membership-card">
              <div class="membership-info">
                <div class="badge-trial">
                  <Flame :size="12" class="flame-icon" />
                  Trial
                </div>
                <div class="membership-details">
                  <h4>Trial</h4>
                  <p class="expiry-text">Berlaku sampai: 10 Agustus 2026 (7 hari lagi)</p>
                </div>
              </div>
              <button class="btn-outline">
                <RefreshCw :size="14" class="mr-2" />
                Kelola Paket
              </button>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button class="btn-primary" @click="saveProfile" :disabled="isSaving">
            <Save :size="16" class="mr-2" v-if="!isSaving" />
            <span v-if="isSaving">Menyimpan...</span>
            <span v-else>Simpan Perubahan</span>
          </button>
          <button class="btn-secondary">
            <KeyRound :size="16" class="mr-2" />
            Reset Password
          </button>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout.vue';
import { useRouter } from 'vue-router';
import { useTour } from '../composables/useTour';
import { useFormValidation } from '../composables/useFormValidation';
import { 
  ArrowLeft, Camera, Flame, RefreshCw, Save, KeyRound 
} from 'lucide-vue-next';

const router = useRouter();
const { isActive, endTour, completeStep } = useTour();

const form = ref({
  nama: '',
  email: ''
});

const isLoading = ref(true);
const isSaving = ref(false);

const { errors, clearErrors, clearError, handleValidationErrors, getInputClass } = useFormValidation();

const userInitials = computed(() => {
  if (!form.value.nama) return 'U';
  return form.value.nama.charAt(0).toUpperCase();
});

onMounted(async () => {
  try {
    const token = localStorage.getItem('auth_token');
    const response = await axios.get('/api/user', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.data) {
      form.value.nama = response.data.name;
      form.value.email = response.data.email;
      if (form.value.nama) {
        completeStep('setup-profile');
      }
    }
  } catch (error) {
    console.error('Failed to fetch user data', error);
  } finally {
    isLoading.value = false;
  }
});

const saveProfile = async () => {
  if (isSaving.value) return;
  
  // Validation
  if (!form.value.nama.trim()) {
    errors.value.nama = 'Nama wajib diisi';
    return;
  }
  
  isSaving.value = true;
  
  try {
    const token = localStorage.getItem('auth_token');
    await axios.put('/api/user', {
      name: form.value.nama
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    const setupStatus = JSON.parse(localStorage.getItem('vender_setup_status') || '{}');
    const isFirstSetup = !setupStatus.step1_completed;

    completeStep('setup-profile');
    
    // Also update local cache for Dashboard Layout SWR
    const cachedProfile = localStorage.getItem('vender_user_profile');
    if (cachedProfile) {
      try {
        const parsed = JSON.parse(cachedProfile);
        parsed.name = form.value.nama;
        localStorage.setItem('vender_user_profile', JSON.stringify(parsed));
      } catch (e) {}
    }

    if (isActive.value) {
      endTour();
      window.location.href = '/dashboard';
    }
  } catch (error) {
    console.error('Failed to update profile', error);
    if (!handleValidationErrors(error)) {
      alert('Gagal memperbarui profil.');
    }
  } finally {
    isSaving.value = false;
  }
};
</script>

<style scoped>
.profil-akun-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 100%;
}

/* Header */
.page-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #a0a0a0;
}

.breadcrumb-link {
  color: #a0a0a0;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: #ffffff;
}

.separator {
  color: #666;
}

.breadcrumb-current {
  color: #ffffff;
}

.header-title-row {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.back-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.back-btn:hover {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
}

.title-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: #ffffff;
}

.page-subtitle {
  font-size: 0.85rem;
  color: #a0a0a0;
  margin: 0;
}

/* Main Card */
.profile-card {
  background-color: #121212;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

/* Avatar Section */
.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.avatar-wrapper {
  position: relative;
}

.avatar-large {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background-color: #333333;
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.camera-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #ffffff;
  color: #000000;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  transition: transform 0.2s;
}

.camera-btn:hover {
  transform: scale(1.05);
}

.upload-hint {
  font-size: 0.85rem;
  color: #a0a0a0;
  margin: 0;
}

/* Form Fields */
.form-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label, .membership-section label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #ffffff;
}

.form-control {
  background-color: #0a0a0a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: #ffffff;
  font-size: 0.9rem;
  font-family: inherit;
  width: 100%;
}

.form-control:focus {
  outline: none;
  border-color: #3b82f6;
}

.form-control:disabled {
  background-color: rgba(59, 130, 246, 0.05); /* Slight blue tint as in image */
  color: #888;
  cursor: not-allowed;
  border-color: rgba(59, 130, 246, 0.2);
}

.form-control.has-error {
  border-color: #ef4444;
}

.error-msg {
  font-size: 0.75rem;
  color: #ef4444;
  margin-top: 0.25rem;
}

.text-danger {
  color: #ef4444;
}

.help-text {
  font-size: 0.75rem;
  color: #888;
}

/* Membership */
.membership-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.membership-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem 1.25rem;
}

.membership-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.badge-trial {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background-color: rgba(168, 85, 247, 0.1);
  border: 1px solid rgba(168, 85, 247, 0.2);
  color: #c084fc;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
}

.flame-icon {
  color: #c084fc;
}

.membership-details h4 {
  margin: 0 0 0.25rem 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #ffffff;
}

.expiry-text {
  margin: 0;
  font-size: 0.8rem;
  color: #f87171; /* Red-ish color for expiry */
}

.btn-outline {
  display: flex;
  align-items: center;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-outline:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.mr-2 {
  margin-right: 0.5rem;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-primary {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: #000000;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-secondary {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1f2937;
  color: #fff;
  border: 1px solid #374151;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background-color: #374151;
}

.error-input {
  border-color: #ef4444 !important;
}

.error-text {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: block;
}

/* Mobile Responsiveness */


/* Responsive */
@media (max-width: 640px) {
  .membership-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .btn-outline {
    width: 100%;
    justify-content: center;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}

/* Light Theme Adjustments */
:root[data-theme="light"] .breadcrumb-current,
:root[data-theme="light"] .page-title,
:root[data-theme="light"] .form-group label,
:root[data-theme="light"] .membership-section label,
:root[data-theme="light"] .membership-details h4 {
  color: #111827;
}

:root[data-theme="light"] .breadcrumb-link:hover {
  color: #374151;
}

:root[data-theme="light"] .back-btn {
  color: #111827;
  border-color: #e5e7eb;
}

:root[data-theme="light"] .back-btn:hover {
  background-color: #f3f4f6;
  border-color: #d1d5db;
}

:root[data-theme="light"] .profile-card {
  background-color: #ffffff;
  border-color: #e5e7eb;
}

:root[data-theme="light"] .form-control {
  background-color: #ffffff;
  border-color: #d1d5db;
  color: #111827;
}

:root[data-theme="light"] .form-control:disabled {
  background-color: #eff6ff; /* light blue bg */
  border-color: #bfdbfe;
  color: #6b7280;
}

:root[data-theme="light"] .membership-card {
  border-color: #e5e7eb;
}

:root[data-theme="light"] .btn-outline {
  color: #111827;
  border-color: #d1d5db;
}

:root[data-theme="light"] .btn-outline:hover {
  background-color: #f9fafb;
}

:root[data-theme="light"] .btn-primary {
  background-color: #111827;
  color: #ffffff;
}

:root[data-theme="light"] .btn-secondary {
  background-color: #ffffff;
  color: #111827;
  border-color: #d1d5db;
}

:root[data-theme="light"] .btn-secondary:hover {
  background-color: #f9fafb;
}
</style>
