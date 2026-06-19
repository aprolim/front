<template>
  <div class="min-h-screen text-style">
    <!-- Fondo fijo GLOBAL - SOLO para Important News -->
    <div class="global-fixed-background" :class="{ 'show-fixed': isImportantNewsVisible }"></div>
    
    <!-- Fondo fijo para More News -->
    <div class="morenews-fixed-background" :class="{ 'show-fixed': isMoreNewsVisible }"></div>
    
    <!-- Hero Section con video persistente -->
    <section 
      class="relative h-screen flex items-center overflow-hidden transition-all duration-500 snap-section"
      :class="{ 'min-h-[40vh] md:min-h-[45vh] pt-20': scrolled }"
      ref="heroSection"
      @mouseleave="resumeCarousel"
    >
      <!-- Video persistente de fondo -->
      <div class="absolute inset-0 z-0">
        <PersistentVideo
          :src="heroVideoSrc"
          autoplay
          muted
          loop
          playsinline
        />
        <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10"></div>
      </div>
      
      <HeroContent :scrolled="scrolled" />
      <ScrollProgress
        :scrolled="scrolled"
        :scroll-progress="scrollProgress"
      />
    </section>

    <!-- Sección Important News - CON FONDO FIJO -->
    <div 
      ref="importantNewsRef" 
      class="scroll-section opacity-0 translate-y-8 transition-all duration-800 ease-out z-10 snap-section"
      :class="{ 'show': showSection, 'animate-in': isImportantNewsVisible }"
      style="min-height: 100vh; position: relative; background: transparent;"
    >
      <!-- Contenedor del contenido -->
      <div class="pt-1 relative z-20 flex items-center justify-center min-h-screen">
        <div class="news-container">
          <ImportantNewsSection />
        </div>
      </div>
    </div>
    
    <!-- Más noticias - CON FONDO FIJO -->
    <div 
      ref="moreNewsRef" 
      class="h-screen scroll-section opacity-0 translate-y-8 transition-all duration-800 ease-out delay-200 z-10 snap-section"
      :class="{ 'animate-in': isMoreNewsVisible }"
      style="position: relative;"
    >
      <!-- Contenedor del contenido con fondo transparente -->
      <div style="position: relative; z-index: 2; background: transparent; height: 100%;" class="pt-3">
        <MoreNewsGrid targetRoute="/centro-de-noticias#noticias-importantes"/>
      </div>
    </div>
    
    <!-- Parte de los senadores - SIN FONDO FIJO -->
    <div 
      ref="senateRef" 
      class="h-screen w-full scroll-section opacity-0 translate-y-8 transition-all duration-800 ease-out delay-300 z-10 snap-section"
      :class="{ 'animate-in': isSenateVisible }"
      style="position: relative; background: #f5f5f5;"
    >
      <div class="h-[4.4vw]"></div>
      <SenateChamber
        :show-footer="false"
        class="h-screen"
      >
        <template #header>
          <div class="px-1 xs:px-2 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24 5xl:px-32 text-center sm:text-left">
            <h2 class="font-bold text-white leading-tight
                      text-[11px] xs:text-[14px] sm:text-[18px] md:text-[22px] 
                      lg:text-[26px] xl:text-[30px] 2xl:text-[39px] 
                      3xl:text-[58px] 4xl:text-[80px] 5xl:text-[102px] text-center
                      p-1
                      ">
              Distribución del senado
            </h2>
          </div>
        </template>
      </SenateChamber>
    </div>
    
    <!-- Museo - CON SU PROPIO FONDO -->
    <div 
      ref="museumRef" 
      class="h-screen w-full scroll-section opacity-0 translate-y-8 transition-all duration-800 ease-out delay-400 z-10 snap-section"
      :class="{ 'animate-in': isMuseumVisible }"
      style="background-image: url('/fondo1.png'); background-size: cover; background-position: center; background-repeat: no-repeat; background-attachment: fixed;"
    >
      <div class="h-[4.2vw]"></div>
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
import { usePriorityImages } from '@/composables/usePriorityImages'
import SenateChamber from '@/components/SenateChamber.vue'
import MuseumSectionMinimal from '@/components/MuseumSectionMinimal.vue'
import HeroContent from '@/components/HeroSection/HeroContent.vue'
import ScrollProgress from '@/components/UI/ScrollProgress.vue'
import ImportantNewsSection from '@/components/ImportantNewsSection.vue'
import MoreNewsGrid from '@/components/MoreNewsGrid.vue'
import PersistentVideo from '@/components/PersistentVideo.vue'

defineOptions({
  name: 'IndexPage'
})

// ============================================
// VIDEO DEL HERO
// ============================================
const heroVideoSrc = '/video/video web.mp4'

// ============================================
// PRECARGA DE IMÁGENES PRIORITARIAS
// ============================================
const { preloadPriorityImages, preloadImagesInViewport } = usePriorityImages()

// ============================================
// CAROUSEL (para compatibilidad con HeroContent)
// ============================================
const heroMedia = ref([
  {
    type: 'video',
    url: '/video/video web.mp4',
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

const {
  currentMediaIndex,
  filteredHeroMedia,
  startCarousel,
  goToMedia,
  pauseCarousel,
  resumeCarousel
} = useCarousel(heroMedia.value)

// ============================================
// SCROLL EFFECTS
// ============================================
const { scrolled, scrollProgress, initScrollListener, removeScrollListener } = useScrollEffects()

// ============================================
// REFS
// ============================================
const darkMode = ref(false)
const heroSection = ref(null)
const heroCarouselRef = ref(null)
const showSection = ref(true)

const importantNewsRef = ref(null)
const moreNewsRef = ref(null)
const senateRef = ref(null)
const museumRef = ref(null)

// ============================================
// VISIBILITY STATES
// ============================================
const isImportantNewsVisible = ref(false)
const isMoreNewsVisible = ref(false)
const isSenateVisible = ref(false)
const isMuseumVisible = ref(false)

// ============================================
// EVENT HANDLERS
// ============================================
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

// ============================================
// FORZAR REPRODUCCIÓN DEL VIDEO
// ============================================
const forceVideoPlayback = () => {
  // El video ahora es manejado por PersistentVideo
  // Buscar el video en el DOM y reproducirlo si está pausado
  const video = document.querySelector('video')
  if (video && video.paused) {
    video.play().catch(() => {})
  }
}

// ============================================
// MANEJAR INTERACCIÓN DEL USUARIO
// ============================================
const handleUserInteraction = () => {
  forceVideoPlayback()
}

// ============================================
// SCROLL OBSERVER
// ============================================
let scrollObserver = null

const initScrollObserver = () => {
  scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === importantNewsRef.value) {
            isImportantNewsVisible.value = true
          } else if (entry.target === moreNewsRef.value) {
            isMoreNewsVisible.value = true
          } else if (entry.target === senateRef.value) {
            isSenateVisible.value = true
          } else if (entry.target === museumRef.value) {
            isMuseumVisible.value = true
          }
          
          entry.target.classList.add('animate-in')
          scrollObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -30px 0px'
    }
  )
  
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

// ============================================
// PRECARGA DE IMÁGENES EN SECCIONES VISIBLES
// ============================================
let imageObserver = null

const initImagePreload = () => {
  // Observar cambios en el DOM para precargar imágenes cuando aparecen
  const observer = new MutationObserver(() => {
    // Precargar imágenes en el viewport actual
    const containers = document.querySelectorAll('.scroll-section')
    containers.forEach(container => {
      if (container.getBoundingClientRect().top < window.innerHeight) {
        preloadImagesInViewport(container)
      }
    })
  })
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
  
  return observer
}

// ============================================
// LIFECYCLE
// ============================================
onMounted(async () => {
  console.log('🎬 IndexPage montada')
  
  // 1. Precargar imágenes prioritarias
  preloadPriorityImages()
  
  // 2. Iniciar carrusel (para compatibilidad)
  startCarousel()
  
  // 3. Inicializar scroll
  initScrollListener()
  
  await nextTick()
  showSection.value = true
  
  // 4. Inicializar observers
  initScrollObserver()
  imageObserver = initImagePreload()
  
  // 5. Forzar scroll al inicio
  const doScroll = () => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    const container = document.querySelector('.snap-container')
    if (container) container.scrollTo({ top: 0, behavior: 'auto' })
  }
  
  setTimeout(doScroll, 10)
  setTimeout(doScroll, 100)
  setTimeout(doScroll, 300)
  
  // 6. Forzar reproducción del video
  setTimeout(forceVideoPlayback, 200)
  setTimeout(forceVideoPlayback, 500)
  setTimeout(forceVideoPlayback, 1000)
  setTimeout(forceVideoPlayback, 2000)
  
  // 7. Event listeners para interacción del usuario
  document.addEventListener('click', handleUserInteraction)
  document.addEventListener('touchstart', handleUserInteraction)
  document.addEventListener('scroll', forceVideoPlayback)
  
  // 8. Escuchar cuando la página se carga completamente
  window.addEventListener('load', () => {
    setTimeout(forceVideoPlayback, 100)
  })
})

onUnmounted(() => {
  removeScrollListener()
  
  if (scrollObserver) {
    scrollObserver.disconnect()
  }
  
  if (imageObserver) {
    imageObserver.disconnect()
  }
  
  document.removeEventListener('click', handleUserInteraction)
  document.removeEventListener('touchstart', handleUserInteraction)
  document.removeEventListener('scroll', forceVideoPlayback)
})

// ============================================
// PAGE META
// ============================================
definePageMeta({
  layout: 'alter8'
})
</script>

<style scoped>
.text-style {
  font-family: 'Montserrat', Tahoma, Geneva, Verdana, sans-serif;
}

/* ===== SNAP SCROLL MÁS NOTORIO ===== */
html, body {
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  scroll-padding-top: 0;
}

/* Cada sección con snap */
section, .scroll-section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.3, 1.2);
}

/* El footer también hace snap */
footer {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.3, 1.2);
}

/* ===== FONDO FIJO - SOLO PARA IMPORTANT NEWS ===== */
.global-fixed-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('/Recurso_2.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #f1f1f3;
  z-index: 0;
  pointer-events: none;
  will-change: transform;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s ease, visibility 0.5s ease;
}

.global-fixed-background::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(
    circle at 50% 30%,
    transparent 0%,
    rgba(0, 0, 0, 0.25) 80%,
    rgba(0, 0, 0, 0.35) 100%
  );
  pointer-events: none;
  z-index: 1;
}

.global-fixed-background.show-fixed {
  opacity: 1;
  visibility: visible;
}

/* ===== FONDO FIJO PARA MORE NEWS ===== */
.morenews-fixed-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('/Recurso_2.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #f1f1f3;
  z-index: 0;
  pointer-events: none;
  will-change: transform;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s ease, visibility 0.5s ease;
}

.morenews-fixed-background::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(
    circle at 50% 30%,
    transparent 0%,
    rgba(0, 0, 0, 0.25) 80%,
    rgba(0, 0, 0, 0.35) 100%
  );
  pointer-events: none;
  z-index: 1;
}

.morenews-fixed-background.show-fixed {
  opacity: 1;
  visibility: visible;
}

/* Todas las secciones */
.scroll-section {
  position: relative;
  width: 100%;
  z-index: 5;
}

/* Important News debe ser transparente */
[ref="importantNewsRef"] {
  background: transparent !important;
}

/* More News debe ser transparente para mostrar su fondo fijo */
[ref="moreNewsRef"] {
  background: transparent !important;
}

/* Las otras secciones tienen fondos sólidos */
[ref="senateRef"] {
  background: #f5f5f5 !important;
}

[ref="museumRef"] {
  background: transparent !important;
}

.news-container {
  width: 85%;
  margin: 0 auto;
  background: transparent !important;
  position: relative;
  z-index: 10;
}
</style>

<style>
.scroll-section {
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.scroll-section.animate-in {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

.scroll-section.animate-in > * {
  animation: fadeInUpChild 0.6s ease-out forwards;
}

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

/* Scrollbar elegante */
::-webkit-scrollbar {
  width: 10px;
  background: transparent;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(224, 54, 54, 0.4);
  border-radius: 10px;
  transition: background 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(224, 54, 54, 0.7);
}

html {
  scroll-behavior: smooth;
}

/* Asegurar que el footer sea visible */
footer {
  display: block !important;
  position: relative !important;
  z-index: 100 !important;
  background-image: url('/footer-main.png') !important;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
}

@media (prefers-reduced-motion: reduce) {
  .scroll-section,
  .scroll-section.animate-in,
  .scroll-section.animate-in > * {
    transition: none !important;
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>