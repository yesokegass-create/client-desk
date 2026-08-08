<template>
  <main class="page-container features-page">
    <div class="breadcrumb text-center">
      <router-link to="/" class="back-link">{{ $t('features_page.back_home') }}</router-link>
      <span class="separator">/</span>
      <span class="current">{{ $t('features_page.current') }}</span>
    </div>

    <div class="page-header text-center">
      <h1>{{ $t('features_page.title') }}</h1>
      <p>{{ $t('features_page.desc') }}</p>
    </div>

    <!-- Fitur Utama -->
    <section class="features-section-detailed">
      <div class="section-title text-center">
        <h2><span class="icon text-yellow">⭐</span> {{ $t('features_page.main_features') }}</h2>
      </div>
      <div class="features-grid-detailed">
        <div class="feature-card-detailed">
          <div class="icon-wrapper bg-blue-dark">
            <span class="icon text-blue">▦</span>
          </div>
          <h3>{{ $t('features_page.f1_title') }}</h3>
          <p>{{ $t('features_page.f1_desc') }}</p>
        </div>
        <div class="feature-card-detailed">
          <div class="icon-wrapper bg-green-dark">
            <span class="icon text-green">📄</span>
          </div>
          <h3>{{ $t('features_page.f2_title') }}</h3>
          <p>{{ $t('features_page.f2_desc') }}</p>
        </div>
        <div class="feature-card-detailed">
          <div class="icon-wrapper bg-teal-dark">
            <span class="icon text-teal">💬</span>
          </div>
          <h3>{{ $t('features_page.f3_title') }}</h3>
          <p>{{ $t('features_page.f3_desc') }}</p>
        </div>
        <!-- Second row -->
        <div class="feature-card-detailed plain">
          <p>{{ $t('features_page.f4_desc') }}</p>
        </div>
        <div class="feature-card-detailed plain">
          <p>{{ $t('features_page.f5_desc') }}</p>
        </div>
        <div class="feature-card-detailed plain">
          <p>{{ $t('features_page.f6_desc') }}</p>
        </div>
      </div>
    </section>

    <!-- Fitur Tambahan -->
    <section class="features-section-detailed">
      <div class="section-title text-center mt-8">
        <h2><span class="icon text-orange">✨</span> {{ $t('features_page.extra_features') }}</h2>
      </div>
      <div class="features-grid-detailed">
        <div class="feature-card-detailed">
          <div class="icon-wrapper bg-orange-dark">
            <span class="icon text-orange">🔗</span>
          </div>
          <h3>{{ $t('features_page.e1_title') }}</h3>
          <p>{{ $t('features_page.e1_desc') }}</p>
        </div>
        <div class="feature-card-detailed">
          <div class="icon-wrapper bg-blue-dark">
            <span class="icon text-blue">📁</span>
          </div>
          <h3>{{ $t('features_page.e2_title') }}</h3>
          <p>{{ $t('features_page.e2_desc') }}</p>
        </div>
        <div class="feature-card-detailed">
          <div class="icon-wrapper bg-purple-dark">
            <span class="icon text-purple">👥</span>
          </div>
          <h3>{{ $t('features_page.e3_title') }}</h3>
          <p>{{ $t('features_page.e3_desc') }}</p>
        </div>
      </div>
    </section>

    <!-- Final CTA inside features -->
    <section class="features-cta">
      <div class="cta-box text-center">
        <div class="cta-badge">{{ $t('features_page.cta_badge') }}</div>
        <h2>{{ $t('features_page.cta_title') }}</h2>
        <p>{{ $t('features_page.cta_desc') }}</p>
        <button class="btn-primary">{{ $t('features_page.cta_btn') }}</button>
        <p class="small-text">{{ $t('features_page.cta_small') }}</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.page-container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2rem 2rem 6rem;
}
.text-center { text-align: center; }
.mt-8 { margin-top: 4rem; }
</style>
