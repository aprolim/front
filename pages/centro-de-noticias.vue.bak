<template>
  <div class="min-h-screen text-style">
    <!-- Fondos fijos -->
    <div class="global-fixed-background seccion1-fondo" :class="{ 'show-fixed': isSeccion1Visible }"></div>
    <div class="global-fixed-background seccion2-fondo" :class="{ 'show-fixed': isSeccion2Visible }"></div>
    <div class="global-fixed-background seccion3-fondo" :class="{ 'show-fixed': isSeccion3Visible }"></div>
    <div class="global-fixed-background seccion4-fondo" :class="{ 'show-fixed': isSeccion4Visible }"></div>
    
    <!-- SECCIÓN 1 - NOTICIAS IMPORTANTES -->
    <section 
      id="noticias-importantes"
      ref="seccion1Ref"
      class="scroll-section opacity-0 transition-all duration-800 ease-out"
      :class="{ 'animate-in': isSeccion1Visible }"
      style="height: 100vh; position: relative; background: transparent; margin: 0; padding: 0; display: flex; flex-direction: column;"
    > 
      <div style="height: 4.2vw; flex-shrink: 0;"></div>
      
      <div 
        style="height: calc(100vh - 4.2vw); display: flex; align-items: center; justify-content: center;"
        class="mx-[5vw]"
      >
        <div style="width: 100%; margin: 0 auto;" class="rounded-2xl">
          
          <div v-if="loadingImportantes" class="flex justify-center items-center">
            <div class="text-center">
              <div class="inline-block w-12 h-12 border-4 border-[#E03636] border-t-transparent rounded-full animate-spin"></div>
              <p class="mt-4 text-gray-600">Cargando noticias importantes...</p>
            </div>
          </div>
          
          <div v-else-if="noticiasCarousel.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-[3vw] items-center">
            
            <div class="flex flex-col items-center text-center px-4">
              <div class="w-full">
                <h2 class="text-[#E03636] text-[2.2vw] lg:text-[2vw] font-bold mb-[1.5vw] leading-tight">
                  {{ limpiarAsteriscos(noticiasCarousel[currentIndex].titulo) }}
                </h2>
                <div class="text-gray-800 text-[1.2vw] lg:text-[1.1vw] leading-relaxed my-[2vw] text-justify">
                  <p>{{ noticiasCarousel[currentIndex].descripcion }}</p>
                  <p v-if="noticiasCarousel[currentIndex].descripcion2">{{ noticiasCarousel[currentIndex].descripcion2 }}</p>
                  <p class="text-[#E03636] font-semibold text-right mt-4">
                    {{ formatearFecha(noticiasCarousel[currentIndex].publishedAt || noticiasCarousel[currentIndex].fecha) }}
                  </p>
                </div>
              </div>
              
              <div class="flex justify-center items-center gap-[1.5vw] pt-[2vw]">
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
            
            <div class="flex flex-col items-center justify-center px-4">
              <div class="rounded-xl overflow-hidden shadow-lg w-[80%] mx-auto aspect-square">
                <img 
                  :key="`img-${currentIndex}`"
                  :src="noticiasCarousel[currentIndex].featuredImage?.url || noticiasCarousel[currentIndex].imagen"
                  :alt="limpiarAsteriscos(noticiasCarousel[currentIndex].titulo)"
                  class="w-full h-full object-cover"
                  loading="eager"
                  @error="e => e.target.src = '/images/default-news.jpg'"
                />
              </div>
              <div class="flex justify-center mt-8">
                <button 
                  @click="verNoticia(noticiasCarousel[currentIndex])"
                  class="px-[1.5vw] py-[0.8vw] bg-[#E03636] hover:bg-[#C12F2F] text-white font-semibold rounded-[0.8vw] transition-all duration-300 flex items-center gap-2 group text-[1.1vw] lg:text-[1vw]"
                >
                  Ver noticia completa
                  <svg class="w-[1.2vw] h-[1.2vw] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
            
          </div>
          
          <div v-else-if="!loadingImportantes" class="text-center py-12">
            <p class="text-gray-600">No hay noticias importantes disponibles</p>
            <button @click="recargarDatos" class="mt-4 px-4 py-2 bg-[#E03636] text-white rounded-lg hover:bg-[#C12F2F] transition">Reintentar</button>
          </div>
          
        </div>
      </div>
    </section>

    <!-- SECCIÓN 2 - MÁS NOTICIAS -->
    <div 
      id="mas-noticias"
      ref="seccion2Ref"
      class="scroll-section opacity-0 transition-all duration-800 ease-out delay-200"
      :class="{ 'animate-in': isSeccion2Visible }"
      style="height: 100vh; position: relative; background: white; display: flex; flex-direction: column; justify-content: center; align-items: center;"
    >
      <MoreNewsGrid :limpiarAsteriscos="limpiarAsteriscos" />
    </div>
    
    <!-- SECCIÓN 3 - SESIONES -->
    <div 
      id="sesiones"
      ref="seccion3Ref"
      class="scroll-section opacity-0 transition-all duration-800 ease-out delay-200"
      :class="{ 'animate-in': isSeccion3Visible }"
      style="height: 100vh; position: relative; background: transparent; display: flex; flex-direction: column; justify-content: center"
    >
      <div class="relative w-full text-center pt-[4.4vw] flex-shrink-0">
        <div class="relative inline-block w-full">
          <div class="absolute top-0 left-0 h-[.1vw] bg-[#E4D294] animate-slide-right" style="width: 100%;"></div>
          <div class="absolute bottom-0 right-0 h-[.1vw] bg-[#E4D294] animate-slide-left" style="width: 100%;"></div>
          <div class="absolute top-0 right-0 w-[.1vw] bg-[#E4D294] animate-slide-down" style="height: 100%;"></div>
          <div class="absolute bottom-0 left-0 w-[.1vw] bg-[#E4D294] animate-slide-up" style="height: 100%;"></div>
          <h2 class="text-[3vw] text-white font-semibold bg-[#E03636] py-[.3vw]">Sesiones</h2>
        </div>
      </div>

      <div class="flex-1 flex flex-col justify-center">
        <div v-if="loadingSesiones" class="flex justify-center items-center py-12">
          <div class="inline-block w-12 h-12 border-4 border-[#E03636] border-t-transparent rounded-full animate-spin"></div>
          <p class="ml-3 text-gray-600">Cargando videos...</p>
        </div>
        
        <div v-else class="grid grid-cols-1 sm:grid-cols-3 gap-[2vw] mx-auto px-[6vw] w-full">
          <div v-for="video in sesionesVideos" :key="video.position" class="flex flex-col items-center">
            <div class="w-full aspect-video rounded-[1vw] overflow-hidden border-[.6vw] border-white shadow-lg">
              <iframe 
                class="w-full h-full" 
                :src="`https://www.youtube.com/embed/${video.youtubeId}?autoplay=0&rel=0&modestbranding=1`" 
                :title="video.title"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <p class="text-[1.6vw] text-center font-semibold mt-3 text-[#E03636] line-clamp-2">
              {{ video.title }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- SECCIÓN 4 - PRODUCCIÓN AUDIOVISUAL -->
    <div 
      id="produccion-audiovisual"
      ref="seccion4Ref"
      class="scroll-section opacity-0 transition-all duration-800 ease-out delay-200"
      :class="{ 'animate-in': isSeccion4Visible }"
      style="height: 100vh; position: relative; background: white; display: flex; flex-direction: column; justify-content: center"
    >
      <div class="relative w-full text-center pt-[4.4vw] pb-[1vw] flex-shrink-0">
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
            <!-- CAMBIA ESTA RUTA SEGÚN EL NOMBRE REAL DEL ARCHIVO -->
            <img 
              src="/images/curul/Recurso-1.jpg" 
              alt="Producción Audiovisual - Desde el Curul" 
              class="w-full h-auto object-cover transition-all duration-700 ease-out" 
              @error="e => { console.error('Error loading image:', e.target.src); e.target.src = '/images/placeholder.jpg'; }"
            />
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onActivated, onDeactivated, nextTick, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MoreNewsGrid from '~/components/MoreNewsGrid.vue'
import { useNoticias } from '~/composables/useNoticias'
import { useSesiones } from '~/composables/useSesiones'

definePageMeta({ layout: 'alter8', ssr: true })

const route = useRoute()
const router = useRouter()

console.log('🚀 [PAGE] centro-de-noticias.vue - INICIALIZANDO')

const { 
  noticiasImportantes, 
  ultimasNoticias, 
  todasLasNoticias, 
  loading, 
  error, 
  recargarDatos 
} = useNoticias()

const { videos: sesionesVideos, loading: loadingSesiones, fetchVideos: fetchSesionesVideos } = useSesiones()

const limpiarAsteriscos = (texto) => {
  if (!texto) return ''
  return texto.replace(/\*/g, '')
}

const currentIndex = ref(0)
let carouselInterval = null
let scrollObserver = null

const seccion1Ref = ref(null)
const seccion2Ref = ref(null)
const seccion3Ref = ref(null)
const seccion4Ref = ref(null)

const isSeccion1Visible = ref(false)
const isSeccion2Visible = ref(false)
const isSeccion3Visible = ref(false)
const isSeccion4Visible = ref(false)

const noticiasCarousel = computed(() => noticiasImportantes.value || [])
const loadingImportantes = computed(() => loading.value)

const formatearFecha = (fecha) => {
  if (!fecha) return ''
  return new Date(fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}

const verNoticia = (noticia) => {
  if (noticia && noticia.slug) {
    router.push(`/noticias/${noticia.slug}`)
  }
}

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

const destroyObserver = () => {
  if (scrollObserver) {
    scrollObserver.disconnect()
    scrollObserver = null
  }
}

const initObserver = () => {
  destroyObserver()
  
  const options = { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
  
  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const targetId = entry.target.id
      if (entry.isIntersecting) {
        switch(targetId) {
          case 'noticias-importantes':
            if (!isSeccion1Visible.value) {
              isSeccion1Visible.value = true
              startCarousel()
            }
            break
          case 'mas-noticias':
            if (!isSeccion2Visible.value) {
              isSeccion2Visible.value = true
              stopCarousel()
            }
            break
          case 'sesiones':
            if (!isSeccion3Visible.value) {
              isSeccion3Visible.value = true
              stopCarousel()
            }
            break
          case 'produccion-audiovisual':
            if (!isSeccion4Visible.value) {
              isSeccion4Visible.value = true
              stopCarousel()
            }
            break
        }
        entry.target.classList.add('animate-in')
      }
    })
  }, options)
  
  const sections = [
    document.getElementById('noticias-importantes'),
    document.getElementById('mas-noticias'),
    document.getElementById('sesiones'),
    document.getElementById('produccion-audiovisual')
  ]
  
  sections.forEach(section => {
    if (section) scrollObserver.observe(section)
  })
}

// ============================================
// MAPA DE SECCIONES PARA SCROLL DEL MENÚ
// ============================================
const sectionsMap = {
  'noticias-importantes': seccion1Ref,
  'mas-noticias': seccion2Ref,
  'sesiones': seccion3Ref,
  'produccion-audiovisual': seccion4Ref
}

const scrollToSection = (id) => {
  const sectionRef = sectionsMap[id]
  if (sectionRef?.value) {
    const container = document.querySelector('.snap-container')
    if (container) container.style.scrollSnapType = 'none'
    
    sectionRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
    
    setTimeout(() => {
      if (container) container.style.scrollSnapType = 'y mandatory'
    }, 800)
  }
}

// Watch para cambios en el hash (navegación desde el menú)
watch(() => route.hash, (newHash) => {
  if (newHash && newHash !== '') {
    const id = newHash.replace('#', '')
    console.log(`📍 [PAGE] Navegando a sección: ${id}`)
    setTimeout(() => scrollToSection(id), 100)
  }
})

watch(noticiasCarousel, (nuevas) => {
  if (nuevas.length > 0) {
    console.log(`📊 [PAGE] ${nuevas.length} noticias importantes disponibles`)
    if (isSeccion1Visible.value) {
      startCarousel()
    }
  }
}, { immediate: true })

onActivated(async () => {
  console.log('🔄 [PAGE] Reactivada')
  stopCarousel()
  destroyObserver()
  await recargarDatos()
  await fetchSesionesVideos()
  isSeccion1Visible.value = false
  isSeccion2Visible.value = false
  isSeccion3Visible.value = false
  isSeccion4Visible.value = false
  await nextTick()
  initObserver()
  if (route.hash) {
    const id = route.hash.replace('#', '')
    setTimeout(() => scrollToSection(id), 200)
  } else {
    setTimeout(() => {
      if (!isSeccion1Visible.value) {
        isSeccion1Visible.value = true
        startCarousel()
      }
    }, 200)
  }
})

onDeactivated(() => {
  console.log('💤 [PAGE] Desactivada')
  stopCarousel()
  destroyObserver()
})

onMounted(async () => {
  console.log('🎬 [PAGE] Montada')
  await recargarDatos()
  await fetchSesionesVideos()
  await nextTick()
  initObserver()
  if (route.hash) {
    const id = route.hash.replace('#', '')
    setTimeout(() => scrollToSection(id), 500)
  } else {
    setTimeout(() => {
      if (!isSeccion1Visible.value) {
        isSeccion1Visible.value = true
        startCarousel()
      }
    }, 200)
  }
})

onUnmounted(() => {
  stopCarousel()
  destroyObserver()
})

if (error.value) {
  console.error('❌ [PAGE] Error:', error.value)
}
</script>

<style scoped>
.text-style {
  font-family: 'Montserrat', Tahoma, Geneva, Verdana, sans-serif;
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
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.8s ease-in-out, visibility 0.8s ease-in-out;
}

.global-fixed-background.show-fixed {
  opacity: 1;
  visibility: visible;
}

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

.image-link-wrapper {
  display: block;
  cursor: pointer;
  transform: scale(1);
}

.image-link-wrapper:hover {
  transform: scale(1.02);
  box-shadow: 0 25px 40px -12px rgba(0, 0, 0, 0.3);
}

.image-link-wrapper:active {
  transform: scale(0.98);
}

.image-link-wrapper img {
  transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.3, 1.2);
}

.image-link-wrapper:hover img {
  transform: scale(1.05);
}

@keyframes slide-right {
  0% { width: 0%; left: 0; }
  50% { width: 100%; left: 0; }
  100% { width: 0%; left: 100%; }
}

@keyframes slide-left {
  0% { width: 0%; right: 0; }
  50% { width: 100%; right: 0; }
  100% { width: 0%; right: 100%; }
}

@keyframes slide-down {
  0% { height: 0%; top: 0; }
  50% { height: 100%; top: 0; }
  100% { height: 0%; top: 100%; }
}

@keyframes slide-up {
  0% { height: 0%; bottom: 0; }
  50% { height: 100%; bottom: 0; }
  100% { height: 0%; bottom: 100%; }
}

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

@media (prefers-reduced-motion: reduce) {
  .scroll-section,
  .scroll-section.animate-in,
  .scroll-section.animate-in > * {
    transition: none !important;
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>