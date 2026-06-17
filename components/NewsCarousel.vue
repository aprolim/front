<template>
  <div class="news-carousel">
    <div v-if="loading" class="loader-wrapper">
      <div class="spinner"></div>
      <p>Cargando noticias...</p>
    </div>
    
    <div v-else-if="noticias.length > 0" class="carousel-content">
      <div class="text-column">
        <h2 class="title">{{ noticias[currentIndex].titulo }}</h2>
        <div class="description">
          <p>{{ noticias[currentIndex].descripcion }}</p>
          <p class="date">{{ formatearFecha(noticias[currentIndex].publishedAt) }}</p>
        </div>
        <div class="indicators">
          <button 
            v-for="(_, idx) in noticias" 
            :key="idx"
            @click="currentIndex = idx"
            class="indicator"
            :class="{ active: currentIndex === idx }"
          ></button>
        </div>
      </div>
      
      <div class="image-column">
        <div class="image-wrapper">
          <!-- ✅ IMAGEN CON REINTENTOS AUTOMÁTICOS -->
          <SafeImage 
            :src="noticias[currentIndex].featuredImage?.url || noticias[currentIndex].imagen || '/images/default-news.jpg'"
            :alt="noticias[currentIndex].titulo"
            image-class="w-full h-full object-cover"
            :max-retries="8"
            :persistent="true"
            loading-strategy="eager"
          />
        </div>
        <button @click="verNoticia(noticias[currentIndex])" class="btn-view">
          Ver noticia completa
          <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useNoticias } from '~/composables/useNoticias'
import SafeImage from '@/components/SafeImage.vue'

const router = useRouter()
const { noticiasImportantes } = useNoticias()

const props = defineProps({
  resetKey: {
    type: Number,
    default: 0
  }
})

const noticias = ref([])
const currentIndex = ref(0)
const loading = ref(true)
let interval = null

const formatearFecha = (fecha) => {
  if (!fecha) return ''
  return new Date(fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}

const verNoticia = (noticia) => {
  if (noticia?.slug) {
    router.push(`/noticias/${noticia.slug}`)
  }
}

const startCarousel = () => {
  if (interval) clearInterval(interval)
  if (noticias.value.length <= 1) return
  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % noticias.value.length
  }, 8000)
}

const stopCarousel = () => {
  if (interval) {
    clearInterval(interval)
    interval = null
  }
}

watch(noticiasImportantes, (nuevas) => {
  if (nuevas.length > 0) {
    noticias.value = nuevas.slice(0, 4)
    loading.value = false
    startCarousel()
  }
}, { immediate: true })

watch(() => props.resetKey, () => {
  stopCarousel()
  currentIndex.value = 0
  if (noticias.value.length > 0) {
    startCarousel()
  }
})

onUnmounted(() => {
  stopCarousel()
})
</script>

<style scoped>
.news-carousel {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.text-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.title {
  color: #E03636;
  font-size: clamp(1.2rem, 2.5vw, 2rem);
  font-weight: bold;
  line-height: 1.3;
}

.description {
  color: #4a5568;
  font-size: clamp(0.8rem, 1.2vw, 1rem);
  line-height: 1.6;
  text-align: justify;
}

.date {
  color: #E03636;
  font-weight: 600;
  text-align: right;
  margin-top: 1rem;
}

.indicators {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 1rem;
}

.indicator {
  width: clamp(0.6rem, 1.2vw, 0.8rem);
  height: clamp(0.6rem, 1.2vw, 0.8rem);
  border-radius: 50%;
  background-color: rgba(224, 54, 54, 0.4);
  transition: all 0.3s;
  cursor: pointer;
}

.indicator.active {
  background-color: #E03636;
  transform: scale(1.2);
}

.indicator:hover {
  background-color: rgba(224, 54, 54, 0.7);
  transform: scale(1.1);
}

.image-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.image-wrapper {
  width: 100%;
  max-width: 350px;
  aspect-ratio: 1 / 1;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  background-color: #f3f4f6;
}

.image-wrapper :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.btn-view {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.2rem;
  background-color: #E03636;
  color: white;
  font-weight: 600;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  font-size: clamp(0.7rem, 1vw, 0.9rem);
}

.btn-view:hover {
  background-color: #C12F2F;
  transform: translateY(-2px);
}

.icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.3s;
}

.btn-view:hover .icon {
  transform: translateX(4px);
}

.loader-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid #e2e8f0;
  border-top-color: #E03636;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .carousel-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0 1rem;
  }
  
  .image-wrapper {
    max-width: 280px;
  }
}
</style>