<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <Lock :size="24" class="header-icon" />
        <h1 class="header-title">Login Akun</h1>
      </div>
      <p class="header-subtitle">Masuk ke akun Anda untuk mengakses dashboard</p>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label>Email</label>
          <input type="email" placeholder="admin@example.com" v-model="email" :disabled="isSubmitting" required />
        </div>

        <div class="form-group">
          <div class="label-row">
            <label>Kata Sandi</label>
            <router-link to="/forgot-password" class="forgot-link">Lupa kata sandi?</router-link>
          </div>
          <div class="password-input">
            <input :type="showPassword ? 'text' : 'password'" v-model="password" :disabled="isSubmitting" required />
            <button type="button" class="toggle-password" @click="showPassword = !showPassword">
              <Eye v-if="showPassword" :size="18" />
              <EyeOff v-else :size="18" />
            </button>
          </div>
        </div>

        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" v-model="remember" :disabled="isSubmitting" />
            <span>Ingat saya</span>
          </label>
        </div>

        <div class="turnstile-wrapper">
          <div id="turnstile-widget"></div>
        </div>

        <button type="submit" class="btn-submit" :disabled="isSubmitting || !cfVerified">
          <Loader2 v-if="isSubmitting" :size="18" class="animate-spin" />
          <span v-else>Masuk</span>
        </button>
      </form>

      <div class="login-footer">
        <p>Belum punya akun?</p>
        <button type="button" class="btn-register" @click="$router.push('/register')">
          <UserPlus :size="18" />
          Daftar Sekarang
        </button>
      </div>

      <div class="toggles">
        <button class="toggle-btn" @click="toggleTheme" title="Toggle Theme">
          <Moon :size="18" v-if="currentTheme === 'dark'" />
          <Sun :size="18" v-else />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Lock, Eye, EyeOff, UserPlus, Moon, Sun, Loader2 } from 'lucide-vue-next';
import axios from 'axios';

const router = useRouter();
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const remember = ref(false);
const currentTheme = ref('dark');
const isSubmitting = ref(false);
const cfToken = ref('');
const cfVerified = ref(false);

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  currentTheme.value = savedTheme;
  document.documentElement.setAttribute('data-theme', savedTheme);

  // Load Cloudflare Turnstile explicitly
  const renderTurnstile = () => {
    if (window.turnstile) {
      window.turnstile.render('#turnstile-widget', {
        sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA',
        theme: savedTheme,
        callback: (token) => {
          cfToken.value = token;
          cfVerified.value = true;
        }
      });
    }
  };

  if (!window.turnstile) {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = renderTurnstile;
    document.head.appendChild(script);
  } else {
    renderTurnstile();
  }
});

const handleLogin = async () => {
  if (!cfToken.value) {
    alert('Harap selesaikan verifikasi keamanan.');
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    const response = await axios.post('/api/login', {
      email: email.value,
      password: password.value,
      cf_token: cfToken.value,
      remember: remember.value
    });
    
    // Simpan token di localStorage (standar Sanctum/API)
    localStorage.setItem('auth_token', response.data.access_token);
    
    // Redirect ke dashboard
    router.push('/dashboard');
    
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || 'Login gagal. Silakan periksa kembali kredensial Anda.');
    
    // Reset turnstile agar bisa diisi lagi jika gagal
    if (window.turnstile) {
      window.turnstile.reset('#turnstile-widget');
      cfToken.value = '';
      cfVerified.value = false;
    }
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
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: var(--bg-main);
}

.login-card {
  width: 100%;
  max-width: 420px;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: background-color 0.3s, border-color 0.3s;
}

.login-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
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
  margin-top: -1rem;
  margin-bottom: 0.5rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-primary);
}

.forgot-link {
  font-size: 0.8rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.forgot-link:hover {
  color: var(--text-primary);
}

.form-group input[type="email"],
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

.checkbox-group {
  flex-direction: row;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.85rem;
  color: var(--text-primary);
}

.checkbox-label input {
  accent-color: var(--text-primary);
  width: 1rem;
  height: 1rem;
}

.turnstile-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 0.25rem;
}

.btn-submit {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--text-primary);
  color: var(--bg-main);
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

.btn-submit:disabled {
  background-color: var(--border-color);
  color: var(--text-secondary);
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

.login-footer {
  text-align: center;
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.login-footer p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

.btn-register {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.65rem;
  background-color: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-register:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.toggles {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1rem;
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

/* Light mode overrides if needed */
:root[data-theme="light"] .login-page {
  background-color: #f9fafb;
}

:root[data-theme="light"] .login-card {
  background-color: #ffffff;
}

:root[data-theme="light"] .form-group input[type="email"],
:root[data-theme="light"] .form-group input[type="password"],
:root[data-theme="light"] .form-group input[type="text"] {
  background-color: #f9fafb;
}

:root[data-theme="light"] .btn-register:hover {
  background-color: #f3f4f6;
}
</style>
