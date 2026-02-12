<!-- components/HeroSection/HeroContent.vue - VERSIÓN CORREGIDA -->
<template>
  <!-- Imagen en la derecha -->
  <div class="absolute top-4 right-6 md:right-4 z-30">
    <img 
      src="/senadores2.png"
      alt="Logo del Senado" 
      class="w-12 h-12 md:w-16 md:h-16 object-contain"
    />
  </div>
  
  <!-- Contenedor principal con la franja incluida -->
  <div class="relative z-10 mx-auto md:pt-20 md:mt-32 md:mt-53">
    <!-- Primera parte: contenido centrado -->
    <div class="container px-6 md:px-12">
      <div class="max-w-4xl mx-auto">
        <!-- Logo/Texto que se transforma -->
        <div class="mb-8 md:mb-12 transition-all duration-500" :class="{ 'transform scale-90 md:scale-95': scrolled }">
          <!-- Versión compacta (al hacer scroll) -->
          <div 
            class="transition-all duration-500 flex items-center gap-4"
            :class="scrolled ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'"
          >
            <div>
              <h2 class="text-2xl md:text-3xl font-bold text-white">Camara de senadores</h2>
              <p class="text-sm text-white/80">Estado Plurinacional de Bolivia</p>
            </div>
          </div>
        </div>

        <br>
        <br>
        <br><br><br>
      </div>
    </div>

    <!-- FRANJA ROJA DE ANCHO COMPLETO (dentro del mismo contenedor principal) -->
    <!-- Usamos posición absoluta para que salga del container pero esté dentro del mismo div padre -->
    <div class="absolute left-0 right-0 -bottom-[20%] md:-bottom-[35%] lg:-bottom-[50%] xl:-bottom-[70%] 2xl:-bottom-[110%] 3xl:-bottom-[140%] 4xl:-bottom-[160%] 5xl:-bottom-[180%] z-20">
      <div class="relative bg-gradient-to-r from-red-700/70 via-red-800/70 to-red-900/70 py-0 md:py-4 lg:py-8 xl:py-14 2xl:py-24 3xl:py-28 4xl:py-32 5xl:py-32 shadow-2xl overflow-hidden group full-width-franja">
        
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
          <p class="text-2xl md:text-3xl font-bold text-white">
    <span class="bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-100 to-yellow-200">
      <span class="inline-flex items-center justify-center text-base -translate-y-1 text-white">⚪</span> 
      PRIMERA LEGISLATURA DEL TRICENTENARIO 
      <span class="inline-flex items-center justify-center text-base -translate-y-1 text-white">⚪</span>
    </span>
  </p>

          <!-- Línea decorativa central -->
          <div class="inline-block w-24 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-full my-4"></div>
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
import { computed } from 'vue'

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

/* Aplicar animación a la franja */
.full-width-franja {
  animation: gentleGlow 3s ease-in-out infinite;
}

/* Estilos para que la franja ocupe ancho completo */
.absolute.left-0.right-0 {
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .grid.grid-cols-2 {
    gap: 1rem;
  }
  
  .px-8.py-4 {
    padding: 0.75rem;
  }
  
  svg {
    width: 80px;
    height: 80px;
  }
  
  /* Ajustar imagen en móviles */
  .absolute.top-4.right-6 {
    right: 1.5rem;
  }
  
  img.w-12 {
    width: 3rem;
    height: 3rem;
  }
  
  /* Ajustar franja en móviles */
  .absolute.left-0.right-0 {
    margin-left: -50vw;
    margin-right: -50vw;
  }
}

/* Asegurar que el contenido tenga espacio para la franja */
.relative.z-10.mx-auto {
  padding-bottom: 6rem; /* Espacio para que la franja no tape contenido */
}
</style>