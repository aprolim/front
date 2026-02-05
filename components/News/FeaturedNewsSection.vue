<!-- components/News/FeaturedNewsSection.vue -->
<template>
  <section 
    class="pt-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    ref="sectionRef"
  >
    <!-- Elementos decorativos de fondo -->
    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8B1A1A] via-[#F9E076] to-[#007934]"></div>
    <div class="absolute -top-24 -right-24 w-96 h-96 bg-[#8B1A1A]/5 rounded-full blur-3xl"></div>
    <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-[#F9E076]/5 rounded-full blur-3xl"></div>
    
    <div class="container mx-auto px-10 relative z-10">
      <SectionHeader
        subtitle="Comunicación Oficial"
        highlightedText="Información"
        title="Legislativa"
        description="Acceda a las noticias, proyectos de ley y actividades oficiales del Senado Nacional de Bolivia"
      />

      <NewsGrid ref="newsGrid">
        <!-- Noticias destacadas usando slots -->
        <slot>
          <!-- Se puede pasar contenido personalizado o usar default -->
          <NewsCard
            v-for="(news, index) in featuredNews"
            :key="news.id"
            :is-visible="isInView"
            :transition-delay="`${index * 150}ms`"
          >
            <!-- Contenido de cada noticia -->
            <FeaturedNewsContent :news="news" />
          </NewsCard>
        </slot>
      </NewsGrid>
    </div>
  </section>
</template>

<script setup>
import { featuredNews } from '@/data/news'
import SectionHeader from '@/components/UI/SectionHeader.vue'
import NewsGrid from '@/components/News/NewsGrid.vue'
import NewsCard from '@/components/News/NewsCard.vue'
import FeaturedNewsContent from '@/components/News/FeaturedNewsContent.vue'

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