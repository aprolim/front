<template>
  <div class="min-h-screen text-style">
    <!-- Fondo fijo GLOBAL - PARA Senate Directors Y Reseña Histórica -->
    <div class="global-fixed-background" :class="{ 'show-fixed': isSenateDirectorsVisible || isHistoricalReviewVisible }"></div>
    
    <!-- Hero Section -->
    <section 
      id="mandato"
      class="relative h-screen flex items-start overflow-hidden transition-all duration-500"
      :class="{ 'min-h-[40vh] md:min-h-[45vh]': scrolled }"
      ref="heroSection"
      style="background-color: #eeeeee; background-size: cover"
    >
      <HeroWithCarousel 
        bannerTextSize="1.5vw"
      />
      <ScrollProgress
        :scrolled="scrolled"
        :scroll-progress="scrollProgress"
      />
    </section>

    <!-- Sección Directiva Camaral -->
    <div
      id="directiva-camaral"
      ref="senateDirectorsRef" 
      class="scroll-section opacity-0 translate-y-8 transition-all duration-800 ease-out z-10"
      :class="{ 'animate-in': isSenateDirectorsVisible }"
      style="min-height: 100vh; position: relative; background: transparent;"
    >
      <SenateDirectors />
    </div>
    
    <!-- Sección Reseña Histórica -->
    <div 
      id="resena-historica"
      ref="historicalReviewRef" 
      class="scroll-section opacity-0 translate-y-8 transition-all duration-800 ease-out delay-200 z-10"
      :class="{ 'animate-in': isHistoricalReviewVisible }"
      style="min-height: 100vh; position: relative; background: transparent;"
    >
      <HistoricalReview />
    </div>
    
    <!-- Sección Museo -->
    <div 
      id="museo"
      ref="museumRef" 
      class="h-screen w-full scroll-section opacity-0 translate-y-8 transition-all duration-800 ease-out delay-400 z-10"
      :class="{ 'animate-in': isMuseumVisible }"
      style="background-color: #eeeeee; background-size: cover; background-position: center; background-repeat: no-repeat;"
    >
      <HorizontalCarousel />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useScrollEffects } from '@/composables/useScrollEffects'
import ScrollProgress from '@/components/UI/ScrollProgress.vue'
import HeroWithCarousel from '~/components/HeroWithCarousel.vue'
import SenateDirectors from '~/components/SenateDirectors.vue'
import HistoricalReview from '~/components/HistoricalReview.vue'
import HorizontalCarousel from '~/components/HorizontalCarousel.vue'

// ============================================
// ✅ ELIMINADO: heroMedia (ya no se usa)
// ✅ ELIMINADO: useCarousel (ya no se usa)
// ============================================

const { scrolled, scrollProgress, initScrollListener, removeScrollListener } = useScrollEffects()
const route = useRoute()

const darkMode = ref(false)
const heroSection = ref(null)
const showSection = ref(true)

const senateDirectorsRef = ref(null)
const historicalReviewRef = ref(null)
const museumRef = ref(null)

const isSenateDirectorsVisible = ref(false)
const isHistoricalReviewVisible = ref(false)
const isMuseumVisible = ref(false)

// Mapa de secciones para scroll
const sections = {
  'mandato': heroSection, 
  'directiva-camaral': senateDirectorsRef,
  'resena-historica': historicalReviewRef,
  'museo': museumRef
}

// Función mejorada para hacer scroll a una sección
const scrollToSection = (id) => {
  const sectionRef = sections[id]
  if (sectionRef?.value) {
    // Desactivar scroll-snap temporalmente
    const container = document.querySelector('.snap-container')
    if (container) {
      container.style.scrollSnapType = 'none'
    }
    
    // Hacer scroll a la sección
    sectionRef.value.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start',
      inline: 'nearest'
    })
    
    // Reactivar scroll-snap después del scroll
    setTimeout(() => {
      if (container) {
        container.style.scrollSnapType = 'y mandatory'
      }
    }, 800)
  }
}

let scrollObserver = null

const initScrollObserver = () => {
  scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === senateDirectorsRef.value) {
            isSenateDirectorsVisible.value = true;
          } else if (entry.target === historicalReviewRef.value) {
            isHistoricalReviewVisible.value = true;
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
    senateDirectorsRef.value,
    historicalReviewRef.value,
    museumRef.value
  ];
  
  sections.forEach(section => {
    if (section) {
      scrollObserver.observe(section);
    }
  });
};

onMounted(async () => {
  // ✅ ELIMINADO: startCarousel()
  initScrollListener();
  await nextTick();
  showSection.value = true;
  initScrollObserver();
  
  // Si hay hash al cargar la página, hacer scroll
  if (route.hash) {
    const id = route.hash.replace('#', '')
    setTimeout(() => {
      scrollToSection(id)
    }, 500)
  }
});

// Detectar cambios en el hash (navegación desde el menú)
watch(() => route.hash, (newHash) => {
  if (newHash) {
    const id = newHash.replace('#', '')
    scrollToSection(id)
  }
})

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

/* ===== SNAP SCROLL ===== */
html, body {
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
}

/* Cada sección con snap */
section, .scroll-section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.3, 1.2);
}

footer {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.3, 1.2);
}

/* ===== CENTRADO VERTICAL ===== */
.scroll-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
}

.scroll-section > div {
  width: 100%;
  max-width: 100%;
}

/* ===== FONDO FIJO ===== */
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

/* Todas las secciones */
.scroll-section {
  position: relative;
  width: 100%;
  z-index: 5;
}

/* Transparencias */
[ref="senateDirectorsRef"],
[ref="historicalReviewRef"],
[ref="museumRef"] {
  background: transparent !important;
}

/* Responsive */
@media (max-width: 768px) {
  .scroll-section {
    justify-content: flex-start;
    padding-top: 4rem;
    padding-bottom: 2rem;
  }
}

@media (min-height: 900px) {
  .scroll-section {
    justify-content: center;
  }
}
</style>

<style>
/* ===== ESTILOS GLOBALES ===== */
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
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

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

footer {
  display: block !important;
  position: relative !important;
  z-index: 100 !important;
  background-image: url('/footer-main.png') !important;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
}

section:first-of-type {
  display: block !important;
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