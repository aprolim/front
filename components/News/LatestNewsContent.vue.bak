<!-- components/News/LatestNewsContent.vue -->
<template>
  <div>
    <!-- Imagen -->
    <div class="relative h-48 overflow-hidden">
      <img 
        :src="news.image"
        :alt="news.title"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      <div class="absolute top-4 left-4">
        <span class="px-3 py-1 bg-gradient-to-r from-[#8B1A1A] to-[#5C1010] text-white text-xs font-bold rounded-full shadow-lg">
          {{ news.category }}
        </span>
      </div>
    </div>
    
    <!-- Contenido -->
    <div class="p-6">
      <div class="flex items-center justify-between mb-3">
        <span class="text-xs font-medium" :class="categoryColor">{{ news.commission }}</span>
        <span class="text-xs text-gray-500">{{ news.date }}</span>
      </div>
      
      <h3 class="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#8B1A1A] transition-colors">
        {{ news.title }}
      </h3>
      
      <p class="text-sm text-gray-600 mb-4 line-clamp-3">
        {{ news.description }}
      </p>
      
      <NuxtLink 
        :to="news.link"
        class="text-sm font-bold text-[#8B1A1A] hover:text-[#5C1010] transition-colors inline-flex items-center gap-1 group"
      >
        Leer más
        <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  news: {
    type: Object,
    required: true
  }
})

const categoryColor = computed(() => {
  const colors = {
    'EDUCACIÓN': 'text-[#8B1A1A]',
    'SALUD': 'text-[#D4AF37]',
    'MEDIO AMBIENTE': 'text-[#007934]',
    'TECNOLOGÍA': 'text-[#575756]'
  }
  return colors[props.news.category] || 'text-[#8B1A1A]'
})
</script>