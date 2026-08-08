import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const isActive = ref(false);
const currentStepIndex = ref(0);

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
