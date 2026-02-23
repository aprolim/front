<!-- pages/index.vue - VERSIÓN CON EFECTOS PERSISTENTES -->
<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section 
      class="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden transition-all duration-500"
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
    <div class="relative h-16 -mt-8 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white"></div>
      <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E03636]/30 to-transparent"></div>
    </div>

    <!-- Secciones con efectos persistentes -->
    <div 
      ref="importantNewsRef" 
      class="scroll-section persistent-section"
      data-section-id="news"
    >
      <div class="container mx-auto px-4 md:px-10 py-12">
        <ImportantNewsSection />
      </div>
    </div>
    
    <div 
      ref="moreNewsRef" 
      class="scroll-section persistent-section"
      data-section-id="more-news"
    >
      <div class="container mx-auto px-4 md:px-10 py-12">
        <MoreNewsGrid />
      </div>
    </div>
    
    <!-- Parte de los senadores -->
    <div 
      ref="senateRef" 
      class="scroll-section persistent-section"
      data-section-id="senate"
    >
      <div class="container mx-auto px-4 md:px-10 py-12">
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
    </div>
    
    <!-- Museo -->
    <div 
      ref="museumRef" 
      class="scroll-section persistent-section"
      data-section-id="museum"
    >
      <div class="container mx-auto px-4 md:px-10 py-12">
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

    <!-- Espacio final ajustado -->
    <div class="h-8"></div>
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

// Estados
const darkMode = ref(false)
const heroSection = ref(null)

// Refs para las secciones
const importantNewsRef = ref(null)
const moreNewsRef = ref(null)
const senateRef = ref(null)
const museumRef = ref(null)

// Set para trackear secciones ya animadas
const animatedSections = ref(new Set())

// Observadores
let scrollObserver = null

// Handlers
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

// Inicializar efectos persistentes
const initPersistentEffects = () => {
  scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.dataset.sectionId
        
        if (entry.isIntersecting) {
          // Solo animar si no se ha animado antes
          if (!animatedSections.value.has(sectionId)) {
            animatedSections.value.add(sectionId)
            entry.target.classList.add('section-animated')
            
            // Añadir clases a elementos hijos
            const children = entry.target.querySelectorAll('.scroll-element')
            children.forEach((child, index) => {
              child.style.animationDelay = `${index * 0.15}s`
              child.classList.add('element-visible')
            })
          } else {
            // Si ya fue animado, mantener visible
            entry.target.classList.add('section-animated')
            entry.target.classList.add('section-persistent')
          }
        }
      })
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -30px 0px'
    }
  )
  
  // Observar todas las secciones
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

// Añadir efectos hover dinámicos
const initHoverEffects = () => {
  // Efecto de giro para cards
  document.addEventListener('mouseover', (e) => {
    const card = e.target.closest('.spin-on-hover')
    if (card && !card.classList.contains('spinning')) {
      card.classList.add('spinning')
      setTimeout(() => {
        card.classList.remove('spinning')
      }, 600)
    }
  })
  
  // Efecto de onda para botones
  document.addEventListener('click', (e) => {
    const button = e.target.closest('.wave-effect')
    if (button) {
      createWaveEffect(e, button)
    }
  })
}

// Crear efecto de onda
const createWaveEffect = (event, element) => {
  const rect = element.getBoundingClientRect()
  const wave = document.createElement('span')
  
  wave.className = 'wave-ripple'
  wave.style.width = wave.style.height = `${Math.max(rect.width, rect.height)}px`
  wave.style.left = `${event.clientX - rect.left - Math.max(rect.width, rect.height) / 2}px`
  wave.style.top = `${event.clientY - rect.top - Math.max(rect.width, rect.height) / 2}px`
  
  element.appendChild(wave)
  
  setTimeout(() => {
    wave.remove()
  }, 1000)
}

// Efecto de parallax dinámico
const initDynamicParallax = () => {
  let ticking = false
  
  const updateParallax = () => {
    const scrolled = window.pageYOffset
    
    // Parallax para hero
    if (heroSection.value && scrolled < 1000) {
      heroSection.value.style.transform = `translateY(${scrolled * 0.2}px)`
    }
    
    // Efecto de profundidad para secciones animadas
    const sections = document.querySelectorAll('.section-animated')
    sections.forEach((section, index) => {
      const speed = 0.1 + (index * 0.05)
      const yPos = -(scrolled * speed)
      section.style.transform = `translateY(${yPos}px)`
    })
    
    ticking = false
  }
  
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax)
      ticking = true
    }
  }
  
  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}

let cleanupParallax = null

onMounted(() => {
  // Iniciar carrusel
  startCarousel()
  
  // Iniciar listeners de scroll
  initScrollListener()
  
  // Inicializar efectos después de que el DOM esté listo
  nextTick(() => {
    initPersistentEffects()
    initHoverEffects()
    cleanupParallax = initDynamicParallax()
  })
})

onUnmounted(() => {
  removeScrollListener()
  
  // Limpiar observers
  if (scrollObserver) {
    scrollObserver.disconnect()
  }
  
  // Limpiar event listeners
  if (cleanupParallax) {
    cleanupParallax()
  }
  
  document.removeEventListener('mouseover', initHoverEffects)
  document.removeEventListener('click', createWaveEffect)
})

definePageMeta({
  layout: 'alter8'
})
</script>

<style>
/* EFECTOS PERSISTENTES Y ELEGANTES */

/* 1. Sistema de animaciones persistentes */
.persistent-section {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55),
              transform 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  will-change: opacity, transform;
}

.persistent-section.section-animated {
  opacity: 1;
  transform: translateY(0);
}

.persistent-section.section-persistent {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

/* 2. Efecto de giro elegante (nuevo) */
.spin-reveal {
  opacity: 0;
  transform: rotateY(180deg) scale(0.8);
  animation: elegantSpinIn 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
}

@keyframes elegantSpinIn {
  0% {
    opacity: 0;
    transform: rotateY(180deg) scale(0.8);
    filter: blur(10px);
  }
  70% {
    opacity: 0.7;
    transform: rotateY(-20deg) scale(1.05);
    filter: blur(2px);
  }
  100% {
    opacity: 1;
    transform: rotateY(0) scale(1);
    filter: blur(0);
  }
}

/* 3. Efecto de tarjeta que gira al hover */
.spin-on-hover {
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.spin-on-hover.spinning {
  animation: cardSpin 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes cardSpin {
  0% {
    transform: rotateY(0) scale(1);
  }
  50% {
    transform: rotateY(180deg) scale(1.05);
  }
  100% {
    transform: rotateY(360deg) scale(1);
  }
}

/* 4. Efecto de entrada con onda circular */
.circle-reveal {
  position: relative;
  overflow: hidden;
}

.circle-reveal::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(224, 54, 54, 0.1);
  transform: translate(-50%, -50%);
  animation: circleExpand 1.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
  z-index: 0;
}

@keyframes circleExpand {
  to {
    width: 200%;
    height: 200%;
    opacity: 0;
  }
}

/* 5. Efecto de rotación 3D continua (elegante) */
.continuous-rotate {
  animation: gentleRotation 20s linear infinite;
  transform-style: preserve-3d;
}

@keyframes gentleRotation {
  from {
    transform: rotateY(0) rotateX(5deg);
  }
  to {
    transform: rotateY(360deg) rotateX(5deg);
  }
}

/* 6. Efecto de entrada en espiral */
.spiral-in {
  opacity: 0;
  transform: rotate(720deg) scale(0);
  animation: spiralEntrance 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
}

@keyframes spiralEntrance {
  0% {
    opacity: 0;
    transform: rotate(720deg) scale(0);
  }
  70% {
    opacity: 0.8;
    transform: rotate(-90deg) scale(1.1);
  }
  100% {
    opacity: 1;
    transform: rotate(0) scale(1);
  }
}

/* 7. Efecto de tarjeta que se despliega */
.unfold-card {
  transform-origin: top center;
  opacity: 0;
  transform: rotateX(-90deg) translateY(-20px);
  animation: cardUnfold 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes cardUnfold {
  0% {
    opacity: 0;
    transform: rotateX(-90deg) translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: rotateX(0) translateY(0);
  }
}

/* 8. Efecto de onda al hacer click */
.wave-effect {
  position: relative;
  overflow: hidden;
}

.wave-ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  transform: scale(0);
  animation: ripple 0.6s linear;
  pointer-events: none;
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

/* 9. Efecto de levitación suave */
.float-gently {
  animation: gentleFloat 6s ease-in-out infinite;
}

@keyframes gentleFloat {
  0%, 100% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-10px) rotate(1deg);
  }
}

/* 10. Efecto de entrada desde múltiples direcciones */
.multi-direction {
  opacity: 0;
}

.persistent-section.section-animated .multi-direction:nth-child(odd) {
  animation: slideFromLeft 0.6s ease-out forwards;
}

.persistent-section.section-animated .multi-direction:nth-child(even) {
  animation: slideFromRight 0.6s ease-out forwards;
}

@keyframes slideFromLeft {
  from {
    opacity: 0;
    transform: translateX(-50px) rotate(-5deg);
  }
  to {
    opacity: 1;
    transform: translateX(0) rotate(0);
  }
}

@keyframes slideFromRight {
  from {
    opacity: 0;
    transform: translateX(50px) rotate(5deg);
  }
  to {
    opacity: 1;
    transform: translateX(0) rotate(0);
  }
}

/* 11. Efecto de zoom con rotación */
.zoom-rotate {
  opacity: 0;
  transform: scale(0.5) rotate(-180deg);
  animation: zoomRotateIn 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes zoomRotateIn {
  0% {
    opacity: 0;
    transform: scale(0.5) rotate(-180deg);
  }
  70% {
    opacity: 0.8;
    transform: scale(1.1) rotate(20deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0);
  }
}

/* 12. Efecto de tarjeta que se voltea */
.flip-card-container {
  perspective: 1000px;
}

.flip-card {
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.flip-card:hover {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  backface-visibility: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
}

.flip-card-back {
  transform: rotateY(180deg);
}

/* 13. Efecto de entrada con rebote controlado */
.bounce-in {
  opacity: 0;
  transform: scale(0.3);
  animation: controlledBounce 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
}

@keyframes controlledBounce {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* 14. Efecto de rotación orbital */
.orbital-rotate {
  animation: orbitalRotation 15s linear infinite;
}

@keyframes orbitalRotation {
  from {
    transform: rotate(0deg) translateX(20px) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(20px) rotate(-360deg);
  }
}

/* 15. Efecto de entrada en cascada */
.cascade-item {
  opacity: 0;
  transform: translateY(20px);
}

.persistent-section.section-animated .cascade-item {
  animation: cascadeIn 0.5s ease-out forwards;
}

.persistent-section.section-animated .cascade-item:nth-child(1) { animation-delay: 0.1s; }
.persistent-section.section-animated .cascade-item:nth-child(2) { animation-delay: 0.2s; }
.persistent-section.section-animated .cascade-item:nth-child(3) { animation-delay: 0.3s; }
.persistent-section.section-animated .cascade-item:nth-child(4) { animation-delay: 0.4s; }
.persistent-section.section-animated .cascade-item:nth-child(5) { animation-delay: 0.5s; }

@keyframes cascadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 16. Efecto de brillo pulsante elegante */
.pulse-glow {
  animation: elegantPulse 3s ease-in-out infinite;
}

@keyframes elegantPulse {
  0%, 100% {
    box-shadow: 0 0 20px rgba(224, 54, 54, 0.1);
  }
  50% {
    box-shadow: 0 0 40px rgba(224, 54, 54, 0.2);
  }
}

/* 17. Efecto de movimiento de olas */
.wave-motion {
  background: linear-gradient(90deg, 
    transparent, 
    rgba(224, 54, 54, 0.1), 
    transparent
  );
  background-size: 200% 100%;
  animation: waveMotion 3s ease-in-out infinite;
}

@keyframes waveMotion {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* MEJORAS DE RENDIMIENTO Y ACCESIBILIDAD */

/* Optimizar para dispositivos móviles */
@media (max-width: 768px) {
  .persistent-section {
    transform: translateY(20px);
  }
  
  .spin-on-hover:hover {
    transform: none;
  }
  
  .flip-card:hover {
    transform: none;
  }
}

/* Reducir movimiento para accesibilidad */
@media (prefers-reduced-motion: reduce) {
  .persistent-section,
  .spin-reveal,
  .spin-on-hover,
  .circle-reveal::before,
  .continuous-rotate,
  .spiral-in,
  .unfold-card,
  .float-gently,
  .multi-direction,
  .zoom-rotate,
  .flip-card,
  .bounce-in,
  .orbital-rotate,
  .cascade-item,
  .pulse-glow,
  .wave-motion,
  .wave-ripple {
    animation: none !important;
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
  }
  
  .persistent-section.section-animated,
  .persistent-section.section-persistent {
    opacity: 1 !important;
    transform: none !important;
  }
  
  .circle-reveal::before {
    display: none;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

/* Asegurar visibilidad permanente */
.scroll-element.element-visible {
  opacity: 1 !important;
  visibility: visible !important;
}

/* Clases utilitarias para aplicar efectos */
.add-spin:hover {
  animation: quickSpin 0.5s ease;
}

@keyframes quickSpin {
  to { transform: rotate(360deg); }
}

.add-shake:hover {
  animation: gentleShake 0.5s ease;
}

@keyframes gentleShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  75% { transform: translateX(3px); }
}

.add-pulse {
  animation: subtlePulse 2s ease-in-out infinite;
}

@keyframes subtlePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}
</style>

<style scoped>
/* Espaciado ajustado */
.container.py-12 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

@media (max-width: 768px) {
  .container.py-12 {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}
</style>