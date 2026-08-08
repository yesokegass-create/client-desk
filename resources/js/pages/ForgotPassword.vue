<template>
  <div class="forgot-password-page">
    <div class="card" v-if="!isSuccess">
      <div class="header">
        <Key :size="24" class="header-icon" />
        <h1 class="header-title">Lupa Kata Sandi</h1>
      </div>
      
      <p class="header-subtitle">Masukkan email Anda untuk menerima link reset kata sandi</p>
      <p class="header-subtitle-small">Jika link aktivasi atau reset sebelumnya sudah kedaluwarsa, masukkan email di sini untuk menerima link baru.</p>

      <form @submit.prevent="handleReset" class="form-container">
        <div class="form-group">
          <label>Email</label>
          <input type="email" placeholder="admin@example.com" v-model="email" :disabled="isSubmitting" required />
        </div>

        <button type="submit" class="btn-submit" :disabled="isSubmitting" :class="{ 'is-submitting': isSubmitting }">
          <Loader2 v-if="isSubmitting" :size="18" class="animate-spin" />
          <span v-if="isSubmitting">Mengirim...</span>
          <span v-else>Kirim Link Reset</span>
        </button>
      </form>

      <div class="footer-divider"></div>

      <button type="button" class="btn-back" @click="$router.push('/login')">
        <ArrowLeft :size="18" />
        Kembali ke Login
      </button>

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

    <!-- Success Screen (Matches Image 3) -->
    <div class="card success-card" v-else>
      <div class="success-icon-wrapper">
        <Mail :size="28" />
      </div>
      <h1 class="header-title text-center">Cek Email Anda</h1>
      <p class="success-text">
        Kami telah mengirimkan link reset kata sandi ke email Anda. Klik link tersebut untuk mengatur kata sandi baru.
      </p>
      
      <div class="email-box">
        {{ email }}
      </div>
      
      <button type="button" class="btn-back" @click="$router.push('/login')">
        <ArrowLeft :size="18" />
        Kembali ke Login
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Key, Moon, Sun, Loader2, Mail, ArrowLeft, Languages } from 'lucide-vue-next';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const currentTheme = ref('dark');
const isSubmitting = ref(false);
const isSuccess = ref(false);

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  currentTheme.value = savedTheme;
  document.documentElement.setAttribute('data-theme', savedTheme);
});

const handleReset = async () => {
  isSubmitting.value = true;
  
  try {
    const response = await axios.post('/api/forgot-password', {
      email: email.value
    });
    // Regardless of whether it actually exists, we show success screen
    isSuccess.value = true;
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || 'Gagal mengirim link reset.');
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
.forgot-password-page {
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
  margin-bottom: 1rem;
}

.header-icon {
  color: var(--text-primary);
}

.header-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.header-subtitle {
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.header-subtitle-small {
  text-align: center;
  color: #666;
  font-size: 0.8rem;
  line-height: 1.4;
  margin-top: 0;
  margin-bottom: 1.5rem;
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

.form-group input[type="email"] {
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

.footer-divider {
  border-top: 1px solid var(--border-color);
  margin: 1.5rem 0;
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

.toggles {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
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
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: #fff;
}

.header-title.text-center {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.success-text {
  color: #a0a0a0;
  font-size: 0.85rem;
  line-height: 1.5;
  margin: 0 0 1rem 0;
}

.email-box {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.05);
  border: none;
  border-radius: 6px;
  padding: 0.75rem;
  font-size: 0.85rem;
  color: #a0a0a0;
  margin: 0.5rem 0 1.5rem;
  text-align: center;
}

/* Light mode overrides if needed */
:root[data-theme="light"] .forgot-password-page {
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
