<!-- components/SafeImage.vue -->
<template>
  <div 
    ref="wrapperRef"
    class="safe-image-wrapper" 
    :style="wrapperStyle"
  >
    <!-- Skeleton de carga (solo si está cargando) -->
    <div v-if="isLoading && showSkeleton" class="image-skeleton">
      <div class="skeleton-pulse"></div>
    </div>
    
    <img
      ref="imgRef"
      :src="currentSrc"
      :alt="alt"
      :loading="loadingStrategy"
      :class="imageClass"
      :style="imageStyle"
      :fetchpriority="actualPriority"
      @load="onLoad"
      @error="onError"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: 'Imagen' },
  imageClass: { type: String, default: 'w-full h-full object-cover' },
  imageStyle: { type: Object, default: () => ({}) },
  loadingStrategy: { type: String, default: 'lazy' },
  aspectRatio: { type: String, default: 'auto' },
  maxRetries: { type: Number, default: 8 },
  retryDelay: { type: Number, default: 500 },
  useCacheBust: { type: Boolean, default: false },
  persistent: { type: Boolean, default: true },
  // ✅ Prioridad manual (opcional, si no se usa, se detecta automáticamente)
  priority: { 
    type: String, 
    default: 'auto',
    validator: (value) => ['high', 'low', 'auto'].includes(value)
  },
  showSkeleton: { type: Boolean, default: true },
  // ✅ Tiempo de espera para considerar que la imagen es visible
  visibilityThreshold: { type: Number, default: 0.1 }
})

const wrapperRef = ref(null)
const imgRef = ref(null)
const currentSrc = ref('')
const retryCount = ref(0)
const isMounted = ref(false)
const retryTimer = ref(null)
const isLoaded = ref(false)
const maxRetriesReached = ref(false)
const isLoading = ref(true)
const isVisible = ref(false)
const hasStartedLoading = ref(false)
let intersectionObserver = null

// ✅ Prioridad real: si el usuario lo definió manualmente, usar eso, sino detectar
const actualPriority = computed(() => {
  if (props.priority !== 'auto') return props.priority
  // Si la imagen es visible, prioridad alta
  return isVisible.value ? 'high' : 'low'
})

// ✅ Loading strategy: si es visible, eager, sino lazy
const actualLoadingStrategy = computed(() => {
  if (isVisible.value) return 'eager'
  return props.loadingStrategy || 'lazy'
})

const clearTimers = () => {
  if (retryTimer.value) {
    clearTimeout(retryTimer.value)
    retryTimer.value = null
  }
}

const getUrlWithCacheBust = (url, retry = 0) => {
  if (!props.useCacheBust) return url
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}_t=${Date.now()}&_retry=${retry}`
}

const initSrc = () => {
  const url = props.src || ''
  currentSrc.value = props.useCacheBust ? getUrlWithCacheBust(url, 0) : url
}

const startLoading = () => {
  if (hasStartedLoading.value) return
  hasStartedLoading.value = true
  isLoading.value = true
  initSrc()
  if (imgRef.value) {
    imgRef.value.src = currentSrc.value
  }
}

const resetState = () => {
  retryCount.value = 0
  isLoaded.value = false
  maxRetriesReached.value = false
  isLoading.value = true
  hasStartedLoading.value = false
  clearTimers()
  initSrc()
}

const onLoad = () => {
  retryCount.value = 0
  isLoaded.value = true
  maxRetriesReached.value = false
  isLoading.value = false
  clearTimers()
}

const onError = () => {
  retryCount.value++
  
  if (retryCount.value >= props.maxRetries) {
    maxRetriesReached.value = true
    isLoading.value = false
    clearTimers()
    return
  }
  
  if (props.persistent) {
    const delay = props.retryDelay * Math.pow(1.5, retryCount.value - 1)
    
    clearTimers()
    retryTimer.value = setTimeout(() => {
      if (imgRef.value) {
        const url = props.src
        currentSrc.value = props.useCacheBust ? getUrlWithCacheBust(url, retryCount.value) : url
        imgRef.value.src = currentSrc.value
      }
    }, delay)
  } else {
    clearTimers()
  }
}

const forceReload = () => {
  if (maxRetriesReached.value || !isLoaded.value) {
    retryCount.value = 0
    maxRetriesReached.value = false
    isLoaded.value = false
    isLoading.value = true
    hasStartedLoading.value = false
    
    const url = props.src
    currentSrc.value = props.useCacheBust ? getUrlWithCacheBust(url, 0) : url
    
    if (imgRef.value) {
      imgRef.value.src = currentSrc.value
    }
  }
}

const wrapperStyle = computed(() => {
  if (props.aspectRatio && props.aspectRatio !== 'auto') {
    return { aspectRatio: props.aspectRatio }
  }
  return {}
})

// ✅ Configurar IntersectionObserver para detectar visibilidad
const setupIntersectionObserver = () => {
  if (typeof window === 'undefined' || !wrapperRef.value) return
  
  // Si ya existe, desconectar
  if (intersectionObserver) {
    intersectionObserver.disconnect()
  }
  
  intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const wasVisible = isVisible.value
        isVisible.value = entry.isIntersecting
        
        // Si se vuelve visible y no ha empezado a cargar, empezar
        if (isVisible.value && !hasStartedLoading.value) {
          startLoading()
        }
        
        // Si cambia la visibilidad, log para depuración
        if (wasVisible !== isVisible.value) {
          console.log(`🖼️ [SafeImage] Visibilidad: ${isVisible.value ? '🟢 VISIBLE' : '🔴 OCULTA'} - ${props.src.substring(0, 40)}...`)
        }
      })
    },
    {
      threshold: props.visibilityThreshold,
      rootMargin: '50px' // Pre-carga cuando está a 50px del viewport
    }
  )
  
  intersectionObserver.observe(wrapperRef.value)
}

// ✅ Forzar carga si la imagen ya es visible al montar
const checkInitialVisibility = () => {
  if (typeof window === 'undefined' || !wrapperRef.value) return
  
  const rect = wrapperRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight || document.documentElement.clientHeight
  
  // Si la imagen está en el viewport o cerca
  if (rect.top < windowHeight + 100 && rect.bottom > -100) {
    isVisible.value = true
    startLoading()
  }
}

watch(() => props.src, (newSrc) => {
  if (newSrc !== currentSrc.value) {
    resetState()
    if (isMounted.value) {
      // Si la imagen es visible, cargar inmediatamente
      if (isVisible.value) {
        startLoading()
      }
    }
  }
})

onMounted(() => {
  isMounted.value = true
  initSrc()
  
  // Esperar a que el DOM esté listo
  nextTick(() => {
    // Verificar si es visible inicialmente
    checkInitialVisibility()
    // Configurar observer
    setupIntersectionObserver()
    
    // Si no es visible, esperar a que lo sea
    if (!isVisible.value) {
      console.log(`⏳ [SafeImage] Esperando visibilidad: ${props.src.substring(0, 40)}...`)
    }
  })
})

onBeforeUnmount(() => {
  clearTimers()
  if (intersectionObserver) {
    intersectionObserver.disconnect()
    intersectionObserver = null
  }
})

defineExpose({
  forceReload,
  isLoaded,
  isVisible
})
</script>

<style scoped>
.safe-image-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
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

img {
  position: relative;
  z-index: 2;
}
</style>