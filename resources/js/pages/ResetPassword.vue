<template>
  <div class="reset-password-page">
    <div class="card" v-if="!isSuccess">
      <div class="header">
        <ShieldCheck :size="24" class="header-icon" />
        <h1 class="header-title">Atur Kata Sandi Baru</h1>
      </div>
      
      <p class="header-subtitle">Masukkan kata sandi baru untuk akun Anda</p>

      <form @submit.prevent="handleReset" class="form-container">
        <div class="form-group">
          <label>Kata Sandi Baru</label>
          <div class="password-input">
            <input :type="showPassword ? 'text' : 'password'" v-model="password" :disabled="isSubmitting" required />
            <button type="button" class="toggle-password" @click="showPassword = !showPassword">
              <Eye v-if="showPassword" :size="18" />
              <EyeOff v-else :size="18" />
            </button>
          </div>
        </div>

        <div class="form-group">
          <label>Konfirmasi Kata Sandi</label>
          <div class="password-input">
            <input :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword" :disabled="isSubmitting" required />
            <button type="button" class="toggle-password" @click="showConfirmPassword = !showConfirmPassword">
              <Eye v-if="showConfirmPassword" :size="18" />
              <EyeOff v-else :size="18" />
            </button>
          </div>
        </div>

        <button type="submit" class="btn-submit" :disabled="isSubmitting" :class="{ 'is-submitting': isSubmitting }">
          <Loader2 v-if="isSubmitting" :size="18" class="animate-spin" />
          <span v-if="isSubmitting">Menyimpan...</span>
          <span v-else>Simpan Kata Sandi</span>
        </button>
      </form>

      <div class="toggles">
        <button class="toggle-btn" title="Ganti Bahasa">
          <Languages :size="18" />
        </button>
        <button class="toggle-btn" @click="toggleTheme" title="Ganti Tema">
          <Moon :size="18" v-if="currentTheme === 'dark'" />
          <Sun :size="18" v-else />
        </button>
      </div>
    </div>

    <!-- Success Screen (Matches Image 4) -->
    <div class="card success-card" v-else>
      <div class="success-icon-wrapper">
        <CheckCircle :size="32" class="text-green" />
      </div>
      <h1 class="header-title text-center">Kata Sandi Diperbarui!</h1>
      <p class="success-text">
        Kata sandi Anda berhasil diperbarui. Silakan login kembali dengan kata sandi baru.
      </p>
      
      <button type="button" class="btn-back" @click="$router.push('/login')">
        Kembali ke Login
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ShieldCheck, Eye, EyeOff, Moon, Sun, Loader2, CheckCircle, Languages } from 'lucide-vue-next';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const currentTheme = ref('dark');
const isSubmitting = ref(false);
const isSuccess = ref(false);
const resetToken = ref('');

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  currentTheme.value = savedTheme;
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Get token from localStorage
  const token = localStorage.getItem('reset_token');
  if (!token) {
    alert('Sesi pengaturan ulang kata sandi tidak valid. Silakan ulangi proses lupa kata sandi.');
    router.push('/login');
  } else {
    resetToken.value = token;
  }
});

const handleReset = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Kata sandi tidak cocok!');
    return;
  }
  
  if (password.value.length < 8) {
    alert('Kata sandi minimal 8 karakter!');
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    await axios.post('/api/reset-password', {
      token: resetToken.value,
      password: password.value
    });
    
    // Clear token
    localStorage.removeItem('reset_token');
    
    // Show success screen
    isSuccess.value = true;
    
    // Auto redirect after a few seconds
    setTimeout(() => {
      router.push('/login');
    }, 4000);
    
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || 'Gagal menyimpan kata sandi. Link mungkin sudah kedaluwarsa.');
    router.push('/login');
  } finally {
    isSubmitting.value = false;
  }
};

const toggleTheme = () => {
  const newTheme = currentTheme.value === 'dark' ? 'light' : 'dark';
  currentTheme.value = newTheme;
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
};
</script>

<style scoped>
.reset-password-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: var(--bg-main);
}

.card {
  width: 100%;
  max-width: 420px;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s, border-color 0.3s;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.header-icon {
  color: var(--text-primary);
}

.header-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.header-subtitle {
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  margin-top: 0;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-primary);
}

.form-group input[type="password"],
.form-group input[type="text"] {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: transparent;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 0.95rem;
  transition: all 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: var(--text-primary);
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-password:hover {
  color: var(--text-primary);
}

.btn-submit {
  width: 100%;
  padding: 0.75rem;
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-submit.is-submitting {
  background-color: #555555;
  color: #a0a0a0;
  cursor: not-allowed;
}

.btn-submit:not(:disabled):hover {
  opacity: 0.9;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.toggles {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;
}

.toggle-btn {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-btn:hover {
  color: var(--text-primary);
  border-color: var(--text-primary);
}

.success-card {
  align-items: center;
  text-align: center;
  padding: 3rem 2rem;
}

.success-icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: rgba(16, 185, 129, 0.1); /* light green bg */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.text-green {
  color: #10b981;
}

.header-title.text-center {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.success-text {
  color: #a0a0a0;
  font-size: 0.85rem;
  line-height: 1.5;
  margin: 0 0 1.5rem 0;
}

.btn-back {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  background-color: #0a0a0a;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  color: #fff;
  padding: 0.75rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-back:hover {
  background-color: #1a1a1a;
}

/* Light mode overrides */
:root[data-theme="light"] .reset-password-page {
  background-color: #f9fafb;
}

:root[data-theme="light"] .card {
  background-color: #ffffff;
}

:root[data-theme="light"] .btn-submit {
  background-color: #000000;
  color: #ffffff;
}

:root[data-theme="light"] .btn-submit.is-submitting {
  background-color: #d1d5db;
  color: #6b7280;
}

:root[data-theme="light"] .btn-back {
  background-color: #f3f4f6;
  color: #111827;
  border-color: #e5e7eb;
}
</style>
