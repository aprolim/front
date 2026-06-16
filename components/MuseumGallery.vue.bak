<template>
  <div class="museum-gallery">
    <!-- Botón Ver Más -->
    <div class="text-center mb-8">
      <button 
        @click="openGallery"
        class="px-8 py-3 bg-[#E03636] text-white font-semibold rounded-lg hover:bg-[#C12F2F] transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
      >
        Ver Galería Completa ({{ totalImages }} imágenes)
      </button>
    </div>

    <!-- Miniaturas visibles siempre (primeras 4 imágenes destacadas) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div 
        v-for="(img, idx) in featuredImages" 
        :key="idx"
        class="gallery-thumb cursor-pointer group"
        @click="openImageModal(img, idx)"
      >
        <div class="relative overflow-hidden rounded-xl aspect-[4/3] bg-gray-100">
          <img 
            :src="img.url" 
            :alt="img.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            @error="e => e.target.src = '/images/placeholder.jpg'"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="absolute bottom-0 left-0 right-0 p-4">
              <p class="text-white text-sm font-medium line-clamp-2">{{ img.description }}</p>
            </div>
          </div>
        </div>
        <p class="text-center text-gray-700 mt-2 text-sm line-clamp-2">{{ img.description }}</p>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- MODAL DE GALERÍA COMPLETA (con paginación) -->
    <!-- ============================================ -->
    <Teleport to="body">
      <div v-if="showFullGallery" class="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm overflow-y-auto" @click.self="closeFullGallery">
        <div class="container mx-auto px-4 py-6 md:py-8">
          <!-- Header del modal -->
          <div class="flex justify-between items-center mb-6 md:mb-8">
            <div>
              <h2 class="text-2xl md:text-3xl font-bold text-white">Galería Institucional</h2>
              <p class="text-white/60 text-sm mt-1">{{ totalImages }} imágenes en la colección</p>
            </div>
            <button 
              @click="closeFullGallery"
              class="text-white hover:text-[#E03636] transition-colors text-3xl md:text-4xl"
            >
              ✕
            </button>
          </div>

          <!-- Grid de imágenes con paginación -->
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            <div 
              v-for="(img, idx) in paginatedImages" 
              :key="img.id"
              class="gallery-item cursor-pointer group"
              @click="openImageModal(img, (currentPage - 1) * itemsPerPage + idx)"
            >
              <div class="relative overflow-hidden rounded-lg aspect-[4/3] bg-gray-800">
                <img 
                  :src="img.url" 
                  :alt="img.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  @error="e => e.target.src = '/images/placeholder.jpg'"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div class="absolute bottom-0 left-0 right-0 p-2 md:p-3">
                    <p class="text-white text-xs md:text-sm line-clamp-2">{{ img.description }}</p>
                  </div>
                </div>
              </div>
              <p class="text-white/80 text-xs text-center mt-1 line-clamp-2 hidden md:block">{{ img.description }}</p>
            </div>
          </div>

          <!-- Paginación - Bolitas -->
          <div class="flex justify-center items-center gap-2 mt-8 flex-wrap">
            <button 
              @click="prevPage"
              :disabled="currentPage === 1"
              class="text-white/60 hover:text-white transition-colors px-3 py-1 disabled:opacity-30 disabled:cursor-not-allowed text-xl"
            >
              ‹
            </button>
            
            <!-- Bolitas de página -->
            <div class="flex gap-2 flex-wrap justify-center">
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="goToPage(page)"
                class="w-3 h-3 rounded-full transition-all duration-300"
                :class="currentPage === page 
                  ? 'bg-[#E03636] scale-125' 
                  : 'bg-white/40 hover:bg-white/70'"
              ></button>
            </div>
            
            <button 
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="text-white/60 hover:text-white transition-colors px-3 py-1 disabled:opacity-30 disabled:cursor-not-allowed text-xl"
            >
              ›
            </button>
          </div>

          <!-- Información de página -->
          <p class="text-center text-white/40 text-sm mt-4">
            Página {{ currentPage }} de {{ totalPages }} ({{ itemsPerPage }} imágenes por página)
          </p>

          <!-- Mensaje si no hay imágenes -->
          <div v-if="allImages.length === 0" class="text-center py-20">
            <div class="inline-block w-12 h-12 border-4 border-[#E03636] border-t-transparent rounded-full animate-spin"></div>
            <p class="text-white/60 mt-4">Cargando imágenes...</p>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ============================================ -->
    <!-- MODAL DE IMAGEN AMPLIADA (Lightbox) -->
    <!-- ============================================ -->
    <Teleport to="body">
      <div v-if="showImageModal" class="fixed inset-0 z-[60] bg-black/98 flex items-center justify-center" @click.self="closeImageViewer">
        <div class="relative w-full h-full flex flex-col items-center justify-center p-4">
          <!-- Botón cerrar -->
          <button 
            @click="closeImageViewer"
            class="absolute top-4 right-4 text-white hover:text-[#E03636] transition-colors text-3xl z-10"
          >
            ✕
          </button>

          <!-- Botón anterior -->
          <button 
            @click="prevImage"
            class="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors text-4xl z-10"
          >
            ‹
          </button>

          <!-- Imagen ampliada -->
          <div class="relative max-w-[90vw] max-h-[70vh] flex items-center justify-center">
            <img 
              :src="currentImage?.url" 
              :alt="currentImage?.title"
              class="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
              @error="e => e.target.src = '/images/placeholder.jpg'"
            />
          </div>

          <!-- Descripción debajo de la imagen -->
          <div class="mt-6 text-center max-w-2xl px-4">
            <p class="text-white text-base md:text-xl font-medium">{{ currentImage?.description }}</p>
          </div>

          <!-- Botón siguiente -->
          <button 
            @click="nextImage"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors text-4xl z-10"
          >
            ›
          </button>

          <!-- Navegación por bolitas (miniaturas de navegación) -->
          <div class="flex justify-center items-center gap-2 mt-8 overflow-x-auto max-w-[90vw] pb-2">
            <button
              v-for="(img, idx) in allImages"
              :key="idx"
              @click="goToImage(idx)"
              class="transition-all duration-300 flex-shrink-0"
            >
              <div 
                class="w-1 h-1 rounded-full transition-all"
                :class="currentIndex === idx 
                  ? 'bg-[#E03636] w-3 h-3 scale-100' 
                  : 'bg-white/40 w-2 h-2 hover:bg-white/70'"
              ></div>
            </button>
          </div>

          <!-- Contador -->
          <p class="text-white/50 text-sm mt-4">
            {{ currentIndex + 1 }} / {{ allImages.length }}
          </p>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// ============================================
// GENERAR LAS 128 IMÁGENES CON SUS DESCRIPCIONES
// ============================================
const generateImages = () => {
  const images = []
  
  // Descripciones variadas para las imágenes
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
    "Firma de convenios interinstitucionales",
    "Presentación de informe de gestión",
    "Comisión de Planificación",
    "Senadores jóvenes",
    "Reunión de presidentes de comisiones",
    "Comisión de Recursos Hídricos",
    "Senadores por Cochabamba",
    "Comisión de Desarrollo Rural",
    "Senadores por La Paz",
    "Comisión de Culturas",
    "Senadores por Santa Cruz",
    "Comisión de Deportes",
    "Senadores por Potosí",
    "Comisión de Comunicación",
    "Senadores por Tarija",
    "Comisión de Transparencia",
    "Senadores por Chuquisaca",
    "Comisión de Género",
    "Senadores por Beni",
    "Comisión de Pueblos Indígenas",
    "Senadores por Pando",
    "Comisión de Fronteras",
    "Senadores por Oruro",
    "Comisión de Integración",
    "Reunión de la Directiva ampliada",
    "Comisión de Asuntos Constitucionales",
    "Senadores en pleno",
    "Comisión de Ética",
    "Votación en el hemiciclo",
    "Comisión de Régimen Interior",
    "Senadores escuchan informe",
    "Comisión de Política Internacional",
    "Sesión de la Asamblea",
    "Comisión de Desarrollo Productivo",
    "Senadores en receso",
    "Comisión de Medio Ambiente",
    "Palacio Legislativo - Día",
    "Comisión de Infraestructura",
    "Senadores en conferencia",
    "Comisión de Derechos Humanos",
    "Hemiciclo del Senado",
    "Comisión de Minería",
    "Senadores en comisión",
    "Comisión de Energía",
    "Sala de comisiones",
    "Comisión de Turismo",
    "Senadores en plenario",
    "Comisión de Trabajo",
    "Oficina de la Presidencia",
    "Comisión de Salud",
    "Senadores en receso",
    "Comisión de Educación",
    "Biblioteca del Senado",
    "Comisión de Cultura",
    "Salón de los Espejos",
    "Comisión de Deportes",
    "Galería de expresidentes",
    "Comisión de Juventud",
    "Museo del Senado",
    "Comisión de Mujer",
    "Archivo histórico",
    "Comisión de Familia",
    "Sala de prensa",
    "Comisión de Niñez",
    "Auditorio del Senado",
    "Comisión de Adulto Mayor",
    "Hall principal",
    "Comisión de Discapacidad",
    "Patio de honor",
    "Comisión de Migración",
    "Escalinata principal",
    "Comisión de Refugiados",
    "Jardines del Senado",
    "Comisión de Desarrollo Sostenible",
    "Salón de protocolo",
    "Comisión de Ciencia y Tecnología",
    "Gabinete de la Presidencia"
  ]
  
  for (let i = 1; i <= 128; i++) {
    // Usar descripción cíclica
    const descIndex = (i - 1) % descriptions.length
    images.push({
      id: i,
      url: `/Galeria Institucional/${i}.PNG`,
      title: `Imagen ${i}`,
      description: descriptions[descIndex]
    })
  }
  
  return images
}

const allImages = ref(generateImages())
const totalImages = computed(() => allImages.value.length)

// ============================================
// PAGINACIÓN
// ============================================
const itemsPerPage = 20 // 5 filas × 4 columnas = 20 imágenes por página
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(totalImages.value / itemsPerPage))

// Imágenes visibles en la página actual
const paginatedImages = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return allImages.value.slice(start, end)
})

// Imágenes destacadas (primeras 4)
const featuredImages = computed(() => allImages.value.slice(0, 4))

// Páginas visibles para las bolitas (máximo 10 bolitas a la vez)
const visiblePages = computed(() => {
  const maxVisible = 10
  const half = Math.floor(maxVisible / 2)
  let start = Math.max(1, currentPage.value - half)
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

// Funciones de paginación
const goToPage = (page) => {
  currentPage.value = page
  // Scroll al top del modal
  const modalContainer = document.querySelector('.fixed.inset-0.z-50 > .container')
  if (modalContainer) {
    modalContainer.scrollTop = 0
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// ============================================
// ESTADOS DE MODALES
// ============================================
const showFullGallery = ref(false)
const showImageModal = ref(false)
const currentIndex = ref(0)
const currentImage = ref(null)

// ============================================
// FUNCIONES DE MODALES
// ============================================

// Abrir galería completa
const openGallery = () => {
  currentPage.value = 1 // Resetear a primera página
  showFullGallery.value = true
  document.body.style.overflow = 'hidden'
}

// Cerrar galería completa
const closeFullGallery = () => {
  showFullGallery.value = false
  document.body.style.overflow = ''
}

// Abrir modal de imagen ampliada
const openImageModal = (image, index) => {
  currentImage.value = image
  currentIndex.value = index
  showImageModal.value = true
  document.body.style.overflow = 'hidden'
}

// Cerrar visor de imagen
const closeImageViewer = () => {
  showImageModal.value = false
  currentImage.value = null
  document.body.style.overflow = ''
}

// Siguiente imagen
const nextImage = () => {
  if (currentIndex.value < totalImages.value - 1) {
    currentIndex.value++
    currentImage.value = allImages.value[currentIndex.value]
  }
}

// Imagen anterior
const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
    currentImage.value = allImages.value[currentIndex.value]
  }
}

// Ir a imagen específica
const goToImage = (index) => {
  currentIndex.value = index
  currentImage.value = allImages.value[index]
}

// ============================================
// TECLADO
// ============================================
const handleKeydown = (e) => {
  if (!showImageModal.value && !showFullGallery.value) return
  
  if (showImageModal.value) {
    if (e.key === 'ArrowLeft') {
      prevImage()
    } else if (e.key === 'ArrowRight') {
      nextImage()
    } else if (e.key === 'Escape') {
      closeImageViewer()
    }
  } else if (showFullGallery.value && e.key === 'Escape') {
    closeFullGallery()
  }
}

// ============================================
// CICLO DE VIDA
// ============================================
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  console.log(`📸 Galería cargada: ${totalImages.value} imágenes disponibles`)
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

/* Animaciones */
.fixed {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Efecto hover en miniaturas */
.gallery-thumb {
  transition: transform 0.3s ease;
}

.gallery-thumb:hover {
  transform: translateY(-4px);
}

/* Scrollbar personalizado para el modal */
.fixed.inset-0.z-50 .container {
  scrollbar-width: thin;
  scrollbar-color: #E03636 #333;
}

.fixed.inset-0.z-50 .container::-webkit-scrollbar {
  width: 6px;
}

.fixed.inset-0.z-50 .container::-webkit-scrollbar-track {
  background: #333;
  border-radius: 3px;
}

.fixed.inset-0.z-50 .container::-webkit-scrollbar-thumb {
  background: #E03636;
  border-radius: 3px;
}

/* Bolitas activas */
.bg-\[\#E03636\] {
  background-color: #E03636;
}

/* Grid responsivo */
@media (max-width: 640px) {
  .grid {
    gap: 0.75rem;
  }
}
</style>