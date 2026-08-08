const fs = require('fs');
const path = require('path');
const faqPath = path.join(__dirname, 'resources', 'js', 'pages', 'FAQ.vue');

let faqContent = fs.readFileSync(faqPath, 'utf8');

const replacements = {
  'Temukan jawaban atas pertanyaan umum tentang Vender.id di sini.': "{{ $t('faq_page.desc') }}",
  'Semua': "{{ $t('faq_page.tab_all') }}",
  'Umum': "{{ $t('faq_page.tab_general') }}",
  'Harga &amp; Paket': "{{ $t('faq_page.tab_pricing') }}",
  'Fitur': "{{ $t('faq_page.tab_features') }}",
  'Apa itu Vender.id?': "{{ $t('faq_page.q1') }}",
  'Vender.id adalah platform manajemen klien untuk vendor lepas, studio kreatif, dan bisnis jasa. Kelola pemesanan, faktur, jadwal, pelacakan klien, dan komunikasi WhatsApp dalam satu dasbor.': "{{ $t('faq_page.a1') }}",
  'Apakah Vender.id gratis?': "{{ $t('faq_page.q2') }}",
  'Vender.id menawarkan uji coba gratis 7 hari, sehingga Anda dapat mencoba semua fitur. Setelah masa uji coba, Anda dapat memilih paket berlangganan mulai dari Rp 49.000/bulan.': "{{ $t('faq_page.a2') }}",
  'Siapa yang sebaiknya menggunakan Vender.id?': "{{ $t('faq_page.q3') }}",
  'Vender.id sangat ideal untuk vendor lepas, fotografer, videografer, penyelenggara pernikahan, studio kreatif, dan bisnis jasa lainnya yang membutuhkan sistem manajemen klien yang rapi dan profesional.': "{{ $t('faq_page.a3') }}",
  'Apakah data saya aman?': "{{ $t('faq_page.q4') }}",
  'Ya, kami menggunakan server cloud yang aman dengan enkripsi untuk memastikan data Anda dan klien Anda tetap aman.': "{{ $t('faq_page.a4') }}",
  'Berapa biaya Vender.id?': "{{ $t('faq_page.q5') }}",
  'Layanan Vender.id tersedia mulai dari Rp 49.000/bulan, Rp 129.000/3 bulan, atau Rp 489.000/tahun.': "{{ $t('faq_page.a5') }}",
  'Metode pembayaran apa saja yang diterima?': "{{ $t('faq_page.q6') }}",
  'Kami menerima pembayaran melalui transfer bank (BCA, Mandiri, BNI, BRI), e-wallet (GoPay, OVO, Dana, LinkAja), dan kartu kredit.': "{{ $t('faq_page.a6') }}",
  'Apakah saya bisa membatalkan langganan?': "{{ $t('faq_page.q7') }}",
  'Tentu. Anda dapat membatalkan langganan Anda kapan saja tanpa biaya tambahan. Anda akan tetap memiliki akses hingga akhir periode penagihan Anda.': "{{ $t('faq_page.a7') }}",
  'Apakah ada garansi uang kembali?': "{{ $t('faq_page.q8') }}",
  'Ya, kami menawarkan garansi uang kembali 7 hari setelah pembelian jika Anda merasa Vender.id tidak memenuhi kebutuhan Anda.': "{{ $t('faq_page.a8') }}",
  'Apa saja fitur utama dari Vender.id?': "{{ $t('faq_page.q9') }}",
  'Fitur utama meliputi pemesanan &amp; manajemen sesi, faktur, uang muka &amp; penyelesaian, templat WhatsApp, pelacakan status klien, sinkronisasi Kalender Google, formulir pemesanan online, tautan pemesanan khusus, Google Drive, tugas pekerja lepas, impor Excel, dan merek domain kustom.': "{{ $t('faq_page.a9') }}",
  'Apakah Vender.id mendukung berbagai bahasa?': "{{ $t('faq_page.q10') }}",
  'Ya, Vender.id mendukung Bahasa Indonesia dan Bahasa Inggris. Anda dapat mengganti bahasa kapan saja.': "{{ $t('faq_page.a10') }}",
  'Dapatkah saya menggunakan Vender.id di HP saya?': "{{ $t('faq_page.q11') }}",
  'Ya, Vender.id sepenuhnya responsif dan dapat diakses dari ponsel, tablet, atau browser desktop Anda.': "{{ $t('faq_page.a11') }}",
  'Apakah saya perlu mengunduh aplikasi?': "{{ $t('faq_page.q12') }}",
  'Tidak, Vender.id adalah aplikasi web yang berjalan di browser Anda. Cukup buka situs web dan masuk, tidak perlu instalasi.': "{{ $t('faq_page.a12') }}"
};

for (const [key, value] of Object.entries(replacements)) {
  const safeKey = key.replace(/&amp;/g, '&');
  faqContent = faqContent.replace(new RegExp(safeKey.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&'), 'g'), value);
}

fs.writeFileSync(faqPath, faqContent);
console.log('Updated FAQ.vue');
