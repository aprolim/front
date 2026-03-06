<template>  
  <!-- Contenedor principal con flex column -->
  <div class="relative z-10 mx-auto md:pt-20 md:mt-32 min-h-screen flex flex-col">
    <!-- Contenido superior que empuja los botones hacia abajo -->
    <div class="flex-grow"></div>
    
    <!-- Botones del hero -->
    

    <!-- ESPACIADOR ENTRE BOTONES Y FRANJA -->
    <div :class="spacerClasses"></div>

    <!-- FRANJA ROJA DE ANCHO COMPLETO -->
    <div class="relative w-screen left-1/2 right-1/2 -mx-[50vw]">
      <div class="relative bg-gradient-to-r from-red-700/70 via-red-800/70 to-red-900/70 pb-0 pt-2 sm:pt-2 sm:pb-0 md:pb-8 lg:pb-10 xl:pb-10 xl:pt-4 2xl:pb-10 3xl:pb-12 4xl:pb-12 4xl:pt-8 5xl:pb-15 shadow-2xl overflow-hidden group full-width-franja">
        
        <!-- Patrón de fondo sutil -->
        <div class="absolute inset-0 opacity-5">
          <div class="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-yellow-300 rounded-tl-xl"></div>
          <div class="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-yellow-300 rounded-br-xl"></div>
        </div>

        <!-- Líneas decorativas animadas -->
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse"></div>
        <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse"></div>

        <!-- Contenido principal centrado -->
        <div class="container mx-auto px-4 md:px-12 relative z-10 text-center">
          <!-- Texto principal con efecto de gradiente -->
          <p class="font-bold text-white" :class="bannerTextClasses">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-100 to-yellow-200">
              <span class="inline-flex items-center justify-center text-white" :class="bannerCircleClasses">⚪</span> 
              PRIMERA LEGISLATURA DEL TRICENTENARIO
              <span class="inline-flex items-center justify-center text-white" :class="bannerCircleClasses">⚪</span>
            </span>
          </p>

          <!-- Línea decorativa central -->
          <div class="inline-block w-[clamp(3rem,15vw,6rem)] h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-full sm:my-0 md:my-4"></div>
        </div>

        <!-- Elementos decorativos en las esquinas -->
        <div class="absolute top-4 left-4 w-3 h-3 border-2 border-yellow-300/50 rounded-full animate-ping"></div>
        <div class="absolute top-4 right-4 w-3 h-3 border-2 border-yellow-300/50 rounded-full animate-ping" style="animation-delay: 0.5s;"></div>
        <div class="absolute bottom-4 left-4 w-3 h-3 border-2 border-yellow-300/50 rounded-full animate-ping" style="animation-delay: 1s;"></div>
        <div class="absolute bottom-4 right-4 w-3 h-3 border-2 border-yellow-300/50 rounded-full animate-ping" style="animation-delay: 1.5s;"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { heroButtons as heroButtonsData } from './data/heroData'
import { 
  svgSizeClasses,
  tooltipTextClasses,
  tooltipPaddingClasses,
  triangleSize,
  spacerClasses,
  bannerTextClasses,
  bannerCircleClasses
} from './config/heroStyles'

// ✅ Ref para el elemento del DOM (necesaria para :class="{ 'opacity-0 h-0 overflow-hidden': scrolled }")
const heroButtonsRef = ref(null)

const props = defineProps({
  scrolled: Boolean,
  heroLinks: {
    type: Array,
    default: () => [
      {
        to: '/la-institucion',
        title: 'Información Institucional del Senado',
        ariaLabel: 'Información Institucional del Senado Nacional'
      }
    ]
  }
})

const hasIconSlot = computed(() => {
  return true
})
</script>

<style scoped>
.ghost {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.ghost:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-0.25rem);
}

/* Animaciones personalizadas para la franja */
@keyframes gentleGlow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(224, 54, 54, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(224, 54, 54, 0.5);
  }
}

.full-width-franja {
  animation: gentleGlow 3s ease-in-out infinite;
}

/* Asegurar que la franja ocupe todo el ancho */
.w-screen {
  width: 100vw;
}

.left-1\/2 {
  left: 50%;
}

.right-1\/2 {
  right: 50%;
}

.-mx-\[50vw\] {
  margin-left: -50vw;
  margin-right: -50vw;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .grid-cols-2 {
    gap: 0.75rem;
  }
}
</style>