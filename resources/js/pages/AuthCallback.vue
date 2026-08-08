<template>
  <div class="callback-page">
    <div v-if="state === 'loading'" class="state-loading">
      <Loader2 :size="40" class="animate-spin loading-icon" />
      <p>Mengautentikasi...</p>
    </div>
    
    <div v-else-if="state === 'success'" class="callback-card state-success">
      <div class="success-icon-wrapper">
        <Check :size="24" class="text-white" />
      </div>
      <h1 class="header-title">Email Berhasil Diverifikasi</h1>
      <p class="success-text">Akun Anda sudah aktif. Silakan login untuk melanjutkan.</p>
      
      <button type="button" class="btn-white" @click="$router.push('/login')">
        Kembali ke Login
      </button>
    </div>

    <div v-else-if="state === 'error'" class="callback-card state-error">
      <div class="error-icon-wrapper">
        <X :size="24" class="text-white" />
      </div>
      <h1 class="header-title">Verifikasi Gagal</h1>
      <p class="error-text">{{ errorMessage }}</p>
      
      <button type="button" class="btn-white" @click="$router.push('/login')">
        Kembali ke Login
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Loader2, Check, X } from 'lucide-vue-next';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

const state = ref('loading'); // loading, success, error
const errorMessage = ref('');

onMounted(async () => {
  const token = route.query.access_token || route.query.token;
  const type = route.query.type;
  
  if (!token) {
    state.value = 'error';
    errorMessage.value = 'Token tidak valid atau tidak ditemukan.';
    return;
  }
  
  if (type === 'recovery' || type === 'reset') {
    try {
      // Validate token for password reset
      await axios.post('/api/validate-reset-token', { token });
      
      // Store token securely in localStorage for the next step
      localStorage.setItem('reset_token', token);
      
      // Redirect to the actual reset password form
      setTimeout(() => {
        router.push('/reset-password');
      }, 1000); // Small delay to show the loading screen as per Image 1
    } catch (error) {
      state.value = 'error';
      errorMessage.value = error.response?.data?.message || 'Link reset kata sandi tidak valid atau sudah kedaluwarsa.';
    }
  } else {
    // Regular email verification
    try {
      await axios.post('/api/verify-email', { token });
      state.value = 'success';
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (error) {
      state.value = 'error';
      errorMessage.value = error.response?.data?.message || 'Terjadi kesalahan saat memverifikasi email.';
    }
  }
});
</script>

<style scoped>
.callback-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #121212;
}

.callback-card {
  width: 100%;
  max-width: 400px;
  background-color: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.25rem;
}

.state-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.loading-icon {
  color: #a0a0a0;
}

.state-loading p {
  color: #a0a0a0;
  font-size: 0.95rem;
  margin: 0;
}

.success-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #10b981;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 6px rgba(16, 185, 129, 0.1);
}

.error-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #ef4444;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 6px rgba(239, 68, 68, 0.1);
}

.text-white {
  color: #ffffff;
}

.header-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.success-text, .error-text {
  color: #a0a0a0;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
}

.btn-white {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem;
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: all 0.2s;
}

.btn-white:hover {
  opacity: 0.9;
}
</style>
