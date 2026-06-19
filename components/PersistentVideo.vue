<template>
  <div class="persistent-video-wrapper relative">
    <!-- Skeleton mientras carga -->
    <div v-if="isLoading && !isLoaded" class="video-skeleton">
      <div class="skeleton-pulse"></div>
      <div class="loading-indicator">
        <div class="spinner"></div>
        <span>Cargando video...</span>
      </div>
    </div>
    
    <!-- Video - usa src del store si está disponible -->
    <video
      ref="videoRef"
      :src="videoSrc"
      :poster="poster"
      :autoplay="autoplay"
      :loop="loop"
      :muted="muted"
      :playsinline="playsinline"
      :controls="controls"
      class="w-full h-full object-cover"
      @loadeddata="onLoaded"
      @error="onError"
      @canplay="onCanPlay"
      @waiting="onWaiting"
    >
      Tu navegador no soporta videos HTML5.
    </video>
    
    <!-- Estado de error -->
    <div v-if="error && !isLoading" class="video-error">
      <div class="error-content">
        <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p class="error-text">No se pudo cargar el video</p>
        <button @click="retry" class="retry-btn">
          Reintentar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useVideoStore } from '~/stores/videoStore'

const props = defineProps({
  src: { type: String, required: true },
  poster: { type: String, default: '' },
  autoplay: { type: Boolean, default: false },
  loop: { type: Boolean, default: false },
  muted: { type: Boolean, default: true },
  playsinline: { type: Boolean, default: true },
  controls: { type: Boolean, default: false }
})

const videoStore = useVideoStore()

const videoRef = ref(null)
const isLoaded = ref(false)
const isLoading = ref(true)
const error = ref(null)
const retryCount = ref(0)

// ✅ Usar URL del store si existe, sino usar src directo
const videoSrc = computed(() => {
  // Si el store ya tiene el video cargado, usar esa URL
  if (videoStore.isVideoLoaded() && videoStore.getVideoUrl()) {
    console.log('📹 Usando video desde store')
    return videoStore.getVideoUrl()
  }
  // Sino, usar el src original (se cargará y se guardará en store)
  return props.src
})

// Cargar video usando el store
const loadVideo = async () => {
  if (videoStore.isVideoLoaded() && videoStore.getVideoUrl()) {
    // Ya está cargado en store
    isLoaded.value = true
    isLoading.value = false
    return
  }
  
  isLoading.value = true
  error.value = null
  
  try {
    const url = await videoStore.loadVideo(props.src)
    if (url) {
      isLoaded.value = true
      // Forzar recarga del video element
      if (videoRef.value) {
        videoRef.value.src = url
        videoRef.value.load()
      }
    } else {
      throw new Error('No se pudo cargar el video')
    }
  } catch (err) {
    console.error('❌ Error en loadVideo:', err)
    error.value = err.message
    retryCount.value++
    
    if (retryCount.value < 3) {
      setTimeout(() => {
        loadVideo()
      }, 2000 * retryCount.value)
    }
  } finally {
    isLoading.value = false
  }
}

const onLoaded = () => {
  isLoaded.value = true
  isLoading.value = false
  error.value = null
  retryCount.value = 0
}

const onError = () => {
  if (!isLoaded.value) {
    isLoading.value = false
    error.value = 'Error al cargar el video'
  }
}

const onCanPlay = () => {
  isLoaded.value = true
  isLoading.value = false
}

const onWaiting = () => {
  if (!isLoaded.value) {
    isLoading.value = true
  }
}

const retry = () => {
  retryCount.value = 0
  error.value = null
  isLoading.value = true
  loadVideo()
}

// Montar componente
onMounted(() => {
  loadVideo()
})

// Limpiar cuando se destruye el componente
onBeforeUnmount(() => {
  // No destruimos el video en store, solo el elemento DOM
  if (videoRef.value) {
    videoRef.value.pause()
    videoRef.value.src = ''
  }
})

// Exponer métodos
defineExpose({
  videoRef,
  isLoaded,
  isLoading,
  error,
  retry,
  loadVideo
})
</script>

<style scoped>
.persistent-video-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #1a1a1a;
}

.video-skeleton {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
}

.skeleton-pulse {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
  background-size: 200% 100%;
  animation: pulse 1.5s ease-in-out infinite;
}

.loading-indicator {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: white;
}

.spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: #E03636;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.video-error {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
}

.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: white;
}

.error-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: #9ca3af;
}

.error-text {
  font-size: 0.875rem;
  color: #9ca3af;
}

.retry-btn {
  padding: 0.5rem 1.5rem;
  background: #E03636;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}

.retry-btn:hover {
  background: #C12F2F;
}
</style>