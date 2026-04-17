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
          loading="lazy"
        />
        
        <!-- Si es video -->
        <video 
          v-else-if="media.type === 'video'"
          :ref="el => setVideoRef(el, index)"
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
  scrolled: {
    type: Boolean,
    default: false
  },
  currentMediaIndex: {
    type: Number,
    default: 0
  },
  filteredHeroMedia: {
    type: Array,
    default: () => []
  }
})

// Usar un objeto para almacenar referencias de video por índice
const videoRefs = ref({})
let activeVideo = null

// Función para establecer la referencia del video
const setVideoRef = (el, index) => {
  if (el) {
    videoRefs.value[index] = el
  }
}

// Función para obtener el video actual
const getCurrentVideo = () => {
  const currentMedia = props.filteredHeroMedia?.[props.currentMediaIndex]
  if (currentMedia?.type === 'video') {
    return videoRefs.value[props.currentMediaIndex]
  }
  return null
}

// Función para pausar el video activo
const pauseActiveVideo = () => {
  if (activeVideo && typeof activeVideo.pause === 'function') {
    try {
      activeVideo.pause()
    } catch (error) {
      console.log('Error al pausar video:', error)
    }
  }
  activeVideo = null
}

// Función para forzar la reproducción del video actual
const forceVideoPlay = async () => {
  await nextTick()
  
  const video = getCurrentVideo()
  
  if (!video) {
    return
  }
  
  // Guardar referencia del video activo
  activeVideo = video
  
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
    }
  }
}

// Función para reiniciar y reproducir el video
const restartAndPlayVideo = async () => {
  await nextTick()
  
  const video = getCurrentVideo()
  if (!video) return
  
  // Guardar referencia del video activo
  activeVideo = video
  
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
  // Pausar el video anterior si existe
  if (oldIndex !== undefined && videoRefs.value[oldIndex]) {
    const oldVideo = videoRefs.value[oldIndex]
    if (oldVideo && typeof oldVideo.pause === 'function' && !oldVideo.paused) {
      oldVideo.pause()
    }
  }
  
  // Verificar si el slide actual contiene un video
  const currentMedia = props.filteredHeroMedia?.[newIndex]
  
  if (currentMedia?.type === 'video') {
    await nextTick()
    forceVideoPlay()
  }
}, { immediate: true })

// Observar cambios en filteredHeroMedia
watch(() => props.filteredHeroMedia, async () => {
  await nextTick()
  forceVideoPlay()
}, { deep: true })

// Al montar el componente
onMounted(() => {
  const attempts = [100, 500, 1000, 2000]
  
  attempts.forEach(delay => {
    setTimeout(() => {
      forceVideoPlay()
    }, delay)
  })
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      forceVideoPlay()
    }, 100)
  })
})

// Al desmontar
onUnmounted(() => {
  pauseActiveVideo()
  
  Object.values(videoRefs.value).forEach(video => {
    if (video && typeof video.pause === 'function' && !video.paused) {
      video.pause()
    }
  })
})

// Exponer métodos para uso del padre
defineExpose({
  forceVideoPlay,
  restartAndPlayVideo,
  pauseActiveVideo
})
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
.absolute {
  position: absolute;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.z-0 {
  z-index: 0;
}

.z-10 {
  z-index: 10;
}

.overflow-hidden {
  overflow: hidden;
}

.w-full {
  width: 100%;
}

.h-full {
  height: 100%;
}

.object-cover {
  object-fit: cover;
}

.object-center {
  object-position: center;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.duration-700 {
  transition-duration: 700ms;
}

.duration-1000 {
  transition-duration: 1000ms;
}

.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.opacity-0 {
  opacity: 0;
}

.opacity-100 {
  opacity: 1;
}

.scale-105 {
  transform: scale(1.05);
}

.brightness-75 {
  --tw-brightness: brightness(.75);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}

/* Gradientes */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

.bg-gradient-to-b {
  background-image: linear-gradient(to bottom, var(--tw-gradient-stops));
}

.from-black\/70 {
  --tw-gradient-from: rgb(0 0 0 / 0.7);
  --tw-gradient-to: rgb(0 0 0 / 0);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

.from-black\/80 {
  --tw-gradient-from: rgb(0 0 0 / 0.8);
  --tw-gradient-to: rgb(0 0 0 / 0);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

.via-black\/40 {
  --tw-gradient-via-position: 50%;
  --tw-gradient-to: rgb(0 0 0 / 0);
  --tw-gradient-stops: var(--tw-gradient-from), rgb(0 0 0 / 0.4) var(--tw-gradient-via-position), var(--tw-gradient-to);
}

.via-black\/50 {
  --tw-gradient-via-position: 50%;
  --tw-gradient-to: rgb(0 0 0 / 0);
  --tw-gradient-stops: var(--tw-gradient-from), rgb(0 0 0 / 0.5) var(--tw-gradient-via-position), var(--tw-gradient-to);
}

.to-black\/30 {
  --tw-gradient-to: rgb(0 0 0 / 0.3);
}

.to-transparent {
  --tw-gradient-to: transparent;
}

.bg-\[--E03636\]\/20 {
  background-color: rgba(224, 54, 54, 0.2);
}

.bg-\[--E4D294\]\/10 {
  background-color: rgba(228, 210, 148, 0.1);
}
</style>