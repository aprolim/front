<!-- pages/centro-de-noticias.vue -->
<template>
  <div class="min-h-screen text-style">
    <!-- Fondos fijos para cada sección -->
    <div class="global-fixed-background seccion1-fondo" :class="{ 'show-fixed': isSeccion1Visible }"></div>
    <div class="global-fixed-background seccion2-fondo" :class="{ 'show-fixed': isSeccion2Visible }"></div>
    <div class="global-fixed-background seccion3-fondo" :class="{ 'show-fixed': isSeccion3Visible }"></div>
    <div class="global-fixed-background seccion4-fondo" :class="{ 'show-fixed': isSeccion4Visible }"></div>
    
    <!-- ==================== SECCIÓN 1 - NOTICIAS IMPORTANTES (CARROUSEL) ==================== -->
    <section 
      id="noticias-importantes"
      class="relative h-screen overflow-y-auto transition-all duration-500"
      ref="seccion1Ref"
    >
      <div class="mx-[5vw] px-4 z-10 relative h-full flex flex-col justify-center">
        <div class="w-full rounded-2xl">
          
          <!-- Estado de carga -->
          <div v-if="loadingImportantes" class="flex justify-center items-center h-[60vh]">
            <div class="text-center">
              <div class="inline-block w-12 h-12 border-4 border-[#E03636] border-t-transparent rounded-full animate-spin"></div>
              <p class="mt-4 text-gray-600">Cargando noticias importantes...</p>
            </div>
          </div>
          
          <!-- Carrusel con datos reales -->
          <div v-else-if="noticiasCarousel.length > 0" class="grid grid-cols-1 md:grid-cols-[50%_50%] gap-8 items-center">
            <!-- Columna izquierda -->
            <div class="flex flex-col items-center text-center">
              <div>
                <h2 class="text-[#E03636] text-[2vw] font-bold mb-4 leading-tight">
                  {{ noticiasCarousel[currentIndex].titulo }}
                </h2>
                <div class="text-gray-800 text-[1.2vw] leading-relaxed space-y-3 text-justify">
                  <p>{{ noticiasCarousel[currentIndex].descripcion }}</p>
                  <p v-if="noticiasCarousel[currentIndex].descripcion2">{{ noticiasCarousel[currentIndex].descripcion2 }}</p>
                  <p class="text-[#E03636] font-semibold text-right">
                    {{ formatearFecha(noticiasCarousel[currentIndex].publishedAt || noticiasCarousel[currentIndex].fecha) }}
                  </p>
                </div>
              </div>
              
              <div class="flex justify-center items-center gap-4 mt-6">
                <button 
                  v-for="(noticia, index) in noticiasCarousel" 
                  :key="noticia.id"
                  @click="currentIndex = index"
                  class="rounded-full transition-all duration-300"
                  :class="currentIndex === index 
                    ? 'w-4 h-4 bg-[#E03636] ring-2 ring-[#E03636] ring-offset-2 ring-offset-white' 
                    : 'w-4 h-4 bg-[#E03636]/40 hover:bg-[#E03636]/70'"
                ></button>
              </div>
            </div>
            
            <!-- Columna derecha -->
            <div class="pt-[4vw]">
              <div class="rounded-xl overflow-hidden shadow-lg aspect-square w-[80%] mx-auto">
                <img 
                  :src="noticiasCarousel[currentIndex].featuredImage?.url || noticiasCarousel[currentIndex].imagen"
                  :alt="noticiasCarousel[currentIndex].titulo"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="flex justify-center mt-6">
                <button 
                  @click="verNoticia(noticiasCarousel[currentIndex])"
                  class="px-8 py-3 bg-[#E03636] hover:bg-[#C12F2F] text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 group text-base md:text-lg"
                >
                  Ver noticia completa
                  <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Sin resultados -->
          <div v-else-if="!loadingImportantes" class="text-center py-12">
            <p class="text-gray-600">No hay noticias importantes disponibles</p>
            <button 
              @click="cargarDatos"
              class="mt-4 px-4 py-2 bg-[#E03636] text-white rounded-lg hover:bg-[#C12F2F] transition"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== SECCIÓN 2 - MÁS NOTICIAS ==================== -->
    <div 
      id="mas-noticias"
      ref="seccion2Ref" 
      class="scroll-section opacity-0 transition-all duration-800 ease-out z-10"
      :class="{ 'animate-in': isSeccion2Visible }"
      style="min-height: 100vh; position: relative; background: white; display: flex; flex-direction: column; justify-content: center;"
    >
      <MoreNewsGrid />
    </div>
    
    <!-- ==================== SECCIÓN 3 - SESIONES (VIDEOS) ==================== -->
    <div 
      id="sesiones"
      ref="seccion3Ref" 
      class="scroll-section opacity-0 transition-all duration-800 ease-out delay-200 z-10"
      :class="{ 'animate-in': isSeccion3Visible }"
      style="min-height: 100vh; position: relative; background: transparent; overflow-y: auto;"
    >
      <div class="w-full text-center mt-[4.1vw] mb-0 relative py-[.2em] flex-shrink-0">
        <div class="absolute top-0 left-0 h-[2px] bg-[#E4D294] animate-slide-right"></div>
        <div class="absolute bottom-0 right-0 h-[2px] bg-[#E4D294] animate-slide-left"></div>
        <div class="absolute top-0 right-0 w-[2px] bg-[#E4D294] animate-slide-down"></div>
        <div class="absolute bottom-0 left-0 w-[2px] bg-[#E4D294] animate-slide-up"></div>
        
        <h2 class="text-[3vw] text-white font-semibold bg-[#E03636] py-2">Sesiones</h2>
      </div>

      <div class="w-full flex-1 flex flex-col justify-center min-h-[80vh]">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mt-8 mx-auto px-[6vw] w-full">
          <div class="flex flex-col items-center">
            <div class="w-full aspect-video rounded-xl overflow-hidden border-4 border-white transition-all duration-300 hover:border-[#E03636] cursor-pointer group shadow-lg">
              <iframe class="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0" title="Sesión en vivo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <p class="text-[1.8vw] text-center font-semibold mt-3 text-[#E03636] drop-shadow-lg">Sesión en vivo</p>
          </div>
          <div class="flex flex-col items-center">
            <div class="w-full aspect-video rounded-xl overflow-hidden border-4 border-white transition-all duration-300 hover:border-[#E03636] cursor-pointer group shadow-lg">
              <iframe class="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0" title="90 Sesión Ordinaria" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <p class="text-[1.8vw] text-center font-semibold mt-3 text-[#E03636] drop-shadow-lg">90 Sesión Ordinaria</p>
          </div>
          <div class="flex flex-col items-center">
            <div class="w-full aspect-video rounded-xl overflow-hidden border-4 border-white transition-all duration-300 hover:border-[#E03636] cursor-pointer group shadow-lg">
              <iframe class="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0" title="88 Sesión Ordinaria" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <p class="text-[1.8vw] text-center font-semibold mt-3 text-[#E03636] drop-shadow-lg">88 Sesión Ordinaria</p>
          </div>
        </div>

        <div class="flex justify-center items-center gap-[4vw] mt-12 mb-8">
          <a href="https://www.youtube.com/@SenadoBolivia" target="_blank" class="social-icon-wrapper group hover:scale-110 transition-transform duration-300">
            <div class="social-svg w-[4.5vw] h-[4.5vw]">
              <svg fill="currentColor" viewBox="0 0 24 24" class="text-[#E03636] hover:text-[#C12F2F] transition-colors">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.376.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.376-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
          </a>
          <a href="https://www.facebook.com/SenadoBolivia" target="_blank" class="social-icon-wrapper group hover:scale-110 transition-transform duration-300">
            <div class="social-svg w-[3.5vw] h-[3.5vw]">
              <svg fill="currentColor" viewBox="0 0 24 24" class="text-[#E03636] hover:text-[#C12F2F] transition-colors">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- ==================== SECCIÓN 4 - PRODUCCIÓN AUDIOVISUAL ==================== -->
    <div 
      id="produccion-audiovisual"
      ref="seccion4Ref" 
      class="scroll-section opacity-0 transition-all duration-800 ease-out delay-400 z-10"
      :class="{ 'animate-in': isSeccion4Visible }"
      style="min-height: 100vh; position: relative; overflow-y: auto; background: white;"
    >
      <div class="w-full text-center mt-[4.1vw] mb-0 relative py-[.2em] flex-shrink-0">
        <div class="absolute top-0 left-0 h-[2px] bg-[#E4D294] animate-slide-right"></div>
        <div class="absolute bottom-0 right-0 h-[2px] bg-[#E4D294] animate-slide-left"></div>
        <div class="absolute top-0 right-0 w-[2px] bg-[#E4D294] animate-slide-down"></div>
        <div class="absolute bottom-0 left-0 w-[2px] bg-[#E4D294] animate-slide-up"></div>
        
        <h2 class="text-[3vw] text-white font-semibold bg-[#E03636] py-2">Producción Audiovisual</h2>
      </div>

      <div class="text-center mt-4">
        <h3 class="text-[#E03636] text-[2.3vw] font-semibold">Desde el Curul</h3>
        <div class="w-16 h-0.5 bg-[#E4D294] mx-auto mt-2"></div>
      </div>
      <br><br>
      
      <div class="mx-auto px-4 z-10 relative w-full flex-1 flex flex-col justify-center">
        <div class="flex justify-center items-center">
          <NuxtLink to="https://www.youtube.com/watch?v=M4oGsn60dkE&list=PLa1BPhXlaW2fX3iN-hn6O5nPBHrSYEL5Y" class="image-link-wrapper block rounded-xl overflow-hidden shadow-2xl w-[45%] transition-all duration-500 ease-out hover:shadow-2xl" target="_blank">
            <div class="relative overflow-hidden">
              <img src="/images/curul/Recurso 1.jpg" alt="Producción Audiovisual - Desde el Curul" class="w-full h-auto object-cover transition-all duration-700 ease-out" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#E03636]/0 via-[#E03636]/0 to-[#E03636]/0 transition-all duration-500 ease-out group-hover:from-[#E03636]/10"></div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useNoticias } from '~/composables/useNoticias'
import MoreNewsGrid from '@/components/MoreNewsGrid.vue'

const router = useRouter()
const route = useRoute()

// Usar el composable de noticias
const { 
  noticiasImportantes, 
  ultimasNoticias, 
  loading, 
  error,
  fetchNoticiasImportantes,
  fetchUltimasNoticias
} = useNoticias()

// Estados locales
const currentIndex = ref(0)
const loadingImportantes = ref(true)
const loadingUltimas = ref(true)

// Computed para el carousel (primeras 4 noticias importantes)
const noticiasCarousel = computed(() => {
  const noticias = noticiasImportantes.value.slice(0, 4)
  return noticias
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

// Ver noticia completa
const verNoticia = (noticia) => {
  if (noticia && noticia.slug) {
    router.push(`/noticias/${noticia.slug}`)
  }
}

// Autoplay del carousel
let carouselInterval = null

const startCarousel = () => {
  if (carouselInterval) clearInterval(carouselInterval)
  if (noticiasCarousel.value.length === 0) return
  carouselInterval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % noticiasCarousel.value.length
  }, 8000)
}

const stopCarousel = () => {
  if (carouselInterval) {
    clearInterval(carouselInterval)
    carouselInterval = null
  }
}

// Referencias a las secciones para scroll observer
const seccion1Ref = ref(null)
const seccion2Ref = ref(null)
const seccion3Ref = ref(null)
const seccion4Ref = ref(null)

const isSeccion1Visible = ref(true)
const isSeccion2Visible = ref(false)
const isSeccion3Visible = ref(false)
const isSeccion4Visible = ref(false)

let scrollObserver = null

// ============================================
// FUNCIÓN PARA HACER SCROLL AL HASH
// ============================================
const scrollToHash = () => {
  const hash = route.hash
  if (hash && hash !== '') {
    // Esperar a que la página esté completamente cargada
    nextTick(() => {
      const elementId = hash.replace('#', '')
      const element = document.getElementById(elementId)
      
      if (element) {
        // Pequeño retraso para asegurar que todo está renderizado
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          })
        }, 500)
      } else {
        console.warn(`Elemento con id "${elementId}" no encontrado`)
      }
    })
  }
}

// ============================================
// INTERSECTION OBSERVER
// ============================================
const initScrollObserver = () => {
  const options = {
    threshold: 0.3,
    rootMargin: '0px 0px 0px 0px'
  }
  
  scrollObserver = new IntersectionObserver((entries) => {
    requestAnimationFrame(() => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === seccion1Ref.value) {
            isSeccion1Visible.value = true
            isSeccion2Visible.value = false
            isSeccion3Visible.value = false
            isSeccion4Visible.value = false
            startCarousel()
          } else if (entry.target === seccion2Ref.value) {
            isSeccion1Visible.value = false
            isSeccion2Visible.value = true
            isSeccion3Visible.value = false
            isSeccion4Visible.value = false
            stopCarousel()
          } else if (entry.target === seccion3Ref.value) {
            isSeccion1Visible.value = false
            isSeccion2Visible.value = false
            isSeccion3Visible.value = true
            isSeccion4Visible.value = false
            stopCarousel()
          } else if (entry.target === seccion4Ref.value) {
            isSeccion1Visible.value = false
            isSeccion2Visible.value = false
            isSeccion3Visible.value = false
            isSeccion4Visible.value = true
            stopCarousel()
          }
          entry.target.classList.add('animate-in')
        }
      })
    })
  }, options)
  
  const sections = [seccion1Ref.value, seccion2Ref.value, seccion3Ref.value, seccion4Ref.value]
  sections.forEach(section => {
    if (section) scrollObserver.observe(section)
  })
}

// Cargar datos desde el backend
const cargarDatos = async () => {
  loadingImportantes.value = true
  loadingUltimas.value = true
  
  try {
    await fetchNoticiasImportantes()
    await fetchUltimasNoticias()
  } catch (err) {
    console.error('Error cargando datos:', err)
  } finally {
    loadingImportantes.value = false
    loadingUltimas.value = false
  }
}

// Watch para depurar cambios en noticiasImportantes
watch(noticiasImportantes, (nuevas) => {
  if (nuevas.length > 0 && carouselInterval === null && isSeccion1Visible.value) {
    startCarousel()
  }
}, { deep: true })

// Watch para cambios en la ruta (por si navegan desde otro lugar)
watch(() => route.hash, (newHash) => {
  if (newHash && newHash !== '') {
    scrollToHash()
  }
})

// Lifecycle
onMounted(async () => {
  await cargarDatos()
  await nextTick()
  initScrollObserver()
  startCarousel()
  
  // Hacer scroll al hash después de cargar todo
  scrollToHash()
})

onUnmounted(() => {
  if (scrollObserver) scrollObserver.disconnect()
  stopCarousel()
})

definePageMeta({ layout: 'alter8' })
</script>

<style scoped>
.text-style { font-family: 'Montserrat', Tahoma, Geneva, Verdana, sans-serif; }
html, body { scroll-behavior: smooth; scroll-snap-type: y mandatory; }
section, .scroll-section { scroll-snap-align: start; scroll-snap-stop: always; transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.3, 1.2); }
.global-fixed-background { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-size: cover; background-position: center; background-repeat: no-repeat; z-index: 0; pointer-events: none; opacity: 0; visibility: hidden; transition: opacity 0.8s ease-in-out, visibility 0.8s ease-in-out; }
.global-fixed-background::after { display: none; }
.global-fixed-background.show-fixed { opacity: 1; visibility: visible; }
.seccion1-fondo { background-color: #d9d9d9; background-image: none; }
.seccion2-fondo { background-color: #e0e0e0; background-image: none; }
.seccion3-fondo { background-image: url('/Recurso 5.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat; }
.seccion4-fondo { background-color: #ffffff; background-image: none; }
.scroll-section { position: relative; width: 100%; z-index: 5; background: transparent; }
.scroll-section.animate-in { opacity: 1 !important; transform: translateY(0) !important; }
.aspect-video { aspect-ratio: 16 / 9; }
iframe { pointer-events: auto; }
.social-icon-wrapper { display: flex; align-items: center; justify-content: center; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); padding: 2px; border-radius: 4px; }
.social-icon-wrapper:hover { transform: translateX(-4px) scale(1.1); }
.social-svg { filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1)); transition: filter 0.3s ease; }
.social-icon-wrapper:hover .social-svg { filter: drop-shadow(0 4px 8px rgba(224, 54, 54, 0.3)); }
.social-svg svg { width: 100%; height: 100%; transition: all 0.3s ease; }
.image-link-wrapper { display: block; cursor: pointer; transform: scale(1); }
.image-link-wrapper:hover { transform: scale(1.02); box-shadow: 0 25px 40px -12px rgba(0, 0, 0, 0.3); }
.image-link-wrapper:active { transform: scale(0.98); }
.image-link-wrapper img { transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.3, 1.2); }
.image-link-wrapper:hover img { transform: scale(1.05); }
@keyframes slide-right { 0% { width: 0%; left: 0; } 50% { width: 100%; left: 0; } 100% { width: 0%; left: 100%; } }
@keyframes slide-left { 0% { width: 0%; right: 0; } 50% { width: 100%; right: 0; } 100% { width: 0%; right: 100%; } }
@keyframes slide-down { 0% { height: 0%; top: 0; } 50% { height: 100%; top: 0; } 100% { height: 0%; top: 100%; } }
@keyframes slide-up { 0% { height: 0%; bottom: 0; } 50% { height: 100%; bottom: 0; } 100% { height: 0%; bottom: 100%; } }
.animate-slide-right { animation: slide-right 4s ease-in-out infinite; }
.animate-slide-left { animation: slide-left 4s ease-in-out infinite; }
.animate-slide-down { animation: slide-down 4s ease-in-out infinite; }
.animate-slide-up { animation: slide-up 4s ease-in-out infinite; }
</style>