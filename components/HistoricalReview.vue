<template>
  <div class="relative z-10 mx-auto min-h-screen flex flex-col w-full text-[1.5vw]">
    <!-- Espaciador superior para el header -->
    <div class="h-[4.4vw]"></div>

    <!-- Dos columnas: 65% y 35% -->
    <div class="mx-auto px-[4.5vw] flex-1">
      <div class="flex gap-[2em] h-full pt-[2em]">
        
        <!-- COLUMNA IZQUIERDA (65%) - Carrusel de imágenes -->
        <div class="w-[65%] bg-transparent rounded-2xl shadow-2xl border border-white/20 p-6">
          <div class="relative h-full flex flex-col">
            
            <!-- Contenedor de imágenes - SOLO 3 VISIBLES SIEMPRE -->
            <div class="relative w-full h-[34vw]">
              
              <!-- Imagen izquierda (anterior) - CON CAPA PLOMA EXTRA -->
              <div 
                @click="prevImage"
                class="absolute left-0 top-0 w-[35%] h-[45%] rounded-xl overflow-hidden shadow-2xl border-3 border-[#E4D294]/50 z-10 cursor-pointer hover:scale-105 transition-all duration-500"
              >
                <img 
                  :src="imageData[prevIndex].url" 
                  :alt="imageData[prevIndex].titulo"
                  class="w-full h-full object-cover"
                />
                <!-- Capa ploma extra (gris semitransparente) -->
                <div class="absolute inset-0 bg-gray-500/60"></div>
                
                <!-- Franja de texto inferior (25% de altura) - SIEMPRE VISIBLE -->
                <div class="absolute bottom-0 left-0 right-0 h-1/4 bg-[#E03636]/90 text-white p-2 flex items-center justify-center">
                  <p class="text-[0.8vw] text-center line-clamp-2">
                    {{ truncateText(imageData[prevIndex].descripcion, 60) }}
                  </p>
                </div>
              </div>
              
              <!-- Imagen central (actual) - SIN CAPA PLOMA -->
              <div 
                class="absolute left-[20%] top-[15%] w-[60%] h-[80%] rounded-xl overflow-hidden shadow-2xl border-4 border-[#E4D294]/70 z-30 transform hover:scale-105 transition-all duration-500"
              >
                <img 
                  :src="imageData[currentIndex].url" 
                  class="w-full h-full object-cover"
                />
                
                <!-- FRANJA DE TEXTO QUE SUBE Y BAJA AL HACER CLICK -->
                <div 
                  class="absolute bottom-0 left-0 right-0 bg-[#E03636]/90 text-white transition-all duration-500 overflow-hidden cursor-pointer"
                  :class="showFullText ? 'h-full' : 'h-1/4'"
                  @click="toggleFullText"
                >
                  <!-- Contenedor con padding para el texto -->
                  <div class="p-4 h-full flex flex-col overflow-y-auto">
                    
                    <!-- Cuando está contraído (25%): Texto truncado + Leer más como tercera línea -->
                    <div v-if="!showFullText" class="h-full flex flex-col justify-center">
                      <p class="text-[1.2vw]">
                        {{ truncateText(imageData[currentIndex].descripcion, 100) }}
                        <span class="font-bold inline-flex items-center gap-1 hover:underline">
                          Leer más
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                          </svg>
                        </span>
                      </p>
                    </div>
                    
                    <!-- Cuando está expandido (100%): texto completo -->
                    <div v-if="showFullText" class="mt-2">
                      <h4 class="font-bold text-[1.3vw] mb-[.2vw] text-center">{{ imageData[currentIndex].titulo }}</h4>
                      <p class="text-[1.2vw] whitespace-pre-line text-justify">
                        {{ imageData[currentIndex].descripcion }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Imagen derecha (siguiente) - CON CAPA PLOMA EXTRA -->
              <div 
                @click="nextImage"
                class="absolute right-0 top-0 w-[35%] h-[45%] rounded-xl overflow-hidden shadow-2xl border-3 border-[#E4D294]/50 z-10 cursor-pointer hover:scale-105 transition-all duration-500"
              >
                <img 
                  :src="imageData[nextIndex].url" 
                  :alt="imageData[nextIndex].titulo"
                  class="w-full h-full object-cover"
                />
                <!-- Capa ploma extra (gris semitransparente) -->
                <div class="absolute inset-0 bg-gray-500/60"></div>
                
                <!-- Franja de texto inferior (25% de altura) - SIEMPRE VISIBLE -->
                <div class="absolute bottom-0 left-0 right-0 h-1/4 bg-[#E03636]/90 text-white p-2 flex items-center justify-center">
                  <p class="text-[0.8vw] text-center line-clamp-2">
                    {{ truncateText(imageData[nextIndex].descripcion, 60) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- CONTROLES DEL CAROUSEL (puntitos) -->
            <div class="flex justify-center z-40 mt-4">
              <div class="flex justify-center space-x-4 bg-black/30 backdrop-blur-md py-3 px-6 rounded-full border border-white/30">
                <button 
                  v-for="(_, index) in imageData" 
                  :key="index"
                  @click="currentIndex = index; showFullText = false;"
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
        <div class="text-[1.3vw] w-[35%] bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-[1.5em] flex flex-col">
          <!-- Título fijo -->
          <h3 class="font-bold text-[1.0em] text-[#E03636] mb-[1.1em] tracking-wide border-b-[.10em] border-[#E03636]/30 pb-[0.5em]">
            Reseña Histórica del Senado
          </h3>
          
          <!-- Texto descriptivo fijo con scroll -->
          <div class="custom-scroll flex-1">
            <p class="text-[#000] text-[.70em] leading-relaxed mb-[.0em] text-justify">
                El 9 de febrero de 1825 por decreto del Mariscal Antonio José de Sucre se convoca a la primera Asamblea Nacional con el objetivo de dirimir el destino de las provincias de la futura República de Bolivia, por lo cual se establece la fundación del Poder Legislativo un 10 de julio del 1825.
                <br>
                <br>
                El día 6 de agosto de 1825, se aprobó la independencia de la República de Bolívar por amplia mayoría, en consecuencia, en la sesión del 13 de agosto de 1825, Bolivia es declarada como una República representativa, la cual contaría con tres poderes: Ejecutivo, Judicial y Legislativo.
                <br>
                <br>
                Luego de varias interrupciones del orden democrático en el país, el día: 10 de octubre del 1982 se posesiona al congreso electo en las elecciones realizadas en 1980, desde entonces, la Asamblea legislativa y el Senado trabajan de manera continua en favor de la legislación, fiscalización y gestión de la nación. 
            </p>
          </div>
          
          <!-- Botón Ver más (rojo) -->
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

// Datos de las imágenes con título y descripción real
const imageData = ref([
  {
    url: '/resena historica/img1.png',
    titulo: 'Fundación del Poder Legislativo',
    descripcion: `El 9 de febrero de 1825 por decreto del Mariscal Antonio José de Sucre se convoca a la primera Asamblea Nacional con el objetivo de dirimir el destino de las provincias de la futura República de Bolivia, por lo cual se establece la fundación del Poder Legislativo un 10 de julio del 1825. El día 6 de agosto de 1825, se aprobó la independencia de la República de Bolívar por amplia mayoría, en consecuencia, en la sesión del 13 de agosto de 1825, Bolivia es declarada como una República representativa, la cual contaría con tres poderes: Ejecutivo, Judicial y Legislativo.`
  },
  {
    url: '/resena historica/img2.png',
    titulo: 'Primera Asamblea Constituyente',
    descripcion: `La primera Asamblea Constituyente de Bolivia se instaló el 10 de julio de 1825 en la ciudad de Chuquisaca, actual Sucre. Este hito marcó el inicio de la vida republicana y la construcción del Estado boliviano. Los representantes de las provincias del Alto Perú deliberaron sobre el futuro de la nación, decidiendo finalmente la independencia absoluta de las Provincias Unidas del Río de la Plata y del Perú.`
  },
  {
    url: '/resena historica/img3.png',
    titulo: 'Creación del Senado Boliviano',
    descripcion: `El Senado de Bolivia fue establecido mediante la primera Constitución Política del país, promulgada el 19 de noviembre de 1826 por el Mariscal Antonio José de Sucre. La Cámara de Senadores se conformó como cámara revisora y representante de los departamentos, consolidando el sistema bicameral que perdura hasta nuestros días como pilar fundamental del Poder Legislativo.`
  }
])

// Función para truncar texto
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Índice actual (imagen central)
const currentIndex = ref(0)

// Control para mostrar texto completo en la imagen central
const showFullText = ref(false)

// Índices calculados (con wrap circular)
const prevIndex = computed(() => 
  (currentIndex.value - 1 + imageData.value.length) % imageData.value.length
)

const nextIndex = computed(() => 
  (currentIndex.value + 1) % imageData.value.length
)

// Funciones de navegación
const nextImage = () => {
  currentIndex.value = nextIndex.value
  showFullText.value = false
}

const prevImage = () => {
  currentIndex.value = prevIndex.value
  showFullText.value = false
}

// Función para mostrar/ocultar texto completo
const toggleFullText = () => {
  showFullText.value = !showFullText.value
}

// Función para botón "Ver más"
const handleLeerMas = () => {
  console.log('Ver más - Abrir página de historia completa')
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

/* Cursor pointer */
.cursor-pointer {
  cursor: pointer;
}

/* Alturas para la franja de texto */
.h-1\/4 {
  height: 25%;
}

.h-full {
  height: 100%;
}

/* Capa ploma para imágenes laterales */
.bg-gray-500\/60 {
  background-color: rgba(107, 114, 128, 0.6);
}

/* Permitir scroll cuando el texto está expandido */
.overflow-y-auto {
  overflow-y: auto;
}

/* Centrar contenido verticalmente cuando está contraído */
.justify-center {
  justify-content: center;
}

/* Para respetar saltos de línea en el texto */
.whitespace-pre-line {
  white-space: pre-line;
}
</style>