<!-- pages/noticias/index.vue -->
<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      
      <button 
        @click="volverAtras"
        class="inline-flex items-center gap-2 text-[#E03636] hover:text-[#C12F2F] transition-colors mb-6 group"
      >
        <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Volver
      </button>

      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800">
          Todas las <span class="text-[#E03636]">Noticias</span>
        </h1>
        <div class="w-24 h-1 bg-[#E03636] mx-auto mt-4"></div>
        <p class="text-gray-600 mt-4">Explora todas las noticias del Senado de Bolivia</p>
      </div>

      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="inline-block w-12 h-12 border-4 border-[#E03636] border-t-transparent rounded-full animate-spin"></div>
      </div>

      <div v-else-if="noticias.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="noticia in noticias" 
          :key="noticia.id"
          class="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          @click="verNoticia(noticia)"
        >
          <div class="relative h-48 overflow-hidden">
            <img :src="noticia.imagen" :alt="noticia.titulo" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
            <div v-if="noticia.importante" class="absolute top-3 left-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-semibold">★ Importante</div>
            <div class="absolute bottom-3 right-3 bg-[#E03636] text-white text-xs px-2 py-1 rounded-full">{{ noticia.categoria }}</div>
          </div>
          <div class="p-4">
            <p class="text-gray-500 text-sm mb-2">{{ noticia.fechaFormateada }}</p>
            <h3 class="font-bold text-gray-800 group-hover:text-[#E03636] transition-colors line-clamp-2">{{ noticia.titulo }}</h3>
            <div class="flex justify-end mt-3">
              <span class="text-[#E03636] text-sm font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Leer más
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="!loading" class="text-center py-20">
        <p class="text-gray-500">No hay noticias disponibles</p>
      </div>

      <div v-if="totalPaginas > 1 && !loading" class="flex justify-center gap-2 mt-12">
        <button @click="paginaActual--" :disabled="paginaActual === 1" class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition">Anterior</button>
        <div class="flex gap-1">
          <button v-for="p in paginasMostradas" :key="p" @click="paginaActual = p" :class="['w-10 h-10 rounded-lg transition', paginaActual === p ? 'bg-[#E03636] text-white' : 'border border-gray-300 hover:bg-gray-100']">{{ p }}</button>
        </div>
        <button @click="paginaActual++" :disabled="paginaActual === totalPaginas" class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition">Siguiente</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getNoticiasPaginadas, getTotalPaginas } from '~/data/noticias'

const router = useRouter()
const paginaActual = ref(1)
const noticias = ref([])
const totalPaginas = ref(0)
const loading = ref(true)
const porPagina = 12

const paginasMostradas = computed(() => {
  const max = 5
  let start = Math.max(1, paginaActual.value - Math.floor(max / 2))
  let end = Math.min(totalPaginas.value, start + max - 1)
  if (end - start + 1 < max) start = Math.max(1, end - max + 1)
  const paginas = []
  for (let i = start; i <= end; i++) paginas.push(i)
  return paginas
})

const cargarNoticias = () => {
  loading.value = true
  noticias.value = getNoticiasPaginadas(paginaActual.value, porPagina)
  totalPaginas.value = getTotalPaginas(porPagina)
  loading.value = false
}

const verNoticia = (noticia) => {
  if (noticia && noticia.slug) {
    router.push(`/noticias/${noticia.slug}`)
  }
}

const volverAtras = () => {
  router.back()
}

watch(paginaActual, () => {
  cargarNoticias()
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

onMounted(() => {
  cargarNoticias()
})

definePageMeta({ layout: 'alter8' })

useHead({ title: 'Todas las Noticias - Senado Bolivia' })
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>