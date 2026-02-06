<!-- pages/index.vue - VERSIÓN COMPLETA CON TRANSICIONES -->
<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section 
      class="relative h-screen flex items-center overflow-hidden transition-all duration-500"
      :class="{ 'min-h-[40vh] md:min-h-[45vh] pt-20': scrolled }"
      ref="heroSection"
      @mouseleave="resumeCarousel"
    >
      <!-- Carrusel como componente -->
      <HeroCarousel
        :scrolled="scrolled"
        :current-media-index="currentMediaIndex"
        :filtered-hero-media="filteredHeroMedia"
      />

      <!-- Contenido del hero -->
      <HeroContent :scrolled="scrolled" />
      

      <!-- Indicadores del carrusel -->
      <div v-if="!scrolled" class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        <!-- <div 
          v-for="(media, index) in filteredHeroMedia" 
          :key="index"
          class="w-2 h-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-125"
          :class="currentMediaIndex === index 
            ? 'bg-white w-6' 
            : 'bg-white/50 hover:bg-white/80'"
          @click="goToMedia(index)"
          :title="`Ir a ${media.type === 'video' ? 'video' : 'imagen'} ${index + 1}`"
        ></div> -->
      </div>

      <!-- Barra de progreso -->
      <ScrollProgress
        :scrolled="scrolled"
        :scroll-progress="scrollProgress"
      />
    </section>

    <!-- Transición entre secciones -->
    <div class="relative h-16 -mt-8 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white"></div>
      <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E03636]/30 to-transparent"></div>
    </div>

    <!-- Secciones con transiciones de scroll -->
    <div 
      ref="importantNewsRef" 
      class="scroll-section opacity-0 translate-y-8 transition-all duration-800 ease-out"
    >
      <ImportantNewsSection />
    </div>
    
    <div 
      ref="moreNewsRef" 
      class="scroll-section opacity-0 translate-y-8 transition-all duration-800 ease-out delay-200"
    >
      <MoreNewsGrid />
    </div>
    
    <!-- Parte de los senadores -->
    <div 
      ref="senateRef" 
      class="container mx-auto px-10 scroll-section opacity-0 translate-y-8 transition-all duration-800 ease-out delay-300"
    >
      <SenateChamber
        :show-footer="false"
      >
        <template #header>
          <div class="custom-header">
            <h2>Distribución del Senado 2024</h2>
            <p>Selecciona un senador para ver detalles</p>
          </div>
        </template>
      </SenateChamber>
    </div>
    
    <!-- Museo -->
    <div 
      ref="museumRef" 
      class="container mx-auto px-10 scroll-section opacity-0 translate-y-8 transition-all duration-800 ease-out delay-400"
    >
      <MuseumSectionMinimal
        :dark-mode="darkMode"
        @collection-selected="handleCollectionSelect"
        @exhibition-selected="handleExhibitionSelect"
        @program-registration="handleProgramRegistration"
        @virtual-tour-started="handleVirtualTour"
        @donation-clicked="handleDonationClick"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useCarousel } from '@/composables/useCarousel'
import { useScrollEffects } from '@/composables/useScrollEffects'
import { useIntersection } from '@/composables/useIntersection'
import SenateChamber from '@/components/SenateChamber.vue'
import MuseumSectionMinimal from '@/components/MuseumSectionMinimal.vue'
import HeroCarousel from '@/components/HeroSection/HeroCarousel.vue'
import HeroContent from '@/components/HeroSection/HeroContent.vue'
import ScrollProgress from '@/components/UI/ScrollProgress.vue'
import SectionHeader from '@/components/UI/SectionHeader.vue'
import NewsCard from '@/components/News/NewsCard.vue'
import ImportantNewsSection from '@/components/ImportantNewsSection.vue'
import MoreNewsGrid from '@/components/MoreNewsGrid.vue'

// Media para el hero
const heroMedia = ref([
  {
    type: 'video',
    url: 'https://senado.gob.bo//assets/intro2025-C9lburAD.mp4',
    alt: 'Video institucional del Senado de Bolivia'
  },
  {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alt: 'Edificio del Senado Nacional de Bolivia'
  },
  {
    type: 'image',
    url: 'https://pxcdn.reduno.com.bo/reduno/112025/1762461432445.webp?cw=800&ch=450&extw=jpg',
    alt: 'Edificio del Congreso Nacional de Bolivia'
  },
  {
    type: 'image', 
    url: 'https://apisi.senado.gob.bo/images/a001535c-1750-49a8-b277-37b32b038c45_1759275539.jpeg',
    alt: 'Asamblea Legislativa Plurinacional de Bolivia'
  }
])

// Usar composables
const {
  currentMediaIndex,
  filteredHeroMedia,
  startCarousel,
  goToMedia,
  pauseCarousel,
  resumeCarousel
} = useCarousel(heroMedia.value)

const { scrolled, scrollProgress, initScrollListener, removeScrollListener } = useScrollEffects()

const { 
  isIntersecting: isInView, 
  elementRef: newsSectionRef 
} = useIntersection({
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
})

const { 
  isIntersecting: isMoreNewsInView, 
  elementRef: moreNewsSectionRef 
} = useIntersection({
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
})

// Estados
const darkMode = ref(false)
const heroSection = ref(null)
const newsSection = ref(null)
const newsGrid = ref(null)
const moreNewsSection = ref(null)
const moreNewsGrid = ref(null)

// Refs para las secciones con transiciones
const importantNewsRef = ref(null)
const moreNewsRef = ref(null)
const senateRef = ref(null)
const museumRef = ref(null)

// Observer para transiciones de scroll
let scrollObserver = null

// Handlers del museo
const handleCollectionSelect = (collection) => {
  console.log('Colección seleccionada:', collection)
}

const handleExhibitionSelect = (exhibition) => {
  console.log('Exhibición seleccionada:', exhibition)
}

const handleProgramRegistration = (program) => {
  console.log('Registro a programa:', program)
}

const handleVirtualTour = () => {
  console.log('Tour virtual iniciado')
}

const handleDonationClick = () => {
  console.log('Donación solicitada')
}

// Inicializar observador para transiciones
const initScrollObserver = () => {
  scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
          // Opcional: dejar de observar después de animar para mejor rendimiento
          scrollObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -30px 0px'
    }
  )
  
  // Observar todas las secciones que necesitan animación
  const sections = [
    importantNewsRef.value,
    moreNewsRef.value,
    senateRef.value,
    museumRef.value
  ]
  
  sections.forEach(section => {
    if (section) {
      scrollObserver.observe(section)
    }
  })
}

onMounted(() => {
  // Iniciar carrusel
  startCarousel()
  
  // Iniciar listeners de scroll
  initScrollListener()
  
  // Asignar refs para los observers existentes
  if (newsSectionRef.value) {
    newsSectionRef.value = newsSection.value
  }
  
  if (moreNewsSectionRef.value) {
    moreNewsSectionRef.value = moreNewsSection.value
  }
  
  // Inicializar observer de transiciones después de que el DOM esté listo
  nextTick(() => {
    initScrollObserver()
  })
})

onUnmounted(() => {
  removeScrollListener()
  
  // Limpiar observer de transiciones
  if (scrollObserver) {
    scrollObserver.disconnect()
  }
})

// Metadatos
definePageMeta({
  layout: 'alter8'
})
</script>

<style scoped>
/* Estilos específicos de la página */
.carousel-fade-enter-active,
.carousel-fade-leave-active {
  transition: opacity 1s ease-in-out;
}

.carousel-fade-enter-from,
.carousel-fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .absolute.bottom-8 {
    bottom: 4rem;
  }
}

/* Animaciones */
.animation-delay-300 {
  animation-delay: 300ms;
}

@keyframes progressBar {
  from {
    width: 0;
  }
  to {
    width: var(--progress-width, 60%);
  }
}

.animate-progress {
  animation: progressBar 1.5s ease-out forwards;
}
</style>

<style>
/* Estilos globales para las transiciones de scroll */
.scroll-section {
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform: translateZ(0);
}

.scroll-section.animate-in {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

/* Transiciones escalonadas para elementos hijos dentro de las secciones */
.scroll-section.animate-in > * {
  animation: fadeInUpChild 0.6s ease-out forwards;
}

.scroll-section.animate-in > *:nth-child(1) { animation-delay: 0.1s; }
.scroll-section.animate-in > *:nth-child(2) { animation-delay: 0.2s; }
.scroll-section.animate-in > *:nth-child(3) { animation-delay: 0.3s; }
.scroll-section.animate-in > *:nth-child(4) { animation-delay: 0.4s; }
.scroll-section.animate-in > *:nth-child(5) { animation-delay: 0.5s; }
.scroll-section.animate-in > *:nth-child(6) { animation-delay: 0.6s; }

@keyframes fadeInUpChild {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Efecto hover para cards dentro de secciones animadas */
.scroll-section.animate-in .news-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.scroll-section.animate-in .news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Transición suave para el scroll global */
html {
  scroll-behavior: smooth;
}

/* Mejoras de rendimiento y accesibilidad */
@media (prefers-reduced-motion: reduce) {
  .scroll-section,
  .scroll-section.animate-in,
  .scroll-section.animate-in > * {
    transition: none !important;
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
  
  .delay-200,
  .delay-300,
  .delay-400 {
    animation-delay: 0s !important;
  }
}

/* Optimización para dispositivos móviles */
@media (max-width: 640px) {
  .scroll-section {
    transition-duration: 600ms !important;
  }
  
  .scroll-section.animate-in > * {
    animation-duration: 0.4s !important;
  }
}
</style>