<!-- components/News/LatestNewsSection.vue -->
<template>
  <section 
    class="bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
    ref="sectionRef"
  >
    <!-- Elemento decorativo -->
    <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#8B1A1A]/10 to-transparent rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#F9E076]/10 to-transparent rounded-full blur-3xl"></div>
    
    <div class="container mx-auto px-10 relative z-10">
      <!-- Encabezado -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Últimas <span class="text-[#8B1A1A]">Noticias</span>
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Información actualizada sobre las actividades legislativas del Senado Nacional
        </p>
      </div>

      <!-- Grid de noticias -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" ref="newsGrid">
        <NewsCard
          v-for="(news, index) in latestNews"
          :key="news.id"
          :is-visible="isInView"
          :transition-delay="`${index * 150}ms`"
        >
          <LatestNewsContent :news="news" />
        </NewsCard>
      </div>

      <!-- Botón para más noticias -->
      <div class="text-center mt-12">
        <NuxtLink 
          to="/noticias"
          class="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-[#8B1A1A] to-[#5C1010] text-white font-bold rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
        >
          <span>Ver todas las noticias</span>
          <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </NuxtLink>
      </div>
      <br>
    </div>
  </section>
</template>

<script setup>
import { latestNews } from '@/data/news'
import NewsCard from '@/components/News/NewsCard.vue'
import LatestNewsContent from '@/components/News/LatestNewsContent.vue'

const props = defineProps({
  isInView: Boolean
})

const sectionRef = ref(null)
const newsGrid = ref(null)

defineExpose({
  sectionRef,
  newsGrid
})
</script>