<template>
  <div class="register-page">
    <div class="register-card" v-if="!isSuccess">
      <div class="register-header">
        <UserPlus :size="24" class="header-icon" />
        <h1 class="header-title">Daftar Akun Baru</h1>
      </div>
      <p class="header-subtitle">Buat akun baru untuk mengakses Vender.id</p>

      <form @submit.prevent="handleRegister" class="register-form" autocomplete="off">
        <div class="form-group">
          <label>Nama Lengkap</label>
          <input type="text" placeholder="Johnathan Baker" v-model="name" :disabled="isSubmitting" autocomplete="off" required />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input type="email" placeholder="contoh.email@gmail.com" v-model="email" :disabled="isSubmitting" autocomplete="off" @blur="handleEmailBlur" required />
        </div>

        <div class="form-group">
          <label>Kata Sandi</label>
          <div class="password-input">
            <input :type="showPassword ? 'text' : 'password'" v-model="password" :disabled="isSubmitting" autocomplete="new-password" required />
            <button type="button" class="toggle-password" @click="showPassword = !showPassword">
              <Eye v-if="showPassword" :size="18" />
              <EyeOff v-else :size="18" />
            </button>
          </div>
        </div>

        <div class="form-group">
          <label>Konfirmasi Kata Sandi</label>
          <div class="password-input">
            <input :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword" :disabled="isSubmitting" autocomplete="new-password" required />
            <button type="button" class="toggle-password" @click="showConfirmPassword = !showConfirmPassword">
              <Eye v-if="showConfirmPassword" :size="18" />
              <EyeOff v-else :size="18" />
            </button>
          </div>
        </div>

        <div class="error-box" v-if="emailError">
          Email ini sudah terdaftar. Silakan login.
        </div>

        <div class="turnstile-wrapper">
          <div id="turnstile-widget"></div>
        </div>

        <button type="submit" class="btn-submit" :disabled="isSubmitting || !cfVerified || emailError">
          <Loader2 v-if="isSubmitting" :size="18" class="animate-spin" />
          <span v-else>Daftar</span>
        </button>
      </form>

      <div class="register-footer">
        <p>Sudah punya akun?</p>
        <button type="button" class="btn-login" @click="$router.push('/login')">
          Masuk
        </button>
      </div>

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

    <!-- Success Screen -->
    <div class="register-card success-card" v-else>
      <div class="success-icon-wrapper">
        <Mail :size="28" />
      </div>
      <h1 class="header-title text-center">Cek Email Anda</h1>
      <p class="success-text">
        Kami telah mengirimkan link konfirmasi ke email Anda. Klik link tersebut untuk mengaktifkan akun.
      </p>
      <p class="success-text">
        Jika email belum masuk ke inbox, cek folder <strong>spam/junk</strong> di email Anda.
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
import { UserPlus, Eye, EyeOff, Moon, Sun, Loader2, Mail, ArrowLeft, Languages } from 'lucide-vue-next';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const currentTheme = ref('dark');
const isSubmitting = ref(false);
const isSuccess = ref(false);
const cfToken = ref('');
const cfVerified = ref(false);
const emailError = ref(false);

const handleEmailBlur = async () => {
  if (!email.value) return;
  
  // Auto-detect name if empty
  if (!name.value) {
    const emailPrefix = email.value.split('@')[0];
    let formattedName = emailPrefix
      .replace(/[._-]/g, ' ')
      .replace(/([a-zA-Z])(\d)/g, '$1 $2')
      .replace(/\b\w/g, char => char.toUpperCase());
    name.value = formattedName;
  }
  
  // Check if email already exists
  try {
    const res = await axios.post('/api/check-email', { email: email.value });
    if (res.data.exists) {
      emailError.value = true;
    } else {
      emailError.value = false;
    }
  } catch (err) {
    console.error('Error checking email', err);
  }
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  currentTheme.value = savedTheme;
  document.documentElement.setAttribute('data-theme', savedTheme);

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

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Kata sandi tidak cocok!');
    return;
  }
  
  if (!cfToken.value) {
    alert('Harap selesaikan verifikasi keamanan.');
    return;
  }
  
  if (emailError.value) {
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    const response = await axios.post('/api/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      cf_token: cfToken.value
    });
    
    isSuccess.value = true;
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || 'Pendaftaran gagal. Silakan coba lagi.');
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
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: var(--bg-main);
}

.register-card {
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

.register-header {
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

.register-form {
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

.turnstile-wrapper {
  display: flex;
  justify-content: flex-start;
  margin-top: 0.25rem;
}

.error-box {
  background-color: #3f1d1d;
  color: #f87171;
  border: 1px solid rgba(248, 113, 113, 0.2);
  padding: 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  margin-top: 0.25rem;
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

.register-footer {
  text-align: center;
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.register-footer p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

.btn-login {
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

.btn-login:hover {
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

.success-card {
  align-items: center;
  text-align: center;
  padding: 3rem 2rem;
  background-color: #121212;
  border: 1px solid rgba(255, 255, 255, 0.05);
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

/* Light mode overrides if needed */
:root[data-theme="light"] .register-page {
  background-color: #f9fafb;
}

:root[data-theme="light"] .register-card {
  background-color: #ffffff;
}
</style>
