<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      
      <!-- Botón volver -->
      <button 
        @click="volverAtras"
        class="inline-flex items-center gap-2 text-[#E03636] hover:text-[#C12F2F] transition-colors mb-6 group"
      >
        <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Volver
      </button>

      <!-- Título -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800">
          Todas las <span class="text-[#E03636]">Noticias</span>
        </h1>
        <div class="w-24 h-1 bg-[#E03636] mx-auto mt-4"></div>
        <p class="text-gray-600 mt-4">Explora todas las noticias del Senado de Bolivia</p>
      </div>

      <!-- Estado de carga -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="inline-block w-12 h-12 border-4 border-[#E03636] border-t-transparent rounded-full animate-spin"></div>
        <p class="ml-3 text-gray-500">Cargando noticias...</p>
      </div>

      <!-- Estado de error -->
      <div v-else-if="error" class="text-center py-20">
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button @click="recargar" class="bg-[#E03636] text-white px-4 py-2 rounded-lg hover:bg-[#C12F2F] transition">Reintentar</button>
      </div>

      <!-- Grid de noticias - MISMO ESTILO QUE MORENEWSGRID -->
      <div v-else-if="todasLasNoticias.length > 0">
        <!-- Filas con stripe (fondo alternado) -->
        <div 
          v-for="(fila, filaIndex) in noticiasPorFilas" 
          :key="filaIndex"
          :class="['rounded-xl transition-all duration-300', filaIndex % 2 === 1 ? 'bg-gray-100' : '']"
        >
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
            <!-- Tarjeta IDÉNTICA a MoreNewsGrid -->
            <div 
              v-for="noticia in fila" 
              :key="noticia.id"
              class="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              @click="verNoticia(noticia)"
            >
              <!-- Contenedor de imagen -->
              <div class="relative overflow-hidden aspect-[4/5]">
                <img 
                  :src="noticia.featuredImage?.url || noticia.imagen || '/images/default-news.jpg'" 
                  :alt="noticia.titulo"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                
                <!-- Div rojo que ocupa el 40% inferior de la imagen -->
                <div class="absolute bottom-0 left-0 right-0 h-[40%] bg-[rgba(224,54,54,0.85)] backdrop-blur-sm p-4 flex flex-col justify-end">
                  <p class="text-white text-[0.7rem] sm:text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] mb-1 opacity-90">
                    {{ formatearFecha(noticia.publishedAt || noticia.fecha) }}
                  </p>
                  <h3 class="font-bold text-white group-hover:text-red-200 transition-colors line-clamp-2 text-[0.8rem] sm:text-[0.9rem] md:text-[1rem] lg:text-[1.1rem] leading-tight">
                    {{ noticia.titulo }}
                  </h3>
                  <div class="mt-2 flex justify-end">
                    <span class="text-white text-[0.7rem] sm:text-[0.8rem] md:text-[0.9rem] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Leer más
                      <svg class="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sin resultados -->
      <div v-else-if="!loading && todasLasNoticias.length === 0" class="text-center py-20">
        <p class="text-gray-500">No hay noticias disponibles</p>
        <button 
          @click="recargar"
          class="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#E03636] text-white rounded-lg hover:bg-[#C12F2F] transition"
        >
          Reintentar
        </button>
      </div>

      <!-- Paginación -->
      <div v-if="totalPaginas > 1 && !loading" class="flex justify-center gap-2 mt-12">
        <button 
          @click="cambiarPagina(paginaActual - 1)" 
          :disabled="paginaActual === 1" 
          class="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Anterior
        </button>
        <div class="flex gap-1">
          <button 
            v-for="p in paginasMostradas" 
            :key="p" 
            @click="cambiarPagina(p)" 
            :class="['w-10 h-10 rounded-lg transition', paginaActual === p ? 'bg-[#E03636] text-white' : 'bg-white border border-gray-300 hover:bg-gray-100']"
          >
            {{ p }}
          </button>
        </div>
        <button 
          @click="cambiarPagina(paginaActual + 1)" 
          :disabled="paginaActual === totalPaginas" 
          class="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Siguiente
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNoticias } from '~/composables/useNoticias'

const router = useRouter()

const { 
  todasLasNoticias,
  loading, 
  error,
  fetchTodasLasNoticias
} = useNoticias()

// Paginación local
const paginaActual = ref(1)
const itemsPorPagina = ref(12)

// Noticias paginadas
const noticiasPaginadas = computed(() => {
  const start = (paginaActual.value - 1) * itemsPorPagina.value
  const end = start + itemsPorPagina.value
  return todasLasNoticias.value.slice(start, end)
})

// Agrupar noticias en filas de 4
const noticiasPorFilas = computed(() => {
  const filas = []
  for (let i = 0; i < noticiasPaginadas.value.length; i += 4) {
    filas.push(noticiasPaginadas.value.slice(i, i + 4))
  }
  return filas
})

// Total de páginas
const totalPaginas = computed(() => {
  return Math.ceil(todasLasNoticias.value.length / itemsPorPagina.value)
})

// Páginas mostradas en la paginación
const paginasMostradas = computed(() => {
  const total = totalPaginas.value
  const actual = paginaActual.value
  const rango = 5
  
  let start = Math.max(1, actual - Math.floor(rango / 2))
  let end = Math.min(total, start + rango - 1)
  
  if (end - start + 1 < rango) {
    start = Math.max(1, end - rango + 1)
  }
  
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

// Formatear fecha
const formatearFecha = (fecha) => {
  if (!fecha) return ''
  return new Date(fecha).toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })
}

// Ver noticia
const verNoticia = (noticia) => {
  if (noticia && noticia.slug) {
    router.push(`/noticias/${noticia.slug}`)
  }
}

// Volver atrás
const volverAtras = () => {
  router.back()
}

// Cambiar página
const cambiarPagina = (pagina) => {
  if (pagina >= 1 && pagina <= totalPaginas.value) {
    paginaActual.value = pagina
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Recargar
const recargar = async () => {
  await fetchTodasLasNoticias()
}

// Cargar noticias al montar
onMounted(async () => {
  await fetchTodasLasNoticias()
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

.aspect-\[4\/5\] {
  aspect-ratio: 4 / 5;
}
</style>