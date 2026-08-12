<template>
  <div v-if="show" class="map-modal-overlay" @click.self="closeModal">
    <div class="map-modal-content">
      <div class="map-modal-header">
        <h3>Pilih Lokasi di Peta</h3>
        <button class="close-btn" @click="closeModal">&times;</button>
      </div>
      
      <div class="map-search-bar">
        <div class="search-input-wrapper">
          <input 
            type="text" 
            ref="searchInput"
            v-model="searchQuery" 
            placeholder="Cari tempat di peta..." 
            class="map-search-input"
            @input="debouncedSearch"
            @keydown.enter.prevent="searchLocation"
          />
          <MapPin class="search-icon" :size="16" />
          
          <!-- Autocomplete Dropdown -->
          <ul v-if="searchResults.length > 0 && showSuggestions" class="autocomplete-list">
            <li v-for="result in searchResults" :key="result.place_id" @click="selectSearchResult(result)">
              {{ result.display_name }}
            </li>
          </ul>
        </div>
        <button class="btn-location" @click="getCurrentLocation">
          <Navigation :size="14" class="mr-1" /> Lokasi Saya
        </button>
      </div>

      <div class="map-container" ref="mapContainer">
        <!-- Leaflet Map will be rendered here -->
      </div>
      
      <div class="map-modal-footer">
        <span class="footer-hint">Klik atau drag pin untuk memilih lokasi</span>
        <div class="footer-actions">
          <button class="btn-cancel" @click="closeModal">Batal</button>
          <button class="btn-select" @click="confirmLocation">
            <MapPin :size="14" class="mr-1" /> Pilih Lokasi
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { MapPin, Navigation } from 'lucide-vue-next';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with bundlers
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const props = defineProps({
  show: Boolean,
  initialAddress: String
});

const emit = defineEmits(['close', 'select']);

const mapContainer = ref(null);
const searchInput = ref(null);
const searchQuery = ref('');
const searchResults = ref([]);
const showSuggestions = ref(false);
let searchTimeout = null;

let map = null;
let marker = null;

const currentPosition = ref({ lat: -6.200000, lng: 106.816666 }); // Default Jakarta
const selectedAddress = ref('');

const initMap = () => {
  if (map) {
    map.remove();
  }
  
  map = L.map(mapContainer.value).setView([currentPosition.value.lat, currentPosition.value.lng], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  marker = L.marker([currentPosition.value.lat, currentPosition.value.lng], {
    draggable: true
  }).addTo(map);

  marker.on('dragend', (e) => {
    const position = marker.getLatLng();
    currentPosition.value = { lat: position.lat, lng: position.lng };
    reverseGeocode(currentPosition.value);
  });

  map.on('click', (e) => {
    marker.setLatLng(e.latlng);
    currentPosition.value = { lat: e.latlng.lat, lng: e.latlng.lng };
    reverseGeocode(currentPosition.value);
  });

  if (props.initialAddress) {
    searchQuery.value = props.initialAddress;
    searchLocation();
  } else {
    getCurrentLocation();
  }
  
  // Close suggestions if clicked outside map area
  map.on('mousedown', () => {
    showSuggestions.value = false;
  });
};

const reverseGeocode = async (latlng) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng.lat}&lon=${latlng.lng}`);
    const data = await response.json();
    if (data && data.display_name) {
      searchQuery.value = data.display_name;
      selectedAddress.value = data.display_name;
    }
  } catch (err) {
    console.error('Reverse geocoding failed', err);
  }
};

const debouncedSearch = () => {
  clearTimeout(searchTimeout);
  if (!searchQuery.value || searchQuery.value.length < 3) {
    searchResults.value = [];
    showSuggestions.value = false;
    return;
  }
  
  searchTimeout = setTimeout(async () => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(searchQuery.value)}`);
      const data = await response.json();
      searchResults.value = data;
      showSuggestions.value = true;
    } catch (err) {
      console.error('Search failed', err);
    }
  }, 500);
};

const searchLocation = () => {
  if (searchResults.value.length > 0) {
    selectSearchResult(searchResults.value[0]);
  }
};

const selectSearchResult = (result) => {
  const lat = parseFloat(result.lat);
  const lng = parseFloat(result.lon);
  
  map.setView([lat, lng], 17);
  marker.setLatLng([lat, lng]);
  currentPosition.value = { lat, lng };
  
  searchQuery.value = result.display_name;
  selectedAddress.value = result.display_name;
  
  showSuggestions.value = false;
  searchResults.value = [];
};

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        if (map && marker) {
          map.setView([pos.lat, pos.lng], 17);
          marker.setLatLng([pos.lat, pos.lng]);
        }
        currentPosition.value = pos;
        reverseGeocode(pos);
      },
      (error) => {
        console.warn('Geolocation failed or permission denied:', error.message);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }
};

const closeModal = () => {
  showSuggestions.value = false;
  emit('close');
};

const confirmLocation = () => {
  emit('select', selectedAddress.value || searchQuery.value);
  closeModal();
};

watch(() => props.show, async (newVal) => {
  if (newVal) {
    await nextTick();
    initMap();
  }
});
</script>

<style scoped>
.map-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.map-modal-content {
  background: white;
  width: 90%;
  max-width: 700px;
  border-radius: 12px;
  overflow: visible; /* Important for dropdown */
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
}

.map-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.map-modal-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
}

.map-search-bar {
  padding: 1rem 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.search-input-wrapper {
  flex: 1;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.map-search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  outline: none;
  font-size: 0.95rem;
  box-sizing: border-box;
}

.map-search-input:focus {
  border-color: #111827;
}

.autocomplete-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-top: 4px;
  padding: 0;
  list-style: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 2000;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.autocomplete-list li {
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid #f3f4f6;
  font-size: 0.9rem;
  color: #111827;
}

.autocomplete-list li:hover {
  background: #f9fafb;
}

.autocomplete-list li:last-child {
  border-bottom: none;
}

.btn-location {
  display: flex;
  align-items: center;
  background: #fef2f2;
  color: #ef4444;
  border: 1px solid #fca5a5;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
  white-space: nowrap;
}

.btn-location:hover {
  background: #fee2e2;
}

.map-container {
  width: 100%;
  height: 400px;
  background: #e5e7eb;
  z-index: 10;
}

.map-modal-footer {
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  z-index: 20;
}

.footer-hint {
  font-size: 0.85rem;
  color: #6b7280;
}

.footer-actions {
  display: flex;
  gap: 0.75rem;
}

.btn-cancel {
  padding: 0.6rem 1.25rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  color: #374151;
}

.btn-select {
  display: flex;
  align-items: center;
  padding: 0.6rem 1.25rem;
  background: #111827;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.mr-1 {
  margin-right: 0.25rem;
}
</style>
