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
const loadStartTime = ref(0)
const loadCount = ref(0)

// ✅ LOG: Cuando el componente se crea
console.log(`🖼️ [SafeImage] COMPONENTE CREADO para: ${props.src}`)

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
  loadStartTime.value = Date.now()
  loadCount.value++
  console.log(`🔄 [SafeImage] INICIANDO CARGA #${loadCount.value} para: ${url.substring(0, 50)}...`)
}

const resetState = () => {
  retryCount.value = 0
  isLoaded.value = false
  maxRetriesReached.value = false
  clearTimers()
  initSrc()
}

const onLoad = () => {
  const elapsed = Date.now() - loadStartTime.value
  console.log(`✅ [SafeImage] CARGA COMPLETADA #${loadCount.value} en ${elapsed}ms: ${props.src.substring(0, 50)}...`)
  retryCount.value = 0
  isLoaded.value = true
  maxRetriesReached.value = false
  clearTimers()
}

const onError = () => {
  retryCount.value++
  console.warn(`⚠️ [SafeImage] ERROR #${retryCount.value} en carga #${loadCount.value}: ${props.src.substring(0, 50)}...`)
  
  if (retryCount.value >= props.maxRetries) {
    maxRetriesReached.value = true
    clearTimers()
    console.error(`❌ [SafeImage] MÁXIMO DE REINTENTOS ALCANZADO para: ${props.src}`)
    return
  }
  
  if (props.persistent) {
    const delay = props.retryDelay * Math.pow(1.5, retryCount.value - 1)
    console.log(`🔄 [SafeImage] Reintentando en ${delay}ms (intento ${retryCount.value}/${props.maxRetries})`)
    
    clearTimers()
    retryTimer.value = setTimeout(() => {
      if (imgRef.value) {
        const url = props.src
        currentSrc.value = props.useCacheBust ? getUrlWithCacheBust(url, retryCount.value) : url
        imgRef.value.src = currentSrc.value
        console.log(`🔄 [SafeImage] REINTENTO #${retryCount.value} para: ${url.substring(0, 50)}...`)
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

watch(() => props.src, (newSrc, oldSrc) => {
  if (newSrc !== oldSrc) {
    console.log(`🔄 [SafeImage] SRC CAMBIADO: ${oldSrc?.substring(0, 30)}... → ${newSrc?.substring(0, 30)}...`)
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
  console.log(`🎬 [SafeImage] MONTADO: ${props.src.substring(0, 50)}...`)
  
  setTimeout(() => {
    if (imgRef.value) {
      imgRef.value.src = currentSrc.value
    }
  }, 50)
})

onBeforeUnmount(() => {
  console.log(`🗑️ [SafeImage] DESMONTADO: ${props.src.substring(0, 50)}...`)
  clearTimers()
})

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