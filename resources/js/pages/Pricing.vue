<template>
  <main class="page-container pricing-page">
    <div class="breadcrumb text-center">
      <router-link to="/" class="back-link">{{ $t('pricing_page.back_home') }}</router-link>
      <span class="separator">/</span>
      <span class="current">{{ $t('pricing_page.current') }}</span>
    </div>

    <div class="page-header text-center">
      <h1>{{ $t('pricing_page.title') }}</h1>
      <p>{{ $t('pricing_page.desc') }}</p>
    </div>

    <div class="trial-banner">
      <div class="banner-content">
        <span class="icon">🎁</span>
        <div>
          <strong>{{ $t('pricing_page.trial_badge') }}</strong>
          <p>{{ $t('pricing_page.trial_desc') }}</p>
        </div>
      </div>
      <div class="banner-features">
        <span><span class="check">✓</span> {{ $t('pricing_page.trial_f1') }}</span>
        <span><span class="check">✓</span> {{ $t('pricing_page.trial_f2') }}</span>
        <span><span class="check">✓</span> {{ $t('pricing_page.trial_f3') }}</span>
      </div>
    </div>

    <div class="pricing-toggle-container">
      <div class="pricing-toggle">
        <button class="active">{{ $t('pricing_page.toggle_month') }}</button>
        <button>{{ $t('pricing_page.toggle_3month') }} <span class="badge">{{ $t('pricing_page.save_10') }}</span></button>
        <button>{{ $t('pricing_page.toggle_year') }} <span class="badge highlight">{{ $t('pricing_page.save_20') }}</span></button>
      </div>
    </div>

    <div class="pricing-cards">
      <!-- Dasar -->
      <div class="pricing-card">
        <div class="card-header">
          <h3><span class="icon">🌱</span> {{ $t('pricing_page.plan1_name') }}</h3>
          <p>{{ $t('pricing_page.plan1_tag') }}</p>
        </div>
        <div class="price">
          <span class="amount">{{ $t('pricing_page.plan1_price') }}</span><span class="period">{{ $t('pricing_page.plan1_period') }}</span>
        </div>
        <p class="description">{{ $t('pricing_page.plan1_desc') }}</p>
        <ul class="feature-list">
          <li>{{ $t('pricing_page.plan1_l1') }}</li>
          <li>{{ $t('pricing_page.plan1_l2') }}</li>
          <li>{{ $t('pricing_page.plan1_l3') }}</li>
          <li>{{ $t('pricing_page.plan1_l4') }}</li>
          <li>{{ $t('pricing_page.plan1_l5') }}</li>
          <li>{{ $t('pricing_page.plan1_l6') }}</li>
          <li>{{ $t('pricing_page.plan1_l7') }}</li>
          <li>{{ $t('pricing_page.plan1_l8') }}</li>
          <li>{{ $t('pricing_page.plan1_l9') }}</li>
          <li>{{ $t('pricing_page.plan1_l10') }}</li>
          <li>{{ $t('pricing_page.plan1_l11') }}</li>
        </ul>
        <button class="btn-secondary w-full mt-auto">{{ $t('pricing_page.plan1_btn') }}</button>
      </div>

      <!-- Plus -->
      <div class="pricing-card highlighted">
        <div class="popular-badge">{{ $t('pricing_page.plan2_pop') }}</div>
        <div class="card-header">
          <h3><span class="icon">⭐</span> {{ $t('pricing_page.plan2_name') }}</h3>
          <p>{{ $t('pricing_page.plan2_tag') }}</p>
        </div>
        <div class="price">
          <span class="amount">{{ $t('pricing_page.plan2_price') }}</span><span class="period">{{ $t('pricing_page.plan2_period') }}</span>
        </div>
        <p class="description">{{ $t('pricing_page.plan2_desc') }}</p>
        <p class="includes">{{ $t('pricing_page.plan2_includes') }}</p>
        <ul class="feature-list">
          <li>{{ $t('pricing_page.plan2_l1') }}</li>
          <li>{{ $t('pricing_page.plan2_l2') }}</li>
          <li>{{ $t('pricing_page.plan2_l3') }}</li>
          <li>{{ $t('pricing_page.plan2_l4') }}</li>
          <li>{{ $t('pricing_page.plan2_l5') }}</li>
          <li>{{ $t('pricing_page.plan2_l6') }}</li>
          <li>{{ $t('pricing_page.plan2_l7') }}</li>
        </ul>
        <button class="btn-primary w-full mt-auto">{{ $t('pricing_page.plan2_btn') }}</button>
      </div>

      <!-- Pro -->
      <div class="pricing-card">
        <div class="card-header">
          <h3><span class="icon">🚀</span> {{ $t('pricing_page.plan3_name') }}</h3>
          <p>{{ $t('pricing_page.plan3_tag') }}</p>
        </div>
        <div class="price">
          <span class="amount">{{ $t('pricing_page.plan3_price') }}</span><span class="period">{{ $t('pricing_page.plan3_period') }}</span>
        </div>
        <p class="description">{{ $t('pricing_page.plan3_desc') }}</p>
        <p class="includes">{{ $t('pricing_page.plan3_includes') }}</p>
        <ul class="feature-list">
          <li>{{ $t('pricing_page.plan3_l1') }}</li>
          <li>{{ $t('pricing_page.plan3_l2') }}</li>
          <li>{{ $t('pricing_page.plan3_l3') }}</li>
          <li>{{ $t('pricing_page.plan3_l4') }}</li>
          <li>{{ $t('pricing_page.plan3_l5') }}</li>
        </ul>
        <button class="btn-secondary w-full mt-auto">{{ $t('pricing_page.plan3_btn') }}</button>
      </div>
    </div>

    <div class="comparison-section">
      <h2 class="text-center">{{ $t('pricing_page.comp_title') }}</h2>
      <p class="text-center">{{ $t('pricing_page.comp_desc') }}</p>
      
      <div class="comparison-table">
        <div class="table-header">
          <div class="col-feature">{{ $t('pricing_page.comp_h1') }}</div>
          <div class="col-plan">{{ $t('pricing_page.comp_h2') }}</div>
          <div class="col-plan highlighted-col">{{ $t('pricing_page.comp_h3') }}</div>
          <div class="col-plan">{{ $t('pricing_page.comp_h4') }}</div>
        </div>
        
        <!-- Table rows - General -->
        <div class="table-row-group">{{ $t('pricing_page.comp_g1') }}</div>
        <div class="table-row">
          <div class="col-feature">{{ $t('pricing_page.comp_r1') }}</div>
          <div class="col-plan">{{ $t('pricing_page.comp_r1_v1') }}</div>
          <div class="col-plan highlighted-col">{{ $t('pricing_page.comp_r1_v2') }}</div>
          <div class="col-plan">{{ $t('pricing_page.comp_r1_v3') }}</div>
        </div>
        <div class="table-row">
          <div class="col-feature">{{ $t('pricing_page.comp_r2') }}</div>
          <div class="col-plan">{{ $t('pricing_page.comp_r2_v1') }}</div>
          <div class="col-plan highlighted-col">{{ $t('pricing_page.comp_r2_v2') }}</div>
          <div class="col-plan">{{ $t('pricing_page.comp_r2_v3') }}</div>
        </div>
        
        <!-- Simplified for brevity, standard checkmarks -->
        <div class="table-row-group">{{ $t('pricing_page.comp_g2') }}</div>
        <div class="table-row">
          <div class="col-feature">{{ $t('pricing_page.comp_r3') }}</div>
          <div class="col-plan"><span class="check">✓</span></div>
          <div class="col-plan highlighted-col"><span class="check">✓</span></div>
          <div class="col-plan"><span class="check">✓</span></div>
        </div>
        <!-- Add more rows as needed to mimic the image -->
      </div>
    </div>
  </main>
</template>

<style scoped>
.page-container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2rem 2rem 6rem;
}
.text-center { text-align: center; }
.w-full { width: 100%; }
.mt-auto { margin-top: auto; }
</style>
