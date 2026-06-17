<!-- components/ReliableImage.vue -->
<template>
  <div class="reliable-image-wrapper" :style="wrapperStyle">
    <!-- Skeleton de carga -->
    <div v-if="loading && showSkeleton" class="image-skeleton">
      <div class="skeleton-pulse"></div>
    </div>
    
    <!-- Imagen principal -->
    <img
      ref="imgRef"
      :src="currentSrc"
      :alt="alt"
      :loading="loadingStrategy"
      :class="imageClass"
      :style="imageStyle"
      @load="onLoad"
      @error="onError"
    />
    
    <!-- Estado de error con reintento -->
    <div v-if="hasError && !loading" class="image-error">
      <div class="error-content">
        <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span class="error-text">No se pudo cargar la imagen</span>
        <button @click="retry" class="retry-btn">
          Reintentar
        </button>
        <span class="retry-count">Intento {{ retryCount }} de {{ maxRetries }}</span>
      </div>
    </div>
    
    <!-- Fallback (placeholder) -->
    <img
      v-if="showPlaceholder && hasError && !loading && fallbackSrc"
      :src="fallbackSrc"
      :alt="alt"
      class="w-full h-full object-cover"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

// ✅ CORREGIDO: Usar sintaxis de objetos con defineProps directamente
const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: 'Imagen' },
  fallbackSrc: { type: String, default: '/images/placeholder.jpg' },
  imageClass: { type: String, default: 'w-full h-full object-cover' },
  imageStyle: { type: Object, default: () => ({}) },
  loadingStrategy: { type: String, default: 'lazy' },
  aspectRatio: { type: String, default: 'auto' },
  showSkeleton: { type: Boolean, default: true },
  maxRetries: { type: Number, default: 5 },
  retryDelay: { type: Number, default: 500 },
  useCacheBust: { type: Boolean, default: true }
})

// Refs
const imgRef = ref(null)
const currentSrc = ref('')
const loading = ref(true)
const hasError = ref(false)
const retryCount = ref(0)
const isMounted = ref(false)
const retryTimer = ref(null)
const loadTimeout = ref(null)

// Limpiar timers
const clearAllTimers = () => {
  if (retryTimer.value) {
    clearTimeout(retryTimer.value)
    retryTimer.value = null
  }
  if (loadTimeout.value) {
    clearTimeout(loadTimeout.value)
    loadTimeout.value = null
  }
}

// Generar URL con cache buster
const getUrlWithCacheBust = (url, retry = 0) => {
  if (!props.useCacheBust) return url
  
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}_t=${Date.now()}&_retry=${retry}`
}

// Inicializar src
const initSrc = () => {
  const url = props.src || ''
  currentSrc.value = props.useCacheBust ? getUrlWithCacheBust(url, 0) : url
}

// Reiniciar estado
const resetState = () => {
  loading.value = true
  hasError.value = false
  retryCount.value = 0
  clearAllTimers()
  initSrc()
}

// Cargar imagen con timeout
const loadWithTimeout = () => {
  clearAllTimers()
  
  // Timeout de 15 segundos
  loadTimeout.value = setTimeout(() => {
    if (loading.value && !hasError.value) {
      console.warn(`[ReliableImage] Timeout cargando: ${props.src}`)
      onError()
    }
  }, 15000)
}

const onLoad = () => {
  loading.value = false
  hasError.value = false
  retryCount.value = 0
  clearAllTimers()
}

const onError = () => {
  retryCount.value++
  
  if (retryCount.value < props.maxRetries) {
    // Reintentar con backoff exponencial
    const delay = props.retryDelay * Math.pow(1.8, retryCount.value - 1)
    
    clearAllTimers()
    retryTimer.value = setTimeout(() => {
      if (imgRef.value) {
        const url = props.src
        currentSrc.value = props.useCacheBust ? getUrlWithCacheBust(url, retryCount.value) : url
        imgRef.value.src = currentSrc.value
        loadWithTimeout()
      }
    }, delay)
  } else {
    loading.value = false
    hasError.value = true
    clearAllTimers()
  }
}

const retry = () => {
  if (!hasError.value) return
  
  // Resetear estado y reintentar
  retryCount.value = 0
  hasError.value = false
  loading.value = true
  
  const url = props.src
  currentSrc.value = props.useCacheBust ? getUrlWithCacheBust(url, 0) : url
  
  if (imgRef.value) {
    imgRef.value.src = currentSrc.value
    loadWithTimeout()
  }
}

// Computed
const wrapperStyle = computed(() => {
  if (props.aspectRatio && props.aspectRatio !== 'auto') {
    return { aspectRatio: props.aspectRatio }
  }
  return {}
})

const showPlaceholder = computed(() => {
  return hasError.value && !loading.value && !!props.fallbackSrc
})

// Watchers
watch(() => props.src, (newSrc, oldSrc) => {
  if (newSrc !== oldSrc) {
    resetState()
    if (isMounted.value) {
      setTimeout(() => {
        if (imgRef.value) {
          imgRef.value.src = currentSrc.value
          loadWithTimeout()
        }
      }, 50)
    }
  }
})

// Lifecycle
onMounted(() => {
  isMounted.value = true
  initSrc()
  
  // Forzar carga después del montaje
  setTimeout(() => {
    if (imgRef.value && loading.value) {
      imgRef.value.src = currentSrc.value
      loadWithTimeout()
    }
  }, 50)
  
  // Reintentar después de 2 segundos si sigue cargando
  setTimeout(() => {
    if (loading.value && !hasError.value) {
      console.log(`[ReliableImage] Reintentando carga forzada: ${props.src}`)
      if (imgRef.value) {
        const url = props.src
        currentSrc.value = props.useCacheBust ? getUrlWithCacheBust(url, retryCount.value + 1) : url
        imgRef.value.src = currentSrc.value
        loadWithTimeout()
      }
    }
  }, 2000)
})

onBeforeUnmount(() => {
  clearAllTimers()
})
</script>

<style scoped>
.reliable-image-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: #f3f4f6;
}

.image-skeleton {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skeleton-pulse {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.image-error {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(249, 250, 251, 0.95);
}

.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  text-align: center;
}

.error-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: #9ca3af;
}

.error-text {
  font-size: 0.75rem;
  color: #6b7280;
}

.retry-btn {
  padding: 0.25rem 1rem;
  background: #E03636;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 500;
  transition: background 0.2s;
}

.retry-btn:hover {
  background: #C12F2F;
}

.retry-count {
  font-size: 0.6rem;
  color: #9ca3af;
}
</style>