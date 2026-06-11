<template>
  <div class="min-h-screen bg-gray-100 pt-[4.8vw] pb-[1.8vw]">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-[#E03636] mb-4">Galería Institucional</h1>
        <p class="text-gray-600 text-lg max-w-2xl mx-auto">
          Conoce la historia y el patrimonio del Senado de Bolivia
        </p>
        <p class="text-gray-500 text-sm mt-2">{{ totalImages }} imágenes | Página {{ currentPage }} de {{ totalPages }}</p>
      </div>

      <!-- Grid de imágenes -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        <div 
          v-for="img in paginatedImages" 
          :key="img.id"
          class="gallery-item cursor-pointer group"
          @click="openImageModal(img)"
        >
          <div class="relative overflow-hidden rounded-xl shadow-lg bg-gray-200" style="aspect-ratio: 4/3">
            <!-- 🔥 TODAS LAS IMÁGENES AHORA USAN .webp -->
            <img 
              :src="`/G-Institucional/${img.id}.webp`"
              :alt="img.description"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              @error="handleImageError"
            />
            
            <div class="absolute bottom-0 left-0 right-0 bg-[#E03636]/80 backdrop-blur-sm py-2 px-2">
              <p class="text-white text-xs md:text-sm font-medium line-clamp-2 text-center">
                {{ img.description }}
              </p>
            </div>

            <div class="absolute inset-0 border-2 border-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <div class="absolute inset-[3px] border border-black/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>
      </div>

      <!-- Paginación -->
      <div class="flex justify-center items-center gap-2 mt-10 flex-wrap">
        <button 
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-[#E03636] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#C12F2F] transition-colors text-sm"
        >
          ← Anterior
        </button>
        
        <div class="flex gap-1 mx-2">
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            class="w-8 h-8 md:w-10 md:h-10 rounded-full transition-all duration-300 text-sm font-medium"
            :class="currentPage === page 
              ? 'bg-[#E03636] text-white scale-105 shadow-md' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
          >
            {{ page }}
          </button>
        </div>
        
        <button 
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-[#E03636] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#C12F2F] transition-colors text-sm"
        >
          Siguiente →
        </button>
      </div>

      <p class="text-center text-gray-500 text-sm mt-4">
        Página {{ currentPage }} de {{ totalPages }}
      </p>

      <!-- Modal de imagen ampliada -->
      <Teleport to="body">
        <div v-if="showImageModal" class="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" @click.self="closeImageViewer">
          <div class="relative w-full h-full flex flex-col items-center justify-center p-4">
            <button 
              @click="closeImageViewer"
              class="absolute top-4 right-4 text-white hover:text-[#E03636] transition-colors text-3xl z-10"
            >
              ✕
            </button>

            <button 
              @click="prevImage"
              class="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors text-3xl md:text-5xl z-10"
            >
              ‹
            </button>

            <div class="relative max-w-[90vw] max-h-[70vh] flex items-center justify-center">
              <img 
                :src="`/G-Institucional/${currentImage?.id}.webp`"
                :alt="currentImage?.description"
                class="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
            </div>

            <div class="mt-6 text-center max-w-2xl px-4">
              <p class="text-white text-base md:text-xl font-medium">{{ currentImage?.description }}</p>
            </div>

            <button 
              @click="nextImage"
              class="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors text-3xl md:text-5xl z-10"
            >
              ›
            </button>

            <p class="text-white/50 text-sm mt-4">
              {{ currentImageIndex + 1 }} / {{ totalImages }}
            </p>
          </div>
        </div>
      </Teleport>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: 'alter8'
})

const router = useRouter()

// Forzar scroll al inicio
if (process.client) {
  window.scrollTo(0, 0)
  router.afterEach(() => {
    window.scrollTo(0, 0)
  })
}

// ============================================
// DESCRIPCIONES PARA LAS 128 IMÁGENES
// ============================================

const descriptions = [
  "Vista panorámica del Palacio del Senado",
  "Sesión Plenaria - Cámara de Senadores",
  "Reunión de la Directiva Camaral",
  "Comisión de Constitución trabajando",
  "Presidente del Senado en sesión",
  "Vicepresidenta del Senado",
  "Secretaría General del Senado",
  "Pleno de la Asamblea Legislativa",
  "Senadores durante el debate",
  "Firma de proyecto de ley",
  "Audiencia pública en el Senado",
  "Comisión de Desarrollo Económico",
  "Juramentación de nuevos senadores",
  "Reunión de bancadas",
  "Comisión de Educación y Salud",
  "Senadores por Bolivia",
  "Palacio Legislativo - Vista nocturna",
  "Sala de sesiones del Senado",
  "Comisión de Autonomías",
  "Conferencia de prensa del Presidente",
  "Visita de delegación internacional",
  "Ceremonia de investidura",
  "Comisión de Justicia Plural",
  "Senadores en comisión técnica",
  "Reunión con organizaciones sociales",
  "Instalación de nueva legislatura",
  "Homenaje a héroes de la patria",
  "Comisión de Seguridad del Estado",
  "Senadores por departamento",
  "Firma de convenios interinstitucionales"
]

// Generar las 128 imágenes
const generateImages = () => {
  const images = []
  for (let i = 1; i <= 128; i++) {
    const descIndex = (i - 1) % descriptions.length
    images.push({
      id: i,
      description: descriptions[descIndex]
    })
  }
  return images
}

// ============================================
// ESTADO
// ============================================
const allImages = ref(generateImages())
const totalImages = computed(() => allImages.value.length)

const itemsPerPage = 20
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(totalImages.value / itemsPerPage))

const paginatedImages = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return allImages.value.slice(start, end)
})

const visiblePages = computed(() => {
  const maxVisible = 7
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  const pages = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Manejo de error de carga
const handleImageError = (event) => {
  const img = event.target
  img.src = '/images/placeholder.jpg'
}

// ============================================
// MODAL
// ============================================
const showImageModal = ref(false)
const currentImage = ref(null)
const currentImageIndex = ref(0)

const openImageModal = (image) => {
  currentImage.value = image
  currentImageIndex.value = image.id - 1
  showImageModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeImageViewer = () => {
  showImageModal.value = false
  currentImage.value = null
  document.body.style.overflow = ''
}

const nextImage = () => {
  if (currentImageIndex.value < totalImages.value - 1) {
    currentImageIndex.value++
    currentImage.value = allImages.value[currentImageIndex.value]
  }
}

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
    currentImage.value = allImages.value[currentImageIndex.value]
  }
}

const handleKeydown = (e) => {
  if (!showImageModal.value) return
  switch(e.key) {
    case 'ArrowLeft': prevImage(); break
    case 'ArrowRight': nextImage(); break
    case 'Escape': closeImageViewer(); break
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  console.log(`📸 Galería cargada: ${totalImages.value} imágenes en .webp`)
  nextTick(() => {
    window.scrollTo(0, 0)
  })
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.fixed {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.gallery-item {
  transition: transform 0.2s ease;
}

.gallery-item:hover {
  transform: translateY(-3px);
}
</style>