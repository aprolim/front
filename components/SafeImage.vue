<!-- components/SafeImage.vue -->
<template>
  <div class="safe-image-wrapper" :style="wrapperStyle">
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
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: 'Imagen' },
  imageClass: { type: String, default: 'w-full h-full object-cover' },
  imageStyle: { type: Object, default: () => ({}) },
  loadingStrategy: { type: String, default: 'lazy' },
  aspectRatio: { type: String, default: 'auto' },
  maxRetries: { type: Number, default: 8 },
  retryDelay: { type: Number, default: 500 },
  useCacheBust: { type: Boolean, default: true },
  persistent: { type: Boolean, default: true }
})

const imgRef = ref(null)
const currentSrc = ref('')
const retryCount = ref(0)
const isMounted = ref(false)
const retryTimer = ref(null)
const isLoaded = ref(false)
const maxRetriesReached = ref(false)

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

const resetState = () => {
  retryCount.value = 0
  isLoaded.value = false
  maxRetriesReached.value = false
  clearTimers()
  initSrc()
}

const onLoad = () => {
  retryCount.value = 0
  isLoaded.value = true
  maxRetriesReached.value = false
  clearTimers()
}

const onError = () => {
  retryCount.value++
  
  // Si superó el máximo de reintentos y no es persistente, no seguir
  if (retryCount.value >= props.maxRetries) {
    maxRetriesReached.value = true
    clearTimers()
    return
  }
  
  // Si es persistente, seguir reintentando indefinidamente
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

// Forzar recarga manual
const forceReload = () => {
  if (maxRetriesReached.value || !isLoaded.value) {
    retryCount.value = 0
    maxRetriesReached.value = false
    isLoaded.value = false
    
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

watch(() => props.src, (newSrc) => {
  if (newSrc !== currentSrc.value) {
    resetState()
    if (isMounted.value) {
      setTimeout(() => {
        if (imgRef.value) {
          imgRef.value.src = currentSrc.value
        }
      }, 50)
    }
  }
})

onMounted(() => {
  isMounted.value = true
  initSrc()
  
  setTimeout(() => {
    if (imgRef.value) {
      imgRef.value.src = currentSrc.value
    }
  }, 50)
})

onBeforeUnmount(() => {
  clearTimers()
})

// Exponer métodos
defineExpose({
  forceReload,
  isLoaded
})
</script>

<style scoped>
.safe-image-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>