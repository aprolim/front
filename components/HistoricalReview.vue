<template>
  <div class="relative z-10 mx-auto min-h-screen flex flex-col w-full">
    <!-- Espaciador superior para el header -->
    <div class="h-[4.4vw]"></div>

    <!-- Dos columnas: 65% y 35% -->
    <div class="mx-auto px-[4.5vw] flex-1">
      <div class="flex gap-8 h-full">
        
        <!-- COLUMNA IZQUIERDA (65%) - Carrusel de imágenes -->
        <div class="w-[65%] bg-transparent rounded-2xl shadow-2xl border border-white/20 p-6">
          <div class="relative h-full flex flex-col">
            
            <!-- Contenedor de imágenes - SOLO 3 VISIBLES SIEMPRE -->
            <div class="relative w-full h-[34vw] ">
              
              <!-- Imagen izquierda (anterior) -->
              <div 
                @click="prevImage"
                class="absolute left-0 top-0 w-[35%] h-[45%] rounded-xl overflow-hidden shadow-2xl border-3 border-[#E4D294]/50 transform -rotate-3 hover:rotate-0 transition-all duration-500 z-10 cursor-pointer hover:scale-105"
              >
                <img 
                  :src="allImages[prevIndex]" 
                  :alt="'Imagen anterior'"
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/40 transition-opacity duration-300">
                  <span class="text-white text-2xl">←</span>
                </div>
              </div>
              
              <!-- Imagen central (actual) -->
              <div class="absolute left-[20%] top-[15%] w-[60%] h-[80%] rounded-xl overflow-hidden shadow-2xl border-4 border-[#E4D294]/70 z-30 transform hover:scale-105 transition-all duration-500">
                <img 
                  :src="allImages[currentIndex]" 
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>
              
              <!-- Imagen derecha (siguiente) -->
              <div 
                @click="nextImage"
                class="absolute right-0 top-0 w-[35%] h-[45%] rounded-xl overflow-hidden shadow-2xl border-3 border-[#E4D294]/50 transform rotate-3 hover:rotate-0 transition-all duration-500 z-10 cursor-pointer hover:scale-105"
              >
                <img 
                  :src="allImages[nextIndex]" 
                  :alt="'Imagen siguiente'"
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/40 transition-opacity duration-300">
                  <span class="text-white text-2xl">→</span>
                </div>
              </div>
            </div>

            <!-- CONTROLES DEL CAROUSEL (puntitos) -->
            <div class="flex justify-center z-40">
              <div class="flex justify-center space-x-4 bg-black/30 backdrop-blur-md py-3 px-6 rounded-full border border-white/30">
                <button 
                  v-for="(_, index) in allImages" 
                  :key="index"
                  @click="currentIndex = index"
                  class="transition-all duration-300 focus:outline-none rounded-full"
                  :class="[
                    currentIndex === index 
                      ? 'bg-[#E4D294] scale-125 ring-2 ring-white' 
                      : 'bg-white/50 hover:bg-[#E4D294]/50'
                  ]"
                  :style="{ width: '14px', height: '14px' }"
                  :aria-label="`Ir a imagen ${index + 1}`"
                ></button>
              </div>
            </div>
          </div>
        </div>

        <!-- COLUMNA DERECHA (35%) - Texto fijo y botones -->
        <div class="text-[1.3vw] w-[35%] bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 flex flex-col">
          <!-- Título fijo -->
          <h3 class="font-bold text-[1.0em] text-[#E03636] mb-6 tracking-wide border-b-2 border-[#E03636]/30 pb-3">
            Reseña Histórica del Senado
          </h3>
          
          <!-- Texto descriptivo fijo con scroll -->
          <div class="pr-2 custom-scroll">
            <p class="text-[#000] text-[.65em] leading-relaxed mb-[.5em] text-justify">
                El 9 de febrero de 1825 por decreto del Mariscal Antonio José de Sucre se convoca a la primera Asamblea Nacional con el objetivo de dirimir el destino de las provincias de la futura República de Bolivia, por lo cual se establece la fundación del Poder Legislativo un 10 de julio del 1825.
                <br>
                El día 6 de agosto de 1825, se aprobó la independencia de la República de Bolívar por amplia mayoría, en consecuencia, en la sesión del 13 de agosto de 1825, Bolivia es declarada como una República representativa, la cual contaría con tres poderes: Ejecutivo, Judicial y Legislativo.
                <br>
                Luego de varias interrupciones del orden democrático en el país, el día: 10 de octubre del 1982 se posesiona al congreso electo en las elecciones realizadas en 1980, desde entonces, la Asamblea legislativa y el Senado trabajan de manera continua en favor de la legislación, fiscalización y gestión de la nación. 

            </p>
          </div>
          
          <!-- Botón Leer más (rojo) -->
          <button 
            @click="handleLeerMas"
            class="text-[.8em] mt-[.5em] bg-[#E03636] hover:bg-[#E03636]/80 text-white font-bold py-[.5em] px-8 rounded-lg transition-all duration-300 transform hover:scale-105 uppercase tracking-wider shadow-lg"
          >
            Ver más
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Array de todas las imágenes
const allImages = ref([
  '/resena historica/img1.png',
  '/resena historica/img2.png',
  '/resena historica/img3.png',
])

// Índice actual (imagen central)
const currentIndex = ref(0)

// Índices calculados (con wrap circular)
const prevIndex = computed(() => 
  (currentIndex.value - 1 + allImages.value.length) % allImages.value.length
)

const nextIndex = computed(() => 
  (currentIndex.value + 1) % allImages.value.length
)

// Funciones de navegación
const nextImage = () => {
  currentIndex.value = nextIndex.value
}

const prevImage = () => {
  currentIndex.value = prevIndex.value
}

// Función para botón "Leer más"
const handleLeerMas = () => {
  console.log('Leer más - Abrir página de historia completa')
  // Aquí puedes navegar a una página de historia completa
  // Ejemplo: navigateTo('/historia-completa')
}
</script>

<style scoped>
/* Animaciones suaves */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 500ms;
}

/* Para que las imágenes mantengan proporción */
.object-cover {
  object-fit: cover;
}

/* Scroll personalizado para el texto */
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

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: #E03636/80;
}

/* Rotaciones suaves */
.-rotate-3 {
  transform: rotate(-3deg);
}

.rotate-3 {
  transform: rotate(3deg);
}

.hover\:rotate-0:hover {
  transform: rotate(0deg);
}

/* Bordes personalizados */
.border-3 {
  border-width: 3px;
}

/* Asegurar que las imágenes ocupen todo el espacio */
.absolute img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Cursor pointer en imágenes laterales */
.cursor-pointer {
  cursor: pointer;
}
</style>