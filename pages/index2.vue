<!-- pages/index.vue - VERSIÓN CON SNAP MEJORADO Y FONDO DEL MUSEO -->
<template>
  <div class="min-h-screen text-style">
    <!-- Fondo fijo GLOBAL - SOLO para Important News -->
    <div class="global-fixed-background" :class="{ 'show-fixed': isImportantNewsVisible }"></div>
    
    <!-- Hero Section -->
    <section 
      class="relative h-screen flex items-center overflow-hidden transition-all duration-500 snap-section"
      :class="{ 'min-h-[40vh] md:min-h-[45vh] pt-20': scrolled }"
      ref="heroSection"
      @mouseleave="resumeCarousel"
    >
      <HeroCarousel
        :scrolled="scrolled"
        :current-media-index="currentMediaIndex"
        :filtered-hero-media="filteredHeroMedia"
      />
      <HeroContent :scrolled="scrolled" />
      <ScrollProgress
        :scrolled="scrolled"
        :scroll-progress="scrollProgress"
      />
    </section>

    <!-- Transición entre secciones -->
    <div class="relative h-6 -mt-8 overflow-hidden z-20 snap-section">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white"></div>
      <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E03636]/30 to-transparent"></div>
    </div>

    <!-- Sección Important News -->
    <div 
      ref="importantNewsRef" 
      class="scroll-section opacity-0 translate-y-8 transition-all duration-800 ease-out z-10 snap-section"
      :class="{ 'show': showSection, 'animate-in': isImportantNewsVisible }"
      style="min-height: 100vh; position: relative; background: transparent;"
    >
      <!-- Contenedor del contenido -->
      <div class="relative z-20 flex items-center justify-center min-h-screen">
        <div class="news-container">
          <ImportantNewsSection />
        </div>
      </div>
    </div>
    
    <!-- Más noticias -->
    <div 
      ref="moreNewsRef" 
      class="h-screen scroll-section opacity-0 translate-y-8 transition-all duration-800 ease-out delay-200 z-10 snap-section"
      :class="{ 'animate-in': isMoreNewsVisible }"
      style="position: relative; background: white;"
    >
      <MoreNewsGrid />
    </div>
    
    <!-- Parte de los senadores -->
    <div 
      ref="senateRef" 
      class="h-screen w-full scroll-section opacity-0 translate-y-8 transition-all duration-800 ease-out delay-300 z-10 snap-section"
      :class="{ 'animate-in': isSenateVisible }"
      style="position: relative; background: #f5f5f5;"
    >
      <SenateChamber
        :show-footer="false"
        class="h-screen"
      >
        <template #header>
          <div class="custom-header">
            <h2 class="text-3xl md:text-4xl font-bold text-white">
              Distribución del senado
            </h2>
            <h5 class="text-white">Selecciona un senador para ver detalles</h5>
          </div>
        </template>
      </SenateChamber>
    </div>
    
    <!-- Museo - CON SU PROPIO FONDO (AGREGADO DIRECTAMENTE) -->
    <div 
      ref="museumRef" 
      class="h-screen w-full scroll-section opacity-0 translate-y-8 transition-all duration-800 ease-out delay-400 z-10 snap-section"
      :class="{ 'animate-in': isMuseumVisible }"
      style="background-image: url('/fondo1.png'); background-size: cover; background-position: center; background-repeat: no-repeat; background-attachment: fixed;"
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
import SenateChamber from '@/components/SenateChamber.vue'
import MuseumSectionMinimal from '@/components/MuseumSectionMinimal.vue'
import HeroCarousel from '@/components/HeroSection/HeroCarousel.vue'
import HeroContent from '@/components/HeroSection/HeroContent.vue'
import ScrollProgress from '@/components/UI/ScrollProgress.vue'
import ImportantNewsSection from '@/components/ImportantNewsSection.vue'
import MoreNewsGrid from '@/components/MoreNewsGrid.vue'

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

const {
  currentMediaIndex,
  filteredHeroMedia,
  startCarousel,
  goToMedia,
  pauseCarousel,
  resumeCarousel
} = useCarousel(heroMedia.value)

const { scrolled, scrollProgress, initScrollListener, removeScrollListener } = useScrollEffects()

const darkMode = ref(false)
const heroSection = ref(null)
const showSection = ref(true)

const importantNewsRef = ref(null)
const moreNewsRef = ref(null)
const senateRef = ref(null)
const museumRef = ref(null)

const isImportantNewsVisible = ref(false)
const isMoreNewsVisible = ref(false)
const isSenateVisible = ref(false)
const isMuseumVisible = ref(false)

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

let scrollObserver = null

const initScrollObserver = () => {
  scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === importantNewsRef.value) {
            isImportantNewsVisible.value = true;
          } else if (entry.target === moreNewsRef.value) {
            isMoreNewsVisible.value = true;
          } else if (entry.target === senateRef.value) {
            isSenateVisible.value = true;
          } else if (entry.target === museumRef.value) {
            isMuseumVisible.value = true;
          }
          
          entry.target.classList.add('animate-in');
          scrollObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -30px 0px'
    }
  );
  
  const sections = [
    importantNewsRef.value,
    moreNewsRef.value,
    senateRef.value,
    museumRef.value
  ];
  
  sections.forEach(section => {
    if (section) {
      scrollObserver.observe(section);
    }
  });
};

onMounted(async () => {
  startCarousel();
  initScrollListener();
  await nextTick();
  showSection.value = true;
  initScrollObserver();
});

onUnmounted(() => {
  removeScrollListener();
  if (scrollObserver) {
    scrollObserver.disconnect();
  }
});

definePageMeta({
  layout: 'alter8'
});
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

/* Cada sección con snap - MÁS AGL UTILIZANDO SCROLL-SNAP-STOP */
section, .scroll-section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  transition: transform 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.1);
}

/* El footer también hace snap */
footer {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  transition: transform 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.1);
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

/* Overlay elegante */
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

/* Mostrar solo cuando estamos en Important News */
.global-fixed-background.show-fixed {
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

/* Las otras secciones tienen fondos sólidos */
[ref="moreNewsRef"] {
  background: white !important;
}

[ref="senateRef"] {
  background: #f5f5f5 !important;
}

/* Museo - SIN FONDO AQUÍ PORQUE YA LO TIENE EN EL STYLE INLINE */
[ref="museumRef"] {
  background: transparent !important; /* El fondo viene del style inline */
}

.news-container {
  width: 90%;
  margin: 0 auto;
  max-width: 1400px;
  background: transparent !important;
  position: relative;
  z-index: 10;
}

@media (max-width: 768px) {
  .news-container {
    width: 95%;
  }
}

@media (max-width: 480px) {
  .news-container {
    width: 98%;
  }
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
  min-height: 250px;
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