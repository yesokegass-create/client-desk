const fs = require('fs');
const path = require('path');
const faqPath = path.join(__dirname, 'resources', 'js', 'pages', 'FAQ.vue');
const i18nPath = path.join(__dirname, 'resources', 'js', 'i18n.js');

let faqContent = fs.readFileSync(faqPath, 'utf8');

const replacements = {
  '← Rumah': "{{ $t('faq_page.back_home') }}",
  '<span class="current">Pertanyaan yang Sering Diajukan (FAQ)</span>': "<span class=\"current\">{{ $t('faq_page.title') }}</span>",
  '<h1>Pertanyaan yang Sering Diajukan</h1>': "<h1>{{ $t('faq_page.title') }}</h1>",
  'Ya, kami menggunakan enkripsi dan infrastruktur cloud yang aman untuk melindungi data Anda. Data disimpan di server terenkripsi yang dilindungi dengan langkah-langkah keamanan standar industri.': "{{ $t('faq_page.a4_long') }}",
  'Bagaimana cara saya memulainya?': "{{ $t('faq_page.q_start') }}",
  'Cukup daftarkan akun, buat profil vendor Anda, tambahkan layanan/paket Anda, dan Anda siap menerima pemesanan dari klien.': "{{ $t('faq_page.a_start') }}",
  '{{ $t(\\'faq_page.tab_features\\') }}-fitur utama meliputi manajemen pemesanan dan sesi, faktur, deposit dan penyelesaian pembayaran, templat WhatsApp, pelacakan status klien, sinkronisasi Google Kalender, formulir pemesanan online, tautan pemesanan khusus, Google Drive, penugasan freelancer, impor Excel, dan branding domain khusus.': "{{ $t('faq_page.a9_alt') }}",
  'Bisakah saya mengaksesnya dari ponsel saya?': "{{ $t('faq_page.q_phone') }}",
  '<h2>Harga & Pembayaran</h2>': "<h2>{{ $t('faq_page.tab_pricing') }}</h2>",
  'Kami menerima pembayaran melalui transfer bank, dompet elektronik (GoPay, OVO, Dana), dan QRIS.': "{{ $t('faq_page.a6_alt') }}",
  'Apakah ada jaminan uang kembali?': "{{ $t('faq_page.q_refund') }}",
  '<h2>Teknis</h2>': "<h2>{{ $t('faq_page.tab_tech') }}</h2>",
  'Apakah saya perlu menginstal aplikasi?': "{{ $t('faq_page.q_install') }}"
};

for (const [key, value] of Object.entries(replacements)) {
  faqContent = faqContent.replace(new RegExp(key.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&'), 'g'), value);
}
fs.writeFileSync(faqPath, faqContent);
console.log('Updated FAQ.vue again');

let i18nContent = fs.readFileSync(i18nPath, 'utf8');
const missingEn = `
    "back_home": "← Home",
    "title": "Frequently Asked Questions",
    "a4_long": "Yes, we use encryption and secure cloud infrastructure to protect your data. Data is stored on encrypted servers protected by industry-standard security measures.",
    "q_start": "How do I get started?",
    "a_start": "Simply register an account, create your vendor profile, add your services/packages, and you are ready to receive bookings from clients.",
    "a9_alt": "Key features include booking and session management, invoices, deposits and payment settlements, WhatsApp templates, client status tracking, Google Calendar sync, online booking forms, custom booking links, Google Drive, freelancer assignments, Excel import, and custom domain branding.",
    "q_phone": "Can I access it from my phone?",
    "a6_alt": "We accept payments via bank transfer, e-wallets (GoPay, OVO, Dana), and QRIS.",
    "q_refund": "Is there a money-back guarantee?",
    "tab_tech": "Technical",
    "q_install": "Do I need to install an app?"
  }`;

const missingId = `
    "back_home": "← Beranda",
    "title": "Pertanyaan yang Sering Diajukan",
    "a4_long": "Ya, kami menggunakan enkripsi dan infrastruktur cloud yang aman untuk melindungi data Anda. Data disimpan di server terenkripsi yang dilindungi dengan langkah-langkah keamanan standar industri.",
    "q_start": "Bagaimana cara saya memulainya?",
    "a_start": "Cukup daftarkan akun, buat profil vendor Anda, tambahkan layanan/paket Anda, dan Anda siap menerima pemesanan dari klien.",
    "a9_alt": "Fitur-fitur utama meliputi manajemen pemesanan dan sesi, faktur, deposit dan penyelesaian pembayaran, templat WhatsApp, pelacakan status klien, sinkronisasi Google Kalender, formulir pemesanan online, tautan pemesanan khusus, Google Drive, penugasan freelancer, impor Excel, dan branding domain khusus.",
    "q_phone": "Bisakah saya mengaksesnya dari ponsel saya?",
    "a6_alt": "Kami menerima pembayaran melalui transfer bank, dompet elektronik (GoPay, OVO, Dana), dan QRIS.",
    "q_refund": "Apakah ada jaminan uang kembali?",
    "tab_tech": "Teknis",
    "q_install": "Apakah saya perlu menginstal aplikasi?"
  }`;

i18nContent = i18nContent.replace(/"a12": "No, Vender\.id is a web application that runs in your browser\. Just open the website and log in, no installation needed\."/, '"a12": "No, Vender.id is a web application that runs in your browser. Just open the website and log in, no installation needed.",' + missingEn);
i18nContent = i18nContent.replace(/"a12": "Tidak, Vender\.id adalah aplikasi web yang berjalan di browser Anda\. Cukup buka situs web dan masuk, tidak perlu instalasi\."/, '"a12": "Tidak, Vender.id adalah aplikasi web yang berjalan di browser Anda. Cukup buka situs web dan masuk, tidak perlu instalasi.",' + missingId);

fs.writeFileSync(i18nPath, i18nContent);
console.log('Updated i18n.js again');
