<template>
  <!-- SECCIÓN: Más Noticias -->
  <section 
    class="flex items-center min-h-screen relative overflow-hidden"
    :class="clases.seccion"
    style="background: transparent !important;"
    ref="moreNewsSection"
  >
    <!-- Elementos decorativos -->
    <div class="absolute top-0 right-0 bg-gradient-to-br from-[#8B1A1A]/5 to-transparent rounded-full blur-2xl lg:blur-3xl"
         :class="clases.decoracion"></div>
    <div class="absolute bottom-0 left-0 bg-gradient-to-tr from-[#F9E076]/5 to-transparent rounded-full blur-2xl lg:blur-3xl"
         :class="clases.decoracion"></div>
    
    <div class="container mx-auto relative z-10" :class="clases.container">
      
      <!-- ENCABEZADO -->
      <slot name="header">
        <div class="text-center" :class="clases.header">
          <h2 class="font-bold text-white leading-tight [text-shadow:_0_0_2px_#000]">
            <span :class="clases.titulo">
              {{ title }}
            </span>
            <span :class="clases.titulo" class="text-[#E03636] ml-1 sm:ml-2">
              Noticias
            </span>
          </h2>
          <p class="mx-auto text-gray-600" :class="clases.subtitulo" 
             style="text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">
            {{ subtitle }}
          </p>
        </div>
      </slot>

      <!-- GRID DE NOTICIAS - 4 COLUMNAS DESDE 768px -->
      <div :class="clases.grid" ref="moreNewsGrid">
        <slot name="news">
          <div v-for="(noticia, index) in noticias" :key="index"
            class="news-card relative group opacity-0 translate-y-8 overflow-hidden shadow-md flex flex-col"
            :class="[clases.tarjeta, { 'card-visible': isInView }]" 
            :style="{ transitionDelay: animaciones.transitionDelay(index) }">
            
            <!-- Imagen de fondo -->
            <div class="absolute inset-0 z-0">
              <img :src="noticia.imagen" 
                   :alt="noticia.titulo"
                   class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                   loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
            </div>
            
            <!-- Espaciador dinámico -->
            <div class="flex-grow" :class="clases.espaciador"></div>
            
            <!-- Contenido de tarjeta (fondo rojo semitransparente) -->
            <div class="bg-[#E03636]/40 relative z-10 border border-white/10 flex flex-col justify-between"
                 :class="clases.contenidoTarjeta">
              
              <h3 class="font-bold text-white group-hover:text-red-200 transition-colors line-clamp-3 leading-tight"
                  :class="clases.tituloNoticia">
                {{ noticia.titulo }}
              </h3>
              
              <NuxtLink :to="noticia.enlace" 
                        class="font-bold text-white hover:text-red-100 transition-colors inline-flex items-center mt-auto"
                        :class="clases.enlace">
                <span>Leer más</span>
                <svg class="transition-transform group-hover:translate-x-1" 
                     :class="clases.icono"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </NuxtLink>
            </div>
          </div>
        </slot>
      </div>

      <!-- BOTÓN MÁS NOTICIAS -->
      <slot name="footer">
        <div class="text-center" :class="clases.botonContainer">
          <NuxtLink 
            :to="viewAllLink"
            class="inline-flex items-center bg-gradient-to-r from-[#E03636] to-[#E03636] text-white font-bold rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
            :class="clases.boton"
          >
            <span>Ver todas las noticias</span>
            
            <svg class="transition-transform group-hover:translate-x-1" 
                 :class="clases.botonIcono"
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
import { modeNewsGridData } from '~/components/data/modeNewsGridData'

// Props
const props = defineProps({
  title: { type: String, default: modeNewsGridData.propsPorDefecto.title },
  subtitle: { type: String, default: modeNewsGridData.propsPorDefecto.subtitle },
  viewAllLink: { type: String, default: modeNewsGridData.propsPorDefecto.viewAllLink }
})

// Datos
const noticias = ref(modeNewsGridData.noticias)
const clases = ref(modeNewsGridData.clases)
const animaciones = ref(modeNewsGridData.animaciones)

// Refs
const moreNewsSection = ref(null)
const moreNewsGrid = ref(null)
const isInView = ref(false)

// Intersection Observer para animaciones al hacer scroll
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => { 
      entries.forEach((entry) => { 
        if (entry.isIntersecting) {
          isInView.value = true 
          // Una vez que se activa, dejamos de observar
          if (moreNewsSection.value) {
            observer.unobserve(moreNewsSection.value)
          }
        }
      }) 
    },
    { threshold: 0.1, rootMargin: '50px' }
  )
  
  if (moreNewsSection.value) {
    observer.observe(moreNewsSection.value)
  }
  
  onUnmounted(() => { 
    if (moreNewsSection.value) {
      observer.unobserve(moreNewsSection.value) 
    }
  })
})
</script>

<style scoped>
/* Solo estilos que NO pueden ser manejados por Tailwind */
.news-card {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: transparent;
  opacity: 0;
  transform: translateY(2rem);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.news-card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border-color: rgba(224, 54, 54, 0.3);
  transform: translateY(-4px);
}

.news-card.card-visible { 
  opacity: 1; 
  transform: translateY(0); 
}

/* Línea superior con gradiente (solo visible en hover) */
.news-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #8B1A1A 0%, #F9E076 25%, #007934 50%, #F9E076 75%, #8B1A1A 100%);
  background-size: 200% 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 20;
}

.news-card:hover::before { 
  opacity: 1; 
  animation: gradientShift 3s linear infinite; 
}

@keyframes gradientShift {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Límite de texto a 3 líneas */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
  hyphens: auto;
}

/* Imagen */
img { 
  transition: transform 0.5s ease-out; 
}

.group:hover img { 
  transform: scale(1.05); 
}

/* Ajuste para móviles pequeños - más líneas de texto */
@media (max-width: 374px) {
  .line-clamp-3 {
    -webkit-line-clamp: 4;
  }
}
</style>