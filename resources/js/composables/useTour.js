import { ref, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';

const isActive = ref(sessionStorage.getItem('tour_isActive') === 'true');
const currentStepIndex = ref(parseInt(sessionStorage.getItem('tour_currentStepIndex') || '0', 10));

watch(isActive, (newVal) => {
  sessionStorage.setItem('tour_isActive', newVal);
});

watch(currentStepIndex, (newVal) => {
  sessionStorage.setItem('tour_currentStepIndex', newVal);
});

// Global state for the tour
const tourState = reactive({
  steps: [
    {
      id: 'setup-profile',
      title: 'Lengkapi profil dasar dulu',
      description: 'Lengkapi identitas dasar akunmu dulu. Nama ini akan dipakai di area admin dan beberapa tampilan publik.',
      note: 'Isi nama yang ingin kamu gunakan, lalu simpan perubahan sebelum lanjut.',
      path: '/profil',
      actionText: 'Simpan',
      nextRoute: '/dashboard',
      targetSelector: '#tour-target-nama',
      completed: false
    },
    {
      id: 'setup-studio',
      title: 'Isi nama studio dulu',
      description: 'Isi nama studio dulu di Pengaturan Umum. Nama ini dipakai untuk link dan identitas form booking.',
      note: 'Lengkapi nama studio pada bagian ini lalu simpan sebelum lanjut ke Form Booking.',
      path: '/pengaturan?tab=umum',
      actionText: 'Simpan',
      nextRoute: '/services',
      targetSelector: '#tour-target-studio',
      completed: false
    },
    {
      id: 'add-service',
      title: 'Tambahkan layanan pertamamu',
      description: 'Tambahkan minimal 1 layanan atau paket agar form booking bisa dipakai klien.',
      note: 'Gunakan tombol tambah ini untuk membuat paket utama pertamamu. Langkah akan lanjut setelah paket berhasil disimpan.',
      path: '/services',
      actionText: 'Simpan paket utama pertamamu dulu di popup ini untuk lanjut.',
      nextRoute: '/dashboard',
      targetSelector: '#tour-target-add-service',
      completed: false
    },
    {
      id: 'add-team',
      title: 'Tambahkan anggota tim pertamamu',
      description: 'Tambahkan minimal satu tim atau freelance agar alur penugasan booking dan kerja kolaboratif lebih rapi.',
      note: 'Gunakan tombol tambah ini untuk membuat anggota tim atau freelance pertamamu. Langkah akan lanjut setelah anggota berhasil disimpan.',
      path: '/team',
      actionText: 'Simpan anggota tim atau freelance pertamamu dulu di popup ini untuk lanjut.',
      nextRoute: '/dashboard',
      targetSelector: '#tour-target-add-team',
      completed: false
    },
    {
      id: 'setup-form',
      title: 'Aktifkan form booking',
      description: 'Atur slug atau link form booking dan pilih metode pembayaran supaya klien bisa booking sendiri dengan lebih rapi.',
      note: 'Pilih minimal satu metode pembayaran, simpan pengaturan, lalu cek link atau preview form bila perlu.',
      path: '/form-booking',
      actionText: 'Lanjut',
      nextRoute: '/dashboard',
      targetSelector: '#metode-pembayaran-section',
      completed: false
    },
    {
      id: 'add-booking',
      title: 'Mulai dari data klien',
      description: 'Isi identitas dasar klien dulu di bagian ini, seperti nama dan nomor WhatsApp.\nLengkapi data klien utama di sini sebelum lanjut ke detail sesi.',
      path: '/bookings/new',
      targetSelector: '#tour-target-informasi-klien',
      completed: true
    },
    {
      id: 'add-booking-2',
      title: 'Lanjut ke detail sesi',
      description: 'Di bagian ini kamu mengatur tipe acara, tanggal, jam, lokasi, dan paket utama booking.\nLengkapi detail sesi utama di sini agar booking pertamamu siap disimpan.',
      path: '/bookings/new',
      targetSelector: '#tour-target-detail-sesi',
      completed: true
    },
    {
      id: 'add-booking-3',
      title: 'Simpan booking pertamamu',
      description: 'Kalau data utama sudah terisi, simpan booking ini untuk menyelesaikan langkah onboarding.\nGunakan tombol simpan ini untuk membuat booking pertamamu dan lanjut ke langkah berikutnya.',
      path: '/bookings/new',
      targetSelector: '#tour-target-simpan-booking',
      completed: false
    },
    {
      id: 'view-booking-list',
      title: 'Lihat booking pertamamu di daftar',
      description: 'Halaman ini menampilkan daftar booking yang sudah masuk, termasuk booking pertama yang baru kamu buat.\nGunakan area ini untuk mengenali daftar booking, mencari data, dan membuka aksi utama tiap booking.',
      path: '/daftar-booking',
      targetSelector: '#tour-target-daftar-booking',
      completed: false
    },
    {
      id: 'view-status-booking',
      title: 'Pantau status booking di sini',
      description: 'Di halaman ini kamu memantau progres booking, antrian, dan link tracking yang bisa dibagikan ke klien.\nGunakan tabel atau kartu ini untuk melihat status booking dan mengakses link tracking klien.',
      path: '/status-booking',
      targetSelector: '#tour-target-status-booking',
      completed: false
    },
    {
      id: 'view-integration-calendar',
      title: 'Hubungkan Google Calendar',
      description: 'Hubungkan akun Google jika kamu ingin sinkron kalender berjalan otomatis.\nGunakan kartu ini untuk menghubungkan Google Calendar dari halaman Pengaturan.',
      path: '/pengaturan?tab=google',
      targetSelector: '#tour-target-google-calendar',
      completed: true
    },
    {
      id: 'view-integration-drive',
      title: 'Hubungkan Google Drive',
      description: 'Hubungkan akun Google jika kamu ingin file dan folder kerja berjalan otomatis.\nGunakan kartu ini untuk menghubungkan Google Drive dari halaman Pengaturan.',
      path: '/pengaturan?tab=google',
      targetSelector: '#tour-target-google-drive',
      completed: true
    }
  ]
});

export function useTour() {
  const router = useRouter();

  const startTour = (stepIdOrIndex = 0) => {
    isActive.value = true;
    
    if (typeof stepIdOrIndex === 'string') {
      const idx = tourState.steps.findIndex(s => s.id === stepIdOrIndex);
      currentStepIndex.value = idx !== -1 ? idx : 0;
    } else {
      currentStepIndex.value = stepIdOrIndex;
    }
    
    const step = tourState.steps[currentStepIndex.value];
    if (step && step.path) {
      router.push(step.path);
    }
  };

  const nextStep = () => {
    if (currentStepIndex.value < tourState.steps.length - 1) {
      currentStepIndex.value++;
      const step = tourState.steps[currentStepIndex.value];
      if (step && step.path) {
        router.push(step.path);
      }
    } else {
      endTour();
    }
  };

  const prevStep = () => {
    if (currentStepIndex.value > 0) {
      currentStepIndex.value--;
      const step = tourState.steps[currentStepIndex.value];
      if (step && step.path) {
        router.push(step.path);
      }
    }
  };

  const endTour = () => {
    isActive.value = false;
    currentStepIndex.value = 0;
  };

  const completeStep = (stepId) => {
    const step = tourState.steps.find(s => s.id === stepId);
    if (step) {
      step.completed = true;
    }
    
    // Optimistically update Dashboard cache
    try {
      const cached = localStorage.getItem('vender_setup_status');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (stepId === 'setup-profile') parsed.step1_completed = true;
        if (stepId === 'setup-studio') parsed.step2_completed = true;
        if (stepId === 'add-service') parsed.step3_completed = true;
        if (stepId === 'add-team') parsed.step4_completed = true;
        if (stepId === 'setup-form') parsed.step5_completed = true;
        if (stepId === 'add-booking-3') parsed.step6_completed = true;
        if (stepId === 'view-booking-list') parsed.step7_completed = true;
        if (stepId === 'view-status-booking') parsed.step8_completed = true;
        localStorage.setItem('vender_setup_status', JSON.stringify(parsed));
      }
    } catch (e) {
      console.error('Failed to update local setup cache', e);
    }
  };

  return {
    isActive,
    currentStepIndex,
    steps: tourState.steps,
    currentStep: () => tourState.steps[currentStepIndex.value],
    startTour,
    nextStep,
    prevStep,
    endTour,
    completeStep
  };
}
