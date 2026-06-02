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
              <span class="bg-[#E03636] text-white text-sm px-3 py-1 rounded-full">{{ noticiaData.noticia.category || noticiaData.noticia.categoria || 'Noticia' }}</span>
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
                <p v-html="block.content"></p>
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
                      <span v-html="formatTitleWithColors(relacionada.title)"></span>
                    </h3>
                    <!-- Resumen -->
                    <p class="text-gray-600 line-clamp-3">{{ relacionada.excerpt }}</p>
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

// ============================================
// CONFIGURACIÓN DE LA API REAL
// ============================================
const API_BASE_URL = 'http://demoback.senado.gob.bo/api'

const windowLocation = ref('')
const currentIndex = ref(0)
const imagenesCarrusel = ref([])
const errorMsg = ref(null)

// Noticias relacionadas
const noticiasRelacionadas = ref([])
const relacionadaCurrentIndex = ref(0)
const loadingRelacionadas = ref(true)

// Configuración de paginación para relacionadas
const noticiasPorPagina = 2
const maxRelacionadaIndex = computed(() => Math.max(0, Math.ceil(noticiasRelacionadas.value.length / noticiasPorPagina) - 1))

// ============================================
// FUNCIÓN PARA CARGAR NOTICIAS RELACIONADAS (API REAL)
// ============================================
const cargarNoticiasRelacionadas = async (noticiaId, categoria, tags) => {
  loadingRelacionadas.value = true
  try {
    // Usar el endpoint de contenido relacionado de la API real
    const response = await fetch(`${API_BASE_URL}/content/${noticiaId}/related?limit=6`)
    const result = await response.json()
    
    if (result.success && result.data && result.data.length > 0) {
      noticiasRelacionadas.value = result.data
    } else {
      // Fallback: buscar por categoría
      const fallbackResponse = await fetch(`${API_BASE_URL}/content?category=${categoria}&limit=6`)
      const fallbackResult = await fallbackResponse.json()
      if (fallbackResult.success && fallbackResult.data?.contents) {
        noticiasRelacionadas.value = fallbackResult.data.contents.filter(n => n._id !== noticiaId)
      } else {
        noticiasRelacionadas.value = []
      }
    }
    relacionadaCurrentIndex.value = 0
  } catch (err) {
    console.error('Error cargando noticias relacionadas:', err)
    noticiasRelacionadas.value = []
  } finally {
    loadingRelacionadas.value = false
  }
}

// ============================================
// FUNCIÓN PARA CONVERTIR HTML A BLOQUES
// ============================================
const convertirHTMLaBloques = (htmlContent) => {
  if (!htmlContent) return []
  
  const bloques = []
  
  // Crear un elemento div temporal para parsear el HTML
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = htmlContent
  
  // Procesar cada nodo hijo
  tempDiv.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      bloques.push({
        type: 'paragraph',
        content: node.textContent
      })
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node
      const tagName = element.tagName.toLowerCase()
      
      if (tagName === 'p') {
        bloques.push({
          type: 'paragraph',
          content: element.innerHTML
        })
      } else if (tagName === 'blockquote') {
        const text = element.textContent || ''
        bloques.push({
          type: 'quote',
          content: text,
          author: 'Senado de Bolivia',
          role: 'Cámara de Senadores'
        })
      } else if (tagName === 'iframe') {
        const src = element.src || ''
        const isYoutube = src.includes('youtube.com') || src.includes('youtu.be')
        const isVimeo = src.includes('vimeo.com')
        
        if (isYoutube || isVimeo) {
          bloques.push({
            type: 'video',
            url: src,
            title: element.title || 'Video institucional',
            caption: ''
          })
        } else {
          bloques.push({
            type: 'paragraph',
            content: element.outerHTML
          })
        }
      } else {
        bloques.push({
          type: 'paragraph',
          content: element.outerHTML
        })
      }
    }
  })
  
  return bloques
}

// ============================================
// FUNCIÓN PARA FORMATEAR TÍTULOS CON COLORES
// ============================================
const formatTitleWithColors = (title) => {
  if (!title) return ''
  return title.replace(/\*(.*?)\*/g, '<span class="text-[#E03636]">$1</span>')
}

// ============================================
// NAVEGACIÓN DE NOTICIAS RELACIONADAS
// ============================================
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

// ============================================
// OBTENER NOTICIA PRINCIPAL DESDE LA API REAL
// ============================================
const { data: noticiaData, pending, error, refresh } = await useAsyncData(
  `noticia-${route.params.slug}`,
  async () => {
    console.log(`🚀 Buscando noticia por slug: ${route.params.slug}`)
    
    try {
      // Llamar a la API real
      const response = await fetch(`${API_BASE_URL}/content/slug/${route.params.slug}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          return { noticia: null, imagenes: [] }
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
      
      const result = await response.json()
      const noticia = result.data
      
      console.log(`✅ Noticia encontrada: ${noticia.title}`)
      
      // Preparar imágenes para el carrusel
      const imagenes = []
      
      // Agregar imagen destacada si existe
      if (noticia.featuredImage?.url) {
        imagenes.push({
          url: noticia.featuredImage.url,
          alt: noticia.featuredImage.alt || noticia.title,
          orientation: 'horizontal'
        })
      }
      
      // Agregar galería si existe
      if (noticia.gallery && Array.isArray(noticia.gallery)) {
        noticia.gallery.forEach(img => {
          imagenes.push({
            url: img.url,
            alt: img.alt || noticia.title,
            orientation: 'horizontal'
          })
        })
      }
      
      // Si no hay imágenes, usar imágenes placeholder
      if (imagenes.length === 0) {
        imagenes.push(
          { url: 'https://picsum.photos/id/1015/1920/1080', alt: 'Imagen institucional', orientation: 'horizontal' },
          { url: 'https://picsum.photos/id/104/1080/1920', alt: 'Senado de Bolivia', orientation: 'vertical' },
          { url: 'https://picsum.photos/id/15/1920/1080', alt: 'Paisaje boliviano', orientation: 'horizontal' }
        )
      }
      
      // Si la noticia tiene bloques, usarlos; si no, crear bloques desde el contenido HTML
      let blocks = noticia.blocks || []
      if (blocks.length === 0 && noticia.content) {
        blocks = convertirHTMLaBloques(noticia.content)
      }
      
      // Enriquecer la noticia
      const noticiaEnriquecida = {
        ...noticia,
        blocks: blocks,
        categoria: noticia.category
      }
      
      return { noticia: noticiaEnriquecida, imagenes }
      
    } catch (err) {
      console.error(`❌ Error: ${err.message}`)
      return { noticia: null, imagenes: [], error: err.message }
    }
  },
  {
    lazy: false,
    server: true,
    default: () => ({ noticia: null, imagenes: [] })
  }
)

// ============================================
// WATCHERS PARA CARGAR RELACIONADAS Y SEO
// ============================================
watch(noticiaData, (newData) => {
  if (newData?.noticia) {
    cargarNoticiasRelacionadas(newData.noticia._id, newData.noticia.category, newData.noticia.tags)
    
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

if (noticiaData.value?.imagenes) {
  imagenesCarrusel.value = noticiaData.value.imagenes
}

watch(noticiaData, (newData) => {
  if (newData?.imagenes) {
    imagenesCarrusel.value = newData.imagenes
  }
}, { immediate: true })

if (error.value) {
  errorMsg.value = error.value.message
}

// ============================================
// CARRUSEL - COMPUTED
// ============================================
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

// ============================================
// MÉTODOS DEL CARRUSEL
// ============================================
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

// ============================================
// UTILIDADES
// ============================================
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
  if (noticiaData.value?.noticia) {
    cargarNoticiasRelacionadas(noticiaData.value.noticia._id, noticiaData.value.noticia.category, noticiaData.value.noticia.tags)
  }
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================
const handleKeydown = (e) => {
  if (e.key === 'ArrowLeft') {
    anteriorImagen()
  } else if (e.key === 'ArrowRight') {
    siguienteImagen()
  }
}

// ============================================
// CICLO DE VIDA
// ============================================
onMounted(() => {
  windowLocation.value = window.location.href
  window.addEventListener('keydown', handleKeydown)
  console.log('✅ Frontend conectado a la API real en:', API_BASE_URL)
})

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