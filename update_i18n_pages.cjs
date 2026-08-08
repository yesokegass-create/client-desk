const fs = require('fs');

let content = fs.readFileSync('resources/js/i18n.js', 'utf8');

const msgStart = content.indexOf('const messages = {');
const msgEnd = content.indexOf('const i18n = createI18n');

if (msgStart === -1 || msgEnd === -1) {
  console.log("Could not find messages object");
  process.exit(1);
}

let msgString = content.substring(msgStart + 17, msgEnd).trim();
if (msgString.endsWith(';')) msgString = msgString.slice(0, -1);

let messages;
try {
  messages = eval('(' + msgString + ')');
} catch (e) {
  console.log("Error parsing messages:", e);
  process.exit(1);
}

// Features page EN
messages.en.features_page = {
  back_home: "← Home",
  current: "Features",
  title: "All Vender.id Features",
  desc: "Manage bookings, invoices, client tracking, and vendor operations in one modern platform.",
  main_features: "Main Features",
  f1_title: "Booking & Session Management",
  f1_desc: "Manage manual bookings from one dashboard, set session details, and manage client operations in one dashboard.",
  f2_title: "Invoices, Deposits & Settlements",
  f2_desc: "Create professional invoices, monitor deposits, manage final settlements, and review payment statuses without complicated manual work.",
  f3_title: "WhatsApp Templates and Follow-ups",
  f3_desc: "Use WhatsApp templates for booking confirmations, session reminders, invoices, payment settlements, and faster client follow-ups.",
  f4_desc: "Track every booking from queue to completion, then share a tracking link so clients can follow their own progress.",
  f5_desc: "Sync booking schedules to Google Calendar so admin and team calendars remain accurate without re-entering data.",
  f6_desc: "Share an online booking form that integrates directly into your dashboard with custom fields, packages, and initial payment flows.",
  extra_features: "Extra Features",
  e1_title: "Custom Booking Links",
  e1_desc: "Create custom booking links with specific package rules, add-ons, discounts, or deposits tailored to specific offers.",
  e2_title: "Google Drive & Delivery Links",
  e2_desc: "Manage Google Drive work folders and control when photo or video delivery links appear on the client tracking page.",
  e3_title: "Team & Freelancer Assignment",
  e3_desc: "Manage team members and freelancers, then assign them to bookings to keep field operations organized.",
  cta_badge: "🎉 7-DAY FREE TRIAL",
  cta_title: "Ready to Manage Clients More Professionally?",
  cta_desc: "Join now and experience the ease of managing bookings, invoices, and client schedules.",
  cta_btn: "🚀 Start Now →",
  cta_small: "No credit card required. 7-day trial period, then choose the right plan for you."
};

// Features page ID
messages.id.features_page = {
  back_home: "← Rumah",
  current: "Fitur",
  title: "Semua Fitur Meja Klien",
  desc: "Kelola pemesanan, faktur, pelacakan klien, dan operasional vendor dalam satu platform modern.",
  main_features: "Fitur Utama",
  f1_title: "Manajemen Pemesanan & Sesi",
  f1_desc: "Kelola pemesanan manual dari satu dashboard, atur detail sesi, dan kelola operasional klien dalam satu dasbor.",
  f2_title: "Faktur, Setoran & Penyelesaian",
  f2_desc: "Buat faktur profesional, pantau setoran, kelola penyelesaian akhir, dan tinjau status pembayaran tanpa pekerjaan manual yang rumit.",
  f3_title: "Template dan Tindak Lanjut WhatsApp",
  f3_desc: "Gunakan templat WhatsApp untuk konfirmasi pemesanan, pengingat sesi, faktur, penyelesaian pembayaran, dan tindak lanjut klien yang lebih cepat.",
  f4_desc: "Lacak setiap pemesanan dari antrian hingga selesai, lalu bagikan tautan pelacakan agar klien dapat mengikuti perkembangannya sendiri.",
  f5_desc: "Sinkronkan jadwal pemesanan ke Google Kalender agar kalender admin dan tim tetap akurat tanpa perlu memasukkan data ulang.",
  f6_desc: "Bagikan formulir pemesanan online yang terintegrasi langsung ke dasbor Anda dengan kolom kustom, paket, dan alur pembayaran awal.",
  extra_features: "Fitur Tambahan",
  e1_title: "Tautan Pemesanan Khusus",
  e1_desc: "Buat tautan pemesanan khusus dengan aturan paket, tambahan, diskon, atau deposit yang disesuaikan dengan penawaran tertentu.",
  e2_title: "Google Drive & Tautan Pengiriman",
  e2_desc: "Kelola folder kerja Google Drive dan kendalikan kapan tautan pengiriman foto atau video muncul di halaman pelacakan klien.",
  e3_title: "Penugasan Tim & Freelancer",
  e3_desc: "Kelola anggota tim dan pekerja lepas, lalu tetapkan mereka ke pemesanan agar operasi lapangan tetap terorganisir.",
  cta_badge: "🎉 UJI COBA GRATIS 7 HARI",
  cta_title: "Siap Mengelola Klien dengan Lebih Profesional?",
  cta_desc: "Bergabunglah sekarang dan rasakan kemudahan mengelola pemesanan, faktur, dan jadwal klien.",
  cta_btn: "🚀 Mulai Sekarang →",
  cta_small: "Tidak perlu kartu kredit. Masa percobaan 7 hari, lalu pilih paket yang tepat untuk Anda."
};

// Pricing page EN
messages.en.pricing_page = {
  back_home: "← Home",
  current: "Pricing",
  title: "Choose Your Vender.id Plan",
  desc: "Affordable pricing for all vendors. A small investment for a big impact on your business.",
  trial_badge: "Try Free for 7 Days!",
  trial_desc: "Test for free for 7 days before you subscribe. No credit card required.",
  trial_f1: "Access all features",
  trial_f2: "Unlimited invoices",
  trial_f3: "Cancel anytime",
  toggle_month: "Monthly",
  toggle_3month: "3 Months",
  toggle_year: "Yearly",
  save_10: "Save 10%",
  save_20: "Save 20%",
  
  plan1_name: "Basic",
  plan1_tag: "Great for beginners",
  plan1_price: "49k",
  plan1_period: "/month",
  plan1_desc: "Ideal for beginners who want to organize bookings and schedules affordably.",
  plan1_l1: "Booking & client management",
  plan1_l2: "Automated schedule & Google Calendar",
  plan1_l3: "Booking invitation links for clients",
  plan1_l4: "Send WhatsApp confirmations",
  plan1_l5: "Create quotations",
  plan1_l6: "Settlement status tracking",
  plan1_l7: "Automated DP & settlement payments",
  plan1_l8: "Google Drive sync",
  plan1_l9: "Review & rating form links",
  plan1_l10: "Monthly income summary",
  plan1_l11: "Customer support",
  plan1_btn: "Start",
  
  plan2_pop: "Most Popular",
  plan2_name: "Plus",
  plan2_tag: "For growing vendors",
  plan2_price: "149k",
  plan2_period: "/month",
  plan2_desc: "For growing vendors who need advanced systems, cloud sync, and AI assistants.",
  plan2_includes: "Everything in Basic, plus:",
  plan2_l1: "Complete financial summary",
  plan2_l2: "Export reports to excel/csv",
  plan2_l3: "Automated payment links (Xendit/Midtrans)",
  plan2_l4: "Custom review forms (1-5 stars)",
  plan2_l5: "Telegram notifications",
  plan2_l6: "Custom invoice theme colors",
  plan2_l7: "VIP Priority CS",
  plan2_btn: "Start",
  
  plan3_name: "Pro",
  plan3_tag: "For studios & teams with high ops",
  plan3_price: "249k",
  plan3_period: "/month",
  plan3_desc: "Complete solution for studios or agencies with many teams, invoices, and clients.",
  plan3_includes: "Everything in Plus, plus:",
  plan3_l1: "Multi-user & Role (Owner, Admin, Team)",
  plan3_l2: "Job assignments to team/freelancers",
  plan3_l3: "Team attendance tracking",
  plan3_l4: "Custom brand domain (e.g. client.yourstudio.com)",
  plan3_l5: "API access & Webhooks",
  plan3_btn: "Contact Us",
  
  comp_title: "Compare all plans",
  comp_desc: "See detailed feature comparisons and choose the plan that best suits your needs.",
  comp_h1: "Feature",
  comp_h2: "Basic",
  comp_h3: "Plus",
  comp_h4: "Pro",
  comp_g1: "GENERAL",
  comp_r1: "Booking limit",
  comp_r1_v1: "100",
  comp_r1_v2: "500",
  comp_r1_v3: "Unlimited",
  comp_r2: "Storage",
  comp_r2_v1: "1 GB",
  comp_r2_v2: "10 GB",
  comp_r2_v3: "50 GB",
  comp_g2: "MANAGEMENT",
  comp_r3: "Client & Session Management"
};

// Pricing page ID
messages.id.pricing_page = {
  back_home: "← Rumah",
  current: "Harga",
  title: "Pilih Paket Meja Klien Anda",
  desc: "Harga terjangkau untuk semua vendor. Investasi kecil, hasil berdampak besar untuk bisnis Anda.",
  trial_badge: "Coba Gratis Selama 7 Hari!",
  trial_desc: "Uji coba gratis selama 7 hari sebelum Anda berlangganan. Tidak perlu kartu kredit.",
  trial_f1: "Akses semua fitur",
  trial_f2: "Tidak ada batasan invoice",
  trial_f3: "Batal kapan saja",
  toggle_month: "Bulanan",
  toggle_3month: "3 Bulan",
  toggle_year: "Tahunan",
  save_10: "Hemat 10%",
  save_20: "Hemat 20%",
  
  plan1_name: "Dasar",
  plan1_tag: "Cocok untuk pemula",
  plan1_price: "49rb",
  plan1_period: "/bulan",
  plan1_desc: "Ideal untuk pemula yang ingin mengatur pemesanan dan jadwal dengan biaya terjangkau.",
  plan1_l1: "Manajemen pemesanan & klien",
  plan1_l2: "Jadwal otomatis & Google Kalender",
  plan1_l3: "Tautan undangan pemesanan untuk klien",
  plan1_l4: "Kirim konfirmasi WhatsApp",
  plan1_l5: "Buat penawaran harga",
  plan1_l6: "Pelacakan status penyelesaian",
  plan1_l7: "Pembayaran DP & penyelesaian otomatis",
  plan1_l8: "Sinkronisasi Google Drive",
  plan1_l9: "Tautan form ulasan & rating",
  plan1_l10: "Ringkasan pendapatan bulanan",
  plan1_l11: "Dukungan pelanggan",
  plan1_btn: "Mulai",
  
  plan2_pop: "Paling Populer",
  plan2_name: "Plus",
  plan2_tag: "Cocok untuk vendor berkembang",
  plan2_price: "149rb",
  plan2_period: "/bulan",
  plan2_desc: "Untuk vendor berkembang yang membutuhkan sistem lebih canggih, sinkronisasi cloud, dan asisten AI.",
  plan2_includes: "Semua yang ada di Dasar, ditambah:",
  plan2_l1: "Ringkasan keuangan lengkap",
  plan2_l2: "Ekspor laporan ke excel/csv",
  plan2_l3: "Tautan pembayaran otomatis (Xendit/Midtrans)",
  plan2_l4: "Form ulasan custom (Bintang 1-5)",
  plan2_l5: "Notifikasi Telegram",
  plan2_l6: "Kustomisasi warna tema invoice",
  plan2_l7: "Prioritas CS VIP",
  plan2_btn: "Mulai",
  
  plan3_name: "Pro",
  plan3_tag: "Untuk studio & tim dengan operasional tinggi",
  plan3_price: "249rb",
  plan3_period: "/bulan",
  plan3_desc: "Solusi lengkap bagi studio atau agensi dengan banyak tim, invoice, dan manajemen klien.",
  plan3_includes: "Semua yang ada di Plus, ditambah:",
  plan3_l1: "Multi-user & Role (Owner, Admin, Tim)",
  plan3_l2: "Penugasan pekerjaan ke tim/freelancer",
  plan3_l3: "Pelacakan absensi tim",
  plan3_l4: "Brand domain custom (contoh: klien.studioanda.com)",
  plan3_l5: "API akses & Webhooks",
  plan3_btn: "Hubungi Kami",
  
  comp_title: "Bandingkan semua paket",
  comp_desc: "Lihat detail perbandingan fitur dan pilih paket yang paling sesuai dengan kebutuhan Anda.",
  comp_h1: "Fitur",
  comp_h2: "Dasar",
  comp_h3: "Plus",
  comp_h4: "Pro",
  comp_g1: "UMUM",
  comp_r1: "Batas pemesanan",
  comp_r1_v1: "100",
  comp_r1_v2: "500",
  comp_r1_v3: "Tak terbatas",
  comp_r2: "Penyimpanan",
  comp_r2_v1: "1 GB",
  comp_r2_v2: "10 GB",
  comp_r2_v3: "50 GB",
  comp_g2: "MANAJEMEN",
  comp_r3: "Manajemen Klien & Sesi"
};

const newMsgString = JSON.stringify(messages, null, 2);
const newContent = content.substring(0, msgStart) + 
  "const messages = " + newMsgString + ";\n\n" + 
  content.substring(msgEnd);

fs.writeFileSync('resources/js/i18n.js', newContent, 'utf8');
console.log("Successfully updated i18n.js for Features and Pricing pages");
