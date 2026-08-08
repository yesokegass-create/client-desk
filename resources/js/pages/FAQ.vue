<template>
  <main class="page-container">
    <div class="breadcrumb">
      <router-link to="/" class="back-link">{{ $t('faq_page.back_home') }}</router-link>
      <span class="separator">/</span>
      <span class="current">{{ $t('faq_page.title') }}</span>
    </div>

    <div class="page-header">
      <h1>{{ $t('faq_page.title') }}</h1>
      <p>{{ $t('faq_page.desc') }}</p>
    </div>

    <div class="faq-sections">
      <!-- Section: {{ $t('faq_page.tab_general') }} -->
      <section class="faq-group">
        <div class="group-header">
          <span class="icon text-blue">🌐</span>
          <h2>{{ $t('faq_page.tab_general') }}</h2>
        </div>
        <div class="faq-items">
          <details open>
            <summary>{{ $t('faq_page.q1') }}</summary>
            <p>{{ $t('faq_page.a1') }}</p>
          </details>
          <details>
            <summary>{{ $t('faq_page.q2') }}</summary>
            <p>{{ $t('faq_page.a2') }}</p>
          </details>
          <details>
            <summary>{{ $t('faq_page.q3') }}</summary>
            <p>{{ $t('faq_page.a3') }}</p>
          </details>
          <details>
            <summary>{{ $t('faq_page.q4') }}</summary>
            <p>{{ $t('faq_page.a4') }}</p>
          </details>
          <details>
            <summary>{{ $t('faq_page.q7') }}</summary>
            <p>{{ $t('faq_page.a7') }}</p>
          </details>
        </div>
      </section>

      <!-- Section: {{ $t('faq_page.tab_features') }} -->
      <section class="faq-group">
        <div class="group-header">
          <span class="icon text-purple">✨</span>
          <h2>{{ $t('faq_page.tab_features') }}</h2>
        </div>
        <div class="faq-items">
          <details>
            <summary>{{ $t('faq_page.q9') }}</summary>
            <p>{{ $t('faq_page.a9') }}</p>
          </details>
          <details>
            <summary>{{ $t('faq_page.q10') }}</summary>
            <p>{{ $t('faq_page.a10') }}</p>
          </details>
          <details>
            <summary>{{ $t('faq_page.q11') }}</summary>
            <p>{{ $t('faq_page.a11') }}</p>
          </details>
        </div>
      </section>

      <!-- Section: Harga & Pembayaran -->
      <section class="faq-group">
        <div class="group-header">
          <span class="icon text-green">💳</span>
          <h2>{{ $t('faq_page.tab_pricing') }}</h2>
        </div>
        <div class="faq-items">
          <details>
            <summary>{{ $t('faq_page.q5') }}</summary>
            <p>{{ $t('faq_page.a5') }}</p>
          </details>
          <details>
            <summary>{{ $t('faq_page.q6') }}</summary>
            <p>{{ $t('faq_page.a6') }}</p>
          </details>
          <details>
            <summary>{{ $t('faq_page.q8') }}</summary>
            <p>{{ $t('faq_page.a8') }}</p>
          </details>
        </div>
      </section>

      <!-- Section: Teknis -->
      <section class="faq-group">
        <div class="group-header">
          <span class="icon text-orange">🔧</span>
          <h2>{{ $t('faq_page.tab_tech') }}</h2>
        </div>
        <div class="faq-items">
          <details>
            <summary>{{ $t('faq_page.q12') }}</summary>
            <p>{{ $t('faq_page.a12') }}</p>
          </details>
        </div>
      </section>
    </div>

    <div class="contact-support">
      <h3>{{ $t('faq_page.contact_q') }}</h3>
      <button class="btn-instagram">
        <span class="icon">📷</span> {{ $t('faq_page.contact_btn') }}
      </button>
    </div>
  </main>
</template>

<style scoped>
.page-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 2rem 6rem;
}
</style>
