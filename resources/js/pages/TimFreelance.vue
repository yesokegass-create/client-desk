<template>
  <DashboardLayout>
    <div class="team-page">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">Tim / Freelance</h1>
          <p class="page-subtitle">Kelola fotografer, videografer, dan anggota tim lainnya.</p>
        </div>
        
        <div class="header-actions">
          <button class="btn-outline" @click="toggleReorderMode" :disabled="isSavingOrder">
            <ArrowUpDown :size="16" />
            {{ isReorderingMode ? 'Selesai Atur Urutan' : 'Atur Urutan' }}
          </button>
          <button class="btn-outline" @click="showColorModal = true">
            <Palette :size="16" />
            Warna Role & Tag
          </button>
          <button class="btn-outline">
            <SlidersHorizontal :size="16" />
            Kelola kolom
          </button>
          <button class="btn-primary" @click="openAddModal" id="tour-target-add-team">
            <Plus :size="16" />
            Tambah Anggota
          </button>
        </div>
      </div>

      <!-- Empty State Card -->
      <div class="empty-state-card" v-if="!isLoading && teamMembers.length === 0">
        <div class="empty-state-content">
          <div class="icon-container">
            <Users :size="48" class="text-gray" stroke-width="1.5" />
          </div>
          <h2 class="empty-title">Belum ada anggota tim</h2>
          <p class="empty-subtitle">Klik "Tambah Anggota" untuk menambahkan fotografer, videografer, atau freelance.</p>
        </div>
      </div>

      <!-- Data Table -->
      <div class="table-card" v-if="teamMembers.length > 0">
        
        <div v-if="isReorderingMode" class="alert-info" style="background-color: #1d1e26; border: 1px solid rgba(255, 255, 255, 0.1); color: #a0a0a0; padding: 16px; border-radius: 8px; margin-bottom: 24px; font-size: 14px; display: flex; align-items: flex-start; gap: 12px; line-height: 1.5;">
          Mode atur urutan aktif. Seret anggota tim / freelance untuk mengubah posisi. Pencarian, filter, pagination, dan mode kelola disembunyikan sementara agar urutan tetap aman.
        </div>

        <div v-if="isReorderingMode" class="reorder-container">
          <draggable 
            v-model="teamMembers" 
            item-key="id" 
            handle=".drag-handle" 
            ghost-class="ghost-item"
            animation="200"
          >
            <template #item="{ element, index }">
              <div class="draggable-item">
                <div class="drag-handle">
                  <GripVertical :size="16" />
                </div>
                <div class="draggable-content">
                  <span class="d-name">{{ element.nama }}</span>
                  <span class="role-pill" :style="getRoleStyle(element.peran)">{{ element.peran }}</span>
                  <span class="d-status text-green" v-if="element.status === 'Aktif'">Aktif</span>
                  <span class="d-status text-gray" v-else>{{ element.status }}</span>
                </div>
                <div class="draggable-actions">
                  <button @click="moveItemUp(index)" :disabled="index === 0"><ArrowUp :size="16" /></button>
                  <button @click="moveItemDown(index)" :disabled="index === teamMembers.length - 1"><ArrowDown :size="16" /></button>
                </div>
              </div>
            </template>
          </draggable>
        </div>

        <template v-else>
        <!-- Controls -->
        <div class="table-controls">
          <div class="search-box">
            <Search :size="16" class="search-icon" />
            <input type="text" placeholder="Cari nama atau peran..." v-model="searchQuery" />
          </div>
          <div class="filters">
            <select class="filter-select" v-model="filterStatus">
              <option value="">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Nonaktif">Nonaktif</option>
            </select>
            <select class="filter-select" v-model="filterPeran">
              <option value="">Semua Peran</option>
              <option value="Photographer">Photographer</option>
              <option value="Videographer">Videographer</option>
              <option value="Hybrid Shooter">Hybrid Shooter</option>
              <option value="WCC">WCC</option>
              <option value="Editor">Editor</option>
              <option value="Asisten">Asisten</option>
              <option value="Lainnya">Lainnya</option>
            </select>
            <select class="filter-select" v-model="filterTag">
              <option value="">Semua Tag</option>
              <!-- Optionally populate unique tags here later -->
            </select>
            <button class="btn-outline btn-filter"><SlidersHorizontal :size="16" /> Kelola</button>
          </div>
        </div>

        <!-- Desktop Table -->
        <div class="table-responsive desktop-only">
          <table class="data-table">
              <thead>
                <tr>
                  <th v-for="col in visibleColumns" :key="col.id" :class="{'text-right': col.id === 'aksi'}">
                    {{ col.label.toUpperCase() }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(member, index) in filteredTeamMembers" :key="member.id">
                  <td v-for="col in visibleColumns" :key="col.id">
                    <template v-if="col.id === 'no'">{{ index + 1 }}</template>
                    <template v-else-if="col.id === 'nama'">
                      <div class="user-cell">
                        <div class="avatar">{{ member.nama.charAt(0).toUpperCase() }}</div>
                        <span>{{ member.nama }}</span>
                      </div>
                    </template>
                    <template v-else-if="col.id === 'peran'">
                      <span class="role-pill" :style="getRoleStyle(member.peran)">{{ member.peran }}</span>
                    </template>
                    <template v-else-if="col.id === 'tags'">
                      <div class="tags-row">
                        <span class="tag-pill-sm" v-for="(tag, i) in (member.tags || []).slice(0, 2)" :key="i" :style="getTagStyle(tag)">{{ tag }}</span>
                        <span class="tag-pill-sm" v-if="member.tags && member.tags.length > 2">+{{ member.tags.length - 2 }}</span>
                      </div>
                    </template>
                    <template v-else-if="col.id === 'pricelist'">
                      {{ member.pricelist ? member.pricelist.length : 0 }} item
                    </template>
                    <template v-else-if="col.id === 'whatsapp'">
                      {{ member.phone_country_code === 'ID' ? '+62' : '' }}{{ member.phone_number }}
                    </template>
                    <template v-else-if="col.id === 'status'">
                      <button class="status-badge" :class="member.status === 'Aktif' ? 'status-aktif' : 'status-nonaktif'" @click="toggleStatus(member)">
                        {{ member.status }}
                      </button>
                    </template>
                    <template v-else-if="col.id === 'aksi'">
                      <div class="action-buttons">
                        <button class="btn-action btn-wa" title="WhatsApp" @click="openWhatsApp(member)"><MessageCircle :size="16" /></button>
                        <button class="btn-action btn-edit" title="Edit" @click="editTeamMember(member)"><Edit2 :size="16" /></button>
                        <button class="btn-action btn-delete" title="Hapus" @click="deleteTeamMember(member.id)"><Trash2 :size="16" /></button>
                      </div>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
        </div>

        <!-- Mobile Cards -->
        <div class="mobile-cards-list mobile-only">
          <div class="member-mobile-card" v-for="(member, index) in filteredTeamMembers" :key="member.id">
            <div class="mm-header">
              <div class="mm-user">
                <div class="avatar">{{ member.nama.charAt(0).toUpperCase() }}</div>
                <div class="mm-name-role">
                  <h4>{{ member.nama }}</h4>
                  <span>{{ member.peran }}</span>
                </div>
              </div>
              <button class="mm-status" :class="member.status === 'Aktif' ? 'text-green' : 'text-gray'" @click="toggleStatus(member)">
                {{ member.status }}
              </button>
            </div>
            
            <div class="mm-details">
              <div class="mm-row">
                <span class="mm-label">Peran / Role</span>
                <span class="role-pill" :style="getRoleStyle(member.peran)">{{ member.peran }}</span>
              </div>
              <div class="mm-row">
                <span class="mm-label">Tags</span>
                <div class="tags-row">
                  <span class="tag-pill-sm" v-for="(tag, i) in (member.tags || []).slice(0, 2)" :key="i">{{ tag }}</span>
                  <span class="tag-pill-sm" v-if="member.tags && member.tags.length > 2">+{{ member.tags.length - 2 }}</span>
                </div>
              </div>
              <div class="mm-row">
                <span class="mm-label">Pricelist</span>
                <span>{{ member.pricelist ? member.pricelist.length : 0 }} item</span>
              </div>
              <div class="mm-row">
                <span class="mm-label">Nomor WhatsApp</span>
                <span>{{ member.phone_country_code === 'ID' ? '+62' : '' }}{{ member.phone_number }}</span>
              </div>
              <div class="mm-row">
                <span class="mm-label">Status</span>
                <span>{{ member.status }}</span>
              </div>
            </div>
            
            <div class="mm-actions">
              <button class="btn-action btn-wa" title="WhatsApp" @click="openWhatsApp(member)"><MessageCircle :size="16" /></button>
              <button class="btn-action btn-edit" title="Edit" @click="editTeamMember(member)"><Edit2 :size="16" /></button>
              <button class="btn-action btn-delete" title="Hapus" @click="deleteTeamMember(member.id)"><Trash2 :size="16" /></button>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="table-pagination">
          <div class="per-page">
            <span>Tampilkan</span>
            <select class="per-page-select">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <span>per halaman</span>
          </div>
          <div class="pagination-controls">
            <span>1-{{ filteredTeamMembers.length }} dari {{ filteredTeamMembers.length }}</span>
            <button class="page-btn"><ChevronLeft :size="16" /></button>
            <span class="page-num">1/1</span>
            <button class="page-btn"><ChevronRight :size="16" /></button>
          </div>
        </div>
        </template>
      </div>


      
      <!-- Column Configuration Modal -->
      <transition name="modal-fade">
        <div v-if="showColumnModal" class="modal-backdrop" @click="showColumnModal = false">
          <div class="modal-content color-modal" @click.stop style="max-width: 600px;">
            <div class="modal-header">
              <div>
                <h2 class="modal-title">Kelola Kolom Tim / Freelance</h2>
                <p class="modal-subtitle">Atur kolom yang tampil di tabel tim atau freelance. Kolom Nama dan Aksi selalu tampil, serta lock-nya tidak bisa dimatikan.</p>
              </div>
              <button class="close-btn" @click="showColumnModal = false"><X :size="20" /></button>
            </div>
            
            <div class="modal-body" style="max-height: 500px; overflow-y: auto; padding-right: 8px;">
              <draggable v-model="tempColumns" item-key="id" handle=".drag-handle" ghost-class="ghost">
                <template #item="{ element }">
                  <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.1); padding: 16px; border-radius: 12px; margin-bottom: 12px;">
                    <div style="display: flex; align-items: center; gap: 16px;">
                      <button class="drag-handle" style="background: rgba(255,255,255,0.05); border: none; padding: 8px; border-radius: 6px; cursor: grab; color: #a0a0a0; display: flex; align-items: center; justify-content: center;">
                        <GripVertical :size="16" />
                      </button>
                      <div style="display: flex; flex-direction: column;">
                        <span style="color: #fff; font-weight: 500; font-size: 14px;">{{ element.label }}</span>
                        <span style="color: #888; font-size: 12px; margin-top: 2px;">{{ element.description }}</span>
                      </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 16px;">
                      <Lock v-if="element.locked" :size="18" style="color: #a0a0a0;" />
                      <Unlock v-else :size="18" style="color: #a0a0a0;" />
                      
                      <button @click="toggleColumnVisibility(element)" :disabled="element.locked" style="background: none; border: none; cursor: pointer; color: #a0a0a0;" :style="{ opacity: element.locked ? 0.5 : 1 }">
                        <Eye v-if="element.visible" :size="18" />
                        <EyeOff v-else :size="18" />
                      </button>
                    </div>
                  </div>
                </template>
              </draggable>
            </div>

            <div class="modal-footer" style="margin-top: 20px; display: flex; justify-content: space-between;">
              <button class="btn-secondary" @click="resetColumns" style="display: flex; align-items: center; gap: 8px;">
                <RotateCcw :size="16" /> Reset Lebar
              </button>
              <div style="display: flex; gap: 12px;">
                <button class="btn-secondary" @click="showColumnModal = false">Tutup</button>
                <button class="btn-primary" @click="saveColumns">Simpan</button>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- Color Configuration Modal -->
      <transition name="modal-fade">
        <div v-if="showColorModal" class="modal-backdrop" @click="showColorModal = false">
          <div class="modal-content color-modal" @click.stop style="max-width: 600px;">
            <div class="modal-header">
              <div>
                <h2 class="modal-title">Warna Role & Tag</h2>
                <p class="modal-subtitle">Atur warna global berdasarkan label role dan tag. Warna akan otomatis dipakai di seluruh anggota yang memiliki label sama.</p>
              </div>
              <button class="close-btn" @click="showColorModal = false"><X :size="20" /></button>
            </div>
            
            <div class="modal-body" style="max-height: 500px; overflow-y: auto;">
              <h3 style="color: #fff; font-size: 14px; margin-bottom: 12px; font-weight: 600;">Role</h3>
              <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
                <div v-for="role in availableRoles" :key="role" style="display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.1); padding: 12px; border-radius: 8px;">
                  <span class="role-pill" :style="getRoleStyle(role)">{{ role }}</span>
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <input type="color" v-model="roleTagColors.roles[role]" style="width: 32px; height: 32px; padding: 0; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; background: transparent; cursor: pointer;">
                    <input type="text" v-model="roleTagColors.roles[role]" placeholder="#000000" style="width: 90px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 6px 8px; border-radius: 6px; font-size: 13px;">
                    <button @click="roleTagColors.roles[role] = null" style="background: none; border: none; color: #a0a0a0; font-size: 13px; cursor: pointer;">Reset</button>
                  </div>
                </div>
              </div>

              <h3 style="color: #fff; font-size: 14px; margin-bottom: 12px; font-weight: 600;">Tag</h3>
              <div v-if="availableTags.length === 0" style="color: #a0a0a0; font-size: 13px; padding: 16px; background: rgba(255,255,255,0.02); border: 1px dashed rgba(255,255,255,0.1); border-radius: 8px; text-align: center;">
                Belum ada tag untuk diatur warnanya.
              </div>
              <div v-else style="display: flex; flex-direction: column; gap: 12px;">
                <div v-for="tag in availableTags" :key="tag" style="display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.1); padding: 12px; border-radius: 8px;">
                  <span class="tag-pill" :style="getTagStyle(tag)">{{ tag }}</span>
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <input type="color" v-model="roleTagColors.tags[tag]" style="width: 32px; height: 32px; padding: 0; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; background: transparent; cursor: pointer;">
                    <input type="text" v-model="roleTagColors.tags[tag]" placeholder="#000000" style="width: 90px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 6px 8px; border-radius: 6px; font-size: 13px;">
                    <button @click="roleTagColors.tags[tag] = null" style="background: none; border: none; color: #a0a0a0; font-size: 13px; cursor: pointer;">Reset</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal-footer" style="margin-top: 20px;">
              <button class="btn-secondary" @click="showColorModal = false">Batal</button>
              <button class="btn-primary" @click="saveColors" :disabled="isSavingColors">
                {{ isSavingColors ? 'Menyimpan...' : 'Simpan Warna' }}
              </button>
            </div>
          </div>
        </div>
      </transition>

      <!-- Add Member Modal -->
      <transition name="modal-fade">
        <div v-if="showAddModal" class="modal-backdrop" @click="closeAddModal">
          <div class="modal-content" @click.stop>
            <div class="modal-header">
              <div>
                <h2 class="modal-title">{{ isEditing ? 'Edit Anggota Tim' : 'Tambah Anggota Tim' }}</h2>
                <p class="modal-subtitle">{{ isEditing ? 'Ubah data anggota tim atau freelance.' : 'Masukkan data anggota tim atau freelance baru.' }}</p>
              </div>
              <button class="close-btn" @click="closeAddModal"><X :size="20" /></button>
            </div>
            
            <div class="modal-body">
              <div class="form-group">
                <label>Nama <span class="text-danger">*</span></label>
                <input type="text" class="form-control" :class="{ 'has-error': formErrors.nama }" v-model="form.nama" placeholder="Misal: Budi Santoso" />
                <span v-if="formErrors.nama" class="error-msg">Nama wajib diisi</span>
              </div>
              
              <div class="form-group mt-4">
                <label>Peran / Role</label>
                <div class="select-wrapper">
                  <select class="form-control select-control" v-model="form.peran">
                    <option value="Photographer">Photographer</option>
                    <option value="Videographer">Videographer</option>
                    <option value="Hybrid Shooter">Hybrid Shooter</option>
                    <option value="WCC">WCC</option>
                    <option value="Editor">Editor</option>
                    <option value="Asisten">Asisten</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                  <ChevronDown :size="16" class="select-icon" />
                </div>
              </div>

              <div class="form-group mt-4">
                <label>Nomor WhatsApp</label>
                <div class="input-group" :class="{ 'has-error': formErrors.phone_number }">
                  <span class="input-addon">ID +62</span>
                  <input type="tel" maxlength="13" class="form-control border-0" :value="form.phone_number" @input="handlePhoneInput" placeholder="812 3456 7890" />
                </div>
              </div>

              <div class="form-group mt-4">
                <label>Google Email</label>
                <input type="email" autocomplete="email" class="form-control" v-model="form.email" placeholder="email@gmail.com (untuk kalender)" />
              </div>

              <div class="form-group mt-4">
                <label>Tags</label>
                <input type="text" class="form-control" v-model="tagInput" @keydown="addTag" placeholder="Ketik tag lalu Enter..." />
                <p class="help-text">Pisahkan tag dengan koma atau tekan Enter.</p>
                
                <div class="tags-container mt-2" v-if="form.tags.length > 0">
                  <span class="tag-pill" v-for="(tag, index) in form.tags" :key="index">
                    {{ tag }}
                    <button class="tag-remove" @click="removeTag(index)"><X :size="12" /></button>
                  </span>
                </div>
              </div>

              <div class="form-group pricelist-group">
                <div class="pricelist-header">
                  <label>Pricelist</label>
                  <span class="help-text-inline">Tambah item dan isi harga. Harga otomatis format Rupiah (contoh: 700.000).</span>
                  <button class="btn-sm btn-outline btn-add-item" @click="addPricelistItem">+ Item</button>
                </div>
                
                <div v-if="form.pricelist.length === 0" class="pricelist-empty">
                  Belum ada item. Tambah item untuk mengisi harga.
                </div>
                
                <div v-else class="pricelist-items">
                  <div v-for="(item, index) in form.pricelist" :key="index" class="pricelist-item-box">
                    <label>Item Pricelist</label>
                    <div class="input-with-action">
                      <input type="text" class="form-control" v-model="item.nama" placeholder="Item 1" />
                      <button class="btn-icon btn-trash" @click="removePricelistItem(index)"><Trash2 :size="16" /></button>
                    </div>
                    
                    <label class="mt-3">Harga</label>
                    <div class="input-prefix">
                      <span class="prefix">Rp</span>
                      <input type="tel" maxlength="13" class="form-control" :value="formatRupiah(item.harga)" @input="e => updateHarga(index, e)" placeholder="0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal-footer" style="padding: 1.25rem 1.5rem; display: flex; justify-content: flex-end; align-items: center; gap: 12px; border-top: 1px solid rgba(255, 255, 255, 0.05);">
              <button type="button" class="btn-outline" @click="closeAddModal" :disabled="isSaving">Batal</button>
              <button type="button" class="btn-primary" @click="saveTeamMember" :disabled="isSaving">
                <span v-if="isSaving">Menyimpan...</span>
                <span v-else>Simpan</span>
              </button>
            </div>
          </div>
        </div>
      </transition>

    </div>
  </DashboardLayout>
</template>

<script setup>
import axios from 'axios';
import draggable from 'vuedraggable';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useTour } from '../composables/useTour';
import DashboardLayout from '../layouts/DashboardLayout.vue';
import { 
  ArrowUpDown, Plus, Palette, Users, X, ChevronDown, Search, Trash2, Check, SlidersHorizontal, MessageCircle, Edit2, ChevronLeft, ChevronRight, GripVertical, ArrowUp, ArrowDown
, Lock, Unlock, Eye, EyeOff, RotateCcw} from 'lucide-vue-next';

const { isActive, currentStep, completeStep, endTour } = useTour();
const router = useRouter();

const teamMembers = ref([]);
const isLoading = ref(true);
const isSaving = ref(false);
const isReorderingMode = ref(false);
const isSavingOrder = ref(false);

const showColorModal = ref(false);
const isSavingColors = ref(false);
const roleTagColors = ref({ roles: {}, tags: {} });

const defaultColumns = [
  { id: 'no', label: 'No.', visible: true, locked: false, description: 'Tampil, tapi terkunci saat digeser.' },
  { id: 'nama', label: 'Nama', visible: true, locked: true, description: 'Kolom ini selalu terkunci.' },
  { id: 'whatsapp', label: 'Nomor WhatsApp', visible: true, locked: false, description: 'Tampil, tapi terkunci saat digeser.' },
  { id: 'peran', label: 'Peran / Role', visible: true, locked: false, description: 'Tampil di tabel.' },
  { id: 'tags', label: 'Tags', visible: true, locked: false, description: 'Tampil di tabel.' },
  { id: 'pricelist', label: 'Pricelist', visible: true, locked: false, description: 'Tampil di tabel.' },
  { id: 'status', label: 'Status', visible: true, locked: false, description: 'Tampil di tabel.' },
  { id: 'aksi', label: 'Aksi', visible: true, locked: true, description: 'Kolom ini selalu terkunci.' }
];

const columns = ref([...defaultColumns]);
const tempColumns = ref([]);
const showColumnModal = ref(false);

const visibleColumns = computed(() => {
  return columns.value.filter(c => c.visible);
});

const openColumnModal = () => {
  tempColumns.value = JSON.parse(JSON.stringify(columns.value));
  showColumnModal.value = true;
};

const toggleColumnVisibility = (col) => {
  if (!col.locked) {
    col.visible = !col.visible;
  }
};

const resetColumns = () => {
  tempColumns.value = JSON.parse(JSON.stringify(defaultColumns));
};

const saveColumns = () => {
  columns.value = JSON.parse(JSON.stringify(tempColumns.value));
  localStorage.setItem('timFreelanceColumns', JSON.stringify(columns.value));
  showColumnModal.value = false;
};


const availableRoles = [
  'Photographer', 'Videographer', 'Hybrid Shooter', 'WCC', 'Editor', 'Asisten', 'Lainnya'
];

const availableTags = computed(() => {
  const tags = new Set();
  teamMembers.value.forEach(member => {
    if (member.tags && Array.isArray(member.tags)) {
      member.tags.forEach(tag => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
});

const hexToRgb = (hex) => {
  if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) return null;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
};

const getRoleStyle = (role) => {
  const hex = roleTagColors.value.roles[role];
  if (!hex) return {};
  const rgb = hexToRgb(hex);
  return {
    color: hex,
    borderColor: hex,
    backgroundColor: rgb ? `rgba(${rgb}, 0.1)` : 'transparent'
  };
};

const getTagStyle = (tag) => {
  const hex = roleTagColors.value.tags[tag];
  if (!hex) return {};
  const rgb = hexToRgb(hex);
  return {
    color: hex,
    borderColor: hex,
    backgroundColor: rgb ? `rgba(${rgb}, 0.1)` : 'transparent'
  };
};

const fetchSettings = async () => {
  try {
    const token = localStorage.getItem('auth_token');
    const response = await axios.get('/api/settings', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.data && response.data.role_tag_colors) {
      roleTagColors.value = {
        roles: response.data.role_tag_colors.roles || {},
        tags: response.data.role_tag_colors.tags || {}
      };
    }
  } catch (error) {
    console.error('Failed to fetch settings', error);
  }
};

const saveColors = async () => {
  isSavingColors.value = true;
  try {
    const token = localStorage.getItem('auth_token');
    await axios.post('/api/settings', {
      role_tag_colors: roleTagColors.value
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    showColorModal.value = false;
  } catch (error) {
    console.error('Failed to save colors', error);
    alert('Gagal menyimpan warna');
  } finally {
    isSavingColors.value = false;
  }
};


const searchQuery = ref('');
const filterStatus = ref('');
const filterPeran = ref('');
const filterTag = ref('');

const showAddModal = ref(false);
const formErrors = ref({
  nama: false,
  phone_number: false
});
const isEditing = ref(false);
const editingId = ref(null);

const form = ref({
  nama: '',
  peran: 'Photographer',
  phone_country_code: 'ID',
  phone_number: '',
  email: '',
  tags: [],
  pricelist: []
});

const showCountryDropdown = ref(false);

const handlePhoneInput = (e) => {
  let val = e.target.value;
  val = val.replace(/\D/g, '');
  if (val.startsWith('0')) {
    val = val.substring(1);
  } else if (val.startsWith('62')) {
    val = val.substring(2);
  }
  form.value.phone_number = val;
  e.target.value = val;
};
const countrySearchQuery = ref('');
const countries = ref([]);
const selectedCountry = ref({ code: 'ID', name: 'Indonesia', dial_code: '+62' });

onMounted(async () => {
  const savedCols = localStorage.getItem('timFreelanceColumns');
  if (savedCols) {
    try {
      columns.value = JSON.parse(savedCols);
      const savedIds = columns.value.map(c => c.id);
      defaultColumns.forEach(defCol => {
        if (!savedIds.includes(defCol.id)) {
          columns.value.push(defCol);
        }
      });
    } catch (e) {}
  }
  await fetchSettings();
  fetchTeamMembers();

  try {
    const response = await fetch('https://countriesnow.space/api/v0.1/countries/codes');
    const result = await response.json();
    if (!result.error) {
      countries.value = result.data;
      const idCode = result.data.find(c => c.code === 'ID');
      if (idCode) selectedCountry.value = idCode;
    }
  } catch (error) {
    console.error('Failed to fetch country codes:', error);
    countries.value = [
      { code: 'ID', name: 'Indonesia', dial_code: '+62' },
      { code: 'US', name: 'United States', dial_code: '+1' }
    ];
  }
});

const filteredCountries = computed(() => {
  const query = countrySearchQuery.value.toLowerCase();
  return countries.value.filter(c => 
    c.name.toLowerCase().includes(query) || 
    c.dial_code.includes(query) || 
    c.code.toLowerCase().includes(query)
  );
});

const selectCountry = (country) => {
  selectedCountry.value = country;
  form.value.phone_country_code = country.code;
  showCountryDropdown.value = false;
  countrySearchQuery.value = '';
};

const toggleCountryDropdown = () => {
  showCountryDropdown.value = !showCountryDropdown.value;
};

const openAddModal = () => {
  isEditing.value = false;
  formErrors.value = { nama: false, phone_number: false };
  editingId.value = null;
  form.value = {
    nama: '', peran: 'Photographer', phone_country_code: 'ID', phone_number: '', email: '', tags: [], pricelist: []
  };
  showAddModal.value = true;
};

const closeAddModal = () => {
  showAddModal.value = false;
};

const editTeamMember = (member) => {
  isEditing.value = true;
  formErrors.value = { nama: false, phone_number: false };
  editingId.value = member.id;
  // Create a deep copy for the form
  form.value = JSON.parse(JSON.stringify(member));
  showAddModal.value = true;
};

const openWhatsApp = (member) => {
  let phone = member.phone_number;
  if (phone.startsWith('0')) {
    phone = phone.substring(1);
  }
  let dialCode = '62'; // fallback
  if (member.phone_country_code === 'ID') dialCode = '62';
  
  const formattedPhone = `${dialCode}${phone}`;
  window.open(`https://wa.me/${formattedPhone}`, '_blank');
};

const toggleStatus = async (member) => {
  const newStatus = member.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
  const originalStatus = member.status;
  
  // Optimistic UI update
  member.status = newStatus;
  
  try {
    const token = localStorage.getItem('auth_token');
    await axios.put(`/api/team-members/${member.id}`, { ...member, status: newStatus }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    console.error('Failed to update status', error);
    // Revert on failure
    member.status = originalStatus;
  }
};

const sanitizeMember = (member) => {
  if (member.phone_country_code === 'ID' && member.phone_number) {
     if (member.phone_number.startsWith('+62')) member.phone_number = member.phone_number.substring(3);
     else if (member.phone_number.startsWith('62')) member.phone_number = member.phone_number.substring(2);
  }
  return member;
};

const toggleReorderMode = async () => {
  if (isReorderingMode.value) {
    // Save order
    isSavingOrder.value = true;
    try {
      const token = localStorage.getItem('auth_token');
      const orders = teamMembers.value.map(m => m.id);
      await axios.post('/api/team-members/reorder', { orders }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      isReorderingMode.value = false;
    } catch (error) {
      console.error('Failed to save order', error);
      alert('Gagal menyimpan urutan');
    } finally {
      isSavingOrder.value = false;
    }
  } else {
    // Enable reorder mode, optionally reset filters so all items show
    searchQuery.value = '';
    filterStatus.value = '';
    filterPeran.value = '';
    filterTag.value = '';
    isReorderingMode.value = true;
  }
};

const moveItemUp = (index) => {
  if (index > 0) {
    const item = teamMembers.value.splice(index, 1)[0];
    teamMembers.value.splice(index - 1, 0, item);
  }
};

const moveItemDown = (index) => {
  if (index < teamMembers.value.length - 1) {
    const item = teamMembers.value.splice(index, 1)[0];
    teamMembers.value.splice(index + 1, 0, item);
  }
};

const fetchTeamMembers = async () => {
  try {
    const token = localStorage.getItem('auth_token');
    const response = await axios.get('/api/team-members', {
      headers: { Authorization: `Bearer ${token}` }
    });
    teamMembers.value = response.data.map(sanitizeMember);
    if (teamMembers.value.length > 0) {
      completeStep('add-team');
    }
  } catch (error) {
    console.error('Failed to fetch team members', error);
  } finally {
    isLoading.value = false;
  }
};

const filteredTeamMembers = computed(() => {
  return teamMembers.value.filter(member => {
    const matchName = member.nama.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchRole = member.peran.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchSearch = matchName || matchRole;
    
    const matchStatus = filterStatus.value ? member.status === filterStatus.value : true;
    const matchPeran = filterPeran.value ? member.peran === filterPeran.value : true;
    const matchTag = filterTag.value ? (member.tags && member.tags.includes(filterTag.value)) : true;
    
    return matchSearch && matchStatus && matchPeran && matchTag;
  });
});

const saveTeamMember = async () => {
  formErrors.value.nama = !form.value.nama.trim();
  
  if (form.value.phone_country_code === 'ID') {
    const phoneRegex = /^8[1-9][0-9]{7,11}$/;
    formErrors.value.phone_number = !form.value.phone_number || !phoneRegex.test(form.value.phone_number);
  } else {
    formErrors.value.phone_number = !form.value.phone_number || form.value.phone_number.length < 5;
  }
  
  if (formErrors.value.nama || formErrors.value.phone_number) {
    alert('Mohon lengkapi field yang wajib diisi dengan format yang benar.');
    return;
  }
  
  isSaving.value = true;

  // Phone number smart cleanup if ID
  if (form.value.phone_country_code === 'ID' && form.value.phone_number) {
     let cleaned = form.value.phone_number.replace(/\s+/g, '');
     if (cleaned.startsWith('0')) cleaned = cleaned.substring(1);
     else if (cleaned.startsWith('+62')) cleaned = cleaned.substring(3);
     else if (cleaned.startsWith('62')) cleaned = cleaned.substring(2);
     form.value.phone_number = cleaned;
  }
  
  try {
    const token = localStorage.getItem('auth_token');
    const payload = { ...form.value };
    
    if (isEditing.value) {
      const response = await axios.put(`/api/team-members/${editingId.value}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const index = teamMembers.value.findIndex(m => m.id === editingId.value);
      if (index !== -1) {
        teamMembers.value[index] = sanitizeMember(response.data.data);
      }
    } else {
      const response = await axios.post('/api/team-members', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      teamMembers.value.unshift(sanitizeMember(response.data.data));
    }
    
    const setupStatus = JSON.parse(localStorage.getItem('vender_setup_status') || '{}');
    const isFirstSetup = !setupStatus.step4_completed;

    completeStep('add-team');
    
    if (isActive.value || isFirstSetup) {
      if (isActive.value) endTour();
      window.location.href = '/dashboard';
    } else {
      closeAddModal();
      isSaving.value = false;
    }
  } catch (error) {
    console.error('Failed to save team member', error);
    if (error.response && error.response.status === 422) {
       if (error.response.data.errors && error.response.data.errors.phone_number) {
          formErrors.value.phone_number = true;
          alert('Nomor WhatsApp yang Anda masukkan tidak valid.');
       } else {
          alert('Mohon lengkapi field yang wajib diisi dengan format yang benar.');
       }
    } else {
       alert('Gagal menyimpan anggota tim. Mohon periksa kembali form Anda.');
    }
    isSaving.value = false;
  }
};

const deleteTeamMember = async (id) => {
  if (!confirm('Hapus anggota tim ini?')) return;
  try {
    const token = localStorage.getItem('auth_token');
    await axios.delete(`/api/team-members/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    teamMembers.value = teamMembers.value.filter(m => m.id !== id);
  } catch(error) {
    console.error('Failed to delete team member', error);
  }
};

const addPricelistItem = () => {
  form.value.pricelist.push({ nama: '', harga: '' });
};

const removePricelistItem = (index) => {
  form.value.pricelist.splice(index, 1);
};

const formatRupiah = (value) => {
  if (!value) return '';
  const numberString = value.toString().replace(/[^,\d]/g, '');
  const split = numberString.split(',');
  const sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  if (ribuan) {
    const separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }
  rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
  return rupiah;
};

const updateHarga = (index, event) => {
  const value = event.target.value;
  const cleanValue = value.replace(/\D/g, ''); // Strip all non-digits
  form.value.pricelist[index].harga = cleanValue;
  event.target.value = formatRupiah(cleanValue);
};

const tagInput = ref('');

const addTag = (e) => {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault();
    let val = tagInput.value.replace(/,/g, '').trim();
    if (val && !form.value.tags.includes(val)) {
      form.value.tags.push(val);
    }
    tagInput.value = '';
  }
};

const removeTag = (index) => {
  form.value.tags.splice(index, 1);
};
</script>

<style scoped>
.team-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-height: calc(100vh - 100px);
}

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  color: var(--text-primary);
}

.page-subtitle {
  font-size: 0.85rem;
  color: #a0a0a0;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-outline {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-outline:hover {
  background-color: var(--bg-card-hover);
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--text-primary);
  color: var(--text-inverse);
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  opacity: 0.9;
}

/* Empty State Card */
.empty-state-card {
  background-color: var(--bg-main);
  border: 1px solid var(--bg-card-hover);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 400px;
}

.empty-state-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 500px;
}

.icon-container {
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.text-gray {
  color: var(--text-secondary);
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
}

.empty-subtitle {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin: 0;
}

/* Light Theme Adjustments */










/* Modal Styles */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  width: 100%;
  max-width: 720px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Empty State */
.empty-state-card {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
  background-color: var(--bg-card);
  border: 1px dashed var(--border-color);
  border-radius: 12px;
  text-align: center;
}

/* Table Card & Controls */
.table-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.table-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
  gap: 1rem;
}

.search-box {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  width: 300px;
}

.search-box .search-icon {
  color: var(--text-secondary);
  margin-right: 0.5rem;
}

.search-box input {
  background: transparent;
  border: none;
  color: var(--text-primary);
  width: 100%;
  outline: none;
  font-size: 0.85rem;
}

.filters {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.filter-select {
  background-color: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  border-radius: 8px;
  padding: 0.5rem 2rem 0.5rem 1rem;
  font-size: 0.85rem;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 14px;
}

.btn-filter {
  padding: 0.5rem 1rem;
  gap: 0.5rem;
}

/* Table */
.table-responsive {
  width: 100%;
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th, .data-table td {
  padding: 1rem 1.5rem;
  text-align: left;
  font-size: 0.85rem;
  border-bottom: 1px solid var(--border-color);
  color: #ccc;
}

.data-table th {
  color: var(--text-secondary);
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
}

.data-table td {
  vertical-align: middle;
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-primary);
  font-weight: 500;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--bg-card-hover);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 600;
}

.role-pill {
  background-color: var(--bg-card-hover);
  color: #aaa;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.tag-pill-sm {
  background-color: var(--bg-card-hover);
  color: var(--text-primary);
  padding: 0.15rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
}

.status-badge {
  background: transparent;
  border: none;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s;
}
.status-aktif {
  color: #4ade80;
}
.status-aktif:hover {
  background-color: rgba(74, 222, 128, 0.1);
}
.status-nonaktif {
  color: #f87171;
}
.status-nonaktif:hover {
  background-color: rgba(248, 113, 113, 0.1);
}

.action-buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
}

.btn-action {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.2s;
}

.btn-action:hover {
  background: var(--bg-card-hover);
}

.btn-wa { color: #4ade80; border-color: #1a4d2e; background-color: rgba(74, 222, 128, 0.1); }
.btn-wa:hover { background-color: rgba(74, 222, 128, 0.2); border-color: #4ade80; }

.btn-edit { color: #60a5fa; border-color: #1e3a8a; background-color: rgba(96, 165, 250, 0.1); }
.btn-edit:hover { background-color: rgba(96, 165, 250, 0.2); border-color: #60a5fa; }

.btn-delete { color: #f87171; border-color: #7f1d1d; background-color: rgba(248, 113, 113, 0.1); }
.btn-delete:hover { background-color: rgba(248, 113, 113, 0.2); border-color: #f87171; }

.text-right {
  text-align: right !important;
}

/* Pagination */
.table-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.per-page {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.per-page-select {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  border-radius: 6px;
  padding: 0.25rem 0.5rem;
  outline: none;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.page-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.page-btn:hover {
  color: var(--text-primary);
}

.page-num {
  font-weight: 500;
  color: var(--text-primary);
}

.modal-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: var(--text-primary);
}

.modal-subtitle {
  color: #a0a0a0;
  font-size: 0.85rem;
  margin: 0;
}

.close-btn {
  background: transparent;
  border: none;
  color: #a0a0a0;
  cursor: pointer;
  padding: 0.25rem;
  transition: color 0.2s;
}

.close-btn:hover {
  color: var(--text-primary);
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex-grow: 1;
}

.modal-footer {
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.75rem;
}

.btn-white-solid {
  background-color: var(--text-primary);
  color: var(--text-inverse);
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-white-solid:hover {
  opacity: 0.9;
}

/* Form Styles */
.form-group + .form-group {
  margin-top: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 0.85rem;
  font-weight: 500;
  color: #e5e5e5;
  margin-bottom: 0.5rem;
}

.form-control {
  width: 100%;
  background-color: transparent;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: var(--text-primary);
  font-size: 0.9rem;
  transition: all 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: var(--text-secondary);
  background-color: rgba(255, 255, 255, 0.02);
}

.select-wrapper {
  position: relative;
}

.select-control {
  appearance: none;
  cursor: pointer;
  background-color: transparent;
}

.select-control option {
  background-color: var(--bg-card);
  color: var(--text-primary);
}

.select-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0a0a0;
  pointer-events: none;
}

.help-text {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin: 0.35rem 0 0 0;
}

/* Phone Input Group */
.input-group {
  display: flex;
  align-items: stretch;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  overflow: hidden;
  width: 100%;
  transition: border-color 0.2s;
}

.input-group:focus-within {
  border-color: rgba(255, 255, 255, 0.3);
}

.input-group.has-error {
  border-color: #ef4444;
}

.input-addon {
  background-color: rgba(255, 255, 255, 0.03);
  border-right: 1px solid var(--border-color);
  padding: 0.75rem 1rem;
  color: #a0a0a0;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.input-group .form-control {
  border: none !important;
  border-radius: 0 !important;
  background: transparent !important;
  flex: 1;
  padding: 0.75rem 1rem;
  color: var(--text-primary);
  font-size: 0.9rem;
  outline: none;
  box-shadow: none !important;
}

/* Pricelist */
.pricelist-group {
  background-color: transparent;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
}

.pricelist-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.pricelist-header label {
  margin-bottom: 0;
  margin-right: 0.5rem;
}

.help-text-inline {
  font-size: 0.75rem;
  color: var(--text-secondary);
  flex-grow: 1;
}

.btn-add-item {
  background-color: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
}

.btn-add-item:hover {
  background-color: var(--bg-card-hover);
}

.pricelist-empty {
  border: 1px dashed var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.pricelist-item-box {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}
.pricelist-item-box:first-child {
  margin-top: 0;
  padding-top: 0;
  border-top: none;
}

.input-with-action {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-trash {
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 0.6rem;
  color: #ef4444;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-trash:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
}

.input-prefix {
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  background-color: transparent;
  transition: all 0.2s;
}

.input-prefix:focus-within {
  border-color: var(--text-secondary);
  background-color: rgba(255, 255, 255, 0.02);
}

.input-prefix .prefix {
  padding: 0.75rem 1rem;
  color: #a0a0a0;
  font-size: 0.9rem;
  border-right: 1px solid var(--border-color);
  background-color: rgba(255, 255, 255, 0.02);
}

.input-prefix .form-control {
  border: none;
  border-radius: 0;
  background-color: transparent;
}

.input-prefix .form-control:focus {
  background-color: transparent;
}

.mt-3 {
  margin-top: 0.75rem;
}

/* Modal Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Tags */
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}
.tag-pill {
  background-color: var(--bg-card-hover);
  color: var(--text-primary);
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.tag-remove {
  background: transparent;
  border: none;
  color: #a0a0a0;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}
.tag-remove:hover {
  color: var(--text-primary);
}

/* Responsive Table (Mobile Cards) */
.desktop-only { display: block; }
.mobile-only { display: none; }

@media (max-width: 768px) {
  .desktop-only { display: none !important; }
  .mobile-only { display: flex; flex-direction: column; gap: 1rem; }
  
  .member-mobile-card {
    background-color: var(--bg-main);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .mm-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  
  .mm-user {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .mm-user .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--bg-card-hover);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
  
  .mm-name-role h4 {
    margin: 0;
    font-size: 1rem;
    color: var(--text-primary);
  }
  
  .mm-name-role span {
    font-size: 0.8rem;
    color: #a0a0a0;
  }
  
  .mm-status {
    background: transparent;
    border: none;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
  }
  .mm-status.text-green { color: #10b981; }
  .mm-status.text-gray { color: #6b7280; }
  
  .mm-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .mm-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
    color: var(--text-primary);
  }
  
  .mm-label {
    color: #a0a0a0;
  }
  
  .mm-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  
  .mm-actions .btn-action {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    background: transparent;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .mm-actions .btn-wa { color: #10b981; }
  .mm-actions .btn-edit { color: #3b82f6; }
  .mm-actions .btn-delete { color: #ef4444; }
  
  .mm-actions .btn-wa:hover { background: rgba(16, 185, 129, 0.1); border-color: #10b981; }
  .mm-actions .btn-edit:hover { background: rgba(59, 130, 246, 0.1); border-color: #3b82f6; }
  .mm-actions .btn-delete:hover { background: rgba(239, 68, 68, 0.1); border-color: #ef4444; }
  
  /* Responsive Header Actions */
  .header-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    width: 100%;
  }
  .header-actions .btn-outline,
  .header-actions .btn-primary {
    width: 100%;
    justify-content: center;
  }
  
  /* Responsive Table Controls */
  .table-controls {
    flex-direction: column;
    align-items: stretch;
    padding: 1rem;
    gap: 1rem;
  }
  .search-box {
    width: 100%;
  }
  .filters {
    flex-direction: column;
    width: 100%;
    gap: 0.75rem;
  }
  .filter-select {
    width: 100%;
  }
  .btn-filter {
    width: 100%;
    justify-content: center;
  }
}

.text-danger { color: #ef4444; }
.error-msg { font-size: 0.75rem; color: #ef4444; margin-top: 0.25rem; display: block; }
.form-control.has-error { border-color: #ef4444; }
.has-error-box { border: 1px solid #ef4444; border-radius: 8px; padding: 0.5rem; }


.reorder-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.draggable-item {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  transition: all 0.2s;
}

.draggable-item:hover {
  background-color: rgba(255, 255, 255, 0.02);
}

.ghost-item {
  opacity: 0.5;
  background-color: rgba(255, 255, 255, 0.05);
}

.drag-handle {
  cursor: grab;
  color: #a0a0a0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  padding: 6px;
  margin-right: 16px;
}

.drag-handle:active {
  cursor: grabbing;
}

.draggable-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-grow: 1;
}

.d-name {
  font-weight: 500;
  color: var(--text-primary);
  font-size: 0.95rem;
}

.d-status {
  font-size: 0.8rem;
  font-weight: 500;
}

.draggable-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.draggable-actions button {
  background: none;
  border: none;
  color: #a0a0a0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  transition: color 0.2s;
}

.draggable-actions button:hover:not(:disabled) {
  color: var(--text-primary);
}

.draggable-actions button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

</style>
