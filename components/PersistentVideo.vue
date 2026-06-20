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

    <!-- Video principal -->
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
      @loadeddata="onLoadedData"
      @canplay="onCanPlay"
      @error="onError"
      @waiting="onWaiting"
      @loadedmetadata="onLoadedMetadata"
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
        <button @click="retry" class="retry-btn">Reintentar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
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

const isClient = typeof window !== 'undefined'
const videoStore = useVideoStore()

const videoRef = ref(null)
const isLoaded = ref(false)
const isLoading = ref(true)
const error = ref(null)
const retryCount = ref(0)

// URL del video (desde store o src original)
const videoSrc = computed(() => {
  if (!isClient) return props.src
  if (videoStore.isVideoLoaded() && videoStore.getVideoUrl()) {
    console.log('📹 [PersistentVideo] Usando video DESDE EL STORE')
    return videoStore.getVideoUrl()
  }
  console.log('📹 [PersistentVideo] Video NO está en store, usando src original')
  return props.src
})

// Cargar video (solo en cliente)
const loadVideo = async () => {
  if (!isClient) {
    console.log('📹 [PersistentVideo] SSR - Ignorando carga')
    return
  }

  console.log('🔍 [PersistentVideo] loadVideo() llamado')
  console.log('🔍 [PersistentVideo] Store tiene video?', videoStore.isVideoLoaded())

  if (videoStore.isVideoLoaded() && videoStore.getVideoUrl()) {
    console.log('✅ [PersistentVideo] Video YA ESTÁ EN STORE')
    isLoaded.value = true
    isLoading.value = false
    
    await nextTick()
    const video = videoRef.value
    if (video) {
      const url = videoStore.getVideoUrl()
      console.log('📹 [PersistentVideo] Asignando URL del store al video:', url.substring(0, 50) + '...')
      video.src = url
      video.load()
      
      try {
        await video.play()
        console.log('✅ [PersistentVideo] Video reproduciéndose desde store')
      } catch (playError) {
        console.warn('⚠️ [PersistentVideo] Autoplay bloqueado:', playError.message)
      }
    }
    return
  }

  console.log('🔄 [PersistentVideo] Video NO está en store, descargando...')
  isLoading.value = true
  error.value = null

  try {
    const url = await videoStore.loadVideo(props.src)
    if (url) {
      console.log('✅ [PersistentVideo] Video descargado y guardado en store')
      isLoaded.value = true
      
      await nextTick()
      const video = videoRef.value
      if (video) {
        video.src = url
        video.load()
        try {
          await video.play()
          console.log('✅ [PersistentVideo] Video reproduciéndose')
        } catch (playError) {
          console.warn('⚠️ [PersistentVideo] Autoplay bloqueado:', playError.message)
        }
      }
    } else {
      throw new Error('No se pudo cargar el video')
    }
  } catch (err) {
    console.error('❌ [PersistentVideo] Error:', err.message)
    error.value = err.message
    retryCount.value++
    if (retryCount.value < 3) {
      console.log(`🔄 [PersistentVideo] Reintento ${retryCount.value} en ${2000 * retryCount.value}ms`)
      setTimeout(() => loadVideo(), 2000 * retryCount.value)
    }
  } finally {
    isLoading.value = false
  }
}

// Eventos del video
const onLoadedData = () => {
  console.log('✅ [PersistentVideo] Video cargado (loadeddata)')
  isLoaded.value = true
  isLoading.value = false
  error.value = null
  retryCount.value = 0
  if (videoRef.value && videoRef.value.paused) {
    videoRef.value.play().catch(() => {})
  }
}

const onLoadedMetadata = () => {
  console.log('✅ [PersistentVideo] Metadatos cargados (loadedmetadata)')
  isLoaded.value = true
  isLoading.value = false
}

const onCanPlay = () => {
  console.log('✅ [PersistentVideo] Video listo para reproducir (canplay)')
  isLoaded.value = true
  isLoading.value = false
  if (videoRef.value && videoRef.value.paused) {
    videoRef.value.play().catch(() => {})
  }
}

const onError = (e) => {
  // ✅ Si el video ya está cargado y hay error, ignorar (puede ser por desmontaje)
  if (isLoaded.value) {
    console.log('⚠️ [PersistentVideo] Error ignorado (video ya cargado)')
    return
  }
  
  console.error('❌ [PersistentVideo] Error en video:', e)
  console.log('❌ [PersistentVideo] src actual:', videoRef.value?.src)
  
  // Si no hay src, ignorar el error
  if (!props.src) {
    console.log('📹 [PersistentVideo] Sin src, ignorando error')
    return
  }
  
  // Si hay error y el src es un blob, intentar usar el src original
  if (videoRef.value && videoRef.value.src && videoRef.value.src.startsWith('blob:')) {
    console.log('🔄 [PersistentVideo] Error con blob URL, intentando con src original')
    videoRef.value.src = props.src
    videoRef.value.load()
    return
  }
  
  if (!isLoaded.value) {
    isLoading.value = false
    error.value = 'Error al cargar el video'
  }
}

const onWaiting = () => {
  if (!isLoaded.value) {
    console.log('⏳ [PersistentVideo] Video en espera (buffering)')
    isLoading.value = true
  }
}

const retry = () => {
  console.log('🔄 [PersistentVideo] Reintentando carga manual')
  retryCount.value = 0
  error.value = null
  isLoading.value = true
  videoStore.clearVideo()
  loadVideo()
}

// Ciclo de vida
onMounted(() => {
  console.log('🎬 [PersistentVideo] Componente montado, src:', props.src)
  loadVideo()
})

// ✅ Manejar el desmontaje correctamente
onBeforeUnmount(() => {
  console.log('🗑️ [PersistentVideo] Componente desmontando')
  
  // ✅ Limpiar el video sin generar errores
  if (videoRef.value) {
    try {
      videoRef.value.pause()
      // ✅ NO eliminar el src para evitar errores
      // videoRef.value.src = ''  // <- ESTO CAUSABA EL ERROR
      videoRef.value.load()
    } catch (err) {
      console.log('⚠️ [PersistentVideo] Error al limpiar video:', err.message)
    }
  }
})

// Watch para cambios en src
watch(() => props.src, (newSrc, oldSrc) => {
  if (isClient && newSrc !== oldSrc) {
    console.log('🔄 [PersistentVideo] src cambiado:', oldSrc, '→', newSrc)
    loadVideo()
  }
})

// Watch para cambios en videoSrc
watch(videoSrc, (newSrc) => {
  if (isClient && newSrc && videoRef.value) {
    console.log('🔄 [PersistentVideo] videoSrc cambiado, actualizando video')
    videoRef.value.src = newSrc
    videoRef.value.load()
  }
})

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