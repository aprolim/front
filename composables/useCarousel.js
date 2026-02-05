// composables/useCarousel.js
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

export function useCarousel(heroMedia = []) {
  const route = useRoute()
  
  // Estados reactivos para configuración
  const useVideo = ref(false)
  const mediaCount = ref(3)
  const transitionTime = ref(5000)
  const currentMediaIndex = ref(0)
  
  let carouselInterval = null

  // Actualizar configuración basada en query params
  const updateConfigFromQuery = () => {
    const query = route.query
    
    // Verificar si hay parámetro video en la URL
    const hasVideoParam = 'video' in query
    
    if (hasVideoParam) {
      useVideo.value = query.video === 'true' || query.video === '1'
    } else {
      useVideo.value = false
    }
    
    if (query.images) {
      mediaCount.value = parseInt(query.images) || 3
    }
    
    if (query.transition) {
      transitionTime.value = parseInt(query.transition) || 5000
    }
  }

  // Watch para cambios en la ruta
  watch(() => route.query, () => {
    updateConfigFromQuery()
    setTimeout(() => {
      startCarousel()
    }, 100)
  }, { immediate: true })

  // Filtrar media según configuración
  const filteredHeroMedia = computed(() => {
    let media = [...heroMedia]
    
    if (useVideo.value) {
      // Filtrar SOLO el video
      const video = media.find(m => m.type === 'video')
      if (video) {
        return [video]
      }
      return []
    } else {
      // Filtrar SOLO imágenes, sin video
      media = media.filter(m => m.type === 'image')
      return media.slice(0, mediaCount.value)
    }
  })

  // Carrusel automático
  const startCarousel = () => {
    // Solo ejecutar en cliente
    if (typeof window === 'undefined') return
    
    clearInterval(carouselInterval)
    
    if (filteredHeroMedia.value.length === 0) {
      return
    }
    
    // Reiniciar índice
    currentMediaIndex.value = 0
    
    // Si es SOLO VIDEO, no necesitamos intervalo
    if (useVideo.value) {
      return
    }
    
    // Solo para imágenes: establecer intervalo de cambio
    if (filteredHeroMedia.value.length > 1) {
      carouselInterval = setInterval(() => {
        nextMedia()
      }, transitionTime.value)
    }
  }

  const nextMedia = () => {
    if (filteredHeroMedia.value.length <= 1) return
    
    const newIndex = (currentMediaIndex.value + 1) % filteredHeroMedia.value.length
    currentMediaIndex.value = newIndex
  }

  const goToMedia = (index) => {
    if (index >= 0 && index < filteredHeroMedia.value.length) {
      currentMediaIndex.value = index
      if (!useVideo.value) {
        startCarousel()
      }
    }
  }

  // Pausar/reanudar carrusel (solo para imágenes)
  const pauseCarousel = () => {
    if (carouselInterval && !useVideo.value) {
      clearInterval(carouselInterval)
    }
  }

  const resumeCarousel = () => {
    if (!useVideo.value && filteredHeroMedia.value.length > 1) {
      startCarousel()
    }
  }

  return {
    useVideo,
    mediaCount,
    transitionTime,
    currentMediaIndex,
    filteredHeroMedia,
    startCarousel,
    nextMedia,
    goToMedia,
    pauseCarousel,
    resumeCarousel
  }
}