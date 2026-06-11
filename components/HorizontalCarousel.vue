<template>
  <div class="relative w-full h-full flex flex-col items-center justify-center px-[4vw]">
    <div class="h-[4.4vw]"></div>
    
    <h2 v-if="title" class="text-[2.5vw] font-bold text-center mb-8 text-[#E03636] uppercase tracking-wide">
      {{ title }}
    </h2>

    <div class="relative w-full mx-auto px-12 pb-[1.3vw]">
      
      <button 
        @click="prevSlide"
        class="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-[#E03636] rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 border-2 border-[#E03636]/30"
        :disabled="!hasImages"
        :class="{ 'opacity-50 cursor-not-allowed': !hasImages }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div class="overflow-hidden">
        <div v-if="hasImages" class="flex transition-transform duration-500 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
          <div v-for="(group, groupIndex) in imageGroups" :key="groupIndex"
            class="flex-shrink-0 w-full grid grid-cols-4 gap-4">
            <div v-for="(image, imgIndex) in group" :key="image.id"
              class="relative group overflow-hidden rounded-xl shadow-2xl border-4 border-white aspect-square cursor-pointer"
              @click="openImageModal(image, groupIndex * 4 + imgIndex)">
              <img :src="`/G-Institucional/${image.id}.webp`" :alt="image.description"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy" @error="handleImageError" />
              <div class="absolute bottom-0 left-0 right-0 bg-[#E03636]/80 backdrop-blur-sm py-1.5 px-1">
                <p class="text-white text-[0.65rem] md:text-xs font-medium line-clamp-2 text-center">
                  {{ image.description }}
                </p>
              </div>
              <div class="absolute inset-0 border-2 border-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              <div class="absolute inset-[3px] border border-black/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>
        </div>
        <div v-else class="flex items-center justify-center h-64 bg-gray-100 rounded-xl border-4 border-white shadow-2xl">
          <p class="text-gray-500 text-lg">No hay imágenes disponibles</p>
        </div>
      </div>

      <button @click="nextSlide"
        class="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-[#E03636] rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 border-2 border-[#E03636]/30"
        :disabled="!hasImages" :class="{ 'opacity-50 cursor-not-allowed': !hasImages }">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <NuxtLink to="/museo/galeria">
      <button class="text-[1.2vw] bg-[#E03636] hover:bg-[#E03636]/80 text-white font-bold py-[.5em] px-8 rounded-[.5vw] transition-all duration-300 transform hover:scale-105 uppercase tracking-wider shadow-lg mt-6">
        Ver más
      </button>
    </NuxtLink>

    <!-- Modal de imagen ampliada -->
    <Teleport to="body">
      <div v-if="showImageModal" class="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" @click.self="closeImageViewer">
        <div class="relative w-full h-full flex flex-col items-center justify-center p-4">
          <button @click="closeImageViewer" class="absolute top-4 right-4 text-white hover:text-[#E03636] transition-colors text-3xl z-10">✕</button>
          <button @click="prevImageModal" class="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors text-5xl z-10">‹</button>
          <div class="relative max-w-[90vw] max-h-[70vh]">
            <img :src="`/G-Institucional/${currentImage?.id}.webp`" :alt="currentImage?.description" class="max-w-full max-h-[70vh] object-contain rounded-lg" />
          </div>
          <div class="mt-6 text-center max-w-2xl px-4">
            <p class="text-white text-base md:text-xl font-medium">{{ currentImage?.description }}</p>
          </div>
          <button @click="nextImageModal" class="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors text-5xl z-10">›</button>
          <p class="text-white/50 text-sm mt-6">{{ currentImageIndex + 1 }} / {{ allImagesFlat.length }}</p>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useGaleria } from '~/composables/useGaleria'

const props = defineProps({
  title: { type: String, default: 'Galería Institucional' }
})

const { images: allImages, fetchImages } = useGaleria()
const allImagesFlat = computed(() => allImages.value)

const imageGroups = computed(() => {
  const groups = []
  for (let i = 0; i < allImages.value.length; i += 4) {
    groups.push(allImages.value.slice(i, i + 4))
  }
  return groups
})

const hasImages = computed(() => allImages.value.length > 0)
const currentIndex = ref(0)

const nextSlide = () => {
  if (currentIndex.value < imageGroups.value.length - 1) currentIndex.value++
  else currentIndex.value = 0
}

const prevSlide = () => {
  if (currentIndex.value > 0) currentIndex.value--
  else currentIndex.value = imageGroups.value.length - 1
}

const handleImageError = (event) => {
  event.target.src = '/images/placeholder.jpg'
}

// Modal
const showImageModal = ref(false)
const currentImage = ref(null)
const currentImageIndex = ref(0)

const openImageModal = (image, index) => {
  currentImage.value = image
  currentImageIndex.value = index
  showImageModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeImageViewer = () => {
  showImageModal.value = false
  document.body.style.overflow = ''
}

const nextImageModal = () => {
  if (currentImageIndex.value < allImagesFlat.value.length - 1) {
    currentImageIndex.value++
    currentImage.value = allImagesFlat.value[currentImageIndex.value]
  }
}

const prevImageModal = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
    currentImage.value = allImagesFlat.value[currentImageIndex.value]
  }
}

const handleKeydown = (e) => {
  if (!showImageModal.value) return
  if (e.key === 'ArrowLeft') prevImageModal()
  else if (e.key === 'ArrowRight') nextImageModal()
  else if (e.key === 'Escape') closeImageViewer()
}

onMounted(async () => {
  window.addEventListener('keydown', handleKeydown)
  await fetchImages()
  console.log('📸 Carrusel cargado')
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.transition-transform { transition-property: transform; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
.shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
.border-white { border-color: #ffffff; }
.hover\:scale-110:hover { transform: scale(1.1); }
.aspect-square { aspect-ratio: 1 / 1; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.fixed { animation: fadeIn 0.3s ease-out; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
</style>