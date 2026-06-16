<template>
  <div 
    ref="cardRef"
    class="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 transform-gpu will-change-transform"
    :class="[
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      animationClass
    ]"
    :style="animationStyle"
  >
    <slot>
      <!-- Slot por defecto -->
      <div class="relative h-48 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Imagen de noticia"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      </div>
      
      <div class="p-6">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-medium text-[#8B1A1A]">Categoría</span>
          <span class="text-xs text-gray-500">Fecha</span>
        </div>
        
        <h3 class="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#8B1A1A] transition-colors">
          Título de la noticia
        </h3>
        
        <p class="text-sm text-gray-600 mb-4">
          Descripción de la noticia. Información relevante sobre el tema.
        </p>
        
        <NuxtLink 
          to="#"
          class="text-sm font-bold text-[#8B1A1A] hover:text-[#5C1010] transition-colors inline-flex items-center gap-1 group"
        >
          Leer más
          <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
          </svg>
        </NuxtLink>
      </div>
    </slot>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: true
  },
  transitionDelay: {
    type: String,
    default: '0ms'
  }
})

const cardRef = ref(null)

const animationClass = computed(() => {
  return props.isVisible ? 'animate-fadeInUp' : ''
})

const animationStyle = computed(() => {
  return {
    '--delay': props.transitionDelay,
    animationDelay: props.transitionDelay
  }
})

// Auto-detección de visibilidad
const elementInView = ref(false)

onMounted(() => {
  if (typeof window !== 'undefined') {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          elementInView.value = entry.isIntersecting
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (cardRef.value) {
      observer.observe(cardRef.value)
    }

    // Cleanup
    return () => {
      if (cardRef.value) {
        observer.unobserve(cardRef.value)
      }
    }
  }
})
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
  animation-delay: var(--delay, 0ms);
}

/* Optimización de rendimiento */
.transform-gpu {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

.will-change-transform {
  will-change: transform, opacity;
}
</style>