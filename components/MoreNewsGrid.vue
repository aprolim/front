<template>
  <!-- SECCIÓN: Más Noticias -->
  <section 
    class="bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
    ref="moreNewsSection"
  >
    <!-- Elemento decorativo -->
    <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#8B1A1A]/10 to-transparent rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#F9E076]/10 to-transparent rounded-full blur-3xl"></div>
    <div class="container mx-auto px-10 relative z-10">
      <!-- Encabezado de la sección -->
      <slot name="header">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Últimas <span class="text-[#E03636]">Noticias</span>
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Información actualizada sobre las actividades legislativas del Senado Nacional
          </p>
        </div>
      </slot>

      <!-- Grid de 4 noticias -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" ref="moreNewsGrid">
        <!-- Slot para noticias personalizadas -->
        <slot name="news">
          <!-- Noticia 1 por defecto -->
          <div 
            class="news-card opacity-0 translate-y-8"
            :class="{ 'card-visible': isInView }"
            :style="{ transitionDelay: '0ms' }"
          >
            <!-- Imagen -->
            <div class="relative h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Sesión parlamentaria"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <!-- <div class="absolute top-4 left-4">
                <span class="px-3 py-1 bg-gradient-to-r from-[#8B1A1A] to-[#5C1010] text-white text-xs font-bold rounded-full shadow-lg">
                  EDUCACIÓN
                </span>
              </div> -->
            </div>
            
            <!-- Contenido -->
            <div class="p-6">
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-medium text-[#8B1A1A]">Comisión de Educación</span>
                <span class="text-xs text-gray-500">22 ENE</span>
              </div>
              
              <h3 class="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#8B1A1A] transition-colors">
                Reforma Educativa para áreas rurales aprobada
              </h3>
              
              <p class="text-sm text-gray-600 mb-4 line-clamp-3">
                Nueva ley busca mejorar la calidad educativa en comunidades rurales con programas de capacitación docente.
              </p>
              
              <NuxtLink 
                :to="newsLink1"
                class="text-sm font-bold text-[#E03636] hover:text-[#5C1010] transition-colors inline-flex items-center gap-1 group"
              >
                Leer más
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </NuxtLink>
            </div>
          </div>

          <!-- Noticia 2 por defecto -->
          <div 
            class="news-card opacity-0 translate-y-8"
            :class="{ 'card-visible': isInView }"
            :style="{ transitionDelay: '150ms' }"
          >
            <!-- Imagen -->
            <div class="relative h-48 overflow-hidden">
              <img 
                src="https://online.udla.edu.ec/images/estudiantes-maestria-salud_700w.webp"
                alt="Salud pública"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <!-- <div class="absolute top-4 left-4">
                <span class="px-3 py-1 bg-gradient-to-r from-[#F9E076] to-[#D4AF37] text-gray-900 text-xs font-bold rounded-full shadow-lg">
                  SALUDs
                </span>
              </div> -->
            </div>
            
            <!-- Contenido -->
            <div class="p-6">
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-medium text-[#D4AF37]">Comisión de Salud</span>
                <span class="text-xs text-gray-500">20 ENE</span>
              </div>
              
              <h3 class="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#8B1A1A] transition-colors">
                Plan Nacional de Hospitales 2024-2026
              </h3>
              
              <p class="text-sm text-gray-600 mb-4 line-clamp-3">
                Inversión de $500M para modernizar 45 hospitales públicos en todo el territorio nacional.
              </p>
              
              <NuxtLink 
                :to="newsLink2"
                class="text-sm font-bold text-[#E03636] hover:text-[#5C1010] transition-colors inline-flex items-center gap-1 group"
              >
                Leer más
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </NuxtLink>
            </div>
          </div>

          <!-- Noticia 3 por defecto -->
          <div 
            class="news-card opacity-0 translate-y-8"
            :class="{ 'card-visible': isInView }"
            :style="{ transitionDelay: '300ms' }"
          >
            <!-- Imagen -->
            <div class="relative h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1589578527966-fdac0f44566c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Medio ambiente"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <!-- <div class="absolute top-4 left-4">
                <span class="px-3 py-1 bg-gradient-to-r from-[#007934] to-[#005C26] text-white text-xs font-bold rounded-full shadow-lg">
                  MEDIO AMBIENTE
                </span>
              </div> -->
            </div>
            
            <!-- Contenido -->
            <div class="p-6">
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-medium text-[#007934]">Comisión Ambiental</span>
                <span class="text-xs text-gray-500">18 ENE</span>
              </div>
              
              <h3 class="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#8B1A1A] transition-colors">
                Protección de bosques nativos ampliada
              </h3>
              
              <p class="text-sm text-gray-600 mb-4 line-clamp-3">
                Nueva legislación protege 2M hectáreas adicionales de bosques nativos contra deforestación ilegal.
              </p>
              
              <NuxtLink 
                :to="newsLink3"
                class="text-sm font-bold text-[#E03636] hover:text-[#5C1010] transition-colors inline-flex items-center gap-1 group"
              >
                Leer más
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </NuxtLink>
            </div>
          </div>

          <!-- Noticia 4 por defecto -->
          <div 
            class="news-card opacity-0 translate-y-8"
            :class="{ 'card-visible': isInView }"
            :style="{ transitionDelay: '450ms' }"
          >
            <!-- Imagen -->
            <div class="relative h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Tecnología"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <!-- <div class="absolute top-4 left-4">
                <span class="px-3 py-1 bg-gradient-to-r from-[#575756] to-[#3A3A39] text-white text-xs font-bold rounded-full shadow-lg">
                  TECNOLOGÍA
                </span>
              </div> -->
            </div>
            
            <!-- Contenido -->
            <div class="p-6">
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-medium text-[#575756]">Innovación Digital</span>
                <span class="text-xs text-gray-500">16 ENE</span>
              </div>
              
              <h3 class="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#8B1A1A] transition-colors">
                Nueva plataforma digital del Senado
              </h3>
              
              <p class="text-sm text-gray-600 mb-4 line-clamp-3">
                Sistema permite seguimiento en tiempo real de sesiones y participación ciudadana en proyectos de ley.
              </p>
              
              <NuxtLink 
                :to="newsLink4"
                class="text-sm font-bold text-[#E03636] hover:text-[#5C1010] transition-colors inline-flex items-center gap-1 group"
              >
                Leer más
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </NuxtLink>
            </div>
          </div>
        </slot>
      </div>

      <!-- Botón para más noticias -->
      <slot name="footer">
        <div class="text-center mt-12">
          <NuxtLink 
            :to="viewAllLink"
            class="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-[#E03636] to-[#E03636] text-white font-bold rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
          >
            <span>Ver todas las noticias</span>
            <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </NuxtLink>
        </div>
      </slot>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Props configurables
const props = defineProps({
  title: {
    type: String,
    default: 'Últimas Noticias'
  },
  subtitle: {
    type: String,
    default: 'Información actualizada sobre las actividades legislativas del Senado Nacional'
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  viewAllLink: {
    type: String,
    default: '/noticias'
  },
  newsLink1: {
    type: String,
    default: '/noticias/reforma-educativa'
  },
  newsLink2: {
    type: String,
    default: '/noticias/plan-hospitalario'
  },
  newsLink3: {
    type: String,
    default: '/noticias/proteccion-bosques'
  },
  newsLink4: {
    type: String,
    default: '/noticias/plataforma-digital'
  }
})

// Refs para animaciones
const moreNewsSection = ref(null)
const moreNewsGrid = ref(null)

// Estado para controlar efectos
const isInView = ref(false)

onMounted(() => {
  // Observer para la sección de más noticias
  const moreNewsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isInView.value = true
          
          // Animación escalonada para las tarjetas
          setTimeout(() => {
            if (moreNewsGrid.value) {
              const cards = moreNewsGrid.value.children
              Array.from(cards).forEach((card, index) => {
                setTimeout(() => {
                  card.classList.add('card-visible')
                }, index * 150)
              })
            }
          }, 300)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  )

  if (moreNewsSection.value) {
    moreNewsObserver.observe(moreNewsSection.value)
  }

  onUnmounted(() => {
    if (moreNewsSection.value) {
      moreNewsObserver.unobserve(moreNewsSection.value)
    }
  })
})
</script>

<style scoped>
/* Estilos para las tarjetas de noticias */
.news-card {
  position: relative;
  overflow: hidden;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  background-color: white;
  opacity: 0;
  transform: translateY(2rem);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
}

.news-card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border-color: rgba(139, 26, 26, 0.2);
  transform: translateY(-4px);
}

.news-card.card-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Efecto de gradiente animado en hover para tarjetas */
.news-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, 
    #8B1A1A 0%, 
    #F9E076 25%, 
    #007934 50%, 
    #F9E076 75%, 
    #8B1A1A 100%
  );
  background-size: 200% 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.news-card:hover::before {
  opacity: 1;
  animation: gradientShift 3s linear infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

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

.group:hover img {
  transform: scale(1.05);
}

/* Responsive */
@media (max-width: 768px) {
  .news-card {
    margin-bottom: 1.5rem;
  }
}
</style>