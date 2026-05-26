<!-- pages/centro-de-noticias.vue -->
<template>
  <div class="min-h-screen text-style">
    <!-- Fondos fijos para cada sección -->
    <div class="global-fixed-background seccion1-fondo" :class="{ 'show-fixed': isSeccion1Visible }"></div>
    <div class="global-fixed-background seccion2-fondo" :class="{ 'show-fixed': isSeccion2Visible }"></div>
    <div class="global-fixed-background seccion3-fondo" :class="{ 'show-fixed': isSeccion3Visible }"></div>
    <div class="global-fixed-background seccion4-fondo" :class="{ 'show-fixed': isSeccion4Visible }"></div>
    
    <!-- ==================== SECCIÓN 1 - NOTICIAS IMPORTANTES ==================== -->
    <section 
      id="noticias-importantes"
      ref="seccion1Ref"
      class="scroll-section opacity-0 transition-all duration-800 ease-out"
      :class="{ 'animate-in': isSeccion1Visible }"
      style="height: 100vh; position: relative; background: transparent; display: flex; flex-direction: column; justify-content: center; align-items: center;"
    > 
      <div class="h-[4.2vw]"></div>
      <div class="mx-[5vw] px-4 z-10 relative w-full">
        <div class="w-full rounded-2xl">
          
          <div v-if="loadingImportantes" class="flex justify-center items-center h-[60vh]">
            <div class="text-center">
              <div class="inline-block w-12 h-12 border-4 border-[#E03636] border-t-transparent rounded-full animate-spin"></div>
              <p class="mt-4 text-gray-600">Cargando noticias importantes...</p>
            </div>
          </div>
          
          <div v-else-if="noticiasCarousel.length > 0" class="grid grid-cols-1 md:grid-cols-[50%_50%] gap-[1vw] items-center px-[2vw]">
            <div class="flex flex-col items-center text-center">
              <div>
                <h2 class="text-[#E03636] text-[2vw] font-bold mb-[1.2vw] leading-tight">
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
              
              <div class="flex justify-center items-center gap-[1vw] pt-[2vw]">
                <button 
                  v-for="(noticia, index) in noticiasCarousel" 
                  :key="noticia.id"
                  @click="currentIndex = index"
                  class="rounded-full transition-all duration-300"
                  :class="currentIndex === index 
                    ? 'w-[2vw] h-[2vw] bg-[#E03636] ring-[.2vw] ring-[#E03636] ring-offset-[.2vw] ring-offset-white' 
                    : 'w-[2vw] h-[2vw] bg-[#E03636]/40 hover:bg-[#E03636]/70'"
                ></button>
              </div>
            </div>
            
            <div>
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
                  class="px-[1.2vw] py-[.6vw] bg-[#E03636] hover:bg-[#C12F2F] text-white font-semibold rounded-[.6vw] transition-all duration-300 flex items-center gap-2 group text-[1.4vw]"
                >
                  Ver noticia completa
                  <svg class="w-[1.5vw] h-[1.5vw] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
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
      class="scroll-section opacity-0 transition-all duration-800 ease-out delay-200"
      :class="{ 'animate-in': isSeccion2Visible }"
      style="height: 100vh; position: relative; background: white; display: flex; flex-direction: column; justify-content: center; align-items: center;"
    >
      <div class="w-full px-[6vw]">
        <div class="text-center pt-[5.2vw]">
          <h2 class="text-[3vw] font-bold text-gray-800">
            Más <span class="text-[#E03636]">Noticias</span>
          </h2>
          <div class="w-[5.4vw] h-[.2vw] bg-[#E03636] mx-auto mt-[1vw]"></div>
          <p class="text-gray-500 text-[1.1vw] mx-auto mt-[1vw]">
            Mantente informado con las noticias más recientes del Senado de Bolivia
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[2vw] mt-[2vw]">
          <div 
            v-for="noticia in noticiasLocal" 
            :key="noticia.id"
            class="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            @click="verNoticia(noticia)"
          >
            <div class="relative overflow-hidden aspect-[4/5]">
              <img 
                :src="noticia.featuredImage?.url || noticia.imagen" 
                :alt="noticia.titulo"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div class="absolute bottom-0 left-0 right-0 h-[40%] bg-[rgba(224,54,54,0.85)] backdrop-blur-sm p-[1vw] flex flex-col justify-end">
                <p class="text-white text-[1.1vw] pb-[.5vw] opacity-90">
                  {{ formatearFecha(noticia.publishedAt || noticia.fecha) }}
                </p>
                <h3 class="font-bold text-white group-hover:text-red-200 transition-colors line-clamp-2 text-[1.1vw] leading-tight">
                  {{ noticia.titulo }}
                </h3>
                <div class="pt-[0.8vw] flex justify-end">
                  <span class="text-white text-[1.0vw] font-semibold flex items-center gap-[.8vw] group-hover:translate-x-1 transition-transform">
                    Leer más
                    <svg class="w-[1.2vw] h-[1.2vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center pt-[2vw] pb-[4vw]">
          <button 
            @click="irATodasLasNoticias"
            class="inline-flex items-center gap-[.7vw] px-[1.5vw] py-[.5vw] border-[.2vw] border-[#E03636] text-[#E03636] font-semibold rounded-lg hover:bg-[#E03636] hover:text-white transition-all duration-300 text-[1.2vw]"
          >
            Ver todas las noticias
            <svg class="w-[1.2vw] h-[1.2vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- ==================== SECCIÓN 3 - SESIONES (VIDEOS) ==================== -->
    <div 
      id="sesiones"
      ref="seccion3Ref"
      class="scroll-section opacity-0 transition-all duration-800 ease-out delay-200"
      :class="{ 'animate-in': isSeccion3Visible }"
      style="height: 100vh; position: relative; background: transparent; display: flex; flex-direction: column; justify-content: center;"
    >
      <div class="relative w-full text-center pt-[4.1vw] pb-[1vw] flex-shrink-0">
        <div class="relative inline-block w-full">
          <div class="absolute top-0 left-0 h-[.1vw] bg-[#E4D294] animate-slide-right" style="width: 100%;"></div>
          <div class="absolute bottom-0 right-0 h-[.1vw] bg-[#E4D294] animate-slide-left" style="width: 100%;"></div>
          <div class="absolute top-0 right-0 w-[.1vw] bg-[#E4D294] animate-slide-down" style="height: 100%;"></div>
          <div class="absolute bottom-0 left-0 w-[.1vw] bg-[#E4D294] animate-slide-up" style="height: 100%;"></div>
          <h2 class="text-[3vw] text-white font-semibold bg-[#E03636] py-[.3vw]">Sesiones</h2>
        </div>
      </div>

      <div class="flex-1 flex flex-col justify-center">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-[2vw] mx-auto px-[6vw] w-full">
          <div class="flex flex-col items-center">
            <div class="w-full aspect-video rounded-[1vw] overflow-hidden border-[.6vw] border-white transition-all duration-300 hover:border-[#E03636] cursor-pointer group shadow-lg">
              <iframe class="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0" title="Sesión en vivo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <p class="text-[1.8vw] text-center font-semibold mt-3 text-[#E03636] drop-shadow-lg">Sesión en vivo</p>
          </div>
          <div class="flex flex-col items-center">
            <div class="w-full aspect-video rounded-[1vw] overflow-hidden border-[.6vw] border-white transition-all duration-300 hover:border-[#E03636] cursor-pointer group shadow-lg">
              <iframe class="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0" title="90 Sesión Ordinaria" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <p class="text-[1.8vw] text-center font-semibold mt-3 text-[#E03636] drop-shadow-lg">90 Sesión Ordinaria</p>
          </div>
          <div class="flex flex-col items-center">
            <div class="w-full aspect-video rounded-[1vw] overflow-hidden border-[.6vw] border-white transition-all duration-300 hover:border-[#E03636] cursor-pointer group shadow-lg">
              <iframe class="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0" title="88 Sesión Ordinaria" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <p class="text-[1.8vw] text-center font-semibold mt-3 text-[#E03636] drop-shadow-lg">88 Sesión Ordinaria</p>
          </div>
        </div>

        <div class="flex justify-center items-center gap-[4vw] py-[2vw]">
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
      class="scroll-section opacity-0 transition-all duration-800 ease-out delay-200"
      :class="{ 'animate-in': isSeccion4Visible }"
      style="height: 100vh; position: relative; background: white; display: flex; flex-direction: column; justify-content: center;"
    >
      <div class="relative w-full text-center pt-[4.1vw] pb-[1vw] flex-shrink-0">
        <div class="relative inline-block w-full">
          <div class="absolute top-0 left-0 h-[2px] bg-[#E4D294] animate-slide-right" style="width: 100%;"></div>
          <div class="absolute bottom-0 right-0 h-[2px] bg-[#E4D294] animate-slide-left" style="width: 100%;"></div>
          <div class="absolute top-0 right-0 w-[2px] bg-[#E4D294] animate-slide-down" style="height: 100%;"></div>
          <div class="absolute bottom-0 left-0 w-[2px] bg-[#E4D294] animate-slide-up" style="height: 100%;"></div>
          <h2 class="text-[3vw] text-white font-semibold bg-[#E03636] py-2">Producción Audiovisual</h2>
        </div>
      </div>

      <div class="text-center py-4 flex-shrink-0">
        <h3 class="text-[#E03636] text-[2.3vw] font-semibold">Desde el Curul</h3>
        <div class="w-16 h-0.5 bg-[#E4D294] mx-auto mt-2"></div>
      </div>
      
      <div class="flex-1 flex items-center justify-center px-4">
        <NuxtLink 
          to="https://www.youtube.com/watch?v=M4oGsn60dkE&list=PLa1BPhXlaW2fX3iN-hn6O5nPBHrSYEL5Y" 
          class="image-link-wrapper block rounded-[1.8vw] overflow-hidden shadow-2xl w-[45%] transition-all duration-500 ease-out hover:shadow-2xl" 
          target="_blank"
        >
          <div class="relative overflow-hidden">
            <img 
              src="/images/curul/Recurso 1.jpg" 
              alt="Producción Audiovisual - Desde el Curul" 
              class="w-full h-auto object-cover transition-all duration-700 ease-out" 
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#E03636]/0 via-[#E03636]/0 to-[#E03636]/0 transition-all duration-500 ease-out group-hover:from-[#E03636]/10"></div>
          </div>
        </NuxtLink>
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

// Noticias locales para la sección 2
const noticiasLocal = ref([])

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

// Ir a todas las noticias
const irATodasLasNoticias = () => {
  router.push('/noticias')
}

// Cargar noticias para la sección 2
const cargarNoticiasGrid = async () => {
  await fetchUltimasNoticias()
  noticiasLocal.value = ultimasNoticias.value
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

const isSeccion1Visible = ref(false)
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
    nextTick(() => {
      const elementId = hash.replace('#', '')
      const element = document.getElementById(elementId)
      
      if (element) {
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
    threshold: 0.15,
    rootMargin: '0px 0px -30px 0px'
  }
  
  scrollObserver = new IntersectionObserver((entries) => {
    requestAnimationFrame(() => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === seccion1Ref.value) {
            isSeccion1Visible.value = true
            startCarousel()
          } else if (entry.target === seccion2Ref.value) {
            isSeccion2Visible.value = true
            stopCarousel()
          } else if (entry.target === seccion3Ref.value) {
            isSeccion3Visible.value = true
            stopCarousel()
          } else if (entry.target === seccion4Ref.value) {
            isSeccion4Visible.value = true
            stopCarousel()
          }
          entry.target.classList.add('animate-in')
          if (scrollObserver) scrollObserver.unobserve(entry.target)
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
    await cargarNoticiasGrid()
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

// Watch para cambios en la ruta
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
  
  setTimeout(() => {
    if (seccion1Ref.value) {
      isSeccion1Visible.value = true
      seccion1Ref.value.classList.add('animate-in')
      startCarousel()
    }
  }, 100)
  
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

.global-fixed-background { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-size: cover; background-position: center; background-repeat: no-repeat; z-index: 0; pointer-events: none; opacity: 0; visibility: hidden; transition: opacity 0.8s ease-in-out, visibility 0.8s ease-in-out; }
.global-fixed-background::after { display: none; }
.global-fixed-background.show-fixed { opacity: 1; visibility: visible; }

.seccion1-fondo { background-color: #d9d9d9; background-image: none; }
.seccion2-fondo { background-color: #e0e0e0; background-image: none; }
.seccion3-fondo { background-image: url('/Recurso 5.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat; }
.seccion4-fondo { background-color: #ffffff; background-image: none; }

html, body {
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
}

section, .scroll-section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.3, 1.2);
}

footer {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.3, 1.2);
}

.scroll-section {
  position: relative;
  width: 100%;
  z-index: 5;
  background: transparent;
}

.scroll-section.animate-in {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

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

@keyframes slide-right { 0% { width: 0%; left: 0; } 50% { width: 100%; left: 0; } 100% { width: 0%; left: 100%; } }
@keyframes slide-left { 0% { width: 0%; right: 0; } 50% { width: 100%; right: 0; } 100% { width: 0%; right: 100%; } }
@keyframes slide-down { 0% { height: 0%; top: 0; } 50% { height: 100%; top: 0; } 100% { height: 0%; top: 100%; } }
@keyframes slide-up { 0% { height: 0%; bottom: 0; } 50% { height: 100%; bottom: 0; } 100% { height: 0%; bottom: 100%; } }
.animate-slide-right { animation: slide-right 4s ease-in-out infinite; }
.animate-slide-left { animation: slide-left 4s ease-in-out infinite; }
.animate-slide-down { animation: slide-down 4s ease-in-out infinite; }
.animate-slide-up { animation: slide-up 4s ease-in-out infinite; }
</style>

<style>
.scroll-section {
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.scroll-section.animate-in {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

.scroll-section.animate-in > * {
  animation: fadeInUpChild 0.6s ease-out forwards;
}

@keyframes fadeInUpChild {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

footer {
  display: block !important;
  position: relative !important;
  z-index: 100 !important;
  background-image: url('/footer-main.png') !important;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
}
</style>