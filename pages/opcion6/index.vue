<!-- pages/index.vue - VERSIÓN LIMPIA Y PROFESIONAL -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section profesional -->
    <section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <!-- Fondo con imagen profesional del Senado -->
      <div class="absolute inset-0 z-0">
        <!-- Imagen profesional de edificio legislativo -->
        <img 
          src="https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Edificio del Congreso - Senado Nacional de Bolivia"
          class="w-full h-full object-cover object-center"
          loading="eager"
        />
        <!-- Overlay oscuro para mejor legibilidad -->
        <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70"></div>
      </div>

      <!-- Contenido principal -->
      <div class="container relative z-10 mx-auto px-6 md:px-12 py-16">
        <div class="max-w-5xl mx-auto">
          <!-- Sello oficial limpio -->
          <div class="flex justify-center mb-10">
            <div class="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
              <svg class="w-5 h-5 text-[#E4D294]" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
              </svg>
              <span class="text-white font-medium text-sm tracking-wider">PORTAL OFICIAL</span>
            </div>
          </div>

          <!-- Título principal -->
          <div class="text-center mb-12">
            <div class="mb-6">
              <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                <span class="block">SENADO</span>
                <span class="block text-2xl md:text-4xl lg:text-5xl text-[#E4D294] font-light mt-2">
                  NACIONAL DE BOLIVIA
                </span>
              </h1>
              
              <!-- Línea divisoria -->
              <div class="w-48 h-1 bg-gradient-to-r from-[#E03636] via-[#E4D294] to-[#007A33] mx-auto my-8 rounded-full"></div>
            </div>

            <!-- Descripción -->
            <p class="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Representamos la voluntad popular, legislamos con excelencia y garantizamos 
              el equilibrio de poderes en nuestra democracia.
            </p>
          </div>

          <!-- Acciones principales -->
          <div class="flex flex-wrap justify-center gap-4 mb-16">
            <NuxtLink 
              to="/sesiones"
              class="group relative px-8 py-4 bg-gradient-to-r from-[#E03636] to-[#C12F2F] text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div class="relative flex items-center gap-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
                <span>SESIONES EN VIVO</span>
              </div>
            </NuxtLink>
            
            <NuxtLink 
              to="/legislacion"
              class="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex items-center gap-3"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
              <span>LEGISLACIÓN</span>
            </NuxtLink>
            
            <NuxtLink 
              to="/transparencia"
              class="px-8 py-4 bg-gradient-to-r from-[#E4D294] to-[#D4BC7A] text-gray-900 font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-3"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"/>
              </svg>
              <span>TRANSPARENCIA</span>
            </NuxtLink>
          </div>

          <!-- Indicadores institucionales CON EFECTO DE CONTADOR -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <!-- Contador 1: Senadores -->
            <div class="bg-black/30 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10 hover:border-[#E03636]/50 transition-all duration-300 group">
              <div class="text-3xl font-bold text-white mb-2 font-mono">
                <span ref="senadoresCounter">0</span>
              </div>
              <div class="text-sm text-gray-300 uppercase tracking-wider">Senadores</div>
              <div class="text-xs text-[#E4D294] mt-1">Representación Nacional</div>
              <div class="mt-3 h-1 bg-gradient-to-r from-[#E03636] to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <!-- Contador 2: Departamentos -->
            <div class="bg-black/30 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10 hover:border-[#E4D294]/50 transition-all duration-300 group">
              <div class="text-3xl font-bold text-white mb-2 font-mono">
                <span ref="departamentosCounter">0</span>
              </div>
              <div class="text-sm text-gray-300 uppercase tracking-wider">Departamentos</div>
              <div class="text-xs text-[#E4D294] mt-1">Representados</div>
              <div class="mt-3 h-1 bg-gradient-to-r from-[#E4D294] to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <!-- Contador 3: Leyes -->
            <div class="bg-black/30 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10 hover:border-[#007A33]/50 transition-all duration-300 group">
              <div class="text-3xl font-bold text-white mb-2 font-mono">
                <span ref="leyesCounter">0</span>
              </div>
              <div class="text-sm text-gray-300 uppercase tracking-wider">Leyes Vigentes</div>
              <div class="text-xs text-[#E4D294] mt-1">Marco Legal</div>
              <div class="mt-3 h-1 bg-gradient-to-r from-[#007A33] to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <!-- Contador 4: Comisiones -->
            <div class="bg-black/30 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10 hover:border-[#E03636]/50 transition-all duration-300 group">
              <div class="text-3xl font-bold text-white mb-2 font-mono">
                <span ref="comisionesCounter">0</span>
              </div>
              <div class="text-sm text-gray-300 uppercase tracking-wider">Comisiones</div>
              <div class="text-xs text-[#E4D294] mt-1">Trabajo Legislativo</div>
              <div class="mt-3 h-1 bg-gradient-to-r from-[#E03636] to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>

    
    </section>

    <!-- Sección de Noticias -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-6">
        <!-- Encabezado -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#E03636]/10 to-[#E4D294]/10 rounded-full mb-6">
            <div class="w-2 h-2 bg-[#E03636] rounded-full animate-pulse"></div>
            <span class="text-sm font-semibold text-[#E03636] tracking-wider">INFORMACIÓN OFICIAL</span>
          </div>
          
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Noticias <span class="text-[#E03636]">Destacadas</span>
          </h2>
          
          <div class="w-24 h-1 bg-gradient-to-r from-[#E03636] to-[#E4D294] mx-auto rounded-full mb-6"></div>
          
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Información verificada y autorizada por el Senado Nacional de Bolivia
          </p>
        </div>

        <!-- Grid de noticias -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <!-- Noticia principal -->
          <div class="lg:col-span-2">
            <div class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
              <!-- Imagen con efecto -->
              <div class="relative h-64 md:h-80 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Sesión del Senado Nacional"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                <!-- Badge -->
                <div class="absolute top-6 left-6">
                  <span class="px-4 py-2 bg-[#E03636] text-white text-xs font-bold rounded-full shadow-lg">
                    URGENTE
                  </span>
                </div>
              </div>

              <!-- Contenido -->
              <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div class="flex items-center gap-3 mb-3">
                  <span class="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                    Sesión Plenaria
                  </span>
                  <span class="text-sm text-white/90">15 Enero 2024</span>
                </div>
                
                <h3 class="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
                  Aprobación de la Ley de Presupuesto General del Estado 2024
                </h3>
                
                <p class="text-sm md:text-base text-white/90 mb-4 line-clamp-2">
                  El Senado aprobó por mayoría el proyecto de ley de presupuesto general del Estado 
                  para el ejercicio fiscal 2024.
                </p>
                
                <NuxtLink 
                  to="/noticias/presupuesto-2024"
                  class="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-[#E4D294] transition-colors group/link"
                >
                  Leer noticia completa
                  <svg class="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Noticias secundarias -->
          <div class="space-y-6">
            <div v-for="(news, index) in newsItems" :key="index"
                 class="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-[#E03636]/30">
              <div class="p-5">
                <div class="flex items-start gap-4">
                  <!-- Icono -->
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <span class="text-lg">{{ news.icon }}</span>
                  </div>
                  
                  <!-- Contenido -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-xs font-semibold text-[#E03636]">{{ news.category }}</span>
                      <span class="text-xs text-gray-500">•</span>
                      <span class="text-xs text-gray-500">{{ news.date }}</span>
                    </div>
                    
                    <h4 class="font-bold text-gray-900 mb-2 group-hover:text-[#E03636] transition-colors line-clamp-2">
                      {{ news.title }}
                    </h4>
                    
                    <p class="text-sm text-gray-600 mb-3 line-clamp-2">
                      {{ news.excerpt }}
                    </p>
                    
                    <NuxtLink :to="news.link" class="text-sm font-medium text-[#E03636] hover:text-[#C12F2F] inline-flex items-center gap-1">
                      Ver detalles
                      <svg class="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Ver todas las noticias -->
        <div class="text-center">
          <NuxtLink 
            to="/noticias"
            class="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-[#E03636] to-[#C12F2F] text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <span>Ver todas las noticias</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Sección de Servicios -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Servicios <span class="text-[#007A33]">Ciudadanos</span>
          </h2>
          
          <div class="w-24 h-1 bg-gradient-to-r from-[#007A33] to-[#E4D294] mx-auto rounded-full mb-6"></div>
          
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Acceda a los servicios digitales del Senado Nacional de Bolivia
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="service in services" :key="service.title"
               class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-200">
            <!-- Encabezado de tarjeta -->
            <div class="p-6 pb-4">
              <div class="w-14 h-14 rounded-xl mb-4 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                   :style="`background: ${service.color};`">
                <span class="text-white text-xl">{{ service.icon }}</span>
              </div>
              
              <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#E03636] transition-colors">
                {{ service.title }}
              </h3>
              
              <p class="text-gray-600 mb-6">
                {{ service.description }}
              </p>
            </div>
            
            <!-- Pie de tarjeta -->
            <div class="px-6 pb-6">
              <div class="pt-4 border-t border-gray-100">
                <NuxtLink :to="service.link" 
                         class="inline-flex items-center gap-2 text-[#E03636] font-semibold text-sm hover:text-[#C12F2F] transition-colors">
                  <span>Acceder al servicio</span>
                  <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-8">
          <!-- Información -->
          <div>
            <div class="text-lg font-bold">SENADO NACIONAL</div>
            <div class="text-sm text-gray-400">Estado Plurinacional de Bolivia</div>
          </div>

          <!-- Contacto -->
          <div class="text-center md:text-right">
            <div class="text-sm text-gray-400 mb-2">CONTACTO OFICIAL</div>
            <div class="text-white">informacion@senado.bo</div>
            <div class="text-white">+591 2 2202880</div>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-800 text-center">
          <div class="text-sm text-gray-400">
            © 2024 Senado Nacional de Bolivia. Todos los derechos reservados.
          </div>
          <div class="text-xs text-gray-500 mt-2">
            Plaza Murillo, La Paz - Bolivia
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'alter7'
})

// Referencias para los contadores
const senadoresCounter = ref(null)
const departamentosCounter = ref(null)
const leyesCounter = ref(null)
const comisionesCounter = ref(null)

// Función para animar contador
const animateCounter = (element, finalValue, duration = 2000) => {
  const startTime = performance.now()
  const startValue = 0
  
  const updateCounter = (currentTime) => {
    const elapsedTime = currentTime - startTime
    const progress = Math.min(elapsedTime / duration, 1)
    
    // Easing function para animación suave
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    const currentValue = Math.floor(easeOutQuart * finalValue)
    
    if (element.value) {
      element.value.textContent = currentValue
    }
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter)
    }
  }
  
  requestAnimationFrame(updateCounter)
}

// Iniciar contadores cuando el componente esté montado
onMounted(() => {
  // Esperar un poco para que la página cargue
  setTimeout(() => {
    animateCounter(senadoresCounter, 36, 1500)
    animateCounter(departamentosCounter, 9, 1200)
    animateCounter(leyesCounter, 187, 1800)
    animateCounter(comisionesCounter, 45, 1600)
  }, 500)
})

// Noticias
const newsItems = [
  {
    category: 'LEGISLACIÓN',
    date: '12 ENE 2024',
    title: 'Reforma al Código Penal para combatir la corrupción',
    excerpt: 'Propuestas de modificación al código penal para endurecer penas por delitos de corrupción.',
    icon: '⚖️',
    link: '/noticias/reforma-penal'
  },
  {
    category: 'CULTURA',
    date: '10 ENE 2024',
    title: 'Inauguración de exposición "Patrimonio Cultural Boliviano"',
    excerpt: 'Exposición que muestra la riqueza cultural de Bolivia en las instalaciones del Senado.',
    icon: '🏛️',
    link: '/noticias/exposicion-cultural'
  },
  {
    category: 'ECONOMÍA',
    date: '8 ENE 2024',
    title: 'Análisis de impacto económico de nuevas leyes tributarias',
    excerpt: 'Comisión especial presenta informe sobre el impacto de las reformas tributarias.',
    icon: '📊',
    link: '/noticias/analisis-economico'
  }
]

// Servicios
const services = [
  {
    title: 'Participación Ciudadana',
    description: 'Plataforma para propuestas legislativas ciudadanas y consultas públicas.',
    link: '/participacion',
    color: 'linear-gradient(135deg, #E03636 0%, #C12F2F 100%)',
    icon: '🗳️'
  },
  {
    title: 'Transparencia',
    description: 'Acceso a información pública, declaraciones juradas y datos abiertos.',
    link: '/transparencia',
    color: 'linear-gradient(135deg, #E4D294 0%, #D4BC7A 100%)',
    icon: '🔍'
  },
  {
    title: 'Legislación Vigente',
    description: 'Consulta de leyes, decretos y normativas del Estado Plurinacional.',
    link: '/legislacion',
    color: 'linear-gradient(135deg, #007A33 0%, #005A25 100%)',
    icon: '📚'
  },
  {
    title: 'Comunicación Oficial',
    description: 'Boletines, comunicados y ruedas de prensa institucionales.',
    link: '/comunicacion',
    color: 'linear-gradient(135deg, #575756 0%, #706F6F 100%)',
    icon: '📢'
  }
]
</script>

<style scoped>
/* Animaciones para los contadores */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 5px rgba(224, 54, 54, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(224, 54, 54, 0.8);
  }
}

/* Efecto de contador activo */
.counter-active {
  animation: pulse-glow 2s ease-in-out infinite;
}

/* Efectos de hover mejorados */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Animaciones suaves */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Línea clamp */
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

/* Estilos para scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #E03636, #E4D294);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #C12F2F, #D4BC7A);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem !important;
  }
  
  .section-title {
    font-size: 2.5rem !important;
  }
}

/* Mejora de contraste */
.text-gray-600 {
  color: #4b5563 !important;
}

/* Fuente monoespaciada para contadores */
.font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}
</style>