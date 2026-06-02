<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container mx-auto px-4 max-w-6xl">
      <button 
        @click="volverAtras"
        class="inline-flex items-center gap-2 text-[#E03636] hover:text-[#C12F2F] transition-colors mb-6 group"
      >
        <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Volver
      </button>

      <!-- Estado de carga -->
      <div v-if="pending && !noticiaData?.noticia" class="flex justify-center items-center py-20">
        <div class="inline-block w-12 h-12 border-4 border-[#E03636] border-t-transparent rounded-full animate-spin"></div>
        <p class="ml-3 text-gray-500">Cargando noticia...</p>
      </div>

      <!-- Estado de error -->
      <div v-else-if="errorMsg || error" class="text-center py-12 bg-white rounded-xl">
        <p class="text-red-600 mb-4">{{ errorMsg || error?.message || 'Error al cargar la noticia' }}</p>
        <button @click="recargar" class="bg-[#E03636] text-white px-4 py-2 rounded-lg hover:bg-[#C12F2F] transition">Reintentar</button>
      </div>

      <!-- Noticia encontrada y su contenido -->
      <template v-else-if="noticiaData?.noticia">
        <article class="bg-white rounded-xl shadow-lg overflow-hidden">
          <!-- TITULO -->
          <div class="p-6 md:p-8 pb-0">
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="bg-[#E03636] text-white text-sm px-3 py-1 rounded-full">{{ noticiaData.noticia.categoria || 'Noticia' }}</span>
              <span v-if="noticiaData.noticia.category === 'legislacion'" class="bg-yellow-500 text-white text-sm px-3 py-1 rounded-full font-semibold">★ Importante</span>
            </div>
            <!-- Título con palabras en color rojo -->
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              <span v-html="formatTitleWithColors(noticiaData.noticia.title)"></span>
            </h1>
            <p class="text-gray-600 text-base md:text-lg mt-4 leading-relaxed">
              {{ noticiaData.noticia.excerpt }}
            </p>
          </div>

          <!-- CARRUSEL -->
          <div class="px-6 md:px-8 mt-6 mb-4">
            <div class="relative">
              <div class="relative overflow-hidden rounded-2xl bg-gray-900 shadow-2xl" style="height: 500px;">
                <div class="flex h-full">
                  <div class="flex-shrink-0 transition-all duration-500 ease-out overflow-hidden h-full cursor-pointer"
                       :style="{ width: `${peekLeftWidth}%` }"
                       @click="anteriorImagen">
                    <div class="relative w-full h-full">
                      <img 
                        :src="imagenAnterior?.url || imagenActual?.url"
                        :alt="imagenAnterior?.alt || 'Imagen anterior'"
                        class="w-full h-full object-cover"
                      />
                      <div class="absolute inset-0 bg-black/30"></div>
                    </div>
                  </div>

                  <div class="flex-shrink-0 transition-all duration-500 h-full"
                       :style="{ width: `${imagenActualWidth}%` }">
                    <div class="relative w-full h-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                      <img 
                        :src="imagenActual?.url"
                        :alt="imagenActual?.alt"
                        class="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  <div class="flex-shrink-0 transition-all duration-500 overflow-hidden h-full cursor-pointer"
                       :style="{ width: `${peekRightWidth}%` }"
                       @click="siguienteImagen">
                    <div class="relative w-full h-full">
                      <img 
                        :src="imagenSiguiente?.url || imagenActual?.url"
                        :alt="imagenSiguiente?.alt || 'Imagen siguiente'"
                        class="w-full h-full object-cover"
                      />
                      <div class="absolute inset-0 bg-black/30"></div>
                    </div>
                  </div>
                </div>

                <button 
                  v-if="imagenesCarrusel.length > 1"
                  @click="anteriorImagen"
                  class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#E03636] text-white rounded-full p-3 transition-all duration-300 backdrop-blur-sm z-10 group"
                >
                  <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>

                <button 
                  v-if="imagenesCarrusel.length > 1"
                  @click="siguienteImagen"
                  class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#E03636] text-white rounded-full p-3 transition-all duration-300 backdrop-blur-sm z-10 group"
                >
                  <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>

                <div v-if="imagenesCarrusel.length > 1" class="absolute top-4 right-4 bg-black/70 text-white text-sm px-3 py-1.5 rounded-full backdrop-blur-sm font-medium z-10">
                  {{ String(currentIndex + 1).padStart(2, '0') }} / {{ String(imagenesCarrusel.length).padStart(2, '0') }}
                </div>
              </div>

              <div class="text-center mt-3">
                <p class="text-gray-600 text-sm md:text-base italic">
                  {{ imagenActual?.alt || 'Sin descripción' }}
                </p>
              </div>

              <div v-if="imagenesCarrusel.length > 1" class="flex justify-center gap-2 mt-4 overflow-x-auto pb-2">
                <button
                  v-for="(img, idx) in imagenesCarrusel"
                  :key="idx"
                  @click="currentIndex = idx"
                  class="relative flex-shrink-0 transition-all duration-300 rounded-lg overflow-hidden"
                  :class="currentIndex === idx ? 'ring-2 ring-[#E03636] scale-105' : 'opacity-60 hover:opacity-100'"
                  style="width: 80px; height: 60px;"
                >
                  <img 
                    :src="img.url" 
                    :alt="`Miniatura ${idx + 1}`"
                    class="w-full h-full object-cover"
                  />
                </button>
              </div>
            </div>
          </div>

          <!-- REDES SOCIALES -->
          <div class="px-6 md:px-8 mb-6">
            <div class="flex justify-end items-center gap-3 py-2 border-b border-gray-200">
              <span class="text-gray-500 text-sm mr-1">Compartir:</span>
              
              <a 
                :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(windowLocation)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="social-icon rounded-lg border border-gray-300 hover:border-[#E03636] transition-all duration-300"
                aria-label="Compartir en Facebook"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              <a 
                :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(noticiaData.noticia.title)}&url=${encodeURIComponent(windowLocation)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="social-icon rounded-lg border border-gray-300 hover:border-[#E03636] transition-all duration-300"
                aria-label="Compartir en X"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              <a 
                :href="`https://www.instagram.com/?url=${encodeURIComponent(windowLocation)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="social-icon rounded-lg border border-gray-300 hover:border-[#E03636] transition-all duration-300"
                aria-label="Compartir en Instagram"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/>
                </svg>
              </a>

              <a 
                :href="`https://www.youtube.com/results?search_query=${encodeURIComponent(noticiaData.noticia.title)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="social-icon rounded-lg border border-gray-300 hover:border-[#E03636] transition-all duration-300"
                aria-label="Buscar en YouTube"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- CONTENIDO VARIABLE DE LA NOTICIA -->
          <div class="p-6 md:p-8 pt-0">
            <div 
              v-for="(block, index) in noticiaData.noticia.blocks" 
              :key="index"
              class="block-item"
            >
              <!-- Párrafo normal -->
              <div v-if="block.type === 'paragraph'" class="prose prose-lg max-w-none text-gray-700 mb-6">
                <p>{{ block.content }}</p>
              </div>

              <!-- CITA DESTACADA CON COMILLAS ABSOLUTAS -->
              <div v-else-if="block.type === 'quote'" class="quote-block mt-[3vw] mb-[5vw]">
                <div class="quote-badge">
                  <div class="badge-name">{{ block.author }}</div>
                  <div class="badge-role">{{ block.role }}</div>
                </div>
                <div class="quote-container">
                  <div class="quote-content-wrapper">
                    <span class="quote-mark quote-open">“</span>
                    <p class="quote-text">{{ block.content }}</p>
                    <span class="quote-mark quote-close">”</span>
                  </div>
                </div>
              </div>

              <!-- Video -->
              <div v-else-if="block.type === 'video'" class="video-block my-8">
                <div class="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                  <iframe 
                    :src="block.url" 
                    :title="block.title || 'Video'"
                    class="absolute inset-0 w-full h-full"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <p v-if="block.caption" class="text-sm text-gray-500 text-center mt-2">{{ block.caption }}</p>
              </div>
            </div>
          </div>
        </article>

        <!-- SECCIÓN NOTICIAS RELACIONADAS - SOLO CUANDO LA NOTICIA PRINCIPAL EXISTE -->
        <div class="mt-16 bg-slate-200">
          <h2 class="text-[1.5vw] font-bold text-gray-800 border-l-4 border-[#E03636] pl-4 text-center">            <span class="text-[#E03636]">Articulos Relacionados</span>
          </h2>
          <hr class="border-black border-t-2  mx-[5vw]">
          
          <!-- Estado de carga para relacionadas -->
          <div v-if="loadingRelacionadas" class="flex justify-center py-8">
            <div class="inline-block w-8 h-8 border-4 border-[#E03636] border-t-transparent rounded-full animate-spin"></div>
          </div>

          <!-- Noticias relacionadas encontradas -->
          <div v-else-if="noticiasRelacionadas.length > 0" class="relative">
            <!-- Flecha izquierda -->
            <button 
              v-if="noticiasRelacionadas.length > 2"
              @click="anteriorRelacionada"
              :disabled="relacionadaCurrentIndex === 0"
              class="absolute left-0 top-1/2 -translate-y-1/2 z-10 py-2 hover:bg-[#E03636] hover:text-white text-[#E03636] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg class="w-[3vw] h-[4vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 19l-7-7 7-7"></path>
              </svg>
            </button>

            <!-- Contenedor de noticias relacionadas -->
            <div class="overflow-hidden mx-8">
              <div 
                class="flex transition-transform duration-500 ease-in-out gap-6"
                :style="{ transform: `translateX(-${relacionadaCurrentIndex * (100 / noticiasPorPagina)}%)` }"
              >
                <div 
                  v-for="(relacionada, idx) in noticiasRelacionadas"
                  :key="idx"
                  class="flex-shrink-0 w-full md:w-[calc(50%-12px)] transition-all cursor-pointer overflow-hidden"
                  @click="verNoticiaRelacionada(relacionada)"
                >
                  <div class="p-5">
                    <!-- Título con palabras rojas -->
                    <h3 class="text-xl font-bold text-gray-900 mb-3 leading-tight">
                      <span v-html="formatTitleWithColors(relacionada.titulo)"></span>
                    </h3>
                    <!-- Resumen -->
                    <p class="text-gray-600 line-clamp-3">{{ relacionada.descripcion }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Flecha derecha -->
            <button 
              v-if="noticiasRelacionadas.length > 2"
              @click="siguienteRelacionada"
              :disabled="relacionadaCurrentIndex >= maxRelacionadaIndex"
              class="absolute right-0 top-1/2 -translate-y-1/2 z-10 py-2 hover:bg-[#E03636] hover:text-white text-[#E03636] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg class="w-[3vw] h-[4vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>

          <!-- Mensaje cuando no hay noticias relacionadas -->
          <div v-else class="text-center py-8 bg-gray-50 rounded-xl">
            <p class="text-gray-500">No hay noticias relacionadas disponibles en este momento.</p>
          </div>
        </div>
      </template>

      <!-- Noticia no encontrada -->
      <div v-else-if="!pending && !noticiaData?.noticia && !error" class="text-center py-12 bg-white rounded-xl">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Noticia no encontrada</h1>
        <p class="text-gray-500 mb-6">Lo sentimos, la noticia que buscas no existe o ha sido removida.</p>
        <button @click="volverAtras" class="inline-block bg-[#E03636] text-white px-6 py-3 rounded-lg hover:bg-[#C12F2F] transition">Volver atrás</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const windowLocation = ref('')
const currentIndex = ref(0)
const imagenesCarrusel = ref([])
const errorMsg = ref(null)

// Noticias relacionadas - siempre visibles (cuando la noticia principal existe)
const noticiasRelacionadas = ref([])
const relacionadaCurrentIndex = ref(0)
const loadingRelacionadas = ref(true)

// Configuración de paginación para relacionadas
const noticiasPorPagina = 2
const maxRelacionadaIndex = computed(() => Math.max(0, Math.ceil(noticiasRelacionadas.value.length / noticiasPorPagina) - 1))

// Función para cargar noticias relacionadas desde la API
const cargarNoticiasRelacionadas = async () => {
  loadingRelacionadas.value = true
  try {
    // Aquí vendrá la llamada real a la API
    // En producción, reemplazar con:
    // const response = await $fetch('/api/noticias/relacionadas', { 
    //   params: { 
    //     slug: route.params.slug,
    //     limit: 6 
    //   } 
    // })
    // noticiasRelacionadas.value = response.data
    
    // Simulación de delay de red
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Datos de ejemplo - SIEMPRE visibles para todas las noticias
    const noticiasRelacionadasSimuladas = [
      {
        id: 'rel1',
        titulo: '*Comisión* de Justicia revisa reformas al *código penal*',
        descripcion: 'La comisión de justicia analiza las modificaciones propuestas al código penal, con el objetivo de actualizar la normativa vigente y adaptarla a las necesidades actuales de la sociedad boliviana.',
        publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        slug: 'comision-justicia-reforma-penal'
      },
      {
        id: 'rel2',
        titulo: '*Senado* conmemora el *Día de la Madre Tierra*',
        descripcion: 'El Senado realizó una sesión especial para conmemorar el Día de la Madre Tierra, reafirmando su compromiso con la protección del medio ambiente y los recursos naturales del país.',
        publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        slug: 'senado-conmemora-dia-madre-tierra'
      },
      {
        id: 'rel3',
        titulo: '*Nuevas* disposiciones para el sector *salud*',
        descripcion: 'El pleno del Senado aprobó nuevas disposiciones para mejorar el sistema de salud pública, incluyendo la construcción de nuevos centros médicos y la contratación de personal especializado.',
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        slug: 'nuevas-disposiciones-salud'
      },
      {
        id: 'rel4',
        titulo: '*Presupuesto* general de la *nación* 2026',
        descripcion: 'La Cámara de Senadores comenzó el debate del proyecto de Presupuesto General de la Nación para la gestión 2026, priorizando la inversión en infraestructura y desarrollo social.',
        publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        slug: 'presupuesto-general-nacion-2026'
      },
      {
        id: 'rel5',
        titulo: '*Senado* aprueba *ley* de educación superior',
        descripcion: 'El pleno del Senado aprobó la nueva Ley de Educación Superior que establece mejoras en la calidad educativa y mayor financiamiento para las universidades públicas.',
        publishedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        slug: 'senado-aprueba-ley-educacion-superior'
      },
      {
        id: 'rel6',
        titulo: '*Comisión* de Desarrollo *Económico* presenta informe',
        descripcion: 'La Comisión de Desarrollo Económico presentó su informe anual con propuestas para impulsar el crecimiento sostenible y la generación de empleo en el país.',
        publishedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        slug: 'comision-desarrollo-economico-informe'
      }
    ]
    
    noticiasRelacionadas.value = noticiasRelacionadasSimuladas
    relacionadaCurrentIndex.value = 0
    
  } catch (err) {
    console.error('Error cargando noticias relacionadas:', err)
    noticiasRelacionadas.value = []
  } finally {
    loadingRelacionadas.value = false
  }
}

// Función para formatear títulos con palabras en color rojo
const formatTitleWithColors = (title) => {
  if (!title) return ''
  return title.replace(/\*(.*?)\*/g, '<span class="text-[#E03636]">$1</span>')
}

// Función para generar títulos con palabras rojas aleatorias para simulación
const generarTituloConColor = (tituloOriginal) => {
  const palabras = tituloOriginal.split(' ')
  if (palabras.length < 3) return tituloOriginal
  
  const numColorear = Math.min(Math.floor(Math.random() * 2) + 1, palabras.length)
  const indicesColorear = new Set()
  while (indicesColorear.size < numColorear) {
    indicesColorear.add(Math.floor(Math.random() * palabras.length))
  }
  
  const nuevasPalabras = palabras.map((palabra, idx) => {
    if (indicesColorear.has(idx)) {
      return `*${palabra}*`
    }
    return palabra
  })
  
  return nuevasPalabras.join(' ')
}

// Navegación de noticias relacionadas
const anteriorRelacionada = () => {
  if (relacionadaCurrentIndex.value > 0) {
    relacionadaCurrentIndex.value--
  }
}

const siguienteRelacionada = () => {
  if (relacionadaCurrentIndex.value < maxRelacionadaIndex.value) {
    relacionadaCurrentIndex.value++
  }
}

const verNoticiaRelacionada = (noticia) => {
  if (noticia && noticia.slug) {
    router.push(`/noticias/${noticia.slug}`)
  }
}

const { data: noticiaData, pending, error, refresh } = await useAsyncData(
  `noticia-${route.params.slug}`,
  async () => {
    console.log(`🚀 [SSR] Cargando en: ${process.server ? 'SERVIDOR' : 'CLIENTE'}`)
    
    const generarBloques = () => {
      const textosParagraph = [
        'La Comisión de Constitución analizó el proyecto de ley en detalle, revisando cada uno de sus artículos y escuchando las observaciones de los diferentes sectores involucrados. Este proceso de análisis duró varias semanas y contó con la participación de expertos en la materia.',
        'Senadores de diferentes regiones del país expresaron su respaldo a la iniciativa, destacando la importancia de trabajar de manera coordinada por el desarrollo de Bolivia. Las diferentes bancadas políticas lograron acuerdos importantes que permitieron avanzar en la discusión.',
        'La norma fue trabajada en consenso con todos los sectores involucrados, demostrando el compromiso del Senado con la participación ciudadana y la transparencia. Se realizaron más de 15 reuniones de trabajo con organizaciones sociales y gremiales.',
        'El presidente del Senado destacó la importancia del diálogo político y la necesidad de construir acuerdos que beneficien a toda la población boliviana. En sus declaraciones, enfatizó que este es un ejemplo de cómo la política puede resolver problemas concretos.',
        'Organizaciones sociales manifestaron su satisfacción con el resultado, señalando que esta ley responde a las necesidades reales de la ciudadanía. Representantes de diferentes sectores aplaudieron la iniciativa y se comprometieron a coadyuvar en su implementación.',
        'La votación final está programada para la próxima sesión ordinaria, donde se espera contar con el respaldo necesario para su aprobación definitiva. Los líderes de bancada se mostraron optimistas respecto al resultado de la votación.',
        'El proyecto ahora pasa a la Cámara de Diputados para su revisión y posterior sanción, completando así el proceso legislativo. Se espera que en las próximas semanas se inicie el tratamiento en la cámara baja.',
        'Esta iniciativa legislativa forma parte de un paquete de reformas que el Senado viene impulsando para modernizar el marco normativo del país. Se prevé que en los próximos meses se presenten proyectos complementarios.'
      ]
      
      const citas = [
        { content: 'La transparencia y el diálogo son fundamentales para el fortalecimiento de nuestra democracia. Este proyecto es una prueba de que cuando trabajamos juntos, podemos lograr grandes cosas para el país.', author: 'Diego Esteban Mateo Ávila Navajas', role: 'Presidente del Senado' },
        { content: 'Este es un paso histórico para el desarrollo legislativo de nuestro país. Nunca antes se había logrado un consenso tan amplio en una iniciativa de esta naturaleza.', author: 'Carmen Soledad Chapetón Tancara', role: 'Primera Vicepresidenta del Senado' },
        { content: 'El consenso alcanzado demuestra la madurez política de nuestra democracia. Las diferentes fuerzas políticas han antepuesto el interés nacional por encima de cualquier consideración partidaria.', author: 'Khatia Lisbeth Quiroga Fernández', role: 'Segunda Vicepresidenta del Senado' },
        { content: 'Trabajamos incansablemente para garantizar el bienestar de todos los bolivianos. Esta ley es una muestra de nuestro compromiso con la gente.', author: 'Yasmin Estívariz Villarroel', role: 'Primera Secretaria del Senado' },
        { content: 'La participación ciudadana es el pilar fundamental de nuestra labor legislativa. Hemos recorrido el país escuchando a la gente y este proyecto refleja sus necesidades.', author: 'Julio Diego Romaña Galindo', role: 'Segundo Secretario del Senado' }
      ]
      
      const bloques = []
      const numParrafos = Math.floor(Math.random() * 3) + 5
      for (let i = 0; i < numParrafos; i++) {
        bloques.push({
          type: 'paragraph',
          content: textosParagraph[Math.floor(Math.random() * textosParagraph.length)]
        })
      }
      
      const cita = citas[Math.floor(Math.random() * citas.length)]
      const posicionCita = Math.min(Math.floor(Math.random() * 2) + 2, bloques.length - 1)
      bloques.splice(posicionCita, 0, {
        type: 'quote',
        content: cita.content,
        author: cita.author,
        role: cita.role
      })
      
      bloques.push({
        type: 'video',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        title: 'Sesión plenaria del Senado',
        caption: 'Registro audiovisual de la sesión donde se debatió esta importante iniciativa legislativa'
      })
      
      return bloques
    }
    
    const noticiasBase = {
      'senado-aprueba-ley-ambiental': {
        title: '*Senado* aprueba nueva ley de *protección ambiental*',
        categoria: 'Legislación',
        publishedAt: new Date().toISOString(),
        excerpt: 'El pleno del Senado aprobó por unanimidad la nueva Ley de Protección Ambiental, una normativa histórica que establece medidas para la preservación de los recursos naturales y la lucha contra el cambio climático.'
      },
      'senado-rechaza-proyecto-controversial': {
        title: '*Senado* rechaza *proyecto* de ley controversial',
        categoria: 'Política',
        publishedAt: new Date().toISOString(),
        excerpt: 'Por mayoría absoluta, la Cámara de Senadores decidió rechazar el proyecto de ley que generaba controversia en diversos sectores de la sociedad boliviana.'
      }
    }
    
    let noticiaBase = noticiasBase[route.params.slug]
    
    if (!noticiaBase) {
      const slugLimpio = route.params.slug.replace(/-/g, ' ')
      noticiaBase = {
        title: generarTituloConColor(slugLimpio.charAt(0).toUpperCase() + slugLimpio.slice(1)),
        categoria: 'Noticia',
        publishedAt: new Date().toISOString(),
        excerpt: `Información completa sobre ${slugLimpio}, una de las noticias más relevantes del acontecer legislativo en Bolivia.`
      }
    }
    
    const noticia = {
      ...noticiaBase,
      blocks: generarBloques()
    }
    
    const imagenes = [
      { url: 'https://picsum.photos/id/1015/1920/1080', alt: 'Montaña con lago - Hermoso paisaje natural', orientation: 'horizontal' },
      { url: 'https://picsum.photos/id/104/1080/1920', alt: 'Caminante en la naturaleza - Persona disfrutando del paisaje', orientation: 'vertical' },
      { url: 'https://picsum.photos/id/15/1920/1080', alt: 'Bosque con niebla - Ambiente místico y sereno', orientation: 'horizontal' },
      { url: 'https://picsum.photos/id/169/1080/1920', alt: 'Atardecer - Colores cálidos al final del día', orientation: 'vertical' },
      { url: 'https://picsum.photos/id/155/1920/1080', alt: 'Carretera en el bosque - Camino entre árboles', orientation: 'horizontal' },
      { url: 'https://picsum.photos/id/30/1080/1920', alt: 'Hojas de café - Detalle de cultivo', orientation: 'vertical' }
    ]
    
    return { noticia, imagenes }
  },
  {
    lazy: false,
    server: true,
    default: () => ({ noticia: null, imagenes: [] })
  }
)

// Cargar noticias relacionadas al montar el componente
onMounted(() => {
  windowLocation.value = window.location.href
  window.addEventListener('keydown', handleKeydown)
  cargarNoticiasRelacionadas()
  console.log('✅ [onMounted] Cliente hidratado')
})

// También recargar relacionadas cuando cambia el slug
watch(() => route.params.slug, () => {
  cargarNoticiasRelacionadas()
})

if (noticiaData.value?.imagenes) {
  imagenesCarrusel.value = noticiaData.value.imagenes
}

watch(noticiaData, (newData) => {
  if (newData?.imagenes) {
    imagenesCarrusel.value = newData.imagenes
  }
  if (newData?.noticia) {
    useHead({
      title: `${newData.noticia.title.replace(/\*/g, '')} | Senado Bolivia`,
      meta: [
        { name: 'description', content: newData.noticia.excerpt },
        { property: 'og:title', content: newData.noticia.title.replace(/\*/g, '') },
        { property: 'og:image', content: newData.imagenes?.[0]?.url }
      ]
    })
  }
}, { immediate: true })

if (error.value) {
  errorMsg.value = error.value.message
}

const imagenActual = computed(() => {
  if (imagenesCarrusel.value.length === 0) return null
  return imagenesCarrusel.value[currentIndex.value]
})

const imagenAnterior = computed(() => {
  if (imagenesCarrusel.value.length === 0) return null
  if (imagenesCarrusel.value.length === 1) return imagenActual.value
  const prevIndex = currentIndex.value === 0 
    ? imagenesCarrusel.value.length - 1 
    : currentIndex.value - 1
  return imagenesCarrusel.value[prevIndex]
})

const imagenSiguiente = computed(() => {
  if (imagenesCarrusel.value.length === 0) return null
  if (imagenesCarrusel.value.length === 1) return imagenActual.value
  const nextIndex = currentIndex.value === imagenesCarrusel.value.length - 1 
    ? 0 
    : currentIndex.value + 1
  return imagenesCarrusel.value[nextIndex]
})

const peekWidth = computed(() => {
  if (imagenActual.value?.orientation === 'vertical') return 22
  return 12
})

const imagenActualWidth = computed(() => {
  return 100 - (peekWidth.value * 2)
})

const peekLeftWidth = computed(() => peekWidth.value)
const peekRightWidth = computed(() => peekWidth.value)

const siguienteImagen = () => {
  if (imagenesCarrusel.value.length <= 1) return
  currentIndex.value = (currentIndex.value + 1) % imagenesCarrusel.value.length
}

const anteriorImagen = () => {
  if (imagenesCarrusel.value.length <= 1) return
  currentIndex.value = currentIndex.value === 0 
    ? imagenesCarrusel.value.length - 1 
    : currentIndex.value - 1
}

const formatearFecha = (fecha) => {
  if (!fecha) return ''
  return new Date(fecha).toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })
}

const volverAtras = () => {
  router.back()
}

const recargar = () => {
  refresh()
  cargarNoticiasRelacionadas()
}

const handleKeydown = (e) => {
  if (e.key === 'ArrowLeft') {
    anteriorImagen()
  } else if (e.key === 'ArrowRight') {
    siguienteImagen()
  }
}

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

definePageMeta({ layout: 'alter8' })
</script>

<style scoped>
/* ========== CAPITOLIUM NEWS - SOLO PARA ESTA PÁGINA ========== */
@font-face {
  font-family: 'Capitolium News';
  src: url('/fonts/Capitolium News W01 2 Regular/Capitolium News W01 2 Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Capitolium News';
  src: url('/fonts/Capitolium News W01 2 Bold/Capitolium News W01 2 Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Capitolium News';
  src: url('/fonts/Capitolium News W01 2 Italic/Capitolium News W01 2 Italic.woff2') format('woff2');
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: 'Capitolium News';
  src: url('/fonts/Capitolium News W01 2 SemiBold/Capitolium News W01 2 SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

/* Aplicar Capitolium News a TODO el contenido de esta página */
.text-style,
.prose,
.prose p,
.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6,
.prose li,
.prose ul,
.prose ol,
article,
p,
h1,
h2,
h3,
h4,
h5,
h6,
span,
div,
section,
.quote-badge .badge-name,
.quote-badge .badge-role,
.quote-text,
button,
a,
.quote-container,
.quote-block,
.quote-content-wrapper,
.social-icon,
.social-icon svg {
  font-family: 'Capitolium News', 'Montserrat', Tahoma, Geneva, Verdana, sans-serif !important;
}

/* Títulos con negrita */
h1, h2, h3, .titulo-principal, .title {
  font-weight: 700 !important;
}

/* ========== CITAS: SOLO el texto de la cita va en Montserrat itálica ========== */
.quote-text {
  font-family: 'Montserrat', sans-serif !important;
  font-style: italic !important;
  font-weight: 400 !important;
}

/* ========== ESTILOS DE CITA CON COMILLAS ABSOLUTAS ========== */
.quote-block {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.quote-badge {
  background-color: #1a1a1a;
  color: white;
  padding: 0.5rem 1.2rem;
  display: inline-block;
  text-align: right;
  margin-bottom: 0;
  width: auto;
}

.badge-name {
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

.badge-role {
  font-size: 0.65rem;
  opacity: 0.8;
  margin-top: 0.15rem;
}

.quote-container {
  background-color: #f5f5f5;
  width: 100%;
  margin-top: 0;
  padding: 2rem 2.5rem;
  position: relative;
}

.quote-content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* COMILLAS EN POSICIÓN ABSOLUTA - NO AFECTAN EL FLUJO DEL TEXTO */
.quote-mark {
  position: absolute;
  font-family: 'Times New Roman', Georgia, serif;
  font-size: 15vw;
  font-weight: 900;
  color: #1a1a1a;
  opacity: 0.12;
  line-height: 1;
  z-index: 0;
}

.quote-open {
  top: -6vw;
  left: -2vw;
}

.quote-close {
  bottom: -13vw;
  right: -2vw;
}

.quote-text {
  font-size: 1.15rem;
  line-height: 1.7;
  color: #333;
  margin: 0;
  flex: 1;
  text-align: center;
  position: relative;
  z-index: 1;
  max-width: 85%;
}

/* Video block */
.video-block iframe {
  transition: transform 0.3s ease;
}

.video-block:hover iframe {
  transform: scale(1.01);
}

/* Animación de entrada */
.block-item {
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
}

.block-item:nth-child(1) { animation-delay: 0.05s; }
.block-item:nth-child(2) { animation-delay: 0.1s; }
.block-item:nth-child(3) { animation-delay: 0.15s; }
.block-item:nth-child(4) { animation-delay: 0.2s; }
.block-item:nth-child(5) { animation-delay: 0.25s; }
.block-item:nth-child(6) { animation-delay: 0.3s; }
.block-item:nth-child(7) { animation-delay: 0.35s; }
.block-item:nth-child(8) { animation-delay: 0.4s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Noticias relacionadas */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: #1f2937;
  background-color: transparent;
  transition: all 0.3s ease;
}

.social-icon:hover {
  color: #E03636;
  border-color: #E03636;
  transform: translateY(-2px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

article {
  animation: fadeIn 0.6s ease-out;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #E03636;
  border-radius: 10px;
}
</style>