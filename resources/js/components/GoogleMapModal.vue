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
            @keydown.enter.prevent="searchLocation"
          />
          <MapPin class="search-icon" :size="16" />
        </div>
        <button class="btn-location" @click="getCurrentLocation">
          <Navigation :size="14" class="mr-1" /> Lokasi Saya
        </button>
      </div>

      <div class="map-container" ref="mapContainer">
        <!-- Google Map will be rendered here -->
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
import { ref, onMounted, watch, nextTick, onBeforeUnmount } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin, Navigation } from 'lucide-vue-next';

const props = defineProps({
  show: Boolean,
  initialAddress: String
});

const emit = defineEmits(['close', 'select']);

const mapContainer = ref(null);
const searchInput = ref(null);
const searchQuery = ref('');

let map = null;
let marker = null;
let geocoder = null;
let searchBox = null;

const currentPosition = ref({ lat: -6.200000, lng: 106.816666 }); // Default Jakarta
const selectedAddress = ref('');

const initMap = async () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyPlaceholderKeyForDevelopmentOnly';
  
  const loader = new Loader({
    apiKey: apiKey,
    version: 'weekly',
    libraries: ['places']
  });

  try {
    const { Map } = await loader.importLibrary('maps');
    const { AdvancedMarkerElement } = await loader.importLibrary('marker');
    await loader.importLibrary('places');
    geocoder = new google.maps.Geocoder();

    map = new Map(mapContainer.value, {
      center: currentPosition.value,
      zoom: 15,
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      mapId: 'DEMO_MAP_ID', // Required for AdvancedMarkerElement
    });

    marker = new AdvancedMarkerElement({
      map,
      position: currentPosition.value,
      gmpDraggable: true,
      title: 'Pilih Lokasi'
    });

    marker.addListener('dragend', () => {
      const position = marker.position;
      currentPosition.value = { lat: position.lat, lng: position.lng };
      reverseGeocode(currentPosition.value);
    });

    map.addListener('click', (e) => {
      const position = e.latLng.toJSON();
      marker.position = position;
      currentPosition.value = position;
      reverseGeocode(position);
    });

    // Initialize SearchBox
    if (searchInput.value) {
      searchBox = new google.maps.places.SearchBox(searchInput.value);
      
      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (places.length == 0) return;

        const place = places[0];
        if (!place.geometry || !place.geometry.location) return;

        const position = place.geometry.location.toJSON();
        map.setCenter(position);
        map.setZoom(17);
        marker.position = position;
        currentPosition.value = position;
        
        searchQuery.value = place.formatted_address || place.name;
        selectedAddress.value = searchQuery.value;
      });
    }

    // Try to geocode initial address if provided
    if (props.initialAddress) {
      searchQuery.value = props.initialAddress;
      searchLocation();
    } else {
      getCurrentLocation();
    }

  } catch (e) {
    console.error("Google Maps API could not be loaded", e);
  }
};

const reverseGeocode = (latlng) => {
  if (!geocoder) return;
  geocoder.geocode({ location: latlng }, (results, status) => {
    if (status === 'OK') {
      if (results[0]) {
        searchQuery.value = results[0].formatted_address;
        selectedAddress.value = results[0].formatted_address;
      }
    }
  });
};

const searchLocation = () => {
  if (!geocoder || !searchQuery.value) return;
  geocoder.geocode({ address: searchQuery.value }, (results, status) => {
    if (status === 'OK') {
      const position = results[0].geometry.location.toJSON();
      map.setCenter(position);
      map.setZoom(17);
      marker.position = position;
      currentPosition.value = position;
      selectedAddress.value = results[0].formatted_address;
    } else {
      // Don't show alert, just silently fail or log
      console.warn('Lokasi tidak ditemukan: ' + status);
    }
  });
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
          map.setCenter(pos);
          map.setZoom(17);
          marker.position = pos;
        }
        currentPosition.value = pos;
        reverseGeocode(pos);
      },
      () => {
        console.warn('Geolocation failed or permission denied.');
      }
    );
  }
};

const closeModal = () => {
  emit('close');
};

const confirmLocation = () => {
  emit('select', selectedAddress.value || searchQuery.value);
  closeModal();
};

watch(() => props.show, async (newVal) => {
  if (newVal) {
    await nextTick();
    if (!map) {
      initMap();
    } else {
      // Reset position if opened again with new address
      if (props.initialAddress) {
        searchQuery.value = props.initialAddress;
        searchLocation();
      }
    }
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
  overflow: hidden;
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
}

.map-modal-footer {
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
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
