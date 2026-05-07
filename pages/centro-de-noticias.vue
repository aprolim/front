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
        <div class="w-full rounded-2xl" :style="{ backgroundColor: 'rgba(0, 0, 0, 0)' }">
          
          <!-- Dos columnas - 50% cada una -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <!-- Columna izquierda - Texto (50%) -->
            <div>
              <h2 class="text-[#E03636] text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                {{ noticiasCarousel[currentIndex].titulo }}
              </h2>
              <div class="text-gray-800 text-sm md:text-base leading-relaxed space-y-3">
                <p>{{ noticiasCarousel[currentIndex].descripcion }}</p>
                <p>{{ noticiasCarousel[currentIndex].descripcion2 }}</p>
                <p class="text-[#E03636] font-semibold">{{ noticiasCarousel[currentIndex].fecha }}</p>
              </div>
            </div>
            
            <!-- Columna derecha - Imagen y botón (50%) -->
            <div>
              <div class="rounded-xl overflow-hidden shadow-lg">
                <img 
                  :src="noticiasCarousel[currentIndex].imagen"
                  :alt="noticiasCarousel[currentIndex].titulo"
                  class="w-full h-[400px] md:h-[450px] object-cover"
                />
              </div>
              <div class="flex justify-center mt-6">
                <button 
                  @click="verNoticia(noticiasCarousel[currentIndex])"
                  class="px-8 py-3 bg-[#E03636] hover:bg-[#C12F2F] text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 group text-lg"
                >
                  Ver noticia completa
                  <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Bolitas de navegación -->
          <div class="flex justify-center items-center gap-3 mt-10">
            <button 
              v-for="(noticia, index) in noticiasCarousel" 
              :key="index"
              @click="currentIndex = index"
              class="rounded-full transition-all duration-300"
              :class="currentIndex === index 
                ? 'bg-[#E03636] w-8 h-3' 
                : 'bg-white/50 w-3 h-3 hover:bg-white/80'"
            ></button>
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
      style="min-height: 100vh; position: relative; background: white; overflow-y: auto;"
    >
      <div style="position: relative; z-index: 2; background: transparent; height: 100%;" class="pt-3">
        <MoreNewsGrid />
      </div>
    </div>
    
    <!-- ==================== SECCIÓN 3 - SESIONES (VIDEOS) ==================== -->
    <div 
      id="sesiones"
      ref="seccion3Ref" 
      class="scroll-section opacity-0 transition-all duration-800 ease-out delay-200 z-10"
      :class="{ 'animate-in': isSeccion3Visible }"
      style="min-height: 100vh; position: relative; background: transparent; overflow-y: auto;"
    >
      <!-- Título con fondo rojo -->
      <div class="w-full text-center mt-[4.1vw] mb-0 relative py-[.2em] flex-shrink-0">
        <div class="absolute top-0 left-0 h-[2px] bg-[#E4D294] animate-slide-right"></div>
        <div class="absolute bottom-0 right-0 h-[2px] bg-[#E4D294] animate-slide-left"></div>
        <div class="absolute top-0 right-0 w-[2px] bg-[#E4D294] animate-slide-down"></div>
        <div class="absolute bottom-0 left-0 w-[2px] bg-[#E4D294] animate-slide-up"></div>
        
        <h2 class="text-[3vw] text-white font-semibold bg-[#E03636] py-2">
          Sesiones
        </h2>
      </div>

      <!-- 3 columnas de videos -->
      <div class="mx-[5vw] px-4 z-10 relative w-full flex-1 flex flex-col justify-center min-h-[80vh]">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <!-- Video 1 - Sesión en vivo -->
          <div class="flex flex-col items-center">
            <div class="w-full aspect-video rounded-xl overflow-hidden border-4 border-white transition-all duration-300 hover:border-[#E03636] cursor-pointer group">
              <iframe 
                class="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0"
                title="Sesión en vivo"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <p class="text-center font-semibold mt-3 text-white drop-shadow-lg">Sesión en vivo</p>
          </div>

          <!-- Video 2 - 90 Sesión Ordinaria -->
          <div class="flex flex-col items-center">
            <div class="w-full aspect-video rounded-xl overflow-hidden border-4 border-white transition-all duration-300 hover:border-[#E03636] cursor-pointer group">
              <iframe 
                class="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0"
                title="90 Sesión Ordinaria"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <p class="text-center font-semibold mt-3 text-white drop-shadow-lg">90 Sesión Ordinaria</p>
          </div>

          <!-- Video 3 - 88 Sesión Ordinaria -->
          <div class="flex flex-col items-center">
            <div class="w-full aspect-video rounded-xl overflow-hidden border-4 border-white transition-all duration-300 hover:border-[#E03636] cursor-pointer group">
              <iframe 
                class="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0"
                title="88 Sesión Ordinaria"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <p class="text-center font-semibold mt-3 text-white drop-shadow-lg">88 Sesión Ordinaria</p>
          </div>
        </div>

        <!-- Enlaces a YouTube y Facebook -->
        <div class="flex justify-center items-center gap-6 mt-12 mb-8">
          <a 
            href="https://www.youtube.com/@SenadoBolivia" 
            target="_blank"
            class="group flex items-center gap-3 px-6 py-3 bg-[#E03636] hover:bg-[#C12F2F] text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.376.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.376-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span class="font-semibold">YouTube</span>
          </a>
          
          <a 
            href="https://www.facebook.com/SenadoBolivia" 
            target="_blank"
            class="group flex items-center gap-3 px-6 py-3 bg-[#E03636] hover:bg-[#C12F2F] text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span class="font-semibold">Facebook</span>
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
      style="min-height: 100vh; position: relative; background: transparent; overflow-y: auto;"
    >
      <!-- Título con fondo rojo -->
      <div class="w-full text-center mt-[4.1vw] mb-0 relative py-[.2em] flex-shrink-0">
        <div class="absolute top-0 left-0 h-[2px] bg-[#E4D294] animate-slide-right"></div>
        <div class="absolute bottom-0 right-0 h-[2px] bg-[#E4D294] animate-slide-left"></div>
        <div class="absolute top-0 right-0 w-[2px] bg-[#E4D294] animate-slide-down"></div>
        <div class="absolute bottom-0 left-0 w-[2px] bg-[#E4D294] animate-slide-up"></div>
        
        <h2 class="text-[3vw] text-white font-semibold bg-[#E03636] py-2">
          Producción Audiovisual
        </h2>
      </div>

      <!-- Subtítulo -->
      <div class="text-center mt-4">
        <h3 class="text-[#E03636] text-xl md:text-2xl font-semibold">
          Desde el Curul
        </h3>
        <div class="w-16 h-0.5 bg-[#E4D294] mx-auto mt-2"></div>
      </div>

      <!-- Imagen centrada -->
      <div class="mx-auto px-4 z-10 relative w-full flex-1 flex flex-col justify-center min-h-[70vh]">
        <div class="flex justify-center items-center">
          <div class="rounded-xl overflow-hidden shadow-2xl max-w-4xl w-full">
            <img 
              src="https://images.unsplash.com/photo-1587923623987-c7e408fc830c?w=1200&h=600&fit=crop"
              alt="Producción Audiovisual - Desde el Curul"
              class="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import MoreNewsGrid from '@/components/MoreNewsGrid.vue'

// ==================== SECCIÓN 1 - CARROUSEL ====================
const currentIndex = ref(0)

const noticiasCarousel = ref([
  {
    id: 1,
    titulo: 'Tarija en su aniversario: Leyes, inversión y agenda nacional en una sesión que proyecta desarrollo para Bolivia',
    descripcion: 'En el marco del aniversario del departamento de Tarija, la Cámara de Senadores realizó una sesión especial donde se aprobaron importantes leyes que beneficiarán al desarrollo productivo de la región. Se destinaron más de Bs 500 millones para proyectos de infraestructura vial y energética.',
    descripcion2: 'El presidente del Senado destacó el compromiso del gobierno nacional con el desarrollo equitativo de todos los departamentos, anunciando la construcción de la planta procesadora de uva y la ampliación del aeropuerto Capitán Oriel Lea Plaza.',
    fecha: '15 de abril de 2026',
    imagen: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=500&fit=crop'
  },
  {
    id: 2,
    titulo: 'Senado aprueba Ley General de Aguas para garantizar el acceso al agua potable en todo el territorio nacional',
    descripcion: 'Por unanimidad, la Cámara Alta aprobó la nueva Ley General de Aguas que garantiza el acceso al agua potable como derecho fundamental. La normativa establece mecanismos de distribución equitativa y protección de fuentes hídricas.',
    descripcion2: 'La ley contempla la creación de un fondo de inversión de Bs 1.200 millones para proyectos de riego tecnificado y plantas de tratamiento en áreas rurales y periurbanas. Se estima beneficiar a más de 2 millones de bolivianos.',
    fecha: '10 de abril de 2026',
    imagen: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&h=500&fit=crop'
  },
  {
    id: 3,
    titulo: 'Comisión de Constitución aprueba dictamen de reforma parcial del sistema judicial',
    descripcion: 'La Comisión de Constitución, Derechos Humanos y Legislación aprobó el proyecto de ley de reforma parcial del Órgano Judicial, que incluye la renovación de altas cortes y mecanismos de transparencia en la elección de autoridades.',
    descripcion2: 'El senador presidente de la comisión señaló que la reforma busca fortalecer la independencia judicial y agilizar los procesos. Se prevé que el pleno del Senado trate el proyecto en las próximas dos semanas.',
    fecha: '5 de abril de 2026',
    imagen: 'https://images.unsplash.com/photo-1529101091764-c3526daf3e28?w=800&h=500&fit=crop'
  },
  {
    id: 4,
    titulo: 'Bolivia y Chile retoman diálogo bilateral en mesa técnica convocada por el Senado',
    descripcion: 'Representantes del Senado boliviano y del Congreso chileno se reunieron en una mesa técnica para abordar temas de integración fronteriza, comercio bilateral y cooperación en materia hídrica.',
    descripcion2: 'El encuentro, realizado en la ciudad de La Paz, contó con la participación de senadores de ambas naciones quienes acordaron establecer una agenda de trabajo conjunta y próximos encuentros en la ciudad de Antofagasta.',
    fecha: '1 de abril de 2026',
    imagen: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&h=500&fit=crop'
  }
])

// ==================== AUTO-PLAY CARROUSEL ====================
let carouselInterval = null

const startCarousel = () => {
  if (carouselInterval) clearInterval(carouselInterval)
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

// ==================== MÉTODOS ====================
const verNoticia = (noticia) => {
  console.log('Ver noticia:', noticia)
}

// ==================== SCROLL OBSERVER ====================
const seccion1Ref = ref(null)
const seccion2Ref = ref(null)
const seccion3Ref = ref(null)
const seccion4Ref = ref(null)

const isSeccion1Visible = ref(true)
const isSeccion2Visible = ref(false)
const isSeccion3Visible = ref(false)
const isSeccion4Visible = ref(false)

let scrollObserver = null

const initScrollObserver = () => {
  scrollObserver = new IntersectionObserver(
    (entries) => {
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
    },
    { threshold: 0.3 }
  )
  
  const sections = [seccion1Ref.value, seccion2Ref.value, seccion3Ref.value, seccion4Ref.value]
  sections.forEach(section => {
    if (section) scrollObserver.observe(section)
  })
}

// ==================== LIFECYCLE ====================
onMounted(async () => {
  await nextTick()
  initScrollObserver()
  startCarousel()
})

onUnmounted(() => {
  if (scrollObserver) scrollObserver.disconnect()
  stopCarousel()
})

definePageMeta({ layout: 'alter8' })
</script>

<style scoped>
.text-style {
  font-family: 'Montserrat', Tahoma, Geneva, Verdana, sans-serif;
}

html, body {
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
}

section, .scroll-section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.3, 1.2);
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

.global-fixed-background.show-fixed {
  opacity: 1;
  visibility: visible;
}

/* Fondo plomo para la sección 1 */
.seccion1-fondo {
  background-color: #9e9e9e;
  background-image: none;
}

.seccion2-fondo {
  background-color: #e0e0e0;
  background-image: none;
}

.seccion3-fondo {
  background-color: #9e9e9e;
  background-image: none;
}

.seccion4-fondo {
  background-color: #9e9e9e;
  background-image: none;
}

.scroll-section {
  position: relative;
  width: 100%;
  z-index: 5;
}

.scroll-section.animate-in {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

.aspect-video {
  aspect-ratio: 16 / 9;
}

iframe {
  pointer-events: auto;
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

.animate-slide-right {
  animation: slide-right 4s ease-in-out infinite;
}

.animate-slide-left {
  animation: slide-left 4s ease-in-out infinite;
}

.animate-slide-down {
  animation: slide-down 4s ease-in-out infinite;
}

.animate-slide-up {
  animation: slide-up 4s ease-in-out infinite;
}
</style>