<template>
  <DashboardLayout>
    <div class="calendar-page">
      <!-- Header -->
      <div class="page-header">
        <h1 class="page-title">Kalender Studio</h1>
        <p class="page-subtitle">Jadwal pemotretan langsung dari Daftar Booking.</p>
      </div>

      <!-- Warning Alert -->
      <div class="alert alert-warning" v-if="showWarning">
        <div class="alert-content">
          <TriangleAlert :size="18" class="text-yellow" />
          <p>Google Calendar belum terhubung. <a href="#" class="alert-link">Hubungkan di Pengaturan</a> untuk sinkronisasi jadwal otomatis.</p>
        </div>
        <button class="close-btn" @click="showWarning = false">
          <X :size="16" />
        </button>
      </div>

      <!-- Calendar Container -->
      <div class="calendar-card">
        <!-- Toolbar -->
        <div class="calendar-toolbar">
          <div class="toolbar-left">
            <button class="btn-outline btn-today" @click="goToToday">
              <CalendarDays :size="16" />
              Hari Ini
            </button>
            <div class="nav-group">
              <button class="icon-btn" @click="prevMonth"><ChevronLeft :size="16" /></button>
              <button class="icon-btn" @click="nextMonth"><ChevronRight :size="16" /></button>
            </div>
          </div>
          
          <div class="toolbar-center">
            <h2 class="current-month">{{ currentMonthName }}</h2>
          </div>
          
          <div class="toolbar-right">
            <div class="view-switcher">
              <button class="view-btn active">
                <CalendarDays :size="16" />
                Bulan
              </button>
              <button class="view-btn">
                <CalendarRange :size="16" />
                Minggu
              </button>
              <button class="view-btn">
                <Clock :size="16" />
                Hari
              </button>
              <button class="view-btn">
                <List :size="16" />
                Agenda
              </button>
            </div>
          </div>
        </div>

        <!-- Grid -->
        <div class="calendar-grid">
          <div class="grid-header">
            <div class="day-name">Sen</div>
            <div class="day-name">Sel</div>
            <div class="day-name">Rab</div>
            <div class="day-name">Kam</div>
            <div class="day-name">Jum</div>
            <div class="day-name">Sab</div>
            <div class="day-name">Min</div>
          </div>
          
          <div class="grid-body">
            <div class="grid-row" v-for="(week, index) in calendarDays" :key="index">
              <div 
                class="day-cell" 
                v-for="(day, dayIndex) in week" 
                :key="dayIndex"
                :class="{ 'empty': day.empty, 'active-today': day.isToday }"
              >
                <span class="date-num">{{ String(day.date).padStart(2, '0') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Legend -->
      <div class="calendar-legend">
        <div class="legend-item"><span class="dot bg-blue"></span> Pending</div>
        <div class="legend-item"><span class="dot bg-purple"></span> Booking Confirmed</div>
        <div class="legend-item"><span class="dot bg-yellow"></span> Sesi Foto / Acara</div>
        <div class="legend-item"><span class="dot bg-orange"></span> Antrian Edit</div>
        <div class="legend-item"><span class="dot bg-pink"></span> Proses Edit</div>
        <div class="legend-item"><span class="dot bg-teal"></span> Revisi</div>
        <div class="legend-item"><span class="dot bg-green"></span> File Siap</div>
        <div class="legend-item"><span class="dot bg-cyan"></span> Selesai</div>
        <div class="legend-item"><span class="dot bg-red"></span> Batal</div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import DashboardLayout from '../layouts/DashboardLayout.vue';
import { 
  TriangleAlert, X, CalendarDays, ChevronLeft, ChevronRight,
  CalendarRange, Clock, List
} from 'lucide-vue-next';

const showWarning = ref(true);
const currentDate = ref(new Date());

const monthNames = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const currentMonthName = computed(() => {
  return `${monthNames[currentDate.value.getMonth()]} ${currentDate.value.getFullYear()}`;
});

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1; // 0 = Monday, 6 = Sunday
  
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  
  const days = [];
  
  // Previous month padding
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.unshift({
      date: daysInPrevMonth - i,
      empty: true,
      isToday: false
    });
  }
  
  const today = new Date();
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = 
      i === today.getDate() && 
      month === today.getMonth() && 
      year === today.getFullYear();
      
    days.push({
      date: i,
      empty: false,
      isToday: isToday
    });
  }
  
  // Next month padding
  const remainingCells = 42 - days.length; // 6 rows * 7 days
  for (let i = 1; i <= remainingCells; i++) {
    days.push({
      date: i,
      empty: true,
      isToday: false
    });
  }
  
  // Split into weeks
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  
  return weeks;
});

const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
};

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
};

const goToToday = () => {
  currentDate.value = new Date();
};
</script>

<style scoped>
.calendar-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-height: calc(100vh - 100px);
}

/* Header */
.page-header {
  margin-bottom: 0.5rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  color: #fff;
}

.page-subtitle {
  font-size: 0.85rem;
  color: #a0a0a0;
  margin: 0;
}

/* Alert */
.alert {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  background-color: rgba(234, 179, 8, 0.05);
  border: 1px solid rgba(234, 179, 8, 0.3);
}

.alert-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.alert-content p {
  margin: 0;
  font-size: 0.85rem;
  color: #eab308;
}

.alert-link {
  color: #eab308;
  font-weight: 600;
  text-decoration: underline;
}

.text-yellow {
  color: #eab308;
}

.close-btn {
  background: transparent;
  border: none;
  color: #eab308;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
}

.close-btn:hover {
  opacity: 1;
}

/* Calendar Card */
.calendar-card {
  background-color: #0a0a0a;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  flex: 1; /* Take up remaining height */
  overflow: hidden;
}

/* Toolbar */
.calendar-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  flex-wrap: wrap;
  gap: 1rem;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.btn-outline {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-outline:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.nav-group {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.icon-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  cursor: pointer;
}

.icon-btn:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.current-month {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.view-switcher {
  display: flex;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  overflow: hidden;
}

.view-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background-color: transparent;
  border: none;
  color: #888;
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}

.view-btn:not(:last-child) {
  border-right: 1px solid rgba(255, 255, 255, 0.15);
}

.view-btn.active {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.view-btn:hover:not(.active) {
  background-color: rgba(255, 255, 255, 0.05);
  color: #ffffff;
}

/* Calendar Grid */
.calendar-grid {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.grid-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.day-name {
  text-align: center;
  padding: 1rem 0;
  font-size: 0.8rem;
  font-weight: 600;
  color: #fff;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

.day-name:last-child {
  border-right: none;
}

.grid-body {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.grid-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  flex: 1;
  min-height: 100px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.grid-row:last-child {
  border-bottom: none;
}

.day-cell {
  padding: 0.5rem;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  display: flex;
  justify-content: flex-end;
}

.day-cell:last-child {
  border-right: none;
}

.day-cell.empty {
  color: #555;
  background-color: rgba(255, 255, 255, 0.01);
}

.day-cell.empty .date-num {
  color: #555;
}

.date-num {
  font-size: 0.85rem;
  color: #fff;
  font-weight: 500;
}

.active-today {
  background-color: rgba(255, 255, 255, 0.03);
}

.active-today .date-num {
  font-weight: 700;
}

/* Light Theme */
:root[data-theme="light"] .page-title,
:root[data-theme="light"] .current-month,
:root[data-theme="light"] .day-name,
:root[data-theme="light"] .date-num {
  color: #111827;
}

:root[data-theme="light"] .calendar-card {
  background-color: #ffffff;
  border-color: #e5e7eb;
}

:root[data-theme="light"] .calendar-toolbar,
:root[data-theme="light"] .grid-header,
:root[data-theme="light"] .grid-row,
:root[data-theme="light"] .day-name,
:root[data-theme="light"] .day-cell {
  border-color: #e5e7eb;
}

:root[data-theme="light"] .btn-outline,
:root[data-theme="light"] .icon-btn,
:root[data-theme="light"] .view-switcher,
:root[data-theme="light"] .view-btn:not(:last-child) {
  border-color: #d1d5db;
  color: #111827;
}

:root[data-theme="light"] .view-btn {
  color: #6b7280;
}

:root[data-theme="light"] .btn-outline:hover,
:root[data-theme="light"] .icon-btn:hover,
:root[data-theme="light"] .view-btn:hover:not(.active) {
  background-color: #f3f4f6;
}

:root[data-theme="light"] .view-btn.active {
  background-color: #e5e7eb;
  color: #111827;
}

:root[data-theme="light"] .day-cell.empty {
  background-color: #f9fafb;
}

:root[data-theme="light"] .day-cell.empty .date-num {
  color: #9ca3af;
}

:root[data-theme="light"] .active-today {
  background-color: #f3f4f6;
}

:root[data-theme="light"] .alert {
  background-color: #fefce8;
  border-color: #fef08a;
}

:root[data-theme="light"] .alert-content p,
:root[data-theme="light"] .alert-link,
:root[data-theme="light"] .text-yellow,
:root[data-theme="light"] .close-btn {
  color: #ca8a04;
}

/* Legend */
.calendar-legend {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.25rem;
  padding: 0.5rem 0 0 0;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  color: #a0a0a0;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.bg-blue { background-color: #3b82f6; }
.bg-purple { background-color: #8b5cf6; }
.bg-yellow { background-color: #eab308; }
.bg-orange { background-color: #f97316; }
.bg-pink { background-color: #ec4899; }
.bg-teal { background-color: #14b8a6; }
.bg-green { background-color: #10b981; }
.bg-cyan { background-color: #06b6d4; }
.bg-red { background-color: #ef4444; }

:root[data-theme="light"] .legend-item {
  color: #4b5563;
}
</style>
