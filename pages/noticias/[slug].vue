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
      <div v-if="cargando" class="flex justify-center items-center py-20">
        <div class="inline-block w-12 h-12 border-4 border-[#E03636] border-t-transparent rounded-full animate-spin"></div>
        <p class="ml-3 text-gray-500">Cargando noticia...</p>
      </div>

      <!-- Estado de error -->
      <div v-else-if="errorMsg" class="text-center py-12 bg-white rounded-xl">
        <p class="text-red-600 mb-4">{{ errorMsg }}</p>
        <button @click="recargar" class="bg-[#E03636] text-white px-4 py-2 rounded-lg hover:bg-[#C12F2F] transition">Reintentar</button>
      </div>

      <!-- Noticia encontrada -->
      <article v-else-if="noticiaData" class="bg-white rounded-xl shadow-lg overflow-hidden">
        <!-- TITULO -->
        <div class="p-6 md:p-8 pb-0">
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="bg-[#E03636] text-white text-sm px-3 py-1 rounded-full">{{ noticiaData.category || noticiaData.categoria || 'Noticia' }}</span>
            <span v-if="noticiaData.category === 'legislacion' || noticiaData.views > 50" class="bg-yellow-500 text-white text-sm px-3 py-1 rounded-full font-semibold">★ Importante</span>
          </div>
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            {{ noticiaData.title || noticiaData.titulo }}
          </h1>
          <div class="flex flex-wrap items-center justify-between gap-4 pt-4 pb-6">
            <p class="text-gray-500">{{ formatearFecha(noticiaData.publishedAt || noticiaData.fecha) }}</p>
            <button 
              @click="compartir"
              class="flex items-center gap-2 text-gray-500 hover:text-[#E03636] transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.05 4.11c-.05.23-.09.46-.09.7 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
              Compartir
            </button>
          </div>
        </div>

        <!-- CARRUSEL CON EFECTO DE TRES IMÁGENES VISIBLES -->
        <div class="px-6 md:px-8 mb-8">
          <div class="relative">
            <!-- Contenedor del carrusel estilo "peek" -->
            <div class="relative overflow-hidden rounded-2xl bg-gray-900 shadow-2xl">
              <!-- Contenedor de las 3 imágenes visibles -->
              <div class="flex">
                <!-- Imagen anterior (peek izquierdo) -->
                <div class="flex-shrink-0 transition-all duration-500 ease-out overflow-hidden"
                     :style="{ width: `${peekWidth}%` }">
                  <div class="relative h-full" :style="{ paddingBottom: '56.25%' }">
                    <img 
                      :src="imagenAnterior?.url || imagenActual?.url"
                      :alt="imagenAnterior?.alt || 'Imagen anterior'"
                      class="absolute inset-0 w-full h-full object-cover filter blur-[2px] brightness-75"
                    />
                    <div class="absolute inset-0 bg-black/40"></div>
                  </div>
                </div>

                <!-- Imagen actual (central) -->
                <div class="flex-shrink-0 transition-all duration-500"
                     :style="{ width: `${imagenActualWidth}%` }">
                  <div class="relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900"
                       :style="{ paddingBottom: imagenActual?.orientation === 'vertical' ? '120%' : '56.25%' }">
                    <img 
                      :src="imagenActual?.url"
                      :alt="imagenActual?.alt"
                      class="absolute inset-0 w-full h-full transition-transform duration-700 hover:scale-105"
                      :class="imagenActual?.orientation === 'vertical' ? 'object-contain' : 'object-cover'"
                    />
                    
                    <!-- Badge de orientación (solo demo) -->
                    <div class="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                      {{ imagenActual?.orientation === 'vertical' ? '📱 Vertical' : '🖥️ Horizontal' }}
                    </div>
                  </div>
                </div>

                <!-- Imagen siguiente (peek derecho) -->
                <div class="flex-shrink-0 transition-all duration-500 overflow-hidden"
                     :style="{ width: `${peekWidth}%` }">
                  <div class="relative h-full" :style="{ paddingBottom: '56.25%' }">
                    <img 
                      :src="imagenSiguiente?.url || imagenActual?.url"
                      :alt="imagenSiguiente?.alt || 'Imagen siguiente'"
                      class="absolute inset-0 w-full h-full object-cover filter blur-[2px] brightness-75"
                    />
                    <div class="absolute inset-0 bg-black/40"></div>
                  </div>
                </div>
              </div>

              <!-- Flecha izquierda -->
              <button 
                v-if="imagenesCarrusel.length > 1"
                @click="anteriorImagen"
                class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#E03636] text-white rounded-full p-3 transition-all duration-300 backdrop-blur-sm z-10 group"
              >
                <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>

              <!-- Flecha derecha -->
              <button 
                v-if="imagenesCarrusel.length > 1"
                @click="siguienteImagen"
                class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#E03636] text-white rounded-full p-3 transition-all duration-300 backdrop-blur-sm z-10 group"
              >
                <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>

              <!-- Indicadores -->
              <div v-if="imagenesCarrusel.length > 1" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                <button
                  v-for="(_, idx) in imagenesCarrusel"
                  :key="idx"
                  @click="currentIndex = idx"
                  class="transition-all duration-300 rounded-full"
                  :class="currentIndex === idx 
                    ? 'bg-[#E03636] w-8 h-2' 
                    : 'bg-white/50 hover:bg-white/80 w-2 h-2'"
                ></button>
              </div>

              <!-- Contador -->
              <div v-if="imagenesCarrusel.length > 1" class="absolute top-4 right-4 bg-black/70 text-white text-sm px-3 py-1.5 rounded-full backdrop-blur-sm font-medium z-10">
                {{ String(currentIndex + 1).padStart(2, '0') }} / {{ String(imagenesCarrusel.length).padStart(2, '0') }}
              </div>
            </div>

            <!-- Miniaturas de navegación -->
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

        <!-- CONTENIDO DE LA NOTICIA -->
        <div class="p-6 md:p-8 pt-0 border-t border-gray-100">
          <div class="prose prose-lg max-w-none text-gray-700" v-html="noticiaData.content || noticiaData.contenidoCompleto"></div>
        </div>
      </article>

      <!-- Noticia no encontrada -->
      <div v-else-if="!cargando && !errorMsg && noticiaData === null" class="text-center py-12 bg-white rounded-xl">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Noticia no encontrada</h1>
        <p class="text-gray-500 mb-6">Lo sentimos, la noticia que buscas no existe o ha sido removida.</p>
        <button @click="volverAtras" class="inline-block bg-[#E03636] text-white px-6 py-3 rounded-lg hover:bg-[#C12F2F] transition">Volver atrás</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const noticiaData = ref(null)
const cargando = ref(true)
const errorMsg = ref(null)
const currentIndex = ref(0)
const imagenesCarrusel = ref([])

// Configuración del peek: 15% para cada lateral, 70% para el centro
const peekWidth = computed(() => {
  // Si la imagen actual es vertical, reducimos el peek para dar más espacio
  if (imagenActual.value?.orientation === 'vertical') {
    return 10
  }
  return 15
})

const imagenActualWidth = computed(() => {
  return 100 - (peekWidth.value * 2)
})

// Imagen actual
const imagenActual = computed(() => {
  if (imagenesCarrusel.value.length === 0) return null
  return imagenesCarrusel.value[currentIndex.value]
})

// Imagen anterior (para peek izquierdo)
const imagenAnterior = computed(() => {
  if (imagenesCarrusel.value.length === 0) return null
  if (imagenesCarrusel.value.length === 1) return imagenActual.value
  const prevIndex = currentIndex.value === 0 
    ? imagenesCarrusel.value.length - 1 
    : currentIndex.value - 1
  return imagenesCarrusel.value[prevIndex]
})

// Imagen siguiente (para peek derecho)
const imagenSiguiente = computed(() => {
  if (imagenesCarrusel.value.length === 0) return null
  if (imagenesCarrusel.value.length === 1) return imagenActual.value
  const nextIndex = currentIndex.value === imagenesCarrusel.value.length - 1 
    ? 0 
    : currentIndex.value + 1
  return imagenesCarrusel.value[nextIndex]
})

// Detectar orientación de imagen
const detectarOrientacion = (url) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      resolve(img.width > img.height ? 'horizontal' : 'vertical')
    }
    img.onerror = () => {
      resolve('horizontal')
    }
    img.src = url
  })
}

// Imágenes simuladas para demo (3 horizontales + 3 verticales)
const cargarImagenesSimuladas = async () => {
  const imagenesSimuladas = [
    {
      url: 'https://picsum.photos/id/1015/1920/1080',
      alt: 'Montaña con lago - Horizontal',
      title: 'Vista panorámica'
    },
    {
      url: 'https://picsum.photos/id/104/1080/1920',
      alt: 'Caminante - Vertical',
      title: 'Momento único'
    },
    {
      url: 'https://picsum.photos/id/15/1920/1080',
      alt: 'Bosque con niebla - Horizontal',
      title: 'Naturaleza'
    },
    {
      url: 'https://picsum.photos/id/169/1080/1920',
      alt: 'Atardecer - Vertical',
      title: 'Atardecer mágico'
    },
    {
      url: 'https://picsum.photos/id/155/1920/1080',
      alt: 'Carretera - Horizontal',
      title: 'Viaje'
    },
    {
      url: 'https://picsum.photos/id/30/1080/1920',
      alt: 'Hojas de café - Vertical',
      title: 'Detalles naturales'
    }
  ]
  
  // Detectar orientación
  const conOrientacion = []
  for (const img of imagenesSimuladas) {
    const orientacion = await detectarOrientacion(img.url)
    conOrientacion.push({ ...img, orientation: orientacion })
  }
  return conOrientacion
}

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

const compartir = () => {
  if (noticiaData.value) {
    if (navigator.share) {
      navigator.share({
        title: noticiaData.value.title || noticiaData.value.titulo,
        text: noticiaData.value.excerpt,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('¡Enlace copiado al portapapeles!')
    }
  }
}

const recargar = async () => {
  await cargarNoticia()
}

const cargarNoticia = async () => {
  cargando.value = true
  errorMsg.value = null
  currentIndex.value = 0
  
  try {
    const slug = route.params.slug
    
    // SIMULACIÓN (reemplazar con API real)
    await new Promise(resolve => setTimeout(resolve, 1000))
    const demoData = {
      success: true,
      data: {
        title: 'Senado aprueba nueva ley de protección ambiental',
        categoria: 'Legislación',
        publishedAt: new Date().toISOString(),
        excerpt: 'Una nueva ley que protege nuestros recursos naturales...',
        content: `
          <p>En una histórica sesión, la Cámara de Senadores aprobó por unanimidad la nueva Ley de Protección Ambiental.</p>
          <h2>Medidas principales</h2>
          <p>La ley contempla sanciones más severas para actividades contaminantes.</p>
          <ul>
            <li>Reducción del 40% de emisiones para 2030</li>
            <li>Creación de 10,000 empleos verdes</li>
            <li>Protección de 5 millones de hectáreas</li>
          </ul>
        `
      }
    }
    noticiaData.value = demoData.data
    
    // Cargar imágenes del carrusel
    imagenesCarrusel.value = await cargarImagenesSimuladas()
    
  } catch (err) {
    errorMsg.value = err.message
    noticiaData.value = null
  } finally {
    cargando.value = false
  }
}

// Navegación por teclado
const handleKeydown = (e) => {
  if (e.key === 'ArrowLeft') {
    anteriorImagen()
  } else if (e.key === 'ArrowRight') {
    siguienteImagen()
  }
}

onMounted(() => {
  cargarNoticia()
  window.addEventListener('keydown', handleKeydown)
})

import { onUnmounted } from 'vue'
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

definePageMeta({ layout: 'alter8' })

watch(noticiaData, (nuevaNoticia) => {
  if (nuevaNoticia) {
    useHead({
      title: `${nuevaNoticia.title || nuevaNoticia.titulo} | Senado Bolivia`,
      meta: [
        { name: 'description', content: nuevaNoticia.excerpt },
        { property: 'og:title', content: nuevaNoticia.title || nuevaNoticia.titulo },
        { property: 'og:image', content: imagenesCarrusel.value[0]?.url }
      ]
    })
  }
}, { immediate: true })
</script>

<style scoped>
.prose {
  font-family: 'Montserrat', Tahoma, Geneva, Verdana, sans-serif;
}

.prose p {
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

.prose h2, .prose h3 {
  color: #E03636;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.prose ul, .prose ol {
  margin: 1rem 0;
  padding-left: 2rem;
}

.prose li {
  margin: 0.5rem 0;
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