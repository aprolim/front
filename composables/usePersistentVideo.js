// composables/usePersistentVideo.js
export const usePersistentVideo = (videoSrc) => {
  const videoRef = ref(null)
  const isLoaded = ref(false)
  const isLoading = ref(false)
  const error = ref(null)
  
  // Verificar si el video está en caché
  const checkVideoCache = async (url) => {
    if (typeof caches === 'undefined') return false
    try {
      const cache = await caches.open('senado-videos-v2')
      const response = await cache.match(url)
      return !!response
    } catch {
      return false
    }
  }
  
  // Cargar video desde caché o red
  const loadVideo = async (src) => {
    if (!src) return
    
    isLoading.value = true
    error.value = null
    
    try {
      // Verificar caché
      const inCache = await checkVideoCache(src)
      
      if (inCache) {
        console.log('📹 Video desde caché:', src)
        // Si está en caché, el Service Worker lo servirá
        if (videoRef.value) {
          videoRef.value.src = src
          // Forzar carga desde caché
          videoRef.value.load()
        }
        isLoaded.value = true
        isLoading.value = false
        return
      }
      
      console.log('📹 Descargando video:', src)
      
      // Descargar y almacenar en caché
      const response = await fetch(src, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      
      if (!response.ok) throw new Error('Error al descargar video')
      
      // Almacenar en caché
      if (typeof caches !== 'undefined') {
        const cache = await caches.open('senado-videos-v2')
        await cache.put(src, response.clone())
        console.log('📹 Video almacenado en caché')
      }
      
      if (videoRef.value) {
        videoRef.value.src = src
        videoRef.value.load()
      }
      
      isLoaded.value = true
      
    } catch (err) {
      console.error('❌ Error cargando video:', err)
      error.value = err.message
      
      // Reintentar después de 2 segundos
      setTimeout(() => {
        if (!isLoaded.value) {
          loadVideo(src)
        }
      }, 2000)
    } finally {
      isLoading.value = false
    }
  }
  
  // Reintentar carga
  const retry = () => {
    if (videoSrc.value) {
      loadVideo(videoSrc.value)
    }
  }
  
  // Watcher para cuando cambia el src
  watch(() => videoSrc, (newSrc) => {
    if (newSrc) {
      loadVideo(newSrc)
    }
  }, { immediate: true })
  
  return {
    videoRef,
    isLoaded,
    isLoading,
    error,
    loadVideo,
    retry
  }
}