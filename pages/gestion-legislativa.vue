<!-- pages/gestion-legislativa.vue -->
<template>
  <div class="min-h-screen text-style">
    <!-- Fondo fijo GLOBAL -->
    <div class="global-fixed-background" :class="{ 'show-fixed': isSection1Visible || isSection2Visible || isSection3Visible || isSection4Visible || isSection5Visible }"></div>
    
    <!-- Hero Section - Sesiones del Pleno (PRIMERA SECCIÓN) -->
    <section 
      id="sesiones-pleno"
      ref="plenarySessionsRef" 
      class="scroll-section opacity-0 translate-y-8 transition-all duration-800 ease-out z-10"
      :class="{ 'animate-in': isSection1Visible }"
      style="min-height: 100vh; position: relative; background: transparent !important; align-items: center; display: flex; justify-content: center; flex-direction: column;"
    >
      <PlenarySessions />
      <ScrollProgress
        :scrolled="scrolled"
        :scroll-progress="scrollProgress"
      />
    </section>

    <!-- Sección Directiva Camaral (SEGUNDA SECCIÓN) -->
    <div 
      id="area-de-legislacion"
      ref="section2Ref" 
      class="scroll-section opacity-0 translate-y-8 transition-all duration-800 ease-out z-10"
      :class="{ 'animate-in': isSection2Visible }"
      style="min-height: 100vh; position: relative; background: transparent !important; align-items: center; display: flex; justify-content: center; flex-direction: column;"
    >
      <LegislationTable
        :hash="hashParams" 
        :query="$route.query"
      ></LegislationTable>
    </div>
    
    <!-- Sección Reseña Histórica Original (TERCERA SECCIÓN) -->
    <div 
      id="area-de-fiscalizacion"
      ref="section3Ref" 
      class="scroll-section opacity-0 translate-y-8 transition-all duration-800 ease-out delay-200 z-10"
      :class="{ 'animate-in': isSection3Visible }"
      style="min-height: 100vh; position: relative; background: transparent !important; align-items: center; display: flex; justify-content: center; flex-direction: column;"
    >
      <FiscalizationTable
        :hash="hashParams" 
        :query="$route.query"
      ></FiscalizationTable>
    </div>

    <!-- Sección Reseña Histórica Duplicada (CUARTA SECCIÓN) -->
    <div 
      id="area-de-gestion"
      ref="section4Ref" 
      class="scroll-section opacity-0 translate-y-8 transition-all duration-800 ease-out delay-200 z-10"
      :class="{ 'animate-in': isSection4Visible }"
      style="min-height: 100vh; position: relative; background: transparent !important; align-items: center; display: flex; justify-content: center; flex-direction: column;"
    >
      <ManagementTable
        :hash="hashParams" 
        :query="$route.query"
      ></ManagementTable>
    </div>
    
    <!-- Sección Museo / Gaceta Legislativa (QUINTA SECCIÓN) -->
    <div 
      id="gaceta-legislativa"
      ref="section5Ref" 
      class="scroll-section opacity-0 translate-y-8 transition-all duration-800 ease-out delay-400 z-10"
      :class="{ 'animate-in': isSection5Visible }"
      style="min-height: 100vh; position: relative; background: transparent !important; align-items: center; display: flex; justify-content: center; flex-direction: column;"
    >
      <LegislativeGazette />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useScrollEffects } from '@/composables/useScrollEffects'
import ScrollProgress from '@/components/UI/ScrollProgress.vue'
import PlenarySessions from '~/components/PlenarySessions.vue'
import LegislativeGazette from '~/components/LegislativeGazette.vue'
import LegislationTable from '~/components/LegislationTable.vue'
import FiscalizationTable from '~/components/FiscalizationTable.vue'
import ManagementTable from '~/components/ManagementTable.vue'

const hashParams = computed(() => {
  const hash = route.hash
  if (!hash) return {}
  return hash.substring(1)
})

const { scrolled, scrollProgress, initScrollListener, removeScrollListener } = useScrollEffects()
const route = useRoute()

const plenarySessionsRef = ref(null)
const section2Ref = ref(null)
const section3Ref = ref(null)
const section4Ref = ref(null)
const section5Ref = ref(null)

const isSection1Visible = ref(false)
const isSection2Visible = ref(false)
const isSection3Visible = ref(false)
const isSection4Visible = ref(false)
const isSection5Visible = ref(false)

// Mapa de secciones para scroll
const sections = {
  'sesiones-pleno': plenarySessionsRef,
  'area-de-legislacion': section2Ref,
  'area-de-fiscalizacion': section3Ref,
  'area-de-gestion': section4Ref,
  'gaceta-legislativa': section5Ref
}

const scrollToSection = (id) => {
  const sectionRef = sections[id]
  if (sectionRef?.value) {
    const container = document.querySelector('.snap-container')
    if (container) {
      container.style.scrollSnapType = 'none'
    }
    
    sectionRef.value.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start',
      inline: 'nearest'
    })
    
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
          if (entry.target === plenarySessionsRef.value) {
            isSection1Visible.value = true;
          } else if (entry.target === section2Ref.value) {
            isSection2Visible.value = true;
          } else if (entry.target === section3Ref.value) {
            isSection3Visible.value = true;
          } else if (entry.target === section4Ref.value) {
            isSection4Visible.value = true;
          } else if (entry.target === section5Ref.value) {
            isSection5Visible.value = true;
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
  
  const sectionsToObserve = [
    plenarySessionsRef.value,
    section2Ref.value,
    section3Ref.value,
    section4Ref.value,
    section5Ref.value
  ];
  
  sectionsToObserve.forEach(section => {
    if (section) {
      scrollObserver.observe(section);
    }
  });
};

onMounted(async () => {
  initScrollListener();
  await nextTick();
  initScrollObserver();
  
  if (route.hash) {
    const id = route.hash.replace('#', '')
    setTimeout(() => {
      scrollToSection(id)
    }, 500)
  }
});

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

:global(html), :global(body) {
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  scroll-padding-top: 80px;
}

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

.scroll-section {
  position: relative;
  width: 100%;
  z-index: 5;
}

/* FORZAR TRANSPARENCIA EN TODAS LAS SECCIONES */
[ref="plenarySessionsRef"],
[ref="section2Ref"],
[ref="section3Ref"],
[ref="section4Ref"],
[ref="section5Ref"] {
  background: transparent !important;
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