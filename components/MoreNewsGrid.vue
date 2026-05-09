<!-- components/MoreNewsGrid.vue -->
<template>
  <div class="w-full">
    
    <!-- ENCABEZADO -->
    <div class="text-center mb-10">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-800">
        Más <span class="text-[#E03636]">Noticias</span>
      </h2>
      <div class="w-20 h-1 bg-[#E03636] mx-auto mt-3"></div>
      <p class="text-gray-500 max-w-2xl mx-auto mt-4">
        Mantente informado con las noticias más recientes del Senado de Bolivia
      </p>
    </div>

    <!-- ESTADO DE CARGA -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="inline-block w-10 h-10 border-4 border-[#E03636] border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- GRID DE 4 NOTICIAS -->
    <div v-else-if="noticiasLocal.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div 
        v-for="noticia in noticiasLocal" 
        :key="noticia.id"
        class="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
        @click="verNoticia(noticia)"
      >
        <div class="relative h-48 overflow-hidden">
          <img 
            :src="noticia.imagen" 
            :alt="noticia.titulo"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div class="absolute bottom-2 left-2">
            <span class="text-xs font-semibold bg-[#E03636] text-white px-2 py-1 rounded">
              {{ noticia.categoria }}
            </span>
          </div>
        </div>
        <div class="p-4">
          <p class="text-gray-500 text-xs mb-2">{{ noticia.fechaFormateada }}</p>
          <h3 class="font-bold text-gray-800 group-hover:text-[#E03636] transition-colors line-clamp-2 text-sm md:text-base">
            {{ noticia.titulo }}
          </h3>
          <div class="mt-3 flex justify-end">
            <span class="text-[#E03636] text-sm font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Leer más
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- BOTÓN VER TODAS -->
    <div v-if="noticiasLocal.length > 0" class="text-center mt-10">
      <button 
        @click="irATodasLasNoticias"
        class="inline-flex items-center gap-2 px-6 py-2 border-2 border-[#E03636] text-[#E03636] font-semibold rounded-lg hover:bg-[#E03636] hover:text-white transition-all duration-300"
      >
        Ver todas las noticias
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getUltimasNoticias } from '~/data/noticias'

const router = useRouter()
const noticiasLocal = ref([])
const loading = ref(true)

const verNoticia = (noticia) => {
  if (noticia && noticia.slug) {
    router.push(`/noticias/${noticia.slug}`)
  }
}

const irATodasLasNoticias = () => {
  router.push('/noticias')
}

onMounted(() => {
  try {
    noticiasLocal.value = getUltimasNoticias()
  } catch (error) {
    console.error('Error cargando noticias:', error)
    noticiasLocal.value = []
  } finally {
    loading.value = false
  }
})
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