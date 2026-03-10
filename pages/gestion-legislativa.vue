<!-- pages/la-institucion.vue - VERSIÓN CON SECCIONES Y ANCLAS -->
<template>
  <div class="min-h-screen text-style">
    <!-- Fondo fijo GLOBAL - PARA Senate Directors Y Reseña Histórica -->
    <div class="global-fixed-background" :class="{ 'show-fixed': isSenateDirectorsVisible || isHistoricalReviewVisible }"></div>
    
    <!-- Fondo fijo para Museo -->
    <!-- <div class="museum-fixed-background" :class="{ 'show-fixed': isMuseumVisible }"></div> -->
    
    <!-- Hero Section - CON PADDING SUPERIOR -->
    <section 
      class="relative h-screen flex items-start overflow-hidden transition-all duration-500"
      :class="{ 'min-h-[40vh] md:min-h-[45vh]': scrolled }"
      ref="plenarySessionsRef"
      @mouseleave="resumeCarousel"
      style="background-color: #eeeeee; background-size: cover"
    >
      <p>aqui sesiones del pleno</p>
      <ScrollProgress
        :scrolled="scrolled"
        :scroll-progress="scrollProgress"
      />
    </section>

    <div 
      id="directiva-camaral"
      ref="lesgislationAreaRef" 
      class="scroll-section opacity-0 translate-y-8 transition-all duration-800 ease-out z-10"
      :class="{ 'animate-in': isSenateDirectorsVisible }"
      style="min-height: 100vh; position: relative; background: transparent;"
    >
      <p>area legislativo</p>
    </div>
    
    <div 
      id="reseña-historica"
      ref="oversightAreaRef" 
      class="scroll-section opacity-0 translate-y-8 transition-all duration-800 ease-out delay-200 z-10"
      :class="{ 'animate-in': isHistoricalReviewVisible }"
      style="min-height: 100vh; position: relative; background: transparent;"
    >
      <p>
        area legislativo
      </p>
    </div>

    <div 
      id="reseña-historica"
      ref="managementAreaRef" 
      class="scroll-section opacity-0 translate-y-8 transition-all duration-800 ease-out delay-200 z-10"
      :class="{ 'animate-in': isHistoricalReviewVisible }"
      style="min-height: 100vh; position: relative; background: transparent;"
    >
      <p>
        area legislativo
      </p>
    </div>
    
    <div 
      id="museo"
      ref="legislativeGazette" 
      class="h-screen w-full scroll-section opacity-0 translate-y-8 transition-all duration-800 ease-out delay-400 z-10"
      :class="{ 'animate-in': isMuseumVisible }"
      style="background-color: #eeeeee; background-size: cover; background-position: center; background-repeat: no-repeat; background-attachment: fixed;"
    >
      <p>area gacetas

      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useCarousel } from '@/composables/useCarousel'
import { useScrollEffects } from '@/composables/useScrollEffects'
import ScrollProgress from '@/components/UI/ScrollProgress.vue'



const {
  currentMediaIndex,
  filteredHeroMedia,
  startCarousel,
  resumeCarousel
} = useCarousel(heroMedia.value)

const { scrolled, scrollProgress, initScrollListener, removeScrollListener } = useScrollEffects()

const showSection = ref(true)

const senateDirectorsRef = ref(null)
const historicalReviewRef = ref(null)
const museumRef = ref(null)

const isSenateDirectorsVisible = ref(false)
const isHistoricalReviewVisible = ref(false)
const isMuseumVisible = ref(false)

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

/* ===== SNAP SCROLL CON PADDING PARA HEADER ===== */
html, body {
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  scroll-padding-top: 80px;
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

/* ===== FONDO FIJO PARA SENATE DIRECTORS ===== */
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

/* ===== FONDO FIJO PARA RESEÑA HISTÓRICA ===== */
.historical-fixed-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('/la-institucion/Recurso 1.png');
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

.historical-fixed-background::after {
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

.historical-fixed-background.show-fixed {
  opacity: 1;
  visibility: visible;
}

/* ===== FONDO FIJO PARA MUSEO ===== */
.museum-fixed-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('/fondo-museo.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #eeeeee;
  z-index: 0;
  pointer-events: none;
  will-change: transform;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s ease, visibility 0.5s ease;
}

.museum-fixed-background::after {
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

.museum-fixed-background.show-fixed {
  opacity: 1;
  visibility: visible;
}

/* Todas las secciones */
.scroll-section {
  position: relative;
  width: 100%;
  z-index: 5;
}

/* Transparencias para cada sección */
[ref="senateDirectorsRef"] {
  background: transparent !important;
}

[ref="historicalReviewRef"] {
  background: transparent !important;
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