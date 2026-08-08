<template>
  <header class="navbar">
    <div class="logo">
      <router-link to="/" class="logo-link">
        <UserCog class="logo-icon" :size="28" />
        <span class="logo-text">Vender.id</span>
      </router-link>
    </div>
    
    <div class="mobile-toggle" @click="toggleMobileMenu">
      <Menu v-if="!isMobileMenuOpen" :size="24" />
      <X v-else :size="24" />
    </div>

    <nav class="nav-links" :class="{ 'mobile-open': isMobileMenuOpen }">
      <router-link to="/fitur" @click="isMobileMenuOpen = false">{{ t('navbar.features') }}</router-link>
      <router-link to="/harga" @click="isMobileMenuOpen = false">{{ t('navbar.pricing') }}</router-link>
      <router-link to="/faq" @click="isMobileMenuOpen = false">{{ t('navbar.faq') }}</router-link>
    </nav>
    
    <div class="nav-actions" :class="{ 'mobile-open': isMobileMenuOpen }">
      <!-- Language Switcher -->
      <div class="dropdown-wrapper" ref="langDropdownRef">
        <button class="icon-btn" @click="toggleLang" :class="{ active: langOpen }">
          <Languages :size="20" />
        </button>
        <div v-if="langOpen" class="dropdown-menu">
          <button 
            @click="setLang('id')" 
            class="dropdown-item" 
            :class="{ active: locale === 'id' }"
          >
            Bahasa Indonesia
          </button>
          <button 
            @click="setLang('en')" 
            class="dropdown-item" 
            :class="{ active: locale === 'en' }"
          >
            English
          </button>
        </div>
      </div>

      <!-- Theme Switcher -->
      <div class="dropdown-wrapper" ref="themeDropdownRef">
        <button class="icon-btn" @click="toggleThemeMenu" :class="{ active: themeOpen }">
          <component :is="currentThemeIcon" :size="20" />
        </button>
        <div v-if="themeOpen" class="dropdown-menu">
          <button 
            @click="setTheme('light')" 
            class="dropdown-item"
            :class="{ active: currentTheme === 'light' }"
          >
            <Sun :size="16" class="dropdown-icon" /> {{ t('theme.light') }}
          </button>
          <button 
            @click="setTheme('dark')" 
            class="dropdown-item"
            :class="{ active: currentTheme === 'dark' }"
          >
            <Moon :size="16" class="dropdown-icon" /> {{ t('theme.dark') }}
          </button>
          <button 
            @click="setTheme('system')" 
            class="dropdown-item"
            :class="{ active: currentTheme === 'system' }"
          >
            <Monitor :size="16" class="dropdown-icon" /> {{ t('theme.system') }}
          </button>
        </div>
      </div>
      
      <router-link to="/login" class="btn-login" @click="isMobileMenuOpen = false">{{ t('navbar.login') }}</router-link>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { UserCog, Languages, Moon, Sun, Monitor, Menu, X } from 'lucide-vue-next';

const { t, locale } = useI18n();

const langOpen = ref(false);
const themeOpen = ref(false);
const langDropdownRef = ref(null);
const themeDropdownRef = ref(null);
const isMobileMenuOpen = ref(false);

const currentTheme = ref('dark');

const currentThemeIcon = computed(() => {
  if (currentTheme.value === 'light') return Sun;
  if (currentTheme.value === 'dark') return Moon;
  return Monitor;
});

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const toggleLang = () => {
  langOpen.value = !langOpen.value;
  if (langOpen.value) themeOpen.value = false;
};

const toggleThemeMenu = () => {
  themeOpen.value = !themeOpen.value;
  if (themeOpen.value) langOpen.value = false;
};

const setLang = (lang) => {
  locale.value = lang;
  langOpen.value = false;
};

const applyTheme = (theme) => {
  const root = document.documentElement;
  if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  } else {
    root.setAttribute('data-theme', theme);
  }
};

const setTheme = (theme) => {
  currentTheme.value = theme;
  applyTheme(theme);
  localStorage.setItem('theme', theme);
  themeOpen.value = false;
};

const handleClickOutside = (event) => {
  if (langDropdownRef.value && !langDropdownRef.value.contains(event.target)) {
    langOpen.value = false;
  }
  if (themeDropdownRef.value && !themeDropdownRef.value.contains(event.target)) {
    themeOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  
  const savedTheme = localStorage.getItem('theme') || 'dark';
  currentTheme.value = savedTheme;
  applyTheme(savedTheme);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 4rem;
  max-width: 100% !important;
  margin: 0 auto;
  border-bottom: 1px solid var(--border-color);
  background-color: color-mix(in srgb, var(--bg-main) 60%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 50;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-primary);
}

.logo-icon {
  color: var(--text-primary);
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: var(--text-secondary);
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-links a:hover, .nav-links a.router-link-active {
  color: var(--text-primary);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.dropdown-wrapper {
  position: relative;
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.icon-btn:hover, .icon-btn.active {
  color: var(--text-primary);
  background: var(--border-color);
  border-color: transparent;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 0.5rem;
  min-width: 180px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  z-index: 100;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-sm);
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
}

.dropdown-item:hover, .dropdown-item.active {
  background: var(--border-color);
  color: var(--text-primary);
}

.dropdown-icon {
  color: inherit;
}

.btn-login {
  background: var(--text-primary);
  color: var(--bg-main);
  border: none;
  border-radius: var(--radius-md);
  padding: 0.5rem 1.25rem;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
}

.btn-login:hover {
  transform: translateY(-1px);
}

.mobile-toggle {
  display: none;
  cursor: pointer;
  color: var(--text-primary);
}

@media (max-width: 900px) {
  .navbar {
    padding: 1rem 1.5rem;
  }
  
  .mobile-toggle {
    display: block;
    z-index: 60;
  }

  .nav-links {
    display: none;
    flex-direction: column;
    width: 100%;
    text-align: center;
  }

  .nav-actions {
    display: none;
    flex-direction: column;
    width: 100%;
    text-align: center;
  }

  .nav-links.mobile-open, .nav-actions.mobile-open {
    display: flex;
  }

  .nav-links.mobile-open {
    position: absolute;
    top: 70px;
    left: 0;
    background: var(--bg-main);
    padding: 2rem 0 1rem;
    border-bottom: none;
    z-index: 55;
  }

  .nav-actions.mobile-open {
    position: absolute;
    top: 200px;
    left: 0;
    background: var(--bg-main);
    padding: 1rem 0 2rem;
    border-bottom: 1px solid var(--border-color);
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
    z-index: 55;
  }
}
</style>
