<template>
  <DashboardLayout>
    <div class="form-booking-page">
      <!-- Toast Warning -->
      <transition name="fade">
        <div v-if="showDriveWarning" class="toast-warning">
          <AlertTriangle :size="16" />
          <span>Hubungkan Google Drive dulu sebelum upload QRIS.</span>
          <button class="close-toast" @click="showDriveWarning = false">&times;</button>
        </div>
      </transition>

      <!-- Page Header -->
      <div class="page-header">
        <h1 class="page-title">Form Booking Publik</h1>
        <p class="page-subtitle">Kustomisasi tampilan Form Booking online untuk klien Anda.</p>
      </div>

      <!-- Warning Alert -->
      <div v-if="!isNameSet" class="alert-warning">
        <AlertTriangle :size="20" class="alert-icon" />
        <div class="alert-content">
          <h4 class="alert-title">Nama Studio belum diatur</h4>
          <p class="alert-desc">Form booking memerlukan Nama Studio untuk membuat URL. Silakan atur Nama Studio di <router-link to="/pengaturan?tab=umum" class="alert-link">Halaman Pengaturan</router-link> terlebih dahulu, lalu kembali ke sini.</p>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="booking-content">
        
        <!-- Left Column: Settings -->
        <div class="settings-column">
          <!-- Tabs -->
          <div class="tabs-container">
            <button class="tab-btn active">Pengaturan Umum</button>
            <button class="tab-btn">Custom Form</button>
          </div>

          <!-- Section: Pengaturan Pembayaran -->
          <div class="settings-section">
            <div class="section-header">
              <Percent :size="16" />
              <h3>Pengaturan Pembayaran</h3>
            </div>
            <p class="section-desc">Atur minimum DP berbeda untuk setiap tipe acara.</p>
            
            <div class="form-group">
              <label>Tipe Acara</label>
              <div class="select-wrapper">
                <select class="form-control" v-model="selectedEventType">
                  <option v-for="type in eventTypes" :key="type" :value="type">{{ type }}</option>
                </select>
                <ChevronDown :size="14" class="select-icon" />
              </div>
            </div>
            
            <div class="form-group">
              <label>Minimum DP: {{ selectedEventType }}</label>
              <div class="dp-toggle">
                <button class="toggle-btn" :class="{ active: dpSettings[selectedEventType].type === 'percentage' }" @click="dpSettings[selectedEventType].type = 'percentage'">Persentase (%)</button>
                <button class="toggle-btn" :class="{ active: dpSettings[selectedEventType].type === 'nominal' }" @click="dpSettings[selectedEventType].type = 'nominal'">Nominal (Rp)</button>
              </div>
              
              <div v-if="dpSettings[selectedEventType].type === 'percentage'" class="slider-container">
                <input type="range" min="0" max="100" step="5" v-model="dpSettings[selectedEventType].percentageValue" class="range-slider" />
                <span class="slider-value">{{ dpSettings[selectedEventType].percentageValue }}%</span>
              </div>
              
              <div v-else class="nominal-input-container">
                <div class="input-with-prefix">
                  <span class="prefix">Rp</span>
                  <input type="number" v-model="dpSettings[selectedEventType].nominalValue" class="form-control nominal-input" />
                </div>
              </div>
            </div>

            <div class="dp-summary mt-4">
              <label class="summary-label">RINGKASAN DP</label>
              <div class="tags-container mt-2">
                <span class="tag-badge" v-for="type in eventTypes" :key="type">
                  {{ type }}: <span class="tag-value">{{ formatDp(type) }}</span>
                </span>
              </div>
            </div>
          </div>

          <div id="metode-pembayaran-section" class="settings-section">
            <div class="section-header">
              <Wallet :size="16" />
              <h3>Metode Pembayaran</h3>
            </div>
            <p class="section-desc">Pilih metode pembayaran yang tampil di form booking, atur rekening bank, mana QRIS, atau upload gambar QRIS.</p>
            
            <div class="method-options">
              <!-- Transfer Bank -->
              <!-- Transfer Bank -->
              <div class="method-card" :class="{ active: activePaymentMethods.transfer_bank }">
                <div class="method-header" @click="togglePaymentMethod('transfer_bank')">
                  <div class="method-info">
                    <div class="method-icon-wrap"><CreditCard :size="18" /></div>
                    <div>
                      <h4 class="method-title">Transfer Bank</h4>
                      <p class="method-subtitle">{{ activeBankAccountsCount }}/{{ totalValidBankAccountsCount }} rekening aktif</p>
                    </div>
                  </div>
                  <div class="radio-btn" :class="{ active: activePaymentMethods.transfer_bank }"></div>
                </div>
              </div>

              <!-- QRIS -->
              <div class="method-card" :class="{ active: activePaymentMethods.qris }">
                <div class="method-header" @click="togglePaymentMethod('qris')">
                  <div class="method-info">
                    <div class="method-icon-wrap"><QrCode :size="18" /></div>
                    <div>
                      <h4 class="method-title">QRIS</h4>
                      <p class="method-subtitle">Upload gambar QRIS</p>
                    </div>
                  </div>
                  <div class="radio-btn" :class="{ active: activePaymentMethods.qris }"></div>
                </div>
              </div>

              <!-- Cash -->
              <div class="method-card" :class="{ active: activePaymentMethods.cash }">
                <div class="method-header" @click="togglePaymentMethod('cash')">
                  <div class="method-info">
                    <div class="method-icon-wrap"><Banknote :size="18" /></div>
                    <div>
                      <h4 class="method-title">Cash</h4>
                      <p class="method-subtitle">Bukti pembayaran otomatis nonaktif</p>
                    </div>
                  </div>
                  <div class="radio-btn" :class="{ active: activePaymentMethods.cash }"></div>
                </div>
              </div>

              <!-- Online Payment -->
              <div class="method-card" :class="{ active: activePaymentMethods.online_payment }">
                <div class="method-header" @click="togglePaymentMethod('online_payment')">
                  <div class="method-info">
                    <div class="method-icon-wrap"><Globe :size="18" /></div>
                    <div>
                      <h4 class="method-title">Online Payment</h4>
                      <p class="method-subtitle">Pilih provider di bawah</p>
                    </div>
                  </div>
                  <div class="radio-btn" :class="{ active: activePaymentMethods.online_payment }"></div>
                </div>
              </div>
            </div>

            <!-- Configuration Boxes -->
            <div class="config-box mt-3">
              <div class="bank-header">
                <h5><CreditCard :size="14" class="inline-icon" /> Rekening Bank</h5>
                <button class="btn-small" @click="addBankAccount" v-if="bankAccounts.length < 5"><Plus :size="12" /> Tambah</button>
              </div>
              <p class="bank-desc">Maksimal 5 rekening. Klien hanya melihat rekening yang dicentang aktif.</p>
              
              <div v-if="bankAccounts.length === 0" class="empty-bank">
                Belum ada rekening bank
              </div>
              
              <div class="bank-list" v-else>
                <div v-for="(bank, index) in bankAccounts" :key="bank.id" class="bank-item">
                  <div class="bank-item-header">
                    <span class="bank-number">Rekening #{{ index + 1 }}</span>
                    <div class="bank-actions">
                      <label class="bank-active-checkbox">
                        <input type="checkbox" v-model="bank.is_active" /> Aktif di form booking
                      </label>
                      <button class="btn-delete" @click="removeBankAccount(index)">
                        <Trash2 :size="14" />
                      </button>
                    </div>
                  </div>
                  <div class="bank-form-grid">
                    <div class="form-group-sm">
                      <label>Nama Bank</label>
                      <input type="text" class="form-control" v-model="bank.bank_name" placeholder="BCA / BNI / Mandiri / dll" />
                    </div>
                    <div class="form-group-sm">
                      <label>Nomor Rekening</label>
                      <input type="text" class="form-control" v-model="bank.account_number" placeholder="1234567890" />
                    </div>
                    <div class="form-group-sm">
                      <label>Atas Nama</label>
                      <input type="text" class="form-control" v-model="bank.account_name" placeholder="Nama Pemilik Rekening" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="config-box mt-3">
              <div class="qris-header">
                <h5><QrCode :size="14" class="inline-icon" /> QRIS</h5>
                <button class="btn-small" @click="connectGoogleDrive" v-if="!isGoogleDriveConnected">Hubungkan Google Drive</button>
                <button class="btn-small connected" v-else>Google Drive Terhubung</button>
              </div>
              <p class="qris-desc">Gambar QRIS disimpan ke Google Drive vendor yang sedang login.</p>
              
              <div v-if="!qrisImagePreview" class="upload-area" :class="{ 'disabled': !isGoogleDriveConnected }" @click="handleUploadClick">
                <UploadCloud :size="24" class="upload-icon" />
                <p>{{ isGoogleDriveConnected ? 'Klik untuk upload QRIS' : 'Hubungkan Google Drive untuk upload QRIS' }}</p>
                <span class="upload-hint">Format gambar (PNG / JPG) akan tampil di form booking publik.</span>
              </div>
              
              <div v-else class="qris-preview-container">
                <div class="qris-image-wrapper">
                  <img :src="qrisImagePreview" alt="QRIS Preview" />
                </div>
                <div class="qris-actions">
                  <button class="btn-qris-action" @click="handleUploadClick">
                    <UploadCloud :size="14" /> Ganti QRIS
                  </button>
                  <button class="btn-qris-action btn-qris-delete" @click="removeQrisImage">
                    <Trash2 :size="14" /> Hapus
                  </button>
                </div>
              </div>

              <input type="file" ref="fileInput" @change="handleFileChange" accept="image/png, image/jpeg, image/jpg" style="display: none;" />
            </div>

            <div class="config-box mt-3">
              <p class="summary-text" style="font-size: 0.85rem; color: #a1a1aa; margin: 0;">
                {{ ringkasanPembayaran }}
              </p>
            </div>
          </div>

          <!-- Section: Kustomisasi Tampilan -->
          <div class="settings-section">
            <div class="section-header">
              <Palette :size="16" />
              <h3>Kustomisasi Tampilan</h3>
            </div>
            
            <div class="form-group">
              <label>Warna Brand</label>
              <div class="color-picker-wrap" style="display:flex; gap:10px; align-items:center;">
                <div style="position:relative; width:40px; height:40px; border-radius:4px; overflow:hidden; border: 1px solid #333; flex-shrink: 0;">
                  <input type="color" v-model="brandColor" style="position:absolute; top:-10px; left:-10px; width:60px; height:60px; cursor:pointer;" />
                </div>
                <input type="text" class="form-control" v-model="brandColor" style="width: 120px; flex-shrink: 0;" />
                <div class="color-swatch" :style="{ backgroundColor: brandColor, height: '40px', width: '100px', borderRadius: '4px', flexShrink: 0 }"></div>
              </div>
            </div>
            
            <div class="form-group">
              <label>Teks Sapaan</label>
              <textarea class="form-control textarea" rows="3" v-model="customGreetingText" :placeholder="defaultGreetingText"></textarea>
              <p class="input-hint">Teks ini tampil di atas form. Kosongkan untuk menampilkan teks default.</p>
            </div>
            
            <div class="form-group">
              <label>Bahasa Form</label>
              <div class="select-wrapper">
                <select class="form-control" v-model="formLanguage">
                  <option value="ID">ID Bahasa Indonesia</option>
                  <option value="EN">GB English</option>
                </select>
                <ChevronDown :size="14" class="select-icon" />
              </div>
              <p class="input-hint">Pilih bahasa default form booking publik.</p>
            </div>
          </div>

          <!-- Section: Tipe Acara -->
          <div class="settings-section">
            <div class="section-header">
              <Tag :size="16" />
              <h3>Tipe Acara</h3>
            </div>
            <p class="section-desc">Daftar tipe acara ini mengikuti Pengaturan Umum dan dipakai informasinya di form booking publik.</p>
            
            <div class="tags-container">
              <span class="tag-badge">Umum</span>
              <span class="tag-badge">Wedding</span>
              <span class="tag-badge">Akad</span>
              <span class="tag-badge">Resepsi</span>
              <span class="tag-badge">Lamaran</span>
              <span class="tag-badge">Prewedding</span>
              <span class="tag-badge">Wisuda</span>
              <span class="tag-badge">Maternity</span>
              <span class="tag-badge">Newborn</span>
              <span class="tag-badge">Family</span>
              <span class="tag-badge">Komersil</span>
              <span class="tag-badge">Custom Lainnya</span>
            </div>
            
            <p class="input-hint mt-2">Pengaturan ini tersinkronisasi otomatis dengan Custom Tipe Acara di Halaman Pengaturan Umum.</p>
          </div>

          <!-- Section: Field Opsional -->
          <div class="settings-section">
            <div class="section-header">
              <ListChecks :size="16" />
              <h3>Field Opsional</h3>
            </div>
            
            <div class="switch-list">
              <div class="switch-item">
                <label>Catatan</label>
                <div class="switch active"></div>
              </div>
              <div class="switch-item">
                <label>Paket / Add-on</label>
                <div class="switch active"></div>
              </div>
              <div class="switch-item">
                <label>Multiple Pilih Paket Utama</label>
                <div class="switch active"></div>
              </div>
              <div class="switch-item">
                <label>Multiple Pilih Add-on</label>
                <div class="switch"></div>
              </div>
              <div class="switch-item">
                <label>Sembunyikan Harga Paket</label>
                <div class="switch"></div>
              </div>
              <div class="switch-item">
                <label>Sembunyikan Harga Add-on</label>
                <div class="switch"></div>
              </div>
              <div class="switch-item">
                <label>Bukti Pembayaran</label>
                <div class="switch"></div>
              </div>
            </div>
            
            <p class="input-hint mt-3">Jika ditutup, maka form ini hanya akan dapat menerima booking via API atau sistem internal. Hanya admin yang bisa proses/buat invoice settlement via dashboard.</p>
          </div>

          <!-- Section: Terms & Conditions -->
          <div class="settings-section">
            <div class="section-header">
              <FileText :size="16" />
              <h3>Terms & Conditions</h3>
            </div>
            <p class="section-desc">Tambahkan ketentuan Pemesanan di bagian paling bawah form booking, dengan teks custom dan popup T&C bila diklik.</p>
            
            <div class="switch-item mb-3">
              <label class="font-bold">Aktifkan T&C</label>
              <div class="switch"></div>
            </div>
            <p class="input-hint mb-4">Pastikan opsi klik ini mewajibkan klien setuju sebelum booking bisa diklik.</p>
            
            <div class="tnc-form disabled">
              <div class="form-group">
                <label>Teks sebelum hyperlink</label>
                <input type="text" class="form-control" value="Saya telah membaca & setuju terhadap" disabled />
              </div>
              
              <div class="form-row">
                <div class="form-group flex-1">
                  <label>Teks hyperlink</label>
                  <input type="text" class="form-control" value="Syarat & Ketentuan" disabled />
                </div>
                <div class="form-group flex-1">
                  <label>Teks sesudah hyperlink</label>
                  <input type="text" class="form-control" value="yang sudah ada." disabled />
                </div>
              </div>
              
              <div class="form-group">
                <label>Isi popup T&C</label>
                <div class="rich-text-editor">
                  <div class="editor-toolbar">
                    <button><Bold :size="14" /></button>
                    <button><Italic :size="14" /></button>
                    <button><Underline :size="14" /></button>
                    <button><Link :size="14" /></button>
                    <button><List :size="14" /></button>
                    <button><ListOrdered :size="14" /></button>
                    <button><AlignLeft :size="14" /></button>
                    <button><AlignCenter :size="14" /></button>
                    <button><AlignRight :size="14" /></button>
                    <button><Image :size="14" /></button>
                  </div>
                  <div class="editor-content disabled"></div>
                </div>
                <p class="input-hint">Isi teks ini mendukung format dasar seperti bold, italic, underline, bullet list, numbering, heading, dan quote.</p>
              </div>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="action-buttons-bottom">
            <button class="btn-primary" @click="saveSettings">Simpan Pengaturan</button>
            <button class="btn-text">
              <RefreshCcw :size="14" class="mr-1" /> Reset Default
            </button>
          </div>
          
        </div>
        
        <!-- Right Column: Preview -->
        <div class="preview-column">
          <div class="preview-header">
            <h3>Preview</h3>
            <div class="preview-actions">
              <button class="icon-btn" title="Refresh" @click="refreshPreview"><RefreshCcw :size="16" /></button>
              <button class="icon-btn" title="Salin Link" @click="copyLink"><Copy :size="16" /></button>
              <button class="icon-btn" title="Buka di Tab Baru" @click="openInNewTab"><ExternalLink :size="16" /></button>
            </div>
          </div>
          
          <div class="preview-container">
            <div v-if="!isNameSet" class="preview-empty">
              <div class="preview-empty-icon">
                <FileText :size="32" class="text-orange" />
              </div>
              <h4>Form belum aktif</h4>
              <p>Atur Nama Studio di Pengaturan terlebih dahulu</p>
            </div>
            <div v-else class="preview-mockup" :key="previewKey">
               <!-- browser header -->
               <div class="mockup-browser-header">
                 <div class="mockup-dots">
                   <span></span><span></span><span></span>
                 </div>
                 <div class="mockup-url">clientdesk.id/{{ langStrings.urlPrefix }}/formbooking/{{ vendorName ? vendorName.toLowerCase().replace(/\s+/g, '') : 'fariz' }}</div>
               </div>
               
               <!-- mockup body -->
               <div class="mockup-body">
                 <div class="mockup-avatar">
                   {{ vendorName ? vendorName.charAt(0).toUpperCase() : 'F' }}
                 </div>
                 <h3 class="mockup-vendor-name">{{ vendorName || 'fariz' }}</h3>
                 <p class="mockup-subtitle">{{ displayGreetingText }}</p>
                 
                   <div class="mockup-form-card">
                      <!-- Steps List -->
                      <div class="mockup-steps-list">
                        <div class="mockup-step active" :style="{ backgroundColor: brandColor + '20', borderColor: brandColor }">
                          <span class="step-num" :style="{ backgroundColor: brandColor, color: '#fff' }">1</span>
                          <span class="step-text" :style="{ color: '#000' }">{{ langStrings.clientInfo }}</span>
                        </div>
                        <div class="mockup-step">
                          <span class="step-num">2</span>
                          <span class="step-text">{{ langStrings.packageAddon }}</span>
                        </div>
                        <div class="mockup-step">
                          <span class="step-num">3</span>
                          <span class="step-text">{{ langStrings.summary }}</span>
                        </div>
                        <div class="mockup-step">
                          <span class="step-num">4</span>
                          <span class="step-text">{{ langStrings.paymentConfirmation }}</span>
                        </div>
                      </div>

                      <!-- Informasi Klien Section -->
                      <div class="mockup-section">
                        <h4 class="mockup-section-title" :style="{ color: brandColor }">{{ langStrings.clientInfo }}</h4>
                        
                        <div class="mockup-field">
                          <label><User :size="12" /> Nama Lengkap <span class="req" :style="{ color: brandColor }">*</span></label>
                          <input type="text" class="mockup-input" placeholder="Nama lengkap Anda" />
                        </div>

                        <div class="mockup-field">
                          <label><Phone :size="12" /> Nomor WhatsApp <span class="req" :style="{ color: brandColor }">*</span></label>
                         <div class="mockup-phone-input">
                           <select class="mockup-select phone-code">
                             <option>ID +62</option>
                           </select>
                           <input type="text" class="mockup-input" placeholder="8123456789" value="85878067644" />
                         </div>
                       </div>

                       <div class="mockup-field">
                         <label><Instagram :size="12" /> Instagram</label>
                         <input type="text" class="mockup-input" placeholder="@ username" value="@ djnfjke" />
                       </div>
                     </div>

                      <!-- Detail Sesi/Acara Section -->
                      <div class="mockup-section">
                        <h4 class="mockup-section-title" :style="{ color: brandColor }">{{ langStrings.sessionDetails }}</h4>
                        
                        <div class="mockup-field">
                          <label><Tag :size="12" /> Tipe Acara <span class="req" :style="{ color: brandColor }">*</span></label>
                         <select class="mockup-select" v-model="mockupTipeAcara">
                           <option value="">Pilih tipe...</option>
                           <option value="Umum">Umum</option>
                           <option value="Wedding">Wedding</option>
                           <option value="Akad">Akad</option>
                           <option value="Resepsi">Resepsi</option>
                           <option value="Lamaran">Lamaran</option>
                           <option value="Prewedding">Prewedding</option>
                           <option value="Wisuda">Wisuda</option>
                           <option value="Maternity">Maternity</option>
                           <option value="Newborn">Newborn</option>
                           <option value="Family">Family</option>
                           <option value="Komersil">Komersil</option>
                           <option value="Custom/Lainnya">Custom/Lainnya</option>
                         </select>
                       </div>

                       <template v-if="mockupTipeAcara">
                         <div class="mockup-field">
                           <label><Calendar :size="12" /> Jadwal Sesi/Acara <span class="req">*</span></label>
                           <div class="mockup-input-icon">
                             <input type="text" class="mockup-input" placeholder="mm/dd/yyyy" />
                             <Calendar :size="14" class="icon-right" />
                           </div>
                         </div>

                         <div class="mockup-field">
                           <label><Clock :size="12" /> Jam <span class="req">*</span></label>
                           <div class="mockup-input-icon">
                             <input type="text" class="mockup-input" placeholder="--:-- --" />
                             <Clock :size="14" class="icon-right" />
                           </div>
                         </div>

                          <div class="mockup-field">
                            <label><MapPin :size="12" /> Lokasi <span class="req">*</span></label>
                            <div class="mockup-location-group">
                              <div class="mockup-input-icon" style="flex: 1;">
                                <input type="text" class="mockup-input" placeholder="Cari lokasi acara..." v-model="mockupLokasi" />
                              </div>
                              <button class="mockup-icon-btn" title="Pilih Lokasi di Peta" @click="showMapModal = true">
                                <MapPin :size="16" :style="{ color: brandColor }" />
                              </button>
                            </div>
                          </div>

                         <div class="mockup-field">
                           <label><FileText :size="12" /> Detail Lokasi</label>
                           <input type="text" class="mockup-input" placeholder="Contoh: Gedung Utama, Lt. 3, Ruang Ballroom A" />
                         </div>

                         <!-- Wedding/Akad/Resepsi/Lamaran/Prewedding specific fields -->
                         <template v-if="['Wedding', 'Akad', 'Resepsi', 'Lamaran', 'Prewedding'].includes(mockupTipeAcara)">
                           <div class="mockup-field">
                             <label><List :size="12" /> Nama Pasangan <span class="req">*</span></label>
                             <input type="text" class="mockup-input" placeholder="Nama Pasangan" />
                           </div>
                           <div class="mockup-field">
                             <label><List :size="12" /> Instagram Pasangan</label>
                             <input type="text" class="mockup-input" placeholder="Instagram Pasangan" />
                           </div>
                         </template>

                         <template v-if="['Wedding', 'Akad', 'Resepsi', 'Lamaran'].includes(mockupTipeAcara)">
                           <div class="mockup-field">
                             <label><List :size="12" /> Estimasi Tamu</label>
                             <input type="text" class="mockup-input" placeholder="Estimasi Tamu" />
                           </div>
                         </template>

                         <!-- Wisuda specific fields -->
                         <template v-if="mockupTipeAcara === 'Wisuda'">
                           <div class="mockup-field">
                             <label><List :size="12" /> Universitas <span class="req">*</span></label>
                             <input type="text" class="mockup-input" placeholder="Cari universitas..." />
                           </div>
                           <div class="mockup-field">
                             <label><List :size="12" /> Fakultas</label>
                             <input type="text" class="mockup-input" placeholder="Fakultas" />
                           </div>
                         </template>

                         <!-- Maternity specific fields -->
                         <template v-if="mockupTipeAcara === 'Maternity'">
                           <div class="mockup-field">
                             <label><List :size="12" /> Usia Kehamilan</label>
                             <input type="text" class="mockup-input" placeholder="Usia Kehamilan" />
                           </div>
                           <div class="mockup-field">
                             <label><List :size="12" /> Gender Bayi</label>
                             <input type="text" class="mockup-input" placeholder="Gender Bayi" />
                           </div>
                         </template>

                         <!-- Newborn specific fields -->
                         <template v-if="mockupTipeAcara === 'Newborn'">
                           <div class="mockup-field">
                             <label><List :size="12" /> Nama Bayi</label>
                             <input type="text" class="mockup-input" placeholder="Nama Bayi" />
                           </div>
                           <div class="mockup-field">
                             <label><List :size="12" /> Tanggal Lahir</label>
                             <input type="text" class="mockup-input" placeholder="Tanggal Lahir" />
                           </div>
                         </template>

                         <!-- Family specific fields -->
                         <template v-if="mockupTipeAcara === 'Family'">
                           <div class="mockup-field">
                             <label><List :size="12" /> Jumlah Anggota</label>
                             <input type="text" class="mockup-input" placeholder="Jumlah Anggota" />
                           </div>
                         </template>

                         <!-- Komersil specific fields -->
                         <template v-if="mockupTipeAcara === 'Komersil'">
                           <div class="mockup-field">
                             <label><List :size="12" /> Nama Brand</label>
                             <input type="text" class="mockup-input" placeholder="Nama Brand" />
                           </div>
                           <div class="mockup-field">
                             <label><List :size="12" /> Tipe Konten</label>
                             <input type="text" class="mockup-input" placeholder="Tipe Konten" />
                           </div>
                         </template>

                         <div class="mockup-field">
                           <label><FileText :size="12" /> Catatan</label>
                           <textarea class="mockup-textarea" placeholder="Catatan tambahan (opsional)..."></textarea>
                         </div>
                       </template>
                     </div>

                      <!-- Footer -->
                      <div class="mockup-footer">
                        <button class="mockup-btn-next" :style="{ backgroundColor: brandColor, borderColor: brandColor }">{{ langStrings.btnNext }}</button>
                      </div>
                   </div>
                   <div class="mockup-powered-by">Powered by <strong>Client Desk</strong></div>
                   
                   <GoogleMapModal 
                     :show="showMapModal" 
                     :initial-address="mockupLokasi"
                     @close="showMapModal = false"
                     @select="handleLocationSelect"
                   />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import axios from 'axios';

import GoogleMapModal from '../components/GoogleMapModal.vue';

const showMapModal = ref(false);
const mockupLokasi = ref('');

const handleLocationSelect = (address) => {
  mockupLokasi.value = address;
};

import DashboardLayout from '../layouts/DashboardLayout.vue';
import { useTour } from '../composables/useTour';
import { 
  AlertTriangle, Percent, ChevronDown, Wallet, CreditCard, 
  Plus, UploadCloud, QrCode, Banknote, Globe, Palette, 
  Tag, ListChecks, FileText, Bold, Italic, Underline, Link, 
  List, ListOrdered, AlignLeft, AlignCenter, AlignRight, 
  Image, Maximize2, RefreshCcw, User, Phone, Instagram, Calendar, Clock, MapPin,
  Copy, ExternalLink, Trash2
} from 'lucide-vue-next';

const { isActive, currentStep, completeStep } = useTour();
const isNameSet = ref(true);
const vendorName = ref('');
const customUrl = ref('');
const mockupTipeAcara = ref('');
const previewKey = ref(0);

const brandColor = ref('#000000');
const customGreetingText = ref('');
const formLanguage = ref('ID');

const defaultGreetingText = computed(() => {
  return formLanguage.value === 'EN' 
    ? 'Please fill in the form below to make a booking.' 
    : 'Silakan isi formulir di bawah ini untuk booking.';
});

const displayGreetingText = computed(() => {
  return customGreetingText.value.trim() !== '' 
    ? customGreetingText.value 
    : defaultGreetingText.value;
});

const langStrings = computed(() => {
  return formLanguage.value === 'EN' ? {
    urlPrefix: 'en',
    clientInfo: 'Client Info',
    packageAddon: 'Package & Add-On',
    summary: 'Summary',
    paymentConfirmation: 'Payment & Confirmation',
    sessionDetails: 'Session/Event Details',
    btnNext: 'Continue'
  } : {
    urlPrefix: 'id',
    clientInfo: 'Informasi Klien',
    packageAddon: 'Pilih Paket & Add-On',
    summary: 'Ringkasan',
    paymentConfirmation: 'Pembayaran & Konfirmasi',
    sessionDetails: 'Detail Sesi/Acara',
    btnNext: 'Lanjut'
  };
});

const activePaymentMethods = ref({
  transfer_bank: false,
  qris: true,
  cash: true,
  online_payment: false
});

const togglePaymentMethod = (method) => {
  activePaymentMethods.value[method] = !activePaymentMethods.value[method];
};

const eventTypes = ['Umum', 'Wedding', 'Akad', 'Resepsi', 'Lamaran', 'Prewedding', 'Wisuda', 'Maternity', 'Newborn', 'Family', 'Komersil', 'Custom/Lainnya'];
const selectedEventType = ref('Umum');

const dpSettings = ref(
  eventTypes.reduce((acc, type) => {
    acc[type] = {
      type: 'percentage',
      percentageValue: 50,
      nominalValue: 800000
    };
    return acc;
  }, {})
);

const servicesData = ref([]);

const formatDp = (type) => {
  const setting = dpSettings.value[type];
  if (setting.type === 'percentage') {
    return `${setting.percentageValue}%`;
  } else {
    return `Rp ${new Intl.NumberFormat('id-ID').format(setting.nominalValue)}`;
  }
};

const bankAccounts = ref([]);

const eventPrices = computed(() => {
  const mapping = {};
  eventTypes.forEach(type => {
    // Find all active services that have this event type (case-insensitive match or exact)
    const matchedServices = servicesData.value.filter(s => 
      s.is_active && 
      s.tipe_acara && 
      s.tipe_acara.some(t => t.toLowerCase() === type.toLowerCase())
    );
    
    if (matchedServices.length > 0) {
      // Find minimum price among matched services
      const minPrice = matchedServices.reduce((min, s) => {
        const p = parseFloat(String(s.harga).replace(/[^0-9]/g, '')) || 0;
        return p < min || min === 0 ? p : min;
      }, 0);
      mapping[type] = minPrice.toString();
    }
  });
  return mapping;
});

const isGoogleDriveConnected = ref(false);
const showDriveWarning = ref(false);
const fileInput = ref(null);
const qrisImagePreview = ref(null);

const connectGoogleDrive = async () => {
  try {
    const response = await axios.get('/api/auth/google/url');
    if (response.data.status === 'success' && response.data.url) {
      window.open(response.data.url, 'google_login', 'width=500,height=600');
    } else {
      alert('Gagal mendapatkan URL otentikasi Google Drive.');
    }
  } catch (error) {
    console.error('Error fetching Google Auth URL:', error);
    alert('Terjadi kesalahan saat menghubungi server.');
  }
};

const googleToken = ref('');

onMounted(() => {
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'GOOGLE_AUTH_SUCCESS') {
      isGoogleDriveConnected.value = true;
      showDriveWarning.value = false;
      if (event.data.token) {
        googleToken.value = event.data.token;
      }
      // In a real app, you might want to fetch the updated settings here
    } else if (event.data && event.data.type === 'GOOGLE_AUTH_FAILED') {
      alert('Autentikasi Google gagal: ' + event.data.error);
    }
  });
});

const handleUploadClick = () => {
  if (!isGoogleDriveConnected.value) {
    showDriveWarning.value = true;
    setTimeout(() => {
      showDriveWarning.value = false;
    }, 5000);
  } else {
    fileInput.value.click();
  }
};

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
    
    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (e) => {
      qrisImagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);

    // Upload to server
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('google_token', googleToken.value);

      const response = await axios.post('/api/upload/qris', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.status === 'success') {
        console.log('Upload berhasil:', response.data.message);
        alert('Gambar QRIS berhasil diunggah dan disimpan ke Google Drive Anda!');
      }
    } catch (error) {
      console.error('Error uploading QRIS:', error);
      let errMsg = 'Gagal mengunggah QRIS ke Google Drive.';
      if (error.response && error.response.status === 422) {
        errMsg = 'Sesi otentikasi tidak lengkap. Silakan refresh halaman dan klik "Hubungkan Google Drive" sekali lagi.';
      } else if (error.response && error.response.data && error.response.data.message) {
        errMsg += ' Detail: ' + error.response.data.message;
      }
      alert(errMsg);
      qrisImagePreview.value = null; // Revert preview on error
    }

  } else {
    alert('Hanya format PNG dan JPG yang diperbolehkan.');
  }
};

const removeQrisImage = () => {
  qrisImagePreview.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const validBankAccounts = computed(() => {
  return bankAccounts.value.filter(b => b.bank_name.trim() !== '' && b.account_number.trim() !== '');
});

const activeBankAccountsCount = computed(() => {
  return validBankAccounts.value.filter(b => b.is_active).length;
});

const totalValidBankAccountsCount = computed(() => {
  return validBankAccounts.value.length;
});

const ringkasanPembayaran = computed(() => {
  const methods = [];
  if (activePaymentMethods.value.qris) methods.push('QRIS');
  if (activePaymentMethods.value.transfer_bank) methods.push('Transfer Bank');
  if (activePaymentMethods.value.cash) methods.push('Cash');
  if (activePaymentMethods.value.online_payment) methods.push('Online Payment');

  if (methods.length === 0) {
    return 'Ringkasan: belum ada metode aktif.';
  }

  let text = `Ringkasan: ${methods.join(', ')}.`;

  if (activePaymentMethods.value.transfer_bank) {
    text += ` Rekening aktif: ${activeBankAccountsCount.value}.`;
  }

  if (activePaymentMethods.value.qris) {
    const qrisStatus = qrisImagePreview.value ? 'QRIS siap ditampilkan.' : 'QRIS belum diupload.';
    text += ` ${qrisStatus}`;
  }

  return text;
});

const addBankAccount = () => {
  if (bankAccounts.value.length < 5) {
    bankAccounts.value.push({
      id: Date.now(),
      bank_name: '',
      account_number: '',
      account_name: '',
      is_active: true
    });
  }
};

const removeBankAccount = (index) => {
  bankAccounts.value.splice(index, 1);
};

const getPreviewUrl = () => {
  const baseUrl = window.location.origin;
  if (customUrl.value) {
    return `${baseUrl}/id/formbooking/${customUrl.value}`;
  }
  return `${baseUrl}/id/formbooking/${vendorName.value.toLowerCase().replace(/\s+/g, '')}`;
};

const refreshPreview = () => {
  previewKey.value++;
};

const copyLink = () => {
  navigator.clipboard.writeText(getPreviewUrl());
  alert('Link formulir berhasil disalin!');
};

const openInNewTab = () => {
  window.open(getPreviewUrl(), '_blank');
};

const saveSettings = async (silent = false) => {
  try {
    const token = localStorage.getItem('auth_token');
    const formSettings = {
      activePaymentMethods: activePaymentMethods.value,
      dpSettings: dpSettings.value,
      bankAccounts: bankAccounts.value,
      qrisImagePreview: qrisImagePreview.value,
      brandColor: brandColor.value,
      customGreetingText: customGreetingText.value,
      formLanguage: formLanguage.value,
      selectedEventType: selectedEventType.value
    };

    await axios.post('/api/settings', {
      form_booking_settings: formSettings
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    completeStep('setup-form');
    if (!silent) alert('Pengaturan berhasil disimpan!');
  } catch (error) {
    console.error('Failed to save settings', error);
    if (!silent) alert('Gagal menyimpan pengaturan.');
  }
};

let debounceTimeout = null;
watch(
  [activePaymentMethods, dpSettings, bankAccounts, qrisImagePreview, brandColor, customGreetingText, formLanguage, selectedEventType],
  () => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      saveSettings(true);
    }, 1000);
  },
  { deep: true }
);

onMounted(async () => {
  try {
    const token = localStorage.getItem('auth_token');
    
    const [setupRes, settingsRes, servicesRes] = await Promise.all([
      axios.get('/api/setup-status', { headers: { Authorization: `Bearer ${token}` } }),
      axios.get('/api/settings', { headers: { Authorization: `Bearer ${token}` } }),
      axios.get('/api/services', { headers: { Authorization: `Bearer ${token}` } })
    ]);

    if (servicesRes.data) {
      servicesData.value = servicesRes.data;
    }

    if (setupRes.data) {
      isNameSet.value = setupRes.data.step2_completed;
    }

    if (settingsRes.data) {
      vendorName.value = settingsRes.data.vendor_name || '';
      customUrl.value = settingsRes.data.custom_url || '';
      if (settingsRes.data.form_booking_settings) {
        const fb = settingsRes.data.form_booking_settings;
        if (fb.activePaymentMethods) activePaymentMethods.value = fb.activePaymentMethods;
        if (fb.dpSettings) dpSettings.value = fb.dpSettings;
        if (fb.bankAccounts) bankAccounts.value = fb.bankAccounts;
        if (fb.qrisImagePreview) qrisImagePreview.value = fb.qrisImagePreview;
        if (fb.brandColor) brandColor.value = fb.brandColor;
        if (fb.customGreetingText) customGreetingText.value = fb.customGreetingText;
        if (fb.formLanguage) formLanguage.value = fb.formLanguage;
        if (fb.selectedEventType) selectedEventType.value = fb.selectedEventType;
        completeStep('setup-form');
      }
    }
  } catch (error) {
    console.error('Could not fetch setup status or settings', error);
  }
  // TourGuide.vue handles global tour scroll and highlighting now.
});
</script>

<style scoped>
.form-booking-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Header */
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

/* Alert Warning */
.alert-warning {
  display: flex;
  gap: 1rem;
  background-color: rgba(217, 119, 6, 0.1);
  border: 1px solid rgba(217, 119, 6, 0.3);
  border-radius: 8px;
  padding: 1rem 1.25rem;
  color: #f59e0b;
}

.alert-title {
  font-size: 0.9rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
}

.alert-desc {
  font-size: 0.85rem;
  margin: 0;
  line-height: 1.4;
}

.alert-link {
  color: #fbbf24;
  text-decoration: underline;
  font-weight: 600;
}

/* Main Content Area */
.booking-content {
  display: flex;
  gap: 2rem;
  position: relative;
  width: 100%;
}

.settings-column {
  flex: 1;
  min-width: 0; /* Prevent flex overflow */
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.preview-column {
  flex: 0 0 380px;
  min-width: 380px;
  position: -webkit-sticky !important;
  position: sticky !important;
  top: calc(50vh - 175px) !important; /* Perfect vertical center for 350px height */
  align-self: flex-start !important;
  display: flex;
  flex-direction: column;
}

@media (max-width: 992px) {
  .booking-content {
    flex-direction: column;
  }
  .preview-column {
    flex: none;
    width: 100%;
    min-width: auto;
  }
  .preview-column {
    position: static;
    height: 400px;
  }
}

/* Tabs */
.tabs-container {
  display: flex;
  background-color: #1a1a1a;
  border-radius: 8px;
  padding: 0.25rem;
}

.tab-btn {
  flex: 1;
  background: transparent;
  border: none;
  color: #888;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn.active {
  background-color: #2a2a2a;
  color: #fff;
}

/* Settings Sections */
.settings-section {
  background-color: #121212;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.section-header h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.section-desc {
  font-size: 0.8rem;
  color: #888;
  margin: 0 0 1.5rem 0;
  line-height: 1.4;
}

/* Form Controls */
.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #d1d5db;
  margin-bottom: 0.5rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.flex-1 { flex: 1; }

.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.form-control {
  width: 100%;
  background-color: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 0.6rem 1rem;
  color: #fff;
  font-size: 0.85rem;
  font-family: inherit;
}

.form-control:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.3);
}

select.form-control {
  appearance: none;
  cursor: pointer;
  padding-right: 2.5rem;
}

select.form-control option {
  background-color: #1a1a1a;
}

.textarea {
  resize: vertical;
  min-height: 80px;
}

.select-icon {
  position: absolute;
  right: 1rem;
  pointer-events: none;
  color: #888;
}

.input-hint {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0.5rem 0 0 0;
  line-height: 1.4;
}

/* DP Toggle & Slider */
.dp-toggle {
  display: flex;
  background-color: #1a1a1a;
  border-radius: 6px;
  padding: 0.25rem;
  margin-bottom: 1rem;
  width: max-content;
}

.toggle-btn {
  background: transparent;
  border: none;
  color: #888;
  padding: 0.4rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
}

.toggle-btn.active {
  background-color: #ffffff;
  color: #000000;
}

.slider-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.range-slider {
  flex: 1;
  -webkit-appearance: none;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  outline: none;
}

.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ffffff;
  cursor: pointer;
}

.slider-value {
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  min-width: 40px;
}

/* DP Styles */
.input-with-prefix {
  display: flex;
  align-items: center;
  background-color: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  overflow: hidden;
}

.prefix {
  padding: 0.6rem 0.8rem;
  color: #888;
  font-size: 0.85rem;
  background-color: #1a1a1a;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.nominal-input {
  border: none !important;
  border-radius: 0 !important;
  background-color: transparent !important;
  flex: 1;
}

.nominal-input:focus {
  border: none !important;
  box-shadow: none !important;
}

.dp-summary {
  background-color: transparent;
  border-radius: 8px;
  padding: 0;
}

.summary-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tag-value {
  color: #fff;
  font-weight: 600;
}

/* Method Options */
.method-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.method-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.method-card.active {
  border-color: rgba(255, 255, 255, 0.3);
}

.method-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #1a1a1a;
  cursor: pointer;
}

.method-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.method-icon-wrap {
  width: 36px;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.method-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 0.2rem 0;
}

.method-subtitle {
  font-size: 0.75rem;
  color: #888;
  margin: 0;
}

.radio-btn {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  position: relative;
}

.radio-btn.active {
  border-color: #fff;
}

.radio-btn.active::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #fff;
}

.config-box {
  padding: 1.25rem;
  background-color: #121212;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.config-cash {
  padding: 1rem 1.25rem;
  font-size: 0.85rem;
  color: #888;
}

.inline-icon {
  display: inline-block;
  vertical-align: text-bottom;
}

.bank-header, .qris-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.bank-header h5, .qris-header h5 {
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
}

.bank-desc, .qris-desc {
  font-size: 0.75rem;
  color: #888;
  margin: 0 0 1rem 0;
}

.btn-small {
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 0.75rem;
  padding: 0.3rem 0.75rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
}

.empty-bank {
  border: 1px dashed rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 1.5rem;
  text-align: center;
  font-size: 0.85rem;
  color: #888;
}

.bank-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bank-item {
  background-color: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
}

.bank-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.bank-number {
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
}

.bank-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.bank-active-checkbox {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
}

.bank-active-checkbox input {
  accent-color: #fff;
  cursor: pointer;
}

.btn-delete {
  background: transparent;
  border: none;
  color: #ef4444;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.btn-delete:hover {
  opacity: 0.8;
}

.bank-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.75rem;
}

.form-group-sm label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #d1d5db;
  margin-bottom: 0.5rem;
}

.upload-area {
  border: 1px dashed rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 2rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.upload-icon {
  color: #888;
  margin-bottom: 0.5rem;
}

.upload-area p {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
}

.upload-hint {
  font-size: 0.7rem;
  color: #6b7280;
}

.upload-area.disabled {
  cursor: not-allowed !important;
  opacity: 0.5;
}

.btn-small.connected {
  border-color: #27c93f;
  color: #27c93f;
}

.qris-preview-container {
  background: #111;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.qris-image-wrapper {
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.qris-image-wrapper img {
  max-width: 100%;
  max-height: 250px;
  object-fit: contain;
  border-radius: 4px;
}

.qris-actions {
  display: flex;
  gap: 1rem;
}

.btn-qris-action {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-qris-action:hover {
  background: rgba(255, 255, 255, 0.05);
}

.btn-qris-delete {
  border-color: rgba(239, 68, 68, 0.3);
  color: #ef4444;
}

.btn-qris-delete:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.5);
}

.toast-warning {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #fef3c7;
  color: #92400e;
  border: 1px solid #fcd34d;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 1000;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  font-weight: 500;
  font-size: 0.9rem;
}

.close-toast {
  background: none;
  border: none;
  color: #92400e;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
  margin-left: auto;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.method-footer {
  background-color: #1a1a1a;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  color: #888;
}

/* Tampilan */
.color-picker-wrap {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.color-input {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 0.5rem 1rem;
  min-width: 150px;
}

.color-preview {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.color-input span {
  font-size: 0.85rem;
  color: #fff;
}

.color-swatch {
  width: 40px;
  height: 24px;
  border-radius: 4px;
  background-color: #000;
}

/* Tags */
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-badge {
  background-color: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #d1d5db;
  font-size: 0.75rem;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
}

.mt-2 { margin-top: 0.5rem; }
.mt-3 { margin-top: 1rem; }
.mb-3 { margin-bottom: 1rem; }
.mb-4 { margin-bottom: 1.5rem; }

/* Switches */
.switch-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.switch-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.switch-item label {
  font-size: 0.85rem;
  color: #d1d5db;
}

.font-bold { font-weight: 700; color: #fff !important; }

.switch {
  width: 36px;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s;
}

.switch::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background-color: #fff;
  border-radius: 50%;
  transition: all 0.2s;
}

.switch.active {
  background-color: #fff;
}

.switch.active::after {
  left: 18px;
  background-color: #000;
}

/* T&C Form */
.tnc-form.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.rich-text-editor {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  overflow: hidden;
}

.editor-toolbar {
  display: flex;
  gap: 0.25rem;
  padding: 0.5rem;
  background-color: #1a1a1a;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.editor-toolbar button {
  background: transparent;
  border: none;
  color: #888;
  padding: 0.25rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.editor-content {
  background-color: #121212;
  min-height: 150px;
  padding: 1rem;
}

/* Preview Column */
.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.preview-header h3 {
  font-size: 0.9rem;
  font-weight: 600;
  color: #888;
  margin: 0;
}

.preview-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.icon-btn {
  background: transparent;
  border: none;
  color: #888;
  cursor: pointer;
}

.preview-container {
  background-color: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
}

.preview-empty {
  text-align: center;
  padding: 4rem 2rem;
  background-color: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.preview-empty-icon {
  background-color: #2a2a2a;
  width: 64px;
  height: 64px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
}

.text-orange { color: #f97316; }

.preview-empty h4 {
  font-size: 1rem;
  color: #fff;
  margin: 0 0 0.5rem 0;
}

.preview-empty p {
  font-size: 0.85rem;
  color: #888;
  margin: 0;
}

/* Mockup Styles */
.preview-mockup {
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 350px; /* Lebih pendek lagi agar proporsional */
}

.mockup-header {
  background-color: #2a2a2a;
  padding: 0.65rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.mockup-dots {
  display: flex;
  gap: 6px;
}

.mockup-dots .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.mockup-dots .dot.red { background-color: #ff5f56; }
.mockup-dots .dot.yellow { background-color: #ffbd2e; }
.mockup-dots .dot.green { background-color: #27c93f; }

.mockup-url {
  flex: 1;
  text-align: center;
  font-size: 0.7rem;
  color: #a0a0a0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 2.5rem; /* visual balance */
}

.mockup-body {
  padding: 2.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9fafb;
  overflow-y: auto;
  flex: 1;
}

/* Custom scrollbar for mockup */
.mockup-body::-webkit-scrollbar {
  width: 6px;
}
.mockup-body::-webkit-scrollbar-track {
  background: transparent;
}
.mockup-body::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.mockup-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
}

.mockup-vendor-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
}

.mockup-subtitle {
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0 0 2rem 0;
  text-align: center;
}

.mockup-form-card {
  background-color: #ffffff;
  border-radius: 12px;
  width: 100%;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #f3f4f6;
  text-align: left;
}

.mockup-steps-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.mockup-step {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 1.2rem;
  background-color: #ffffff;
  border: 1px solid #f3f4f6;
  border-radius: 12px;
  color: #9ca3af;
}

.mockup-step.active {
  background-color: #f3f4f6;
  border-color: #111827;
  color: #111827;
}

.step-num {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #f9fafb;
  color: #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
}

.mockup-step.active .step-num {
  background-color: #111827;
  color: #fbbf24;
}

.step-text {
  font-size: 0.85rem;
  font-weight: 500;
}

.mockup-section {
  margin-bottom: 2rem;
}

.mockup-section-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #f3f4f6;
}

.mockup-field {
  margin-bottom: 1rem;
}

.mockup-field label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.mockup-field label .req {
  color: #ef4444;
}

.mockup-input, .mockup-select, .mockup-textarea {
  width: 100%;
  padding: 0.6rem 0.8rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.8rem;
  color: #111827;
  background-color: #ffffff;
  outline: none;
}
.mockup-input:focus, .mockup-select:focus, .mockup-textarea:focus {
  border-color: #d1d5db;
}

.mockup-input[value] {
  background-color: #f0f4ff;
  border-color: #c7d2fe;
}

.mockup-textarea {
  resize: vertical;
  min-height: 80px;
}

.mockup-phone-input {
  display: flex;
  gap: 0.5rem;
}
.mockup-phone-input .phone-code {
  width: 90px;
  flex-shrink: 0;
}

.mockup-input-icon {
  position: relative;
}
.mockup-input-icon .icon-right {
  position: absolute;
  right: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
}

.mockup-location-group {
  display: flex;
  gap: 0.5rem;
}

.mockup-icon-btn {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #111827;
  flex-shrink: 0;
}

.mockup-footer {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.mockup-btn-next {
  background-color: #111827;
  color: #ffffff;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  border: none;
  cursor: pointer;
  width: 100%;
}

.mockup-powered-by {
  margin-top: 1.5rem;
  font-size: 0.7rem;
  color: #9ca3af;
  text-align: center;
}
.mockup-powered-by strong {
  color: #6b7280;
}

/* Action Buttons Bottom */
.action-buttons-bottom {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.btn-primary {
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-text {
  background: transparent;
  border: none;
  color: #888;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.btn-text:hover {
  color: #fff;
}

.mr-1 { margin-right: 0.25rem; }

/* Light Theme Adjustments */
:root[data-theme="light"] .page-title,
:root[data-theme="light"] .section-header h3,
:root[data-theme="light"] .form-group label,
:root[data-theme="light"] .switch-item label,
:root[data-theme="light"] .method-title,
:root[data-theme="light"] .bank-header h5,
:root[data-theme="light"] .qris-header h5,
:root[data-theme="light"] .upload-area p,
:root[data-theme="light"] .preview-empty h4 {
  color: #111827;
}

:root[data-theme="light"] .settings-section,
:root[data-theme="light"] .method-content,
:root[data-theme="light"] .editor-content {
  background-color: #ffffff;
  border-color: #e5e7eb;
}

:root[data-theme="light"] .tabs-container,
:root[data-theme="light"] .form-control,
:root[data-theme="light"] .dp-toggle,
:root[data-theme="light"] .method-header,
:root[data-theme="light"] .method-footer,
:root[data-theme="light"] .color-input,
:root[data-theme="light"] .tag-badge,
:root[data-theme="light"] .editor-toolbar,
:root[data-theme="light"] .preview-container {
  background-color: #f9fafb;
  border-color: #e5e7eb;
}

:root[data-theme="light"] .tab-btn.active,
:root[data-theme="light"] .toggle-btn.active {
  background-color: #ffffff;
  color: #111827;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

:root[data-theme="light"] .form-control {
  color: #111827;
}

:root[data-theme="light"] select.form-control option {
  background-color: #ffffff;
}

:root[data-theme="light"] .btn-primary {
  background-color: #111827;
  color: #ffffff;
}

:root[data-theme="light"] .btn-small {
  border-color: #d1d5db;
  color: #4b5563;
}

:root[data-theme="light"] .radio-btn.active {
  border-color: #111827;
}
:root[data-theme="light"] .radio-btn.active::after {
  background-color: #111827;
}

:root[data-theme="light"] .switch {
  background-color: #d1d5db;
}
:root[data-theme="light"] .switch.active {
  background-color: #111827;
}
:root[data-theme="light"] .switch.active::after {
  background-color: #ffffff;
}

:root[data-theme="light"] .action-buttons-bottom {
  border-top-color: #e5e7eb;
}

:root[data-theme="light"] .preview-empty-icon {
  background-color: #f3f4f6;
}
</style>
