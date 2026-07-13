<template>
  <div class="relative z-10 mx-auto min-h-screen flex flex-col w-full text-[1.5vw]">
    <div class="h-[4.4vw]"></div>

    <div class="mx-auto px-[4.5vw] flex-1 flex items-center">
      <div class="flex gap-[2em] w-full items-center">
        
        <!-- COLUMNA IZQUIERDA (65%) -->
        <div class="w-[65%] bg-transparent rounded-[1.5vw] shadow-2xl border border-white/20 p-[1.8vw]">
          <div class="relative h-full flex flex-col">
            
            <div class="relative w-full h-[34vw]">
              
              <!-- ==================== IMÁGENES ESTÁTICAS (solo cuando NO hay animación) ==================== -->
              <template v-if="!isAnimating">
                <!-- IMAGEN IZQUIERDA -->
                <div 
                  @click="prevImage"
                  class="absolute left-0 top-0 w-[35%] h-[45%] rounded-[.8vw] overflow-hidden shadow-2xl border-3 border-[#fff]/50 z-10 cursor-pointer hover:scale-105 transition-all duration-500"
                >
                  <img 
                    :src="imageData[prevIndex].url" 
                    :alt="imageData[prevIndex].titulo"
                    class="w-full h-full object-cover"
                  />
                  <div class="absolute inset-0 bg-gray-500/60"></div>
                  <div class="absolute bottom-0 left-0 right-0 h-1/4 bg-[#8A1B19]/80 text-white p-2 flex items-center justify-center">
                    <p class="text-[0.8vw] text-center line-clamp-2">{{ truncateText(imageData[prevIndex].descripcion, 60) }}</p>
                  </div>
                </div>
                
                <!-- IMAGEN CENTRAL -->
                <div 
                  class="absolute left-[20%] top-[15%] w-[60%] h-[80%] rounded-[.8vw] overflow-hidden shadow-2xl border-4 border-[#fff]/70 z-30 cursor-pointer"
                >
                  <!-- 🔥 USAMOS v-show para mantener la imagen en DOM -->
                  <img 
                    v-show="currentIndex === 0"
                    :src="imageData[0].url" 
                    :alt="imageData[0].titulo"
                    class="w-full h-full object-cover"
                  />
                  <img 
                    v-show="currentIndex === 1"
                    :src="imageData[1].url" 
                    :alt="imageData[1].titulo"
                    class="w-full h-full object-cover"
                  />
                  <img 
                    v-show="currentIndex === 2"
                    :src="imageData[2].url" 
                    :alt="imageData[2].titulo"
                    class="w-full h-full object-cover"
                  />
                  
                  <div 
                    class="absolute bottom-0 left-0 right-0 bg-[#8A1B19]/80 text-white transition-all duration-500 overflow-hidden"
                    :class="showFullText ? 'h-full' : 'h-1/4'"
                    @click="toggleFullText"
                  >
                    <div class="p-[1vw] h-full flex flex-col overflow-y-auto">
                      <div v-if="!showFullText" class="h-full flex flex-col justify-center">
                        <p class="text-[1.1vw]">
                          {{ truncateText(imageData[currentIndex].descripcion, 100) }}
                          <span class="font-bold inline-flex items-center gap-1 hover:underline">
                            Leer más
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                            </svg>
                          </span>
                        </p>
                      </div>
                      <div v-if="showFullText" class="mt-2">
                        <h4 class="font-bold text-[1.3vw] mb-[.2vw] text-center">{{ imageData[currentIndex].titulo }}</h4>
                        <p class="text-[1.2vw] whitespace-pre-line text-justify">{{ imageData[currentIndex].descripcion }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- IMAGEN DERECHA -->
                <div 
                  @click="nextImage"
                  class="absolute right-0 top-0 w-[35%] h-[45%] rounded-[.8vw] overflow-hidden shadow-2xl border-3 border-[#fff]/50 z-10 cursor-pointer hover:scale-105 transition-all duration-500"
                >
                  <img 
                    :src="imageData[nextIndex].url" 
                    :alt="imageData[nextIndex].titulo"
                    class="w-full h-full object-cover"
                  />
                  <div class="absolute inset-0 bg-gray-500/60"></div>
                  <div class="absolute bottom-0 left-0 right-0 h-1/4 bg-[#8A1B19]/80 text-white p-2 flex items-center justify-center">
                    <p class="text-[0.8vw] text-center line-clamp-2">{{ truncateText(imageData[nextIndex].descripcion, 60) }}</p>
                  </div>
                </div>
              </template>

              <!-- ==================== ELEMENTOS DE ANIMACIÓN (solo durante animación) ==================== -->
              <template v-else>
                <!-- IMAGEN QUE SALE (el antiguo centro) - VIAJA A SU POSICIÓN FINAL LATERAL -->
                <div 
                  class="absolute rounded-[.8vw] overflow-hidden shadow-2xl border-4 border-[#fff]/70 z-40"
                  :class="animationOutClass"
                >
                  <img :src="imageData[oldIndexValue].url" class="w-full h-full object-cover" />
                  <!-- Capa gris que aparece al final -->
                  <div class="absolute inset-0 bg-gray-500/0" :class="grayOverlayClass"></div>
                  <div class="absolute bottom-0 left-0 right-0 h-1/4 bg-[#A54A4A]/90 text-white p-2 flex items-center justify-center">
                    <p class="text-[0.8vw] text-center line-clamp-2">{{ truncateText(imageData[oldIndexValue].descripcion, 60) }}</p>
                  </div>
                </div>

                <!-- IMAGEN QUE ENTRA (la nueva central) - VIENE DESDE SU POSICIÓN LATERAL -->
                <div 
                  class="absolute rounded-[.8vw] overflow-hidden shadow-2xl border-4 border-[#fff]/70 z-50"
                  :class="animationInClass"
                >
                  <img :src="imageData[newIndexValue].url" class="w-full h-full object-cover" />
                  <div class="absolute bottom-0 left-0 right-0 h-1/4 bg-[#E03636]/90 text-white p-2 flex items-center justify-center">
                    <p class="text-[0.8vw] text-center line-clamp-2">{{ truncateText(imageData[newIndexValue].descripcion, 60) }}</p>
                  </div>
                </div>

                <!-- IMÁGENES LATERALES FANTASMA (opacas durante animación) -->
                <div class="absolute left-0 top-0 w-[35%] h-[45%] rounded-xl overflow-hidden opacity-30 pointer-events-none">
                  <img :src="imageData[prevIndex].url" class="w-full h-full object-cover" />
                  <div class="absolute inset-0 bg-gray-500/80"></div>
                </div>
                <div class="absolute right-0 top-0 w-[35%] h-[45%] rounded-xl overflow-hidden opacity-30 pointer-events-none">
                  <img :src="imageData[nextIndex].url" class="w-full h-full object-cover" />
                  <div class="absolute inset-0 bg-gray-500/80"></div>
                </div>
              </template>
            </div>

            <!-- CONTROLES -->
            <div class="flex justify-center z-50 mt-4">
              <div class="flex justify-center space-x-[1vw] bg-black/30 backdrop-blur-md py-[0.7vw] px-6 rounded-full border border-white/30">
                <button 
                  v-for="(_, index) in imageData" 
                  :key="index"
                  @click="goToImage(index)"
                  class="transition-all duration-300 focus:outline-none rounded-full"
                  :class="[
                    currentIndex === index 
                      ? 'bg-[#A54A4A] scale-125 ring-[.2vw] ring-[#A54A4A]' 
                      : 'bg-white/50 hover:bg-[#E4D294]/50'
                  ]"
                  :style="{ width: '.8vw', height: '.8vw' }"
                ></button>
              </div>
            </div>
          </div>
        </div>

        <!-- COLUMNA DERECHA (35%) -->
        <div class="text-[1.3vw] w-[35%] bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-[1.5em] flex flex-col">
          <h3 class="font-bold text-[1.0em] text-[#A54A4A] mb-[1.1em] tracking-wide border-b-[.10em] border-[#A54A4A]/30 pb-[0.5em]">
            Reseña Histórica del Senado
          </h3>
          <div class="custom-scroll flex-1">
            <p class="text-[#000] text-[.70em] leading-relaxed text-justify">
              El 9 de febrero de 1825 por decreto del Mariscal Antonio José de Sucre se convoca a la primera Asamblea Nacional con el objetivo de dirimir el destino de las provincias de la futura República de Bolivia, por lo cual se establece la fundación del Poder Legislativo un 10 de julio del 1825.
              <br><br>
              El día 6 de agosto de 1825, se aprobó la independencia de la República de Bolívar por amplia mayoría, en consecuencia, en la sesión del 13 de agosto de 1825, Bolivia es declarada como una República representativa, la cual contaría con tres poderes: Ejecutivo, Judicial y Legislativo.
              <br><br>
              Luego de varias interrupciones del orden democrático en el país, el día: 10 de octubre del 1982 se posesiona al congreso electo en las elecciones realizadas en 1980, desde entonces, la Asamblea legislativa y el Senado trabajan de manera continua en favor de la legislación, fiscalización y gestión de la nación. 
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// DATOS DE LAS IMÁGENES CON TEXTO ESPECÍFICO
const imageData = ref([
  {
    url: '/Reseña Histórica del Senado/17.webp',
    titulo: 'Palacio Legislativo',
    descripcion: `Palacio Legislativo Restaurado, año 1940 (Fuente: Colección Fotográfica de la Vicepresidencia del Estado Plurinacional de Bolivia).`
  },
  {
    url: '/Reseña Histórica del Senado/63.webp',
    titulo: 'Antiguo Hemiciclo',
    descripcion: `Hemiciclo antiguo de la Honorable Cámara de Senadores. (Fuente: Colección Fotográfica del Honorable Senado del Estado Plurinacional de Bolivia).`
  },
  {
    url: '/Reseña Histórica del Senado/118.webp',
    titulo: 'Nuevo Hemicilo',
    descripcion: `Nuevo Hemiciclo de la Honorable Cámara de Senadores. (Fuente: Colección Fotográfica del Honorable Senado del Estado Plurinacional de Bolivia).`
  }
])

const truncateText = (text, max) => text.length > max ? text.substring(0, max) + '...' : text

const currentIndex = ref(0)
const showFullText = ref(false)

// Control de animación
const isAnimating = ref(false)
const direction = ref(null) // 'next' o 'prev'
const oldIndexValue = ref(0)
const newIndexValue = ref(0)

// Índices calculados
const prevIndex = computed(() => (currentIndex.value - 1 + imageData.value.length) % imageData.value.length)
const nextIndex = computed(() => (currentIndex.value + 1) % imageData.value.length)

// Clases de animación
const animationOutClass = computed(() => {
  if (!isAnimating.value) return ''
  return direction.value === 'next' ? 'animate-out-to-left' : 'animate-out-to-right'
})

const animationInClass = computed(() => {
  if (!isAnimating.value) return ''
  return direction.value === 'next' ? 'animate-in-from-right' : 'animate-in-from-left'
})

const grayOverlayClass = computed(() => {
  if (!isAnimating.value) return ''
  return direction.value === 'next' ? 'gray-fade-in-left' : 'gray-fade-in-right'
})

const toggleFullText = () => {
  showFullText.value = !showFullText.value
}

// ============================================
// 🔥 PRECARGA DE IMÁGENES
// ============================================
const preloadImage = (url) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = resolve
    img.onerror = resolve
    img.src = url
  })
}

const animateTransition = async (newIdx, dir) => {
  if (isAnimating.value) return
  
  // 🔥 PRECARGAR la imagen que va a entrar ANTES de la animación
  await preloadImage(imageData.value[newIdx].url)
  
  isAnimating.value = true
  direction.value = dir
  oldIndexValue.value = currentIndex.value
  newIndexValue.value = newIdx
  
  await new Promise(resolve => setTimeout(resolve, 500))
  
  currentIndex.value = newIdx
  showFullText.value = false
  isAnimating.value = false
  direction.value = null
}

const nextImage = () => {
  const newIdx = nextIndex.value
  if (newIdx === currentIndex.value) return
  animateTransition(newIdx, 'next')
}

const prevImage = () => {
  const newIdx = prevIndex.value
  if (newIdx === currentIndex.value) return
  animateTransition(newIdx, 'prev')
}

const goToImage = (index) => {
  if (isAnimating.value || index === currentIndex.value) return
  const dir = index > currentIndex.value ? 'next' : 'prev'
  animateTransition(index, dir)
}

// ============================================
// 🔥 PRECARGAR TODAS LAS IMÁGENES AL INICIO
// ============================================
onMounted(() => {
  imageData.value.forEach(data => {
    const img = new Image()
    img.src = data.url
  })
})
</script>

<style scoped>
/* ==================== ANIMACIONES ==================== */

/* SALE HACIA IZQUIERDA */
.animate-out-to-left {
  animation: slideToLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  position: absolute;
  left: 20%;
  top: 15%;
  width: 60%;
  height: 80%;
  z-index: 45;
}

@keyframes slideToLeft {
  0% {
    left: 20%;
    top: 15%;
    width: 60%;
    height: 80%;
  }
  100% {
    left: 0%;
    top: 0%;
    width: 35%;
    height: 45%;
  }
}

/* SALE HACIA DERECHA */
.animate-out-to-right {
  animation: slideToRight 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  position: absolute;
  left: 20%;
  top: 15%;
  width: 60%;
  height: 80%;
  z-index: 45;
}

@keyframes slideToRight {
  0% {
    left: 20%;
    top: 15%;
    width: 60%;
    height: 80%;
  }
  100% {
    left: 65%;
    top: 0%;
    width: 35%;
    height: 45%;
  }
}

/* ENTRA DESDE DERECHA */
.animate-in-from-right {
  animation: slideFromRight 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  position: absolute;
  z-index: 50;
}

@keyframes slideFromRight {
  0% {
    left: 65%;
    top: 0%;
    width: 35%;
    height: 45%;
  }
  100% {
    left: 20%;
    top: 15%;
    width: 60%;
    height: 80%;
  }
}

/* ENTRA DESDE IZQUIERDA */
.animate-in-from-left {
  animation: slideFromLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  position: absolute;
  z-index: 50;
}

@keyframes slideFromLeft {
  0% {
    left: 0%;
    top: 0%;
    width: 35%;
    height: 45%;
  }
  100% {
    left: 20%;
    top: 15%;
    width: 60%;
    height: 80%;
  }
}

/* Capa gris */
.gray-fade-in-left, .gray-fade-in-right {
  animation: grayFade 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes grayFade {
  0% {
    background-color: rgba(107, 114, 128, 0);
  }
  100% {
    background-color: rgba(107, 114, 128, 0.6);
  }
}

/* Otros estilos */
.custom-scroll::-webkit-scrollbar {
  width: 6px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: #E03636;
  border-radius: 10px;
}
.border-3 {
  border-width: 3px;
}
.h-1\/4 {
  height: 25%;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>