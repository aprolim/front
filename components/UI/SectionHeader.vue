<template>
  <div class="text-center mb-16 relative">
    <!-- Elementos decorativos -->
    <div class="absolute -top-6 left-1/2 transform -translate-x-1/2">
      <div class="w-16 h-1 bg-gradient-to-r from-[#8B1A1A] via-[#F9E076] to-[#007934] rounded-full"></div>
    </div>
    
    <!-- Subtítulo -->
    <div class="mb-4">
      <span class="inline-block px-4 py-2 bg-gradient-to-r from-[#8B1A1A]/10 to-[#007934]/10 text-[#8B1A1A] font-semibold rounded-full text-sm tracking-wider border border-[#8B1A1A]/20">
        {{ subtitle }}
      </span>
    </div>
    
    <!-- Título principal -->
    <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
      <span class="block">{{ title }}</span>
      <span class="block text-[#8B1A1A]">{{ highlightedText }}</span>
    </h2>
    
    <!-- Descripción -->
    <p class="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
      {{ description }}
    </p>
    
    <!-- Línea decorativa inferior -->
    <div class="mt-8 flex justify-center">
      <div class="w-24 h-1 bg-gradient-to-r from-transparent via-[#F9E076] to-transparent rounded-full"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  subtitle: {
    type: String,
    default: 'Comunicación Oficial'
  },
  title: {
    type: String,
    default: 'Información'
  },
  highlightedText: {
    type: String,
    default: 'Legislativa'
  },
  description: {
    type: String,
    default: 'Acceda a las noticias, proyectos de ley y actividades oficiales del Senado Nacional de Bolivia'
  }
})
</script>

<style scoped>
/* Animación sutil para el subtítulo */
span:first-of-type {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}
</style>