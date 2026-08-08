<template>
  <footer class="footer" style="border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 3rem; padding-bottom: 2rem; background: var(--bg-main);">
    <div class="footer-grid" style="display: grid; grid-template-columns: 2.5fr 1fr 1fr 1fr; gap: 2rem; max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
      <div class="footer-col">
        <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem; color: #fff;">Vender.id</h3>
        <p style="color: var(--text-secondary); line-height: 1.6; font-size: 0.85rem; max-width: 250px;">{{ $t('footer.desc') }}</p>
      </div>
      <div class="footer-col" style="display: flex; flex-direction: column; gap: 0.75rem;">
        <h4 style="font-size: 0.85rem; font-weight: 700; color: #fff; letter-spacing: 1px; margin-bottom: 0.5rem;">{{ $t('footer.product') }}</h4>
        <a href="#fitur" style="color: var(--text-secondary); font-size: 0.85rem; text-decoration: none;">{{ $t('footer.features') }}</a>
        <a href="#harga" style="color: var(--text-secondary); font-size: 0.85rem; text-decoration: none;">{{ $t('footer.pricing') }}</a>
        <a href="#faq" style="color: var(--text-secondary); font-size: 0.85rem; text-decoration: none;">{{ $t('footer.faq') }}</a>
      </div>
      <div class="footer-col" style="display: flex; flex-direction: column; gap: 0.75rem;">
        <h4 style="font-size: 0.85rem; font-weight: 700; color: #fff; letter-spacing: 1px; margin-bottom: 0.5rem;">{{ $t('footer.legal') }}</h4>
        <a href="#" style="color: var(--text-secondary); font-size: 0.85rem; text-decoration: none;">{{ $t('footer.terms') }}</a>
        <a href="#" style="color: var(--text-secondary); font-size: 0.85rem; text-decoration: none;">{{ $t('footer.privacy') }}</a>
      </div>
      <div class="footer-col" style="display: flex; flex-direction: column; gap: 0.75rem;">
        <h4 style="font-size: 0.85rem; font-weight: 700; color: #fff; letter-spacing: 1px; margin-bottom: 0.5rem;">{{ $t('footer.social') }}</h4>
        <a href="#" style="color: var(--text-secondary); font-size: 0.85rem; text-decoration: none;">Instagram</a>
        <a href="#" style="color: var(--text-secondary); font-size: 0.85rem; text-decoration: none;">Twitter</a>
        <a href="#" style="color: var(--text-secondary); font-size: 0.85rem; text-decoration: none;">LinkedIn</a>
      </div>
    </div>
    
    <div class="footer-bottom" style="max-width: 1200px; margin: 3rem auto 0; padding: 1.5rem 1rem 0; border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: center; color: var(--text-secondary); font-size: 0.85rem;">
      &copy; 2026 Vender.id. {{ $t('footer.made') }}
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}
</style>
