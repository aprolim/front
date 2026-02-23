<!-- pages/index.vue - VERSIÓN ELEGANTE CON HERO Y NOTICIAS -->
<template>
  <div class="min-h-screen">
    <!-- Hero Section con imagen de fondo -->
    <section class="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden">
      <!-- Imagen de fondo con overlay -->
      <div class="absolute inset-0 z-0">
        <!-- Imagen de fondo del Senado - Puedes cambiar esta URL -->
        <div class="absolute inset-0 bg-gradient-to-r from-[#E03636]/20 to-[#E4D294]/10"></div>
        <img 
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Edificio del Senado Nacional de Bolivia"
          class="w-full h-full object-cover object-center"
          loading="eager"
        />
        <!-- Overlay de gradiente -->
        <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
      </div>

      <!-- Contenido sobre la imagen -->
      <div class="container relative z-10 mx-auto px-6 md:px-12 py-16">
        <div class="max-w-4xl ml-auto">
          <!-- Badge destacado -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#E03636] to-[#C12F2F] text-white rounded-full mb-6 shadow-lg">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
            </svg>
            <span class="text-sm font-medium">Portal Oficial</span>
          </div>

          <!-- Título principal -->
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span class="block">Senado Nacional</span>
            <span class="block text-[#E4D294]">Bolivia</span>
          </h1>

          <!-- Descripción -->
          <p class="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed">
            Espacio de participación, información e interacción entre el Senado y la ciudadanía. 
            Transparencia, democracia y servicio público.
          </p>

          <!-- Línea decorativa -->
          <div class="w-24 h-1 bg-gradient-to-r from-[#E03636] to-[#E4D294] mb-8 rounded-full"></div>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap gap-4">
            <NuxtLink 
              to="/participacion" 
              class="px-8 py-4 bg-gradient-to-r from-[#E03636] to-[#C12F2F] text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-3 group"
            >
              <span>Participar Activamente</span>
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </NuxtLink>
            
            <NuxtLink 
              to="/gestion-legislativa" 
              class="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 flex items-center gap-3 group"
            >
              <span>Conocer Proyectos</span>
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </NuxtLink>
          </div>

          <!-- Estadísticas rápidas -->
          <div class="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
              <div class="text-2xl md:text-3xl font-bold text-white mb-1">36</div>
              <div class="text-xs md:text-sm text-white/80">Legisladores</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
              <div class="text-2xl md:text-3xl font-bold text-white mb-1">24</div>
              <div class="text-xs md:text-sm text-white/80">Proyectos 2024</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
              <div class="text-2xl md:text-3xl font-bold text-white mb-1">85%</div>
              <div class="text-xs md:text-sm text-white/80">Participación</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
              <div class="text-2xl md:text-3xl font-bold text-white mb-1">150+</div>
              <div class="text-xs md:text-sm text-white/80">Sesiones</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg class="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>
    </section>

    <!-- Sección de Noticias Importantes -->
    <section class="py-16 bg-gradient-to-b from-white to-gray-50">
      <div class="container mx-auto px-6">
        <!-- Encabezado de noticias -->
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#E03636]/10 to-[#E4D294]/10 rounded-full mb-4">
            <svg class="w-4 h-4 text-[#E03636]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
            </svg>
            <span class="text-sm font-medium text-[#E03636]">Últimas Noticias</span>
          </div>
          
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Noticias <span class="text-[#E03636]">Destacadas</span>
          </h2>
          <p class="text-lg text-[#B1B1B1] max-w-2xl mx-auto">
            Las noticias más relevantes del Senado Nacional. Mantente informado sobre las últimas decisiones legislativas.
          </p>
        </div>

        <!-- Grid de noticias elegante -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Noticia Principal (destacada) -->
          <div class="lg:col-span-2">
            <div class="group relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-3xl">
              <!-- Imagen destacada -->
              <div class="relative h-64 md:h-80 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Sesión plenaria del Senado"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                <!-- Badge destacado -->
                <div class="absolute top-4 left-4">
                  <span class="px-3 py-1 bg-gradient-to-r from-[#E03636] to-[#C12F2F] text-white text-xs font-bold rounded-full shadow-lg">
                    DESTACADO
                  </span>
                </div>
              </div>

              <!-- Contenido de la noticia -->
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div class="flex items-center gap-3 mb-3">
                  <span class="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                    Sesión Plenaria
                  </span>
                  <span class="text-sm opacity-90">15 Enero 2024</span>
                </div>
                
                <h3 class="text-xl md:text-2xl font-bold mb-3 leading-tight">
                  Aprobación de la Ley de Presupuesto General del Estado 2024
                </h3>
                
                <p class="text-sm md:text-base opacity-90 mb-4 line-clamp-2">
                  El Senado aprobó por mayoría el proyecto de ley de presupuesto general del Estado 
                  para el ejercicio fiscal 2024, marcando un hito en la planificación económica nacional.
                </p>
                
                <NuxtLink 
                  to="/noticias/presupuesto-2024"
                  class="inline-flex items-center gap-2 text-sm font-medium group-hover:text-[#E4D294] transition-colors"
                >
                  Leer noticia completa
                  <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Noticias secundarias (3 noticias verticales) -->
          <div class="space-y-6">
            <!-- Noticia 1 -->
            <div class="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div class="p-5">
                <div class="flex items-start gap-4">
                  <!-- Icono de categoría -->
                  <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-[#E03636]/10 to-[#E4D294]/10 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-[#E03636]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                  </div>
                  
                  <!-- Contenido -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-xs font-medium text-[#E03636]">Seguridad</span>
                      <span class="text-xs text-[#B1B1B1]">• 12 Ene</span>
                    </div>
                    
                    <h4 class="font-bold text-gray-900 mb-2 group-hover:text-[#E03636] transition-colors line-clamp-2">
                      Reforma al Código Penal para combatir la corrupción
                    </h4>
                    
                    <p class="text-sm text-gray-600 mb-3 line-clamp-2">
                      Propuestas de modificación al código penal para endurecer penas por delitos de corrupción.
                    </p>
                    
                    <NuxtLink to="/noticias/reforma-penal" class="text-sm font-medium text-[#E03636] hover:underline inline-flex items-center gap-1">
                      Ver detalles
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>

            <!-- Noticia 2 -->
            <div class="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div class="p-5">
                <div class="flex items-start gap-4">
                  <!-- Icono de categoría -->
                  <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-[#E4D294]/10 to-[#B1B1B1]/10 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-[#E4D294]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                  </div>
                  
                  <!-- Contenido -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-xs font-medium text-[#E4D294]">Cultura</span>
                      <span class="text-xs text-[#B1B1B1]">• 10 Ene</span>
                    </div>
                    
                    <h4 class="font-bold text-gray-900 mb-2 group-hover:text-[#E03636] transition-colors line-clamp-2">
                      Inauguración de exposición "Patrimonio Cultural Boliviano"
                    </h4>
                    
                    <p class="text-sm text-gray-600 mb-3 line-clamp-2">
                      Exposición que muestra la riqueza cultural de Bolivia en las instalaciones del Senado.
                    </p>
                    
                    <NuxtLink to="/noticias/exposicion-cultural" class="text-sm font-medium text-[#E03636] hover:underline inline-flex items-center gap-1">
                      Ver detalles
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>

            <!-- Noticia 3 -->
            <div class="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div class="p-5">
                <div class="flex items-start gap-4">
                  <!-- Icono de categoría -->
                  <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-[#B1B1B1]/10 to-[#E03636]/10 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-[#B1B1B1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  
                  <!-- Contenido -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-xs font-medium text-[#B1B1B1]">Economía</span>
                      <span class="text-xs text-[#B1B1B1]">• 8 Ene</span>
                    </div>
                    
                    <h4 class="font-bold text-gray-900 mb-2 group-hover:text-[#E03636] transition-colors line-clamp-2">
                      Análisis de impacto económico de nuevas leyes tributarias
                    </h4>
                    
                    <p class="text-sm text-gray-600 mb-3 line-clamp-2">
                      Comisión especial presenta informe sobre el impacto de las reformas tributarias.
                    </p>
                    
                    <NuxtLink to="/noticias/analisis-economico" class="text-sm font-medium text-[#E03636] hover:underline inline-flex items-center gap-1">
                      Ver detalles
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Botón para ver todas las noticias -->
        <div class="text-center mt-12">
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

    <!-- Sección de acceso rápido -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Acceso <span class="text-[#E03636]">Rápido</span>
          </h2>
          <p class="text-lg text-[#B1B1B1] max-w-2xl mx-auto">
            Accede directamente a las secciones más importantes del portal
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <NuxtLink 
            v-for="item in quickLinks"
            :key="item.title"
            :to="item.link"
            class="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
          >
            <div class="w-14 h-14 rounded-xl mb-4 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                 :style="`background: ${item.color};`">
              <span v-html="item.icon" class="text-white text-xl"></span>
            </div>
            <h3 class="font-bold text-gray-900 mb-2 group-hover:text-[#E03636] transition-colors">
              {{ item.title }}
            </h3>
            <p class="text-sm text-gray-600">{{ item.description }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Enlace a versión alternativa -->
    <div class="bg-gradient-to-r from-[#E03636]/5 to-[#E4D294]/5 py-12 border-t border-gray-200">
      <div class="container mx-auto px-6 text-center">
        <h3 class="text-xl font-bold mb-4 text-gray-900">¿Prefieres otro estilo de navegación?</h3>
        <NuxtLink 
          to="/elegant" 
          class="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-[#E03636] to-[#C12F2F] text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
          Ver versión con menú desplegable
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// Enlaces de acceso rápido
definePageMeta({
  layout: 'alter6'
})
const quickLinks = [
  {
    title: 'Legisladores',
    description: 'Conoce a los representantes',
    link: '/legisladores',
    color: 'linear-gradient(135deg, #E03636 0%, #C12F2F 100%)',
    icon: '👥'
  },
  {
    title: 'Proyectos de Ley',
    description: 'Seguimiento legislativo',
    link: '/gestion-legislativa',
    color: 'linear-gradient(135deg, #E4D294 0%, #D4BC7A 100%)',
    icon: '📋'
  },
  {
    title: 'Participación',
    description: 'Involúcrate activamente',
    link: '/participacion',
    color: 'linear-gradient(135deg, #B1B1B1 0%, #9D9D9C 100%)',
    icon: '💬'
  },
  {
    title: 'Transparencia',
    description: 'Información pública',
    link: '/transparencia',
    color: 'linear-gradient(135deg, #575756 0%, #706F6F 100%)',
    icon: '🔍'
  }
]
</script>

<style scoped>
/* Estilos personalizados */

/* Efecto de recorte de texto para noticias */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animación suave para imágenes */
img {
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Mejora de rendimiento para animaciones */
.group:hover img {
  transform: scale(1.1);
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

/* Mejoras de accesibilidad */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    min-height: 70vh;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .news-grid {
    grid-template-columns: 1fr;
  }
}

/* Efecto de brillo en botones */
button, a[href] {
  position: relative;
  overflow: hidden;
}

button::after, a[href]::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 70%
  );
  transform: rotate(45deg);
  transition: transform 0.6s;
}

button:hover::after, a[href]:hover::after {
  transform: rotate(45deg) translate(50%, 50%);
}
</style>