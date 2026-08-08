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

// Update EN reviews
messages.en.home.reviews = {
  r1_name: "Alora Graduation",
  r1_role: "Alora Graduation",
  r1_text: "So far it's very worth it because admin work becomes more systematic and less hassle than before. Fastpik also makes it easier for clients to choose photos, so the experience from booking to after editing feels more professional and increases vendor value.",
  r2_name: "The Sunshine Photo",
  r2_role: "The Sunshine Photo",
  r2_text: "Before using Vender.id, my workflow was mostly manual and data had to be moved around. After the trial, features like scheduling, client database, follow-ups, invoices, freelance fees, and booking forms felt truly relevant for photography services. Everything is structured in one dashboard, especially when used together with Fastpik.",
  r3_name: "Pujisap Photo",
  r3_role: "Pujisap_photo",
  r3_text: "Very awesome, all the apps made are great.",
  r4_name: "Tafa Photography",
  r4_role: "Tafa Photography",
  r4_text: "Vender.id is getting more complete every day. From bookings, financial reports, ratings, to Google Calendar sync, everything really helps monitor work and report to superiors comfortably without jumping between spreadsheets.",
  r5_name: "Lengkara Visual",
  r5_role: "Lengkara Visual",
  r5_text: "Workflow became much cleaner and everything feels more systematic. Vender.id & Fastpik make vendor operations look more professional, and this is the app I've been looking for to help manage bookings comfortably.",
  r6_name: "Seraphic Graduation",
  r6_role: "Seraphic Graduation",
  r6_text: "The features really help manage clients automatically from booking until finished. Vendors no longer need to input data manually to spreadsheets or GCal, and the support is responsive when there are bugs or feedback."
};

// Update ID reviews
messages.id.home.reviews = {
  r1_name: "Alora Graduation",
  r1_role: "Alora Graduation",
  r1_text: "Sejauh ini sangat worth it karena kerja admin jadi lebih sistematis dan tidak serepot dulu. Fastpik juga memudahkan client pilih foto, jadi experience dari booking sampai after editing terasa lebih profesional dan menaikkan value vendor.",
  r2_name: "The Sunshine Photo",
  r2_role: "The Sunshine Photo",
  r2_text: "Sebelum pakai Vender.id, workflow masih banyak manual dan data harus dipindahkan ke sana-sini. Setelah trial, fitur jadwal, database client, follow-up, invoice, fee freelance, dan form booking terasa benar-benar relevan untuk jasa photography. Semuanya lebih terstruktur dalam satu dashboard, apalagi kalau dipakai bareng Fastpik.",
  r3_name: "Pujisap Photo",
  r3_role: "Pujisap_photo",
  r3_text: "Josjis banget semua app yang dibikin. Mantap.",
  r4_name: "Tafa Photography",
  r4_role: "Tafa Photography",
  r4_text: "Vender.id semakin hari semakin lengkap fiturnya. Dari booking, laporan keuangan, rating, sampai sinkron ke Google, semuanya bantu banget buat mantau kerjaan dan bikin laporan ke atasan lebih enak tanpa harus bolak-balik update spreadsheet.",
  r5_name: "Lengkara Visual",
  r5_role: "Lengkara Visual",
  r5_text: "Workflow jadi jauh lebih rapi dan semuanya terasa lebih tersistem. Vender.id & Fastpik bikin operasional vendor terlihat lebih profesional, dan ini aplikasi yang selama ini aku cari untuk bantu ngatur booking dengan lebih enak.",
  r6_name: "Seraphic Graduation",
  r6_role: "Seraphic Graduation",
  r6_text: "Fitur-fiturnya ngebantu banget untuk manage klien secara otomatis dari booking sampai selesai. Vendor jadi tidak perlu input data manual lagi ke spreadsheet atau GCal, dan support-nya juga responsif saat ada bug atau masukan."
};

// Update EN problems
messages.en.home.problems = {
  ...messages.en.home.problems,
  p1: "Scattered Client Data",
  p1_desc: "Booking information is scattered across WhatsApp, notes, and different spreadsheets. Hard to track.",
  p2: "Manual & Complicated Invoicing",
  p2_desc: "Creating invoices one by one, calculating remaining balances, and tracking DPs manually.",
  p3: "Frequent Schedule Clashes",
  p3_desc: "No centralized system to check schedules, often resulting in double bookings.",
  p4: "Hard to Track Progress",
  p4_desc: "Don't know which bookings are completed, unpaid, or still in queue.",
  p5: "Manual WA Confirmations",
  p5_desc: "Retyping booking confirmation messages to every client wastes your valuable time.",
  p6: "Messy Financial Records",
  p6_desc: "No clear income summary, DPs mixed up, and hard to create financial reports."
};

// Update ID problems
messages.id.home.problems = {
  ...messages.id.home.problems,
  p1: "Data Klien Berserakan",
  p1_desc: "Informasi booking tersebar di WhatsApp, catatan, dan spreadsheet berbeda. Sulit dilacak.",
  p2: "Invoice Manual & Ribet",
  p2_desc: "Membuat invoice satu per satu, menghitung sisa tagihan, dan melacak DP secara manual.",
  p3: "Jadwal Sering Bentrok",
  p3_desc: "Tidak ada sistem terpusat untuk mengecek jadwal, sehingga sering double booking.",
  p4: "Sulit Lacak Progres",
  p4_desc: "Tidak tahu mana booking yang sudah selesai, belum bayar, atau masih dalam antrian.",
  p5: "Konfirmasi WA Manual",
  p5_desc: "Mengetik ulang pesan konfirmasi booking ke setiap klien menyita waktu berharga Anda.",
  p6: "Catatan Keuangan Amburadul",
  p6_desc: "Tidak punya rekap pemasukan yang jelas, DP tercampur, dan sulit bikin laporan keuangan."
};

// Update EN features
messages.en.home.features = {
  ...messages.en.home.features,
  btn_view_all: "View All Features",
  f1: "Booking & Session Management",
  f1_desc: "Manage bookings, session schedules, and client operational details from one neat dashboard.",
  f2: "Invoices, DPs & Settlements",
  f2_desc: "Create invoices, monitor DPs, open final settlements, and follow up on payments without manual spreadsheets.",
  f3: "WhatsApp Templates & Follow-ups",
  f3_desc: "Send booking confirmations, session reminders, invoices, and client follow-ups via WhatsApp templates.",
  f4: "Client Status Tracking",
  f4_desc: "Monitor booking progress and share tracking links so clients can check their status independently.",
  f5: "Google Calendar Sync",
  f5_desc: "Sync booking schedules to Google Calendar so the team's agenda is always up-to-date.",
  f6: "Online Booking Forms",
  f6_desc: "Share online booking forms so client data enters your dashboard automatically."
};

// Update ID features
messages.id.home.features = {
  ...messages.id.home.features,
  btn_view_all: "Lihat Semua Fitur",
  f1: "Booking & Manajemen Sesi",
  f1_desc: "Kelola booking, jadwal sesi, dan detail operasional klien dari satu dashboard yang rapi.",
  f2: "Invoice, DP & Pelunasan",
  f2_desc: "Buat invoice, pantau DP, buka pelunasan final, dan follow-up pembayaran tanpa spreadsheet manual.",
  f3: "Template WhatsApp & Follow-up",
  f3_desc: "Kirim konfirmasi booking, reminder sesi, invoice, dan follow-up klien lewat template WhatsApp.",
  f4: "Tracking Status Klien",
  f4_desc: "Pantau progres booking dan bagikan link tracking agar klien bisa cek status secara mandiri.",
  f5: "Sinkronisasi Google Calendar",
  f5_desc: "Sinkronkan jadwal booking ke Google Calendar supaya agenda tim selalu up-to-date.",
  f6: "Form Booking Online",
  f6_desc: "Bagikan form booking online agar data klien masuk otomatis ke dashboard Anda."
};

// Update EN showcase
messages.en.home.showcase = {
  ...messages.en.home.showcase,
  s1_role: "Admin",
  s1_title: "Dashboard",
  s1_desc: "Booking summaries, agendas, and important indicators are clearly displayed once the admin logs in.",
  s2_role: "Admin",
  s2_title: "Booking List",
  s2_desc: "All bookings can be monitored, searched, filtered, and opened from one operational table.",
  s3_role: "Admin",
  s3_title: "Invoices & Settlements",
  s3_desc: "Monitor DPs, invoices, settlements, and payment status without separate manual notes.",
  s4_role: "Admin",
  s4_title: "Financial Summary",
  s4_desc: "View income, transactions, and vendor financial performance in an easy-to-read view.",
  s5_role: "Admin",
  s5_title: "Calendar",
  s5_desc: "Session schedules are arranged in a calendar so team agendas are easily checked before accepting new bookings.",
  s6_role: "Admin",
  s6_title: "Packages",
  s6_desc: "Manage service packages, prices, and offer details used in the booking form.",
  s7_role: "Admin",
  s7_title: "Admin Booking Form",
  s7_desc: "Admins can configure fields, appearance, and data requirements to be filled out by clients.",
  s8_role: "Team / Freelance",
  s8_title: "Freelance Portal",
  s8_desc: "Team and freelancers can view schedules, task details, and upload status from a special portal.",
  s9_role: "Client",
  s9_title: "Client Booking Form",
  s9_desc: "Clients fill in booking data from a neat public page that goes directly into the system.",
  s10_role: "Client",
  s10_title: "Client Invoice",
  s10_desc: "Public invoices clearly display billing details and payment instructions.",
  s11_role: "Client",
  s11_title: "Client Settlement Form",
  s11_desc: "Clients can send final settlement proofs via a dedicated page that is easy to share.",
  s12_role: "Client",
  s12_title: "Client Booking Status",
  s12_desc: "Clients can check booking progress independently without having to ask again via chat."
};

// Update ID showcase
messages.id.home.showcase = {
  ...messages.id.home.showcase,
  s1_role: "Admin",
  s1_title: "Dashboard",
  s1_desc: "Ringkasan booking, agenda, dan indikator penting tampil jelas begitu admin masuk.",
  s2_role: "Admin",
  s2_title: "Daftar Booking",
  s2_desc: "Semua booking bisa dipantau, dicari, difilter, dan dibuka dari satu tabel operasional.",
  s3_role: "Admin",
  s3_title: "Invoice & Pelunasan",
  s3_desc: "Pantau DP, invoice, pelunasan, dan status pembayaran tanpa catatan manual terpisah.",
  s4_role: "Admin",
  s4_title: "Rangkuman Keuangan",
  s4_desc: "Lihat pemasukan, transaksi, dan performa keuangan vendor dalam tampilan yang mudah dibaca.",
  s5_role: "Admin",
  s5_title: "Kalender",
  s5_desc: "Jadwal sesi tersusun dalam kalender agar agenda tim lebih mudah dicek sebelum menerima booking baru.",
  s6_role: "Admin",
  s6_title: "Paket",
  s6_desc: "Kelola paket layanan, harga, dan detail penawaran yang dipakai di form booking.",
  s7_role: "Admin",
  s7_title: "Form Booking Admin",
  s7_desc: "Admin bisa mengatur field, tampilan, dan kebutuhan data yang akan diisi oleh klien.",
  s8_role: "Tim / Freelance",
  s8_title: "Portal Freelance",
  s8_desc: "Tim dan freelance bisa melihat jadwal, detail tugas, dan status upload dari portal khusus.",
  s9_role: "Klien",
  s9_title: "Form Booking Klien",
  s9_desc: "Klien mengisi data booking dari halaman publik yang rapi dan langsung masuk ke sistem.",
  s10_role: "Klien",
  s10_title: "Invoice Klien",
  s10_desc: "Invoice publik menampilkan detail tagihan dan instruksi pembayaran dengan jelas.",
  s11_role: "Klien",
  s11_title: "Form Pelunasan Klien",
  s11_desc: "Klien bisa mengirim bukti pelunasan final lewat halaman khusus yang mudah dibagikan.",
  s12_role: "Klien",
  s12_title: "Status Booking Klien",
  s12_desc: "Klien dapat mengecek progres booking secara mandiri tanpa harus bertanya ulang lewat chat."
};

// Update EN how
messages.en.home.how = {
  ...messages.en.home.how,
  h1: "Register & Setup",
  h1_desc: "Create a free account, set up vendor profile, and add your services/packages.",
  h2: "Receive Bookings",
  h2_desc: "Clients fill out the online booking form, or you add manually from the dashboard.",
  h3: "Manage & Send",
  h3_desc: "Manage schedules, send WA templates, monitor client tracking, and handle invoices until settlement."
};

// Update ID how
messages.id.home.how = {
  ...messages.id.home.how,
  h1: "Daftar & Setup",
  h1_desc: "Buat akun gratis, atur profil vendor, dan tambahkan layanan/paket Anda.",
  h2: "Terima Booking",
  h2_desc: "Klien mengisi form booking online, atau Anda tambahkan manual dari dashboard.",
  h3: "Kelola & Kirim",
  h3_desc: "Kelola jadwal, kirim template WA, pantau tracking klien, dan urus invoice hingga pelunasan."
};

const newMsgString = JSON.stringify(messages, null, 2);

const newContent = content.substring(0, msgStart) + 
  "const messages = " + newMsgString + ";\n\n" + 
  content.substring(msgEnd);

fs.writeFileSync('resources/js/i18n.js', newContent, 'utf8');
console.log("Successfully updated i18n.js");
