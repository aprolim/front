<template>
  <!-- 🔥 ELIMINAR bg-gray-50 y agregar fondo transparente -->
  <div class="min-h-screen pt-[5vw]" style="background: transparent !important;">
    <!-- Fondo fijo para TODAS las secciones -->
    <div class="global-fixed-background seccion3-fondo show-fixed"></div>
    
    <div class="container mx-auto px-4 relative z-10">

      <!-- Título -->
      <div class="text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          Todas las <span class="text-[#E03636]">Noticias</span>
        </h1>
        <div class="w-24 h-1 bg-[#E03636] mx-auto mt-4"></div>
        <p class="text-white/90 drop-shadow-md mt-4">Explora todas las noticias del Senado de Bolivia</p>
      </div>

      <!-- Estado de carga -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="inline-block w-12 h-12 border-4 border-[#E03636] border-t-transparent rounded-full animate-spin"></div>
        <p class="ml-3 text-white drop-shadow-md">Cargando noticias...</p>
      </div>

      <!-- Estado de error -->
      <div v-else-if="error" class="text-center py-20">
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button @click="recargar" class="bg-[#E03636] text-white px-4 py-2 rounded-lg hover:bg-[#C12F2F] transition">Reintentar</button>
      </div>

      <!-- Grid de noticias -->
      <div v-else-if="todasLasNoticias.length > 0">
        <div 
          v-for="(fila, filaIndex) in noticiasPorFilas" 
          :key="filaIndex"
          :class="['rounded-xl transition-all duration-300', filaIndex % 2 === 1 ? 'bg-black/20 backdrop-blur-sm' : '']"
        >
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
            <div 
              v-for="noticia in fila" 
              :key="noticia.id"
              class="group bg-white/95 backdrop-blur-sm rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02]"
              @click="verNoticia(noticia)"
            >
              <div class="relative overflow-hidden aspect-[4/5]">
                <img 
                  :src="noticia.featuredImage?.url || noticia.imagen || '/images/default-news.jpg'" 
                  :alt="limpiarAsteriscos(noticia.titulo)"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                
                <div class="absolute bottom-0 left-0 right-0 h-[40%] bg-[rgba(224,54,54,0.85)] backdrop-blur-sm p-4 flex flex-col justify-end">
                  <p class="text-white text-[0.7rem] sm:text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] mb-1 opacity-90">
                    {{ formatearFecha(noticia.publishedAt || noticia.fecha) }}
                  </p>
                  
                  <h3 
                    class="font-bold text-white transition-colors line-clamp-2 text-[0.8rem] sm:text-[0.9rem] md:text-[1rem] lg:text-[1.1rem] leading-tight"
                  >
                    {{ limpiarAsteriscos(noticia.titulo) }}
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
        <p class="text-white drop-shadow-md">No hay noticias disponibles</p>
        <button 
          @click="recargar"
          class="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#E03636] text-white rounded-lg hover:bg-[#C12F2F] transition"
        >
          Reintentar
        </button>
      </div>

      <!-- Paginación -->
      <div v-if="totalPaginas > 1 && !loading" class="flex justify-center gap-2 mt-12 pb-8">
        <button 
          @click="cambiarPagina(paginaActual - 1)" 
          :disabled="paginaActual === 1" 
          class="px-4 py-2 rounded-lg border border-white/30 bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Anterior
        </button>
        <div class="flex gap-1">
          <button 
            v-for="p in paginasMostradas" 
            :key="p" 
            @click="cambiarPagina(p)" 
            :class="['w-10 h-10 rounded-lg transition', paginaActual === p ? 'bg-[#E03636] text-white' : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/40']"
          >
            {{ p }}
          </button>
        </div>
        <button 
          @click="cambiarPagina(paginaActual + 1)" 
          :disabled="paginaActual === totalPaginas" 
          class="px-4 py-2 rounded-lg border border-white/30 bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Siguiente
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onActivated, onDeactivated, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useNoticias } from '~/composables/useNoticias'

definePageMeta({ layout: 'alter8', ssr: true })

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

// ============================================
// FUNCIÓN PARA LIMPIAR ASTERISCOS (para alt y títulos)
// ============================================
const limpiarAsteriscos = (texto) => {
  if (!texto) return ''
  return texto.replace(/\*/g, '')
}

// ============================================
// FUNCIÓN PARA FORZAR SCROLL AL INICIO
// ============================================
const scrollToTop = () => {
  const doScroll = () => {
    const container = document.querySelector('.snap-container')
    if (container) {
      container.scrollTop = 0
      container.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.scrollTo(0, 0)
  }
  
  doScroll()
  setTimeout(doScroll, 50)
  setTimeout(doScroll, 150)
  setTimeout(doScroll, 300)
  setTimeout(doScroll, 500)
}

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

// Cambiar página
const cambiarPagina = (pagina) => {
  if (pagina >= 1 && pagina <= totalPaginas.value) {
    paginaActual.value = pagina
    setTimeout(scrollToTop, 100)
  }
}

// Recargar
const recargar = async () => {
  await fetchTodasLasNoticias()
  scrollToTop()
}

// KeepAlive hook
onActivated(() => {
  scrollToTop()
})

onDeactivated(() => {})

// Cargar noticias al montar
onMounted(async () => {
  await fetchTodasLasNoticias()
  await nextTick()
  scrollToTop()
})

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

.global-fixed-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
  pointer-events: none;
  opacity: 1 !important;
  visibility: visible !important;
}

.global-fixed-background::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(circle at 50% 30%, transparent 0%, rgba(0, 0, 0, 0.3) 80%, rgba(0, 0, 0, 0.4) 100%);
  pointer-events: none;
  z-index: 1;
}

.seccion3-fondo {
  background-image: url('/legisladores nacionales/fondo departamentos.jpg');
}

/* Asegurar que el contenido esté por encima del fondo */
.container {
  position: relative;
  z-index: 10;
}

/* Mejorar legibilidad en tarjetas */
.bg-white\/95 {
  background-color: rgba(255, 255, 255, 0.95);
}

/* Fondo semi-transparente para filas alternas */
.bg-black\/20 {
  background-color: rgba(0, 0, 0, 0.2);
}

/* 🔥 FORZAR TRANSPARENCIA EN EL CONTENEDOR PRINCIPAL */
.min-h-screen {
  background: transparent !important;
}

/* 🔥 FORZAR QUE EL LAYOUT PERMITA VER EL FONDO */
:deep(.layout-alter8) {
  background: transparent !important;
}

/* 🔥 SI EL LAYOUT TIENE UN FONDO, SOBREESCRIBIRLO */
:deep(body) {
  background: transparent !important;
}
</style>

<!-- 🔥 ESTILO GLOBAL PARA FORZAR TRANSPARENCIA -->
<style>
/* Forzar que el layout alter8 sea transparente */
.layout-alter8,
.layout-alter8 > div,
[data-layout="alter8"] {
  background: transparent !important;
}

/* Forzar que el body no tenga fondo que bloquee */
body {
  background: transparent !important;
}

/* Asegurar que el fondo fijo se vea */
.global-fixed-background {
  z-index: 0 !important;
}

/* Todo el contenido debe estar por encima */
.relative.z-10 {
  z-index: 10 !important;
}
</style>