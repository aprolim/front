<!-- components/HeroSection/HeroCarousel.vue -->
<template>
  <div class="absolute inset-0 z-0 overflow-hidden">
    <!-- Overlay de gradiente dinámico -->
    <div 
      class="absolute inset-0 transition-all duration-500 z-10"
      :class="scrolled 
        ? 'bg-gradient-to-b from-black/80 via-black/50 to-black/30' 
        : 'bg-gradient-to-r from-black/70 via-black/40 to-transparent'"
    ></div>
    
    <!-- Gradiente adicional -->
    <div class="absolute inset-0 bg-gradient-to-r from-[#E03636]/20 to-[#E4D294]/10 z-10"></div>
    
    <!-- Contenedor del carrusel -->
    <div class="relative w-full h-full">
      <!-- Elementos del carrusel (imágenes y videos) -->
      <div 
        v-for="(media, index) in filteredHeroMedia" 
        :key="index"
        class="absolute inset-0 transition-all duration-1000 ease-in-out"
        :class="{
          'opacity-100 z-10': currentMediaIndex === index,
          'opacity-0 z-0': currentMediaIndex !== index
        }"
      >
        <!-- Si es imagen -->
        <img 
          v-if="media.type === 'image'"
          :src="media.url"
          :alt="media.alt"
          class="w-full h-full object-cover object-center transition-transform duration-700"
          :class="{ 'scale-105 brightness-75': scrolled }"
        />
        
        <!-- Si es video - CON REPRODUCCIÓN AUTOMÁTICA FORZADA -->
        <video 
          v-else-if="media.type === 'video'"
          ref="videoRef"
          :src="media.url"
          class="w-full h-full object-cover object-center"
          :class="{ 'scale-105 brightness-75': scrolled }"
          muted
          loop
          playsinline
          autoplay
          preload="auto"
        ></video>
      </div>
    </div>
    
    <!-- Escudo Nacional que aparece al hacer scroll -->
    <PatrioticSeal :scrolled="scrolled" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import PatrioticSeal from './PatrioticSeal.vue'

const props = defineProps({
  scrolled: Boolean,
  currentMediaIndex: Number,
  filteredHeroMedia: Array
})

const videoRef = ref(null)

// Función para forzar la reproducción del video
const forceVideoPlay = async () => {
  // Esperar al siguiente tick del DOM
  await nextTick()
  
  const video = videoRef.value
  
  if (!video) {
    console.log('No se encontró el elemento de video')
    return
  }
  
  // Verificar si el video está pausado
  if (video.paused) {
    try {
      // Asegurar que está muteado (requisito para autoplay)
      video.muted = true
      
      // Intentar reproducir
      const playPromise = video.play()
      
      if (playPromise !== undefined) {
        await playPromise
        console.log('Video reproduciéndose correctamente')
      }
    } catch (error) {
      console.log('Error al reproducir video automáticamente:', error)
      
      // Estrategia de respaldo: forzar reproducción con interacción simulada
      setTimeout(() => {
        if (video && video.paused) {
          // Crear y disparar un evento de clic simulados
          const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
          })
          video.dispatchEvent(clickEvent)
          
          // Intentar reproducir nuevamente
          video.play().catch(e => console.log('Reintento fallido:', e))
        }
      }, 100)
    }
  }
}

// Función para reiniciar y reproducir el video (útil cuando cambia el índice)
const restartAndPlayVideo = async () => {
  await nextTick()
  
  const video = videoRef.value
  if (!video) return
  
  // Reiniciar el video al principio
  video.currentTime = 0
  
  // Forzar reproducción
  try {
    video.muted = true
    await video.play()
    console.log('Video reiniciado y reproduciéndose')
  } catch (error) {
    console.log('Error al reiniciar video:', error)
  }
}

// Observar cambios en el índice del slide actual
watch(() => props.currentMediaIndex, async (newIndex, oldIndex) => {
  // Verificar si el slide actual contiene un video
  const currentMedia = props.filteredHeroMedia?.[newIndex]
  
  if (currentMedia?.type === 'video') {
    // Si es video, forzar reproducción
    await nextTick()
    forceVideoPlay()
  } else if (oldIndex !== undefined) {
    // Si cambiamos de video a imagen, pausar el video
    const video = videoRef.value
    if (video && !video.paused) {
      video.pause()
    }
  }
}, { immediate: true })

// También observar cambios en filteredHeroMedia (útil cuando se carga dinámicamente)
watch(() => props.filteredHeroMedia, async () => {
  await nextTick()
  forceVideoPlay()
}, { deep: true })

// Al montar el componente, forzar reproducción del video
onMounted(() => {
  // Múltiples intentos para asegurar que el video se reproduzca
  setTimeout(() => {
    forceVideoPlay()
  }, 100)
  
  setTimeout(() => {
    forceVideoPlay()
  }, 500)
  
  setTimeout(() => {
    forceVideoPlay()
  }, 1000)
  
  // Event listener para cuando la página esté completamente cargada
  window.addEventListener('load', () => {
    forceVideoPlay()
  })
})

// Al desmontar, pausar el video
onUnmounted(() => {
  const video = videoRef.value
  if (video && !video.paused) {
    video.pause()
  }
})
</script>