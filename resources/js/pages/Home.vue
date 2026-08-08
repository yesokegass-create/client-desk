<template>
  <div class="landing-page-container">


    <main>
      <section class="hero-section">
        <div class="hero-content">
          <div class="hero-badge"><Sparkles :size="14" /> {{ $t('home.hero.badge') }}</div>
          <h1 class="hero-title" v-html="$t('home.hero.title')"></h1>
          <p class="hero-description">{{ $t('home.hero.desc') }}</p>
          <div class="hero-cta">
            <button class="btn-primary">{{ $t('home.hero.btn_start') }} <ArrowRight :size="18" /></button>
            <button class="btn-secondary"><Sparkles :size="18" class="text-yellow" /> {{ $t('home.hero.btn_features') }}</button>
          </div>
          <p class="hero-trust"><Sparkles :size="16" class="trust-icon" /> {{ $t('home.hero.trust') }}</p>
        </div>
        <div class="hero-mockup">
          <div class="mockup-placeholder">
            <div class="mockup-header">
              <div class="mockup-header-title">
                <span class="tag">{{ $t('home.hero.demo_tag') }}</span>
                <span class="name">{{ $t('home.hero.demo_title') }}</span>
              </div>
              <div class="mac-dots">
                <div class="mac-dot red"></div>
                <div class="mac-dot yellow"></div>
                <div class="mac-dot green"></div>
              </div>
            </div>

            <div class="mockup-card">
              <div class="mockup-card-header">
                <div>
                  <h4>{{ $t('home.hero.form_title') }}</h4>
                  <p>{{ $t('home.hero.form_desc') }}</p>
                </div>
                <span class="mockup-status">{{ $t('home.hero.form_online') }}</span>
              </div>
              
              <div class="mockup-form-group">
                <label>{{ $t('home.hero.label_name') }}</label>
                <input type="text" class="mockup-input" :value="clientName + (activeField === 0 && showCursor ? '|' : '')" readonly>
              </div>
              <div class="mockup-form-group">
                <label>{{ $t('home.hero.label_package') }}</label>
                <input type="text" class="mockup-input" :value="packageName + (activeField === 1 && showCursor ? '|' : '')" readonly>
              </div>
              <div class="mockup-form-group">
                <label>{{ $t('home.hero.label_date') }}</label>
                <input type="text" class="mockup-input" :value="bookingDate + (activeField === 2 && showCursor ? '|' : '')" readonly>
              </div>
              
              <button class="mockup-submit"><Send :size="16" /> {{ $t('home.hero.btn_submit') }}</button>
            </div>

            <div class="mockup-grid">
              <div class="mockup-card mockup-sm-card">
                <div class="mockup-card-header">
                  <h4>{{ $t('home.hero.data_title') }}</h4>
                  <p>{{ $t('home.hero.data_desc') }}</p>
                </div>
                <div class="booking-item">
                  <div class="title">Raka & Tim</div>
                  <div class="desc">Family Portrait - 13.00</div>
                </div>
                <div class="booking-item" style="opacity: 0.5">
                  <div class="title">Nadia Putri</div>
                  <div class="desc">Graduation Premium - 09.00</div>
                </div>
              </div>
              
              <div class="mockup-card mockup-sm-card">
                <div class="mockup-card-header">
                  <h4>{{ $t('home.hero.cal_title') }}</h4>
                  <Calendar :size="16" />
                </div>
                <div class="mockup-calendar-grid">
                  <div class="mockup-calendar-header">S</div>
                  <div class="mockup-calendar-header">M</div>
                  <div class="mockup-calendar-header">T</div>
                  <div class="mockup-calendar-header">W</div>
                  <div class="mockup-calendar-header">T</div>
                  <div class="mockup-calendar-header">F</div>
                  <div class="mockup-calendar-header">S</div>
                  
                  <div class="mockup-calendar-day">20</div>
                  <div class="mockup-calendar-day">21</div>
                  <div class="mockup-calendar-day">22</div>
                  <div class="mockup-calendar-day">23</div>
                  <div class="mockup-calendar-day">24</div>
                  <div class="mockup-calendar-day">25</div>
                  <div class="mockup-calendar-day">26</div>
                  
                  <div class="mockup-calendar-day">27</div>
                  <div class="mockup-calendar-day">28</div>
                  <div class="mockup-calendar-day">29</div>
                  <div class="mockup-calendar-day">30</div>
                  <div class="mockup-calendar-day">1</div>
                  <div class="mockup-calendar-day">2</div>
                  <div class="mockup-calendar-day">3</div>
                </div>
                <div style="font-size: 0.7rem; color: var(--text-secondary); margin-top: 0.75rem;">
                  <span style="color: var(--text-primary); font-weight: 600;">09.00 Graduation</span><br>
                  {{ $t('home.hero.cal_booked') }}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section class="social-proof-section">
        <div class="social-proof-header">
          <span class="tag">{{ $t('home.social.tag') }}</span>
          <h2>{{ $t('home.social.title') }}</h2>
          <p>{{ $t('home.social.desc') }}</p>
        </div>

        <div class="marquee-container">
          <div class="marquee marquee-left">
            <div class="marquee-content">
              <div class="logo-item" style="font-family: serif; font-style: italic;">Dinakara Visual</div>
              <div class="logo-item" style="font-weight: 800;">m o a r</div>
              <div class="logo-item" style="font-family: cursive;">> < grads.</div>
              <div class="logo-item" style="font-family: monospace;">HIST ORY</div>
              <div class="logo-item" style="font-weight: bold;">CREATIVEGRAPH.GO</div>
              <div class="logo-item" style="font-weight: 700; display: flex; align-items: center; gap: 4px;"><Aperture /> Fanne Space</div>
              <div class="logo-item" style="font-family: serif;">lengkara VISUAL</div>
            </div>
            <div class="marquee-content">
              <div class="logo-item" style="font-family: serif; font-style: italic;">Dinakara Visual</div>
              <div class="logo-item" style="font-weight: 800;">m o a r</div>
              <div class="logo-item" style="font-family: cursive;">> < grads.</div>
              <div class="logo-item" style="font-family: monospace;">HIST ORY</div>
              <div class="logo-item" style="font-weight: bold;">CREATIVEGRAPH.GO</div>
              <div class="logo-item" style="font-weight: 700; display: flex; align-items: center; gap: 4px;"><Aperture /> Fanne Space</div>
              <div class="logo-item" style="font-family: serif;">lengkara VISUAL</div>
            </div>
          </div>
          
          <div class="marquee marquee-right" style="margin-top: -1rem;">
            <div class="marquee-content reverse">
              <div class="logo-item" style="font-weight: bold; letter-spacing: 2px;">AJI SHOOT</div>
              <div class="logo-item" style="font-family: cursive;">Annora moment</div>
              <div class="logo-item" style="font-weight: 900;">DECAPPUCCINO</div>
              <div class="logo-item" style="font-family: serif; font-weight: lighter;">FOCUSIN PICTURES</div>
              <div class="logo-item" style="font-style: italic;">xavierpictura</div>
              <div class="logo-item" style="font-family: cursive;">Arunika PICTURE</div>
              <div class="logo-item" style="font-family: serif;">Finally Graduation</div>
            </div>
            <div class="marquee-content reverse">
              <div class="logo-item" style="font-weight: bold; letter-spacing: 2px;">AJI SHOOT</div>
              <div class="logo-item" style="font-family: cursive;">Annora moment</div>
              <div class="logo-item" style="font-weight: 900;">DECAPPUCCINO</div>
              <div class="logo-item" style="font-family: serif; font-weight: lighter;">FOCUSIN PICTURES</div>
              <div class="logo-item" style="font-style: italic;">xavierpictura</div>
              <div class="logo-item" style="font-family: cursive;">Arunika PICTURE</div>
              <div class="logo-item" style="font-family: serif;">Finally Graduation</div>
            </div>
          </div>
        </div>

        <div class="reviews-carousel">
           <button class="nav-btn prev-btn" @click="prevReview">
             <ChevronLeft />
           </button>
           
           <div class="reviews-track-container" ref="reviewsTrackRef">
             <div class="reviews-track">
               <div class="review-card" v-for="n in 6" :key="n">
                 <div class="review-header">
                    <div class="stars"><Star v-for="s in 5" :key="s" :size="14" fill="#f59e0b" color="#f59e0b" /></div>
                    <div class="rating-badge">5/5</div>
                 </div>
                 <div class="quote-mark">,,</div>
                 <p class="review-text">{{ $t(`home.reviews.r${n}_text`) }}</p>
                 <div class="review-author">
                   <div class="author-name">{{ $t(`home.reviews.r${n}_name`) }}</div>
                   <div class="author-handle">{{ $t(`home.reviews.r${n}_role`) }}</div>
                 </div>
               </div>
             </div>
           </div>

           <button class="nav-btn next-btn" @click="nextReview">
             <ChevronRight />
           </button>
        </div>
      </section>

      <section class="problems-section">
        <div class="problems-header">
          <h2>{{ $t('home.problems.title') }}</h2>
          <p>{{ $t('home.problems.desc') }}</p>
        </div>
        <div class="problems-grid">
          <div class="problem-card">
            <div class="icon-wrapper icon-red">
              <Folder :size="20" />
            </div>
            <h3>{{ $t('home.problems.p1') }}</h3>
            <p>{{ $t('home.problems.p1_desc') }}</p>
          </div>
          <div class="problem-card">
            <div class="icon-wrapper icon-orange">
              <Pencil :size="20" />
            </div>
            <h3>{{ $t('home.problems.p2') }}</h3>
            <p>{{ $t('home.problems.p2_desc') }}</p>
          </div>
          <div class="problem-card">
            <div class="icon-wrapper icon-yellow">
              <Clock :size="20" />
            </div>
            <h3>{{ $t('home.problems.p3') }}</h3>
            <p>{{ $t('home.problems.p3_desc') }}</p>
          </div>
          <div class="problem-card">
            <div class="icon-wrapper icon-blue">
              <Search :size="20" />
            </div>
            <h3>{{ $t('home.problems.p4') }}</h3>
            <p>{{ $t('home.problems.p4_desc') }}</p>
          </div>
          <div class="problem-card">
            <div class="icon-wrapper icon-purple">
              <BellOff :size="20" />
            </div>
            <h3>{{ $t('home.problems.p5') }}</h3>
            <p>{{ $t('home.problems.p5_desc') }}</p>
          </div>
          <div class="problem-card">
            <div class="icon-wrapper icon-green">
              <DollarSign :size="20" />
            </div>
            <h3>{{ $t('home.problems.p6') }}</h3>
            <p>{{ $t('home.problems.p6_desc') }}</p>
          </div>
        </div>
      </section>

      <section class="features-section" id="fitur">
        <div class="features-header">
          <h2>{{ $t('home.features.title') }}</h2>
          <p>{{ $t('home.features.desc') }}</p>
        </div>
        <div class="features-grid">
          <div class="feature-card">
            <div class="icon-wrapper icon-blue">
              <LayoutGrid :size="20" />
            </div>
            <h3>{{ $t('home.features.f1') }}</h3>
            <p>{{ $t('home.features.f1_desc') }}</p>
          </div>
          <div class="feature-card">
            <div class="icon-wrapper icon-green">
              <FileText :size="20" />
            </div>
            <h3>{{ $t('home.features.f2') }}</h3>
            <p>{{ $t('home.features.f2_desc') }}</p>
          </div>
          <div class="feature-card">
            <div class="icon-wrapper icon-green">
              <MessageSquare :size="20" />
            </div>
            <h3>{{ $t('home.features.f3') }}</h3>
            <p>{{ $t('home.features.f3_desc') }}</p>
          </div>
          <div class="feature-card">
            <div class="icon-wrapper icon-red">
              <ClipboardCheck :size="20" />
            </div>
            <h3>{{ $t('home.features.f4') }}</h3>
            <p>{{ $t('home.features.f4_desc') }}</p>
          </div>
          <div class="feature-card">
            <div class="icon-wrapper icon-blue">
              <CalendarDays :size="20" />
            </div>
            <h3>{{ $t('home.features.f5') }}</h3>
            <p>{{ $t('home.features.f5_desc') }}</p>
          </div>
          <div class="feature-card">
            <div class="icon-wrapper icon-purple">
              <Globe :size="20" />
            </div>
            <h3>{{ $t('home.features.f6') }}</h3>
            <p>{{ $t('home.features.f6_desc') }}</p>
          </div>
        </div>
        <div style="text-align: center; margin-top: 3rem;">
          <button class="btn-secondary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 2rem;">
            <Sparkles :size="16" fill="#f59e0b" color="#f59e0b" />
            {{ $t('home.features.btn_view_all') }}
            <ArrowRight :size="16" />
          </button>
        </div>
      </section>

      <section class="product-showcase-section" id="tampilan">
        <div class="product-header">
          <div class="overline">{{ $t('home.showcase.tag') }}</div>
          <h2>{{ $t('home.showcase.title') }}</h2>
          <p>{{ $t('home.showcase.desc') }}</p>
        </div>
      
        <div class="product-carousel-container">
          <button class="nav-btn prev-btn" @click="prevProductSlide">
            <ChevronLeft />
          </button>
          
          <div class="product-image-wrapper">
            <img :src="productSlides[currentProductSlide].image" alt="Product Screenshot" class="product-screenshot" />
          </div>
      
          <button class="nav-btn next-btn" @click="nextProductSlide">
            <ChevronRight />
          </button>
        </div>
      
        <div class="carousel-indicators">
          <div 
            v-for="(slide, index) in productSlides" 
            :key="index"
            class="indicator-dot"
            :class="{ active: currentProductSlide === index }"
            @click="currentProductSlide = index"
          ></div>
        </div>
      
        <div class="product-slide-info">
          <div class="slide-text">
            <div class="slide-role">{{ $t(`home.showcase.s${currentProductSlide + 1}_role`) }}</div>
            <h3 class="slide-title">{{ $t(`home.showcase.s${currentProductSlide + 1}_title`) }}</h3>
            <p class="slide-desc">{{ $t(`home.showcase.s${currentProductSlide + 1}_desc`) }}</p>
          </div>
          <div class="slide-counter">
            {{ String(currentProductSlide + 1).padStart(2, '0') }} / {{ String(productSlides.length).padStart(2, '0') }}
          </div>
        </div>
      </section>

      <section class="how-it-works-section" id="cara-kerja">
        <div class="section-header text-center">
          <h2>{{ $t('home.how.title') }}</h2>
          <p>{{ $t('home.how.desc') }}</p>
        </div>
        <div class="steps-grid">
          <div class="step-card">
            <div class="step-icon-wrapper">
              <div class="step-badge">1</div>
              <div class="icon-circle">
                <FolderPlus :size="32" />
              </div>
            </div>
            <h3>{{ $t('home.how.h1') }}</h3>
            <p>{{ $t('home.how.h1_desc') }}</p>
          </div>
          <div class="step-card">
            <div class="step-icon-wrapper">
              <div class="step-badge">2</div>
              <div class="icon-circle">
                <Share2 :size="32" />
              </div>
            </div>
            <h3>{{ $t('home.how.h2') }}</h3>
            <p>{{ $t('home.how.h2_desc') }}</p>
          </div>
          <div class="step-card">
            <div class="step-icon-wrapper">
              <div class="step-badge">3</div>
              <div class="icon-circle">
                <CheckCircle :size="32" />
              </div>
            </div>
            <h3>{{ $t('home.how.h3') }}</h3>
            <p>{{ $t('home.how.h3_desc') }}</p>
          </div>
        </div>
      </section>

      <section class="pricing-cta-section" id="harga" style="text-align: center; max-width: 800px; margin: 0 auto;">
        <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">{{ $t('home.pricing.title') }}</h2>
        <p style="color: var(--text-secondary); font-size: 1.1rem; line-height: 1.6;"><span v-html="$t('home.pricing.desc')"></span></p>
        <button class="btn-secondary" style="margin-top: 2rem; display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 2rem;">
          👀 Lihat {{ $t('home.hero.label_package') }} & Harga <ArrowRight :size="16" />
        </button>
      </section>

      <section class="faq-section" id="faq" style="max-width: 800px; margin: 0 auto; text-align: center; padding: 6rem 1rem;">
        <h2 style="font-size: 2.5rem; margin-bottom: 0.5rem;">{{ $t('home.faq.title') }}</h2>
        <p style="color: var(--text-secondary); margin-bottom: 3rem; font-size: 1.1rem;">{{ $t('home.faq.desc') }}</p>
        <div class="faq-list">
          <div v-for="(item, index) in faqItems" :key="index" class="faq-item">
            <button @click="toggleFaq(index)" class="faq-button">
              {{ $t(item.questionKey) }}
              <ChevronUp v-if="item.isOpen" :size="20" class="faq-icon" />
              <ChevronDown v-else :size="20" class="faq-icon" />
            </button>
            <div v-show="item.isOpen" class="faq-answer">
              {{ $t(item.answerKey) }}
            </div>
          </div>
        </div>
        <button class="btn-secondary" style="margin-top: 2rem; display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 2rem;">
          <span style="color: #ff4757;">❓</span> Lihat Semua FAQ <ArrowRight :size="16" />
        </button>
      </section>
      
      <section class="final-cta-section">
        <div class="final-cta-tag">
          {{ $t('home.cta.tag') }}
        </div>
        <h2><span v-html="$t('home.cta.title')"></span>?</h2>
        <p><span v-html="$t('home.cta.desc')"></span></p>
        <button class="btn-cta-primary">
          {{ $t('home.cta.btn') }} <ArrowRight :size="18" />
        </button>
        <p class="final-cta-footer">{{ $t('home.cta.note') }}</p>
      </section>
    </main>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Sparkles, ArrowRight, Send, Calendar, Aperture, ChevronLeft, ChevronRight, Star, Quote, Folder, Pencil, Clock, Search, BellOff, DollarSign, LayoutGrid, FileText, MessageSquare, ClipboardCheck, CalendarDays, Globe, FolderPlus, Share2, CheckCircle, ChevronDown, ChevronUp, HelpCircle } from 'lucide-vue-next';

const clientName = ref('');
const packageName = ref('');
const bookingDate = ref('');

const targetClientName = 'Nadia Putri';
const targetPackageName = 'Graduation Premium';
const targetBookingDate = '24 Apr 2026, 09.00';

const activeField = ref(0);
const showCursor = ref(true);

let typeInterval;
let cursorInterval;

// Review Data is now localized via i18n

const currentProductSlide = ref(0);
const productSlides = [
  {
    image: '/images/product/slide1.png',
    role: 'Admin',
    title: 'Dashboard',
    description: 'Ringkasan booking, agenda, dan indikator penting tampil jelas begitu admin masuk.'
  },
  {
    image: '/images/product/slide2.png',
    role: 'Admin',
    title: 'Daftar Booking',
    description: 'Semua booking bisa dipantau, dicari, difilter, dan dibuka dari satu tabel operasional.'
  },
  {
    image: '/images/product/slide3.png',
    role: 'Admin',
    title: 'Invoice & Pelunasan',
    description: 'Pantau DP, invoice, pelunasan, dan status pembayaran tanpa catatan manual terpisah.'
  },
  {
    image: '/images/product/slide4.png',
    role: 'Admin',
    title: 'Rangkuman Keuangan',
    description: 'Lihat pemasukan, transaksi, dan performa keuangan vendor dalam tampilan yang mudah dibaca.'
  },
  {
    image: '/images/product/slide5.png',
    role: 'Admin',
    title: 'Kalender',
    description: 'Jadwal sesi tersusun dalam kalender agar agenda tim lebih mudah dicek sebelum menerima booking baru.'
  },
  {
    image: '/images/product/slide6.png',
    role: 'Admin',
    title: 'Paket',
    description: 'Kelola paket layanan, harga, dan detail penawaran yang dipakai di form booking.'
  },
  {
    image: '/images/product/slide7.png',
    role: 'Admin',
    title: 'Form Booking Admin',
    description: 'Admin bisa mengatur field, tampilan, dan kebutuhan data yang akan diisi oleh klien.'
  },
  {
    image: '/images/product/slide8.png',
    role: 'Tim / Freelance',
    title: 'Portal Freelance',
    description: 'Tim dan freelance bisa melihat jadwal, detail tugas, dan status upload dari portal khusus.'
  },
  {
    image: '/images/product/slide9.png',
    role: 'Klien',
    title: 'Form Booking Klien',
    description: 'Klien mengisi data booking dari halaman publik yang rapi dan langsung masuk ke sistem.'
  },
  {
    image: '/images/product/slide10.png',
    role: 'Klien',
    title: 'Invoice Klien',
    description: 'Invoice publik menampilkan detail tagihan dan instruksi pembayaran dengan jelas.'
  },
  {
    image: '/images/product/slide11.png',
    role: 'Klien',
    title: 'Form Pelunasan Klien',
    description: 'Klien bisa mengirim bukti pelunasan final lewat halaman khusus yang mudah dibagikan.'
  },
  {
    image: '/images/product/slide12.png',
    role: 'Klien',
    title: 'Status Booking Klien',
    description: 'Klien dapat mengecek progres booking secara mandiri tanpa harus bertanya ulang lewat chat.'
  }
];

const nextProductSlide = () => {
  currentProductSlide.value = (currentProductSlide.value + 1) % productSlides.length;
};

const prevProductSlide = () => {
  currentProductSlide.value = (currentProductSlide.value - 1 + productSlides.length) % productSlides.length;
};

const faqItems = ref([
  { questionKey: 'faq_page.q1', answerKey: 'faq_page.a1', isOpen: false },
  { questionKey: 'faq_page.q2', answerKey: 'faq_page.a2', isOpen: false },
  { questionKey: 'faq_page.q3', answerKey: 'faq_page.a3', isOpen: false },
  { questionKey: 'faq_page.q4', answerKey: 'faq_page.a4', isOpen: false },
  { questionKey: 'faq_page.q5', answerKey: 'faq_page.a5', isOpen: false },
  { questionKey: 'faq_page.q6', answerKey: 'faq_page.a6', isOpen: false }
]);

const toggleFaq = (index) => {
  faqItems.value[index].isOpen = !faqItems.value[index].isOpen;
};

const reviewsTrackRef = ref(null);

const prevReview = () => {
  if (!reviewsTrackRef.value) return;
  const track = reviewsTrackRef.value;
  const cardElement = track.querySelector('.review-card');
  const scrollAmount = cardElement ? cardElement.clientWidth + 24 : 400; // 24px is the 1.5rem gap
  
  if (track.scrollLeft <= 5) {
    track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
  } else {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  }
};

const nextReview = () => {
  if (!reviewsTrackRef.value) return;
  const track = reviewsTrackRef.value;
  const cardElement = track.querySelector('.review-card');
  const scrollAmount = cardElement ? cardElement.clientWidth + 24 : 400;
  
  if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 5) {
    track.scrollTo({ left: 0, behavior: 'smooth' });
  } else {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
};

const typeText = () => {
  if (activeField.value === 0) {
    if (clientName.value.length < targetClientName.length) {
      clientName.value = targetClientName.slice(0, clientName.value.length + 1);
    } else {
      activeField.value = 1;
    }
  } else if (activeField.value === 1) {
    if (packageName.value.length < targetPackageName.length) {
      packageName.value = targetPackageName.slice(0, packageName.value.length + 1);
    } else {
      activeField.value = 2;
    }
  } else if (activeField.value === 2) {
    if (bookingDate.value.length < targetBookingDate.length) {
      bookingDate.value = targetBookingDate.slice(0, bookingDate.value.length + 1);
    } else {
      activeField.value = 3;
      clearInterval(typeInterval);
      setTimeout(() => {
        // loop the animation for demo purposes
        clientName.value = '';
        packageName.value = '';
        bookingDate.value = '';
        activeField.value = 0;
        typeInterval = setInterval(typeText, 100);
      }, 3000);
    }
  }
};

onMounted(() => {
  // start typing animation
  typeInterval = setInterval(typeText, 100);
  
  // start cursor blink
  cursorInterval = setInterval(() => {
    showCursor.value = !showCursor.value;
  }, 500);
});

onUnmounted(() => {
  clearInterval(typeInterval);
  clearInterval(cursorInterval);
});
</script>
