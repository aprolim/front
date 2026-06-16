<!-- components/AppImage.vue -->
<template>
  <div class="app-image-wrapper" :style="wrapperStyle">
    <!-- Skeleton de carga -->
    <div v-if="isLoading && showSkeleton" class="image-skeleton">
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
    <div v-if="hasError && !isLoading" class="image-error">
      <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <button @click="retry" class="retry-btn">
        Reintentar
      </button>
    </div>
    
    <!-- Fallback (placeholder) -->
    <img
      v-if="showPlaceholder && hasError && !isLoading"
      :src="fallbackSrc"
      :alt="alt"
      class="w-full h-full object-cover"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

// Definición de props con tipos explícitos
interface Props {
  src: string
  alt?: string
  fallbackSrc?: string
  loadingStrategy?: 'lazy' | 'eager'
  aspectRatio?: string
  imageClass?: string
  imageStyle?: Record<string, any>
  showSkeleton?: boolean
  maxRetries?: number
  retryDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  alt: 'Imagen',
  fallbackSrc: '/images/placeholder.jpg',
  loadingStrategy: 'lazy',
  aspectRatio: 'auto',
  imageClass: 'w-full h-full object-cover',
  imageStyle: () => ({}),
  showSkeleton: true,
  maxRetries: 3,
  retryDelay: 500
})

// Refs con tipos explícitos
const imgRef = ref<HTMLImageElement | null>(null)
const currentSrc = ref<string>(props.src)
const isLoading = ref<boolean>(true)
const hasError = ref<boolean>(false)
const retryCount = ref<number>(0)
const isMounted = ref<boolean>(false)

// Computed con tipos explícitos
const wrapperStyle = computed<Record<string, any>>(() => {
  if (props.aspectRatio && props.aspectRatio !== 'auto') {
    return { aspectRatio: props.aspectRatio }
  }
  return {}
})

const showPlaceholder = computed<boolean>(() => {
  return hasError.value && !isLoading.value && !!props.fallbackSrc
})

// Métodos con tipos explícitos
const onLoad = (): void => {
  isLoading.value = false
  hasError.value = false
  retryCount.value = 0
}

const onError = (): void => {
  retryCount.value++
  
  if (retryCount.value < props.maxRetries) {
    // Reintentar con query param para evitar caché
    const separator = currentSrc.value.includes('?') ? '&' : '?'
    const timestamp = Date.now()
    currentSrc.value = `${props.src}${separator}retry=${retryCount.value}&t=${timestamp}`
    
    // Esperar y reintentar
    setTimeout((): void => {
      if (imgRef.value) {
        imgRef.value.src = currentSrc.value
      }
    }, props.retryDelay * Math.pow(1.5, retryCount.value - 1))
  } else {
    isLoading.value = false
    hasError.value = true
  }
}

const retry = (): void => {
  retryCount.value = 0
  hasError.value = false
  isLoading.value = true
  
  const separator = currentSrc.value.includes('?') ? '&' : '?'
  currentSrc.value = `${props.src}${separator}t=${Date.now()}`
  
  if (imgRef.value) {
    imgRef.value.src = currentSrc.value
  }
}

// Resetear estado cuando cambia la src
watch(
  () => props.src,
  (newSrc: string): void => {
    if (newSrc !== currentSrc.value) {
      currentSrc.value = newSrc
      isLoading.value = true
      hasError.value = false
      retryCount.value = 0
    }
  }
)

// Lifecycle
onMounted((): void => {
  isMounted.value = true
})
</script>

<style scoped>
.app-image-wrapper {
  position: relative;
  overflow: hidden;
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(249, 250, 251, 0.95);
  color: #6b7280;
  gap: 0.5rem;
}

.error-icon {
  width: 3rem;
  height: 3rem;
  color: #9ca3af;
}

.retry-btn {
  padding: 0.25rem 0.75rem;
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
</style>