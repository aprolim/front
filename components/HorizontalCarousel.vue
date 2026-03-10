<template>
  <div class="relative w-full h-full flex flex-col items-center justify-center px-[4vw]">
    <div class="h-[4.4vw]"></div>
    
    <!-- Título (opcional) -->
    <h2 v-if="title" class="text-2xl font-bold text-center mb-8 text-[#E03636] uppercase tracking-wide">
      {{ title }}
    </h2>

    <!-- Contenedor del carrusel -->
    <div class="relative w-full mx-auto px-12">
      
      <!-- Flecha izquierda -->
      <button 
        @click="prevSlide"
        class="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-[#E03636] rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 border-2 border-[#E03636]/30"
        :disabled="!hasImages"
        :class="{ 'opacity-50 cursor-not-allowed': !hasImages }"
        aria-label="Imagen anterior"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Contenedor de imágenes -->
      <div class="overflow-hidden">
        <div 
          v-if="hasImages"
          class="flex transition-transform duration-500 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div 
            v-for="(group, groupIndex) in imageGroups" 
            :key="groupIndex"
            class="flex-shrink-0 w-full grid grid-cols-4 gap-4"
          >
            <div 
              v-for="(image, imgIndex) in group" 
              :key="imgIndex"
              class="relative group overflow-hidden rounded-xl shadow-2xl border-4 border-white aspect-square"
            >
              <img 
                :src="image.url" 
                :alt="image.alt || `Imagen ${groupIndex * 4 + imgIndex + 1}`"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div v-if="image.title" class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p class="text-white p-4 font-medium">{{ image.title }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Mensaje si no hay imágenes -->
        <div v-else class="flex items-center justify-center h-64 bg-gray-100 rounded-xl border-4 border-white shadow-2xl">
          <p class="text-gray-500 text-lg">No hay imágenes disponibles</p>
        </div>
      </div>

      <!-- Flecha derecha -->
      <button 
        @click="nextSlide"
        class="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-[#E03636] rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 border-2 border-[#E03636]/30"
        :disabled="!hasImages"
        :class="{ 'opacity-50 cursor-not-allowed': !hasImages }"
        aria-label="Imagen siguiente"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Indicadores (puntitos) -->
    <div v-if="hasImages" class="flex justify-center mt-6 space-x-2">
      <button 
        v-for="(_, index) in imageGroups.length" 
        :key="index"
        @click="currentIndex = index"
        class="transition-all duration-300 rounded-full"
        :class="[
          currentIndex === index 
            ? 'w-8 h-2 bg-[#E03636]' 
            : 'w-2 h-2 bg-gray-400 hover:bg-[#E03636]/50'
        ]"
        :aria-label="`Ir a página ${index + 1}`"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => [
      {
        url: '/horizontal carousel/c1.png',
        alt: 'Edificio del Senado',
        title: 'Edificio del Senado Nacional'
      },
      {
        url: '/horizontal carousel/c2.png',
        alt: 'Sesión del Senado',
        title: 'Sesión Plenaria'
      },
      {
        url: '/horizontal carousel/c3.png',
        alt: 'Hemiciclo',
        title: 'Hemiciclo del Senado'
      },
      {
        url: '/horizontal carousel/c4.png',
        alt: 'Bandera de Bolivia',
        title: 'Bandera Nacional'
      },
      {
        url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Edificio del Senado',
        title: 'Edificio del Senado Nacional'
      },
      {
        url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Sesión del Senado',
        title: 'Sesión Plenaria'
      },
      {
        url: 'https://images.unsplash.com/photo-1627556592933-ffe99c1cd9eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Hemiciclo',
        title: 'Hemiciclo del Senado'
      },
      {
        url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Bandera de Bolivia',
        title: 'Bandera Nacional'
      }
    ]
  },
  title: {
    type: String,
    default: 'Galería Institucional'
  }
})

const hasImages = computed(() => props.images && props.images.length > 0)

// Agrupar imágenes en grupos de 4
const imageGroups = computed(() => {
  const groups = []
  for (let i = 0; i < props.images.length; i += 4) {
    groups.push(props.images.slice(i, i + 4))
  }
  return groups
})

const currentIndex = ref(0)

const nextSlide = () => {
  if (currentIndex.value < imageGroups.value.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = imageGroups.value.length - 1
  }
}
</script>

<style scoped>
.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.border-white {
  border-color: #ffffff;
}

.hover\:scale-110:hover {
  transform: scale(1.1);
}

/* Hace que las imágenes sean cuadradas */
.aspect-square {
  aspect-ratio: 1 / 1;
}
</style>