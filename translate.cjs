const fs = require('fs');
const path = require('path');

const i18nPath = path.join(__dirname, 'resources', 'js', 'i18n.js');
const homePath = path.join(__dirname, 'resources', 'js', 'pages', 'Home.vue');

const en = {
  navbar: { features: 'Features', pricing: 'Pricing', faq: 'FAQ', login: 'Login' },
  language: { en: 'English', id: 'Bahasa Indonesia' },
  theme: { light: 'Light', dark: 'Dark', system: 'System' },
  home: {
    hero: {
      badge: '#1 Vendor Client Management',
      title: 'Manage Clients<br>More Efficiently &<br>Professionally',
      desc: 'A client management system for bookings, invoices, settlements, and follow-ups. Built for freelance vendors, creative studios, and service businesses that want a cleaner, more professional workflow.',
      btn_start: '🚀 Start Managing Clients',
      btn_features: 'View Features',
      trust: 'Trusted by vendors & freelancers in Indonesia',
      demo_tag: 'LIVE BOOKING FLOW',
      demo_title: 'Vender.id Demo',
      form_title: 'Booking Form',
      form_desc: 'Auto-filled by clients',
      form_online: 'Online',
      label_name: 'Client Name',
      label_package: 'Package',
      label_date: 'Date',
      btn_submit: 'Submit booking',
      data_title: 'Booking Data',
      data_desc: 'Today',
      cal_title: 'Calendar',
      cal_days: ['S','M','T','W','T','F','S'],
      cal_booked: 'Slot automatically filled'
    },
    social: {
      tag: 'VENDOR & REVIEW',
      title: 'Trusted by Vendors across Indonesia',
      desc: 'Real reviews from those who already use Vender.id & Fastpik.'
    },
    reviews: {
      r1_name: 'Sarah Rahman',
      r1_role: 'Wedding Photographer',
      r1_text: 'Before using Vender.id, my workflow was mostly manual. After the trial, features like scheduling, client database, follow-ups, and invoicing felt truly relevant for a photography service. Everything is structured in one dashboard.',
      r2_name: 'Andi Nugroho',
      r2_role: 'Videographer',
      r2_text: 'Vender.id gets more complete every day. From bookings, financial reports, to Google Calendar sync, it really helps monitor work and report to superiors without jumping between spreadsheets.',
      r3_name: 'Budi Santoso',
      r3_role: 'Creative Agency',
      r3_text: 'Workflow became much cleaner and systematic. Vender.id makes vendor operations look more professional, this is the app I\'ve been looking for to manage bookings easily.'
    },
    problems: {
      tag: 'THE PROBLEM',
      title: 'Still managing clients manually?',
      desc: 'Many vendors still use manual methods that waste time and look unprofessional.',
      p1: 'Scattered Chats',
      p1_desc: 'Details of bookings and client revisions get buried in WhatsApp chats, making them hard to track.',
      p2: 'Manual Invoicing',
      p2_desc: 'Creating invoices one by one in Word/Excel takes time and is prone to calculation errors.',
      p3: 'Missed Schedules',
      p3_desc: 'Double bookings or forgotten schedules because they are not synced with an automatic calendar.'
    },
    features: {
      tag: 'SOLUTIONS',
      title: 'Vender.id Flagship Features',
      desc: 'Everything you need to manage your creative or service business.',
      f1: 'Smart Booking Form',
      f1_desc: 'Clients fill in their own booking details via a dedicated link. Data goes straight into the system.',
      f2: 'Automated Invoice',
      f2_desc: 'Generate professional invoices in 1 click. Track DP and settlement status easily.',
      f3: 'Calendar Sync',
      f3_desc: 'No more double bookings. All schedules sync directly to Google Calendar.',
      f4: 'WhatsApp Reminder',
      f4_desc: 'Send automatic reminders for payment and H-1 schedules via WhatsApp.',
      f5: 'Client Database',
      f5_desc: 'Keep client history neatly. Useful for promos and future follow-ups.',
      f6: 'Financial Reports',
      f6_desc: 'Monitor your monthly income and business growth through a simple dashboard.'
    },
    showcase: {
      tag: 'DASHBOARD',
      title: 'See Vender.id from the inside',
      desc: 'An intuitive and easy-to-use interface, even if you are not tech-savvy.',
      s1_role: 'MAIN DASHBOARD',
      s1_title: 'Monitor Everything from One Place',
      s1_desc: 'See today\'s schedule, recent bookings, and outstanding payments at a glance on the main dashboard.',
      s2_role: 'CLIENT MANAGEMENT',
      s2_title: 'Structured Client Details',
      s2_desc: 'Every client has a complete profile including booking history, invoice status, and important notes.',
      s3_role: 'INVOICING',
      s3_title: 'Professional Invoices',
      s3_desc: 'Create beautiful invoices, send links directly to clients, and track payment status automatically.'
    },
    how: {
      tag: 'WORKFLOW',
      title: 'How Vender.id Works',
      desc: '3 simple steps to streamline your business workflow.',
      h1: 'Share Link',
      h1_desc: 'Share your special booking link with clients on Instagram bio or WhatsApp.',
      h2: 'Client Fills Form',
      h2_desc: 'Clients choose packages, schedules, and fill in their details easily without chatting back and forth.',
      h3: 'System Works',
      h3_desc: 'Vender.id records the schedule, creates an invoice, and reminds you when D-day approaches.'
    },
    pricing: {
      title: 'Affordable Pricing for All Vendors',
      desc: 'Starting from Rp 49,000/month. Small investment, big results for your business. Try for free 7 days!',
      btn: '👀 View Packages & Pricing'
    },
    faq: {
      title: 'Frequently Asked Questions',
      desc: 'Answers to common questions about Vender.id',
      btn: '❓ View All FAQ'
    },
    cta: {
      tag: '⏰ 7-Day Free Trial',
      title: 'Ready to Manage Clients<br>More Professionally?',
      desc: 'Join now and experience the ease of managing your bookings,<br>invoices, and client schedules.',
      btn: '🎉 Start Now — Free!',
      note: 'No credit card required. 7-day trial, then choose a suitable plan.'
    }
  },
  footer: {
    desc: 'Booking, invoice, settlement, and client follow-up management system. Designed specifically to ease your vendor and professional service business.',
    product: 'PRODUCT',
    legal: 'LEGAL',
    social: 'SOCIAL MEDIA',
    features: 'Features',
    pricing: 'Pricing',
    faq: 'FAQ',
    terms: 'Terms & Conditions',
    privacy: 'Privacy Policy',
    made: 'Made with 💖 by @photogatta and @fariz'
  }
};

const id = {
  navbar: { features: 'Fitur', pricing: 'Harga', faq: 'FAQ', login: 'Masuk' },
  language: { en: 'English', id: 'Bahasa Indonesia' },
  theme: { light: 'Terang', dark: 'Gelap', system: 'Sistem' },
  home: {
    hero: {
      badge: '#1 Vendor Client Management',
      title: 'Kelola Klien<br>Lebih Efisien &<br>Profesional',
      desc: 'Sistem manajemen klien untuk booking, invoice, pelunasan, dan follow-up. Dirancang untuk vendor freelance, studio kreatif, dan bisnis jasa yang ingin workflow lebih rapi dan profesional.',
      btn_start: '🚀 Mulai Kelola Klien',
      btn_features: 'Lihat Fitur',
      trust: 'Dipercaya oleh vendor & freelancer di Indonesia',
      demo_tag: 'LIVE BOOKING FLOW',
      demo_title: 'Vender.id Demo',
      form_title: 'Form Booking',
      form_desc: 'Diisi otomatis oleh klien',
      form_online: 'Online',
      label_name: 'Nama Klien',
      label_package: 'Paket',
      label_date: 'Tanggal',
      btn_submit: 'Kirim booking',
      data_title: 'Data Booking',
      data_desc: 'Hari ini',
      cal_title: 'Kalender',
      cal_days: ['M','S','S','R','K','J','S'],
      cal_booked: 'Slot otomatis terisi'
    },
    social: {
      tag: 'VENDOR & REVIEW',
      title: 'Dipercaya Vendor di Seluruh Indonesia',
      desc: 'Review ulasan nyata dari mereka yang sudah memakai Vender.id & Fastpik.'
    },
    reviews: {
      r1_name: 'Sarah Rahman',
      r1_role: 'Wedding Photographer',
      r1_text: 'Sebelum pakai Vender.id, workflow masih banyak manual dan data harus dipindahkan ke sana-sini. Setelah trial, fitur jadwal, database client, follow-up, invoice, fee freelance, dan form booking terasa benar-benar relevan untuk jasa photography. Semuanya lebih terstruktur dalam satu dashboard, apalagi kalau dipakai bareng Fastpik.',
      r2_name: 'Andi Nugroho',
      r2_role: 'Videographer',
      r2_text: 'Vender.id semakin hari semakin lengkap fiturnya. Dari booking, laporan keuangan, rating, sampai sinkron ke Google, semuanya bantu banget buat mantau kerjaan dan bikin laporan ke atasan lebih enak tanpa harus bolak-balik update spreadsheet.',
      r3_name: 'Budi Santoso',
      r3_role: 'Creative Agency',
      r3_text: 'Workflow jadi jauh lebih rapi dan semuanya terasa lebih tersistem. Vender.id & Fastpik bikin operasional vendor terlihat lebih profesional, dan ini aplikasi yang selama ini aku cari untuk bantu ngatur booking dengan lebih enak.'
    },
    problems: {
      tag: 'THE PROBLEM',
      title: 'Masih kelola klien pakai cara manual?',
      desc: 'Banyak vendor yang masih menggunakan cara manual yang membuang waktu dan terlihat kurang profesional.',
      p1: 'Chat Berantakan',
      p1_desc: 'Detail booking dan revisi klien tertumpuk di chat WhatsApp, membuatnya sulit dilacak.',
      p2: 'Invoice Manual',
      p2_desc: 'Membuat invoice satu per satu di Word/Excel memakan waktu dan rawan salah hitung.',
      p3: 'Jadwal Terlewat',
      p3_desc: 'Booking bentrok atau jadwal terlupa karena tidak tersinkronisasi dengan kalender otomatis.'
    },
    features: {
      tag: 'SOLUTIONS',
      title: 'Fitur Unggulan Vender.id',
      desc: 'Semua yang Anda butuhkan untuk mengelola bisnis kreatif atau jasa Anda.',
      f1: 'Smart Booking Form',
      f1_desc: 'Klien mengisi sendiri detail booking lewat link khusus. Data langsung masuk ke sistem.',
      f2: 'Automated Invoice',
      f2_desc: 'Generate invoice profesional dalam 1 klik. Pantau status DP dan pelunasan dengan mudah.',
      f3: 'Calendar Sync',
      f3_desc: 'Tidak ada lagi jadwal bentrok. Semua jadwal langsung tersinkronisasi ke Google Calendar.',
      f4: 'WhatsApp Reminder',
      f4_desc: 'Kirim pengingat otomatis untuk pembayaran dan jadwal H-1 melalui pesan WhatsApp.',
      f5: 'Client Database',
      f5_desc: 'Simpan history klien dengan rapi. Berguna untuk promo dan follow-up di masa depan.',
      f6: 'Financial Reports',
      f6_desc: 'Pantau pemasukan bulanan dan perkembangan bisnis Anda melalui dashboard yang simpel.'
    },
    showcase: {
      tag: 'DASHBOARD',
      title: 'Lihat Vender.id dari dalam',
      desc: 'Interface yang intuitif dan mudah digunakan, bahkan jika Anda bukan orang yang tech-savvy.',
      s1_role: 'MAIN DASHBOARD',
      s1_title: 'Pantau Semua dari Satu Tempat',
      s1_desc: 'Lihat jadwal hari ini, booking terbaru, dan tagihan yang belum lunas dalam satu pandangan di dashboard utama.',
      s2_role: 'CLIENT MANAGEMENT',
      s2_title: 'Detail Klien Terstruktur',
      s2_desc: 'Setiap klien memiliki profil lengkap beserta history booking, status invoice, dan catatan penting.',
      s3_role: 'INVOICING',
      s3_title: 'Invoice Profesional',
      s3_desc: 'Buat invoice cantik, kirim link langsung ke klien, dan pantau status pembayaran secara otomatis.'
    },
    how: {
      tag: 'WORKFLOW',
      title: 'Cara Kerja Vender.id',
      desc: '3 langkah sederhana untuk mengefisienkan workflow bisnis Anda.',
      h1: 'Sebar Link',
      h1_desc: 'Taruh link khusus booking Anda di bio Instagram atau bagikan via WhatsApp ke klien.',
      h2: 'Klien Isi Form',
      h2_desc: 'Klien memilih paket, jadwal, dan mengisi data diri dengan mudah tanpa perlu chat bolak-balik.',
      h3: 'Sistem Bekerja',
      h3_desc: 'Vender.id mencatat jadwal, membuatkan invoice, dan mengingatkan Anda saat hari H mendekat.'
    },
    pricing: {
      title: 'Harga Terjangkau untuk Semua Vendor',
      desc: 'Mulai dari Rp 49.000/bulan. Investasi kecil, hasil besar untuk bisnis Anda. Coba gratis<br>7 hari!',
      btn: '👀 Lihat Paket & Harga'
    },
    faq: {
      title: 'Pertanyaan Umum',
      desc: 'Jawaban untuk pertanyaan yang sering ditanyakan tentang Vender.id',
      btn: '❓ Lihat Semua FAQ'
    },
    cta: {
      tag: '⏰ Trial Gratis 7 Hari',
      title: 'Siap Mengelola Klien Lebih<br>Profesional?',
      desc: 'Bergabung sekarang dan rasakan kemudahan mengelola booking,<br>invoice, dan jadwal klien Anda.',
      btn: '🎉 Mulai Sekarang — Gratis!',
      note: 'Tidak perlu kartu kredit. Trial 7 hari, kemudian pilih paket yang sesuai.'
    }
  },
  footer: {
    desc: 'Sistem manajemen booking, invoice, pelunasan, dan follow-up klien. Dirancang khusus untuk memudahkan bisnis vendor dan jasa profesional Anda.',
    product: 'PRODUK',
    legal: 'LEGAL',
    social: 'SOSIAL MEDIA',
    features: 'Fitur',
    pricing: 'Harga',
    faq: 'FAQ',
    terms: 'Syarat & Ketentuan',
    privacy: 'Kebijakan Privasi',
    made: 'Dibuat dengan 💖 oleh @photogatta dan @fariz'
  }
};

const i18nContent = `import { createI18n } from 'vue-i18n';

const messages = {
  en: ${JSON.stringify(en, null, 2)},
  id: ${JSON.stringify(id, null, 2)}
};

const i18n = createI18n({
  legacy: false, 
  locale: 'id', 
  fallbackLocale: 'en', 
  messages, 
});

export default i18n;
`;
fs.writeFileSync(i18nPath, i18nContent);
console.log('Updated i18n.js');

let homeContent = fs.readFileSync(homePath, 'utf8');

// Replacements for Home.vue
const replacements = {
  '#1 Vendor Client Management': "{{ $t('home.hero.badge') }}",
  'Kelola Klien<br>Lebih Efisien &amp;<br>Profesional': "<span v-html=\"$t('home.hero.title')\"></span>",
  'Sistem manajemen klien untuk booking, invoice, pelunasan, dan follow-up. Dirancang untuk vendor freelance, studio kreatif, dan bisnis jasa yang ingin workflow lebih rapi dan profesional.': "{{ $t('home.hero.desc') }}",
  '🚀 Mulai Kelola Klien': "{{ $t('home.hero.btn_start') }}",
  'Lihat Fitur': "{{ $t('home.hero.btn_features') }}",
  'Dipercaya oleh vendor &amp; freelancer di Indonesia': "{{ $t('home.hero.trust') }}",
  'LIVE BOOKING FLOW': "{{ $t('home.hero.demo_tag') }}",
  'Vender.id Demo': "{{ $t('home.hero.demo_title') }}",
  'Form Booking': "{{ $t('home.hero.form_title') }}",
  'Diisi otomatis oleh klien': "{{ $t('home.hero.form_desc') }}",
  'Online': "{{ $t('home.hero.form_online') }}",
  'Nama Klien': "{{ $t('home.hero.label_name') }}",
  'Paket': "{{ $t('home.hero.label_package') }}",
  'Tanggal': "{{ $t('home.hero.label_date') }}",
  'Kirim booking': "{{ $t('home.hero.btn_submit') }}",
  'Data Booking': "{{ $t('home.hero.data_title') }}",
  'Hari ini': "{{ $t('home.hero.data_desc') }}",
  'Kalender': "{{ $t('home.hero.cal_title') }}",
  'Slot otomatis terisi': "{{ $t('home.hero.cal_booked') }}",
  
  'VENDOR &amp; REVIEW': "{{ $t('home.social.tag') }}",
  'Dipercaya Vendor di Seluruh Indonesia': "{{ $t('home.social.title') }}",
  'Review ulasan nyata dari mereka yang sudah memakai Vender.id &amp; Fastpik.': "{{ $t('home.social.desc') }}",
  
  'THE PROBLEM': "{{ $t('home.problems.tag') }}",
  'Masih kelola klien pakai cara manual?': "{{ $t('home.problems.title') }}",
  'Banyak vendor yang masih menggunakan cara manual yang membuang waktu dan terlihat kurang profesional.': "{{ $t('home.problems.desc') }}",
  'Chat Berantakan': "{{ $t('home.problems.p1') }}",
  'Detail booking dan revisi klien tertumpuk di chat WhatsApp, membuatnya sulit dilacak.': "{{ $t('home.problems.p1_desc') }}",
  'Invoice Manual': "{{ $t('home.problems.p2') }}",
  'Membuat invoice satu per satu di Word/Excel memakan waktu dan rawan salah hitung.': "{{ $t('home.problems.p2_desc') }}",
  'Jadwal Terlewat': "{{ $t('home.problems.p3') }}",
  'Booking bentrok atau jadwal terlupa karena tidak tersinkronisasi dengan kalender otomatis.': "{{ $t('home.problems.p3_desc') }}",
  
  'SOLUTIONS': "{{ $t('home.features.tag') }}",
  'Fitur Unggulan Vender.id': "{{ $t('home.features.title') }}",
  'Semua yang Anda butuhkan untuk mengelola bisnis kreatif atau jasa Anda.': "{{ $t('home.features.desc') }}",
  'Smart Booking Form': "{{ $t('home.features.f1') }}",
  'Klien mengisi sendiri detail booking lewat link khusus. Data langsung masuk ke sistem.': "{{ $t('home.features.f1_desc') }}",
  'Automated Invoice': "{{ $t('home.features.f2') }}",
  'Generate invoice profesional dalam 1 klik. Pantau status DP dan pelunasan dengan mudah.': "{{ $t('home.features.f2_desc') }}",
  'Calendar Sync': "{{ $t('home.features.f3') }}",
  'Tidak ada lagi jadwal bentrok. Semua jadwal langsung tersinkronisasi ke Google Calendar.': "{{ $t('home.features.f3_desc') }}",
  'WhatsApp Reminder': "{{ $t('home.features.f4') }}",
  'Kirim pengingat otomatis untuk pembayaran dan jadwal H-1 melalui pesan WhatsApp.': "{{ $t('home.features.f4_desc') }}",
  'Client Database': "{{ $t('home.features.f5') }}",
  'Simpan history klien dengan rapi. Berguna untuk promo dan follow-up di masa depan.': "{{ $t('home.features.f5_desc') }}",
  'Financial Reports': "{{ $t('home.features.f6') }}",
  'Pantau pemasukan bulanan dan perkembangan bisnis Anda melalui dashboard yang simpel.': "{{ $t('home.features.f6_desc') }}",
  
  'DASHBOARD': "{{ $t('home.showcase.tag') }}",
  'Lihat Vender.id dari dalam': "{{ $t('home.showcase.title') }}",
  'Interface yang intuitif dan mudah digunakan, bahkan jika Anda bukan orang yang tech-savvy.': "{{ $t('home.showcase.desc') }}",
  
  'WORKFLOW': "{{ $t('home.how.tag') }}",
  'Cara Kerja Vender.id': "{{ $t('home.how.title') }}",
  '3 langkah sederhana untuk mengefisienkan workflow bisnis Anda.': "{{ $t('home.how.desc') }}",
  'Sebar Link': "{{ $t('home.how.h1') }}",
  'Taruh link khusus booking Anda di bio Instagram atau bagikan via WhatsApp ke klien.': "{{ $t('home.how.h1_desc') }}",
  'Klien Isi Form': "{{ $t('home.how.h2') }}",
  'Klien memilih paket, jadwal, dan mengisi data diri dengan mudah tanpa perlu chat bolak-balik.': "{{ $t('home.how.h2_desc') }}",
  'Sistem Bekerja': "{{ $t('home.how.h3') }}",
  'Vender.id mencatat jadwal, membuatkan invoice, dan mengingatkan Anda saat hari H mendekat.': "{{ $t('home.how.h3_desc') }}",
  
  'Harga Terjangkau untuk Semua Vendor': "{{ $t('home.pricing.title') }}",
  'Mulai dari Rp 49.000/bulan. Investasi kecil, hasil besar untuk bisnis Anda. Coba gratis<br>7 hari!': "<span v-html=\"$t('home.pricing.desc')\"></span>",
  '👀 Lihat Paket &amp; Harga': "{{ $t('home.pricing.btn') }}",
  
  'Pertanyaan Umum': "{{ $t('home.faq.title') }}",
  'Jawaban untuk pertanyaan yang sering ditanyakan tentang Vender.id': "{{ $t('home.faq.desc') }}",
  '❓ Lihat Semua FAQ': "{{ $t('home.faq.btn') }}",
  
  '⏰ Trial Gratis 7 Hari': "{{ $t('home.cta.tag') }}",
  'Siap Mengelola Klien Lebih<br>Profesional?': "<span v-html=\"$t('home.cta.title')\"></span>",
  'Bergabung sekarang dan rasakan kemudahan mengelola booking,<br>invoice, dan jadwal klien Anda.': "<span v-html=\"$t('home.cta.desc')\"></span>",
  '🎉 Mulai Sekarang — Gratis!': "{{ $t('home.cta.btn') }}",
  'Tidak perlu kartu kredit. Trial 7 hari, kemudian pilih paket yang sesuai.': "{{ $t('home.cta.note') }}"
};

for (const [key, value] of Object.entries(replacements)) {
  const safeKey = key.replace(/&amp;/g, '&'); // since vue might compile it
  homeContent = homeContent.replace(new RegExp(safeKey.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&'), 'g'), value);
}

// Special case for arrays in Vue data vs template
homeContent = homeContent.replace(/\\['M\\',\\'S\\',\\'S\\',\\'R\\',\\'K\\',\\'J\\',\\'S\\']/g, "$t('home.hero.cal_days')");
homeContent = homeContent.replace(/\\['M', 'S', 'S', 'R', 'K', 'J', 'S\\']/g, "$t('home.hero.cal_days')");
homeContent = homeContent.replace(/v-for="day in \\['M', 'S', 'S', 'R', 'K', 'J', 'S'\\]"/g, "v-for=\"day in $tm('home.hero.cal_days')\"");

fs.writeFileSync(homePath, homeContent);
console.log('Updated Home.vue');
