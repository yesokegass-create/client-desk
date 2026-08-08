<template>
  <div v-if="isActive">
    <div class="tour-backdrop" @click="endTour"></div>
    <div class="tour-guide-overlay">
    <div class="tour-guide-card">
      <div class="tour-header">
        <div class="tour-header-left">
          <Sparkles :size="14" class="sparkle-icon" />
          <span class="tour-label">Panduan langkah</span>
        </div>
        <button class="close-btn" @click="endTour">
          <X :size="16" />
        </button>
      </div>
      
      <div class="tour-content">
        <h3 class="tour-title">{{ currentStep().title }}</h3>
        <p class="tour-description">{{ currentStep().description }}</p>
        <p v-if="currentStep().note" class="tour-note">{{ currentStep().note }}</p>
        
        <div v-if="currentStep().actionText" class="tour-action-box">
          {{ currentStep().actionText }}
        </div>
      </div>
      
      <div class="tour-footer">
        <div class="footer-left">
          <button class="btn-text" @click="prevStep" :disabled="currentStepIndex === 0">
            <ArrowLeft :size="14" /> Kembali
          </button>
          <button class="btn-text" @click="endTour">Lewati</button>
        </div>
        <button class="btn-primary-sm" @click="nextStep" :disabled="!currentStep().completed">
          Lanjut <ArrowRight :size="14" />
        </button>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { watch, onMounted, onUnmounted, nextTick } from 'vue';
import { useTour } from '../composables/useTour';
import { Sparkles, X, ArrowLeft, ArrowRight } from 'lucide-vue-next';

const { isActive, currentStepIndex, currentStep, nextStep, prevStep, endTour } = useTour();

let activeHighlightElement = null;

const applyHighlight = async () => {
  if (activeHighlightElement) {
    activeHighlightElement.classList.remove('tour-highlight');
    activeHighlightElement = null;
  }
  
  if (!isActive.value) return;
  
  await nextTick();
  // Wait for route transition to finish
  setTimeout(() => {
    const selector = currentStep().targetSelector;
    if (selector) {
      const el = document.querySelector(selector);
      if (el) {
        el.classList.add('tour-highlight');
        activeHighlightElement = el;
        
        // Custom scroll to ensure element isn't hidden behind the bottom card
        const rect = el.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // The card is at the bottom, so we want the element to be positioned higher up (e.g., 30% from top)
        const targetY = rect.top + scrollTop - (window.innerHeight * 0.3);
        
        window.scrollTo({
          top: targetY,
          behavior: 'smooth'
        });
      }
    }
  }, 400);
};

watch([isActive, currentStepIndex], () => {
  applyHighlight();
});

onMounted(() => {
  if (isActive.value) applyHighlight();
});

onUnmounted(() => {
  if (activeHighlightElement) {
    activeHighlightElement.classList.remove('tour-highlight');
  }
});
</script>

<style scoped>
.tour-guide-overlay {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 650px;
  padding: 0 24px;
  display: flex;
  justify-content: center;
  z-index: 9999;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from { transform: translate(-50%, 20px); opacity: 0; }
  to { transform: translate(-50%, 0); opacity: 1; }
}

.tour-guide-card {
  width: 100%;
  background-color: #111111;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.tour-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.tour-header-left {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #a0a0a0;
}

.sparkle-icon {
  color: #a855f7;
}

.tour-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.close-btn {
  background: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.tour-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tour-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.tour-description {
  font-size: 0.85rem;
  color: #d1d5db;
  line-height: 1.5;
  margin: 0;
}

.tour-note {
  font-size: 0.85rem;
  color: #9ca3af;
  line-height: 1.5;
  margin: 0;
}

.tour-action-box {
  margin-top: 4px;
  padding: 10px 12px;
  background-color: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 6px;
  color: #93c5fd;
  font-size: 0.8rem;
  font-weight: 500;
}

.tour-footer {
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-left {
  display: flex;
  gap: 12px;
}

.btn-text {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0;
}

.btn-text:disabled {
  color: #555;
  cursor: not-allowed;
}

.btn-text:not(:disabled):hover {
  text-decoration: underline;
}

.btn-primary-sm {
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn-primary-sm:hover {
  opacity: 0.9;
}

.btn-primary-sm:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .tour-guide-overlay {
    bottom: 0;
    padding: 0;
    max-width: 100%;
  }
  
  @keyframes slideUp {
    from { transform: translate(-50%, 100%); opacity: 0; }
    to { transform: translate(-50%, 0); opacity: 1; }
  }
  
  .tour-guide-card {
    border-radius: 20px 20px 0 0;
    border-bottom: none;
    border-left: none;
    border-right: none;
    padding-bottom: env(safe-area-inset-bottom, 16px);
  }
  
  .tour-content {
    padding: 20px 24px;
  }
  
  .tour-header {
    padding: 16px 24px;
  }
  
  .tour-footer {
    padding: 16px 24px;
  }
}
</style>

<style>
/* Global styles for tour highlighting */
.tour-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9990;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.tour-highlight {
  position: relative !important;
  z-index: 9995 !important;
  /* Glowing focus box matching the right screenshot */
  box-shadow: 0 0 0 2px var(--bg-card), 0 0 0 4px #a855f7 !important;
  border-radius: 8px !important;
  pointer-events: auto; /* Ensure it's clickable above backdrop */
  transition: all 0.3s ease;
  background-color: var(--bg-card) !important;
}

/* Specific fix for inputs so they don't look transparent if they rely on parents */
input.tour-highlight {
  background-color: var(--bg-main) !important;
}

:root[data-theme="light"] .tour-highlight {
  box-shadow: 0 0 0 2px var(--bg-card), 0 0 0 4px #a855f7 !important;
}

:root[data-theme="light"] input.tour-highlight {
  background-color: #ffffff !important;
}
</style>
