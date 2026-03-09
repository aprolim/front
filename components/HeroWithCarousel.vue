<template>
  <div class="relative z-10 mx-auto min-h-screen flex flex-col w-full">
    <!-- FRANJA ROJA DE ANCHO COMPLETO (superior) - CON MARGEN PARA HEADER -->
    <div class="relative w-screen left-1/2 right-1/2 -mx-[50vw] mt-[4.4vw]">
      <div class="relative bg-gradient-to-r from-red-700/70 via-red-800/70 to-red-900/70 py-2 sm:py-3 md:py-4 shadow-2xl overflow-hidden group full-width-franja">
        
        <!-- Patrón de fondo sutil (más pequeño) -->
        <div class="absolute inset-0 opacity-5">
          <div class="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-yellow-300 rounded-tl-lg"></div>
          <div class="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-yellow-300 rounded-br-lg"></div>
        </div>

        <!-- Líneas decorativas animadas (más delgadas) -->
        <div class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse"></div>
        <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse"></div>

        <!-- Contenido principal centrado -->
        <div class="container mx-auto px-4 relative z-10 text-center">
          <!-- Texto principal - MÁS PEQUEÑO -->
          <p class="font-bold text-white text-[clamp(0.8rem,2vw,1.5rem)]">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-100 to-yellow-200">
              <span class="inline-flex items-center justify-center text-white text-[clamp(0.5rem,1vw,0.9rem)] mx-1">⚪</span> 
              PRIMERA LEGISLATURA DEL TRICENTENARIO
              <span class="inline-flex items-center justify-center text-white text-[clamp(0.5rem,1vw,0.9rem)] mx-1">⚪</span>
            </span>
          </p>

         
        </div>

        <!-- Elementos decorativos en las esquinas - MÁS PEQUEÑOS -->
        <div class="absolute top-2 left-2 w-2 h-2 border border-yellow-300/50 rounded-full animate-ping"></div>
        <div class="absolute top-2 right-2 w-2 h-2 border border-yellow-300/50 rounded-full animate-ping" style="animation-delay: 0.5s;"></div>
        <div class="absolute bottom-2 left-2 w-2 h-2 border border-yellow-300/50 rounded-full animate-ping" style="animation-delay: 1s;"></div>
        <div class="absolute bottom-2 right-2 w-2 h-2 border border-yellow-300/50 rounded-full animate-ping" style="animation-delay: 1.5s;"></div>
      </div>
    </div>

    <!-- DOS COLUMNAS: Texto (izquierda) + Carrusel (derecha) - MÁS COMPACTO -->
    <div class="container mx-auto px-4 mt-4 md:mt-6 flex-1 w-full pb-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 h-full">
        
        <!-- COLUMNA IZQUIERDA: Texto y controles - MÁS PEQUEÑA -->
        <div class="flex flex-col h-full relative" style="min-height: 350px;">
          <!-- Texto - TAMAÑOS REDUCIDOS -->
          <div class="space-y-3">
            <h1 class="font-extrabold text-[#E03636] text-[clamp(1.0vw,2.0vw,3.0vw)] text-center">
              {{ slides[currentSlide].title }}
              <br>
            </h1>
            <p class="text-gray-700 leading-relaxed text-[clamp(0.8vw,1.10vw,1.4vw)] text-center" v-html="slides[currentSlide].description">
            </p>
            <div v-if="slides[currentSlide].additionalText" class="text-gray-600 text-[clamp(0.8rem,1.2vw,1rem)]">
              {{ slides[currentSlide].additionalText }}
            </div>
          </div>

          <!-- CONTROLES DEL CAROUSEL - MÁS PEQUEÑOS Y CENTRADOS -->
          <div class="absolute bottom-0 left-0 right-0 flex justify-center z-50">
            <div class="flex justify-center space-x-3 bg-transparent py-2 px-5 rounded-full">
              <button 
                v-for="(_, index) in slides" 
                :key="index"
                @click="currentSlide = index"
                class="transition-all duration-300 rounded-full"
                :class="[
                  currentSlide === index 
                    ? 'bg-[#E03636] ring-2 ring-white outline outline-3 outline-[#E03636] outline-offset-2' 
                    : 'bg-[#E03636] hover:bg-[#E03636]/50'
                ]"
                :style="{ width: '14px', height: '14px' }"
                :aria-label="`Ir a imagen ${index + 1}`"
              ></button>
            </div>
          </div>
        </div>

        <!-- COLUMNA DERECHA: Carrusel de imágenes - MÁS PEQUEÑO -->
        <div class="relative w-full overflow-hidden rounded-lg shadow-xl" style="height: 350px;">
          <!-- Imágenes del carrusel -->
          <div 
            v-for="(slide, index) in slides" 
            :key="index"
            class="absolute inset-0 transition-all duration-700 ease-in-out"
            :class="[
              currentSlide === index 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-full'
            ]"
          >
            <img 
              :src="slide.image.url" 
              :alt="slide.image.alt"
              class="w-full h-full object-cover"
              loading="lazy"
            />
            <!-- Overlay gradiente más sutil -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            
            <!-- Título de la imagen - MÁS PEQUEÑO -->
            <div v-if="slide.image.title" class="absolute bottom-0 left-0 right-0 p-3 text-white">
              <h3 class="font-bold text-lg">{{ slide.image.title }}</h3>
              <p v-if="slide.image.caption" class="text-white/80 text-sm">{{ slide.image.caption }}</p>
            </div>
          </div>

          <!-- Flechas de navegación - MÁS PEQUEÑAS -->
          <button 
            @click="prevSlide"
            class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 z-10 text-lg"
            aria-label="Imagen anterior"
          >
            ←
          </button>
          <button 
            @click="nextSlide"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 z-10 text-lg"
            aria-label="Siguiente imagen"
          >
            →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  bannerTextSize: {
    type: String,
    default: '1.5vw' /* REDUCIDO de 2vw a 1.5vw */
  },
  slides: {
    type: Array,
    default: () => [
      {
        title: 'Mandato Constitucional Senado',
        description: 'La Constitución Política del Estado establece: <br> <b>Artículo 12.</b><br> <b>I. </b>	El Estado se organiza y estructura su poder público a través de los órganos Legislativo, Ejecutivo, Judicial y Electoral. La organización del Estado está fundamentada en la independencia, separación, coordinación y cooperación de estos órganos. <br> <b>Artículo 148.</b> <br> <b>I. </b> La Cámara de Senadores estará conformada por un total de 36 miembros.<br> <b>II. </b> En cada departamento se eligen 4 Senadores en circunscripción departamental, por votación universal, directa y secreta.<br> <b>III. </b> La asignación de los escaños de Senadores en cada departamento se hará mediante el sistema proporcional, de acuerdo a la Ley.',
        additionalText: '',
        image: {
          url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f',
          alt: 'Edificio del Senado',
          title: 'Edificio del Senado',
          caption: 'Sede de la Cámara de Senadores'
        }
      },
      {
        title: 'La Asamblea Legislativa Plurinacional',
        description: 'La Constitución Política del Estado establece: <br>  <b>Artículo 145.</b> La Asamblea Legislativa Plurinacional está compuesta por dos cámaras, la Cámara de Diputados y la Cámara de Senadores, y es la única con facultad de aprobar y sancionar leyes que rigen para todo el territorio boliviano.',
        additionalText: '',
        image: {
          url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9',
          alt: 'Sesión del Senado',
          title: 'Sesión Plenaria',
          caption: 'Senadores en debate'
        }
      },
      {
        title: 'El Rol del Senado en la Asamblea Legislativa Plurinacional',
        description: 'El Reglamento General de la Cámara de Senadores establece: <br> <b>Artículo 2.</b>(Marco Constitucional). En el marco de lo establecido por la Constitución Política del Estado, la Cámara de Senadores de la Asamblea Legislativa Plurinacional reside en el Órgano Legislativo y ejerce las atribuciones de legislación, fiscalización y gestión, bajo los principios de coordinación y cooperación, promoviendo la participación activa de la ciudadanía en todo el territorio boliviano.',
        additionalText: '',
        image: {
          url: 'https://images.unsplash.com/photo-1627556592933-ffe99c1cd9eb',
          alt: 'Hemiciclo',
          title: 'Hemiciclo',
          caption: 'Vista del hemiciclo'
        }
      }
    ]
  }
})

const currentSlide = ref(0)

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % props.slides.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + props.slides.length) % props.slides.length
}
</script>

<style scoped>
@keyframes gentleGlow {
  0%, 100% { box-shadow: 0 0 15px rgba(224, 54, 54, 0.2); }
  50% { box-shadow: 0 0 25px rgba(224, 54, 54, 0.4); }
}

.full-width-franja {
  animation: gentleGlow 3s ease-in-out infinite;
}

.w-screen { width: 100vw; }
.left-1\/2 { left: 50%; }
.right-1\/2 { right: 50%; }
.-mx-\[50vw\] { margin-left: -50vw; margin-right: -50vw; }
.translate-x-0 { transform: translateX(0); }
.translate-x-full { transform: translateX(100%); }
button:focus-visible { outline: 2px solid #E03636; outline-offset: 2px; }
</style>